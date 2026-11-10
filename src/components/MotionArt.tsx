import type { CSSProperties, ReactNode } from 'react';

/**
 * Eight looping generative pieces drawn in SVG and animated with CSS.
 * They stand in wherever no GIF / image URL has been supplied, so the
 * page is never waiting on external media.
 */

const INK = '#051A24';
const DARK = '#0D212C';
const MUTED = '#273C46';
const LIGHT = '#F6FCFF';
const MIST = '#E0EBF0';

const W = 400;
const H = 500;
const CX = W / 2;
const CY = H / 2;

const anim = (name: string, duration: number, delay = 0, timing = 'linear'): CSSProperties => ({
  animation: `${name} ${duration}s ${timing} ${delay}s infinite`,
});

function Vortex() {
  return (
    <>
      <rect width={W} height={H} fill={INK} />
      {Array.from({ length: 10 }, (_, i) => {
        const r = 26 + i * 27;
        return (
          <circle
            key={i}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke={LIGHT}
            strokeOpacity={0.9 - i * 0.07}
            strokeWidth={i % 3 === 0 ? 2.5 : 1.2}
            strokeDasharray={`${r * 0.9} ${r * 0.55}`}
            strokeLinecap="round"
            style={anim(i % 2 ? 'art-spin-rev' : 'art-spin', 7 + i * 2.2)}
          />
        );
      })}
      <circle cx={CX} cy={CY} r={7} fill={LIGHT} />
    </>
  );
}

function Waves() {
  const wave = (y: number, amp: number) => {
    let d = `M -200 ${y} q 50 ${-amp} 100 0`;
    for (let i = 0; i < 8; i++) d += ' t 100 0';
    return d;
  };
  return (
    <>
      <rect width={W} height={H} fill={MIST} />
      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={i}
          d={wave(70 + i * 45, 14 + i * 5)}
          fill="none"
          stroke={INK}
          strokeWidth={i % 2 ? 1.2 : 2.4}
          strokeOpacity={0.35 + i * 0.07}
          strokeLinecap="round"
          style={anim('art-drift', 5 + i * 0.9)}
        />
      ))}
    </>
  );
}

function Orbit() {
  const orbits = [60, 105, 150, 200];
  return (
    <>
      <rect width={W} height={H} fill={DARK} />
      <circle cx={CX} cy={CY} r={22} fill={LIGHT} />
      {orbits.map((r, i) => (
        <g key={r} style={anim(i % 2 ? 'art-spin-rev' : 'art-spin', 6 + i * 4)}>
          <circle cx={CX} cy={CY} r={r} fill="none" stroke={LIGHT} strokeOpacity={0.22} strokeWidth={1} />
          <circle cx={CX + r} cy={CY} r={5 + i * 2} fill={LIGHT} />
          <circle cx={CX - r} cy={CY} r={3} fill={MIST} fillOpacity={0.6} />
          {/* keeps the group's bounding box centred so it spins on its axis */}
          <circle cx={CX} cy={CY} r={r + 24} fill="none" />
        </g>
      ))}
    </>
  );
}

function DotGrid() {
  const dots: ReactNode[] = [];
  for (let row = 0; row < 11; row++) {
    for (let col = 0; col < 9; col++) {
      const x = 40 + col * 40;
      const y = 50 + row * 40;
      const dist = Math.hypot(x - CX, y - CY);
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={x}
          cy={y}
          r={9}
          fill={INK}
          style={anim('art-pulse', 2.6, -(dist / 110), 'ease-in-out')}
        />,
      );
    }
  }
  return (
    <>
      <rect width={W} height={H} fill={LIGHT} />
      {dots}
    </>
  );
}

