"use client";

import { useMemo, useState } from "react";
import type { AddOn, ProjectType, Timeline } from "@/data/pricing";
import { calculateEstimate, createWhatsAppUrl } from "@/lib/quotation";

export function useQuote() {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>("landing");
  const [pages, setPages] = useState(1);
  const [timeline, setTimeline] = useState<Timeline>("normal");
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  const input = useMemo(
    () => ({ projectName, projectType, pages, timeline, selectedAddOns }),
    [pages, projectName, projectType, selectedAddOns, timeline],
  );
  const estimate = useMemo(() => calculateEstimate(input), [input]);
  const whatsappUrl = useMemo(
    () => createWhatsAppUrl(input, estimate),
    [estimate, input],
  );

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
