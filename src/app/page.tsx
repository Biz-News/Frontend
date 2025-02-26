export default async function Home() {
  const res = await fetch("http://13.124.216.60/api/status");

  const data = await res.text();
  console.log(data);

  return (
    <main className="py-6">
      <div>테스트</div>
    </main>
  );
}
