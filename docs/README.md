# KF13 Documentation

Dokumentasi teknis dan panduan untuk proyek KF13 - Klub Fisika.

## 📋 Daftar Dokumen

### Platform & Visi
- [Platform Proposal](./platform-proposal.md) - Visi, fitur, dan roadmap platform KF13

### Hosting & Domain
- [Domain & Hosting](./domain-hosting.md) - Strategi domain dan konfigurasi hosting
- [Database Strategy](./database-strategy.md) - Keputusan database (Supabase/PostgreSQL)

### Design System
- [Design System](./design-system.md) - Panduan komponen UI dan styling
- [Typography & Spacing Guide](./typography-spacing-guide.md) - Panduan tipografi dan spacing
- [Button Guide](./button-guide.md) - Panduan penggunaan komponen button

### Setup & Konfigurasi
- [Favicon & PWA Setup](./favicon-pwa-setup.md) - Konfigurasi favicon dan PWA

## 🏗️ Struktur Proyek

```
klubfisika.github.io/
├── src/
│   ├── components/     # Komponen UI
│   │   ├── qwik/       # Komponen Qwik (interaktif)
│   │   ├── ui/         # Komponen UI dasar
│   │   └── sections/   # Section components
│   ├── layouts/        # Layout templates
│   │   ├── Layout.astro        # Layout website utama
│   │   └── PlatformLayout.astro # Layout platform member
│   ├── pages/          # Halaman
│   │   ├── platform/   # Halaman platform (login required)
│   │   └── u/          # Profil publik user
│   ├── lib/            # Utilities
│   │   ├── router.ts   # Client-side routing guards
│   │   ├── kaskus.ts   # Sistem reputasi Kaskus-style
│   │   └── turso.ts    # Database client
│   ├── content/        # Content collections (blog)
│   └── assets/         # Static assets (images)
├── docs/               # Dokumentasi
├── public/             # Public assets
└── progress/           # Progress reports
```

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) v5 (SSG)
- **Interaktif**: [Qwik](https://qwik.builder.io) untuk komponen client-side
- **Database**: [Turso](https://turso.tech) (SQLite edge)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4
- **Hosting**: GitHub Pages

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build
pnpm build

# Preview build
pnpm preview
```

## 📁 Alias Path

| Alias | Path |
|-------|------|
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@layouts/*` | `src/layouts/*` |
| `@lib/*` | `src/lib/*` |
| `@assets/*` | `src/assets/*` |
| `@data/*` | `src/data/*` |

## 🔗 Links

- Website: [klubfisika.github.io](https://klubfisika.github.io)
- Repository: [github.com/klubfisika/klubfisika.github.io](https://github.com/klubfisika/klubfisika.github.io)
