'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Palette,
  ShieldCheck,
  Code2,
  Copy,
  Check,
  Compass,
  Shirt,
  Eye,
  FileText,
  Boxes,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Crown,
  Heart,
  Lightbulb,
} from 'lucide-react';

interface UiUxBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UiUxBlueprintModal({ isOpen, onClose }: UiUxBlueprintModalProps) {
  const [activeSection, setActiveSection] = useState<
    'layout' | 'sidebar' | 'materials' | 'cultural_card' | 'prompt' | 'flow'
  >('layout');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!isOpen) return null;

  const samplePrompt = `/imagine prompt: A 3D collectible blind box art toy figure in the signature Popmart style, cute chibi proportions, 1:2.5 head-to-body ratio, adorable round chubby cheeks with subtle peach blush, large captivating glossy glass doll eyes, soft innocent smile. The collectible doll is dressed in an authentic Vietnamese traditional royal-inspired outfit: a flowing pink mulberry silk Áo Dài with natural soft cascading drapery and ultra-delicate fabric physics, layered with a luxurious midnight-black velvet yếm top embroidered with intricate 18k metallic gold dragon and cloud motifs with crisp geometric borders. Adorned with a delicate braided crown headband studded with tiny jade beads and freshwater pearls. High-end toy packaging aesthetic, premium vinyl texture with soft matte finish, subsurface scattering on doll skin, exquisite embroidery thread relief texture, soft cinematic studio volumetric lighting, pastel cyan and temple courtyard backdrop, rendered in Cinema 4D and Octane Render, ultra-sharp 8k resolution, masterpiece collectible figurine --ar 3:4 --stylize 350 --v 6.1`;

  const negativePrompt = `low quality, distorted face, ugly eyes, plastic melting artifacts, deformed fingers, extra limbs, stiff cardboard fabric, chaotic blurry embroidery, western medieval clothes, watermark, text, signature, low-res, bad anatomy`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] text-stone-900 w-full max-w-5xl max-h-[92vh] rounded-3xl shadow-2xl border-2 border-stone-300 flex flex-col overflow-hidden">
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-stone-900 via-stone-850 to-[#7F1D1D] text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/40 text-amber-300 flex items-center justify-center font-bold">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                  Art Director & UI/UX Blueprint
                </span>
                <span className="text-[10px] text-stone-300 font-mono">v2.4 Spec</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-serif-editorial text-stone-100 mt-0.5">
                Đặc Tả Thiết Kế Giao Diện Phối Đồ 3D Popmart Việt Phục
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all text-sm font-bold active:scale-95"
          >
            ✕
          </button>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 bg-white border-b border-stone-200 overflow-x-auto text-xs font-bold text-stone-600 shrink-0">
          {[
            { id: 'layout', label: '1. Bố Cục Màn Hình', icon: Layers },
            { id: 'sidebar', label: '2. Menu 10 Danh Mục', icon: Shirt },
            { id: 'materials', label: '3. Tủ Đồ & Chất Liệu', icon: Palette },
            { id: 'cultural_card', label: '4. Thẻ Văn Hóa & Guardrail', icon: ShieldCheck },
            { id: 'prompt', label: '5. AI Asset Prompt', icon: Sparkles },
            { id: 'flow', label: '6. Luồng Tương Tác', icon: Compass },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#991B1B] text-white shadow-xs'
                    : 'hover:bg-stone-100 text-stone-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs sm:text-sm text-stone-800 leading-relaxed">
          {/* SECTION 1: BỐ CỤC MÀN HÌNH CHÍNH (MAIN LAYOUT) */}
          {activeSection === 'layout' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#991B1B] font-bold text-sm">
                  <Layers className="w-4 h-4" />
                  <h3>1. BỐ CỤC KHÔNG GIAN MÀN HÌNH CHÍNH (MAIN LAYOUT BLUEPRINT)</h3>
                </div>
                <p className="text-stone-600 text-xs">
                  Thiết kế giao diện kế thừa triết lý của các tựa game thời trang kinh điển (Shining Nikki, Life Makeover) nhưng được tinh chỉnh theo ngôn ngữ Art Toy / Blind-box đương đại của Popmart.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      Tỉ lệ Khung Hình 3:4 & Viewport
                    </div>
                    <p className="text-[11px] text-stone-600">
                      Tối ưu tỷ lệ chuẩn dọc (Mobile-first 9:16 hoặc Stage 3:4 trên Desktop) với chiều cao tối thiểu 780px. Nhân vật luôn nằm ở tiêu điểm thị giác trung tâm, chiếm 65% chiều cao khung hình.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Tỷ Lệ Nhân Vật 3D Popmart Chibi
                    </div>
                    <p className="text-[11px] text-stone-600">
                      Tỷ lệ cơ thể 1:2.5 đến 1:3 (Đầu to tròn đáng yêu, má bánh bao phúng phính má đào, mắt bồ câu to long lanh trong veo, tay chân thon gọn giữ chuẩn tỷ lệ búp bê sưu tầm blind-box).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Bối Cảnh Parallax 3 Lớp Di Sản
                    </div>
                    <p className="text-[11px] text-stone-600">
                      - Tiền cảnh: Cành đào tuyết, hoa mai đỏ đung đưa.<br />
                      - Trung cảnh: Cổng vòm Nguyệt Môn, cột đình sơn son lồng đèn đỏ.<br />
                      - Hậu cảnh: Nền trời lam sương tuyết hoặc hoàng hôn cố đô.
                    </p>
                  </div>
                </div>
              </div>

              {/* Wireframe Diagram */}
              <div className="bg-stone-900 text-stone-100 p-5 rounded-2xl border border-stone-800 space-y-3 font-mono text-[11px]">
                <div className="flex items-center justify-between text-amber-300 font-bold">
                  <span>SCHEMATIC WIREFRAME (BẢN ĐỒ KHÔNG GIAN GIAO DIỆN)</span>
                  <span className="text-[10px] text-stone-400">100% Canvas Overlay</span>
                </div>
                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2 text-stone-300">
                  <div className="text-stone-400">┌── TOP BAR ────────────────────────────────────────────────────────┐</div>
                  <div className="flex justify-between px-2 text-emerald-400">
                    <span>[🔙 Nút Tròn Hồng Back]</span>
                    <span>[🏷️ Banner Bối Cảnh Mốc Thời Kỳ + Dropdown Sự Kiện]</span>
                    <span>[✨ AI Status]</span>
                  </div>
                  <div className="text-stone-400">├── STAGE TRUNG TÂM ────────────────────────────────────────────────┤</div>
                  <div className="flex justify-between px-2 py-6 text-stone-200">
                    <div className="w-1/4 text-purple-300 border-r border-stone-800 pr-2">
                      [GỢI Ý PHỐI ĐỒ POP-UP]<br />
                      - Công thức di sản<br />
                      - Nút Áp dụng 1-Click
                    </div>
                    <div className="w-2/4 text-center text-amber-300 font-bold">
                      [NHÂN VẬT 3D POPMART CỐ ĐỊNH TỈ LỆ]<br />
                      Render độ rủ lụa tơ tằm mềm mại<br />
                      Hiệu ứng vải gấm thêu kim tuyến nổi khối<br />
                      Tóc mấn tết vương miện ngọc trai
                    </div>
                    <div className="w-1/4 text-right text-sky-300 border-l border-stone-800 pl-2">
                      [CỘT 10 DANH MỤC]<br />
                      Tóc • Đầm • Áo • Quần<br />
                      Khoác • Vớ • Giày • T.sức<br />
                      Mặt • Nền • Bộ • Xóa
                    </div>
                  </div>
                  <div className="text-stone-400">├── BOTTOM BAR ─────────────────────────────────────────────────────┤</div>
                  <div className="flex justify-between px-2 text-rose-400">
                    <span className="font-bold">[🔘 Nút Bầu Dục 3D &quot;SẴN SÀNG&quot; Viền Bạc]</span>
                    <span className="text-stone-400">[Bảng thông số Items worn: 5/10]</span>
                  </div>
                  <div className="text-stone-400">└───────────────────────────────────────────────────────────────────┘</div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: HỆ THỐNG THANH MENU DANH MỤC (RIGHT SIDEBAR MENU) */}
          {activeSection === 'sidebar' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#991B1B] font-bold text-sm">
                  <Shirt className="w-4 h-4" />
                  <h3>2. HỆ THỐNG THANH MENU 10 DANH MỤC PHÂN LOẠI (RIGHT SIDEBAR MENU)</h3>
                </div>
                <p className="text-stone-600 text-xs">
                  Cột dọc phân loại trang phục đặt cạnh mép phải nhân vật, tuân thủ nguyên tắc ngón cái (Thumb zone) với các icon trực quan, huy hiệu NEW và tương tác trượt mở Drawer tủ đồ tương ứng.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                  {[
                    { id: 'toc', name: 'Tóc', icon: '💇‍♀️', desc: 'Mấn cách tân, tóc mây buông xõa, tóc tết vương miện ngọc, nón quai thao.' },
                    { id: 'dam', name: 'Đầm', icon: '👗', desc: 'Áo Dài tơ tằm, Váy yếm cách điệu tà rộng, Áo Nhật Bình cung đình.' },
                    { id: 'ao', name: 'Áo', icon: '👚', desc: 'Áo yếm lụa cổ yếm, áo thun croptop hiện đại, sơ mi mandarin cổ trụ.' },
                    { id: 'quan', name: 'Quần', icon: '👖', desc: 'Quần đũi lụa ống suông, quần culottes wide-leg, chân váy xếp ly.' },
                    { id: 'khoac', name: 'Khoác', icon: '🧥', desc: 'Áo Giao Lĩnh cổ chéo buông vạt, Áo Ngũ Thân tay chẽn, Áo Đối Khâm.' },
                    { id: 'vo', name: 'Vớ', icon: '🧦', desc: 'Vớ lụa dệt mỏng thêu hoa sen chỉ ánh kim, vớ ren trắng vintage.' },
                    { id: 'giay', name: 'Giày', icon: '👠', desc: 'Hài mũi cong thêu chỉ đỏ, guốc mộc quai nhung, chunky sneakers trắng.' },
                    { id: 'tsuc', name: 'Trang sức', icon: '👑', desc: 'Kiềng bạc bản mảnh, trâm hoa cúc ngọc thời Lý, quạt trầm hương.' },
                    { id: 'mat', name: 'Mặt/Biểu cảm', icon: '😊', desc: 'Mắt ngọc bồ câu má hồng Popmart, quý cô đài các môi son nụ.' },
                    { id: 'nen', name: 'Nền', icon: '🏞️', desc: 'Sân chùa mùa đông, Ngọ Môn Hoàng Thành Huế, phố cổ Hội An.' },
                  ].map((cat, idx) => (
                    <div
                      key={cat.id}
                      className="p-3 rounded-xl bg-stone-50 border border-stone-200 hover:border-rose-300 transition-all space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-[10px] font-bold text-stone-400 font-mono">#{idx + 1}</span>
                      </div>
                      <div className="font-bold text-xs text-stone-900">{cat.name}</div>
                      <p className="text-[10px] text-stone-500 leading-tight">{cat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs text-amber-950">
                <div className="font-bold flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-700" />
                  Quy Tắc Tương Tác Micro-interaction của Menu Drawer
                </div>
                <ul className="list-disc pl-5 space-y-1 text-[11px] text-amber-900">
                  <li><strong>Active State:</strong> Nút được chọn sẽ bo viền hồng Neon (<code>border-rose-500 ring-2 ring-rose-300</code>), đồng thời đẩy Drawer danh mục trượt ra từ bên phải.</li>
                  <li><strong>Layer Priority Logic:</strong> Khi người dùng chọn Đầm nguyên bộ (như Áo Dài), hệ thống tự động ẩn áo trong để tránh lỗi va chạm khối polygon (clipping mesh).</li>
                  <li><strong>Taboo Warning Badge:</strong> Các item cấm kỵ (như Rồng 5 móng) hiển thị icon dấu chấm than đỏ (!) trực tiếp trong danh sách để cảnh báo trước khi mặc.</li>
                </ul>
              </div>
            </div>
          )}

          {/* SECTION 3: HỆ THỐNG TỦ ĐỒ & CHẤT LIỆU (INVENTORY & MATERIALS) */}
          {activeSection === 'materials' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#991B1B] font-bold text-sm">
                  <Palette className="w-4 h-4" />
                  <h3>3. HỆ THỐNG TỦ ĐỒ & ĐẶC TẢ CHẤT LIỆU THỜI TRANG (INVENTORY & MATERIALS)</h3>
                </div>
                <p className="text-stone-600 text-xs">
                  Giải quyết triệt để vấn đề &quot;AI làm mất độ rủ mềm mại của lụa và làm rối hoa văn&quot; bằng các shader vật liệu chính xác theo kỹ thuật dệt thủ công truyền thống Việt Nam.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-stone-200 bg-stone-100 text-stone-700 font-bold">
                        <th className="p-2.5 rounded-l-lg">Danh Mục</th>
                        <th className="p-2.5">Tên Item Tiêu Biểu</th>
                        <th className="p-2.5">Chất Liệu Truyền Thống</th>
                        <th className="p-2.5">Vật Lý & Độ Rủ (Cloth Physics)</th>
                        <th className="p-2.5 rounded-r-lg">Hiệu Ứng Thị Giác (Shader)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 text-[11px]">
                      <tr>
                        <td className="p-2.5 font-bold text-stone-900">Đầm / Áo Dài</td>
                        <td className="p-2.5 text-rose-700 font-semibold">Áo Dài Tơ Tằm Cung Đình</td>
                        <td className="p-2.5">Lụa tơ tằm Nha Xá dệt mỏng</td>
                        <td className="p-2.5">Độ rủ mềm 95%, nếp gấp lượn sóng tự nhiên khi sải bước</td>
                        <td className="p-2.5">Specular Sheen ánh xà cừ, bắt sáng dịu nhẹ</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-stone-900">Áo Trong</td>
                        <td className="p-2.5 text-rose-700 font-semibold">Áo Yếm Lụa Gấm Thêu Sen</td>
                        <td className="p-2.5">Gấm Sa tanh & Lụa the</td>
                        <td className="p-2.5">Ôm nhẹ thân hình, dây buộc gáy buông rủ 2 dải tơ</td>
                        <td className="p-2.5">Hoa văn sen chìm dệt sợi óng, viền thêu thủ công</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-stone-900">Khoác Ngoài</td>
                        <td className="p-2.5 text-rose-700 font-semibold">Áo Giao Lĩnh Layering</td>
                        <td className="p-2.5">Dạ cẩm / Đũi gai dệt thô</td>
                        <td className="p-2.5">Phom suông cứng cáp 70%, vạt chéo buông lơi hiện đại</td>
                        <td className="p-2.5">Bề mặt dệt sợi mộc (Roughness 0.65), tương phản với lụa</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-stone-900">Trang Sức</td>
                        <td className="p-2.5 text-rose-700 font-semibold">Kiềng Bạc Chạm Sen Cúc Dây</td>
                        <td className="p-2.5">Bạc ta 925 đánh bóng mờ</td>
                        <td className="p-2.5">Vành cứng ôm sát cổ, chạm lộng hoa văn thời Lý</td>
                        <td className="p-2.5">Metallic 0.95, phản quang kim loại quý thanh tao</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-stone-900">Giày / Hài</td>
                        <td className="p-2.5 text-rose-700 font-semibold">Hài Gấm Mũi Cong Hoa Sen</td>
                        <td className="p-2.5">Vải gấm bọc mũi da mềm</td>
                        <td className="p-2.5">Mũi hài vểnh cong 30 độ kiêu sa, đế mộc bọc nỉ</td>
                        <td className="p-2.5">Chỉ thêu kim tuyến vàng ánh kim nổi vân 3D</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-stone-900">Vớ / Tất</td>
                        <td className="p-2.5 text-rose-700 font-semibold">Vớ Lụa Tơ Thêu Hoa Sen</td>
                        <td className="p-2.5">Tơ tằm dệt kim siêu mịn</td>
                        <td className="p-2.5">Co giãn ôm chân búp bê, không nhăn nhúm</td>
                        <td className="p-2.5">Độ trong mờ (Translucency 20%), thêu sen mắt cá</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: TÍCH HỢP THẺ THÔNG TIN VĂN HÓA (CULTURAL INFO CARD) */}
          {activeSection === 'cultural_card' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#991B1B] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <h3>4. TÍCH HỢP THẺ THÔNG TIN VĂN HÓA & HÀNG RÀO KIỂM DUYỆT (CULTURAL GUARDRAILS)</h3>
                </div>
                <p className="text-stone-600 text-xs">
                  Cơ chế kích hoạt thông minh: Thẻ pop-up cung cấp kiến thức lịch sử tức thì cho từng món đồ, đồng thời gọi endpoint AI <code>POST /api/ai/analyze-outfit</code> để đối chiếu toàn bộ set đồ với bối cảnh sự kiện khi người dùng bấm &quot;Sẵn sàng&quot;.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-stone-900 text-white flex items-center justify-center text-[10px]">1</span>
                      Thẻ Nhanh Tức Thì (Item Pop-up)
                    </div>
                    <p className="text-[11px] text-stone-600">
                      Khi bấm vào bất kỳ món đồ nào trong tủ, pop-up hiển thị: Thời kỳ xuất hiện, ý nghĩa hoa văn triều đại, chất liệu nguyên bản và chỉ dẫn cách mặc tôn trọng phong tục.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-stone-900 text-white flex items-center justify-center text-[10px]">2</span>
                      Hàng Rào Phòng Ngừa Cấm Kỵ (Guardrail Engine)
                    </div>
                    <p className="text-[11px] text-stone-600">
                      Tự động chặn các lỗi nghiêm trọng: Mặc áo yếm/nội y đơn lẻ đi lễ chùa tôn nghiêm; Sử dụng họa tiết &quot;Rồng 5 móng&quot; cho trang phục dạo phố thường dân (chỉ dành cho Thiên tử).
                    </p>
                  </div>
                </div>

                {/* API JSON Contract */}
                <div className="bg-stone-900 text-stone-100 p-4 rounded-xl border border-stone-800 space-y-2 font-mono text-[11px]">
                  <div className="text-amber-400 font-bold">API CONTRACT: POST /api/ai/analyze-outfit</div>
                  <pre className="text-stone-300 overflow-x-auto p-2 bg-stone-950 rounded-lg">
{`// REQUEST BODY:
{
  "event_context": "Dạo phố cuối tuần",
  "selected_items": ["Áo Giao Lĩnh khoác ngoài", "Áo thun croptop", "Họa tiết Rồng 5 móng"]
}

// RESPONSE BODY (Output từ Gemini AI):
{
  "historical_info": "Áo Giao Lĩnh (cổ chéo) là trang phục đặc trưng thời Lý - Trần - Lê. Biến tấu thành áo khoác ngoài mang đậm chất Layering hiện đại, vừa giữ được cấu trúc truyền thống vừa rất năng động.",
  "is_appropriate": false,
  "cultural_warning": "Cảnh báo: Họa tiết 'Rồng 5 móng' là biểu tượng độc quyền của Hoàng đế. Khi phối đồ dạo phố (Streetwear), bạn nên đổi sang họa tiết hoa sen, mây sóng hoặc rồng 4 móng để vừa sành điệu vừa chuẩn xác về mặt văn hóa nhé!"
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: PROMPT MẪU TẠO ASSET ĐỒ HỌA (AI ASSET GENERATION PROMPT) */}
          {activeSection === 'prompt' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#991B1B] font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <h3>5. PROMPT CHUẨN TIẾNG ANH TẠO ASSET 3D POPMART VIỆT PHỤC (AI ASSET PROMPT)</h3>
                </div>
                <p className="text-stone-600 text-xs">
                  Công thức prompt chuyên biệt cho Midjourney v6.1 / Stable Diffusion XL / Flux.1 giúp khắc phục hoàn toàn 3 lỗi AI phổ biến: làm mất nếp rủ của lụa, làm méo mó hoa văn rồng/mây vàng, và vẽ sai tỷ lệ mặt búp bê Art Toy.
                </p>

                {/* Main Prompt Box */}
                <div className="p-4 rounded-2xl bg-stone-900 text-stone-100 border border-stone-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
                      Master Prompt Formula (Copy & Run)
                    </span>
                    <button
                      onClick={handleCopyPrompt}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400 text-stone-950 font-bold text-xs hover:bg-amber-300 transition-all active:scale-95"
                    >
                      {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPrompt ? 'Đã Sao Chép!' : 'Sao Chép Prompt'}</span>
                    </button>
                  </div>

                  <p className="font-mono text-[11px] leading-relaxed text-stone-200 bg-stone-950 p-3.5 rounded-xl border border-stone-800 select-all">
                    {samplePrompt}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase font-mono text-stone-400 font-bold">
                      Negative Prompt (Tránh biến dạng & mất nếp vải):
                    </span>
                    <p className="font-mono text-[10px] text-rose-300 bg-stone-950/80 p-2.5 rounded-lg border border-red-950">
                      {negativePrompt}
                    </p>
                  </div>
                </div>

                {/* Anatomy of prompt */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <strong className="text-stone-900 block mb-1">1. Tỷ lệ Popmart Blind-box:</strong>
                    <span className="text-[11px] text-stone-600">
                      <code>3D collectible blind box art toy figure, cute chibi proportions, 1:2.5 ratio, round chubby cheeks, large captivating glass doll eyes</code>
                    </span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <strong className="text-stone-900 block mb-1">2. Độ rủ lụa & Hoa văn nổi:</strong>
                    <span className="text-[11px] text-stone-600">
                      <code>flowing mulberry silk Áo Dài with natural soft cascading drapery, delicate fabric physics, 18k metallic gold embroidery relief texture</code>
                    </span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <strong className="text-stone-900 block mb-1">3. Render Engine & Chi tiết:</strong>
                    <span className="text-[11px] text-stone-600">
                      <code>Octane Render, Cinema 4D, subsurface scattering on doll skin, studio lighting, --ar 3:4 --v 6.1</code>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 6: LUỒNG TƯƠNG TÁC (USER FLOW) */}
          {activeSection === 'flow' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#991B1B] font-bold text-sm">
                  <Compass className="w-4 h-4" />
                  <h3>6. LUỒNG TRẢI NGHIỆM NGƯỜI DÙNG TỪ ĐẦU ĐẾN CUỐI (END-TO-END USER FLOW)</h3>
                </div>
                <p className="text-stone-600 text-xs">
                  Các bước tương tác liền mạch từ khi bước vào hành trình thời gian cho đến khi xuất ảnh hoàn tất phối đồ cùng Thẻ Di Sản văn hóa.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      step: '01',
                      title: 'Khám Phá Bản Đồ Trạm Thời Kỳ (Full Screen Timeline)',
                      desc: 'Người dùng lướt qua chuỗi 5 trạm thời kỳ (Văn Lang, Lý-Trần-Lê, Nhà Nguyễn, Pháp thuộc, Hiện đại) theo trục dọc 3D Duolingo. Chọn 1 trạm để mở cánh cổng thời trang.',
                    },
                    {
                      step: '02',
                      title: 'Tiến Vào Studio Phối Đồ 3D (Enter Dressing Stage)',
                      desc: 'Mô hình búp bê Popmart xuất hiện tại trung tâm sân đình cổ kính mùa đông tuyết phủ. Bên trên hiện bối cảnh thời kỳ; bên trái có Pop-up công thức phối đồ gợi ý 1-Click.',
                    },
                    {
                      step: '03',
                      title: 'Tự Do Thử Đồ Qua Thanh 10 Danh Mục (Mix & Match)',
                      desc: 'Người dùng chọn lần lượt Tóc, Đầm, Áo, Quần, Khoác, Vớ, Giày, Trang sức, Mặt và Nền. Nhân vật 3D lập tức cập nhật trang phục với hiệu ứng vải rủ và ánh kim chân thực.',
                    },
                    {
                      step: '04',
                      title: 'Đọc Thẻ Thông Tin Di Sản Tức Thì (Cultural Discovery)',
                      desc: 'Mỗi item đều mở kèm thẻ tóm tắt nguồn gốc, niên đại và ý nghĩa họa tiết giúp người dùng vừa chơi vừa tích lũy tri thức văn hóa dân tộc.',
                    },
                    {
                      step: '05',
                      title: 'Nhấn Nút "Sẵn Sàng" -> Kích Hoạt Cultural Guardrails & Cấp Thẻ',
                      desc: 'Người dùng nhấn nút "Sẵn sàng" viền bạc 3D. Hệ thống gửi toàn bộ danh sách đồ tới AI. Bảng "Đối Chiếu Văn Hóa & Thẻ Thông Tin Di Sản" trượt mở bên dưới, xác nhận chuẩn mực hoặc đưa ra lời nhắc tinh tế kèm gợi ý sửa đổi hoàn hảo.',
                    },
                  ].map((flow) => (
                    <div
                      key={flow.step}
                      className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#991B1B] text-white flex items-center justify-center font-bold font-mono shrink-0">
                        {flow.step}
                      </div>
                      <div className="space-y-1">
                        <div className="font-bold text-xs sm:text-sm text-stone-900">{flow.title}</div>
                        <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed">{flow.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-[11px]">Bản đặc tả thiết kế đáp ứng đầy đủ tiêu chí Art Director & UI/UX</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold transition-all active:scale-95 text-xs shadow-xs"
          >
            Đóng & Trải Nghiệm Studio
          </button>
        </div>
      </div>
    </div>
  );
}
