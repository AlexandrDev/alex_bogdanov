$(function() {
    console.log( "ready!" );

    $(window).resize(function() {
        setViewport()
    });

    $("[data-toggle='dropdown']").dropdown();

    $('.hamburger').click(function() {
        $('header').toggleClass('menu-opened')
    });


    $('#fw-slider').flickity({
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
        adaptiveHeight: true
    });


    $('.product-card').each(function() {
        let $thumb = $(this).find('.product-card__thumb'),
            $btns = $thumb.find('.product-card__buttons');

        $thumb.hover(
            function() {
                $btns.addClass('show');
            },
            function() {
                $btns.removeClass('show');
            }
        );

        $btns.hover(
            function() {
                $btns.addClass('show_sizes');
            },
            function() {
                $btns.removeClass('show_sizes');
            }
        );

    });

});