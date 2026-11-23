import { useEffect, useRef, useState } from "react";
import { PawPrint, X } from "lucide-react";
import "./mascot.css";

const messages = {
  vi: {
    hello: "Chào bạn! Mình là Mochi, bạn đồng hành của Duyên 🐾",
    pet: "Chào Mochi",
    hide: "Ẩn nhân vật",
    show: "Hiện nhân vật",
  },
  en: {
    hello: "Hi! I’m Mochi, Duyên’s little companion 🐾",
    pet: "Say hello to Mochi",
    hide: "Hide companion",
    show: "Show companion",
  },
  ja: {
    hello: "こんにちは！ズエンの小さな仲間、もちです 🐾",
    pet: "もちにあいさつ",
    hide: "キャラクターを隠す",
    show: "キャラクターを表示",
  },
};

function Cat() {
  return (
    <svg
      className="mascot-art"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <ellipse
        className="mascot-shadow"
        cx="49"
        cy="90"
        rx="27"
        ry="4"
        fill="currentColor"
        opacity=".13"
      />
      <g className="cat-tail">
        <path
          d="M67 71C87 76 91 54 80 52C69 51 77 64 82 58"
          stroke="var(--cat-outline)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M67 71C87 76 91 54 80 52C69 51 77 64 82 58"
          stroke="var(--cat-blue)"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </g>
      <g className="cat-leg cat-leg-back">
        <path
          d="M59 74V86H68"
          stroke="var(--cat-outline)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M59 74V86H68"
          stroke="var(--cat-blue)"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </g>
      <g className="cat-leg cat-leg-front">
        <path
          d="M39 74V86H47"
          stroke="var(--cat-outline)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M39 74V86H47"
          stroke="var(--cat-blue)"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </g>
      <g className="cat-body">
        <path
          d="M31 55Q28 66 32 79Q48 86 68 77Q73 64 64 52"
          fill="var(--cat-blue)"
          stroke="var(--cat-outline)"
          strokeWidth="2.5"
        />
        <ellipse cx="49" cy="70" rx="11" ry="10" fill="#e3f2ff" />
        <path
          d="M21 39L20 15Q21 12 25 15L38 24Q48 21 59 25L72 16Q76 13 76 18L75 43Q79 63 51 65Q22 65 21 39Z"
          fill="var(--cat-blue)"
          stroke="var(--cat-outline)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M25 21L27 34L35 27Z" fill="#c8e4ac" />
        <path d="M70 22L62 29L71 35Z" fill="#c8e4ac" />
        <g className="cat-eyes">
          <ellipse cx="38" cy="43" rx="2.8" ry="4" fill="var(--cat-outline)" />
          <ellipse cx="61" cy="43" rx="2.8" ry="4" fill="var(--cat-outline)" />
          <circle cx="39" cy="41" r=".9" fill="white" />
          <circle cx="62" cy="41" r=".9" fill="white" />
        </g>
        <path d="M47 48Q50 46 53 48L50 51Z" fill="var(--cat-outline)" />
        <path
          d="M50 51Q47 56 44 52M50 51Q53 56 56 52"
          stroke="var(--cat-outline)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <ellipse cx="31" cy="50" rx="5" ry="2.5" fill="#eda4a2" opacity=".7" />
        <ellipse cx="68" cy="50" rx="5" ry="2.5" fill="#eda4a2" opacity=".7" />
        <path
          d="M29 45L15 43M29 50L15 51M69 45L82 43M70 50L83 52"
          stroke="var(--cat-outline)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M37 62Q50 69 65 61L62 69Q49 74 36 68Z"
          fill="#b4ec78"
          stroke="var(--cat-outline)"
          strokeWidth="1.5"
        />
        <circle
          cx="50"
          cy="69"
          r="3"
          fill="#eee3a1"
          stroke="var(--cat-outline)"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}

export default function Mascot({ lang, mode, concealed }) {
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem("duyen-mascot") !== "hidden";
    } catch {
      return true;
    }
  });
  const [greeting, setGreeting] = useState(false);
  const actor = useRef(null),
    timer = useRef(null);
  const interacting = useRef(false);
  const t = messages[lang];
  useEffect(() => {
    try {
      localStorage.setItem("duyen-mascot", visible ? "visible" : "hidden");
    } catch {}
  }, [visible]);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!visible || concealed) return;
    const el = actor.current,
      reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      last = 0,
      x = 28,
      direction = 1,
      traveled = 0,
      restUntil = 0,
      running = false;
    const max = () => Math.max(0, document.documentElement.clientWidth - 96);
    const paint = () => {
      x = Math.min(Math.max(x, 8), Math.max(8, max()));
      el.style.transform = `translateX(${x.toFixed(1)}px)`;
      el.dataset.facing = direction > 0 ? "right" : "left";
      el.dataset.edge =
        x > document.documentElement.clientWidth / 2 ? "right" : "left";
    };
    function tick(time) {
      frame = 0;
      const delta = last ? Math.min((time - last) / 1000, 0.05) : 0;
      last = time;
      // Pointer clicks can leave focus on the cat indefinitely. Only keyboard
      // focus should pause walking; query live DOM state instead of stale refs.
      const hovered = matchMedia("(hover: hover)").matches && el.matches(":hover");
      const keyboardFocused = !!el.querySelector(":focus-visible");
      if (!hovered && !keyboardFocused && !interacting.current && time > restUntil) {
        x += direction * delta * 35;
        traveled += delta;
        if (x >= max()) {
          x = max();
          direction = -1;
        } else if (x <= 8) {
          x = 8;
          direction = 1;
        }
        if (traveled > 7) {
          restUntil = time + 1800;
          traveled = 0;
        }
        el.dataset.walking = "true";
      } else el.dataset.walking = "false";
      paint();
      if (running) frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      running =
        mode !== "off" &&
        (mode === "on" || !reduced.matches) &&
        !document.hidden;
      last = 0;
      paint();
      el.dataset.walking = running ? "true" : "false";
      if (running) frame = requestAnimationFrame(tick);
    }
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    addEventListener("resize", paint);
    sync();
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      removeEventListener("resize", paint);

    };
  }, [visible, concealed, mode]);
  function hello() {
    setGreeting(true);
    clearTimeout(timer.current);
    interacting.current = true;
    timer.current = setTimeout(() => {
      setGreeting(false);
      interacting.current = false;
    }, 3500);
  }
  if (concealed) return null;
  if (!visible)
    return (
      <button
        className="mascot-restore icon-button"
        onClick={() => setVisible(true)}
        aria-label={t.show}
        title={t.show}
      >
        <PawPrint size={17} />
      </button>
    );
  return (
    <aside className="mascot-stage" aria-label="Mochi">
      <div
        className={`mascot-actor ${greeting ? "is-greeting" : ""}`}
        ref={actor}

      >
        {greeting && (
          <p className="mascot-speech" role="status">
            {t.hello}
          </p>
        )}
        <button
          className="mascot-hide"
          onClick={() => {
            setVisible(false);
            setGreeting(false);
          }}
          aria-label={t.hide}
        >
          <X size={13} />
        </button>
        <button
          className="mascot-character"
          aria-label={t.pet}
          title={t.pet}
          onClick={hello}
        >
          <Cat />
        </button>
      </div>
    </aside>
  );
}
