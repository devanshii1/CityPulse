import { reports } from "../mock-data";

const statusStyles: Record<string, string> = {
  reported: "border border-[#ffb14a]/40 bg-[#ffb14a]/10 text-[#ffb14a]",
  verified: "border border-[#49d6ff]/40 bg-[#49d6ff]/10 text-[#49d6ff]",
  in_progress: "border border-[#9b8cff]/40 bg-[#9b8cff]/10 text-[#d7d0ff]",
  resolved: "border border-[#4fe0a6]/40 bg-[#4fe0a6]/10 text-[#4fe0a6]",
  reopened: "border border-[#ff6b5c]/40 bg-[#ff6b5c]/10 text-[#ff6b5c]",
};

const statusFlow = ["Reported", "Verified", "In progress", "Resolved"];

export default function MyReportsPage() {
  return (
    <div className="space-y-6">
      <section className="border border-[#1d3848] bg-[#0b1823] p-6 shadow-[0_18px_60px_rgba(2,11,18,0.42)] md:p-8">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#49d6ff]">My reports</p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1 className="text-3xl font-semibold tracking-[-0.05em] text-[#edf3f7] md:text-4xl">
            Civic activity
          </h1>
          <div className="border border-[#1d3848] bg-[#102734] px-4 py-2 text-sm text-[#bfd2dd]">
            12 reports submitted
          </div>
        </div>
      </section>

      <div className="grid gap-5">
        {reports.map((report) => (
          <article key={report.id} className="border border-[#1d3848] bg-[#0d1d29] p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="border border-[#1d3848] bg-[#102734] px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-[#9fb5c2]">
                    {report.category}
                  </span>
                  <span className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] ${statusStyles[report.status]}`}>
                    {report.status.replace("_", " ")}
                  </span>
                </div>
                <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#edf3f7]">{report.title}</h2>
              </div>

              <div className="border border-[#1d3848] bg-[#102734] px-3 py-2 text-sm text-[#bfd2dd]">
                Severity {report.severity}/5
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#9fb5c2]">
              <span>📍 {report.location}</span>
              <span>🗓 Submitted {report.submitted}</span>
              <span>👥 3 community reports</span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {statusFlow.map((step, index) => {
                const isActive =
                  (report.status === "reported" && index === 0) ||
                  (report.status === "verified" && index <= 1) ||
                  (report.status === "in_progress" && index <= 2) ||
                  (report.status === "resolved" && index <= 3) ||
                  (report.status === "reopened" && index <= 1);

                return (
                  <div key={step} className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-[10px] uppercase tracking-[0.12em] ${isActive ? "border border-[#49d6ff]/40 bg-[#49d6ff]/10 text-[#49d6ff]" : "border border-[#1d3848] bg-[#102734] text-[#7893a0]"}`}>
                      {step}
                    </span>
                    {index < statusFlow.length - 1 && <span className="text-[#5e7a89]">→</span>}
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-sm leading-6 text-[#bfd2dd]">{report.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
