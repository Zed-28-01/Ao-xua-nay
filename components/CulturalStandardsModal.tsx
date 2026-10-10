'use client';

import React from 'react';
import { ShieldCheck, AlertOctagon, CheckCircle2, BookOpen, Crown, Sparkles } from 'lucide-react';

export function CulturalStandardsSection() {
  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-[#991B1B]" />
          <h2 className="text-base font-bold font-serif-editorial text-stone-900">
            Quy Chuẩn Văn Hóa & Hàng Rào Phòng Ngừa Cấm Kỵ
          </h2>
        </div>
        <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
          &quot;Áo Xưa Nay&quot; tin rằng người trẻ hoàn toàn có quyền biến tấu trang phục truyền thống để hòa mình vào dòng chảy thời trang đương đại. Tuy nhiên, sự sáng tạo chỉ thực sự tỏa sáng khi được đặt trên nền tảng hiểu biết sâu sắc và tôn trọng các giá trị chuẩn mực văn hóa dân tộc.
        </p>
      </div>

      {/* Grid of Key Cultural Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Rule 1: Dragon Motifs */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                1. Điển Chế Hoa Văn Rồng (Rồng 5 Móng vs Rồng 4 Móng)
              </h3>
              <p className="text-[11px] text-stone-500">Phẩm hàm & Biểu tượng vương quyền</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-stone-700 leading-relaxed">
            <div className="p-3 bg-red-50/60 rounded-xl border border-red-200/70 text-red-950 flex items-start gap-2">
              <AlertOctagon className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong>Cấm kỵ:</strong> Họa tiết &quot;Rồng 5 móng&quot; là biểu tượng độc quyền tối cao của Hoàng đế. Không sử dụng trên trang phục dạo phố, thường phục dân gian hoặc trang phục cải biên casual.
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/70 text-emerald-950 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Giải pháp chuẩn:</strong> Thay thế bằng họa tiết Rồng 4 móng (dành cho Vương hầu, Quan lại), hoặc hoa sen cúc dây, mây sóng thủy ba thời Lý - Trần - Lê vừa đẹp vừa chuẩn mực.
              </div>
            </div>
          </div>
        </div>

        {/* Rule 2: Innerwear vs Outerwear */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                2. Áo Yếm: Giới Hạn Giữa Nội Y & Ngoại Y
              </h3>
              <p className="text-[11px] text-stone-500">Thuần phong mỹ tục & Nơi tôn nghiêm</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-stone-700 leading-relaxed">
            <div className="p-3 bg-red-50/60 rounded-xl border border-red-200/70 text-red-950 flex items-start gap-2">
              <AlertOctagon className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong>Cấm kỵ:</strong> Mặc độc chiếc Áo yếm (không có áo khoác ngoài) đi lễ đền, chùa, miếu mạo hoặc tham dự các nghi thức tâm linh, hội nghị trang trọng.
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/70 text-emerald-950 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Giải pháp chuẩn:</strong> Khoác áo Giao Lĩnh, Áo Tứ Thân hoặc áo Ngũ Thân mỏng bên ngoài theo phong cách Layering hiện đại, giữ trọn nét duyên thắt đáy lưng ong mà kín đáo.
              </div>
            </div>
          </div>
        </div>

        {/* Rule 3: Lapels & Buttons */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                3. Chiều Cài Vạt Áo & 5 Khuy Ngũ Thân
              </h3>
              <p className="text-[11px] text-stone-500">Quy tắc tả/hữu và đạo nghĩa làm người</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-stone-700 leading-relaxed">
            <p>
              • <strong>Vạt áo cài sang phải:</strong> Theo truyền thống người Việt, vạt áo trước luôn bắt chéo hoặc cài sang bên phải. Việc cài sang bên trái trong cổ tịch thường gắn với tang chế hoặc trang phục dị tộc.
            </p>
            <p>
              • <strong>5 chiếc khuy áo:</strong> Tượng trưng cho Ngũ thường (Nhân, Lễ, Nghĩa, Trí, Tín) và Ngũ luân. Khi mặc áo Ngũ Thân ở chốn trang trọng, không nên cởi mở khuy cổ bừa bãi.
            </p>
          </div>
        </div>

        {/* Rule 4: Gen Z Modern Fusion */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                4. Bí Quyết Phối Đồ Hiện Đại Chuẩn Stylist
              </h3>
              <p className="text-[11px] text-stone-500">Streetwear, Casual Chic & Unisex</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-stone-700 leading-relaxed">
            <p>
              • <strong>Tôn trọng phom dáng (Silhouette):</strong> Giữ nguyên cấu trúc vạt áo, nếp cổ và chiều dài tương thích; chỉ cách tân chất liệu (đũi, linen, denim thô) và hạ y (quần wide-leg, váy midi).
            </p>
            <p>
              • <strong>Tương phản phụ kiện có kiểm soát:</strong> Phối với sneakers trắng, túi tote dệt thô hoặc mũ beret mang lại năng lượng trẻ trung, phóng khoáng mà không phá vỡ tinh thần văn hóa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
