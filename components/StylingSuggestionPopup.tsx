'use client';

import React from 'react';
import { HistoricalEra } from '@/data/historical-data';
import {
  Sparkles,
  Shirt,
  ShieldAlert,
  ArrowRight,
  Layers,
  Award,
} from 'lucide-react';

interface StylingSuggestionPopupProps {
  currentEra: HistoricalEra;
  onApplyFormula: () => void;
  onOpenEvaluation: () => void;
  onOpenChat?: () => void;
}

export function StylingSuggestionPopup({
  currentEra,
  onApplyFormula,
  onOpenEvaluation,
}: StylingSuggestionPopupProps) {
  const suggestion = currentEra.stylingSuggestion;

  return (
    <div className="bg-[#FFFDF9] border border-amber-950/15 rounded-3xl p-4 sm:p-5 shadow-lg flex flex-col justify-between h-full min-h-[580px] sm:min-h-[640px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-900/10 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 font-serif-editorial">
              Gợi Ý Phối Đồ Lịch Sử
            </h3>
          </div>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full">
            Trạm {currentEra.stationNumber}
          </span>
        </div>

        {/* Suggestion Card */}
        <div className="space-y-3.5">
          {/* Title & Badge */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-50 via-amber-50 to-white border border-rose-200/70 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{suggestion.title}</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed font-serif-editorial italic">
              {suggestion.description}
            </p>
          </div>

          {/* Formula */}
          <div className="p-3.5 bg-stone-50/80 rounded-2xl border border-stone-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-700 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#991B1B]" />
              <span>Công thức phối đồ:</span>
            </div>
            <p className="text-xs font-medium text-stone-900 leading-relaxed bg-white p-2.5 rounded-xl border border-stone-200/60 shadow-2xs">
              {suggestion.formula}
            </p>
          </div>

          {/* Cultural Notice / Guardrail */}
          <div className="p-3 bg-red-50/70 rounded-2xl border border-red-200/70 text-[11px] text-red-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-red-800">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span>Lưu ý Hàng rào văn hóa:</span>
            </div>
            <p className="leading-relaxed text-red-900/90">
              {suggestion.culturalNotice}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-amber-900/10 space-y-2 mt-4">
        {/* Apply Suggestion Button */}
        <button
          onClick={onApplyFormula}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#991B1B] to-[#BE123C] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>🔍 Tự chọn từng món theo gợi ý</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Check Guardrails CTA */}
        <button
          onClick={onOpenEvaluation}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
        >
          <Award className="w-3.5 h-3.5 text-amber-300" />
          <span>Đánh giá & Chấm điểm văn hóa</span>
        </button>
      </div>
    </div>
  );
}
