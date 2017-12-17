var express = require('express');
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

/** 
 * Code Snippt 1 
 */

/*

// Custom 404 page
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

// Custom 500 page
app.use(function (req, res) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Internal Server Error');
})

*/

/** 
 * Code Snippt 2
 */

/*
app.get('/', function (req, res) {
    res.type('text/plain');
    res.send('Maity\'s Travel Blog');
});

app.get('/about', function (req, res) {
    res.type('text/plain');
    res.send('About Maity\s Travel Blog')
})

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
})

*/

/**
 * Code Snippt 3
 */

var fortunes = [
    "Conquer your fears or they will conquer you",
    "Rivers need springs",
    "Do not fear what you don't know",
    "You will have a pleasant surprise",
    "Whenever possible, keep it simple"
];

// static middleware 
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    res.render('home');
})

app.get('/about', function (req, res) {
    // console.log('request for /about',req);
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about',{fortune : randomFortune})
    console.log('response for /about',res);
})

// catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
})

// 500 error handler (middleware)
app.use(function (req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
})

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
})