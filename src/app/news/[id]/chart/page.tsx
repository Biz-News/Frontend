import {
    CompanyInfoAccordion,
    NewsSummary,
    NewsHeader,
    RelatedNews,
    Keyword,
    RelatedCompanies
} from "@/components/news";

interface ChartProps {
    params: Promise<{ id: string }>;
}

async function getChart(id: string) {
    // const res = await fetch(`https://api.example.com/news/${id}`);
    // return res.json();
    return {
        data: "chart"
    }
}


export default async function Chart({ params }: ChartProps) {
    const { id } = await params;
    const { data } = await getChart(id);

    return (
        <main className="bg-fixed bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8 relative">
                {data}
            </div>
        </main>
    );
}
