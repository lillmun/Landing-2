console.log("✅ main.js cargado");
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

            // --- REPOSITORY DATA (CODE SNIPPETS) ---
            const libraryData = [
                { id: 'smooth-scale', name: 'Hero con imagen dinámica', code: `<div class="group relative overflow-hidden rounded-lg aspect-[3/4]"><img src="image.jpg" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"><div class="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500"><h3 class="text-white">Título</h3></div></div>` },
                { id: 'parallax', name: 'Sección con parallax suave', code: `// HTML: <div class="parallax-bg" data-speed="0.05"><img ...></div>\n// JS: window.addEventListener('scroll', () => { document.querySelectorAll('.parallax-bg').forEach(bg => { const speed = bg.getAttribute('data-speed'); bg.querySelector('img').style.transform = \`translateY(\${window.scrollY * speed}px)\`; }); });` },
                { id: '3d-tilt', name: 'Card con tilt 3D', code: `// CSS: .tilt-card { transform-style: preserve-3d; }\n// JS: el.addEventListener('mousemove', (e) => { const x = (e.clientX/w - 0.5)*20; const y = (e.clientY/h - 0.5)*-20; el.style.transform = \`rotateX(\${y}deg) rotateY(\${x}deg)\`; });` },
                { id: 'horizontal', name: 'Scroll horizontal para proceso', code: `// JS: const move = (track.scrollWidth - window.innerWidth) * (scrollTop - offset) / (height - winH); track.style.transform = \`translateX(-\${move}px)\`;` },
                { id: 'magnetic', name: 'Botón CTA magnético', code: `// JS: const x = (e.clientX - rect.left - rect.width/2) * 0.8; el.style.transform = \`translate(\${x}px, \${y}px)\`;` },
                { id: 'trail', name: 'Trail visual en secciones clave', code: `// JS: const img = document.createElement('img'); img.style.left = e.clientX + 'px'; img.style.top = e.clientY + 'px'; document.body.appendChild(img); setTimeout(() => img.remove(), 600);` },
                { id: 'expand', name: 'Video / mockup que se expande', code: `// JS: const width = 70 + (1 - distanceToCenter/maxDist) * 30; el.style.width = Math.min(width, 100) + '%';` },
                { id: 'text-mask', name: 'Máscara de texto con vídeo', code: `.text { color: transparent; -webkit-text-stroke: 1px white; } .video-bg { mix-blend-mode: screen; opacity: 0.6; }` },
                { id: 'canvas', name: 'Red de partículas interactiva', code: `// Standard HTML5 Canvas Context.arc() loop with mouse distance checks.` }
            ];

            const repoGrid = document.getElementById('repo-grid');
         if (repoGrid) {
            libraryData.forEach(item => {
                const btn = document.createElement('button');
                btn.className = 'p-6 border border-white/10 bg-white/5 rounded-lg text-left hover:bg-white hover:text-black transition-all group';
                btn.innerHTML = `<div class="flex justify-between items-center"><span class="font-mono text-sm">${item.name}</span><i data-lucide="copy" class="w-4 h-4 opacity-50 group-hover:opacity-100"></i></div>`;
                btn.onclick = () => {
                    navigator.clipboard.writeText(item.code);
                    const toast = document.getElementById('toast');
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 2000);
                };
                repoGrid.appendChild(btn);
            });
            lucide.createIcons(); // Re-run for new icons
            } // ✅ cierre del if (repoGrid)

            // --- 1. PRELOADER ---
const preloader = document.getElementById("preloader");
const progress = document.getElementById("loader-progress");
const text = document.getElementById("loader-text");

