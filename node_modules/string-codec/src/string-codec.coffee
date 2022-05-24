'use strict'

crc = require 'crc'
crypto = require 'crypto'
ascii85 = require 'ascii85'
base91 = require './base91'
caesar = require 'caesar-salad'
adler32 = require 'adler-32'
cheerio = require 'cheerio'
request = require 'sync-request'
punycode = require 'punycode'

version = require('../package.json').version
useragent = 'string-codec ' + version

allencoder = []
encalgos = ['hex', 'ascii', 'base64', 'base85', 'z85', 'ascii85', 'base91',
            'rot5', 'rot13', 'rot18', 'rot47', 'rev', 'crc1', 'crc8', 'crc16',
            'crc24', 'crc32', 'adler32', 'url', 'unixtime', 'lower', 'upper',
            'punycode']
enchashes = ['md4', 'md5', 'sha', 'sha1', 'sha224', 'sha256', 'sha384',
             'sha512', 'rmd160', 'whirlpool']
allenchashes = enchashes.concat(crypto.getHashes())
# dedupe
allenchashes = allenchashes.filter((x, i, self) -> self.indexOf(x) is i)
allencoder = allencoder.concat(encalgos,allenchashes)

alldecoder = []
decalgos = ['hex', 'ascii', 'base64', 'base85', 'z85', 'ascii85', 'base91',
            'rot5', 'rot13', 'rot18', 'rot47', 'rev', 'url', 'unixtime',
            'punycode']
dechashes = ['md5']
alldecoder = alldecoder.concat(decalgos,dechashes)


# hex parse helper
hex_parse = (str) ->
  hex = str.replace(/0x|:/g, '')
  if not (hex.length % 2)
    hex
  else
    false

# rot helper
rotX = (algo) ->
  (str) ->
    caesar[algo].Cipher().crypt(str)

# reverse string
rev = (str) ->
  str.split('').reverse().join('')

# reciprocal cipher helper
recipro = {
  rot5: rotX('ROT5'),
  rot13: rotX('ROT13'),
  rot18: rotX('ROT18'),
  rot47: rotX('ROT47'),
  rev: rev
}

# md5 decrypter
decmd5 = (str) ->
  if str.length isnt 32
    return 'Invalid MD5 hash'

  baseUrl = 'http://www.md5-hash.com/md5-hashing-decrypt/'
  try
    res = request('GET', baseUrl + str,
                  { headers: { 'User-Agent': useragent } })
  catch error
    return error
  $ = cheerio.load res.getBody('utf8')
  ret_str = $('strong.result').text()
  if str is encoder(ret_str,'md5')
    ret_str
  else
    'not found'

# decrypter helper
decrypter = {
  md5: decmd5
}


# string encoder
encoder = (str, algo) ->
  enc = bufferEncoder(new Buffer(str), algo)
  if enc isnt undefined
    enc.toString()
  else
    ""

# buffer encoder
bufferEncoder = (buf, algo) ->
  switch algo
    when 'hex', 'base64'
      new Buffer(buf.toString(algo))
    when 'ascii85'
      new Buffer(ascii85.PostScript.encode(buf))
    when 'base91'
      base91.encode(buf)
    when 'ascii'
      if hex = hex_parse(buf.toString())
        Buffer(hex, 'hex')
    when 'rot5', 'rot13', 'rot18', 'rot47', 'rev'
      new Buffer(recipro[algo](buf.toString()))
    when 'base85', 'z85'
      ascii85.ZeroMQ.encode(buf)
    when 'crc1', 'crc8', 'crc16', 'crc24', 'crc32'
      new Buffer(crc[algo](buf).toString(16), 'ascii')
    when 'adler32'
      new Buffer(adler32.buf(buf).toString(16))
    when 'url'
      new Buffer(encodeURIComponent(buf.toString()))
    when 'unixtime'
      new Buffer((Date.parse(buf.toString())/1000).toString(10))
    when 'lower'
      new Buffer(buf.toString().toLowerCase())
    when 'upper'
      new Buffer(buf.toString().toUpperCase())
    when 'punycode'
      new Buffer(punycode.toASCII(buf.toString()))
    else
      if algo in allenchashes
        new Buffer(crypto.createHash(algo).update(buf).digest('hex'))
      else
        new Buffer('Error: unknown algorithm specified')

# string decoder
decoder = (str, algo) ->
  dec = bufferDecoder(new Buffer(str), algo)
  if dec isnt undefined
    dec.toString()
  else
    ""

# buffer decoder
bufferDecoder = (buf, algo) ->
  switch algo
    when 'hex'
      if hex = hex_parse(buf.toString())
        new Buffer(hex, algo)
    when 'base64'
      new Buffer(buf.toString(), algo)
    when 'ascii85'
      new Buffer(ascii85.decode(buf))
    when 'base91'
      base91.decode(buf)
    when 'ascii'
      new Buffer(buf.toString('hex'))
    when 'rot5', 'rot13', 'rot18', 'rot47', 'rev'
      new Buffer(recipro[algo](buf.toString()))
    when 'base85', 'z85'
      ascii85.ZeroMQ.decode(buf)
    when 'url'
      new Buffer(decodeURIComponent(buf.toString()))
    when 'unixtime'
      new Buffer((new Date(parseInt(buf.toString())*1000)).toString())
    when 'punycode'
      new Buffer(punycode.toUnicode(buf.toString()))
    when 'md5'
      new Buffer(decrypter[algo](buf.toString()))
    else
      new Buffer('Error: unknown algorithm specified')

module.exports =
  encoder:        encoder
  bufferEncoder:  bufferEncoder
  decoder:        decoder
  bufferDecoder:  bufferDecoder
  ENC_ALGOS:      encalgos[..]
  ENC_HASHES:     allenchashes[..]
  ENC_ALL:        allencoder[..]
  DEC_ALGOS:      decalgos[..]
  DEC_HASHES:     dechashes[..]
  DEC_ALL:        alldecoder[..]
