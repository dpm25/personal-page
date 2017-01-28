import {
    RestModule
} from './rest'

function ready(fn) {
    if (document.readyState != 'loading') {
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

    // get the host name
    let host = "http://" + window.location.hostname;
    if (host.includes('local')) {
        host += ':3000';
    }
    // get params
    let email = document.getElementById('inputEmail').value;
    let comment = document.getElementById('comment').value;

    let params = 'inputEmail=' + email + '&' + 'comment=' + comment;
    let restModule = new RestModule();
    restModule.rest('POST', host + '/mailme', params, (err, response) => {
        let el = document.getElementById('email-response-message');
        let contactForm = document.getElementById("contact-form");
        contactForm.reset();
        if (err) {
            el.innerHTML = '<p><b>Oh no...something went wrong.</b></p>';
        } else if (response.includes('Accepted')) { // hack: using 202 response code to say email was accepted but already exists in datastore
            el.innerHTML = '<p><b>Looks like you have already submitted your email!</b></p>';
        } else {
            console.log(response);
            el.innerHTML = '<p><b>Got it...Thanks for reaching out!</b></p>';
        }
    });
});
