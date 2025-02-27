'use client';

import { Keywords } from "@/\btypes";


export function Keyword({ keywords }: Keywords) {
  const getFontSize = (index: number): number => {
    const sizes = [28, 24, 22, 20, 19, 18, 17, 16, 15, 14];
    return sizes[index] || 14;
  };

  const colors: string[] = [
    '#FF9999', '#FF99CC', '#9999FF', 
    '#99CCFF', '#FFB6C1', '#E6E6FA',
    '#FFB6C1', '#DDA0DD', '#B0E0E6'
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 md:p-6 mb-8">
      <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-800">
      🖍️ 주요 키워드
      </h3>
      <div className="flex flex-wrap gap-3 justify-center items-center p-4">
        {keywords.slice(0, 10).map((keyword, index) => (
          <div
            key={keyword.keyword_id}
            className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <span
              className="inline-block break-keep whitespace-nowrap"
              style={{
                fontSize: `${getFontSize(index)}px`,
                color: colors[index % colors.length],
                fontWeight: 600,
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              {keyword.keyword}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}