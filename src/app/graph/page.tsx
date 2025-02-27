'use client'; // App Router에서 클라이언트 컴포넌트 지정

import { useState, useEffect } from 'react';
import GraphVisualization from '@/components/graph/graph-visualization';
import { GraphData, GraphNode } from '@/lib/graphUtils';

export default function Home() {
  const [companyName, setCompanyName] = useState<string>('삼성전자');
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewType, setViewType] = useState<'keywords' | 'news'>('keywords');

  // 데이터 가져오기
  const fetchData = async () => {
    if (!companyName) return;
    
    setLoading(true);
    try {
      const endpoint = viewType === 'keywords' 
        ? `/api/graph/company-keywords?company=${encodeURIComponent(companyName)}`
        : `/api/graph/company-news?company=${encodeURIComponent(companyName)}`;
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error('데이터를 가져오는데 실패했습니다');
      }
      
      const data = await response.json();
      setGraphData(data);
    } catch (error) {
      console.error('Error fetching graph data:', error);
      alert('데이터를 가져오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  // 회사 이름이 변경되었을 때 데이터 다시 가져오기
  useEffect(() => {
    fetchData();
  }, [viewType]); // viewType이 변경되었을 때만 다시 가져오기

  // 노드 클릭 이벤트 처리
  const handleNodeClick = (node: GraphNode) => {
    console.log('Node clicked:', node);
  };

  // 노드 더블클릭 이벤트 처리
  const handleNodeDoubleClick = (node: GraphNode) => {
    if (node.label === 'Company') {
      // 회사 노드 더블클릭 시 뷰 타입 전환
      setViewType(viewType === 'keywords' ? 'news' : 'keywords');
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1 className="text-2xl font-bold mb-4">Neo4j 그래프 시각화</h1>
      
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="회사명 입력"
          className="border p-2 mr-2 rounded"
        />
        <button
          onClick={fetchData}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? '로딩 중...' : '검색'}
        </button>
        
        <div className="ml-4">
          <button
            onClick={() => setViewType('keywords')}
            className={`px-3 py-1 rounded mr-2 ${
              viewType === 'keywords' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200'
            }`}
          >
            키워드 보기
          </button>
          <button
            onClick={() => setViewType('news')}
            className={`px-3 py-1 rounded ${
              viewType === 'news' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200'
            }`}
          >
            뉴스 보기
          </button>
        </div>
      </div>
      
      <div className="flex-1 border rounded relative" style={{ minHeight: '500px' }}>
        {graphData ? (
          <GraphVisualization 
            data={graphData}
            onNodeClick={handleNodeClick}
            onNodeDoubleClick={handleNodeDoubleClick}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            {loading ? '데이터를 로딩 중입니다...' : '그래프 데이터가 없습니다'}
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        그래프 사용법: 드래그로 노드 이동, 스크롤로 확대/축소, 더블클릭으로 뷰 전환
      </p>
    </main>
  );
}