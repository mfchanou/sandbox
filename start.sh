#!/bin/bash

echo "🎧 Article/Tweet to Audio - Configuration"
echo "=========================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    echo "   Installez Node.js depuis https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js installé: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi
echo "✅ npm installé: $(npm --version)"

# Check espeak
if ! command -v espeak &> /dev/null; then
    echo "⚠️  espeak n'est pas installé"
    echo ""
    echo "Installation recommandée:"
    echo "  Ubuntu/Debian: sudo apt-get install -y espeak"
    echo "  macOS: brew install espeak"
    echo ""
    read -p "Voulez-vous continuer sans espeak? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ espeak installé"
fi

# Check ffmpeg
if ! command -v ffmpeg &> /dev/null; then
    echo "⚠️  ffmpeg n'est pas installé"
    echo ""
    echo "Installation recommandée:"
    echo "  Ubuntu/Debian: sudo apt-get install -y ffmpeg"
    echo "  macOS: brew install ffmpeg"
    echo ""
    read -p "Voulez-vous continuer sans ffmpeg? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ ffmpeg installé"
fi

echo ""
echo "📦 Installation des dépendances Node.js..."

if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Erreur lors de l'installation des dépendances"
        exit 1
    fi
else
    echo "✅ Les dépendances sont déjà installées"
fi

echo ""
echo "🚀 Démarrage du serveur..."
echo ""
echo "Le serveur sera disponible sur: http://localhost:3000"
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""
sleep 2

npm start
