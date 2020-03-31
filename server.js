// Get our dependencies
var express = require("express");
var app = express();
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "applicationuser",
  password: process.env.DB_PASS || "applicationuser",
  database: process.env.DB_NAME || "movie_db"
});

connection.connect();

//Testing endpoint
app.get("/", function(req, res) {
  res.status(200).json({ response: "hello" });
});

// Implement the movies API endpoint
function getMovies(callback) {
  connection.query("SELECT * FROM movie_db.moviereview", function(err, rows) {
    callback(err, rows);
  });
}

app.get("/movies", function(req, res, next) {
  getMovies(function(err, moviesResult) {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      if (moviesResult) {
        res.status(200).json(moviesResult);
      } else {
        res.status(409).json({ message: "Movies not found" });
      }
    }
  });
});

// Implement the reviewers API endpoint
function getReviewers(callback) {
  connection.query("SELECT * FROM movie_db.reviewer", function(err, rows) {
    callback(err, rows);
  });
}

app.get("/reviewers", function(req, res, next) {
  getReviewers(function(err, authors) {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      if (authors) {
        res.status(200).json(authors);
      } else {
        res.status(409).json({ message: "Authors not found" });
      }
    }
  });
});

// Implement the publications API endpoint
function getPublications(callback) {
  connection.query("SELECT * FROM movie_db.publication", function(err, rows) {
    callback(err, rows);
  });
}

app.get("/publications", function(req, res, next) {
  getPublications(function(err, publications) {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      if (publications) {
        res.status(200).json(publications);
      } else {
        res.status(409).json({ message: "Publications not found" });
      }
    }
  });
});

// Implement the pending reviews API endpoint
app.get("/pending", function(req, res) {
  var pending = [
    {
      title: "Superman: Homecoming",
      release: "2017",
      score: 10,
      reviewer: "Chris Harris",
      publication: "International Movie Critic"
    },
    {
      title: "Wonder Woman",
      release: "2017",
      score: 8,
      reviewer: "Martin Thomas",
      publication: "TheOne"
    },
    {
      title: "Doctor Strange",
      release: "2016",
      score: 7,
      reviewer: "Anthony Miller",
      publication: "ComicBookHero.com"
    }
  ];
  res.json(pending);
});
console.log("server listening through port: " + process.env.PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(process.env.PORT || 3000);
module.exports = app;
