# Duyên — Project Archive

Portfolio cá nhân của Nguyễn Thái Kỳ Duyên. Concept folder tương tác, màu xanh dương/xanh lá, Việt–Anh–Nhật, hai theme sáng/tối và responsive.

## Chạy tại máy

Yêu cầu Node.js 22.12+ (đã kiểm tra với Node 24) và npm.

```bash
npm ci
npm run dev
```

Vite hiển thị URL local. Build và kiểm tra bản production:

```bash
npm test
npm run build
npm run preview
```

## Công nghệ và kiến trúc

- React 19, Vite 7, JavaScript ES modules, CSS thuần, Lucide icons.
- Nội dung và bản dịch nằm ở `src/content.js`; UI ở `src/App.jsx`; design tokens và responsive ở `src/styles.css`.
- Ngôn ngữ mặc định: Việt. Theme lần đầu theo hệ điều hành, sau đó theo lựa chọn đã lưu. Khi localStorage bị chặn, trang vẫn hoạt động.
- Project detail dùng native `<dialog>`: modal focus trap, Escape, khôi phục focus về folder. Dùng hash route để chia sẻ URL mà không cần server routing.
- Ví dụ `/#/ja/projects/comichub`. Các liên kết trong trang dùng `#projects`, `#about`, `#contact`.
- Ngôn ngữ, theme và tùy chọn hiệu ứng chuột được lưu trong localStorage. Không có analytics, tài khoản hay backend thu thập dữ liệu.
- Font Playfair Display, Be Vietnam Pro và Noto Sans JP được self-host bằng Fontsource, có bộ ký tự Vietnamese và fallback hệ thống; hình minh họa dự án được dựng bằng CSS, không dùng ảnh chụp ứng dụng giả.

## Thêm dự án

## Mascot Mochi

`src/Mascot.jsx` và `src/mascot.css` tạo mascot mèo xanh bằng SVG. Nhân vật đi qua lại ở mép dưới, nghỉ định kỳ, chào khi bấm, dừng khi hover/focus, và ẩn trong dialog/menu. Nút X ẩn nhân vật; nút dấu chân hiện lại. Lựa chọn ẩn/hiện được lưu trong `duyen-mascot`. FX OFF hoặc AUTO với reduced-motion giữ nhân vật đứng yên. Không tải asset bên ngoài.

## Thêm dự án

1. Thêm object vào `projects` trong `src/content.js`: `id`, `name`, `category`, `color`, `type`, `status`, `repo`, `stack`.
2. Thêm `vi`, `en`, `ja`, mỗi bản có `subtitle`, `summary`, `description`, `highlights` (ba mục), `next`.
3. Thêm ba bản dịch vai trò vào `roles`.
4. Thêm icon và hình minh họa/ảnh thực tế vào `src/App.jsx`, hoặc tái sử dụng bố cục hiện có.
5. Chạy test và cập nhật danh sách mong đợi trong test khi thêm dự án chính thức. Đổi câu giới thiệu “bốn dự án” theo số lượng mới.

## Deploy Cloudflare Pages

### Git integration

1. Đưa source lên repo GitHub. Nếu dùng repo portfolio cũ, chọn nhánh `portfolio-v2`.
2. Cloudflare Dashboard → Workers & Pages → tạo ứng dụng → chọn Pages → kết nối Git.
3. Chọn repo/nhánh, build command `npm run build`, output directory `dist`, root directory để trống.
4. Dùng Node 22 hoặc 24 cho môi trường build. Deploy, mở link `*.pages.dev`, thử cả URL chi tiết dự án.
5. Khi publish được repo, cập nhật `repo` của dự án Portfolio nếu cần.

### Direct Upload

Build trước bằng `npm run build`, rồi upload **nội dung thư mục `dist`** trong luồng Pages Direct Upload. Có thể dùng file `portfolio-dist.zip` được cung cấp cùng source (nếu có). Không upload toàn bộ source hoặc `node_modules`.

### Tên miền riêng, DNS và HTTPS

1. Có tên miền thuộc quyền quản lý của bạn. Thêm domain vào Cloudflare.
2. Tại nhà đăng ký, đổi Nameserver sang đúng hai NS Cloudflare cấp cho domain đó. Không dùng NS minh họa.
3. Chờ zone Active; trong Pages → Custom domains → thêm tên miền và làm theo hướng dẫn bản ghi.
4. Chờ HTTPS hoạt động, mở `https://ten-mien-cua-ban` trong cửa sổ ẩn danh và trên điện thoại.
5. Nếu có `www`, cấu hình thêm hoặc redirect về một domain chính. Không đổi/xóa bản ghi của dịch vụ khác khi chưa xác định mục đích.

Tham khảo chính thức: https://developers.cloudflare.com/pages/configuration/custom-domains/

## Trước khi nộp / ứng tuyển

- Thay hình minh họa bằng screenshot thật nếu có; luôn ghi rõ nếu hình chỉ mang tính minh họa.
- FoodGo: vai trò dev chính phía Tài xế và realtime do chủ portfolio xác nhận. Stack chi tiết vẫn chờ kiểm tra từ repo nhóm; chưa khẳng định Firebase, WebSocket hoặc thư viện realtime cụ thể.
- Không đưa nội dung mẫu từ portfolio cũ (N3, TOEIC, thực tập) vào bản này.
- Bản tiếng Nhật là bản nháp để review; trình độ cá nhân được ghi N4 đang học, không ghi đã có chứng chỉ.
- Repo portfolio hiện chưa có file CV mới để tải. Không có nút tải CV giả hoặc form liên hệ không gửi được.
- Open Graph SVG là tài nguyên khởi điểm. Một số mạng xã hội cần PNG/JPEG và URL ảnh tuyệt đối; bổ sung khi chốt domain.
- Bài tập còn yêu cầu tài liệu nghiên cứu WebSocket riêng; website không tự thay thế tài liệu đó.

## Git

Các mốc scaffold, giao diện và QA được commit riêng. `dist/`, `node_modules/`, `.env*` không được commit.
