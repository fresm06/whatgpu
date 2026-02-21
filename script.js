// Configuration
const API_KEY = 'demo';
const API_URL = 'https://api.exchangerate-api.com/v4/latest/KRW';

// Price data in USD (approximate values for 2024-2025)
const PRICE_DATA = {
  bigmac: { name: '빅맥 세트', icon: '🍔', price: 7.49, unit: '개' },
  starbucks: { name: '스타벅스 아메리카노', icon: '☕', price: 5.75, unit: '잔' },
  netflix: { name: '넷플릭스 프리미엄', icon: '🎬', price: 22.99, unit: '개월' },
  iphone: { name: '아이폰 16 프로', icon: '📱', price: 999, unit: '台' },
  coffee: { name: '미국커피', icon: '☕', price: 4.50, unit: '잔' },
  subway: { name: '서브웨이 샌드위치', icon: '🥪', price: 10.00, unit: '개' }
};

// Character expressions based on rate
const CHARACTERS = {
  good: { emoji: '😄', nameKo: '환율이 내려갔어요!', mood: '당장의 달러가 더 강해졌으니 기쁨을 나누세요!' },
  bad: { emoji: '😰', nameKo: '환율이 올랐네요...', mood: '해외 물건 살 때 많이 나갑니다...' },
  neutral: { emoji: '😐', nameKo: '환율이 안정적이에요', mood: '그냥 평범한 하루입니다' }
};

// State
let currentRate = 0;
let previousRate = 0;
let cachedRate = null;
let cachedTime = 0;

// DOM Elements
const krwInput = document.getElementById('krw-input');
const resultSection = document.getElementById('result-section');
const usdResult = document.getElementById('usd-result');
const krwDisplay = document.getElementById('krw-display');
const comparisonGrid = document.getElementById('comparison-grid');
const character = document.getElementById('character');
const characterName = document.getElementById('character-name');
const characterMood = document.getElementById('character-mood');
const rateBadge = document.getElementById('rate-badge');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('error-msg');

// Create background bubbles
function createBubbles() {
  const container = document.getElementById('bubbles');
  const bubbleCount = 15;

  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = Math.random() * 60 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 15 + 10}s`;
    bubble.style.animationDelay = `${Math.random() * 10}s`;
    container.appendChild(bubble);
  }
}

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Format KRW input
function formatKrwInput(value) {
  const num = value.replace(/[^\d]/g, '');
  return formatNumber(num);
}

// Fetch exchange rate
async function fetchRate() {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  // Check cache
  if (cachedRate && (now - cachedTime) < oneHour) {
    return cachedRate;
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('환율 정보를 가져올 수 없습니다');

    const data = await response.json();
    cachedRate = data.rates.USD;
    cachedTime = now;

    return cachedRate;
  } catch (error) {
    console.error('Rate fetch error:', error);
    // Fallback to approximate rate if API fails
    return 0.00068;
  }
}

// Update character based on rate change
function updateCharacter(rate) {
  const diff = rate - previousRate;

  if (previousRate === 0) {
    // Initial load
    character.textContent = CHARACTERS.neutral.emoji;
    characterName.textContent = CHARACTERS.neutral.nameKo;
    characterMood.textContent = CHARACTERS.neutral.mood;
    rateBadge.className = 'rate-badge neutral';
    rateBadge.innerHTML = `<span>${rate.toFixed(2)} KRW/USD</span>`;
    return;
  }

  if (diff > 0.01) {
    // Rate went up (won fell)
    character.textContent = CHARACTERS.bad.emoji;
    characterName.textContent = CHARACTERS.bad.nameKo;
    characterMood.textContent = CHARACTERS.bad.mood;
    rateBadge.className = 'rate-badge up';
    rateBadge.innerHTML = `<span>▲ ${diff.toFixed(2)}</span>`;
  } else if (diff < -0.01) {
    // Rate went down (won rose)
    character.textContent = CHARACTERS.good.emoji;
    characterName.textContent = CHARACTERS.good.nameKo;
    characterMood.textContent = CHARACTERS.good.mood;
    rateBadge.className = 'rate-badge down';
    rateBadge.innerHTML = `<span>▼ ${Math.abs(diff).toFixed(2)}</span>`;
  } else {
    // Stable
    character.textContent = CHARACTERS.neutral.emoji;
    characterName.textContent = CHARACTERS.neutral.nameKo;
    characterMood.textContent = CHARACTERS.neutral.mood;
    rateBadge.className = 'rate-badge neutral';
    rateBadge.innerHTML = `<span>${rate.toFixed(2)} KRW/USD</span>`;
  }
}

// Calculate and display results
function calculateResults(krw) {
  const usd = krw * currentRate;

  // Update main result
  usdResult.textContent = `$${formatNumber(usd.toFixed(2))}`;
  krwDisplay.textContent = `₩${formatNumber(krw)}`;

  // Calculate comparisons
  comparisonGrid.innerHTML = '';

  const items = Object.entries(PRICE_DATA);
  items.forEach(([key, item], index) => {
    const count = usd / item.price;
    let displayCount;

    if (count >= 1000) {
      displayCount = `${(count / 1000).toFixed(1)}k`;
    } else if (count >= 100) {
      displayCount = count.toFixed(0);
    } else if (count >= 10) {
      displayCount = count.toFixed(1);
    } else {
      displayCount = count.toFixed(2);
    }

    const isHighlight = index === 0;

    const itemHTML = `
      <div class="comparison-item ${isHighlight ? 'highlight' : ''}">
        <span class="comparison-icon">${item.icon}</span>
        <div class="comparison-count">${displayCount}</div>
        <div class="comparison-unit">${item.name} ${item.unit}</div>
      </div>
    `;

    comparisonGrid.insertAdjacentHTML('beforeend', itemHTML);
  });

  resultSection.style.display = 'block';
}

// Main calculation handler
async function handleCalculation() {
  const krwValue = parseFloat(krwInput.value.replace(/,/g, ''));

  if (!krwValue || krwValue <= 0) {
    resultSection.style.display = 'none';
    return;
  }

  loading.classList.add('active');
  errorMsg.classList.remove('active');

  try {
    const rate = await fetchRate();
    currentRate = rate;

    updateCharacter(rate);
    calculateResults(krwValue);
  } catch (error) {
    errorMsg.textContent = '환율을 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    errorMsg.classList.add('active');
  } finally {
    loading.classList.remove('active');
  }
}

// Input event handlers
krwInput.addEventListener('input', (e) => {
  const formatted = formatKrwInput(e.target.value);
  e.target.value = formatted;
});

krwInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleCalculation();
  }
});

// Quick button handlers
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value;
    krwInput.value = formatNumber(value);
    handleCalculation();
  });
});

// Initialize
createBubbles();

// Auto-fetch rate on load
fetchRate().then(rate => {
  currentRate = rate;
  updateCharacter(rate);
});
