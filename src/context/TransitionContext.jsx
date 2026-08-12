import { createContext, useContext, useState, useCallback } from 'react';

const TransitionCtx = createContext(null);

export const TransitionProvider = ({ children }) => {
  const [target, setTarget] = useState(null);

  const swingTo = useCallback((path) => {
    setTarget(path);
  }, []);

  const clearTarget = useCallback(() => setTarget(null), []);

  return (
    <TransitionCtx.Provider value={{ swingTo }}>
      {children}
      {target && <SwingPortal targetPath={target} onDone={clearTarget} />}
    </TransitionCtx.Provider>
  );
};

export const useSwing = () => useContext(TransitionCtx);

/* ──────────────────────────────────────────────────────────────
   SwingPortal — True pendulum swing LEFT → RIGHT
   Angle is the primary driver with cosine timing so Spider-Man
   is FAST at the bottom of the arc and SLOW at the sides.
   Image is flipped horizontally so he faces left (into the swing).
────────────────────────────────────────────────────────────── */
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { swingImg } from '../assets/images';

const DURATION = 2000;   // ms
const IMG_W    = 160;    // rendered image width
const IMG_H    = 200;    // rendered image height

const SwingPortal = ({ targetPath, onDone }) => {
  const navigate = useNavigate();
  const svgRef   = useRef(null);
  const rafRef   = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // ── Anchor: top-CENTER ─────────────────────────────────
    const AX = vw / 2;
    const AY = -60;

    // ── Arc motion: driven by X and a sine Y arc ────────────
    // Spider travels left → right. X uses cosine (pendulum) speed.
    // Y follows a sine arc: HIGH at the sides, LOW in the center.
    // This perfectly mimics a pendulum without rigid physics limits.
    const X_START = -(IMG_W + 60);          // off-screen left
    const X_END   = vw + IMG_W + 60;        // off-screen right
    const Y_TOP   = vh * 0.10;              // entry/exit height (10% from top)
    const Y_MID   = vh * 0.48;             // lowest point (48% = near center screen)

    const rope    = svg.querySelector('#rope');
    const spiderG = svg.querySelector('#spiderG');
    const silkDots = svg.querySelectorAll('.silk-dot');

    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const t = Math.min((ts - startRef.current) / DURATION, 1);

      // ── Pendulum speed: (1-cos(πt))/2 ──────────────────────
      // t=0 → 0, t=0.5 → 1 (fastest), t=1 → 0
      // This makes Spider-Man slow at entry/exit, FAST in the middle ✓
      const pendT = (1 - Math.cos(t * Math.PI)) / 2;

      // ── Position ─────────────────────────────────────────────
      const spiderX = X_START + (X_END - X_START) * pendT;
      // Y: sine arc — peaks at t=0.5 (center of screen = bottom of arc)
      const spiderY = Y_TOP + (Y_MID - Y_TOP) * Math.sin(t * Math.PI);

      // ── Tilt: angle of the virtual rope from anchor to Spider-Man ─
      const ropeVecX = spiderX - AX;
      const ropeVecY = spiderY - AY;
      const ropeAngle = Math.atan2(ropeVecX, ropeVecY); // angle from vertical
      const deg = (ropeAngle * 180 / Math.PI) * 0.6;    // dampen tilt slightly
      const rad = ropeAngle * 0.6;

      // ── Hand position (local coords in non-flipped image) ────────
      // Raised fist is at ~20% from left, ~30% from top
      const handLX = IMG_W * 0.20;
      const handLY = IMG_H * 0.30;

      // Transform hand from local → world space (same matrix as spiderG)
      // spiderG = translate(spiderX,spiderY) rotate(deg)
      // After rotate(deg):
      const ropeEndX = spiderX + handLX * Math.cos(rad) - handLY * Math.sin(rad);
      const ropeEndY = spiderY + handLX * Math.sin(rad) + handLY * Math.cos(rad);

      // ── Opacity ───────────────────────────────────────────────
      let op = 1;
      if (t < 0.10) op = t / 0.10;
      else if (t > 0.85) op = (1 - t) / 0.15;

      // ── Update SVG ────────────────────────────────────────────
      rope.setAttribute('x1', AX);
      rope.setAttribute('y1', AY);
      rope.setAttribute('x2', ropeEndX);
      rope.setAttribute('y2', ropeEndY);
      rope.style.opacity = op * 0.9;

      silkDots.forEach((dot, i) => {
        const f = (i + 1) / (silkDots.length + 1);
        dot.setAttribute('cx', AX + (ropeEndX - AX) * f);
        dot.setAttribute('cy', AY + (ropeEndY - AY) * f);
        dot.style.opacity = op * 0.5;
      });

      spiderG.setAttribute(
        'transform',
        `translate(${spiderX},${spiderY}) rotate(${deg})`
      );
      spiderG.style.opacity = op;

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        navigate(targetPath);
        setTimeout(onDone, 300);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [navigate, targetPath, onDone]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, pointerEvents: 'none' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <line
          id="rope"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray="8 5"
          strokeLinecap="round"
          opacity="0"
        />
        {[0, 1, 2, 3].map(i => (
          <circle key={i} className="silk-dot" r="2.5" fill="white" opacity="0" />
        ))}
        <g id="spiderG" opacity="0">
          <image
            href={swingImg}
            x="0" y="0"
            width={IMG_W} height={IMG_H}
            style={{ imageRendering: 'auto' }}
          />
        </g>
      </svg>
    </div>
  );
};
