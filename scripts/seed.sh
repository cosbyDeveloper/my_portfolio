#!/bin/bash
set -e

# Load .env.local safely - only lines with KEY=VALUE format
if [ -f .env.local ]; then
    while IFS= read -r line; do
        # Skip empty lines, comments, and lines without =
        [[ -z "$line" || "$line" =~ ^[[:space:]]*# || ! "$line" =~ = ]] && continue
        # Export the variable
        export "$line"
    done < .env.local
fi

# Validate env vars
if [ -z "$ADMIN_EMAIL" ] || [ -z "$ADMIN_PASSWORD" ]; then
    echo "✗ Error: Missing ADMIN_EMAIL and ADMIN_PASSWORD in .env.local"
    exit 1
fi

ADMIN_NAME="${ADMIN_NAME:-Admin}"
ADMIN_URL="${ADMIN_URL:-http://localhost:3000}"

echo "🌱 Seeding admin user..."

# Call the seed endpoint
RESPONSE=$(curl -s -X POST "$ADMIN_URL/api/auth/seed" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$ADMIN_EMAIL\",
    \"password\": \"$ADMIN_PASSWORD\",
    \"name\": \"$ADMIN_NAME\"
  }")

echo "$RESPONSE" | grep -q '"success":true'
if [ $? -eq 0 ]; then
    echo "✓ Admin user created successfully"
    echo "  Email: $ADMIN_EMAIL"
    echo "  Name: $ADMIN_NAME"
    exit 0
else
    ERROR=$(echo "$RESPONSE" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)
    if [ -z "$ERROR" ]; then
        echo "✗ Error: $RESPONSE"
    else
        echo "✗ Error: $ERROR"
    fi
    exit 1
fi
