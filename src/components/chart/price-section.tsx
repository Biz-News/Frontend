import { StockChart } from "./stock-chart";

interface PriceSectionProps {
    change_amount: number;
    change_percent: number;
    stockData: {
        x: string;
        o: number;
        h: number;
        l: number;
        c: number;
  }[];
}

export function PriceSection({ 
  change_amount,
  change_percent,
  stockData 
}: PriceSectionProps) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm mb-4">
      <div className="mb-3">
        <div className="text-2xl font-bold mb-1">{stockData[stockData.length - 1].c}원</div>
        <div className={`text-base ${change_amount >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
          {change_amount >= 0 ? '+' : ''}{change_amount}원 ({change_percent}%)
        </div>
      </div>

      <StockChart data={stockData} />
    </div>
  );
} 