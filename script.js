const cover = document.getElementById('cover');
const invitation = document.getElementById('invitation');
const couplePage = document.getElementById('couplePage');
const venuePage = document.getElementById('venuePage');

function showInvitation() {
  cover.classList.add('hidden');
  couplePage.classList.remove('show');
  venuePage.classList.remove('show');
  invitation.classList.add('show');
  invitation.setAttribute('aria-hidden', 'false');
  couplePage.setAttribute('aria-hidden', 'true');
  venuePage.setAttribute('aria-hidden', 'true');
  window.scrollTo(0, 0);
}

function showCouplePage() {
  cover.classList.add('hidden');
  invitation.classList.remove('show');
  venuePage.classList.remove('show');
  couplePage.classList.add('show');
  invitation.setAttribute('aria-hidden', 'true');
  couplePage.setAttribute('aria-hidden', 'false');
  venuePage.setAttribute('aria-hidden', 'true');
  window.scrollTo(0, 0);
}

function showVenuePage() {
  cover.classList.add('hidden');
  invitation.classList.remove('show');
  couplePage.classList.remove('show');
  venuePage.classList.add('show');
  invitation.setAttribute('aria-hidden', 'true');
  couplePage.setAttribute('aria-hidden', 'true');
  venuePage.setAttribute('aria-hidden', 'false');
  window.scrollTo(0, 0);
}

function showCover() {
  invitation.classList.remove('show');
  couplePage.classList.remove('show');
  venuePage.classList.remove('show');
  invitation.setAttribute('aria-hidden', 'true');
  couplePage.setAttribute('aria-hidden', 'true');
  venuePage.setAttribute('aria-hidden', 'true');
  cover.classList.remove('hidden');
  window.scrollTo(0, 0);
}

document.getElementById('openInvitation').addEventListener('click', showInvitation);
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
