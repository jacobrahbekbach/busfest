const eventDate = new Date("2026-06-13T15:30:00+02:00");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
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
    src: "assets/gallery/2025-05-17 17.04.44.jpg"
  },
  {
    type: "video",
    src: "assets/gallery/2025-05-17 15.38.48.mov",
    poster: "assets/gallery/2025-05-17 15.38.48-poster-5.jpg"
  },
  {
    type: "video",
    src: "assets/gallery/2025-05-17 15.43.50.mov",
    poster: "assets/gallery/2025-05-17 15.43.50-poster.jpg"
  },
  {
    type: "image",
    src: "assets/gallery/2025-05-17 17.12.34.jpg"
  },
  {
    type: "image",
    src: "assets/gallery/2025-05-17 18.45.07.jpg"
  },
  {
    type: "image",
    src: "assets/gallery/2025-05-17 18.56.34.jpg"
  },
  {
    type: "image",
    src: "assets/gallery/2025-05-17 19.00.52-1.jpg"
  },
  {
    type: "video",
    src: "assets/gallery/2025-05-18 09.07.21-1.mov",
    poster: "assets/gallery/2025-05-18 09.07.21-1-poster-3.jpg"
  },
  {
    type: "video",
    src: "assets/gallery/2025-05-17 16.26.01.mov",
    poster: "assets/gallery/2025-05-17 16.26.01-poster-2.jpg"
  },
  {
    type: "video",
    src: "assets/gallery/2025-05-17 17.45.09.mov",
    poster: "assets/gallery/2025-05-17 17.45.09-poster-1.jpg"
  },
  {
    type: "image",
    src: "assets/gallery/2025-05-19 22.01.32.jpg"
  },
  {
    type: "video",
    src: "assets/gallery/2025-05-17 18.00.53.mov",
    poster: "assets/gallery/2025-05-17 18.00.53-poster-4.jpg"
  },
  {
    type: "video",
    src: "assets/gallery/2025-05-17 19.16.17.mov",
    poster: "assets/gallery/2025-05-17 19.16.17-poster-4.jpg"
  },
  {
    type: "image",
    src: "assets/gallery/2025-05-17 20.04.00.jpg"
  },
  {
    type: "video",
    src: "assets/gallery/2025-05-18 09.07.21.mov",
    poster: "assets/gallery/2025-05-18 09.07.21-poster-3.jpg"
  },
  {
    type: "video",
    src: "assets/gallery/2025-05-18 09.07.21-2.mov",
    poster: "assets/gallery/2025-05-18 09.07.21-2-poster-3.jpg"
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
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const secondsTotal = Math.floor(difference / 1000);
  const days = Math.floor(secondsTotal / (24 * 60 * 60));
  const hours = Math.floor((secondsTotal % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  daysEl.textContent = formatNumber(days);
  hoursEl.textContent = formatNumber(hours);
  minutesEl.textContent = formatNumber(minutes);
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
        return `<article class="slide"><div class="video-shell"><video playsinline webkit-playsinline preload="metadata"${posterAttr}><source src="${media.src}" />Din browser understotter ikke videoafspilning.</video><button class="video-play" type="button" aria-label="Afspil video"><span class="video-play-icon" aria-hidden="true"></span></button></div></article>`;
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
  let resizeFrameId = 0;

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
      videoEl.muted = false;
      videoEl.controls = true;
      await videoEl.play();
      videoShellEl?.classList.add("is-playing");
      updateTrackHeight();
    } catch {
      videoEl.controls = false;
      videoShellEl?.classList.remove("is-playing");
    }
  }

  function scheduleTrackHeightUpdate() {
    if (resizeFrameId) {
      cancelAnimationFrame(resizeFrameId);
    }

    resizeFrameId = requestAnimationFrame(() => {
      resizeFrameId = 0;
      updateTrackHeight();
    });
  }

  function updateTrackHeight() {
    const activeSlide = slides[currentIndex];
    if (!activeSlide) {
      return;
    }

    const mediaEl = activeSlide.querySelector("img, video");
    const mediaHeight = mediaEl ? mediaEl.getBoundingClientRect().height : 0;
    const slideHeight = activeSlide.getBoundingClientRect().height;
    const nextHeight = Math.max(mediaHeight, slideHeight, 180);

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
    scheduleTrackHeightUpdate();
    renderDots();
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
      if (imageEl.complete) {
        scheduleTrackHeightUpdate();
      } else {
        imageEl.addEventListener("load", scheduleTrackHeightUpdate);
      }
      imageEl.addEventListener("error", scheduleTrackHeightUpdate);
    }

    const videoEl = slide.querySelector("video");
    const playButtonEl = slide.querySelector(".video-play");
    const videoShellEl = slide.querySelector(".video-shell");
    if (videoEl) {
      playButtonEl?.addEventListener("click", () => startVideo(videoEl, videoShellEl));

      videoEl.addEventListener("play", () => {
        videoEl.controls = true;
        videoShellEl?.classList.add("is-playing");
        scheduleTrackHeightUpdate();
      });

      videoEl.addEventListener("pause", () => {
        videoEl.controls = false;
        videoShellEl?.classList.remove("is-playing");
        scheduleTrackHeightUpdate();
      });

      videoEl.addEventListener("ended", () => {
        stopVideo(videoEl, videoShellEl);
        scheduleTrackHeightUpdate();
      });

      videoEl.addEventListener("loadedmetadata", scheduleTrackHeightUpdate);
      videoEl.addEventListener("loadeddata", scheduleTrackHeightUpdate);
      videoEl.addEventListener("canplay", scheduleTrackHeightUpdate);
      videoEl.addEventListener("play", scheduleTrackHeightUpdate);
    }
  });

  window.addEventListener("resize", scheduleTrackHeightUpdate);

  goTo(0);
}

updateCountdown();
renderParticipants();
initGallery();
setInterval(updateCountdown, 1000);
