"use client";

import React from "react";
import {
  BrainIcon,
  SparklesIcon,
  MicIcon,
  VideoIcon,
} from "./icons";

export default function Header() {
  return (
    <header
      className="relative overflow-hidden border-b"
      style={{
        background: "linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(30,27,75,0.98) 50%, rgba(15,23,42,0.98) 100%)",
        borderColor: "rgba(99,102,241,0.2)",
      }}
    >
      {/* Background orbs */}
      <div
        className="orb"
        style={{
          width: "400px", height: "400px",
          top: "-180px", left: "-100px",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb"
        style={{
          width: "300px", height: "300px",
          top: "-100px", right: "0px",
          background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-screen-xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
        {/* Logo + brand */}
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div
            className="relative flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #6366f1, #9333ea)",
              boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
            }}
          >
            <BrainIcon className="w-6 h-6 text-white" />
          </div>

          {/* Name + subtitle */}
          <div>
            <h1 className="text-xl font-bold gradient-text leading-tight tracking-tight">
              MemoryMeet AI
            </h1>
            <p className="text-xs font-medium" style={{ color: "var(--color-surface-400)" }}>
              Meeting Prep &amp; Relationship Agent
            </p>
          </div>
        </div>

        {/* Status indicator + future integrations badge */}
        <div className="flex items-center gap-3">
          {/* Future: recording integration — greyed out, future-ready */}
          <div className="hidden md:flex items-center gap-2">
            <button
              id="btn-upload-recording"
              disabled
              title="Upload Recording (Coming Soon)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-not-allowed"
              style={{
                background: "rgba(99,102,241,0.05)",
                border: "1px dashed rgba(99,102,241,0.2)",
                color: "var(--color-surface-500)",
              }}
            >
              <MicIcon className="w-3.5 h-3.5" />
              <span>Upload Recording</span>
              <span
                className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                style={{ background: "rgba(99,102,241,0.15)", color: "var(--color-brand-400)" }}
              >
                SOON
              </span>
            </button>

            <button
              id="btn-connect-meeting"
              disabled
              title="Connect Meeting (Coming Soon)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-not-allowed"
              style={{
                background: "rgba(168,85,247,0.05)",
                border: "1px dashed rgba(168,85,247,0.2)",
                color: "var(--color-surface-500)",
              }}
            >
              <VideoIcon className="w-3.5 h-3.5" />
              <span>Connect Meeting</span>
              <span
                className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                style={{ background: "rgba(168,85,247,0.15)", color: "var(--color-accent-400)" }}
              >
                SOON
              </span>
            </button>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <div className="pulse-dot" />
            <span className="text-xs font-semibold" style={{ color: "var(--color-success-400)" }}>
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Subtle AI tagline strip */}
      <div
        className="relative text-center py-2 text-xs font-medium"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.08), rgba(168,85,247,0.08), transparent)",
          color: "var(--color-surface-500)",
          borderTop: "1px solid rgba(99,102,241,0.08)",
        }}
      >
        <SparklesIcon className="w-3 h-3 inline mr-1 mb-0.5" style={{ color: "var(--color-brand-400)" } as React.CSSProperties} />
        Powered by Hindsight Memory + Groq AI — Your relationship intelligence, always ready
      </div>
    </header>
  );
}
