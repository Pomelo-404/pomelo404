"use client";

import { useEffect, useRef, useState } from "react";
import ArrowIcon from "@/components/ArrowIcon";
import QuoteCalculator from "@/components/QuoteCalculator";
import HeroPomelo from "@/components/HeroPomelo";
import Iso from "@/components/Iso";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import ProjectShowcase from "@/components/ProjectShowcase";

/**
 * Interruptor temporal: cambia a true cuando haya testimonios reales aprobados.
 * Conserva el carrusel y sus datos listos para volver a publicarlos.
 */
const SHOW_REVIEWS = false;

const desktopMarqueeItems = [
  "Diseño con intención",
  "Desarrollo Next.js",
  "Movimiento con sabor",
  "Ideas que convierten",
];

const mobileMarqueeItems = ["Diseño web", "Next.js", "Con intención"];

function MarqueeTrack({
  items,
  variant,
}: {
  items: string[];
  variant: "desktop" | "mobile";
}) {
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

function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;

    if (root.hasAttribute("data-theme")) {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
      return;
    }

    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const nextTheme = systemDark ? "light" : "dark";

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Cambiar tema. Presiona nuevamente para volver al automático"
      title="Cambiar tema · segundo clic: automático"
      onClick={toggleTheme}
    >
      <svg
        className="theme-icon theme-icon-sun"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
      </svg>

      <svg
        className="theme-icon theme-icon-moon"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
      </svg>
    </button>
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

    if (savedTheme === "light" || savedTheme === "dark") {
      root.setAttribute("data-theme", savedTheme);
    }
    function followSystemTheme() {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    }
    systemTheme.addEventListener("change", followSystemTheme);
    return () => {
      systemTheme.removeEventListener("change", followSystemTheme);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    function closeMenuFromOutside(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (mobileMenuRef.current?.contains(target)) return;
      if (menuToggleRef.current?.contains(target)) return;

      setMenuOpen(false);
    }

    function closeMenuWithKeyboard(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuToggleRef.current?.focus({ preventScroll: true });
    }

    document.addEventListener("pointerdown", closeMenuFromOutside);
    document.addEventListener("keydown", closeMenuWithKeyboard);
    return () => {
      document.removeEventListener("pointerdown", closeMenuFromOutside);
      document.removeEventListener("keydown", closeMenuWithKeyboard);
    };
  }, [menuOpen]);

  return (
    <main>
      <header className="site-nav">
        <a className="logo" href="#inicio" aria-label="pomelo404, inicio">
          pomelo<span>404</span>
          <Iso variant="pixel" size={22} />
        </a>

        <button
          ref={menuToggleRef}
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
        >
          {menuOpen ? "Cerrar" : "Menú"}
          <span aria-hidden="true">{menuOpen ? "×" : "+"}</span>
        </button>
        <nav
          ref={mobileMenuRef}
          id="nav-links"
          className={menuOpen ? "nav-links is-open" : "nav-links"}
          aria-label="Navegación principal"
        >
          <a href="#proyectos" onClick={() => setMenuOpen(false)}>
            Proyectos
          </a>
          {SHOW_REVIEWS && (
            <a href="#reviews" onClick={() => setMenuOpen(false)}>
              Reviews
            </a>
          )}
          <a href="#cotizador" onClick={() => setMenuOpen(false)}>
            Cotizador
          </a>
          <a href="#alcance" onClick={() => setMenuOpen(false)}>
            Qué incluye
          </a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>
            Contacto
          </a>
          <a
            href="#cotizador"
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Cotiza ahora <span><ArrowIcon direction="up-right" /></span>
          </a>
          <div className="theme-controls">
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <section id="inicio" className="hero section-shell">
        <div className="hero-copy">
          <p className="kicker">
            <span /> Estudio web independiente · CDMX
          </p>
          <h1>
            Sitios que hacen <em>click.</em>
          </h1>
          <p className="hero-lede">
            Diseñamos y desarrollamos experiencias digitales frescas para marcas
            que quieren verse claras, vivas y difíciles de olvidar.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#cotizador">
              Cotiza en 2 min <span><ArrowIcon direction="down-right" /></span>
            </a>
            <a className="text-link" href="#proyectos">
              Ver proyectos <span><ArrowIcon direction="down" /></span>
            </a>
          </div>
        </div>
        <div className="hero-vector" aria-hidden="true">
          <div className="orbit orbit-one">
            <i />
          </div>
          <div className="orbit orbit-two">
            <i />
          </div>
          <HeroPomelo />
          <div className="spark spark-one">✦</div>
          <div className="spark spark-two">✦</div>
          <div className="mini-window">
            <span />
            <span />
            <span />
            <b>idea / web</b>
          </div>
          <div className="hero-satellite"><i /></div>
        </div>
        <div className="hero-proof">
          <b>Strategy · Design · Next.js</b>
          <span>Diseñado para convertir, construido para durar.</span>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <MarqueeTrack items={desktopMarqueeItems} variant="desktop" />
        <MarqueeTrack items={mobileMarqueeItems} variant="mobile" />
      </div>

      <section id="proyectos" className="projects section-shell section-space">
        <div className="section-intro">
          <div>
            <p className="section-index">01 / Proyectos</p>
            <h2>
              Trabajo que
              <br />
              <em>se mueve.</em>
            </h2>
          </div>
          <p>
            Identidad, UX y código trabajando juntos. Una selección de sitios
            hechos para conectar y convertir.
          </p>
        </div>
        <ProjectShowcase />
      </section>

      <QuoteCalculator key="quote-default-landing-1" />

      {/* Alcance visible: los extras del cotizador se explican antes del contacto. */}
      <section id="alcance" className="quote-inclusions section-shell" aria-labelledby="inclusions-title">
        <div className="quote-inclusions-intro">
          <p className="section-index">03 / Qué incluye</p>
          <h2 id="inclusions-title">
            Claridad desde
            <br />
            <em>el primer click.</em>
          </h2>
          <p>
            Cada propuesta se ajusta a tu proyecto. El cotizador marca el
            punto de partida; aquí está lo que construimos juntos.
          </p>
        </div>

        <div className="scope-card">
          <p>Alcance base</p>
          <ul>
            <li>Dirección de proyecto y una ruta de trabajo clara.</li>
            <li>Arquitectura de información y diseño responsive para móvil y escritorio.</li>
            <li>Desarrollo en Next.js, pruebas funcionales y publicación en Vercel.</li>
            <li>Una ronda de ajustes para cerrar contenido, detalles visuales y comportamiento.</li>
            <li>Entrega organizada para que el sitio pueda crecer contigo después del lanzamiento.</li>
          </ul>
          <small>
            El número de páginas y cualquier función especial se confirman en
            la propuesta final.
          </small>
        </div>

        <div className="inclusion-grid">
          <article>
            <span>01</span>
            <h3>Identidad visual</h3>
            <p>
              Un sistema visual para que el sitio se sienta propio: dirección,
              color, tipografía y aplicaciones digitales esenciales. Definimos
              una base consistente para que cada pantalla hable el mismo idioma.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Copywriting</h3>
            <p>
              Mensajes, jerarquía y llamadas a la acción que expliquen tu
              valor sin sonar como todo el mundo. Incluye una estructura de
              contenido clara para que las personas encuentren lo importante.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Motion avanzado</h3>
            <p>
              Movimiento a medida, transiciones y microinteracciones que dan
              ritmo al sitio sin estorbar la experiencia. Diseñamos cada gesto
              para acompañar la navegación, no para distraer.
            </p>
          </article>
          <article>
            <span>04</span>
            <h3>CMS autogestionable</h3>
            <p>
              Un panel claro para actualizar contenido, proyectos o noticias
              sin depender de nosotros cada vez. Dejamos una estructura fácil
              de usar y una guía breve para que tu equipo tenga autonomía.
            </p>
          </article>
        </div>
      </section>
      <div className="quote-inclusions-divider section-shell" aria-hidden="true">
        <span />
        <b>alcance claro · propuesta a medida</b>
        <span />
      </div>

      {SHOW_REVIEWS && <ReviewsCarousel />}

      <section id="contacto" className="contact section-shell">
        <div className="contact-art" aria-hidden="true">
          <div className="contact-fruit">✦</div>
          <span>¡Di hola!</span>
        </div>
        <div className="contact-copy">
          <p className="section-index">{SHOW_REVIEWS ? "05" : "04"} / Contacto</p>
          <h2>
            ¿Traes una
            <br />
            <em>buena idea?</em>
          </h2>
          <p>
            Cuéntanos qué quieres lanzar, mejorar o transformar. Respondemos en
            1–2 días hábiles.
          </p>
          <a href="mailto:hola@pomelo404.com" className="contact-email">
            hola@pomelo404.com <span><ArrowIcon direction="up-right" /></span>
          </a>
        </div>
      </section>

      <footer className="site-footer section-shell">
        <a className="logo" href="#inicio">
          pomelo<span>404</span>
          <Iso variant="pixel" size={22} />
        </a>
        <p>Webs frescas, sin partes amargas.</p>
        <div>
          <span>© 2026</span>
          <a href="/legacy/">Versión básica</a>
          <a href="#inicio">Volver arriba <ArrowIcon direction="up" /></a>
        </div>
      </footer>
    </main>
  );
}
