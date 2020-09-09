$(function() {
    $.fn.authFormType = function() {
        let $container = this,
            $title = $container.find('.modal-title');
            
        $title.click(function() {
            $title.removeClass('active');
            $container.find('.form').removeClass('active');

            $(this).addClass('active');
            $container.find('.form_' + $(this).data('form')).addClass('active');
        });
    };

    $('#auth-form').authFormType();


    Vue.use(window.vuelidate.default);
    Vue.use(VueMask.VueMaskPlugin);
    const { required, email, minLength, sameAs } = window.validators;

    const passMinLength = 8;

    let loginForm = new Vue({
        el: "#login-form",
        data: {
            email: '',
            password: '',
        },
        validations: {
            email: { required, email },
            password: { required, minLength: minLength(passMinLength) },
        },
        methods: {
            submit() {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    this.$el.dispatchEvent(new CustomEvent('validationSuccess', { bubbles: true}));
                }
            }
        }
    });

    let callbackForm = new Vue({
        el: "#callback-form",
        data: {
            name: '',
            phone: '',
        },
        validations: {
            name: { required },
            phone: { required, minLength: minLength(16) },
        },
        methods: {
            phoneFocus() {
                if (this.phone === '') {
                    this.phone = '+7 ';
                }
                
            },
            submit() {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    showSuccess()
                    this.$el.dispatchEvent(new CustomEvent('validationSuccess', { bubbles: true}));
                }
            }
        }
    });

    let signupForm = new Vue({
        el: "#signup-form",
        data: {
            email: '',
            password: '',
            repeatPassword: '',
        },
        validations: {
            email: { required, email },
            password: { required, minLength: minLength(passMinLength) },
            repeatPassword: {
                sameAsPassword: sameAs('password')
            }
        },
        methods: {
            submit() {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    this.$el.dispatchEvent(new CustomEvent('validationSuccess', { bubbles: true}));
                }
            }
        }
    });

    let recoveryForm = new Vue({
        el: "#recovery-form",
        data: {
            login: '',
            email: ''
        },
        validations: {
            login: {required  },
            email: { required, email },
        },
        methods: {
            submit() {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    this.$el.dispatchEvent(new CustomEvent('validationSuccess', { bubbles: true}));
                }
            }
        }
    });

    let changePasswordForm = new Vue({
        el: "#change-password",
        data: {
            email: '',
            password: '',
            repeatPassword: '',
        },
        validations: {
            email: { required, email },
            password: { required, minLength: minLength(passMinLength) },
            repeatPassword: {
                sameAsPassword: sameAs('password')
            }
        },
        methods: {
            submit() {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    this.$el.dispatchEvent(new CustomEvent('validationSuccess', { bubbles: true}));
                }
            }
        }
    });

    let arrivalNotifyForm = new Vue({
        el: "#arrival-notify-form",
        data: {
            email: ''
        },
        validations: {
            email: { required, email },
        },
        methods: {
            submit() {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    this.$el.dispatchEvent(new CustomEvent('validationSuccess', { bubbles: true}));
                }
            }
        }
    });


    // vue search
    let searchCity = new Vue({
        el: "#search-city",
        components: {
            Autocomplete
        },
        methods: {
            searchCity(input) {
                const wikiUrl = 'https://ru.wikipedia.org';
                const params = 'action=query&list=search&format=json&origin=*';

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
            }
        }
    });

    let checkStock = new Vue({
        el: "#check-stock",
        components: {
            Autocomplete
        },
        methods: {
            searchCity(input) {
                const wikiUrl = 'https://ru.wikipedia.org';
                const params = 'action=query&list=search&format=json&origin=*';

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
            }
        }
    });


    let propertiesIcons = new Vue({
        el: "#properties-icons",
        data: {
            tooltip: ''
        }
    });


    // form inputs
    $('.input').each(function() {
        let _this = $(this);

        checkInput(_this);

        $(_this).on('keyup focus', function () {
            checkInput(_this);
        });
    });

    function checkInput(_this) {
        if ($(_this).val() === '') {
            $(_this).removeClass('filled');
        } else {
            $(_this).addClass('filled');
        }
    }

    
    $('.dropdown-menu, .mobile-menu').show(); // fix transition


    $('select').select2({
        placeholder: $(this).data('placeholder')
    });


    // dropdown's
    $("[data-toggle='dropdown']").dropdown();
    $('.filter-collapse, .mini-cart, .share-wrapper').on('click', '.dropdown-menu', function(e) {
        e.stopPropagation();
    });


    // stisky header
    let header_top_h = $('.header__top').height();
        
    set_sticky_header();

    function set_sticky_header() {
        let $header = $('header'), 
            st = $(window).scrollTop();

        if (st > header_top_h + 30) {
            $header.addClass("sticky-scroll-show");
        } else {
            $header.removeClass("sticky-scroll-show");
        }
        

        if (st < scrollPos) {
            $header.addClass("scrollUp");
        } else {
            $header.removeClass("scrollUp");
        }


        if (st >= header_top_h) {
            $header.addClass("sticky-header");
        } else {
            $header.removeClass("sticky-header");
        }

        scrollPos = st;
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

            if (slides_count > 1) {
                let $navs = $(slider).parent().find('.slider-nav'),
                    $dotsContainer = $navs.find('.slider-nav__dots');

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

                if (slides_count > 1) {
                    let $navs = $(slider).find('.product-slider__navs'),
                        $prev = $navs.find('.arrow-prev'),
                        $next = $navs.find('.arrow-next');

                    $prev.addClass('disabled');

                    flkty.on('select', function (index) {
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

                    $prev.on('click', function () {
                        flkty.previous();
                    });

                    $next.on('click', function () {
                        flkty.next();
                    });
                }
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

        if (slides_count > 1) {
            let $navs = $(slider_cls).parent().find('.slider-nav'),
                $dotsContainer = $navs.find('.slider-nav__dots');

            $navs.css('display', 'flex')

            for (let i = 0; i < slides_count; i++) {
                let cls = (i == 0) ? 'dot current' : 'dot';

                $dotsContainer.append('<span class="' + cls + '"></span>');
            }

            let $dots = $navs.find('.dot');

            // update selected dots
            flkty.on('select', function () {
                $dots.filter('.current').removeClass('current');
                $dots.eq(flkty.selectedIndex).addClass('current');
            });

            $dots.on('click', function () {
                flkty.select($(this).index());
            });
        }
    }



    $.fn.productVerticalSlider = function() {
        let $slider = $(this),
            $dots = $('.slider-nav .dot'),
            _is_sliding = false;

        if ($slider.length) {
            $dots.click(function() {
                let index = $(this).index();

                setDots(index)

                _is_sliding = true;
                setTimeout(() => {
                    _is_sliding = false;
                }, 600);

                $('html, body').stop().animate({
                    scrollTop: $slider.find('.slide').eq(index).offset().top - 100
                }, 600);
            });


            let slides_top = [],
                window_half = $(window).height() / 2;
            
            $('.product-photo-slider .slide').each(function() {
                slides_top.push($(this).offset().top);
            });

            setDots(getCurrentSlide(slides_top, window_half))

            $(document).scroll(function() {
                if (!_is_sliding) {
                    setDots(getCurrentSlide(slides_top, window_half))
                }
            });


            function setDots(index) {
                $dots.removeClass('current');
                $dots.eq(index).addClass('current');
            }

            function getCurrentSlide(slides_top, window_half) {
                let st = $(window).scrollTop();

                let current_slides = slides_top.filter(item => st + window_half - 100 >= item);

                return current_slides.length - 1;
            }
        }
    };
    

    if (window.innerWidth >= 1200) {
        $('.product-photo').productVerticalSlider();
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
    

    // catalog view type
    let viewType;

    if (!sessionStorage['view-type']) {
        viewType = window.innerWidth >= 768 ? 3 : 2;
    } else {
        viewType = sessionStorage['view-type'];
    }

    setCatalogView(viewType);
    

    $('.view-type__item').click(function() {
        let cols_count = $(this).data('cols');

        setCatalogView(cols_count);
    });

    function setCatalogView(cols_count) {
        let $products = $('.category-items').find('.product-card').parent(),
            column_class;

        switch (Number(cols_count)) {
            case 1:
                column_class = 'col-12';
                break;

            case 2:
                column_class = 'col-6';
                break;
                
            case 3:
                column_class = 'col-md-4 col-6';
                break;
        }

        $products.attr('class', column_class);
        $('.view-type__item').removeClass('active');
        $('.view-type__item[data-cols="' + cols_count + '"]').addClass('active');

        sessionStorage['view-type'] = cols_count;
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
    let $saved_block = $('.shipping-saved-js .block');

    $saved_block.each(function() {
        $(this).click(function() {
            $saved_block.removeClass('checked');
            $saved_block.find('> input').attr('checked', false);
            $(this).addClass('checked');
            $(this).find('> input').attr('checked', true);
        });
    });


    // show-hide password
    $('.show-password').click(function() {
        let $inp_pass = $(this).parent().find('input');

        $(this).toggleClass('showed');

        $inp_pass.attr('type', function(index, attr){
            return attr == 'password' ? 'text' : 'password';
        });
    });

    
    function showSuccess() {
        $.fancybox.close();
        $.fancybox.open({
            src: '#callback-success', 
            modal: true
        });
    }


    $(window).resize(function() {
        set_sticky_header()
        setProdBlockPadding()
    });


    var scrollPos = 0;
    $(window).scroll(function() {
        set_sticky_header()
    });

    $('.modal-close').click(function() {
        $.fancybox.close();
    });

    $.fancybox.defaults.closeExisting = true;
});