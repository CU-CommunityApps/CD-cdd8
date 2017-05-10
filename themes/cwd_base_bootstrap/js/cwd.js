/* CWD Base JavaScript
   ------------------------------------------- */  

jQuery(document).ready(function($) {
	
	// Windows class
	if (navigator.appVersion.indexOf('Win') > -1) {
		$('body').addClass('win');
		if (navigator.appName.indexOf('Internet Explorer') > -1 || !!navigator.userAgent.match(/Trident\/7\./) ) {
			$('body').addClass('ie'); // includes ie11+
		}
	}
	// Android class
	if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
		$('body').addClass('android touch');
	}
	// iOS class
	if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
		$('body').addClass('ios touch');
	}
	
	// Search
	var mousedown = false;
	$('#cu-search-button').click(function(e) {
		mousedown = true;
		$('#cu-search').toggleClass('open');
		$(this).toggleClass('open');		
		if ( $(this).hasClass('open') ) {
			$('#cu-search-query').focus();
		}
		else {
			$(this).focus();
			mousedown = false;
		}
	});
	$('#cu-search input').focus(function() {
		if (!mousedown) {
			$('#cu-search, #cu-search-button').addClass('open');
			mousedown = false;
		}
	});
	
	// Override iOS Auto-Zoom on Search Form
	var viewportmeta = document.querySelector('meta[name="viewport"]');
	var viewportmeta_initial = viewportmeta.content;
	$('.touch #cu-search-query').focus(function() {
		viewportmeta.content = viewportmeta_initial + ', maximum-scale=1, user-scalable=no';
		console.log( document.querySelector('meta[name="viewport"]') );
	}).blur(function() {
		viewportmeta.content = viewportmeta_initial;
	});

	
});