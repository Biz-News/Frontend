import { Suspense } from 'react';
import { CompanyInfo, Keywords, RelatedCompany, NewsId, NewsSentiment, Summary, StockInfo } from "@/\btypes";
import {
  CompanyInfoAccordion,
  NewsSummary,
  NewsHeader,
  RelatedNews,
  Keyword,
  RelatedCompanies,
  ChartLink,
  AnimatedSection,
} from "@/components/news";

interface NewsProps {
  params: Promise<{ id: string }>;
}

// 유틸리티 함수 추가
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 연관 기업 가져오기 (AI API)
async function getRelatedCompanies(id: string): Promise<RelatedCompany> {
  // /companies/{company_id}/related/?num={num}
  const res = await fetch(`http://13.124.216.60:8000/companies/${id}/related/?num=5`);
  const data = await res.json();
  return data;
  /*  return {
    company_id: "1",
    company: "삼성전자",
    related_companies: [
      {
        company_id: "2",
        company: "현대차",
      },
      {
        company_id: "3",
        company: "LG전자",
      },
      {
        company_id: "4",
        company: "SK하이닉스",
      },
    ],
  }; */
}

// 연관 키워드 가져오기 (AI API)
async function getRelatedKeywords(id: string): Promise<Keywords> {
  const res = await fetch(`http://13.124.216.60:8000/keywords/${id}/related`);
  const data = await res.json();
  return data;
  /*  return {
  return {
    keywords: [
      { keyword: "삼성전자", keyword_id: "1" },
      { keyword: "이재용", keyword_id: "2" },
      { keyword: "석방", keyword_id: "3" },
      { keyword: "주가", keyword_id: "4" },
      { keyword: "하락", keyword_id: "5" },
      { keyword: "상승", keyword_id: "6" },
      { keyword: "반도체", keyword_id: "7" },
      { keyword: "양자", keyword_id: "8" },
      { keyword: "해킹", keyword_id: "9" },
      { keyword: "보안", keyword_id: "10" },
    ],
  }; */
}

// 관련 뉴스 가져오기 (AI API), 뉴스 아이디만 가져옴, 감성 분석 따로 해야함
async function getNews(id: string): Promise<NewsId> {
  const res = await fetch(`http://13.124.216.60:8000/news/${id}`);
  const data = await res.json();
  return data;

  /* return {
    news_id: [
      "1",
      "2",
      "3",
    ],
  }; */
}

// 뉴스 감성 분석 (AI API)
async function postNewsSentiment(company_id: string, news_id: string[]): Promise<NewsSentiment> {
  // news_id 배열을 콤마로 구분된 문자열로 변환
  const news_ids = news_id.join(',');
  
  const res = await fetch(`http://13.124.216.60:8000/news/sentiment/${company_id}/${news_ids}`);
  const data = await res.json();
  return data;

  /*  return {
    news: [
      {
        news_id: "1",
        title: "삼성전자, 주가 상승",
        sub_title: "삼성전자의 주가가 상승했습니다.",
        url: "https://www.google.com",
        article_text: ['삼성', '주가', '상승'],
        sentiment: "good",
        date: "2024-01-01",
      },
      {
        news_id: "2",
        title: "삼성전자, 주가 하락",
        sub_title: "삼성전자의 주가가 하락했습니다.",
        url: "https://www.google.com",
        article_text: ['삼성', '주가', '하락'],
        sentiment: "bad",
        date: "2024-01-01",
      },
      {
        news_id: "3",
        title: "삼성전자, 이재용 석방",
        sub_title: "이재용이 석방되었습니다.",
        url: "https://www.google.com",
        article_text: ['이재용', '석방'],
        sentiment: "good",
        date: "2024-01-01",
      },
    ],
  };
  */
}

// 뉴스 요약 나중에 확인 필요
async function postSummary(id: string, news_id: string[]): Promise<Summary> {
  // news_id 배열을 콤마로 구분된 문자열로 변환
  const news_ids = news_id.join(',');
  
  const res = await fetch(`http://13.124.216.60:8000/news/summary/${id}/${news_ids}`);
  const data = await res.json();
  return data;

  /*  return {
     title: "삼성전자, 양자 컴퓨터 해킹",
     summary: "삼성전자가 반도체 업계 최초로 하드웨어 양자내성암호(PQC)를 탑재한 보안 칩을 개발했다. 향후 양자컴퓨터로 인한 암호체계 무력화 위험에 대응하기 위한 것이다. 26일 삼성 반도체 홈페이지를 살펴보면, 삼성전자 DS(반도체)부문 시스템LSI 사업부는 최근 하드웨어에 PQC 기술을 적용한 보안 칩 'S3SSE2A'의 개발을 마치고 샘플 출하 준비에 한창이다.",
   }; */
}

