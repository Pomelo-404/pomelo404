"use client";

import { useMemo, useState } from "react";

type ProjectType = "landing" | "website" | "commerce";
type AddOn = "brand" | "copy" | "motion" | "cms";

const projectTypes: Array<{
  id: ProjectType;
  label: string;
  note: string;
  base: number;
}> = [
  {
    id: "landing",
    label: "Landing page",
    note: "Una idea, una acción",
    base: 24000,
  },
  {
    id: "website",
    label: "Sitio de marca",
    note: "Historia, servicios y leads",
    base: 48000,
  },
  {
    id: "commerce",
    label: "E-commerce",
    note: "Catálogo y checkout",
    base: 78000,
  },
];

const addOns: Array<{ id: AddOn; label: string; price: number }> = [
  { id: "brand", label: "Identidad visual", price: 18000 },
  { id: "copy", label: "Copywriting", price: 9000 },
  { id: "motion", label: "Motion avanzado", price: 12000 },
  { id: "cms", label: "CMS autogestionable", price: 10000 },
];

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

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectType, setProjectType] = useState<ProjectType>("website");
  const [pages, setPages] = useState(6);
  const [timeline, setTimeline] = useState<"normal" | "express">("normal");
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>(["motion"]);

  const estimate = useMemo(() => {
    const base =
      projectTypes.find((type) => type.id === projectType)?.base ?? 0;
    const pagesCost = Math.max(0, pages - 1) * 3500;
    const extras = addOns
      .filter((item) => selectedAddOns.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);
    return (
      Math.round(
        ((base + pagesCost + extras) * (timeline === "express" ? 1.2 : 1)) /
          1000,
      ) * 1000
    );
  }, [pages, projectType, selectedAddOns, timeline]);

  const toggleAddOn = (id: AddOn) => {
    setSelectedAddOns((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const quoteSubject = encodeURIComponent("Cotización pomelo404");
  const quoteBody = encodeURIComponent(
    `Hola pomelo404, mi estimado es ${money.format(estimate)} para un ${projectTypes.find((item) => item.id === projectType)?.label.toLowerCase()} de ${pages} páginas. Quiero platicar del proyecto.`,
  );

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
            Cotiza ahora <span>↗</span>
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

      <section
        id="cotizador"
        className="quote-section section-shell section-space"
      >
        <div className="quote-heading">
          <p className="section-index">02 / Cotizador rápido</p>
          <h2>
            Una cifra clara,
            <br />
            <em>sin reunión eterna.</em>
          </h2>
          <p>
            Elige lo que necesitas y obtén un rango inicial. La propuesta final
            se confirma después de una llamada breve.
          </p>
        </div>
        <div className="quote-card">
          <form className="quote-form">
            <fieldset>
              <legend>
                <span>01</span> ¿Qué vamos a construir?
              </legend>
              <div className="option-grid type-grid">
                {projectTypes.map((type) => (
                  <label
                    className={
                      projectType === type.id
                        ? "option-card selected"
                        : "option-card"
                    }
                    key={type.id}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.id}
                      checked={projectType === type.id}
                      onChange={() => setProjectType(type.id)}
                    />
                    <b>{type.label}</b>
                    <small>{type.note}</small>
                    <i aria-hidden="true" />
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>
                <span>02</span> ¿Qué tan grande?
              </legend>
              <div className="range-row">
                <label htmlFor="pages">Número de páginas</label>
                <output htmlFor="pages">{pages}</output>
              </div>
              <input
                id="pages"
                className="range"
                type="range"
                min="1"
                max="20"
                value={pages}
                onChange={(event) => setPages(Number(event.target.value))}
                style={
                  {
                    "--range": `${((pages - 1) / 19) * 100}%`,
                  } as React.CSSProperties
                }
              />
              <div className="range-labels">
                <span>1</span>
                <span>10</span>
                <span>20</span>
              </div>
            </fieldset>
            <fieldset>
              <legend>
                <span>03</span> Dale más jugo
              </legend>
              <div className="option-grid addon-grid">
                {addOns.map((item) => (
                  <label
                    className={
                      selectedAddOns.includes(item.id)
                        ? "check-option selected"
                        : "check-option"
                    }
                    key={item.id}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddOns.includes(item.id)}
                      onChange={() => toggleAddOn(item.id)}
                    />
                    <span>{selectedAddOns.includes(item.id) ? "✓" : "+"}</span>
                    {item.label}
                  </label>
                ))}
              </div>
              <div className="timeline-row">
                <span>Tiempo de entrega</span>
                <div className="segmented">
                  <button
                    type="button"
                    className={timeline === "normal" ? "active" : ""}
                    onClick={() => setTimeline("normal")}
                  >
                    6–8 semanas
                  </button>
                  <button
                    type="button"
                    className={timeline === "express" ? "active" : ""}
                    onClick={() => setTimeline("express")}
                  >
                    Express +20%
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
          <aside className="quote-result" aria-live="polite">
            <p>Estimado inicial</p>
            <strong>{money.format(estimate)}</strong>
            <span>MXN + IVA</span>
            <div className="estimate-range">
              <span>Rango probable</span>
              <b>
                {money.format(estimate * 0.9)} — {money.format(estimate * 1.1)}
              </b>
            </div>
            <ul>
              <li>Dirección de proyecto</li>
              <li>Diseño responsive</li>
              <li>Desarrollo en Next.js</li>
              <li>Deploy en Vercel</li>
            </ul>
            <a
              className="button button-light"
              href={`mailto:hola@pomelo404.com?subject=${quoteSubject}&body=${quoteBody}`}
            >
              Quiero este proyecto <span>↗</span>
            </a>
            <small>
              * Estimación orientativa. Alcance y precio final se confirman en
              propuesta.
            </small>
          </aside>
        </div>
      </section>

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
            hola@pomelo404.com <span>↗</span>
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
