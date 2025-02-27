import { AnimatedSection } from "@/components/news";
import { ChartHeader, PriceSection, TradingInfo } from "@/components/chart";
import { StockInfo } from "@/\btypes";

interface ChartPageProps {
    params: Promise<{ id: string }>;
}

async function getStockInfo(id: string): Promise<StockInfo> {
    const res = await fetch(`http://13.124.216.60:8000/companies/stock-info/${id}`);
    const data = await res.json();

    return data;
    // return {
    //     company_name: "삼성전자",
    //     ticker: "005930",
    //     trading_volume: "234만",
    //     trading_value: "234억",
    //     low_52weeks: "5,000원",
    //     high_52weeks: "200,000원",
    //     change_amount: 1000,
    //     change_percent: 1.37,
    // };
}

async function getStockData(id: string) {
    // const res = await fetch(`https://api.example.com/stock/${id}`);
    // return res.json();
    return {
        stockData: [
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
            },
            {
                "x": "2024-01-11",
                "o": 71400,
                "h": 72000,
                "l": 71200,
                "c": 71800
            },
            {
                "x": "2024-01-12",
                "o": 71500,
                "h": 72200,
                "l": 71300,
                "c": 71900
            },
            {
                "x": "2024-01-15",
                "o": 71600,
                "h": 72300,
                "l": 71400,
                "c": 71900
            }
        ]
    };
}

export default async function ChartPage({ params }: ChartPageProps) {
    const { id } = await params;
    const { company_name, ticker, trading_volume, trading_value, low_52weeks, high_52weeks, change_amount, change_percent } = await getStockInfo(id);
    const { stockData } = await getStockData(id);
    return (
        <main className="bg-fixed bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-6 relative">
                <AnimatedSection delay={0}>
                    <ChartHeader company_name={company_name} ticker={ticker} />
                </AnimatedSection>

                <AnimatedSection delay={1}>
                    <PriceSection
                        change_amount={change_amount}
                        change_percent={change_percent}
                        stockData={stockData}
                    />
                </AnimatedSection>

                <AnimatedSection delay={2}>
                    <TradingInfo
                        trading_volume={trading_volume}
                        trading_value={trading_value}
                        low_52weeks={low_52weeks}
                        high_52weeks={high_52weeks}
                    />
                </AnimatedSection>
            </div>
        </main>
    );
}
