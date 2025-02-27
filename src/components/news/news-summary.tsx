interface NewsSummaryProps {
  title: string;
  content: string;
}

export function NewsSummary({ title, content }: NewsSummaryProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 md:p-6 mb-8">
      <div className="min-h-[200px] w-full max-w-3xl mx-auto p-2 md:p-4">
        <h2 className="text-base md:text-lg font-bold mb-2 text-center break-keep tracking-tight 
        leading-normal md:leading-relaxed whitespace-pre-line 
        flex items-center justify-center">
          {title}
        </h2>
        <div className="w-2/3 h-0.5 bg-rose-800 mx-auto mb-3 md:mb-4"></div>
        <div className="space-y-2 md:space-y-3 text-sm md:text-base break-keep leading-relaxed tracking-tight">
          {content}
        </div>
      </div>
    </div>
  );
}