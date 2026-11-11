"use client";

import type { CSSProperties } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ADD_ONS, PRICING_SETTINGS, PROJECT_TYPES } from "@/data/pricing";
import { useQuote } from "@/hooks/useQuote";
import { formatMoney } from "@/lib/quotation";

/** Presenta el cotizador; todos los precios y límites viven en data/pricing.ts. */
export default function QuoteCalculator() {
  const {
    projectName,
    setProjectName,
    websiteUrl,
    setWebsiteUrl,
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
        <p className="section-index">03 / Cotizador rápido</p>
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
              <span>01</span> ¿Qué necesita tu proyecto?
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
            {projectType === "redesign" && (
              <label className="project-name-field" htmlFor="website-url">
                <span>
                  Link de tu sitio actual <small>Opcional</small>
                </span>
                <input
                  id="website-url"
                  type="url"
                  value={websiteUrl}
                  onChange={(event) => setWebsiteUrl(event.target.value)}
                  placeholder="https://tusitio.com"
                  maxLength={200}
                  inputMode="url"
                />
              </label>
            )}
          </fieldset>
          <fieldset>
            <legend>
              <span>02</span> ¿Qué tan grande?
            </legend>
            <div className="range-row">
              <label htmlFor="pages">
                {projectType === "redesign" ? "Páginas a renovar" : "Número de páginas"}
              </label>
              <output htmlFor="pages">{pages}</output>
            </div>
            <input
              id="pages"
              className="range"
              type="range"
              min={PRICING_SETTINGS.pages.min}
              max={PRICING_SETTINGS.pages.max}
              value={pages}
              onChange={(event) => setPages(Number(event.target.value))}
              style={
                { "--range": `${((pages - PRICING_SETTINGS.pages.min) / (PRICING_SETTINGS.pages.max - PRICING_SETTINGS.pages.min)) * 100}%` } as CSSProperties
              }
            />
            <div className="range-labels">
              <span>{PRICING_SETTINGS.pages.min}</span>
              <span>10</span>
              <span>{PRICING_SETTINGS.pages.max}</span>
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
                  Express +{Math.round((PRICING_SETTINGS.expressMultiplier - 1) * 100)}%
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
              {formatMoney(estimate * (1 - PRICING_SETTINGS.estimateRangePercent))} – {formatMoney(estimate * (1 + PRICING_SETTINGS.estimateRangePercent))}
            </b>
          </div>
          <ul>
            <li>Dirección de proyecto</li>
            <li>Diseño responsive</li>
            <li>Desarrollo en Next.js</li>
            <li>Publicación en Vercel</li>
          </ul>
          <WhatsAppButton href={whatsappUrl}>
            Enviar por WhatsApp
          </WhatsAppButton>
          <small>
            * Estimación orientativa. Alcance y precio final se confirman en
            la propuesta.
          </small>
        </aside>
      </div>
    </section>
  );
}
