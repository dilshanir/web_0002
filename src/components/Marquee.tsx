import { Media } from './MotionArt';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { marqueeMedia } from '../data/site';

const ratios = ['aspect-[4/5]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[5/6]', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]'];

export default function Marquee() {
  const { ref, isInView } = useInViewAnimation();
  // duplicated once so the -50% translate loops seamlessly
  const items = [...marqueeMedia, ...marqueeMedia];

  return (
    <section
      ref={ref}
      aria-label="Selected work in motion"
      className={`relative mb-16 mt-16 w-full overflow-hidden md:mt-20 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: '0.2s' }}
    >
      <div className="animate-marquee flex w-max py-6">
        {items.map((src, i) => (
          <div
            key={i}
            aria-hidden={i >= marqueeMedia.length}
            className={`mx-3 h-[280px] shrink-0 overflow-hidden rounded-2xl object-cover shadow-lg md:h-[500px] ${ratios[i % ratios.length]}`}
          >
            <Media src={src} art={i % marqueeMedia.length} uid={`mq-${i}`} alt="V Vortex project preview" />
          </div>
        ))}
      </div>
    </section>
  );
}
