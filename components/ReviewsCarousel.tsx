"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { REVIEWS } from "@/data/reviews";

const AUTOPLAY_DELAY = 5500;

function ArrowIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={
          direction === "previous"
            ? "M19 12H5m6-6-6 6 6 6"
            : "M5 12h14m-6-6 6 6-6 6"
        }
      />
    </svg>
  );
}

function PlaybackIcon({ paused }: { paused: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paused ? <path d="m8 5 11 7L8 19Z" /> : <path d="M9 5v14M15 5v14" />}
    </svg>
  );
}

export default function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  const goTo = useCallback((requestedIndex: number) => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const maxStartIndex = slides.reduce((lastIndex, slide, index) => {
      const slideLeft = slide.offsetLeft - track.offsetLeft;
      return slideLeft <= maxScrollLeft + 1 ? index : lastIndex;
    }, 0);
    const nextIndex =
      requestedIndex < 0
        ? maxStartIndex
        : requestedIndex > maxStartIndex
          ? 0
          : requestedIndex;
    const slide = slides[nextIndex];
    if (!slide) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActiveIndex(nextIndex);
  }, []);

  useEffect(() => {
    if (paused || autoplayPaused) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        goTo(activeIndex + 1);
      }
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [activeIndex, autoplayPaused, goTo, paused]);

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    const closest = slides.reduce(
      (best, slide, index) => {
        const distance = Math.abs(
          slide.offsetLeft - track.offsetLeft - track.scrollLeft,
        );
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );

    setActiveIndex(closest.index);
  }

  return (
    <section id="reviews" className="reviews section-space">
      <div className="reviews-heading section-shell">
        <div>
          <p className="section-index light">03 / Reviews</p>
          <h2>
            Clientes contentos.
            <br />
            <em>Sitios con pulso.</em>
          </h2>
        </div>
        <p className="reviews-placeholder">Testimonios de muestra</p>
      </div>

      <div
        className="review-carousel section-shell"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Testimonios de clientes"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget as Node | null)
          ) {
            setPaused(false);
          }
        }}
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onPointerCancel={() => setPaused(false)}
      >
        <div
          id="review-track"
          className="review-track"
          ref={trackRef}
          onScroll={handleScroll}
        >
          {REVIEWS.map((review, index) => (
            <blockquote
              className={
                index === activeIndex ? "review-card is-current" : "review-card"
              }
              role="group"
              aria-roledescription="slide"
              aria-label={`Testimonio ${index + 1} de ${REVIEWS.length}`}
              key={`${review.name}-${review.role}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>“{review.quote}”</p>
              <footer>
                <b>{review.name}</b>
                <small>{review.role}</small>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="review-toolbar">
          <p className="review-count" aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(REVIEWS.length).padStart(2, "0")}
          </p>

          <div className="review-actions">
            <button
              type="button"
              className="review-control"
              aria-label={
                autoplayPaused ? "Reanudar carrusel" : "Pausar carrusel"
              }
              aria-pressed={autoplayPaused}
              onClick={() => setAutoplayPaused((current) => !current)}
            >
              <PlaybackIcon paused={autoplayPaused} />
            </button>
            <button
              type="button"
              className="review-control"
              aria-label="Testimonio anterior"
              aria-controls="review-track"
              onClick={() => goTo(activeIndex - 1)}
            >
              <ArrowIcon direction="previous" />
            </button>
            <button
              type="button"
              className="review-control"
              aria-label="Testimonio siguiente"
              aria-controls="review-track"
              onClick={() => goTo(activeIndex + 1)}
            >
              <ArrowIcon direction="next" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
