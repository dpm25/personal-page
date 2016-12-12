var express = require('express');
var countryRouter = express.Router();

var router = function(nav) {
    countryRouter.route('/')
        .get(function(req, res) {
            res.render('country-widget', {
                nav: nav
            })
        });

      return countryRouter;
}

module.exports = router;
