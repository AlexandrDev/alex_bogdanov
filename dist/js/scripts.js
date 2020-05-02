$(function() {
    console.log( "ready!" );

    $("[data-toggle='dropdown']").dropdown();

    $('.hamburger').click(function() {
        $('header').toggleClass('menu-opened')
    });


    $('#fw-slider').flickity({
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false
    });

    // $('.main-menu__link.has-child > a').click(function(e) {       
    //     e.preventDefault();

    //     $(this).parent().toggleClass('opened');
    // });
});