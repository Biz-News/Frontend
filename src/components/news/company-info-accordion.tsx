import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface NewsProps {
  company: string;
  image: string;
}

export function CompanyInfoAccordion({ company, image }: NewsProps) {
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
                src={image} 
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
        <div className="prose max-w-none">
          <p className="text-gray-600">
            펼쳐질 내용
          </p>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}