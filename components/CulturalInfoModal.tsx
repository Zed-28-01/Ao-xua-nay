'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Copy,
  Check,
  Wrench,
  BookOpen,
  X,
  Award,
} from 'lucide-react';

interface CulturalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  historicalInfo: string | null;
  isAppropriate: boolean | null;
  culturalWarning: string | null;
  culturalStars?: number | null;
  decencyExplanation?: string | null;
  isAnalyzing: boolean;
  onReAnalyze: () => void;
  onAutoFixTaboo: () => void;
  hasTabooItems: boolean;
  eventContext: string;
  eraName: string;
  itemNames: string[];
}

export function CulturalInfoModal({
  isOpen,
  onClose,
  historicalInfo,
  isAppropriate,
  culturalWarning,
  culturalStars = 5,
  decencyExplanation,
  isAnalyzing,
  onReAnalyze,
  onAutoFixTaboo,
  hasTabooItems,
  eventContext,
  eraName,
  itemNames,
}: CulturalInfoModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const starsCount = culturalStars ?? (isAppropriate === false ? 2 : 5);

  const handleCopy = () => {
    if (!historicalInfo) return;
    const textToCopy = `[Áo Xưa Nay - Thẻ Thông Tin Phục Trang]\nThời kỳ: ${eraName}\nBối cảnh: ${eventContext}\nTrang phục: ${itemNames.join(
      ', '
    )}\n\nÝ nghĩa lịch sử:\n${historicalInfo}\n${
      culturalWarning ? `\nCảnh báo văn hóa:\n${culturalWarning}` : '\nTrạng thái: Hợp chuẩn văn hóa'
    }`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FFFDF9] border border-amber-900/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#991B1B] via-[#7F1D1D] to-[#991B1B] text-amber-50 p-4 sm:p-5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif-editorial tracking-wide">
                Đánh Giá Văn Hóa & Thẻ Thông Tin
              </h2>
              <p className="text-xs text-amber-200/80">
                {eraName} · {eventContext}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Status Banner */}
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
              isAppropriate === false
                ? 'bg-red-50/80 border-red-300 text-red-950'
                : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
            }`}
          >
            {isAppropriate === false ? (
              <ShieldAlert className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">
                  {isAppropriate === false
                    ? 'Cảnh Báo Cấm Kỵ Điển Chế Văn Hóa'
                    : 'Hợp Chuẩn & Tôn Trọng Văn Hóa Dân Tộc'}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                    isAppropriate === false
                      ? 'bg-red-200/80 text-red-800'
                      : 'bg-emerald-200/80 text-emerald-800'
                  }`}
                >
                  {isAppropriate === false ? 'Cần Chỉnh Sửa' : 'Đạt Chuẩn'}
                </span>
              </div>

              {isAppropriate === false ? (
                <div className="mt-2 space-y-3">
                  <p className="text-xs leading-relaxed text-red-900">
                    {culturalWarning ||
                      'Phát hiện sự kết hợp vi phạm cấm kỵ điển chế hoặc bối cảnh không phù hợp thuần phong mỹ tục.'}
                  </p>
                  {hasTabooItems && (
                    <button
                      onClick={() => {
                        onAutoFixTaboo();
                        onClose();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-xs transition-colors"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Sửa vi phạm tự động ngay</span>
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-xs leading-relaxed text-emerald-900 mt-1">
                  Trang phục phối hợp hài hòa giữa cấu trúc truyền thống và phong cách đương đại, giữ trọn vẻ đẹp kín đáo và tinh thần văn hóa.
                </p>
              )}
            </div>
          </div>

          {/* Historical Info Card (Spec Constraint 1) */}
          <div className="bg-stone-50/90 rounded-2xl p-5 border border-amber-900/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#991B1B]" />
                Ý Nghĩa Lịch Sử & Thẻ Thông Tin (Dưới 50 từ)
              </span>
              <span className="text-[11px] font-mono text-stone-400">Gen Z Stylist Insight</span>
            </div>

            {isAnalyzing ? (
              <div className="py-6 flex flex-col items-center justify-center text-stone-400 gap-2">
                <div className="w-6 h-6 border-2 border-stone-300 border-t-[#991B1B] rounded-full animate-spin" />
                <span className="text-xs">Đang đối chiếu sử liệu và sinh thẻ...</span>
              </div>
            ) : historicalInfo ? (
              <p className="text-sm text-stone-800 leading-relaxed font-serif-editorial italic bg-white p-4 rounded-xl border border-stone-200/60 shadow-2xs">
                &ldquo;{historicalInfo}&rdquo;
              </p>
            ) : (
              <p className="text-xs text-stone-500 italic py-2">
                Chưa có nội dung thẻ. Hãy chọn món đồ và bấm &quot;Đánh giá lại&quot;.
              </p>
            )}
          </div>

          {/* Selected Items summary */}
          <div className="text-xs text-stone-600 space-y-1">
            <span className="font-semibold text-stone-800">Các món đang phối:</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {itemNames.map((name, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-stone-100 rounded-md border border-stone-200 text-stone-700 text-[11px]"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100/80 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl transition-colors shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Đã sao chép thẻ!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>Sao chép thẻ thông tin</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onReAnalyze}
              disabled={isAnalyzing}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] disabled:opacity-50 rounded-xl transition-all shadow-xs"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Đang phân tích...' : 'Đánh giá lại'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
