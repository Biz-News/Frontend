import { Summary, SummaryProps } from "./summary";

interface NewsSummaryProps {
  company: string;
  summary: SummaryProps[];
}

export function NewsSummary({ company, summary }: NewsSummaryProps) {
  return (
    <div className="w-full max-w-3xl mx-auto p-2 md:p-4">
      <h2 className="text-lg md:text-xl font-bold mb-2 text-center">
        {company} 뉴스 요약
      </h2>
      <div className="w-2/3 h-0.5 bg-rose-800 mx-auto mb-4 md:mb-6"></div>
      <div className="space-y-3 md:space-y-4 ">
        {summary.map((item, index) => (
          <Summary key={index} description={item.description} type={item.type} />
        ))}
      </div>
    </div>
  );
}