'use client';

import React, { useState } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  Check,
  X,
  Scan,
  ShieldCheck,
  ShieldAlert,
  Star,
  Layers,
  ArrowRight,
  Shirt,
  Info,
} from 'lucide-react';
import { WARDROBE_CATALOG, WardrobeItem, HISTORICAL_ERAS, HistoricalEra } from '@/data/historical-data';

interface OutfitImageRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRecognizedOutfit: (items: WardrobeItem[], era: HistoricalEra) => void;
}

interface RecognitionResult {
  outfit_title: string;
  style_category: string;
  detected_garments: Array<{
    type: string;
    detail: string;
    color: string;
  }>;
  recommended_item_ids: string[];
  matched_era_id: string;
  cultural_stars: number;
  decency_explanation: string;
  visual_summary: string;
}

const PRESET_IMAGES = [
  {
    id: 'popmart_pink_aodai',
    title: 'Búp Bê 3D Popmart: Áo Dài Lụa Hồng',
    eraTitle: 'Thời Hiện Đại & Đương Đại',
    eraId: 'station-4',
    badge: 'Khuyên Dùng (Recommended)',
    desc: 'Búp bê Chibi 1:2.8, má bánh bao, mắt ngọc phản quang, áo dài lụa tơ tằm hồng thêu hoa sen.',
    items: ['ao-dai-pink-silk', 'toc-tet-vuong-mien', 'vo-lua-theu-hoa', 'hai-theu-lua-hong', 'lotus-chrysanthemum'],
  },
  {
    id: 'giao_linh_modern',
    title: 'Cổ Phục Giao Lĩnh Layering Hiện Đại',
    eraTitle: 'Thời Lý - Trần - Lê',
    eraId: 'station-2',
    badge: 'Streetwear Di Sản',
    desc: 'Áo khoác Giao Lĩnh đỏ đô vạt chéo phối cùng quần ống rộng và họa tiết hoa cúc cung đình.',
    items: ['giao-linh-coat', 'croptop-tee', 'wide-leg-pants', 'lotus-chrysanthemum', 'chunky-sneakers'],
  },
  {
    id: 'nhat_binh_royal',
    title: 'Áo Nhật Bình Hoàng Triều Triều Nguyễn',
    eraTitle: 'Triều Nguyễn & Giai Đoạn Đổi Mới',
    eraId: 'station-3',
    badge: 'Cung Đình Quý Phái',
    desc: 'Áo Nhật Bình ngũ sắc dệt phượng hoàng, cổ áo chữ nhật viền kim tuyến, khăn vấn hoàng tộc.',
    items: ['nhat-binh-jacket', 'khan-van-headwear', 'silk-skirt-long', 'phoenix-peacock-motif'],
  },
];

