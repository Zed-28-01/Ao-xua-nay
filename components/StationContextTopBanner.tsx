'use client';

import React, { useState } from 'react';
import { HistoricalEra } from '@/data/historical-data';
import { Landmark, Globe2, Briefcase, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface StationContextTopBannerProps {
  currentEra: HistoricalEra;
  eventContext: string;
  onChangeEventContext: (event: string) => void;
}

export const EVENT_PRESETS = [
  'Dạo phố cuối tuần',
  'Dạ tiệc trang trọng',
  'Đi học thường nhật',
  'Lễ hội truyền thống',
  'Lễ chùa / Chốn tôn nghiêm',
  'Trình diễn nghệ thuật',
];

export function StationContextTopBanner({
  currentEra,
  eventContext,
  onChangeEventContext,
}: StationContextTopBannerProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-[#FFFDF9] border border-amber-950/15 rounded-3xl p-4 sm:p-5 shadow-xs mb-4 transition-all">
      {/* Top Header of the Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-900/10">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-[#991B1B] text-amber-100 flex items-center justify-center font-bold text-xs font-serif shadow-2xs">
            {currentEra.stationNumber}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold font-serif-editorial text-stone-900">
                {currentEra.stationTitle}
              </h2>
            </div>
            <p className="text-xs text-amber-900/80 font-medium">
              &ldquo;{currentEra.tagline}&rdquo;
            </p>
          </div>
        </div>

        {/* Event selector & Toggle expand */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <select
            value={eventContext}
            onChange={(e) => onChangeEventContext(e.target.value)}
            className="text-xs font-medium bg-amber-50/70 border border-amber-900/15 rounded-xl px-3 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#991B1B]"
          >
            {EVENT_PRESETS.map((opt) => (
              <option key={opt} value={opt}>
                Bối cảnh: {opt}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
            title={isExpanded ? 'Thu gọn bối cảnh' : 'Mở rộng bối cảnh'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3 Pillars of Historical Context (Mệnh lệnh chính trị, Giao thoa văn hóa, Điều kiện kinh tế & Lối sống) */}
      {isExpanded && (
        <div className="pt-3.5 grid grid-cols-1 md:grid-cols-3 gap-3.5 animate-in fade-in duration-200 text-xs">
          {/* Pillar 1: Mệnh lệnh chính trị & Ý chí dân tộc */}
          <div className="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-200/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-rose-900 mb-1.5">
                <Landmark className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Mệnh lệnh chính trị & Ý chí dân tộc</span>
              </div>
              <p className="text-stone-700 leading-relaxed text-[11px] sm:text-xs">
                {currentEra.politicalWill}
              </p>
            </div>
          </div>

          {/* Pillar 2: Giao thoa văn hóa */}
          <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1.5">
                <Globe2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Giao thoa văn hóa</span>
              </div>
              <p className="text-stone-700 leading-relaxed text-[11px] sm:text-xs">
                {currentEra.culturalExchange}
              </p>
            </div>
          </div>

          {/* Pillar 3: Điều kiện kinh tế và Lối sống */}
          <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-200/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Điều kiện kinh tế & Lối sống</span>
              </div>
              <p className="text-stone-700 leading-relaxed text-[11px] sm:text-xs">
                {currentEra.economicAndLifestyle}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
