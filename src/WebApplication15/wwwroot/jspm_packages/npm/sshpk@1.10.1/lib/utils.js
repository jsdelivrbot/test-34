/* */ 
(function(Buffer) {
  module.exports = {
    bufferSplit: bufferSplit,
    addRSAMissing: addRSAMissing,
    calculateDSAPublic: calculateDSAPublic,
    mpNormalize: mpNormalize,
    ecNormalize: ecNormalize,
    countZeros: countZeros,
    assertCompatible: assertCompatible,
    isCompatible: isCompatible,
    opensslKeyDeriv: opensslKeyDeriv,
    opensshCipherInfo: opensshCipherInfo
  };
  var assert = require('assert-plus');
  var PrivateKey = require('./private-key');
  var crypto = require('crypto');
  var MAX_CLASS_DEPTH = 3;
  function isCompatible(obj, klass, needVer) {
    if (obj === null || typeof(obj) !== 'object')
      return (false);
    if (needVer === undefined)
      needVer = klass.prototype._sshpkApiVersion;
    if (obj instanceof klass && klass.prototype._sshpkApiVersion[0] == needVer[0])
      return (true);
    var proto = Object.getPrototypeOf(obj);
    var depth = 0;
    while (proto.constructor.name !== klass.name) {
      proto = Object.getPrototypeOf(proto);
      if (!proto || ++depth > MAX_CLASS_DEPTH)
        return (false);
    }
    if (proto.constructor.name !== klass.name)
      return (false);
    var ver = proto._sshpkApiVersion;
    if (ver === undefined)
      ver = klass._oldVersionDetect(obj);
    if (ver[0] != needVer[0] || ver[1] < needVer[1])
      return (false);
    return (true);
  }
  function assertCompatible(obj, klass, needVer, name) {
    if (name === undefined)
      name = 'object';
    assert.ok(obj, name + ' must not be null');
    assert.object(obj, name + ' must be an object');
    if (needVer === undefined)
      needVer = klass.prototype._sshpkApiVersion;
    if (obj instanceof klass && klass.prototype._sshpkApiVersion[0] == needVer[0])
      return;
    var proto = Object.getPrototypeOf(obj);
    var depth = 0;
    while (proto.constructor.name !== klass.name) {
      proto = Object.getPrototypeOf(proto);
      assert.ok(proto && ++depth <= MAX_CLASS_DEPTH, name + ' must be a ' + klass.name + ' instance');
    }
    assert.strictEqual(proto.constructor.name, klass.name, name + ' must be a ' + klass.name + ' instance');
    var ver = proto._sshpkApiVersion;
    if (ver === undefined)
      ver = klass._oldVersionDetect(obj);
    assert.ok(ver[0] == needVer[0] && ver[1] >= needVer[1], name + ' must be compatible with ' + klass.name + ' klass ' + 'version ' + needVer[0] + '.' + needVer[1]);
  }
  var CIPHER_LEN = {
    'des-ede3-cbc': {
      key: 7,
      iv: 8
    },
    'aes-128-cbc': {
      key: 16,
      iv: 16
    }
  };
  var PKCS5_SALT_LEN = 8;
  function opensslKeyDeriv(cipher, salt, passphrase, count) {
    assert.buffer(salt, 'salt');
    assert.buffer(passphrase, 'passphrase');
    assert.number(count, 'iteration count');
    var clen = CIPHER_LEN[cipher];
    assert.object(clen, 'supported cipher');
    salt = salt.slice(0, PKCS5_SALT_LEN);
    var D,
        D_prev,
        bufs;
    var material = new Buffer(0);
    while (material.length < clen.key + clen.iv) {
      bufs = [];
      if (D_prev)
        bufs.push(D_prev);
      bufs.push(passphrase);
      bufs.push(salt);
      D = Buffer.concat(bufs);
      for (var j = 0; j < count; ++j)
        D = crypto.createHash('md5').update(D).digest();
      material = Buffer.concat([material, D]);
      D_prev = D;
    }
    return ({
      key: material.slice(0, clen.key),
      iv: material.slice(clen.key, clen.key + clen.iv)
    });
  }
  function countZeros(buf) {
    var o = 0,
        obit = 8;
    while (o < buf.length) {
      var mask = (1 << obit);
      if ((buf[o] & mask) === mask)
        break;
      obit--;
      if (obit < 0) {
        o++;
        obit = 8;
      }
    }
    return (o * 8 + (8 - obit) - 1);
  }
  function bufferSplit(buf, chr) {
    assert.buffer(buf);
    assert.string(chr);
    var parts = [];
    var lastPart = 0;
    var matches = 0;
    for (var i = 0; i < buf.length; ++i) {
      if (buf[i] === chr.charCodeAt(matches))
        ++matches;
      else if (buf[i] === chr.charCodeAt(0))
        matches = 1;
      else
        matches = 0;
      if (matches >= chr.length) {
        var newPart = i + 1;
        parts.push(buf.slice(lastPart, newPart - matches));
        lastPart = newPart;
        matches = 0;
      }
    }
    if (lastPart <= buf.length)
      parts.push(buf.slice(lastPart, buf.length));
    return (parts);
  }
  function ecNormalize(buf, addZero) {
    assert.buffer(buf);
    if (buf[0] === 0x00 && buf[1] === 0x04) {
      if (addZero)
        return (buf);
      return (buf.slice(1));
    } else if (buf[0] === 0x04) {
      if (!addZero)
        return (buf);
    } else {
      while (buf[0] === 0x00)
        buf = buf.slice(1);
      if (buf[0] === 0x02 || buf[0] === 0x03)
        throw (new Error('Compressed elliptic curve points ' + 'are not supported'));
      if (buf[0] !== 0x04)
        throw (new Error('Not a valid elliptic curve point'));
      if (!addZero)
        return (buf);
    }
    var b = new Buffer(buf.length + 1);
    b[0] = 0x0;
    buf.copy(b, 1);
    return (b);
  }
  function mpNormalize(buf) {
    assert.buffer(buf);
    while (buf.length > 1 && buf[0] === 0x00 && (buf[1] & 0x80) === 0x00)
      buf = buf.slice(1);
    if ((buf[0] & 0x80) === 0x80) {
      var b = new Buffer(buf.length + 1);
      b[0] = 0x00;
      buf.copy(b, 1);
      buf = b;
    }
    return (buf);
  }
  function bigintToMpBuf(bigint) {
    var buf = new Buffer(bigint.toByteArray());
    buf = mpNormalize(buf);
    return (buf);
  }
  function calculateDSAPublic(g, p, x) {
    assert.buffer(g);
    assert.buffer(p);
    assert.buffer(x);
    try {
      var bigInt = require('jsbn').BigInteger;
    } catch (e) {
      throw (new Error('To load a PKCS#8 format DSA private key, ' + 'the node jsbn library is required.'));
    }
    g = new bigInt(g);
    p = new bigInt(p);
    x = new bigInt(x);
    var y = g.modPow(x, p);
    var ybuf = bigintToMpBuf(y);
    return (ybuf);
  }
  function addRSAMissing(key) {
    assert.object(key);
    assertCompatible(key, PrivateKey, [1, 1]);
    try {
      var bigInt = require('jsbn').BigInteger;
    } catch (e) {
      throw (new Error('To write a PEM private key from ' + 'this source, the node jsbn lib is required.'));
    }
    var d = new bigInt(key.part.d.data);
    var buf;
    if (!key.part.dmodp) {
      var p = new bigInt(key.part.p.data);
      var dmodp = d.mod(p.subtract(1));
      buf = bigintToMpBuf(dmodp);
      key.part.dmodp = {
        name: 'dmodp',
        data: buf
      };
      key.parts.push(key.part.dmodp);
    }
    if (!key.part.dmodq) {
      var q = new bigInt(key.part.q.data);
      var dmodq = d.mod(q.subtract(1));
      buf = bigintToMpBuf(dmodq);
      key.part.dmodq = {
        name: 'dmodq',
        data: buf
      };
      key.parts.push(key.part.dmodq);
    }
  }
  function opensshCipherInfo(cipher) {
    var inf = {};
    switch (cipher) {
      case '3des-cbc':
        inf.keySize = 24;
        inf.blockSize = 8;
        inf.opensslName = 'des-ede3-cbc';
        break;
      case 'blowfish-cbc':
        inf.keySize = 16;
        inf.blockSize = 8;
        inf.opensslName = 'bf-cbc';
        break;
      case 'aes128-cbc':
      case 'aes128-ctr':
      case 'aes128-gcm@openssh.com':
        inf.keySize = 16;
        inf.blockSize = 16;
        inf.opensslName = 'aes-128-' + cipher.slice(7, 10);
        break;
      case 'aes192-cbc':
      case 'aes192-ctr':
      case 'aes192-gcm@openssh.com':
        inf.keySize = 24;
        inf.blockSize = 16;
        inf.opensslName = 'aes-192-' + cipher.slice(7, 10);
        break;
      case 'aes256-cbc':
      case 'aes256-ctr':
      case 'aes256-gcm@openssh.com':
        inf.keySize = 32;
        inf.blockSize = 16;
        inf.opensslName = 'aes-256-' + cipher.slice(7, 10);
        break;
      default:
        throw (new Error('Unsupported openssl cipher "' + cipher + '"'));
    }
    return (inf);
  }
})(require('buffer').Buffer);