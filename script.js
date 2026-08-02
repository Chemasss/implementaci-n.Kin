// ============================================
// TENDÓN — script.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menú móvil ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Goniómetro animado (hero) ---------- */
  const movingArm = document.getElementById('movingArm');
  const rangeArc = document.getElementById('rangeArc');
  const angleReadout = document.getElementById('angleReadout');
  const ticksGroup = document.querySelector('.goniometer-ticks');

  // Dibuja las marcas de grados alrededor del arco
  if (ticksGroup) {
    const cx = 210, cy = 330, r = 140;
    for (let deg = 0; deg <= 180; deg += 15) {
      const rad = (Math.PI / 180) * (180 - deg);
      const x1 = cx + Math.cos(rad) * (r - 8);
      const y1 = cy - Math.sin(rad) * (r - 8);
      const x2 = cx + Math.cos(rad) * r;
      const y2 = cy - Math.sin(rad) * r;
      const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      tick.setAttribute('x1', x1);
      tick.setAttribute('y1', y1);
      tick.setAttribute('x2', x2);
      tick.setAttribute('y2', y2);
      tick.setAttribute('stroke', 'var(--sage)');
      tick.setAttribute('stroke-width', '1');
      tick.setAttribute('opacity', '0.4');
      ticksGroup.appendChild(tick);
    }
  }

  function setAngle(deg) {
    const cx = 210, cy = 330, r = 140;
    const rad = (Math.PI / 180) * (180 - deg);
    const x = cx + Math.cos(rad) * r;
    const y = cy - Math.sin(rad) * r;

    if (movingArm) {
      movingArm.setAttribute('x2', x.toFixed(1));
      movingArm.setAttribute('y2', y.toFixed(1));
    }
    if (rangeArc) {
      // arco desde 0deg (vertical) hasta deg actual
      const largeArc = deg > 180 ? 1 : 0;
      rangeArc.setAttribute('d', `M 210 330 L 210 190 A 140 140 0 ${largeArc} 0 ${x.toFixed(1)} ${y.toFixed(1)} Z`);
    }
    if (angleReadout) {
      angleReadout.textContent = Math.round(deg) + '°';
    }
  }

  // Animación de conteo: 0 -> 128 (rango de flexión de rodilla real de un caso)
  if (movingArm && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let start = null;
    const duration = 2600;
    const target = 128;

    function animateAngle(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAngle(eased * target);
      if (progress < 1) {
        requestAnimationFrame(animateAngle);
      } else {
        setTimeout(() => {
          start = null;
          requestAnimationFrame(animateAngle);
        }, 2200);
      }
    }
    requestAnimationFrame(animateAngle);
  } else if (movingArm) {
    setAngle(128);
  }

  /* ---------- Nav: fondo al hacer scroll ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (nav) {
      nav.style.boxShadow = window.scrollY > 10 ? '0 1px 0 rgba(0,0,0,0.2)' : 'none';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Formulario de contacto (demo, sin backend) ---------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form && formNote) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      formNote.style.color = 'var(--rust)';
      formNote.textContent = `Gracias, ${nombre || 'te contactaremos'}. Este es un sitio de portafolio: el formulario no envía datos reales.`;
      form.reset();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll('.metodo-card, .servicio-row, .persona-card, .caso-card');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      io.observe(el);
    });
  }

});
