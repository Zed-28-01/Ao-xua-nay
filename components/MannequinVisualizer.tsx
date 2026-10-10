'use client';

import React, { useState } from 'react';
import { WardrobeItem, HistoricalEra } from '@/data/historical-data';
import {
  Sparkles,
  Search,
  FolderHeart,
  Trash2,
  BookOpen,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';

interface MannequinVisualizerProps {
  selectedItems: WardrobeItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onRandomize: () => void;
  onOpenPresets: () => void;
  onOpenChat: () => void;
  onOpenCulturalModal: () => void;
  isAnalyzing: boolean;
  guardrailStatus: {
    isAppropriate: boolean | null;
    warning: string | null;
  } | null;
  currentEra: HistoricalEra;
  eventContext: string;
}

export function MannequinVisualizer({
  selectedItems,
  onClearAll,
  onOpenPresets,
  onOpenChat,
  onOpenCulturalModal,
  isAnalyzing,
  guardrailStatus,
  currentEra,
  eventContext,
}: MannequinVisualizerProps) {
  // Layer view mode: 'all' | 'front' | 'back'
  const [layerView, setLayerView] = useState<'all' | 'front' | 'back'>('all');
  const [showSearchPrompt, setShowSearchPrompt] = useState(false);

  // Categorize active worn items
  const hair = selectedItems.find((i) => i.category === 'hair');
  const outer = selectedItems.find((i) => i.category === 'outerwear');
  const inner = selectedItems.find((i) => i.category === 'innerwear');
  const bottom = selectedItems.find((i) => i.category === 'bottom');
  const footwear = selectedItems.find((i) => i.category === 'footwear');
  const motif = selectedItems.find((i) => i.category === 'motif');
  const accessories = selectedItems.filter((i) => i.category === 'accessories');

  return (
    <div className="relative w-full h-[640px] sm:h-[720px] rounded-3xl overflow-hidden shadow-lg border border-amber-950/15 select-none bg-[#FBF3E8] flex flex-col justify-between">
      {/* 1. ATMOSPHERIC BOUTIQUE DRESSING ROOM BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft wallpaper with vintage floral motif */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCECD8] via-[#FAF0E1] to-[#F3DFCA] opacity-90" />

        {/* Vintage Vanity Mirror Arch & Warm Lamp Glow */}
        <div className="absolute top-8 left-12 w-48 h-72 rounded-t-full border-4 border-[#E2BF9E]/40 bg-[#FFF7ED]/30 shadow-inner" />
        <div className="absolute top-16 right-16 w-32 h-32 rounded-full bg-amber-200/40 blur-2xl" />

        {/* Traditional Dressing Room Screen & Framed Picture */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-40 h-28 border border-[#B4846C]/40 rounded-lg bg-amber-50/50 p-2 shadow-xs">
          <div className="w-full h-full border border-amber-300/40 rounded flex items-center justify-center text-[10px] text-[#8C5E48] font-serif italic text-center">
            {currentEra.name} · {currentEra.century}
          </div>
        </div>

        {/* Antique Chair Silhouette in background */}
        <div className="absolute bottom-24 left-6 w-28 h-48 border-2 border-[#D4A373]/30 rounded-t-full bg-rose-100/20" />

        {/* Floor Horizon and Parquet Sheen */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#E8CEB3] to-transparent opacity-80" />
      </div>

      {/* 2. TOP BANNER: Era & Event Status */}
      <div className="relative z-10 p-4 flex items-center justify-between">
        <div className="bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-900/10 shadow-2xs flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#991B1B]" />
          <span className="text-xs font-bold text-stone-900 font-serif-editorial">
            Thời {currentEra.name}
          </span>
          <span className="text-stone-300">·</span>
          <span className="text-[11px] text-stone-600 truncate max-w-[120px] sm:max-w-none">
            {eventContext}
          </span>
        </div>

        {/* Live Cultural Safety Indicator */}
        <div
          onClick={onOpenCulturalModal}
          className={`cursor-pointer px-3 py-1.5 rounded-full text-[11px] font-bold backdrop-blur-md border shadow-2xs flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 ${
            isAnalyzing
              ? 'bg-amber-100/90 text-amber-900 border-amber-300 animate-pulse'
              : guardrailStatus?.isAppropriate === false
              ? 'bg-red-500 text-white border-red-600 shadow-red-200'
              : 'bg-emerald-600 text-white border-emerald-700 shadow-emerald-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {isAnalyzing
              ? 'Đang kiểm tra...'
              : guardrailStatus?.isAppropriate === false
              ? 'Cảnh báo cấm kỵ'
              : 'Hợp chuẩn văn hóa'}
          </span>
        </div>
      </div>

      {/* 3. CENTER STAGE: FULL-LENGTH ANIME / MANNEQUIN MODEL WITH SVG LAYERS */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-[340px] h-[520px] flex items-center justify-center">
          <svg
            viewBox="0 0 280 480"
            className="w-full h-full drop-shadow-md select-none transition-all duration-300"
          >
            <defs>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2E7" />
                <stop offset="100%" stopColor="#FDE3D2" />
              </linearGradient>
              <linearGradient id="blushGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#27272A" />
                <stop offset="100%" stopColor="#18181B" />
              </linearGradient>
            </defs>

            {/* Pedestal & Soft Stage Shadow */}
            <ellipse cx="140" cy="458" rx="60" ry="10" fill="#000000" fillOpacity="0.08" />

            {/* --- BACK HAIR (Tóc xõa phía sau) --- */}
            {(!hair || hair.id === 'toc-may-xoa') && (
              <path
                d="M 115 70 C 95 120 85 240 100 320 C 120 280 160 280 180 320 C 195 240 185 120 165 70 Z"
                fill="url(#hairGrad)"
              />
            )}

            {/* --- BODY SILHOUETTE (Thân hình người mẫu) --- */}
            {/* Legs */}
            <g fill="url(#skinGrad)" stroke="#E2C9B6" strokeWidth="0.8">
              {/* Left leg */}
              <path d="M 126 230 L 122 390 L 120 445 Q 124 450 128 445 L 132 390 L 134 230 Z" />
              {/* Right leg */}
              <path d="M 146 230 L 148 390 L 150 445 Q 154 450 158 445 L 156 390 L 154 230 Z" />
            </g>

            {/* Torso & Neck */}
            <g fill="url(#skinGrad)" stroke="#E2C9B6" strokeWidth="0.8">
              {/* Neck */}
              <rect x="135" y="76" width="10" height="18" rx="2" />
              {/* Torso */}
              <path d="M 118 92 Q 140 88 162 92 L 156 220 Q 140 224 124 220 Z" />
            </g>

            {/* Arms (Graceful dress-up posture) */}
            <g fill="url(#skinGrad)" stroke="#E2C9B6" strokeWidth="0.8">
              {/* Left arm: bent holding fan or folded */}
              <path d="M 118 92 Q 95 130 92 165 Q 98 175 110 160 L 118 120 Z" />
              {/* Right arm: elongated elegant contour */}
              <path d="M 162 92 Q 185 130 188 165 Q 182 175 170 160 L 162 120 Z" />
            </g>

            {/* --- HEAD & SWEET ANIME FACE --- */}
            <g>
              {/* Head shape */}
              <ellipse cx="140" cy="62" rx="19" ry="23" fill="url(#skinGrad)" stroke="#E2C9B6" strokeWidth="0.8" />
              {/* Soft Cheeks Blush */}
              <circle cx="128" cy="67" r="4.5" fill="url(#blushGrad)" />
              <circle cx="152" cy="67" r="4.5" fill="url(#blushGrad)" />
              {/* Gentle anime eyes */}
              <ellipse cx="132" cy="62" rx="3.5" ry="4" fill="#1E3A8A" />
              <ellipse cx="148" cy="62" rx="3.5" ry="4" fill="#1E3A8A" />
              <circle cx="133" cy="60.5" r="1.3" fill="#FFFFFF" />
              <circle cx="149" cy="60.5" r="1.3" fill="#FFFFFF" />
              {/* Eyelashes & Brows */}
              <path d="M 127 58 Q 133 55 137 58" fill="none" stroke="#27272A" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M 143 58 Q 147 55 153 58" fill="none" stroke="#27272A" strokeWidth="1.2" strokeLinecap="round" />
              {/* Cute smiling mouth */}
              <path d="M 137 72 Q 140 74 143 72" fill="none" stroke="#E11D48" strokeWidth="1.2" strokeLinecap="round" />
            </g>

            {/* --- LAYER: BOTTOM (Hạ Y) --- */}
            {bottom && (
              <g className="transition-all duration-300">
                {bottom.id === 'wide-leg-pants' && (
                  /* Streetwear wide-leg pants */
                  <path
                    d="M 124 195 L 105 435 L 137 435 L 140 235 L 143 435 L 175 435 L 156 195 Z"
                    fill={bottom.color}
                    stroke="#18181B"
                    strokeWidth="1.2"
                  />
                )}
                {bottom.id === 'denim-jeans' && (
                  /* Indigo denim pants */
                  <path
                    d="M 125 195 L 116 438 L 138 438 L 140 240 L 142 438 L 164 438 L 155 195 Z"
                    fill={bottom.color}
                    stroke="#0F172A"
                    strokeWidth="1.5"
                  />
                )}
                {bottom.id === 'pleated-skirt' && (
                  /* Pleated midi skirt */
                  <path
                    d="M 124 195 Q 140 200 156 195 L 176 345 Q 140 355 104 345 Z"
                    fill={bottom.color}
                    stroke="#27272A"
                    strokeWidth="1.2"
                  />
                )}
                {bottom.id === 'silk-culottes' && (
                  /* Flowing traditional silk trousers */
                  <path
                    d="M 124 195 L 108 440 L 137 440 L 140 230 L 143 440 L 172 440 L 156 195 Z"
                    fill={bottom.color}
                    stroke="#A8A29E"
                    strokeWidth="1"
                  />
                )}
              </g>
            )}

            {/* --- LAYER: INNERWEAR (Nội Y / Áo Mặc Trong) --- */}
            {inner && (
              <g className="transition-all duration-300">
                {inner.id === 'croptop-tee' && (
                  <path
                    d="M 126 94 L 135 91 L 145 91 L 154 94 L 152 145 L 128 145 Z"
                    fill={inner.color}
                    stroke="#D6D3D1"
                    strokeWidth="1"
                  />
                )}
                {inner.id === 'ao-yem-silk' && (
                  <g>
                    <path
                      d="M 140 92 L 156 130 L 140 172 L 124 130 Z"
                      fill={inner.color}
                      stroke="#C2410C"
                      strokeWidth="1.2"
                    />
                    <path d="M 137 84 L 140 92 L 143 84" fill="none" stroke="#C2410C" strokeWidth="1" />
                  </g>
                )}
                {inner.id === 'minimal-shirt' && (
                  <g>
                    <path
                      d="M 126 93 L 136 90 L 144 90 L 154 93 L 154 185 L 126 185 Z"
                      fill={inner.color}
                      stroke="#D6D3D1"
                      strokeWidth="1"
                    />
                    <line x1="140" y1="90" x2="140" y2="185" stroke="#A8A29E" strokeWidth="1" strokeDasharray="3 3" />
                  </g>
                )}
              </g>
            )}

            {/* --- LAYER: OUTERWEAR (Ngoại Y / Cổ Phục Chính) --- */}
            {outer && layerView !== 'back' && (
              <g className="transition-all duration-300">
                {outer.id === 'giao-linh-coat' && (
                  /* Áo Giao Lĩnh cổ chéo vạt rộng phong cách Streetwear */
                  <g>
                    {/* Flowing wide sleeves */}
                    <path d="M 120 95 L 75 190 L 96 200 L 126 140 Z" fill={outer.color} stroke="#292524" strokeWidth="1.2" />
                    <path d="M 160 95 L 205 190 L 184 200 L 154 140 Z" fill={outer.color} stroke="#292524" strokeWidth="1.2" />
                    {/* Robe body with diagonal lapel */}
                    <path d="M 120 95 Q 140 102 160 95 L 176 310 Q 140 318 104 310 Z" fill={outer.color} fillOpacity="0.94" stroke="#292524" strokeWidth="1.5" />
                    {/* Giao Lĩnh Collar Cross */}
                    <path d="M 132 94 L 156 160 L 154 310" fill="none" stroke="#E7E5E4" strokeWidth="2.5" />
                    <path d="M 148 94 L 126 150" fill="none" stroke="#D6D3D1" strokeWidth="1.5" />
                  </g>
                )}

                {outer.id === 'vien-linh-robe' && (
                  /* Áo Viên Lĩnh cổ tròn quy củ Lê Sơ */
                  <g>
                    <path d="M 120 95 L 70 205 L 95 215 L 128 150 Z" fill={outer.color} stroke="#450A0A" strokeWidth="1.2" />
                    <path d="M 160 95 L 210 205 L 185 215 L 152 150 Z" fill={outer.color} stroke="#450A0A" strokeWidth="1.2" />
                    <path d="M 120 95 L 160 95 L 178 340 Q 140 348 102 340 Z" fill={outer.color} stroke="#450A0A" strokeWidth="1.5" />
                    {/* Round Collar */}
                    <ellipse cx="140" cy="98" rx="16" ry="8" fill="none" stroke="#FEF08A" strokeWidth="3" />
                  </g>
                )}

                {outer.id === 'ngu-than-chen' && (
                  /* Áo Ngũ Thân tay chẽn 5 cúc triều Nguyễn */
                  <g>
                    <path d="M 122 95 L 98 190 L 112 195 L 128 140 Z" fill={outer.color} stroke="#064E3B" strokeWidth="1.2" />
                    <path d="M 158 95 L 182 190 L 168 195 L 152 140 Z" fill={outer.color} stroke="#064E3B" strokeWidth="1.2" />
                    <path d="M 122 95 L 158 95 L 168 315 Q 140 322 112 315 Z" fill={outer.color} stroke="#064E3B" strokeWidth="1.5" />
                    {/* Mandarin Collar */}
                    <path d="M 132 88 L 148 88 L 147 96 L 133 96 Z" fill={outer.color} stroke="#FDE047" strokeWidth="1" />
                    {/* 5 Buttons */}
                    <circle cx="142" cy="91" r="2" fill="#FDE047" />
                    <circle cx="146" cy="104" r="2" fill="#FDE047" />
                    <circle cx="150" cy="118" r="2" fill="#FDE047" />
                    <circle cx="154" cy="134" r="2" fill="#FDE047" />
                    <circle cx="155" cy="152" r="2" fill="#FDE047" />
                  </g>
                )}

                {outer.id === 'nhat-binh-regal' && (
                  /* Áo Nhật Bình ngũ sắc */
                  <g>
                    <path d="M 120 95 L 72 210 L 98 220 L 128 150 Z" fill={outer.color} stroke="#7F1D1D" strokeWidth="1.2" />
                    <path d="M 160 95 L 208 210 L 182 220 L 152 150 Z" fill={outer.color} stroke="#7F1D1D" strokeWidth="1.2" />
                    {/* Ngũ sắc rainbow cuffs */}
                    <rect x="72" y="200" width="26" height="5" fill="#3B82F6" />
                    <rect x="72" y="205" width="26" height="5" fill="#EAB308" />
                    <rect x="72" y="210" width="26" height="5" fill="#22C55E" />
                    <rect x="182" y="200" width="26" height="5" fill="#3B82F6" />
                    <rect x="182" y="205" width="26" height="5" fill="#EAB308" />
                    <rect x="182" y="210" width="26" height="5" fill="#22C55E" />
                    <path d="M 120 95 L 160 95 L 176 335 Q 140 342 104 335 Z" fill={outer.color} stroke="#7F1D1D" strokeWidth="1.5" />
                    {/* Rectangular Collar (Nhật Bình) */}
                    <path d="M 130 92 L 150 92 L 150 142 L 130 142 Z" fill="none" stroke="#FDE047" strokeWidth="3.5" />
                  </g>
                )}

                {outer.id === 'ao-dai-modern' && (
                  /* Áo dài cách tân tà lửng */
                  <g>
                    <path d="M 124 95 L 105 175 L 118 180 L 130 135 Z" fill={outer.color} stroke="#14532D" strokeWidth="1.2" />
                    <path d="M 156 95 L 175 175 L 162 180 L 150 135 Z" fill={outer.color} stroke="#14532D" strokeWidth="1.2" />
                    <path d="M 126 93 L 154 93 L 164 290 Q 140 295 116 290 Z" fill={outer.color} stroke="#14532D" strokeWidth="1.5" />
                  </g>
                )}

                {outer.id === 'doi-kham-jacket' && (
                  /* Áo Đối Khâm dáng ngắn */
                  <g>
                    <path d="M 120 95 L 80 185 L 98 192 L 126 138 Z" fill={outer.color} stroke="#78350F" strokeWidth="1.2" />
                    <path d="M 160 95 L 200 185 L 182 192 L 154 138 Z" fill={outer.color} stroke="#78350F" strokeWidth="1.2" />
                    <path d="M 120 95 L 134 95 L 132 280 L 108 280 Z" fill={outer.color} stroke="#78350F" strokeWidth="1.5" />
                    <path d="M 160 95 L 146 95 L 148 280 L 172 280 Z" fill={outer.color} stroke="#78350F" strokeWidth="1.5" />
                  </g>
                )}
              </g>
            )}

            {/* --- LAYER: MOTIF BADGE (Hoa Văn Ngực Áo) --- */}
            {motif && (
              <g className="transition-all duration-300">
                {motif.id === 'dragon-5-claws' && (
                  <g transform="translate(140, 130)">
                    <circle cx="0" cy="0" r="16" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
                    <path d="M -8 -5 Q 0 -12 8 -5 Q 0 10 -8 0 Q 8 0 0 8" fill="none" stroke="#854D0E" strokeWidth="1.8" />
                    <circle cx="12" cy="-12" r="5" fill="#DC2626" />
                    <text x="12" y="-9" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">!</text>
                  </g>
                )}
                {motif.id === 'dragon-4-claws' && (
                  <g transform="translate(140, 130)">
                    <circle cx="0" cy="0" r="15" fill="#FEF9C3" stroke="#D97706" strokeWidth="1.5" />
                    <path d="M -7 -4 Q 0 -9 7 -4 Q 0 8 -7 0" fill="none" stroke="#B45309" strokeWidth="1.5" />
                  </g>
                )}
                {motif.id === 'lotus-chrysanthemum' && (
                  <g transform="translate(140, 130)">
                    <circle cx="0" cy="0" r="14" fill="#ECFDF5" stroke="#059669" strokeWidth="1.2" />
                    <path d="M 0 -9 C 6 -5 6 5 0 9 C -6 5 -6 -5 0 -9 Z" fill="#10B981" fillOpacity="0.8" />
                    <circle cx="0" cy="0" r="3.5" fill="#FDE047" />
                  </g>
                )}
                {motif.id === 'thuy-ba-waves' && (
                  <g transform="translate(140, 132)">
                    <path d="M -16 0 Q -8 -9 0 0 Q 8 -9 16 0 Q 8 9 0 0 Q -8 9 -16 0 Z" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
                  </g>
                )}
              </g>
            )}

            {/* --- LAYER: HAIR & HEADPIECES (Tóc & Mấn) --- */}
            {hair ? (
              <g className="transition-all duration-300">
                {hair.id === 'khan-van-nhung' && (
                  /* Khăn vấn nhung đen nhiều nếp */
                  <g>
                    <ellipse cx="140" cy="48" rx="23" ry="12" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
                    <path d="M 120 48 Q 140 40 160 48" fill="none" stroke="#52525B" strokeWidth="1.5" />
                    <path d="M 122 52 Q 140 44 158 52" fill="none" stroke="#3F3F46" strokeWidth="1" />
                  </g>
                )}
                {hair.id === 'man-theu-hoa' && (
                  /* Mấn cách tân thêu hoa sen kim tuyến */
                  <g>
                    <ellipse cx="140" cy="46" rx="24" ry="13" fill="#D97706" stroke="#FEF08A" strokeWidth="2" />
                    <circle cx="140" cy="44" r="3" fill="#FEF08A" />
                  </g>
                )}
                {hair.id === 'non-quai-thao' && (
                  /* Nón quai thao */
                  <g>
                    <ellipse cx="140" cy="40" rx="36" ry="10" fill="#E5DEC9" stroke="#A8A29E" strokeWidth="1.5" />
                    <ellipse cx="140" cy="38" rx="16" ry="6" fill="#D6CEBE" />
                    {/* Pink silk ribbons (quai thao tơ hồng) */}
                    <path d="M 115 42 Q 120 100 130 160" fill="none" stroke="#F43F5E" strokeWidth="1.8" />
                    <path d="M 165 42 Q 160 100 150 160" fill="none" stroke="#F43F5E" strokeWidth="1.8" />
                  </g>
                )}
              </g>
            ) : (
              /* Default hair contour bangs */
              <path
                d="M 120 56 Q 140 45 160 56 Q 165 40 140 38 Q 115 40 120 56 Z"
                fill="url(#hairGrad)"
              />
            )}

            {/* --- LAYER: FOOTWEAR (Giày Hài) --- */}
            {footwear && (
              <g className="transition-all duration-300">
                {footwear.id === 'hai-theu-sen' && (
                  /* Red lotus curved slippers (like item #5 in game) */
                  <g>
                    <path d="M 116 442 Q 128 440 132 448 Q 124 452 114 448 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
                    <path d="M 148 442 Q 160 440 164 448 Q 156 452 146 448 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
                    <circle cx="124" cy="445" r="1.5" fill="#FEF08A" />
                    <circle cx="156" cy="445" r="1.5" fill="#FEF08A" />
                  </g>
                )}
                {footwear.id === 'chunky-sneakers' && (
                  /* Modern chunky white sneakers */
                  <g>
                    <rect x="114" y="440" width="18" height="10" rx="3" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.2" />
                    <rect x="146" y="440" width="18" height="10" rx="3" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.2" />
                  </g>
                )}
                {footwear.id === 'guoc-moc-nhung' && (
                  /* Wooden clogs */
                  <g>
                    <rect x="115" y="444" width="16" height="5" rx="1" fill="#78350F" />
                    <path d="M 117 444 Q 123 438 129 444" fill="none" stroke="#18181B" strokeWidth="2" />
                    <rect x="147" y="444" width="16" height="5" rx="1" fill="#78350F" />
                    <path d="M 149 444 Q 155 438 161 444" fill="none" stroke="#18181B" strokeWidth="2" />
                  </g>
                )}
                {footwear.id === 'loafer-leather' && (
                  /* Black loafers */
                  <g>
                    <ellipse cx="123" cy="446" rx="9" ry="4" fill="#18181B" />
                    <ellipse cx="155" cy="446" rx="9" ry="4" fill="#18181B" />
                  </g>
                )}
              </g>
            )}

            {/* --- LAYER: ACCESSORIES (Trang Sức, Túi, Quạt) --- */}
            {accessories.map((acc) => {
              if (acc.id === 'silver-collar') {
                return (
                  <ellipse key={acc.id} cx="140" cy="88" rx="15" ry="7" fill="none" stroke="#CBD5E1" strokeWidth="3" />
                );
              }
              if (acc.id === 'folding-fan') {
                return (
                  <g key={acc.id} transform="translate(85, 160)">
                    <path d="M 0 0 L 22 -22 A 30 30 0 0 0 -22 -22 Z" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
                  </g>
                );
              }
              if (acc.id === 'canvas-tote') {
                return (
                  <g key={acc.id} transform="translate(185, 150)">
                    <path d="M 5 0 L 5 -30 Q 15 -42 25 -30 L 25 0" fill="none" stroke="#78716C" strokeWidth="2" />
                    <rect x="0" y="0" width="30" height="40" rx="3" fill="#E7E5E4" stroke="#78716C" strokeWidth="1.5" />
                  </g>
                );
              }
              if (acc.id === 'modern-beret') {
                return (
                  <ellipse key={acc.id} cx="140" cy="38" rx="22" ry="7" fill="#18181B" transform="rotate(-6 140 38)" />
                );
              }
              return null;
            })}
          </svg>
        </div>
      </div>

      {/* 4. GAME WIDGET: LEFT CIRCULAR ACTION BADGES (MuMu & Kỹ năng style) */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {/* Pink circular MuMu Advisor badge */}
        <button
          onClick={onOpenChat}
          className="group flex flex-col items-center justify-center w-14 h-14 rounded-full bg-gradient-to-b from-[#FFA7A6] to-[#E05A67] border-2 border-white shadow-md text-white transition-transform hover:scale-110 active:scale-95"
          title="Nhắc nhở từ Cố vấn AI Stylist"
        >
          <span className="text-[10px] font-bold leading-none text-center">Cố vấn</span>
          <span className="text-[9px] opacity-90 mt-0.5">Nhắc nhở</span>
        </button>

        {/* Golden circular Era / Skill badge */}
        <button
          onClick={onOpenCulturalModal}
          className="group flex flex-col items-center justify-center w-14 h-14 rounded-full bg-gradient-to-b from-[#FCD34D] to-[#D97706] border-2 border-white shadow-md text-white transition-transform hover:scale-110 active:scale-95"
          title="Điểm số & Niên đại văn hóa"
        >
          <SlidersHorizontal className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-bold leading-none">Niên đại</span>
        </button>
      </div>

      {/* 5. GAME WIDGET: BOTTOM-LEFT "SẴN SÀNG" BUTTON (Exact match to game screenshot) */}
      <div className="absolute left-4 bottom-5 z-20">
        <button
          onClick={onOpenCulturalModal}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#F43F5E] via-[#E11D48] to-[#BE123C] text-white font-bold text-sm shadow-lg border-2 border-white hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 animate-pulse"
        >
          <span>Sẵn sàng</span>
        </button>
      </div>

      {/* 6. GAME WIDGET: CENTER VERTICAL TOOL DOCK (Trước, Sau, Tìm, Bộ, Xóa, Nhật ký) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 bg-white/70 backdrop-blur-md p-1.5 rounded-2xl border border-white/80 shadow-md">
        {/* Trước (Lớp ngoài) */}
        <button
          onClick={() => setLayerView(layerView === 'front' ? 'all' : 'front')}
          className={`flex flex-col items-center p-1.5 rounded-xl text-[10px] transition-colors ${
            layerView === 'front' ? 'bg-[#991B1B] text-white font-bold' : 'text-stone-700 hover:bg-stone-100'
          }`}
          title="Xem lớp áo khoác ngoài"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Trước</span>
        </button>

        {/* Sau (Lớp trong) */}
        <button
          onClick={() => setLayerView(layerView === 'back' ? 'all' : 'back')}
          className={`flex flex-col items-center p-1.5 rounded-xl text-[10px] transition-colors ${
            layerView === 'back' ? 'bg-[#991B1B] text-white font-bold' : 'text-stone-700 hover:bg-stone-100'
          }`}
          title="Xem lớp áo trong"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Sau</span>
        </button>

        {/* Tìm (Tìm kiếm) */}
        <button
          onClick={() => setShowSearchPrompt(!showSearchPrompt)}
          className="flex flex-col items-center p-1.5 rounded-xl text-[10px] text-stone-700 hover:bg-stone-100 transition-colors"
          title="Tìm kiếm trang phục"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Tìm</span>
        </button>

        {/* Bộ (Xem theo bộ Presets) */}
        <button
          onClick={onOpenPresets}
          className="flex flex-col items-center p-1.5 rounded-xl text-[10px] text-stone-700 hover:bg-stone-100 transition-colors"
          title="Bộ phối sẵn (Presets)"
        >
          <FolderHeart className="w-3.5 h-3.5 text-rose-500" />
          <span>Bộ</span>
        </button>

        {/* Xóa (Làm mới / Gỡ đồ) */}
        <button
          onClick={onClearAll}
          className="flex flex-col items-center p-1.5 rounded-xl text-[10px] text-stone-500 hover:text-red-700 hover:bg-red-50 transition-colors"
          title="Gỡ toàn bộ trang phục"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Xóa</span>
        </button>

        {/* Nhật ký (Thẻ Info Card) */}
        <button
          onClick={onOpenCulturalModal}
          className="flex flex-col items-center p-1.5 rounded-xl text-[10px] text-[#991B1B] font-semibold hover:bg-amber-100/60 transition-colors"
          title="Nhật ký & Thẻ thông tin văn hóa"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>Nhật ký</span>
        </button>
      </div>

      {/* Subtle Bottom Bar with Count */}
      <div className="relative z-10 p-3 flex items-center justify-between text-[11px] text-stone-500 bg-white/40 backdrop-blur-xs">
        <span className="ml-24">
          Đang trang bị: <strong className="text-stone-800">{selectedItems.length}</strong> món
        </span>
        <span className="mr-14 text-stone-400">Chạm &quot;Sẵn sàng&quot; để chấm điểm văn hóa</span>
      </div>
    </div>
  );
}
