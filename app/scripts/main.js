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
		if (!Modernizr.touch) {
			var viewBottom = $('body').scrollTop() + $window.height();
			var viewOffset = 165;
			viewBottom -= viewOffset;

			if (viewBottom > $('.upper').height()) {
				var offset = viewBottom - $('.upper').height();

				if (offset <= $window.height()) {
					$('.upper').css({top: offset + 'px'});
				}
			} else {
				$('.upper').css({top: 0});
			}
		}
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

	// =====================
	// Gallery functionality
	// =====================
	var data = [
		{
			name: 'Beyond',
			image: 'beyond',
			size: '500x614',
			description: 'I honestly don\'t know what is this... It\'s just looks cool'
		},
		{
			name: 'Glass',
			image: 'glass',
			size: '360x500',
			description: 'Glass UI'
		},
		{
			name: 'Gundam',
			image: 'gundam',
			size: '500x641',
			description: 'Fully handmade figure made using plastic bottles. Recycling FTW'
		},
		{
			name: 'Listen',
			image: 'listen',
			size: '600x600',
			description: 'Album art concept for a high school garage band'
		},
		{
			name: 'Merah',
			image: 'merah',
			size: '500x354',
			description: 'Book cover for my late dad\'s quasi-fiction book on Indonesia\'s 1965 anti-communist purge'
		},
		{
			name: 'Oprec',
			image: 'oprec',
			size: '500x656',
			description: 'Part one of my work in pseudo-art deco styling'
		},
		{
			name: 'Publication',
			image: 'publication',
			size: '500x707',
			description: 'Part two of my work in pseudo-art deco styling'
		},
		{
			name: 'Time',
			image: 'time',
			size: '500x706',
			description: 'Fancy-ass scrapbook'
		}
	];

	var directive = {
		'div.gallery-item': {
			'swag<-': {
				'img@src': function(a) {
					return 'images/gallery/' + a.item.image + '.jpg';
				},
				'img@alt': 'swag.name',
				'img@data-title': 'swag.description',
				'img@data-size': 'swag.size',
				'img@data-index': function(a) {
					return a.pos;
				}
			}
		}
	};

	$('div.gallery').render(data, directive);

	// ========================
	// PhotoSwipe functionality
	// ========================
	function getWallItems() {
		var items = [];
		$('.gallery').children().each(function() {
			var $this = $(this);
			var $img =  $this.find('img');

			if (!$this.hasClass('gallery-item')) {
				return true;
			}

			var size = $img.data('size').split('x');

			var item = {
				src: $img.attr('src'),
				w: parseInt(size[0], 10),
				h: parseInt(size[1], 10),
				title: $img.data('title'),
				el: $this
			};
			items.push(item);
		});

		return items;
	}

	function openPhotoSwipe(items, index) {
		var pswpElement = $('.pswp').get(0);
		var options = {
			index: index,
			getThumbBoundsFn: function(index) {
				var thumbnail = items[index].el[0];
				var pageYScroll = window.pageYOffset || $(document).documentElement.scrollTop;
				var rect = thumbnail.getBoundingClientRect();

				return {
					x: rect.left,
					y: rect.top + pageYScroll,
					w: rect.width
				};
			}
		};

		var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
	}

	var items = getWallItems();
	$('.gallery-item').click(function() {
		var index = $(this).find('img').data('index');

		openPhotoSwipe(items, index);
	});
}());
