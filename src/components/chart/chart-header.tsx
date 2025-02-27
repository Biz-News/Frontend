interface ChartHeaderProps {
  company: string;
  stockCode: string;
}

export function ChartHeader({ company, stockCode }: ChartHeaderProps) {
  return (
    <div className="mb-4">
      <h1 className="text-xl font-bold mb-1">{company}</h1>
      <p className="text-gray-500 text-xs">{stockCode}</p>
    </div>
  );
} 