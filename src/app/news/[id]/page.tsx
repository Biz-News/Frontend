import {
  CompanyInfoAccordion,
  NewsSummary,
  NewsHeader,
  RelatedNews,
  Keyword,
  RelatedCompanies,
  ChartLink,
  AnimatedSection
} from "@/components/news";

interface NewsProps {
  params: Promise<{ id: string }>;
}

async function getNews(id: string) {
  // const res = await fetch(`https://api.example.com/news/${id}`);
  // return res.json();
  return {
    id,
    company: "삼성전자",
    title: "삼성전자, 양자 컴퓨터 해킹",
    content: "삼성전자가 반도체 업계 최초로 하드웨어 양자내성암호(PQC)를 탑재한 보안 칩을 개발했다. 향후 양자컴퓨터로 인한 암호체계 무력화 위험에 대응하기 위한 것이다. 26일 삼성 반도체 홈페이지를 살펴보면, 삼성전자 DS(반도체)부문 시스템LSI 사업부는 최근 하드웨어에 PQC 기술을 적용한 보안 칩 'S3SSE2A'의 개발을 마치고 샘플 출하 준비에 한창이다.",
    links: [
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
    ],
    related_companies: [
      {
        id: 1,
        name: "연관기업1",
      },
      {
        id: 2,
        name: "연관기업2",
      },
      {
        id: 3,
        name: "연관기업3",
      },
    ],
    news: [
      {
        id: 1,
        title: "삼성전자, 주가 상승",
        sub_title: "삼성전자의 주가가 상승했습니다.",
        content: "삼성전자의 주가가 상승했습니다.",
        url: "https://www.google.com",
        keywords: ["삼성전자", "주가", "상승"],
      },
      {
        id: 2,
        title: "삼성전자, 주가 하락",
        sub_title: "삼성전자의 주가가 하락했습니다.",
        content: "삼성전자의 주가가 하락했습니다.",
        url: "https://www.google.com",
        keywords: ["삼성전자", "주가", "하락"],
      },
      {
        id: 3,
        title: "삼성전자, 이재용 석방",
        sub_title: "이재용이 석방되었습니다.",
        content: "이재용이 석방되었습니다.",
        url: "https://www.google.com",
        keywords: ["삼성전자", "이재용", "석방"],
      },
    ],
    keywords: [
      { text: "삼성전자", value: 10 },
      { text: "이재용", value: 5 },
      { text: "석방", value: 3 },
      { text: "양자컴퓨터", value: 2 },
      { text: "PQC", value: 1 },
      { text: "보안", value: 1 },
      { text: "반도체", value: 1 },
      { text: "주가", value: 1 },
      { text: "하락", value: 1 },
      { text: "상승", value: 1 },
    ],
  };
}

async function getCompanyInfo(id: string) {
  // const res = await fetch(`https://api.example.com/company/${id}`);
  // return res.json();
  return {
    id,
    company: "삼성전자",
    image: "https://mblogthumb-phinf.pstatic.net/20160614_119/ppanppane_1465870699828cgTOd_PNG/%BB%EF%BC%BA_%B7%CE%B0%ED_%282%29.png?type=w800",
  };
}

export default async function News({ params }: NewsProps) {
  const { id } = await params;
  const { company, image } = await getCompanyInfo(id);
  const { title, content, related_companies, news, keywords } = await getNews(id);

  return (
    <main className="bg-fixed bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 relative">
        <NewsHeader company={company} />
        <RelatedCompanies companies={related_companies} />
        <ChartLink id={id} company={company} />
        <AnimatedSection delay={0}>
          <NewsSummary title={title} content={content} />
        </AnimatedSection>
        <AnimatedSection delay={1}>
          <RelatedNews news={news} />
        </AnimatedSection>
        <AnimatedSection delay={2}>
          <Keyword keywords={keywords} />
        </AnimatedSection>
        <CompanyInfoAccordion company={company} image={image} />
      </div>
    </main>
  );
}
