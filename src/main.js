/**
 * Anniversary Wrapped - Main Application
 * A Spotify Wrapped-style anniversary celebration
 */

// ============================================
// Data & State
// ============================================
let currentSlide = 0;
let slides = [];
let isTransitioning = false;
let musicPlaying = false;
let appData = null;
// Per-slide completion tracked via data-completed attribute

// Transition directions for variety
const slideDirections = [
  'right',   // slide 0→1
  'up',      // slide 1→2
  'right',   // slide 2→3
  'down',    // slide 3→4
  'left',    // slide 4→5
  'up',      // slide 5→6
  'right',   // slide 6→7
  'up',      // slide 7→8
  'down',    // slide 8→9
  'left',    // slide 9→10
  'up',      // slide 10→11
  'right',   // slide 11→12
  'down',    // slide 12→13
  'up',      // slide 13→14
  'right',   // slide 14→15
  'up',      // slide 15→16
  'right',   // slide 16→17
  'down',    // slide 17→18
  'left',    // slide 18→19 (extra)
];

// Sample/fallback data
const sampleData = {
  meta: { partnerName: "My Love", years: 3, startDate: "2023-02-14" },
  metrics: [
    { id: "netflix", label: "Netflix Episodes Watched Together", value: "47", unit: "episodes", icon: "📺" },
    { id: "hotpot", label: "Hot Pot Dates", value: "12", unit: "amazing dates", icon: "🍲" },
  ],
  topMoments: [
    { id: 1, title: "PLACEHOLDER", description: "PLACEHOLDER", photo: "photos/moment1.jpg", date: "2025-06-15" },
    { id: 2, title: "PLACEHOLDER", description: "PLACEHOLDER", photo: "photos/moment2.jpg", date: "2025-08-20" },
    { id: 3, title: "PLACEHOLDER", description: "PLACEHOLDER", photo: "photos/moment3.jpg", date: "2025-12-25" },
  ],
  photos: [],
  funFacts: [],
  outroMessage: "PLACEHOLDER: Your heartfelt message 💛"
};

// ============================================
// Slide Templates
// ============================================

function getDirection(fromIndex, toIndex) {
  // Use the preset direction for the transition between these slides
  const idx = Math.min(fromIndex, toIndex);
  const baseDir = slideDirections[idx % slideDirections.length];
  // If going backward, reverse the direction
  if (toIndex < fromIndex) {
    const reverseMap = { right: 'left', left: 'right', up: 'down', down: 'up' };
    return reverseMap[baseDir] || baseDir;
  }
  return baseDir;
}

function createIntroSlide(data) {
  return `
    <div class="slide intro-slide" data-slide="intro">
      <div class="intro-hearts">${createFloatingHearts()}</div>
      <div class="slide-content">
        <div class="slide-title animate-target">Happy Anniversary ${data.meta.partnerName}!</div>
        <div class="slide-subtitle animate-target">Celebrating ${data.meta.years} years of us 💛</div>
        <div class="slide-text animate-target">
          A journey through our favorite moments, memories, and my favorite things about us.
        </div>
        <div class="tap-hint animate-target">Tap anywhere to begin →</div>
      </div>
    </div>
  `;
}

function createMetricSlide(metric, index) {
  return `
    <div class="slide metric-slide" data-slide="metric-${metric.id}">
      <div class="slide-content">
        <div class="metric-icon animate-target">${metric.icon}</div>
        <div class="metric-value animate-target" data-value="${metric.value}">${metric.value}</div>
        <div class="metric-label animate-target">${metric.label}</div>
        <div class="metric-unit animate-target">${metric.unit}</div>
      </div>
      <div class="slide-bg-decoration"></div>
    </div>
  `;
}

