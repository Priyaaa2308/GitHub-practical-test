// ---------- Typing effect in the hero ----------
const roles = ["Student", "Web Developer", "Problem Solver"]; // change these
const typingEl = document.getElementById("typing");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1400); // pause when word is complete
      return;
    }
  } else {
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 50 : 100);
}
type();

// ---------- Dark mode toggle (remembers your choice) ----------
const themeBtn = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ---------- Mobile menu ----------
const navLinks = document.getElementById("nav-links");
document.getElementById("menu-toggle").addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ---------- Fade-in sections when scrolled into view ----------
const fadeEls = document.querySelectorAll(".section .section-title, .card, .skill");
fadeEls.forEach(el => el.classList.add("fade"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

// ---------- Contact form (demo only: no server yet) ----------
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  document.getElementById("form-status").textContent =
    `Thanks, ${name}! (This form is a demo, connect it to a service like Formspree to receive messages.)`;
  e.target.reset();
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();