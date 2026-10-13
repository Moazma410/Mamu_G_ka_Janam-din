(function () {
  var M = window.M, rnd = M.rnd, reduced = M.reduced;
  var fw = {
    cv: document.getElementById('fw'),
    stage: document.getElementById('fw-stage'),
    title: document.getElementById('fw-title'),
    w: 0, h: 0, dpr: 1, rockets: [], sparks: [], raf: 0, last: 0, auto: 0
  };
  var ctx = fw.cv.getContext('2d');
  var COLORS = [[231, 194, 122], [111, 193, 183], [240, 184, 168], [242, 247, 246], [168, 211, 196]];

  function size() {
    var r = fw.stage.getBoundingClientRect();
    fw.dpr = Math.min(window.devicePixelRatio || 1, 2);
    fw.w = r.width;
    fw.h = r.height;
    fw.cv.width = Math.round(r.width * fw.dpr);
    fw.cv.height = Math.round(r.height * fw.dpr);
    ctx.setTransform(fw.dpr, 0, 0, fw.dpr, 0, 0);
  }
  function launch(x, ty) {
    var h = fw.h;
    fw.rockets.push({
      x: x, y: h, vx: (Math.random() - 0.5) * 0.5,
      vy: -(h / 55 + Math.random() * h / 180),
      ty: Math.max(h * 0.08, ty),
      c: COLORS[Math.floor(Math.random() * COLORS.length)]
    });
  }
  function explode(x, y, c) {
    var n = 70 + Math.floor(Math.random() * 40);
    var ring = Math.random() < 0.5;
    var k = fw.h / 500;
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2 + Math.random() * 0.05;
      var sp = (ring ? 3.2 : 1.2 + Math.random() * 3.6) * k;
      fw.sparks.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, max: 55 + Math.random() * 35, c: c });
    }
  }
  function frame(now) {
    var dt = Math.min(2.5, (now - (fw.last || now)) / 16.67);
    fw.last = now;
    var i, r, s;
    if (!fw.rockets.length && !fw.sparks.length) {
      ctx.clearRect(0, 0, fw.w, fw.h);
    } else {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,' + Math.min(0.5, 0.2 * dt).toFixed(2) + ')';
      ctx.fillRect(0, 0, fw.w, fw.h);
    }
    ctx.globalCompositeOperation = 'lighter';
    for (i = fw.rockets.length - 1; i >= 0; i--) {
      r = fw.rockets[i];
      r.x += r.vx * dt;
      r.y += r.vy * dt;
      r.vy *= Math.pow(0.992, dt);
      ctx.fillStyle = 'rgb(' + r.c[0] + ',' + r.c[1] + ',' + r.c[2] + ')';
      ctx.fillRect(r.x - 1.5, r.y - 1.5, 3, 3);
      if (r.y <= r.ty || r.vy > -1.2) {
        explode(r.x, r.y, r.c);
        fw.rockets.splice(i, 1);
      }
    }
    var k = fw.h / 500;
    for (i = fw.sparks.length - 1; i >= 0; i--) {
      s = fw.sparks[i];
      s.life += dt;
      if (s.life >= s.max) { fw.sparks.splice(i, 1); continue; }
      s.vx *= Math.pow(0.985, dt);
      s.vy = s.vy * Math.pow(0.985, dt) + 0.04 * k * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      ctx.fillStyle = 'rgba(' + s.c[0] + ',' + s.c[1] + ',' + s.c[2] + ',' + (1 - s.life / s.max).toFixed(2) + ')';
      ctx.fillRect(s.x - 1.2, s.y - 1.2, 2.4, 2.4);
    }
    fw.auto -= dt;
    if (!reduced && fw.auto <= 0) {
      launch(fw.w * rnd(0.12, 0.88), fw.h * rnd(0.15, 0.5));
      fw.auto = rnd(50, 105);
    }
    fw.raf = requestAnimationFrame(frame);
  }

  size();
  fw.auto = reduced ? 1e9 : 70;
  fw.title.classList.add('play');
  if (!reduced) {
    launch(fw.w * 0.3, fw.h * 0.3);
    launch(fw.w * 0.7, fw.h * 0.25);
  }
  fw.raf = requestAnimationFrame(frame);

  fw.stage.addEventListener('pointerdown', function (e) {
    var r = fw.stage.getBoundingClientRect();
    launch(e.clientX - r.left, e.clientY - r.top);
  });
  window.addEventListener('resize', size);
})();