function createQuizSlide(data) {
  // Top 5 shows for the quiz
  const top5Shows = data.quizShows || [
    "Stranger Things", "Breaking Bad", "Dark", "Big Mouth", "Russian Doll"
  ];
  const correctAnswer = data.metrics.find(m => m.id === 'favorite_show')?.value || top5Shows[0];

  // Shuffle the shows for display
  const shuffled = [...top5Shows].sort(() => Math.random() - 0.5);

  const tiles = shuffled.map(show => `
    <button class="quiz-tile" data-show="${show}" data-correct="${show === correctAnswer}" onclick="handleQuizAnswer(this, '${show.replace(/'/g, "\\'")}', '${correctAnswer.replace(/'/g, "\\'")}')">
      <span class="quiz-tile-text">${show}</span>
    </button>
  `).join('');

  return `
    <div class="slide quiz-slide" data-slide="quiz" data-interactive="true">
      <div class="slide-content">
        <div class="quiz-icon animate-target">🤔</div>
        <div class="slide-subtitle animate-target">Can you guess...</div>
        <div class="slide-title animate-target" style="font-size: clamp(1.5rem, 6vw, 2.5rem);">Our Most Binged Show?</div>
        <div class="quiz-grid animate-target">
          ${tiles}
        </div>
        <div class="quiz-result" id="quiz-result"></div>
      </div>
    </div>
  `;
}

function createFunFactsSlide(funFacts) {
  if (!funFacts || funFacts.length === 0) return '';

  const factCards = funFacts.map((fact, i) => `
    <div class="fun-fact-card animate-target" style="animation-delay: ${0.12 * i}s" onclick="scratchFunFact(this)">
      <span class="fun-fact-text">${fact}</span>
      <div class="scratch-overlay">💡 Tap to reveal</div>
    </div>
  `).join('');

  return `
    <div class="slide fun-facts-slide" data-slide="fun-facts" data-interactive="true">
      <div class="slide-content">
        <div class="slide-subtitle animate-target">Did You Know? 💡</div>
        <div class="fun-facts-hint animate-target">Scratch each card to reveal!</div>
        <div class="fun-facts-list">
          ${factCards}
        </div>
      </div>
    </div>
  `;
}

window._funFactsRevealed = 0;
window._funFactsTotal = 0;

window.scratchFunFact = function (el) {
  if (el.classList.contains('scratched')) return;
  el.classList.add('scratched');
  window._funFactsRevealed++;
  // Mark slide completed when all facts revealed
  if (window._funFactsRevealed >= window._funFactsTotal) {
    const slide = el.closest('.slide');
    if (slide) slide.dataset.completed = 'true';
  }
};

function createTop5RestaurantsSlide(restaurants) {
  if (!restaurants || restaurants.length === 0) return '';

  // Shuffle a copy for display (Fisher-Yates)
  const shuffled = restaurants.map((name, i) => ({ name, correctRank: i }));
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const items = shuffled.map((item, i) => `
    <div class="restaurant-item animate-target" data-correct-rank="${item.correctRank}" style="animation-delay: ${0.1 * i}s" onclick="handleRestaurantGuess(this)">
      <span class="guess-badge"></span>
      <span class="restaurant-name">${item.name}</span>
    </div>
  `).join('');

  return `
    <div class="slide restaurants-slide" data-slide="restaurants" data-interactive="true">
      <div class="slide-content">
        <div class="metric-icon animate-target">🍽️</div>
        <div class="slide-subtitle animate-target">Rank Our Top 5 Restaurants!</div>
        <div class="restaurant-hint animate-target">Tap them in order — #1 first!</div>
        <div class="restaurant-list" id="restaurant-game-list">
          ${items}
        </div>
        <div class="restaurant-score" id="restaurant-score"></div>
      </div>
    </div>
  `;
}

// Track restaurant guesses
window._restaurantGuesses = [];

window.handleRestaurantGuess = function (el) {
  // Ignore if already selected or game is done
  if (el.classList.contains('selected') || window._restaurantGuesses.length >= 5) return;

  window._restaurantGuesses.push(el);
  const guessNumber = window._restaurantGuesses.length;
  el.classList.add('selected');
  el.querySelector('.guess-badge').textContent = guessNumber;

  if (guessNumber === 5) {
    // All picked — reveal results after a short pause
    setTimeout(() => revealRestaurantResults(), 600);
    // Mark slide as completed so user can advance after reveal
    const slide = el.closest('.slide');
    if (slide) slide.dataset.completed = 'true';
  }
};