function Blobs({ id }: { id: string }) {
  return (
    <>
      <defs>
        <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="38" />
        </filter>
      </defs>
      <rect width={W} height={H} fill={INK} />
      <g filter={`url(#${id})`}>
        <circle cx={140} cy={170} r={110} fill={MIST} fillOpacity={0.75} style={anim('art-float', 11, 0, 'ease-in-out')} />
        <circle cx={270} cy={330} r={130} fill={MUTED} style={anim('art-float', 14, -4, 'ease-in-out')} />
        <circle cx={230} cy={210} r={70} fill={LIGHT} fillOpacity={0.9} style={anim('art-float', 9, -2, 'ease-in-out')} />
      </g>
      <circle cx={CX} cy={CY} r={150} fill="none" stroke={LIGHT} strokeOpacity={0.35} strokeDasharray="2 10" style={anim('art-spin', 40)} />
    </>
  );
}

function Equalizer() {
  return (
    <>
      <rect width={W} height={H} fill={MIST} />
      {Array.from({ length: 15 }, (_, i) => {
        const h = 120 + Math.sin(i * 0.9) * 70 + (i % 3) * 40;
        return (
          <rect
            key={i}
            x={32 + i * 23}
            y={CY - h / 2}
            width={11}
            height={h}
            rx={5.5}
            fill={INK}
            style={anim('art-eq', 1.3 + (i % 5) * 0.22, -i * 0.17, 'ease-in-out')}
          />
        );
      })}
    </>
  );
}

function Sunburst() {
  return (
    <>
      <rect width={W} height={H} fill={MUTED} />
      <g style={anim('art-spin', 36)}>
        {Array.from({ length: 60 }, (_, i) => {
          const a = (i / 60) * Math.PI * 2;
          const r1 = 70;
          const r2 = i % 5 === 0 ? 330 : i % 2 ? 200 : 260;
          return (
            <line
              key={i}
              x1={CX + Math.cos(a) * r1}
              y1={CY + Math.sin(a) * r1}
              x2={CX + Math.cos(a) * r2}
              y2={CY + Math.sin(a) * r2}
              stroke={LIGHT}
              strokeOpacity={i % 5 === 0 ? 0.9 : 0.4}
              strokeWidth={i % 5 === 0 ? 2 : 1}
            />
          );
        })}
        {/* keeps the group's bounding box centred so it spins on its axis */}
        <circle cx={CX} cy={CY} r={330} fill="none" />
      </g>
      <circle cx={CX} cy={CY} r={54} fill="none" stroke={LIGHT} strokeWidth={2} strokeDasharray="14 9" style={anim('art-spin-rev', 12)} />
      <circle cx={CX} cy={CY} r={30} fill={LIGHT} />
    </>
  );
}

function Squares() {
  return (
    <>
      <rect width={W} height={H} fill={LIGHT} />
      {Array.from({ length: 9 }, (_, i) => {
        const s = 300 - i * 32;
        return (
          <rect
            key={i}
            x={CX - s / 2}
            y={CY - s / 2}
            width={s}
            height={s}
            rx={10 + i * 2}
            fill={i === 8 ? INK : 'none'}
            stroke={INK}
            strokeWidth={1.6}
            strokeOpacity={0.3 + i * 0.08}
            style={anim('art-breathe', 6, -i * 0.35, 'ease-in-out')}
          />
        );
      })}
    </>
  );
}

export const ART_COUNT = 8;

type MotionArtProps = {
  variant: number;
  className?: string;
  /** Unique suffix for SVG filter ids when the same variant renders more than once. */
  uid?: string;
};

export default function MotionArt({ variant, className = '', uid = '0' }: MotionArtProps) {
  const v = ((variant % ART_COUNT) + ART_COUNT) % ART_COUNT;
  const pieces = [
    <Vortex />,
    <Waves />,
    <Orbit />,
    <DotGrid />,
    <Blobs id={`blur-${uid}`} />,
    <Equalizer />,
    <Sunburst />,
    <Squares />,
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`art block h-full w-full ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {pieces[v]}
    </svg>
  );
}

type MediaProps = {
  /** GIF / image URL. Falls back to generative art when null. */
  src: string | null;
  art: number;
  alt?: string;
  uid?: string;
  className?: string;
};

/** Shows the supplied media, or a generative piece when none is set. */
export function Media({ src, art, alt = '', uid, className = '' }: MediaProps) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  }
  return <MotionArt variant={art} uid={uid} className={className} />;
}
