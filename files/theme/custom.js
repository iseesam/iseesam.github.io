jQuery(function($) {

    // Fixed nav
    $.fn.checkHeaderPositioning = function(scrollEl, scrollClass) {
        var $me = $(this);

        if (!$me.length) {
          return;
        }

        if($(scrollEl).scrollTop() > 50) {
            $me.addClass(scrollClass);
        } else if($(scrollEl).scrollTop() === 0) {
            $me.removeClass(scrollClass);
        }
    };

  // Mobile sidebars
  $.fn.expandableSidebar = function(expandedClass) {
    var $me = this;

    $me.on('click', function() {
      if(!$me.hasClass(expandedClass)) {
        $me.addClass(expandedClass);
      } else {
        $me.removeClass(expandedClass);
      }
    });
  }

  // Interval loop
  $.fn.intervalLoop = function(condition, action, duration, limit) {
    var counter = 0;
    var looper = setInterval(function(){
      if (counter >= limit || $.fn.checkIfElementExists(condition)) {
        clearInterval(looper);
      } else {
        action();
        counter++;
      }
    }, duration);
  }

  // Check if element exists
  $.fn.checkIfElementExists = function(selector) {
    return $(selector).length;
  }

  var uniteController = {
    init: function(opts) {
      var base = this;

      $('body').checkHeaderPositioning(window, 'collapse');

      // Add classes to elements
      base._addClasses();

      // Fade header content on scroll
      $(window).scroll(function(){
        var scaler = 1 - $(window).scrollTop() / ($('.banner-wrap').height());
        if (scaler < 0) { scaler = 0; }
          $('body.header-scroll-animate-on .banner').css("opacity", 1 - $(window).scrollTop() / ($('.banner-wrap').height() / 1.5));
          $('body.header-scroll-animate-on .banner').css("top", - 200 * $(window).scrollTop() / $('.banner-wrap').height());
          $('body.header-scroll-animate-on .banner').css({'-webkit-transform' : 'scale(' + scaler + ')', '-moz-transform' : 'scale(' + scaler + ')', '-ms-transform' : 'scale(' + scaler + ')', 'transform' : 'scale(' + scaler + ')'});
      });

      setTimeout(function(){
        base._attachEvents();
      }, 1000);
    },

    _addClasses: function() {
      var base = this;

      // Add fade in class to nav + logo + banner
        $('body').addClass('fade-in');

      // Add class to nav items with subnav
      $('.wsite-menu-default').find('li.wsite-menu-item-wrap').each(function(){
        var $me = $(this);

        if($me.children('.wsite-menu-wrap').length > 0) {
          $me.addClass('has-submenu');
          $('<span class="icon-caret"></span>').insertAfter($me.children('a.wsite-menu-item'));
        }
      });

      // Active nav class

      $('#active').addClass('active');

      // Add class to subnav items with subnav
      $('.wsite-menu').find('li.wsite-menu-subitem-wrap').each(function(){
        var $me = $(this);

        if($me.children('.wsite-menu-wrap').length > 0) {
          $me.addClass('has-submenu');
          $('<span class="icon-caret"></span>').insertAfter($me.children('a.wsite-menu-subitem'));
        }
      });

        // Keep subnav open if submenu item is active
        $('li.wsite-menu-subitem-wrap.wsite-nav-current').parents('.wsite-menu-wrap').addClass('open');

      // Add placeholder text to inputs
      $('.wsite-form-sublabel').each(function(){
        var sublabel = $(this).text();
        $(this).prev('.wsite-form-input').attr('placeholder', sublabel);
      });
    },

    _cloneLogin: function() {
      var loginDetach = $('#member-login').clone(true);
      $('.mobile-nav .wsite-menu-default > li:last-child').after(loginDetach);
    },

    _moveFlyout: function() {
      var move = $("#wsite-menus").detach();
      $(".unite-header").append(move);
    },

    _attachEvents: function() {
    	var base = this;

        $('.hamburger').on('click', function(e) {
            e.preventDefault();
            if (!$('body').hasClass('nav-open')) {
                $('body').addClass('nav-open');
            } else {
                $('body').removeClass('nav-open');
            }
        });

        // Move cart
        $.fn.intervalLoop('.unite-header.sticky-nav-on #wsite-menus', base._moveFlyout, 200, 12);

      	// Copy login

        $.fn.intervalLoop('.mobile-nav #member-login', base._cloneLogin, 800, 5);


        // Fixed header
        $(window).on('scroll', function() {
          $('body').checkHeaderPositioning(window, 'collapse');
        });

        // Splash page logo link swap

        $('.splash-page .wsite-logo a').attr("href", $('.wsite-menu-default li:first-child a').attr("href"));

        // Subnav toggle
        $('li.has-submenu span.icon-caret').on('click', function() {
            var $me = $(this);

            if($me.siblings('.wsite-menu-wrap').hasClass('open')) {
                $me.siblings('.wsite-menu-wrap').removeClass('open');
            } else {
                $me.siblings('.wsite-menu-wrap').addClass('open');
            }
        });

      // Store category dropdown
      $('.wsite-com-sidebar').expandableSidebar('sidebar-expanded');

      // Search filters dropdown
      $('#wsite-search-sidebar').expandableSidebar('sidebar-expanded');

    	// Init fancybox swipe on mobile
      if ('ontouchstart' in window) {
        $('body').on('click', 'a.w-fancybox', function() {
          base._initSwipeGallery();
        });
      }
    },

    _initSwipeGallery: function() {
      var base = this;

      setTimeout(function(){
        var touchGallery = document.getElementsByClassName('fancybox-wrap')[0];
        var mc = new Hammer(touchGallery);
        mc.on("panleft panright", function(ev) {
          if (ev.type == "panleft") {
            $("a.fancybox-next").trigger("click");
          } else if (ev.type == "panright") {
            $("a.fancybox-prev").trigger("click");
          }
          base._initSwipeGallery();
        });
      }, 500);
    }
  }

  $(document).ready(function(){
  	uniteController.init();
  });
});