'use client';

import React from 'react';
import { HISTORICAL_ERAS, HistoricalEra } from '@/data/historical-data';
import { Calendar, MapPin, Sparkles, Compass } from 'lucide-react';

interface CulturalContextBarProps {
  selectedEra: HistoricalEra;
  onSelectEra: (era: HistoricalEra) => void;
  eventContext: string;
  onChangeEventContext: (event: string) => void;
  selectedStyle: string;
  onChangeStyle: (style: string) => void;
}

export const EVENT_OPTIONS = [
  'Dạo phố cuối tuần',
  'Dạ tiệc trang trọng',
  'Đi học thường nhật',
  'Lễ cưới truyền thống',
  'Lễ chùa / Chốn tôn nghiêm',
  'Triển lãm nghệ thuật',
];

export const STYLE_OPTIONS = [
  'Streetwear',
  'Casual Chic',
  'Unisex Classic',
  'Smart Casual',
  'Avant-Garde',
];

export function CulturalContextBar({
  selectedEra,
  onSelectEra,
  eventContext,
  onChangeEventContext,
  selectedStyle,
  onChangeStyle,
}: CulturalContextBarProps) {
  return (
    <div className="bg-stone-50/90 border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-xs mb-6">
      {/* Top Header: Section Lead */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3.5 border-b border-stone-200/70">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#991B1B]" />
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Trạm Văn Hóa & Bối Cảnh Phối Đồ
          </span>
          <span className="text-stone-300">·</span>
          <span className="text-xs font-semibold text-stone-800">
            {selectedEra.name} ({selectedEra.century})
          </span>
        </div>

        <div className="text-xs text-stone-500 italic max-w-xl truncate">
          &ldquo;{selectedEra.tagline}&rdquo;
        </div>
      </div>

      {/* Grid of Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-3.5 items-end">
        {/* Selector 1: 4 Key Eras */}
        <div className="md:col-span-5 flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#991B1B]" />
            Thời kỳ lịch sử
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {HISTORICAL_ERAS.map((era) => {
              const isSelected = era.id === selectedEra.id;
              return (
                <button
                  key={era.id}
                  onClick={() => onSelectEra(era)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg text-left transition-all ${
                    isSelected
                      ? 'bg-[#991B1B] text-white shadow-xs font-semibold'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80'
                  }`}
                >
                  <div className="truncate">{era.name}</div>
                  <div
                    className={`text-[10px] truncate ${
                      isSelected ? 'text-amber-100/90' : 'text-stone-400'
                    }`}
                  >
                    {era.period}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selector 2: Event Context */}
        <div className="md:col-span-4 flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-stone-500" />
            Bối cảnh sự kiện
          </label>
          <select
            value={eventContext}
            onChange={(e) => onChangeEventContext(e.target.value)}
            className="w-full text-xs font-medium bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#991B1B] transition-colors"
          >
            {EVENT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Selector 3: Style Direction */}
        <div className="md:col-span-3 flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Phong cách cá nhân
          </label>
          <select
            value={selectedStyle}
            onChange={(e) => onChangeStyle(e.target.value)}
            className="w-full text-xs font-medium bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#991B1B] transition-colors"
          >
            {STYLE_OPTIONS.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
