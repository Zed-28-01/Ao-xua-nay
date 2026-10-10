# Kế hoạch Triển khai: Trang phục Mặc định Ở Nhà (Homewear Base) & Cơ chế Tự Phối đồ Từng Món

## 1. Mục tiêu Cải tiến theo Phản hồi Người dùng
- **Trạng thái ban đầu của Model (Homewear Base):**
  - Khi bắt đầu hoặc vào bất kỳ trạm nào, người mẫu **chỉ mặc bộ đồ ở nhà** (không cho sẵn trang phục đúng đáp án ngay từ đầu).
  - Bộ đồ ở nhà bám sát 100% hình ảnh mẫu của người dùng (`1791618687172.png`):
    - **Áo ba lỗ trắng (White Tank Top)** ôm dáng búp bê Popmart, viền cổ tròn thoải mái, chất thun co giãn mát mẻ.
    - **Quần short thun xám (Heather Gray Jersey Shorts)** với cạp thun co giãn / dây rút thể thao năng động.
    - Chân trần hoặc tất mộc dễ thương tỷ lệ chibi Popmart 1:2.8.
- **Loại bỏ việc tự động mặc sẵn đáp án:**
  - Khi chọn bất kỳ trạm lịch sử nào từ Bản đồ (Lý - Trần, Lê Sơ, Triều Nguyễn, Pháp thuộc, Tân thời), hệ thống **không tự động gán toàn bộ trang phục gợi ý** lên người mẫu.
  - Người chơi phải tự khám phá, mở tủ đồ và tự tay bấm chọn từng món (áo khoác, áo yếm/áo trong, quần lụa, hài thêu, nón/phụ kiện).
- **Thẻ Gợi ý Phối đồ (Styling Suggestion & Recipe):**
  - Vẫn hiển thị công thức phối đồ chuẩn sử liệu và ảnh minh họa để người chơi tham khảo mục tiêu, nhưng nút bấm cho phép xem chi tiết gợi ý thay vì nút "Áp dụng tất cả ngay".
  - Thêm tính năng "Gợi ý món tiếp theo" hoặc xem danh sách các món cần tìm trong tủ đồ.
- **Đánh giá Thuần phong Mỹ tục & Xếp hạng Sao:**
  - Khi ở trạng thái đồ ở nhà: Hệ thống nhắc nhở nhẹ nhàng "Đang mặc trang phục ở nhà - Chưa sẵn sàng tham gia sự kiện lịch sử".
  - Khi người chơi phối đồ: Chấm sao (1 - 5 sao) dựa trên độ kín đáo, tính đoan trang và hòa hợp văn hóa, kèm giải thích cặn kẽ vì sao phù hợp hoặc chưa phù hợp với thuần phong mỹ tục.

---

## 2. Thiết kế Kỹ thuật & Thay đổi Thành phần

### A. Cập nhật Visualizer Búp bê Popmart 3D (`PopmartDollVisualizer.tsx`)
1. **Lớp Trang phục Nền Ở Nhà (Default Homewear Layer SVG):**
   - Khi chưa chọn áo ngoài (`outerwear`) hay áo trong lịch sử (`innerwear`):
     - Hiển thị **Áo ba lỗ trắng** (`#FFFFFF` với viền dệt `#E2E8F0`, đổ bóng ngực mềm mại, đường may thể thao ở cổ và nách).
   - Khi chưa chọn quần/váy lịch sử (`bottom`):
     - Hiển thị **Quần short thun xám** (`#9CA3AF` / `#6B7280` heather gray, đường line trắng bên hông, cạp thun năng động, chiều dài ngang đùi búp bê chibi).
   - Khi chưa chọn giày/hài (`footwear`):
     - Hiển thị đôi bàn chân chibi trần mộc mạc hoặc tất trắng ngắn viền xám.
