import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import Button from './Button';
import { fadeUp, useInViewAnimation } from '../hooks/useInViewAnimation';
import { CONTACT_HREF, SERIF } from '../data/site';

/** Counts up to `target` once `run` becomes true. */
function useCountUp(target: number, run: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 4))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);

  return value;
}

const plans = [
  {
    name: 'Monthly Partnership',
    dark: true,
    unit: 'per month',
    blurb: 'An ongoing design partner for teams that ship every week.',
    features: [
      'Unlimited design requests, one at a time',
      'Brand, product and motion design',
      'Direct line to Sarah on Slack',
      'Updates every 48 hours',
      'Pause or cancel anytime',
    ],
    cta: 'Start a chat',
  },
  {
    name: 'Custom Project',
    dark: false,
    unit: 'fixed project fee',
    blurb: 'One defined outcome with a clear start, scope and finish.',
    features: [
      'Scope and timeline agreed up front',
      'Brand identity or a full website',
      'Design system and source files',
      'Launch support included',
      'Two rounds of revisions',
    ],
    cta: 'Start a chat',
  },
];

export default function Pricing() {
  const { ref, isInView } = useInViewAnimation<HTMLElement>();
  const price = useCountUp(25000, isInView);

  return (
    <section id="pricing" ref={ref} className="scroll-mt-10 px-6 py-16 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md lg:sticky lg:top-24">
          <h2
            style={fadeUp(isInView, 0.1).style}
            className={`text-[32px] font-medium leading-[1.1] tracking-[-0.02em] text-[#051A24] md:text-[44px] ${fadeUp(isInView, 0.1).className}`}
          >
            One price, <span style={{ fontFamily: SERIF, fontWeight: 400 }}>two ways</span> to work together.
          </h2>
          <p {...fadeUp(isInView, 0.2)}>
            <span className="mt-5 block text-base leading-relaxed text-[#273C46]">
              No hourly billing and no surprise invoices. Pick the shape that fits what you are building.
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row lg:justify-end">
          {plans.map((plan, i) => (
            <div key={plan.name} {...fadeUp(isInView, 0.3 + i * 0.1)}>
              <article
                className={`group relative flex h-full w-full flex-col overflow-hidden rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1.5 md:w-[360px] ${
                  plan.dark
                    ? 'on-dark bg-[#051A24] text-[#F6FCFF] shadow-2xl'
                    : 'bg-white text-[#051A24] shadow-[0_0_0_1px_rgba(5,26,36,0.08),0_20px_50px_rgba(5,26,36,0.08)]'
                }`}
              >
                {plan.dark && (
                  <svg
                    viewBox="0 0 200 200"
                    aria-hidden="true"
                    className="art pointer-events-none absolute -right-16 -top-16 h-56 w-56 opacity-40"
                  >
                    {[30, 50, 70, 90].map((r, k) => (
                      <circle
                        key={r}
                        cx="100"
                        cy="100"
                        r={r}
                        fill="none"
                        stroke="#E0EBF0"
                        strokeWidth="1"
                        strokeDasharray={`${r} ${r * 0.6}`}
                        style={{ animation: `${k % 2 ? 'art-spin-rev' : 'art-spin'} ${10 + k * 5}s linear infinite` }}
                      />
                    ))}
                  </svg>
                )}

                <h3 className="text-lg font-medium">{plan.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${plan.dark ? 'text-[#E0EBF0]' : 'text-[#273C46]'}`}>
                  {plan.blurb}
                </p>

                <p className="mt-8 flex items-baseline gap-2">
                  <span className="text-[44px] font-medium leading-none tracking-[-0.02em] tabular-nums">
                    ${price.toLocaleString('en-US')}
                  </span>
                  <span className={`text-sm ${plan.dark ? 'text-[#E0EBF0]' : 'text-[#273C46]'}`}>{plan.unit}</span>
                </p>

                <ul className="mb-8 mt-8 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.dark ? 'bg-[#273C46] text-[#F6FCFF]' : 'bg-[#E0EBF0] text-[#051A24]'
                        }`}
                      >
                        <Check size={12} strokeWidth={3} aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant={plan.dark ? 'secondary' : 'primary'} href={CONTACT_HREF} className="mt-auto w-full">
                  {plan.cta}
                </Button>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
