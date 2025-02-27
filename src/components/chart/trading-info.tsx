interface TradingInfoProps {
  trading_volume: string;
  trading_value: string;
  low_52weeks: string;
  high_52weeks: string;
}

export function TradingInfo({
  trading_volume,
  trading_value,
  low_52weeks,
  high_52weeks
}: TradingInfoProps) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h2 className="text-base font-bold mb-3">거래 정보</h2>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-gray-500 text-xs mb-1">거래량</p>
          <p className="text-sm font-medium">{trading_volume}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">거래대금</p>
          <p className="text-sm font-medium">{trading_value}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">52주 최고</p>
          <p className="text-sm font-medium">{high_52weeks}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">52주 최저</p>
          <p className="text-sm font-medium">{low_52weeks}</p>
        </div>
      </div>
    </div>
  );
} 