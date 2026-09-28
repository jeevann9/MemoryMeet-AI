"use client";

import React from "react";
import type { Meeting } from "@/lib/api";
import {
  HistoryIcon,
  BuildingIcon,
  CalendarIcon,
  UsersIcon,
  RefreshIcon,
  LoaderIcon,
  NotesIcon,
} from "./icons";

interface MeetingHistoryProps {
  meetings: Meeting[];
  isLoading: boolean;
  error: string;
  onRefresh: () => void;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function getClientInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const CLIENT_COLORS = [
  "from-indigo-500 to-violet-600",
  "from-violet-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-pink-600",
  "from-fuchsia-500 to-violet-600",
];

function getColorClass(name: string): string {
  let hash = 0;
  for (const ch of name) hash += ch.charCodeAt(0);
  return CLIENT_COLORS[hash % CLIENT_COLORS.length];
}

export default function MeetingHistory({
  meetings,
  isLoading,
  error,
  onRefresh,
}: MeetingHistoryProps) {
  return (
    <div className="glass-card p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="section-heading">
          <HistoryIcon className="w-5 h-5" style={{ color: "var(--color-brand-400)" }} />
          Meeting History
          {meetings.length > 0 && (
            <span
              className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ background: "rgba(99,102,241,0.15)", color: "var(--color-brand-300)" }}
            >
              {meetings.length}
            </span>
          )}
        </h2>

        <button
          id="btn-refresh-meetings"
          onClick={onRefresh}
          disabled={isLoading}
          className="btn-secondary !px-2.5 !py-1.5"
          title="Refresh meetings"
        >
          {isLoading ? (
            <LoaderIcon className="w-4 h-4" />
          ) : (
            <RefreshIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* States */}
      {isLoading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: "rgba(15,23,42,0.4)" }}>
              <div className="skeleton w-10 h-10 rounded-xl flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-2 justify-center">
                <div className="skeleton h-3.5 w-32 rounded" />
                <div className="skeleton h-3 w-48 rounded" />
                <div className="skeleton h-3 w-24 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && error && (
        <div
          className="flex items-start gap-2 px-4 py-3 rounded-xl text-sm"
          style={{
            background: "rgba(239,68,68,0.07)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "var(--color-error-400)",
          }}
        >
          <span>⚠ {error}</span>
        </div>
      )}

      {!isLoading && !error && meetings.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-10 gap-3 rounded-xl"
          style={{ border: "1px dashed rgba(99,102,241,0.15)" }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(99,102,241,0.08)" }}
          >
            <HistoryIcon className="w-6 h-6" style={{ color: "var(--color-brand-400)" }} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold" style={{ color: "var(--color-surface-300)" }}>
              No meetings yet
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--color-surface-500)" }}>
              Save your first meeting above to get started
            </p>
          </div>
        </div>
      )}

      {!isLoading && !error && meetings.length > 0 && (
        <div
          className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1"
          style={{ scrollbarGutter: "stable" }}
        >
          {[...meetings].reverse().map((meeting, idx) => {
            const initials = getClientInitials(meeting.client);
            const colorClass = getColorClass(meeting.client);

            return (
              <div
                key={idx}
                className="group flex gap-3 p-3 rounded-xl transition-all duration-200 cursor-default"
                style={{
                  background: "rgba(15,23,42,0.4)",
                  border: "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid rgba(99,102,241,0.2)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(30,41,59,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid transparent";
                  (e.currentTarget as HTMLElement).style.background = "rgba(15,23,42,0.4)";
                }}
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-sm font-bold bg-gradient-to-br ${colorClass}`}
                >
                  {initials}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold truncate" style={{ color: "#f1f5f9" }}>
                      {meeting.client}
                    </p>
                    <span
                      className="text-xs flex-shrink-0"
                      style={{ color: "var(--color-surface-500)" }}
                    >
                      <CalendarIcon className="w-3 h-3 inline mr-1 mb-0.5" />
                      {formatDate(meeting.meeting_date)}
                    </span>
                  </div>

                  {meeting.participants?.length > 0 && (
                    <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: "var(--color-surface-400)" }}>
                      <UsersIcon className="w-3 h-3" />
                      {meeting.participants.join(", ")}
                    </p>
                  )}

                  {meeting.notes && (
                    <p
                      className="text-xs mt-1.5 leading-relaxed line-clamp-2 flex items-start gap-1"
                      style={{ color: "var(--color-surface-500)" }}
                    >
                      <NotesIcon className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span>{meeting.notes}</span>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
