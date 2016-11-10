'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var morgan = require('morgan');
app.use(morgan('short'));

var port = 8000;
var pets = [{ "name": "Cornflake", "age": 3, "kind": "parakeet"}, { "name": "martin", "age": 4, "kind": "dalmation"}];

app.use(express.static('public'));

app.get('/pets', function(req, res) {
  res.send(pets);
});

app.get('/pets/:id', function(req, res) {
  var index = parseInt(req.params.id);
  res.send(pets[index]);
});

app.post('/pets', function(req, res) {
  var newPet = {
    name: req.body.name,
    age: req.body.age,
    kind: req.body.kind,
  };

  pets.push(newPet);
  res.send(newPet);
});

app.put('/pets/:id', function(req, res) {
  var index = parseInt(req.params.id);

  var newPet = {
    name: req.body.name,
    age: req.body.age,
    kind: req.body.kind,
  };

  pets[index] = newPet;
  res.send(newPet);
});

app.listen(port, function() {
  console.log('Listening on port 8000');
});
