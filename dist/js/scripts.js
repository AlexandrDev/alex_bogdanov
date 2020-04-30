$(function() {
    console.log( "ready!" );

    $(".dropdown-toggle").dropdown();

    $('.hamburger').click(function() {
        $('header').toggleClass('menu-opened')
    });

    // $('.main-menu__link.has-child > a').click(function(e) {       
    //     e.preventDefault();

    //     $(this).parent().toggleClass('opened');
    // });
});