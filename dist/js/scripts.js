$(function() {
    console.log( "ready!" );

    // $(document).mouseup(function(e) { 
    //     let dd_menu = $(".main-menu__dropdown");
        
	// 	if (!dd_menu.is(e.target) && dd_menu.has(e.target).length === 0) {
	// 		$('.main-menu__link').removeClass('opened');
	// 	}
	// });


    $('.main-menu__link.has-child > a').click(function(e) {       
        e.preventDefault();

        $(this).parent().toggleClass('opened');
    });
});