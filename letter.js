(function () {
  var M = window.M;
  var COUPONS = [
    { id: 'chai', t: 'One chai on me', d: 'Any dhaba, any time. You pick the spot.' },
    { id: 'movie', t: 'One movie night', d: 'You choose the film and I will not complain. Much.' },
    { id: 'call', t: 'One listening ear', d: 'A call at any hour, any length, zero interruptions.' },
    { id: 'bill', t: 'One bill paid by me', d: 'A rare event. Frame the receipt.' },
    { id: 'drive', t: 'One long drive', d: 'Windows down, your playlist, no questions about where we are going.' },
    { id: 'hug', t: 'One big hug', d: 'Redeemable on sight, no notice needed.' }
  ];
  var used = {};
  try { used = JSON.parse(localStorage.getItem('mamuCoupons') || '{}') || {}; } catch (e) { used = {}; }
  function save() { try { localStorage.setItem('mamuCoupons', JSON.stringify(used)); } catch (e) {} }

  var wrap = document.getElementById('coupons');
  COUPONS.forEach(function (c) {
    var card = document.createElement('article');
    card.className = 'coupon';
    var h = document.createElement('h3'); h.textContent = c.t;
    var p = document.createElement('p'); p.textContent = c.d;
    var v = document.createElement('span'); v.className = 'valid'; v.textContent = 'Valid forever';
    var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'btn small ghost';
    function paint() {
      card.classList.toggle('used', !!used[c.id]);
      btn.textContent = used[c.id] ? 'Put it back' : 'Redeem';
    }
    btn.addEventListener('click', function () {
      used[c.id] = !used[c.id];
      save();
      paint();
      if (used[c.id]) M.burstFrom(btn);
    });
    card.appendChild(h); card.appendChild(p); card.appendChild(v); card.appendChild(btn);
    wrap.appendChild(card);
    paint();
  });
})();
