import { DEFAULT_PREFERENCES } from "@/lib/constants/general";
import type {
  CookiePreferences,
  CookiePreferencesAction,
  CookiePreferencesState,
} from "@/lib/types/general";

export const cookiePreferencesInitialState: CookiePreferencesState = {
  isCookieDialogueBoxVisible: false,
  showAllCookiePreferences: false,
  cookiePreferences: DEFAULT_PREFERENCES,
  hasConsented: false,
};

export function cookiePreferencesReducer(
  state: CookiePreferencesState,
  action: CookiePreferencesAction,
): CookiePreferencesState {
  switch (action.type) {
    case "INIT_CONSENTED":
      return {
        ...state,
        hasConsented: true,
        isCookieDialogueBoxVisible: false,
        cookiePreferences: action.preferences,
      };
    case "SHOW_MODAL":
      return { ...state, isCookieDialogueBoxVisible: true };
    case "HIDE_MODAL":
      return { ...state, isCookieDialogueBoxVisible: false };
    case "SAVE":
      return {
        ...state,
        hasConsented: true,
        isCookieDialogueBoxVisible: false,
        showAllCookiePreferences: false,
        cookiePreferences: action.preferences,
      };
    case "OPEN_SETTINGS":
      return {
        ...state,
        isCookieDialogueBoxVisible: true,
        showAllCookiePreferences: false,
      };
    case "SET_PREFERENCES":
      return { ...state, cookiePreferences: action.preferences };
    case "TOGGLE_ALL_PREFERENCES":
      return { ...state, showAllCookiePreferences: action.show };
    default:
      return state;
  }
}

/** Parse JSON from `localStorage`; returns `fallback` if invalid. */
export function parseStoredCookiePreferencesJson(
  raw: string,
  fallback: CookiePreferences,
): CookiePreferences {
  try {
    return JSON.parse(raw) as CookiePreferences;
  } catch {
    return fallback;
  }
}

export type { CookiePreferencesAction, CookiePreferencesState } from "@/lib/types/general";
