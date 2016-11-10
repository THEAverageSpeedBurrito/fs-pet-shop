'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

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
    }else{
      res.sendStatus(404);
    }


  });
});

app.get('/pets', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, petsJSON){
    if(err) {
      console.error(err.stack);
      res.sendStatus(500);
    }

    res.send(JSON.parse(petsJSON));
  });
});

// app.post('/pets', function(req, res) {
//   var pet = {
//     name: req.body.name,
//     age: req.body.age,
//     kind: req.body.kind
//   };
//
//   if(!pet){
//     res.sendStatus(400);
//   }
//
//   fs.readFile('./pets.json', 'utf8', function(err, petsJSON) {
//     if(err) {
//       res.sendStatus(500);
//     }
//
//     var data = JSON.parse(petsJSON);
//     data.push(pet);
//
//     fs.writeFile('./pets.json', data, function(writeErr) {
//       if(writeErr) {
//         res.sendStatus(500);
//       }
//
//       res.send(data);
//     });
//   });
// });


app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('listening on port 3000');
});
