import { AnimatedSection } from "@/components/news";
import { ChartHeader, PriceSection, TradingInfo } from "@/components/chart";
import { StockInfo } from "@/\btypes";

interface ChartPageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{
        ticker: string;
    }>;
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

async function getStockData(ticker: string, period: string = '123') {
    // @app.get("/companies/stock-info/{ticker}/chart/{days}")
    const res = await fetch(`http://13.124.216.60:8000/companies/stock-info/${ticker}/chart/${period}`);
    const data = await res.json();
    console.log(data, "여기여기 주가 차트");
    return data;
}



export default async function ChartPage({ params, searchParams }: ChartPageProps) {
    const { id } = await params;
    const { ticker } = await searchParams;
    
    const { company_name, trading_volume, trading_value, low_52weeks, high_52weeks, change_amount, change_percent } = await getStockInfo(id);
    const { stockData } = await getStockData(ticker);

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
