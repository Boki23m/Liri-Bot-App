// DEPENDENCIES
// =====================================
// Read and set environment variables
require("dotenv").config();
// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");
// Import the API keys
var keys = require("./keys");
// Import the request, mpment and axios npm package.
var request = require("request");
var axios = require('axios');
var moment = require("moment");
// Import the FS package for read/write.
var fs = require("fs");
// Initialize the spotify API client using our client id and secret
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var input = process.argv[3];

// Commands for liri 
//concert-this, spotify-this-song, movie-this, do-what-it-says
switch (action) {
    case "concert-this":
        getConcert(input);
        break;

    case "spotify-this-song":
        getSong(input);
        break;

    case "movie-this":
        getMovie(input);
        break;

    case "do-what-it-says":
        getRandom();
        break;

    //If no command is entered, this is the default message to user
    default:
        console.log("You must pass an action [concert-this, spotify-this-song, movie-this, do-what-it-says] and a value");
        console.log("Example: node liri.js movie-this Rocky");
}


function getConcert(input) {
    if (!input) {
        input = "Metallica"
        console.log("You have not entered an Artist or Band but...");
    };

    axios.get('https://rest.bandsintown.com/artists/' + input + '/events?app_id=codingbootcamp').then(
        function (response) {
            if (response === undefined) {
                console.log("Artist/Band not found! Please try again.");
            }
            else {
            var bands = response.data;
            //console.log(bands);
            var venueName = bands[0].venue.name;
            var venueCity = bands[0].venue.city;
            var venueRegion = bands[0].venue.region;
            var venueCountry = bands[0].venue.country;
            var timeUTC = bands[0].datetime;
            // LOG--Venue Name
            console.log(input + "'s next show is at: " + venueName + '.');
            // LOG--Venue Location
            console.log("It's going to take place in " + venueCity + ', ' + venueRegion + ', ' + venueCountry + '.');
            // LOG--Date of the event
            // Moment turns timeUTC to MM/DD/YYYY
            var time = moment(timeUTC).format('MM/DD/YYYY');
            console.log('This show is on ' + time);
            }
        }
    )
}
