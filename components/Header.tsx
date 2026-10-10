'use client';

import React from 'react';
import { BookOpen, Shirt, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'studio' | 'matrix' | 'about';
  setActiveTab: (tab: 'studio' | 'matrix' | 'about') => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-[#991B1B] text-amber-100 flex items-center justify-center font-serif text-lg font-bold shadow-sm">
            Á
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-stone-900 leading-none">
              Áo Xưa Nay
            </span>
            <span className="text-[10px] tracking-wider uppercase text-stone-500 font-medium mt-0.5">
              Việt Phục & Hàng Rào Văn Hóa Gen Z
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-3 sm:gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
              activeTab === 'studio'
                ? 'text-[#991B1B] font-semibold border-b-2 border-[#991B1B]'
                : 'hover:text-stone-900'
            }`}
          >
            <Shirt className="w-4 h-4" />
            <span>Studio Phối Đồ</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
              activeTab === 'matrix'
                ? 'text-[#991B1B] font-semibold border-b-2 border-[#991B1B]'
                : 'hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kiến Thức Lịch Sử</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`hidden sm:flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
              activeTab === 'about'
                ? 'text-[#991B1B] font-semibold border-b-2 border-[#991B1B]'
                : 'hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Quy Chuẩn Văn Hóa</span>
          </button>
        </nav>

        {/* Zone 3: Fast Switch Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab(activeTab === 'matrix' ? 'studio' : 'matrix')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-stone-50 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            {activeTab === 'matrix' ? (
              <>
                <Shirt className="w-3.5 h-3.5 text-amber-300" />
                <span>Vào Studio</span>
              </>
            ) : (
              <>
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>Kiến Thức Lịch Sử</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
