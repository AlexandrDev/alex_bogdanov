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



    // sliders with navigation
    let sliders = ['#fw-slider'];

    sliders.forEach((slider) => {
        let flkty = new Flickity( document.querySelector(slider), {
            wrapAround: true,
            prevNextButtons: false,
            pageDots: false
        });

        let slides_count = flkty.slides.length,
            current_slide = '01';

        let $navs = $(slider).parent().find('.slider-nav'),
            $dotsContainer = $navs.find('.slider-nav__dots');

        for (let i = 0; i < slides_count; i++) {
            let cls = (i == 0) ? 'dot current' : 'dot';

            $dotsContainer.append('<span class="' + cls + '"></span>');
        }

        let $dots = $navs.find('.dot'),
            $counter = $navs.find('.counter');

        $counter.html(current_slide + '/' + addZero(slides_count));

        // update selected dots
        flkty.on('select', function() {
            $dots.filter('.current').removeClass('current');
            $dots.eq(flkty.selectedIndex).addClass('current');
            
            $counter.html(addZero(flkty.selectedIndex + 1) + '/' + addZero(slides_count));
        });

        $dots.on('click', function() {
            flkty.select( $(this).index() );
        });

        $navs.find('.arrow-prev').on('click', function() {
            flkty.previous();
        });

        $navs.find('.arrow-next').on('click', function() {
            flkty.next();
        });


        function addZero(num) {
            return (num >= 0 && num <= 9) ? '0' + num : num;
        }
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