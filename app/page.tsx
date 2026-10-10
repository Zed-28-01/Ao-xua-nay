'use client';

import React, { useState, useCallback, useTransition } from 'react';
import { Header } from '@/components/Header';
import { StationSelectionMap } from '@/components/StationSelectionMap';
import { NikkiDressUpStage } from '@/components/NikkiDressUpStage';
import { CulturalInfoCard } from '@/components/CulturalInfoCard';
import { CulturalInfoModal } from '@/components/CulturalInfoModal';
import { HistoricalEraMatrix } from '@/components/HistoricalEraMatrix';
import { CulturalStandardsSection } from '@/components/CulturalStandardsModal';
import { HeritageCollectorCardModal } from '@/components/HeritageCollectorCardModal';
import {
  HISTORICAL_ERAS,
  WARDROBE_CATALOG,
  PRESET_OUTFITS,
  HistoricalEra,
  WardrobeItem,
} from '@/data/historical-data';
import { ArrowLeft } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'studio' | 'matrix' | 'about'>('studio');
  const [isCulturalModalOpen, setIsCulturalModalOpen] = useState(false);
  const [isCollectorCardOpen, setIsCollectorCardOpen] = useState(false);

  // Workflow state:
  // Ban đầu CHỈ hiển thị giao diện các trạm dạng full-screen (bỏ nền phía trên).
  // Khi click vào 1 trạm mới mở Studio (người mẫu + bối cảnh + gợi ý + tủ đồ).
  const [isStudioView, setIsStudioView] = useState(false);

  // Trạng thái đã phối đồ xong hay chưa:
  // "bên dưới phần : 'đối chiếu văn hoá' chỉ hiển thị khi đã phối đồ xong"
  const [isOutfitCompleted, setIsOutfitCompleted] = useState(false);

  // Studio State - Defaults to Station 2 (Lý - Trần - Lê) khi được chọn
  const [selectedEra, setSelectedEra] = useState<HistoricalEra>(HISTORICAL_ERAS[1]);
  const [eventContext, setEventContext] = useState<string>('Dạo phố cuối tuần');
  const [selectedStyle, setSelectedStyle] = useState<string>('Streetwear Layering');

  // Selected items on mannequin - Bắt đầu model chỉ mặc đồ ở nhà (áo ba lỗ trắng & quần short xám)
  const [selectedItems, setSelectedItems] = useState<WardrobeItem[]>([]);

  // Cultural Guardrail & Info Card State
  const [historicalInfo, setHistoricalInfo] = useState<string | null>(null);
  const [isAppropriate, setIsAppropriate] = useState<boolean | null>(null);
  const [culturalWarning, setCulturalWarning] = useState<string | null>(null);
  const [culturalStars, setCulturalStars] = useState<number | null>(null);
  const [decencyExplanation, setDecencyExplanation] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  // Call POST /api/ai/analyze-outfit
  const handleAnalyzeOutfit = useCallback(
    async (itemsToAnalyze: WardrobeItem[], context: string, eraTitle?: string) => {
      if (itemsToAnalyze.length === 0) {
        setHistoricalInfo(null);
        setIsAppropriate(null);
        setCulturalWarning(null);
        setCulturalStars(null);
        setDecencyExplanation(null);
        return;
      }

      setIsAnalyzing(true);
      try {
        const itemNames = itemsToAnalyze.map((i) => i.name);
        const res = await fetch('/api/ai/analyze-outfit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_context: `${eraTitle || selectedEra.stationTitle} - ${context}`,
            selected_items: itemNames,
          }),
        });

        const data = await res.json();
        startTransition(() => {
          setHistoricalInfo(data.historical_info || null);
          setIsAppropriate(data.is_appropriate ?? true);
          setCulturalWarning(data.cultural_warning || null);
          setCulturalStars(data.cultural_stars ?? (data.is_appropriate ? 5 : 2));
          setDecencyExplanation(data.decency_explanation || null);
        });
      } catch (err) {
        console.error('Error analyzing outfit:', err);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [selectedEra.stationTitle]
  );

  // Người dùng click vào một trạm từ bản đồ các trạm:
  // Kích hoạt giao diện Studio (người mẫu + bối cảnh + gợi ý + tủ đồ)
  const handleSelectStationAndEnterStudio = (era: HistoricalEra) => {
    setSelectedEra(era);
    setIsStudioView(true);
    // Khi mới vào phòng phối đồ, chưa hoàn tất phối đồ
    setIsOutfitCompleted(false);

    // Bắt đầu model chỉ mặc đồ ở nhà (áo ba lỗ trắng & quần short xám)
    // KHÔNG cho sẵn trang phục đúng đáp án ngay từ đầu để người dùng tự do chọn từng món
    setSelectedItems([]);
    setHistoricalInfo(null);
    setIsAppropriate(null);
    setCulturalWarning(null);
    setCulturalStars(null);
    setDecencyExplanation(null);
  };

  // Người dùng hoàn tất phối đồ (bấm nút "Sẵn sàng" / "Hoàn tất phối đồ"):
  // 1. Chạy đối chiếu hàng rào văn hóa
  // 2. Tự động sinh & mở Thẻ Sưu Tập Di Sản Popmart 3D (Shareable Collector Card)
  // 3. Hiển thị phần "Đối chiếu văn hóa" bên dưới
  const handleCompleteOutfit = () => {
    setIsOutfitCompleted(true);
    handleAnalyzeOutfit(selectedItems, eventContext, selectedEra.stationTitle);
    setIsCollectorCardOpen(true);
    setTimeout(() => {
      document.getElementById('cultural-guardrail-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  // Toggle item selection
  const handleToggleItem = (item: WardrobeItem) => {
    let updated: WardrobeItem[];
    const alreadySelected = selectedItems.some((i) => i.id === item.id);

    if (alreadySelected) {
      updated = selectedItems.filter((i) => i.id !== item.id);
    } else {
      if (
        item.category === 'hair' ||
        item.category === 'outerwear' ||
        item.category === 'innerwear' ||
        item.category === 'bottom' ||
        item.category === 'footwear' ||
        item.category === 'motif'
      ) {
        updated = [
          ...selectedItems.filter((i) => i.category !== item.category),
          item,
        ];
      } else {
        updated = [...selectedItems, item];
      }
    }

    setSelectedItems(updated);
    // Nếu đã hoàn tất phối đồ rồi mà chỉnh sửa tiếp thì tự động cập nhật đối chiếu
    if (isOutfitCompleted) {
      handleAnalyzeOutfit(updated, eventContext);
    }
  };

  const handleClearAll = () => {
    setSelectedItems([]);
    setHistoricalInfo(null);
    setIsAppropriate(null);
    setCulturalWarning(null);
    setCulturalStars(null);
    setDecencyExplanation(null);
    setIsOutfitCompleted(false);
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = PRESET_OUTFITS.find((p) => p.id === presetId);
    if (!preset) return;

    const matchedEra = HISTORICAL_ERAS.find((e) => e.id === preset.eraId);
    if (matchedEra) setSelectedEra(matchedEra);

    setEventContext(preset.eventContext);
    setSelectedStyle(preset.styleName);

    const items = WARDROBE_CATALOG.filter((i) => preset.itemIds.includes(i.id));
    setSelectedItems(items);
    if (isOutfitCompleted) {
      handleAnalyzeOutfit(items, preset.eventContext, matchedEra?.stationTitle);
    }
  };

  // Apply Current Station styling formula
  const handleApplyStationSuggestion = () => {
    const ids = selectedEra.stylingSuggestion.presetItemIds;
    const items = WARDROBE_CATALOG.filter((i) => ids.includes(i.id));
    setSelectedItems(items);
    if (isOutfitCompleted) {
      handleAnalyzeOutfit(items, eventContext);
    }
  };

  // Auto fix taboo item
  const handleAutoFixTaboo = () => {
    let updated = [...selectedItems];

    const hasDragon5 = updated.some((i) => i.id === 'dragon-5-claws');
    if (hasDragon5) {
      const dragon4 = WARDROBE_CATALOG.find((i) => i.id === 'dragon-4-claws');
      updated = updated.filter((i) => i.id !== 'dragon-5-claws');
      if (dragon4) updated.push(dragon4);
    }

    const hasAoYemOnly =
      updated.some((i) => i.id === 'ao-yem-silk') &&
      !updated.some((i) => i.category === 'outerwear');
    if (hasAoYemOnly) {
      const outerRobe =
        WARDROBE_CATALOG.find((i) => i.id === 'giao-linh-coat') ||
        WARDROBE_CATALOG.find((i) => i.id === 'ngu-than-chen');
      if (outerRobe) updated.push(outerRobe);
    }

    setSelectedItems(updated);
    if (isOutfitCompleted) {
      handleAnalyzeOutfit(updated, eventContext);
    }
  };



  const hasTabooItems = selectedItems.some(
    (i) =>
      i.isTabooForStreetwear ||
      (i.id === 'ao-yem-silk' &&
        eventContext.toLowerCase().includes('chùa') &&
        !selectedItems.some((item) => item.category === 'outerwear'))
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      {/* 1. Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'studio') {
            setIsStudioView(false);
          }
        }}
      />

      <main className="flex-1 w-full flex flex-col">
        {/* Tab 1: STUDIO */}
        {activeTab === 'studio' && (
          <div className="w-full flex-1 flex flex-col">
            {/* GIAO DIỆN 1: BAN ĐẦU CHỈ HIỂN THỊ CÁC TRẠM FULL SCREEN, BỎ NỀN BÊN TRÊN */}
            {!isStudioView ? (
              <StationSelectionMap
                onSelectStation={handleSelectStationAndEnterStudio}
                selectedEraId={selectedEra.id}
                onOpenKnowledge={() => setActiveTab('matrix')}
                onOpenStandards={() => setIsCulturalModalOpen(true)}
              />
            ) : (
              /* GIAO DIỆN 2: SAU KHI CLICK VÀO CÁC TRẠM MỚI HIỆN LÊN NGƯỜI MẪU VÀ TỦ ĐỒ,... */
              <div className="w-full max-w-[1700px] mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-4 space-y-3 animate-in fade-in duration-300">
                {/* Thanh điều hướng & Quay lại Bản đồ các trạm */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-stone-200/90 rounded-2xl p-2.5 sm:px-4 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsStudioView(false)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Quay lại bản đồ các trạm</span>
                    </button>

                    <div className="h-4 w-px bg-stone-200 hidden sm:block" />

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-stone-500 font-medium hidden md:inline">
                        Đang ở:
                      </span>
                      <span className="text-xs font-bold text-[#991B1B] font-serif-editorial">
                        Trạm {selectedEra.stationNumber}: {selectedEra.name}
                      </span>
                    </div>
                  </div>

                  {/* Nút chuyển nhanh giữa 5 trạm ngay trong Studio */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                    <span className="text-[11px] font-medium text-stone-400 mr-1 shrink-0">
                      Đổi trạm:
                    </span>
                    {HISTORICAL_ERAS.map((era) => {
                      const isActive = era.id === selectedEra.id;
                      return (
                        <button
                          key={era.id}
                          onClick={() => handleSelectStationAndEnterStudio(era)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                            isActive
                              ? 'bg-[#991B1B] text-white shadow-2xs'
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                          }`}
                          title={era.stationTitle}
                        >
                          Trạm {era.stationNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* GIAO DIỆN PHÒNG PHỐI ĐỒ CHUẨN ĐỒ HỌA NGÔI SAO THỜI TRANG: TRÀN MÀN HÌNH ĐỂ KHÔNG KHUẤT TỦ ĐỒ */}
                <div id="nikki-stage" className="w-full">
                  <NikkiDressUpStage
                    currentEra={selectedEra}
                    selectedItems={selectedItems}
                    onToggleItem={handleToggleItem}
                    onClearAll={handleClearAll}
                    onApplyPreset={(id) => handleApplyPreset(id)}
                    onApplyStationSuggestion={handleApplyStationSuggestion}
                    onBackToTimeline={() => setIsStudioView(false)}
                    onOpenEvaluation={() => setIsCulturalModalOpen(true)}
                    eventContext={eventContext}
                    onChangeEventContext={(ctx) => {
                      setEventContext(ctx);
                      if (isOutfitCompleted) {
                        handleAnalyzeOutfit(selectedItems, ctx);
                      }
                    }}
                    isAnalyzing={isAnalyzing}
                    guardrailStatus={{
                      isAppropriate,
                      warning: culturalWarning,
                    }}
                    onCompleteOutfit={handleCompleteOutfit}
                    isOutfitCompleted={isOutfitCompleted}
                    onOpenCollectorCard={() => setIsCollectorCardOpen(true)}
                    onChangeEra={handleSelectStationAndEnterStudio}
                  />
                </div>

                {/* BÊN DƯỚI PHẦN : "ĐỐI CHIẾU VĂN HÓA" CHỈ HIỂN THỊ KHI ĐÃ PHỐI ĐỒ XONG */}
                {isOutfitCompleted && (
                  <div
                    id="cultural-guardrail-section"
                    className="max-w-6xl w-full mx-auto mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300"
                  >
                    <div className="flex items-center justify-between mb-3 px-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-800 font-serif-editorial">
                          Đã Phối Đồ Xong · Đối Chiếu Văn Hóa & Thẻ Thông Tin Di Sản
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsCollectorCardOpen(true)}
                          className="text-xs text-rose-700 hover:text-rose-900 font-bold flex items-center gap-1 cursor-pointer bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2.5 py-1 rounded-lg transition-all"
                        >
                          <span>🎴 Xem Thẻ Sưu Tập 3D</span>
                        </button>
                        <button
                          onClick={() => {
                            const stageEl = document.getElementById('nikki-stage');
                            stageEl?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-xs text-[#991B1B] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <span>↑ Quay lại phòng thử đồ</span>
                        </button>
                      </div>
                    </div>

                    <CulturalInfoCard
                      historicalInfo={historicalInfo}
                      isAppropriate={isAppropriate}
                      culturalWarning={culturalWarning}
                      culturalStars={culturalStars}
                      decencyExplanation={decencyExplanation}
                      isAnalyzing={isAnalyzing}
                      onReAnalyze={() => handleAnalyzeOutfit(selectedItems, eventContext)}
                      onAutoFixTaboo={handleAutoFixTaboo}
                      hasTabooItems={hasTabooItems}
                      onOpenCollectorCard={() => setIsCollectorCardOpen(true)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'matrix' && (
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <HistoricalEraMatrix />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <CulturalStandardsSection />
          </div>
        )}
      </main>

      {/* Cultural Info & Guardrails Modal */}
      <CulturalInfoModal
        isOpen={isCulturalModalOpen}
        onClose={() => setIsCulturalModalOpen(false)}
        historicalInfo={historicalInfo}
        isAppropriate={isAppropriate}
        culturalWarning={culturalWarning}
        culturalStars={culturalStars}
        decencyExplanation={decencyExplanation}
        isAnalyzing={isAnalyzing}
        onReAnalyze={() => handleAnalyzeOutfit(selectedItems, eventContext)}
        onAutoFixTaboo={handleAutoFixTaboo}
        hasTabooItems={hasTabooItems}
        eventContext={eventContext}
        eraName={selectedEra.name}
        itemNames={selectedItems.map((i) => i.name)}
      />

      {/* Shareable 3D Popmart Heritage Collector Card Modal */}
      <HeritageCollectorCardModal
        isOpen={isCollectorCardOpen}
        onClose={() => setIsCollectorCardOpen(false)}
        era={selectedEra}
        eventContext={eventContext}
        selectedItems={selectedItems}
        historicalInfo={historicalInfo}
        isAppropriate={isAppropriate}
        culturalWarning={culturalWarning}
        culturalStars={culturalStars}
        decencyExplanation={decencyExplanation}
        onAutoFixTaboo={handleAutoFixTaboo}
        hasTabooItems={hasTabooItems}
      />

      {/* Footer */}
      <footer className="bg-stone-100 border-t border-stone-200/80 py-8 mt-12 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-800">Áo Xưa Nay</span>
            <span>· Dự án bảo tồn & phát triển văn hóa y phục Việt Nam cho giới trẻ</span>
          </div>
          <div className="text-[11px] text-stone-400">
            Google AI Studio Build · gemini-3.8-flash & gemini-3.1-pro-preview
          </div>
        </div>
      </footer>
    </div>
  );
}
