<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/placeholder-dark.png">
  <img alt="KF13 — Klub Fisika Indonesia" src="https://github.com/user-attachments/assets/placeholder-light.png" width="100%">
</picture>

<h1 align="center">🇮🇩 KF13 — Klub Fisika Indonesia</h1>

<p align="center">
  <strong>Website & Komunitas Fisika Terbuka untuk Indonesia</strong><br>
  <em>Membangun literasi sains melalui konten, eksperimen, dan kolaborasi</em>
</p>

<p align="center">
  <a href="https://klubfisika.github.io"><img src="https://img.shields.io/badge/website-klubfisika.github.io-92400e?style=flat-square" alt="Website"></a>
  <a href="https://community.klubfisika.or.id"><img src="https://img.shields.io/badge/komunitas-community.klubfisika.or.id-065f46?style=flat-square" alt="Platform"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License"></a>
  <a href="https://github.com/klubfisika/klubfisika.github.io/actions/workflows/deploy.yml"><img src="https://img.shields.io/github/actions/workflow/status/klubfisika/klubfisika.github.io/deploy.yml?style=flat-square" alt="Deploy"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen?style=flat-square" alt="Contributions welcome"></a>
</p>

---

## 🧭 Tentang Proyek

**KF13** adalah komunitas pembelajaran fisika terbuka yang bertujuan meningkatkan literasi sains di Indonesia. Proyek ini memiliki dua bagian utama:

| Bagian | Deskripsi | Repo |
|--------|-----------|------|
| 🌐 **Website Utama** | Landing page, blog artikel fisika, informasi komunitas | Repo ini |
| 🧑‍🤝‍🧑 **Platform Komunitas** | Forum diskusi, profil anggota, proyek kolaboratif | `community.klubfisika.or.id` |

### 🎯 Misi

- Menyediakan **konten fisika berkualitas** dalam Bahasa Indonesia
- Membangun **ruang belajar kolaboratif** yang inklusif
- Mendorong **eksplorasi, eksperimen, dan proyek sains**
- Menjadi **jembatan** antara akademisi, pelajar, dan masyarakat umum

---

## 🛠️ Tech Stack

