import { nanoid } from "nanoid";
import {
  CACHED_LOCATION_KEY,
  COOKIE_CONSENT_KEY,
  SESSION_ID_KEY,
  SESSION_TIMEOUT,
  TRACKING_ROUTE,
  USER_ID_KEY,
} from "../constants/general";
import z4 from "zod/v4";
import { analyticsPayloadSchema } from "../schema";
import { GeolocationData } from "../types/analytics";

function getOrSetUserId() {
  let uid = localStorage.getItem(USER_ID_KEY);
  if (!uid) {
    uid = nanoid();
    localStorage.setItem(USER_ID_KEY, uid);
  }
  return uid;
}

function getOrSetSessionId(): string {
  const stored = localStorage.getItem(SESSION_ID_KEY);
  const now = Date.now();

  if (stored) {
    try {
      const session = JSON.parse(stored);

      // Check if session expired
      if (now - session.lastActivity < SESSION_TIMEOUT) {
        // Session is still active
        session.lastActivity = now;
        localStorage.setItem(SESSION_ID_KEY, JSON.stringify(session));
        return session.sessionId;
      }
    } catch {
      // If parsing fails, treat as invalid session and create new one
      localStorage.removeItem(SESSION_ID_KEY);
    }
  }

  // Create new session
  const newSession = {
    sessionId: nanoid(),
    lastActivity: now,
  };
  localStorage.setItem(SESSION_ID_KEY, JSON.stringify(newSession));
  return newSession.sessionId;
}

export function getTrackingContext() {
  const userId = getOrSetUserId();
  const sessionId = getOrSetSessionId();
  const cachedGeolocation = localStorage.getItem(CACHED_LOCATION_KEY);
  const geolocation: GeolocationData | null = cachedGeolocation
    ? JSON.parse(cachedGeolocation)
    : null;

  return {
    user_id: userId,
    session_id: sessionId,
    url: window.location.href,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
    language: navigator.language,
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
    ts: Date.now(),
    ...(geolocation || {}),
  };
}

export function track(event: string, issue: string) {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);

  // Only track if consent is granted
  if (consent !== "true") return;

  const base = getTrackingContext();

  const payload: z4.infer<typeof analyticsPayloadSchema> = {
    event_name: event,
    ...base,
    event_issue: issue,
  };

  navigator.sendBeacon(TRACKING_ROUTE, JSON.stringify(payload));
}
