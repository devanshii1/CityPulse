import Link from "next/link";
import { issueCards } from "./mock-data";

const flowSteps = [
  { title: "Notice an issue", text: "Residents spot flooding, debris, road hazards, and other risks close to home." },
  { title: "Report it", text: "A short civic report captures the location, urgency, and risk in a few steps." },
  { title: "AI understands", text: "CityPulse suggests the likely category, severity, and summary for the signal." },
  { title: "Signals cluster", text: "Nearby reports are grouped so one problem becomes a clearer urban issue." },
  { title: "Community stays informed", text: "The issue becomes visible to residents and easier to track as it changes." },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden border border-[#1d3848] bg-[#0b1823] p-5 shadow-[0_20px_60px_rgba(2,12,18,0.48)] md:p-7">
        <div className="absolute inset-0 city-grid opacity-25" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(circle_at_center,rgba(73,214,255,0.12),transparent_58%)]" />

        <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#49d6ff]">
              Live signals
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.06em] text-[#edf3f7] md:text-6xl">
              What’s happening around your city?
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#bfd2dd] md:text-lg">
              CityPulse turns local reports into a live view of civic issues, helping residents see, understand, and track urgent problems across the city.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/report"
                className="border border-[#49d6ff]/60 bg-[#49d6ff] px-5 py-3 text-sm font-semibold text-[#07131d] transition hover:bg-[#71dfff]"
              >
                Report an issue
              </Link>
              <Link
                href="/explore"
                className="border border-[#1d3848] bg-[#102732] px-5 py-3 text-sm font-semibold text-[#edf3f7] transition hover:border-[#2a4c5d] hover:bg-[#122f3d]"
              >
                Explore city map
              </Link>
            </div>
          </div>

          <div className="relative border border-[#1d3848] bg-[#0e1f2b] p-4">
            <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#9fb5c2]">
              <span>City pulse</span>
              <span className="flex items-center gap-2 text-[#4fe0a6]">
                <span className="h-2 w-2 rounded-full bg-[#4fe0a6]" /> Active
              </span>
            </div>

            <div className="relative h-[220px] overflow-hidden border border-[#1d3848] bg-[linear-gradient(180deg,#0c1d2a_0%,#102a39_100%)]">
              <div className="absolute inset-0 city-grid opacity-35" />
              <div className="absolute left-[12%] top-[38%] h-20 w-20 rounded-full border border-[#49d6ff]/30 bg-[#49d6ff]/10" />
              <div className="absolute left-[26%] top-[24%] h-16 w-16 rounded-full border border-[#ffb14a]/40 bg-[#ffb14a]/10" />
              <div className="absolute right-[18%] top-[30%] h-20 w-20 rounded-full border border-[#ff6b5c]/40 bg-[#ff6b5c]/10" />
              <div className="absolute bottom-[16%] left-[52%] h-16 w-16 rounded-full border border-[#4fe0a6]/40 bg-[#4fe0a6]/10" />

              <div className="absolute left-[18%] top-[36%] flex h-3 w-3 items-center justify-center rounded-full bg-[#ffb14a]">
                <span className="pulse-ring absolute h-8 w-8 rounded-full border border-[#ffb14a]/80" />
              </div>
              <div className="absolute left-[46%] top-[30%] flex h-3 w-3 items-center justify-center rounded-full bg-[#ff6b5c]">
                <span className="pulse-ring absolute h-8 w-8 rounded-full border border-[#ff6b5c]/80" />
              </div>
              <div className="absolute right-[22%] top-[38%] flex h-3 w-3 items-center justify-center rounded-full bg-[#49d6ff]">
                <span className="pulse-ring absolute h-8 w-8 rounded-full border border-[#49d6ff]/80" />
              </div>
              <div className="absolute bottom-[20%] left-[58%] flex h-3 w-3 items-center justify-center rounded-full bg-[#4fe0a6]">
                <span className="pulse-ring absolute h-8 w-8 rounded-full border border-[#4fe0a6]/80" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="border border-[#1d3848] bg-[#0f1f2a] p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#9fb5c2]">reported</p>
                <p className="mt-2 text-2xl font-semibold text-[#edf3f7]">24</p>
              </div>
              <div className="border border-[#1d3848] bg-[#0f1f2a] p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#9fb5c2]">critical</p>
                <p className="mt-2 text-2xl font-semibold text-[#ff6b5c]">3</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Flooding", value: "12", tone: "bg-[#ffb14a]/10 text-[#ffb14a]" },
          { label: "Road issues", value: "9", tone: "bg-[#49d6ff]/10 text-[#49d6ff]" },
          { label: "Resolved", value: "8", tone: "bg-[#4fe0a6]/10 text-[#4fe0a6]" },
        ].map((item) => (
          <div key={item.label} className="border border-[#1d3848] bg-[#0d1d29] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#9fb5c2]">{item.label}</p>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-semibold tracking-[-0.05em] text-[#edf3f7]">{item.value}</span>
              <span className={`border px-2 py-1 text-[10px] uppercase tracking-[0.12em] ${item.tone}`}>
                live
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="border border-[#1d3848] bg-[#0d1d29] p-5 md:p-6">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#9fb5c2]">Operational flow</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#edf3f7]">
              From one report to a citywide signal
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {flowSteps.map((step, index) => (
            <div key={step.title} className="border border-[#1d3848] bg-[#102734] p-4">
              <div className="mb-4 flex h-8 w-8 items-center justify-center border border-[#49d6ff]/40 bg-[#49d6ff]/10 text-sm font-semibold text-[#49d6ff]">
                {index + 1}
              </div>
              <h3 className="text-base font-semibold text-[#edf3f7]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#bfd2dd]">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-[#1d3848] bg-[#0d1d29] p-5 md:p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#9fb5c2]">Live issues</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#edf3f7]">
              Community signals
            </h2>
          </div>
          <Link href="/explore" className="text-sm font-medium text-[#49d6ff] hover:text-[#71dfff]">
            View all
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {issueCards.map((issue) => (
            <div key={issue.id} className="border border-[#1d3848] bg-[#102734] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#9fb5c2]">{issue.category}</p>
                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[#edf3f7]">{issue.title}</h3>
                </div>
                <span className="border border-[#ffb14a]/40 bg-[#ffb14a]/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[#ffb14a]">
                  {issue.status.replace("_", " ")}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#bfd2dd]">{issue.summary}</p>

              <div className="mt-4 flex items-center justify-between text-sm text-[#bfd2dd]">
                <span>📍 {issue.location}</span>
                <span>{issue.reports} reports</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
