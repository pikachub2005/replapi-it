# string-codec

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Encoder/Decoder of various algorithm

## Installation

via [npm (node package manager)](http://github.com/npm/npm)

    $ npm install string-codec

## Usage Example

Require package:

    var codec = require('string-codec');

Encode to Base64:

    codec.encoder('hello','base64');
    // => 'aGVsbG8='

Decode from Base64:

    codec.decoder('aGVsbG8=','base64');
    // => 'hello'

Encode Buffer to Base64:

    buffer = new Buffer('hello');
    // => <Buffer 68 65 6c 6c 6f>
    encbuf = codec.bufferEncoder(buffer,'base64');
    // => <Buffer 61 47 56 73 62 47 38 3d>
    encbuf.toString();
    // => 'aGVsbG8='
    
    decbuf = codec.bufferDecoder(encbuf,'base64');
    // => <Buffer 68 65 6c 6c 6f>
    decbuf.toString();
    // => 'hello'

List supported algorithm:

    var codec = require('string-codec');
    
    // list array of encoding algorithm
    codec.ENC_ALGOS
    // => ["hex","ascii","base64","base85","z85","ascii85","base91","rot5",
           "rot13", "rot18", "rot47","rev","crc1","crc8","crc16","crc24",
           "crc32","adler32","url","unixtime","lower","upper","punycode", etc.
    
    // list array of decoding algorithm
    codec.DEC_ALGOS
    // => ["hex","ascii","base64","base85","z85","ascii85","base91","rot5",
           "rot13","rot18","rot47","rev","url","unixtime","punycode", etc.

## API

__encoder(String input, String algorithm)__

encode input with specified algorithm

__bufferEncoder(Buffer input, String algorithm)__

encode input buffer with specified algorithm

__decoder(String input, String algorithm)__

decode input with specified algorithm

__bufferDecoder(Buffer input, String algorithm)__

decode input buffer with specified algorithm

__ENC_ALGOS__

list supported encoding algorithm

__ENC_HASHES__

list supported hash algorithm

__ENC_ALL__

list all supported encoding algorithm (ENC_ALGOS + ENC_HASHES)

__DEC_ALGOS__

list supported decoding algorithm

__DEC_HASHES__

list supported hash decryption algorithm

__DEC_ALL__

list all supported decoding algorithm (DEC_ALGOS + DEC_HASHES)

## Supported specifications

### encoder / bufferEncoder

__encoder__ requires string input and outputs string

__bufferEncoder__ requires Buffer input and outputs Buffer

|algorithm|input|output|
|:--|:--|:--|
|hex|string|hex string|
|ascii|hex string|string|
|unixtime|date string|unix timestamp|
|rot5/rot13/rot18/rot47<br>rev (reverse string)<br>url (url encoding)<br>lower<br>upper<br>punycode|string|string|
|base64<br>base85 (z85)<br>ascii85<br>base91<br>crc1/crc8/crc16/crc24/crc32<br>adler32<br>md4<br>md5<br>sha<br>sha1<br>sha224<br>sha256<br>sha384<br>sha512<br>rmd160<br>whirlpool|string<br>or<br>Buffer|string<br>or<br>Buffer|

### decode / bufferDecoder

__decoder__ requires string input and outputs string

__bufferDecoder__ requires Buffer input and outputs Buffer

|algorithm|input|output|
|:--|:--|:--|
|hex|hex string|string|
|ascii|string|hex string|
|unixtime|unix timestamp|date string|
|rot5/rot13/rot18/rot47<br>rev<br>url<br>punycode|string|string|
|base64<br>base85 (z85)<br>ascii85<br>base91<br>md5|string<br>or<br>Buffer|string<br>or<br>Buffer|

### Input hex string

Accept hex string prefixed with '0x' or separated by a colon (:)

    codec.decoder('616263','hex');
    // => abc
    codec.decoder('0x616263','hex');
    // => abc
    codec.decoder('61:62:63','hex');
    // => abc
    codec.decoder('0x61:62:63','hex');
    // => abc

## Running tests

    $ git clone https://github.com/knjcode/string-codec.git
    $ cd string-codec
    $ npm install
    $ npm test

## Acknowledgements

- @_rintaro_f
- @inaz2
- basE91 based on [mscdex/base91.js](https://github.com/mscdex/base91.js)
- Ascii85(base85)/z85(ZeroMQ) [huandu/node-ascii85](https://github.com/huandu/node-ascii85)
- rot5/rot13/rot18/rot47 [schnittstabil/caesar-salad](https://github.com/schnittstabil/caesar-salad)
- crc1/crc8/crc16/crc24/crc32 [alexgorbatchev/node-crc](https://github.com/alexgorbatchev/node-crc)
- adler32 [SheetJS/js-adler32](https://github.com/SheetJS/js-adler32)
- MD5 decrypter [MD5-hash.com](http://www.md5-hash.com)

[npm-url]: https://npmjs.org/package/string-codec
[npm-image]: https://badge.fury.io/js/string-codec.svg
[travis-url]: https://travis-ci.org/knjcode/string-codec
[travis-image]: https://travis-ci.org/knjcode/string-codec.svg?branch=master
