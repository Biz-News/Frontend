import { SearchBar } from "@/components/search-bar";


async function getCompanyList() {
   const res = await fetch("http://13.124.216.60:8080/companies");
   const data = await res.json();

   return data;

  return [
    {
      id: 1,
      name: "삼성전자",
    },
    {
      id: 2,
      name: "현대차",
    },
    {
      id: 3,
      name: "LG전자",
    },
    {
      id: 4,
      name: "SK하이닉스",
    },
    {
      id: 5,
      name: "카카오",
    },
    {
      id: 6,
      name: "네이버",
    },
    {
      id: 7,
      name: "카카오톡",
    },
  ];
}

export default async function Home() {
  const companyList = await getCompanyList();

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full flex flex-col items-center pt-32 md:pt-40 gap-8 px-4">
        <img
          src="/BIZNEWS.svg"
          alt="BIZNEWS"
          className="w-40 md:w-56 h-40 md:h-56"
        />
        <SearchBar companyList={companyList} />
      </div>
    </main>
  );
}
