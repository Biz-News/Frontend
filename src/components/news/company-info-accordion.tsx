import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CompanyInfo } from '@/\btypes';

interface NewsProps {
  companyInfo: CompanyInfo;
}

export function CompanyInfoAccordion({ companyInfo }: NewsProps) {
  const { 
    company, 
    logo_image,
    company_name_en,
    representative_name,
    business_registration_number,
    address,
    phone_number,
    fax_number,
    homepage_url,
    standard_industry_classification,
    main_business,
    establishment_date,
    kosdaq_listed_date,
    employee_count
  } = companyInfo;

  const infoItems = [
    { label: '영문명', value: company_name_en },
    { label: '대표자명', value: representative_name },
    { label: '사업자등록번호', value: business_registration_number },
    { label: '주소', value: address },
    { label: '전화번호', value: phone_number },
    { label: '팩스번호', value: fax_number },
    { label: '홈페이지', value: homepage_url, isLink: true },
    { label: '표준산업분류', value: standard_industry_classification },
    { label: '주요사업', value: main_business },
    { label: '설립일', value: establishment_date },
    { label: '코스닥상장일', value: kosdaq_listed_date },
    { label: '직원수', value: employee_count ? `${employee_count.toLocaleString()}명` : null },
  ];

  return (
    <Accordion 
      sx={{
        width: '100%',
        boxShadow: 'none',
        '&:before': { display: 'none' }, 
        backgroundColor: 'transparent',
        '& .MuiAccordionSummary-root': {
          flexDirection: 'column',
          minHeight: 'auto',
          padding: '16px',
          '& .MuiAccordionSummary-content': {
            margin: 0,
          },
          '& .MuiAccordionSummary-expandIconWrapper': {
            marginTop: '8px', 
          }
        },
        '& .MuiAccordionDetails-root': {
          padding: '0 16px 16px',
        }
      }}
    >
      <AccordionSummary 
        expandIcon={
          <ExpandMoreIcon sx={{ 
            color: '#2B3A85',
            transition: 'transform 0.3s ease',
            fontSize: '2rem',
          }} />
        }
        sx={{
          '&.Mui-expanded': {
            minHeight: 'auto',
          }
        }}
      >
        <div className="w-full">
          <div className="flex items-center gap-4 mb-2">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
              <img 
                src={logo_image} 
                alt={company} 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-lg font-semibold text-[#010308]">
              {company}
            </h1>
          </div>
          <p className="text-xs text-gray-400 text-center mt-1">
            더 자세한 기업 정보가 궁금하다면?
          </p>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="space-y-2.5">
          {infoItems.map((item, index) => (
            item.value && (
              <div key={index} className="flex items-center border-b border-gray-100 pb-2 last:border-b-0">
                <span className="text-xs font-semibold text-gray-600 w-28 flex-shrink-0">
                  {item.label}
                </span>
                {item.isLink ? (
                  <a 
                    href={item.value as string} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-[11px] text-gray-500">{item.value}</span>
                )}
              </div>
            )
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}