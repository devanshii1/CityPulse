"use client";

import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { mockIssues, type MockIssue } from "@/data/mock-issues";

const severityColors: Record<MockIssue["severity"], string> = {
  1: "#22c55e",
  2: "#84cc16",
  3: "#eab308",
  4: "#f97316",
  5: "#ef4444",
};

const formatLabel = (value: string) => value.replaceAll("_", " ");

function MapInteraction({ onMapClick }: { onMapClick: () => void }) {
  useMapEvents({ click: onMapClick });
  return null;
}

export default function IssueMap() {
  const [selectedIssue, setSelectedIssue] = useState<MockIssue | null>(null);

  const createIssueIcon = (issue: MockIssue) =>
    L.divIcon({
      className: "citypulse-issue-marker",
      html: `<span style="background-color: ${severityColors[issue.severity]}"></span>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

  return (
    <MapContainer
      center={[28.57, 77.35]}
      zoom={10}
      scrollWheelZoom
      zoomControl={false}
      className="h-full w-full"
    >
      <MapInteraction onMapClick={() => setSelectedIssue(null)} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />

      {mockIssues.map((issue) => (
        <Marker
          key={issue.id}
          position={[issue.latitude, issue.longitude]}
          icon={createIssueIcon(issue)}
          eventHandlers={{ click: () => setSelectedIssue(issue) }}
        >
          <span className="sr-only">View issue: {issue.title}</span>
        </Marker>
      ))}

      {selectedIssue && (
        <Popup
          position={[selectedIssue.latitude, selectedIssue.longitude]}
          closeButton={false}
        >
          <div className="min-w-52 p-1 text-slate-900">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold">{selectedIssue.title}</h2>
              <button
                type="button"
                aria-label="Close issue details"
                className="text-lg leading-none text-slate-500 hover:text-slate-900"
                onClick={() => setSelectedIssue(null)}
              >
                &times;
              </button>
            </div>
            <dl className="mt-2 space-y-1 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Category</dt>
                <dd className="capitalize">{formatLabel(selectedIssue.category)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Severity</dt>
                <dd>{selectedIssue.severity} / 5</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Status</dt>
                <dd className="capitalize">{formatLabel(selectedIssue.status)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Reports</dt>
                <dd>{selectedIssue.report_count}</dd>
              </div>
            </dl>
          </div>
        </Popup>
      )}
    </MapContainer>
  );
}
