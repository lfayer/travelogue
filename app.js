var express = require('express');
var json = require('json');
var app = express();
var fs = require('fs');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views','/www/travelogue/views');

// util vars and funcs
app.locals.ucfirst = function(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
};

// routes and what not

app.get('/:destination', function(req, res) {
    var conf_path = __dirname + '/config/'+req.params.destination+'.json';
    // check if config for the trip exists`
    fs.exists(conf_path, function(exists) {
        if (exists) {
            var config;
            // validate JSON format of the trip definition
            try {
                journal = JSON.parse(fs.readFileSync(conf_path, 'utf8'));
            } catch (e) {
                res.render('error',
                     { msg: 'Invalid JSON config for the trip' });
                console.log(e);
            }
                res.render(journal.template || 'index',
                     {  destination: req.params.destination,
                        journal: journal });
        } else {
                res.render('error',
                     { msg: 'Trip journal ' + req.params.destination +' doesn\'t exist' });
        }
    });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});


