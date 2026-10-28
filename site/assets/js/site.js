// bocere.app: the few things the playhouse does. Everything still works without this file.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Curtain-up: the stage starts closed for one frame, then the curtain parts. Once.
  var stage = document.querySelector('.stage[data-curtain]');
  if (stage && !still) {
    stage.classList.add('is-closed');
    var open = function () { stage.classList.remove('is-closed'); };
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { setTimeout(open, 250); });
    });
    setTimeout(open, 1500); // a background tab pauses animation frames; never leave the curtain shut
  }

  // The follow-spot: the footlight pool slides to the cast member you point at.
  if (stage) {
    var cast = stage.querySelectorAll('.billing a');
    var aim = function (el) {
      var s = stage.getBoundingClientRect();
      var r = el.getBoundingClientRect();
      stage.style.setProperty('--spot-x', (((r.left + r.width / 2) - s.left) / s.width * 100).toFixed(1) + '%');
    };
    cast.forEach(function (a) {
      a.addEventListener('mouseenter', function () { aim(a); });
      a.addEventListener('focus', function () { aim(a); });
      a.addEventListener('mouseleave', function () { stage.style.setProperty('--spot-x', '50%'); });
      a.addEventListener('blur', function () { stage.style.setProperty('--spot-x', '50%'); });
    });
  }

  // Trim switcher: the sample page re-trims to a real KDP size.
  var page = document.querySelector('[data-bookpage]');
  var trimLabel = document.querySelector('[data-trim-label]');
  document.querySelectorAll('[data-trim]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var parts = btn.getAttribute('data-trim').split('x');
      page.style.setProperty('--w', parts[0]);
      page.style.setProperty('--h', parts[1]);
      document.querySelectorAll('[data-trim]').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      if (trimLabel) trimLabel.textContent = btn.textContent.replace(/\s+/g, ' ').trim();
    });
  });

  // The scene: Accept keeps the suggestion, Reject keeps your words.
  var galley = document.querySelector('[data-galley]');
  if (galley) {
    var status = galley.querySelector('[data-status]');
    var accept = galley.querySelector('[data-accept]');
    var reject = galley.querySelector('[data-reject]');
    var reset = galley.querySelector('[data-reset]');
    var change = galley.querySelector('[data-change]');
    var del = change.querySelector('del');
    var ins = change.querySelector('ins');
    var decide = function (kept) {
      change.classList.add('done');
      (kept ? del : ins).classList.add('gone');
      accept.hidden = reject.hidden = true;
      reset.hidden = false;
      status.textContent = kept
        ? 'Accepted. The change is in your text, and the record notes it.'
        : 'Rejected. Your sentence stays exactly as you wrote it.';
      reset.focus();
    };
    accept.addEventListener('click', function () { decide(true); });
    reject.addEventListener('click', function () { decide(false); });
    reset.addEventListener('click', function () {
      change.classList.remove('done');
      del.classList.remove('gone');
      ins.classList.remove('gone');
      accept.hidden = reject.hidden = false;
      reset.hidden = true;
      status.textContent = '';
      accept.focus();
    });
  }

  // The dumb show: a Play button over the poster; the browser's controls arrive
  // only once a recording is playing, so they never cover the burned-in captions.
  // Without this script the native controls stay, so every video still plays.
  document.querySelectorAll('.vid').forEach(function (wrap) {
    var v = wrap.querySelector('video');
    var play = wrap.querySelector('.vid__play');
    var looping = v.hasAttribute('autoplay');
    if (looping && !still) return;
    if (looping) { v.removeAttribute('autoplay'); v.pause(); }
    v.removeAttribute('controls');
    play.hidden = false;
    play.addEventListener('click', function () {
      play.hidden = true;
      v.controls = true;
      v.play();
      v.focus();
    });
  });
})();