window.revealRestaurantResults = function () {
  const medals = ['🥇', '🥈', '🥉', '4.', '5.'];
  let correctCount = 0;

  // Step 1: Mark correct/wrong immediately
  window._restaurantGuesses.forEach((el, guessIndex) => {
    const correctRank = parseInt(el.getAttribute('data-correct-rank'));
    const isCorrect = guessIndex === correctRank;
    if (isCorrect) correctCount++;
    el.classList.add(isCorrect ? 'correct' : 'wrong');
    el.querySelector('.guess-badge').textContent = medals[correctRank];
  });

  // Step 2: After a pause, physically reorder DOM elements with animation
  setTimeout(() => {
    const list = document.getElementById('restaurant-game-list');
    const items = Array.from(list.querySelectorAll('.restaurant-item'));
    items.sort((a, b) => parseInt(a.getAttribute('data-correct-rank')) - parseInt(b.getAttribute('data-correct-rank')));

    // Add exit animation first
    items.forEach(item => item.classList.add('reordering'));

    setTimeout(() => {
      // Physically reorder by re-appending in correct order
      items.forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.15}s`;
        item.classList.add('revealing');
        list.appendChild(item);
      });

      // Step 3: Show score after reorder animation completes
      setTimeout(() => {
        const scoreEl = document.getElementById('restaurant-score');
        const emoji = correctCount === 5 ? '🎉' : correctCount >= 3 ? '👏' : '😅';
        scoreEl.textContent = `${emoji} ${correctCount}/5 correct!`;
        scoreEl.classList.add('visible');
      }, items.length * 150 + 400);
    }, 300);
  }, 800);
};

function createWordleSlide(data) {
  return `
    <div class="slide wordle-slide" data-slide="wordle" data-interactive="true" data-completed="true">
      <div class="slide-content wordle-content">
        <div class="slide-subtitle animate-target">Wordle Time! Can you guess the word?</div>
        <div class="slide-title animate-target" style="font-size: clamp(1.3rem, 5vw, 2rem);">Hint: our first date!</div>
        <div class="wordle-iframe-wrapper animate-target">
          <iframe
            src="https://vue-wordle.netlify.app/?c3VzaGk="
            class="wordle-iframe"
            title="Wordle - Guess The Word"
            allow="clipboard-write"
          ></iframe>
        </div>
      </div>
    </div>
  `;
}

function createTopMomentsSlide(moments) {
  const rotations = [-4, 3, -2];
  const cards = moments.map((moment, i) => `
    <div class="moment-card animate-target" data-moment-id="${moment.id}" style="--rotation: ${rotations[i]}deg" onclick="toggleMomentExpand(this, ${moment.id})">
      <div class="polaroid-frame">
        <img src="${moment.photo}" alt="${moment.title}" class="moment-thumbnail"
             onerror="this.style.display='none'">
        <div class="polaroid-caption">
          <div class="moment-number">#${i + 1}</div>
          <div class="moment-title">${moment.title}</div>
          <div class="moment-date">${formatDate(moment.date)}</div>
        </div>
      </div>
      <div class="moment-expanded-content">
        <div class="expanded-text">
          <div class="expanded-description">${moment.description}</div>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="slide moments-slide" data-slide="moments">
      <div class="slide-content moments-content">
        <div class="slide-subtitle animate-target">Our Top 3 Moments 💫</div>
        <div class="moments-wrapper">
          <div class="click-hint-container animate-target">
            <span class="click-hint-text">← tap a photo! →</span>
          </div>
          <div class="moments-grid">
            ${cards}
          </div>
        </div>
      </div>
    </div>
  `;
}

function createPhotoMontageSlide(photos) {
  if (!photos || photos.length === 0) return '';

  const rotations = [-2.5, 1.8, -1.2, 2.5, -1.8, 1.5, -2, 1.2, -1.5, 2, -2.2, 1.8];

  const cards = photos.map((photo, i) => `
    <div class="montage-card animate-target" data-montage-id="${photo.id}" style="--rotation: ${rotations[i % rotations.length]}deg">
      <div class="polaroid-frame">
        <img src="${photo.photo}" alt="${photo.caption || 'Memory ' + photo.id}" class="montage-thumbnail"
             onerror="this.style.display='none'">
        <div class="polaroid-caption">
          <div class="montage-caption">${photo.caption || ''}</div>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="slide montage-slide" data-slide="montage">
      <div class="slide-content moments-content">
        <div class="slide-subtitle animate-target">Our Memories 📸</div>
        <div class="montage-wrapper">
          <div class="montage-grid">
            ${cards}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Auto-expand montage cards one by one when slide enters
let montageAutoExpandTimer = null;

function startMontageAutoExpand() {
  // Clear any existing timer
  if (montageAutoExpandTimer) {
    clearTimeout(montageAutoExpandTimer);
    montageAutoExpandTimer = null;
  }

  const cards = document.querySelectorAll('.montage-card');
  if (cards.length === 0) return;

  // Collapse all first
  cards.forEach(c => c.classList.remove('expanded'));

  let currentIndex = 0;
  const expandDelay = 800; // delay before first expand
  const expandDuration = 1500; // how long a card stays expanded
  const gap = 300; // gap between collapse and next expand

  function expandNext() {
    if (currentIndex >= cards.length) return;

    const card = cards[currentIndex];

    // Scroll the card into view within the montage-wrapper
    const wrapper = document.querySelector('.montage-wrapper');
    if (wrapper && card) {
      const cardTop = card.offsetTop - wrapper.offsetTop;
      wrapper.scrollTo({ top: cardTop - 40, behavior: 'smooth' });
    }

    card.classList.add('expanded');

    // Collapse after duration, then expand next
    montageAutoExpandTimer = setTimeout(() => {
      card.classList.remove('expanded');

      currentIndex++;
      if (currentIndex < cards.length) {
        montageAutoExpandTimer = setTimeout(expandNext, gap);
      }
    }, expandDuration);
  }

  // Start after initial delay
  montageAutoExpandTimer = setTimeout(expandNext, expandDelay);
}

function stopMontageAutoExpand() {
  if (montageAutoExpandTimer) {
    clearTimeout(montageAutoExpandTimer);
    montageAutoExpandTimer = null;
  }
  // Collapse all montage cards
  document.querySelectorAll('.montage-card.expanded').forEach(c => c.classList.remove('expanded'));
}

function createOutroSlide(data) {
  return `
    <div class="slide outro-slide" data-slide="outro">
      <div class="intro-hearts">${createFloatingHearts()}</div>
      <div class="slide-content">
        <div class="outro-message animate-target">${data.outroMessage}</div>
        <div class="outro-heart animate-target">💛</div>
        <div class="year-badge animate-target">Here's to Year ${data.meta.years + 1}!</div>
      </div>
    </div>
  `;
}

// ============================================
// Helper Functions
// ============================================

function createFloatingHearts() {
  const hearts = ['💛', '💕', '✨', '💫', '🌟', '💛'];
  let html = '';
  for (let i = 0; i < 20; i++) {
    const heart = hearts[Math.floor(Math.random() * hearts.length)];
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 6;
    const duration = 4 + Math.random() * 5;
    const size = 0.8 + Math.random() * 1.2;
    html += `<span class="floating-heart" style="left:${left}%;top:${top}%;animation-delay:${delay}s;animation-duration:${duration}s;font-size:${size}rem">${heart}</span>`;
  }
  return html;
}

function formatDate(dateString) {
  if (!dateString || dateString === 'YYYY-MM-DD') return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Animate a number counting up
function animateCounter(element) {
  const rawValue = element.dataset.value;
  // Only animate pure numbers
  const numericValue = parseFloat(rawValue);
  if (isNaN(numericValue) || rawValue.includes(' ')) {
    element.textContent = rawValue;
    return;
  }

  const isDecimal = rawValue.includes('.');
  const duration = 1500;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = numericValue * eased;

    if (isDecimal) {
      element.textContent = current.toFixed(1);
    } else {
      element.textContent = Math.floor(current);
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = rawValue;
    }
  }
  requestAnimationFrame(update);
}

// ============================================
// Quiz Functions
// ============================================

window.handleQuizAnswer = function (button, selected, correct) {
  const quizSlide = button.closest('.slide');
  if (quizSlide?.dataset.completed === 'true') return;
  if (quizSlide) quizSlide.dataset.completed = 'true';

  const allTiles = document.querySelectorAll('.quiz-tile');
  const resultDiv = document.getElementById('quiz-result');

  if (selected === correct) {
    // Correct!
    button.classList.add('quiz-correct');
    resultDiv.innerHTML = '🎉 You know us so well!';
    resultDiv.classList.add('show', 'correct');

    // Celebration particles
    createCelebration(button);
  } else {
    // Wrong
    button.classList.add('quiz-wrong');
    resultDiv.innerHTML = `So close! It was <strong>${correct}</strong> 😄`;
    resultDiv.classList.add('show', 'wrong');

    // Highlight the correct one
    allTiles.forEach(tile => {
      if (tile.dataset.correct === 'true') {
        setTimeout(() => {
          tile.classList.add('quiz-correct', 'quiz-reveal');
        }, 600);
      }
    });
  }

  // Dim other incorrect tiles
  allTiles.forEach(tile => {
    if (tile !== button && tile.dataset.correct !== 'true') {
      tile.classList.add('quiz-dimmed');
    }
  });
};

function createCelebration(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const emojis = ['✨', '🎉', '💛', '⭐', '🌟', '💫'];

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.className = 'celebration-particle';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';

    const angle = (i / 12) * Math.PI * 2;
    const distance = 60 + Math.random() * 80;
    particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
    particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
    particle.style.animationDelay = Math.random() * 0.2 + 's';

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1500);
  }
}

// ============================================
// Modal Functions
// ============================================

window.toggleMomentExpand = function (cardEl, momentId) {
  const allCards = document.querySelectorAll('.moment-card');
  const isExpanded = cardEl.classList.contains('expanded');

  // Collapse all first
  allCards.forEach(c => c.classList.remove('expanded'));

  // Toggle this one
  if (!isExpanded) {
    cardEl.classList.add('expanded');
  }
};

// Close expanded card on click outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.moment-card') && !e.target.closest('.moments-grid')) {
    document.querySelectorAll('.moment-card.expanded').forEach(c => c.classList.remove('expanded'));
  }
});

