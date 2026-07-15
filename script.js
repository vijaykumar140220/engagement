const cover = document.getElementById('cover');
const invitation = document.getElementById('invitation');
const couplePage = document.getElementById('couplePage');
const venuePage = document.getElementById('venuePage');
const announcementPage = document.getElementById('announcementPage');
const confetti = document.getElementById('confetti');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
let confettiTimer;

function updateMusicButton(isPlaying) {
  musicToggle.classList.toggle('playing', isPlaying);
  musicToggle.setAttribute('aria-pressed', String(isPlaying));
  musicToggle.setAttribute('aria-label', isPlaying ? 'Pause background music' : 'Play background music');
}

function playBackgroundMusic() {
  backgroundMusic.play().then(() => updateMusicButton(true)).catch(() => updateMusicButton(false));
}

function createConfettiBurst(pieceCount = 20) {
  const colors = ['#ff6b6b', '#ffb000', '#38bdf8', '#8b5cf6', '#34d399', '#fb7185'];

  for (let i = 0; i < pieceCount; i += 1) {
    const piece = document.createElement('span');
    const size = 4 + Math.random() * 5;
    piece.className = 'confetti-piece';
    piece.style.setProperty('--x', `${Math.random() * 100}%`);
    piece.style.setProperty('--size', `${size}px`);
    piece.style.setProperty('--color', colors[i % colors.length]);
    piece.style.setProperty('--delay', `${Math.random() * 0.34}s`);
    piece.style.setProperty('--duration', `${1.5 + Math.random() * 1.1}s`);
    piece.style.setProperty('--drift', `${-110 + Math.random() * 220}px`);
    piece.style.setProperty('--turn', `${360 + Math.random() * 720}deg`);
    piece.style.borderRadius = Math.random() > 0.72 ? '50%' : '1px';
    piece.addEventListener('animationend', () => piece.remove(), { once: true });
    confetti.appendChild(piece);
  }
}

function launchConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.clearInterval(confettiTimer);
  confetti.replaceChildren();
  createConfettiBurst(75);
  confettiTimer = window.setInterval(() => createConfettiBurst(18), 550);
}

function stopConfetti() {
  window.clearInterval(confettiTimer);
  confettiTimer = undefined;
  confetti.replaceChildren();
}

function revealInvitationFlow() {
  cover.classList.add('hidden');
  invitation.classList.add('show');
  couplePage.classList.add('show');
  venuePage.classList.add('show');
  announcementPage.classList.add('show');
  invitation.setAttribute('aria-hidden', 'false');
  couplePage.setAttribute('aria-hidden', 'false');
  venuePage.setAttribute('aria-hidden', 'false');
  announcementPage.setAttribute('aria-hidden', 'false');
}

const pageAnimationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('animate-in');
      void entry.target.offsetWidth;
      entry.target.classList.add('animate-in');
    } else {
      entry.target.classList.remove('animate-in');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

[couplePage, venuePage, announcementPage].forEach((page) => pageAnimationObserver.observe(page));

function showInvitation() {
  revealInvitationFlow();
  invitation.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showCouplePage() {
  revealInvitationFlow();
  couplePage.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showVenuePage() {
  revealInvitationFlow();
  venuePage.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showCover() {
  stopConfetti();
  invitation.classList.remove('show');
  couplePage.classList.remove('show');
  venuePage.classList.remove('show');
  announcementPage.classList.remove('show');
  couplePage.classList.remove('animate-in');
  venuePage.classList.remove('animate-in');
  announcementPage.classList.remove('animate-in');
  invitation.setAttribute('aria-hidden', 'true');
  couplePage.setAttribute('aria-hidden', 'true');
  venuePage.setAttribute('aria-hidden', 'true');
  announcementPage.setAttribute('aria-hidden', 'true');
  cover.classList.remove('hidden');
  window.scrollTo(0, 0);
}

document.getElementById('openInvitation').addEventListener('click', () => {
  launchConfetti();
  playBackgroundMusic();
  showInvitation();
});

document.querySelector('.scroll-down').addEventListener('click', showCouplePage);

function updateCountdown() {
  const eventTime = new Date('2026-08-31T18:00:00+05:30').getTime();
  const remaining = Math.max(0, eventTime - Date.now());
  const seconds = Math.floor(remaining / 1000);
  const values = [
    Math.floor(seconds / 86400),
    Math.floor((seconds % 86400) / 3600),
    Math.floor((seconds % 3600) / 60),
    seconds % 60,
  ];
  ['countdownDays', 'countdownHours', 'countdownMinutes', 'countdownSeconds'].forEach((id, index) => {
    document.getElementById(id).textContent = String(values[index]).padStart(index ? 2 : 1, '0');
  });
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

document.getElementById('saveTheDate').addEventListener('click', () => {
  const parameters = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Vijaya Kumar & Sandhiya Engagement',
    dates: '20260831T123000Z/20260831T140000Z',
    details: 'Engagement ceremony from 6:00 PM to 7:30 PM.',
    location: 'KVM Mahal (A/C), Chennai Trichy Highway, By Pass Junction, Chengalpattu, Tamil Nadu 603002',
  });
  window.open(`https://calendar.google.com/calendar/render?${parameters}`, '_blank', 'noopener');
});
musicToggle.addEventListener('click', () => {
  if (backgroundMusic.paused) {
    playBackgroundMusic();
  } else {
    backgroundMusic.pause();
    updateMusicButton(false);
  }
});
document.querySelectorAll('.nav-home').forEach((button) => button.addEventListener('click', showInvitation));
document.querySelectorAll('.nav-couple').forEach((button) => button.addEventListener('click', showCouplePage));
document.querySelectorAll('.nav-date').forEach((button) => button.addEventListener('click', showVenuePage));
document.querySelectorAll('.back-to-cover').forEach((button) => button.addEventListener('click', showCover));

[['groomPhoto', 'groomPreview'], ['bridePhoto', 'bridePreview']].forEach(([inputId, previewId]) => {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if (!input || !preview) return;

  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    preview.src = URL.createObjectURL(file);
    preview.hidden = false;
  });
});
