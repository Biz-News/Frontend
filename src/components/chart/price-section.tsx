interface PriceSectionProps {
  currentPrice: string;
  priceChange: string;
  changeRate: string;
}

export function PriceSection({ currentPrice, priceChange, changeRate }: PriceSectionProps) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm mb-4">
      <div className="mb-3">
        <div className="text-2xl font-bold mb-1">{currentPrice}원</div>
        <div className={`text-base ${priceChange.startsWith('+') ? 'text-red-500' : 'text-blue-500'}`}>
          {priceChange}원 ({changeRate})
        </div>
      </div>
      {/* 임시 차트 박스 */}
      <div className="w-full h-72 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-400 text-sm">차트가 들어갈 영역</p>
      </div>
    </div>
  );
} 