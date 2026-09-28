"use client";

import React from "react";
import type { PrepareResponse } from "@/lib/api";
import {
  SparklesIcon,
  BuildingIcon,
  StarIcon,
  ShieldIcon,
  UsersIcon,
  TrendingUpIcon,
  MessageSquareIcon,
  HelpCircleIcon,
  ArrowRightIcon,
  LoaderIcon,
  EyeIcon,
  ZapIcon,
} from "./icons";

interface MeetingBriefProps {
  response: PrepareResponse | null;
  isLoading: boolean;
}

interface BriefSection {
  key: keyof PrepareResponse["brief"];
  label: string;
  icon: React.ReactNode;
  color: string;
  accent: string;
  description: string;
}

const SECTIONS: BriefSection[] = [
  {
    key: "client_overview",
    label: "Client Overview",
    icon: <BuildingIcon className="w-4 h-4" />,
    color: "rgba(99,102,241,0.12)",
    accent: "#818cf8",
    description: "Background and context about this client",
  },
  {
    key: "previous_interests",
    label: "Previous Interests",
    icon: <StarIcon className="w-4 h-4" />,
    color: "rgba(251,191,36,0.1)",
    accent: "#fbbf24",
    description: "What they've cared about in past meetings",
  },
  {
    key: "key_concerns",
    label: "Key Concerns",
    icon: <ShieldIcon className="w-4 h-4" />,
    color: "rgba(239,68,68,0.1)",
    accent: "#f87171",
    description: "Issues or blockers to address",
  },
  {
    key: "important_stakeholders",
    label: "Important Stakeholders",
    icon: <UsersIcon className="w-4 h-4" />,
    color: "rgba(34,197,94,0.1)",
    accent: "#4ade80",
    description: "Key people involved or influential",
  },
  {
    key: "competitors",
    label: "Competitors",
    icon: <TrendingUpIcon className="w-4 h-4" />,
    color: "rgba(168,85,247,0.1)",
    accent: "#c084fc",
    description: "Known competitive landscape",
  },
  {
    key: "talking_points",
    label: "Talking Points",
    icon: <MessageSquareIcon className="w-4 h-4" />,
    color: "rgba(6,182,212,0.1)",
    accent: "#22d3ee",
    description: "Key messages to communicate",
  },
  {
    key: "questions_to_ask",
    label: "Questions to Ask",
    icon: <HelpCircleIcon className="w-4 h-4" />,
    color: "rgba(245,158,11,0.1)",
    accent: "#f59e0b",
    description: "Probe deeper with these questions",
  },
  {
    key: "suggested_next_steps",
    label: "Suggested Next Steps",
    icon: <ArrowRightIcon className="w-4 h-4" />,
    color: "rgba(16,185,129,0.1)",
    accent: "#34d399",
    description: "Recommended actions after this meeting",
  },
];

function BriefCard({ section, items }: { section: BriefSection; items: string[] }) {
  const isEmpty = items.length === 0;

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200"
      style={{
        background: `linear-gradient(135deg, ${section.color} 0%, rgba(15,23,42,0.6) 100%)`,
        border: `1px solid ${section.accent}22`,
      }}
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${section.accent}20`, color: section.accent }}
          >
            {section.icon}
          </div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: "#f1f5f9" }}>
              {section.label}
            </h3>
            <p className="text-xs" style={{ color: "var(--color-surface-500)" }}>
              {section.description}
            </p>
          </div>
        </div>

        {!isEmpty && (
          <span
            className="flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ background: `${section.accent}20`, color: section.accent }}
          >
            {items.length}
          </span>
        )}
      </div>

      {/* Items */}
      {isEmpty ? (
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px dashed rgba(255,255,255,0.08)",
            color: "var(--color-surface-500)",
          }}
        >
          <EyeIcon className="w-3.5 h-3.5 flex-shrink-0" />
          No data available for this section
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm leading-relaxed"
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                style={{ background: section.accent }}
              />
              <span style={{ color: "var(--color-surface-200)" }}>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col gap-2">
        <div className="skeleton h-5 w-48 rounded" />
        <div className="skeleton h-3 w-72 rounded" />
      </div>

      {/* Cards skeleton grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTIONS.map((s) => (
          <div
            key={s.key}
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(99,102,241,0.08)" }}
          >
            <div className="flex items-center gap-2">
              <div className="skeleton w-8 h-8 rounded-xl" />
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="skeleton h-3.5 w-28 rounded" />
                <div className="skeleton h-2.5 w-40 rounded" />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton h-3 rounded" style={{ width: `${60 + i * 12}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MeetingBrief({ response, isLoading }: MeetingBriefProps) {
  if (!isLoading && !response) {
    // Placeholder / welcome state
    return (
      <div className="glass-card p-8 flex flex-col items-center justify-center gap-5 min-h-64 text-center">
        <div
          className="relative w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15))",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <SparklesIcon className="w-9 h-9" style={{ color: "var(--color-brand-400)" }} />
          <div
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #9333ea)" }}
          >
            <ZapIcon className="w-2.5 h-2.5 text-white" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold gradient-text mb-2">Your AI Brief Awaits</h2>
          <p className="text-sm max-w-sm leading-relaxed" style={{ color: "var(--color-surface-400)" }}>
            Select a client, add your meeting notes, and click{" "}
            <strong style={{ color: "var(--color-brand-300)" }}>Prepare Me</strong> to generate a
            personalized meeting brief powered by AI memory.
          </p>
        </div>

        {/* Visual flow hint */}
        <div
          className="flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-xl"
          style={{
            background: "rgba(99,102,241,0.07)",
            border: "1px solid rgba(99,102,241,0.15)",
            color: "var(--color-surface-400)",
          }}
        >
          <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(99,102,241,0.2)", color: "var(--color-brand-300)" }}>1</span>
          <span>Client</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
          <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(99,102,241,0.2)", color: "var(--color-brand-300)" }}>2</span>
          <span>Notes</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
          <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(99,102,241,0.2)", color: "var(--color-brand-300)" }}>3</span>
          <span>Prepare Me</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
          <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(168,85,247,0.2)", color: "var(--color-accent-400)" }}>✦</span>
          <span>AI Brief</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 flex flex-col gap-5">
      {/* Section header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="section-heading">
            <SparklesIcon className="w-5 h-5" style={{ color: "var(--color-brand-400)" }} />
            AI Meeting Brief
            {response && (
              <span
                className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(99,102,241,0.15)", color: "var(--color-brand-300)" }}
              >
                {response.client}
              </span>
            )}
          </h2>
          {!isLoading && response && (
            <p className="text-xs mt-0.5" style={{ color: "var(--color-surface-500)" }}>
              Personalized briefing generated by AI — powered by Hindsight memory
            </p>
          )}
        </div>

        {isLoading && (
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
              color: "var(--color-brand-300)",
            }}
          >
            <LoaderIcon className="w-4 h-4" />
            Generating…
          </div>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : response ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
          {SECTIONS.map((section) => (
            <BriefCard
              key={section.key}
              section={section}
              items={response.brief[section.key] ?? []}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
