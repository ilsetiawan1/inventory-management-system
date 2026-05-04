'use client';

import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Ya, Lanjutkan',
  cancelLabel = 'Batal',
  onConfirm,
  onCancel,
  isDestructive = true,
  isLoading = false
}: ConfirmDialogProps) {
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        setRender(true);
        // Small delay to allow CSS transition
        requestAnimationFrame(() => {
          setShow(true);
        });
      }, 0);
    } else {
      setTimeout(() => setShow(false), 0);
      timer = setTimeout(() => setRender(false), 300); // match transition duration
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={!isLoading ? onCancel : undefined}
      />
      
      {/* Modal Dialog */}
      <div 
        className={`relative w-full max-w-sm bg-white/90 backdrop-blur-xl border border-white rounded-[28px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-300 ${
          show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        <div className="p-6 pt-8 flex flex-col items-center text-center">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-inner ${
            isDestructive 
              ? 'bg-linear-to-br from-red-100 to-red-50 border border-red-100 text-red-500' 
              : 'bg-linear-to-br from-purple-100 to-purple-50 border border-purple-100 text-purple-600'
          }`}>
            <AlertTriangle size={28} />
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-[13.5px] text-slate-500 leading-relaxed px-2 mb-2">
            {description}
          </p>
        </div>

        {/* Actions (iOS Action Sheet Style) */}
        <div className="flex flex-col border-t border-slate-200/60 bg-slate-50/30">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`w-full py-4 text-[15px] font-bold border-b border-slate-200/60 transition-colors ${
              isDestructive 
                ? 'text-red-500 hover:bg-red-50 active:bg-red-100' 
                : 'text-purple-600 hover:bg-purple-50 active:bg-purple-100'
            } disabled:opacity-50`}
          >
            {isLoading ? 'Memproses...' : confirmLabel}
          </button>
          
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="w-full py-4 text-[15px] font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

