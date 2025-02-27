// src/app/api/neo4j-test/route.ts
import { NextResponse } from 'next/server';
import neo4j from 'neo4j-driver';

export async function GET() {
  let driver;
  let session;
  
  try {
    // Neo4j 연결 정보
    const uri = process.env.NEO4J_URI || 'bolt://13.124.216.60:7687';
    const user = process.env.NEO4J_USER || 'neo4j';
    const password = process.env.NEO4J_PASSWORD || '123456789';
    
    // 드라이버 초기화
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    
    // 세션 생성
    session = driver.session();
    
    // 단순 쿼리 실행
    const result = await session.run('MATCH (n) RETURN count(n) as count LIMIT 1');
    
    // 결과 추출
    const count = result.records[0].get('count').toNumber();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Neo4j 연결 성공!', 
      nodeCount: count,
      connectionInfo: {
        uri: uri,
        user: user
      }
    });
  } catch (error) {
    console.error('Neo4j 연결 오류:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Neo4j 연결 실패', 
      error: error.message 
    }, { status: 500 });
  } finally {
    if (session) await session.close();
    if (driver) await driver.close();
  }
}