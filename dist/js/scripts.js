$(function() {

    $(window).resize(function() {
        setViewport()
        set_sticky_header()
    });

    $(window).scroll(function() {
        set_sticky_header()
    });


    // stisky-header
    let header_h = $('header').height(),
        header_top_h = $('.header__top').height();
        
    set_sticky_header();

    function set_sticky_header() {
        if ($(window).scrollTop() >= header_top_h) {
            $('header').addClass("sticky-header");
        } else {
            $('header').removeClass("sticky-header");
        }
    }
    

    $("[data-toggle='dropdown']").dropdown();


    $('.hamburger').click(function() {
        if ($('header').hasClass('menu-opened') ) {
            $('.mobile-menu-parent').removeClass('expanded');
        }
        $('header').toggleClass('menu-opened');
    });


    let navExpand = [].slice.call(document.querySelectorAll('.mobile-menu-parent'));

    navExpand.forEach((item) => {
        item.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            $('.mobile-menu__content').stop().animate({scrollTop:0}, 200, 'swing');
            item.classList.add('expanded');
        });
        item.querySelector('.mobile-menu-back').addEventListener('click', () => item.classList.remove('expanded'));
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
