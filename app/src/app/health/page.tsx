import { cacheLife } from "next/cache";

export default async function HealthPage() {
  "use cache";
  cacheLife("minutes");

  let data: unknown;
  let status = "Healthy";

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    if (!response.ok) {
      throw new Error("Health-check request failed");
    }

    data = await response.json();
  } catch {
    status = "Data fetch failed";
    data = { message: "Unable to retrieve sample data." };
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold">Health Check</h1>
      <p className="mt-4">Status: {status}</p>
      <pre className="mt-6 overflow-auto rounded-xl bg-slate-100 p-4 text-sm text-slate-900">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
