const express = require('express');
const cors = require('cors');
const gtts = require('gtts');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Create directories if they don't exist
const audioDir = path.join(__dirname, 'audio_files');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Clean up old audio files (older than 1 hour)
function cleanupOldFiles() {
  const files = fs.readdirSync(audioDir);
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  files.forEach(file => {
    const filePath = path.join(audioDir, file);
    const stats = fs.statSync(filePath);
    if (now - stats.mtimeMs > oneHour) {
      fs.unlinkSync(filePath);
      console.log(`Deleted old file: ${file}`);
    }
  });
}

// Run cleanup every 30 minutes
setInterval(cleanupOldFiles, 30 * 60 * 1000);

// Extract Twitter thread (basic implementation)
async function extractTwitterThread(url) {
  try {
    // This is a simplified version - Twitter's actual API would require authentication
    // For demo purposes, we'll return a placeholder
    return {
      text: "Note: Pour extraire un vrai thread Twitter, vous auriez besoin de l'API Twitter. Pour l'instant, veuillez copier-coller le texte du thread directement.",
      author: "N/A"
    };
  } catch (error) {
    throw new Error('Erreur lors de l\'extraction du thread Twitter');
  }
}

// Extract article from URL
async function extractArticle(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);

    // Remove script and style elements
    $('script, style, nav, header, footer, aside').remove();

    // Try to find main content
    let text = '';
    const mainSelectors = ['article', 'main', '[role="main"]', '.content', '.post-content', '.article-content'];

    for (const selector of mainSelectors) {
      const element = $(selector);
      if (element.length) {
        text = element.text();
        break;
      }
    }

    // Fallback to body if no main content found
    if (!text) {
      text = $('body').text();
    }

    // Clean up text
    text = text
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim();

    return text.substring(0, 10000); // Limit to 10000 characters
  } catch (error) {
    throw new Error('Erreur lors de l\'extraction de l\'article: ' + error.message);
  }
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Extract text from URL
app.post('/api/extract', async (req, res) => {
  try {
    const { url, type } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL est requise' });
    }

    let text = '';

    if (type === 'twitter' || url.includes('twitter.com') || url.includes('x.com')) {
      const thread = await extractTwitterThread(url);
      text = thread.text;
    } else {
      text = await extractArticle(url);
    }

    res.json({ text });
  } catch (error) {
    console.error('Extract error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Convert text to speech
app.post('/api/convert', async (req, res) => {
  try {
    const { text, language = 'fr' } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Le texte est requis' });
    }

    // Limit text length
    const maxLength = 10000;
    const truncatedText = text.substring(0, maxLength);

    if (text.length > maxLength) {
      console.log(`Text truncated from ${text.length} to ${maxLength} characters`);
    }

    // Generate unique filename
    const filename = `audio_${uuidv4()}.mp3`;
    const filepath = path.join(audioDir, filename);

    // Create TTS
    const tts = new gtts(truncatedText, language);

    // Save to file
    await new Promise((resolve, reject) => {
      tts.save(filepath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    console.log(`Audio file created: ${filename}`);

    // Return download URL
    res.json({
      success: true,
      downloadUrl: `/api/download/${filename}`,
      filename: filename
    });
  } catch (error) {
    console.error('Convert error:', error);
    res.status(500).json({ error: 'Erreur lors de la conversion: ' + error.message });
  }
});

// Download audio file
app.get('/api/download/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(audioDir, filename);

    // Security check - prevent directory traversal
    if (!filename.match(/^audio_[a-f0-9-]+\.mp3$/)) {
      return res.status(400).json({ error: 'Nom de fichier invalide' });
    }

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'Fichier non trouvé' });
    }

    res.download(filepath, filename, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({ error: 'Erreur lors du téléchargement' });
      }
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🎵 Server running on http://localhost:${PORT}`);
  console.log(`📁 Audio files directory: ${audioDir}`);
});
