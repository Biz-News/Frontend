'use client';

import { Autocomplete, TextField } from '@mui/material';
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  companyList: {
    id: number;
    name: string;
  }[];
}

export function SearchBar({ companyList }: SearchBarProps) {
  const router = useRouter();

  const options = companyList.map((company) => ({
    label: company.name,
    id: company.id,
  }));

  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{
        width: '100%',
        maxWidth: '600px',
        '& .MuiOutlinedInput-root': {
          height: '45px',
          borderRadius: '25px',
          backgroundColor: 'white',
          fontSize: '0.9rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9d0021',  // 어두운 로즈색 테두리
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9d0021',  // 호버 시에도 같은 색상 유지
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9d0021',  // 포커스 시에도 같은 색상 유지
          },
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
          '&.Mui-focused': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          }
        },
        '& .MuiAutocomplete-input': {
          padding: '0 14px !important',
        },
        '& .MuiAutocomplete-listbox': {
          fontSize: '0.9rem',
          '& .MuiAutocomplete-option': {
            padding: '8px 16px',
          }
        },
        '& .MuiAutocomplete-paper': {
          marginTop: '4px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
        '& .MuiAutocomplete-popupIndicator': {
          color: '#9d0021'  // 화살표 색상
        },
        '& .MuiAutocomplete-popupIndicator:hover': {
          color: '#9d0021'  // 호버 시 색상
        },
      }}
      renderInput={(params) => (
        <TextField 
          {...params} 
          placeholder="기업명을 입력하세요" 
          sx={{ 
            input: { fontSize: '0.9rem' }
          }}
        />
      )}
      onChange={(event, newValue) => {
        console.log(newValue);
        router.push(`/news/${newValue?.id}`);
      }}
    />
  );
}