"use client";

import { useEffect, useState } from "react";
import { getLegalDocument } from "@/lib/services/firestore/queries";
import type { LegalDocumentDoc, LegalDocumentId } from "@/lib/types/firestore";

export function useLegalDocument(id: LegalDocumentId) {
  const [legal, setLegal] = useState<LegalDocumentDoc | null>(null);

  useEffect(() => {
    getLegalDocument(id)
      .then(setLegal)
      .catch(() => {});
  }, [id]);

  return legal;
}
