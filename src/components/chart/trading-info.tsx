export function TradingInfo() {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h2 className="text-base font-bold mb-3">거래 정보</h2>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-gray-500 text-xs mb-1">거래량</p>
          <p className="text-sm font-medium">12,345,678</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">거래대금</p>
          <p className="text-sm font-medium">9,876억원</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">52주 최고</p>
          <p className="text-sm font-medium">82,000원</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">52주 최저</p>
          <p className="text-sm font-medium">65,000원</p>
        </div>
      </div>
    </div>
  );
} 