"use client";

import { useEffect, useState } from "react";

// const GRAPHQL_URL = "https://test-kappa-teal-60.vercel.app/api/graphql";
const GRAPHQL_URL = "/api/graphql";

export default function Home() {
  const [queryMessage, setQueryMessage] = useState("");
  const [mutationMessage, setMutationMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function runQuery() {
    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            test
          }
        `,
      }),
    });

    const json = await res.json();
    setQueryMessage(json.data.test);
  }

  async function runMutation() {
    setLoading(true);

    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            sayHello(name: "Munkhorgil")
          }
        `,
      }),
    });

    const json = await res.json();
    setMutationMessage(json.data.sayHello);
    setLoading(false);
  }

  useEffect(() => {
    runQuery();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="w-95 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl">
        <p className="text-sm text-slate-400">
          Frontend-аас дуудсан GraphQL Query Result
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          {queryMessage || "Loading..."}
        </h1>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-sm text-slate-400">
            Frontend-аас дуудсан GraphQL Mutation Result
          </p>

          <button
            onClick={runMutation}
            disabled={loading}
            className="mt-4 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Run Mutation"}
          </button>

          {mutationMessage && (
            <h2 className="mt-4 text-2xl font-bold text-emerald-300">
              {mutationMessage}
            </h2>
          )}
        </div>
      </div>
    </main>
  );
}
