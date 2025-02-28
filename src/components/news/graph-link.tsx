import Link from "next/link";

interface GraphLinkProps {
  id: string;
  company: string;
}

export function GraphLink({ id, company }: GraphLinkProps) {
  return (
    <Link 
      href={`/news/${id}/graph?company=${company}`}
      className="flex items-center justify-end gap-1 text-gray-500 text-xs my-2 hover:text-gray-700 transition-colors"
    >
      <svg 
        className="w-3 h-3" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
      <span>
        관계망 그래프 보러가기
      </span>
    </Link>
  );
}