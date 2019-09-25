var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
    res.render("home/main");
    // res.render("home/main");
});


module.exports = router;