"use client";

import React, { useState, useCallback } from "react";
import { saveMeeting, prepareMeeting, type Meeting } from "@/lib/api";
import {
  BuildingIcon,
  CalendarIcon,
  UsersIcon,
  NotesIcon,
  SaveIcon,
  SparklesIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  LoaderIcon,
  PlusIcon,
  ChevronDownIcon,
} from "./icons";

interface ClientFormProps {
  onMeetingSaved: () => void;
  onBriefReceived: (brief: import("@/lib/api").PrepareResponse) => void;
  isBriefLoading: boolean;
  setIsBriefLoading: (v: boolean) => void;
  knownClients: string[];
}

export default function ClientForm({
  onMeetingSaved,
  onBriefReceived,
  isBriefLoading,
  setIsBriefLoading,
  knownClients,
}: ClientFormProps) {
  const today = new Date().toISOString().split("T")[0];

  const [client, setClient] = useState("");
  const [customClient, setCustomClient] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [meetingDate, setMeetingDate] = useState(today);
  const [participantsRaw, setParticipantsRaw] = useState("");
  const [notes, setNotes] = useState("");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState("");
  const [prepareError, setPrepareError] = useState("");

  const showCustomClient = showCustomInput || (client === "__new__");
  const effectiveClient = customClient.trim() || client;

  const isFormValid = effectiveClient.trim() !== "" && notes.trim() !== "";
  const isSaving = saveState === "saving";
  const isAnyLoading = isSaving || isBriefLoading;

  const parseParticipants = (raw: string): string[] =>
    raw
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

  const handleClientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "__new__") {
      setShowCustomInput(true);
      setClient("__new__");
      setCustomClient("");
    } else {
      setShowCustomInput(false);
      setClient(val);
    }
  };

