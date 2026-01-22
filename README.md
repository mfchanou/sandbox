# 🎧 Article/Tweet to Audio - Convertisseur MP3

Une application web moderne qui transforme vos articles et threads Twitter en fichiers audio MP3 téléchargeables.

## ✨ Fonctionnalités

- 📝 **Conversion de texte direct** : Collez n'importe quel texte et convertissez-le en audio
- 🔗 **Extraction d'articles** : Entrez une URL d'article et extrayez automatiquement le contenu
- 🐦 **Support Twitter** : Interface pour threads Twitter (nécessite configuration API)
- 🌍 **Multi-langues** : Support de 6 langues (Français, Anglais, Espagnol, Allemand, Italien, Portugais)
- ⬇️ **Téléchargement MP3** : Fichiers audio téléchargeables en format MP3
- 🎵 **Lecteur intégré** : Écoutez l'audio directement dans le navigateur
- 🎨 **Interface moderne** : Design responsive et élégant

## 🚀 Installation

### Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- espeak (synthétiseur vocal)
- ffmpeg (conversion audio)

**Installation des dépendances système (Linux/Ubuntu) :**
```bash
sudo apt-get update
sudo apt-get install -y espeak ffmpeg
```

**Installation sur macOS :**
```bash
brew install espeak ffmpeg
```

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone <repository-url>
   cd article-tweet-to-audio
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer le serveur**
   ```bash
   npm start
   ```

   Ou pour le développement avec auto-reload :
   ```bash
   npm run dev
   ```

4. **Ouvrir l'application**

   Ouvrez votre navigateur et allez à : `http://localhost:3000`

## 📖 Utilisation

### Mode Texte Direct

1. Cliquez sur l'onglet "📝 Texte Direct"
2. Collez votre texte dans la zone de texte
3. Sélectionnez la langue
4. Cliquez sur "🎵 Convertir en Audio MP3"
5. Téléchargez le fichier MP3 généré

### Mode URL Article

1. Cliquez sur l'onglet "🔗 URL Article"
2. Entrez l'URL de l'article
3. Cliquez sur "📥 Extraire le texte"
4. Vérifiez/modifiez le texte extrait
5. Sélectionnez la langue et convertissez

### Mode Thread Twitter

1. Cliquez sur l'onglet "🐦 Thread Twitter"
2. Pour l'instant, copiez le texte manuellement dans l'onglet "Texte Direct"
3. (Configuration API Twitter nécessaire pour l'extraction automatique)

## 🛠️ Technologies utilisées

### Backend
- **Express.js** : Framework web Node.js
- **espeak** : Synthétiseur vocal pour la conversion texte-vers-audio
- **ffmpeg** : Conversion WAV vers MP3
- **Cheerio** : Extraction de contenu web
- **Axios** : Requêtes HTTP
- **UUID** : Génération de noms de fichiers uniques

### Frontend
- **HTML5** : Structure
- **CSS3** : Styling avec dégradés et animations
- **JavaScript Vanilla** : Interactions et API calls

## 📁 Structure du projet

```
article-tweet-to-audio/
├── public/
│   ├── index.html      # Interface utilisateur
│   ├── style.css       # Styles CSS
│   └── script.js       # Logique frontend
├── audio_files/        # Fichiers MP3 générés (créé automatiquement)
├── server.js           # Serveur Express
├── package.json        # Dépendances
├── .gitignore         # Fichiers ignorés
└── README.md          # Documentation
```

## 🔧 Configuration

### Variables d'environnement (optionnel)

Créez un fichier `.env` à la racine :

```env
PORT=3000
```

### Limites

- Longueur maximale du texte : 10 000 caractères
- Les fichiers audio sont automatiquement supprimés après 1 heure
- Nettoyage automatique toutes les 30 minutes

## 🌐 API Endpoints

### GET `/api/health`
Vérification de l'état du serveur

### POST `/api/extract`
Extrait le texte d'une URL
```json
{
  "url": "https://example.com/article",
  "type": "article" | "twitter"
}
```

### POST `/api/convert`
Convertit le texte en audio MP3
```json
{
  "text": "Votre texte ici",
  "language": "fr"
}
```

### GET `/api/download/:filename`
Télécharge le fichier MP3 généré

## 🎨 Langues supportées

- 🇫🇷 Français (`fr`)
- 🇬🇧 English (`en`)
- 🇪🇸 Español (`es`)
- 🇩🇪 Deutsch (`de`)
- 🇮🇹 Italiano (`it`)
- 🇵🇹 Português (`pt`)

## 🔒 Sécurité

- Validation des noms de fichiers pour prévenir directory traversal
- Limite de taille de requête (10 MB)
- Nettoyage automatique des fichiers temporaires
- Timeout sur les requêtes externes (10 secondes)

## 🚧 Améliorations futures

- [ ] Intégration complète de l'API Twitter pour extraction automatique
- [ ] Support de plus de langues
- [ ] Personnalisation de la voix (vitesse, pitch)
- [ ] Sauvegarde des conversions dans l'historique
- [ ] Support de fichiers texte (.txt, .pdf)
- [ ] API REST documentée avec Swagger

## 📝 Licence

MIT License

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📧 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

Créé avec ❤️ | Propulsé par Node.js et Google TTS
