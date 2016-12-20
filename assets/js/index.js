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

document.getElementById("contact-form").addEventListener("submit", (e) => {
    if (e.preventDefault) {
        e.preventDefault();
    }

    let email = document.getElementById('inputEmail').value;
    let comment = document.getElementById('comment').value;

    let params = 'inputEmail=' + email + '&' + 'comment=' + comment;
    console.log(params);
    let restModule = new RestModule();
    restModule.rest('POST', '/mailme', params, (err, response) => {
        let el = document.getElementById('email-response-message');
        let contactForm = document.getElementById("contact-form");
        contactForm.reset();
        if (err) {
            el.innerHTML = '<p><b>Oh no...something went wrong.</b></p>'
        } else {
            console.log('success');
            el.innerHTML = '<p><b>Got it...Thanks for reaching out!</b></p>'
        }
    });
});
