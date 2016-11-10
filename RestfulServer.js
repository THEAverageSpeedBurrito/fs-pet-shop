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

  if(index < 0 || index > pets.length){
    res.sendStatus(404);
  }

  res.send(pets[index]);
});

app.post('/pets', function(req, res) {
  var newPet = {
    name: req.body.name || 'Nameless Creature',
    age: req.body.age || 'Immortal',
    kind: req.body.kind || 'I have no kind :(',
  };

  pets.push(newPet);
  res.send(newPet);
});

app.put('/pets/:id', function(req, res) {
  var index = parseInt(req.params.id);

  if(index < 0 || index > pets.length){
    res.sendStatus(404);
  }

  var newPet = {
    name: req.body.name || 'Lacks an identity',
    age: req.body.age || 'Immortal',
    kind: req.body.kind || 'Liger?',
  };

  pets[index] = newPet;
  res.send(newPet);
});

app.delete('/pets/:id', function(req, res) {
  var index = parseInt(req.params.id);

  if(index < 0 || index > pets.length){
    res.sendStatus(404);
  }

  pets.splice(index, 1);
  res.send(pets);
});

app.patch('/pets/:id', function(req, res) {
  var index = parseInt(req.params.id);

  if(index < 0 || index > pets.length){
    res.sendStatus(404);
  }

  var newPet = {
    name: req.body.name || pets[index].name,
    age: req.body.age || pets[index].age,
    kind: req.body.kind || pets[index].kind,
  };

  pets[index] = newPet;
  res.send(pets[index]);
});

app.listen(port, function() {
  console.log('Listening on port 8000');
});
