#!/bin/bash

# Test script for Article/Tweet to Audio API

echo "🧪 Testing Article/Tweet to Audio API"
echo "======================================"
echo ""

# Test 1: Health check
echo "1️⃣ Testing health check..."
curl -s http://localhost:3000/api/health | jq '.'
echo ""

# Test 2: French TTS
echo "2️⃣ Testing French text-to-speech..."
RESULT=$(curl -s -X POST http://localhost:3000/api/convert \
  -H "Content-Type: application/json" \
  -d '{"text": "Bonjour, ceci est un test en français.", "language": "fr"}')
echo "$RESULT" | jq '.'
FILENAME=$(echo "$RESULT" | jq -r '.filename')
echo "✅ Created: $FILENAME"
echo ""

# Test 3: English TTS
echo "3️⃣ Testing English text-to-speech..."
RESULT=$(curl -s -X POST http://localhost:3000/api/convert \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello, this is an English test.", "language": "en"}')
echo "$RESULT" | jq '.'
FILENAME=$(echo "$RESULT" | jq -r '.filename')
echo "✅ Created: $FILENAME"
echo ""

# Test 4: Spanish TTS
echo "4️⃣ Testing Spanish text-to-speech..."
RESULT=$(curl -s -X POST http://localhost:3000/api/convert \
  -H "Content-Type: application/json" \
  -d '{"text": "Hola, esta es una prueba en español.", "language": "es"}')
echo "$RESULT" | jq '.'
FILENAME=$(echo "$RESULT" | jq -r '.filename')
echo "✅ Created: $FILENAME"
echo ""

# Test 5: List generated files
echo "5️⃣ Listing generated audio files..."
ls -lh audio_files/ | tail -10
echo ""
echo "Total files: $(ls audio_files/ | wc -l)"
echo ""

echo "✅ All tests completed!"
