const cover = document.getElementById('cover');
const invitation = document.getElementById('invitation');
const couplePage = document.getElementById('couplePage');
const venuePage = document.getElementById('venuePage');
const confetti = document.getElementById('confetti');
let confettiTimer;

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
  invitation.setAttribute('aria-hidden', 'false');
  couplePage.setAttribute('aria-hidden', 'false');
  venuePage.setAttribute('aria-hidden', 'false');
}

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
  invitation.setAttribute('aria-hidden', 'true');
  couplePage.setAttribute('aria-hidden', 'true');
  venuePage.setAttribute('aria-hidden', 'true');
  cover.classList.remove('hidden');
  window.scrollTo(0, 0);
}

document.getElementById('openInvitation').addEventListener('click', () => {
  launchConfetti();
  showInvitation();
});
document.querySelectorAll('.nav-home').forEach((button) => button.addEventListener('click', showInvitation));
document.querySelectorAll('.nav-couple').forEach((button) => button.addEventListener('click', showCouplePage));
document.querySelectorAll('.nav-date').forEach((button) => button.addEventListener('click', showVenuePage));
document.querySelectorAll('.back-to-cover').forEach((button) => button.addEventListener('click', showCover));

[['groomPhoto', 'groomPreview'], ['bridePhoto', 'bridePreview']].forEach(([inputId, previewId]) => {
  document.getElementById(inputId).addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const preview = document.getElementById(previewId);
    preview.src = URL.createObjectURL(file);
    preview.hidden = false;
  });
});
