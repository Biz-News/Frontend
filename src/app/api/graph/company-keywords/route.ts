import { NextResponse } from 'next/server';
import neo4jInstance from '@/lib/neo4j';
import { transformCompanyKeywordsToGraph } from '@/lib/graphUtils';

export async function GET(request: Request) {
  // URL에서 회사명 파라미터 추출
  const { searchParams } = new URL(request.url);
  const company = searchParams.get('company');
  
  // 회사명이 없으면 에러 반환
  if (!company) {
    return NextResponse.json(
      { error: 'Company name is required' },
      { status: 400 }
    );
  }
  
  const session = neo4jInstance.getSession();
  
  try {
    // 회사와 연관된 키워드 조회 쿼리
    const result = await session.run(
      `MATCH (c:Company {name: $name})-[:MENTIONED_IN]->(n:News)-[:HAS_KEYWORD]->(k:Keyword)
       WITH c, k, COUNT(n) AS weight
       ORDER BY weight DESC
       LIMIT 22
       RETURN c, k, weight`,
      { name: company }
    );
    
    // 쿼리 결과 그래프 데이터로 변환
    const graphData = transformCompanyKeywordsToGraph(result.records);
    
    return NextResponse.json(graphData);
  } catch (error) {
    console.error('Error querying Neo4j:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Neo4j' },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}