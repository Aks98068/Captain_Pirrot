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
