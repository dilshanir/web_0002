import { fadeUp, useInViewAnimation } from '../hooks/useInViewAnimation';
import { CONTACT_HREF, SERIF } from '../data/site';

const columns = [
  {
    title: 'Studio',
    links: [
      { label: 'Projects', href: '#projects' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Start a chat', href: CONTACT_HREF },
    ],
  },
  {
    title: 'Elsewhere',
    // replace "#" with the studio's real profiles
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Dribbble', href: '#' },
    ],
  },
];

export default function Footer() {
  const { ref, isInView } = useInViewAnimation<HTMLElement>();
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="px-6 pb-32 pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div {...fadeUp(isInView, 0.1)}>
            <p className="text-[56px] leading-none text-[#051A24] md:text-[96px]" style={{ fontFamily: SERIF }}>
              V Vortex
            </p>
            <p className="mt-3 font-mono text-xs text-[#273C46] md:text-sm">The creative studio of Sarah Vortex</p>
          </div>

          <nav aria-label="Footer" className="flex gap-16">
            {columns.map((column, i) => (
              <div key={column.title} {...fadeUp(isInView, 0.2 + i * 0.1)}>
                <h2 className="text-sm text-[#273C46]">{column.title}</h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group relative text-base font-medium text-[#051A24]"
                      >
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#051A24] transition-transform duration-300 group-hover:scale-x-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div
          style={fadeUp(isInView, 0.4).style}
          className={`mt-16 flex flex-col justify-between gap-2 border-t border-[#E0EBF0] pt-6 text-sm text-[#273C46] md:flex-row ${fadeUp(isInView, 0.4).className}`}
        >
          <p>&copy; {year} V Vortex. All rights reserved.</p>
          <p>Designed and built by Dilshani Rathnayake</p>
        </div>
      </div>
    </footer>
  );
}
