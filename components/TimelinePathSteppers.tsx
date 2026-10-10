'use client';

import React from 'react';
import { HISTORICAL_ERAS, HistoricalEra } from '@/data/historical-data';
import { Star, Crown, ChevronRight, Check } from 'lucide-react';

interface TimelinePathSteppersProps {
  selectedEra: HistoricalEra;
  onSelectEra: (era: HistoricalEra) => void;
}

export function TimelinePathSteppers({
  selectedEra,
  onSelectEra,
}: TimelinePathSteppersProps) {
  // S-curve offsets for the 5 stepping stones to mimic Duolingo path
  const curveOffsets = [
    'translate-x-0', // Center 1
    'translate-x-6 sm:translate-x-10', // Right 2
    '-translate-x-6 sm:-translate-x-10', // Left 3
    'translate-x-4 sm:translate-x-8', // Right 4
    'translate-x-0', // Center 5 (Crown)
  ];

  return (
    <div className="bg-[#FFFDF9] border border-amber-950/15 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
      {/* Top Unit Banner (Duolingo Style Green / Amber Banner) */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white rounded-2xl p-4 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
              Hành Trình Thời Gian
            </span>
            <span className="text-xs text-emerald-200">
              Trạm {selectedEra.stationNumber} / 5
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-bold font-serif-editorial mt-1 tracking-wide">
            {selectedEra.stationTitle}
          </h2>
          <p className="text-xs text-emerald-100/90 mt-0.5 line-clamp-1">
            {selectedEra.tagline}
          </p>
        </div>

        <button
          onClick={() => {
            const nextIdx = (selectedEra.stationNumber % 5);
            onSelectEra(HISTORICAL_ERAS[nextIdx]);
          }}
          className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 bg-white text-emerald-900 font-bold text-xs rounded-xl hover:bg-emerald-50 active:scale-95 transition-all shadow-xs"
        >
          <span>Trạm tiếp theo</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Duolingo Style Stepping Stones Interactive Path */}
      <div className="py-2 flex flex-col items-center gap-3 relative select-none">
        {/* Winding Connecting Line in background */}
        <div className="absolute top-8 bottom-8 w-1.5 bg-stone-200 rounded-full z-0" />

        {HISTORICAL_ERAS.map((era, index) => {
          const isSelected = era.id === selectedEra.id;
          const isCompleted = era.stationNumber < selectedEra.stationNumber;
          const isCrown = era.stationNumber === 5;
          const offsetClass = curveOffsets[index] || 'translate-x-0';

          return (
            <div
              key={era.id}
              className={`relative z-10 flex flex-col items-center transition-transform ${offsetClass}`}
            >
              {/* START / ACTIVE TOOLTIP BADGE */}
              {isSelected && (
                <div className="mb-1.5 animate-bounce">
                  <span className="px-2.5 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm border border-white">
                    ĐANG CHỌN
                  </span>
                </div>
              )}

              {/* Stepping Stone Button */}
              <button
                onClick={() => onSelectEra(era)}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-200 group active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 ring-4 ring-emerald-200 ring-offset-2 shadow-lg text-white'
                    : isCompleted
                    ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-white shadow-md hover:brightness-105'
                    : 'bg-gradient-to-b from-stone-100 to-stone-300 text-stone-500 border border-stone-300 shadow-sm hover:from-stone-200 hover:to-stone-400'
                }`}
                title={era.stationTitle}
              >
                {/* 3D button rim effect */}
                <span className="absolute inset-x-2 top-1.5 h-3 bg-white/30 rounded-t-full pointer-events-none" />

                {isCrown ? (
                  <Crown
                    className={`w-7 h-7 sm:w-8 sm:h-8 ${
                      isSelected
                        ? 'text-amber-200 animate-pulse'
                        : isCompleted
                        ? 'text-amber-100'
                        : 'text-stone-400'
                    }`}
                  />
                ) : isCompleted ? (
                  <Check className="w-6 h-6 stroke-[3] text-white" />
                ) : (
                  <Star
                    className={`w-6 h-6 sm:w-7 sm:h-7 ${
                      isSelected ? 'fill-white text-white' : 'fill-stone-400 text-stone-400'
                    }`}
                  />
                )}
              </button>

              {/* Station Label beneath stone */}
              <div className="mt-1 text-center max-w-[120px]">
                <span
                  className={`text-[11px] font-bold block truncate leading-tight ${
                    isSelected ? 'text-emerald-800' : 'text-stone-600'
                  }`}
                >
                  {era.name}
                </span>
                <span className="text-[10px] text-stone-400 block truncate">
                  {era.century}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
