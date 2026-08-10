"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import Image from "next/image";
import { createPortal } from "react-dom";
import { projects, type Project } from "@/data/projects";

function PlaceholderProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className={`project-card ${project.tone}`}>
      <div className="project-visual">
        <div className="project-browser">
          <i />
          <i />
          <i />
          <span>pomelo404 / 0{index + 1}</span>
        </div>
        <strong>{project.mark}</strong>
        <div className="project-pill">Próximamente</div>
      </div>
      <div className="project-meta">
        <div>
          <p>{project.category}</p>
          <h3>{project.name}</h3>
        </div>
        <p>{project.copy}</p>
      </div>
    </article>
  );
}

export default function ProjectShowcase() {
  const featured = projects.find((project) => project.featured)!;
  const placeholders = projects.filter((project) => !project.featured);
  const [isExpanded, setIsExpanded] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  function openProject() {
    setIsExpanded(true);
    track("Project opened", { project: featured.name });
  }

  function closeProject() {
    setIsExpanded(false);
    track("Project closed", { project: featured.name });
    window.requestAnimationFrame(() => {
      triggerRef.current?.focus({ preventScroll: true });
    });
  }

  function trackExternalVisit() {
    track("Project external visit", { project: featured.name });
  }

  useEffect(() => {
    if (!isExpanded) return;

    const scrollPosition = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
    closeRef.current?.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      setIsExpanded(false);
      track("Project closed", { project: featured.name });
      window.requestAnimationFrame(() => {
        triggerRef.current?.focus({ preventScroll: true });
      });
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      window.scrollTo(0, scrollPosition);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [featured.name, isExpanded]);

  return (
    <div className="project-grid">
      <article
        className={`project-card ${featured.tone}${isExpanded ? " is-expanded" : ""}`}
      >
        <button
          ref={triggerRef}
          className="project-summary"
          type="button"
          aria-expanded={isExpanded}
          aria-controls="forma-libre-preview"
          onClick={openProject}
          disabled={isExpanded}
        >
          <div className="project-visual">
            <Image
              className="project-cover"
              src={featured.cover!}
              alt={featured.coverAlt!}
              fill
              loading="eager"
              sizes="(max-width: 1800px) calc(100vw - 40px), calc(100vw - 96px)"
            />
            <span className="project-letter" aria-hidden="true">
              f
            </span>
            <div className="project-browser project-browser-light">
              <i />
              <i />
              <i />
              <span>pomelo404 / 01</span>
            </div>
            <span className="project-pill">
              {isExpanded ? "Proyecto abierto" : "Explorar proyecto ↘"}
            </span>
          </div>
          <div className="project-meta">
            <div>
              <p>{featured.category}</p>
              <h3>{featured.name}</h3>
            </div>
            <p>{featured.copy}</p>
          </div>
        </button>

        {isExpanded &&
          createPortal(
            <div
              id="forma-libre-preview"
              className="project-expanded-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="forma-libre-dialog-title"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 2147483647,
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100dvh",
                margin: 0,
                overflow: "hidden",
              }}
            >
              <div className="project-expanded-head">
                <div className="project-expanded-copy">
                  <p className="project-expanded-kicker">Proyecto 01 · 2026</p>
                  <h2 id="forma-libre-dialog-title">Forma Libre</h2>
                  <p>
                    Biblioteca abierta de arquitectura con catálogo, comunidad,
                    cuentas y compra de archivos editables.
                  </p>
                </div>
                <ul aria-label="Servicios realizados">
                  {featured.services?.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
                <div className="project-expanded-actions">
                  <a
                    className="project-external-link"
                    href={featured.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackExternalVisit}
                  >
                    Abrir sitio <span aria-hidden="true">↗</span>
                  </a>
                  <button ref={closeRef} type="button" onClick={closeProject}>
                    Cerrar <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>

              <div className="project-frame-shell">
                <iframe
                  className="project-live-frame"
                  src={featured.href}
                  title="Vista en vivo de Forma Libre"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                />
              </div>
            </div>,
            document.body,
          )}
      </article>

      {placeholders.map((project, index) => (
        <PlaceholderProject
          project={project}
          index={index + 1}
          key={project.slug}
        />
      ))}
    </div>
  );
}
