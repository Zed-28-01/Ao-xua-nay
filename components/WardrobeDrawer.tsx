'use client';

import React, { useState } from 'react';
import {
  WARDROBE_CATALOG,
  PRESET_OUTFITS,
  WardrobeItem,
  HistoricalEra,
} from '@/data/historical-data';
import {
  Check,
  Search,
  AlertTriangle,
  Sparkles,
  Filter,
  Shirt,
  Footprints,
  Crown,
  Heart,
} from 'lucide-react';

interface WardrobeDrawerProps {
  selectedItems: WardrobeItem[];
  onToggleItem: (item: WardrobeItem) => void;
  onApplyPreset: (presetId: string) => void;
  currentEra: HistoricalEra;
  activePresetMode?: boolean;
}

type CategoryTab =
  | 'all'
  | 'hair'
  | 'outerwear'
  | 'innerwear'
  | 'bottom'
  | 'footwear'
  | 'motif'
  | 'accessories'
  | 'presets';

export function WardrobeDrawer({
  selectedItems,
  onToggleItem,
  onApplyPreset,
  currentEra,
  activePresetMode = false,
}: WardrobeDrawerProps) {
  const [activeTab, setActiveTab] = useState<CategoryTab>(
    activePresetMode ? 'presets' : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEraOnly, setFilterEraOnly] = useState<boolean>(false);

  // Filter items
  const filteredItems = WARDROBE_CATALOG.filter((item) => {
    if (activeTab !== 'all' && activeTab !== 'presets' && item.category !== activeTab) {
      return false;
    }
    if (filterEraOnly && item.eraId && item.eraId !== currentEra.id) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.styleTag.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const isSelected = (itemId: string) =>
    selectedItems.some((i) => i.id === itemId);

  return (
    <div className="relative w-full h-[640px] sm:h-[720px] rounded-3xl overflow-hidden shadow-lg border border-amber-950/15 bg-[#FFFBF5]/95 backdrop-blur-md flex flex-col justify-between">
      {/* 1. TOP HEADER: TITLE & SEARCH */}
      <div className="p-4 border-b border-amber-900/10 bg-gradient-to-b from-[#FFF7ED] to-[#FFFBF5]">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-800 font-serif-editorial">
              Tủ Đồ Việt Phục (Wardrobe Rack)
            </h2>
          </div>

          <button
            onClick={() => setFilterEraOnly(!filterEraOnly)}
            className={`flex items-center gap-1 px-2.5 py-1 text-[11px] rounded-full transition-colors border ${
              filterEraOnly
                ? 'bg-[#991B1B] text-white border-[#991B1B] font-semibold'
                : 'bg-white text-stone-600 border-amber-900/15 hover:bg-stone-50'
            }`}
          >
            <Filter className="w-3 h-3" />
            <span>Thời {currentEra.name}</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm áo, hoa văn, hài thêu..."
            className="w-full text-xs pl-8 pr-3 py-1.5 bg-white border border-amber-900/15 rounded-xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-rose-400"
          />
        </div>
      </div>

      {/* 2. CATEGORY ICON TABS (Horizontal scrolling dock) */}
      <div className="px-3 py-2 border-b border-amber-900/10 bg-[#FAF1E4]/60 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
            activeTab === 'all'
              ? 'bg-rose-500 text-white font-bold shadow-2xs'
              : 'bg-white/80 text-stone-700 hover:bg-white'
          }`}
        >
          Tất cả
        </button>

        <button
          onClick={() => setActiveTab('hair')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium flex items-center gap-1 ${
            activeTab === 'hair'
              ? 'bg-rose-500 text-white font-bold shadow-2xs'
              : 'bg-white/80 text-stone-700 hover:bg-white'
          }`}
        >
          <Crown className="w-3 h-3" />
          <span>Tóc/Mấn</span>
        </button>

        <button
          onClick={() => setActiveTab('outerwear')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium flex items-center gap-1 ${
            activeTab === 'outerwear'
              ? 'bg-rose-500 text-white font-bold shadow-2xs'
              : 'bg-white/80 text-stone-700 hover:bg-white'
          }`}
        >
          <Shirt className="w-3 h-3" />
          <span>Áo khoác</span>
        </button>

        <button
          onClick={() => setActiveTab('innerwear')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
            activeTab === 'innerwear'
              ? 'bg-rose-500 text-white font-bold shadow-2xs'
              : 'bg-white/80 text-stone-700 hover:bg-white'
          }`}
        >
          Áo trong
        </button>

        <button
          onClick={() => setActiveTab('bottom')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
            activeTab === 'bottom'
              ? 'bg-rose-500 text-white font-bold shadow-2xs'
              : 'bg-white/80 text-stone-700 hover:bg-white'
          }`}
        >
          Quần/Váy
        </button>

        <button
          onClick={() => setActiveTab('footwear')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium flex items-center gap-1 ${
            activeTab === 'footwear'
              ? 'bg-rose-500 text-white font-bold shadow-2xs'
              : 'bg-white/80 text-stone-700 hover:bg-white'
          }`}
        >
          <Footprints className="w-3 h-3" />
          <span>Giày hài</span>
        </button>

        <button
          onClick={() => setActiveTab('motif')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
            activeTab === 'motif'
              ? 'bg-rose-500 text-white font-bold shadow-2xs'
              : 'bg-white/80 text-stone-700 hover:bg-white'
          }`}
        >
          Hoa văn
        </button>

        <button
          onClick={() => setActiveTab('accessories')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
            activeTab === 'accessories'
              ? 'bg-rose-500 text-white font-bold shadow-2xs'
              : 'bg-white/80 text-stone-700 hover:bg-white'
          }`}
        >
          Phụ kiện
        </button>

        <button
          onClick={() => setActiveTab('presets')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium flex items-center gap-1 ${
            activeTab === 'presets'
              ? 'bg-[#991B1B] text-white font-bold shadow-2xs'
              : 'bg-rose-100/70 text-rose-800 hover:bg-rose-100'
          }`}
        >
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Gợi ý bộ</span>
        </button>
      </div>

      {/* 3. VERTICAL SCROLLABLE RACK: NIKKI GAME STYLE CARDS */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {activeTab === 'presets' ? (
          /* PRESET PACKS */
          <div className="space-y-3">
            <div className="text-xs text-stone-500 mb-1">
              Chọn nguyên bộ trang phục theo thời kỳ hoặc thử nghiệm hàng rào cấm kỵ:
            </div>
            {PRESET_OUTFITS.map((preset) => {
              const isTaboo = preset.id.includes('taboo');
              return (
                <div
                  key={preset.id}
                  className={`p-3.5 rounded-2xl border transition-all text-left relative overflow-hidden ${
                    isTaboo
                      ? 'bg-red-50/70 border-red-200 hover:border-red-300'
                      : 'bg-white/90 border-amber-900/10 hover:border-amber-900/30 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span
                        className={`text-xs font-bold block ${
                          isTaboo ? 'text-red-800' : 'text-stone-900'
                        }`}
                      >
                        {preset.name}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                        <span>{preset.eventContext}</span>
                        <span aria-hidden="true">·</span>
                        <span>{preset.styleName}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onApplyPreset(preset.id)}
                      className={`px-3 py-1 text-xs font-bold rounded-full shrink-0 shadow-2xs transition-colors ${
                        isTaboo
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white'
                      }`}
                    >
                      Mặc bộ này
                    </button>
                  </div>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {preset.description}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          /* FASHION ITEMS STACK - EXACT LOVE NIKKI STYLE */
          filteredItems.map((item, index) => {
            const selected = isSelected(item.id);
            const isTaboo = item.isTabooForStreetwear;
            const itemNum = item.itemNumber || index + 1;
            const heartsCount = item.hearts || 5;

            return (
              <div
                key={item.id}
                onClick={() => onToggleItem(item)}
                className={`group relative p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  selected
                    ? 'bg-white border-rose-400 shadow-sm ring-2 ring-rose-300/40'
                    : 'bg-white/80 border-amber-900/10 hover:bg-white hover:border-amber-900/25 shadow-2xs'
                }`}
              >
                {/* Left Number Tag (Like 2, 3, 4, 5 in screenshot) */}
                <div className="text-xs font-bold text-stone-400 font-mono w-4 shrink-0 text-center">
                  {itemNum}
                </div>

                {/* Center Item Illustration & Name */}
                <div className="flex-1 flex flex-col items-center text-center px-1">
                  {/* Swatch / Mini Thumbnail */}
                  <div className="relative w-12 h-12 rounded-xl bg-amber-50 border border-amber-900/10 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform shadow-inner">
                    <span
                      className="w-7 h-7 rounded-lg shadow-2xs transition-transform"
                      style={{ backgroundColor: item.color }}
                    />
                    {isTaboo && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        !
                      </span>
                    )}
                    {currentEra.stylingSuggestion.presetItemIds.includes(item.id) && (
                      <span className="absolute -bottom-1.5 inset-x-0 mx-auto text-[8px] font-bold text-amber-900 bg-amber-200/95 rounded px-1 shadow-2xs border border-amber-400 whitespace-nowrap">
                        ⭐ Gợi ý
                      </span>
                    )}
                  </div>

                  {/* Red Hearts Rating (Exact match to screenshot) */}
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {Array.from({ length: heartsCount }).map((_, i) => (
                      <Heart
                        key={i}
                        className="w-2.5 h-2.5 fill-rose-500 text-rose-500"
                      />
                    ))}
                  </div>

                  {/* Item Name */}
                  <div className="text-xs font-bold text-stone-800 leading-tight">
                    {item.name}
                  </div>

                  {/* Cultural Tag */}
                  <div className="text-[10px] text-stone-400 mt-0.5">
                    {item.styleTag}
                  </div>
                </div>

                {/* Right Circular Red Checkmark (Exact match to screenshot checkmark) */}
                <div className="w-8 shrink-0 flex items-center justify-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      selected
                        ? 'bg-[#E11D48] text-white shadow-xs scale-105'
                        : 'border-2 border-stone-200 text-transparent group-hover:border-stone-300'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                {/* Cultural Taboo Alert Ribbon */}
                {isTaboo && (
                  <div className="absolute top-2 left-8 flex items-center gap-1 text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-md border border-red-200">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    <span>Cấm kỵ hoàng đế</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 4. BOTTOM BAR: Current Outfit Count */}
      <div className="p-3 border-t border-amber-900/10 bg-white/70 text-[11px] text-stone-500 flex items-center justify-between">
        <span>Tổng kho: {WARDROBE_CATALOG.length} món Việt phục</span>
        <span className="font-semibold text-rose-600">Đã chọn: {selectedItems.length}</span>
      </div>
    </div>
  );
}
