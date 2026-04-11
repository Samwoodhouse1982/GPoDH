interface Org {
  name: string
  src: string
  h: number   // display height in px — tune per logo for visual balance
  invert?: boolean   // true for white-on-transparent logos (flips to dark)
  multiply?: boolean // true for logos with white backgrounds (blends them away)
}

const ORGS: Org[] = [
  {
    name: 'World Health Organization',
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/26/World_Health_Organization_Logo.svg',
    h: 36,
  },
  {
    name: 'Johns Hopkins University',
    src: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Johns_Hopkins_University_logo.svg',
    h: 32,
  },
  {
    name: 'Yale University',
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Yale_University_logo.svg',
    h: 28,
  },
  {
    name: 'LSHTM',
    src: '/logos/lshtm.png',
    h: 34,
    multiply: true,
  },
  {
    name: 'ICRC',
    src: 'https://www.icrc.org/themes/custom/icrc_theme/html/images/logo/logo.svg',
    h: 32,
  },
  {
    name: 'PATH',
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Path_logo.svg',
    h: 30,
  },
  {
    name: 'Geneva Digital Health Hub',
    src: 'https://gdhub.org/wp-content/uploads/2025/07/Black-on-Transparent-scaled.png',
    h: 30,
  },
  {
    name: 'Digital Medicine Society',
    src: 'https://fpdtac9mhctc-u4418.pressidiumcdn.com/wp-content/uploads/logo-copy-2.svg',
    h: 28,
  },
  {
    name: 'FIND',
    src: 'https://www.finddx.org/wp-content/uploads/2022/12/20221217_FIND_logo_color_web_no_bcknd_EN.png',
    h: 30,
  },
  {
    name: 'Khushi Baby',
    src: 'https://cdn.prod.website-files.com/665fe4f280c6b2f1935e282a/66684116cd3010f1b0c7074c_logo-colored.png',
    h: 28,
  },
  {
    name: 'YLabs',
    src: 'https://images.squarespace-cdn.com/content/v1/5ea7b2cd859d291f18d9dfb9/1588090988388-1FP270TKWHMVLO6HJVOQ/YLabs_Primary+Logo_PURPLE.png',
    h: 28,
  },
  {
    name: 'Audere',
    src: 'https://images.squarespace-cdn.com/content/v1/64ff6a6dd00b77132a60f99b/f58dcd28-541e-43ed-9d9a-3594795ae8e3/Audere_Logo_HP.png',
    h: 26,
  },
  {
    name: 'Hardian Health',
    src: 'https://images.squarespace-cdn.com/content/v1/62f5262a0b58c94a255a69ba/86689200-19ae-4ecf-b0cc-817df78e9503/HHcropped.png',
    h: 28,
    invert: true,
  },
  {
    name: 'TechChange',
    src: 'https://www.techchange.org/wp-content/uploads/2022/07/logo-header-new.png',
    h: 28,
  },
  {
    name: 'Global Strategies',
    src: 'https://cdn.prod.website-files.com/59b6c0517bd7ea0001f0f2b8/59b6cc08eee7c800016d15be_logo-h85.png',
    h: 30,
  },
  {
    name: 'University of São Paulo',
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Webysther_20160310_-_Logo_USP.svg',
    h: 36,
  },
  {
    name: 'TU Dresden',
    src: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Logo_TU_Dresden_en_2025.svg',
    h: 28,
  },
  {
    name: 'The Luke Commission',
    src: 'https://images.squarespace-cdn.com/content/v1/651dd3a3ce05533bbddc9323/0a0768a5-3ba5-49c5-8718-278b6a7b9dfc/TLC+Web+Logo.png',
    h: 32,
    invert: true,
  },
]

export default function OrgMarquee() {
  const items = [...ORGS, ...ORGS]

  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        padding: '1.25rem 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Fade edges */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to right, var(--bg-secondary) 0%, transparent 6%, transparent 94%, var(--bg-secondary) 100%)',
      }} />

      <div className="org-marquee-track">
        {items.map((org, i) => (
          <div
            key={i}
            className="org-marquee-item"
            title={org.name}
            style={org.multiply ? { mixBlendMode: 'multiply' } : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={org.src}
              alt={org.name}
              height={org.h}
              style={{
                height: `${org.h}px`,
                width: 'auto',
                display: 'block',
                filter: org.invert ? 'invert(1)' : undefined,
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .org-marquee-track {
          display: flex;
          align-items: center;
          gap: 0;
          width: max-content;
          animation: org-scroll 60s linear infinite;
        }
        .org-marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes org-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .org-marquee-item {
          display: flex;
          align-items: center;
          padding: 0 2.5rem;
          opacity: 0.45;
          filter: grayscale(100%);
          transition: opacity 0.25s ease, filter 0.25s ease;
        }
        .org-marquee-item:hover {
          opacity: 1;
          filter: grayscale(0%);
        }
      `}</style>
    </div>
  )
}
