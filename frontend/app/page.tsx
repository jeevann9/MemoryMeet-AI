"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import ClientForm from "@/components/ClientForm";
import MeetingHistory from "@/components/MeetingHistory";
import MeetingBrief from "@/components/MeetingBrief";
import { getMeetings, type Meeting, type PrepareResponse } from "@/lib/api";

export default function DashboardPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [meetingsLoading, setMeetingsLoading] = useState(true);
  const [meetingsError, setMeetingsError] = useState("");

  const [brief, setBrief] = useState<PrepareResponse | null>(null);
  const [isBriefLoading, setIsBriefLoading] = useState(false);

  const fetchMeetings = useCallback(async () => {
    setMeetingsLoading(true);
    setMeetingsError("");
    try {
      const data = await getMeetings();
      setMeetings(Array.isArray(data) ? data : []);
    } catch (err) {
      setMeetingsError(
        err instanceof Error
          ? err.message
          : "Could not connect to backend. Is the FastAPI server running?"
      );
    } finally {
      setMeetingsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  // Derive known clients from meeting history for smart select
  const knownClients = Array.from(new Set(meetings.map((m) => m.client))).sort();

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-surface-950)" }}>
      <Header />

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="orb"
          style={{
            width: "600px",
            height: "600px",
            top: "10%",
            left: "-10%",
            background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)",
          }}
        />
        <div
          className="orb"
          style={{
            width: "500px",
            height: "500px",
            bottom: "10%",
            right: "-8%",
            background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* Main layout */}
      <main className="relative flex-1 max-w-screen-xl mx-auto w-full px-4 md:px-6 py-8">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#f1f5f9" }}>
            Meeting Dashboard
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--color-surface-400)" }}>
            Prepare smarter. Remember everything. Walk in confident.
          </p>
        </div>

        {/* 3-column responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[360px_320px_1fr] gap-6">

          {/* Column 1: Client form */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
            <ClientForm
              onMeetingSaved={fetchMeetings}
              onBriefReceived={(result) => {
                setBrief(result);
                // Scroll to brief on mobile
                const el = document.getElementById("brief-section");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              isBriefLoading={isBriefLoading}
              setIsBriefLoading={setIsBriefLoading}
              knownClients={knownClients}
            />
          </div>

          {/* Column 2: Meeting history */}
          <div
            className="animate-fade-in-up xl:block"
            style={{ animationDelay: "0.1s" }}
          >
            <MeetingHistory
              meetings={meetings}
              isLoading={meetingsLoading}
              error={meetingsError}
              onRefresh={fetchMeetings}
            />
          </div>

          {/* Column 3 (spans to 2 cols on lg, takes last col on xl): AI Brief */}
          <div
            id="brief-section"
            className="animate-fade-in-up lg:col-span-2 xl:col-span-1"
            style={{ animationDelay: "0.15s" }}
          >
            <MeetingBrief response={brief} isLoading={isBriefLoading} />
          </div>
        </div>

        {/* Footer */}
        <footer
          className="mt-12 pt-6 flex items-center justify-center text-xs gap-2"
          style={{
            borderTop: "1px solid rgba(99,102,241,0.1)",
            color: "var(--color-surface-600)",
          }}
        >
          <span>MemoryMeet AI</span>
          <span>·</span>
          <span>Meeting Prep &amp; Relationship Agent</span>
          <span>·</span>
          {/*<span>Hackathon Build 2026</span>*/}
        </footer>
      </main>
    </div>
  );
}
