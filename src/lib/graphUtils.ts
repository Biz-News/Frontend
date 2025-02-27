import { Record } from 'neo4j-driver';

// 그래프 노드 인터페이스
export interface GraphNode {
  id: string;
  label: string;
  name: string;
  group: number;
  size?: number;
  properties?: Record<string, any>;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

// 그래프 링크 인터페이스
export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  type: string;
  weight?: number;
  properties?: Record<string, any>;
}

// 그래프 데이터 인터페이스
export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

/**
 * Neo4j 레코드를 그래프 데이터로 변환
 */
export function transformCompanyKeywordsToGraph(records: Record[]): GraphData {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const nodesMap = new Map<string, GraphNode>();
  
  // 레코드가 없으면 빈 데이터 반환
  if (records.length === 0) {
    return { nodes, links };
  }
  
  // 회사 노드 추가
  const companyRecord = records[0].get('c');
  if (companyRecord) {
    const companyNode: GraphNode = {
      id: companyRecord.properties.id,
      label: 'Company',
      name: companyRecord.properties.name,
      group: 1,
      size: 30,
      properties: companyRecord.properties
    };
    
    nodesMap.set(companyNode.id, companyNode);
    nodes.push(companyNode);
  }
  
  // 키워드 노드 및 링크 추가
  records.forEach(record => {
    const keywordRecord = record.get('k');
    const weight = record.get('weight').toNumber();
    
    if (keywordRecord) {
      const keywordId = keywordRecord.properties.id;
      
      // 이미 처리된 노드가 아닌 경우만 추가
      if (!nodesMap.has(keywordId)) {
        const keywordNode: GraphNode = {
          id: keywordId,
          label: 'Keyword',
          name: keywordRecord.properties.name || keywordId,
          group: 2,
          size: Math.max(10, Math.min(25, weight * 2)), // 가중치에 따라 크기 조정
          properties: keywordRecord.properties
        };
        
        nodesMap.set(keywordId, keywordNode);
        nodes.push(keywordNode);
      }
      
      // 회사-키워드 간 링크 추가
      links.push({
        source: companyRecord.properties.id,
        target: keywordId,
        type: 'RELATED_TO',
        weight: weight
      });
    }
  });
  
  return { nodes, links };
}

/**
 * Neo4j 레코드를 회사-뉴스-키워드 그래프 데이터로 변환
 */
export function transformCompanyNewsToGraph(records: Record[]): GraphData {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const nodesMap = new Map<string, GraphNode>();
  
  records.forEach(record => {
    const companyRecord = record.get('c');
    const newsRecord = record.get('n');
    
    if (companyRecord && newsRecord) {
      // 회사 노드 처리
      const companyId = companyRecord.properties.id;
      if (!nodesMap.has(companyId)) {
        const companyNode: GraphNode = {
          id: companyId,
          label: 'Company',
          name: companyRecord.properties.name,
          group: 1,
          size: 30,
          properties: companyRecord.properties
        };
        
        nodesMap.set(companyId, companyNode);
        nodes.push(companyNode);
      }
      
      // 뉴스 노드 처리
      const newsId = newsRecord.properties.id;
      if (!nodesMap.has(newsId)) {
        const newsNode: GraphNode = {
          id: newsId,
          label: 'News',
          name: newsRecord.properties.name,
          group: 3,
          size: 20,
          properties: newsRecord.properties
        };
        
        nodesMap.set(newsId, newsNode);
        nodes.push(newsNode);
      }
      
      // 회사-뉴스 링크 추가
      links.push({
        source: companyId,
        target: newsId,
        type: 'MENTIONED_IN'
      });
    }
  });
  
  return { nodes, links };
}