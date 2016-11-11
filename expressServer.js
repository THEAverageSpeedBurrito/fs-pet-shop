'use strict';

var express = require('express');
var app = express();
var port = 3000;

app.use(express.static('public'));

var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/pets', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, petsJSON){
    if(err) {
      throw err;
    }

    var pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

app.get('/pets/:id', function(req, res) {
  var index = req.params.id;

  fs.readFile('./pets.json', 'utf8', function(err, petsJSON) {
    var pets = JSON.parse(petsJSON);

    if(index >= 0 && index < pets.length){
      res.send(pets[index]);
    }else{
      res.sendStatus(404);
    }
  });
});

app.post('/pets', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if(err) {
      throw err;
    }

    var pets = JSON.parse(data);

    var newPet = {
      age: req.body.age,
      kind: req.body.kind,
      name: req.body.name,
    };

    pets.push(newPet);

    fs.writeFile('./pets.json', pets, function(writeErr) {
      if(writeErr) {
        throw writeErr;
      }

      res.send(pets);
    });
  });
});

app.listen(port, function() {
  console.log('listening on port 3000');
});
