"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "initializing secure channel",
  "loading research archive",
  "verifying collective members",
  "access granted",
];
const RUN_MS = 3000; // how long the splash stays before fading out
const FADE_MS = 650;

/**
 * Full-screen intro shown before the site appears.
 * Shown once per browser tab/session (sessionStorage). To show it on EVERY page load,
 * delete the two sessionStorage lines below and the inline script in app/layout.tsx.
 */
export default function SplashScreen() {
  const [phase, setPhase] = useState<"run" | "exit" | "gone">("run");
  const [shown, setShown] = useState(1);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("cp-splash") === "1";
    } catch {}
    if (seen) {
      setPhase("gone");
      return;
    }

    document.body.style.overflow = "hidden";
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => timers.push(setTimeout(() => setShown(i + 1), 380 * i + 300)));
    timers.push(setTimeout(() => finish(), RUN_MS));

    function finish() {
      setPhase((p) => (p === "run" ? "exit" : p));
      try {
        sessionStorage.setItem("cp-splash", "1");
      } catch {}
      timers.push(
        setTimeout(() => {
          document.body.style.overflow = "";
          setPhase("gone");
        }, FADE_MS),
      );
    }

    finishRef.current = finish;
    const skip = () => finish();
    addEventListener("keydown", skip);
    return () => {
      removeEventListener("keydown", skip);
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`splash ${phase === "exit" ? "splash-exit" : ""}`}
      role="status"
      aria-label="Loading Captain Pirrot"
      onClick={() => finishRef.current()}
    >
      <div className="splash-grid" />
      <div className="splash-scan" />
      <div className="splash-core">
        <div className="splash-ring">
          <svg className="splash-mark" viewBox="0 0 48 48" aria-hidden="true">
            <path
              pathLength={1}
              fill="currentColor"
              d="M38 8H19C11.8 8 6 13.8 6 21v6c0 7.2 5.8 13 13 13h7V29h-7c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h15v21h11V15c0-3.9-3.1-7-7-7Z"
            />
            <path className="splash-mark-cyan" d="M17 29h9v11h-9z" fill="var(--cyan)" />
          </svg>
        </div>
        <h1 className="splash-title">CAPTAIN PIRROT</h1>
        <p className="splash-sub">INDEPENDENT CYBERSECURITY RESEARCH</p>
        <div className="splash-log" aria-hidden="true">
          {LINES.slice(0, shown).map((l, i) => (
            <div key={l}>
              <span>&gt;</span> {l} <b>{i < shown - 1 || shown === LINES.length ? "OK" : "…"}</b>
            </div>
          ))}
        </div>
        <div className="splash-bar">
          <i />
        </div>
        <button className="splash-skip" type="button">
          SKIP INTRO
        </button>
      </div>
    </div>
  );
}
