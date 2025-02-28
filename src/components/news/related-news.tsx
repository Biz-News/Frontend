import { NewsSentiment } from "@/\btypes";
import { GraphLink } from "./graph-link";

interface RelatedNewsProps {
  id: string;
  news: NewsSentiment['news'];
  company: string;
}

export function RelatedNews({ id, company, news }: RelatedNewsProps) {
  return (
    <>
      <GraphLink id={id} company={company} />
      <div className="bg-white shadow-sm rounded-lg p-4 md:p-6 mb-8">
        <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-800">📰 관련 뉴스</h3>
        <div className="space-y-3">
          {news.map((item) => (
            <div key={item.news_id} className="border-b border-gray-100 last:border-0 pb-3">
              <a
                href={item.url}
                target="_blank"
                className={`${item.sentiment === '긍정' ? 'bg-red-50' : 'bg-blue-50'} block ${item.sentiment === '긍정' ? 'hover:bg-red-100' : 'hover:bg-blue-100'
                  } p-3 rounded transition-colors`}
              >
                <h4 className="font-medium text-sm md:text-base text-gray-900 mb-1">{item.title}</h4>
                <p className="text-xs md:text-sm text-gray-600 mb-2">{item.sub_title}</p>
                <div className="flex flex-wrap gap-2">
                  {item.article_text.slice(0, 4).map((keyword, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] md:text-xs px-2 py-0.5 md:py-1 bg-gray-50 text-gray-600 rounded-full"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 