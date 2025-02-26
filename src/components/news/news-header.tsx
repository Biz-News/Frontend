interface NewsHeaderProps {
  company: string;
}

export function NewsHeader({ company }: NewsHeaderProps) {
  return (
    <div className="border-b-2 border-gray-900 pb-4 mb-8">
      <h1 className="font-serif text-2xl md:text-4xl text-center font-bold mb-2">
        {company} 뉴스
      </h1>
      <p className="text-gray-600 text-center text-xs md:text-sm">
        {new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
    </div>
  );
} 