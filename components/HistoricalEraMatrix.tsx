'use client';

import React, { useState } from 'react';
import { ERA_LOOKUP_MATRIX, HISTORICAL_ERAS } from '@/data/historical-data';
import { Copy, Check, BookOpen, Layers, ShieldCheck, Sparkles } from 'lucide-react';

export function HistoricalEraMatrix() {
  const [copied, setCopied] = useState(false);
  const [selectedEraTab, setSelectedEraTab] = useState<string>('all');

  const filteredMatrix =
    selectedEraTab === 'all'
      ? ERA_LOOKUP_MATRIX
      : ERA_LOOKUP_MATRIX.filter((row) => row.eraId === selectedEraTab);

  const generateMarkdownTable = () => {
    let md = `# BẢNG KIẾN THỨC LỊCH SỬ 4 THỜI KỲ PHỐI ĐỒ & HÀNG RÀO VĂN HÓA "ÁO XƯA NAY"\n\n`;
    md += `| Trạm Thời kỳ | Sự kiện / Bối cảnh sử dụng | Phong cách (Style) & Phối đồ (Mix & Match) | Màu sắc & Phụ kiện đi kèm | Nội dung Thẻ thông tin (Info Card) & Hàng rào văn hóa |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- |\n`;

    ERA_LOOKUP_MATRIX.forEach((row) => {
      md += `| **${row.eraName}**<br>(${row.period}) | ${row.eventContext} | ${row.styleAndMix} | ${row.colorsAndAccessories} | **Info Card**: ${row.infoCardContent}<br><br>**Hàng rào văn hóa**: ${row.culturalGuardrail} |\n`;
    });

    return md;
  };

  const handleCopyTable = () => {
    const md = generateMarkdownTable();
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Copy Bar */}
      <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-[#991B1B]" />
            <h2 className="text-base font-bold font-serif-editorial text-stone-900">
              Kiến Thức Lịch Sử 4 Thời Kỳ Trọng Điểm
            </h2>
          </div>
          <p className="text-xs text-stone-600 max-w-2xl">
            Tài liệu tra cứu kiến thức lịch sử chuẩn xác về sự kiện sử dụng, công thức mix & match đương đại, màu sắc, phụ kiện và nội dung thẻ thông tin văn hóa sẵn sàng copy/paste vào báo cáo, đồ án học tập.
          </p>
        </div>

        <button
          onClick={handleCopyTable}
          className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow-xs shrink-0 self-start md:self-auto"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Đã sao chép Markdown!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-amber-300" />
              <span>Sao chép toàn bộ bảng</span>
            </>
          )}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl overflow-x-auto text-xs">
        <button
          onClick={() => setSelectedEraTab('all')}
          className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-colors ${
            selectedEraTab === 'all'
              ? 'bg-white text-stone-900 shadow-xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Tất cả kiến thức 4 thời kỳ
        </button>
        {HISTORICAL_ERAS.map((era) => (
          <button
            key={era.id}
            onClick={() => setSelectedEraTab(era.id)}
            className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedEraTab === era.id
                ? 'bg-white text-[#991B1B] shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Thời {era.name}
          </button>
        ))}
      </div>

      {/* Structured Card Grid View */}
      <div className="space-y-5">
        {filteredMatrix.map((row) => (
          <div
            key={row.eraId}
            className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs hover:border-stone-300 transition-all"
          >
            {/* Header: Era Name & Time */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#991B1B]/10 text-[#991B1B] flex items-center justify-center font-bold text-xs font-mono">
                  {row.eraName.substring(0, 2)}
                </span>
                <div>
                  <h3 className="font-serif-editorial text-base font-bold text-stone-900">
                    {row.eraName}
                  </h3>
                  <p className="text-[11px] text-stone-500 font-mono">
                    Niên đại: {row.period}
                  </p>
                </div>
              </div>

              <div className="text-xs font-medium text-amber-800 bg-amber-50 px-3 py-1 rounded-md border border-amber-200/60 self-start sm:self-auto">
                {row.eventContext}
              </div>
            </div>

            {/* Grid of 3 Main Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
              {/* Pillar 1: Style & Mix */}
              <div className="p-3.5 bg-stone-50/70 rounded-xl border border-stone-100">
                <div className="flex items-center gap-1.5 font-bold text-stone-800 mb-2">
                  <Layers className="w-3.5 h-3.5 text-[#991B1B]" />
                  <span>Phong cách & Công thức Mix & Match</span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  {row.styleAndMix}
                </p>
              </div>

              {/* Pillar 2: Color & Accessories */}
              <div className="p-3.5 bg-stone-50/70 rounded-xl border border-stone-100">
                <div className="flex items-center gap-1.5 font-bold text-stone-800 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Màu sắc & Phụ kiện đi kèm</span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  {row.colorsAndAccessories}
                </p>
              </div>

              {/* Pillar 3: Info Card & Cultural Guardrail */}
              <div className="p-3.5 bg-stone-50/70 rounded-xl border border-stone-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Nội dung Thẻ thông tin (Info Card)</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed italic font-serif-editorial">
                    &ldquo;{row.infoCardContent}&rdquo;
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200/60 text-[11px] text-red-900 bg-red-50/50 p-2 rounded-md">
                  <strong className="text-red-800">Hàng rào văn hóa:</strong>{' '}
                  {row.culturalGuardrail}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
