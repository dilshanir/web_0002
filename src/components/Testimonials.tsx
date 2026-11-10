import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import MotionArt from './MotionArt';
import { fadeUp, useInViewAnimation } from '../hooks/useInViewAnimation';
import { SERIF, testimonials, type Testimonial } from '../data/site';

function Avatar({ person, index }: { person: Testimonial; index: number }) {
  const [failed, setFailed] = useState(false);

  if (person.avatar && !failed) {
    return (
      <img
        src={person.avatar}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-11 w-11 rounded-full object-cover"
      />
    );
  }

  return (
    <span className="block h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-[#051A24]/10">
      <MotionArt variant={index * 2 + 1} uid={`av-${index}`} />
    </span>
  );
}

export default function Testimonials() {
  const { ref, isInView } = useInViewAnimation<HTMLElement>();
  const viewport = useRef<HTMLDivElement>(null);
  const firstCard = useRef<HTMLLIElement>(null);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [maxIndex, setMaxIndex] = useState(testimonials.length - 1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !firstCard.current) return;
      const cardStep = firstCard.current.offsetWidth + 24; // card + gap-6
      const visible = Math.max(1, Math.floor((viewport.current.offsetWidth + 24) / cardStep));
      setStep(cardStep);
      setMaxIndex(Math.max(0, testimonials.length - visible));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((current) => {
        const next = current + dir;
        if (next > maxIndex) return 0;
        if (next < 0) return maxIndex;
        return next;
      });
    },
    [maxIndex],
  );

  useEffect(() => {
    if (index > maxIndex) setIndex(0);
  }, [index, maxIndex]);

  // auto-advance every 3s while on screen and not being read
  useEffect(() => {
    if (!isInView || paused || maxIndex === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => go(1), 3000);
    return () => window.clearInterval(id);
  }, [isInView, paused, maxIndex, go]);

  return (
    <section ref={ref} className="overflow-hidden px-6 py-16 md:py-24" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-7xl">
        <h2
          id="testimonials-title"
          style={fadeUp(isInView, 0.1).style}
          className={`max-w-xl text-[32px] font-medium leading-[1.1] tracking-[-0.02em] text-[#051A24] md:text-[44px] ${fadeUp(isInView, 0.1).className}`}
        >
          What it is like to <span style={{ fontFamily: SERIF, fontWeight: 400 }}>work together</span>.
        </h2>

        <div {...fadeUp(isInView, 0.2)}>
          <div
            ref={viewport}
            className="mt-10 md:mt-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <ul
              className="flex gap-6 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{ transform: `translate3d(${-index * step}px, 0, 0)` }}
            >
              {testimonials.map((person, i) => (
                <li
                  key={i}
                  ref={i === 0 ? firstCard : undefined}
                  className={`flex w-[300px] shrink-0 flex-col justify-between rounded-3xl bg-[#F6FCFF] p-7 shadow-[0_0_0_1px_rgba(5,26,36,0.06)] transition-opacity duration-500 md:w-[420px] md:p-9 ${
                    i < index ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <figure className="flex h-full flex-col justify-between gap-10">
                    <blockquote className="text-lg leading-snug tracking-[-0.01em] text-[#051A24] md:text-[22px]">
                      &ldquo;{person.quote}&rdquo;
                    </blockquote>
                    <figcaption className="flex items-center gap-3">
                      <Avatar person={person} index={i} />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-[#051A24]">{person.name}</span>
                        <span className="block text-sm text-[#273C46]">{person.role}</span>
                      </span>
                      {person.sample && (
                        <span className="ml-auto rounded-full bg-[#E0EBF0] px-3 py-1 text-xs text-[#273C46]">
                          Sample
                        </span>
                      )}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div {...fadeUp(isInView, 0.3)}>
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="btn-secondary-shadow flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#051A24] transition-colors hover:bg-[#051A24] hover:text-white"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="btn-secondary-shadow flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#051A24] transition-colors hover:bg-[#051A24] hover:text-white"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <div className="ml-3 flex gap-1.5" aria-hidden="true">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? 'w-8 bg-[#051A24]' : 'w-1.5 bg-[#E0EBF0]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
