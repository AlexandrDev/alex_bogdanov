$(function() {

    $(window).resize(function() {
        set_sticky_header();
        setProdBlockPadding();
    });

    $(window).scroll(function() {
        set_sticky_header()
    });


    // stisky-header
    let header_top_h = $('.header__top').height();
        
    set_sticky_header();

    function set_sticky_header() {
        if ($(window).scrollTop() >= header_top_h) {
            $('header').addClass("sticky-header");
        } else {
            $('header').removeClass("sticky-header");
        }
    }
    

    $("[data-toggle='dropdown']").dropdown();

    $('.filter-collapse').on('click', '.dropdown-menu', function(e) {
        e.stopPropagation();
    });


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


    // autocomlete search region
    const wikiUrl = 'https://ru.wikipedia.org';
    const params = 'action=query&list=search&format=json&origin=*';

    let searchCity = new Vue({
        el: "#search-city",
        components: {
            Autocomplete
        },
        methods: {
            search(input) {
                const url = `${wikiUrl}/w/api.php?${params}&srsearch=${encodeURI(input)}`;
          
                return new Promise(resolve => {
                    if (input.length < 2) {
                        return resolve([]);
                    }
          
                    fetch(url).
                    then(response => response.json()).
                    then(data => {
                        resolve(data.query.search);
                    });
                });
            },
            getResultValue(result) {
                return result.title;
            },
            handleSubmit(result) {
                console.log(result.title);
            }
        }
    });


    let authForm = new Vue({
        el: "#auth-form",
        data: {
            loginShowed: true,
            signupShowed: false
        },
        methods: {
            showLogin() {
                this.loginShowed = true;
                this.signupShowed = false;
            },
            showSignup() {
                this.loginShowed = false;
                this.signupShowed = true;
            }
        }
    });

    let prod_props = new Vue({
        el: "#properties-icons",
        data: {
            tooltip: ''
        }
    });


    // sliders with navigation
    let sliders = ['#fw-slider', '.goods-pw-photo-slider', '.shops-slider'];

    sliders.forEach((slider) => {
        if (document.querySelector(slider)) {
            let flkty = new Flickity( slider, {
                wrapAround: true,
                prevNextButtons: false,
                pageDots: false,
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
        }
    });

    $('.goods-pw-description-slider').flickity({
        prevNextButtons: false,
        pageDots: false,
        fade: true,
        adaptiveHeight: true,
        draggable: false,
        asNavFor: '.goods-pw-photo-slider',
    });



    let product_sliders = ['.product-slider'];

    product_sliders.forEach((slider) => {
        if (document.querySelector(slider)) {
            let flkty = new Flickity( slider, {
                prevNextButtons: false,
                pageDots: false,
                adaptiveHeight: true,
                // contain: true,
                cellAlign: 'left',
                percentPosition: false,
                cellSelector: '.product-card',
            });

            let slides_count = flkty.slides.length;

            let $navs = $(slider).find('.product-slider__navs'),
                $prev = $navs.find('.arrow-prev'),
                $next = $navs.find('.arrow-next');

            $prev.addClass('disabled');

            flkty.on('select', function(index) {
                if (index == 0) {
                    $prev.addClass('disabled');
                } else {
                    $prev.removeClass('disabled');
                }
                
                if (index == slides_count - 1) {
                    $next.addClass('disabled');
                } else {
                    $next.removeClass('disabled');
                }                
            });

            $prev.on('click', function() {
                flkty.previous();
            });

            $next.on('click', function() {
                flkty.next();
            });
        }
    });


    $('.categories-list .parent').each(function() {
        let $item = $(this),
            $subcat = $item.find('> .categories-list-sub');
        
        $item.find('> .arrow').click(function() {
            $item.toggleClass('active');
            showSubcat();
        });

        showSubcat();

        function showSubcat() {
            if ($item.hasClass('active')) {
                $subcat.slideDown(200);
            } else {
                $subcat.slideUp(200);
            }
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


    setProdBlockPadding();

    function setProdBlockPadding() {
        let adv_height = ($(window).width() > 1200) ? $('.page-product .advantages').height() : 0;

        $('.page-product .product-info').css('padding-bottom', adv_height);
    }

});