#!/bin/bash

echo "🚀 Running Profile Page Performance Tests..."

# Build the project
echo "📦 Building project..."
pnpm build

# Run Lighthouse CI
echo "🔍 Running Lighthouse audit..."
npx lighthouse-ci autorun --config=.lighthouserc.json

# Run Playwright tests
echo "🎭 Running E2E tests..."
npx playwright test tests/profile.spec.ts

# Check bundle size
echo "📊 Checking bundle size..."
npx bundlesize

echo "✅ All tests completed!"
