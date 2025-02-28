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
        ? `http://13.124.216.60:8000/api/graph/company-keywords?company=${encodeURIComponent(companyName)}`
        : `http://13.124.216.60:8000/api/graph/company-news?company=${encodeURIComponent(companyName)}`;
      
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
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6 flex items-center">
            <span className="mr-2">🔍</span>
            기업 연관 분석
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="회사명 입력"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  검색 중...
                </>
              ) : '검색'}
            </button>
            
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewType('keywords')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewType === 'keywords' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                키워드 보기
              </button>
              <button
                onClick={() => setViewType('news')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewType === 'news' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                뉴스 보기
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="relative" style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}>
            {graphData ? (
              <GraphVisualization 
                data={graphData}
                onNodeClick={handleNodeClick}
                onNodeDoubleClick={handleNodeDoubleClick}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                {loading ? (
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-2"></div>
                    <p className="text-gray-600">데이터를 로딩 중입니다...</p>
                  </div>
                ) : (
                  <p className="text-gray-500">검색어를 입력하여 그래프를 확인하세요</p>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">💡 사용 방법</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 드래그: 노드 이동</li>
              <li>• 스크롤: 확대/축소</li>
              <li>• 더블클릭: 뷰 전환</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}