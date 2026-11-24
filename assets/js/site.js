/* Portfolio behaviour: mobile menu and image zoom.
   Everything degrades gracefully with JS off (images just don't zoom). */
(function () {
	'use strict';

	/* ---- Mobile menu ---- */
	var toggle = document.querySelector('.nav-toggle');
	var links = document.getElementById('nav-links');
	if (toggle && links) {
		toggle.addEventListener('click', function () {
			var open = links.classList.toggle('open');
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		});
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') {
				links.classList.remove('open');
				toggle.setAttribute('aria-expanded', 'false');
			}
		});
	}

	/* ---- Image zoom (lightbox) ---- */
	var zoomables = document.querySelectorAll('figure .zoom');
	if (zoomables.length && typeof HTMLDialogElement === 'function') {
		var dlg = document.createElement('dialog');
		dlg.className = 'lightbox';
		dlg.setAttribute('aria-label', 'Enlarged figure');
		dlg.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt=""><p></p>';
		document.body.appendChild(dlg);
		var big = dlg.querySelector('img');
		var cap = dlg.querySelector('p');
		dlg.querySelector('button').addEventListener('click', function () { dlg.close(); });
		dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

		zoomables.forEach(function (btn) {
			btn.addEventListener('click', function () {
				var img = btn.querySelector('img');
				var fc = btn.closest('figure').querySelector('figcaption');
				big.src = img.currentSrc || img.src;
				big.alt = img.alt;
				cap.textContent = fc ? fc.textContent : '';
				dlg.showModal();
			});
		});
	}
})();
