"use client";

import { useEffect, useRef, useState } from "react";
import ArrowIcon from "@/components/ArrowIcon";
import HeroPomelo from "@/components/HeroPomelo";
import Iso from "@/components/Iso";
import ProjectShowcase from "@/components/ProjectShowcase";
import QuoteCalculator from "@/components/QuoteCalculator";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import ThemeToggle from "@/components/ThemeToggle";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatWeDoCarousel from "@/components/WhatWeDoCarousel";
import { WHATSAPP_NUMBER } from "@/lib/quotation";

/** Actívalo cuando haya testimonios reales aprobados. */
const SHOW_REVIEWS = false;
const CONTACT_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola pomelo404, quiero platicar de mi proyecto.")}`;
const REDESIGN_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola pomelo404, ya tengo un sitio y quiero renovarlo.")}`;

const desktopMarqueeItems = [
  "Diseño con intención",
  "Desarrollo Next.js",
  "Movimiento con sabor",
  "Sitios que se renuevan",
  "Ideas que convierten",
];
const mobileMarqueeItems = ["Diseño web", "Rediseño", "Next.js", "Con intención"];

function MarqueeTrack({ items, variant }: { items: string[]; variant: "desktop" | "mobile" }) {
  return (
    <div className={`marquee-track marquee-track--${variant}`}>
      {[0, 1].map((copy) => (
        <div className="marquee-group" key={copy}>
          {items.flatMap((item) => [
            <span key={`${copy}-${item}`}>{item}</span>,
            <b key={`${copy}-${item}-separator`}>✦</b>,
          ])}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") root.setAttribute("data-theme", savedTheme);

    const followSystemTheme = () => {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    };
    systemTheme.addEventListener("change", followSystemTheme);
    return () => systemTheme.removeEventListener("change", followSystemTheme);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeFromOutside = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (mobileMenuRef.current?.contains(target) || menuToggleRef.current?.contains(target)) return;
      setMenuOpen(false);
    };
    const closeWithKeyboard = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuToggleRef.current?.focus({ preventScroll: true });
    };
    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeWithKeyboard);
    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeWithKeyboard);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-nav">
        <a className="logo" href="#inicio" aria-label="pomelo404, inicio">pomelo<span>404</span><Iso variant="pixel" size={22} /></a>
        <button ref={menuToggleRef} className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="nav-links">
          {menuOpen ? "Cerrar" : "Menú"}<span aria-hidden="true">{menuOpen ? "×" : "+"}</span>
        </button>
        <nav ref={mobileMenuRef} id="nav-links" className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Navegación principal">
          <a href="#que-hacemos" onClick={closeMenu}>Qué hacemos</a>
          <a href="#proyectos" onClick={closeMenu}>Proyectos</a>
          {SHOW_REVIEWS && <a href="#reviews" onClick={closeMenu}>Reviews</a>}
          <a href="#cotizador" onClick={closeMenu}>Cotizador</a>
          <a href="#alcance" onClick={closeMenu}>Qué incluye</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
          <a href="#cotizador" className="nav-cta" onClick={closeMenu}>Cotiza ahora <span><ArrowIcon direction="up-right" /></span></a>
          <div className="theme-controls"><ThemeToggle /></div>
        </nav>
      </header>

      <section id="inicio" className="hero section-shell">
        <div className="hero-copy">
          <p className="kicker"><span /> Estudio web independiente · CDMX</p>
          <h1>Sitios que hacen <em>click.</em></h1>
          <p className="hero-lede">Creamos sitios nuevos y renovamos los que ya existen, para marcas que quieren verse claras, vivas y difíciles de olvidar.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#cotizador">Cotiza en 2 min <span><ArrowIcon direction="down-right" /></span></a>
            <a className="text-link" href="#proyectos">Ver proyectos <span><ArrowIcon direction="down" /></span></a>
          </div>
        </div>
        <div className="hero-vector" aria-hidden="true">
          <div className="orbit orbit-one"><i /></div><div className="orbit orbit-two"><i /></div>
          <HeroPomelo /><div className="spark spark-one">✦</div><div className="spark spark-two">✦</div>
          <div className="mini-window"><span /><span /><span /><b>idea / web</b></div><div className="hero-satellite"><i /></div>
        </div>
        <div className="hero-proof"><b>Estrategia · Diseño · Next.js</b><span>Diseñado para convertir, construido para durar.</span></div>
      </section>

      <div className="marquee" aria-hidden="true"><MarqueeTrack items={desktopMarqueeItems} variant="desktop" /><MarqueeTrack items={mobileMarqueeItems} variant="mobile" /></div>

      <section id="que-hacemos" className="what-we-do section-shell section-space" aria-labelledby="what-we-do-title">
        <div className="what-we-do-intro">
          <p className="section-index">01 / Qué hacemos</p>
          <h2 id="what-we-do-title">Empezamos desde cero<br /><em>o desde donde ya estás.</em></h2>
          <p>pomelo404 es un estudio web independiente en CDMX. Diseñamos y desarrollamos sitios nuevos, sí. Pero también tomamos el que ya tienes —el que se quedó en otra época, carga lento o ya no cuenta bien tu historia— y lo actualizamos, lo adaptamos y lo volvemos a poner a trabajar. No importa si tu web nace hoy o nació hace cinco años: lo que importa es que haga click con quien la visita.</p>
        </div>
        <WhatWeDoCarousel />
        <div className="what-we-do-actions">
          <p>¿Tienes un sitio y no sabes si rehacerlo o arreglarlo? Mándanos el link y te decimos qué conviene.</p>
          <div><a className="text-link" href="#cotizador">Cotizar un rediseño <span><ArrowIcon direction="down-right" /></span></a><WhatsAppButton href={REDESIGN_WHATSAPP_URL}>Escribenos por WhatsApp</WhatsAppButton></div>
        </div>
      </section>

      <section id="proyectos" className="projects section-shell section-space">
        <div className="section-intro"><div><p className="section-index">02 / Proyectos</p><h2>Trabajo que<br /><em>se mueve.</em></h2></div><p>Identidad, UX y código trabajando juntos. Una selección de sitios hechos y rehechos para conectar y convertir.</p></div>
        <ProjectShowcase />
      </section>

      <QuoteCalculator key="quote-default-landing-1" />

      <section id="alcance" className="quote-inclusions section-shell" aria-labelledby="inclusions-title">
        <div className="quote-inclusions-intro"><p className="section-index">04 / Qué incluye</p><h2 id="inclusions-title">Claridad desde<br /><em>el primer click.</em></h2><p>Cada propuesta se ajusta a tu proyecto. El cotizador marca el punto de partida; aquí está lo que construimos juntos.</p></div>
        <div className="scope-card"><p>Alcance base</p><ul><li>Dirección de proyecto y una ruta de trabajo clara.</li><li>Arquitectura de información y diseño responsive para móvil y escritorio.</li><li>Desarrollo en Next.js, rápido, seguro y fácil de mantener; pruebas funcionales y publicación en Vercel.</li><li>Una ronda de ajustes para cerrar contenido, detalles visuales y comportamiento.</li><li>Entrega organizada para que el sitio pueda crecer contigo después del lanzamiento.</li></ul><small>El número de páginas y cualquier función especial se confirman en la propuesta final.</small></div>
        <div className="inclusion-grid">
          <article><span>01</span><h3>Identidad visual</h3><p>Un sistema visual para que el sitio se sienta propio: dirección, color, tipografía y aplicaciones digitales esenciales. Definimos una base consistente para que cada pantalla hable el mismo idioma.</p></article>
          <article><span>02</span><h3>Copywriting</h3><p>Mensajes, jerarquía y llamadas a la acción que expliquen tu valor sin sonar como todo el mundo. Incluye una estructura de contenido clara para que las personas encuentren lo importante.</p></article>
          <article><span>03</span><h3>Motion avanzado</h3><p>Movimiento a medida, transiciones y microinteracciones que dan ritmo al sitio sin estorbar la experiencia. Diseñamos cada gesto para acompañar la navegación, no para distraer.</p></article>
          <article><span>04</span><h3>CMS autogestionable</h3><p>Un panel claro para actualizar contenido, proyectos o noticias sin depender de nosotros cada vez. Dejamos una estructura fácil de usar y una guía breve para que tu equipo tenga autonomía.</p></article>
          <article className="inclusion-redesign"><span>05</span><h3>Rediseño y actualización</h3><p>Tomamos el sitio que ya tienes y lo ponemos al día sin empezar de cero cuando no hace falta. Revisamos qué funciona y qué estorba, renovamos diseño, contenido y velocidad, y migramos lo que valga la pena conservar. Tú decides cuánto cambiar; nosotros hacemos que el resultado se sienta nuevo y siga siendo tuyo.</p></article>
        </div>
      </section>
      <div className="quote-inclusions-divider section-shell" aria-hidden="true"><span /><b>alcance claro · propuesta a medida</b><span /></div>

      {SHOW_REVIEWS && <ReviewsCarousel />}

      <section id="contacto" className="contact section-shell">
        <div className="contact-art" aria-hidden="true"><div className="contact-fruit">✦</div><span>¡Di hola!</span></div>
        <div className="contact-copy"><p className="section-index">{SHOW_REVIEWS ? "06" : "05"} / Contacto</p><h2>¿Traes una<br /><em>buena idea?</em></h2><p>Cuéntanos qué quieres lanzar, mejorar o transformar. Si ya tienes sitio, mándanos el link para conocerlo. Respondemos en 1–2 días hábiles.</p><a href="mailto:hola@pomelo404.com" className="contact-email">hola@pomelo404.com <span><ArrowIcon direction="up-right" /></span></a><WhatsAppButton className="contact-whatsapp" href={CONTACT_WHATSAPP_URL}>Escribienos por WhatsApp</WhatsAppButton></div>
      </section>

      <footer className="site-footer section-shell"><a className="logo" href="#inicio">pomelo<span>404</span><Iso variant="pixel" size={22} /></a><p>Webs frescas, sin partes amargas.</p><div><span>© 2026 pomelo404</span><a href="/legacy/">Versión ligera</a><a href="#inicio">Volver arriba <ArrowIcon direction="up" /></a></div></footer>
    </main>
  );
}
