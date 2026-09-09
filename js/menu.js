/* ==========================================================================
   EduVista - Responsive Navigation Menu Controller
   ========================================================================== */

(function($) {
  'use strict';

  $(document).ready(function() {

    // Move overlay element directly under body (outside .wsmenu container)
    if ($('.overlapblackbg').length === 0) {
      $('<div class="overlapblackbg"></div>').appendTo('body');
    } else {
      $('.overlapblackbg').appendTo('body');
    }

    // Helper: close mobile navigation drawer
    function closeMobileMenu() {
      $('body').removeClass('wsactive');
      $('#wsnavtoggle, .wsanimated-arrow, .wsmenu').removeClass('active wsactive');
    }

    // Toggle Mobile Navigation Drawer (Hamburger button)
    $(document).on('click', '#wsnavtoggle, .wsanimated-arrow', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if ($('body').hasClass('wsactive')) {
        closeMobileMenu();
      } else {
        $('body').addClass('wsactive');
        $(this).addClass('active');
      }
    });

    // Close drawer via the "X Close" button inside drawer
    $(document).on('click', '.wsmenu-close-btn', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeMobileMenu();
    });

    // Close drawer when clicking the dark backdrop overlay
    $(document).on('click', '.overlapblackbg', function(e) {
      e.preventDefault();
      closeMobileMenu();
    });

    // Mobile Accordion Toggle for "Countries" dropdown ONLY
    $(document).on('click', '.wsmenu-dropdown > a', function(e) {
      if ($(window).width() < 992) {
        e.preventDefault();
        e.stopPropagation();
        var $dropdown = $(this).closest('.wsmenu-dropdown');
        var $submenu = $dropdown.find('.wsmenu-dropdown-menu');

        $dropdown.toggleClass('is-open');
        $submenu.stop(true, true).slideToggle(200);

        var $icon = $(this).find('i.fa-chevron-down, i.fa-chevron-up');
        if ($icon.length) {
          $icon.toggleClass('fa-chevron-down fa-chevron-up');
        }
      }
    });

    // Mobile: direct nav links (Home, About Us, Events & Gallery, Get Consultation)
    // These are DIRECT <a> children of nav.wsmenu — NOT inside .wsmenu-dropdown
    $(document).on('click', 'nav.wsmenu > a', function(e) {
      if ($(window).width() < 992) {
        var $link = $(this);

        // Skip close button
        if ($link.hasClass('wsmenu-close-btn')) {
          return;
        }

        var href = $link.attr('href');

        // Skip void/empty hrefs
        if (!href || href === 'javascript:void(0)') {
          e.preventDefault();
          return;
        }

        // For same-page anchor links — close menu and allow default scroll
        if (href.charAt(0) === '#') {
          closeMobileMenu();
          return;
        }

        // For page links (about.html, events.html, index.html etc.)
        e.preventDefault();
        closeMobileMenu();
        setTimeout(function() {
          window.location.href = href;
        }, 150);
      }
    });

    // Mobile: Country sub-menu links inside the dropdown
    $(document).on('click', '.wsmenu-dropdown-menu a', function(e) {
      if ($(window).width() < 992) {
        var href = $(this).attr('href');
        if (href && href !== 'javascript:void(0)' && href !== '#') {
          e.preventDefault();
          closeMobileMenu();
          setTimeout(function() {
            window.location.href = href;
          }, 150);
        }
      }
    });

    // Window Resize Handler — reset mobile state on desktop
    $(window).on('resize orientationchange', function() {
      if ($(window).width() >= 992) {
        closeMobileMenu();
        $('.wsmenu-dropdown').removeClass('is-open');
        $('.wsmenu-dropdown-menu').removeAttr('style');
        $('.wsmenu-dropdown > a i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      }
    });

  });

})(jQuery);
