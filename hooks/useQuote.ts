"use client";

import { useMemo, useState } from "react";
import type { AddOn, ProjectType, Timeline } from "@/data/pricing";
import { calculateEstimate, createWhatsAppUrl } from "@/lib/quotation";

export function useQuote() {
  // Estado único del cotizador. Los importes se derivan en lugar de guardarse,
  // para evitar que UI, WhatsApp y resumen puedan desincronizarse.
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>("landing");
  const [pages, setPages] = useState(1);
  const [timeline, setTimeline] = useState<Timeline>("normal");
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  // Memoriza el mismo objeto de entrada para ambos cálculos derivados.
  const input = useMemo(
    () => ({ projectName, projectType, pages, timeline, selectedAddOns }),
    [pages, projectName, projectType, selectedAddOns, timeline],
  );
  const estimate = useMemo(() => calculateEstimate(input), [input]);
  const whatsappUrl = useMemo(
    () => createWhatsAppUrl(input, estimate),
    [estimate, input],
  );

  // Agrega o elimina un adicional sin mutar el arreglo anterior de React.
  const toggleAddOn = (id: AddOn) => {
    setSelectedAddOns((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return {
    projectName,
    setProjectName,
    projectType,
    setProjectType,
    pages,
    setPages,
    timeline,
    setTimeline,
    selectedAddOns,
    toggleAddOn,
    estimate,
    whatsappUrl,
  };
}
