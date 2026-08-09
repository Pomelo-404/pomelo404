"use client";

import { useEffect, useState } from "react";
import QuoteCalculator from "@/components/QuoteCalculator";
import Iso from "@/components/Iso";

const projects = [
  {
    name: "Miga",
    category: "E-commerce · 2026",
    copy: "Una panadería digital que se siente recién horneada.",
    tone: "coral",
    mark: "m.",
  },
  {
    name: "Faro",
    category: "Plataforma · 2025",
    copy: "Cultura y agenda local sin perderse en el scroll.",
    tone: "blue",
    mark: "✦",
  },
  {
    name: "Nido",
    category: "Brand site · 2025",
    copy: "Hospitalidad cálida, reservaciones simples.",
    tone: "lime",
    mark: "n/",
  },
];

const reviews = [
  {
    quote:
      "Entendieron la idea antes de que nosotros supiéramos explicarla. El sitio se siente totalmente nuestro.",
    name: "Sofía R.",
    role: "Co-fundadora, Miga",
  },
  {
    quote:
      "Pasamos de explicar demasiado a recibir leads que ya entendían el valor. El cambio fue inmediato.",
    name: "Andrés M.",
    role: "Director, Faro",
  },
  {
    quote:
      "Proceso claro, cero drama y un resultado que da gusto compartir. Volveríamos a trabajar con ellos.",
    name: "Paula G.",
    role: "Fundadora, Nido",
  },
];

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

  return (
    <main>
      <header className="site-nav">
        <a className="logo" href="#inicio" aria-label="pomelo404, inicio">
          pomelo<span>404</span>
          <Iso variant="pixel" size={22} />
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
        >
          {menuOpen ? "Cerrar" : "Menú"}
          <span aria-hidden="true">{menuOpen ? "×" : "+"}</span>
        </button>
        <nav
          id="nav-links"
          className={menuOpen ? "nav-links is-open" : "nav-links"}
          aria-label="Navegación principal"
        >
          <a href="#proyectos" onClick={() => setMenuOpen(false)}>
            Proyectos
          </a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>
            Reviews
          </a>
          <a
            href="#cotizador"
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Cotiza ahora <span>↗</span>
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
              Cotiza en 2 min <span>↘</span>
            </a>
            <a className="text-link" href="#proyectos">
              Ver proyectos <span>↓</span>
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
          <div className="fruit">
            <span className="fruit-core">404</span>
          </div>
          <div className="spark spark-one">✦</div>
          <div className="spark spark-two">✦</div>
          <div className="mini-window">
            <span />
            <span />
            <span />
            <b>idea → web</b>
          </div>
        </div>
        <div className="hero-proof">
          <b>Strategy → Design → Next.js</b>
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
        <div className="project-grid">
          {projects.map((project, index) => (
            <article
              className={`project-card ${project.tone}`}
              key={project.name}
            >
              <div className="project-visual">
                <div className="project-browser">
                  <i />
                  <i />
                  <i />
                  <span>pomelo404 / 0{index + 1}</span>
                </div>
                <strong>{project.mark}</strong>
                <div className="project-pill">View project ↗</div>
              </div>
              <div className="project-meta">
                <div>
                  <p>{project.category}</p>
                  <h3>{project.name}</h3>
                </div>
                <p>{project.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <QuoteCalculator />

      <section id="reviews" className="reviews section-space">
        <div className="section-shell">
          <p className="section-index light">03 / Reviews</p>
          <h2>
            Clientes contentos.
            <br />
            <em>Sitios con pulso.</em>
          </h2>
        </div>
        <div className="review-track section-shell">
          {reviews.map((review, index) => (
            <blockquote key={review.name}>
              <span>0{index + 1}</span>
              <p>“{review.quote}”</p>
              <footer>
                <b>{review.name}</b>
                <small>{review.role}</small>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="contacto" className="contact section-shell">
        <div className="contact-art" aria-hidden="true">
          <div className="contact-fruit">✦</div>
          <span>¡Di hola!</span>
        </div>
        <div className="contact-copy">
          <p className="section-index">04 / Contacto</p>
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
            hola@pomelo404.com <span>↗</span>
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
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </footer>
    </main>
  );
}
