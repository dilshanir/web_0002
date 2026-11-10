import Button from './Button';
import { CONTACT_HREF, SERIF } from '../data/site';

export default function FloatingNav() {
  return (
    <nav
      aria-label="Primary"
      className="nav-in fixed bottom-5 left-1/2 z-50 flex items-center gap-1 rounded-full bg-white/80 p-1.5 shadow-[0_0_0_1px_rgba(5,26,36,0.06),0_12px_40px_rgba(5,26,36,0.18)] backdrop-blur-xl"
    >
      <a
        href="#top"
        aria-label="V Vortex, back to top"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0EBF0] text-2xl leading-none text-[#051A24] transition-transform duration-500 hover:rotate-[360deg]"
        style={{ fontFamily: SERIF }}
      >
        V
      </a>
      <a
        href="#projects"
        className="hidden rounded-full px-4 py-3 text-sm font-medium text-[#051A24] transition-colors hover:bg-[#E0EBF0] sm:block"
      >
        Projects
      </a>
      <a
        href="#pricing"
        className="hidden rounded-full px-4 py-3 text-sm font-medium text-[#051A24] transition-colors hover:bg-[#E0EBF0] sm:block"
      >
        Pricing
      </a>
      <Button variant="primary" href={CONTACT_HREF} className="ml-1">
        Start a chat
      </Button>
    </nav>
  );
}
