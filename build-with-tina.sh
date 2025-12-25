#!/bin/bash
# build-with-tina.sh - Build with TinaCMS using proper environment variables

echo "🦙 Building with TinaCMS..."

# Load environment variables from .env.local
if [ -f .env.local ]; then
    echo "📄 Loading environment variables from .env.local"
    export $(cat .env.local | grep -v '^#' | xargs)
else
    echo "⚠️ .env.local not found, using manual export"
    export NEXT_PUBLIC_TINA_CLIENT_ID=531fc03b-7dab-4dee-96f3-5f5c4d91f4d5
    export TINA_TOKEN=29b9200c43ce622d18c90440b0eec1ba9d305158
fi

# Verify environment variables
if [ -z "$NEXT_PUBLIC_TINA_CLIENT_ID" ] || [ -z "$TINA_TOKEN" ]; then
    echo "❌ Missing TinaCMS environment variables"
    echo "Please set NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN"
    exit 1
fi

echo "✅ Environment variables loaded"
echo "CLIENT_ID: ${NEXT_PUBLIC_TINA_CLIENT_ID:0:8}..."
echo "TOKEN: ${TINA_TOKEN:0:8}..."

# Stop any running TinaCMS dev server
echo "🛑 Stopping any running TinaCMS dev server..."
pkill -f "tinacms" 2>/dev/null || true
lsof -ti:9000 | xargs kill -9 2>/dev/null || true

# Build TinaCMS
echo "🏗️ Building TinaCMS..."
bunx tinacms build

if [ $? -eq 0 ]; then
    echo "✅ TinaCMS build successful!"
    
    # Build Astro
    echo "🚀 Building Astro..."
    bun run build
    
    if [ $? -eq 0 ]; then
        echo "🎉 Full build successful!"
    else
        echo "❌ Astro build failed"
        exit 1
    fi
else
    echo "❌ TinaCMS build failed"
    exit 1
fi
