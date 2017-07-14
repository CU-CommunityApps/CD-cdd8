/* CWD Image Gallery (ama39, last update: 7/13/17)
   - An inline slide viewer with scrolling thumbnail strip
   ------------------------------------------------------------------------- */

// defaults
var slide_ratio = 0.667; // ratio of height to width (height is ~67% of width)

// globals


jQuery(document).ready(function($) {

	$('.cwd-gallery.viewer').each(function() {

		var gallery = $(this);
		var slide = $(this).find('.slide');
		var thumbnails = $(this).find('.thumbnails')
		$(slide).append('<p class="caption"></p>');

		// configure thumbnail buttons
		$(this).find('.thumbnails a').click(function(e) {
			e.preventDefault();
			var native_width = parseInt($(this).attr('data-native-width'));
			var native_height = parseInt($(this).attr('data-native-height'));

			// detect images that are too tall for the viewer's ratio (e.g., square images, portrait images)
			if (native_height / native_width > slide_ratio) {
				$(slide).addClass('portrait');
			}
			else {
				$(slide).removeClass('portrait');
			}

			// display image and caption
			$(slide).attr('style','background-image:url('+$(this).attr('href')+');');
			$(slide).find('.caption').text($(this).attr('data-title'));

			// thumbnail states
			$(gallery).find('.thumbnails a').removeClass('active');
			$(this).addClass('active');

			// autoscroll the thumbnail band if needed to make the active thumbnail fully visible
			var thumb_position = parseInt($(this).parent().position().left);
			var thumb_width = $(this).width();
			var band_width = $(thumbnails).width();
			var band_scroll = $(thumbnails).scrollLeft();
			var grid_size = $(this).width() + parseInt($(this).parent().css('padding-left')) + parseInt($(this).parent().css('padding-right'));

			if ( thumb_position - (grid_size/2) < 0 ) {
				// needs a scroll on the left
				$(thumbnails).stop().animate({
					scrollLeft: band_scroll + thumb_position - (grid_size/2)
				}, 300, 'easeOutQuad');
			}
			else if ( thumb_position + (grid_size*1.5) > band_width ) {
				// needs a scroll on the right
				$(thumbnails).stop().animate({
					scrollLeft: thumb_position + band_scroll + (grid_size*1.5) - band_width
				}, 300, 'easeOutQuad');
			}

			// hide the faded edge effect when the first or last thumbnail is active
			if ( $(this).parent(':first-child').length > 0 ) {
				$(gallery).find('.thumbnails-band').addClass('hide-before');
				$(gallery).find('.thumbnails-band').removeClass('hide-after');
			}
			else if ( $(this).parent(':last-child').length > 0 ) {
				$(gallery).find('.thumbnails-band').addClass('hide-after');
				$(gallery).find('.thumbnails-band').removeClass('hide-before');
			}
			else {
				$(gallery).find('.thumbnails-band').removeClass('hide-after hide-before');
			}

		}).focus(function() {
			$(this).trigger('click');
		});

	});

	// Window Load ------------------------------------------------------------
  $(window).load(function() {

    $('.cwd-gallery.viewer').each(function() {

      $(this).find('.thumbnails a').each(function(i) {

        // preload images
        // TODO: (clever?) asynchronous preloading - preload images when their thumbnail is visible on screen instead of all at once?
        var img = new Image();
        var button = $(this);
        img.onload = function() {
          $(button).attr('data-native-width',this.width);
          $(button).attr('data-native-height',this.height);

          // activate first slide
          if (i == 0) {
            $(button).trigger('click');
          }
        };
        img.src = $(this).attr('href');

      });
    });

  });


});