2. **Cơ chế Xếp lớp (Layering) mượt mà:**
   - Khi người chơi chọn **Áo Dài**, **Giao Lĩnh**, **Viên Lĩnh**, hoặc **Áo Yếm**: Trang phục truyền thống sẽ phủ lên trên hoặc thay thế áo ba lỗ trắng một cách tự nhiên.
   - Khi người chơi chọn **Quần lụa trắng**, **Quần ống rộng**, hoặc **Chân váy**: Quần truyền thống sẽ thay thế quần short thun xám.
   - Khi người chơi chọn **Hài thêu**, **Guốc mộc**: Đôi hài sẽ che bàn chân trần.

### B. Cập nhật Trạng thái Toàn cục & Khởi tạo (`app/page.tsx`)
1. **Khởi tạo `selectedItems` rỗng ban đầu:**
   - Chuyển `selectedItems` ban đầu thành mảng rỗng `[]` (người mẫu mặc định ở nhà).
2. **Hành vi khi chuyển Trạm Lịch sử (`handleSelectStationAndEnterStudio`):**
   - Không gán `presetItemIds` vào `selectedItems`.
   - Giữ nguyên người mẫu trong trang phục ở nhà (hoặc giữ các món người chơi đang tự chọn nếu muốn mix xuyên thời kỳ).
   - Reset trạng thái chấm sao và sẵn sàng để người chơi tự tay thử đồ.
3. **Thêm nút Reset nhanh về "Bộ đồ ở nhà":**
   - Cung cấp nút tiện ích 🏠 **"Về đồ ở nhà"** trên thanh công cụ của Canvas hoặc Tủ đồ để người chơi có thể cởi hết trang phục cổ trang bất kỳ lúc nào và trở về bộ áo ba lỗ + quần thun xám.

### C. Nâng cấp Tủ đồ (`WardrobeDrawer.tsx`)
1. **Chế độ Tự chọn Từng Món (Manual Mix & Match Experience):**
   - Người chơi bấm vào từng món trong danh mục (Áo khoác, Áo mặc trong, Quần/Váy, Giày/Hài, Phụ kiện, Hoa văn) để mặc vào / cởi ra trên người mẫu.
   - Huy hiệu gợi ý ⭐ "Gợi ý của thời kỳ này" trên các món đồ thuộc công thức của trạm hiện tại giúp người chơi dễ dàng tìm kiếm mà không bị tước đi quyền tự phối.
2. **Bộ lọc & Trạng thái Trực quan:**
   - Hiển thị rõ số lượng món đang mặc (vd: "Đang mặc 3 món").

---

## 3. Các Bước Triển khai Cụ thể

1. **Bước 1 - Nâng cấp SVG Popmart Doll với Bộ Đồ Ở Nhà Chuẩn Ảnh Mẫu:**
   - Vẽ vector chính xác cho áo ba lỗ trắng (white scoop-neck tank top) và quần short thun xám (heather gray athletic shorts) với đường may tinh xảo.
   - Thiết lập điều kiện hiển thị thông minh: Chỉ ẩn đồ ở nhà khi có trang phục truyền thống tương ứng che phủ.
2. **Bước 2 - Điều chỉnh Logic Khởi tạo & Điều hướng trong `page.tsx`:**
   - Xóa bỏ việc tự động mặc sẵn trang phục đáp án khi mở app và khi bấm vào trạm trên Bản đồ.
   - Cho phép người chơi tự chọn từng món.
3. **Bước 3 - Cập nhật Giao diện Đánh giá Thuần phong Mỹ tục:**
   - Trạng thái mặc đồ ở nhà: Báo hiệu "Trang phục thường nhật tại gia" (Chưa chấm sao sự kiện).
   - Khi người chơi tự chọn đồ: Tính điểm sao phù hợp thuần phong mỹ tục thời kỳ và phân tích lý do.
4. **Bước 4 - Kiểm thử & Biên dịch:**
   - Chạy `lint_applet` và `compile_applet` để đảm bảo hệ thống mượt mà, không phát sinh lỗi.
