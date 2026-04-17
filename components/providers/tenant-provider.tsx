"use client";

import { getTenantSlug, type TenantSlug } from "@/lib/config/tenant";
import { getTenant } from "@/lib/services/firestore/queries";
import {
  tenantDocForClient,
  type TenantDocClient,
} from "@/lib/services/firestore/serialize-for-client";
import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type TenantLoadStatus = "loading" | "ready" | "error";

export type TenantContextValue = {
  tenant: TenantDocClient | null;
  status: TenantLoadStatus;
  /** True when Firestore returned a published tenant document */
  isTenantReady: boolean;
  slug: TenantSlug;
};

const TenantContext = createContext<TenantContextValue | null>(null);

export function TenantProvider({ children }: { children: ReactNode }) {
  const slug = getTenantSlug();
  const [tenant, setTenant] = useState<TenantDocClient | null>(null);
  const [status, setStatus] = useState<TenantLoadStatus>("loading");

  useEffect(() => {
    let cancelled = false;
    startTransition(() => {
      setStatus("loading");
      setTenant(null);
    });

    getTenant(slug)
      .then((doc) => {
        if (cancelled) return;
        if (doc && doc.published) {
          setTenant(tenantDocForClient(doc));
          setStatus("ready");
        } else {
          setTenant(null);
          setStatus("error");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTenant(null);
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const isTenantReady = status === "ready" && tenant !== null;

  return (
    <TenantContext.Provider value={{ tenant, status, isTenantReady, slug }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenantContext(): TenantContextValue {
  const ctx = useContext(TenantContext);
  if (!ctx) {
    throw new Error("useTenantContext must be used within TenantProvider");
  }
  return ctx;
}
