const juri = require("juri")();
const codec = require('string-codec');
var ss = require('seededshuffle');

const codec_algorithms = [ "hex", "base64", "ascii85","base91","rot5", "rot13", "rot18", "rot47", "rev", "url" ,"punycode" ];

function set_algorithm(algorithm){
  algorithm = codec_algorithms.indexOf(algorithm)>-1 ? algorithm : 'base64';
  return algorithm;
}

function encode(str, algorithm, salt, remove_padding){
  //ensure remove_padding values set
  remove_padding = remove_padding===undefined ? true : remove_padding;
  //set right algorithm
  algorithm = set_algorithm(algorithm);
  //ensure salt is string
  salt = String(salt) || 'changeme';
  //reject if string not entered
  if(typeof str !== 'string'){ throw new Error("String Value required."); }

  //encode string with given algorithm
  str = codec.encoder( str, algorithm );
  //remove padding for base64 encoding
  if(remove_padding && algorithm=='base64'){ str = str.replace(/=+$/,''); }
  //shuffle string chars using salt
  str = ss.shuffle(str.split(''),salt,true).join('');

  return  str;
}

function decode(str, algorithm, salt){
  //set right algorithm
  algorithm = set_algorithm(algorithm);
  //ensure salt is string
  salt = String(salt) || 'changeme';
  //reject if string not entered
  if(typeof str !== 'string'){ throw new Error("String Value required."); }

  //unshuffle string using salt
  str = ss.unshuffle(str.split(''),salt,true).join('');
  //decode string by given algorithm
  str = codec.decoder( str, algorithm );

  return str;
}

function encode_object(object, algorithm, salt, remove_padding){

  if(typeof object !== 'object'){ throw new Error("You can only encode objects using this method"); }

  var str = juri.encode(object);
  // console.log(str, str.length)
  str = encode(str, algorithm, salt, remove_padding);
  // console.log(str);
  return str;
}

function decode_object(string, algorithm, salt, remove_padding){

  if(typeof string !== 'string'){ throw new Error("String Value required."); }

  var object = {};

  try{
    string = decode(string, algorithm, salt, remove_padding);
    object = juri.decode(string);
  }
  catch(e){
    object = {
      ':ERROR:' : {
        code : 403,
        msg : "Error decoding String tinto object!"
      }
    };
  }

  return object;

}

module.exports = {
  encode : encode,
  decode : decode,
  encode_object : encode_object,
  decode_object : decode_object
}
