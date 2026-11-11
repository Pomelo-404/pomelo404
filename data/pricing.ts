export type ProjectType = "landing" | "website" | "commerce" | "redesign";
export type AddOn = "brand" | "copy" | "motion" | "cms";
export type Timeline = "normal" | "express";

/**
 * ╔═════════════════════════════════════════════════════════════════════════╗
 * ║ AJUSTES DE PRECIOS · editar únicamente estos valores en MXN             ║
 * ║ El cotizador, WhatsApp y el rango estimado los consumen automáticamente.║
 * ╚═════════════════════════════════════════════════════════════════════════╝
 */
export const PRICING_SETTINGS = {
  pages: { min: 1, max: 20, rounding: 1_000 },
  landing: { base: 6_000, extraPage: 3_500, minimumWithAdditionalScope: 8_000 },
  website: { base: 28_000, extraPage: 3_500 },
  commerce: { base: 45_000, extraPage: 4_500 },
  // Rediseño inicia arriba de una landing: contempla diagnóstico y adaptación.
  redesign: { base: 8_000, extraPage: 3_500 },
  addOns: { brand: 14_000, copy: 6_500, motion: 7_500, cms: 9_000 },
  expressMultiplier: 1.25,
  estimateRangePercent: 0.1,
} as const;

export const PROJECT_TYPES: Array<{
  id: ProjectType;
  label: string;
  note: string;
  base: number;
  pricePerExtraPage: number;
}> = [
  {
    id: "landing",
    label: "Landing page",
    note: "Una idea, una acción",
    // $6,500 solo aplica a una landing de una página sin adicionales.
    base: PRICING_SETTINGS.landing.base,
    pricePerExtraPage: PRICING_SETTINGS.landing.extraPage,
  },
  {
    id: "website",
    label: "Sitio de marca",
    note: "Historia, servicios y leads",
    base: PRICING_SETTINGS.website.base,
    pricePerExtraPage: PRICING_SETTINGS.website.extraPage,
  },
  {
    id: "commerce",
    label: "E-commerce",
    note: "Catálogo y checkout",
    base: PRICING_SETTINGS.commerce.base,
    pricePerExtraPage: PRICING_SETTINGS.commerce.extraPage,
  },
  {
    id: "redesign",
    label: "Rediseño o actualización",
    note: "Tu sitio actual, renovado",
    base: PRICING_SETTINGS.redesign.base,
    pricePerExtraPage: PRICING_SETTINGS.redesign.extraPage,
  },
];

export const ADD_ONS: Array<{
  id: AddOn;
  label: string;
  price: number;
}> = [
  { id: "brand", label: "Identidad visual", price: PRICING_SETTINGS.addOns.brand },
  { id: "copy", label: "Copywriting", price: PRICING_SETTINGS.addOns.copy },
  { id: "motion", label: "Motion avanzado", price: PRICING_SETTINGS.addOns.motion },
  { id: "cms", label: "CMS autogestionable", price: PRICING_SETTINGS.addOns.cms },
];

export const EXPRESS_MULTIPLIER = PRICING_SETTINGS.expressMultiplier;