| Teknologi | Fungsi |
|-----------|--------|
| [**Astro**](https://astro.build) v5 | Static Site Generator, routing, content collections |
| [**Tailwind CSS**](https://tailwindcss.com) v4 | Desain brutalist + responsive |
| [**MDX**](https://mdxjs.com) | Blog dengan komponen interaktif (KaTeX, Mermaid) |
| [**Qwik**](https://qwik.builder.io) | Komponen interaktif (resumability) |
| [**GitHub Pages**](https://pages.github.com) | Hosting statis, CI/CD otomatis |
| [**Playwright**](https://playwright.dev) | End-to-end testing + aksesibilitas |

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/klubfisika/klubfisika.github.io.git
cd klubfisika.github.io

# Install dependencies (gunakan pnpm)
pnpm install

# Development server
pnpm dev               # → http://localhost:4321

# Run tests
pnpm test              # Playwright E2E + aksesibilitas

# Production build
pnpm build             # → dist/
pnpm preview           # Preview hasil build
```

> **Catatan**: Proyek ini menggunakan **pnpm** sebagai package manager.

---

## 📁 Struktur Proyek

```
klubfisika.github.io/
├── src/
│   ├── components/
│   │   ├── blog/           # Komponen blog (ArticleCard, FeaturedArticle, dll)
│   │   ├── sections/       # Section halaman (Hero, About, Programs, FAQ, dll)
│   │   └── ui/             # Komponen UI reusable (Button, Card, Heading, dll)
│   ├── content/
│   │   └── blog/           # Artikel blog (MDX/Markdown)
│   ├── layouts/
│   │   └── Layout.astro    # Layout utama (nav, footer, SEO meta, PWA)
│   ├── pages/              # Halaman (index, about, blog, contact, events)
│   ├── styles/
│   │   ├── brutalist.css   # Tema brutalist untuk website
│   │   ├── design-system.css # Design tokens shared
│   │   └── base.css        # Reset dan utility universal
│   ├── data/               # Data statis (konfigurasi, konten)
│   └── types/              # TypeScript type definitions
├── tests/                  # Playwright E2E test suite
│   ├── landing.spec.ts     # Test landing page
│   ├── blog.spec.ts        # Test blog & artikel
│   ├── pages.spec.ts       # Test halaman statis
│   └── a11y.spec.ts        # Aksesibilitas (WCAG AA)
├── docs/                   # Dokumentasi pengembangan
├── public/                 # Asset statis (favicon, font, robots.txt)
├── astro.config.mjs        # Konfigurasi Astro
├── playwright.config.ts    # Konfigurasi Playwright
└── package.json
```

---

## 🎨 Cara Berkontribusi

KF13 adalah proyek **open source**! Kami sangat menyambut kontribusi dari siapa pun — developer, penulis, desainer, pelajar, atau siapa pun yang peduli dengan literasi sains di Indonesia.

### 💡 Area Kontribusi

| Area | Contoh Kontribusi | Cocok Untuk |
|------|------------------|-------------|
| ✍️ **Konten** | Menulis artikel fisika, menerjemahkan konten, menambah ilustrasi | Semua orang |
| 💻 **Kode** | Fix bug, tambah fitur, optimasi performa, aksesibilitas | Developer |
| 🎨 **Desain** | UI/UX improvement, ilustrasi, komponen visual | Desainer |
| 📖 **Dokumentasi** | Tutorial, panduan kontribusi, terjemahan | Semua orang |
| 🧪 **Testing** | Menambah test coverage, report bug, QA | Semua orang |
| 🌍 **Komunitas** | Moderasi diskusi, mentoring, event organizer | Semua orang |

### 🏁 Mulai Berkontribusi

1. Baca [`CONTRIBUTING.md`](CONTRIBUTING.md) untuk panduan lengkap
2. Cari issue dengan label [`good first issue`](https://github.com/klubfisika/klubfisika.github.io/labels/good%20first%20issue)
3. Fork repo, buat branch, commit perubahan, buat Pull Request
4. Diskusikan di [GitHub Discussions](https://github.com/klubfisika/klubfisika.github.io/discussions) atau WhatsApp

---

## 📝 Menulis Artikel Blog

Website ini menggunakan **MDX** untuk konten blog, mendukung:

- **KaTeX** untuk rumus matematika (LaTeX)
- **Mermaid** untuk diagram dan grafik
- **Syntax highlighting** untuk kode
- **Fira Code ligatures** untuk tipografi

### Cara menambah artikel baru:

```mdx
---
title: "Judul Artikel Fisika"
excerpt: "Deskripsi singkat artikel"
category: "Mekanika"
tags: ["newton", "eksperimen", "fisika dasar"]
author: "Nama Penulis"
date: "2024-12-26"
readTime: "5 menit"
image: "@assets/images/physics-general.webp"
---

## Pendahuluan

Konten artikel dalam **Markdown**...

$$F = ma$$

:::tip[Tips Eksperimen]
Gunakan bahan-bahan sederhana yang ada di rumah!
:::
```

> Lihat artikel existing di `src/content/blog/` untuk contoh lengkap.

---

## 🧪 Testing & Kualitas

Proyek ini berkomitmen pada kualitas tinggi:

- ✅ **Lighthouse**: 100/100 Performance & SEO
- ✅ **WCAG 2.1 AA**: Aksesibilitas terverifikasi
- ✅ **E2E Testing**: Playwright multi-browser (Chrome, Mobile Chrome, Mobile Safari)
- ✅ **Responsive**: Mobile-first design, diuji di 4 breakpoint
- ✅ **Dark Mode**: Full dark mode support

```bash
pnpm test              # Jalankan semua test
pnpm test:ui           # Playwright UI mode
pnpm test:report       # Lihat laporan test
```

---

## 🤝 Komunitas

- 💬 **WhatsApp**: [Admin KF13](https://wa.me/6282225009253)
- 🌐 **Website**: [klubfisika.github.io](https://klubfisika.github.io)
- 🧑‍🤝‍🧑 **Platform**: [community.klubfisika.or.id](https://community.klubfisika.or.id)
- 📸 **Instagram**: [@klubfisika13](https://instagram.com/klubfisika13)

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE) — bebas digunakan, dimodifikasi, dan didistribusikan.

---

<p align="center">
  <sub>Dibangun dengan ❤️ untuk literasi sains Indonesia</sub>
</p>
