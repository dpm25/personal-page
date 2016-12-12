function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState != 'loading')
                fn();
        });
    }
}

 
function scrollMe() {
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
}

ready(scrollMe);
