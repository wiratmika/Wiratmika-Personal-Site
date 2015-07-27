/* jshint devel:true */
'use strict';

(function() {
	$(document).foundation();

	$(window).scroll(function() {
		var currentPosition = $(window).scrollTop();
		var breakPosition = $('#about').offset().top;

		if (currentPosition >= breakPosition) {
			$('#navbar').fadeIn(350);
		} else {
			$('#navbar').fadeOut(350);
		}
	});
}());

// Source: http://tympanus.net/codrops/2013/06/18/caption-hover-effects/
(function(window) {
	if (Modernizr.touch) {
		function classReg(className) {
			return new RegExp('(^|\\s+)' + className + '(\\s+|$)');
		}
		var hasClass, addClass, removeClass;
		if ('classList' in document.documentElement) {
			hasClass = function(elem, c) {
				return elem.classList.contains(c);
			};
			addClass = function(elem, c) {
				elem.classList.add( c);
			};
			removeClass = function(elem, c) {
				elem.classList.remove( c);
			};
		}
		else {
			hasClass = function(elem, c) {
				return classReg(c).test(elem.className);
			};
			addClass = function(elem, c) {
				if (!hasClass(elem, c)) {
						elem.className = elem.className + ' ' + c;
				}
			};
			removeClass = function(elem, c) {
				elem.className = elem.className.replace(classReg(c), ' ');
			};
		}

		function toggleClass(elem, c) {
			var fn = hasClass(elem, c) ? removeClass : addClass;
			fn(elem, c);
		}

		var classie = {
			hasClass: hasClass,
			addClass: addClass,
			removeClass: removeClass,
			toggleClass: toggleClass,
			has: hasClass,
			add: addClass,
			remove: removeClass,
			toggle: toggleClass
		};

		if (typeof define === 'function' && define.amd) {
			define(classie);
		} else {
			window.classie = classie;
		}

		[].slice.call(document.querySelectorAll('ul > li > figure')).forEach(function(el, i) {
			el.querySelector('figcaption > a').addEventListener('touchstart', function(e) {
				e.stopPropagation();
			}, false);
			el.addEventListener('touchstart', function(e) {
				classie.toggle(this, 'cs-hover');
			}, false);
		});
	}
})(window);
