# ⚡ Démarrage Rapide

## Si vous avez déjà le code sur votre machine

1. **Ouvrez un terminal dans le dossier du projet**
   ```bash
   cd /chemin/vers/article-tweet-to-audio
   ```

2. **Installez espeak et ffmpeg** (une seule fois)

   **Ubuntu/Debian :**
   ```bash
   sudo apt-get update && sudo apt-get install -y espeak ffmpeg
   ```

   **macOS :**
   ```bash
   brew install espeak ffmpeg
   ```

3. **Installez les dépendances Node** (une seule fois)
   ```bash
   npm install
   ```

4. **Démarrez le serveur**
   ```bash
   npm start
   ```

5. **Ouvrez votre navigateur**
   ```
   http://localhost:3000
   ```

---

## Si vous n'avez pas encore le code

Le code est dans votre repo Git sur la branche `claude/article-tweet-to-audio-PvE02`.

1. **Récupérez la branche**
   ```bash
   git fetch origin claude/article-tweet-to-audio-PvE02
   git checkout claude/article-tweet-to-audio-PvE02
   ```

2. **Puis suivez les étapes ci-dessus** (points 2 à 5)

---

## 🎯 Test rapide

Une fois le serveur démarré, testez avec cette commande :

```bash
curl -X POST http://localhost:3000/api/convert \
  -H "Content-Type: application/json" \
  -d '{"text": "Bonjour, ceci est un test.", "language": "fr"}'
```

Vous devriez recevoir une réponse JSON avec un lien de téléchargement MP3 !

---

## ❓ Besoin d'aide ?

- Vérifiez que Node.js est installé : `node --version`
- Vérifiez que espeak est installé : `espeak --version`
- Vérifiez que ffmpeg est installé : `ffmpeg -version`
- Regardez les logs du serveur dans le terminal
