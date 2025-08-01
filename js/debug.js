/* ===================================================================
 * Debug utilities for smoothscroll and PhotoSwipe issues
 * ------------------------------------------------------------------- */

(function() {
    'use strict';

    // Функция для проверки состояния элементов
    window.debugPortfolio = function() {
        console.log('=== Portfolio Debug Info ===');
        
        // Проверяем элементы портфолио
        const folioItems = document.querySelectorAll('.folio-item');
        console.log('Portfolio items found:', folioItems.length);
        
        // Проверяем smoothscroll элементы
        const smoothscrollItems = document.querySelectorAll('.smoothscroll');
        console.log('Smoothscroll items found:', smoothscrollItems.length);
        
        // Проверяем PhotoSwipe контейнер
        const pswp = document.querySelectorAll('.pswp');
        console.log('PhotoSwipe container found:', pswp.length > 0);
        
        // Проверяем библиотеки
        console.log('PhotoSwipe available:', typeof PhotoSwipe !== 'undefined');
        console.log('PhotoSwipeUI_Default available:', typeof PhotoSwipeUI_Default !== 'undefined');
        console.log('MoveTo available:', typeof MoveTo !== 'undefined');
        
        // Проверяем обработчики событий
        folioItems.forEach(function(item, index) {
            const thumbLink = item.querySelector('.folio-item__thumb-link');
            if (thumbLink) {
                console.log(`Item ${index}: has thumbLink, href: ${thumbLink.getAttribute('href')}`);
            } else {
                console.warn(`Item ${index}: missing thumbLink`);
            }
        });
        
        console.log('=== End Debug Info ===');
    };

    // Функция для принудительной переинициализации
    window.reinitPortfolio = function() {
        console.log('Reinitializing portfolio...');
        
        // Удаляем старые обработчики событий
        const folioItems = document.querySelectorAll('.folio-item');
        folioItems.forEach(function(item) {
            const thumbLink = item.querySelector('.folio-item__thumb-link');
            if (thumbLink && thumbLink._pswpClickHandler) {
                thumbLink.removeEventListener('click', thumbLink._pswpClickHandler);
                delete thumbLink._pswpClickHandler;
            }
        });
        
        // Переинициализируем функции
        if (typeof ssPhotoswipe === 'function') {
            ssPhotoswipe();
        }
        if (typeof ssMoveTo === 'function') {
            ssMoveTo();
        }
        
        console.log('Portfolio reinitialized');
    };

    // Автоматическая проверка при загрузке страницы
    window.addEventListener('load', function() {
        setTimeout(function() {
            console.log('Auto-debug after page load:');
            if (typeof window.debugPortfolio === 'function') {
                window.debugPortfolio();
            }
        }, 2000);
    });

})(); 