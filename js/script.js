
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initBurgerMenu();
  initTabs();
  initScrollToButtons();
  initModals();
  initGalleryLightbox();
  initForms();
});



function initThemeToggle() {
  const body = document.body;
  const toggle = document.querySelector("[data-theme-toggle]");
  const STORAGE_KEY = "stour-theme";

  if (!toggle) return;

  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
    }
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("page--dark");
      body.classList.remove("page--light");
    } else {
      body.classList.add("page--light");
      body.classList.remove("page--dark");
      theme = "light";
    }

    toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    saveTheme(theme);
  }


  const saved = getSavedTheme();
  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  } else {

    const current = body.classList.contains("page--light") ? "light" : "dark";
    applyTheme(current);
  }

  toggle.addEventListener("click", () => {
    const isDark = body.classList.contains("page--dark");
    applyTheme(isDark ? "light" : "dark");
  });
}

function initBurgerMenu() {
  const burger = document.querySelector("[data-burger]");
  const mobileNav = document.getElementById("mobile-nav");

  if (!burger || !mobileNav) return;

  function openMenu() {
    burger.classList.add("burger--active");
    burger.setAttribute("aria-expanded", "true");
    mobileNav.hidden = false;
  }

  function closeMenu() {
    burger.classList.remove("burger--active");
    burger.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
  }

  burger.addEventListener("click", () => {
    const isActive = burger.classList.contains("burger--active");
    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  });


  mobileNav.querySelectorAll("[data-close-menu]").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });


  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });


  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}


function initTabs() {
  const tabsBlocks = document.querySelectorAll("[data-tabs]");
  if (!tabsBlocks.length) return;

  tabsBlocks.forEach((tabs) => {
    const tabButtons = tabs.querySelectorAll("[data-tab]");
    const panels = tabs.querySelectorAll(".tabs__panel");

    if (!tabButtons.length || !panels.length) return;

    function activateTab(targetId) {
      tabButtons.forEach((btn) => {
        const isActive = btn.dataset.tab === targetId;
        btn.classList.toggle("tabs__tab--active", isActive);
        btn.setAttribute("aria-selected", String(isActive));
      });

      panels.forEach((panel) => {
        const isActive = panel.id === targetId;
        panel.hidden = !isActive;
        panel.classList.toggle("tabs__panel--active", isActive);
      });
    }

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.tab;
        if (!id) return;
        activateTab(id);
      });
    });
  });
}


function initScrollToButtons() {
  const triggers = document.querySelectorAll("[data-scroll-to]");
  if (!triggers.length) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const selector = trigger.getAttribute("data-scroll-to");
      if (!selector) return;

      const target = document.querySelector(selector);
      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}


function initModals() {
  const modalOpeners = document.querySelectorAll("[data-modal-open]");
  if (!modalOpeners.length) return;

  let activeModal = null;

  function openModal(modal) {
    activeModal = modal;
    modal.classList.add("modal--open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!activeModal) return;
    activeModal.classList.remove("modal--open");
    activeModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeModal = null;
  }

  modalOpeners.forEach((btn) => {
    const targetId = btn.getAttribute("data-modal-open");
    const modal = document.getElementById(targetId);
    if (!modal) return;

    btn.addEventListener("click", () => {
      openModal(modal);
    });


    modal.querySelectorAll("[data-modal-close]").forEach((closeEl) => {
      closeEl.addEventListener("click", () => {
        closeModal();
      });
    });
  });


  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}


function initGalleryLightbox() {
  const images = document.querySelectorAll(".gallery__image");
  const lightbox = document.getElementById("gallery-lightbox");

  if (!images.length || !lightbox) return;

  const lightboxImg = lightbox.querySelector(".gallery-lightbox__image");
  const closeBtn = lightbox.querySelector(".gallery-lightbox__close");

  function openLightbox(img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    lightbox.classList.add("gallery-lightbox--open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("gallery-lightbox--open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  images.forEach((img) => {
    img.addEventListener("click", () => {
      openLightbox(img);
    });
  });

  closeBtn.addEventListener("click", () => {
    closeLightbox();
  });


  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}


function initForms() {
  const forms = document.querySelectorAll("form");
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      alert("Спасибо! Мы свяжемся с тобой в ближайшее время.");
      form.reset();
    });
  });
}
