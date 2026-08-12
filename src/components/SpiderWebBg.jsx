// Spider-Web SVG Background Pattern
const SpiderWebBg = () => (
  <svg
    className="spider-web-bg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 600"
    preserveAspectRatio="xMidYMid slice"
  >
    {/* Radial web lines from center */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x2 = 400 + Math.cos(rad) * 500;
      const y2 = 300 + Math.sin(rad) * 500;
      return (
        <line
          key={i}
          x1="400" y1="300"
          x2={x2} y2={y2}
          stroke="white"
          strokeWidth="0.8"
        />
      );
    })}
    {/* Concentric web rings */}
    {[60, 120, 180, 240, 300, 380].map((r, i) => (
      <circle
        key={i}
        cx="400" cy="300" r={r}
        fill="none"
        stroke="white"
        strokeWidth="0.6"
      />
    ))}
    {/* Corner webs */}
    <path d="M0,0 Q80,0 120,60 Q80,40 0,80 Z" fill="none" stroke="white" strokeWidth="0.5" />
    <path d="M800,0 Q720,0 680,60 Q720,40 800,80 Z" fill="none" stroke="white" strokeWidth="0.5" />
    <path d="M0,600 Q80,600 120,540 Q80,560 0,520 Z" fill="none" stroke="white" strokeWidth="0.5" />
    <path d="M800,600 Q720,600 680,540 Q720,560 800,520 Z" fill="none" stroke="white" strokeWidth="0.5" />
  </svg>
);

export default SpiderWebBg;
