import { 
  CompanyInfoAccordion, 
  NewsSummary, 
  NewsHeader,
  RelatedNews 
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
    summary: [
      {
        description: "삼성전자의 주가가 상승했습니다.",
        type: 'good',
      },
      {
        description: "삼성전자의 주가가 하락했습니다.",
        type: 'bad',
      },
      {
        description: "이재용이 석방되었습니다.",
        type: 'good',
      },

    ],
    links: [
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
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
    keywords: ["삼성전자", "이재용", "주가", "석방"],
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
  const { summary, links, news, keywords } = await getNews(id);

  return (
    <main className="bg-fixed bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 relative">
        <NewsHeader company={company} />
        <div className="bg-white shadow-sm rounded-lg p-4 md:p-6 mb-8">
          <NewsSummary company={company} summary={summary} />
        </div>
        <RelatedNews news={news} />
        <CompanyInfoAccordion company={company} image={image} />
      </div>
    </main>
  );
}
