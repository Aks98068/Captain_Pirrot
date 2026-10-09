"use client";

import { useState } from "react";

export default function Terminal() {
  const [line, setLine] = useState("help");
  return (
    <section className="terminal-section section">
      <div>
        <span className="eyebrow">04 / INTERFACE</span>
        <h2>
          One system.
          <br />
          Multiple ways in.
        </h2>
        <p>
          A small command line for navigating the collective. No theatrics—just
          useful shortcuts.
        </p>
      </div>
      <div className="terminal">
        <div className="terminal-bar">
          <span>
            <i />
            <i />
            <i />
          </span>
          <b>captain@pirrot — zsh — 82×24</b>
        </div>
        <div className="terminal-body">
          <p>
            <span>captain@pirrot</span>:~$ {line}
          </p>
          {line === "help" && (
            <div className="terminal-output">
              Available directories:
              <br />
              <b>research/</b>&nbsp;&nbsp; Published investigations
              <br />
              <b>projects/</b>&nbsp;&nbsp; Open-source engineering
              <br />
              <b>writeups/</b>&nbsp; Technical analysis
              <br />
              <b>ctf/</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Competition
              archive
              <br />
              <b>contact</b>&nbsp;&nbsp;&nbsp;&nbsp; Initiate a conversation
            </div>
          )}
          <p>
            <span>captain@pirrot</span>:~${" "}
            <input
              value={line}
              onChange={(e) => setLine(e.target.value)}
              aria-label="Terminal command"
            />
          </p>
        </div>
      </div>
    </section>
  );
}
