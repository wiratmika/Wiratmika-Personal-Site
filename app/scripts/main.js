/* jshint devel:true */
/*global
	Modernizr, PhotoSwipe, PhotoSwipeUI_Default
*/
'use strict';

(function() {
	$(document).foundation();

	// ========================================
	// Topbar-hide and wall-slide functionality
	// ========================================
	var $window = $(window);
	$window.scroll(function() {
		var currentPosition = $window.scrollTop();
		var breakPosition = $('#about').offset().top;

		if (currentPosition >= breakPosition) {
			$('#navbar').fadeIn(350);
		} else {
			$('#navbar').fadeOut(350);
		}

		// Only for non-touch device to prevent laginess
		// if (!Modernizr.touch) {
		// 	var viewBottom = $('body').scrollTop() + $window.height();
		// 	var viewOffset = 165;
		// 	viewBottom -= viewOffset;

		// 	if (viewBottom > $('.upper').height()) {
		// 		var offset = viewBottom - $('.upper').height();

		// 		if (offset <= $window.height()) {
		// 			$('.upper').css({top: offset + 'px'});
		// 		}
		// 	} else {
		// 		$('.upper').css({top: 0});
		// 	}
		// }
	});

	// =====================
	// Masonry functionality
	// =====================
	$(window).load(function() { // wait for images to load
		$('.gallery').masonry({
			itemSelector: '.gallery-item',
			columnWidth: '.gallery-sizer'
		});
	});

	$(function() {
		$('a[href*="#"]:not([href="#"])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});
	});

	// ========================
	// PhotoSwipe functionality
	// ========================
	// function getWallItems() {
	// 	var items = [];
	// 	$('.gallery').children().each(function() {
	// 		var $this = $(this);
	// 		var $img =  $this.find('img');

	// 		if (!$this.hasClass('gallery-item')) {
	// 			return true;
	// 		}

	// 		var size = $img.data('size').split('x');

	// 		var item = {
	// 			src: $img.attr('src'),
	// 			w: parseInt(size[0], 10),
	// 			h: parseInt(size[1], 10),
	// 			title: $img.data('title'),
	// 			el: $this
	// 		};
	// 		items.push(item);
	// 	});

	// 	return items;
	// }

	// function openPhotoSwipe(items, index) {
	// 	var pswpElement = $('.pswp').get(0);
	// 	var options = {
	// 		index: index,
	// 		getThumbBoundsFn: function(index) {
	// 			var thumbnail = items[index].el[0];
	// 			var pageYScroll = window.pageYOffset || $(document).documentElement.scrollTop;
	// 			var rect = thumbnail.getBoundingClientRect();

	// 			return {
	// 				x: rect.left,
	// 				y: rect.top + pageYScroll,
	// 				w: rect.width
	// 			};
	// 		}
	// 	};

	// 	var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
	// 	gallery.init();
	// }

	// var items = getWallItems();
	// $('.gallery-item').click(function() {
	// 	var index = $(this).find('img').data('index');

	// 	openPhotoSwipe(items, index);
	// });
}());
