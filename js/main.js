(function () {
    function Application() {
        var self = {};

        self.run = function () {
            self.menuOpen();
        };

        self.menuOpen = function () {
          $('.page-header__menu-open').on('click', function () {
             $('.page-nav').toggleClass('open');
          });
        };

        return self;
    }


    $(document).ready(function () {
       var App = new Application();
       App.run();
    });
})();
