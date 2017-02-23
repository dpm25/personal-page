let express = require('express');
let countryRouter = express.Router();

let router = function(nav) {
    countryRouter.route('/')
        .get(function(req, res) {
            res.render('country-widget', {
                nav: nav
            })
        });
      return countryRouter;
}

module.exports = router;
