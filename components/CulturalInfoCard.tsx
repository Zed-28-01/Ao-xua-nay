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
} from 'lucide-react';

interface CulturalInfoCardProps {
  historicalInfo: string | null;
  isAppropriate: boolean | null;
  culturalWarning: string | null;
  culturalStars?: number | null;
  decencyExplanation?: string | null;
  isAnalyzing: boolean;
  onReAnalyze: () => void;
  onAutoFixTaboo: () => void;
  hasTabooItems: boolean;
  onOpenCollectorCard?: () => void;
}

export function CulturalInfoCard({
  historicalInfo,
  isAppropriate,
  culturalWarning,
  culturalStars = 5,
  decencyExplanation,
  isAnalyzing,
  onReAnalyze,
  onAutoFixTaboo,
  hasTabooItems,
  onOpenCollectorCard,
}: CulturalInfoCardProps) {
  const [copied, setCopied] = useState(false);

  const starsCount =
    culturalStars !== null && culturalStars !== undefined
      ? culturalStars
      : historicalInfo || decencyExplanation
      ? isAppropriate === false
        ? 2
        : 5
      : null;

  const handleCopy = () => {
    if (!historicalInfo && !decencyExplanation) return;
    const sCount = starsCount ?? 5;
    const starStr = '★'.repeat(sCount) + '☆'.repeat(5 - sCount);
    const textToCopy = `[Áo Xưa Nay - Đánh Giá Văn Hóa & Thuần Phong Mỹ Tục]\nChấm sao: ${starStr} (${sCount}/5 sao)\n\nĐánh giá thuần phong mỹ tục:\n${
      decencyExplanation || (isAppropriate ? 'Phù hợp thuần phong mỹ tục.' : culturalWarning || '')
    }\n\nÝ nghĩa lịch sử:\n${historicalInfo || ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-stone-50/95 border border-stone-200/90 rounded-2xl p-5 shadow-xs transition-all">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-stone-200/70">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#991B1B]" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
            Hàng Rào Văn Hóa & Thẻ Thông Tin (Info Card)
          </h2>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {onOpenCollectorCard && (
            <button
              onClick={onOpenCollectorCard}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-900 bg-gradient-to-r from-amber-100 to-rose-100 hover:from-amber-200 hover:to-rose-200 border border-amber-300/80 rounded-lg transition-all shadow-xs cursor-pointer"
              title="Mở Thẻ Sưu Tập Popmart 3D"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Thẻ Sưu Tập 3D</span>
            </button>
          )}

          {historicalInfo && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors"
              title="Sao chép nội dung thẻ thông tin"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Sao chép thẻ</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={onReAnalyze}
            disabled={isAnalyzing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] disabled:opacity-50 rounded-lg transition-all shadow-xs"
          >
            <Sparkles
              className={`w-3.5 h-3.5 text-amber-300 ${
                isAnalyzing ? 'animate-spin' : ''
              }`}
            />
            <span>{isAnalyzing ? 'Đang phân tích...' : 'Đối chiếu văn hóa'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column: Historical Info Card (Constraint 1) */}
        <div className="md:col-span-7 flex flex-col justify-between bg-white rounded-xl p-4 border border-stone-200/80 shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Ý Nghĩa Lịch Sử (Tối đa 50 từ)
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                Historical Insight
              </span>
            </div>

            {isAnalyzing ? (
              <div className="py-6 flex flex-col items-center justify-center text-stone-400 gap-2">
                <div className="w-6 h-6 border-2 border-stone-300 border-t-[#991B1B] rounded-full animate-spin" />
                <span className="text-xs">Đang tham khảo sử liệu & tạo thẻ...</span>
              </div>
            ) : historicalInfo ? (
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-serif-editorial italic">
                &ldquo;{historicalInfo}&rdquo;
              </p>
            ) : (
              <p className="text-xs text-stone-500 italic py-3">
                Chưa có dữ liệu phân tích. Hãy chọn các món trang phục trên ma-nơ-canh và nhấn &quot;Đối chiếu văn hóa&quot;.
              </p>
            )}
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
            <span>Giọng điệu: Gen Z Stylist & Sử gia</span>
            <span className="text-emerald-700 font-medium">✓ Đã kiểm chứng điển lễ</span>
          </div>
        </div>

        {/* Right Column: Cultural Star Rating & Decency Explanation */}
        <div className="md:col-span-5 flex flex-col justify-between rounded-xl p-4 border transition-all">
          {isAnalyzing ? (
            <div className="h-full flex flex-col items-center justify-center py-6 text-xs text-stone-400 gap-2">
              <div className="flex gap-1 text-amber-400 animate-pulse text-lg">
                ★ ★ ★ ★ ★
              </div>
              <span>Đang chấm sao & rà soát thuần phong mỹ tục...</span>
            </div>
          ) : starsCount === null ? (
            <div className="h-full flex flex-col justify-between rounded-lg p-3.5 border bg-amber-50/50 border-amber-200/70 text-stone-700">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 pb-2 border-b border-amber-900/10">
                  <span className="text-xs font-bold uppercase tracking-wide text-amber-900">
                    🏠 Model Đang Mặc Đồ Ở Nhà
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-serif-editorial">
                  Model hiện chỉ mặc áo ba lỗ trắng và quần short thun xám ở nhà. Hãy mở tủ đồ và tự tay chọn từng món trang phục truyền thống, sau đó nhấn <strong>&quot;Đối chiếu văn hóa&quot;</strong> hoặc <strong>&quot;Sẵn sàng&quot;</strong> để hệ thống chấm sao và giải thích chi tiết mức độ phù hợp với thuần phong mỹ tục!
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-amber-900/10 text-[10px] text-stone-400">
                Thang điểm: 1 đến 5 sao theo điển lễ & quy chuẩn thuần phong mỹ tục
              </div>
            </div>
          ) : (
            <div
              className={`h-full flex flex-col justify-between rounded-lg p-3.5 border ${
                starsCount >= 4
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : starsCount === 3
                  ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                  : 'bg-red-50/80 border-red-200 text-red-950'
              }`}
            >
              <div>
                {/* Cultural Star Rating Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/10">
                  <div className="flex items-center gap-1.5">
                    {starsCount >= 4 ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    <span className="text-xs font-bold uppercase tracking-wide">
                      {starsCount >= 4
                        ? 'Đạt chuẩn văn hóa'
                        : starsCount === 3
                        ? 'Cần chỉnh trang nhã'
                        : 'Chưa hợp thuần phong mỹ tục'}
                    </span>
                  </div>

                  {/* 5-STAR RATING VISUAL DISPLAY */}
                  <div className="flex items-center gap-0.5" title={`Chấm điểm văn hóa: ${starsCount}/5 sao`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-base leading-none ${
                          star <= starsCount
                            ? 'text-amber-500 font-bold drop-shadow-xs'
                            : 'text-stone-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-1 text-[11px] font-black font-mono">
                      {starsCount}/5
                    </span>
                  </div>
                </div>

                {/* EXPLANATION OF WHY IT VIOLATES OR COMPLIES WITH DECENCY (GIẢI THÍCH THUẦN PHONG MỸ TỤC) */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                    Giải thích về thuần phong mỹ tục:
                  </span>
                  <p className="text-xs leading-relaxed font-serif-editorial">
                    {decencyExplanation ||
                      culturalWarning ||
                      'Bộ trang phục phối hợp kín đáo, đoan trang, tôn trọng điển chế lễ nghi và thuần phong mỹ tục truyền thống của người Việt.'}
                  </p>
                </div>
              </div>

              {/* One-click Auto Fix Button if warning or taboo items exist */}
              {hasTabooItems && (
                <div className="mt-3 pt-2.5 border-t border-black/10">
                  <button
                    onClick={onAutoFixTaboo}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-2xs cursor-pointer"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Sửa vi phạm tự động ngay (Lên 5★)</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
