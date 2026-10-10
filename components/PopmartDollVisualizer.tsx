'use client';

import React, { useState } from 'react';
import { WardrobeItem } from '@/data/historical-data';
import {
  Sparkles,
  Layers,
  Eye,
  Maximize2,
  Moon,
  Sun,
  ShieldCheck,
  ShieldAlert,
  Palette,
  Camera,
  RotateCcw,
  Home,
  CheckCircle2,
} from 'lucide-react';

interface PopmartDollVisualizerProps {
  selectedItems: WardrobeItem[];
  onToggleItem?: (item: WardrobeItem) => void;
  onClearAll?: () => void;
  guardrailStatus?: {
    isAppropriate: boolean | null;
    warning: string | null;
    stars?: number | null;
    decencyExplanation?: string | null;
  } | null;
  onOpenRecognition?: () => void;
}

export function PopmartDollVisualizer({
  selectedItems,
  onToggleItem,
  onClearAll,
  guardrailStatus,
  onOpenRecognition,
}: PopmartDollVisualizerProps) {
  // Ratio state: 3:4 (Desktop stage) or 9:16 (Mobile-first story)
  const [viewportRatio, setViewportRatio] = useState<'3:4' | '9:16'>('3:4');
  // Angle view: 3/4 pose (collector default), front, zoom-portrait
  const [viewAngle, setViewAngle] = useState<'three-quarter' | 'front' | 'portrait'>('three-quarter');
  // Atmosphere: 'night-snow' | 'morning-mist'
  const [atmosphere, setAtmosphere] = useState<'night-snow' | 'morning-mist'>('night-snow');

  // Categorize active worn items
  const hair = selectedItems.find((i) => i.category === 'hair');
  const outer = selectedItems.find((i) => i.category === 'outerwear');
  const inner = selectedItems.find((i) => i.category === 'innerwear');
  const bottom = selectedItems.find((i) => i.category === 'bottom');
  const footwear = selectedItems.find((i) => i.category === 'footwear');
  const motif = selectedItems.find((i) => i.category === 'motif');
  const accessories = selectedItems.filter((i) => i.category === 'accessories');

  // Check specific accessories
  const hasFan = accessories.some((i) => i.id.includes('quat') || i.name.toLowerCase().includes('quạt'));
  const hasKieng = accessories.some((i) => i.id.includes('kieng') || i.name.toLowerCase().includes('kiềng'));
  const hasHat = accessories.some((i) => i.id.includes('non') || i.name.toLowerCase().includes('nón'));
  const hasTotebag = accessories.some((i) => i.id.includes('tote') || i.name.toLowerCase().includes('túi'));
  const isTabooDragon5 = motif?.id === 'dragon-5-claws' || selectedItems.some((i) => i.id === 'dragon-5-claws');

  // Is model in default home clothes state (no traditional garments chosen yet)?
  const isHomewear = selectedItems.length === 0;

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* TOP CONTROLS & HUD BAR */}
      <div className="w-full max-w-[420px] mb-2 px-2 flex items-center justify-between text-xs text-stone-200 z-30">
        {/* Ratio & Angle Toggles */}
        <div className="flex items-center gap-1.5 bg-stone-900/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-stone-700/60 shadow-md">
          <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            Popmart 1:2.8
          </span>
          <span className="text-stone-600">|</span>
          <button
            onClick={() => setViewportRatio((r) => (r === '3:4' ? '9:16' : '3:4'))}
            className="text-[10px] font-medium text-stone-300 hover:text-white px-1.5 py-0.5 rounded bg-stone-800/80 transition-all cursor-pointer"
            title="Đổi tỷ lệ khung nhìn (3:4 Desktop / 9:16 Mobile)"
          >
            {viewportRatio === '3:4' ? '📐 3:4 Stage' : '📱 9:16 Feed'}
          </button>
        </div>

        {/* Action Controls: Reset to Home Attire, Angle, Atmosphere, Scan */}
        <div className="flex items-center gap-1 bg-stone-900/85 backdrop-blur-md px-2 py-1 rounded-full border border-stone-700/60 shadow-md">
          {/* Nút reset về Đồ ở nhà */}
          {onClearAll && (
            <button
              onClick={onClearAll}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                isHomewear
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-stone-800 text-stone-300 hover:text-amber-200 hover:bg-stone-700'
              }`}
              title="Cởi toàn bộ trang phục về Đồ ở nhà (Áo ba lỗ trắng & Quần short xám)"
            >
              <Home className="w-3 h-3" />
              <span>Đồ ở nhà</span>
            </button>
          )}

          <button
            onClick={() =>
              setViewAngle((a) =>
                a === 'three-quarter' ? 'front' : a === 'front' ? 'portrait' : 'three-quarter'
              )
            }
            className="text-[10px] font-medium text-amber-200 hover:text-amber-100 px-1.5 py-0.5 rounded transition-all cursor-pointer"
            title="Xoay góc nhìn (Góc 3/4 Popmart / Chính diện / Cận cảnh)"
          >
            {viewAngle === 'three-quarter' ? '🔄 3/4' : viewAngle === 'front' ? '🔄 Chính diện' : '🔍 Cận cảnh'}
          </button>
          <button
            onClick={() => setAtmosphere((a) => (a === 'night-snow' ? 'morning-mist' : 'night-snow'))}
            className="text-stone-300 hover:text-amber-300 p-1 rounded transition-all cursor-pointer"
            title="Đổi thời gian bối cảnh (Đêm lồng đèn tuyết / Sương mai)"
          >
            {atmosphere === 'night-snow' ? <Moon className="w-3 h-3 text-amber-300" /> : <Sun className="w-3 h-3 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* VIEWPORT CONTAINER WITH PRECISE RATIO */}
      <div
        className={`relative overflow-hidden rounded-3xl border-2 border-stone-700/50 shadow-2xl transition-all duration-500 ${
          viewportRatio === '3:4'
            ? 'w-[320px] sm:w-[380px] h-[440px] sm:h-[506px]'
            : 'w-[290px] sm:w-[330px] h-[515px] sm:h-[586px]'
        }`}
      >
        {/* ============================================================== */}
        {/* LỚP 1: HẬU CẢNH (BACKGROUND) - BẦU TRỜI KHÓI LAM & HẠT BỤI ÁNH SÁNG */}
        {/* ============================================================== */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            atmosphere === 'night-snow'
              ? 'bg-gradient-to-b from-[#18233C] via-[#1F2C46] to-[#0F172A]'
              : 'bg-gradient-to-b from-[#3E4F65] via-[#4A5D75] to-[#253245]'
          }`}
        >
          {/* Atmospheric fog gradient */}
          <div className="absolute inset-0 bg-radial from-rose-900/15 via-transparent to-stone-950/80 pointer-events-none" />

          {/* Dusted light particles & floating petals */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-12 w-2 h-3.5 bg-rose-300/60 rounded-full rotate-45 blur-[0.5px] animate-pulse" />
            <div className="absolute top-28 right-16 w-1.5 h-2.5 bg-rose-200/50 rounded-full -rotate-12" />
            <div className="absolute top-48 left-24 w-2 h-3 bg-pink-300/40 rounded-full rotate-12" />
            <div className="absolute top-72 right-12 w-2.5 h-4 bg-rose-200/40 rounded-full rotate-45" />

            <div className="absolute top-20 left-1/3 w-1.5 h-1.5 bg-amber-200/70 rounded-full blur-[0.5px] animate-ping" />
            <div className="absolute top-36 right-1/4 w-1 h-1 bg-amber-300/80 rounded-full" />
            <div className="absolute top-60 left-16 w-2 h-2 bg-amber-100/50 rounded-full blur-[1px]" />
            <div className="absolute top-80 right-20 w-1.5 h-1.5 bg-amber-200/60 rounded-full" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* LỚP 2: TRUNG CẢNH (MIDGROUND) - CỔNG NGUYỆT MÔN & ĐÌNH LẦU LỒNG ĐÈN */}
        {/* ============================================================== */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Cổng vòm Nguyệt Môn tròn bằng đá cổ xám tro */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[260px] sm:w-[290px] h-[260px] sm:h-[290px] rounded-full border-[18px] sm:border-[22px] border-[#5E6877]/80 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-[1px] opacity-90">
            <div className="absolute inset-0 rounded-full border border-stone-400/20" />
          </div>

          {/* Mái đình cổ lầu ngói cong phía trên */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[280px] sm:w-[320px] h-10 border-t-4 border-[#8B3A3A] rounded-t-full opacity-70" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[340px] flex justify-between px-6">
            <div className="w-6 h-3 border-t-2 border-r-2 border-amber-600 rounded-tr-lg -rotate-12" />
            <div className="w-6 h-3 border-t-2 border-l-2 border-amber-600 rounded-tl-lg rotate-12" />
          </div>

          {/* Đôi lồng đèn đỏ treo tỏa ánh sáng ấm cúng */}
          {/* Lồng đèn trái */}
          <div className="absolute top-8 left-8 flex flex-col items-center animate-bounce duration-1000">
            <div className="w-0.5 h-6 bg-amber-600/70" />
            <div className="w-8 h-10 rounded-full bg-gradient-to-b from-red-600 via-rose-600 to-amber-700 shadow-[0_0_18px_rgba(239,68,68,0.8)] border border-amber-400/40 relative">
              <div className="absolute top-1 inset-x-1 h-0.5 bg-amber-300" />
              <div className="absolute bottom-1 inset-x-1 h-0.5 bg-amber-300" />
            </div>
            <div className="w-1.5 h-6 bg-red-700 rounded-b" />
          </div>

          {/* Lồng đèn phải */}
          <div className="absolute top-8 right-8 flex flex-col items-center animate-bounce duration-1000 delay-300">
            <div className="w-0.5 h-6 bg-amber-600/70" />
            <div className="w-8 h-10 rounded-full bg-gradient-to-b from-red-600 via-rose-600 to-amber-700 shadow-[0_0_18px_rgba(239,68,68,0.8)] border border-amber-400/40 relative">
              <div className="absolute top-1 inset-x-1 h-0.5 bg-amber-300" />
              <div className="absolute bottom-1 inset-x-1 h-0.5 bg-amber-300" />
            </div>
            <div className="w-1.5 h-6 bg-red-700 rounded-b" />
          </div>

          {/* Nền gạch phủ sương tuyết nhẹ & Sương mù sàn */}
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-stone-900 via-stone-900/80 to-transparent">
            <div className="absolute bottom-4 inset-x-4 h-6 border-t border-stone-600/40 flex justify-around">
              <div className="w-px h-full bg-stone-700/30" />
              <div className="w-px h-full bg-stone-700/30" />
              <div className="w-px h-full bg-stone-700/30" />
              <div className="w-px h-full bg-stone-700/30" />
            </div>
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-cyan-100/15 via-rose-100/10 to-transparent blur-md" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* NHÂN VẬT 3D CHIBI POPMART BLIND-BOX (TỶ LỆ 1:2.8 & ANATOMY CHUẨN) */}
        {/* ============================================================== */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 z-10 ${
            viewAngle === 'portrait' ? 'scale-135 translate-y-24' : 'scale-100'
          }`}
        >
          {/* Popmart 3D Chibi SVG Model */}
          <svg
            className="w-[280px] sm:w-[330px] h-[400px] sm:h-[460px] filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
            viewBox="0 0 320 460"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Subsurface Scattering Skin Gradients */}
              <radialGradient id="popmartSkin" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#FFF7F2" />
                <stop offset="65%" stopColor="#FDEAE1" />
                <stop offset="100%" stopColor="#F7D7CA" />
              </radialGradient>

              {/* Plump Peach Bao-Bun Cheek Blush */}
              <radialGradient id="peachCheek" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF8F94" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#FFA6A9" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#FFA6A9" stopOpacity="0" />
              </radialGradient>

              {/* Glassy Reflective Cornea (Mắt Ngọc Thủy Tinh) */}
              <radialGradient id="glassEye" cx="45%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#3E2723" />
                <stop offset="60%" stopColor="#2D150B" />
                <stop offset="100%" stopColor="#0F0805" />
              </radialGradient>

              {/* Silk Draping Gradient for Ao Dai */}
              <linearGradient id="pinkSilkDrape" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={outer?.color || '#FED7E2'} />
                <stop offset="40%" stopColor={outer?.color || '#FBB6CE'} />
                <stop offset="75%" stopColor="#F687B3" />
                <stop offset="100%" stopColor="#ED64A6" />
              </linearGradient>

              {/* Outerwear custom gradient */}
              <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={outer?.color || '#8B1E1E'} />
                <stop offset="70%" stopColor={outer?.color || '#701A1A'} />
                <stop offset="100%" stopColor="#450A0A" />
              </linearGradient>

              {/* Gold Embroidery Thread Gradient */}
              <linearGradient id="goldThread" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Heather Gray Jersey Gradient (Quần short thun xám ở nhà) */}
              <linearGradient id="grayShorts" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#9CA3AF" />
                <stop offset="40%" stopColor="#6B7280" />
                <stop offset="100%" stopColor="#4B5563" />
              </linearGradient>

              {/* White Tank Top Cotton Gradient (Áo ba lỗ trắng ở nhà) */}
              <linearGradient id="whiteTank" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#F9FAFB" />
                <stop offset="100%" stopColor="#E5E7EB" />
              </linearGradient>

              {/* Vinyl Collectible Sheen Highlight */}
              <linearGradient id="vinylSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Tóc sau buông nhẹ (Back Flowing Hair) */}
            <path
              d={
                viewAngle === 'three-quarter'
                  ? 'M120 120 C90 160 85 240 105 290 C112 250 120 190 135 150 Z'
                  : 'M120 120 C85 160 85 240 100 290 C110 250 120 190 135 150 Z'
              }
              fill={hair?.color || '#3D2817'}
            />
            <path
              d={
                viewAngle === 'three-quarter'
                  ? 'M195 120 C225 160 220 240 205 290 C198 250 190 190 180 150 Z'
                  : 'M200 120 C235 160 235 240 220 290 C210 250 200 190 185 150 Z'
              }
              fill={hair?.color || '#3D2817'}
            />

            {/* ============================================================== */}
            {/* LỚP HẠ THÂN: CHÂN CHIBI & QUẦN TRUYỀN THỐNG HOẶC QUẦN SHORT XÁM Ở NHÀ */}
            {/* ============================================================== */}
            {bottom ? (
              /* QUẦN/VÁY TRUYỀN THỐNG ĐƯỢC CHỌN TỪ TỦ ĐỒ (Dài buông rủ) */
              <g>
                {/* Ống quần trái */}
                <path
                  d="M136 260 L126 395 L148 400 L154 260 Z"
                  fill={bottom.color || '#FFFFFF'}
                  stroke="#E2E8F0"
                  strokeWidth="0.8"
                />
                {/* Ống quần phải (3/4 góc đứng nhẹ) */}
                <path
                  d="M166 260 L172 395 L194 398 L184 260 Z"
                  fill={bottom.color || '#FFFFFF'}
                  stroke="#E2E8F0"
                  strokeWidth="0.8"
                />
                {/* Nếp gấp rủ thanh tao */}
                <path d="M136 280 L134 380" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
                <path d="M182 280 L184 380" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
              </g>
            ) : (
              /* QUẦN SHORT THUN XÁM Ở NHÀ (Heather Gray Shorts như ảnh mẫu) */
              <g>
                {/* Đôi chân chibi trần mập tròn lộ ra dưới quần short */}
                {/* Chân trái */}
                <path
                  d="M136 295 C132 325 130 365 132 396 C136 398 144 398 148 395 C146 365 146 325 150 295 Z"
                  fill="url(#popmartSkin)"
                />
                {/* Chân phải (góc 3/4) */}
                <path
                  d="M168 295 C168 325 170 365 174 396 C178 398 186 398 190 395 C186 365 184 325 182 295 Z"
                  fill="url(#popmartSkin)"
                />

                {/* Quần short thun xám (Melange Athletic Shorts) */}
                {/* Thân quần short xám */}
                <path
                  d="M136 252 C134 275 130 295 128 302 C134 306 148 306 153 300 L158 270 L163 300 C168 306 184 306 189 302 C186 295 184 275 182 252 Z"
                  fill="url(#grayShorts)"
                  stroke="#4B5563"
                  strokeWidth="0.6"
                />
                {/* Cạp chun co giãn màu xám sẫm */}
                <rect x="135" y="248" width="49" height="8" rx="3" fill="#4B5563" />
                {/* Dây rút thể thao trắng ở giữa cạp quần */}
                <circle cx="160" cy="252" r="1.5" fill="#FFFFFF" />
                <path d="M159 253 Q157 260 156 264" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                <path d="M161 253 Q163 260 164 264" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" fill="none" />

                {/* Đường sọc trắng thể thao bo viền hai bên hông đùi */}
                <path d="M134 256 C132 272 129 292 129 300" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M184 256 C186 272 188 292 188 300" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            )}

            {/* ============================================================== */}
            {/* LỚP BÀN CHÂN & GIÀY / HÀI THÊU */}
            {/* ============================================================== */}
            {footwear ? (
              /* ĐÔI HÀI THÊU HOẶC GIÀY SNEAKERS ĐƯỢC CHỌN TỪ TỦ ĐỒ */
              <g>
                {/* Hài trái */}
                <path
                  d="M124 395 C124 395 120 405 130 408 C144 408 148 400 148 398 Z"
                  fill={footwear.color || '#F4A7B9'}
                  stroke="#DB2777"
                  strokeWidth="1"
                />
                <circle cx="128" cy="404" r="1.5" fill="#FDE68A" />
                {/* Hài phải */}
                <path
                  d="M172 396 C172 396 170 406 182 408 C194 408 196 400 194 396 Z"
                  fill={footwear.color || '#F4A7B9'}
                  stroke="#DB2777"
                  strokeWidth="1"
                />
                <circle cx="178" cy="404" r="1.5" fill="#FDE68A" />
              </g>
            ) : (
              /* BÀN CHÂN TRẦN CHIBI MỘC MẠC Ở NHÀ */
              <g>
                {/* Bàn chân trái trần */}
                <ellipse cx="134" cy="401" rx="8" ry="4.5" fill="url(#popmartSkin)" />
                <circle cx="128" cy="403" r="1.8" fill="#FFB7B2" opacity="0.6" />
                <circle cx="132" cy="404" r="1.4" fill="#FFB7B2" opacity="0.6" />
                <circle cx="136" cy="404" r="1.2" fill="#FFB7B2" opacity="0.6" />
                {/* Bàn chân phải trần */}
                <ellipse cx="184" cy="401" rx="8" ry="4.5" fill="url(#popmartSkin)" />
                <circle cx="180" cy="404" r="1.2" fill="#FFB7B2" opacity="0.6" />
                <circle cx="184" cy="404" r="1.4" fill="#FFB7B2" opacity="0.6" />
                <circle cx="188" cy="403" r="1.8" fill="#FFB7B2" opacity="0.6" />
              </g>
            )}

            {/* ============================================================== */}
            {/* TÀ ÁO SAU (NẾU MẶC ÁO DÀI / ÁO KHOÁC TRUYỀN THỐNG) */}
            {/* ============================================================== */}
            {outer && (
              <path
                d={
                  viewAngle === 'three-quarter'
                    ? 'M142 220 C130 270 120 330 114 380 C130 384 175 382 192 376 C182 320 178 260 174 220 Z'
                    : 'M140 220 C130 270 122 330 118 380 C140 384 180 384 202 380 C198 330 190 270 180 220 Z'
                }
                fill={outer.id.includes('pink') ? 'url(#pinkSilkDrape)' : 'url(#outerGradient)'}
                opacity="0.85"
              />
            )}

            {/* ============================================================== */}
            {/* THÂN TRÊN: ÁO BA LỖ TRẮNG Ở NHÀ HOẶC TRANG PHỤC CỔ TRUYỀN */}
            {/* ============================================================== */}
            {/* Thân người vinyl nền */}
            <path
              d="M142 168 C138 200 136 230 136 254 L182 254 C182 230 180 200 176 168 Z"
              fill="url(#popmartSkin)"
            />

            {/* ÁO BA LỖ TRẮNG Ở NHÀ (Hiển thị nếu chưa mặc áo khoác ngoài) */}
            {(!outer || inner?.id === 'croptop-tee') && (
              <g>
                {/* Thân áo ba lỗ trắng cotton */}
                <path
                  d="M142 174 C140 200 137 225 136 250 L182 250 C181 225 178 200 176 174 C170 182 148 182 142 174 Z"
                  fill="url(#whiteTank)"
                  stroke="#E2E8F0"
                  strokeWidth="0.8"
                />
                {/* Quai áo ba lỗ bên trái */}
                <path d="M144 168 L152 168 L149 180 L142 178 Z" fill="url(#whiteTank)" />
                {/* Quai áo ba lỗ bên phải */}
                <path d="M168 168 L176 168 L177 178 L170 180 Z" fill="url(#whiteTank)" />
                {/* Viền cổ chữ U e ấp (Scoop neck) */}
                <path d="M149 180 Q159 186 170 180" stroke="#CBD5E1" strokeWidth="1.2" fill="none" />
                {/* Nếp gân tăm dệt cotton mộc */}
                <path d="M144 195 L144 245" stroke="#F1F5F9" strokeWidth="0.8" />
                <path d="M159 188 L159 248" stroke="#F1F5F9" strokeWidth="0.8" />
                <path d="M174 195 L174 245" stroke="#F1F5F9" strokeWidth="0.8" />
              </g>
            )}

            {/* ÁO YẾM LỤA NẾU ĐƯỢC CHỌN TỪ TỦ ĐỒ */}
            {inner && inner.id.includes('yem') && (
              <g>
                {/* Vạt áo yếm hình quả trám duyên dáng */}
                <path
                  d="M152 168 L140 196 C138 215 137 235 137 252 L181 252 C181 235 180 215 178 196 L166 168 Z"
                  fill={inner.color || '#E11D48'}
                  stroke="#BE123C"
                  strokeWidth="0.8"
                />
                {/* Dây yếm quàng qua cổ */}
                <path d="M152 168 Q159 164 166 168" stroke="#BE123C" strokeWidth="1.5" fill="none" />
                {/* Thêu hoa sen nhỏ trên ngực yếm */}
                <circle cx="159" cy="205" r="3" fill="#FDE68A" />
              </g>
            )}

            {/* TÀ ÁO KHOÁC TRUYỀN THỐNG / ÁO DÀI (NẾU ĐƯỢC CHỌN TỪ TỦ ĐỒ) */}
            {outer && (
              <g>
                {/* Tà trước áo dài / áo giao lĩnh rủ mềm tự nhiên */}
                <path
                  d={
                    viewAngle === 'three-quarter'
                      ? 'M140 180 C136 210 134 260 130 365 C146 370 178 368 186 362 C184 260 182 210 178 180 Z'
                      : 'M140 180 C136 210 134 260 130 365 C145 370 175 370 190 365 C186 260 184 210 180 180 Z'
                  }
                  fill={outer.id.includes('pink') ? 'url(#pinkSilkDrape)' : 'url(#outerGradient)'}
                  stroke={outer.color || '#F472B6'}
                  strokeWidth="0.8"
                />

                {/* Nẹp cổ áo truyền thống (Cổ thuyền / Cổ đứng / Cổ chéo Giao Lĩnh) */}
                <path
                  d="M148 168 C154 172 166 172 172 168 L170 184 C164 186 156 186 150 184 Z"
                  fill={outer.color || '#F472B6'}
                  stroke="#991B1B"
                  strokeWidth="0.8"
                />

                {/* Hàng khuy bấm ngọc trai / khuy thắt triều đình */}
                <circle cx="166" cy="176" r="1.5" fill="#FFFFFF" />
                <circle cx="170" cy="184" r="1.5" fill="#FFFFFF" />
                <circle cx="174" cy="194" r="1.5" fill="#FFFFFF" />
              </g>
            )}

            {/* HOA VĂN THÊU DÁT VÀNG NẾU ĐƯỢC CHỌN TỪ TỦ ĐỒ */}
            {motif && (
              <g transform="translate(152, 196) scale(0.65)">
                {isTabooDragon5 ? (
                  /* Rồng 5 móng cấm kỵ */
                  <g>
                    <path
                      d="M10 0 C2 10 24 12 18 25 C10 18 4 10 10 0 Z"
                      fill="#DC2626"
                      stroke="#991B1B"
                      strokeWidth="1.2"
                    />
                    <circle cx="14" cy="8" r="2.5" fill="#FEF08A" />
                  </g>
                ) : (
                  /* Bông sen hoa cúc kim chỉ dát vàng */
                  <g>
                    <path d="M12 0 C16 6 18 14 12 20 C6 14 8 6 12 0 Z" fill="url(#goldThread)" />
                    <path d="M6 6 C12 10 14 18 6 20 C2 16 2 10 6 6 Z" fill="url(#goldThread)" opacity="0.85" />
                    <path d="M18 6 C12 10 10 18 18 20 C22 16 22 10 18 6 Z" fill="url(#goldThread)" opacity="0.85" />
                    <path d="M2 18 Q12 26 22 18" stroke="url(#goldThread)" strokeWidth="1.5" fill="none" />
                  </g>
                )}
              </g>
            )}

            {/* ============================================================== */}
            {/* HAI CÁNH TAY & TAY ÁO */}
            {/* ============================================================== */}
            {outer ? (
              /* Tay áo truyền thống thụ phong / tay chẽn */
              <g>
                <path
                  d="M144 178 C124 195 118 225 120 250 L130 250 C128 228 134 202 150 188 Z"
                  fill={outer.id.includes('pink') ? 'url(#pinkSilkDrape)' : 'url(#outerGradient)'}
                />
                <circle cx="126" cy="252" r="5" fill="url(#popmartSkin)" />
                <path
                  d="M176 178 C192 195 196 225 190 250 L180 250 C184 228 180 202 168 188 Z"
                  fill={outer.id.includes('pink') ? 'url(#pinkSilkDrape)' : 'url(#outerGradient)'}
                />
                <circle cx="186" cy="252" r="5" fill="url(#popmartSkin)" />
              </g>
            ) : (
              /* Cánh tay chibi trần ở nhà khoe da sứ mập tròn đáng yêu */
              <g>
                {/* Tay trái trần */}
                <path
                  d="M142 178 C128 196 124 225 126 250 L134 250 C132 228 136 204 148 186 Z"
                  fill="url(#popmartSkin)"
                />
                <circle cx="130" cy="252" r="5.5" fill="url(#popmartSkin)" />

                {/* Tay phải trần */}
                <path
                  d="M176 178 C190 196 194 225 192 250 L184 250 C186 228 182 204 170 186 Z"
                  fill="url(#popmartSkin)"
                />
                <circle cx="188" cy="252" r="5.5" fill="url(#popmartSkin)" />
              </g>
            )}

            {/* PHỤ KIỆN: KIỀNG BẠC CỔ (NẾU ĐƯỢC CHỌN) */}
            {hasKieng && (
              <path
                d="M148 166 C153 174 165 174 170 166"
                stroke="#E2E8F0"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* PHỤ KIỆN: CHIẾC QUẠT NAN LỤA THÊU SEN CÚNG ĐÌNH (CHỈ HIỆN KHI CHỌN QUẠT) */}
            {hasFan && (
              <g transform="translate(138, 235) rotate(-15)">
                <path
                  d="M10 25 L-6 0 C8 -8 24 -8 38 0 L22 25 Z"
                  fill="#FFF1F2"
                  stroke="#F472B6"
                  strokeWidth="0.8"
                />
                <circle cx="16" cy="5" r="4" fill="#F43F5E" opacity="0.6" />
                <line x1="16" y1="20" x2="16" y2="35" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="35" r="2" fill="#E11D48" />
                <line x1="16" y1="36" x2="16" y2="44" stroke="#BE123C" strokeWidth="1.5" />
              </g>
            )}

            {/* ============================================================== */}
            {/* ĐẦU BÚP BÊ POPMART: CHUẨN TỶ LỆ 1:2.8 (Collect Art Toy Head) */}
            {/* ============================================================== */}
            {/* Cổ tròn ngắn xinh */}
            <path d="M154 148 L154 168 L166 168 L166 148 Z" fill="url(#popmartSkin)" />

            {/* Khuôn mặt tròn trịa, bầu bĩnh má bánh bao (Subsurface Scattering) */}
            <ellipse cx="160" cy="115" rx="42" ry="40" fill="url(#popmartSkin)" />

            {/* Má bánh bao bầu bĩnh với hiệu ứng phấn má đào tán mịn (Subsurface Scattering) */}
            <circle cx="136" cy="126" r="14" fill="url(#peachCheek)" />
            <circle cx="184" cy="126" r="14" fill="url(#peachCheek)" />

            {/* ĐÔI MẮT BỒ CÂU TO TRÒN LONG LANH HAI TRÒNG PHẢN QUANG THỦY TINH */}
            {/* Mắt trái */}
            <g>
              <ellipse cx="140" cy="114" rx="8.5" ry="11" fill="url(#glassEye)" />
              <ellipse cx="140" cy="118" rx="6.5" ry="5.5" fill="#8D4925" opacity="0.8" />
              <ellipse cx="138" cy="109" rx="3.5" ry="4.5" fill="#FFFFFF" />
              <circle cx="143" cy="120" r="1.8" fill="#FFFFFF" opacity="0.9" />
              <path d="M132 107 Q140 102 148 107" stroke="#3E2723" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <line x1="148" y1="106" x2="152" y2="104" stroke="#3E2723" strokeWidth="1.2" strokeLinecap="round" />
            </g>

            {/* Mắt phải */}
            <g>
              <ellipse cx="180" cy="114" rx="8.5" ry="11" fill="url(#glassEye)" />
              <ellipse cx="180" cy="118" rx="6.5" ry="5.5" fill="#8D4925" opacity="0.8" />
              <ellipse cx="178" cy="109" rx="3.5" ry="4.5" fill="#FFFFFF" />
              <circle cx="183" cy="120" r="1.8" fill="#FFFFFF" opacity="0.9" />
              <path d="M172 107 Q180 102 188 107" stroke="#3E2723" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <line x1="188" y1="106" x2="192" y2="104" stroke="#3E2723" strokeWidth="1.2" strokeLinecap="round" />
            </g>

            {/* Mũi nhỏ xíu chúm chím */}
            <path d="M159 122 Q160 124 161 122" stroke="#E29578" strokeWidth="1" strokeLinecap="round" />

            {/* Môi son nụ e ấp, biểu cảm trong sáng thanh tú nét đẹp thiếu nữ Việt */}
            <path
              d="M155 133 C157 131 163 131 165 133 C163 137 157 137 155 133 Z"
              fill="#E11D48"
            />
            <circle cx="160" cy="133.5" r="1" fill="#FFFFFF" opacity="0.8" />

            {/* TÓC & MẤN / VƯƠNG MIỆN */}
            <g>
              {/* Mái tóc mái bằng uốn nhẹ phồng Chibi */}
              <path
                d="M120 105 C122 75 198 75 200 105 C185 92 170 90 160 90 C150 90 135 92 120 105 Z"
                fill={hair?.color || '#3D2817'}
              />

              {/* Vành tóc tết hoặc mấn (nếu có chọn hoặc tóc mặc định) */}
              <path
                d="M118 92 C125 68 195 68 202 92 C190 78 130 78 118 92 Z"
                fill="#543720"
                stroke="#6B4627"
                strokeWidth="1.5"
              />

              {/* Hạt ngọc trai đính trên vành tóc tết */}
              <circle cx="132" cy="79" r="2.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
              <circle cx="146" cy="74" r="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
              <circle cx="160" cy="72" r="3.5" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="0.8" />
              <circle cx="174" cy="74" r="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
              <circle cx="188" cy="79" r="2.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
            </g>

            {/* NÓN BA TẦM / QUAI THAO NẾU ĐƯỢC CHỌN TỪ TỦ ĐỒ */}
            {hasHat && (
              <g transform="translate(160, 60)">
                <ellipse cx="0" cy="0" rx="60" ry="14" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
                <ellipse cx="0" cy="-3" rx="30" ry="8" fill="#F59E0B" opacity="0.5" />
                <path d="M-35 8 Q0 24 35 8" stroke="#F43F5E" strokeWidth="2" fill="none" />
              </g>
            )}

            {/* Vinyl Toy Material Highlight Curve */}
            <path
              d="M130 85 C145 78 175 78 190 85"
              stroke="url(#vinylSheen)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* ============================================================== */}
        {/* LỚP 3: TIỀN CẢNH (FOREGROUND) - CÀNH ĐÀO PHAI TUYẾT PHỦ ĐUNG ĐƯA */}
        {/* ============================================================== */}
        <div className="absolute -top-3 -left-4 w-44 h-36 pointer-events-none z-20 filter blur-[0.6px] transition-transform duration-1000 animate-pulse">
          <svg viewBox="0 0 160 140" fill="none" className="w-full h-full opacity-95">
            <path d="M-10 10 Q30 20 60 50 Q85 75 110 70" stroke="#543D2B" strokeWidth="5" strokeLinecap="round" />
            <path d="M40 32 Q65 15 85 20" stroke="#543D2B" strokeWidth="3" strokeLinecap="round" />
            <path d="M-10 7 Q30 17 60 47" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
            {/* Bông đào 1 */}
            <g transform="translate(60, 48)">
              <circle cx="-5" cy="0" r="5" fill="#F472B6" opacity="0.9" />
              <circle cx="5" cy="0" r="5" fill="#F472B6" opacity="0.9" />
              <circle cx="0" cy="-5" r="5" fill="#FBCFE8" opacity="0.9" />
              <circle cx="0" cy="5" r="5" fill="#F472B6" opacity="0.9" />
              <circle cx="0" cy="0" r="2.5" fill="#F59E0B" />
            </g>
            {/* Bông đào 2 */}
            <g transform="translate(85, 20)">
              <circle cx="-4" cy="0" r="4.5" fill="#FBCFE8" />
              <circle cx="4" cy="0" r="4.5" fill="#F472B6" />
              <circle cx="0" cy="-4" r="4.5" fill="#F472B6" />
              <circle cx="0" cy="4" r="4.5" fill="#FBCFE8" />
              <circle cx="0" cy="0" r="2" fill="#F59E0B" />
            </g>
            {/* Bông đào 3 */}
            <g transform="translate(108, 68)">
              <circle cx="-4" cy="0" r="4" fill="#F472B6" />
              <circle cx="4" cy="0" r="4" fill="#FBCFE8" />
              <circle cx="0" cy="-4" r="4" fill="#F472B6" />
              <circle cx="0" cy="4" r="4" fill="#FBCFE8" />
              <circle cx="0" cy="0" r="1.8" fill="#FDE68A" />
            </g>
          </svg>
        </div>

        {/* BOTTOM HUD STAMP: STATUS CỦA TRANG PHỤC MODEL */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <div className="bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] text-white flex items-center gap-1.5 shadow-lg">
            {isHomewear ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-bold text-amber-200">Đồ Ở Nhà (Áo ba lỗ & Short thun)</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                <span className="font-bold text-rose-200">Búp Bê Di Sản ({selectedItems.length} món)</span>
              </>
            )}
            <span className="text-stone-400">· 1:2.8</span>
          </div>

          {/* Quick Cultural Guardrail Pill with Stars */}
          <div
            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold backdrop-blur-md border shadow-md flex items-center gap-1 ${
              isHomewear
                ? 'bg-stone-900/80 border-stone-600/60 text-stone-300'
                : guardrailStatus?.isAppropriate === false
                ? 'bg-rose-950/85 border-rose-500/80 text-rose-300'
                : 'bg-emerald-950/85 border-emerald-500/80 text-emerald-300'
            }`}
          >
            {isHomewear ? (
              <span>🏠 Trang Phục Tại Gia</span>
            ) : guardrailStatus?.stars ? (
              <>
                <span className="text-amber-400">{'★'.repeat(guardrailStatus.stars)}</span>
                <span>{guardrailStatus.stars}/5★</span>
              </>
            ) : guardrailStatus?.isAppropriate === false ? (
              <>
                <ShieldAlert className="w-3 h-3 text-rose-400" />
                <span>Chưa Hợp Chuẩn</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>5★ Đạt Chuẩn</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
