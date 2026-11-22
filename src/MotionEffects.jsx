import { useEffect, useRef } from "react";

/** Decorative motion only: no React renders per pointer move. */
export default function MotionEffects({ enabled, force, lang, modalOpen }) {
  const overlay = useRef(null);
  const progress = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    let cleanup = () => {};

    function setup() {
      cleanup();
      root.removeAttribute("data-cursor");
      const moving = enabled && (force || !reduced.matches);
      const cursorAllowed = moving && fine.matches && !modalOpen;
      const cursor = overlay.current;
      const targets = [
        ...document.querySelectorAll(
          ".section-heading, .project-item, .identity-card, .about-copy, .tool-row, .contact-inner, .archive-end",
        ),
      ];
      let observer;
      if (moving && "IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-revealed");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
        );
        targets.forEach((el, i) => {
          el.style.setProperty("--reveal-delay", `${(i % 2) * 75}ms`);
          // Already-visible content stays visible when changing language / FX.
          const bounds = el.getBoundingClientRect();
          if (bounds.top < innerHeight && bounds.bottom > 0)
            el.classList.add("is-revealed");
          el.classList.add("motion-reveal");
          observer.observe(el);
        });
      }

      let scrollFrame = 0;
      const updateScroll = () => {
        scrollFrame = 0;
        const max = root.scrollHeight - innerHeight;
        const ratio = max > 0 ? scrollY / max : 0;
        progress.current?.style.setProperty("--progress", ratio.toFixed(4));
        root.style.setProperty(
          "--hero-parallax",
          `${moving && fine.matches ? Math.min(scrollY * 0.12, 70) : 0}px`,
        );
      };
      const onScroll = () => {
        if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
      };
      addEventListener("scroll", onScroll, { passive: true });
      updateScroll();

      let frame = 0,
        lastMove = 0,
        lastSpark = 0,
        sparkIndex = 0;
      let position = { x: -100, y: -100 },
        target = { x: -100, y: -100 };
      const sparkles = [...(cursor?.querySelectorAll(".cursor-trail") || [])];
      let magnet = null;
      const resetMagnet = () => {
        if (magnet) {
          magnet.style.removeProperty("translate");
          magnet = null;
        }
      };
      function draw(time) {
        frame = 0;
        position.x += (target.x - position.x) * 0.18;
        position.y += (target.y - position.y) * 0.18;
        cursor?.style.setProperty("--cursor-x", `${position.x.toFixed(2)}px`);
        cursor?.style.setProperty("--cursor-y", `${position.y.toFixed(2)}px`);
        const distance = Math.hypot(
          target.x - position.x,
          target.y - position.y,
        );
        if (
          time - lastMove < 100 &&
          time - lastSpark > 65 &&
          distance > 3 &&
          sparkles.length
        ) {
          const star = sparkles[sparkIndex++ % sparkles.length];
          star.style.setProperty("--spark-x", `${target.x}px`);
          star.style.setProperty("--spark-y", `${target.y}px`);
          star.getAnimations().forEach((a) => a.cancel());
          star.animate(
            [
              {
                opacity: 0.6,
                transform: `translate(${target.x}px, ${target.y}px) rotate(0deg) scale(.75)`,
              },
              {
                opacity: 0,
                transform: `translate(${target.x - 10}px, ${target.y + 24}px) rotate(100deg) scale(0)`,
              },
            ],
            { duration: 650, easing: "ease-out", fill: "forwards" },
          );
          lastSpark = time;
        }
        if (distance > 0.15 || time - lastMove < 700)
          frame = requestAnimationFrame(draw);
      }
      function move(e) {
        if (!cursorAllowed || e.pointerType === "touch") return;
        if (!root.hasAttribute("data-cursor"))
          position = { x: e.clientX, y: e.clientY };
        target = { x: e.clientX, y: e.clientY };
        root.dataset.cursor = "active";
        lastMove = performance.now();
        cursor?.style.setProperty("--dot-x", `${target.x}px`);
        cursor?.style.setProperty("--dot-y", `${target.y}px`);
        const hovered = e.target instanceof Element ? e.target : null;
        const folder = hovered?.closest(".folder");
        const interactive = hovered?.closest("a,button");
        if (cursor)
          cursor.dataset.mode = folder
            ? "project"
            : interactive
              ? "link"
              : "default";
        const nextMagnet = hovered?.closest(
          ".button, .theme-toggle, .copy-button, .github-button",
        );
        if (nextMagnet !== magnet) {
          resetMagnet();
          magnet = nextMagnet;
        }
        if (magnet) {
          const b = magnet.getBoundingClientRect();
          magnet.style.translate = `${((e.clientX - b.left - b.width / 2) * 0.16).toFixed(1)}px ${((e.clientY - b.top - b.height / 2) * 0.22).toFixed(1)}px`;
        }
        if (!frame) frame = requestAnimationFrame(draw);
      }
      const leave = () => {
        root.removeAttribute("data-cursor");
        resetMagnet();
        cancelAnimationFrame(frame);
        frame = 0;
      };
      const press = () => cursor?.classList.add("is-pressed");
      const release = () => cursor?.classList.remove("is-pressed");
      if (cursorAllowed) {
        addEventListener("pointermove", move, { passive: true });
        document.addEventListener("pointerleave", leave);
        addEventListener("blur", leave);
        addEventListener("pointerdown", press, { passive: true });
        addEventListener("pointerup", release, { passive: true });
      }
      cleanup = () => {
        observer?.disconnect();
        targets.forEach((el) => {
          el.classList.remove("motion-reveal", "is-revealed");
          el.style.removeProperty("--reveal-delay");
        });
        removeEventListener("scroll", onScroll);
        removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", leave);
        removeEventListener("blur", leave);
        removeEventListener("pointerdown", press);
        removeEventListener("pointerup", release);
        cancelAnimationFrame(frame);
        cancelAnimationFrame(scrollFrame);
        sparkles.forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
        resetMagnet();
        root.removeAttribute("data-cursor");
        root.style.removeProperty("--hero-parallax");
      };
    }
    setup();
    reduced.addEventListener("change", setup);
    fine.addEventListener("change", setup);
    return () => {
      cleanup();
      reduced.removeEventListener("change", setup);
      fine.removeEventListener("change", setup);
    };
  }, [enabled, force, modalOpen, lang]);

  return (
    <>
      <div className="reading-progress" ref={progress} aria-hidden="true" />
      <div className="custom-cursor" ref={overlay} aria-hidden="true">
        <span className="cursor-dot" />
        <span className="cursor-ring">
          <span>{{ vi: "MỞ", en: "VIEW", ja: "見る" }[lang]}</span>
          <i>✳</i>
        </span>
        {Array.from({ length: 7 }, (_, i) => (
          <span className="cursor-trail" key={i}>
            ✦
          </span>
        ))}
      </div>
    </>
  );
}