// 기업 정보 가져오기 (Backend API)
async function getCompanyInfo(id: string): Promise<CompanyInfo> {
  const res = await fetch(`http://13.124.216.60:8080/companies/${id}`);
  const data = await res.json();
  return data;

  /*  return {
     company_id: id,
     company: "삼성전자",
     "company_name_en": "Samsung",
     "representative_name": "이재용",
     "business_registration_number": "123-45-67890",
     "address": "서울특별시 강남구 테헤란로 231",
     "phone_number": "02-1234-5678",
     "fax_number": "02-8765-4321",
     "homepage_url": "https://www.nexon.com",
     "standard_industry_classification": "게임 소프트웨어 개발 및 공급업",
     "main_business": "온라인 및 모바일 게임 개발, 퍼블리싱",
     "establishment_date": "1994-12-01",
     "kosdaq_listed_date": "2003-10-01",
     "employee_count": 5000,
     logo_image: "https://mblogthumb-phinf.pstatic.net/20160614_119/ppanppane_1465870699828cgTOd_PNG/%BB%EF%BC%BA_%B7%CE%B0%ED_%282%29.png?type=w800",
   }; */

}


async function RelatedCompaniesSection({ id }: { id: string }) {
  const related_companies = await getRelatedCompanies(id);
  return <RelatedCompanies companies={related_companies.related_companies} />;
}

async function SummarySection({ id, news_id, ticker }: { id: string, news_id: string[], ticker: string }) {
  const summary = await postSummary(id, news_id);
  return (
    <AnimatedSection delay={0}>
      <ChartLink id={id} company="" ticker={ticker}  />
      <NewsSummary title={summary.title} content={summary.content} />
    </AnimatedSection>
  );
}

async function RelatedNewsSection({ id, news_id, company }: { id: string, news_id: string[], company: string }) {
  const { news } = await postNewsSentiment(id, news_id);

  return (
    <AnimatedSection delay={1}>
      <RelatedNews id={id} company={company} news={news} />
    </AnimatedSection>
  );
}

async function KeywordSection({ id }: { id: string }) {
  const related_keywords = await getRelatedKeywords(id);

  return (
    <AnimatedSection delay={2}>
      <Keyword keywords={related_keywords.keywords} />
    </AnimatedSection>
  );
}

async function getStockInfo(id: string): Promise<StockInfo> {
  const res = await fetch(`http://13.124.216.60:8000/companies/stock-info/${id}`);
  const data = await res.json();

  return data;
  // return {
  //     company_name: "삼성전자",
  //     ticker: "005930",
  //     trading_volume: "234만",
  //     trading_value: "234억",
  //     low_52weeks: "5,000원",
  //     high_52weeks: "200,000원",
  //     change_amount: 1000,
  //     change_percent: 1.37,
  // };
}

// 스켈레톤 컴포넌트들
function RelatedCompaniesSkeleton() {
  return <div className="animate-pulse">
    <div className="h-20 bg-gray-200 rounded"></div>
  </div>;
}

function SummarySkeleton() {
  return <div className="animate-pulse space-y-4">
    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
    <div className="h-32 bg-gray-200 rounded"></div>
  </div>;
}

function NewsSkeleton() {
  return <div className="animate-pulse space-y-8">
    <div className="h-40 bg-gray-200 rounded"></div>
    <div className="h-20 bg-gray-200 rounded"></div>
  </div>;
}

function KeywordSkeleton() {
  return <div className="animate-pulse">
    <div className="h-20 bg-gray-200 rounded"></div>
  </div>;
}

export default async function News({ params }: NewsProps) {
  const { id } = await params;
  const companyInfo = await getCompanyInfo(id);
  const { news_id } = await getNews(id);
  const { ticker } = await getStockInfo(id);
  return (
    <main className="bg-fixed bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 relative space-y-8">
        <NewsHeader company={companyInfo.company} />

        <Suspense fallback={<RelatedCompaniesSkeleton />}>
          <RelatedCompaniesSection id={id} />
        </Suspense>

        <Suspense fallback={<SummarySkeleton />}>
          <SummarySection 
            id={id} 
            news_id={news_id} 
            ticker={ticker}
          />
        </Suspense>

        <Suspense fallback={<NewsSkeleton />}>
          <RelatedNewsSection id={id} news_id={news_id} company={companyInfo.company} />
        </Suspense>

        <Suspense fallback={<KeywordSkeleton />}>
          <KeywordSection id={id} />
        </Suspense>

        <CompanyInfoAccordion companyInfo={companyInfo} />
      </div>
    </main>
  );
}
