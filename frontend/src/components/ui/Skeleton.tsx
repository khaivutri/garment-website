'use client';

import { cn } from '@/utils';

interface SkeletonProps {
    className?: string;
    lines?: number;
}

export function Skeleton({ className }: SkeletonProps) {
    return <div className={cn('skeleton', className)} />;
}

export function ProductCardSkeleton() {
    return (
        <div className="card overflow-hidden">
            <div className="skeleton aspect-[3/4] w-full" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-10 w-full mt-2" />
            </div>
        </div>
    );
}

export function ProductDetailSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-5">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-7 w-1/4" />
                <div className="space-y-2 pt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                </div>
                <Skeleton className="h-12 w-full mt-6" />
            </div>
        </div>
    );
}

export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
    return (
        <tr>
            {Array.from({ length: cols }).map((_, i) => (
                <td key={i} className="px-4 py-3">
                    <Skeleton className="h-4 w-full" />
                </td>
            ))}
        </tr>
    );
}
