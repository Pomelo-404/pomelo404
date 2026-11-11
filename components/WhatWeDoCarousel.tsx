"use client";

import { useRef, useState } from "react";
import ArrowIcon from "@/components/ArrowIcon";

const SERVICES = [
  {
    number: "01",
    title: "Crear",
    subtitle: "Desde la semilla.",
    copy: "Landing pages, sitios de marca y e-commerce desde cero, con estrategia, diseño y código apuntando a lo mismo: que la gente entienda y actúe.",
  },
  {
    number: "02",
    title: "Actualizar",
    subtitle: "Más jugo al mismo pomelo.",
    copy: "Tu sitio actual, puesto al día. Renovamos diseño, contenido, velocidad y SEO sin tirar lo que ya funciona ni hacerte empezar de nuevo.",
  },
  {
    number: "03",
    title: "Adaptar",
    subtitle: "Otra receta, mismo sabor.",
    copy: "Cuando el sitio ya no encaja con la marca, el negocio o la tecnología, lo migramos, lo reestructuramos y lo conectamos con lo que necesitas hoy.",
  },
] as const;

const SWIPE_THRESHOLD = 36;

/** Carrusel táctil: desliza o pulsa la mitad izquierda/derecha de la tarjeta. */
export default function WhatWeDoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);

  function move(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + SERVICES.length) % SERVICES.length);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    pointerStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (start === null) return;

    const distance = event.clientX - start;
    if (Math.abs(distance) >= SWIPE_THRESHOLD) {
      move(distance > 0 ? -1 : 1);
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    move(event.clientX - bounds.left < bounds.width / 2 ? -1 : 1);
  }

  return (
    <div className="what-we-do-carousel" aria-roledescription="carrusel" aria-label="Servicios de pomelo404">
      <div className="what-we-do-progress" aria-hidden="true">
        {SERVICES.map((service, index) => (
          <i className={index === activeIndex ? "is-active" : ""} key={service.number} />
        ))}
      </div>
      <div
        className="what-we-do-viewport"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { pointerStart.current = null; }}
      >
        <div className="what-we-do-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {SERVICES.map((service, index) => (
            <article className="what-we-do-card" aria-hidden={index !== activeIndex} key={service.number}>
              <span>{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <em>{service.subtitle}</em>
              </div>
              <p>{service.copy}</p>
              <small>
                <b>←</b> toca / desliza <b>→</b>
              </small>
            </article>
          ))}
        </div>
      </div>
      <div className="what-we-do-controls">
        <p>{String(activeIndex + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}</p>
        <div>
          <button type="button" aria-label="Servicio anterior" onClick={() => move(-1)}><ArrowIcon direction="down" /></button>
          <button type="button" aria-label="Siguiente servicio" onClick={() => move(1)}><ArrowIcon direction="down" /></button>
        </div>
      </div>
    </div>
  );
}
