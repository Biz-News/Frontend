import { SearchBar } from "@/components/search-bar";

export default async function Home() {
  const res = await fetch("http://13.124.216.60/api/status");

  const data = await res.text();
  console.log(data);

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full flex flex-col items-center pt-32 md:pt-40 gap-8 px-4">
        <img
          src="/BIZNEWS.svg"
          alt="BIZNEWS"
          className="w-40 md:w-56 h-40 md:h-56"
        />
        <SearchBar />
      </div>
    </main>
  );
}
