var AppModule = function () {
    const keys = {37: 1, 38: 1, 39: 1, 40: 1};
    const pageNav = document.querySelector('.page-nav');
    const menuOpen = document.querySelector('.page-header__menu-open');
    const menuClose = document.querySelector('.page-nav__close-btn');
    const pageHeader = document.querySelector('.page-header');
    const menuItem = document.querySelectorAll('.page-nav__link');
    const form = document.querySelector('.form');
    const formInputs = document.querySelectorAll('.form input, .form textarea');
    const sections = document.querySelectorAll('.section');

    const pageHeaderHeight = pageHeader.offsetHeight;
    const windowWidth = window.innerWidth;
    const scrollTop = window.pageYOffset;


    function mailValid(email) {
        return email.match(/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,4})$/) != null;
    }

    function menuOpenFun() {
        menuOpen.addEventListener('click', () => {
            pageNav.classList.toggle('open');
            disableScroll();
            window.addEventListener('touchmove', (event) => {
                event.preventDefault();
            })
        });
    }

    function closeMenu() {
        menuClose.addEventListener('click', () => {
            pageNav.classList.remove('open');
            enableScroll();
            window.removeEventListener('touchmove', function() {

            });
        });
    }

    function goToTop() {

        $('.page-footer__up-btn').on('click', () => {
            $('html,body').animate({scrollTop: 0}, 1000);
        });
    }

    function stickyMenu() {
        if (windowWidth > 992) {
            $(window).on('scroll', () => {
                const scrollTop = window.pageYOffset;
                if (scrollTop >= pageHeaderHeight) {
                    pageNav.classList.add('sticky');
                } else {
                    pageNav.classList.remove('sticky')
                }

            });
        }
    }

    function menuScroll() {

        menuItem.forEach((element) => {
            element.addEventListener('click', () => {
                pageNav.classList.remove('open');
                let elementId = element.getAttribute('href');
                $("html, body").animate({
                    scrollTop: $(elementId).offset().top - 80
                }, 1000);
            });
        });

        window.addEventListener('scroll', function () {
            const scrollTop = window.pageYOffset;

            sections.forEach(element => {
                const elementScrollTop = element.offsetTop;
                const elementId = element.getAttribute('id');

                if (scrollTop >= elementScrollTop) {
                    const currentMenuItem = document.querySelector('.page-nav__link[data-id=' + elementId + ']');
                    const menuItems = document.querySelectorAll('.page-nav__link');

                    menuItems.forEach(element => {
                        element.classList.remove('select');
                    });

                    currentMenuItem.classList.add('select');
                }

            });


        });


    }

    function formValidation() {
        formInputs.forEach((element) => {
            element.addEventListener('blur', () => {
                let value = element.value;
                let nameAttr = element.getAttribute('name');

                if (nameAttr === 'email') {
                    if (!mailValid(value)) {
                        element.classList.add('invalid');
                    } else {
                        element.classList.remove('invalid');
                    }
                } else {
                    if (value.length < 3) {
                        element.classList.add('invalid');
                    } else {
                        element.classList.remove('invalid');
                    }
                }
            });
        });


        form.addEventListener('submit', () => {
            let status = true;
            formInputs.forEach((element) => {
                element.dispatchEvent('click');

                if (element.classList.contains('invalid')) {
                    status = false;
                }
            });

            if (status) {
                return true;
            } else {
                return false;
            }
        });

    }

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

    function animation() {
        //Header
        var socialItems = $('.page-header__social-item');
        var socialItemsArray = [].slice.call(socialItems);
        var resumeRight = $('.resume .item.item--right');
        var resumeRightArray = [].slice.call(resumeRight);
        var resumeLeft = $('.resume .item.item--left');
        var resumeLeftArray = [].slice.call(resumeLeft);
        var works = $('.works__item-container');
        var worksArray = [].slice.call(works);

        var timeOut = 0;
        var timeLeft = 200;


        $('.page-header__heading').addClass('animated fadeInUp');
        setTimeout(function () {
            $('.page-header__subheading').addClass('animated fadeInUp')
        }, 500);
        setTimeout(function () {
            var timeOut = 0;
            socialItemsArray.forEach(function (element) {
                setTimeout(function () {
                    $(element).addClass('animated bounceIn');
                }, timeOut);
                timeOut += 200;
            });
        }, 1000);

        (function () {
            var timeOut = 0;
            var timeLeft = 200;
            resumeRightArray.forEach(function (element) {
                setTimeout(function () {
                    $(element).waypoint(function () {
                        $(element).addClass('animated fadeInRight');
                    }, {offset: '100%'});
                }, timeOut);
                timeOut += 500;
            });

            resumeLeftArray.forEach(function (element) {
                setTimeout(function () {
                    var timeLeft = 200;
                    $(element).waypoint(function () {
                        $(element).addClass('animated fadeInLeft');
                    }, {offset: '100%'});
                }, timeLeft);
                timeLeft += 500;
            })
        })();

        worksArray.forEach(function (element) {
            $(element).waypoint(function () {
                $(element).find('.works__image').addClass('animated fadeInLeft');
                $(element).find('.works__item-content').addClass('animated fadeInRight');

            },  {offset: '100%'});
        });


    }

    function init() {
        menuOpenFun();
        closeMenu();
        goToTop();
        stickyMenu();
        menuScroll();
        formValidation();
    }

    return {
        init: init
    }
}();


$(window).on('load', function () {
    AppModule.init();
});











