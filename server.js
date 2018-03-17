// import { Mongoose } from 'mongoose';

// homework - week 18 .......

// web scrapper

// Node Dependencies
var express = require('express');
var exphbs = require ('express-handlebars');
var bodyParser = require ('body-parser');
var mongoose = require ('mongoose');

var logger = require ('morgan'); // debugging..
var request = require ('request'); // for web-scraping
var cheerio = require ('cheerio'); // for web-scraping


// Initialize Express for debugging & body parsing

var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))

// serve static content

app.use(express.static(process.cwd() + '/public'));


// Express-Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');


//if(precess.env.NODE_ENV == 'production'){

  //  mongoose.connect('92ac58b3-422e-4fdc-8e83-89fd748c5686');
     
//}
//else{
//     // Mongoose.Promise ="Promise";
//     mongoose.connect('mongosedb://localhost/news-scraper');
// //}
// useMongoClient = true;

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/news-scraper", {
  //useMongoClient: true
});

var db = mongoose.connection;

db.on('error', function(){
    console.log('Mongoose Error:', err);
});

var Comment = require('./models/Comment.js');
var Article = require('./models/Article.js');


var router = require('./controllers/controller.js');
app.use('/', router);

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Running on port: ' + port);
});


