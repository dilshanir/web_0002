import { ArrowUpRight } from 'lucide-react';
import Button from './Button';
import VortexField from './VortexField';
import { fadeUp, useInViewAnimation } from '../hooks/useInViewAnimation';
import { CONTACT_HREF, SERIF } from '../data/site';

const headline: { text: string; serif?: boolean }[] = [
  { text: 'Build' },
  { text: 'the' },
  { text: 'next', serif: true },
  { text: 'wave,', serif: true },
  { text: 'the' },
  { text: 'bold', serif: true },
  { text: 'way.', serif: true },
];

export default function Hero() {
  const { ref, isInView } = useInViewAnimation<HTMLElement>();

  return (
    <header ref={ref} className="relative">
      <VortexField className="absolute inset-x-0 top-0 h-[820px] w-full" />

      <div className="relative mx-auto max-w-[440px] px-6 pt-12 md:pt-16">
        <div {...fadeUp(isInView, 0.1)}>
          <a
            href="#top"
            className="inline-block text-[32px] font-semibold leading-none text-[#051A24] md:text-[40px] lg:text-[44px]"
            style={{ fontFamily: SERIF }}
          >
            V Vortex
          </a>
          <p className="mt-2 font-mono text-xs text-[#051A24] md:text-sm">The creative studio of Sarah Vortex</p>
        </div>

        <h1 className="mt-10 text-[36px] font-medium leading-[1.05] tracking-[-0.02em] text-[#051A24] md:mt-12 md:text-[48px]">
          {headline.map((word, i) => (
            <span key={i}>
              <span
                className={isInView ? 'word-rise' : 'inline-block opacity-0'}
                style={{
                  animationDelay: `${0.25 + i * 0.09}s`,
                  ...(word.serif ? { fontFamily: SERIF, fontWeight: 400 } : {}),
                }}
              >
                {word.text}
              </span>{' '}
            </span>
          ))}
        </h1>

        <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-[#273C46] md:text-base">
          <p {...fadeUp(isInView, 0.9)}>
            Before this studio I designed at Apple, where I learned that the last five percent of polish is the part
            people remember.
          </p>
          <p {...fadeUp(isInView, 1.0)}>
            V Vortex is small on purpose. You work with me directly, from the first sketch to the shipped product. No
            account managers, no handoffs.
          </p>
          <p {...fadeUp(isInView, 1.1)}>
            Partnerships are a flat <span className="font-medium text-[#051A24]">$25,000/month</span>. Pause or cancel
            whenever you need to.
          </p>
        </div>

        <div {...fadeUp(isInView, 1.2)}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" href={CONTACT_HREF}>
              Start a chat
            </Button>
            <Button variant="secondary" href="#projects">
              View projects
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
