"use client";

import { Cookie, X, Settings, Shield, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import useCookiesPreferences from "@/hooks/use-cookies-preferences";
import {
  COOKIE_PREFERENCES_ITEMS,
  INTERNAL_LINKS,
  TRACKING_EVENTS,
} from "@/lib/constants/general";
import { track } from "@/lib/analytics/tracker";

export default function CookieConsentDialogue({
  bubbleStateClassName,
}: {
  bubbleStateClassName?: string;
}) {
  const {
    mounted,
    handleAcceptAllCookies,
    handleAcceptEssentialCookiesOnly,
    handleOpenSettings,
    cookiePreferences,
    handleCustomCookies,
    setCookiePreferences,
    hasConsented,
    isCookieDialogueBoxVisible,
    setIsCookieDialogueBoxVisible,
    setShowAllCookiePreferences,
    showAllCookiePreferences,
  } = useCookiesPreferences();

  // Don't render until mounted on client
  if (!mounted) return null;

  // Minimized bubble state (after consent)
  if (hasConsented && !isCookieDialogueBoxVisible) {
    return (
      <Button
        onClick={() => {
          handleOpenSettings();
          track(TRACKING_EVENTS.cookieToggleButton, "coookie button toggled");
        }}
        className={cn(
          "cookie-settings-bubble fixed bottom-4 left-6 z-40 size-9 lg:size-10 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          "bg-card border border-border",
          "hover:shadow-xl",
          bubbleStateClassName,
        )}
        aria-label="Cookie settings"
      >
        <Cookie className="cookie-settings-icon size-5 text-primary" />
      </Button>
    );
  }

  // Main cookie consent dialog
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-6 sm:right-auto z-50 transition-all duration-500",
        isCookieDialogueBoxVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none",
      )}
    >
      <div
        className={cn(
          "bg-card border border-border rounded-t-3xl sm:rounded-3xl shadow-2xl",
          "w-full sm:w-[420px] max-h-[90vh] overflow-hidden",
          "transition-all duration-300",
        )}
      >
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-linear-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/10 rounded-2xl">
                <Cookie className="size-7 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-foreground">
                  Cookie Preferences
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manage your privacy settings
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                if (hasConsented) {
                  setIsCookieDialogueBoxVisible(false);
                }
              }}
              variant="ghost"
              className={cn(
                "p-2 rounded-xl bg-destructive/10 hover:bg-destructive/20 transition-colors",
                !hasConsented && "opacity-50 cursor-not-allowed",
              )}
              disabled={!hasConsented}
              aria-label="Minimize"
            >
              <X className="size-5 text-destructive" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {showAllCookiePreferences ? (
            <div>
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  We use cookies to enhance your browsing experience, analyze
                  site traffic, and personalize content. By clicking
                  &quot;Accept All&quot;, you consent to our use of cookies.
                </p>
                <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl mb-6">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <Shield className="size-5 text-green-600" />
                  </div>
                  <p className="text-sm text-green-800 font-medium">
                    Your data is protected and never sold to third parties.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    handleAcceptAllCookies();
                    track(
                      TRACKING_EVENTS.cookieAcceptAll,
                      "all cookies accepted",
                    );
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-2xl text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  Accept All Cookies
                </Button>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      handleAcceptEssentialCookiesOnly();
                      track(
                        TRACKING_EVENTS.cookieEssentialOnly,
                        "accepted essential cookies only",
                      );
                    }}
                    variant="outline"
                    className="flex-1 py-5 rounded-2xl border-2 border-border font-semibold hover:bg-secondary transition-all"
                  >
                    Essential Only
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAllCookiePreferences(false);
                      track(
                        TRACKING_EVENTS.cookieCustomiseView,
                        "viewed custom cookies interface",
                      );
                    }}
                    variant="outline"
                    className="flex-1 py-5 rounded-2xl border-2 border-border font-semibold hover:bg-secondary transition-all"
                  >
                    <Settings className="size-4 mr-2" />
                    Customize
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              {COOKIE_PREFERENCES_ITEMS.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-secondary rounded-2xl border border-border cursor-pointer hover:border-primary/30 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={
                        item.id === "essential"
                          ? true
                          : cookiePreferences[item.key]
                      }
                      disabled={item.id === "essential" ? true : false}
                      onChange={(e) => {
                        if (item.id !== "essential") {
                          setCookiePreferences({
                            ...cookiePreferences,
                            [item.key]: e.target.checked,
                          });
                        }
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-7 bg-muted-foreground/30 rounded-full peer peer-checked:bg-primary peer-disabled:opacity-50 transition-colors" />
                    <div className="absolute top-0.5 left-0.5 w-6 h-6 bg-muted rounded-full shadow-md peer-checked:translate-x-5 peer-disabled:opacity-50 transition-transform flex items-center justify-center">
                      <Check
                        className={cn(
                          "size-3.5 text-primary dark:text-white hidden",
                          cookiePreferences[item.key] && "block",
                        )}
                      />
                    </div>
                  </div>
                </label>
              ))}

              <div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => {
                      handleCustomCookies();
                      track(
                        TRACKING_EVENTS.cookieCustomise,
                        "created custom cookies",
                      );
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-2xl text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    Save Preferences
                  </Button>
                  <Button
                    onClick={() => setShowAllCookiePreferences(true)}
                    variant="outline"
                    className="w-full py-5 gap-0.5 text-muted-foreground hover:text-foreground font-medium"
                  >
                    <ChevronLeft className="size-4" />
                    Overview
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Link */}
          <p className="text-center text-xs text-muted-foreground mt-5">
            Learn more in our{" "}
            <Link
              href={INTERNAL_LINKS.privacyPolicyPage}
              className="text-primary hover:underline font-medium"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href={INTERNAL_LINKS.cookiePolicyPage}
              className="text-primary hover:underline font-medium"
            >
              Cookie Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
