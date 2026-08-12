import { useEffect, useRef } from 'react';

/* Draws a full spider web at the click point and fades it out */
const SpiderClickEffect = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const size = 180 + Math.random() * 80; // 180–260 px
      const r = size / 2;

      // Build the SVG path for a web at this size
      const spokes = 8;
      const rings  = 5;
      let paths = '';

      // Radial spoke lines
      for (let i = 0; i < spokes; i++) {
        const angle = (i / spokes) * Math.PI * 2;
        const x2 = r + Math.cos(angle) * r * 0.95;
        const y2 = r + Math.sin(angle) * r * 0.95;
        paths += `<line x1="${r}" y1="${r}" x2="${x2}" y2="${y2}" />`;
      }

      // Concentric polygon rings
      for (let ring = 1; ring <= rings; ring++) {
        const fraction = ring / rings;
        const pts = [];
        for (let i = 0; i < spokes; i++) {
          const angle = (i / spokes) * Math.PI * 2;
          pts.push(
            `${r + Math.cos(angle) * r * 0.95 * fraction},${r + Math.sin(angle) * r * 0.95 * fraction}`
          );
        }
        paths += `<polygon points="${pts.join(' ')}" fill="none" />`;
      }

      // Pick a random slight rotation for variety
      const rotate = Math.floor(Math.random() * 45);

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width',  size);
      svg.setAttribute('height', size);
      svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
      svg.style.cssText = `
        position: fixed;
        pointer-events: none;
        left: ${x - r}px;
        top:  ${y - r}px;
        z-index: 9999;
        transform-origin: center;
        transform: rotate(${rotate}deg) scale(0.15);
        opacity: 0;
        animation: webBurst 700ms cubic-bezier(.2,.9,.3,1) forwards;
      `;

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('stroke', 'rgba(255,255,255,0.9)');
      g.setAttribute('stroke-width', '1.2');
      g.setAttribute('fill', 'none');
      g.innerHTML = paths;

      // Also add a tiny spider at the centre
      const spider = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      spider.setAttribute('x', r);
      spider.setAttribute('y', r + 6);
      spider.setAttribute('text-anchor', 'middle');
      spider.setAttribute('font-size', '14');
      spider.setAttribute('fill', '#E3000F');
      spider.style.filter = 'drop-shadow(0 0 5px rgba(255,0,0,1)) drop-shadow(0 0 10px rgba(255,0,0,0.7))';
      spider.textContent = '🕷';

      svg.appendChild(g);
      svg.appendChild(spider);
      container.appendChild(svg);

      // Remove after animation completes
      setTimeout(() => svg.remove(), 720);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }} />;
};

export default SpiderClickEffect;
