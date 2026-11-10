import { ArrowUpRight } from 'lucide-react';
import { Media } from './MotionArt';
import { fadeUp, useInViewAnimation } from '../hooks/useInViewAnimation';
import { projects, SERIF } from '../data/site';

export default function Projects() {
  const { ref, isInView } = useInViewAnimation<HTMLElement>();

  return (
    <section id="projects" ref={ref} className="scroll-mt-10 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2
            style={fadeUp(isInView, 0.1).style}
            className={`max-w-lg text-[32px] font-medium leading-[1.1] tracking-[-0.02em] text-[#051A24] md:text-[44px] ${fadeUp(isInView, 0.1).className}`}
          >
            Recent work for <span style={{ fontFamily: SERIF, fontWeight: 400 }}>builders</span>.
          </h2>
          <p
            style={fadeUp(isInView, 0.2).style}
            className={`max-w-xs text-sm leading-relaxed text-[#273C46] ${fadeUp(isInView, 0.2).className}`}
          >
            Three launches from the last year, each taken from first sketch to shipped product.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3">
          {projects.map((project, i) => (
            <li key={project.title} {...fadeUp(isInView, 0.3 + i * 0.1)}>
              <a href={project.href} className="group block rounded-3xl">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <Media src={project.media} art={project.art} uid={`pr-${i}`} alt={`${project.title} preview`} />
                  </div>
                  <span className="absolute right-4 top-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-[#051A24] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                  <ul className="absolute bottom-4 left-4 flex gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#051A24] backdrop-blur">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-medium tracking-[-0.01em] text-[#051A24]">{project.title}</h3>
                  <span className="text-sm tabular-nums text-[#273C46]">{project.year}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-[#273C46]">{project.summary}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
