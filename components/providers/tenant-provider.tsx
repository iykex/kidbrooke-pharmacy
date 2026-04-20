"use client";

import { getTenantSlug } from "@/lib/config/tenant";
import { getTenant } from "@/lib/services/firestore/queries";
import {
  tenantDocForClient,
} from "@/lib/services/firestore/serialize-for-client";
import type { TenantDocClient } from "@/lib/types/firestore-client";
import type {
  TenantContextValue,
  TenantLoadStatus,
} from "@/lib/types/tenant-context";
import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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
