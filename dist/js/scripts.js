$(function() {

    Vue.use(window.vuelidate.default);
    const { required, email, sameAs } = window.validators;

    Vue.component("validateform", {
        data() {
            return {
                email: '',
                password: '',
                repeatPassword: '',
            }
        },
        validations: {
            email: { required, email },
            password: { required },
            repeatPassword: {
                sameAsPassword: sameAs('password')
            }
        },
        methods: {
            submit() {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    console.log('submit!')
                }
            }
        }
    });


    // vue search, authForms, tooltips
    const wikiUrl = 'https://ru.wikipedia.org';
    const params = 'action=query&list=search&format=json&origin=*';

    let vueApp = new Vue({
        el: "#app",
        data: {
            tooltip: '',
            loginShowed: true,
            signupShowed: false,
        },
        components: {
            Autocomplete
        },
        methods: {
            searchCity(input) {
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
            getCity(result) {
                return result.title;
            },
            submitCity(result) {
                console.log(result.title);
            },
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

    


    $('.dropdown-menu, .mobile-menu').show(); // fix transition


    $('select').select2({
        placeholder: $(this).data('placeholder')
    });


    // dropdown's
    $("[data-toggle='dropdown']").dropdown();
    $('.filter-collapse, .mini-cart').on('click', '.dropdown-menu', function(e) {
        e.stopPropagation();
    });


    // stisky header
    let header_top_h = $('.header__top').height();
        
    set_sticky_header();

    function set_sticky_header() {
        if ($(window).scrollTop() >= header_top_h) {
            $('header').addClass("sticky-header");
        } else {
            $('header').removeClass("sticky-header");
        }
    }
    

    // Mobile hamburger
    $('.hamburger').click(function() {
        if ($('header').hasClass('menu-opened') ) {
            $('.mobile-menu-parent').removeClass('expanded');
        }
        $('header').toggleClass('menu-opened');
    });


    // Mobile menu
    let navExpand = [].slice.call(document.querySelectorAll('.mobile-menu-parent'));

    navExpand.forEach((item) => {
        item.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            $('.mobile-menu__content').stop().animate({scrollTop:0}, 200, 'swing');
            item.classList.add('expanded');
        });
        item.querySelector('.mobile-menu-back').addEventListener('click', () => item.classList.remove('expanded'));
    });
   

    // Слайдеры с точками и counter'ом (в основном на главной)
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

            if (slides_count > 1) {
                $navs.css('display', 'flex')
            
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
            }

            function addZero(num) {
                return (num >= 0 && num <= 9) ? '0' + num : num;
            }
        }
    });

    
    // объединённый слайдер товаров на главной в блоке брендов
    $('.goods-pw-description-slider').flickity({
        prevNextButtons: false,
        pageDots: false,
        fade: true,
        adaptiveHeight: true,
        draggable: false,
        asNavFor: '.goods-pw-photo-slider',
    });


    // Слайдеры товаров (со стрелками)
    let product_sliders = ['.product-slider', '.new-products-slider'];

    product_sliders.forEach((elem) => {
        if (document.querySelectorAll(elem).length) {

            let sliders = document.querySelectorAll(elem);

            sliders.forEach((slider) => {
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
            })
        }
    });


    // сайдбар категорий в каталоге
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


    // кнопка добавить в корзину и размеры превью товара
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
        
        if ($(this).find('.select-size').length) {
            $btns.hover(
                function() {
                    $btns.addClass('show_sizes');
                },
                function() {
                    $btns.removeClass('show_sizes');
                }
            );
        }
        

    });


    // Слайдер товара
    if (document.querySelector('.product-photo-slider')) {
        product_photo_slider();
    }
    function product_photo_slider() {
        let slider_cls = '.product-photo-slider';

        let flkty = new Flickity(slider_cls, {
            contain: true,
            cellAlign: 'left',
            freeScroll: true,
            prevNextButtons: false,
            pageDots: false,
            watchCSS: true,
        });
        

        let slides_count = (flkty.slides) ? flkty.slides.length : $(slider_cls).find('> .slide').length;
        
        let $navs = $(slider_cls).parent().find('.slider-nav'),
            $dotsContainer = $navs.find('.slider-nav__dots');

        $navs.css('display', 'flex')
    
        for (let i = 0; i < slides_count; i++) {
            let cls = (i == 0) ? 'dot current' : 'dot';
    
            $dotsContainer.append('<span class="' + cls + '"></span>');
        }
    
        let $dots = $navs.find('.dot');
    
        // update selected dots
        flkty.on('select', function() {            
            $dots.filter('.current').removeClass('current');
            $dots.eq(flkty.selectedIndex).addClass('current');
        });
    
        $dots.on('click', function() {
            flkty.select( $(this).index() );
        });
    }


    // отступ липкого блока в товаре
    setProdBlockPadding();
    function setProdBlockPadding() {
        let adv_height = (window.innerWidth > 1200) ? $('.page-product .advantages').height() : 0;

        $('.page-product .product-info').css('padding-bottom', adv_height);
    }


    // фон для radio
    addRadioBg();

    $('input[type="radio"]').change(function() {
        addRadioBg();
    });
    
    function addRadioBg() {
        $('input[type="radio"]').each(function() {
            let $radio_parent = $(this).parent('.radio-item');

            if ($(this).is(':checked')) {
                $radio_parent.addClass('checked');
            } else {
                $radio_parent.removeClass('checked');
            }
        });
    }
    

    // количество в корзине
    $('.quantity-js').each(function() {
        let $input = $(this).find('input'),
            count;

        $(this).find('.decrease').click(function() {
            count = $input.val();
            if (count > 1) {
                count--;
            }
            $input.val(count);
        });
        $(this).find('.increase').click(function() {
            count = $input.val();
            count++;
            $input.val(count);
        });
    });


    // saved shipping address in checkout
    let $saved_block = $('.checkout-shipping-saved .block');

    $saved_block.each(function() {
        $(this).click(function() {
            $saved_block.removeClass('checked');
            $saved_block.find('> input').attr('checked', false);
            $(this).addClass('checked');
            $(this).find('> input').attr('checked', true);
        });
    });


    $(window).resize(function() {
        set_sticky_header();
        setProdBlockPadding();
    });

    $(window).scroll(function() {
        set_sticky_header()
    });
});