const handleSave = useCallback(async () => {
  if (!isFormValid || isSaving) return;
    setSaveState("saving");
    setSaveError("");

    const meeting: Meeting = {
      client: effectiveClient.trim(),
      meeting_date: meetingDate,
      participants: parseParticipants(participantsRaw),
      notes: notes.trim(),
    };

    try {
      await saveMeeting(meeting);
      setSaveState("saved");
      onMeetingSaved();
      setTimeout(() => setSaveState("idle"), 3000);
    } catch (err) {
      setSaveState("error");
      setSaveError(err instanceof Error ? err.message : "Failed to save meeting.");
    }
  }, [effectiveClient, meetingDate, participantsRaw, notes, isFormValid, isSaving, onMeetingSaved]);

  const handlePrepare = useCallback(async () => {
    if (!effectiveClient.trim() || isBriefLoading) return;
    setIsBriefLoading(true);
    setPrepareError("");

    const participants = parseParticipants(participantsRaw);

    const query = `
    Prepare me for the next meeting with ${effectiveClient.trim()}.

    Current meeting participants:
    ${participants.length > 0 ? participants.join(", ") : "Not provided"}

    Focus on the client's requirements, concerns, pricing, timeline, and previous discussions.

    ${notes.trim() ? `Current context: ${notes.trim()}` : ""}
    `;

    try {
      const result = await prepareMeeting(effectiveClient.trim(), query);
      onBriefReceived(result);
    } catch (err) {
      setPrepareError(err instanceof Error ? err.message : "Failed to generate brief. Is the backend running?");
    } finally {
      setIsBriefLoading(false);
    }
  }, [effectiveClient, notes, isBriefLoading, setIsBriefLoading, onBriefReceived]);

  return (
    <div className="glass-card p-6 flex flex-col gap-5">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="section-heading">
          <BuildingIcon className="w-5 h-5" style={{ color: "var(--color-brand-400)" }} />
          Meeting Setup
        </h2>
        <span
          className="badge"
          style={{
            background: "rgba(99,102,241,0.1)",
            color: "var(--color-brand-300)",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          New Meeting
        </span>
      </div>

      {/* Client select / input */}
      <div>
        <label htmlFor="client-select" className="form-label">
          Client Name
        </label>
        {knownClients.length > 0 ? (
          <div className="relative">
            <select
              id="client-select"
              value={showCustomInput ? "__new__" : client}
              onChange={handleClientSelect}
              disabled={isAnyLoading}
              className="form-input appearance-none pr-10"
            >
              <option value="">— Select a client —</option>
              {knownClients.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value="__new__">+ Add new client…</option>
            </select>
            <ChevronDownIcon
              className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--color-surface-400)" }}
            />
          </div>
        ) : null}

        {(showCustomInput || knownClients.length === 0) && (
          <div className={`${knownClients.length > 0 ? "mt-2" : ""} relative`}>
            <input
              id="client-name-input"
              type="text"
              placeholder="e.g. ABC Technologies"
              value={customClient}
              onChange={(e) => setCustomClient(e.target.value)}
              disabled={isAnyLoading}
              className="form-input"
            />
            {knownClients.length === 0 && (
              <PlusIcon
                className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--color-surface-500)" }}
              />
            )}
          </div>
        )}
      </div>

      {/* Date + Participants row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="meeting-date" className="form-label flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            Meeting Date
          </label>
          <input
            id="meeting-date"
            type="date"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            disabled={isAnyLoading}
            className="form-input"
            style={{ colorScheme: "dark" }}
          />
        </div>

        <div>
          <label htmlFor="participants" className="form-label flex items-center gap-1.5">
            <UsersIcon className="w-3.5 h-3.5" />
            Participants
          </label>
          <input
            id="participants"
            type="text"
            placeholder="Sarah, David, John"
            value={participantsRaw}
            onChange={(e) => setParticipantsRaw(e.target.value)}
            disabled={isAnyLoading}
            className="form-input"
          />
          <p className="mt-1 text-xs" style={{ color: "var(--color-surface-500)" }}>
            Separate names with commas
          </p>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="meeting-notes" className="form-label flex items-center gap-1.5">
          <NotesIcon className="w-3.5 h-3.5" />
          Meeting Notes
        </label>
        <textarea
          id="meeting-notes"
          rows={5}
          placeholder="Enter current meeting context, agenda, or any notes for this session…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={isAnyLoading}
          className="form-input resize-none leading-relaxed"
        />
        <p className="mt-1 text-xs" style={{ color: "var(--color-surface-500)" }}>
          {notes.length} characters
        </p>
      </div>

      {/* Save status messages */}
      {saveState === "saved" && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium animate-fade-in-up"
          style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.25)",
            color: "var(--color-success-400)",
          }}
        >
          <CheckCircleIcon className="w-4 h-4 flex-shrink-0" />
          Meeting saved successfully!
        </div>
      )}

      {(saveState === "error" || prepareError) && (
        <div
          className="flex items-start gap-2 px-4 py-3 rounded-lg text-sm animate-fade-in-up"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.25)",
            color: "var(--color-error-400)",
          }}
        >
          <AlertCircleIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{saveError || prepareError}</span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          id="btn-save-meeting"
          onClick={handleSave}
          disabled={isSaving}
          className="btn-secondary flex-1"
        >
          {isSaving ? (
            <>
              <LoaderIcon className="w-4 h-4" />
              Saving…
            </>
          ) : (
            <>
              <SaveIcon className="w-4 h-4" />
              Save Meeting
            </>
          )}
        </button>

        <button
          id="btn-prepare-me"
          onClick={handlePrepare}
          disabled={isBriefLoading}
          className="btn-primary flex-1"
        >
          {isBriefLoading ? (
            <>
              <LoaderIcon className="w-4 h-4" />
              Generating Brief…
            </>
          ) : (
            <>
              <SparklesIcon className="w-4 h-4" />
              Prepare Me
            </>
          )}
        </button>
      </div>
    </div>
  );
}
