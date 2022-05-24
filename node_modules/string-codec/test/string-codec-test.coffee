assert = require 'power-assert'
codec = require '../../lib/string-codec'

encode_testset =
  'hex':
    'abc':'616263'
    'def':'646566'
    'ghi':'676869'
    'あいうえお':'e38182e38184e38186e38188e3818a'
  'ascii':
    '616263':'abc'
    '0x616263':'abc'
    '61:62:63':'abc'
  'base64':
    'abc':'YWJj'
    'def':'ZGVm'
    'ghi':'Z2hp'
  'ascii85':
    'abc':'<~@:E^~>'
  'base91':
    'node.js rules!':'lref5gTT$FQ;C90ohA'
  'rot5':
    'abc123':'abc678'
  'rot13':
    'abc':'nop'
  'rot18':
    'abc123':'nop678'
  'rot47':
    'abc':'234'
  'rev':
    'abc':'cba'
  'z85':
    'abc':'vpAZ'
  'crc1':
    'abc':'26'
  'crc8':
    'abc':'5f'
  'crc16':
    'abc':'9738'
  'crc24':
    'abc':'ba1c7b'
  'crc32':
    'abc':'352441c2'
  'adler32':
    'abc':'24d0127'
  'url':
    'あいうえお':'%E3%81%82%E3%81%84%E3%81%86%E3%81%88%E3%81%8A'
  'unixtime':
    'Sun Feb 22 2015 13:40:00 GMT+0900 (JST)':'1424580000'
  'lower':
    'abcDEF':'abcdef'
  'upper':
    'abcDEF':'ABCDEF'
  'punycode':
    'ドメイン名例.jp':'xn--eckwd4c7cu47r2wf.jp'
  'md4':
    'abc':'a448017aaf21d8525fc10ae87aa6729d'
  'md5':
    'abc':'900150983cd24fb0d6963f7d28e17f72'
  'sha':
    'abc':'0164b8a914cd2a5e74c4f7ff082c4d97f1edf880'
  'sha1':
    'abc':'a9993e364706816aba3e25717850c26c9cd0d89d'
  'sha512':
    'abc':'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f'
  'rmd160':
    'abc':'8eb208f7e05d987a9b044a8e98c6b087f15a0bfc'
  'whirlpool':
    'abc':'4e2448a4c6f486bb16b6562c73b4020bf3043e3a731bce721ae1b303d97e6d4c7181eebdb6c57e277d0e34957114cbd6c797fc9d95d8b582d225292076d4eef5'
  'sha224':
    'abc':'23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7'
  'sha256':
    'abc':'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
  'sha384':
    'abc':'cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7'
  'sha512':
    'abc':'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f'

decode_testset =
  'hex':
    '616263':'abc'
    '646566':'def'
    '676869':'ghi'
    'e38182e38184e38186e38188e3818a':'あいうえお'
  'ascii':
    'abc':'616263'
  'base64':
    'YWJj':'abc'
    'ZGVm':'def'
    'Z2hp':'ghi'
  'ascii85':
    '<~@:E^~>':'abc'
  'base91':
    'lref5gTT$FQ;C90ohA':'node.js rules!'
  'rot5':
    'abc678':'abc123'
  'rot13':
    'nop':'abc'
  'rot18':
    'nop678':'abc123'
  'rot47':
    '234':'abc'
  'rev':
    'cba':'abc'
  'z85':
    'vpAZ':'abc'
  'url':
    '%E3%81%82%E3%81%84%E3%81%86%E3%81%88%E3%81%8A':'あいうえお'
  # depends on local timezone
  # 'unixtime':
  #   '1424580000':'Sun Feb 22 2015 13:40:00 GMT+0900 (JST)'
  'punycode':
    'xn--eckwd4c7cu47r2wf.jp':'ドメイン名例.jp'
  # require internet connection
  # 'md5':
  #   '5d41402abc4b2a76b9719d911017c592':'hello'


describe 'encode test', ->
  for algo, testset of encode_testset
    do (algo, testset) ->
      for key, value of testset
        do (key, value) ->
          it algo + ': ' + key + ' -> ' + value, ->
            assert codec.encoder(key, algo) is value

describe 'decode test', ->
  for algo, testset of decode_testset
    do (algo, testset) ->
      for key, value of testset
        do (key, value) ->
          it algo + ': ' + key + ' -> ' + value, ->
            assert codec.decoder(key, algo) is value

describe 'buffer encode and decode test', ->
  it 'decode and encode binary data to base64', ->
    # base64 encode of EUC-JP string 'これはペンです'
    base64str = 'pLOk7KTPpdql86THpLk='
    eucbuffer = codec.bufferDecoder(new Buffer(base64str),'base64')
    enceucbuf = codec.bufferEncoder(eucbuffer,'base64')
    assert enceucbuf.toString() is 'pLOk7KTPpdql86THpLk='

describe 'list algorithm test', ->
  it 'ENC_ALGOS', ->
    assert.ok codec.ENC_ALGOS.toString().match('hex')
  it 'ENC_HASHES', ->
    assert.ok codec.ENC_HASHES.toString().match('md4')
  it 'ENC_ALL', ->
    assert.ok codec.ENC_ALL.toString().match('hex')
  it 'DEC_ALGOS', ->
    assert.ok codec.DEC_ALGOS.toString().match('hex')
  it 'DEC_HASHES', ->
    assert.ok codec.DEC_HASHES.toString().match('md5')
  it 'DEC_ALL', ->
    assert.ok codec.DEC_ALL.toString().match('hex')

describe 'error test', ->
  it 'encoding error', ->
    assert codec.encoder('abc', 'hoge') is 'Error: unknown algorithm specified'
  it 'decoding error', ->
    assert codec.decoder('abc', 'hoge') is 'Error: unknown algorithm specified'
