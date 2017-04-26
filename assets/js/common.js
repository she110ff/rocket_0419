// Scroll Move
function scrollMove(t,h,m){
	if(h==undefined) h=0;
	if(m!=undefined && jQuery(window).width()<993) h=m;
	var o = $('body');
	if(navigator.userAgent.toLowerCase().match(/trident/i)){
		var o = $('html');
	}
	if(o.hasClass('scrolling')) return;
	o.addClass('scrolling').animate({
		scrollTop:$(t).offset().top-h
	},{
		duration:500,
		complete:function(){
			$(this).removeClass('scrolling');
		}
	});
}

// Menu Open
function menuOpen(o){
	"use strict";
	jQuery('#wrap').after('<button type="button" id="sidebarTg" onclick="menuClose();"><b class="sr-only">Close</b></button>');
	var a = -jQuery(window).scrollTop();
	jQuery('#'+o).show(0,function(){
		jQuery('#sidebarTg').addClass('in');
		jQuery('body').addClass('nav-open '+o+'-open');
		jQuery('#wrap').addClass('if-m').css('top',a);
	});
}

// Menu Close
function menuClose(o){
	"use strict";
	jQuery('#sidebarTg').removeClass('in');
	jQuery('body').addClass('nav-closing').removeClass('snb-open side-nav-left-open side-nav-right-open');
	var originScroll = -jQuery('#wrap').position().top;
	setTimeout(function(){
		jQuery('div.side-nav').hide();
		jQuery('body').removeClass('nav-open nav-closing');
		jQuery(window).scrollTop(originScroll);
		jQuery('#wrap').removeClass('if-m').removeAttr('style');
		jQuery('#sidebarTg').remove();
	},500);
}

// scrapRocket
function scrapRocket(t){
	"use strict";
	t.toggleClass('scrapped animated jello');
}

// Loading : t는 최소 로딩시간 
function loadingRocket(t){
	"use strict";
	$('body').addClass('loading-rocket');
	/*
	$('#loading>i').each(function() {
		$(this).wrap('<span>').parent().addClass('animated bounceIn ani-delay05').css({
		});
	});
	*/
}
function doneRocket(t){
	"use strict";
	$('body').addClass('done-rocket');
	setTimeout(function(){
		$('body').removeClass('loading-rocket');
	},1000)
}

// Ready
jQuery(function($){
	"use strict";
	var $w = $(window);
	var $body = $('body');
// start
	$body.append('<div class="rocket-scraping"><i class="xi-rocket"></i></div>');

// scroll
	var lastScrollTop = 0;
	var sidbarTop = $('ul.nav-sidebar').offset().top-96;
	$w.scroll(function(){
		var st = $(this).scrollTop();
		// hd scroll
		if(st>48){
			$body.addClass('hd-scroll');
		} else {
			$body.removeClass('hd-scroll');
		}

		// side scroll
		if(st>sidbarTop){
			$body.addClass('side-scroll');
		} else {
			$body.removeClass('side-scroll');
		}

		// up&down
		if(st>lastScrollTop){
			$body.addClass('scroll-down');
			if(st>48){
				//$body.addClass('hide_hd');
			} else {
				//$body.removeClass('hide_hd');
			}
		} else {
			$body.removeClass('scroll-down');
		}
		lastScrollTop = st;
	});

// goTop
	$('#goTop').click(function(){
		scrollMove('body');
		return false;
	});

// datepicker
	var dateToday = new Date(); 
	$('input.daterange').daterangepicker({
		autoApply: true,
		minDate: dateToday,
		//parentEl: '#calendarWrp',
		opens: "center",
		locale: {
		format: 'YYYY/MM/DD'
		}
	});

// sidebar
	var offsetSide = 94;
	if($w.width()<993){
		offsetSide = 48;
	}
	$body.scrollspy({
		target:'#sidebar>ul>li.active',
		offset:offsetSide
	})
	.on('click','a.tg-nav-sidebar',function(){
		$body.toggleClass('open-nav-sidebar');
		return false;
	})
	.on('click','#sidebar a[data-target]',function(){
		scrollMove($(this).attr('data-target'),offsetSide);
		return false;
	});

// For performance reasons, the Tooltip and Popover data-apis are opt-in, meaning you must initialize them yourself.
$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="popover"]').popover();

// collapse
	$body
	.on('click','[data-accordion]',function(){
		var t = $(this);
		var o = t.data('accordion');
		var p = t.data('parent');
		t.toggleClass('open').find('i.xi-angle-down').toggleClass('xi-flip-vertical');
		$('[data-parent='+p+']').not('[data-accordion='+o+']').removeClass('open').find('i.xi-angle-down').removeClass('xi-flip-vertical');
		$(o).slideToggle(300);
		$('[data-accordion-parent='+p+']').not(o).slideUp(300);
		return false;
	})
	.on('click','.lst-mypage>li>a',function(){
		$(this).next().slideToggle(250).parent().toggleClass('active').siblings().find('>div').slideUp(250);
		return false;
	});
});