'use client';

import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, leftIcon, rightIcon, hint, className, id, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="text-sm font-semibold text-[#2d2d2d]"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8a9a]">
                            {leftIcon}
                        </span>
                    )}
                    <input
                        ref={ref}
                        id={id}
                        className={cn(
                            'input-base',
                            leftIcon && '!pl-10',
                            rightIcon && '!pr-10',
                            error && '!border-red-400 focus:!border-red-500 focus:!shadow-[0_0_0_3px_rgba(239,68,68,0.15)]',
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a8a9a]">
                            {rightIcon}
                        </span>
                    )}
                </div>
                {error && (
                    <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                        <span>⚠</span> {error}
                    </p>
                )}
                {hint && !error && (
                    <p className="text-[#8a8a9a] text-xs">{hint}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
export default Input;
