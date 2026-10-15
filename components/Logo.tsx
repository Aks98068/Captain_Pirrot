export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo-lockup">
      <svg
        className="logo-mark"
        viewBox="0 0 48 48"
        role="img"
        aria-label="Captain Pirrot CP monogram"
      >
        <path
          d="M38 8H19C11.8 8 6 13.8 6 21v6c0 7.2 5.8 13 13 13h7V29h-7c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h15v21h11V15c0-3.9-3.1-7-7-7Z"
          fill="currentColor"
        />
        <path d="M17 29h9v11h-9z" fill="var(--cyan)" />
      </svg>
      {!compact && (
        <div className="wordmark">
          <strong>CAPTAIN PIRROT</strong>
          <span>CYBERSECURITY RESEARCH</span>
        </div>
      )}
    </div>
  );
}
export default function Logos({ compact = false }: { compact?: boolean }) {
  return (
   
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 160" fill="none">
  <defs>
    <linearGradient id="cyan" x1="15" y1="15" x2="145" y2="145">
      <stop offset="0%" stop-color="#00D9FF"/>
      <stop offset="55%" stop-color="#49E8FF"/>
      <stop offset="100%" stop-color="#7C5CFC"/>
    </linearGradient>

    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <style>
      .scanner {
        transform-origin: 80px 80px;
        animation: rotateScanner 12s linear infinite;
      }

      .pulse {
        animation: pulse 2.8s ease-in-out infinite;
      }

      .draw {
        stroke-dasharray: 420;
        stroke-dashoffset: 420;
        animation: drawLogo 2s ease forwards;
      }

      .wordmark {
        animation: revealText 1.4s ease both;
        animation-delay: .4s;
      }

      .cursor {
        animation: blink 1s steps(2, start) infinite;
      }

      @keyframes rotateScanner {
        to { transform: rotate(360deg); }
      }

      @keyframes pulse {
        0%, 100% { opacity: .55; }
        50% { opacity: 1; }
      }

      @keyframes drawLogo {
        to { stroke-dashoffset: 0; }
      }

      @keyframes revealText {
        from { opacity: 0; transform: translateX(10px); }
        to { opacity: 1; transform: translateX(0); }
      }

      @keyframes blink {
        50% { opacity: 0; }
      }

      @media (prefers-reduced-motion: reduce) {
        .scanner, .pulse, .draw, .wordmark, .cursor {
          animation: none;
        }
        .draw { stroke-dashoffset: 0; }
        .wordmark { opacity: 1; }
      }
    </style>
  </defs>

  <!-- Monogram frame -->
  <rect x="12" y="12" width="136" height="136" rx="24"
        stroke="#202B38" stroke-width="1.5"/>

  <!-- Rotating scanner ring -->
  <g class="scanner">
    <circle cx="80" cy="80" r="57"
            stroke="#00D9FF" stroke-opacity=".2"
            stroke-width="1" stroke-dasharray="3 8"/>
    <path d="M80 23 A57 57 0 0 1 137 80"
          stroke="url(#cyan)" stroke-width="2.5"
          stroke-linecap="round" filter="url(#glow)"/>
  </g>

  <!-- Geometric CP mark -->
  <g stroke="url(#cyan)" stroke-width="5"
     stroke-linecap="round" stroke-linejoin="round"
     filter="url(#glow)">
    <path class="draw"
          d="M72 47 H57 C43 47 35 58 35 72 V88 C35 102 43 113 57 113 H72"/>
    <path d="M72 47 V113"/>
    <path d="M72 47 H91 C105 47 113 55 113 67 C113 79 105 87 91 87 H72"/>
    <path d="M72 87 H91"/>
  </g>

  <!-- Scanner points -->
  <g class="pulse" fill="#00D9FF">
    <circle cx="80" cy="23" r="3"/>
    <circle cx="137" cy="80" r="3"/>
    <circle cx="80" cy="137" r="2"/>
  </g>

  <!-- Wordmark -->
  <g class="wordmark">
    <text x="175" y="73"
          fill="#F3F6F9"
          font-family="Arial, Helvetica, sans-serif"
          font-size="31"
          font-weight="800"
          letter-spacing="2.2">CAPTAIN</text>

    <text x="175" y="108"
          fill="#00D9FF"
          font-family="Arial, Helvetica, sans-serif"
          font-size="31"
          font-weight="800"
          letter-spacing="2.2">PIRROT</text>

    <rect x="176" y="124" width="25" height="2.5" rx="1.25"
          fill="#00D9FF"/>
    <text x="210" y="130"
          fill="#98A5B3"
          font-family="monospace"
          font-size="10"
          letter-spacing="2.1">CYBERSECURITY RESEARCH</text>
    <rect class="cursor" x="454" y="119" width="2" height="13"
          fill="#00D9FF"/>
  </g>
</svg>

  );
}