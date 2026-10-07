# KAYLIN.DEV — Software Security Audit & Analysis Hub

> Bản sao cục bộ (offline mirror) của [kaylin.dev](https://kaylin.dev) — trang profile / landing page giới thiệu dịch vụ **Binary Security Evaluation & De-obfuscation**: PyArmor 7/8/9, PyInstaller, Nuitka, Golang, Rust, Android APK/AAB, iOS IPA.
>
> Đã được sửa để **chạy đầy đủ 100% hiệu ứng** cả qua HTTP lẫn mở trực tiếp `index.html` (`file://`).

![Preview](og-image.png)

## ✨ Tổng quan

Trang đơn `index.html` (Next.js static export + Turbopack chunks) gồm các section:

| # | Section | Nội dung |
|---|---------|----------|
| Hero | `SYS.ONLINE // SECURITY AUDIT` | Nền canvas Three.js / matrix tương tác, headline, CTA Consult |
| `#profile` | Operator Profile — KAYLIN // Lead Operator | Principal Reverse Engineer, model mặt nạ 3D morph (chớp mắt), card PyArmor 7/8/9 VM, SFX toggle, link Telegram |
| `#workspace` | Software Security Analysis Workspace | Demo terminal `KAYLIN v5.0`: tabs Binary Structure / Security Audit / Source Recovery, disassembly `0x00401000`, 47 CFG nodes |
| `#catalog` | Structure Analysis & Security Auditing | Cards dịch vụ: PyArmor de-obfuscation (24–48h), PyInstaller unpack (12–24h), Nuitka audit (48h), Golang pclntab, Rust, APK/AAB, IPA |
| `#standards` | Safety & Confidentiality Standards | Quy trình audit chuyên nghiệp, bảo mật, NDA |
| `#faq` | FAQ | PyArmor extraction, packed binaries, turnaround, cách đặt hàng |
| Footer | Contact | `CONTACT ADMIN (@kaylin)` → Telegram, Community → Discord `discord.gg/P5ZqBUwDPq` |

Liên hệ chính:

- **Consult / Telegram:** https://t.me/kaylinit 
- **Community / Discord:** https://discord.gg/P5ZqBUwDPq
- **Canonical / SEO:** https://kaylin.dev

## 🚀 Cách chạy

### Cách 1 — HTTP local (khuyên dùng, đủ 100% hiệu ứng)

Double-click `start-server.cmd`, hoặc:

```powershell
cd d:\code_kaylin\profile\kaylin.dev
python -m http.server 8000
# mở http://localhost:8000/
```

`start-server.cmd` tự tìm `python`/`py`, mở browser và serve port `8000`.

### Cách 2 — Mở trực tiếp `index.html` (file://)

Mở file `index.html` bằng Chrome/Edge — vẫn đủ hiệu ứng, console không lỗi đỏ, vì:

- 18 font `.woff2` đã nhúng `data:` URL vào CSS
- `manifest.json` nhúng `data:` URL
- `models/anonymous.json` (447 KB, model mặt nạ 3D) nhúng base64 + shim `fetch` chỉ kích hoạt trên `file://` (HTTP vẫn tải file gốc)

## 📁 Cấu trúc thư mục

```
kaylin.dev/
├── index.html                  # Trang chính (~697 KB, đã nhúng font/manifest/model-shim)
├── _next/static/...            # JS/CSS Turbopack (bao gồm 3 chunk động đã tải bổ sung)
├── models/anonymous.json       # Model mặt nạ 3D section Profile
├── favicon.ico                 # Favicon (25 KB)
├── og-image.png                # Ảnh preview OG/Twitter (1200x630)
├── manifest.json               # PWA manifest (start_url: ./)
├── robots.txt                  # Allow / + sitemap https://kaylin.dev/sitemap.xml
├── start-server.cmd            # Script chạy HTTP server port 8000
└── README.md
```

## 🛠️ Những gì đã sửa so với bản tải gốc

1. **Tải bổ sung 3 chunk JS động bị thiếu** (hiệu ứng hero Three.js/matrix + component profile):
   - `_next/static/immutable/chunks/03_mbcm3hy87p.js`
   - `_next/static/immutable/chunks/1gcfpc4kruarp.js`
   - `_next/static/immutable/chunks/40a_xtesqc3f-.js`
2. **Sửa lỗi React không hydrate** — tool mirror đã đổi `/_next/...` thành relative khiến Turbopack không khớp chunk ID (entry Next không chạy → mất hiệu ứng). Thêm `window.TURBOPACK_CHUNK_BASE_PATH="_next/"` trong `<head>` để chạy cả HTTP lẫn `file://`.
3. **Chuẩn hóa đường dẫn payload RSC**: `/_next/` → `_next/`, `manifest.json`, `favicon.ico` (bản cũ hỏng `%3F`).
4. **Tải asset thiếu**: `favicon.ico`, `og-image.png`, `models/anonymous.json`.
5. **Đổi link model trong chunk thành tương đối** (không phụ thuộc serve ở root).
6. **Sửa `manifest.json`**: `start_url: "./"`, icon relative.
7. **Anchor điều hướng**: `index.html#profile` → `#profile` (không reload thừa).
8. **Nhúng 18 font `.woff2` vào CSS** dạng `data:` + gỡ 4 `<link rel=preload as=font>` và hint `:HL[...woff2...]` trong RSC — hết lỗi CORS font trên `file://`.
9. **Manifest nhúng `data:` URL** — Chrome chặn trang `file://` tải `manifest.json` (CORS).
10. **Shim `fetch` cho model 3D** — base64 trong `index.html`, chỉ bật trên `file://`.

> Kiểm chứng bằng headless Chrome: cả `file://` lẫn HTTP đều **0 lỗi thật** (chỉ còn 2 warning `THREE.Clock` vốn có trên site gốc), font loaded, model 3D + 2 canvas + reveal hoạt động.

## ✅ Hiệu ứng đã hoạt động (khớp site gốc)

- Nền hero Three.js/matrix (canvas) tương tác
- Reveal on scroll (IntersectionObserver cho `.reveal`)
- Header blur/vignette khi cuộn
- Model mặt nạ 3D morph (chớp mắt) ở Operator Profile
- Nút SFX, menu mobile, hover/shine/scanline… (qua hydration React)

## 🔍 SEO / Meta

- `title`: `KAYLIN.DEV | Software Security Audit & Analysis Hub`
- `description`: binary security evaluation & de-obfuscation — PyArmor 7/8/9, PyInstaller, Nuitka, Golang, Rust, APK/AAB, IPA
- `canonical`: https://kaylin.dev · `robots`: index, follow
- OG/Twitter: `og-image.png` (1200×630), `theme-color: #050506`, `author/creator: KAYLIN`

## 📌 Ghi chú deploy

Đây là bản **static mirror** — chỉ cần host tĩnh (Nginx, Vercel Static, GitHub Pages, `python -m http.server`). Không cần Node/Next runtime. Giữ nguyên cấu trúc tương đối `_next/`, `models/`, `favicon.ico`, `og-image.png`, `manifest.json` cạnh `index.html`.

---

© KAYLIN.DEV — Mirror cục bộ phục vụ preview/offline. Nội dung & dịch vụ thuộc về site gốc https://kaylin.dev.
