import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import atlasFox from '../assets/atlas-fox.png';
import orbitChameleon from '../assets/orbit-chameleon.png';
import violetDj from '../assets/violet-dj.png';
import roamPanda from '../assets/roam-panda.png';

const FIGURES = [
  { src: atlasFox, name: 'ATLAS-01', role: 'Chrome fox', bg: '#101a37', glow: '#5f8dff', accent: '#f3c36a' },
  { src: orbitChameleon, name: 'ORBIT-02', role: 'Deep-space chameleon', bg: '#063d3d', glow: '#2ee8dd', accent: '#ff8b50' },
  { src: violetDj, name: 'VIOLET-03', role: 'Midnight selector', bg: '#351052', glow: '#df73ff', accent: '#ffd24a' },
  { src: roamPanda, name: 'ROAM-04', role: 'Street photographer', bg: '#44101f', glow: '#ff5d70', accent: '#ffb389' },
];

const GRAIN = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.36'/%3E%3C/svg%3E";
const EASE = '650ms cubic-bezier(0.22, 1, 0.36, 1)';

export default function ToonHubCarousel() {
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const item = FIGURES[active];

  useEffect(() => {
    FIGURES.forEach(({ src }) => { const image = new Image(); image.src = src; });
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navigate = useCallback((direction: 1 | -1) => {
    if (locked) return;
    setLocked(true);
    setActive((current) => (current + direction + FIGURES.length) % FIGURES.length);
    window.setTimeout(() => setLocked(false), 650);
  }, [locked]);

  const position = (index: number): React.CSSProperties => {
    const distance = (index - active + FIGURES.length) % FIGURES.length;
    const base: React.CSSProperties = {
      position: 'absolute', bottom: isMobile ? '11%' : '-4%', left: '50%',
      width: isMobile ? '70vw' : 'min(35vw, 540px)', aspectRatio: '2 / 3',
      transformOrigin: 'bottom center', transition: `all ${EASE}`, willChange: 'transform, opacity, filter',
    };
    if (distance === 0) return { ...base, transform: 'translateX(-50%) scale(1)', opacity: 1, filter: 'none', zIndex: 4 };
    if (distance === 1) return { ...base, transform: `translateX(${isMobile ? '18%' : '50%'}) scale(${isMobile ? '.46' : '.56'})`, opacity: .52, filter: 'blur(1px)', zIndex: 2 };
    if (distance === 3) return { ...base, transform: `translateX(${isMobile ? '-118%' : '-150%'}) scale(${isMobile ? '.46' : '.56'})`, opacity: .52, filter: 'blur(1px)', zIndex: 2 };
    return { ...base, transform: 'translateX(-50%) scale(.38)', opacity: .18, filter: 'blur(5px)', zIndex: 1 };
  };

  return (
    <main style={{ minHeight: '100svh', overflow: 'hidden', position: 'relative', color: '#fff', background: item.bg, fontFamily: 'Inter, sans-serif', transition: `background ${EASE}` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${item.glow}31, transparent 36%), linear-gradient(125deg, ${item.bg}, #05060b 92%)`, transition: `background ${EASE}` }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: .12, backgroundImage: `url("${GRAIN}")`, mixBlendMode: 'soft-light', pointerEvents: 'none', zIndex: 10 }} />
      <div aria-hidden style={{ position: 'absolute', top: '13%', left: 0, right: 0, zIndex: 0, fontFamily: 'Anton, sans-serif', fontSize: 'clamp(7rem, 23vw, 22rem)', letterSpacing: '-.07em', lineHeight: .75, whiteSpace: 'nowrap', textAlign: 'center', color: 'rgba(255,255,255,.075)' }}>TOONHUB</div>

      <header style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: isMobile ? '22px 20px' : '32px 46px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 11 }}>
        <div style={{ fontWeight: 700, letterSpacing: '.2em', fontSize: 12 }}>TOONHUB<sup style={{ fontSize: 7, marginLeft: 3 }}>®</sup></div>
        <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 11, letterSpacing: '.13em' }}>COLLECTIBLE CULTURE / 2026</div>
      </header>

      <section style={{ position: 'relative', minHeight: '100svh', maxWidth: 1540, margin: '0 auto' }}>
        <div style={{ position: 'absolute', left: isMobile ? 20 : 46, top: isMobile ? '16%' : '23%', zIndex: 6, maxWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: item.accent, letterSpacing: '.14em', fontSize: 10, fontWeight: 700 }}><Sparkles size={14} /> LIMITED DROP</div>
          <h1 style={{ fontFamily: 'Anton, sans-serif', fontWeight: 400, fontSize: 'clamp(3.25rem, 7.8vw, 8rem)', letterSpacing: '-.045em', lineHeight: .82, margin: '18px 0 14px' }}>{item.name}</h1>
          <p style={{ margin: 0, maxWidth: 210, color: 'rgba(255,255,255,.68)', lineHeight: 1.6, fontSize: 13 }}>{item.role}. Sculpted for the shelf, engineered for your imagination.</p>
        </div>

        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
          {FIGURES.map((figure, index) => <figure key={figure.name} style={{ ...position(index), margin: 0 }}><img src={figure.src} alt={figure.name} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom center', display: 'block', userSelect: 'none' }} /></figure>)}
        </div>

        <div style={{ position: 'absolute', right: isMobile ? 20 : 46, bottom: isMobile ? 24 : 36, zIndex: 11, textAlign: 'right' }}>
          <div style={{ fontSize: 11, letterSpacing: '.15em', color: 'rgba(255,255,255,.58)', marginBottom: 12 }}>0{active + 1} / 0{FIGURES.length}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button aria-label="Previous figure" onClick={() => navigate(-1)} style={buttonStyle}><ArrowLeft size={21} /></button>
            <button aria-label="Next figure" onClick={() => navigate(1)} style={buttonStyle}><ArrowRight size={21} /></button>
          </div>
        </div>
        <a href="#collection" style={{ position: 'absolute', left: isMobile ? 20 : 46, bottom: isMobile ? 28 : 40, zIndex: 11, color: '#fff', textDecoration: 'none', fontSize: 12, fontWeight: 700, letterSpacing: '.14em', borderBottom: `1px solid ${item.accent}`, paddingBottom: 6 }}>EXPLORE THE DROP ↗</a>
      </section>
    </main>
  );
}

const buttonStyle: React.CSSProperties = { width: 52, height: 52, borderRadius: '50%', border: '1px solid rgba(255,255,255,.48)', background: 'rgba(5,6,11,.25)', color: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center', backdropFilter: 'blur(9px)' };
