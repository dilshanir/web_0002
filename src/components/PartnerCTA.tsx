import { useCallback, useRef, useState, type MouseEvent } from 'react';
import Button from './Button';
import MotionArt, { ART_COUNT } from './MotionArt';
import { fadeUp, useInViewAnimation } from '../hooks/useInViewAnimation';
import { CONTACT_HREF, SERIF } from '../data/site';

type TrailItem = { id: number; x: number; y: number; variant: number; rot: number };

const SPAWN_DISTANCE = 110; // px the cursor travels between previews
const LIFETIME = 1100; // ms, matches the trail-pop animation

export default function PartnerCTA() {
  const { ref, isInView } = useInViewAnimation<HTMLElement>();
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const last = useRef<{ x: number; y: number } | null>(null);
  const counter = useRef(0);

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (last.current && Math.hypot(x - last.current.x, y - last.current.y) < SPAWN_DISTANCE) return;
    last.current = { x, y };

    const id = counter.current++;
    const item: TrailItem = { id, x, y, variant: id % ART_COUNT, rot: ((id * 37) % 24) - 12 };
    setTrail((items) => [...items.slice(-7), item]);
    window.setTimeout(() => setTrail((items) => items.filter((t) => t.id !== id)), LIFETIME);
  }, []);

  return (
    <section id="contact" ref={ref} className="scroll-mt-10 px-4 py-16 md:px-6 md:py-24">
      <div
        onMouseMove={onMouseMove}
        onMouseLeave={() => (last.current = null)}
        className="on-dark relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#051A24] px-6 py-24 text-center md:py-40"
      >
        {/* mouse trail: previews spawn where the cursor travels */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {trail.map((item) => (
            <div
              key={item.id}
              className="trail-item absolute h-[150px] w-[120px] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 md:h-[200px] md:w-[160px]"
              style={{ left: item.x, top: item.y, ['--rot' as string]: `${item.rot}deg` }}
            >
              <MotionArt variant={item.variant} uid={`tr-${item.id}`} />
            </div>
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-2xl">
          <h2
            style={fadeUp(isInView, 0.1).style}
            className={`text-[36px] font-medium leading-[1.05] tracking-[-0.02em] text-[#F6FCFF] md:text-[64px] ${fadeUp(isInView, 0.1).className}`}
          >
            Partner with a studio made for{' '}
            <span style={{ fontFamily: SERIF, fontWeight: 400 }}>builders</span>.
          </h2>
          <p
            style={fadeUp(isInView, 0.2).style}
            className={`mx-auto mt-6 max-w-md text-base leading-relaxed text-[#E0EBF0] ${fadeUp(isInView, 0.2).className}`}
          >
            Tell me what you are making and where you want it to go. We will take it from there.
          </p>
          <div {...fadeUp(isInView, 0.3)}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button variant="tertiary" href={CONTACT_HREF}>
                Start a chat
              </Button>
            </div>
            <p className="mt-8 hidden text-sm text-[#E0EBF0]/60 md:block">Move your cursor around to see recent work.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
