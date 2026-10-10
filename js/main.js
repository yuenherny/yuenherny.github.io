"use strict";

(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Footer year
  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  // 2. Reveal elements on scroll
  const revealItems = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    revealItems.forEach((el) => revealObserver.observe(el));
  }

  // 3. Hero text rotator
  const rotate = document.querySelector(".rotate");
  if (rotate) {
    const full = rotate.textContent.trim();
    const phrases = full
      .split(",")
      .map((phrase) => phrase.trim())
      .filter(Boolean);
    if (!reduceMotion && phrases.length > 1) {
      // Screen readers get the full list once; the visible rotating text is hidden from them.
      const fullText = document.createElement("span");
      fullText.className = "visually-hidden";
      fullText.textContent = phrases.join(", ");
      const visible = document.createElement("span");
      visible.className = "rotate__text";
      visible.setAttribute("aria-hidden", "true");
      visible.textContent = phrases[0];
      rotate.replaceChildren(fullText, visible);

      let index = 0;
      setInterval(() => {
        visible.classList.add("is-fading");
        setTimeout(() => {
          index = (index + 1) % phrases.length;
          visible.textContent = phrases[index];
          visible.classList.remove("is-fading");
        }, 400);
      }, 2500);
    }
  }

  // 4. Section dots
  const dotLinks = document.querySelectorAll(".dots a");
  const sectionIds = ["home", "work", "about", "portfolio", "contact"];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  if (dotLinks.length && "IntersectionObserver" in window) {
    const setActive = (id) => {
      dotLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("is-active", active);
        if (active) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };
    const dotObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((section) => dotObserver.observe(section));
  }
})();
