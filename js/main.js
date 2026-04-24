// Smooth reveal on scroll
const revealElements = document.querySelectorAll(
  ".program-card, .project-card, .phase, .skill-box, .training-card, .video-section, figure, .about-card"
);

const revealOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => {
  element.classList.add("hidden");
  revealOnScroll.observe(element);
});

// Update footer year
const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// IMAGE MODAL
const imgModal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.querySelector(".close-modal");

// OPEN IMAGE
document.querySelectorAll(".clickable-img").forEach(img => {
  img.addEventListener("click", function () {
    imgModal.style.display = "flex";
    modalImg.src = this.src;
  });
});

// CLOSE IMAGE
closeModal.addEventListener("click", () => {
  imgModal.style.display = "none";
});

// CLOSE ON BACKGROUND CLICK
imgModal.addEventListener("click", (e) => {
  if (e.target === imgModal) {
    imgModal.style.display = "none";
  }
});

// Video modal
function openVideo(videoId) {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  modal.style.display = "flex";
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  frame.src = "";
  modal.style.display = "none";
}
