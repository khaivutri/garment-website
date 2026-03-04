'use client';

import { cn } from '@/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'gold' | 'dark' | 'success' | 'danger' | 'neutral';
    className?: string;
}

const variantClasses = {
    gold: 'bg-[#c9a84c]/10 text-[#996f1c] border border-[#c9a84c]/30',
    dark: 'bg-[#1a1a2e] text-white',
    success: 'bg-green-50 text-green-700 border border-green-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    neutral: 'bg-[#f0ebe4] text-[#5a5a6a]',
};

export default function Badge({ children, variant = 'neutral', className }: BadgeProps) {
    return (
        <span className={cn('badge', variantClasses[variant], className)}>
            {children}
        </span>
    );
}
