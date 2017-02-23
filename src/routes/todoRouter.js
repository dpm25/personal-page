var express = require('express');
var todoRouter = express.Router();

var router = function(nav) {
    todoRouter.route('/')
        .get(function(req, res) {
            res.render('todo', {
                nav: nav
            })
        });
    return todoRouter;
}

module.exports = router;
