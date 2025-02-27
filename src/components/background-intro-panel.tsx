export default function BackgroundIntroPanel() {
  return (
    <div className="w-full px-4 md:pl-8 absolute left-0 md:left-10 top-1/2 -translate-y-1/2">
      <div className="space-y-3">
        <div className="animate-float flex justify-center md:justify-start">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-40 md:w-56 h-40 md:h-56 svg-draw"
          />
        </div>
        <div className="relative inline-block w-full md:w-auto">
          <h1 className="text-xl md:text-2xl font-bold text-[#0a0101] mb-2 text-center md:text-left">
            내가 원하는 기업 뉴스를 한번에!
          </h1>
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-400 to-blue-200 rounded-full"></div>
        </div>
        <div className="space-y-2 mt-4 text-center md:text-left">
          <p className="text-sm text-gray-600 font-medium">
            주식 투자자, 맞춤형 기업 뉴스 필요하세요?
          </p>
          <p className="text-sm text-gray-500">
            방대한 뉴스 속에서 핵심 정보가 필요하신가요?
          </p>
          <p className="text-sm text-gray-500">
            뉴스 비교 분석 시간이 부족하시다고요?
          </p>
        </div>
      </div>
    </div>
  )
}