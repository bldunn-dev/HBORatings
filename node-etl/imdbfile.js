var fs = require('fs');
var request = require('sync-request');

var omdbUrl = 'http://www.omdbapi.com/';
var movieRatings = []

var callOMDB = function(item) {

  var url = omdbUrl + '?t=' + item.title + '&y=' + item.year;
  var response = request('GET', url);

  if (response.statusCode !== 200) {
    console.log('StatusCode: ' + response.statuscode + ' getting review for ' + item.title);
    return;
  }
  console.log('Getting review for ' + item.title + ' succeeded.')

  var rating = JSON.parse(response.getBody('utf8'));

  var movie = {
    title: item.title,
    year: item.year,
    genre: item.primaryGenre,
    startDate: item.startDate,
    endDate: item.endDate,
    imdbId: rating.imdbID,
    imdbRating: rating.imdbRating,
    metaScore: rating.Metascore,
    rated: rating.Rated,
    runtime: rating.Runtime
  };

  movieRatings.push(movie);
};

var hboMovieArray = JSON.parse(fs.readFileSync('HboMovies.json'));

hboMovieArray.forEach(callOMDB);

var movieRatingsString = JSON.stringify(movieRatings);

fs.writeFile('../movieRatings.json', movieRatingsString, function(err){
  if (err) {
    return console.log(err);
  }
  console.log('movieRatings.json was saved')
});


