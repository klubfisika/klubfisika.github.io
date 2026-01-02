#!/bin/bash

echo "🚀 Running Profile Page Performance Tests..."

# Build the project
echo "📦 Building project..."
pnpm build

# Start preview server
echo "🌐 Starting preview server..."
pnpm preview &
SERVER_PID=$!
sleep 5

# Run Lighthouse CI
echo "🔍 Running Lighthouse audit..."
pnpm lhci autorun --config=.lighthouserc.json

# Run Playwright tests
echo "🎭 Running E2E tests..."
pnpm playwright test tests/profile.spec.ts

# Check bundle size
echo "📊 Checking bundle size..."
pnpm bundlesize

# Stop preview server
kill $SERVER_PID

echo "✅ All tests completed!"
