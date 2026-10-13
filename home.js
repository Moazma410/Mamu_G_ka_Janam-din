(function () {
  var M = window.M;
  document.getElementById('celebrate').addEventListener('click', function () { M.burstFrom(this); });

  var cake = document.getElementById('cake');
  var blow = document.getElementById('blow');
  var wishText = document.getElementById('wish-text');
  var lit = true;
  blow.addEventListener('click', function () {
    lit = !lit;
    cake.classList.toggle('out', !lit);
    blow.textContent = lit ? 'Blow out the candles' : 'Light them again';
    wishText.textContent = lit ? 'Close your eyes and make a wish.' : 'Wish made. Now I want cake.';
    if (!lit) M.burstFrom(blow);
  });

  if (!M.reduced) setTimeout(function () { M.burst(window.innerWidth / 2, window.innerHeight * 0.3); }, 500);
})();
