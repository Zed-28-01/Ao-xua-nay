'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Copy,
  Check,
  Download,
  Share2,
  X,
  Award,
  Crown,
  Heart,
  Palette,
  Layers,
  Wrench,
  ExternalLink,
} from 'lucide-react';
import { HistoricalEra, WardrobeItem } from '@/data/historical-data';

interface HeritageCollectorCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  era: HistoricalEra;
  eventContext: string;
  selectedItems: WardrobeItem[];
  historicalInfo: string | null;
  isAppropriate: boolean | null;
  culturalWarning: string | null;
  culturalStars?: number | null;
  decencyExplanation?: string | null;
  onAutoFixTaboo?: () => void;
  hasTabooItems?: boolean;
}

export function HeritageCollectorCardModal({
  isOpen,
  onClose,
  era,
  eventContext,
  selectedItems,
  historicalInfo,
  isAppropriate,
  culturalWarning,
  culturalStars = 5,
  decencyExplanation,
  onAutoFixTaboo,
  hasTabooItems,
}: HeritageCollectorCardModalProps) {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const starsCount = culturalStars ?? (isAppropriate === false ? 2 : 5);

  const cardSerial = `VN-POPMART-${era.stationNumber}-${Math.abs(
    selectedItems.reduce((acc, i) => acc + i.name.charCodeAt(0), 108)
  )
    .toString()
    .padStart(4, '0')}`;

  const handleCopyCard = () => {
    const text = `🎴 [ÁO XƯA NAY · THẺ SƯU TẬP DI SẢN POPMART 3D]
🌸 Phiên bản: Búp Bê Popmart Áo Dài Lụa Hồng (Pink Silk Ao Dai Edition)
🏛️ Mốc thời kỳ: ${era.stationTitle} (${era.period})
🏷️ Bối cảnh sự kiện: ${eventContext}
✨ Mã thẻ: ${cardSerial}
🛡️ Thẩm định văn hóa: ${
      isAppropriate
        ? '✓ ĐẠT CHUẨN VĂN HÓA DI SẢN'
        : '⚠️ PHÁT HIỆN CẢNH BÁO CẤM KỴ'
    }
📜 Ý nghĩa lịch sử: "${historicalInfo || 'Trang phục Việt truyền thống kết hợp phong cách Chibi 3D hiện đại.'}"
${culturalWarning ? `⚠️ Cảnh báo stylist: ${culturalWarning}\n` : ''}
👘 Phục trang gồm: ${selectedItems.map((i) => i.name).join(', ')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCard = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-stone-900/95 border-2 border-amber-300/60 rounded-3xl p-4 sm:p-6 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-stone-100 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-800/80 hover:bg-stone-700 border border-stone-600 flex items-center justify-center text-stone-300 hover:text-white transition-all z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Badge */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 border border-amber-300/40 text-[11px] font-bold uppercase tracking-widest text-amber-300 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Thẻ Sưu Tập Blind-Box Di Sản 3D · Collector Card</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-serif-editorial text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-amber-100">
            Búp Bê Popmart Áo Dài Lụa Hồng
          </h2>
          <p className="text-xs text-rose-200/70 font-sans mt-0.5">
            Phiên bản truyền thống · Tỷ lệ Chibi 1:2.8 · Tơ tằm rủ mềm tự nhiên
          </p>
        </div>

        {/* Physical Trading Card Layout */}
        <div className="relative bg-gradient-to-b from-[#2a1725] via-[#1c1427] to-[#12121b] border-2 border-amber-400/50 rounded-2xl p-4 sm:p-5 shadow-2xl overflow-hidden">
          {/* Holographic foil highlight watermark */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-rose-500/15 via-amber-500/10 to-transparent blur-2xl pointer-events-none" />

          {/* Card Top Info Header */}
          <div className="flex items-center justify-between pb-3 border-b border-rose-300/20 mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 text-white font-bold text-xs flex items-center justify-center font-serif shadow-sm">
                {era.stationNumber}
              </span>
              <div>
                <span className="text-xs font-bold text-rose-100 block leading-tight font-serif">
                  {era.stationTitle}
                </span>
                <span className="text-[10px] text-amber-200/70 block">
                  Bối cảnh: {eventContext}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/40 text-[10px] font-mono font-bold text-amber-300">
                {cardSerial}
              </span>
              <div className="text-[9px] text-stone-400 uppercase tracking-widest mt-0.5">
                LIMITED EDITION #01
              </div>
            </div>
          </div>

          {/* Card Center: Visual Showcase + Guardrail Status */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Visual Box: Popmart Doll Pink Silk Ao Dai Rendering */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center bg-gradient-to-b from-stone-800/90 to-stone-900/90 rounded-2xl p-3 border border-rose-400/30 relative overflow-hidden group">
              {/* Backglow aura */}
              <div className="absolute inset-0 bg-radial from-rose-400/20 via-pink-500/10 to-transparent pointer-events-none" />

              {/* Doll SVG Model in Pink Silk Ao Dai Style */}
              <div className="relative w-44 h-56 flex items-center justify-center">
                <svg
                  className="w-full h-full drop-shadow-[0_8px_16px_rgba(244,114,182,0.3)]"
                  viewBox="0 0 200 260"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Floating aura circle */}
                  <circle
                    cx="100"
                    cy="130"
                    r="85"
                    fill="url(#cardAura)"
                    opacity="0.4"
                  />

                  {/* Back flowing hair (dark chestnut with warm sheen) */}
                  <path
                    d="M65 75 C45 105 45 160 55 190 C62 165 70 120 75 95 Z"
                    fill="#3E2723"
                  />
                  <path
                    d="M135 75 C155 105 155 160 145 190 C138 165 130 120 125 95 Z"
                    fill="#3E2723"
                  />

                  {/* Slender legs with white silk trousers */}
                  <path
                    d="M86 160 L84 225 L88 240 L96 240 L98 220 L94 160 Z"
                    fill="#FAF5FF"
                  />
                  <path
                    d="M106 160 L104 220 L106 240 L114 240 L118 225 L114 160 Z"
                    fill="#F3E8FF"
                  />
                  {/* Pink embroidered slippers */}
                  <ellipse cx="91" cy="241" rx="7" ry="3.5" fill="#F472B6" />
                  <ellipse cx="111" cy="241" rx="7" ry="3.5" fill="#F472B6" />
                  <circle cx="91" cy="241" r="1.5" fill="#FEF08A" />
                  <circle cx="111" cy="241" r="1.5" fill="#FEF08A" />

                  {/* Flowing Pink Silk Ao Dai Body (Tà áo lụa hồng rủ mềm tự nhiên) */}
                  {/* Tà sau */}
                  <path
                    d="M80 115 L70 215 C85 222 115 222 130 215 L120 115 Z"
                    fill="#F472B6"
                    opacity="0.9"
                  />
                  {/* Tà trước lụa hồng với đường lượn sóng mềm mại */}
                  <path
                    d="M82 110 C75 145 74 185 76 218 C90 224 110 224 124 218 C126 185 125 145 118 110 Z"
                    fill="#FB7185"
                  />
                  {/* Nếp gấp rủ tơ tằm mềm mại */}
                  <path
                    d="M88 120 Q84 170 86 215"
                    stroke="#FDA4AF"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  <path
                    d="M112 120 Q116 170 114 215"
                    stroke="#FDA4AF"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  <path
                    d="M100 125 Q99 175 100 216"
                    stroke="#FFE4E6"
                    strokeWidth="1"
                    strokeLinecap="round"
                    opacity="0.9"
                  />

                  {/* Thêu hoa sen & mây vàng kim tuyến trên tà áo */}
                  <circle cx="100" cy="185" r="7" fill="#FBBF24" opacity="0.9" />
                  <path
                    d="M96 182 Q100 174 104 182 Q100 190 96 182 Z"
                    fill="#F59E0B"
                  />
                  <circle cx="100" cy="183" r="2.5" fill="#BE185D" />
                  {/* Họa tiết mây lành */}
                  <path
                    d="M88 195 Q94 191 100 195 T112 195"
                    stroke="#FCD34D"
                    strokeWidth="1"
                    fill="none"
                  />

                  {/* Tay áo lụa hồng buông nhẹ */}
                  <path
                    d="M82 108 L62 145 L68 150 L86 120 Z"
                    fill="#FB7185"
                  />
                  <path
                    d="M118 108 L138 145 L132 150 L114 120 Z"
                    fill="#FB7185"
                  />
                  {/* Bàn tay tròn chibi */}
                  <circle cx="65" cy="148" r="3.5" fill="#FFE4E6" />
                  <circle cx="135" cy="148" r="3.5" fill="#FFE4E6" />

                  {/* Cổ áo truyền thống & Nút bọc ngọc */}
                  <path
                    d="M93 96 L107 96 L105 110 L95 110 Z"
                    fill="#E11D48"
                  />
                  <circle cx="103" cy="103" r="1.5" fill="#FEF08A" />

                  {/* Vòng kiềng cổ truyền hoặc chuỗi ngọc */}
                  <path
                    d="M92 106 Q100 114 108 106"
                    stroke="#FDE047"
                    strokeWidth="1.5"
                    fill="none"
                  />

                  {/* ĐẦU CHIBI POPMART (Má bánh bao bầu bĩnh) */}
                  <ellipse cx="100" cy="68" rx="27" ry="24" fill="#FFF1F2" />
                  {/* Má hồng bánh bao ửng đào */}
                  <circle cx="83" cy="74" r="6" fill="#FDA4AF" opacity="0.6" />
                  <circle cx="117" cy="74" r="6" fill="#FDA4AF" opacity="0.6" />

                  {/* Mắt ngọc thủy tinh to tròn lấp lánh (Popmart signature) */}
                  {/* Mắt trái */}
                  <ellipse cx="86" cy="65" rx="4.5" ry="6" fill="#2E1065" />
                  <ellipse cx="86" cy="64" rx="3.5" ry="4.5" fill="#4C1D95" />
                  <circle cx="84.5" cy="62.5" r="2" fill="#FFFFFF" />
                  <circle cx="87.5" cy="66.5" r="1" fill="#FFFFFF" />
                  {/* Mắt phải */}
                  <ellipse cx="114" cy="65" rx="4.5" ry="6" fill="#2E1065" />
                  <ellipse cx="114" cy="64" rx="3.5" ry="4.5" fill="#4C1D95" />
                  <circle cx="112.5" cy="62.5" r="2" fill="#FFFFFF" />
                  <circle cx="115.5" cy="66.5" r="1" fill="#FFFFFF" />

                  {/* Miệng cười chúm chím dễ thương */}
                  <path
                    d="M97 78 Q100 81 103 78"
                    stroke="#E11D48"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  {/* TÓC TẾT VƯƠNG MIỆN & CÀI HOA NGỌC (Braided crown hairstyle) */}
                  {/* Tóc mái rẽ thanh nhã */}
                  <path
                    d="M74 58 C85 45 115 45 126 58 C120 70 110 74 100 62 C90 74 80 70 74 58 Z"
                    fill="#3E2723"
                  />
                  {/* Lọn tóc mai ôm má bánh bao */}
                  <path
                    d="M75 58 C70 75 72 100 76 115 C74 95 78 72 78 60 Z"
                    fill="#3E2723"
                  />
                  <path
                    d="M125 58 C130 75 128 100 124 115 C126 95 122 72 122 60 Z"
                    fill="#3E2723"
                  />
                  {/* Vành tết tóc vương miện trên đầu */}
                  <path
                    d="M76 52 Q100 40 124 52"
                    stroke="#5D4037"
                    strokeWidth="7"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M78 52 Q100 42 122 52"
                    stroke="#8D6E63"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="3,3"
                    fill="none"
                  />

                  {/* Trâm cài hoa sen ngọc & ngọc trai trên tóc */}
                  <circle cx="82" cy="48" r="3.5" fill="#F472B6" />
                  <circle cx="82" cy="48" r="1.5" fill="#FEF08A" />
                  <circle cx="118" cy="48" r="3.5" fill="#F472B6" />
                  <circle cx="118" cy="48" r="1.5" fill="#FEF08A" />
                  <circle cx="100" cy="43" r="2.5" fill="#FFFFFF" />

                  <defs>
                    <radialGradient
                      id="cardAura"
                      cx="0.5"
                      cy="0.5"
                      r="0.5"
                      fx="0.5"
                      fy="0.5"
                    >
                      <stop offset="0%" stopColor="#F472B6" stopOpacity="0.8" />
                      <stop offset="60%" stopColor="#FB7185" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              {/* Popmart Character Tag */}
              <div className="mt-2 text-center">
                <span className="text-[11px] font-bold text-rose-300 font-serif-editorial">
                  3D Popmart Chibi · Áo Dài Lụa Hồng
                </span>
                <div className="flex items-center justify-center gap-1 mt-0.5 text-[9px] text-amber-300/80">
                  <span>★ ★ ★ ★ ★</span>
                  <span>Chất liệu Lụa Tơ Tằm Thật</span>
                </div>
              </div>
            </div>

            {/* Right Details: Cultural Verification & Manifest */}
            <div className="sm:col-span-7 space-y-3">
              {/* Cultural Guardrail Status Stamp & Star Rating */}
              <div
                className={`p-3 rounded-xl border flex flex-col gap-2 ${
                  starsCount >= 4
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : starsCount === 3
                    ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                    : 'bg-rose-950/50 border-rose-500/60 text-rose-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {starsCount >= 4 ? (
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                    <span className="font-bold text-xs uppercase tracking-wide">
                      {starsCount >= 4
                        ? 'Đạt Chuẩn Văn Hóa & Thuần Phong Mỹ Tục'
                        : starsCount === 3
                        ? 'Cần Chỉnh Kín Đáo Hơn'
                        : 'Vi Phạm Thuần Phong Mỹ Tục & Điển Chế'}
                    </span>
                  </div>

                  {/* 5-Star Rating Display */}
                  <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-black/40 border border-amber-400/40">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`text-xs ${
                          s <= starsCount ? 'text-amber-400' : 'text-stone-600'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-[10px] font-mono text-amber-300 font-bold ml-1">
                      {starsCount}/5
                    </span>
                  </div>
                </div>

                {/* Detailed Decency Explanation */}
                <div className="text-xs bg-black/30 p-2.5 rounded-lg border border-white/5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/80 block">
                    Đánh giá thuần phong mỹ tục:
                  </span>
                  <p className="text-[11px] leading-relaxed text-stone-200 font-serif">
                    {decencyExplanation ||
                      culturalWarning ||
                      'Trang phục trang nhã, kín đáo, đoan trang, tôn trọng nghiêm cẩn giá trị thuần phong mỹ tục Việt Nam.'}
                  </p>
                </div>

                {/* Auto fix if warning */}
                {!isAppropriate && hasTabooItems && onAutoFixTaboo && (
                  <div>
                    <button
                      onClick={onAutoFixTaboo}
                      className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <Wrench className="w-3 h-3" />
                      <span>Sửa vi phạm tự động sang họa tiết hợp chuẩn (5★)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Historical Info Card (Constraint 1: Max 50 words Gen Z) */}
              <div className="bg-stone-800/80 border border-stone-700/80 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    📜 Thẻ Thông Tin Lịch Sử (Gen Z Stylist)
                  </span>
                  <span className="text-[9px] text-stone-400">Chuẩn sử học</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed font-serif italic">
                  &ldquo;
                  {historicalInfo ||
                    'Sự kết hợp giữa kết cấu Việt phục cổ truyền và form dáng búp bê Popmart 3D tôn vinh vẻ đẹp kiêu sa nhưng vẫn cực kỳ ngọt ngào, gần gũi với người trẻ.'}
                  &rdquo;
                </p>
              </div>

              {/* Equipped Items Manifest */}
              <div className="bg-stone-800/50 rounded-xl p-2.5 border border-stone-700/60">
                <span className="text-[10px] font-bold uppercase text-stone-400 block mb-1.5">
                  Danh mục phụ kiện đã phối ({selectedItems.length} món):
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                  {selectedItems.map((item) => (
                    <span
                      key={item.id}
                      className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-stone-700/70 border border-stone-600 text-stone-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      <span className="truncate max-w-[120px]">{item.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer Bar */}
          <div className="mt-4 pt-3 border-t border-rose-300/20 flex flex-wrap items-center justify-between gap-2 text-[10px] text-stone-400">
            <div className="flex items-center gap-3">
              <span>Đồ họa: Popmart 3D Chibi Engine</span>
              <span>·</span>
              <span className="text-rose-300 font-semibold">Tơ tằm tự nhiên</span>
            </div>
            <div className="text-amber-300 font-mono">
              ★ CERTIFIED HERITAGE COLLECTIBLE
            </div>
          </div>
        </div>

        {/* Modal Action Buttons (Share / Download / Copy) */}
        <div className="mt-4 flex flex-wrap items-center justify-end gap-2.5">
          <button
            onClick={handleCopyCard}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-600 text-xs font-semibold text-stone-200 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Đã chép mã thẻ!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép thông tin thẻ</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadCard}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Đã lưu ảnh thẻ sưu tập!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Lưu thẻ sưu tập (PNG)</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
