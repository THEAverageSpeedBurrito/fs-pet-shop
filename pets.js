"use strict";

var fs = require('fs');
var path = require('path');


var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = path.basename(process.argv[2]);


if(cmd === 'read'){
  fs.readFile('./pets.json', 'utf8', function (err, data) {
    if(err){
      throw err;
    }

    var pets = JSON.parse(data);

    var index = process.argv[3];

    if(pets[index] === undefined){
      console.log(pets);
    }else{
      console.log(pets[index]);
    }


  });
}else if(cmd === 'create'){
  fs.readFile('./pets.json', 'utf8', function (readerr, data) {
    if(readerr) {
      throw readerr;
    }

    var pets = JSON.parse(data);
    var petAge = process.argv[3];
    var petKind = process.argv[4];
    var petName = process.argv[5];

    if(!petAge || !petKind || !petName){
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    var newPet = {
      'age': petAge,
      'kind': petKind,
      'name': petName
    }

    pets.push(newPet);
    var petsJSON = JSON.stringify(pets);

    fs.writeFile('./pets.json', petsJSON, function(writeErr){
      if(writeErr){
        throw writeErr;
      }

      console.log(pets);
    });
  });
}else if(cmd === 'update'){
  fs.readFile('./pets.json', 'utf8', function(err, data){
    if(err){
      throw err;
    }

    var pets = JSON.parse(data);

    var index = process.argv[3];
    var petAge = process.argv[4];
    var petKind = process.argv[5];
    var petName = process.argv[6];

    if(!index || !petAge || !petKind || !petName){
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }

    var updatedPet = {
      'age': petAge,
      'kind': petKind,
      'name': petName
    };

    pets[index] = updatedPet;
    var updatedJSON = JSON.stringify(pets);

    fs.writeFile('./pets.json', updatedJSON, function(writeErr){
      if(writeErr){
        throw writeErr;
      }

      console.log(pets);
    });

  });
}
