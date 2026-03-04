'use client';

import { useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/utils';
import { ToastType } from '@/hooks/useToast';

interface ToastItem {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContainerProps {
    toasts: ToastItem[];
    dismiss: (id: string) => void;
}

const iconMap: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />,
    error: <AlertCircle size={18} className="text-red-500 flex-shrink-0" />,
    info: <Info size={18} className="text-blue-500 flex-shrink-0" />,
};

const styleMap: Record<ToastType, string> = {
    success: 'bg-white border-l-4 border-green-500 text-[#2d2d2d]',
    error: 'bg-white border-l-4 border-red-500 text-[#2d2d2d]',
    info: 'bg-white border-l-4 border-blue-500 text-[#2d2d2d]',
};

function ToastItem({ id, message, type, dismiss }: ToastItem & { dismiss: (id: string) => void }) {
    useEffect(() => {
        const timer = setTimeout(() => dismiss(id), 4000);
        return () => clearTimeout(timer);
    }, [id, dismiss]);

    return (
        <div
            className={cn(
                'flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-xl min-w-[280px] max-w-sm animate-slide-in-right',
                styleMap[type]
            )}
            role="alert"
        >
            {iconMap[type]}
            <p className="text-sm font-medium flex-1">{message}</p>
            <button
                onClick={() => dismiss(id)}
                className="text-[#8a8a9a] hover:text-[#2d2d2d] transition-colors ml-1"
                aria-label="Đóng thông báo"
            >
                <X size={16} />
            </button>
        </div>
    );
}

export default function ToastContainer({ toasts, dismiss }: ToastContainerProps) {
    if (!toasts.length) return null;

    return (
        <div
            aria-live="polite"
            className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3"
        >
            {toasts.map((toast) => (
                <ToastItem key={toast.id} {...toast} dismiss={dismiss} />
            ))}
        </div>
    );
}
