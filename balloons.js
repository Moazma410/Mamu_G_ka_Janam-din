(function () {
  var M = window.M, rnd = M.rnd;
  var stage = document.getElementById('balloon-stage');
  var popCount = document.getElementById('pop-count');
  var COLORS = ['#2F7F78', '#C79A45', '#E5A596', '#8DB8A8', '#3E5C76', '#B96A7A'];
  var popped = 0;

  function spawn(initial) {
    var d = rnd(12, 21);
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'balloon';
    b.setAttribute('aria-label', 'Pop balloon');
    b.style.setProperty('--x', rnd(4, 80).toFixed(1) + '%');
    b.style.setProperty('--s', rnd(0.8, 1.35).toFixed(2));
    b.style.setProperty('--d', d.toFixed(1) + 's');
    b.style.setProperty('--delay', (initial ? -rnd(0, d) : rnd(0, 1.5)).toFixed(1) + 's');
    b.style.setProperty('--sw', rnd(2, 4).toFixed(1) + 's');
    b.style.setProperty('--c', COLORS[Math.floor(Math.random() * COLORS.length)]);
    b.style.setProperty('--static', rnd(12, 66).toFixed(0) + '%');
    b.innerHTML = '<span class="sway"><span class="bod"></span><i class="str"></i></span>';
    b.addEventListener('animationend', function (e) {
      if (e.animationName === 'rise' && e.target === b && !b.dataset.done) {
        b.dataset.done = '1';
        if (b.parentNode) b.parentNode.removeChild(b);
        spawn(false);
      }
    });
    b.addEventListener('click', function () { pop(b); });
    stage.appendChild(b);
  }
  function pop(b) {
    if (b.dataset.done) return;
    b.dataset.done = '1';
    var r = b.getBoundingClientRect();
    M.burst(r.left + r.width / 2, r.top + r.height * 0.4);
    b.classList.add('popped');
    popped++;
    popCount.innerHTML = 'Popped: <b>' + popped + '</b>';
    setTimeout(function () {
      if (b.parentNode) b.parentNode.removeChild(b);
      spawn(false);
    }, 230);
  }
  for (var i = 0; i < 11; i++) spawn(true);
})();
