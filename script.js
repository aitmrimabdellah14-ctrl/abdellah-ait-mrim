"use strict";

document.documentElement.classList.add("has-js");

const emailLink = document.querySelector("[data-contact-email]");
const copyButton = document.querySelector("[data-copy-email]");
const toast = document.getElementById("toast");
let toastTimeout;

function notify(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 3500);
}

// Copy the visible email rather than maintaining a second address in JavaScript.
if (copyButton && emailLink) {
  copyButton.addEventListener("click", async () => {
    const email = emailLink.textContent.trim();
    copyButton.disabled = true;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(email);
      notify("Adresse e-mail copiée.");
    } catch {
      const range = document.createRange();
      range.selectNodeContents(emailLink);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      notify("Sélectionne l’adresse affichée pour la copier, ou clique dessus pour m’écrire.");
    } finally {
      copyButton.disabled = false;
    }
  });
}

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("site-nav");
const mobileViewport = window.matchMedia("(max-width: 520px)");

function setMenu(open, restoreFocus = false) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  navigation.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  if (restoreFocus) menuButton.focus();
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  navigation.addEventListener("click", (event) => { if (event.target.closest("a")) setMenu(false); });
  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (menuButton.getAttribute("aria-expanded") !== "true") return;
    if (event.key === "Escape") { setMenu(false, true); return; }
    if (event.key === "Tab") {
      const controls = [menuButton, ...navigation.querySelectorAll("a")];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  if (mobileViewport.addEventListener) mobileViewport.addEventListener("change", () => { if (!mobileViewport.matches) setMenu(false); });
}

const filters = [...document.querySelectorAll("[data-filter]")];
const projects = [...document.querySelectorAll(".project-card")];
const count = document.getElementById("project-count");
const filterRow = document.querySelector(".filter-row");

function filterProjects(filter) {
  let visible = 0;
  projects.forEach((project) => {
    const matches = filter === "all" || (filter === "featured" ? project.dataset.featured === "true" : project.dataset.category === filter);
    project.hidden = !matches;
    if (matches) visible += 1;
  });
  filters.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.filter === filter)));
  if (count) count.textContent = `${visible} projet${visible > 1 ? "s" : ""}${filter === "featured" ? " sélectionnés" : ""}`;
}

if (filters.length && projects.length) {
  filterProjects("featured");
  if (filterRow) filterRow.hidden = false;
  filters.forEach((button) => button.addEventListener("click", () => filterProjects(button.dataset.filter)));
}

// Links to the former PDF modals remain useful after the redesign.
const legacyCases = {
  "case-wef": "wef", "case-lingua": "linguaconnect", "case-loop": "loop",
  "case-naf-site": "naf-website", "case-audit": "audit-guichet", "case-city": "city-game-agadir",
  "case-travel": "travelease", "case-skills": "skill-to-skill", "case-naf-brand": "north-african-fitness",
  "case-rahety": "rahety", "case-tima": "timaevent", "case-fitness": "nutrition-fitness"
};
function followLegacyCase() {
  const slug = legacyCases[window.location.hash.slice(1)];
  if (slug && document.body.dataset.page === "home") window.location.replace(new URL(`projects/${slug}.html`, document.baseURI).href);
}
followLegacyCase();
window.addEventListener("hashchange", followLegacyCase);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.remove("is-pending"); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll(".reveal").forEach((element) => { element.classList.add("is-pending"); observer.observe(element); });
}
document.querySelectorAll("[data-year]").forEach((element) => { element.textContent = String(new Date().getFullYear()); });
