import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch(() => setApiMessage("Could not reach the API route."));
  }, []);

  return (
    <section className="text-center">
      <h1 className="text-4xl font-bold mb-4">Data Fetching &amp; API Routes</h1>
      <p className="text-lg text-slate-600 mb-6">
        A Next.js app practicing SSG, SSR, CSR with SWR, and custom API
        routes.
      </p>
      <p className="inline-block rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-amber-800 mb-8">
        {apiMessage || "Loading message from /api/hello ..."}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/products"
          className="px-5 py-2 bg-amber-500 text-white rounded hover:bg-amber-400"
        >
          Browse Products (SSG)
        </Link>
        <Link
          href="/dashboard"
          className="px-5 py-2 bg-slate-900 text-white rounded hover:bg-slate-700"
        >
          Open Dashboard (CSR)
        </Link>
      </div>
    </section>
  );
}
