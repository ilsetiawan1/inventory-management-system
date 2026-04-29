'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';

interface BarangImageUploadProps {
  initialPreview: string | null;
  onImageSelect: (file: File | null, previewUrl: string | null) => void;
  disabled?: boolean;
}

export function BarangImageUpload({ initialPreview, onImageSelect, disabled }: BarangImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialPreview);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Harap unggah file gambar (JPG, PNG, WEBP)');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran gambar maksimal 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setPreview(url);
      onImageSelect(file, url);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    if (disabled) return;
    setPreview(null);
    onImageSelect(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input 
        type="file" 
        accept="image/jpeg, image/png, image/webp"
        className="hidden" 
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
          }
        }}
        disabled={disabled}
      />

      {preview ? (
        <div className="relative group w-full aspect-square rounded-[24px] overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-sm">
            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled}
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-200 active:scale-90"
            >
              <Trash2Icon />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => !disabled && fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`w-full aspect-square rounded-[24px] flex flex-col items-center justify-center gap-3 border-2 border-dashed transition-all cursor-pointer ${
            disabled ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-200' :
            isDragging 
              ? 'border-purple-500 bg-purple-50/50 scale-[0.98]' 
              : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
          }`}
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${isDragging ? 'bg-purple-100 text-purple-600' : 'bg-white shadow-sm text-slate-400 border border-slate-100'}`}>
            <UploadCloud size={24} />
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <span className="text-[13px] font-semibold text-slate-700">Klik atau seret foto</span>
            <span className="text-[11px] text-slate-400 mt-1">PNG, JPG (Maks. 2MB)</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Trash2Icon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18"></path>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );
}
