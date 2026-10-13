(function () {
  var M = window.M, rnd = M.rnd;
  var stage = document.getElementById('lantern-stage');

  for (var i = 0; i < 70; i++) {
    var st = document.createElement('span');
    st.className = 'star';
    st.style.setProperty('--sx', rnd(1, 99).toFixed(1) + '%');
    st.style.setProperty('--sy', rnd(1, 75).toFixed(1) + '%');
    st.style.setProperty('--st', rnd(1.6, 4.2).toFixed(1) + 's');
    st.style.setProperty('--sd', (-rnd(0, 4)).toFixed(1) + 's');
    stage.appendChild(st);
  }

  function makeLantern(x, y0, loop) {
    var d = loop ? rnd(16, 28) : rnd(12, 17);
    var el = document.createElement('div');
    el.className = 'lantern' + (loop ? ' loop' : '');
    el.style.setProperty('--x', x);
    el.style.setProperty('--s', rnd(0.8, 1.3).toFixed(2));
    el.style.setProperty('--d', d.toFixed(1) + 's');
    el.style.setProperty('--delay', (loop ? -rnd(0, d) : 0).toFixed(1) + 's');
    el.style.setProperty('--sw', rnd(2.4, 4.4).toFixed(1) + 's');
    el.style.setProperty('--static', rnd(14, 70).toFixed(0) + '%');
    if (y0 !== null) el.style.setProperty('--y0', y0 + 'px');
    el.innerHTML = '<span class="body"></span>';
    if (!loop) {
      el.addEventListener('animationend', function (e) {
        if (e.animationName === 'rise' && e.target === el && el.parentNode) el.parentNode.removeChild(el);
      });
    }
    stage.appendChild(el);
  }
  for (var li = 0; li < 12; li++) makeLantern(rnd(4, 86).toFixed(1) + '%', null, true);

  stage.addEventListener('pointerdown', function (e) {
    if (M.reduced) return;
    if (stage.querySelectorAll('.lantern').length > 40) return;
    var r = stage.getBoundingClientRect();
    makeLantern((e.clientX - r.left - 23).toFixed(0) + 'px', (r.bottom - e.clientY - 30).toFixed(0), false);
  });
})();
