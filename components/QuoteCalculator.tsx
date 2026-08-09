"use client";

import type { CSSProperties } from "react";
import { ADD_ONS, PROJECT_TYPES } from "@/data/pricing";
import { useQuote } from "@/hooks/useQuote";
import { formatMoney } from "@/lib/quotation";

export default function QuoteCalculator() {
  const {
    projectName,
    setProjectName,
    projectType,
    setProjectType,
    pages,
    setPages,
    timeline,
    setTimeline,
    selectedAddOns,
    toggleAddOn,
    estimate,
    whatsappUrl,
  } = useQuote();

  return (
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
          Elige lo que necesitas y obtén un rango inicial. La propuesta final se
          confirma después de una llamada breve.
        </p>
      </div>
      <div className="quote-card">
        <form className="quote-form">
          <fieldset>
            <legend>
              <span>01</span> ¿Qué vamos a construir?
            </legend>
            <div className="option-grid type-grid">
              {PROJECT_TYPES.map((type) => (
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
            <label className="project-name-field" htmlFor="project-name">
              <span>
                Nombre del proyecto <small>Opcional</small>
              </span>
              <input
                id="project-name"
                type="text"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                placeholder="Ej. Café Horizonte"
                maxLength={80}
                autoComplete="organization"
              />
            </label>
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
                { "--range": `${((pages - 1) / 19) * 100}%` } as CSSProperties
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
              {ADD_ONS.map((item) => (
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
          <strong>{formatMoney(estimate)}</strong>
          <span>MXN + IVA</span>
          <div className="estimate-range">
            <span>Rango probable</span>
            <b>
              {formatMoney(estimate * 0.9)} — {formatMoney(estimate * 1.1)}
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
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar esta cotización por WhatsApp"
          >
            Enviar por WhatsApp{" "}
            <span className="arrow" aria-hidden="true">
              &#8599;&#65038;
            </span>
          </a>
          <small>
            * Estimación orientativa. Alcance y precio final se confirman en
            propuesta.
          </small>
        </aside>
      </div>
    </section>
  );
}
