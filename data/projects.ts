export type Project = {
  slug: string;
  name: string;
  category: string;
  copy: string;
  tone: "coral" | "blue" | "lime" | "forma";
  mark?: string;
  href?: string;
  cover?: string;
  coverAlt?: string;
  image?: string;
  imageAlt?: string;
  services?: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "forma-libre",
    name: "Forma Libre",
    category: "Plataforma digital · 2026",
    copy: "Biblioteca abierta de arquitectura para explorar, compartir y adquirir planos editables.",
    tone: "forma",
    href: "https://formalibre.mx",
    cover: "/projects/forma-libre/cover.webp",
    coverAlt:
      "Página de inicio de Forma Libre, biblioteca digital de arquitectura",
    services: ["Estrategia", "Identidad", "UX/UI", "Desarrollo", "E-commerce"],
    featured: true,
  },
  {
    slug: "vision-planet",
    name: "Vision Planet",
    category: "Plataforma · 2026",
    copy: "Catálogo digital de lentes.",
    tone: "blue",
    mark: "✦",
    image: "/projects/vision-planet.png",
    imageAlt: "Vista previa del catálogo de Vision Planet",
  },
  {
    slug: "Charrería",
    name: "Charrería",
    category: "Base de datos museográfica · 2026",
    copy: "Archivo digital de piezas históricas.",
    tone: "lime",
    mark: "n/",
    image: "/projects/charreria.png",
    imageAlt: "Vista previa del archivo de Charrería",
  },
];
