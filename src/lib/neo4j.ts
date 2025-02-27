import neo4j, { Driver, Session } from 'neo4j-driver';

let driver: Driver;

// Neo4j 드라이버 초기화
export function initDriver() {
  const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
  const user = process.env.NEO4J_USER || 'neo4j';
  const password = process.env.NEO4J_PASSWORD || 'password';
  
  // 드라이버가 아직 초기화되지 않은 경우에만 초기화
  if (!driver) {
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  }
  
  return driver;
}

// 세션 가져오기
export function getSession(): Session {
  const driver = initDriver();
  return driver.session({ database: 'neo4j' });
}

// 드라이버 종료
export function closeDriver() {
  if (driver) {
    return driver.close();
  }
}

// Neo4j 인스턴스
const neo4jInstance = {
  initDriver,
  getSession,
  closeDriver,
};

export default neo4jInstance;