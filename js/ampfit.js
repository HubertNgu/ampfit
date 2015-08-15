function loadHeaderAndFooter(page) {
	$('header').load('/ampfit/header.html', function() {
		$('li:contains(' + page + ')').first().addClass('active');
	});
	$('footer').load('/ampfit/footer.html');
}

function scrollToTag(target) {
	    var jump = target;
	    var new_position = $(jump,top.document).offset();
	    $('html,body').stop(true, true).animate({
	          scrollTop: new_position.top - 135
	        }, 500);
	    return false;
}

function loadPage() {
	var hash = location.hash;
	if (hash){
		scrollToTag(hash);
	}
}

function loadNiceScroll(section, zidx, speed, mousestep) {
	$(section).niceScroll({
		styler: "fb",
		zindex: zidx,
       	scrollspeed: speed,
       	mousescrollstep: mousestep,
       	cursorborder: '0px solid #fff',
       	boxzoom: true, 
    });
}

function resizeNiceScroll(div) {
	$(div).getNiceScroll().resize();
	$('html,body').scrollTop(0);
}

function justifyGalleryLayout(){
	if($(window).width() > 414 ){
		$("#mygallery").justifiedGallery({
	        rowHeight: 250,
	        fixedHeight: false,
	        lastRow: 'justify',
	        margins: 3,
	    });
	}else{
		$("#mygallery").justifiedGallery({
	        rowHeight: 150,
	        fixedHeight: false,
	        lastRow: 'justify',
	        margins: 3,
	    });
	}
}

function loadInitialTrainingTab() {
	var tab_parts = window.location.href.split('#');

	if (tab_parts.length > 1) {
		var tab = tab_parts[1];
		$('a[href=#' + tab + ']').click();
	} else {
		$('ul.nav-tabs a').first().click();
	}
}

function loadTrainingTab(uri, tab, anchor) {
	$('#training-tab-content').load(uri, function() {
		setupOnFolioHover();

		if (anchor != null) {
			$('#' + anchor)[0].scrollIntoView();
		}		
	});
	
	$('ul.nav-tabs li.active').removeClass('active');
	if (tab != null) {
		$(tab).parent().addClass('active');
		$('li[role=presentation]').find('a.dropdown-toggle').css('color', '#9d9d9d');
		$(tab).parents('li[role=presentation]').find('a.dropdown-toggle').css('color', '#9E1D20');
	}
	resizeNiceScroll('html');
}

function loadTestimonials(page) {
	$('#testimonial-block').load('testimonialblock.html');
}

function loadTestimonial(name) {
	$('#testimonial').load('/ampfit/testimonials/testimony/' + name + '.txt');
	$('#testimonial_title').text($('#' + name + '_title').text());
	
	var tmp = '/ampfit/img/amp/testimonials/' + name + '.jpg';
	
	var result = doesFileExist(tmp);
	 
	if (result) {
		$('#testimonial_img').attr('src', '/ampfit/img/amp/testimonials/' + name + '.jpg');
	} else {
		$('#testimonial_img').attr('src', '/ampfit/img/amp/testimonials/default.jpg');
	}
}

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
    return xhr.status != "404";
}

function loadPongstgram() {
	$('#instagram-feed').pongstgrm({
		accessId : '295165979',
		accessToken : '295165979.167035a.f95a0b3a5f54421f9fb59572756b3059'
	});
}

function loadTwitter() {
	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
}

function justifyTestimonialLayout() {
	if($(window).width() > 759 ){
	    $('#testimonial_modal').addClass('wrapper');
	    $('#testimonial_modal').removeClass('container marketing');
	}else{
	    $('#testimonial_modal').addClass('container marketing');
	    $('#testimonial_modal').removeClass('wrapper');
	}
	$(window).on('resize', function() {
	    if($(window).width() > 759 ){
	        $('#testimonial_modal').addClass('wrapper');
	        $('#testimonial_modal').removeClass('container marketing');
	    }else{
	        $('#testimonial_modal').addClass('container marketing');
	        $('#testimonial_modal').removeClass('wrapper');
	    }
	})
}

function setupOnFolioHover() {
	$('.hidden').css('display', 'none');

	$("#filter button").each(function() {
		$(this).on("click", function() {
			var filter = $(this).attr('class');
			if ($(this).attr('class') == 'all') {
				$('.hidden').contents().appendTo('#posts').hide().show('slow');
				$("#filter button").removeClass('active');
				$(this).addClass('active');
				$("#filter button").attr("disabled", false);
				$(this).attr("disabled", true);
			} else {
				$('.post').appendTo('.hidden');
				$('.hidden').contents().appendTo('#posts')
						.hide().show('slow');
				$('.post:not(.' + filter + ')').appendTo(
						'.hidden').hide('slow');
				$("#filter button").removeClass('active');
				$(this).addClass('active');
				$("#filter button").attr("disabled", false);
				$(this).attr("disabled", true);
				}
				;

			});
	});
}

function setupOnPanelHover() {
	// set up hover panels
	// although this can be done without JavaScript, we've attached these events
	// because it causes the hover to be triggered when the element is tapped on
	// a touch device
	$('#filter').hover(function() {
		$(this).addClass('flip');
	}, function() {
		$(this).removeClass('flip');
	});
}