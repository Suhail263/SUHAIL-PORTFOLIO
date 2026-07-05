import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'glass';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 will-change-transform';

const variants: Record<Variant, string> = {
  primary: 'bg-[var(--color-accent)] text-white hover:scale-[1.03] active:scale-[0.98]',
  ghost: 'text-[var(--color-text)] border border-[var(--glass-border)] hover:border-white/20 hover:scale-[1.03] active:scale-[0.98]',
  glass: 'glass text-[var(--color-text)] hover:scale-[1.03] active:scale-[0.98]',
};

interface CommonProps {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & { as?: 'button' };

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & { as: 'a' };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button(props: ButtonProps) {
  const { variant = 'primary', icon, children, className = '' } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if (props.as === 'a') {
    const { as: _as, variant: _v, icon: _i, children: _c, className: _cl, ...anchorRest } = props;
    void _as; void _v; void _i; void _c; void _cl;
    return (
      <a className={classes} {...anchorRest}>
        {icon}
        {children}
      </a>
    );
  }

  const { as: _as, variant: _v, icon: _i, children: _c, className: _cl, ...buttonRest } = props;
  void _as; void _v; void _i; void _c; void _cl;
  return (
    <button className={classes} {...buttonRest}>
      {icon}
      {children}
    </button>
  );
}