// ============================================
// Navigation with Creative Transitions
// ============================================

function goToSlide(index) {
  if (isTransitioning || index === currentSlide) return;
  if (index < 0 || index >= slides.length) return;

  isTransitioning = true;

  const oldSlide = slides[currentSlide];
  const newSlide = slides[index];
  const direction = getDirection(currentSlide, index);

  // Determine exit and enter transforms based on direction
  const exitTransforms = {
    right: 'translateX(-100%)',
    left: 'translateX(100%)',
    up: 'translateY(-100%)',
    down: 'translateY(100%)',
  };
  const enterFromTransforms = {
    right: 'translateX(100%)',
    left: 'translateX(-100%)',
    up: 'translateY(100%)',
    down: 'translateY(-100%)',
  };

  // Remove animated classes from new slide's targets for re-triggering
  newSlide.querySelectorAll('.animate-target').forEach(el => {
    el.classList.remove('animated');
  });

  // Position new slide at the enter-from position
  newSlide.style.transition = 'none';
  newSlide.style.transform = enterFromTransforms[direction];
  newSlide.style.opacity = '1';
  newSlide.classList.add('active');

  // Force reflow so the position is applied before animating
  newSlide.offsetHeight;

  // Animate both slides
  const duration = '0.65s';
  const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

  oldSlide.style.transition = `transform ${duration} ${easing}, opacity ${duration} ${easing}`;
  oldSlide.style.transform = exitTransforms[direction];
  oldSlide.style.opacity = '0';

  newSlide.style.transition = `transform ${duration} ${easing}, opacity ${duration} ${easing}`;
  newSlide.style.transform = 'translate(0, 0)';
  newSlide.style.opacity = '1';

  currentSlide = index;

  // Trigger entry animations with stagger
  const targets = newSlide.querySelectorAll('.animate-target');
  targets.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('animated');
    }, 200 + i * 120);
  });

  // Counter animations for metric slides
  const counter = newSlide.querySelector('.metric-value[data-value]');
  if (counter) {
    setTimeout(() => animateCounter(counter), 400);
  }

  updateNavDots();

  // Stop montage auto-expand when leaving montage slide
  if (oldSlide.dataset.slide === 'montage') {
    stopMontageAutoExpand();
  }

  // Start montage auto-expand when entering montage slide
  if (newSlide.dataset.slide === 'montage') {
    setTimeout(() => startMontageAutoExpand(), 800);
  }

  // Clean up after transition
  setTimeout(() => {
    oldSlide.classList.remove('active');
    oldSlide.style.transition = '';
    oldSlide.style.transform = '';
    oldSlide.style.opacity = '';
    newSlide.style.transition = '';
    isTransitioning = false;
  }, 700);
}

