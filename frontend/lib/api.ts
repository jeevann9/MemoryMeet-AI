// ============================================================
// API Configuration — change BASE_URL here for deployment
// ============================================================
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

// ============================================================
// Types
// ============================================================
export interface Meeting {
  id?: string;
  client: string;
  meeting_date: string;
  participants: string[];
  notes: string;
}

export interface MeetingBrief {
  client_overview: string[];
  previous_interests: string[];
  key_concerns: string[];
  important_stakeholders: string[];
  competitors: string[];
  talking_points: string[];
  questions_to_ask: string[];
  suggested_next_steps: string[];
}

export interface PrepareResponse {
  client: string;
  brief: MeetingBrief;
}

export interface RecallResponse {
  client: string;
  memories: string[];
}

// ============================================================
// API functions
// ============================================================

/** Save a meeting to the backend. */
export async function saveMeeting(meeting: Meeting): Promise<Meeting> {
  const res = await fetch(`${API_BASE_URL}/meetings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meeting),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to save meeting: ${res.status} ${text}`);
  }
  return res.json();
}

/** Retrieve all saved meetings. */
export async function getMeetings(): Promise<Meeting[]> {
  const res = await fetch(`${API_BASE_URL}/meetings`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch meetings: ${res.status}`);
  }
  return res.json();
}

/** Recall relevant memories for a client. */
export async function recallMemories(
  client: string,
  query: string
): Promise<RecallResponse> {
  const res = await fetch(`${API_BASE_URL}/meetings/recall`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client, query }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to recall memories: ${res.status} ${text}`);
  }
  return res.json();
}

/** Generate a full AI meeting preparation brief. */
export async function prepareMeeting(
  client: string,
  query: string
): Promise<PrepareResponse> {
  const res = await fetch(`${API_BASE_URL}/meetings/prepare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client, query }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to prepare meeting: ${res.status} ${text}`);
  }
  return res.json();
}
