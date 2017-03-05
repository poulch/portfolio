(function () {
    function Application() {
        var self = {};

        self.run = function () {
            self.menuOpen();
            self.closeMenu();
            self.goToTop();
            self.sticktyMenu();
        };

        self.menuOpen = function () {
          $('.page-header__menu-open').on('click', function () {
             $('.page-nav').toggleClass('open');
              disableScroll();
              $(window).bind('touchmove', function (e) {
                  e.preventDefault();
              });

          });
        };
        self.closeMenu = function () {
            $('.page-nav__close-btn').on('click', function () {
                console.log('test');
                $('.page-nav').removeClass('open');
                enableScroll();
                $(window).unbind('touchmove');
            });
        };
        self.goToTop = function () {
            $('.page-footer__up-btn').on('click', function () {
                $('html,body').animate({ scrollTop: 0 }, 1000);
            });
        };
        self.sticktyMenu = function () {
            var pageHeaderHeight = $('.page-header').height();

            $(window).on('scroll', function () {
               if ($(window).width() > 992) {
                   var scrollTopValue = $(window).scrollTop();

                   if (scrollTopValue >= pageHeaderHeight) {
                       $('.page-nav').addClass('sticky');
                   } else {
                       $('.page-nav').removeClass('sticky');
                   }
               }

            });
        };
        self.menuScroll = function () {
            var menuItem = $('.page-nav .page-nav__list .page-nav__list-item .page-nav__link ');


            for (var i = 0; i < menuItem.length; i++) {
                var currentElement = $(menuItem).eq(i);
                $(currentElement).on('click', function () {
                    $('.page-nav').removeClass('open');
                    var idLink = $(this).attr('href');


                    $("html, body").animate({
                        scrollTop: $(idLink).offset().top - 80
                    }, 1000);

                });

            }
        };
        self.formValidation = function () {

        };

        return self;
    }


    $(document).ready(function () {
       var App = new Application();
       App.run();
    });


    var keys = {37: 1, 38: 1, 39: 1, 40: 1};
    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }
})();