function nextSlide() {
  // Don't advance past interactive slides until completed
  const currentEl = slides[currentSlide];
  if (currentEl?.dataset.interactive === 'true' && currentEl.dataset.completed !== 'true') return;

  if (currentSlide < slides.length - 1) {
    goToSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    goToSlide(currentSlide - 1);
  }
}

function updateNavDots() {
  const dots = document.querySelectorAll('.nav-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function createNavDots(count) {
  const container = document.getElementById('nav-dots');
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = `nav-dot ${i === 0 ? 'active' : ''}`;
    dot.onclick = () => {
      // Only allow backward navigation or sequential forward
      if (i <= currentSlide || i === currentSlide + 1) {
        goToSlide(i);
      }
    };
    container.appendChild(dot);
  }
}

// ============================================
// Touch/Swipe Handling
// ============================================

let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}

function handleTouchEnd(e) {
  const dx = touchStartX - e.changedTouches[0].screenX;
  const dy = touchStartY - e.changedTouches[0].screenY;
  // Only horizontal swipes (ignore vertical scroll)
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    if (dx > 0) nextSlide();
    else prevSlide();
  }
}

// ============================================
// Audio Control
// ============================================

function setupAudio() {
  const audio = document.getElementById('background-music');
  const toggle = document.getElementById('music-toggle');

  // Update UI helper
  const updateUI = (isPlaying) => {
    if (isPlaying) {
      toggle.classList.remove('muted');
      toggle.querySelector('.music-icon').textContent = '🎵';
    } else {
      toggle.classList.add('muted');
      toggle.querySelector('.music-icon').textContent = '🔇';
    }
  };

  // Toggle handler
  toggle.onclick = (e) => {
    e.stopPropagation();
    if (musicPlaying) {
      audio.pause();
      musicPlaying = false;
      updateUI(false);
    } else {
      audio.play().then(() => {
        musicPlaying = true;
        updateUI(true);
      }).catch(e => console.log('Audio play failed:', e));
    }
  };

  // Attempt autoplay immediately
  audio.play().then(() => {
    musicPlaying = true;
    updateUI(true);
    console.log('✅ Autoplay success');
  }).catch(() => {
    console.log('⚠️ Autoplay blocked - waiting for interaction');
    musicPlaying = false;
    updateUI(false);

    // Fallback: Play on first interaction
    const startAudio = () => {
      audio.play().then(() => {
        musicPlaying = true;
        updateUI(true);
        // Remove listeners once successful
        document.removeEventListener('click', startAudio);
        document.removeEventListener('touchstart', startAudio);
        document.removeEventListener('keydown', startAudio);
      }).catch(() => { });
    };

    document.addEventListener('click', startAudio, { once: true });
    document.addEventListener('touchstart', startAudio, { once: true });
    document.addEventListener('keydown', startAudio, { once: true });
  });
}

