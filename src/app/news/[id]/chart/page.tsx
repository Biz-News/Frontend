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
        "stockData": [
            {
              "x": "2024-01-01",
              "o": 68000,
              "h": 69500,
              "l": 67800,
              "c": 69000
            },
            {
              "x": "2024-01-02",
              "o": 69200,
              "h": 70100,
              "l": 68900,
              "c": 69800
            },
            {
              "x": "2024-01-03",
              "o": 69900,
              "h": 71200,
              "l": 69500,
              "c": 70500
            },
            {
              "x": "2024-01-04",
              "o": 70600,
              "h": 72000,
              "l": 70400,
              "c": 71800
            },
            {
              "x": "2024-01-05",
              "o": 71900,
              "h": 72500,
              "l": 71000,
              "c": 71200
            },
            {
              "x": "2024-01-08",
              "o": 71000,
              "h": 71800,
              "l": 70200,
              "c": 70500
            },
            {
              "x": "2024-01-09",
              "o": 70400,
              "h": 70900,
              "l": 69800,
              "c": 70200
            },
            {
              "x": "2024-01-10",
              "o": 70300,
              "h": 71500,
              "l": 70100,
              "c": 71300
            }
          ]
    };
}

export default async function ChartPage({ params }: ChartPageProps) {
    const { id } = await params;
    const { company, stockCode, currentPrice, priceChange, changeRate, stockData } = await getCompanyInfo(id);

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
                        stockData={stockData}
                    />
                </AnimatedSection>

                <AnimatedSection delay={2}>
                    <TradingInfo />
                </AnimatedSection>
            </div>
        </main>
    );
}
