# Review bản đầu

## Đã kiểm tra

- Build production bằng Vite: thành công.
- Node test: tính đầy đủ của ba bản dịch, nội dung/vai trò của bốn dự án, hash route hợp lệ và không hợp lệ.
- Browser: giao diện desktop, mobile 390px, tiếng Việt/Anh/Nhật, menu mobile, filter chỉ hiện FoodGo khi chọn Mobile.
- Mở chi tiết bằng folder; Escape đóng dialog và khôi phục focus đúng folder.
- Đổi theme rồi reload vẫn giữ lựa chọn; deep link dự án có thể mở trực tiếp.
- Console không có lỗi ứng dụng trong các luồng đã kiểm tra.

## Bạn có thể test / review

1. Màu sắc, kích thước chữ, độ thoáng và thứ tự các section.
2. Mở cả bốn folder; kiểm tra nội dung, vai trò, công nghệ và link repo.
3. Chuyển VI / EN / JP; thử đọc bản Nhật trên điện thoại.
4. Đổi sáng/tối, reload trang. Thử FX AUTO / ON / OFF ở footer. AUTO theo cài đặt giảm chuyển động của hệ thống; ON là lựa chọn bật đầy đủ của bạn.
5. Bấm lọc Web / Mobile / Tất cả.
6. Dùng Tab, Enter, Escape để kiểm tra thao tác không cần chuột.
7. Copy email và kiểm tra đúng địa chỉ. Nút viết email mở ứng dụng mail của máy.

## Cần nội dung thực tế

- Ảnh cá nhân tùy chọn: hiện dùng monogram thiết kế riêng.
- Screenshot/video ứng dụng: hiện dùng minh họa có nhãn trong chi tiết.
- Stack FoodGo mới nhất và mô tả chi tiết các sự kiện realtime.
- Tên miền riêng và quyền truy cập phiên Cloudflare để deploy.
- CV đã cập nhật, nếu muốn bổ sung nút tải ở bản tiếp theo.

## Review font và motion

- Be Vietnam Pro + Playfair Display được self-host, kèm Noto Sans JP và giấy phép font.
- Kiểm tra hiển thị dấu tiếng Việt trên tiêu đề, mô tả và nhãn; tiếng Nhật dùng Noto Sans JP.
- Trình duyệt kiểm thử có `prefers-reduced-motion: reduce`: AUTO không chạy animation; ON chạy cursor, reveal và star rotation; OFF trả về native cursor và nội dung tĩnh.
- Hover folder: cursor đổi sang MỞ / VIEW / 見る; các biến góc nghiêng 3D và glare thay đổi theo vị trí chuột.
- Dialog: dùng lại native cursor, Escape đóng và khôi phục focus. Kiểm tra không có lỗi console.
- Mobile 320/390px: kiểm tra theo `clientWidth` (trừ scrollbar), không tràn ngang; tên folder thu nhỏ phù hợp ở 320px. Kiểm tra nội dung Việt và Nhật sau khi đổi font.
- Chi tiết phân tích ba trang tham khảo và cấu trúc animation: `docs/MOTION.md`.

## Mascot

- Kiểm tra mascot di chuyển, nghỉ, đổi hướng và hiện lời chào khi bấm.
- Ẩn nhân vật, reload: nút hiện lại vẫn có; chọn hiện lại để khôi phục.
- FX OFF: nhân vật đứng yên. Dialog dự án mở: mascot tạm ẩn.
