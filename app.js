const express = require('express');
const bodyParser = require('body-parser');
const app     = express();
const path    = require('path');
const exphbs  = require('express-handlebars'); 
const mongoose = require('mongoose');

const methodOverride = require('method-override')
const upload = require('express-fileupload');
var session = require('express-session');
var flash = require('connect-flash');
const  {mongoDbUrl}= require('./config/database');

const passport = require('passport');

mongoose.connect(mongoDbUrl,{useNewUrlParser: true}).then((db)=>{
    console.log('connect');


}).catch(error=> console.log(error));

 

//set view engine

const {select,generateTime} = require('./helpers/handlebars-helpers');

app.engine('handlebars',exphbs({defaultLayout: 'home',helpers:{select: select,generateTime: generateTime}}));
app.set('view engine','handlebars');



// Using Static

app.use(express.static(path.join(__dirname, 'public')));


//upload middleware
app.use(upload());


//body parser

//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());




  //app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
/*app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json({ type: '*' })); 

  app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
*/



// override with POST having ?_method=PUT
app.use(methodOverride('_method'));


app.use(session({
     secret:'amgadhassan123ilovenodejs',
     resave: true,
     saveUninitialized: true
}));
app.use(flash());

// PASSPORT

app.use(passport.initialize());
app.use(passport.session());


app.use((req,res,next)=>{
  res.locals.user = req.user || null;
  res.locals.success_message = req.flash('success_message');

  res.locals.error_message = req.flash('error_message');

  res.locals.form_errors = req.flash('form_errors');

  res.locals.error = req.flash('error');
  next();
});


//load routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');


//use routes
app.use('/',home);
app.use('/admin',admin);
app.use('/admin/posts',posts);
app.use('/admin/categories',categories);




app.listen(4000,()=>{
    console.log('listen to 4000');
});