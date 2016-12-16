$( document ).ready(function scrollMe() {
    $("#header-nav").click(function() {
        $('html,body').animate({
                scrollTop: $("#navbar-main").offset().top
            },
            'slow');
    });

    $("#about-nav").click(function() {
        $('html,body').animate({
                scrollTop: $("#about").offset().top
            },
            'slow');
    });

    $("#contact-nav").click(function() {
        $('html,body').animate({
                scrollTop: $("#contact").offset().top
            },
            'slow');
    });
});
