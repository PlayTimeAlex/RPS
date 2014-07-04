(function($) {
    $(document).ready(function() {
        //compare items
        if ($('.b-compare').length) {
            $("tr", ".b-compare__table").each(function () {
                var content = false;
                var contentNew = null;
                $('> .tocompare', this).each(function () {
                    var contentNew = $(this).html();
                    if (content && contentNew != content) {
                        $(this).parent().removeClass('equal').addClass('different');
                        return false;
                    } else {
                        $(this).parent().addClass('equal');
                    }
                    content = $(this).html();
                });
            });
            $(".ctable__hassub").each(function () {
                if (!$('.different', this).length) {
                    $(this).addClass('equal');
                }
            });

            $('.b-compare').each(function () {
                if (!$('.different', this).length) {
                    $(this).addClass('equal');
                }
            });
        }

        //compare swith
        $('.b-compare__switch-btn').click(function () {
            if (!$(this).hasClass('active')) {
                $('.b-compare__switch-btn').removeClass('active');
                $(this).addClass('active');

                if ($(this).data('action') == "all") {
                    $('.equal').show('fast');
                } else {
                    $('.equal').hide('fast');
                }
            }
            return false;
        });
        if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
            var fixHeaderTop = $('.b-header__bottom').offset().top;
            $(window).scroll(function () {
                if ($(window).scrollTop() > fixHeaderTop) {
                    $('.b-header__bottom').addClass('fixed').css({'bottom':'auto', 'top':0});
                } else {
                    $('.b-header__bottom').removeClass('fixed').css({'bottom':'0', 'top':'auto'});
                }
            });
        }

        //tabs
        $('.b-tabs__header-link').click(function(){
            $('.b-tabs__header-link').parent().removeClass('current');
            $(this).parent().addClass('current');
            var parent = $(this).closest('.b-tabs');
            $('.b-tabs__tab', parent).hide();
            $($(this).attr('href')).show();
            return false;
        });

        //validation
        $.extend($.validator.messages, {
            required: "Это поле необходимо заполнить.",
            remote: "Пожалуйста, введите правильное значение.",
            email: "Пожалуйста, введите корректный адрес электронной почты.",
            url: "Пожалуйста, введите корректный URL.",
            date: "Пожалуйста, введите корректную дату.",
            dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
            number: "Пожалуйста, введите число.",
            digits: "Пожалуйста, вводите только цифры.",
            creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
            equalTo: "Пожалуйста, введите такое же значение ещё раз.",
            extension: "Пожалуйста, выберите файл с правильным расширением.",
            maxlength: $.validator.format("Пожалуйста, введите не больше {0} символов."),
            minlength: $.validator.format("Пожалуйста, введите не меньше {0} символов."),
            rangelength: $.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
            range: $.validator.format("Пожалуйста, введите число от {0} до {1}."),
            max: $.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
            min: $.validator.format("Пожалуйста, введите число, большее или равное {0}.")
        });

        $('.b-form__t-validate').validate({
            errorElement: "span",
            errorPlacement: function(error, element){
                var err = $(element).closest('td').siblings('.b-form__t-label');
                error.appendTo(err)
            }
        });

        //tel-mask
        $(".b-form__text_tel").mask("(999) 999-9999");

        //catalog popup
        $('.b-catalog__ilink').hover(function(){
            $('.cl-popup').stop().hide('fast');
            var lpos = $(this).offset();
            var popup = $(this).siblings('.b-catalog__popup');
            var popupeight = popup.outerHeight();
            var delta = $(document).height() - lpos.top;

            if(delta < (popupeight+100)){
                timeropen = setTimeout(function(){popup.css({'left': lpos.left+15,'top': lpos.top - popupeight -15}).stop().show('fast').addClass('top');}, 500);
                if(typeof timer != "undefined"){
                    clearTimeout(timer);
                }
            } else {
                timeropen = setTimeout(function(){popup.css({'left': lpos.left+15,'top': lpos.top+25}).stop().show('fast');}, 500);
                if(typeof timer != "undefined"){
                    clearTimeout(timer);
                }
            }

            return false;
        }, function(){
            if(typeof timeropen != "undefined"){
                clearTimeout(timeropen);
            }
            timer = setTimeout(function(){$('.cl-popup').stop().hide('fast').removeClass('top');}, 500);
        });
        $('.cl-popup, .b-header__pform, .city-list').hover(function(){
            if(typeof timer != "undefined"){
                clearTimeout(timer);
            }
        }, function(){
            if(!$('input:focus', this).length){
                timer = setTimeout(function(){$('.cl-popup, .b-header__pform, .city-list').stop().hide('fast').removeClass('top');}, 500);
            }
        });

        //filter dropdown
        $('.b-filter__dropdown-item').click(function(){
            var parent = $(this).closest('.b-filter__dropdown');
            $('.b-filter__dropdown-input', parent).val($(this).data('val'));
            $('.b-filter__dropdown-text', parent).html($(this).html());
            $('.b-filter__dropdown-list', parent).hide('fast');
        });

        $('.b-filter__dropdown').click(function(){
            var parent = $(this).closest('.b-filter__dropdown');
            $('.b-filter__dropdown-list', parent).show('fast');
            return false;
        });
        $('.b-filter__dropdown').hover(function(){
            if(typeof timer != "undefined"){
                clearTimeout(timer);
            }
        }, function(){
            timer = setTimeout(function(){$('.b-filter__dropdown-list').hide('fast');}, 500);
        });
        $('label', '.b-filter__dropdown_checkbox').click(function(){
            var parent = $(this).closest('.b-filter__dropdown_checkbox');
            var elements = $('input:checked', parent);
            var html = '';
            elements.each(function(){
                html += $(this).val()+',';
                console.log($(this).val());
            });
            if(html != ""){
                $('.b-filter__dropdown-text', parent).html(html.slice(0, -1));
            } else {
                $('.b-filter__dropdown-text', parent).html('Все');
            }
        });


        // If an event gets to the body
        $("body").click(function(){
            $(".b-filter__dropdown-list, .cl-popup, .b-header__pform, .city-list").hide('fast').removeClass('top');
        });

        // Prevent events from getting pass .popup
        $(".b-filter__dropdown-list, .cl-popup, .b-header__pform, .city-list").click(function(e){
            e.stopPropagation();
        });

        //scroll
        function scrollto_c(elem) {
            $('html, body').animate({
                scrollTop: $(elem).offset().top - $('.b-header').outerHeight()
            }, 500);
        }

        $('.anim-scroll').click(function () {
            scrollto_c($(this).attr('href'));
            return false;
        });

        $('.scroll-top').click(function () {
            if($.isFunction($.fn.fullpage.moveTo)){
                $.fn.fullpage.moveTo(1);
                $('#scroll').animate({
                    marginTop: 0
                }, 300, function () {
                    setTimeout(function () {
                        $.fn.fullpage.setAllowScrolling(true);
                        $('#fp-nav').show('fast');
                    }, 300);
                });
                stopDownFooter = false;
            } else {
                scrollto_c($(this).attr('href'));
                console.log('top3');
            }
            return false;
        });

        //top forms
        $('.b-header__f-open').click(function(){
            $('.b-header__pform').hide('fast');
            var lpos = $(this).offset();
            var popup = $($(this).attr('href'));
            var width = $(this).outerWidth()
            popup.css({'top': lpos.top+30}).show('fast');
            console.log('click');
            return false;
        });

        //citys
        $('.city').click(function(){
            $('.city-list').show('fast');
            return false;
        });

        //menu
        $('.b-topnav__submenu').append('<li class="arr"></li>');
        $('.b-topnav__list > li').hover(function(){
            $('.b-topnav__submenu', this).stop().show('fast');
        }, function(){
            $('.b-topnav__submenu', this).stop().hide('fast');
        });

        //colorbox video
        $('.b-video__link').colorbox({
            iframe:true,
            innerWidth:640,
            innerHeight:390,
            close:""
        });

        //calculate width for slider nav
        $('.b-islider__nav').each(function(){
            var container = $(this);
            var itemWidth = (container.width()-50)/3;
            $('.b-islider__navitem', container).width(itemWidth);
            $('ul', container).width($('.b-islider__navitem', container).length*(itemWidth+25)-25);
        });

        //help
        $('.pr-help').hover(function(){
            $('.pr-help__text', this).stop().show('fast');
        }, function(){
            $('.pr-help__text', this).stop().hide('fast');
        });

        //services items
        $('.b-services__item').click(function(){
            var parent = $(this).closest('.b-services');
            if(!$(this).hasClass('.current')){
                $('.b-services__item', parent).removeClass('current');
                $('.b-services__image', parent).css('display', 'none');
                $('.b-services__image[data-img="'+$(this).data('img')+'"]', parent).css('display', 'block');
                $(this).addClass('current');
            }
            return false;
        });

        //fullpage
        if($(window).height() > 900 && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
            if($('#scroll').length) {
                $('head').append('<style type="text/css">html,body{margin: 0;padding: 0;overflow:hidden;-webkit-tap-highlight-color: rgba(0,0,0,0);</style>');
                stopDown = false;
                stopDownFooter = false;
                $('body').on('mousewheel', function (event) {
                    if ($('.section.active').index('.section') + 1 == 1) {
                        if (event.deltaY > 0 && stopDown) {
                            $('.b-header__bottom').removeClass('fixed').css({'bottom': 0, 'top': 'auto'});
                            $('#fp-nav').hide('fast');
                            $('.b-header').animate({
                                'marginTop': 0
                            }, 300, function () {

                            });
                            $.fn.fullpage.setAllowScrolling(false);
                            stopDown = false;
                        }
                        if (event.deltaY < 0 && !stopDown) {
                            $('.b-header').animate({
                                'marginTop': -$('.b-header').outerHeight()
                            }, 300, function () {
                                $('.b-header__bottom').addClass('fixed').css({'bottom': 'auto', 'top': 0});
                                $('#fp-nav').show('fast');
                                $.fn.fullpage.setAllowScrolling(true);
                            });
                            stopDown = true;
                        }
                    }
                    if ($('.section.active').index('.section') + 1 == $('.section').length) {

                        var tHeight = $('.b-footer').outerHeight() + $('.pr-top').outerHeight();
                        if (event.deltaY > 0 && stopDownFooter) {
                            $('#scroll').animate({
                                marginTop: 0
                            }, 300, function () {
                                setTimeout(function () {
                                    $.fn.fullpage.setAllowScrolling(true);
                                    $('#fp-nav').show('fast');
                                }, 300);
                            });
                            stopDownFooter = false;
                        }
                        if (event.deltaY < 0 && !stopDownFooter && lastSectionLoaded) {
                            $('#fp-nav').hide('fast');
                            $('#scroll').animate({
                                marginTop: -tHeight
                            }, 300, function () {
                                $.fn.fullpage.setAllowScrolling(false);
                            });
                            stopDownFooter = true;
                        }
                    }
                });

                $('#scroll').fullpage({
                    easing: 'linear',
                    navigation: true,

                    //anchors: ['bc-promo', 'bc-description', 'bc-demo', 'bc-specifications', 'bc-gallery', 'bc-contacts'],
                    verticalCentered: false,
                    resize: false,
                    setAllowScrolling: false,
                    onLeave: function (index, nextIndex, direction) {
                        if (index == '1') {
                            //console.log();
                            //$('.b-header').css('marginTop', - $('.b-header').outerHeight());
                        }
                        if(nextIndex == 1){
                            $('.pr-top-vert').stop().animate({
                                opacity: 0
                            }, 300, function(){
                                $(this).css('display', 'none');
                            });
                        }
                        if(nextIndex == 2){
                            $('.pr-top-vert').stop().css('display', 'block').animate({
                                opacity: 1
                            }, 300);
                        }
                    },
                    afterLoad: function (anchorLink, index) {
                        lastSectionLoaded = index == $('.section').length ? true : false;
                    },
                    afterRender: function () {

                    }
                });
                $.fn.fullpage.setAllowScrolling(false);
            }
        }

    });

    $(window).load(function() {
        $('.grayscale').hoverizr();

        $('.b-item__photos').flexslider({
            controlNav: false,
            prevText: "",
            nextText: "",
            slideshow: false
        });

        var bIsliderNav = $('.b-islider__nav').jScrollPane({
            showArrows: true,
            animateScroll: true
        });
        var api = bIsliderNav.data('jsp');

        $('.b-islider').flexslider({
            controlNav: false,
            prevText: "",
            nextText: "",
            slideshow: false,
            after: function(slider){
                $('.b-islider__navitem').removeClass('current');
                $('li[data-slide=' + slider.currentSlide + ']', '.b-islider__nav').addClass('current');
                console.log(slider.count);
                if(slider.currentSlide > 1 && slider.currentSlide != (slider.count - 1)) {
                    var slide = slider.currentSlide-1;
                    api.scrollToX($('li[data-slide=' + slide + ']', '.b-islider__nav').position().left);
                }
                if(slider.currentSlide <= 1){
                    api.scrollToX(0);
                }
                if(slider.currentSlide == (slider.count - 1)){
                    api.scrollToX(99999);
                }
            }
        });

        $('.b-islider__navitem').click(function(){
            $('.b-islider__navitem').removeClass('current');
            $(this).addClass('current');
            $($(this).data('slider')).flexslider($(this).data('slide'));
        });

        $('.b-promo').flexslider({
            animation: "slide",
            prevText: "",
            nextText: "",
            animationLoop: false
        });

    });
}(jQuery));