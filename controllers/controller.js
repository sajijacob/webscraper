var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request'); // for web-scraping
var cheerio = require('cheerio');

var Comment = require('../models/Comment.js');
var Article = require('../models/Article.js');

 router.get('/', function (req, res){
     //scrape data
res.redirect('/scrape');
 });

 router.get('/articles', function(req, res){
     //sort newest on top
    Article.find().sort({_id: -1})

    .populate('comments')

    .exec(function(err, doc){

        if(err){
            console.log(err);
        }
        else{
            var hbsObject = {articles: doc}
            res.render('index', hbsObject);
        }
    });

 });

 // web scrape route

 router.get('/scrape', function(req, res){

        request('http://www.reuters.com/', function(error, response,html){

            var $ = cheerio.load(html);

            var titlesArray = [];

            $('article.inner').each(function(i, element){

                var result = {};

                result.title = $(this).children('header').children('h2').text().trim() + "";

                result.link = 'http://www.reuters.com' + $(this).children('header').children('h2').children('a').attr('href').trim();

                result.summary = $(this).children('div').tect().trim() + "";

                if(result.title !== "" &&  result.summary !== ""){

                if(titlesArray.indexOf(result.title) == -1){

                    titlesArray.push(result.title);

                    Article.count({ title: result.title}, function (err, test){

                        if(test == 0){

                            var entry = new Article (result);

                           
                                entry.save(function(err, doc){

                                    if (err){
                                        console.log(err);
                                    }

                                    else {
                                        console.log(doc);
                                    }
                                });
                            }
                            else{

                                console.log('not saved to DB')

                            }
                        });
                    }
                            else{
                                console.log('redundant  Content. Not saved to DB.')
                            }
                        }

                            else{
                                console.log('Empty Content,')
                            }
                        
                    });
                    res.redirect('/articles');

                });
            });

            router.post('/add/comment/:id', function(req, res){
                var articleId = req.params.id;
                var commentAuthor = req.body.name;
                var commentContent = req.body.Comment;

                var result = {

                    author: commentAuthor,
                    Content: commentContent
                };

                var entry = new Comment (result);

                entry.save(function(err, doc){
                    if(err) {
                        console.log(err);
                        }
                        else{
                            Article.findOneAndUpdate({'_id': articleId}, {$push: {'comments':doc._id}}, {new: true})
                            .exec(function(err, doc){
                                if(err){
                                    console.log(err);
                                } else{
                                    res.sendStatus(200);
                                }
                            });
                           
                        }
                });

            });

            router.post('/remove/comment/:id', function(req, res){
                var commentId = req.params.id;
                Comment.findIdAndRemove(commentId, function(err, todo){
                    if(err) {
                        console.log(err);
                    }
                    else{
                        res.sendStatus(200);
                    }
                });
            });

        

 module.exports = router;