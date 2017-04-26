var sidebar = $('#sidebar');
var sidbarTop = sidebar.find('ul.nav-sidebar').offset().top-120;
$(window).scroll(function(){
	if($(this).scrollTop()>sidbarTop){
		$('body').addClass('if_scroll_side');
	} else {
		$('body').removeClass('if_scroll_side');
	};
});

var sidebar2 = $('#sidebar2');
if(sidebar2.length){
	$('body').attr('data-spy','scroll').attr('data-target','sidebar2').scrollspy({target:'#sidebar2'});
	$('#sidebar2 a').click(function(){
		scrollMove($(this).attr('href'));
		return false;
	});
}