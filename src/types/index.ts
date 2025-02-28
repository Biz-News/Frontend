export interface CompanyInfo {
    company_id: string;
    company: string;
    company_name_en?: string;
    representative_name?: string;
    business_registration_number?: string;
    address?: string;
    phone_number?: string;
    fax_number?: string;
    homepage_url?: string;
    standard_industry_classification?: string;
    main_business?: string;
    establishment_date?: string;
    kosdaq_listed_date?: string;
    employee_count?: number;
    logo_image?: string;
}

export interface RelatedCompany {
    company_id: string;
    company: string;
    related_companies:
    {
        company_id: string;
        company: string;
    }[]
}

export interface Keywords {
    keywords: {
        keyword: string;
        keyword_id: string;
    }[]
}

export interface NewsId {
    news_id: string[];
}

export interface NewsSentiment {
    news: {
        news_id: string;
        title: string;
        sub_title: string;
        url: string;
        article_text: string[];
        sentiment: '긍정' | '부정';
        date: string;
    }[]
}

export interface Summary {
    title: string;
    content: string;
}

export interface StockInfo {
    company_name: string;
    ticker: string;
    trading_volume: string;
    trading_value: string;
    low_52weeks: string;
    high_52weeks: string;
    change_amount: number;
    change_percent: number;
}