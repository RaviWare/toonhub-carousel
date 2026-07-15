import { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES = [
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png', bg: '#F4845F', panel: '#F79B7F' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png', bg: '#6BBF7A', panel: '#85CC92' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png', bg: '#E882B4', panel: '#ED9DC4' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png', bg: '#6EB5FF', panel: '#8DC4FF' },
];

const GRAIN_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E`;

const TRANSITION = 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1)';

export default function ToonHubCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    IMAGES.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => dir === 'next' ? (prev + 1) % 4 : (prev + 3) % 4);
    setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating]);

  const center = activeIndex;
  const left = (activeIndex + 3) % 4;
  const right = (activeIndex + 1) % 4;
  const back = (activeIndex + 2) % 4;

  function getRoleStyle(index: number): React.CSSProperties {
    if (index === center) {
      return {
        left: '50%',
        bottom: isMobile ? '22%' : 0,
        height: isMobile ? '60%' : '92%',
        transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
        filter: 'none',
        opacity: 1,
        zIndex: 20,
      };
    }
    if (index === left) {
      return {
        left: isMobile ? '20%' : '30%',
        bottom: isMobile ? '32%' : '12%',
        height: isMobile ? '16%' : '28%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
      };
    }
    if (index === right) {
      return {
        left: isMobile ? '80%' : '70%',
        bottom: isMobile ? '32%' : '12%',
        height: isMobile ? '16%' : '28%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
      };
    }
    // back
    return {
      left: '50%',
      bottom: isMobile ? '32%' : '12%',
      height: isMobile ? '13%' : '22%',
      transform: 'translateX(-50%) scale(1)',
      filter: 'blur(4px)',
      opacity: 1,
      zIndex: 5,
    };
  }

  return (
    <div
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>

        {/* Grain overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 50,
            backgroundImage: `url("${GRAIN_SVG}")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            opacity: 0.4,
          }}
        />

        {/* Ghost text */}
        <div
          style={{
            position: 'absolute',
            insetInline: 0,
            top: '18%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(90px, 28vw, 380px)',
              fontWeight: 900,
              color: 'white',
              opacity: 1,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            3D SHAPE
          </span>
        </div>

        {/* Brand label */}
        <div
          style={{
            position: 'absolute',
            top: '1.5rem',
            left: isMobile ? '1rem' : '2rem',
            zIndex: 60,
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            color: 'white',
            opacity: 0.9,
            letterSpacing: '0.18em',
          }}
        >
          TOONHUB
        </div>

        {/* Carousel items */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
          {IMAGES.map((img, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                aspectRatio: '0.6 / 1',
                transition: TRANSITION,
                willChange: 'transform, filter, opacity',
                ...getRoleStyle(i),
              }}
            >
              <img
                src={img.src}
                alt={`TOONHUB figure ${i + 1}`}
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  display: 'block',
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom-left: text + nav buttons */}
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '1.5rem' : '5rem',
            left: isMobile ? '1rem' : '6rem',
            zIndex: 60,
            maxWidth: 320,
          }}
        >
          <p
            style={{
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              marginBottom: isMobile ? '0.5rem' : '0.75rem',
              fontSize: isMobile ? '1rem' : '1.375rem',
              color: 'white',
              opacity: 0.95,
              margin: 0,
              marginBottom: isMobile ? 8 : 12,
            }}
          >
            TOONHUB FIGURINES
          </p>
          {!isMobile && (
            <p
              style={{
                fontSize: '0.875rem',
                color: 'white',
                opacity: 0.85,
                lineHeight: 1.6,
                marginBottom: '1.25rem',
                margin: 0,
                marginBottom: 20,
              }}
            >
              The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.
            </p>
          )}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: isMobile ? 8 : 0 }}>
            {([
              { dir: 'prev' as const, Icon: ArrowLeft },
              { dir: 'next' as const, Icon: ArrowRight },
            ]).map(({ dir, Icon }) => (
              <button
                key={dir}
                onClick={() => navigate(dir)}
                style={{
                  width: isMobile ? 48 : 64,
                  height: isMobile ? 48 : 64,
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '2px solid white',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 150ms, background-color 150ms',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.12)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                }}
              >
                <Icon size={26} strokeWidth={2.25} />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom-right: DISCOVER IT link */}
        <a
          href="#"
          style={{
            position: 'absolute',
            bottom: isMobile ? '1.5rem' : '5rem',
            right: isMobile ? '1rem' : '2.5rem',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            color: 'white',
            opacity: 0.95,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textTransform: 'uppercase',
            textDecoration: 'none',
            gap: 8,
            transition: 'opacity 200ms',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.95')}
        >
          DISCOVER IT
          <ArrowRight
            style={{ width: isMobile ? 20 : 32, height: isMobile ? 20 : 32 }}
            strokeWidth={2.25}
          />
        </a>

      </div>
    </div>
  );
}
