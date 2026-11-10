import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';

type ButtonProps = {
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
};

const base =
  'btn-sheen inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-medium text-sm transition-colors whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary: 'bg-[#051A24] text-white hover:bg-[#0D212C] btn-primary-shadow',
  secondary: 'bg-white text-[#051A24] hover:bg-[#F6FCFF] btn-secondary-shadow',
  tertiary: 'bg-white text-[#051A24] hover:bg-[#F6FCFF] btn-tertiary-shadow',
};

export default function Button({
  variant = 'primary',
  href,
  onClick,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}
