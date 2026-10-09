export default function NetworkVisual() {
  return (
    <div className="network-visual">
      <div className="visual-meta">
        <span>ATTACK SURFACE / LIVE MODEL</span>
        <span className="live">
          <i /> OBSERVING
        </span>
      </div>
      <svg viewBox="0 0 620 500" aria-label="Abstract security topology">
        <defs>
          <linearGradient id="line" x1="0" x2="1">
            <stop stopColor="#00D9FF" stopOpacity=".8" />
            <stop offset="1" stopColor="#7C5CFC" stopOpacity=".25" />
          </linearGradient>
        </defs>
        <g className="grid-lines">
          {[60, 140, 220, 300, 380, 460].map((y) => (
            <path key={y} d={`M0 ${y}H620`} />
          ))}
          {[70, 170, 270, 370, 470, 570].map((x) => (
            <path key={x} d={`M${x} 0V500`} />
          ))}
        </g>
        <g className="connections">
          <path d="M80 360 190 260 300 310 420 170 540 220M190 260 240 100 420 170M300 310 370 410 540 220M80 360l290 50" />
          <path d="m240 100 60 210 240-90" />
        </g>
        <g className="nodes">
          {[
            [80, 360, 6],
            [190, 260, 8],
            [240, 100, 5],
            [300, 310, 11],
            [420, 170, 7],
            [370, 410, 5],
            [540, 220, 9],
          ].map(([x, y, r], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={r + 9} className="pulse" />
              <circle cx={x} cy={y} r={r} className={i === 3 ? "core" : ""} />
            </g>
          ))}
        </g>
        <g className="labels">
          <text x="320" y="300">
            CORE / 01
          </text>
          <text x="435" y="160">
            EDGE / AUTH
          </text>
          <text x="95" y="384">
            EXT / DNS
          </text>
        </g>
      </svg>
      <div className="visual-foot">
        <span>07 NODES</span>
        <span>12 RELATIONSHIPS</span>
        <span>RISK MODEL 0.84</span>
      </div>
    </div>
  );
}
