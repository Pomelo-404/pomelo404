import {
  ADD_ONS,
  EXPRESS_MULTIPLIER,
  PRICE_PER_EXTRA_PAGE,
  PROJECT_TYPES,
  type AddOn,
  type ProjectType,
  type Timeline,
} from "@/data/pricing";

// Placeholder: reemplazar por el número de WhatsApp Business con código de país.
export const WHATSAPP_NUMBER = "523330276670";

export const formatMoney = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
}).format;

export type QuoteInput = {
  projectName: string;
  projectType: ProjectType;
  pages: number;
  timeline: Timeline;
  selectedAddOns: AddOn[];
};

export function calculateEstimate({
  projectType,
  pages,
  timeline,
  selectedAddOns,
}: QuoteInput) {
  const base = PROJECT_TYPES.find((type) => type.id === projectType)?.base ?? 0;
  const pagesCost = Math.max(0, pages - 1) * PRICE_PER_EXTRA_PAGE;
  const extrasCost = ADD_ONS.filter((item) =>
    selectedAddOns.includes(item.id),
  ).reduce((sum, item) => sum + item.price, 0);
  const multiplier = timeline === "express" ? EXPRESS_MULTIPLIER : 1;

  return (
    Math.round(((base + pagesCost + extrasCost) * multiplier) / 1000) * 1000
  );
}

export function createWhatsAppUrl(input: QuoteInput, estimate: number) {
  const project =
    PROJECT_TYPES.find((item) => item.id === input.projectType)?.label ??
    "Sitio web";
  const extras =
    ADD_ONS.filter((item) => input.selectedAddOns.includes(item.id))
      .map((item) => item.label)
      .join(", ") || "Sin extras";

  const projectName = input.projectName.trim();
  const message = [
    "¡Hola!",
    "Acabo de completar el cotizador y quiero platicar de mi proyecto.",
    "",
    projectName ? `Nombre: ${projectName}` : null,
    `Proyecto: ${project}`,
    `Páginas: ${input.pages}`,
    `Extras: ${extras}`,
    `Entrega: ${input.timeline === "express" ? "Express" : "6–8 semanas"}`,
    `Estimado: ${formatMoney(estimate)} MXN + IVA`,
    `Rango probable: ${formatMoney(estimate * 0.9)} — ${formatMoney(estimate * 1.1)}`,
    "",
    "Me gustaría conocer los siguientes pasos.",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
