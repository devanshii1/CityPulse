"use client";

import { type FormEvent, useState } from "react";
import { createReport } from "../../lib/reports";
import { processReportIntoIssue } from "../../lib/living-issues";
import { uploadReportImage } from "../../lib/storage";
import { createClient } from "../../lib/supabase-browser";
import type { ReportCategory, Severity } from "../../lib/types/database";

type Analysis = {
  category: ReportCategory;
  severity: Severity;
  summary: string;
  confidence: number;
};

const categories: ReportCategory[] = [
  "waterlogging", "flooding", "pothole", "road_blockage", "garbage", "streetlight", "other",
];
const aiSteps = ["REPORT RECEIVED", "AI ANALYZING", "CATEGORY SUGGESTED", "SEVERITY ESTIMATED", "USER REVIEWS", "SUBMIT"];
const supabase = createClient();

function formatLabel(value: string) {
  return value.replaceAll("_", " ");
}

function isReportCategory(value: string): value is ReportCategory {
  return categories.includes(value as ReportCategory);
}

function getBrowserCoordinates() {
  return new Promise<GeolocationCoordinates>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Location services are not available in this browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve(coords),
      () => reject(new Error("Location permission is required to place this report on the city map.")),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  });
}

export default function ReportPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setAnalysis(null);
    const trimmedDescription = description.trim();
    if (!trimmedDescription) {
      setError("Please describe the issue before submitting.");
      return;
    }
    setLoading(true);

    try {
      const coords = await getBrowserCoordinates();
      const reportDescription = title.trim()
        ? `${title.trim()}\n\n${trimmedDescription}`
        : trimmedDescription;
      let imagePath: string | null = null;

      if (file) {
        const uploadResult = await uploadReportImage(supabase, file);
        if (uploadResult.error || !uploadResult.data) {
          throw new Error(`Photo upload failed: ${uploadResult.error ?? "Unknown storage error."}`);
        }
        imagePath = uploadResult.data.path;
      }

      const analysisResponse = await fetch("/api/complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: reportDescription,
          image_url: imagePath ?? undefined,
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      });
      const analysisBody = await analysisResponse.json().catch(() => null);
      if (!analysisResponse.ok) {
        throw new Error(analysisBody?.error ?? "AI analysis failed. Please try again.");
      }

      const category = isReportCategory(analysisBody?.category) ? analysisBody.category : "other";
      const severity = Math.min(5, Math.max(1, Math.round(Number(analysisBody?.severity) || 1))) as Severity;
      const result: Analysis = {
        category,
        severity,
        summary: String(analysisBody?.summary ?? "No summary was returned."),
        confidence: Number(analysisBody?.confidence) || 0,
      };
      setAnalysis(result);

      const reportResult = await createReport(supabase, {
        description: reportDescription,
        image_url: imagePath,
        latitude: coords.latitude,
        longitude: coords.longitude,
        category: result.category,
        severity: result.severity,
        ai_summary: result.summary,
        ai_confidence: result.confidence,
        issue_id: null,
      });
      if (reportResult.error || !reportResult.data) {
        throw new Error(reportResult.error ?? "The report could not be saved.");
      }

      const issueResult = await processReportIntoIssue(supabase, reportResult.data);
      if (issueResult.error || !issueResult.data) {
        throw new Error(`Report saved, but it could not be linked to a Living Issue: ${issueResult.error ?? "unknown issue error."}`);
      }
      setSuccess(`Report saved and linked to Living Issue ${issueResult.data.id.slice(0, 8)}.`);
      setTitle("");
      setDescription("");
      setLocation("");
      setFile(null);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong while submitting the report.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="border border-[#1d3848] bg-[#0d1d29] p-6 md:p-8">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#49d6ff]">Report an issue</p>
        <h1 className="text-3xl font-semibold tracking-[-0.05em] text-[#edf3f7]">Your report</h1>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="issue-title" className="mb-2 block text-sm font-medium text-[#cfe2eb]">Issue title</label>
            <input id="issue-title" value={title} onChange={(event) => setTitle(event.target.value)} className="w-full border border-[#1d3848] bg-[#102734] px-4 py-3 text-[#edf3f7] outline-none transition focus:border-[#49d6ff]/60" placeholder="Example: Flooded alley behind the market" />
          </div>
          <div>
            <label htmlFor="issue-description" className="mb-2 block text-sm font-medium text-[#cfe2eb]">Description</label>
            <textarea id="issue-description" required rows={5} value={description} onChange={(event) => setDescription(event.target.value)} className="w-full border border-[#1d3848] bg-[#102734] px-4 py-3 text-[#edf3f7] outline-none transition focus:border-[#49d6ff]/60" placeholder="Describe the problem, when it started, and any safety concerns..." />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="issue-location" className="mb-2 block text-sm font-medium text-[#cfe2eb]">Location or landmark</label>
              <input id="issue-location" value={location} onChange={(event) => setLocation(event.target.value)} className="w-full border border-[#1d3848] bg-[#102734] px-4 py-3 text-[#edf3f7] outline-none transition focus:border-[#49d6ff]/60" placeholder="Street name or landmark" />
              <p className="mt-2 text-xs text-[#9fb5c2]">Your browser location is requested to place the report on the map.</p>
            </div>
            <div>
              <label htmlFor="issue-category" className="mb-2 block text-sm font-medium text-[#cfe2eb]">Category</label>
              <select id="issue-category" disabled className="w-full border border-[#1d3848] bg-[#102734] px-4 py-3 text-[#9fb5c2] outline-none"><option>Suggested by Gemini after submit</option></select>
            </div>
          </div>
          <div>
            <label htmlFor="issue-photo" className="mb-2 block text-sm font-medium text-[#cfe2eb]">Add photo</label>
            <label htmlFor="issue-photo" className="flex min-h-[52px] cursor-pointer items-center justify-center border border-dashed border-[#2a4c5d] bg-[#102734] px-4 py-3 text-sm text-[#9fb5c2] hover:border-[#49d6ff]/60">{file ? file.name : "Choose an image (optional)"}</label>
            <input id="issue-photo" type="file" accept="image/*" className="sr-only" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
          </div>
          {error && <div role="alert" className="border border-[#ff6b5c]/50 bg-[#ff6b5c]/10 p-4 text-sm leading-6 text-[#ffb8b0]">{error}</div>}
          {success && <div role="status" className="border border-[#4fe0a6]/50 bg-[#4fe0a6]/10 p-4 text-sm leading-6 text-[#a9f3d2]">{success}</div>}
          <div className="border border-[#1d3848] bg-[#102734] p-4 text-sm text-[#bfd2dd]">By submitting, you agree that this report may be checked for nearby issues and reviewed by city teams.</div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={loading} className="border border-[#49d6ff]/40 bg-[#49d6ff] px-5 py-3 text-sm font-semibold text-[#07131d] hover:bg-[#71dfff] disabled:cursor-wait disabled:opacity-60">{loading ? "Submitting..." : "Submit report"}</button>
            <button type="button" disabled={loading} className="border border-[#1d3848] bg-[#0f1f2a] px-5 py-3 text-sm font-semibold text-[#edf3f7] hover:border-[#2a4c5d] disabled:opacity-60">Save draft</button>
          </div>
        </form>
      </section>

      <aside className="space-y-6">
        <div className="border border-[#1d3848] bg-[#0d1d29] p-6">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#9fb5c2]">AI analysis</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#edf3f7]">Signal review</h2>
          <div className="mt-5 border border-[#1d3848] bg-[#0f1f2a] p-4">
            <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#49d6ff]"><span>{loading ? "Analyzing" : analysis ? "Analysis ready" : "Awaiting report"}</span><span>{analysis ? `${Math.round(analysis.confidence * 100)}% confidence` : "-- confidence"}</span></div>
            <div className="space-y-3">
              {aiSteps.map((step, index) => {
                const completed = Boolean(analysis) || (loading && index < 2);
                return <div key={step} className="flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-[#bfd2dd]"><span className={`flex h-6 w-6 items-center justify-center border ${completed ? "border-[#49d6ff] bg-[#49d6ff]/10 text-[#49d6ff]" : "border-[#1d3848] bg-[#102734] text-[#9fb5c2]"}`}>{index + 1}</span><span>{step}</span></div>;
              })}
            </div>
          </div>
          <div className="mt-5 border border-[#1d3848] bg-[#102734] p-4 text-sm leading-6 text-[#bfd2dd]">{analysis?.summary ?? "Submit a report to receive a localized Gemini analysis and recommended classification."}</div>
          <div className="mt-5 space-y-3 text-sm text-[#bfd2dd]">
            <div className="flex items-center justify-between border border-[#1d3848] bg-[#102734] px-3 py-2.5"><span>Category</span><strong className="capitalize text-[#edf3f7]">{analysis ? formatLabel(analysis.category) : "Pending"}</strong></div>
            <div className="flex items-center justify-between border border-[#1d3848] bg-[#102734] px-3 py-2.5"><span>Severity</span><strong className="text-[#ffb14a]">{analysis ? `${analysis.severity} / 5` : "Pending"}</strong></div>
            <div className="flex items-center justify-between border border-[#1d3848] bg-[#102734] px-3 py-2.5"><span>Confidence</span><strong className="text-[#49d6ff]">{analysis ? `${Math.round(analysis.confidence * 100)}%` : "Pending"}</strong></div>
          </div>
          <div className="mt-5 border border-[#ffb14a]/40 bg-[#ffb14a]/10 p-3 text-sm text-[#ffd9a5]">AI suggestions are recommendations and can be reviewed before submission.</div>
        </div>
        <div className="border border-[#ffb14a]/40 bg-[#ffb14a]/10 p-5"><h3 className="text-lg font-semibold text-[#edf3f7]">Before you send</h3><ul className="mt-4 space-y-3 text-sm leading-6 text-[#bfd2dd]"><li>• Check the exact location.</li><li>• Add a clear photo when possible.</li><li>• Include any safety risks or access issues.</li></ul></div>
      </aside>
    </div>
  );
}