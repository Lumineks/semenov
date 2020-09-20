$(function () {
    const elements = {
        burger: document.querySelector('.header__btn'),
        menu: document.querySelector('.header__menu'),
        body: document.querySelector('body'),
        html: document.querySelector('html'),
        contactBtn: document.querySelector('.contact-btn'),

        toggleMenu() {
            this.burger.classList.toggle('active');
            this.menu.classList.toggle('active');
            this.body.classList.toggle('lock');
            this.html.classList.toggle('lock');
        },

        animateContact() {
            setInterval(() => {
                if (!document.querySelector('.contact').classList.contains('active')) {
                    this.contactBtn.classList.add('animated');
                    document.querySelector('.preview__contact-btn').classList.add('animated');
                }

                setTimeout(() => {
                    this.contactBtn.classList.remove('animated');
                    document.querySelector('.preview__contact-btn').classList.remove('animated');
                }, 1000);
            }, 3000);
        }
    };

    // !Initialization
    let isgeneratedIframe = false;
    elements.animateContact();
    setLogoCoordinates();
    setCalendarWidth();
    setMaskedInput();
    setupWow();
    generateIframe();
    const slider = new Swiper('.swiper-container', {
        speed: 400,
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        autoplay: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.pag1',
            type: 'progressbar',
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        breakpoints: {
            320: {
                spaceBetween: 20,
            },
            576: {
                spaceBetween: 30,

            },
            1200: {
                spaceBetween: 125,
            }
        }
    });
    const slider2 = new Swiper('.swiper-container2', {
        init: false,
        speed: 400,
        loop: true,
        slidesPerView: 1,
        autoHeight: true,
        spaceBetween: 10,
        autoplay: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.pag2',
            type: 'progressbar',
        },
        breakpoints: {

            990: {
                spaceBetween: 100,
            }
        }

    });

    // !Event Listeners


    elements.burger.addEventListener('click', () => {
        elements.toggleMenu();
    });

    elements.contactBtn.addEventListener('click', () => {
        $('.contact').toggleClass('active');
        elements.contactBtn.classList.toggle('active');

        if (elements.contactBtn.classList.contains('animated')) {
            elements.contactBtn.classList.remove('animated');
        }

        window.navigator.vibrate(100);
    });

    if (window.innerWidth <= 990) {
        $('.field, .price__textarea').each(function () {
            $(this).on('focus', function () {
                $('.contact-btn').fadeOut(200);
            });
            $(this).on('blur', function () {
                $('.contact-btn').fadeIn(200);
            });
        });
    }
    document.querySelector('.review__close-btn').addEventListener('click', () => {
        $.fancybox.close();
    });

    if (window.innerWidth >= 1200) {
        $('.preview__contact-btn').on('click', () => {
            $('.preview__contact-btn').toggleClass('active');
            $('.preview__contact').toggleClass('active');

            if (document.querySelector('.preview__contact-btn').classList.contains('animated'))
                document.querySelector('.preview__contact-btn').classList.remove('animated');
        });
    }

    if (window.innerWidth >= 1200) {
        window.addEventListener('scroll', () => {
            generateIframe();

            if (window.scrollY > 1000) {
                elements.contactBtn.classList.add('visible');
                document.querySelector('.contact').classList.add('visible');
                document.querySelector('.header').classList.add('scrolled');


            } else {
                elements.contactBtn.classList.remove('visible');
                document.querySelector('.contact').classList.remove('visible');
                if (document.querySelector('.header').classList.contains('scrolled'))
                    document.querySelector('.header').classList.remove('scrolled');
            }

            if (window.scrollY > 300) {
                $('.preview__arrow').fadeOut();
            } else $('.preview__arrow').fadeIn();

            const section = $('.section');

            const position = $(this).scrollTop();

            section.each(function () {
                const top = $(this).offset().top - 450,
                    bottom = top + $(this).outerHeight();
                if (position < 800) {
                    $('.header__link').removeClass('active');
                    section.removeClass('active');
                }
                if (position >= top && position <= bottom) {
                    $('.header__link').removeClass('active');
                    section.removeClass('active');

                    $(this).addClass('active');
                    $('.header__menu').find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
                }

                if (window.scrollY > 6600) {
                    $('.header__link').removeClass('active');
                    $(this).removeClass('active');
                    $('.header__menu').find('a[href="#' + 'social' + '"]').addClass('active');
                }
            });
        });
    } else {
        $('.header__link').on('click', () => {
            elements.toggleMenu();
        });
    }

    if (window.innerWidth < 1200) {
        window.addEventListener('scroll', () => {
            generateIframe();
            if (window.scrollY > 200) {
                $('.preview__arrow').fadeOut();
            } else $('.preview__arrow').fadeIn();
        });
    }

    let isGeneratedGallery = false;
    window.addEventListener('resize', () => {
        setLogoCoordinates();
        setCalendarWidth();
    });



    const path = document.querySelector('.preview__person-image').currentSrc;

    $(".header__link, .preview__arrow").on("click", function (event) {
        event.preventDefault();

        let id = $(this).attr('href');
        let top = 0;



        top = $(id).offset().top + 100;

        if (window.innerWidth > 990)
            top = $(id).offset().top + 60;


        $('body,html').animate({
            scrollTop: top
        }, 1500);
    });


    document.querySelector('.clients__btn').addEventListener('click', () => {
        setTimeout(() => {
            slider2.init();
        }, 100);
    });

    $('.clients__btn, [data-fancybox="images"]').fancybox({});

    $('.price__select').styler();
    $('.price__date').datepicker({
        autoClose: true,
        onHide: function () {
            calculatePrice();
        }
    });

    // !Functions
    extendGallery();

    function extendGallery() {
        const firstBtn = $('.gallery__btn--first');
        const secondBtn = $('.gallery__btn--second');
        const secondSet = $('.gallery__set--second');

        firstBtn.on('click', function () {

            let index = 20;
            let path = '';
            $('.gallery__set--first .gallery__more').fadeOut(200);
            setTimeout(() => {
                secondSet.slideDown();

                $('.gallery__set--second a').each(function () {
                    path = `images/gallery-${index}.jpg`;
                    $(this).attr('data-fancybox', 'images');
                    $(this).attr('href', path);
                    index++;
                });

                index = 20;

                $('.gallery__set--second img').each(function () {
                    path = `images/gallery-${index}.jpg`;
                    $(this).attr('src', path);

                    index++;
                });
            }, 100);


            const thirdSet = $('.gallery__set--third');
            secondBtn.on('click', function () {
                let index = 40;

                $('.gallery__set--second .gallery__more').fadeOut();
                setTimeout(() => {
                    thirdSet.slideDown();

                    $('.gallery__set--third a').each(function () {
                        path = `images/gallery-${index}.jpg`;
                        $(this).attr('data-fancybox', 'images');
                        $(this).attr('href', path);
                        index++;
                    });

                    index = 40;

                    $('.gallery__set--third img').each(function () {
                        path = `images/gallery-${index}.jpg`;
                        $(this).attr('src', path);

                        index++;
                    });
                }, 300);
            });
        });
    }

    manageReviewSlider();

    function manageReviewSlider() {

        const prevArrow = $('.review__arrow--prev');
        const nextArrow = $('.review__arrow--next');

        nextArrow.on('click', () => slider2.slideNext());
        prevArrow.on('click', () => slider2.slidePrev());
    }

    function setLogoCoordinates() {
        setTimeout(() => {
            let top = 0;
            if (window.innerWidth >= 900)
                top = document.querySelector('.preview__person-image').getBoundingClientRect().top + 180;
            if (window.innerWidth >= 576)
                top = document.querySelector('.preview__person-image').getBoundingClientRect().top + 180;
            else if (window.innerHeight >= 800 && window.innerWidth >= 350) {
                top = document.querySelector('.preview__person-image').getBoundingClientRect().top + 300;
                console.log('last');
            } else {
                top = document.querySelector('.preview__person-image').getBoundingClientRect().top + 190;

            }

            // document.querySelector('.preview__image-wrapper').setAttribute('style', `top:${top}px`);
            // document.querySelector('.preview__link').setAttribute('style', `top:${top}px`);
        }, 100);
    }

    function setCalendarWidth() {
        $('.datepicker').width($('.price__date').width() + 44);
    }

    function setMaskedInput() {
        $('#tel').mask("+38 (999) 999-99-99");
        $('#tel').on('click', () => {
            $('#tel').get(0).setSelectionRange(5, 5);
            console.log('moved');
        });
    }

    function calculatePrice() {
        let totalPrice = 0;
        const typeName = $('.price__select option:selected').text()
        let typePrice = 0;

        if (parseInt($('.price__select option:selected').val()))
            typePrice = parseInt($('.price__select option:selected').val());
        // console.log(typeof(eventPrice));
        const amountOfPeople = parseInt($('.price__radio:checked').val());


        switch (amountOfPeople) {
            case 50:
                if (typeName === 'Свадьбы' ||
                    typeName === 'Корпоративные вечеринки')
                    totalPrice = typePrice + 6000;
                else if (
                    typeName === 'Дни Рождения' ||
                    typeName === 'Другое в семейные' ||
                    typeName === 'Тимбилдинг' ||
                    typeName === 'Дни города' ||
                    typeName === 'Другое в открытые') {
                    totalPrice = typePrice + 5000;
                } else
                    totalPrice = typePrice;
                break;
            case 100:
                if (typeName === 'Свадьбы' ||
                    typeName === 'Корпоративные вечеринки' ||
                    typeName === 'Дни Рождения' ||
                    typeName === 'Другое в семейные')
                    totalPrice = typePrice + 8000;
                else if (typeName === 'Тимбилдинг')
                    totalPrice = typePrice + 15000;
                else if (
                    typeName === 'Дни города' ||
                    typeName === 'Другое в открытые') {
                    totalPrice = typePrice + 5000;
                } else
                    totalPrice = typePrice;
                break;
            case 101:
                if (!typeName)
                    break;
                if (typeName === 'Тимбилдинг') {
                    totalPrice = 'Договорная';
                    $('.price__num').text('Договорная цена');
                    return;
                } else if (typeName === 'Свадьбы' ||
                    typeName === 'Корпоративные вечеринки' ||
                    typeName === 'Дни Рождения' ||
                    typeName === 'Другое в семейные')
                    totalPrice = 25000;
                else
                    totalPrice = 10000;
                break;
            default:
                break;
        }

        let date = $('.price__date').val().split('.');
        const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
        for (let i = 0; i < date.length; i++) {
            date[i] = parseInt(date[i]);
        }
        date[1]--;

        date = new Date(date[2], date[1], date[0]);

        if (days[date.getDay()] !== 'ПТ' &&
            days[date.getDay()] !== 'СБ' &&
            days[date.getDay()] !== 'ВС') {
            totalPrice *= 0.9;
        }

        setTimeout(() => {
            $('.price__num').prop('Counter', 0).animate({
                Counter: totalPrice
            }, {
                duration: 1500,
                easing: "swing",
                step: function (now) {
                    $(this).text(`≈ ${Math.ceil(now)} ₴`);
                }
            });
        }, 10);
    }

    $(".price__form :input, .price__form select").on('change', () => {
        calculatePrice();
    });


    validateForm();

    function validateForm() {
        const form = document.querySelector('.price__form');
        const validateBtn = document.querySelector('.price__btn');
        const fields = document.querySelectorAll('.field');
        const rows = document.querySelectorAll('.price__row--validate');
        const radios = document.querySelectorAll('.price__radio');
        let isValid = true;

        form.addEventListener('submit', function (event) {
            isValid = true;
            let errors = form.querySelectorAll('.error');
            for (let i = 0; i < errors.length; i++) {
                errors[i].remove();
            }

            if (document.querySelector('.price__row--radios').classList.contains('animated')) {
                document.querySelector('.price__row--radios').classList.remove('animated');
            }
            if (document.querySelector('.price__row--select').classList.contains('animated')) {
                document.querySelector('.price__row--select').classList.remove('animated');
            }
            for (let i = 0; i < fields.length; i++) {
                if (rows[i].classList.contains('animated')) {
                    rows[i].classList.remove('animated');
                }
            }

            let isScrolled = false;
            if (!document.querySelector('#type').value) {
                const selectError = document.createElement('div');
                selectError.className = 'error';
                selectError.innerHTML = '*Обязательное поле для заполнения';
                if (document.querySelector('.price__row--select').classList.contains('animated')) {
                    document.querySelector('.price__row--select').classList.remove('animated');
                }
                setTimeout(() => {
                    document.querySelector('.price__row--select').classList.add('animated');
                }, 100);
                document.querySelector('.price__row--select')
                    .insertBefore(selectError, document.querySelector('.jq-selectbox.jqselect.price__select.price__form-item').nextSibling);
                isValid = false;
                if (!isScrolled) {
                    isScrolled = true;
                    let top = $('.price__form').offset().top - 20;
                    if (window.innerWidth > 990)
                        top = $('.price').offset().top;
                    $('body,html').animate({
                        scrollTop: top
                    }, 400);
                }
            }

            for (let i = 0; i < fields.length; i++) {
                if (!fields[i].value) {
                    if (!isScrolled) {
                        isScrolled = true;
                        let top = $('.price__form').offset().top - 20;
                        if (window.innerWidth > 990)
                            top = $('.price').offset().top;
                        $('body,html').animate({
                            scrollTop: top
                        }, 400);
                    }
                    isValid = false;
                    const error = document.createElement('div');
                    error.className = 'error';
                    error.innerHTML = '*Обязательное поле для заполнения';
                    if (rows[i].classList.contains('animated')) {
                        rows[i].classList.remove('animated');
                    }
                    setTimeout(() => {
                        rows[i].classList.add('animated');
                    }, 100);
                    rows[i].insertBefore(error, fields[i].nextSibling);
                }
            }
            let isCheched = false;
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked)
                    isCheched = true;
            }

            if (!isCheched) {
                isValid = false;
                const radioError = document.createElement('div');
                radioError.className = 'error';
                radioError.innerHTML = '*Обязательное поле для заполнения';
                if (document.querySelector('.price__row--radios').classList.contains('animated')) {
                    document.querySelector('.price__row--radios').classList.remove('animated');
                }
                setTimeout(() => {
                    document.querySelector('.price__row--radios').classList.add('animated');
                }, 100);
                document.querySelector('.price__row--radios')
                    .insertBefore(radioError, document.querySelector('.price__wrapper').nextSibling);

                if (!isScrolled) {
                    isScrolled = true;
                    let top = $('.price__form').offset().top - 20;
                    if (window.innerWidth > 990)
                        top = $('.price').offset().top;
                    $('body,html').animate({
                        scrollTop: top
                    }, 400);
                }


            }
            checkValidationAfterFirstSubmit();

            if (isValid) {
                var th = $(this);
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: th.serialize()
                }).done(function () {
                    $.fancybox.open(`
                <div class="message">
                    <div class="message__icon">
                        <svg width="119" height="91" viewBox="0 0 119 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M38.375 71.6728L10.2 43.4978L0.80835 52.8895L38.375 90.4561L118.875 9.95612L109.483 0.564453L38.375 71.6728Z" fill="#00A638"/>
                        </svg>
                    </div>
                    <p class="message__text">Заявка успешна отправлена, я скоро перезвоню!</p>
                </div>
                `);
                    setTimeout(function () {
                        $.fancybox.close();
                        $('.price__num').html(`≈ 0 ₴`);
                        form.reset();

                        // th.trigger("reset");
                    }, 3000);
                });
                // console.log('valid');
                $.fancybox.open(`
                <div class="message">
                    <div class="message__icon">
                        <svg width="119" height="91" viewBox="0 0 119 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M38.375 71.6728L10.2 43.4978L0.80835 52.8895L38.375 90.4561L118.875 9.95612L109.483 0.564453L38.375 71.6728Z" fill="#00A638"/>
                        </svg>
                    </div>
                    <p class="message__text">Заявка успешна отправлена, я скоро перезвоню!</p>
                </div>
                `);
                setTimeout(() => {
                    $.fancybox.close();
                    $('.price__num').html(`≈ 0 ₴`);
                }, 3000);
                form.reset();
                setTimeout(function () {
                    $('.price__form select').trigger('refresh');
                }, 1)

            }
            if (!isValid) {
                window.navigator.vibrate(300);
            }
            isScrolled = false;

            event.preventDefault();
            // return false;
        });

    }

    function checkValidationAfterFirstSubmit() {


        $('.price__row').each(function () {
            $(this).on('click', function () {
                if ($(this).hasClass('animated')) {
                    $(this).removeClass('animated');
                    $(this).find('.error').remove();
                    // let error = document.querySelector('.error');
                    // error.remove();
                }
            });
        });



    }

    function setupWow() {
        if (window.innerWidth > 1024) {
            wow = new WOW({
                animateClass: 'animate__animated',
                offset: 120,
            })
            wow.init();
        } else {
            wow = new WOW({
                animateClass: 'animate__animated',
            })
            wow.init();
        }
    }


    // console.log(videoSection);
    function generateIframe() {
        if (!isgeneratedIframe) {

            const videoSection = $('.gallery').offset().top - 800;

            if (window.scrollY >= videoSection) {
                let markup = '';
                if (window.innerWidth > 1400) {
                    markup = `
                    <iframe src="https://www.youtube.com/embed/VobNLrUiIRk?autoplay=1;&mute=1;&start=11" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
                   `;
                } else {                  
                    markup = `
                 <iframe src="https://www.youtube.com/embed/VobNLrUiIRk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
                `;
                }

                $('.gallery__video').prepend(markup);

                isgeneratedIframe = true;
            }
        }
    }

});