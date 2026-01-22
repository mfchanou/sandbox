// DOM Elements
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const convertBtn = document.getElementById('convert-btn');
const extractUrlBtn = document.getElementById('extract-url-btn');
const extractTwitterBtn = document.getElementById('extract-twitter-btn');
const downloadBtn = document.getElementById('download-btn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const result = document.getElementById('result');
const audioPlayer = document.getElementById('audio-player');

let currentDownloadUrl = '';

// Tab switching
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.dataset.tab;

        // Remove active class from all tabs and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        button.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Hide results and errors when switching tabs
        hideMessage();
    });
});

// Extract text from URL
extractUrlBtn.addEventListener('click', async () => {
    const url = document.getElementById('url-input').value.trim();

    if (!url) {
        showError('Veuillez entrer une URL valide');
        return;
    }

    showLoading();
    hideMessage();

    try {
        const response = await fetch('/api/extract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, type: 'article' })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erreur lors de l\'extraction');
        }

        document.getElementById('url-text').value = data.text;
        document.getElementById('url-preview').classList.remove('hidden');
        hideLoading();

    } catch (err) {
        hideLoading();
        showError(err.message);
    }
});

// Extract Twitter thread
extractTwitterBtn.addEventListener('click', async () => {
    const url = document.getElementById('twitter-input').value.trim();

    if (!url) {
        showError('Veuillez entrer une URL Twitter valide');
        return;
    }

    showLoading();
    hideMessage();

    try {
        const response = await fetch('/api/extract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, type: 'twitter' })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erreur lors de l\'extraction');
        }

        document.getElementById('twitter-text').value = data.text;
        document.getElementById('twitter-preview').classList.remove('hidden');
        hideLoading();

    } catch (err) {
        hideLoading();
        showError(err.message);
    }
});

// Convert to audio
convertBtn.addEventListener('click', async () => {
    const activeTab = document.querySelector('.tab-button.active').dataset.tab;
    let text = '';

    // Get text based on active tab
    if (activeTab === 'text') {
        text = document.getElementById('text-input').value.trim();
    } else if (activeTab === 'url') {
        text = document.getElementById('url-text').value.trim();
    } else if (activeTab === 'twitter') {
        text = document.getElementById('twitter-text').value.trim();
    }

    if (!text) {
        showError('Veuillez entrer ou extraire du texte avant de convertir');
        return;
    }

    const language = document.getElementById('language-select').value;

    showLoading();
    hideMessage();

    try {
        const response = await fetch('/api/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, language })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erreur lors de la conversion');
        }

        currentDownloadUrl = data.downloadUrl;
        audioPlayer.src = currentDownloadUrl;

        hideLoading();
        showResult();

    } catch (err) {
        hideLoading();
        showError(err.message);
    }
});

// Download audio
downloadBtn.addEventListener('click', () => {
    if (currentDownloadUrl) {
        window.location.href = currentDownloadUrl;
    }
});

// Helper functions
function showLoading() {
    loading.classList.remove('hidden');
    convertBtn.disabled = true;
}

function hideLoading() {
    loading.classList.add('hidden');
    convertBtn.disabled = false;
}

function showError(message) {
    error.textContent = '❌ ' + message;
    error.classList.remove('hidden');
    result.classList.add('hidden');
}

function showResult() {
    result.classList.remove('hidden');
    error.classList.add('hidden');
}

function hideMessage() {
    error.classList.add('hidden');
    result.classList.add('hidden');
}

// Character counter for text input
const textInput = document.getElementById('text-input');
textInput.addEventListener('input', () => {
    const length = textInput.value.length;
    const maxLength = 10000;

    if (length > maxLength) {
        textInput.value = textInput.value.substring(0, maxLength);
    }
});
