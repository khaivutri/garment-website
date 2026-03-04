'use client';

import { ReactNode } from 'react';
import { cn } from '@/utils';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

export default function Card({
    children,
    className,
    hover = false,
    padding = 'md',
    onClick,
}: CardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                'card',
                paddingClasses[padding],
                hover && 'cursor-pointer',
                onClick && 'cursor-pointer',
                className
            )}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    title: string;
    subtitle?: string;
    action?: ReactNode;
    className?: string;
}

export function CardHeader({ title, subtitle, action, className }: CardHeaderProps) {
    return (
        <div className={cn('flex items-start justify-between mb-5', className)}>
            <div>
                <h3 className="font-display text-xl font-semibold text-[#1a1a2e]">{title}</h3>
                {subtitle && <p className="text-sm text-[#8a8a9a] mt-0.5">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
