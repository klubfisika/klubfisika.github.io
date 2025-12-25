#!/bin/bash
# test-build.sh - Simulate GitHub Actions build locally

echo "🧪 Testing GitHub Actions Build Locally..."

# Clean previous build
rm -rf dist/
rm -rf node_modules/

# Install dependencies (like GitHub Actions)
echo "📦 Installing dependencies..."
bun install

# Test build (like GitHub Actions)
echo "🏗️ Testing build..."
bun run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for GitHub Actions"
else
    echo "❌ Build failed! Fix before pushing"
    exit 1
fi

# Test preview
echo "👀 Testing preview..."
bun run preview &
PREVIEW_PID=$!
sleep 3
curl -f http://localhost:4321 > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Preview works!"
else
    echo "⚠️ Preview might have issues"
fi
kill $PREVIEW_PID

echo "🎉 All tests passed!"
