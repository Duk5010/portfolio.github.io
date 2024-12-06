// light mode
let lightmode = localStorage.getItem("lightmode");

const themeSwitch = document.getElementById("theme-switch");

const enableLightmode = () => {
  document.body.classList.add("lightmode");
  localStorage.setItem("lightmode", "active");
};

const disableLightmode = () => {
  document.body.classList.remove("lightmode");
  localStorage.setItem("lightmode", null);
};

if (lightmode === "active") {
  enableLightmode();
}

themeSwitch.addEventListener("click", () => {
  lightmode = localStorage.getItem("lightmode");
  if (lightmode !== "active") {
    enableLightmode();
  } else {
    disableLightmode();
  }
});

// fade in
const fadeElements = document.querySelectorAll(".fade-in");

document.addEventListener("scroll", () => {
  fadeElements.forEach((fade) => {
    if (isInView(fade)) {
      fade.classList.add("fade-in--visible");
      fade.classList.remove("fade-in--hidden");
    } else {
      fade.classList.remove("fade-in--visible");
      fade.classList.add("fade-in--hidden");
    }
  });
});

function isInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight)
  );
}

// Swiper Initialization
const cardWrapper = document.querySelector(".card-wrapper");
const cardSlides = cardWrapper.querySelectorAll(".swiper-slide");

new Swiper(".card-wrapper", {
  loop: cardSlides.length > 3,
  spaceBetween: 50,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";

    document.addEventListener("keydown", escHandler);
  }
}

function escHandler(event) {
  if (event.key === "Escape") {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      if (modal.style.display === "block") {
        modal.style.display = "none";
      }
    });
    document.removeEventListener("keydown", escHandler);
  }
}

//html modal
function loadHTMLContent() {
  const contentDiv = document.getElementById("modal-content-html");

  const htmlContent = `
    <h4>Dynamic HTML Content</h4>
    <p>This is dynamically added HTML content inside the swiper slide!</p>
  `;

  contentDiv.innerHTML = htmlContent;
}

//swiper modal
function openModalWithHTML(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";

    loadHTMLContent();

    document.addEventListener("keydown", escHandler);
  }
}

const modalsWithSwiper = document.querySelectorAll(".popup-swiper");

modalsWithSwiper.forEach((modalSwiper) => {
  const modalElement = modalSwiper.closest(".modal");
  const modalSlides = modalSwiper.querySelectorAll(".swiper-slide");
  const enableLoop = modalSlides.length > 1; // Enable loop only if more than 1 slide

  new Swiper(modalSwiper, {
    direction: "horizontal",
    loop: false,
    allowTouchMove: enableLoop,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});

// modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block"; // Show the modal

  positionModal(modal);

  modal.scrollIntoView({ behavior: "smooth", block: "center" });
}

// close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}

// modal open
function positionModal(modal) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const modalWidth = modal.offsetWidth;
  const modalHeight = modal.offsetHeight;

  modal.style.position = "fixed";
  modal.style.left = `${(windowWidth - modalWidth) / 2}px`;
  modal.style.top = `${(windowHeight - modalHeight) / 2}px`;
  modal.style.zIndex = "1000";
}

document.addEventListener("click", function (event) {
  const modalTriggers = document.querySelectorAll(".modal-trigger");
  modalTriggers.forEach((trigger) => {
    if (trigger.contains(event.target)) {
      const modalId = trigger.getAttribute("data-modal-id");
      openModal(modalId);
    }
  });
});

document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", function (event) {
    if (event.target === this) {
      const modalId = this.id;
      closeModal(modalId);
    }
  });
});

// modal open
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "flex";

  positionModal(modal);

  document.body.style.overflow = "hidden";

  modal.scrollIntoView({ behavior: "smooth", block: "center" });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none"; // Hide the modal

  document.body.style.overflow = "auto";
}

function positionModal(modal) {
  // Use flexbox for centering
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";

  const modalWidth = modal.offsetWidth;
  const modalHeight = modal.offsetHeight;

  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.zIndex = "1000";
}

function closeOnOverlayClick(event) {
  const modal = event.target.closest(".modal");
  if (modal && event.target === modal) {
    const modalId = modal.id;
    closeModal(modalId);
  }
}

document.addEventListener("click", function (event) {
  const modalTriggers = document.querySelectorAll(".modal-trigger");
  modalTriggers.forEach((trigger) => {
    if (trigger.contains(event.target)) {
      const modalId = trigger.getAttribute("data-modal-id");
      openModal(modalId);
    }
  });
});

document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", closeOnOverlayClick);
});
