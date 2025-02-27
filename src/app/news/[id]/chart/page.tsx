import { AnimatedSection } from "@/components/news";
import { ChartHeader, PriceSection, TradingInfo } from "@/components/chart";

interface ChartPageProps {
    params: Promise<{ id: string }>;
}

async function getCompanyInfo(id: string) {
    // const res = await fetch(`https://api.example.com/company/${id}`);
    // return res.json();
    return {
        id,
        company: "삼성전자",
        stockCode: "005930",
        currentPrice: "73,800",
        priceChange: "+1,000",
        changeRate: "+1.37%",
    };
}

export default async function ChartPage({ params }: ChartPageProps) {
    const { id } = await params;
    const { company, stockCode, currentPrice, priceChange, changeRate } = await getCompanyInfo(id);

    return (
        <main className="bg-fixed bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-6 relative">
                <AnimatedSection delay={0}>
                    <ChartHeader company={company} stockCode={stockCode} />
                </AnimatedSection>

                <AnimatedSection delay={1}>
                    <PriceSection
                        currentPrice={currentPrice}
                        priceChange={priceChange}
                        changeRate={changeRate}
                    />
                </AnimatedSection>

                <AnimatedSection delay={2}>
                    <TradingInfo />
                </AnimatedSection>
            </div>
        </main>
    );
}