// ✅ Si falta algo, no bloquees la web
if (!preloader || !progress || !text) {
  if (preloader) preloader.classList.add("loaded");
} else {
  const trailImagesData = [
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=200",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=200",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200",
  ];
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
            const trailContainer = document.getElementById('trail-container');
            const magneticSection = document.getElementById('magnetic-section');
            let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX; mouseY = e.clientY;
                cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px';

                if (magneticSection && trailContainer) {
                    const rect = magneticSection.getBoundingClientRect();
                    if (mouseY >= rect.top && mouseY <= rect.bottom) {
                         if(Math.random() < 0.15) { 
                             const img = document.createElement('img');
                             img.src = trailImagesData[Math.floor(Math.random() * trailImagesData.length)];
                             img.className = 'trail-img';
                             img.style.left = mouseX + 'px'; img.style.top = mouseY + 'px';
                             img.style.setProperty('--r', (Math.random() * 30 - 15) + 'deg');
                             document.body.appendChild(img); setTimeout(() => img.remove(), 600);
                         }
                    }
                }
            });

            function animateCursor() {
                cursorX += (mouseX - cursorX) * 0.15; cursorY += (mouseY - cursorY) * 0.15;
                cursorCircle.style.left = cursorX + 'px'; cursorCircle.style.top = cursorY + 'px';
                requestAnimationFrame(animateCursor);
            }
            animateCursor();

            document.querySelectorAll('.hoverable').forEach(el => {
                el.addEventListener('mouseenter', () => cursorCircle.classList.add('hovered'));
                el.addEventListener('mouseleave', () => cursorCircle.classList.remove('hovered'));
            });

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
            if(p) {
                const words = p.innerText.split(' ');
                p.innerHTML = words.map((word, i) => `<span style="display:inline-block; opacity:0; transform:translateY(20px); transition:all 0.5s ease-out ${i*0.05}s">${word}</span> `).join('');
                new IntersectionObserver((entries) => { if(entries[0].isIntersecting) entries[0].target.querySelectorAll('span').forEach(s => { s.style.opacity = 1; s.style.transform = 'translateY(0)'; }); }).observe(p);
            }

            // --- 4. SCROLL LOGIC ---
            const horizontalSection = document.getElementById('process');
            const horizontalTrack = document.getElementById('horizontal-track');
            const progressBar = document.getElementById('progress-bar');
            const videoSection = document.getElementById('video-expand');

            window.addEventListener('scroll', () => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                progressBar.style.width = (scrollTop / docHeight * 100) + '%';

                document.querySelectorAll('.parallax-bg').forEach(bg => {
                    const speed = bg.getAttribute('data-speed');
                    if(bg.querySelector('img')) bg.querySelector('img').style.transform = `translateY(${scrollTop * speed}px) scale(1.1)`;
                });

                if(horizontalSection && horizontalTrack) {
                    const offset = horizontalSection.offsetTop;
                    const height = horizontalSection.offsetHeight;
                    const winH = window.innerHeight;
                    if(scrollTop >= offset && scrollTop <= (offset + height - winH)) {
                        const pct = (scrollTop - offset) / (height - winH);
                        const move = (horizontalTrack.scrollWidth - window.innerWidth) * pct;
                        horizontalTrack.style.transform = `translateX(-${move}px)`;
                    }
                }

                if(videoSection) {
                    const rect = videoSection.getBoundingClientRect();
                    const centerDist = Math.abs(rect.top + rect.height/2 - window.innerHeight/2);
                    if(centerDist < window.innerHeight * 0.6) {
                        const expand = 1 - (centerDist / (window.innerHeight*0.6));
                        videoSection.style.width = Math.min(70 + (expand * 30), 100) + '%';
                        videoSection.style.borderRadius = (20 * (1-expand)) + 'px';
                    }
                }
            });

            // --- 5. INTERACTION ---
            document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
                wrap.addEventListener('mousemove', (e) => {
                    const rect = wrap.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width/2) * 0.8;
                    const y = (e.clientY - rect.top - rect.height/2) * 0.8;
                    wrap.querySelector('.magnetic-content').style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
                });
                wrap.addEventListener('mouseleave', () => wrap.querySelector('.magnetic-content').style.transform = 'translate(0,0) scale(1)');
            });

            const tiltWrap = document.querySelector('.tilt-card-wrapper');
            const tiltCard = document.querySelector('.tilt-card');
            if(tiltWrap) {
                tiltWrap.addEventListener('mousemove', (e) => {
                    const rect = tiltWrap.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
                    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
                    tiltCard.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
                });
                tiltWrap.addEventListener('mouseleave', () => tiltCard.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`);
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
(() => {
  const data = [
    {
      title: "Web Design",
      sub: "Diseño que convierte",
      img: "https://i.imgur.com/3tP0OMa.png",
      icon: "https://toptier.relats.com/wp-content/uploads/2023/06/icon-1.svg",
      desc: "Crafting sleek, high-converting layouts tailored to your offer and audience."
    },
    {
      title: "Webflow Development",
      sub: "Diseño que convierte",
      img: "https://i.imgur.com/g2LUfQU.png",
      icon: "https://toptier.relats.com/wp-content/uploads/2023/06/icon-2.svg",
      desc: "Pixel-perfect builds in Webflow with clean structure and scalable components."
    },
    {
      title: "Funnel Strategy",
      sub: "Diseño que convierte",
      img: "https://i.imgur.com/qfTX6WY.jpeg",
      icon: "https://toptier.relats.com/wp-content/uploads/2023/06/icon-3.svg",
      desc: "Mapping pages, CTAs, and flow to turn traffic into leads and buyers."
    },
    {
      title: "Landing Pages",
      sub: "Diseño que convierte",
      img: "https://i.imgur.com/dmhth9z.png",
      icon: "https://toptier.relats.com/wp-content/uploads/2023/06/icon-4.svg",
      desc: "Dedicated pages built to focus attention and drive a single action."
    },
    {
      title: "Copy Structure",
      sub: "Diseño que convierte",
      img: "https://toptier.relats.com/wp-content/uploads/2023/06/toptier-5.jpg",
      icon: "https://toptier.relats.com/wp-content/uploads/2023/06/icon-5.svg",
      desc: "Clear messaging hierarchy: headline, proof, offer, and objection handling."
    },
    {
      title: "Conversion Optimization",
      sub: "Diseño que convierte",
      img: "https://i.imgur.com/Xn5IlX0.png",
      icon: "https://toptier.relats.com/wp-content/uploads/2023/06/icon-6.svg",
      desc: "Improving performance through testing, clarity, and friction removal."
    },
    {
      title: "UI Systems",
      sub: "Diseño que convierte",
      img: "https://toptier.relats.com/wp-content/uploads/2023/06/toptier-7.jpg",
      icon: "https://toptier.relats.com/wp-content/uploads/2023/06/icon-7.svg",
      desc: "Building consistent UI patterns so your pages stay fast, clean, and coherent."
    }
  ];

  const nav = document.getElementById("tpSvcNav");
  const titleEl = document.getElementById("tpSvcTitle");
  const subEl = document.getElementById("tpSvcSub");
  const imgEl = document.getElementById("tpSvcImg");
  const iconEl = document.getElementById("tpSvcIcon");
  const nameEl = document.getElementById("tpSvcName");
  const descEl = document.getElementById("tpSvcDesc");

  if (!nav || !titleEl || !subEl || !imgEl || !iconEl || !nameEl || !descEl) return;

  function setActive(i) {
    const d = data[i];

    // Título grande = activo
    titleEl.textContent = d.title;

    // Subtítulo grande = texto del servicio actual
subEl.textContent = d.sub;


    // Card derecha
    imgEl.src = d.img;
    iconEl.src = d.icon;
    nameEl.textContent = d.title;
    descEl.textContent = d.desc;

    // Pills
    nav.querySelectorAll(".tp-svc__pill").forEach(btn => {
      btn.classList.toggle("is-active", Number(btn.dataset.i) === i);
    });
  }

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".tp-svc__pill");
    if (!btn) return;
    setActive(Number(btn.dataset.i));
  });

  setActive(0);
})();




}); // FIN del DOMContentLoaded

