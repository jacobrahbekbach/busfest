const eventDate = new Date("2026-06-13T15:30:00+02:00");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const secondsEl = document.getElementById("seconds");
const participantsEl = document.getElementById("participants");
const galleryEl = document.getElementById("gallery");
const galleryTrackEl = document.getElementById("gallery-track");
const galleryPrevEl = document.getElementById("gallery-prev");
const galleryNextEl = document.getElementById("gallery-next");
const galleryDotsEl = document.getElementById("gallery-dots");

const galleryMedia = [
  {
    type: "image",
    src: "assets/busfest-bg.png",
    alt: "Busfest stemningsbillede"
  },
  {
    type: "video",
    src: "assets/gallery/2026-05-25 20.34.10.mov",
    poster: "assets/gallery/2026-05-25 20.34.10-poster.jpg"
  },
  {
    type: "image",
    src: "assets/busfest-bg.png",
    alt: "Upload billede 3"
  }
];

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

function renderGallerySlides() {
  if (!galleryTrackEl) {
    return;
  }

  if (!galleryMedia.length) {
    galleryTrackEl.innerHTML = '<article class="slide"><p>Ingen medier endnu</p></article>';
    return;
  }

  galleryTrackEl.innerHTML = galleryMedia
    .map((media, index) => {
      if (media.type === "video") {
        const posterAttr = media.poster ? ` poster="${media.poster}"` : "";
        return `<article class="slide"><div class="video-shell"><video playsinline preload="metadata"${posterAttr}><source src="${media.src}" type="video/mp4" />Din browser understotter ikke videoafspilning.</video><button class="video-play" type="button" aria-label="Afspil video"><span class="video-play-icon" aria-hidden="true"></span></button></div></article>`;
      }

      const alt = media.alt || `Galleri medie ${index + 1}`;
      return `<article class="slide"><img src="${media.src}" alt="${alt}" draggable="false" /></article>`;
    })
    .join("");
}

function initGallery() {
  if (!galleryTrackEl || !galleryEl) {
    return;
  }

  renderGallerySlides();

  const slides = Array.from(galleryTrackEl.querySelectorAll(".slide"));
  if (!slides.length) {
    return;
  }

  let currentIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchCurrentX = 0;
  let touchCurrentY = 0;
  let isTouching = false;

  function stopVideo(videoEl, videoShellEl) {
    if (!videoEl) {
      return;
    }

    videoEl.pause();
    videoEl.controls = false;

    if (videoEl.currentTime > 0) {
      videoEl.currentTime = 0;
    }

    videoShellEl?.classList.remove("is-playing");
  }

  async function startVideo(videoEl, videoShellEl) {
    if (!videoEl) {
      return;
    }

    try {
      videoEl.controls = true;
      await videoEl.play();
      videoShellEl?.classList.add("is-playing");
      updateTrackHeight();
    } catch {
      videoEl.controls = false;
      videoShellEl?.classList.remove("is-playing");
    }
  }

  function updateTrackHeight() {
    const activeSlide = slides[currentIndex];
    if (!activeSlide) {
      return;
    }

    const mediaEl = activeSlide.querySelector("img, video");
    const nextHeight = mediaEl
      ? mediaEl.getBoundingClientRect().height
      : activeSlide.getBoundingClientRect().height;

    if (nextHeight > 0) {
      galleryTrackEl.style.height = `${Math.ceil(nextHeight)}px`;
    }
  }

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
    slides.forEach((slide, slideIndex) => {
      if (slideIndex === safeIndex) {
        return;
      }

      const otherVideo = slide.querySelector("video");
      const otherShell = slide.querySelector(".video-shell");
      stopVideo(otherVideo, otherShell);
    });

    currentIndex = safeIndex;
    galleryTrackEl.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateTrackHeight();
    renderDots();

    const activeSlide = slides[currentIndex];
    const activeVideo = activeSlide?.querySelector("video");
    const activeShell = activeSlide?.querySelector(".video-shell");
    startVideo(activeVideo, activeShell);
  }

  galleryPrevEl?.addEventListener("click", () => goTo(currentIndex - 1));
  galleryNextEl?.addEventListener("click", () => goTo(currentIndex + 1));

  galleryEl.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1) {
      return;
    }

    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchCurrentX = touch.clientX;
    touchCurrentY = touch.clientY;
    isTouching = true;
  }, { passive: true });

  galleryEl.addEventListener("touchmove", (event) => {
    if (!isTouching || event.touches.length !== 1) {
      return;
    }

    const touch = event.touches[0];
    touchCurrentX = touch.clientX;
    touchCurrentY = touch.clientY;

    const deltaX = touchCurrentX - touchStartX;
    const deltaY = touchCurrentY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      event.preventDefault();
    }
  }, { passive: false });

  galleryEl.addEventListener("touchend", (event) => {
    if (!isTouching) {
      return;
    }

    isTouching = false;
    const touch = event.changedTouches[0];
    const endX = touch ? touch.clientX : touchCurrentX;
    const delta = endX - touchStartX;

    if (Math.abs(delta) < 45) {
      return;
    }

    if (delta > 0) {
      goTo(currentIndex - 1);
    } else {
      goTo(currentIndex + 1);
    }
  }, { passive: true });

  galleryEl.addEventListener("touchcancel", () => {
    isTouching = false;
  }, { passive: true });

  slides.forEach((slide) => {
    const imageEl = slide.querySelector("img");
    if (imageEl) {
      imageEl.addEventListener("load", updateTrackHeight);
    }

    const videoEl = slide.querySelector("video");
    const playButtonEl = slide.querySelector(".video-play");
    const videoShellEl = slide.querySelector(".video-shell");
    if (videoEl) {
      playButtonEl?.addEventListener("click", () => startVideo(videoEl, videoShellEl));

      videoEl.addEventListener("play", () => {
        videoEl.controls = true;
        videoShellEl?.classList.add("is-playing");
        updateTrackHeight();
      });

      videoEl.addEventListener("pause", () => {
        videoEl.controls = false;
        videoShellEl?.classList.remove("is-playing");
        updateTrackHeight();
      });

      videoEl.addEventListener("ended", () => {
        stopVideo(videoEl, videoShellEl);
        updateTrackHeight();
      });

      videoEl.addEventListener("loadedmetadata", updateTrackHeight);
      videoEl.addEventListener("loadeddata", updateTrackHeight);
      videoEl.addEventListener("play", updateTrackHeight);
    }
  });

  window.addEventListener("resize", updateTrackHeight);

  goTo(0);
}

updateCountdown();
renderParticipants();
initGallery();
setInterval(updateCountdown, 1000);