// ============================================
// Keyboard Navigation
// ============================================

function setupKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'Escape') {
      closeMomentModal();
    }
  });
}

// ============================================
// Data Loading
// ============================================

async function loadData() {
  try {
    const response = await fetch('data/metrics.json');
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Loaded metrics.json:', data);
      return data;
    }
  } catch (e) {
    console.log('Using sample data (metrics.json not found)');
  }
  return sampleData;
}

// ============================================
// Initialize App
// ============================================

async function init() {
  appData = await loadData();
  const data = appData;
  const app = document.getElementById('app');

  // Build all slides
  let slidesHTML = '';

  // 1. Intro
  slidesHTML += createIntroSlide(data);

  // 2. Separate special metrics
  const specialMetricIds = ['favorite_show', 'favorite_restaurant', 'most_ordered_item'];
  const regularMetrics = data.metrics.filter(m => !specialMetricIds.includes(m.id));
  const hasQuizData = data.metrics.find(m => m.id === 'favorite_show');

  // 3. First batch of metrics (Netflix stats)
  const batch1Ids = ['netflix_hours', 'netflix_sessions', 'longest_binge', 'biggest_netflix_day'];
  const batch1 = regularMetrics.filter(m => batch1Ids.includes(m.id));
  batch1.forEach((metric, i) => {
    slidesHTML += createMetricSlide(metric, i);
  });

  // 4. Quiz slide (guess the show)
  if (hasQuizData) {
    slidesHTML += createQuizSlide(data);
  }

  // 5. Second batch of metrics (date/food stats)
  const batch2 = regularMetrics.filter(m => !batch1Ids.includes(m.id));
  batch2.forEach((metric, i) => {
    slidesHTML += createMetricSlide(metric, batch1.length + i);
  });

  // 6. Top 5 Restaurants leaderboard
  if (data.top_5_restaurants && data.top_5_restaurants.length > 0) {
    slidesHTML += createTop5RestaurantsSlide(data.top_5_restaurants);
  }

  // 7. Wordle slide (most ordered item)
  slidesHTML += createWordleSlide(data);

  // 8. Fun Facts
  if (data.funFacts && data.funFacts.length > 0) {
    slidesHTML += createFunFactsSlide(data.funFacts);
    window._funFactsTotal = data.funFacts.length;
  }

  // 9. Top Moments
  slidesHTML += createTopMomentsSlide(data.topMoments);

  // 10. Photo Montage
  if (data.photos && data.photos.length > 0) {
    slidesHTML += createPhotoMontageSlide(data.photos);
  }

  // 11. Outro
  slidesHTML += createOutroSlide(data);

  // Inject slides
  app.innerHTML = `<div class="slides-container">${slidesHTML}</div>`;

  // Get slide elements
  slides = document.querySelectorAll('.slide');

  // Activate first slide
  slides[0].classList.add('active');
  // Trigger intro animations
  setTimeout(() => {
    slides[0].querySelectorAll('.animate-target').forEach((el, i) => {
      setTimeout(() => el.classList.add('animated'), i * 150);
    });
  }, 300);

  // Create navigation dots
  createNavDots(slides.length);

  // Setup touch events
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });

  // Click to advance (not on interactive elements)
  app.addEventListener('click', (e) => {
    if (e.target.closest('.moment-card, .modal-overlay, .music-toggle, .nav-dot, .quiz-tile, .fun-fact-card, .wordle-iframe-wrapper, .restaurant-item, .scratch-overlay')) return;
    nextSlide();
  });

  // Setup audio & keyboard
  setupAudio();
  setupKeyboard();

  console.log('🎉 Anniversary Wrapped initialized!');
}

document.addEventListener('DOMContentLoaded', init);
