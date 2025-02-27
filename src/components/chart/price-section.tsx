import { StockChart } from "./stock-chart";

interface PriceSectionProps {
  currentPrice: string;
  priceChange: string;
  changeRate: string;
  stockData: {
    x: string;
    o: number;
    h: number;
    l: number;
    c: number;
  }[];
}

export function PriceSection({ currentPrice, priceChange, changeRate, stockData }: PriceSectionProps) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm mb-4">
      <div className="mb-3">
        <div className="text-2xl font-bold mb-1">{currentPrice}원</div>
        <div className={`text-base ${priceChange.startsWith('+') ? 'text-red-500' : 'text-blue-500'}`}>
          {priceChange}원 ({changeRate})
        </div>
      </div>
      <StockChart data={stockData} />
    </div>
  );
} 