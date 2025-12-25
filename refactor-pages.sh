#!/bin/bash

# Script untuk refaktor semua halaman menggunakan Layout

PAGES_DIR="/home/dev/web/instances/clients/services/klubfisika.github.io/src/pages"

# List halaman yang perlu direfaktor
PAGES=("contact.astro" "events.astro" "partnership.astro" "research.astro" "terms.astro" "index.astro")

for page in "${PAGES[@]}"; do
    echo "Refactoring $page..."
    
    # Backup original
    cp "$PAGES_DIR/$page" "$PAGES_DIR/${page}.backup"
    
    # Extract title and description
    TITLE=$(grep -o 'title="[^"]*"' "$PAGES_DIR/$page" | head -1 | sed 's/title="//;s/"//')
    DESC=$(grep -o 'description="[^"]*"' "$PAGES_DIR/$page" | head -1 | sed 's/description="//;s/"//')
    
    echo "  Title: $TITLE"
    echo "  Description: $DESC"
done

echo "Backup completed. Manual refactoring needed for each page."
