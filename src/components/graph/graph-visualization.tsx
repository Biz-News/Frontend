'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { GraphData, GraphNode, GraphLink } from '@/lib/graphUtils';

interface GraphVisualizationProps {
  data: GraphData | null;
  width?: number;
  height?: number;
  onNodeClick?: (node: GraphNode) => void;
  onNodeDoubleClick?: (node: GraphNode) => void;
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({
  data,
  width = 800,
  height = 600,
  onNodeClick,
  onNodeDoubleClick
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width, height });

  // 컨테이너 크기에 맞게 차원 업데이트
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  // 윈도우 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 그래프 시각화 렌더링
  useEffect(() => {
    if (!data || !svgRef.current) return;

    // 기존 그래프 요소 제거
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .attr('viewBox', [0, 0, dimensions.width, dimensions.height]);

    // 줌 기능 추가
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // 그래프 컨테이너 그룹
    const g = svg.append('g');

    // 화살표 정의
    // svg.append('defs').append('marker')
    //   .attr('id', 'arrowhead')
    //   .attr('viewBox', '-0 -5 10 10')
    //   .attr('refX', 20)
    //   .attr('refY', 0)
    //   .attr('orient', 'auto')
    //   .attr('markerWidth', 6)
    //   .attr('markerHeight', 6)
    //   .append('path')
    //   .attr('d', 'M 0,-3 L 6,0 L 0,3')
    //   .attr('fill', '#999');

    // 색상 매핑
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // 노드 크기 설정
    const nodeSize = (d: GraphNode) => {
      return d.size || (d.label === 'Company' ? 30 : (d.label === 'News' ? 20 : 15));
    };

    // 링크 너비 설정
    const linkWidth = (d: GraphLink) => {
      return d.weight ? Math.sqrt(d.weight) * 0.5 : 1;
    };

    // 노드 간 거리 설정 - D3의 타입에 맞게 수정
    const linkDistance = (link: d3.SimulationLinkDatum<d3.SimulationNodeDatum>, i: number, links: d3.SimulationLinkDatum<d3.SimulationNodeDatum>[]) => {
        // 타입 단언을 사용하여 GraphLink의 속성에 접근
        const d = link as unknown as GraphLink;
        
        if (d.source === d.target) return 0;
        
        // type 속성이 있는지 확인 후 사용
        if (d.type) {
        if (d.type === 'RELATED_TO') {
            return 80;
        } else if (d.type === 'MENTIONED_IN') {
            return 120;
        }
        }
        
        return 100; // 기본값
    };

    // 더 간단한 접근법 - 고정된 거리 사용
    const simulation = d3.forceSimulation<d3.SimulationNodeDatum & GraphNode>(data.nodes as any)
    .force('link', d3.forceLink<d3.SimulationNodeDatum, d3.SimulationLinkDatum<d3.SimulationNodeDatum>>(data.links as any)
    .id((d: any) => d.id)
    .distance(80)) // 모든 링크에 80의 거리 사용
    .force('charge', d3.forceManyBody().strength(-500)) // -500 -> -300
    .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
    .force('collision', d3.forceCollide().radius(d => nodeSize(d as GraphNode) * 1.2));
    
    // 링크 생성
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-width', linkWidth)
      .attr('stroke-opacity', 0.6);
    //   .attr('marker-end', 'url(#arrowhead)');

    // 링크 레이블 생성
    // const linkLabel = g.append('g')
    //   .attr('class', 'link-labels')
    //   .selectAll('text')
    //   .data(data.links)
    //   .join('text')
    //   .attr('font-size', 10)
    //   .attr('text-anchor', 'middle')
    //   .attr('dy', -5)
    //   .text(d => d.type);

    // 노드 그룹 생성
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .attr('class', 'node')
      .on('click', (event, d) => {
        event.stopPropagation();
        if (onNodeClick) onNodeClick(d);
      })
      .on('dblclick', (event, d) => {
        event.stopPropagation();
        if (onNodeDoubleClick) onNodeDoubleClick(d);
      })
      .call(d3.drag<SVGGElement, GraphNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    // 노드 원 생성
    node.append('circle')
      .attr('r', nodeSize)
      .attr('fill', d => color(d.group.toString()) as string)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5);

    // 노드 레이블 생성
    node.append('text')
      .attr('dy', d => -nodeSize(d) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', d => d.label === 'Company' ? 14 : 10)
      .attr('font-weight', d => d.label === 'Company' ? 'bold' : 'normal')
      .text(d => d.name);

    // 노드 타입 레이블 생성
    // node.append('text')
    //   .attr('dy', d => -nodeSize(d) + 15)
    //   .attr('text-anchor', 'middle')
    //   .attr('font-size', 8)
    //   .attr('fill', '#666')
    //   .text(d => d.label);

    // 시뮬레이션 틱 이벤트 처리
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => {
          const sourceX = (d.source as any).x;
          const targetX = (d.target as any).x;
          const dx = targetX - sourceX;
          const length = Math.sqrt(dx * dx + Math.pow((d.target as any).y - (d.source as any).y, 2));
          const targetRadius = nodeSize(d.target as GraphNode);
          return sourceX + (dx / length) * (length - targetRadius);
        })
        .attr('y2', d => {
          const sourceY = (d.source as any).y;
          const targetY = (d.target as any).y;
          const dy = targetY - sourceY;
          const length = Math.sqrt(Math.pow((d.target as any).x - (d.source as any).x, 2) + dy * dy);
          const targetRadius = nodeSize(d.target as GraphNode);
          return sourceY + (dy / length) * (length - targetRadius);
        });

    //   linkLabel
    //     .attr('x', d => ((d.source as any).x + (d.target as any).x) / 2)
    //     .attr('y', d => ((d.source as any).y + (d.target as any).y) / 2);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // 드래그 이벤트 핸들러
    function dragstarted(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0);
      // 고정 해제 (주석 처리하면 위치 고정됨)
      // d.fx = null;
      // d.fy = null;
    }

    // 배경 클릭 시 선택 해제
    svg.on('click', () => {
      // 배경 클릭 시 로직
    });

    // 더블 클릭 시 줌 리셋
    svg.on('dblclick', (event) => {
      event.stopPropagation();
      svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    });

    return () => {
      simulation.stop();
    };
  }, [data, dimensions, onNodeClick, onNodeDoubleClick]);

  return (
    <div 
      ref={containerRef} 
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <svg 
        ref={svgRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      />
      <div 
        style={{ 
          position: 'absolute', 
          bottom: '10px', 
          right: '10px', 
          background: 'rgba(255, 255, 255, 0.7)',
          padding: '8px', 
          borderRadius: '4px',
          fontSize: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
      >
        <span>드래그: 노드 이동 | 스크롤: 확대/축소 | 더블클릭: 뷰 리셋</span>
      </div>
    </div>
  );
};

export default GraphVisualization;