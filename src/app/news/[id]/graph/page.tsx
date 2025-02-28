'use client'; // App Router에서 클라이언트 컴포넌트 지정

import { useState, useEffect, use } from 'react';
import GraphVisualization from '@/components/graph/graph-visualization';
import { GraphData, GraphNode } from '@/lib/graphUtils';

interface GraphPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    company: string;
  }>;
}

export default function GraphPage({ params, searchParams }: GraphPageProps) {
  const { id } = use(params);
  const { company } = use(searchParams);
  const companyName = company || '삼성전자';
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewType, setViewType] = useState<'keywords' | 'news'>('keywords');

  // 페이지 로드 시 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // 초기 로딩 및 뷰 타입 변경시 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, [companyName, viewType]);

  // 노드 클릭 이벤트 처리
  const handleNodeClick = (node: GraphNode) => {
    console.log('Node clicked:', node);
  };

  // 노드 더블클릭 이벤트 처리
  const handleNodeDoubleClick = (node: GraphNode) => {
    if (node.label === 'Company') {
      setViewType(viewType === 'keywords' ? 'news' : 'keywords');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* 헤더 섹션 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-xl font-bold flex items-center mb-2">
            <span className="mr-2">🔍</span>
            {companyName} 연관 분석
          </h1>
          <p className="text-gray-600 text-sm">
            기업의 키워드와 뉴스 관계를 시각화하여 보여줍니다.
          </p>
        </div>


        {/* 그래프 섹션 */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* 뷰 타입 전환 버튼 */}
          <div className="border-b border-gray-100">
            <div className="flex justify-center p-4">
              <div className="inline-flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewType('keywords')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${viewType === 'keywords'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  🏷️ 키워드 보기
                </button>
                <button
                  onClick={() => setViewType('news')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${viewType === 'news'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  📰 뉴스 보기
                </button>
              </div>
            </div>
          </div>
          {/* 사용 방법 */}
          <div className="border-t border-gray-100 p-4">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <span className="mr-2">💡</span>
                사용 방법
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center">
                  <span className="mr-2">🖱️</span>
                  드래그: 노드 이동
                </li>
                <li className="flex items-center">
                  <span className="mr-2">⚡</span>
                  스크롤: 확대/축소
                </li>
                <li className="flex items-center">
                  <span className="mr-2">👆</span>
                  더블클릭: 뷰 전환
                </li>
              </ul>
            </div>
          </div>
          {/* 그래프 영역 */}
          <div className="relative" style={{ height: 'calc(100vh - 400px)', minHeight: '300px' }}>
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
                  <p className="text-gray-500">데이터를 불러올 수 없습니다</p>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}