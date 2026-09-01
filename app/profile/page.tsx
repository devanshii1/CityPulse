import { profileStats } from "../mock-data";

export default function ProfilePage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="border border-[#1d3848] bg-[#0d1d29] p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center border border-[#49d6ff]/40 bg-[#0f1f2a] text-xl font-semibold text-[#49d6ff]">
            AP
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.04em] text-[#edf3f7]">{profileStats.name}</h1>
            <p className="text-sm text-[#9fb5c2]">{profileStats.email}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="border border-[#1d3848] bg-[#102734] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#9fb5c2]">Reports submitted</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#edf3f7]">{profileStats.reportsSubmitted}</p>
          </div>
          <div className="border border-[#1d3848] bg-[#102734] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#9fb5c2]">Issues tracked</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#edf3f7]">{profileStats.issuesTracked}</p>
          </div>
        </div>
      </aside>

      <section className="space-y-6">
        <div className="border border-[#1d3848] bg-[#0d1d29] p-6">
          <h2 className="text-xl font-semibold tracking-[-0.04em] text-[#edf3f7]">Community impact</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="border border-[#1d3848] bg-[#102734] p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#49d6ff]">Helpful updates</p>
              <p className="mt-2 text-2xl font-semibold text-[#edf3f7]">14</p>
            </div>
            <div className="border border-[#1d3848] bg-[#102734] p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#4fe0a6]">Resolved</p>
              <p className="mt-2 text-2xl font-semibold text-[#edf3f7]">5</p>
            </div>
            <div className="border border-[#1d3848] bg-[#102734] p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#ffb14a]">Active areas</p>
              <p className="mt-2 text-2xl font-semibold text-[#edf3f7]">3</p>
            </div>
          </div>
        </div>

        <div className="border border-[#1d3848] bg-[#0d1d29] p-6">
          <h2 className="text-xl font-semibold tracking-[-0.04em] text-[#edf3f7]">Neighborhoods</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {profileStats.neighborhoods.map((place) => (
              <span key={place} className="border border-[#1d3848] bg-[#102734] px-3 py-2 text-sm text-[#bfd2dd]">
                {place}
              </span>
            ))}
          </div>
        </div>

        <div className="border border-[#1d3848] bg-[#0d1d29] p-6">
          <h2 className="text-xl font-semibold tracking-[-0.04em] text-[#edf3f7]">Account settings</h2>
          <div className="mt-5 space-y-3 text-sm text-[#bfd2dd]">
            <div className="flex items-center justify-between border border-[#1d3848] bg-[#102734] px-4 py-3">
              <span>Notifications</span>
              <span className="text-[#edf3f7]">Email updates</span>
            </div>
            <div className="flex items-center justify-between border border-[#1d3848] bg-[#102734] px-4 py-3">
              <span>Default area</span>
              <span className="text-[#edf3f7]">Riverside</span>
            </div>
            <div className="flex items-center justify-between border border-[#1d3848] bg-[#102734] px-4 py-3">
              <span>Language</span>
              <span className="text-[#edf3f7]">English</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
