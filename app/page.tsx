"use client";

import { useState } from "react";
import QuoteCalculator from "@/components/QuoteCalculator";

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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <header className="site-nav">
        <a className="logo" href="#inicio" aria-label="pomelo404, inicio">
          pomelo<span>404</span>
          <i />
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
            Cotiza ahora{" "}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>
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
        <div>
          <span>Diseño con intención</span>
          <b>✦</b>
          <span>Desarrollo Next.js</span>
          <b>✦</b>
          <span>Movimiento con sabor</span>
          <b>✦</b>
          <span>Diseño con intención</span>
          <b>✦</b>
          <span>Desarrollo Next.js</span>
          <b>✦</b>
        </div>
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
                <div className="project-pill">
                  View project{" "}
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
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
          <span>say hi!</span>
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
            hola@pomelo404.com{" "}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </section>

      <footer className="site-footer section-shell">
        <a className="logo" href="#inicio">
          pomelo<span>404</span>
          <i />
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
