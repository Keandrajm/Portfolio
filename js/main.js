const revealElements = document.querySelectorAll(
  ".program-card, .project-card, .phase, .skill-box, .training-card, .snapshot-card, .playbook-step, .video-section, .dashboard-section, .tool-stack-panel, figure, .about-card, .cta-panel"
);

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

let hashNavLockUntil = 0;

function scrollToCurrentHash() {
  if (!window.location.hash) return;

  hashNavLockUntil = Date.now() + 1200;
  scrollToTarget(window.location.hash.slice(1));
}

function scheduleHashScroll() {
  if (!window.location.hash) return;

  [0, 80, 250, 600, 1200, 2200].forEach((delay) => {
    setTimeout(scrollToCurrentHash, delay);
  });
}

function getHeaderOffset() {
  const header = document.querySelector("header");
  return header ? Math.ceil(header.getBoundingClientRect().height + 14) : 0;
}

function scrollToTarget(targetId, updateHash = false) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: "auto" });

  if (updateHash && window.location.hash !== `#${targetId}`) {
    history.pushState(null, "", `#${targetId}`);
  }

  hashNavLockUntil = Date.now() + 1200;
  setActiveNav(targetId);
}

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

function setActiveNav(currentSection) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
}

function updateActiveNav() {
  let currentSection = "";
  const scrollPosition = window.scrollY + getHeaderOffset() + 24;

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentSection = section.getAttribute("id");
    }
  });

  const isAtPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
  if (isAtPageEnd && sections.length) {
    currentSection = sections[sections.length - 1].getAttribute("id");
  }

  if (window.location.hash && Date.now() < hashNavLockUntil) {
    const hashSection = document.getElementById(window.location.hash.slice(1));
    if (hashSection) {
      currentSection = hashSection.getAttribute("id");
    }
  }

  setActiveNav(currentSection);

  if (backToTop) {
    backToTop.classList.toggle("is-visible", window.scrollY > 620);
  }
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("hashchange", () => {
  requestAnimationFrame(scheduleHashScroll);
});
window.addEventListener("load", () => {
  requestAnimationFrame(scheduleHashScroll);
  updateActiveNav();
});
window.addEventListener("pageshow", () => {
  requestAnimationFrame(scheduleHashScroll);
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    event.preventDefault();
    scrollToTarget(href.slice(1), true);
  });
});
