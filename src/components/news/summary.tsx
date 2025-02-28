export interface SummaryProps {
    description: string;
    type: string;
}

export function Summary({
    description,
    type
}: SummaryProps) {
    const color = type === '긍정' ? 'text-rose-600' : 'text-blue-600';
    const emoji = type === '긍정' ? '😊' : '😢';
    const bgColor = type === '긍정' ? 'bg-rose-50' : 'bg-blue-50';
    return (
        <div className="mb-4 md:mb-6 w-full">
            <h2 className={`${color} text-sm md:text-base leading-6 md:leading-7 
            py-2 md:py-3 px-3 md:px-5 ${bgColor} rounded-md
            shadow-sm hover:shadow-md transition-all duration-200`}>
                {emoji} {description}
            </h2>
        </div>
    )
}