'use client';

import React, { useState, useEffect } from 'react';
import { HISTORICAL_ERAS, HistoricalEra } from '@/data/historical-data';
import {
  Sparkles,
  Crown,
  ArrowRight,
  Star,
  Gift,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Compass,
  Layers,
  Shirt,
  CheckCircle2,
  X,
  Award,
  BookOpen,
  Coins,
  Gem,
  Heart,
  HelpCircle,
  Flame,
  Info,
} from 'lucide-react';

interface StationSelectionMapProps {
  onSelectStation: (era: HistoricalEra) => void;
  selectedEraId?: string;
  onOpenKnowledge?: () => void;
  onOpenStandards?: () => void;
}

export function StationSelectionMap({
  onSelectStation,
  selectedEraId = 'ly-tran-le',
  onOpenKnowledge,
  onOpenStandards,
}: StationSelectionMapProps) {
  const [activeEraId, setActiveEraId] = useState<string>(selectedEraId);
  const [selectedInspectEra, setSelectedInspectEra] = useState<HistoricalEra | null>(null);
  const [openedChestId, setOpenedChestId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [petalsEnabled, setPetalsEnabled] = useState(true);

  // Game currency state (stored locally)
  const [energy, setEnergy] = useState(5);
  const [coins, setCoins] = useState(1250);
  const [gems, setGems] = useState(450);

  // Bonus Chest rewards modal
  const [chestModalOpen, setChestModalOpen] = useState(false);
  const [rewardMessage, setRewardMessage] = useState<{ title: string; reward: string; detail: string } | null>(null);

  // Web Audio synthesizer for crisp sound effects
  const playSoundEffect = (type: 'click' | 'chest' | 'star' | 'fanfare') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      } else if (type === 'star') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.26);
      } else if (type === 'chest') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(330, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(587.33, ctx.currentTime + 0.15);
        osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.42);
      }
    } catch {
      // AudioContext fallback
    }
  };

  const handleOpenChest = (id: string, title: string, reward: string, detail: string) => {
    playSoundEffect('chest');
    setOpenedChestId(id);
    setCoins((prev) => prev + 150);
    setGems((prev) => prev + 25);
    setRewardMessage({ title, reward, detail });
    setChestModalOpen(true);
  };

  const handleStationClick = (era: HistoricalEra) => {
    playSoundEffect('star');
    setActiveEraId(era.id);
    setSelectedInspectEra(era);
  };

  const handleEnterStudioWithEra = (era: HistoricalEra) => {
    playSoundEffect('fanfare');
    setSelectedInspectEra(null);
    onSelectStation(era);
  };

  // Mini Popmart Chibi 3D Dolls for each Station
  const renderChibiDoll = (eraId: string, size = 'sm') => {
    const isLg = size === 'lg';
    const containerClasses = isLg
      ? 'w-44 h-52 sm:w-52 sm:h-60'
      : 'w-20 h-24 sm:w-24 sm:h-28';

    switch (eraId) {
      case 'van-lang-au-lac':
        return (
          <div className={`relative ${containerClasses} flex items-center justify-center select-none`}>
            <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md">
              <defs>
                <radialGradient id="vl-skin-hud" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#FFF2E8" />
                  <stop offset="70%" stopColor="#FED8C7" />
                  <stop offset="100%" stopColor="#F5BCA6" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="85" r="50" fill="#261A15" />
              <path d="M60 85 Q50 140 70 170 Q85 140 75 90 Z" fill="#261A15" />
              <path d="M140 85 Q150 140 130 170 Q115 140 125 90 Z" fill="#261A15" />
              <rect x="86" y="125" width="28" height="65" rx="14" fill="#FED8C7" />
              <path d="M85 130 L100 120 L115 130 L118 165 L82 165 Z" fill="#A8572A" />
              <path d="M80 165 L120 165 L126 195 L74 195 Z" fill="#5C4033" />
              <circle cx="100" cy="85" r="42" fill="url(#vl-skin-hud)" />
              <ellipse cx="78" cy="95" rx="10" ry="6" fill="#FF8A8A" opacity="0.6" />
              <ellipse cx="122" cy="95" rx="10" ry="6" fill="#FF8A8A" opacity="0.6" />
              <ellipse cx="84" cy="84" rx="7" ry="9" fill="#1C1816" />
              <circle cx="86" cy="81" r="3" fill="#FFFFFF" />
              <ellipse cx="116" cy="84" rx="7" ry="9" fill="#1C1816" />
              <circle cx="118" cy="81" r="3" fill="#FFFFFF" />
              <path d="M96 98 Q100 102 104 98" stroke="#E56767" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M68 62 Q100 52 132 62" stroke="#D4A373" strokeWidth="4" strokeLinecap="round" fill="none" />
              <circle cx="100" cy="55" r="4" fill="#F3E5AB" />
            </svg>
          </div>
        );

      case 'ly-tran-le':
        return (
          <div className={`relative ${containerClasses} flex items-center justify-center select-none`}>
            <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md">
              <defs>
                <radialGradient id="ltl-skin-hud" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#FFF2E8" />
                  <stop offset="70%" stopColor="#FED8C7" />
                  <stop offset="100%" stopColor="#F5BCA6" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="86" r="48" fill="#171717" />
              <ellipse cx="100" cy="48" rx="20" ry="12" fill="#171717" />
              <circle cx="100" cy="46" r="4" fill="#EAB308" />
              <rect x="85" y="125" width="30" height="85" rx="12" fill="#F2C6C2" />
              <path d="M75 125 L100 155 L125 125 L132 210 L68 210 Z" fill="#991B1B" />
              <path d="M88 125 L100 145 L112 125 L116 190 L84 190 Z" fill="#FDE047" />
              <circle cx="100" cy="86" r="42" fill="url(#ltl-skin-hud)" />
              <ellipse cx="78" cy="96" rx="10" ry="6" fill="#FF8A8A" opacity="0.6" />
              <ellipse cx="122" cy="96" rx="10" ry="6" fill="#FF8A8A" opacity="0.6" />
              <ellipse cx="84" cy="84" rx="7" ry="9" fill="#18181B" />
              <circle cx="86" cy="81" r="3" fill="#FFFFFF" />
              <ellipse cx="116" cy="84" rx="7" ry="9" fill="#18181B" />
              <circle cx="118" cy="81" r="3" fill="#FFFFFF" />
              <path d="M96 99 Q100 103 104 99" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        );

      case 'trieu-nguyen':
        return (
          <div className={`relative ${containerClasses} flex items-center justify-center select-none`}>
            <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md">
              <defs>
                <radialGradient id="tn-skin-hud" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#FFF2E8" />
                  <stop offset="70%" stopColor="#FED8C7" />
                  <stop offset="100%" stopColor="#F5BCA6" />
                </radialGradient>
              </defs>
              <ellipse cx="100" cy="62" rx="42" ry="24" fill="#0D9488" />
              <ellipse cx="100" cy="62" rx="36" ry="19" fill="#14B8A6" />
              <circle cx="100" cy="86" r="46" fill="#18181B" />
              <rect x="85" y="125" width="30" height="85" rx="12" fill="#E0E7FF" />
              <path d="M72 125 Q100 120 128 125 Q135 175 138 215 Q100 216 62 215 Q65 175 72 125 Z" fill="#DC2626" />
              <path d="M86 125 L100 155 L114 125 L116 185 L84 185 Z" fill="#FBBF24" />
              <circle cx="100" cy="86" r="42" fill="url(#tn-skin-hud)" />
              <ellipse cx="78" cy="96" rx="10" ry="6" fill="#FF8A8A" opacity="0.6" />
              <ellipse cx="122" cy="96" rx="10" ry="6" fill="#FF8A8A" opacity="0.6" />
              <ellipse cx="84" cy="84" rx="7" ry="9" fill="#18181B" />
              <circle cx="86" cy="81" r="3" fill="#FFFFFF" />
              <ellipse cx="116" cy="84" rx="7" ry="9" fill="#18181B" />
              <circle cx="118" cy="81" r="3" fill="#FFFFFF" />
              <path d="M96 99 Q100 103 104 99" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        );

      case 'phap-thuoc-dau-xx':
        return (
          <div className={`relative ${containerClasses} flex items-center justify-center select-none`}>
            <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md">
              <defs>
                <radialGradient id="pt-skin-hud" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#FFF2E8" />
                  <stop offset="70%" stopColor="#FED8C7" />
                  <stop offset="100%" stopColor="#F5BCA6" />
                </radialGradient>
              </defs>
              <ellipse cx="106" cy="50" rx="36" ry="14" fill="#374151" transform="rotate(-10 106 50)" />
              <circle cx="106" cy="40" r="3" fill="#1F2937" />
              <circle cx="100" cy="86" r="48" fill="#1C1917" />
              <rect x="85" y="125" width="30" height="85" rx="12" fill="#D9A8A0" />
              <path d="M78 126 Q100 120 122 126 Q126 175 128 215 Q100 216 72 215 Q74 175 78 126 Z" fill="#D9A8A0" />
              <path d="M90 126 Q100 134 110 126" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none" />
              <circle cx="100" cy="86" r="42" fill="url(#pt-skin-hud)" />
              <ellipse cx="78" cy="96" rx="10" ry="6" fill="#FF8A8A" opacity="0.6" />
              <ellipse cx="122" cy="96" rx="10" ry="6" fill="#FF8A8A" opacity="0.6" />
              <ellipse cx="84" cy="84" rx="7" ry="9" fill="#1F2937" />
              <circle cx="86" cy="81" r="3" fill="#FFFFFF" />
              <ellipse cx="116" cy="84" rx="7" ry="9" fill="#1F2937" />
              <circle cx="118" cy="81" r="3" fill="#FFFFFF" />
              <path d="M96 99 Q100 103 104 99" stroke="#991B1B" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        );

      case 'hien-dai':
      default:
        return (
          <div className={`relative ${containerClasses} flex items-center justify-center select-none`}>
            <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md">
              <defs>
                <radialGradient id="hd-skin-hud" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#FFF2E8" />
                  <stop offset="70%" stopColor="#FED8C7" />
                  <stop offset="100%" stopColor="#F5BCA6" />
                </radialGradient>
              </defs>
              <path d="M78 48 L86 28 L98 42 L102 24 L106 42 L118 28 L126 48 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="1.2" />
              <circle cx="100" cy="86" r="48" fill="#111827" />
              <path d="M78 126 Q100 120 122 126 Q128 175 130 215 Q100 216 70 215 Q72 175 78 126 Z" fill="#DC2626" />
              <circle cx="100" cy="160" r="8" fill="#FBBF24" />
              <circle cx="100" cy="86" r="42" fill="url(#hd-skin-hud)" />
              <ellipse cx="78" cy="96" rx="10" ry="6" fill="#FF8A8A" opacity="0.65" />
              <ellipse cx="122" cy="96" rx="10" ry="6" fill="#FF8A8A" opacity="0.65" />
              <ellipse cx="84" cy="84" rx="7.5" ry="9.5" fill="#1E293B" />
              <circle cx="86" cy="81" r="3.2" fill="#FFFFFF" />
              <ellipse cx="116" cy="84" rx="7.5" ry="9.5" fill="#1E293B" />
              <circle cx="118" cy="81" r="3.2" fill="#FFFFFF" />
              <path d="M96 99 Q100 104 104 99" stroke="#E11D48" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0E1A2B] text-stone-100 flex flex-col items-center select-none overflow-x-hidden pb-24">
      {/* 🌸 FALLING PEACH PETALS ANIMATION EFFECT */}
      {petalsEnabled && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          <div className="absolute top-0 left-[10%] w-3 h-3 bg-pink-300/70 rounded-full blur-[0.5px] animate-bounce duration-1000" />
          <div className="absolute top-1/4 left-[30%] w-2.5 h-2 bg-pink-400/60 rounded-full rotate-45 animate-pulse" />
          <div className="absolute top-1/2 left-[75%] w-3.5 h-3 bg-rose-300/70 rounded-full -rotate-12 animate-ping duration-1000" />
          <div className="absolute top-2/3 left-[20%] w-3 h-2 bg-pink-300/80 rounded-full rotate-12" />
          <div className="absolute top-3/4 left-[85%] w-2.5 h-2.5 bg-rose-200/90 rounded-full" />
        </div>
      )}

      {/* ========================================================
          1. TOP GAME HUD HEADER (NHƯ GAME DI SẢN CHUẨN)
          - Trái: Tim/Năng lượng ❤️ 5/5 (+)
          - Giữa: Vàng 🪙 1,250 (+), Ngọc 💎 450 (+)
          - Phải: Sao ⭐ 14/15, Âm thanh 🔊, Cài đặt ⚙️
         ======================================================== */}
      <div className="sticky top-0 z-40 w-full max-w-4xl mx-auto px-3 sm:px-4 pt-2.5 pb-2">
        <div className="bg-[#1C2C48]/90 backdrop-blur-md border-2 border-amber-600/40 rounded-2xl px-3 py-2 shadow-2xl flex items-center justify-between gap-2 sm:gap-4">
          {/* Trái: Năng Lượng / Lượt Chơi */}
          <div className="flex items-center gap-1.5 bg-[#0F1B2E]/90 px-2.5 py-1.5 rounded-xl border border-rose-500/30">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span className="text-xs font-black text-rose-100">{energy}/5</span>
            <button
              onClick={() => {
                playSoundEffect('click');
                setEnergy((prev) => Math.min(prev + 1, 5));
              }}
              className="w-4 h-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center text-[10px] font-black leading-none cursor-pointer active:scale-90 transition-transform ml-0.5"
              title="Hồi phục thể lực"
            >
              +
            </button>
          </div>

          {/* Giữa: Tiền Vàng & Kim Cương Di Sản */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Vàng */}
            <div className="flex items-center gap-1 bg-[#0F1B2E]/90 px-2.5 py-1.5 rounded-xl border border-amber-500/40">
              <span className="text-sm">🪙</span>
              <span className="text-xs font-black text-amber-300 font-mono">
                {coins.toLocaleString()}
              </span>
              <button
                onClick={() => {
                  playSoundEffect('click');
                  setCoins((prev) => prev + 100);
                }}
                className="w-4 h-4 rounded-full bg-amber-500 hover:bg-amber-400 text-amber-950 flex items-center justify-center text-[10px] font-black leading-none cursor-pointer active:scale-90 transition-transform ml-0.5"
                title="Nhận thêm vàng di sản"
              >
                +
              </button>
            </div>

            {/* Ngọc bích / Gems */}
            <div className="flex items-center gap-1 bg-[#0F1B2E]/90 px-2.5 py-1.5 rounded-xl border border-cyan-500/40">
              <span className="text-sm">💎</span>
              <span className="text-xs font-black text-cyan-300 font-mono">
                {gems.toLocaleString()}
              </span>
              <button
                onClick={() => {
                  playSoundEffect('click');
                  setGems((prev) => prev + 50);
                }}
                className="w-4 h-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-cyan-950 flex items-center justify-center text-[10px] font-black leading-none cursor-pointer active:scale-90 transition-transform ml-0.5"
                title="Nạp thêm ngọc"
              >
                +
              </button>
            </div>
          </div>

          {/* Phải: Ngôi Sao & Toggles */}
          <div className="flex items-center gap-1.5">
            {/* Tổng sao đạt được */}
            <div className="hidden sm:flex items-center gap-1 bg-[#0F1B2E]/90 px-2 py-1.5 rounded-xl border border-yellow-500/40 text-yellow-300 text-xs font-black">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span>14/15 ★</span>
            </div>

            {/* Nút bật tắt hoa rơi */}
            <button
              onClick={() => setPetalsEnabled(!petalsEnabled)}
              className={`p-1.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                petalsEnabled
                  ? 'bg-pink-500/20 border-pink-400/50 text-pink-300'
                  : 'bg-stone-800/80 border-stone-700 text-stone-400'
              }`}
              title="Bật/Tắt hiệu ứng hoa đào rơi"
            >
              🌸
            </button>

            {/* Nút âm thanh */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                soundEnabled
                  ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                  : 'bg-stone-800/80 border-stone-700 text-stone-400'
              }`}
              title="Bật/Tắt âm thanh hiệu ứng"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. BIỂN HIỆU HOÀNH PHI SƠN SON THẾP VÀNG TRUNG TÂM
         ======================================================== */}
      <div className="w-full max-w-xl mx-auto px-4 mt-3 mb-1 text-center">
        <div className="relative inline-block px-8 py-3 rounded-2xl bg-gradient-to-r from-[#7A1515] via-[#A81E1E] to-[#7A1515] border-2 border-amber-400/80 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          {/* Viền họa tiết hoa cúc / triều đình cách điệu */}
          <div className="absolute inset-1 rounded-xl border border-amber-300/40 pointer-events-none" />
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-[#7A1515] text-[10px] font-black uppercase tracking-widest shadow-sm">
            BẢN ĐỒ DI SẢN THỜI TRANG VIỆT
          </div>

          <h1 className="text-xl sm:text-2xl font-black font-serif-editorial text-amber-100 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pt-1">
            Hành Trình 5 Mốc Thời Kỳ
          </h1>
          <p className="text-[11px] text-amber-200/90 font-medium mt-0.5">
            Du hành cổ phục • Kiến thức lịch sử • Chấm điểm thuần phong mỹ tục
          </p>
        </div>
      </div>

      {/* ========================================================
          3. SAGA MAP CANVAS (CON ĐƯỜNG ZÍC-ZẮC DI SẢN KỲ VĨ)
          - Background: Núi non trùng điệp (Hạ Long / Tràng An), sương khói
          - Cành đào phai đung đưa góc trên
          - Con đường lát đá vàng lấp lánh nối liền từ Trạm 1 đến Trạm 5
          - Rương báu vật thưởng đặt xen kẽ giữa các trạm
         ======================================================== */}
      <div className="relative w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center">
        {/* Background Canvas: Minh họa cảnh quan sơn thủy di sản */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-35">
          {/* Núi đá vôi Tràng An & Mây lam sương */}
          <div className="absolute top-10 -left-12 w-80 h-80 rounded-full bg-teal-800/40 blur-3xl" />
          <div className="absolute top-1/3 -right-16 w-96 h-96 rounded-full bg-indigo-900/50 blur-3xl" />
          <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-emerald-900/40 blur-3xl" />
          {/* Vầng trăng / Nguyệt môn mờ phía sau */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full border-4 border-amber-300/10 pointer-events-none" />
        </div>

        {/* Cành đào phai đung đưa ở góc trái trên (Lớp tiền cảnh nghệ thuật) */}
        <div className="absolute top-0 -left-4 sm:left-4 z-20 pointer-events-none opacity-90">
          <svg viewBox="0 0 160 120" className="w-32 sm:w-40 h-auto drop-shadow-md">
            <path d="M0 0 Q60 25 120 15 Q140 40 160 30" stroke="#5D3A24" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M70 25 Q90 55 110 50" stroke="#5D3A24" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Hoa đào nở */}
            <circle cx="118" cy="18" r="8" fill="#F472B6" />
            <circle cx="118" cy="18" r="3" fill="#FEF08A" />
            <circle cx="85" cy="40" r="7" fill="#F472B6" />
            <circle cx="85" cy="40" r="2.5" fill="#FEF08A" />
            <circle cx="145" cy="34" r="6.5" fill="#FB7185" />
            <circle cx="50" cy="18" r="6" fill="#F472B6" />
          </svg>
        </div>

        {/* ĐƯỜNG MÒN LÁT ĐÁ VÀNG ZÍC-ZẮC KẾT NỐI 5 TRẠM (SVG Golden Trail) */}
        <svg
          viewBox="0 0 400 1200"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="trail-grad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#EAB308" />
              <stop offset="30%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <filter id="trail-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Sợi tơ vàng phát sáng */}
          <path
            d="M 200 1120 Q 80 980 120 860 T 280 620 T 120 380 T 200 120"
            stroke="url(#trail-grad)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            opacity="0.35"
            filter="url(#trail-glow)"
          />
          {/* Con đường đá vàng hoa văn */}
          <path
            d="M 200 1120 Q 80 980 120 860 T 280 620 T 120 380 T 200 120"
            stroke="url(#trail-grad)"
            strokeWidth="8"
            strokeDasharray="14 10"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
        </svg>

        {/* DANH SÁCH 5 TRẠM DI SẢN (RENDER TỪ TRÊN XUỐNG DƯỚI: TRẠM 5 ĐẾN TRẠM 1) */}
        <div className="relative z-10 w-full flex flex-col items-center gap-14 sm:gap-20 py-6">

          {/* --------------------------------------------------------
              TRẠM 5: THỜI ĐẠI MỚI (ĐƯƠNG ĐẠI & HỘI NHẬP) - ĐỈNH NÚI
             -------------------------------------------------------- */}
          {(() => {
            const era = HISTORICAL_ERAS[4];
            const isSelected = activeEraId === era.id;
            return (
              <div className="relative flex flex-col items-center group w-full max-w-sm">
                {/* Vương miện hoàng gia vàng rực đỉnh tháp */}
                <div className="mb-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-black text-xs shadow-lg animate-pulse">
                  <Crown className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
                  <span>ĐỈNH CAO DI SẢN • QUỐC PHỤC</span>
                </div>

                {/* BẢNG TÊN BẰNG GỖ TRE TRUYỀN THỐNG */}
                <div
                  onClick={() => handleStationClick(era)}
                  className="mb-3 px-4 py-1.5 rounded-xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 border-2 border-amber-400/90 shadow-md text-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                    TRẠM 5 • {era.period}
                  </div>
                  <div className="text-sm sm:text-base font-black text-amber-100 font-serif-editorial">
                    {era.name}
                  </div>
                </div>

                {/* KHUNG CẢNH 3D & MÔ HÌNH BÚP BÊ POPMART */}
                <div
                  onClick={() => handleStationClick(era)}
                  className="relative cursor-pointer flex flex-col items-center group/stage"
                >
                  {/* Búp bê Chibi Quốc phục */}
                  <div className="group-hover/stage:scale-110 transition-transform duration-300">
                    {renderChibiDoll(era.id, 'sm')}
                  </div>

                  {/* BỆ ĐÁ SAO VÀNG 3D CAO CẤP */}
                  <div className="relative -mt-4 w-28 h-14 rounded-[50%] bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 border-4 border-yellow-200 shadow-[0_8px_20px_rgba(245,158,11,0.5)] flex items-center justify-center">
                    <div className="w-20 h-8 rounded-[50%] bg-amber-400 border border-yellow-100 flex items-center justify-center">
                      <Star className="w-6 h-6 fill-yellow-100 text-yellow-100 drop-shadow-sm animate-spin duration-3000" />
                    </div>
                  </div>

                  {/* Nút vào trạm */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStationClick(era);
                    }}
                    className="mt-3 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-stone-950 font-black text-xs shadow-lg uppercase tracking-wide cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>Khám phá trạm 5</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* 🎁 RƯƠNG THƯỞNG 3: BẢO VẬT TRANG SỨC (GIỮA TRẠM 4 & 5) */}
          <div className="relative flex items-center justify-center -my-3">
            <button
              onClick={() =>
                handleOpenChest(
                  'chest-3',
                  'Rương Báu Hoàng Cung',
                  '+200 Vàng & 1 Chuỗi Ngọc Trai Phú Quốc',
                  'Phần thưởng trang sức quý phái dành cho quý cô đài các.'
                )
              }
              className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2 shadow-lg active:scale-90 ${
                openedChestId === 'chest-3'
                  ? 'bg-stone-800/80 border-stone-600 text-stone-400'
                  : 'bg-gradient-to-r from-purple-900 to-indigo-900 border-purple-400 text-purple-200 hover:scale-110 shadow-purple-900/50'
              }`}
            >
              <Gift className="w-5 h-5 text-purple-300 animate-bounce" />
              <span className="text-xs font-black">
                {openedChestId === 'chest-3' ? 'Đã Mở' : 'Mở Rương Báu 🎁'}
              </span>
            </button>
          </div>

          {/* --------------------------------------------------------
              TRẠM 4: HÀ NỘI ĐẦU THẾ KỶ 20 (CẬN ĐẠI) - BIỆT THỰ PHÁP CỔ
             -------------------------------------------------------- */}
          {(() => {
            const era = HISTORICAL_ERAS[3];
            const isSelected = activeEraId === era.id;
            return (
              <div className="relative flex flex-col items-center group w-full max-w-sm sm:translate-x-12">
                {/* BẢNG TÊN GỖ TRE */}
                <div
                  onClick={() => handleStationClick(era)}
                  className="mb-3 px-4 py-1.5 rounded-xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 border-2 border-amber-400/80 shadow-md text-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                    TRẠM 4 • {era.period}
                  </div>
                  <div className="text-sm sm:text-base font-black text-amber-100 font-serif-editorial">
                    {era.name}
                  </div>
                </div>

                {/* BÚP BÊ POPMART VÀ BỆ ĐÁ */}
                <div
                  onClick={() => handleStationClick(era)}
                  className="relative cursor-pointer flex flex-col items-center group/stage"
                >
                  {/* Búp bê Chibi Áo Dài Lemur Cát Tường */}
                  <div className="group-hover/stage:scale-110 transition-transform duration-300">
                    {renderChibiDoll(era.id, 'sm')}
                  </div>

                  {/* BỆ ĐÁ LÁT ĐÁ KIỂU PHÁP */}
                  <div className="relative -mt-4 w-28 h-14 rounded-[50%] bg-gradient-to-b from-stone-400 via-stone-600 to-stone-800 border-4 border-stone-300 shadow-[0_8px_20px_rgba(0,0,0,0.5)] flex items-center justify-center">
                    <div className="w-20 h-8 rounded-[50%] bg-stone-500 border border-stone-300 flex items-center justify-center">
                      <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStationClick(era);
                    }}
                    className="mt-3 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-stone-200 to-stone-300 hover:bg-white text-stone-900 font-black text-xs shadow-md uppercase tracking-wide cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>Vào Trạm 4</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* 🎁 RƯƠNG THƯỞNG 2: CÂU ĐỐ DI SẢN (GIỮA TRẠM 3 & 4) */}
          <div className="relative flex items-center justify-center -my-3">
            <button
              onClick={() =>
                handleOpenChest(
                  'chest-2',
                  'Hộp Quà Di Sản Hà Thành',
                  '+150 Vàng & Khăn Lụa Vạn Phúc Cổ Truyền',
                  'Mảnh lụa tơ tằm dệt hoa tinh xảo từ làng nghề truyền thống.'
                )
              }
              className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2 shadow-lg active:scale-90 ${
                openedChestId === 'chest-2'
                  ? 'bg-stone-800/80 border-stone-600 text-stone-400'
                  : 'bg-gradient-to-r from-amber-900 to-rose-900 border-amber-400 text-amber-200 hover:scale-110 shadow-amber-900/50'
              }`}
            >
              <Gift className="w-5 h-5 text-amber-300 animate-bounce" />
              <span className="text-xs font-black">
                {openedChestId === 'chest-2' ? 'Đã Mở' : 'Mở Rương Lụa 🎁'}
              </span>
            </button>
          </div>

          {/* --------------------------------------------------------
              TRẠM 3: KINH ĐÔ HUẾ (TRIỀU NGUYỄN) - CỔNG NGỌ MÔN
             -------------------------------------------------------- */}
          {(() => {
            const era = HISTORICAL_ERAS[2];
            const isSelected = activeEraId === era.id;
            return (
              <div className="relative flex flex-col items-center group w-full max-w-sm sm:-translate-x-12">
                {/* BẢNG TÊN GỖ TRE */}
                <div
                  onClick={() => handleStationClick(era)}
                  className="mb-3 px-4 py-1.5 rounded-xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 border-2 border-amber-400/90 shadow-md text-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                    TRẠM 3 • {era.period}
                  </div>
                  <div className="text-sm sm:text-base font-black text-amber-100 font-serif-editorial">
                    {era.name}
                  </div>
                </div>

                {/* BÚP BÊ POPMART VÀ BỆ ĐÁ */}
                <div
                  onClick={() => handleStationClick(era)}
                  className="relative cursor-pointer flex flex-col items-center group/stage"
                >
                  {/* Búp bê Chibi Áo Nhật Bình & Khăn Vành */}
                  <div className="group-hover/stage:scale-110 transition-transform duration-300">
                    {renderChibiDoll(era.id, 'sm')}
                  </div>

                  {/* BỆ ĐÁ HOÀNG GIA TRIỀU ĐÌNH HUẾ */}
                  <div className="relative -mt-4 w-28 h-14 rounded-[50%] bg-gradient-to-b from-red-600 via-red-800 to-amber-900 border-4 border-amber-400 shadow-[0_8px_20px_rgba(220,38,38,0.5)] flex items-center justify-center">
                    <div className="w-20 h-8 rounded-[50%] bg-red-700 border border-amber-300 flex items-center justify-center">
                      <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStationClick(era);
                    }}
                    className="mt-3 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs shadow-md uppercase tracking-wide cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>Vào Trạm 3</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* 🎁 RƯƠNG THƯỞNG 1: BÁU VẬT LÝ - TRẦN (GIỮA TRẠM 2 & 3) */}
          <div className="relative flex items-center justify-center -my-3">
            <button
              onClick={() =>
                handleOpenChest(
                  'chest-1',
                  'Rương Cẩm Thạch Đại Việt',
                  '+120 Vàng & 1 Trâm Cài Tóc Hoa Sen Cổ',
                  'Trâm cài bằng ngọc bích chạm khắc hoa sen thanh khiết thời Lý.'
                )
              }
              className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2 shadow-lg active:scale-90 ${
                openedChestId === 'chest-1'
                  ? 'bg-stone-800/80 border-stone-600 text-stone-400'
                  : 'bg-gradient-to-r from-emerald-900 to-teal-900 border-emerald-400 text-emerald-200 hover:scale-110 shadow-emerald-900/50'
              }`}
            >
              <Gift className="w-5 h-5 text-emerald-300 animate-bounce" />
              <span className="text-xs font-black">
                {openedChestId === 'chest-1' ? 'Đã Mở' : 'Mở Rương Báu 🎁'}
              </span>
            </button>
          </div>

          {/* --------------------------------------------------------
              TRẠM 2: HÀO KHÍ ĐẠI VIỆT (LÝ - TRẦN - LÊ) - MÁI ĐÌNH CỔ
             -------------------------------------------------------- */}
          {(() => {
            const era = HISTORICAL_ERAS[1];
            const isSelected = activeEraId === era.id;
            return (
              <div className="relative flex flex-col items-center group w-full max-w-sm sm:translate-x-10">
                {/* BẢNG TÊN GỖ TRE */}
                <div
                  onClick={() => handleStationClick(era)}
                  className="mb-3 px-4 py-1.5 rounded-xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 border-2 border-amber-400/90 shadow-md text-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                    TRẠM 2 • {era.period}
                  </div>
                  <div className="text-sm sm:text-base font-black text-amber-100 font-serif-editorial">
                    {era.name}
                  </div>
                </div>

                {/* BÚP BÊ POPMART VÀ BỆ ĐÁ */}
                <div
                  onClick={() => handleStationClick(era)}
                  className="relative cursor-pointer flex flex-col items-center group/stage"
                >
                  {/* Búp bê Chibi Áo Giao Lĩnh */}
                  <div className="group-hover/stage:scale-110 transition-transform duration-300">
                    {renderChibiDoll(era.id, 'sm')}
                  </div>

                  {/* BỆ ĐÁ NGỌC BÍCH ĐẠI VIỆT */}
                  <div className="relative -mt-4 w-28 h-14 rounded-[50%] bg-gradient-to-b from-teal-500 via-emerald-700 to-teal-900 border-4 border-emerald-300 shadow-[0_8px_20px_rgba(16,185,129,0.5)] flex items-center justify-center">
                    <div className="w-20 h-8 rounded-[50%] bg-teal-600 border border-emerald-200 flex items-center justify-center">
                      <Star className="w-5 h-5 fill-yellow-200 text-yellow-200" />
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStationClick(era);
                    }}
                    className="mt-3 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-black text-xs shadow-md uppercase tracking-wide cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>Vào Trạm 2</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* --------------------------------------------------------
              TRẠM 1: KHỞI NGUYÊN VĂN LANG - ÂU LẠC - ĐIỂM XUẤT PHÁT
             -------------------------------------------------------- */}
          {(() => {
            const era = HISTORICAL_ERAS[0];
            const isSelected = activeEraId === era.id;
            return (
              <div className="relative flex flex-col items-center group w-full max-w-sm pt-4">
                {/* NÚT BẮT ĐẦU VIBRANT FLOATING BANNER (NHƯ ẢNH GỐC CỦA BẠN) */}
                <div className="mb-2 animate-bounce">
                  <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white px-5 py-2 rounded-2xl font-black text-sm uppercase tracking-wider shadow-[0_4px_15px_rgba(16,185,129,0.6)] border-2 border-emerald-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                    <span>BẮT ĐẦU TẠI ĐÂY</span>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-emerald-600 rotate-45" />
                  </div>
                </div>

                {/* BẢNG TÊN GỖ TRE */}
                <div
                  onClick={() => handleStationClick(era)}
                  className="mb-3 px-4 py-1.5 rounded-xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 border-2 border-amber-400/90 shadow-md text-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                    TRẠM 1 • {era.period}
                  </div>
                  <div className="text-sm sm:text-base font-black text-amber-100 font-serif-editorial">
                    {era.name}
                  </div>
                </div>

                {/* BÚP BÊ POPMART VÀ BỆ ĐÁ SAO XANH 3D NỔI BẬT */}
                <div
                  onClick={() => handleStationClick(era)}
                  className="relative cursor-pointer flex flex-col items-center group/stage"
                >
                  {/* Búp bê Chibi Đông Sơn */}
                  <div className="group-hover/stage:scale-110 transition-transform duration-300">
                    {renderChibiDoll(era.id, 'sm')}
                  </div>

                  {/* BỆ ĐÁ SAO XANH LỤC 3D VÒNG NGUYỆT QUẾ ĐẶC TRƯNG */}
                  <div className="relative -mt-4 w-32 h-16 rounded-[50%] bg-gradient-to-b from-emerald-400 via-emerald-600 to-emerald-900 border-4 border-emerald-200 shadow-[0_10px_25px_rgba(16,185,129,0.6)] flex items-center justify-center">
                    <div className="w-24 h-9 rounded-[50%] bg-emerald-500 border border-emerald-100 flex items-center justify-center">
                      <Star className="w-7 h-7 fill-yellow-300 text-yellow-300 drop-shadow-md animate-pulse" />
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStationClick(era);
                    }}
                    className="mt-3 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm shadow-xl uppercase tracking-wide cursor-pointer active:scale-95 transition-all flex items-center gap-2"
                  >
                    <span>Vào phối đồ Trạm 1</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ========================================================
          4. MODAL CHI TIẾT TRẠM DI SẢN (STATION INSPECT MODAL)
          Mở khi bấm vào bất kỳ trạm nào trên bản đồ:
          - Búp bê 3D Popmart lớn
          - Đánh giá sao thuần phong mỹ tục
          - 3 trụ cột lịch sử & Công thức phối đồ
          - Nút "Vào phòng phối đồ (Studio)" & "Nhận diện AI"
         ======================================================== */}
      {selectedInspectEra && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#18233C] border-2 border-amber-400/80 rounded-3xl p-5 sm:p-6 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
            {/* Nút đóng */}
            <button
              onClick={() => setSelectedInspectEra(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Modal */}
            <div className="flex items-center gap-3 border-b border-white/15 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-600 flex items-center justify-center text-xl font-black text-white shadow-md">
                T.{selectedInspectEra.stationNumber}
              </div>
              <div>
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  {selectedInspectEra.period}
                </div>
                <h2 className="text-xl font-black font-serif-editorial text-white">
                  {selectedInspectEra.name}
                </h2>
              </div>
            </div>

            {/* Preview Búp bê Chibi 3D & Chấm sao Thuần phong mỹ tục */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 items-center">
              <div className="bg-[#0F1B2E] rounded-2xl p-3 border border-amber-400/30 flex flex-col items-center justify-center shadow-inner">
                {renderChibiDoll(selectedInspectEra.id, 'lg')}
                <div className="text-[11px] text-amber-300 font-bold mt-1 text-center">
                  Búp Bê Nghệ Thuật Chibi 1:2.8
                </div>
              </div>

              <div className="space-y-3">
                {/* Chấm điểm sao thuần phong mỹ tục */}
                <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-3">
                  <div className="flex items-center gap-1 text-yellow-400 mb-1">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span className="text-xs font-black text-white ml-1.5">5/5 Sao Chuẩn Mực</span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-snug">
                    Bảo đảm tính kín đáo, đoan trang và thuần phong mỹ tục phụ nữ Việt Nam qua các thời kỳ.
                  </p>
                </div>

                {/* Công thức phối đồ đặc trưng */}
                <div className="bg-amber-950/50 border border-amber-500/30 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-amber-300 uppercase">
                    Công thức phối đồ:
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {selectedInspectEra.stylingSuggestion.title}
                  </div>
                  <p className="text-[11px] text-stone-300 mt-1 line-clamp-2">
                    {selectedInspectEra.stylingSuggestion.formula}
                  </p>
                </div>
              </div>
            </div>

            {/* Bối cảnh 3 trụ cột lịch sử tóm tắt */}
            <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 text-xs space-y-2 mb-5">
              <div className="text-stone-300">
                <span className="font-bold text-amber-200">🏛️ Chính trị: </span>
                {selectedInspectEra.politicalWill}
              </div>
              <div className="text-stone-300">
                <span className="font-bold text-teal-200">🌐 Ngoại giao: </span>
                {selectedInspectEra.culturalExchange}
              </div>
              <div className="text-stone-300">
                <span className="font-bold text-emerald-200">🌿 Lối sống: </span>
                {selectedInspectEra.economicAndLifestyle}
              </div>
            </div>

            {/* Các nút hành động chính */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => handleEnterStudioWithEra(selectedInspectEra)}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-600 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <span>VÀO PHÒNG PHỐI ĐỒ (STUDIO)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          5. MODAL MỞ RƯƠNG THƯỞNG (CHEST REWARD MODAL)
         ======================================================== */}
      {chestModalOpen && rewardMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-sm bg-gradient-to-b from-[#251A3A] to-[#120F24] border-2 border-amber-400 rounded-3xl p-6 text-center text-white shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 mx-auto flex items-center justify-center mb-3">
              <Gift className="w-8 h-8 text-amber-300 animate-bounce" />
            </div>

            <h3 className="text-xl font-black font-serif-editorial text-amber-200">
              {rewardMessage.title}
            </h3>
            <div className="my-3 py-2 px-3 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 font-black text-sm">
              🎉 {rewardMessage.reward}
            </div>
            <p className="text-xs text-stone-300 leading-relaxed mb-5">
              {rewardMessage.detail}
            </p>

            <button
              onClick={() => {
                playSoundEffect('click');
                setChestModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-black text-sm cursor-pointer shadow-lg active:scale-95 transition-all"
            >
              Nhận Thưởng Ngay
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          6. BOTTOM GAME DOCK NAVIGATION BAR (THANH ĐIỀU HƯỚNG GAME DƯỚI CÙNG)
          5 Nút game tròn nổi bật:
          - 🗺️ Bản Đồ Di Sản (Active)
          - 👗 Phòng Phối Đồ (Vào Studio)
          - 🏆 Chuẩn Mực & Đánh Giá (Mở Modal Chuẩn Mực)
          - 📷 Nhận Diện Ảnh AI (Mở Modal Nhận Diện)
          - 🎁 Kho Báu & Rương Thưởng
         ======================================================== */}
      <div className="fixed bottom-3 inset-x-0 z-40 max-w-lg mx-auto px-4">
        <div className="bg-[#18233C]/95 backdrop-blur-lg border-2 border-amber-500/50 rounded-3xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-around">
          {/* Nút 1: Bản Đồ (Đang chọn) */}
          <button
            onClick={() => playSoundEffect('click')}
            className="flex flex-col items-center py-1 px-2.5 rounded-2xl bg-rose-600/30 text-rose-300 border border-rose-400/40 cursor-pointer transition-transform active:scale-90"
          >
            <Compass className="w-5 h-5 text-rose-400" />
            <span className="text-[10px] font-black mt-0.5">Bản Đồ</span>
          </button>

          {/* Nút 2: Phòng Phối Đồ */}
          <button
            onClick={() => {
              playSoundEffect('fanfare');
              const era = HISTORICAL_ERAS.find((e) => e.id === activeEraId) || HISTORICAL_ERAS[1];
              onSelectStation(era);
            }}
            className="flex flex-col items-center py-1 px-2.5 rounded-2xl hover:bg-white/10 text-stone-300 hover:text-white cursor-pointer transition-transform active:scale-90"
          >
            <Shirt className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] font-bold mt-0.5">Phòng Đồ</span>
          </button>

          {/* Nút 3: Chuẩn Mực & Đánh Giá */}
          <button
            onClick={() => {
              playSoundEffect('click');
              if (onOpenStandards) onOpenStandards();
            }}
            className="flex flex-col items-center py-1 px-2.5 rounded-2xl hover:bg-white/10 text-stone-300 hover:text-white cursor-pointer transition-transform active:scale-90"
          >
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-[10px] font-bold mt-0.5">Chuẩn Mực</span>
          </button>

          {/* Nút 4: Kiến Thức Lịch Sử */}
          {onOpenKnowledge && (
            <button
              onClick={() => {
                playSoundEffect('click');
                onOpenKnowledge();
              }}
              className="flex flex-col items-center py-1 px-2.5 rounded-2xl hover:bg-white/10 text-stone-300 hover:text-white cursor-pointer transition-transform active:scale-90"
            >
              <BookOpen className="w-5 h-5 text-amber-300" />
              <span className="text-[10px] font-bold mt-0.5">Kiến Thức</span>
            </button>
          )}

          {/* Nút 5: Rương Quà */}
          <button
            onClick={() => {
              playSoundEffect('chest');
              handleOpenChest(
                'chest-bottom',
                'Quà Đăng Nhập Di Sản',
                '+100 Vàng & 1 Mảnh Tơ Tằm Cổ',
                'Quà tặng hàng ngày dành cho nhà thiết kế di sản văn hóa Việt.'
              );
            }}
            className="flex flex-col items-center py-1 px-2.5 rounded-2xl hover:bg-white/10 text-stone-300 hover:text-white cursor-pointer transition-transform active:scale-90"
          >
            <Gift className="w-5 h-5 text-pink-400" />
            <span className="text-[10px] font-bold mt-0.5">Rương Quà</span>
          </button>
        </div>
      </div>
    </div>
  );
}
