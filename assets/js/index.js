import { RestModule } from './rest'

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
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
};

ready(scrollMe);

let el = document.getElementById("contact-form");
el.addEventListener("submit", (e) => {
    e.preventDefault();

    let email = document.getElementById('inputEmail').value;
    let comment = document.getElementById('comment').value;

    let params = 'inputEmail=' + email + '&' + 'comment=' + comment;
    console.log(params);
    let restModule = new RestModule();
    restModule.rest('POST', '/mailme', params, (err, response) => {
        if (err) {
            console.log(err);
        } else {
            console.log('success');
            el.outerHTML = 'Got it...'
        }
    });
});
