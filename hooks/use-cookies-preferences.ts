"use client";

import { useReducer, useEffect } from "react";
import { useIsMounted } from "./use-is-mounted";
import {
  ALL_PREFERENCES,
  COOKIE_CONSENT_KEY,
  COOKIE_PREFERENCES_KEY,
  DEFAULT_PREFERENCES,
} from "@/lib/constants/general";
import type { CookiePreferences } from "@/lib/types/general";
import {
  cookiePreferencesInitialState,
  cookiePreferencesReducer,
  parseStoredCookiePreferencesJson,
} from "@/lib/utils/cookie-preferences-reducer";

export default function useCookiesPreferences() {
  const mounted = useIsMounted();
  const [state, dispatch] = useReducer(
    cookiePreferencesReducer,
    cookiePreferencesInitialState,
  );

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (consent && savedPreferences) {
      const parsed = parseStoredCookiePreferencesJson(
        savedPreferences,
        DEFAULT_PREFERENCES,
      );
      dispatch({ type: "INIT_CONSENTED", preferences: parsed });
    } else {
      const timer = setTimeout(
        () => dispatch({ type: "SHOW_MODAL" }),
        1500,
      );
      return () => clearTimeout(timer);
    }
  }, []);

  function saveCookiePreferences(prefs: CookiePreferences) {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    dispatch({ type: "SAVE", preferences: prefs });
  }

  return {
    mounted,
    hasConsented: state.hasConsented,
    isCookieDialogueBoxVisible: state.isCookieDialogueBoxVisible,
    showAllCookiePreferences: state.showAllCookiePreferences,
    cookiePreferences: state.cookiePreferences,
    setIsCookieDialogueBoxVisible: (v: boolean) =>
      dispatch({ type: v ? "SHOW_MODAL" : "HIDE_MODAL" }),
    setCookiePreferences: (prefs: CookiePreferences) =>
      dispatch({ type: "SET_PREFERENCES", preferences: prefs }),
    setShowAllCookiePreferences: (v: boolean) =>
      dispatch({ type: "TOGGLE_ALL_PREFERENCES", show: v }),
    handleAcceptAllCookies: () => saveCookiePreferences(ALL_PREFERENCES),
    handleAcceptEssentialCookiesOnly: () =>
      saveCookiePreferences(DEFAULT_PREFERENCES),
    handleCustomCookies: () => saveCookiePreferences(state.cookiePreferences),
    handleOpenSettings: () => dispatch({ type: "OPEN_SETTINGS" }),
  };
}
