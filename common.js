(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cv = document.getElementById('confetti');
  var cx = cv.getContext('2d');
  var parts = [];
  var raf = 0;
  var COLORS = ['#B58A3C', '#1F5F5B', '#E3A79A', '#8FB8B2', '#D9C28A'];

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function burst(x, y) {
    if (reduced) return;
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    for (var i = 0; i < 90; i++) {
      var a = Math.random() * Math.PI * 2;
      var s = 3 + Math.random() * 8;
      parts.push({
        x: x, y: y,
        vx: Math.cos(a) * s, vy: Math.sin(a) * s - 5,
        w: 5 + Math.random() * 6, h: 3 + Math.random() * 5,
        r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.35,
        c: COLORS[i % COLORS.length], life: 0
      });
    }
    if (!raf) tick();
  }
  function tick() {
    cx.clearRect(0, 0, cv.width, cv.height);
    parts.forEach(function (p) {
      p.vy += 0.26; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
      cx.save();
      cx.translate(p.x, p.y);
      cx.rotate(p.r);
      cx.fillStyle = p.c;
      cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      cx.restore();
    });
    parts = parts.filter(function (p) { return p.y < cv.height + 20 && p.life < 190; });
    if (parts.length) { raf = requestAnimationFrame(tick); }
    else { raf = 0; cx.clearRect(0, 0, cv.width, cv.height); }
  }
  function burstFrom(el) {
    var r = el.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2);
  }
  window.M = { reduced: reduced, rnd: rnd, burst: burst, burstFrom: burstFrom };
})();
