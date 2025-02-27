import Link from "next/link";

interface Company {
  id: number;
  name: string;
}

interface RelatedCompaniesProps {
  companies: Company[];
}

export function RelatedCompanies({ companies }: RelatedCompaniesProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {companies.map((company) => (
        <Link
          key={company.id}
          href={`/news/${company.id}`}
          className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          {company.name}
        </Link>
      ))}
    </div>
  );
} 