/* ===================================================================
 * Infinity 2.0.0 - Main JS
 *
 *
 * ------------------------------------------------------------------- */

(function(html) {

    'use strict';

    // Проверяем загрузку необходимых библиотек
    const checkLibraries = function() {
        const required = {
            'PhotoSwipe': typeof PhotoSwipe !== 'undefined',
            'PhotoSwipeUI_Default': typeof PhotoSwipeUI_Default !== 'undefined',
            'MoveTo': typeof MoveTo !== 'undefined',
            'anime': typeof anime !== 'undefined'
        };
        
        const missing = Object.keys(required).filter(key => !required[key]);
        if (missing.length > 0) {
            console.warn('Missing required libraries:', missing);
        }
        
        return missing.length === 0;
    };

    const cfg = {
        
        // MailChimp URL
        mailChimpURL : 'https://facebook.us1.list-manage.com/subscribe/post?u=1abf75f6981256963a47d197a&amp;id=37c6d8f4d6' 

    };


    /* animations
    * -------------------------------------------------- */
    const tl = anime.timeline( {
        easing: 'easeInOutCubic',
        duration: 800,
        autoplay: false
    })
    .add({
        targets: '#loader',
        opacity: 0,
        duration: 1000,
        begin: function(anim) {
            window.scrollTo(0, 0);
        }
    })
    .add({
        targets: '#preloader',
        opacity: 0,
        complete: function(anim) {
            document.querySelector("#preloader").style.visibility = "hidden";
            document.querySelector("#preloader").style.display = "none";
        }
    })
    .add({
        targets: ['.s-header__logo', '.s-header__menu-toggle'],
        opacity: [0, 1]
    }, '-=200')
    .add({
        targets: ['.s-intro__pretitle', '.s-intro__title', '.s-intro__more'],
        translateY: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(200)
    }, '-=400')
    .add({
        targets: ['.s-intro__social', '.s-intro__scroll'],
        opacity: [0, 1],
        delay: anime.stagger(200)
    }, '-=200');


   /* preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');
        
        window.addEventListener('load', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');
            tl.play();
        });

    }; // end ssPreloader


    /* parallax
    * -------------------------------------------------- */
    const ssParallax = function() { 

        const rellax = new Rellax('.rellax');

    }; // end ssParallax


   /* menu on scrolldown
    * ------------------------------------------------------ */
    const ssMenuOnScrolldown = function() {

        const menuToggle = document.querySelector('.s-header__menu-toggle');
        const triggerHeight = 150;


        window.addEventListener('scroll', function () {

            let loc = window.scrollY;

            if (loc > triggerHeight) {
                menuToggle.classList.add('opaque');
            } else {
                menuToggle.classList.remove('opaque');
            }

        });

    }; // menu on scrolldown


   /* offcanvas menu
    * ------------------------------------------------------ */
    const ssOffCanvas = function() {

        const menuToggle  = document.querySelector('.s-header__menu-toggle');
        const nav         = document.querySelector('.s-header__nav');
        const closeButton = document.querySelector('.s-header__nav-close-btn');
        const siteBody    = document.querySelector('body');

        if (!(menuToggle && nav)) return;

        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            siteBody.classList.add('menu-is-open');
        });

        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (siteBody.classList.contains('menu-is-open')) {
                siteBody.classList.remove('menu-is-open');
            }
        });

        siteBody.addEventListener('click', function(e) {
            if(!(e.target.matches('.s-header__nav, .smoothscroll'))) {
                closeButton.dispatchEvent(new Event('click'));
            }
        });

    }; // end ssOffcanvas


   /* masonry
    * ------------------------------------------------------ */
    const ssMasonry = function() {

        const containerBricks = document.querySelector('.bricks');
        if (!containerBricks) return;

        imagesLoaded(containerBricks, function() {

            const msnry = new Masonry(containerBricks, {
                itemSelector: '.brick',
                columnWidth: '.brick',
                percentPosition: true,
                resize: true
            });

        });

    }; // end ssMasonry


   /* animate elements if in viewport
    * ------------------------------------------------------ */
    const ssAnimateOnScroll = function() {

        const blocks = document.querySelectorAll('[data-animate-block]');
        if (!blocks) return;

        window.addEventListener('scroll', animateOnScroll);

        function animateOnScroll() {

            let scrollY = window.pageYOffset;

            blocks.forEach(function(current) {

                const viewportHeight = window.innerHeight;
                const triggerTop = (current.getBoundingClientRect().top + window.scrollY + (viewportHeight * .2)) - viewportHeight;
                const blockHeight = current.offsetHeight;
                const blockSpace = triggerTop + blockHeight;
                const inView = scrollY > triggerTop && scrollY <= blockSpace;
                const isAnimated = current.classList.contains('ss-animated');

                if (inView && (!isAnimated)) {

                    anime({
                        targets: current.querySelectorAll('[data-animate-el]'),
                        opacity: [0, 1],
                        translateY: [100, 0],
                        delay: anime.stagger(200, {start: 200}),
                        duration: 800,
                        easing: 'easeInOutCubic',
                        begin: function(anim) {
                            current.classList.add('ss-animated');
                        }
                    });
                }
            });
        }

    }; // end ssAnimateOnScroll


   /* swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        const clientsSwiper = new Swiper('.clients', {

            slidesPerView: 3,
            spaceBetween: 6,
            slideClass: 'clients__slide',
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 500px
                501: {
                    slidesPerView: 4,
                    spaceBetween: 16
                },
                // when window width is > 900px
                901: {
                    slidesPerView: 5,
                    spaceBetween: 32
                },
                // when window width is > 1200px
                1201: {
                    slidesPerView: 6,
                    spaceBetween: 40
                }
            }
        });

        const testimonialsSwiper = new Swiper('.testimonial-slider', {

            slidesPerView: 1,
            effect: 'slide',
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        });

    }; // end ssSwiper


    /* photoswipe
    * ----------------------------------------------------- */
    const ssPhotoswipe = function() {

        // Проверяем наличие необходимых библиотек
        if (!checkLibraries() || typeof PhotoSwipe === 'undefined' || typeof PhotoSwipeUI_Default === 'undefined') {
            console.warn('PhotoSwipe libraries not available');
            return;
        }

        const items = [];
        const pswp = document.querySelectorAll('.pswp')[0];
        const folioItems = document.querySelectorAll('.folio-item');

        if (!(pswp && folioItems)) return;

        // Ограничиваем количество элементов для лучшей производительности
        const maxItems = 20; // Увеличиваем лимит
        const itemsToProcess = folioItems.length > maxItems ? 
            Array.from(folioItems).slice(0, maxItems) : 
            Array.from(folioItems);

        itemsToProcess.forEach(function(folioItem) {

            let folio = folioItem;
            let thumbLink = folio.querySelector('.folio-item__thumb-link');
            let title = folio.querySelector('.folio-item__title');
            let caption = folio.querySelector('.folio-item__caption');
            
            // Проверяем наличие необходимых элементов
            if (!thumbLink || !title) return;
            
            let titleText = '<h4>' + title.innerHTML + '</h4>';
            let captionText = caption ? caption.innerHTML : '';
            let href = thumbLink.getAttribute('href');
            let size = thumbLink.dataset.size ? thumbLink.dataset.size.split('x') : ['1050', '700']; 
            let width  = size[0];
            let height = size[1];

            let item = {
                src  : href,
                w    : width,
                h    : height
            }

            if (caption) {
                item.title = titleText.trim() + captionText.trim();
            }

            items.push(item);

        });

        // Проверяем, что у нас есть элементы для обработки
        if (items.length === 0) return;

        // bind click event
        itemsToProcess.forEach(function(folioItem, i) {

            let thumbLink = folioItem.querySelector('.folio-item__thumb-link');
            
            if (!thumbLink) return;

            // Удаляем старые обработчики событий, если они есть
            thumbLink.removeEventListener('click', thumbLink._pswpClickHandler);
            
            // Создаем новый обработчик
            thumbLink._pswpClickHandler = function(event) {
                event.preventDefault();
                event.stopPropagation();

                let options = {
                    index: i,
                    showHideOpacity: true,
                    // Добавляем дополнительные опции для лучшей производительности
                    maxSpreadZoom: 1.5,
                    getThumbBoundsFn: function(index) {
                        let thumbnail = itemsToProcess[index].querySelector('.folio-item__thumb-link');
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                        let rect = thumbnail.getBoundingClientRect();
                        return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                    }
                }

                // initialize PhotoSwipe
                try {
                    let lightBox = new PhotoSwipe(pswp, PhotoSwipeUI_Default, items, options);
                    lightBox.init();
                } catch (error) {
                    console.warn('Error initializing PhotoSwipe:', error);
                }
            };

            thumbLink.addEventListener('click', thumbLink._pswpClickHandler);

        });

    };  // end ssPhotoSwipe


    /* mailchimp form
    * ---------------------------------------------------- */ 
    const ssMailChimpForm = function() {

        const mcForm = document.querySelector('#mc-form');

        if (!mcForm) return;

        // Add novalidate attribute
        mcForm.setAttribute('novalidate', true);

        // Field validation
        function hasError(field) {

            // Don't validate submits, buttons, file and reset inputs, and disabled fields
            if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

            // Get validity
            let validity = field.validity;

            // If valid, return null
            if (validity.valid) return;

            // If field is required and empty
            if (validity.valueMissing) return 'Пожалуйста, введите email адрес.';

            // If not the right type
            if (validity.typeMismatch) {
                if (field.type === 'email') return 'Пожалуйста, введите корректный email адрес.';
            }

            // If pattern doesn't match
            if (validity.patternMismatch) {

                // If pattern info is included, return custom error
                if (field.hasAttribute('title')) return field.getAttribute('title');

                // Otherwise, generic error
                return 'Пожалуйста, введите корректный формат.';
            }

            // If all else fails, return a generic catchall error
            return 'Введенное значение некорректно.';

        };

        // Show error message
        function showError(field, error) {

            // Get field id or name
            let id = field.id || field.name;
            if (!id) return;

            let errorMessage = field.form.querySelector('.mc-status');

            // Update error message
            errorMessage.classList.remove('success-message');
            errorMessage.classList.add('error-message');
            errorMessage.innerHTML = error;

        };

        // Show success message
        function showSuccess(form, message) {
            let successMessage = form.querySelector('.mc-status');
            successMessage.classList.remove('error-message');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = message;
        };

        // Submit the form 
        function submitForm(form) {

            let emailField = form.querySelector('#mce-EMAIL');
            let email = emailField.value;

            // Create mailto link
            let subject = encodeURIComponent('Подписка на новости ЗИПТЭК ГРУПП');
            let body = encodeURIComponent(`Здравствуйте!\n\nЯ хочу подписаться на новости компании ЗИПТЭК ГРУПП.\n\nМой email: ${email}\n\nС уважением,\n${email}`);
            let mailtoLink = `mailto:info@ziptekgroup.ru?subject=${subject}&body=${body}`;

            // Open email client
            window.open(mailtoLink, '_blank');

            // Show success message
            showSuccess(form, 'Спасибо! Откройте вашу почтовую программу для завершения подписки.');

            // Clear the form
            emailField.value = '';

        };

        // Check email field on submit
        mcForm.addEventListener('submit', function (event) {

            event.preventDefault();

            let emailField = event.target.querySelector('#mce-EMAIL');
            let error = hasError(emailField);

            if (error) {
                showError(emailField, error);
                emailField.focus();
                return;
            }

            submitForm(this);

        }, false);

    }; // end ssMailChimpForm


   /* alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(event) {
                if (event.target.matches('.alert-box__close')) {
                    event.stopPropagation();
                    event.target.parentElement.classList.add('hideit');

                    setTimeout(function(){
                        box.style.display = 'none';
                    }, 500)
                }
            });
        })

    }; // end ssAlertBoxes


    /* Back to Top
    * ------------------------------------------------------ */
     const ssBackToTop = function() {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function() {
            if (window.scrollY >= pxShow) {
                if(!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    }; // end ssBackToTop



   /* smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function() {

        // Проверяем наличие необходимых библиотек
        if (!checkLibraries() || typeof MoveTo === 'undefined') {
            console.warn('MoveTo library not available');
            return;
        }

        const siteBody    = document.querySelector('body');

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        // Проверяем, что у нас есть триггеры и библиотека MoveTo доступна
        if (!triggers.length || typeof MoveTo === 'undefined') return;
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window,
            callback: function (target) {
                if (siteBody.classList.contains('menu-is-open')) {
                    siteBody.classList.remove('menu-is-open');
                }
            }
        }, easeFunctions);

        // Ограничиваем количество триггеров для лучшей производительности
        const maxTriggers = 50;
        const triggersToProcess = triggers.length > maxTriggers ? 
            Array.from(triggers).slice(0, maxTriggers) : 
            Array.from(triggers);

        triggersToProcess.forEach(function(trigger) {
            try {
                moveTo.registerTrigger(trigger);
            } catch (error) {
                console.warn('Error registering smoothscroll trigger:', error);
            }
        });

    }; // end ssMoveTo


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssParallax();
        ssMenuOnScrolldown();
        ssAnimateOnScroll();
        ssOffCanvas();
        ssMasonry();
        ssSwiper();
        
        // Добавляем задержку для PhotoSwipe и MoveTo для лучшей производительности
        setTimeout(function() {
            ssPhotoswipe();
            ssMoveTo();
        }, 100);
        
        ssMailChimpForm();
        ssAlertBoxes();
        ssBackToTop();

    })();

})(document.documentElement);




document.addEventListener('DOMContentLoaded', function() {
    function updateYear() {
        const copyrightElement = document.querySelector('.ss-copyright span');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            copyrightElement.textContent = `${currentYear}г. ©Ziptec все права защищены`;
        }
    }

    // Обновляем год при загрузке страницы
    updateYear();

    // Проверяем каждый день, не наступил ли новый год
    setInterval(function() {
        updateYear();
    }, 24 * 60 * 60 * 1000); // Проверка раз в день
});

