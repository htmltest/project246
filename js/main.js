$(document).ready(function () {

    var menu_height = 140, topMenu = $("#top-menu"), prlx = 1.5;
    if(window.innerWidth <= 992) {
        topMenu = $("#top-menu_mob");
        menu_height = 160;
        prlx = 1.3;
    }

// Bind click handler to menu items
// so we can get a fancy scroll animation

    var lastId,
        topMenuHeight = topMenu.outerHeight() + menu_height,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });
    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 400);
        e.preventDefault();
    });
//  Bind to scroll

    function parallax() {
        var posBG = $(window).scrollTop() / prlx;
        $('.parallax').css({backgroundPosition: 'center -' + posBG + 'px'});
    }
    function activeLink() {

        // Get container scroll position
        var fromTop = $(this).scrollTop() + menu_height + 400;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    }
    activeLink();
    $(window).scroll(function () {
      parallax();
      activeLink();
    });

    $('.js-nav-link-mob').click(
        function() {
            $('#mobileMenu').modal('toggle');
        }
    );


});