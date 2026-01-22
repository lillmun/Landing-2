/*--------------------
  Utils
--------------------*/
  const deg = (a) => (Math.PI / 180) * a;
  const rand = (v1, v2) => Math.floor(v1 + Math.random() * (v2 - v1));

  /*--------------------
    Opciones
  --------------------*/
  const opt = {
  particles: window.innerWidth > 768 ? 500 : 250,
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
}


  const Particles = [];
  let time = 0;

  document.addEventListener("click", () => {
    // al hacer click, variamos ligeramente la gama pero seguimos en cálido
    opt.h1 = rand(25, 40);
    opt.h2 = rand(25, 40);
    opt.s1 = rand(30, 60);
    opt.s2 = rand(30, 60);
    opt.l1 = rand(30, 70);
    opt.l2 = rand(30, 70);
    opt.angle += deg(rand(20, 60)) * (Math.random() > 0.5 ? 1 : -1);

    for (let p of Particles) {
      p.randomize();
    }
  });

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

      const p = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      const a = Math.atan2(this.vy, this.vx);
      const m = Math.min(this.maxSpeed, p);
      this.vx = Math.cos(a) * m;
      this.vy = Math.sin(a) * m;

      this.x += this.vx;
      this.y += this.vy;
      this.ax = 0;
      this.ay = 0;

      this.edges();
    }

    follow() {
      const angle =
        noise(this.x * opt.noiseScale, this.y * opt.noiseScale, time * opt.noiseScale) *
          Math.PI *
          0.5 +
        opt.angle;

      this.ax += Math.cos(angle);
      this.ay += Math.sin(angle);
    }

    updatePrev() {
      this.lx = this.x;
      this.ly = this.y;
    }

    edges() {
      if (this.x < 0) {
        this.x = width;
        this.updatePrev();
      }
      if (this.x > width) {
        this.x = 0;
        this.updatePrev();
      }
      if (this.y < 0) {
        this.y = height;
        this.updatePrev();
      }
      if (this.y > height) {
        this.y = 0;
        this.updatePrev();
      }
    }

    render() {
      stroke(`hsla(${this.hue}, ${this.sat}%, ${this.light}%, 0.45)`);
      line(this.x, this.y, this.lx, this.ly);
      this.updatePrev();
    }
  }

  /*--------------------
    Setup
  --------------------*/
  function setup() {
    const container = document.getElementById("hero-background");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const cnv = createCanvas(rect.width, rect.height);
    cnv.parent("hero-background");

    for (let i = 0; i < opt.particles; i++) {
      Particles.push(new Particle(Math.random() * width, Math.random() * height));
    }

    strokeWeight(opt.strokeWeight);
  }

  /*--------------------
    Draw
  --------------------*/
  function draw() {
    if (!window.width || !window.height) return;

    time++;
    // fondo negro con "tail" para dejar estela
    background(0, 100 - opt.tail);

    for (let p of Particles) {
      p.update();
      p.render();
    }
  }

  /*--------------------
    Resize
  --------------------*/
  function windowResized() {
    const container = document.getElementById("hero-background");
    if (!container) return;
    const rect = container.getBoundingClientRect();
    resizeCanvas(rect.width, rect.height);
  }