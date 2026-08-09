export type ProjectType = "landing" | "website" | "commerce";
export type AddOn = "brand" | "copy" | "motion" | "cms";
export type Timeline = "normal" | "express";

export const PROJECT_TYPES: Array<{
  id: ProjectType;
  label: string;
  note: string;
  base: number;
}> = [
  { id: "landing", label: "Landing page", note: "Una idea, una acción", base: 24000 },
  { id: "website", label: "Sitio de marca", note: "Historia, servicios y leads", base: 48000 },
  { id: "commerce", label: "E-commerce", note: "Catálogo y checkout", base: 78000 },
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

export const PRICE_PER_EXTRA_PAGE = 3500;
export const EXPRESS_MULTIPLIER = 1.2;
