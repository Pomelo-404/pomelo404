export type ProjectType = "landing" | "website" | "commerce";
export type AddOn = "brand" | "copy" | "motion" | "cms";
export type Timeline = "normal" | "express";

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
    base: 8000,
    // Ancla la curva en $8,000 (1 página) y $91,000 (20 páginas).
    pricePerExtraPage: (91_000 - 8_000) / 19,
  },
  {
    id: "website",
    label: "Sitio de marca",
    note: "Historia, servicios y leads",
    base: 48000,
    pricePerExtraPage: 3500,
  },
  {
    id: "commerce",
    label: "E-commerce",
    note: "Catálogo y checkout",
    base: 78000,
    pricePerExtraPage: 3500,
  },
];

export const ADD_ONS: Array<{
  id: AddOn;
  label: string;
  price: number;
}> = [
  { id: "brand", label: "Identidad visual", price: 18000 },
  { id: "copy", label: "Copywriting", price: 9000 },
  { id: "motion", label: "Motion avanzado", price: 12000 },
  { id: "cms", label: "CMS autogestionable", price: 10000 },
];

export const EXPRESS_MULTIPLIER = 1.2;
