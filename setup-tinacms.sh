#!/bin/bash

# Script untuk setup TinaCMS manual
# Jalankan dengan: ./setup-tinacms.sh

echo "🚀 Setting up TinaCMS for KF13..."

# 1. Create .env.local
echo "📝 Creating .env.local..."
cat > .env.local << 'EOF'
NEXT_PUBLIC_TINA_CLIENT_ID=531fc03b-7dab-4dee-96f3-5f5c4d91f4d5
TINA_TOKEN=29b9200c43ce622d18c90440b0eec1ba9d305158
EOF

# 2. Export environment variables
export NEXT_PUBLIC_TINA_CLIENT_ID=531fc03b-7dab-4dee-96f3-5f5c4d91f4d5
export TINA_TOKEN=29b9200c43ce622d18c90440b0eec1ba9d305158

# 3. Install TinaCMS
echo "📦 Installing TinaCMS packages..."
bun add tinacms
bun add -D @tinacms/cli @types/node

# 4. Create tina directory and config
echo "⚙️ Creating TinaCMS config..."
mkdir -p tina

cat > tina/config.ts << 'EOF'
import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "src/content/blog",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publish Date",
            required: true,
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "authors",
        label: "Authors",
        path: "src/content/authors",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "bio",
            label: "Bio",
          },
          {
            type: "image",
            name: "avatar",
            label: "Avatar",
          },
        ],
      },
    ],
  },
});
EOF

# 5. Build TinaCMS
echo "🔨 Building TinaCMS..."
bunx tinacms build --skip-cloud-checks

# 6. Update package.json scripts
echo "📝 Updating package.json scripts..."
# Backup original package.json
cp package.json package.json.backup

# Add TinaCMS scripts using node
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts = {
  ...pkg.scripts,
  'dev:tina': 'bunx tinacms dev -c \"bun run dev\"',
  'build:tina': 'bunx tinacms build && bun run build'
};
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

echo "✅ TinaCMS setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Run: bun run dev:tina"
echo "2. Open: http://localhost:4321/admin"
echo "3. Login dengan GitHub untuk akses admin"
echo ""
echo "📁 Files created:"
echo "- .env.local (environment variables)"
echo "- tina/config.ts (TinaCMS configuration)"
echo "- public/admin/index.html (admin interface)"
echo ""
