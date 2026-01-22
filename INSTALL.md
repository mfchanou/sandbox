# 🚀 Installation sur votre machine locale

## Étape 1 : Cloner le repository

```bash
git clone https://github.com/mfchanou/sandbox.git
cd sandbox
git checkout claude/article-tweet-to-audio-PvE02
```

## Étape 2 : Installer les dépendances système

### Sur Ubuntu/Debian :
```bash
sudo apt-get update
sudo apt-get install -y espeak ffmpeg
```

### Sur macOS :
```bash
brew install espeak ffmpeg
```

### Sur Windows :
1. Télécharger espeak : http://espeak.sourceforge.net/download.html
2. Télécharger ffmpeg : https://ffmpeg.org/download.html
3. Ajouter les deux au PATH système

## Étape 3 : Installer les dépendances Node.js

```bash
npm install
```

## Étape 4 : Démarrer le serveur

```bash
npm start
```

Le serveur démarrera sur **http://localhost:3000**

## Étape 5 : Ouvrir l'application

Ouvrez votre navigateur et allez à : **http://localhost:3000**

---

## 🔧 Vérification rapide

Pour vérifier que tout fonctionne :

```bash
# Test 1 : Vérifier que espeak est installé
espeak --version

# Test 2 : Vérifier que ffmpeg est installé
ffmpeg -version

# Test 3 : Tester l'API
curl http://localhost:3000/api/health
```

## ⚠️ Dépannage

### Erreur "espeak: command not found"
- Installez espeak selon les instructions ci-dessus
- Vérifiez qu'il est dans votre PATH

### Erreur "ffmpeg: command not found"
- Installez ffmpeg selon les instructions ci-dessus
- Vérifiez qu'il est dans votre PATH

### Port 3000 déjà utilisé
Changez le port dans le fichier `.env` ou en utilisant :
```bash
PORT=8080 npm start
```

### Erreur "Cannot find module"
Réinstallez les dépendances :
```bash
rm -rf node_modules package-lock.json
npm install
```
