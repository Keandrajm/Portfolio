const revealElements = document.querySelectorAll(
  ".program-card, .project-card, .phase, .skill-box, .training-card, .video-section, .dashboard-section, figure, .about-card, .cta-panel"
);

if ("IntersectionObserver" in window) {
  const revealOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealOnScroll.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    element.classList.add("hidden");
    revealOnScroll.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("show"));
}

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const imgModal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeImgModal = document.querySelector("#imgModal .close-modal");

function openImageModal(img) {
  if (!imgModal || !modalImg) return;
  modalImg.src = img.src;
  modalImg.alt = img.alt || "Expanded portfolio image";
  imgModal.classList.add("is-open");
  imgModal.setAttribute("aria-hidden", "false");
}

function closeImageModal() {
  if (!imgModal || !modalImg) return;
  imgModal.classList.remove("is-open");
  imgModal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
}

document.querySelectorAll("figure img, .image-card img, .clickable-img").forEach((img) => {
  img.addEventListener("click", () => openImageModal(img));
});

if (closeImgModal) {
  closeImgModal.addEventListener("click", closeImageModal);
}

if (imgModal) {
  imgModal.addEventListener("click", (event) => {
    if (event.target === imgModal) {
      closeImageModal();
    }
  });
}

const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const closeVideoModal = document.querySelector("#videoModal .close-modal");

function openVideo(videoId) {
  if (!videoModal || !videoFrame || !videoId) return;
  videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
}

function closeVideo() {
  if (!videoModal || !videoFrame) return;
  videoFrame.src = "";
  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-video-id]").forEach((button) => {
  button.addEventListener("click", () => openVideo(button.dataset.videoId));
});

if (closeVideoModal) {
  closeVideoModal.addEventListener("click", closeVideo);
}

if (videoModal) {
  videoModal.addEventListener("click", (event) => {
    if (event.target === videoModal) {
      closeVideo();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeImageModal();
    closeVideo();
  }
});

const sections = document.querySelectorAll("main section[id], footer[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const backToTop = document.querySelector(".back-to-top");

function updateActiveNav() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });

  if (backToTop) {
    backToTop.classList.toggle("is-visible", window.scrollY > 620);
  }
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("load", updateActiveNav);
