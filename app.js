var express = require('express');
var path = require('path');
var app = express();
var http = require('http');
var fs = require('fs');
var url = require('url');


app.use(express.static(path.join(__dirname, '/')));
 

app.listen(3000, function(){
  console.log('Server On!');
});