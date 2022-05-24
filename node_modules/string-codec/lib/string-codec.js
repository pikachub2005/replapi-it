'use strict';
var adler32, alldecoder, allenchashes, allencoder, ascii85, base91, bufferDecoder, bufferEncoder, caesar, cheerio, crc, crypto, decalgos, dechashes, decmd5, decoder, decrypter, encalgos, enchashes, encoder, hex_parse, punycode, recipro, request, rev, rotX, useragent, version,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

crc = require('crc');

crypto = require('crypto');

ascii85 = require('ascii85');

base91 = require('./base91');

caesar = require('caesar-salad');

adler32 = require('adler-32');

cheerio = require('cheerio');

request = require('sync-request');

punycode = require('punycode');

version = require('../package.json').version;

useragent = 'string-codec ' + version;

allencoder = [];

encalgos = ['hex', 'ascii', 'base64', 'base85', 'z85', 'ascii85', 'base91', 'rot5', 'rot13', 'rot18', 'rot47', 'rev', 'crc1', 'crc8', 'crc16', 'crc24', 'crc32', 'adler32', 'url', 'unixtime', 'lower', 'upper', 'punycode'];

enchashes = ['md4', 'md5', 'sha', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'rmd160', 'whirlpool'];

allenchashes = enchashes.concat(crypto.getHashes());

allenchashes = allenchashes.filter(function(x, i, self) {
  return self.indexOf(x) === i;
});

allencoder = allencoder.concat(encalgos, allenchashes);

alldecoder = [];

decalgos = ['hex', 'ascii', 'base64', 'base85', 'z85', 'ascii85', 'base91', 'rot5', 'rot13', 'rot18', 'rot47', 'rev', 'url', 'unixtime', 'punycode'];

dechashes = ['md5'];

alldecoder = alldecoder.concat(decalgos, dechashes);

hex_parse = function(str) {
  var hex;
  hex = str.replace(/0x|:/g, '');
  if (!(hex.length % 2)) {
    return hex;
  } else {
    return false;
  }
};

rotX = function(algo) {
  return function(str) {
    return caesar[algo].Cipher().crypt(str);
  };
};

rev = function(str) {
  return str.split('').reverse().join('');
};

recipro = {
  rot5: rotX('ROT5'),
  rot13: rotX('ROT13'),
  rot18: rotX('ROT18'),
  rot47: rotX('ROT47'),
  rev: rev
};

decmd5 = function(str) {
  var $, baseUrl, error, res, ret_str;
  if (str.length !== 32) {
    return 'Invalid MD5 hash';
  }
  baseUrl = 'http://www.md5-hash.com/md5-hashing-decrypt/';
  try {
    res = request('GET', baseUrl + str, {
      headers: {
        'User-Agent': useragent
      }
    });
  } catch (error1) {
    error = error1;
    return error;
  }
  $ = cheerio.load(res.getBody('utf8'));
  ret_str = $('strong.result').text();
  if (str === encoder(ret_str, 'md5')) {
    return ret_str;
  } else {
    return 'not found';
  }
};

decrypter = {
  md5: decmd5
};

encoder = function(str, algo) {
  var enc;
  enc = bufferEncoder(new Buffer(str), algo);
  if (enc !== void 0) {
    return enc.toString();
  } else {
    return "";
  }
};

bufferEncoder = function(buf, algo) {
  var hex;
  switch (algo) {
    case 'hex':
    case 'base64':
      return new Buffer(buf.toString(algo));
    case 'ascii85':
      return new Buffer(ascii85.PostScript.encode(buf));
    case 'base91':
      return base91.encode(buf);
    case 'ascii':
      if (hex = hex_parse(buf.toString())) {
        return Buffer(hex, 'hex');
      }
      break;
    case 'rot5':
    case 'rot13':
    case 'rot18':
    case 'rot47':
    case 'rev':
      return new Buffer(recipro[algo](buf.toString()));
    case 'base85':
    case 'z85':
      return ascii85.ZeroMQ.encode(buf);
    case 'crc1':
    case 'crc8':
    case 'crc16':
    case 'crc24':
    case 'crc32':
      return new Buffer(crc[algo](buf).toString(16), 'ascii');
    case 'adler32':
      return new Buffer(adler32.buf(buf).toString(16));
    case 'url':
      return new Buffer(encodeURIComponent(buf.toString()));
    case 'unixtime':
      return new Buffer((Date.parse(buf.toString()) / 1000).toString(10));
    case 'lower':
      return new Buffer(buf.toString().toLowerCase());
    case 'upper':
      return new Buffer(buf.toString().toUpperCase());
    case 'punycode':
      return new Buffer(punycode.toASCII(buf.toString()));
    default:
      if (indexOf.call(allenchashes, algo) >= 0) {
        return new Buffer(crypto.createHash(algo).update(buf).digest('hex'));
      } else {
        return new Buffer('Error: unknown algorithm specified');
      }
  }
};

decoder = function(str, algo) {
  var dec;
  dec = bufferDecoder(new Buffer(str), algo);
  if (dec !== void 0) {
    return dec.toString();
  } else {
    return "";
  }
};

bufferDecoder = function(buf, algo) {
  var hex;
  switch (algo) {
    case 'hex':
      if (hex = hex_parse(buf.toString())) {
        return new Buffer(hex, algo);
      }
      break;
    case 'base64':
      return new Buffer(buf.toString(), algo);
    case 'ascii85':
      return new Buffer(ascii85.decode(buf));
    case 'base91':
      return base91.decode(buf);
    case 'ascii':
      return new Buffer(buf.toString('hex'));
    case 'rot5':
    case 'rot13':
    case 'rot18':
    case 'rot47':
    case 'rev':
      return new Buffer(recipro[algo](buf.toString()));
    case 'base85':
    case 'z85':
      return ascii85.ZeroMQ.decode(buf);
    case 'url':
      return new Buffer(decodeURIComponent(buf.toString()));
    case 'unixtime':
      return new Buffer((new Date(parseInt(buf.toString()) * 1000)).toString());
    case 'punycode':
      return new Buffer(punycode.toUnicode(buf.toString()));
    case 'md5':
      return new Buffer(decrypter[algo](buf.toString()));
    default:
      return new Buffer('Error: unknown algorithm specified');
  }
};

module.exports = {
  encoder: encoder,
  bufferEncoder: bufferEncoder,
  decoder: decoder,
  bufferDecoder: bufferDecoder,
  ENC_ALGOS: encalgos.slice(0),
  ENC_HASHES: allenchashes.slice(0),
  ENC_ALL: allencoder.slice(0),
  DEC_ALGOS: decalgos.slice(0),
  DEC_HASHES: dechashes.slice(0),
  DEC_ALL: alldecoder.slice(0)
};