export function OutfitImageRecognitionModal({
  isOpen,
  onClose,
  onApplyRecognizedOutfit,
}: OutfitImageRecognitionModalProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('popmart_pink_aodai');
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImageBase64(reader.result as string);
      setSelectedPresetId('custom_upload');
    };
    reader.readAsDataURL(file);
  };

  const handleRunRecognition = async () => {
    setIsScanning(true);
    try {
      const activePreset = PRESET_IMAGES.find((p) => p.id === selectedPresetId);

      const res = await fetch('/api/ai/recognize-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_base64: uploadedImageBase64 || null,
          image_preset: selectedPresetId,
          image_description: activePreset?.desc || 'Hình ảnh phối đồ búp bê Popmart áo dài lụa hồng truyền thống',
        }),
      });

      const data = await res.json();
      setRecognitionResult(data);
    } catch (err) {
      console.error('Error recognizing outfit:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleApplyToUI = () => {
    if (!recognitionResult) return;

    const itemIds = recognitionResult.recommended_item_ids || [];
    const items = WARDROBE_CATALOG.filter((i) => itemIds.includes(i.id));

    const era =
      HISTORICAL_ERAS.find((e) => e.id === recognitionResult.matched_era_id) ||
      HISTORICAL_ERAS[3]; // default modern / popmart

    onApplyRecognizedOutfit(items, era);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-900/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-stone-950 via-stone-900 to-rose-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-serif-editorial">
                Chuyên Gia Nhận Diện Hình Ảnh Phối Đồ
              </h2>
              <p className="text-[11px] text-stone-400">
                Phân tích thị giác chi tiết & Tự động chèn chuẩn xác vào Stage 3D
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-full bg-stone-800/60 hover:bg-stone-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* STEP 1: Chọn ảnh phối đồ hoặc tải ảnh lên */}
          <div>
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2.5 block flex items-center gap-1.5">
              <Scan className="w-3.5 h-3.5 text-rose-400" />
              <span>Bước 1: Chọn ảnh phối đồ hoặc tải ảnh mới</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PRESET_IMAGES.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => {
                    setSelectedPresetId(preset.id);
                    setUploadedImageBase64(null);
                    setRecognitionResult(null);
                  }}
                  className={`p-3 rounded-2xl border text-left cursor-pointer transition-all relative ${
                    selectedPresetId === preset.id
                      ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/30'
                      : 'bg-stone-800/40 border-stone-700/60 hover:bg-stone-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-rose-300 px-1.5 py-0.5 rounded bg-rose-950/60 border border-rose-800/40">
                      {preset.badge}
                    </span>
                    {selectedPresetId === preset.id && (
                      <Check className="w-3.5 h-3.5 text-rose-400" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{preset.title}</h4>
                  <p className="text-[10px] text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                    {preset.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Upload Zone */}
            <div className="mt-3">
              <label
                htmlFor="outfit-image-upload"
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border border-dashed transition-all cursor-pointer ${
                  uploadedImageBase64
                    ? 'bg-amber-950/20 border-amber-500/80 text-amber-200'
                    : 'bg-stone-800/20 border-stone-700 hover:bg-stone-800/50 text-stone-300'
                }`}
              >
                <Upload className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium">
                  {uploadedImageBase64
                    ? 'Đã chọn ảnh của bạn (Nhấp để đổi ảnh)'
                    : 'Hoặc tải lên hình ảnh phối đồ từ thiết bị của bạn (JPG, PNG)'}
                </span>
                <input
                  id="outfit-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Action Button: Nhận diện */}
          <div className="flex justify-center">
            <button
              onClick={handleRunRecognition}
              disabled={isScanning}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 cursor-pointer active:scale-95 transition-all disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <Scan className="w-4 h-4 animate-spin text-amber-200" />
                  <span>AI Đang Quét & Nhận Diện Chi Tiết...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                  <span>Chuyên Gia Nhận Diện Hình Ảnh Này Ngay</span>
                </>
              )}
            </button>
          </div>

          {/* STEP 2: KẾT QUẢ NHẬN DIỆN THỊ GIÁC */}
          {recognitionResult && (
            <div className="p-4.5 rounded-2xl bg-stone-800/60 border border-stone-700 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between border-b border-stone-700/80 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">
                    Kết Quả Nhận Diện Thị Giác
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {recognitionResult.outfit_title}
                  </h3>
                  <span className="text-xs text-stone-400">{recognitionResult.style_category}</span>
                </div>

                {/* Cultural Stars Badge */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (recognitionResult.cultural_stars || 5)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 mt-0.5">
                    {recognitionResult.cultural_stars}/5 Sao Văn Hóa
                  </span>
                </div>
              </div>

              {/* Tóm tắt thị giác */}
              <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded-xl border border-stone-800 italic">
                &ldquo;{recognitionResult.visual_summary}&rdquo;
              </p>

              {/* Danh sách trang phục nhận diện được */}
              <div>
                <h4 className="text-[11px] font-bold text-stone-300 uppercase mb-2 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Các lớp trang phục bóc tách:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recognitionResult.detected_garments?.map((g, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 flex items-start gap-2.5"
                    >
                      <div
                        className="w-4 h-4 rounded-full mt-0.5 shrink-0 border border-white/20 shadow-xs"
                        style={{ backgroundColor: g.color }}
                      />
                      <div className="text-[11px]">
                        <span className="font-bold text-white block">{g.type}</span>
                        <span className="text-stone-400">{g.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Đánh giá thuần phong mỹ tục */}
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 text-xs flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-white block">
                    Đánh giá Thuần phong Mỹ tục:
                  </span>
                  <p className="text-emerald-300/90 leading-relaxed text-[11px]">
                    {recognitionResult.decency_explanation}
                  </p>
                </div>
              </div>

              {/* CTA Chèn vào UI */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleApplyToUI}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Chèn Hình Ảnh Phối Đồ Này Vào UI & Mặc Cho Búp Bê</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
