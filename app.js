var express = require('express');
var path = require('path');
var app = express();

app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname,'/')));

app.get('/', function(req,res){
  res.render('index');
  //회원가입 페이지로 접근

});
// app.get('/main', (req, res) => {
//   res.render('main',data)
// });
app.get('/main', (req, res) => {
  res.render('main', {
  })
});
app.listen(3000, function(){
  console.log('Server On!');
});