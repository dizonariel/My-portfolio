// AOS init
AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
 
// Header scroll state
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});
 
// Hamburger / mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('active'));
});
 
// Typed.js
if (window.Typed) {
  new Typed('#typed', {
    strings: ['Social Media Manager', 'Graphic Designer', 'Video Editor', 'Virtual Assistant'],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 1500,
    loop: true
  });
}
 
// Vanilla Tilt
if (window.VanillaTilt) {
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), { max: 10, speed: 400, glare: true, 'max-glare': 0.2 });
}
 
// Particles in hero
const particlesEl = document.getElementById('particles');
const particleCount = 35;
for (let i = 0; i < particleCount; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 3 + 1;
  p.style.width = size + 'px';
  p.style.height = size + 'px';
  p.style.left = Math.random() * 100 + '%';
  p.style.bottom = '-10px';
  p.style.animationDuration = (Math.random() * 8 + 6) + 's';
  p.style.animationDelay = (Math.random() * 8) + 's';
  particlesEl.appendChild(p);
}
 
// Mouse parallax on hero
const heroBg = document.getElementById('heroBg');
document.querySelector('.hero').addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  heroBg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
});
 
// Animated counters
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        current += step;
        if (current >= target) { el.textContent = target + '+'; return; }
        el.textContent = current;
        requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));
 
// Lightbox for project images
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
 
document.querySelectorAll('.project-card').forEach(card => {
  const img = card.querySelector('img');
  img.addEventListener('click', () => {
    const title = card.querySelector('.project-title')?.textContent || '';
    const cat = card.querySelector('.project-cat')?.textContent || '';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.innerHTML = `<strong>${title}</strong>${cat ? ' — ' + cat : ''}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});
 
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeLightbox(); closeVideoLightbox(); }
});
 
// Video reel lightbox
const videoLightbox = document.getElementById('videoLightbox');
const lightboxVideo = document.getElementById('lightboxVideo');
const videoLightboxCaption = document.getElementById('videoLightboxCaption');
const videoLightboxClose = document.getElementById('videoLightboxClose');
 
document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    const src = card.getAttribute('data-video');
    const title = card.getAttribute('data-title');
    const cat = card.getAttribute('data-cat');
    lightboxVideo.src = src;
    videoLightboxCaption.innerHTML = `<strong>${title}</strong>${cat ? ' — ' + cat : ''}`;
    videoLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxVideo.play().catch(() => {});
  });
});
 
function closeVideoLightbox() {
  videoLightbox.classList.remove('active');
  document.body.style.overflow = '';
  lightboxVideo.pause();
  lightboxVideo.currentTime = 0;
  lightboxVideo.src = '';
}
videoLightboxClose.addEventListener('click', closeVideoLightbox);
videoLightbox.addEventListener('click', (e) => {
  if (e.target === videoLightbox) closeVideoLightbox();
});
 
// Project filtering
document.addEventListener("DOMContentLoaded", () => {

    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {

        btn.addEventListener("click", function () {

            filterBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const filter = this.dataset.filter;

            projectCards.forEach(card => {

                if (filter === "all" || card.dataset.cat === filter) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });

});
 
// Swiper testimonials
if (window.Swiper) {
  new Swiper('.swiper', {
    loop: true,
    autoplay: { delay: 4500, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true }
  });
}
 
// Button ripple effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
 
// Contact form (demo submit)
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
  this.reset();
  setTimeout(() => { btn.innerHTML = original; }, 2500);
});
 
// Back to top
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
 
// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});