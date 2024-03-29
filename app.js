var http = require('http');
var fs = require('fs');
var mongoose = require("mongoose");
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("./config/passport");
var app = express();

// DB setting
// 사용 중단이 뜨는 DB오류가 뜰경우 아래 코드 3줄 입력
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true);
mongoose.connect(process.env.MONGO_DB);
// mongoose의 db object를 가져와 db 변수에 넣는 과정, DB와 관련된 이벤트 리스너 함수가 있음.
var db = mongoose.connection;

// DB가 성공적으로 연결될 경우 확인 메세지, DB연결은 앱이 실행되면 단 한번만 일어나는 이벤트이므로 once 함수를 사용
db.once("open",function(){
  console.log("DB connected");
});

// DB가 에러날 경우 에러 처리, DB에러가 난 후에도 계속 에러가 날 수 있으므로 on 함수 사용
db.on("error",function(err){
  console.log("DB ERROR : ", err);
});

// Other Settings
app.set("view engine", 'ejs');
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({secret:"MySecret", resave:true, saveUninitialized:true}));

// Passport // 2
app.use(passport.initialize());
app.use(passport.session()); 

// Custom Middlewares // 3
app.use(function(req,res,next){
 res.locals.isAuthenticated = req.isAuthenticated();
 res.locals.currentUser = req.user;
 next();
})

// Routes
app.use("/", require("./routes/home"));
app.use("/contacts", require("./routes/contacts"));
app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));

app.listen(3000, function(){
  console.log('Server On!');
});

