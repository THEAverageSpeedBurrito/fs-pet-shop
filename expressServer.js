'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var fs = require('fs');
var path = require('path');

//get requests

app.get('/pets/:id', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, petsJSON){
    if(err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);

    if(0 <= id && id < pets.length){
      res.send(pets[id]);
    }

    res.sendStatus(404);

  });
});

app.get('/pets', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, petsJSON){
    if(err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    res.send(JSON.parse(petsJSON));
  });
});


app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('listening on port 3000');
});
