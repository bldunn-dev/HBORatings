var fs = require('fs');
var request = require('sync-request');

var hboUrl = 'http://catalog.lv3.hbogo.com';
var quickLinkPath = '/apps/mediacatalog/rest/quicklinkService/HBO/quicklink/MO.json'

// make first call to get current URL for movies
var quickLinkResult = request('GET', hboUrl + quickLinkPath);
var jsonQuickLink = JSON.parse(quickLinkResult.getBody('utf8'));

var moviesUriPath = jsonQuickLink.response.body.quicklinks.quicklinkElement[0].relativeUriPath;

var moviesResult = request('GET', hboUrl + moviesUriPath + '.json');
var jsonMovies = JSON.parse(moviesResult.getBody('utf8'));
var movieArray = jsonMovies.response.body.productResponses.featureResponse;
var movieArrayString = JSON.stringify(movieArray);

fs.writeFile('HboMovies.json', movieArrayString, function(err){
  if (err) {
    return console.log(err);
  }
  console.log('HboMovies.json was saved')
});
