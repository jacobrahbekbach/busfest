const eventDate = new Date("2026-06-13T15:30:00+02:00");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const secondsEl = document.getElementById("seconds");
const participantsEl = document.getElementById("participants");
const galleryTrackEl = document.getElementById("gallery-track");
const galleryPrevEl = document.getElementById("gallery-prev");
const galleryNextEl = document.getElementById("gallery-next");
const galleryDotsEl = document.getElementById("gallery-dots");

const participants = [
  "Jacob Rahbek Bach",
  "Anna Mølgaard Andersen",
  "Freyja Perdomo",
  "Matvei Andersen",
  "Pernille Deding",
  "Ida Tjørnelund Blomgreen",
  "Tobias Lyngbye",
  "Malene Nytoft Schütt",
  "Casper Bøvling",
  "Line Rossing Andersen",
  "Jens Bach Jacobsen",
  "Peter Højgaard (Hundslund) Andersen",
  "Jacob Skriver",
  "Niels Håkonsson",
  "Mads Bjørnholt",
  "Sofie Borgbjerg",
  "Tommy Jakobsen",
  "Jacob Hansen",
  "Maria Thomasen",
  "Kristian Havreballe",
  "Allan Jørgensen",
  "Magnus Damiri",
  "Sofie Grønbæk",
  "Sofie Ambrosius",
  "Mia Bech Pedersen",
  "Diana Schnefeldt Petersen",
  "Simone Mari",
  "Jacob Laursen",
  "Jeanette Svenningsen",
  "Joachim Askholm Nielsen",
  "Rasmus Kamp Lærke Madsen",
  "Tim Hjortshøj",
  "Thomas Doktor",
  "Lauritz Nørup Gabriel",
  "Esben Nørup Gabriel",
  "Maia Thylkjær Frandsen",
  "Albert Mølgaard Andersen"
];

function formatNumber(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const difference = eventDate - now;

  if (difference <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const secondsTotal = Math.floor(difference / 1000);
  const days = Math.floor(secondsTotal / (24 * 60 * 60));
  const hours = Math.floor((secondsTotal % (24 * 60 * 60)) / 3600);
  const seconds = secondsTotal % 60;

  daysEl.textContent = formatNumber(days);
  hoursEl.textContent = formatNumber(hours);
  secondsEl.textContent = formatNumber(seconds);
}

function renderParticipants() {
  if (!participantsEl) {
    return;
  }

  if (!participants.length) {
    participantsEl.innerHTML = "<li>Navn kommer snart</li>";
    return;
  }

  participantsEl.innerHTML = participants
    .map((name) => `<li>${name}</li>`)
    .join("");
}

function initGallery() {
  if (!galleryTrackEl) {
    return;
  }

  const slides = Array.from(galleryTrackEl.querySelectorAll(".slide"));
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function renderDots() {
    if (!galleryDotsEl) {
      return;
    }

    galleryDotsEl.innerHTML = slides
      .map((_, index) => `<span class="gallery-dot${index === currentIndex ? " active" : ""}"></span>`)
      .join("");
  }

  function goTo(index) {
    const safeIndex = (index + slides.length) % slides.length;
    currentIndex = safeIndex;
    galleryTrackEl.style.transform = `translateX(-${currentIndex * 100}%)`;
    renderDots();
  }

  galleryPrevEl?.addEventListener("click", () => goTo(currentIndex - 1));
  galleryNextEl?.addEventListener("click", () => goTo(currentIndex + 1));

  galleryTrackEl.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  });

  galleryTrackEl.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;

    if (Math.abs(delta) < 40) {
      return;
    }

    if (delta > 0) {
      goTo(currentIndex - 1);
    } else {
      goTo(currentIndex + 1);
    }
  });

  goTo(0);
}

updateCountdown();
renderParticipants();
initGallery();
setInterval(updateCountdown, 1000);
