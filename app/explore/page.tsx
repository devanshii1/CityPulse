import Link from "next/link";
import { issueCards } from "../mock-data";

const statusStyles: Record<string, string> = {
  reported: "border border-[#ffb14a]/40 bg-[#ffb14a]/10 text-[#ffb14a]",
  verified: "border border-[#49d6ff]/40 bg-[#49d6ff]/10 text-[#49d6ff]",
  in_progress: "border border-[#9b8cff]/40 bg-[#9b8cff]/10 text-[#d7d0ff]",
  resolved: "border border-[#4fe0a6]/40 bg-[#4fe0a6]/10 text-[#4fe0a6]",
  reopened: "border border-[#ff6b5c]/40 bg-[#ff6b5c]/10 text-[#ff6b5c]",
};

const severityColors: Record<number, string> = {
  1: "border border-[#c4d2db]/20 bg-[#dfeaf0]/10 text-[#dfeaf0]",
  2: "border border-[#49d6ff]/30 bg-[#49d6ff]/10 text-[#49d6ff]",
  3: "border border-[#ffb14a]/30 bg-[#ffb14a]/10 text-[#ffb14a]",
  4: "border border-[#ff8a66]/30 bg-[#ff8a66]/10 text-[#ff8a66]",
  5: "border border-[#ff6b5c]/30 bg-[#ff6b5c]/10 text-[#ff6b5c]",
};

export default function ExplorePage() {
  return (
    <div className="space-y-6">
      <section className="border border-[#1d3848] bg-[#0b1823] p-5 shadow-[0_18px_60px_rgba(2,11,18,0.42)] md:p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#49d6ff]">
              City map
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.05em] text-[#edf3f7] md:text-4xl">
              Urban issue map
            </h1>
          </div>
          <div className="flex items-center gap-2 border border-[#1d3848] bg-[#112734] px-3 py-2 text-sm text-[#bfd2dd]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4fe0a6]" />
            24 active this week
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="border border-[#1d3848] bg-[#0d1d29] p-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full max-w-md border border-[#1d3848] bg-[#102734] px-4 py-3 text-sm text-[#9fb5c2]">
              Search by location or issue type
            </div>
            <button className="border border-[#49d6ff]/40 bg-[#49d6ff] px-4 py-2 text-sm font-semibold text-[#07131d] hover:bg-[#71dfff]">
              Filter
            </button>
          </div>

          <div className="relative h-[430px] overflow-hidden border border-[#1d3848] bg-[radial-gradient(circle_at_30%_20%,rgba(73,214,255,0.12),transparent_20%),radial-gradient(circle_at_70%_60%,rgba(79,224,166,0.12),transparent_18%),linear-gradient(135deg,#0d1d29,#122734_35%,#0b1823)]">
            <div className="absolute inset-0 city-grid opacity-25" />

            <div className="absolute left-[18%] top-[24%] h-28 w-28 rounded-full border border-dashed border-[#9fb5c2]/60" />
            <div className="absolute right-[20%] top-[18%] h-20 w-20 rounded-full border border-dashed border-[#9fb5c2]/60" />
            <div className="absolute bottom-[16%] left-[28%] h-28 w-28 rounded-full border border-dashed border-[#9fb5c2]/60" />
            <div className="absolute bottom-[18%] right-[24%] h-24 w-24 rounded-full border border-dashed border-[#9fb5c2]/60" />

            <div className="absolute left-[22%] top-[28%] flex h-4 w-4 items-center justify-center rounded-full bg-[#ffb14a]">
              <span className="pulse-ring absolute h-10 w-10 rounded-full border border-[#ffb14a]/80" />
              <span className="text-[10px] font-bold text-[#07131d]">4</span>
            </div>
            <div className="absolute left-[46%] top-[40%] flex h-4 w-4 items-center justify-center rounded-full bg-[#ff6b5c]">
              <span className="pulse-ring absolute h-10 w-10 rounded-full border border-[#ff6b5c]/80" />
              <span className="text-[10px] font-bold text-[#edf3f7]">2</span>
            </div>
            <div className="absolute right-[22%] top-[52%] flex h-4 w-4 items-center justify-center rounded-full bg-[#49d6ff]">
              <span className="pulse-ring absolute h-10 w-10 rounded-full border border-[#49d6ff]/80" />
              <span className="text-[10px] font-bold text-[#07131d]">6</span>
            </div>
            <div className="absolute left-[58%] bottom-[18%] flex h-4 w-4 items-center justify-center rounded-full bg-[#4fe0a6]">
              <span className="pulse-ring absolute h-10 w-10 rounded-full border border-[#4fe0a6]/80" />
              <span className="text-[10px] font-bold text-[#07131d]">3</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#bfd2dd]">
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#ffb14a]"/> Active</div>
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#49d6ff]"/> Verified</div>
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#9b8cff]"/> In progress</div>
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#4fe0a6]"/> Resolved</div>
          </div>
        </section>

        <aside className="space-y-3">
          {issueCards.map((issue) => (
            <Link
              key={issue.id}
              href="/"
              className="block border border-[#1d3848] bg-[#0d1d29] p-3.5 transition hover:border-[#2a4c5d] hover:bg-[#102734]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9fb5c2]">
                    {issue.category}
                  </p>
                  <h2 className="mt-2 text-base font-semibold tracking-[-0.03em] text-[#edf3f7]">{issue.title}</h2>
                </div>
                <span className={`shrink-0 px-2 py-1 text-[10px] uppercase tracking-[0.12em] ${statusStyles[issue.status]}`}>
                  {issue.status.replace("_", " ")}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-[#bfd2dd]">
                <span>📍 {issue.location}</span>
                <span className="text-[#5e7a89]">•</span>
                <span>{issue.reports} reports</span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className={`px-2 py-1 text-[10px] uppercase tracking-[0.12em] ${severityColors[issue.severity]}`}>
                  Severity {issue.severity}/5
                </span>
                <span className="text-[11px] text-[#9fb5c2]">Updated {issue.updated}</span>
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
}
