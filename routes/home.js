var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
    res.render("home/index");
    // res.render("home/main");
});
router.get("/main", function(req, res){
    // res.render("/home/index");
    res.render("home/main");
});

module.exports = router;