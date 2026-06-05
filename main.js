console.log("✅ main.js cargado");
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  const trailImagesData = [
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=200",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=200",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200",
  ];

  // --- 1. PRELOADER ---
  const preloader = document.getElementById("preloader");
  const progress = document.getElementById("loader-progress");
  const text = document.getElementById("loader-text");

  // ✅ Si falta algo, no bloquees la web
  if (!preloader || !progress || !text) {
    if (preloader) preloader.classList.add("loaded");
  } else {
    trailImagesData.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let loadVal = 0;

    // ✅ Failsafe: si algo raro pasa, sales igual
    const forceExit = setTimeout(() => {
      preloader.classList.add("loaded");
    }, 2500);

    const loadInterval = setInterval(() => {
      loadVal += Math.floor(Math.random() * 10) + 1;
      if (loadVal > 100) loadVal = 100;

      progress.style.width = loadVal + "%";
      text.innerText = loadVal + "%";

      if (loadVal === 100) {
        clearInterval(loadInterval);
        clearTimeout(forceExit);
        setTimeout(() => preloader.classList.add("loaded"), 500);
      }
    }, 30);
  }

            // --- 2. CURSOR & TRAIL ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');
const hasCustomCursor = !!(cursorDot && cursorCircle);
const magneticSection = document.getElementById('magnetic-section');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (hasCustomCursor) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    }

    if (magneticSection) {
        const rect = magneticSection.getBoundingClientRect();
        if (mouseY >= rect.top && mouseY <= rect.bottom) {
            if (Math.random() < 0.15) {
                const img = document.createElement('img');
                img.src = trailImagesData[Math.floor(Math.random() * trailImagesData.length)];
                img.className = 'trail-img';
                img.style.left = mouseX + 'px';
                img.style.top = mouseY + 'px';
                img.style.setProperty('--r', (Math.random() * 30 - 15) + 'deg');
                document.body.appendChild(img);
                setTimeout(() => img.remove(), 600);
            }
        }
    }
});
function animateCursor() {
    if (!hasCustomCursor) return;

    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursorCircle.style.left = cursorX + 'px';
    cursorCircle.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

if (hasCustomCursor) {
    animateCursor();
}

if (hasCustomCursor) {
    document.querySelectorAll('.hoverable').forEach(el => {
        el.addEventListener('mouseenter', () => cursorCircle.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorCircle.classList.remove('hovered'));
    });
}

            // --- 3. SCROLL REVEALS ---
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        if (entry.target.classList.contains('counter')) startCounter(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.reveal-item, .split-line, .draw-path, .counter').forEach(el => observer.observe(el));

            const p = document.querySelector('.reveal-paragraph');

            if (p && p.children.length === 0) {
                 const words = p.innerText.split(' ');

                 p.innerHTML = words.map((word, i) =>
                   `<span style="display:inline-block; opacity:0; transform:translateY(20px); transition:all 0.5s ease-out ${i * 0.05}s">${word}</span> `
                 ).join('');

                 const paragraphObserver = new IntersectionObserver((entries, obs) => {
                   if (entries[0].isIntersecting) {
                   entries[0].target.querySelectorAll('span').forEach(s => {
                      s.style.opacity = 1;
                     s.style.transform = 'translateY(0)';
                   });
                   obs.unobserve(entries[0].target);
                  }
               });

               paragraphObserver.observe(p);
           }
            // --- 4. SCROLL LOGIC ---
const horizontalSection = document.getElementById('proceso'); // ✅ antes estaba 'process'
const horizontalTrack = document.getElementById('horizontal-track');
const progressBar = document.getElementById('progress-bar');
const videoSection = document.getElementById('video-expand');

function setHorizontalSectionHeight() {
  if (!horizontalSection || !horizontalTrack) return;

  const trackWidth = horizontalTrack.scrollWidth;
  const viewportWidth = window.innerWidth;
  const scrollDistance = Math.max(0, trackWidth - viewportWidth);

  // altura = 100vh + distancia a recorrer en X
  horizontalSection.style.height = `${window.innerHeight + scrollDistance}px`;
}

window.addEventListener('resize', setHorizontalSectionHeight);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const winH = window.innerHeight;

  // ✅ Progress bar
  if (progressBar) {
    const docHeight = document.documentElement.scrollHeight - winH;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  // ✅ Parallax
  document.querySelectorAll('.parallax-bg').forEach(bg => {
    const speed = Number(bg.getAttribute('data-speed')) || 0;
    const img = bg.querySelector('img');
    if (img) {
      img.style.transform = `translateY(${scrollTop * speed}px) scale(1.1)`;
    }
  });

  // ✅ Horizontal scroll
  if (horizontalSection && horizontalTrack) {
    const offset = horizontalSection.offsetTop;
    const height = horizontalSection.offsetHeight;
    const maxMove = Math.max(0, horizontalTrack.scrollWidth - window.innerWidth);

    if (scrollTop < offset) {
      horizontalTrack.style.transform = 'translate3d(0, 0, 0)';
    } else if (scrollTop > (offset + height - winH)) {
      horizontalTrack.style.transform = `translate3d(${-maxMove}px, 0, 0)`;
    } else {
      const pct = (scrollTop - offset) / (height - winH);
      const move = maxMove * pct;
      horizontalTrack.style.transform = `translate3d(${-move}px, 0, 0)`;
    }
  }

  // ✅ Video expand
  if (videoSection) {
    const rect = videoSection.getBoundingClientRect();
    const maxDist = winH * 0.6;
    const centerDist = Math.abs(rect.top + rect.height / 2 - winH / 2);

    if (centerDist < maxDist) {
      const expand = 1 - (centerDist / maxDist);
      videoSection.style.width = Math.min(70 + (expand * 30), 100) + '%';
      videoSection.style.borderRadius = (20 * (1 - expand)) + 'px';
    }
  }
}, { passive: true });

// ✅ inicializa altura al cargar
setHorizontalSectionHeight();


            // --- 5. INTERACTION ---
            document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
    const content = wrap.querySelector('.magnetic-content');
    if (!content) return;

    wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.8;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.8;
        content.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
    });

    wrap.addEventListener('mouseleave', () => {
        content.style.transform = 'translate(0,0) scale(1)';
    });
});

            const tiltWrap = document.querySelector('.tilt-card-wrapper');
            const tiltCard = document.querySelector('.tilt-card');

            if (tiltWrap && tiltCard) {
            tiltWrap.addEventListener('mousemove', (e) => {
             const rect = tiltWrap.getBoundingClientRect();
             const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
             const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
             tiltCard.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
          });

    tiltWrap.addEventListener('mouseleave', () => {
        tiltCard.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    });
}

            // --- 6. CANVAS ---
            const canvas = document.getElementById('network-canvas');
            if(canvas) {
                const ctx = canvas.getContext('2d');
                let width, height, particles = [];
                function resize() { width = canvas.width = canvas.parentElement.offsetWidth; height = canvas.height = canvas.parentElement.offsetHeight; initParticles(); }
                function initParticles() {
                    particles = [];
                    const count = window.innerWidth < 768 ? 30 : 60;
                    for(let i=0; i<count; i++) particles.push({ x: Math.random()*width, y: Math.random()*height, vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5, size: Math.random()*2+1 });
                }
                function draw() {
                    ctx.clearRect(0,0,width,height); ctx.fillStyle = '#fff'; ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                    particles.forEach(p => {
                        p.x += p.vx; p.y += p.vy;
                        if(p.x < 0 || p.x > width) p.vx *= -1; if(p.y < 0 || p.y > height) p.vy *= -1;
                        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
                        const rect = canvas.getBoundingClientRect();
                        const dx = (mouseX - rect.left) - p.x; const dy = (mouseY - rect.top) - p.y;
                        if(Math.sqrt(dx*dx + dy*dy) < 150) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouseX - rect.left, mouseY - rect.top); ctx.stroke(); }
                    });
                    requestAnimationFrame(draw);
                }
                window.addEventListener('resize', resize); resize(); draw();
            }

            function startCounter(el) {
                const target = +el.dataset.target; let count = 0; const inc = target/50;
                const timer = setInterval(() => { count+=inc; if(count>=target){ el.innerText=target; clearInterval(timer); } else el.innerText=Math.ceil(count); }, 30);
            }
        
