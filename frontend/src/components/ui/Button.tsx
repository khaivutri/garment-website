'use client';

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/utils';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'dark' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
    primary: 'btn btn-primary text-[#1a1a2e]',
    dark: 'btn btn-dark text-white',
    outline: 'btn btn-outline',
    ghost: 'btn btn-ghost',
    danger: 'btn bg-red-500 text-white hover:-translate-y-0.5 hover:bg-red-600 transition-all',
};

const sizeClasses: Record<Size, string> = {
    sm: '!py-2 !px-4 !text-xs !rounded-lg',
    md: '',
    lg: '!py-3.5 !px-8 !text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            className,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    variantClasses[variant],
                    sizeClasses[size],
                    (disabled || isLoading) && 'opacity-60 cursor-not-allowed !transform-none',
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    leftIcon && <span>{leftIcon}</span>
                )}
                {children}
                {!isLoading && rightIcon && <span>{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';
export default Button;
