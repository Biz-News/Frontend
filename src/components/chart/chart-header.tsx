interface ChartHeaderProps {
  company_name: string;
  ticker: string;
}

export function ChartHeader({ company_name, ticker }: ChartHeaderProps) {
  return (
    <div className="mb-4">
      <h1 className="text-xl font-bold mb-1">{company_name}</h1>
      <p className="text-gray-500 text-xs">{ticker}</p>
    </div>
  );
} 