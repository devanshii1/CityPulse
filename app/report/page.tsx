export default function ReportPage() {
  const aiSteps = [
    "REPORT RECEIVED",
    "AI ANALYZING",
    "CATEGORY SUGGESTED",
    "SEVERITY ESTIMATED",
    "USER REVIEWS",
    "SUBMIT",
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="border border-[#1d3848] bg-[#0d1d29] p-6 md:p-8">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#49d6ff]">
          Report an issue
        </p>
        <h1 className="text-3xl font-semibold tracking-[-0.05em] text-[#edf3f7]">Your report</h1>

        <div className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#cfe2eb]">Issue title</label>
            <input
              className="w-full border border-[#1d3848] bg-[#102734] px-4 py-3 text-[#edf3f7] outline-none transition focus:border-[#49d6ff]/60"
              placeholder="Example: Flooded alley behind the market"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#cfe2eb]">Description</label>
            <textarea
              rows={5}
              className="w-full border border-[#1d3848] bg-[#102734] px-4 py-3 text-[#edf3f7] outline-none transition focus:border-[#49d6ff]/60"
              placeholder="Describe the problem, when it started, and any safety concerns..."
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#cfe2eb]">Location</label>
              <input
                className="w-full border border-[#1d3848] bg-[#102734] px-4 py-3 text-[#edf3f7] outline-none transition focus:border-[#49d6ff]/60"
                placeholder="Street name or landmark"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#cfe2eb]">Category</label>
              <select className="w-full border border-[#1d3848] bg-[#102734] px-4 py-3 text-[#edf3f7] outline-none transition focus:border-[#49d6ff]/60">
                <option>Waterlogging</option>
                <option>Flooding</option>
                <option>Pothole</option>
                <option>Road block</option>
                <option>Garbage</option>
                <option>Streetlight</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#cfe2eb]">Severity</label>
              <select className="w-full border border-[#1d3848] bg-[#102734] px-4 py-3 text-[#edf3f7] outline-none transition focus:border-[#49d6ff]/60">
                <option>1 - Low</option>
                <option>2 - Moderate</option>
                <option>3 - Significant</option>
                <option>4 - High</option>
                <option>5 - Critical</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#cfe2eb]">Add photo</label>
              <div className="flex h-[52px] items-center justify-center border border-dashed border-[#2a4c5d] bg-[#102734] text-sm text-[#9fb5c2]">
                Upload image
              </div>
            </div>
          </div>

          <div className="border border-[#1d3848] bg-[#102734] p-4 text-sm text-[#bfd2dd]">
            By submitting, you agree that this report may be checked for nearby issues and reviewed by city teams.
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="border border-[#49d6ff]/40 bg-[#49d6ff] px-5 py-3 text-sm font-semibold text-[#07131d] hover:bg-[#71dfff]">
              Submit report
            </button>
            <button className="border border-[#1d3848] bg-[#0f1f2a] px-5 py-3 text-sm font-semibold text-[#edf3f7] hover:border-[#2a4c5d]">
              Save draft
            </button>
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="border border-[#1d3848] bg-[#0d1d29] p-6">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#9fb5c2]">AI analysis</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#edf3f7]">
            Signal review
          </h2>

          <div className="mt-5 border border-[#1d3848] bg-[#0f1f2a] p-4">
            <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#49d6ff]">
              <span>Analyzing</span>
              <span>87% confidence</span>
            </div>

            <div className="space-y-3">
              {aiSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-[#bfd2dd]">
                  <span className={`flex h-6 w-6 items-center justify-center border ${index === 2 || index === 3 ? "border-[#49d6ff] bg-[#49d6ff]/10 text-[#49d6ff]" : index <= 1 ? "border-[#ffb14a]/40 bg-[#ffb14a]/10 text-[#ffb14a]" : "border-[#1d3848] bg-[#102734] text-[#9fb5c2]"}`}>
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 border border-[#1d3848] bg-[#102734] p-4 text-sm leading-6 text-[#bfd2dd]">
            A localized flood signal is likely affecting a pedestrian route, with standing water near a curb and increased risk during peak rainfall.
          </div>

          <div className="mt-5 space-y-3 text-sm text-[#bfd2dd]">
            <div className="flex items-center justify-between border border-[#1d3848] bg-[#102734] px-3 py-2.5">
              <span>Category</span>
              <strong className="text-[#edf3f7]">Flooding</strong>
            </div>
            <div className="flex items-center justify-between border border-[#1d3848] bg-[#102734] px-3 py-2.5">
              <span>Severity</span>
              <strong className="text-[#ffb14a]">4 / 5</strong>
            </div>
            <div className="flex items-center justify-between border border-[#1d3848] bg-[#102734] px-3 py-2.5">
              <span>Confidence</span>
              <strong className="text-[#49d6ff]">87%</strong>
            </div>
          </div>

          <div className="mt-5 border border-[#ffb14a]/40 bg-[#ffb14a]/10 p-3 text-sm text-[#ffd9a5]">
            AI suggestions are recommendations and can be reviewed before submission.
          </div>
        </div>

        <div className="border border-[#ffb14a]/40 bg-[#ffb14a]/10 p-5">
          <h3 className="text-lg font-semibold text-[#edf3f7]">Before you send</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[#bfd2dd]">
            <li>• Check the exact location.</li>
            <li>• Add a clear photo when possible.</li>
            <li>• Include any safety risks or access issues.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