(function () {
  const canvas = document.getElementById("work-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height, particles;

  // Colores más vivos
  const COLORS = ["#7C6BFF", "#A396FF"];
  const PARTICLE_COUNT = 80;
  const MAX_DISTANCE = 160;

  function resize() {
    width = canvas.clientWidth || canvas.offsetWidth;
    height = canvas.clientHeight || canvas.offsetHeight;
    if (!width || !height) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // resetea transform y aplica escala
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initParticles();
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 2, // más grandes
        color: COLORS[i % COLORS.length],
      });
    }
  }

  function updateParticles() {
    if (!particles) return;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // rebote suave en bordes
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }
  }

  function drawParticles() {
    if (!width || !height) return;

    ctx.clearRect(0, 0, width, height);

    // líneas entre partículas cercanas
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DISTANCE) {
          const opacity = 1 - dist / MAX_DISTANCE;
          ctx.strokeStyle = `rgba(115, 109, 230, ${0.35 + opacity * 0.45})`; // más opaco
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // puntos con glow
    for (const p of particles) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;

      ctx.shadowColor = "rgba(163,150,255,0.9)";
      ctx.shadowBlur = 12;

      ctx.fill();
      ctx.restore();
    }
  }

  function loop() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  resize();
  loop();
})();
(() => {
  const blocks = document.querySelectorAll('.contact-reveal');
  if (!blocks.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-inview');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  blocks.forEach((b) => io.observe(b));
})();

// --- 7. SMOOTH SCROLL PARA ANCLAS INTERNAS ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');

    // ignora href vacíos o solo "#"
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const navOffset = 80;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth'
    });

    history.replaceState(null, '', href);
  });
});

}); // FIN del DOMContentLoaded

