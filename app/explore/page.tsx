"use client";

import dynamic from "next/dynamic";

const IssueMap = dynamic(() => import("@/components/issue-map"), {
  ssr: false,
});

export default function ExplorePage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
          CityPulse Explore
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">
          Civic issues near you
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Select a marker to view issue details.
        </p>
      </header>
      <section className="min-h-0 flex-1 p-3 sm:p-6">
        <div className="h-[calc(100vh-11rem)] min-h-96 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <IssueMap />
        </div>
      </section>
    </main>
  );
}
