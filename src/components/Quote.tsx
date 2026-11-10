import { useEffect, useRef } from 'react';
import { Media } from './MotionArt';
import { fadeUp, useInViewAnimation } from '../hooks/useInViewAnimation';
import { brands, quoteMedia, SERIF } from '../data/site';

/** Moves the inner layer against the scroll for a parallax window. */
function useParallax(strength = 60) {
  const frame = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = frame.current;
      if (!el || !layer.current) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      // -1 when the frame is just below the viewport, 1 when just above
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2);
      layer.current.style.transform = `translate3d(0, ${(progress * strength).toFixed(1)}px, 0) scale(1.3)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [strength]);

  return { frame, layer };
}

export default function Quote() {
  const { ref, isInView } = useInViewAnimation<HTMLElement>();
  const { frame, layer } = useParallax(70);

  return (
    <section ref={ref} className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <blockquote {...fadeUp(isInView, 0.1)}>
          <p className="text-[26px] font-medium leading-[1.2] tracking-[-0.01em] text-[#051A24] md:text-[40px]">
            &ldquo;At <span style={{ fontFamily: SERIF, fontWeight: 400 }}>Apple</span> I learned that the details are
            the product. Now I bring that same obsession to founders building what comes next.&rdquo;
          </p>
        </blockquote>

        <p {...fadeUp(isInView, 0.2)}>
          <span className="mt-6 block text-base italic text-[#273C46]">Sarah Vortex</span>
        </p>

        <div {...fadeUp(isInView, 0.3)}>
          <p className="mt-10 text-sm text-[#273C46]">Recent partners</p>
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
            {brands.map((brand) => (
              <li key={brand} className="text-xl font-medium tracking-[-0.01em] text-[#051A24] md:text-2xl">
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div {...fadeUp(isInView, 0.4)}>
        <div
          ref={frame}
          className="mx-auto mt-14 h-[320px] max-w-5xl overflow-hidden rounded-3xl shadow-lg md:mt-20 md:h-[560px]"
        >
          <div ref={layer} className="h-full w-full will-change-transform" style={{ transform: 'scale(1.3)' }}>
            <Media src={quoteMedia} art={6} uid="quote" alt="Studio work by Sarah Vortex" />
          </div>
        </div>
      </div>
    </section>
  );
}
