import Link from "next/link";

interface RelatedCompany {
  company_id: string;
  company: string;
}

interface RelatedCompaniesProps {
  companies: RelatedCompany[];
}

export function RelatedCompanies({ companies }: RelatedCompaniesProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {companies.map((company) => (
        <Link
          key={company.company_id}
          href={`/news/${company.company_id}`}
          className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          {company.company}
        </Link>
      ))}
    </div>
  );
} 