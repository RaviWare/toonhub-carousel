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
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: `'Inter', sans-serif`,
      }}
    >
      {/* Grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundRepeat: 'repeat',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Ghost text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: `'Anton', sans-serif`,
          fontSize: isMobile ? '20vw' : '14vw',
          color: 'rgba(255,255,255,0.08)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 2,
          letterSpacing: '0.05em',
        }}
      >
        3D SHAPE
      </div>

      {/* Brand label */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? 16 : 32,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: `'Anton', sans-serif`,
          fontSize: isMobile ? '1.5rem' : '2rem',
          color: 'white',
          letterSpacing: '0.15em',
          zIndex: 30,
        }}
      >
        TOONHUB
      </div>

      {/* Carousel items */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 15 }}>
        {IMAGES.map((img, i) => {
          const role = i === center ? 'center' : i === left ? 'left' : i === right ? 'right' : 'back';
          const panelColor = img.panel;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: TRANSITION,
                ...getRoleStyle(i),
              }}
            >
              <div
                style={{
                  background: panelColor,
                  borderRadius: role === 'center' ? (isMobile ? 16 : 24) : 12,
                  padding: role === 'center' ? (isMobile ? '8px 8px 0' : '12px 12px 0') : '6px 6px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  boxSizing: 'border-box',
                  boxShadow: role === 'center' ? '0 32px 80px rgba(0,0,0,0.35)' : '0 8px 24px rgba(0,0,0,0.2)',
                }}
              >
                <img
                  src={img.src}
                  alt={`Character ${i + 1}`}
                  style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
                {role === 'center' && (
                  <div
                    style={{
                      paddingBottom: isMobile ? 6 : 10,
                      paddingTop: isMobile ? 4 : 6,
                      textAlign: 'center',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: `'Anton', sans-serif`,
                        fontSize: isMobile ? '1rem' : '1.375rem',
                        color: 'white',
                        opacity: 0.95,
                        margin: 0,
                      }}
                    >
                      TOONHUB
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom-left: text + nav buttons */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? 16 : 32,
          left: isMobile ? 16 : 40,
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 8 : 16,
          maxWidth: isMobile ? '60vw' : 320,
        }}
      >
        <p
          style={{
            fontFamily: `'Anton', sans-serif`,
            fontSize: isMobile ? '1.125rem' : '1.5rem',
            color: 'white',
            margin: 0,
            letterSpacing: '0.08em',
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
              margin: 0,
            }}
          >
            The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.
          </p>
        )}
        <div style={{ display: 'flex', gap: isMobile ? 8 : 12 }}>
          {([{ dir: 'prev' as const, Icon: ArrowLeft }, { dir: 'next' as const, Icon: ArrowRight }]).map(({ dir, Icon }) => (
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
              <Icon size={isMobile ? 18 : 24} />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom-right: DISCOVER IT link */}
      <a
        href="#"
        style={{
          position: 'absolute',
          bottom: isMobile ? 24 : 40,
          right: isMobile ? 16 : 40,
          zIndex: 30,
          fontFamily: `'Anton', sans-serif`,
          fontSize: isMobile ? '0.75rem' : '0.875rem',
          color: 'white',
          opacity: 0.95,
          letterSpacing: '0.12em',
          textDecoration: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.5)',
          paddingBottom: 2,
          transition: 'opacity 150ms',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.95')}
      >
        DISCOVER IT
      </a>
    </div>
  );
}
