// Get our dependencies
var express = require('express');
var app = express();
var mysql = require("mysql");
var connection = mysql.createConnection({
 host     : process.env.DB_HOST || 'localhost',
 user     : process.env.DB_USER || 'applicationuser',
 password : process.env.DB_PASS || 'applicationuser',
 database : process.env.DB_NAME || 'movie_db'
});

connection.connect();

//Testing endpoint
app.get('/', function(req, res){
  var response = [{response : 'hello'}, {code : '200'}]
  res.json(response);
})

// Implement the movies API endpoint
function getMovies(callback) {    
  connection.query("SELECT * FROM movie_db.moviereview",
      function (err, rows) {
          callback(err, rows); 
      }
  );    
}

app.get('/movies', function(req, res, next) {   
   getMovies(function (err, moviesResult){ 
      //  you might want to do something is err is not null...      
      res.json(moviesResult);

   });
});

// Implement the reviewers API endpoint
app.get('/reviewers', function(req, res){
  var authors = [
    {name : 'Robert Smith', publication : 'The Daily Reviewer', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/angelcolberg/128.jpg'},
    {name: 'Chris Harris', publication : 'International Movie Critic', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/bungiwan/128.jpg'},
    {name: 'Janet Garcia', publication : 'MoviesNow', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/grrr_nl/128.jpg'},
    {name: 'Andrew West', publication : 'MyNextReview', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/d00maz/128.jpg'},
    {name: 'Mindy Lee', publication: 'Movies n\' Games', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/laurengray/128.jpg'},
    {name: 'Martin Thomas', publication : 'TheOne', avatar : 'https://s3.amazonaws.com/uifaces/faces/twitter/karsh/128.jpg'},
    {name: 'Anthony Miller', publication : 'ComicBookHero.com', avatar : 'https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg'}
  ];

  res.json(authors);
})

// Implement the publications API endpoint
app.get('/publications', function(req, res){
  var publications = [
    {name : 'The Daily Reviewer', avatar: 'glyphicon-eye-open'},
    {name : 'International Movie Critic', avatar: 'glyphicon-fire'},
    {name : 'MoviesNow', avatar: 'glyphicon-time'},
    {name : 'MyNextReview', avatar: 'glyphicon-record'},
    {name : 'Movies n\' Games', avatar: 'glyphicon-heart-empty'},
    {name : 'TheOne', avatar : 'glyphicon-globe'},
    {name : 'ComicBookHero.com', avatar : 'glyphicon-flash'}
  ];

  res.json(publications);
})

// Implement the pending reviews API endpoint
app.get('/pending', function(req, res){
  var pending = [
    {title : 'Superman: Homecoming', release: '2017', score: 10, reviewer: 'Chris Harris', publication: 'International Movie Critic'},
    {title : 'Wonder Woman', release: '2017', score: 8, reviewer: 'Martin Thomas', publication : 'TheOne'},
    {title : 'Doctor Strange', release : '2016', score: 7, reviewer: 'Anthony Miller', publication : 'ComicBookHero.com'}
  ]
  res.json(pending);
})
console.log("server listening through port: "+process.env.PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(process.env.PORT || 3000);
module.exports = app;
