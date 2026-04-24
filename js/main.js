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

// Image modal
const images = document.querySelectorAll("figure img, .image-card img");
const imgModal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeImgModal = document.querySelector("#imgModal .close-modal");

images.forEach((img) => {
  img.addEventListener("click", () => {
    imgModal.style.display = "flex";
    modalImg.src = img.src;
  });
});

if (closeImgModal) {
  closeImgModal.onclick = () => {
    imgModal.style.display = "none";
  };
}

if (imgModal) {
  imgModal.onclick = (e) => {
    if (e.target !== modalImg) {
      imgModal.style.display = "none";
    }
  };
}

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