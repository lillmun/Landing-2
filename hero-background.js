/*--------------------
  Utils
--------------------*/
const deg = (a) => (Math.PI / 180) * a;
const rand = (v1, v2) => Math.floor(v1 + Math.random() * (v2 - v1));

/*--------------------
  Opciones
--------------------*/
const opt = {
  particles: window.innerWidth > 768 ? 380 : 180,
  noiseScale: 0.008,
  angle: Math.PI / 180 * -90,
  h1: 246,
  h2: 241,
  s1: 60,
  s2: 55,
  l1: 55,
  l2: 70,
  strokeWeight: 1,
  tail: 85,
};

/*--------------------
  Sketch p5.js en modo instancia
  → Evita contaminar el scope global
  → Click solo actúa sobre el hero, no sobre toda la página
--------------------*/
new p5(function (s) {

  const Particles = [];
  let time = 0;

  /*--------------------
    Particle
  --------------------*/
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.lx = x;
      this.ly = y;
      this.vx = 0;
      this.vy = 0;
      this.ax = 0;
      this.ay = 0;
      this.hueSeed = Math.random();
      this.setColor();
      this.maxSpeed = this.hueSeed > 0.5 ? 3 : 2;
    }

    setColor() {
      this.hueSeed = Math.random();
      this.hue = this.hueSeed > 0.5 ? opt.h1 : opt.h2;
      this.sat = this.hueSeed > 0.5 ? opt.s1 : opt.s2;
      this.light = this.hueSeed > 0.5 ? opt.l1 : opt.l2;
    }

    randomize() {
      this.setColor();
      this.maxSpeed = this.hueSeed > 0.5 ? 3 : 2;
    }

    update() {
      this.follow();

      this.vx += this.ax;
      this.vy += this.ay;

      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      const angle = Math.atan2(this.vy, this.vx);
      const capped = Math.min(this.maxSpeed, speed);
      this.vx = Math.cos(angle) * capped;
      this.vy = Math.sin(angle) * capped;

      this.x += this.vx;
      this.y += this.vy;
      this.ax = 0;
      this.ay = 0;

      this.edges();
    }

    follow() {
      const angle =
        s.noise(this.x * opt.noiseScale, this.y * opt.noiseScale, time * opt.noiseScale) *
        Math.PI * 0.5 +
        opt.angle;

      this.ax += Math.cos(angle);
      this.ay += Math.sin(angle);
    }

    updatePrev() {
      this.lx = this.x;
      this.ly = this.y;
    }

    edges() {
      if (this.x < 0) { this.x = s.width; this.updatePrev(); }
      if (this.x > s.width) { this.x = 0; this.updatePrev(); }
      if (this.y < 0) { this.y = s.height; this.updatePrev(); }
      if (this.y > s.height) { this.y = 0; this.updatePrev(); }
    }

    render() {
      s.stroke(`hsla(${this.hue}, ${this.sat}%, ${this.light}%, 0.45)`);
      s.line(this.x, this.y, this.lx, this.ly);
      this.updatePrev();
    }
  }

  /*--------------------
    Setup
  --------------------*/
  s.setup = function () {
    const container = document.getElementById("hero-background");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const cnv = s.createCanvas(rect.width, rect.height);
    cnv.parent("hero-background");

    // ✅ Click solo en el hero, no en toda la página
    cnv.mouseClicked(() => {
      opt.h1 = rand(238, 252);
      opt.h2 = rand(238, 252);
      opt.s1 = rand(50, 70);
      opt.s2 = rand(45, 65);
      opt.l1 = rand(50, 65);
      opt.l2 = rand(60, 75);
      opt.angle += deg(rand(20, 60)) * (Math.random() > 0.5 ? 1 : -1);

      for (let p of Particles) {
        p.randomize();
      }
    });
     Particles.length = 0;
    for (let i = 0; i < opt.particles; i++) {
      Particles.push(new Particle(
        Math.random() * s.width,
        Math.random() * s.height
      ));
    }

    s.strokeWeight(opt.strokeWeight);
  };

  /*--------------------
    Draw
  --------------------*/
  s.draw = function () {
    time++;
    s.background(0, 100 - opt.tail);

    for (let p of Particles) {
      p.update();
      p.render();
    }
  };

  /*--------------------
    Resize
  --------------------*/
  s.windowResized = function () {
    const container = document.getElementById("hero-background");
    if (!container) return;
    const rect = container.getBoundingClientRect();
    s.resizeCanvas(rect.width, rect.height);

    // ✅ Reposicionar partículas que quedaron fuera del nuevo tamaño
    for (let p of Particles) {
      if (p.x > s.width) p.x = Math.random() * s.width;
      if (p.y > s.height) p.y = Math.random() * s.height;
      p.updatePrev();
    }
  };

  /*--------------------
    Pausa cuando el hero no es visible
    → Ahorra CPU/GPU considerablemente
  --------------------*/
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        s.loop();
      } else {
        s.noLoop();
      }
    });
  }, { threshold: 0.1 });

  const heroEl = document.getElementById("hero-background");
  if (heroEl) observer.observe(heroEl);

}, document.getElementById("hero-background"));