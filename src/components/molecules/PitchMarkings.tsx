/** Linhas do campo em metros (105 × 68), esticadas para o tamanho da prancheta. */
export function PitchMarkings() {
  return (
    <svg
      viewBox="0 0 105 68"
      preserveAspectRatio="none"
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
    >
      <g fill="none" stroke="rgb(255 255 255 / .75)" strokeWidth=".35">
        <rect x="1" y="1" width="103" height="66" />
        <line x1="52.5" y1="1" x2="52.5" y2="67" />
        <circle cx="52.5" cy="34" r="9.15" />
        <rect x="1" y="13.85" width="16.5" height="40.3" />
        <rect x="87.5" y="13.85" width="16.5" height="40.3" />
        <rect x="1" y="24.85" width="5.5" height="18.3" />
        <rect x="98.5" y="24.85" width="5.5" height="18.3" />
        <path d="M17.5 26.7 A9.15 9.15 0 0 1 17.5 41.3" />
        <path d="M87.5 26.7 A9.15 9.15 0 0 0 87.5 41.3" />
      </g>
      <g fill="rgb(255 255 255 / .8)">
        <circle cx="52.5" cy="34" r=".5" />
        <circle cx="12" cy="34" r=".4" />
        <circle cx="93" cy="34" r=".4" />
      </g>
      <rect
        x="104"
        y="30.34"
        width="1"
        height="7.32"
        fill="rgb(255 255 255 / .9)"
      />
      <rect
        x="0"
        y="30.34"
        width="1"
        height="7.32"
        fill="rgb(255 255 255 / .9)"
      />
    </svg>
  )
}
