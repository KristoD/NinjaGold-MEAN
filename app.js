var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ninja_gold');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/ninja-gold-app/dist'));

var gameSchema = mongoose.Schema({
    gold : Number
});

var Game = mongoose.model('Game', gameSchema);

// app.get('/game', function(req, res) {
//     Game.find({}, function(err, game) {
//         if(err) {
//             res.json({message: 'Error', error: err});
//         } else {
//             res.json({message: 'Success', data: game});
//         }
//     });
// });

app.get('/createGame', function(req, res) {
    Game.create({gold: 0}, function(err, game) {
        if(err) {
            res.json({message: 'Error', error: err});
        } else {
            res.json({message: 'Success', data: game});
        }
    });
});

app.get('/updateGame/:id/:gold', function(req, res) {
    Game.findByIdAndUpdate(req.params.id, {gold: req.params.gold}, function(err, game) {
        if(err) {
            res.json({message: 'Error', error: err});
        } else {
            res.json({message: 'Success', data: game});
        }
    });
})

app.get('/removeGame', function(req, res) {
    Game.remove({}, function(err) {
        if(err) {
            res.json({message: 'Error', error: err});
        } else {
            res.json({message: 'Success'});
        }
    });
});

app.listen(8000, function() {
    console.log('Server listening on port 8000...');
});