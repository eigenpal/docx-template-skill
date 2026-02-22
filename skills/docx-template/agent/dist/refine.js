var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/pizzip/js/base64.js
var require_base64 = __commonJS((exports) => {
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  exports.encode = function(input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  };
  exports.decode = function(input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output += String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output += String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output += String.fromCharCode(chr3);
      }
    }
    return output;
  };
});

// node_modules/pizzip/js/support.js
var require_support = __commonJS((exports) => {
  exports.base64 = true;
  exports.array = true;
  exports.string = true;
  exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
  exports.nodebuffer = typeof Buffer !== "undefined";
  exports.uint8array = typeof Uint8Array !== "undefined";
  if (typeof ArrayBuffer === "undefined") {
    exports.blob = false;
  } else {
    buffer = new ArrayBuffer(0);
    try {
      exports.blob = new Blob([buffer], {
        type: "application/zip"
      }).size === 0;
    } catch (_unused) {
      try {
        Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
        builder = new Builder;
        builder.append(buffer);
        exports.blob = builder.getBlob("application/zip").size === 0;
      } catch (_unused2) {
        exports.blob = false;
      }
    }
  }
  var buffer;
  var Builder;
  var builder;
});

// node_modules/pako/dist/pako.es5.min.js
var require_pako_es5_min = __commonJS((exports, module) => {
  /*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
  (function(t, e) {
    typeof exports == "object" && typeof module != "undefined" ? e(exports) : typeof define == "function" && define.amd ? define(["exports"], e) : e((t = typeof globalThis != "undefined" ? globalThis : t || self).pako = {});
  })(exports, function(t) {
    function e(t2) {
      for (var e2 = t2.length;--e2 >= 0; )
        t2[e2] = 0;
    }
    var a = 256, n = 286, i = 30, r = 15, s = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]), o = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]), l = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]), h = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), d = new Array(576);
    e(d);
    var _ = new Array(60);
    e(_);
    var f = new Array(512);
    e(f);
    var u = new Array(256);
    e(u);
    var c = new Array(29);
    e(c);
    var w, m, b, g = new Array(i);
    function p(t2, e2, a2, n2, i2) {
      this.static_tree = t2, this.extra_bits = e2, this.extra_base = a2, this.elems = n2, this.max_length = i2, this.has_stree = t2 && t2.length;
    }
    function v(t2, e2) {
      this.dyn_tree = t2, this.max_code = 0, this.stat_desc = e2;
    }
    e(g);
    var k = function(t2) {
      return t2 < 256 ? f[t2] : f[256 + (t2 >>> 7)];
    }, y = function(t2, e2) {
      t2.pending_buf[t2.pending++] = 255 & e2, t2.pending_buf[t2.pending++] = e2 >>> 8 & 255;
    }, x = function(t2, e2, a2) {
      t2.bi_valid > 16 - a2 ? (t2.bi_buf |= e2 << t2.bi_valid & 65535, y(t2, t2.bi_buf), t2.bi_buf = e2 >> 16 - t2.bi_valid, t2.bi_valid += a2 - 16) : (t2.bi_buf |= e2 << t2.bi_valid & 65535, t2.bi_valid += a2);
    }, z = function(t2, e2, a2) {
      x(t2, a2[2 * e2], a2[2 * e2 + 1]);
    }, A = function(t2, e2) {
      var a2 = 0;
      do {
        a2 |= 1 & t2, t2 >>>= 1, a2 <<= 1;
      } while (--e2 > 0);
      return a2 >>> 1;
    }, E = function(t2, e2, a2) {
      var n2, i2, s2 = new Array(16), o2 = 0;
      for (n2 = 1;n2 <= r; n2++)
        o2 = o2 + a2[n2 - 1] << 1, s2[n2] = o2;
      for (i2 = 0;i2 <= e2; i2++) {
        var l2 = t2[2 * i2 + 1];
        l2 !== 0 && (t2[2 * i2] = A(s2[l2]++, l2));
      }
    }, R = function(t2) {
      var e2;
      for (e2 = 0;e2 < n; e2++)
        t2.dyn_ltree[2 * e2] = 0;
      for (e2 = 0;e2 < i; e2++)
        t2.dyn_dtree[2 * e2] = 0;
      for (e2 = 0;e2 < 19; e2++)
        t2.bl_tree[2 * e2] = 0;
      t2.dyn_ltree[512] = 1, t2.opt_len = t2.static_len = 0, t2.sym_next = t2.matches = 0;
    }, Z = function(t2) {
      t2.bi_valid > 8 ? y(t2, t2.bi_buf) : t2.bi_valid > 0 && (t2.pending_buf[t2.pending++] = t2.bi_buf), t2.bi_buf = 0, t2.bi_valid = 0;
    }, S = function(t2, e2, a2, n2) {
      var i2 = 2 * e2, r2 = 2 * a2;
      return t2[i2] < t2[r2] || t2[i2] === t2[r2] && n2[e2] <= n2[a2];
    }, U = function(t2, e2, a2) {
      for (var n2 = t2.heap[a2], i2 = a2 << 1;i2 <= t2.heap_len && (i2 < t2.heap_len && S(e2, t2.heap[i2 + 1], t2.heap[i2], t2.depth) && i2++, !S(e2, n2, t2.heap[i2], t2.depth)); )
        t2.heap[a2] = t2.heap[i2], a2 = i2, i2 <<= 1;
      t2.heap[a2] = n2;
    }, D = function(t2, e2, n2) {
      var i2, r2, l2, h2, d2 = 0;
      if (t2.sym_next !== 0)
        do {
          i2 = 255 & t2.pending_buf[t2.sym_buf + d2++], i2 += (255 & t2.pending_buf[t2.sym_buf + d2++]) << 8, r2 = t2.pending_buf[t2.sym_buf + d2++], i2 === 0 ? z(t2, r2, e2) : (l2 = u[r2], z(t2, l2 + a + 1, e2), (h2 = s[l2]) !== 0 && (r2 -= c[l2], x(t2, r2, h2)), i2--, l2 = k(i2), z(t2, l2, n2), (h2 = o[l2]) !== 0 && (i2 -= g[l2], x(t2, i2, h2)));
        } while (d2 < t2.sym_next);
      z(t2, 256, e2);
    }, T = function(t2, e2) {
      var a2, n2, i2, s2 = e2.dyn_tree, o2 = e2.stat_desc.static_tree, l2 = e2.stat_desc.has_stree, h2 = e2.stat_desc.elems, d2 = -1;
      for (t2.heap_len = 0, t2.heap_max = 573, a2 = 0;a2 < h2; a2++)
        s2[2 * a2] !== 0 ? (t2.heap[++t2.heap_len] = d2 = a2, t2.depth[a2] = 0) : s2[2 * a2 + 1] = 0;
      for (;t2.heap_len < 2; )
        s2[2 * (i2 = t2.heap[++t2.heap_len] = d2 < 2 ? ++d2 : 0)] = 1, t2.depth[i2] = 0, t2.opt_len--, l2 && (t2.static_len -= o2[2 * i2 + 1]);
      for (e2.max_code = d2, a2 = t2.heap_len >> 1;a2 >= 1; a2--)
        U(t2, s2, a2);
      i2 = h2;
      do {
        a2 = t2.heap[1], t2.heap[1] = t2.heap[t2.heap_len--], U(t2, s2, 1), n2 = t2.heap[1], t2.heap[--t2.heap_max] = a2, t2.heap[--t2.heap_max] = n2, s2[2 * i2] = s2[2 * a2] + s2[2 * n2], t2.depth[i2] = (t2.depth[a2] >= t2.depth[n2] ? t2.depth[a2] : t2.depth[n2]) + 1, s2[2 * a2 + 1] = s2[2 * n2 + 1] = i2, t2.heap[1] = i2++, U(t2, s2, 1);
      } while (t2.heap_len >= 2);
      t2.heap[--t2.heap_max] = t2.heap[1], function(t3, e3) {
        var a3, n3, i3, s3, o3, l3, h3 = e3.dyn_tree, d3 = e3.max_code, _2 = e3.stat_desc.static_tree, f2 = e3.stat_desc.has_stree, u2 = e3.stat_desc.extra_bits, c2 = e3.stat_desc.extra_base, w2 = e3.stat_desc.max_length, m2 = 0;
        for (s3 = 0;s3 <= r; s3++)
          t3.bl_count[s3] = 0;
        for (h3[2 * t3.heap[t3.heap_max] + 1] = 0, a3 = t3.heap_max + 1;a3 < 573; a3++)
          (s3 = h3[2 * h3[2 * (n3 = t3.heap[a3]) + 1] + 1] + 1) > w2 && (s3 = w2, m2++), h3[2 * n3 + 1] = s3, n3 > d3 || (t3.bl_count[s3]++, o3 = 0, n3 >= c2 && (o3 = u2[n3 - c2]), l3 = h3[2 * n3], t3.opt_len += l3 * (s3 + o3), f2 && (t3.static_len += l3 * (_2[2 * n3 + 1] + o3)));
        if (m2 !== 0) {
          do {
            for (s3 = w2 - 1;t3.bl_count[s3] === 0; )
              s3--;
            t3.bl_count[s3]--, t3.bl_count[s3 + 1] += 2, t3.bl_count[w2]--, m2 -= 2;
          } while (m2 > 0);
          for (s3 = w2;s3 !== 0; s3--)
            for (n3 = t3.bl_count[s3];n3 !== 0; )
              (i3 = t3.heap[--a3]) > d3 || (h3[2 * i3 + 1] !== s3 && (t3.opt_len += (s3 - h3[2 * i3 + 1]) * h3[2 * i3], h3[2 * i3 + 1] = s3), n3--);
        }
      }(t2, e2), E(s2, d2, t2.bl_count);
    }, O = function(t2, e2, a2) {
      var n2, i2, r2 = -1, s2 = e2[1], o2 = 0, l2 = 7, h2 = 4;
      for (s2 === 0 && (l2 = 138, h2 = 3), e2[2 * (a2 + 1) + 1] = 65535, n2 = 0;n2 <= a2; n2++)
        i2 = s2, s2 = e2[2 * (n2 + 1) + 1], ++o2 < l2 && i2 === s2 || (o2 < h2 ? t2.bl_tree[2 * i2] += o2 : i2 !== 0 ? (i2 !== r2 && t2.bl_tree[2 * i2]++, t2.bl_tree[32]++) : o2 <= 10 ? t2.bl_tree[34]++ : t2.bl_tree[36]++, o2 = 0, r2 = i2, s2 === 0 ? (l2 = 138, h2 = 3) : i2 === s2 ? (l2 = 6, h2 = 3) : (l2 = 7, h2 = 4));
    }, I = function(t2, e2, a2) {
      var n2, i2, r2 = -1, s2 = e2[1], o2 = 0, l2 = 7, h2 = 4;
      for (s2 === 0 && (l2 = 138, h2 = 3), n2 = 0;n2 <= a2; n2++)
        if (i2 = s2, s2 = e2[2 * (n2 + 1) + 1], !(++o2 < l2 && i2 === s2)) {
          if (o2 < h2)
            do {
              z(t2, i2, t2.bl_tree);
            } while (--o2 != 0);
          else
            i2 !== 0 ? (i2 !== r2 && (z(t2, i2, t2.bl_tree), o2--), z(t2, 16, t2.bl_tree), x(t2, o2 - 3, 2)) : o2 <= 10 ? (z(t2, 17, t2.bl_tree), x(t2, o2 - 3, 3)) : (z(t2, 18, t2.bl_tree), x(t2, o2 - 11, 7));
          o2 = 0, r2 = i2, s2 === 0 ? (l2 = 138, h2 = 3) : i2 === s2 ? (l2 = 6, h2 = 3) : (l2 = 7, h2 = 4);
        }
    }, F = false, L = function(t2, e2, a2, n2) {
      x(t2, 0 + (n2 ? 1 : 0), 3), Z(t2), y(t2, a2), y(t2, ~a2), a2 && t2.pending_buf.set(t2.window.subarray(e2, e2 + a2), t2.pending), t2.pending += a2;
    }, N = function(t2, e2, n2, i2) {
      var r2, s2, o2 = 0;
      t2.level > 0 ? (t2.strm.data_type === 2 && (t2.strm.data_type = function(t3) {
        var e3, n3 = 4093624447;
        for (e3 = 0;e3 <= 31; e3++, n3 >>>= 1)
          if (1 & n3 && t3.dyn_ltree[2 * e3] !== 0)
            return 0;
        if (t3.dyn_ltree[18] !== 0 || t3.dyn_ltree[20] !== 0 || t3.dyn_ltree[26] !== 0)
          return 1;
        for (e3 = 32;e3 < a; e3++)
          if (t3.dyn_ltree[2 * e3] !== 0)
            return 1;
        return 0;
      }(t2)), T(t2, t2.l_desc), T(t2, t2.d_desc), o2 = function(t3) {
        var e3;
        for (O(t3, t3.dyn_ltree, t3.l_desc.max_code), O(t3, t3.dyn_dtree, t3.d_desc.max_code), T(t3, t3.bl_desc), e3 = 18;e3 >= 3 && t3.bl_tree[2 * h[e3] + 1] === 0; e3--)
          ;
        return t3.opt_len += 3 * (e3 + 1) + 5 + 5 + 4, e3;
      }(t2), r2 = t2.opt_len + 3 + 7 >>> 3, (s2 = t2.static_len + 3 + 7 >>> 3) <= r2 && (r2 = s2)) : r2 = s2 = n2 + 5, n2 + 4 <= r2 && e2 !== -1 ? L(t2, e2, n2, i2) : t2.strategy === 4 || s2 === r2 ? (x(t2, 2 + (i2 ? 1 : 0), 3), D(t2, d, _)) : (x(t2, 4 + (i2 ? 1 : 0), 3), function(t3, e3, a2, n3) {
        var i3;
        for (x(t3, e3 - 257, 5), x(t3, a2 - 1, 5), x(t3, n3 - 4, 4), i3 = 0;i3 < n3; i3++)
          x(t3, t3.bl_tree[2 * h[i3] + 1], 3);
        I(t3, t3.dyn_ltree, e3 - 1), I(t3, t3.dyn_dtree, a2 - 1);
      }(t2, t2.l_desc.max_code + 1, t2.d_desc.max_code + 1, o2 + 1), D(t2, t2.dyn_ltree, t2.dyn_dtree)), R(t2), i2 && Z(t2);
    }, B = { _tr_init: function(t2) {
      F || (function() {
        var t3, e2, a2, h2, v2, k2 = new Array(16);
        for (a2 = 0, h2 = 0;h2 < 28; h2++)
          for (c[h2] = a2, t3 = 0;t3 < 1 << s[h2]; t3++)
            u[a2++] = h2;
        for (u[a2 - 1] = h2, v2 = 0, h2 = 0;h2 < 16; h2++)
          for (g[h2] = v2, t3 = 0;t3 < 1 << o[h2]; t3++)
            f[v2++] = h2;
        for (v2 >>= 7;h2 < i; h2++)
          for (g[h2] = v2 << 7, t3 = 0;t3 < 1 << o[h2] - 7; t3++)
            f[256 + v2++] = h2;
        for (e2 = 0;e2 <= r; e2++)
          k2[e2] = 0;
        for (t3 = 0;t3 <= 143; )
          d[2 * t3 + 1] = 8, t3++, k2[8]++;
        for (;t3 <= 255; )
          d[2 * t3 + 1] = 9, t3++, k2[9]++;
        for (;t3 <= 279; )
          d[2 * t3 + 1] = 7, t3++, k2[7]++;
        for (;t3 <= 287; )
          d[2 * t3 + 1] = 8, t3++, k2[8]++;
        for (E(d, 287, k2), t3 = 0;t3 < i; t3++)
          _[2 * t3 + 1] = 5, _[2 * t3] = A(t3, 5);
        w = new p(d, s, 257, n, r), m = new p(_, o, 0, i, r), b = new p(new Array(0), l, 0, 19, 7);
      }(), F = true), t2.l_desc = new v(t2.dyn_ltree, w), t2.d_desc = new v(t2.dyn_dtree, m), t2.bl_desc = new v(t2.bl_tree, b), t2.bi_buf = 0, t2.bi_valid = 0, R(t2);
    }, _tr_stored_block: L, _tr_flush_block: N, _tr_tally: function(t2, e2, n2) {
      return t2.pending_buf[t2.sym_buf + t2.sym_next++] = e2, t2.pending_buf[t2.sym_buf + t2.sym_next++] = e2 >> 8, t2.pending_buf[t2.sym_buf + t2.sym_next++] = n2, e2 === 0 ? t2.dyn_ltree[2 * n2]++ : (t2.matches++, e2--, t2.dyn_ltree[2 * (u[n2] + a + 1)]++, t2.dyn_dtree[2 * k(e2)]++), t2.sym_next === t2.sym_end;
    }, _tr_align: function(t2) {
      x(t2, 2, 3), z(t2, 256, d), function(t3) {
        t3.bi_valid === 16 ? (y(t3, t3.bi_buf), t3.bi_buf = 0, t3.bi_valid = 0) : t3.bi_valid >= 8 && (t3.pending_buf[t3.pending++] = 255 & t3.bi_buf, t3.bi_buf >>= 8, t3.bi_valid -= 8);
      }(t2);
    } }, C = function(t2, e2, a2, n2) {
      for (var i2 = 65535 & t2 | 0, r2 = t2 >>> 16 & 65535 | 0, s2 = 0;a2 !== 0; ) {
        a2 -= s2 = a2 > 2000 ? 2000 : a2;
        do {
          r2 = r2 + (i2 = i2 + e2[n2++] | 0) | 0;
        } while (--s2);
        i2 %= 65521, r2 %= 65521;
      }
      return i2 | r2 << 16 | 0;
    }, M = new Uint32Array(function() {
      for (var t2, e2 = [], a2 = 0;a2 < 256; a2++) {
        t2 = a2;
        for (var n2 = 0;n2 < 8; n2++)
          t2 = 1 & t2 ? 3988292384 ^ t2 >>> 1 : t2 >>> 1;
        e2[a2] = t2;
      }
      return e2;
    }()), H = function(t2, e2, a2, n2) {
      var i2 = M, r2 = n2 + a2;
      t2 ^= -1;
      for (var s2 = n2;s2 < r2; s2++)
        t2 = t2 >>> 8 ^ i2[255 & (t2 ^ e2[s2])];
      return -1 ^ t2;
    }, j = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" }, K = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_MEM_ERROR: -4, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 }, P = B._tr_init, Y = B._tr_stored_block, G = B._tr_flush_block, X = B._tr_tally, W = B._tr_align, q = K.Z_NO_FLUSH, J = K.Z_PARTIAL_FLUSH, Q = K.Z_FULL_FLUSH, V = K.Z_FINISH, $ = K.Z_BLOCK, tt = K.Z_OK, et = K.Z_STREAM_END, at = K.Z_STREAM_ERROR, nt = K.Z_DATA_ERROR, it = K.Z_BUF_ERROR, rt = K.Z_DEFAULT_COMPRESSION, st = K.Z_FILTERED, ot = K.Z_HUFFMAN_ONLY, lt = K.Z_RLE, ht = K.Z_FIXED, dt = K.Z_DEFAULT_STRATEGY, _t = K.Z_UNKNOWN, ft = K.Z_DEFLATED, ut = 258, ct = 262, wt = 42, mt = 113, bt = 666, gt = function(t2, e2) {
      return t2.msg = j[e2], e2;
    }, pt = function(t2) {
      return 2 * t2 - (t2 > 4 ? 9 : 0);
    }, vt = function(t2) {
      for (var e2 = t2.length;--e2 >= 0; )
        t2[e2] = 0;
    }, kt = function(t2) {
      var e2, a2, n2, i2 = t2.w_size;
      n2 = e2 = t2.hash_size;
      do {
        a2 = t2.head[--n2], t2.head[n2] = a2 >= i2 ? a2 - i2 : 0;
      } while (--e2);
      n2 = e2 = i2;
      do {
        a2 = t2.prev[--n2], t2.prev[n2] = a2 >= i2 ? a2 - i2 : 0;
      } while (--e2);
    }, yt = function(t2, e2, a2) {
      return (e2 << t2.hash_shift ^ a2) & t2.hash_mask;
    }, xt = function(t2) {
      var e2 = t2.state, a2 = e2.pending;
      a2 > t2.avail_out && (a2 = t2.avail_out), a2 !== 0 && (t2.output.set(e2.pending_buf.subarray(e2.pending_out, e2.pending_out + a2), t2.next_out), t2.next_out += a2, e2.pending_out += a2, t2.total_out += a2, t2.avail_out -= a2, e2.pending -= a2, e2.pending === 0 && (e2.pending_out = 0));
    }, zt = function(t2, e2) {
      G(t2, t2.block_start >= 0 ? t2.block_start : -1, t2.strstart - t2.block_start, e2), t2.block_start = t2.strstart, xt(t2.strm);
    }, At = function(t2, e2) {
      t2.pending_buf[t2.pending++] = e2;
    }, Et = function(t2, e2) {
      t2.pending_buf[t2.pending++] = e2 >>> 8 & 255, t2.pending_buf[t2.pending++] = 255 & e2;
    }, Rt = function(t2, e2, a2, n2) {
      var i2 = t2.avail_in;
      return i2 > n2 && (i2 = n2), i2 === 0 ? 0 : (t2.avail_in -= i2, e2.set(t2.input.subarray(t2.next_in, t2.next_in + i2), a2), t2.state.wrap === 1 ? t2.adler = C(t2.adler, e2, i2, a2) : t2.state.wrap === 2 && (t2.adler = H(t2.adler, e2, i2, a2)), t2.next_in += i2, t2.total_in += i2, i2);
    }, Zt = function(t2, e2) {
      var a2, n2, i2 = t2.max_chain_length, r2 = t2.strstart, s2 = t2.prev_length, o2 = t2.nice_match, l2 = t2.strstart > t2.w_size - ct ? t2.strstart - (t2.w_size - ct) : 0, h2 = t2.window, d2 = t2.w_mask, _2 = t2.prev, f2 = t2.strstart + ut, u2 = h2[r2 + s2 - 1], c2 = h2[r2 + s2];
      t2.prev_length >= t2.good_match && (i2 >>= 2), o2 > t2.lookahead && (o2 = t2.lookahead);
      do {
        if (h2[(a2 = e2) + s2] === c2 && h2[a2 + s2 - 1] === u2 && h2[a2] === h2[r2] && h2[++a2] === h2[r2 + 1]) {
          r2 += 2, a2++;
          do {} while (h2[++r2] === h2[++a2] && h2[++r2] === h2[++a2] && h2[++r2] === h2[++a2] && h2[++r2] === h2[++a2] && h2[++r2] === h2[++a2] && h2[++r2] === h2[++a2] && h2[++r2] === h2[++a2] && h2[++r2] === h2[++a2] && r2 < f2);
          if (n2 = ut - (f2 - r2), r2 = f2 - ut, n2 > s2) {
            if (t2.match_start = e2, s2 = n2, n2 >= o2)
              break;
            u2 = h2[r2 + s2 - 1], c2 = h2[r2 + s2];
          }
        }
      } while ((e2 = _2[e2 & d2]) > l2 && --i2 != 0);
      return s2 <= t2.lookahead ? s2 : t2.lookahead;
    }, St = function(t2) {
      var e2, a2, n2, i2 = t2.w_size;
      do {
        if (a2 = t2.window_size - t2.lookahead - t2.strstart, t2.strstart >= i2 + (i2 - ct) && (t2.window.set(t2.window.subarray(i2, i2 + i2 - a2), 0), t2.match_start -= i2, t2.strstart -= i2, t2.block_start -= i2, t2.insert > t2.strstart && (t2.insert = t2.strstart), kt(t2), a2 += i2), t2.strm.avail_in === 0)
          break;
        if (e2 = Rt(t2.strm, t2.window, t2.strstart + t2.lookahead, a2), t2.lookahead += e2, t2.lookahead + t2.insert >= 3)
          for (n2 = t2.strstart - t2.insert, t2.ins_h = t2.window[n2], t2.ins_h = yt(t2, t2.ins_h, t2.window[n2 + 1]);t2.insert && (t2.ins_h = yt(t2, t2.ins_h, t2.window[n2 + 3 - 1]), t2.prev[n2 & t2.w_mask] = t2.head[t2.ins_h], t2.head[t2.ins_h] = n2, n2++, t2.insert--, !(t2.lookahead + t2.insert < 3)); )
            ;
      } while (t2.lookahead < ct && t2.strm.avail_in !== 0);
    }, Ut = function(t2, e2) {
      var a2, n2, i2, r2 = t2.pending_buf_size - 5 > t2.w_size ? t2.w_size : t2.pending_buf_size - 5, s2 = 0, o2 = t2.strm.avail_in;
      do {
        if (a2 = 65535, i2 = t2.bi_valid + 42 >> 3, t2.strm.avail_out < i2)
          break;
        if (i2 = t2.strm.avail_out - i2, a2 > (n2 = t2.strstart - t2.block_start) + t2.strm.avail_in && (a2 = n2 + t2.strm.avail_in), a2 > i2 && (a2 = i2), a2 < r2 && (a2 === 0 && e2 !== V || e2 === q || a2 !== n2 + t2.strm.avail_in))
          break;
        s2 = e2 === V && a2 === n2 + t2.strm.avail_in ? 1 : 0, Y(t2, 0, 0, s2), t2.pending_buf[t2.pending - 4] = a2, t2.pending_buf[t2.pending - 3] = a2 >> 8, t2.pending_buf[t2.pending - 2] = ~a2, t2.pending_buf[t2.pending - 1] = ~a2 >> 8, xt(t2.strm), n2 && (n2 > a2 && (n2 = a2), t2.strm.output.set(t2.window.subarray(t2.block_start, t2.block_start + n2), t2.strm.next_out), t2.strm.next_out += n2, t2.strm.avail_out -= n2, t2.strm.total_out += n2, t2.block_start += n2, a2 -= n2), a2 && (Rt(t2.strm, t2.strm.output, t2.strm.next_out, a2), t2.strm.next_out += a2, t2.strm.avail_out -= a2, t2.strm.total_out += a2);
      } while (s2 === 0);
      return (o2 -= t2.strm.avail_in) && (o2 >= t2.w_size ? (t2.matches = 2, t2.window.set(t2.strm.input.subarray(t2.strm.next_in - t2.w_size, t2.strm.next_in), 0), t2.strstart = t2.w_size, t2.insert = t2.strstart) : (t2.window_size - t2.strstart <= o2 && (t2.strstart -= t2.w_size, t2.window.set(t2.window.subarray(t2.w_size, t2.w_size + t2.strstart), 0), t2.matches < 2 && t2.matches++, t2.insert > t2.strstart && (t2.insert = t2.strstart)), t2.window.set(t2.strm.input.subarray(t2.strm.next_in - o2, t2.strm.next_in), t2.strstart), t2.strstart += o2, t2.insert += o2 > t2.w_size - t2.insert ? t2.w_size - t2.insert : o2), t2.block_start = t2.strstart), t2.high_water < t2.strstart && (t2.high_water = t2.strstart), s2 ? 4 : e2 !== q && e2 !== V && t2.strm.avail_in === 0 && t2.strstart === t2.block_start ? 2 : (i2 = t2.window_size - t2.strstart, t2.strm.avail_in > i2 && t2.block_start >= t2.w_size && (t2.block_start -= t2.w_size, t2.strstart -= t2.w_size, t2.window.set(t2.window.subarray(t2.w_size, t2.w_size + t2.strstart), 0), t2.matches < 2 && t2.matches++, i2 += t2.w_size, t2.insert > t2.strstart && (t2.insert = t2.strstart)), i2 > t2.strm.avail_in && (i2 = t2.strm.avail_in), i2 && (Rt(t2.strm, t2.window, t2.strstart, i2), t2.strstart += i2, t2.insert += i2 > t2.w_size - t2.insert ? t2.w_size - t2.insert : i2), t2.high_water < t2.strstart && (t2.high_water = t2.strstart), i2 = t2.bi_valid + 42 >> 3, r2 = (i2 = t2.pending_buf_size - i2 > 65535 ? 65535 : t2.pending_buf_size - i2) > t2.w_size ? t2.w_size : i2, ((n2 = t2.strstart - t2.block_start) >= r2 || (n2 || e2 === V) && e2 !== q && t2.strm.avail_in === 0 && n2 <= i2) && (a2 = n2 > i2 ? i2 : n2, s2 = e2 === V && t2.strm.avail_in === 0 && a2 === n2 ? 1 : 0, Y(t2, t2.block_start, a2, s2), t2.block_start += a2, xt(t2.strm)), s2 ? 3 : 1);
    }, Dt = function(t2, e2) {
      for (var a2, n2;; ) {
        if (t2.lookahead < ct) {
          if (St(t2), t2.lookahead < ct && e2 === q)
            return 1;
          if (t2.lookahead === 0)
            break;
        }
        if (a2 = 0, t2.lookahead >= 3 && (t2.ins_h = yt(t2, t2.ins_h, t2.window[t2.strstart + 3 - 1]), a2 = t2.prev[t2.strstart & t2.w_mask] = t2.head[t2.ins_h], t2.head[t2.ins_h] = t2.strstart), a2 !== 0 && t2.strstart - a2 <= t2.w_size - ct && (t2.match_length = Zt(t2, a2)), t2.match_length >= 3)
          if (n2 = X(t2, t2.strstart - t2.match_start, t2.match_length - 3), t2.lookahead -= t2.match_length, t2.match_length <= t2.max_lazy_match && t2.lookahead >= 3) {
            t2.match_length--;
            do {
              t2.strstart++, t2.ins_h = yt(t2, t2.ins_h, t2.window[t2.strstart + 3 - 1]), a2 = t2.prev[t2.strstart & t2.w_mask] = t2.head[t2.ins_h], t2.head[t2.ins_h] = t2.strstart;
            } while (--t2.match_length != 0);
            t2.strstart++;
          } else
            t2.strstart += t2.match_length, t2.match_length = 0, t2.ins_h = t2.window[t2.strstart], t2.ins_h = yt(t2, t2.ins_h, t2.window[t2.strstart + 1]);
        else
          n2 = X(t2, 0, t2.window[t2.strstart]), t2.lookahead--, t2.strstart++;
        if (n2 && (zt(t2, false), t2.strm.avail_out === 0))
          return 1;
      }
      return t2.insert = t2.strstart < 2 ? t2.strstart : 2, e2 === V ? (zt(t2, true), t2.strm.avail_out === 0 ? 3 : 4) : t2.sym_next && (zt(t2, false), t2.strm.avail_out === 0) ? 1 : 2;
    }, Tt = function(t2, e2) {
      for (var a2, n2, i2;; ) {
        if (t2.lookahead < ct) {
          if (St(t2), t2.lookahead < ct && e2 === q)
            return 1;
          if (t2.lookahead === 0)
            break;
        }
        if (a2 = 0, t2.lookahead >= 3 && (t2.ins_h = yt(t2, t2.ins_h, t2.window[t2.strstart + 3 - 1]), a2 = t2.prev[t2.strstart & t2.w_mask] = t2.head[t2.ins_h], t2.head[t2.ins_h] = t2.strstart), t2.prev_length = t2.match_length, t2.prev_match = t2.match_start, t2.match_length = 2, a2 !== 0 && t2.prev_length < t2.max_lazy_match && t2.strstart - a2 <= t2.w_size - ct && (t2.match_length = Zt(t2, a2), t2.match_length <= 5 && (t2.strategy === st || t2.match_length === 3 && t2.strstart - t2.match_start > 4096) && (t2.match_length = 2)), t2.prev_length >= 3 && t2.match_length <= t2.prev_length) {
          i2 = t2.strstart + t2.lookahead - 3, n2 = X(t2, t2.strstart - 1 - t2.prev_match, t2.prev_length - 3), t2.lookahead -= t2.prev_length - 1, t2.prev_length -= 2;
          do {
            ++t2.strstart <= i2 && (t2.ins_h = yt(t2, t2.ins_h, t2.window[t2.strstart + 3 - 1]), a2 = t2.prev[t2.strstart & t2.w_mask] = t2.head[t2.ins_h], t2.head[t2.ins_h] = t2.strstart);
          } while (--t2.prev_length != 0);
          if (t2.match_available = 0, t2.match_length = 2, t2.strstart++, n2 && (zt(t2, false), t2.strm.avail_out === 0))
            return 1;
        } else if (t2.match_available) {
          if ((n2 = X(t2, 0, t2.window[t2.strstart - 1])) && zt(t2, false), t2.strstart++, t2.lookahead--, t2.strm.avail_out === 0)
            return 1;
        } else
          t2.match_available = 1, t2.strstart++, t2.lookahead--;
      }
      return t2.match_available && (n2 = X(t2, 0, t2.window[t2.strstart - 1]), t2.match_available = 0), t2.insert = t2.strstart < 2 ? t2.strstart : 2, e2 === V ? (zt(t2, true), t2.strm.avail_out === 0 ? 3 : 4) : t2.sym_next && (zt(t2, false), t2.strm.avail_out === 0) ? 1 : 2;
    };
    function Ot(t2, e2, a2, n2, i2) {
      this.good_length = t2, this.max_lazy = e2, this.nice_length = a2, this.max_chain = n2, this.func = i2;
    }
    var It = [new Ot(0, 0, 0, 0, Ut), new Ot(4, 4, 8, 4, Dt), new Ot(4, 5, 16, 8, Dt), new Ot(4, 6, 32, 32, Dt), new Ot(4, 4, 16, 16, Tt), new Ot(8, 16, 32, 32, Tt), new Ot(8, 16, 128, 128, Tt), new Ot(8, 32, 128, 256, Tt), new Ot(32, 128, 258, 1024, Tt), new Ot(32, 258, 258, 4096, Tt)];
    function Ft() {
      this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = ft, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(1146), this.dyn_dtree = new Uint16Array(122), this.bl_tree = new Uint16Array(78), vt(this.dyn_ltree), vt(this.dyn_dtree), vt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(16), this.heap = new Uint16Array(573), vt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(573), vt(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
    }
    var Lt = function(t2) {
      if (!t2)
        return 1;
      var e2 = t2.state;
      return !e2 || e2.strm !== t2 || e2.status !== wt && e2.status !== 57 && e2.status !== 69 && e2.status !== 73 && e2.status !== 91 && e2.status !== 103 && e2.status !== mt && e2.status !== bt ? 1 : 0;
    }, Nt = function(t2) {
      if (Lt(t2))
        return gt(t2, at);
      t2.total_in = t2.total_out = 0, t2.data_type = _t;
      var e2 = t2.state;
      return e2.pending = 0, e2.pending_out = 0, e2.wrap < 0 && (e2.wrap = -e2.wrap), e2.status = e2.wrap === 2 ? 57 : e2.wrap ? wt : mt, t2.adler = e2.wrap === 2 ? 0 : 1, e2.last_flush = -2, P(e2), tt;
    }, Bt = function(t2) {
      var e2, a2 = Nt(t2);
      return a2 === tt && ((e2 = t2.state).window_size = 2 * e2.w_size, vt(e2.head), e2.max_lazy_match = It[e2.level].max_lazy, e2.good_match = It[e2.level].good_length, e2.nice_match = It[e2.level].nice_length, e2.max_chain_length = It[e2.level].max_chain, e2.strstart = 0, e2.block_start = 0, e2.lookahead = 0, e2.insert = 0, e2.match_length = e2.prev_length = 2, e2.match_available = 0, e2.ins_h = 0), a2;
    }, Ct = function(t2, e2, a2, n2, i2, r2) {
      if (!t2)
        return at;
      var s2 = 1;
      if (e2 === rt && (e2 = 6), n2 < 0 ? (s2 = 0, n2 = -n2) : n2 > 15 && (s2 = 2, n2 -= 16), i2 < 1 || i2 > 9 || a2 !== ft || n2 < 8 || n2 > 15 || e2 < 0 || e2 > 9 || r2 < 0 || r2 > ht || n2 === 8 && s2 !== 1)
        return gt(t2, at);
      n2 === 8 && (n2 = 9);
      var o2 = new Ft;
      return t2.state = o2, o2.strm = t2, o2.status = wt, o2.wrap = s2, o2.gzhead = null, o2.w_bits = n2, o2.w_size = 1 << o2.w_bits, o2.w_mask = o2.w_size - 1, o2.hash_bits = i2 + 7, o2.hash_size = 1 << o2.hash_bits, o2.hash_mask = o2.hash_size - 1, o2.hash_shift = ~~((o2.hash_bits + 3 - 1) / 3), o2.window = new Uint8Array(2 * o2.w_size), o2.head = new Uint16Array(o2.hash_size), o2.prev = new Uint16Array(o2.w_size), o2.lit_bufsize = 1 << i2 + 6, o2.pending_buf_size = 4 * o2.lit_bufsize, o2.pending_buf = new Uint8Array(o2.pending_buf_size), o2.sym_buf = o2.lit_bufsize, o2.sym_end = 3 * (o2.lit_bufsize - 1), o2.level = e2, o2.strategy = r2, o2.method = a2, Bt(t2);
    }, Mt = { deflateInit: function(t2, e2) {
      return Ct(t2, e2, ft, 15, 8, dt);
    }, deflateInit2: Ct, deflateReset: Bt, deflateResetKeep: Nt, deflateSetHeader: function(t2, e2) {
      return Lt(t2) || t2.state.wrap !== 2 ? at : (t2.state.gzhead = e2, tt);
    }, deflate: function(t2, e2) {
      if (Lt(t2) || e2 > $ || e2 < 0)
        return t2 ? gt(t2, at) : at;
      var a2 = t2.state;
      if (!t2.output || t2.avail_in !== 0 && !t2.input || a2.status === bt && e2 !== V)
        return gt(t2, t2.avail_out === 0 ? it : at);
      var n2 = a2.last_flush;
      if (a2.last_flush = e2, a2.pending !== 0) {
        if (xt(t2), t2.avail_out === 0)
          return a2.last_flush = -1, tt;
      } else if (t2.avail_in === 0 && pt(e2) <= pt(n2) && e2 !== V)
        return gt(t2, it);
      if (a2.status === bt && t2.avail_in !== 0)
        return gt(t2, it);
      if (a2.status === wt && a2.wrap === 0 && (a2.status = mt), a2.status === wt) {
        var i2 = ft + (a2.w_bits - 8 << 4) << 8;
        if (i2 |= (a2.strategy >= ot || a2.level < 2 ? 0 : a2.level < 6 ? 1 : a2.level === 6 ? 2 : 3) << 6, a2.strstart !== 0 && (i2 |= 32), Et(a2, i2 += 31 - i2 % 31), a2.strstart !== 0 && (Et(a2, t2.adler >>> 16), Et(a2, 65535 & t2.adler)), t2.adler = 1, a2.status = mt, xt(t2), a2.pending !== 0)
          return a2.last_flush = -1, tt;
      }
      if (a2.status === 57) {
        if (t2.adler = 0, At(a2, 31), At(a2, 139), At(a2, 8), a2.gzhead)
          At(a2, (a2.gzhead.text ? 1 : 0) + (a2.gzhead.hcrc ? 2 : 0) + (a2.gzhead.extra ? 4 : 0) + (a2.gzhead.name ? 8 : 0) + (a2.gzhead.comment ? 16 : 0)), At(a2, 255 & a2.gzhead.time), At(a2, a2.gzhead.time >> 8 & 255), At(a2, a2.gzhead.time >> 16 & 255), At(a2, a2.gzhead.time >> 24 & 255), At(a2, a2.level === 9 ? 2 : a2.strategy >= ot || a2.level < 2 ? 4 : 0), At(a2, 255 & a2.gzhead.os), a2.gzhead.extra && a2.gzhead.extra.length && (At(a2, 255 & a2.gzhead.extra.length), At(a2, a2.gzhead.extra.length >> 8 & 255)), a2.gzhead.hcrc && (t2.adler = H(t2.adler, a2.pending_buf, a2.pending, 0)), a2.gzindex = 0, a2.status = 69;
        else if (At(a2, 0), At(a2, 0), At(a2, 0), At(a2, 0), At(a2, 0), At(a2, a2.level === 9 ? 2 : a2.strategy >= ot || a2.level < 2 ? 4 : 0), At(a2, 3), a2.status = mt, xt(t2), a2.pending !== 0)
          return a2.last_flush = -1, tt;
      }
      if (a2.status === 69) {
        if (a2.gzhead.extra) {
          for (var r2 = a2.pending, s2 = (65535 & a2.gzhead.extra.length) - a2.gzindex;a2.pending + s2 > a2.pending_buf_size; ) {
            var o2 = a2.pending_buf_size - a2.pending;
            if (a2.pending_buf.set(a2.gzhead.extra.subarray(a2.gzindex, a2.gzindex + o2), a2.pending), a2.pending = a2.pending_buf_size, a2.gzhead.hcrc && a2.pending > r2 && (t2.adler = H(t2.adler, a2.pending_buf, a2.pending - r2, r2)), a2.gzindex += o2, xt(t2), a2.pending !== 0)
              return a2.last_flush = -1, tt;
            r2 = 0, s2 -= o2;
          }
          var l2 = new Uint8Array(a2.gzhead.extra);
          a2.pending_buf.set(l2.subarray(a2.gzindex, a2.gzindex + s2), a2.pending), a2.pending += s2, a2.gzhead.hcrc && a2.pending > r2 && (t2.adler = H(t2.adler, a2.pending_buf, a2.pending - r2, r2)), a2.gzindex = 0;
        }
        a2.status = 73;
      }
      if (a2.status === 73) {
        if (a2.gzhead.name) {
          var h2, d2 = a2.pending;
          do {
            if (a2.pending === a2.pending_buf_size) {
              if (a2.gzhead.hcrc && a2.pending > d2 && (t2.adler = H(t2.adler, a2.pending_buf, a2.pending - d2, d2)), xt(t2), a2.pending !== 0)
                return a2.last_flush = -1, tt;
              d2 = 0;
            }
            h2 = a2.gzindex < a2.gzhead.name.length ? 255 & a2.gzhead.name.charCodeAt(a2.gzindex++) : 0, At(a2, h2);
          } while (h2 !== 0);
          a2.gzhead.hcrc && a2.pending > d2 && (t2.adler = H(t2.adler, a2.pending_buf, a2.pending - d2, d2)), a2.gzindex = 0;
        }
        a2.status = 91;
      }
      if (a2.status === 91) {
        if (a2.gzhead.comment) {
          var _2, f2 = a2.pending;
          do {
            if (a2.pending === a2.pending_buf_size) {
              if (a2.gzhead.hcrc && a2.pending > f2 && (t2.adler = H(t2.adler, a2.pending_buf, a2.pending - f2, f2)), xt(t2), a2.pending !== 0)
                return a2.last_flush = -1, tt;
              f2 = 0;
            }
            _2 = a2.gzindex < a2.gzhead.comment.length ? 255 & a2.gzhead.comment.charCodeAt(a2.gzindex++) : 0, At(a2, _2);
          } while (_2 !== 0);
          a2.gzhead.hcrc && a2.pending > f2 && (t2.adler = H(t2.adler, a2.pending_buf, a2.pending - f2, f2));
        }
        a2.status = 103;
      }
      if (a2.status === 103) {
        if (a2.gzhead.hcrc) {
          if (a2.pending + 2 > a2.pending_buf_size && (xt(t2), a2.pending !== 0))
            return a2.last_flush = -1, tt;
          At(a2, 255 & t2.adler), At(a2, t2.adler >> 8 & 255), t2.adler = 0;
        }
        if (a2.status = mt, xt(t2), a2.pending !== 0)
          return a2.last_flush = -1, tt;
      }
      if (t2.avail_in !== 0 || a2.lookahead !== 0 || e2 !== q && a2.status !== bt) {
        var u2 = a2.level === 0 ? Ut(a2, e2) : a2.strategy === ot ? function(t3, e3) {
          for (var a3;; ) {
            if (t3.lookahead === 0 && (St(t3), t3.lookahead === 0)) {
              if (e3 === q)
                return 1;
              break;
            }
            if (t3.match_length = 0, a3 = X(t3, 0, t3.window[t3.strstart]), t3.lookahead--, t3.strstart++, a3 && (zt(t3, false), t3.strm.avail_out === 0))
              return 1;
          }
          return t3.insert = 0, e3 === V ? (zt(t3, true), t3.strm.avail_out === 0 ? 3 : 4) : t3.sym_next && (zt(t3, false), t3.strm.avail_out === 0) ? 1 : 2;
        }(a2, e2) : a2.strategy === lt ? function(t3, e3) {
          for (var a3, n3, i3, r3, s3 = t3.window;; ) {
            if (t3.lookahead <= ut) {
              if (St(t3), t3.lookahead <= ut && e3 === q)
                return 1;
              if (t3.lookahead === 0)
                break;
            }
            if (t3.match_length = 0, t3.lookahead >= 3 && t3.strstart > 0 && (n3 = s3[i3 = t3.strstart - 1]) === s3[++i3] && n3 === s3[++i3] && n3 === s3[++i3]) {
              r3 = t3.strstart + ut;
              do {} while (n3 === s3[++i3] && n3 === s3[++i3] && n3 === s3[++i3] && n3 === s3[++i3] && n3 === s3[++i3] && n3 === s3[++i3] && n3 === s3[++i3] && n3 === s3[++i3] && i3 < r3);
              t3.match_length = ut - (r3 - i3), t3.match_length > t3.lookahead && (t3.match_length = t3.lookahead);
            }
            if (t3.match_length >= 3 ? (a3 = X(t3, 1, t3.match_length - 3), t3.lookahead -= t3.match_length, t3.strstart += t3.match_length, t3.match_length = 0) : (a3 = X(t3, 0, t3.window[t3.strstart]), t3.lookahead--, t3.strstart++), a3 && (zt(t3, false), t3.strm.avail_out === 0))
              return 1;
          }
          return t3.insert = 0, e3 === V ? (zt(t3, true), t3.strm.avail_out === 0 ? 3 : 4) : t3.sym_next && (zt(t3, false), t3.strm.avail_out === 0) ? 1 : 2;
        }(a2, e2) : It[a2.level].func(a2, e2);
        if (u2 !== 3 && u2 !== 4 || (a2.status = bt), u2 === 1 || u2 === 3)
          return t2.avail_out === 0 && (a2.last_flush = -1), tt;
        if (u2 === 2 && (e2 === J ? W(a2) : e2 !== $ && (Y(a2, 0, 0, false), e2 === Q && (vt(a2.head), a2.lookahead === 0 && (a2.strstart = 0, a2.block_start = 0, a2.insert = 0))), xt(t2), t2.avail_out === 0))
          return a2.last_flush = -1, tt;
      }
      return e2 !== V ? tt : a2.wrap <= 0 ? et : (a2.wrap === 2 ? (At(a2, 255 & t2.adler), At(a2, t2.adler >> 8 & 255), At(a2, t2.adler >> 16 & 255), At(a2, t2.adler >> 24 & 255), At(a2, 255 & t2.total_in), At(a2, t2.total_in >> 8 & 255), At(a2, t2.total_in >> 16 & 255), At(a2, t2.total_in >> 24 & 255)) : (Et(a2, t2.adler >>> 16), Et(a2, 65535 & t2.adler)), xt(t2), a2.wrap > 0 && (a2.wrap = -a2.wrap), a2.pending !== 0 ? tt : et);
    }, deflateEnd: function(t2) {
      if (Lt(t2))
        return at;
      var e2 = t2.state.status;
      return t2.state = null, e2 === mt ? gt(t2, nt) : tt;
    }, deflateSetDictionary: function(t2, e2) {
      var a2 = e2.length;
      if (Lt(t2))
        return at;
      var n2 = t2.state, i2 = n2.wrap;
      if (i2 === 2 || i2 === 1 && n2.status !== wt || n2.lookahead)
        return at;
      if (i2 === 1 && (t2.adler = C(t2.adler, e2, a2, 0)), n2.wrap = 0, a2 >= n2.w_size) {
        i2 === 0 && (vt(n2.head), n2.strstart = 0, n2.block_start = 0, n2.insert = 0);
        var r2 = new Uint8Array(n2.w_size);
        r2.set(e2.subarray(a2 - n2.w_size, a2), 0), e2 = r2, a2 = n2.w_size;
      }
      var { avail_in: s2, next_in: o2, input: l2 } = t2;
      for (t2.avail_in = a2, t2.next_in = 0, t2.input = e2, St(n2);n2.lookahead >= 3; ) {
        var h2 = n2.strstart, d2 = n2.lookahead - 2;
        do {
          n2.ins_h = yt(n2, n2.ins_h, n2.window[h2 + 3 - 1]), n2.prev[h2 & n2.w_mask] = n2.head[n2.ins_h], n2.head[n2.ins_h] = h2, h2++;
        } while (--d2);
        n2.strstart = h2, n2.lookahead = 2, St(n2);
      }
      return n2.strstart += n2.lookahead, n2.block_start = n2.strstart, n2.insert = n2.lookahead, n2.lookahead = 0, n2.match_length = n2.prev_length = 2, n2.match_available = 0, t2.next_in = o2, t2.input = l2, t2.avail_in = s2, n2.wrap = i2, tt;
    }, deflateInfo: "pako deflate (from Nodeca project)" };
    function Ht(t2) {
      return Ht = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t3) {
        return typeof t3;
      } : function(t3) {
        return t3 && typeof Symbol == "function" && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
      }, Ht(t2);
    }
    var jt = function(t2, e2) {
      return Object.prototype.hasOwnProperty.call(t2, e2);
    }, Kt = function(t2) {
      for (var e2 = Array.prototype.slice.call(arguments, 1);e2.length; ) {
        var a2 = e2.shift();
        if (a2) {
          if (Ht(a2) !== "object")
            throw new TypeError(a2 + "must be non-object");
          for (var n2 in a2)
            jt(a2, n2) && (t2[n2] = a2[n2]);
        }
      }
      return t2;
    }, Pt = function(t2) {
      for (var e2 = 0, a2 = 0, n2 = t2.length;a2 < n2; a2++)
        e2 += t2[a2].length;
      for (var i2 = new Uint8Array(e2), r2 = 0, s2 = 0, o2 = t2.length;r2 < o2; r2++) {
        var l2 = t2[r2];
        i2.set(l2, s2), s2 += l2.length;
      }
      return i2;
    }, Yt = true;
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (t2) {
      Yt = false;
    }
    for (var Gt = new Uint8Array(256), Xt = 0;Xt < 256; Xt++)
      Gt[Xt] = Xt >= 252 ? 6 : Xt >= 248 ? 5 : Xt >= 240 ? 4 : Xt >= 224 ? 3 : Xt >= 192 ? 2 : 1;
    Gt[254] = Gt[254] = 1;
    var Wt = function(t2) {
      if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
        return new TextEncoder().encode(t2);
      var e2, a2, n2, i2, r2, s2 = t2.length, o2 = 0;
      for (i2 = 0;i2 < s2; i2++)
        (64512 & (a2 = t2.charCodeAt(i2))) == 55296 && i2 + 1 < s2 && (64512 & (n2 = t2.charCodeAt(i2 + 1))) == 56320 && (a2 = 65536 + (a2 - 55296 << 10) + (n2 - 56320), i2++), o2 += a2 < 128 ? 1 : a2 < 2048 ? 2 : a2 < 65536 ? 3 : 4;
      for (e2 = new Uint8Array(o2), r2 = 0, i2 = 0;r2 < o2; i2++)
        (64512 & (a2 = t2.charCodeAt(i2))) == 55296 && i2 + 1 < s2 && (64512 & (n2 = t2.charCodeAt(i2 + 1))) == 56320 && (a2 = 65536 + (a2 - 55296 << 10) + (n2 - 56320), i2++), a2 < 128 ? e2[r2++] = a2 : a2 < 2048 ? (e2[r2++] = 192 | a2 >>> 6, e2[r2++] = 128 | 63 & a2) : a2 < 65536 ? (e2[r2++] = 224 | a2 >>> 12, e2[r2++] = 128 | a2 >>> 6 & 63, e2[r2++] = 128 | 63 & a2) : (e2[r2++] = 240 | a2 >>> 18, e2[r2++] = 128 | a2 >>> 12 & 63, e2[r2++] = 128 | a2 >>> 6 & 63, e2[r2++] = 128 | 63 & a2);
      return e2;
    }, qt = function(t2, e2) {
      var a2, n2, i2 = e2 || t2.length;
      if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
        return new TextDecoder().decode(t2.subarray(0, e2));
      var r2 = new Array(2 * i2);
      for (n2 = 0, a2 = 0;a2 < i2; ) {
        var s2 = t2[a2++];
        if (s2 < 128)
          r2[n2++] = s2;
        else {
          var o2 = Gt[s2];
          if (o2 > 4)
            r2[n2++] = 65533, a2 += o2 - 1;
          else {
            for (s2 &= o2 === 2 ? 31 : o2 === 3 ? 15 : 7;o2 > 1 && a2 < i2; )
              s2 = s2 << 6 | 63 & t2[a2++], o2--;
            o2 > 1 ? r2[n2++] = 65533 : s2 < 65536 ? r2[n2++] = s2 : (s2 -= 65536, r2[n2++] = 55296 | s2 >> 10 & 1023, r2[n2++] = 56320 | 1023 & s2);
          }
        }
      }
      return function(t3, e3) {
        if (e3 < 65534 && t3.subarray && Yt)
          return String.fromCharCode.apply(null, t3.length === e3 ? t3 : t3.subarray(0, e3));
        for (var a3 = "", n3 = 0;n3 < e3; n3++)
          a3 += String.fromCharCode(t3[n3]);
        return a3;
      }(r2, n2);
    }, Jt = function(t2, e2) {
      (e2 = e2 || t2.length) > t2.length && (e2 = t2.length);
      for (var a2 = e2 - 1;a2 >= 0 && (192 & t2[a2]) == 128; )
        a2--;
      return a2 < 0 || a2 === 0 ? e2 : a2 + Gt[t2[a2]] > e2 ? a2 : e2;
    };
    var Qt = function() {
      this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
    }, Vt = Object.prototype.toString, $t = K.Z_NO_FLUSH, te = K.Z_SYNC_FLUSH, ee = K.Z_FULL_FLUSH, ae = K.Z_FINISH, ne = K.Z_OK, ie = K.Z_STREAM_END, re = K.Z_DEFAULT_COMPRESSION, se = K.Z_DEFAULT_STRATEGY, oe = K.Z_DEFLATED;
    function le(t2) {
      this.options = Kt({ level: re, method: oe, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: se }, t2 || {});
      var e2 = this.options;
      e2.raw && e2.windowBits > 0 ? e2.windowBits = -e2.windowBits : e2.gzip && e2.windowBits > 0 && e2.windowBits < 16 && (e2.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new Qt, this.strm.avail_out = 0;
      var a2 = Mt.deflateInit2(this.strm, e2.level, e2.method, e2.windowBits, e2.memLevel, e2.strategy);
      if (a2 !== ne)
        throw new Error(j[a2]);
      if (e2.header && Mt.deflateSetHeader(this.strm, e2.header), e2.dictionary) {
        var n2;
        if (n2 = typeof e2.dictionary == "string" ? Wt(e2.dictionary) : Vt.call(e2.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(e2.dictionary) : e2.dictionary, (a2 = Mt.deflateSetDictionary(this.strm, n2)) !== ne)
          throw new Error(j[a2]);
        this._dict_set = true;
      }
    }
    function he(t2, e2) {
      var a2 = new le(e2);
      if (a2.push(t2, true), a2.err)
        throw a2.msg || j[a2.err];
      return a2.result;
    }
    le.prototype.push = function(t2, e2) {
      var a2, n2, i2 = this.strm, r2 = this.options.chunkSize;
      if (this.ended)
        return false;
      for (n2 = e2 === ~~e2 ? e2 : e2 === true ? ae : $t, typeof t2 == "string" ? i2.input = Wt(t2) : Vt.call(t2) === "[object ArrayBuffer]" ? i2.input = new Uint8Array(t2) : i2.input = t2, i2.next_in = 0, i2.avail_in = i2.input.length;; )
        if (i2.avail_out === 0 && (i2.output = new Uint8Array(r2), i2.next_out = 0, i2.avail_out = r2), (n2 === te || n2 === ee) && i2.avail_out <= 6)
          this.onData(i2.output.subarray(0, i2.next_out)), i2.avail_out = 0;
        else {
          if ((a2 = Mt.deflate(i2, n2)) === ie)
            return i2.next_out > 0 && this.onData(i2.output.subarray(0, i2.next_out)), a2 = Mt.deflateEnd(this.strm), this.onEnd(a2), this.ended = true, a2 === ne;
          if (i2.avail_out !== 0) {
            if (n2 > 0 && i2.next_out > 0)
              this.onData(i2.output.subarray(0, i2.next_out)), i2.avail_out = 0;
            else if (i2.avail_in === 0)
              break;
          } else
            this.onData(i2.output);
        }
      return true;
    }, le.prototype.onData = function(t2) {
      this.chunks.push(t2);
    }, le.prototype.onEnd = function(t2) {
      t2 === ne && (this.result = Pt(this.chunks)), this.chunks = [], this.err = t2, this.msg = this.strm.msg;
    };
    var de = { Deflate: le, deflate: he, deflateRaw: function(t2, e2) {
      return (e2 = e2 || {}).raw = true, he(t2, e2);
    }, gzip: function(t2, e2) {
      return (e2 = e2 || {}).gzip = true, he(t2, e2);
    }, constants: K }, _e = 16209, fe = function(t2, e2) {
      var a2, n2, i2, r2, s2, o2, l2, h2, d2, _2, f2, u2, c2, w2, m2, b2, g2, p2, v2, k2, y2, x2, z2, A2, E2 = t2.state;
      a2 = t2.next_in, z2 = t2.input, n2 = a2 + (t2.avail_in - 5), i2 = t2.next_out, A2 = t2.output, r2 = i2 - (e2 - t2.avail_out), s2 = i2 + (t2.avail_out - 257), o2 = E2.dmax, l2 = E2.wsize, h2 = E2.whave, d2 = E2.wnext, _2 = E2.window, f2 = E2.hold, u2 = E2.bits, c2 = E2.lencode, w2 = E2.distcode, m2 = (1 << E2.lenbits) - 1, b2 = (1 << E2.distbits) - 1;
      t:
        do {
          u2 < 15 && (f2 += z2[a2++] << u2, u2 += 8, f2 += z2[a2++] << u2, u2 += 8), g2 = c2[f2 & m2];
          e:
            for (;; ) {
              if (f2 >>>= p2 = g2 >>> 24, u2 -= p2, (p2 = g2 >>> 16 & 255) === 0)
                A2[i2++] = 65535 & g2;
              else {
                if (!(16 & p2)) {
                  if ((64 & p2) == 0) {
                    g2 = c2[(65535 & g2) + (f2 & (1 << p2) - 1)];
                    continue e;
                  }
                  if (32 & p2) {
                    E2.mode = 16191;
                    break t;
                  }
                  t2.msg = "invalid literal/length code", E2.mode = _e;
                  break t;
                }
                v2 = 65535 & g2, (p2 &= 15) && (u2 < p2 && (f2 += z2[a2++] << u2, u2 += 8), v2 += f2 & (1 << p2) - 1, f2 >>>= p2, u2 -= p2), u2 < 15 && (f2 += z2[a2++] << u2, u2 += 8, f2 += z2[a2++] << u2, u2 += 8), g2 = w2[f2 & b2];
                a:
                  for (;; ) {
                    if (f2 >>>= p2 = g2 >>> 24, u2 -= p2, !(16 & (p2 = g2 >>> 16 & 255))) {
                      if ((64 & p2) == 0) {
                        g2 = w2[(65535 & g2) + (f2 & (1 << p2) - 1)];
                        continue a;
                      }
                      t2.msg = "invalid distance code", E2.mode = _e;
                      break t;
                    }
                    if (k2 = 65535 & g2, u2 < (p2 &= 15) && (f2 += z2[a2++] << u2, (u2 += 8) < p2 && (f2 += z2[a2++] << u2, u2 += 8)), (k2 += f2 & (1 << p2) - 1) > o2) {
                      t2.msg = "invalid distance too far back", E2.mode = _e;
                      break t;
                    }
                    if (f2 >>>= p2, u2 -= p2, k2 > (p2 = i2 - r2)) {
                      if ((p2 = k2 - p2) > h2 && E2.sane) {
                        t2.msg = "invalid distance too far back", E2.mode = _e;
                        break t;
                      }
                      if (y2 = 0, x2 = _2, d2 === 0) {
                        if (y2 += l2 - p2, p2 < v2) {
                          v2 -= p2;
                          do {
                            A2[i2++] = _2[y2++];
                          } while (--p2);
                          y2 = i2 - k2, x2 = A2;
                        }
                      } else if (d2 < p2) {
                        if (y2 += l2 + d2 - p2, (p2 -= d2) < v2) {
                          v2 -= p2;
                          do {
                            A2[i2++] = _2[y2++];
                          } while (--p2);
                          if (y2 = 0, d2 < v2) {
                            v2 -= p2 = d2;
                            do {
                              A2[i2++] = _2[y2++];
                            } while (--p2);
                            y2 = i2 - k2, x2 = A2;
                          }
                        }
                      } else if (y2 += d2 - p2, p2 < v2) {
                        v2 -= p2;
                        do {
                          A2[i2++] = _2[y2++];
                        } while (--p2);
                        y2 = i2 - k2, x2 = A2;
                      }
                      for (;v2 > 2; )
                        A2[i2++] = x2[y2++], A2[i2++] = x2[y2++], A2[i2++] = x2[y2++], v2 -= 3;
                      v2 && (A2[i2++] = x2[y2++], v2 > 1 && (A2[i2++] = x2[y2++]));
                    } else {
                      y2 = i2 - k2;
                      do {
                        A2[i2++] = A2[y2++], A2[i2++] = A2[y2++], A2[i2++] = A2[y2++], v2 -= 3;
                      } while (v2 > 2);
                      v2 && (A2[i2++] = A2[y2++], v2 > 1 && (A2[i2++] = A2[y2++]));
                    }
                    break;
                  }
              }
              break;
            }
        } while (a2 < n2 && i2 < s2);
      a2 -= v2 = u2 >> 3, f2 &= (1 << (u2 -= v2 << 3)) - 1, t2.next_in = a2, t2.next_out = i2, t2.avail_in = a2 < n2 ? n2 - a2 + 5 : 5 - (a2 - n2), t2.avail_out = i2 < s2 ? s2 - i2 + 257 : 257 - (i2 - s2), E2.hold = f2, E2.bits = u2;
    }, ue = 15, ce = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]), we = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]), me = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]), be = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]), ge = function(t2, e2, a2, n2, i2, r2, s2, o2) {
      var l2, h2, d2, _2, f2, u2, c2, w2, m2, b2 = o2.bits, g2 = 0, p2 = 0, v2 = 0, k2 = 0, y2 = 0, x2 = 0, z2 = 0, A2 = 0, E2 = 0, R2 = 0, Z2 = null, S2 = new Uint16Array(16), U2 = new Uint16Array(16), D2 = null;
      for (g2 = 0;g2 <= ue; g2++)
        S2[g2] = 0;
      for (p2 = 0;p2 < n2; p2++)
        S2[e2[a2 + p2]]++;
      for (y2 = b2, k2 = ue;k2 >= 1 && S2[k2] === 0; k2--)
        ;
      if (y2 > k2 && (y2 = k2), k2 === 0)
        return i2[r2++] = 20971520, i2[r2++] = 20971520, o2.bits = 1, 0;
      for (v2 = 1;v2 < k2 && S2[v2] === 0; v2++)
        ;
      for (y2 < v2 && (y2 = v2), A2 = 1, g2 = 1;g2 <= ue; g2++)
        if (A2 <<= 1, (A2 -= S2[g2]) < 0)
          return -1;
      if (A2 > 0 && (t2 === 0 || k2 !== 1))
        return -1;
      for (U2[1] = 0, g2 = 1;g2 < ue; g2++)
        U2[g2 + 1] = U2[g2] + S2[g2];
      for (p2 = 0;p2 < n2; p2++)
        e2[a2 + p2] !== 0 && (s2[U2[e2[a2 + p2]]++] = p2);
      if (t2 === 0 ? (Z2 = D2 = s2, u2 = 20) : t2 === 1 ? (Z2 = ce, D2 = we, u2 = 257) : (Z2 = me, D2 = be, u2 = 0), R2 = 0, p2 = 0, g2 = v2, f2 = r2, x2 = y2, z2 = 0, d2 = -1, _2 = (E2 = 1 << y2) - 1, t2 === 1 && E2 > 852 || t2 === 2 && E2 > 592)
        return 1;
      for (;; ) {
        c2 = g2 - z2, s2[p2] + 1 < u2 ? (w2 = 0, m2 = s2[p2]) : s2[p2] >= u2 ? (w2 = D2[s2[p2] - u2], m2 = Z2[s2[p2] - u2]) : (w2 = 96, m2 = 0), l2 = 1 << g2 - z2, v2 = h2 = 1 << x2;
        do {
          i2[f2 + (R2 >> z2) + (h2 -= l2)] = c2 << 24 | w2 << 16 | m2 | 0;
        } while (h2 !== 0);
        for (l2 = 1 << g2 - 1;R2 & l2; )
          l2 >>= 1;
        if (l2 !== 0 ? (R2 &= l2 - 1, R2 += l2) : R2 = 0, p2++, --S2[g2] == 0) {
          if (g2 === k2)
            break;
          g2 = e2[a2 + s2[p2]];
        }
        if (g2 > y2 && (R2 & _2) !== d2) {
          for (z2 === 0 && (z2 = y2), f2 += v2, A2 = 1 << (x2 = g2 - z2);x2 + z2 < k2 && !((A2 -= S2[x2 + z2]) <= 0); )
            x2++, A2 <<= 1;
          if (E2 += 1 << x2, t2 === 1 && E2 > 852 || t2 === 2 && E2 > 592)
            return 1;
          i2[d2 = R2 & _2] = y2 << 24 | x2 << 16 | f2 - r2 | 0;
        }
      }
      return R2 !== 0 && (i2[f2 + R2] = g2 - z2 << 24 | 64 << 16 | 0), o2.bits = y2, 0;
    }, pe = K.Z_FINISH, ve = K.Z_BLOCK, ke = K.Z_TREES, ye = K.Z_OK, xe = K.Z_STREAM_END, ze = K.Z_NEED_DICT, Ae = K.Z_STREAM_ERROR, Ee = K.Z_DATA_ERROR, Re = K.Z_MEM_ERROR, Ze = K.Z_BUF_ERROR, Se = K.Z_DEFLATED, Ue = 16180, De = 16190, Te = 16191, Oe = 16192, Ie = 16194, Fe = 16199, Le = 16200, Ne = 16206, Be = 16209, Ce = function(t2) {
      return (t2 >>> 24 & 255) + (t2 >>> 8 & 65280) + ((65280 & t2) << 8) + ((255 & t2) << 24);
    };
    function Me() {
      this.strm = null, this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
    }
    var He, je, Ke = function(t2) {
      if (!t2)
        return 1;
      var e2 = t2.state;
      return !e2 || e2.strm !== t2 || e2.mode < Ue || e2.mode > 16211 ? 1 : 0;
    }, Pe = function(t2) {
      if (Ke(t2))
        return Ae;
      var e2 = t2.state;
      return t2.total_in = t2.total_out = e2.total = 0, t2.msg = "", e2.wrap && (t2.adler = 1 & e2.wrap), e2.mode = Ue, e2.last = 0, e2.havedict = 0, e2.flags = -1, e2.dmax = 32768, e2.head = null, e2.hold = 0, e2.bits = 0, e2.lencode = e2.lendyn = new Int32Array(852), e2.distcode = e2.distdyn = new Int32Array(592), e2.sane = 1, e2.back = -1, ye;
    }, Ye = function(t2) {
      if (Ke(t2))
        return Ae;
      var e2 = t2.state;
      return e2.wsize = 0, e2.whave = 0, e2.wnext = 0, Pe(t2);
    }, Ge = function(t2, e2) {
      var a2;
      if (Ke(t2))
        return Ae;
      var n2 = t2.state;
      return e2 < 0 ? (a2 = 0, e2 = -e2) : (a2 = 5 + (e2 >> 4), e2 < 48 && (e2 &= 15)), e2 && (e2 < 8 || e2 > 15) ? Ae : (n2.window !== null && n2.wbits !== e2 && (n2.window = null), n2.wrap = a2, n2.wbits = e2, Ye(t2));
    }, Xe = function(t2, e2) {
      if (!t2)
        return Ae;
      var a2 = new Me;
      t2.state = a2, a2.strm = t2, a2.window = null, a2.mode = Ue;
      var n2 = Ge(t2, e2);
      return n2 !== ye && (t2.state = null), n2;
    }, We = true, qe = function(t2) {
      if (We) {
        He = new Int32Array(512), je = new Int32Array(32);
        for (var e2 = 0;e2 < 144; )
          t2.lens[e2++] = 8;
        for (;e2 < 256; )
          t2.lens[e2++] = 9;
        for (;e2 < 280; )
          t2.lens[e2++] = 7;
        for (;e2 < 288; )
          t2.lens[e2++] = 8;
        for (ge(1, t2.lens, 0, 288, He, 0, t2.work, { bits: 9 }), e2 = 0;e2 < 32; )
          t2.lens[e2++] = 5;
        ge(2, t2.lens, 0, 32, je, 0, t2.work, { bits: 5 }), We = false;
      }
      t2.lencode = He, t2.lenbits = 9, t2.distcode = je, t2.distbits = 5;
    }, Je = function(t2, e2, a2, n2) {
      var i2, r2 = t2.state;
      return r2.window === null && (r2.wsize = 1 << r2.wbits, r2.wnext = 0, r2.whave = 0, r2.window = new Uint8Array(r2.wsize)), n2 >= r2.wsize ? (r2.window.set(e2.subarray(a2 - r2.wsize, a2), 0), r2.wnext = 0, r2.whave = r2.wsize) : ((i2 = r2.wsize - r2.wnext) > n2 && (i2 = n2), r2.window.set(e2.subarray(a2 - n2, a2 - n2 + i2), r2.wnext), (n2 -= i2) ? (r2.window.set(e2.subarray(a2 - n2, a2), 0), r2.wnext = n2, r2.whave = r2.wsize) : (r2.wnext += i2, r2.wnext === r2.wsize && (r2.wnext = 0), r2.whave < r2.wsize && (r2.whave += i2))), 0;
    }, Qe = { inflateReset: Ye, inflateReset2: Ge, inflateResetKeep: Pe, inflateInit: function(t2) {
      return Xe(t2, 15);
    }, inflateInit2: Xe, inflate: function(t2, e2) {
      var a2, n2, i2, r2, s2, o2, l2, h2, d2, _2, f2, u2, c2, w2, m2, b2, g2, p2, v2, k2, y2, x2, z2, A2, E2 = 0, R2 = new Uint8Array(4), Z2 = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
      if (Ke(t2) || !t2.output || !t2.input && t2.avail_in !== 0)
        return Ae;
      (a2 = t2.state).mode === Te && (a2.mode = Oe), s2 = t2.next_out, i2 = t2.output, l2 = t2.avail_out, r2 = t2.next_in, n2 = t2.input, o2 = t2.avail_in, h2 = a2.hold, d2 = a2.bits, _2 = o2, f2 = l2, x2 = ye;
      t:
        for (;; )
          switch (a2.mode) {
            case Ue:
              if (a2.wrap === 0) {
                a2.mode = Oe;
                break;
              }
              for (;d2 < 16; ) {
                if (o2 === 0)
                  break t;
                o2--, h2 += n2[r2++] << d2, d2 += 8;
              }
              if (2 & a2.wrap && h2 === 35615) {
                a2.wbits === 0 && (a2.wbits = 15), a2.check = 0, R2[0] = 255 & h2, R2[1] = h2 >>> 8 & 255, a2.check = H(a2.check, R2, 2, 0), h2 = 0, d2 = 0, a2.mode = 16181;
                break;
              }
              if (a2.head && (a2.head.done = false), !(1 & a2.wrap) || (((255 & h2) << 8) + (h2 >> 8)) % 31) {
                t2.msg = "incorrect header check", a2.mode = Be;
                break;
              }
              if ((15 & h2) !== Se) {
                t2.msg = "unknown compression method", a2.mode = Be;
                break;
              }
              if (d2 -= 4, y2 = 8 + (15 & (h2 >>>= 4)), a2.wbits === 0 && (a2.wbits = y2), y2 > 15 || y2 > a2.wbits) {
                t2.msg = "invalid window size", a2.mode = Be;
                break;
              }
              a2.dmax = 1 << a2.wbits, a2.flags = 0, t2.adler = a2.check = 1, a2.mode = 512 & h2 ? 16189 : Te, h2 = 0, d2 = 0;
              break;
            case 16181:
              for (;d2 < 16; ) {
                if (o2 === 0)
                  break t;
                o2--, h2 += n2[r2++] << d2, d2 += 8;
              }
              if (a2.flags = h2, (255 & a2.flags) !== Se) {
                t2.msg = "unknown compression method", a2.mode = Be;
                break;
              }
              if (57344 & a2.flags) {
                t2.msg = "unknown header flags set", a2.mode = Be;
                break;
              }
              a2.head && (a2.head.text = h2 >> 8 & 1), 512 & a2.flags && 4 & a2.wrap && (R2[0] = 255 & h2, R2[1] = h2 >>> 8 & 255, a2.check = H(a2.check, R2, 2, 0)), h2 = 0, d2 = 0, a2.mode = 16182;
            case 16182:
              for (;d2 < 32; ) {
                if (o2 === 0)
                  break t;
                o2--, h2 += n2[r2++] << d2, d2 += 8;
              }
              a2.head && (a2.head.time = h2), 512 & a2.flags && 4 & a2.wrap && (R2[0] = 255 & h2, R2[1] = h2 >>> 8 & 255, R2[2] = h2 >>> 16 & 255, R2[3] = h2 >>> 24 & 255, a2.check = H(a2.check, R2, 4, 0)), h2 = 0, d2 = 0, a2.mode = 16183;
            case 16183:
              for (;d2 < 16; ) {
                if (o2 === 0)
                  break t;
                o2--, h2 += n2[r2++] << d2, d2 += 8;
              }
              a2.head && (a2.head.xflags = 255 & h2, a2.head.os = h2 >> 8), 512 & a2.flags && 4 & a2.wrap && (R2[0] = 255 & h2, R2[1] = h2 >>> 8 & 255, a2.check = H(a2.check, R2, 2, 0)), h2 = 0, d2 = 0, a2.mode = 16184;
            case 16184:
              if (1024 & a2.flags) {
                for (;d2 < 16; ) {
                  if (o2 === 0)
                    break t;
                  o2--, h2 += n2[r2++] << d2, d2 += 8;
                }
                a2.length = h2, a2.head && (a2.head.extra_len = h2), 512 & a2.flags && 4 & a2.wrap && (R2[0] = 255 & h2, R2[1] = h2 >>> 8 & 255, a2.check = H(a2.check, R2, 2, 0)), h2 = 0, d2 = 0;
              } else
                a2.head && (a2.head.extra = null);
              a2.mode = 16185;
            case 16185:
              if (1024 & a2.flags && ((u2 = a2.length) > o2 && (u2 = o2), u2 && (a2.head && (y2 = a2.head.extra_len - a2.length, a2.head.extra || (a2.head.extra = new Uint8Array(a2.head.extra_len)), a2.head.extra.set(n2.subarray(r2, r2 + u2), y2)), 512 & a2.flags && 4 & a2.wrap && (a2.check = H(a2.check, n2, u2, r2)), o2 -= u2, r2 += u2, a2.length -= u2), a2.length))
                break t;
              a2.length = 0, a2.mode = 16186;
            case 16186:
              if (2048 & a2.flags) {
                if (o2 === 0)
                  break t;
                u2 = 0;
                do {
                  y2 = n2[r2 + u2++], a2.head && y2 && a2.length < 65536 && (a2.head.name += String.fromCharCode(y2));
                } while (y2 && u2 < o2);
                if (512 & a2.flags && 4 & a2.wrap && (a2.check = H(a2.check, n2, u2, r2)), o2 -= u2, r2 += u2, y2)
                  break t;
              } else
                a2.head && (a2.head.name = null);
              a2.length = 0, a2.mode = 16187;
            case 16187:
              if (4096 & a2.flags) {
                if (o2 === 0)
                  break t;
                u2 = 0;
                do {
                  y2 = n2[r2 + u2++], a2.head && y2 && a2.length < 65536 && (a2.head.comment += String.fromCharCode(y2));
                } while (y2 && u2 < o2);
                if (512 & a2.flags && 4 & a2.wrap && (a2.check = H(a2.check, n2, u2, r2)), o2 -= u2, r2 += u2, y2)
                  break t;
              } else
                a2.head && (a2.head.comment = null);
              a2.mode = 16188;
            case 16188:
              if (512 & a2.flags) {
                for (;d2 < 16; ) {
                  if (o2 === 0)
                    break t;
                  o2--, h2 += n2[r2++] << d2, d2 += 8;
                }
                if (4 & a2.wrap && h2 !== (65535 & a2.check)) {
                  t2.msg = "header crc mismatch", a2.mode = Be;
                  break;
                }
                h2 = 0, d2 = 0;
              }
              a2.head && (a2.head.hcrc = a2.flags >> 9 & 1, a2.head.done = true), t2.adler = a2.check = 0, a2.mode = Te;
              break;
            case 16189:
              for (;d2 < 32; ) {
                if (o2 === 0)
                  break t;
                o2--, h2 += n2[r2++] << d2, d2 += 8;
              }
              t2.adler = a2.check = Ce(h2), h2 = 0, d2 = 0, a2.mode = De;
            case De:
              if (a2.havedict === 0)
                return t2.next_out = s2, t2.avail_out = l2, t2.next_in = r2, t2.avail_in = o2, a2.hold = h2, a2.bits = d2, ze;
              t2.adler = a2.check = 1, a2.mode = Te;
            case Te:
              if (e2 === ve || e2 === ke)
                break t;
            case Oe:
              if (a2.last) {
                h2 >>>= 7 & d2, d2 -= 7 & d2, a2.mode = Ne;
                break;
              }
              for (;d2 < 3; ) {
                if (o2 === 0)
                  break t;
                o2--, h2 += n2[r2++] << d2, d2 += 8;
              }
              switch (a2.last = 1 & h2, d2 -= 1, 3 & (h2 >>>= 1)) {
                case 0:
                  a2.mode = 16193;
                  break;
                case 1:
                  if (qe(a2), a2.mode = Fe, e2 === ke) {
                    h2 >>>= 2, d2 -= 2;
                    break t;
                  }
                  break;
                case 2:
                  a2.mode = 16196;
                  break;
                case 3:
                  t2.msg = "invalid block type", a2.mode = Be;
              }
              h2 >>>= 2, d2 -= 2;
              break;
            case 16193:
              for (h2 >>>= 7 & d2, d2 -= 7 & d2;d2 < 32; ) {
                if (o2 === 0)
                  break t;
                o2--, h2 += n2[r2++] << d2, d2 += 8;
              }
              if ((65535 & h2) != (h2 >>> 16 ^ 65535)) {
                t2.msg = "invalid stored block lengths", a2.mode = Be;
                break;
              }
              if (a2.length = 65535 & h2, h2 = 0, d2 = 0, a2.mode = Ie, e2 === ke)
                break t;
            case Ie:
              a2.mode = 16195;
            case 16195:
              if (u2 = a2.length) {
                if (u2 > o2 && (u2 = o2), u2 > l2 && (u2 = l2), u2 === 0)
                  break t;
                i2.set(n2.subarray(r2, r2 + u2), s2), o2 -= u2, r2 += u2, l2 -= u2, s2 += u2, a2.length -= u2;
                break;
              }
              a2.mode = Te;
              break;
            case 16196:
              for (;d2 < 14; ) {
                if (o2 === 0)
                  break t;
                o2--, h2 += n2[r2++] << d2, d2 += 8;
              }
              if (a2.nlen = 257 + (31 & h2), h2 >>>= 5, d2 -= 5, a2.ndist = 1 + (31 & h2), h2 >>>= 5, d2 -= 5, a2.ncode = 4 + (15 & h2), h2 >>>= 4, d2 -= 4, a2.nlen > 286 || a2.ndist > 30) {
                t2.msg = "too many length or distance symbols", a2.mode = Be;
                break;
              }
              a2.have = 0, a2.mode = 16197;
            case 16197:
              for (;a2.have < a2.ncode; ) {
                for (;d2 < 3; ) {
                  if (o2 === 0)
                    break t;
                  o2--, h2 += n2[r2++] << d2, d2 += 8;
                }
                a2.lens[Z2[a2.have++]] = 7 & h2, h2 >>>= 3, d2 -= 3;
              }
              for (;a2.have < 19; )
                a2.lens[Z2[a2.have++]] = 0;
              if (a2.lencode = a2.lendyn, a2.lenbits = 7, z2 = { bits: a2.lenbits }, x2 = ge(0, a2.lens, 0, 19, a2.lencode, 0, a2.work, z2), a2.lenbits = z2.bits, x2) {
                t2.msg = "invalid code lengths set", a2.mode = Be;
                break;
              }
              a2.have = 0, a2.mode = 16198;
            case 16198:
              for (;a2.have < a2.nlen + a2.ndist; ) {
                for (;b2 = (E2 = a2.lencode[h2 & (1 << a2.lenbits) - 1]) >>> 16 & 255, g2 = 65535 & E2, !((m2 = E2 >>> 24) <= d2); ) {
                  if (o2 === 0)
                    break t;
                  o2--, h2 += n2[r2++] << d2, d2 += 8;
                }
                if (g2 < 16)
                  h2 >>>= m2, d2 -= m2, a2.lens[a2.have++] = g2;
                else {
                  if (g2 === 16) {
                    for (A2 = m2 + 2;d2 < A2; ) {
                      if (o2 === 0)
                        break t;
                      o2--, h2 += n2[r2++] << d2, d2 += 8;
                    }
                    if (h2 >>>= m2, d2 -= m2, a2.have === 0) {
                      t2.msg = "invalid bit length repeat", a2.mode = Be;
                      break;
                    }
                    y2 = a2.lens[a2.have - 1], u2 = 3 + (3 & h2), h2 >>>= 2, d2 -= 2;
                  } else if (g2 === 17) {
                    for (A2 = m2 + 3;d2 < A2; ) {
                      if (o2 === 0)
                        break t;
                      o2--, h2 += n2[r2++] << d2, d2 += 8;
                    }
                    d2 -= m2, y2 = 0, u2 = 3 + (7 & (h2 >>>= m2)), h2 >>>= 3, d2 -= 3;
                  } else {
                    for (A2 = m2 + 7;d2 < A2; ) {
                      if (o2 === 0)
                        break t;
                      o2--, h2 += n2[r2++] << d2, d2 += 8;
                    }
                    d2 -= m2, y2 = 0, u2 = 11 + (127 & (h2 >>>= m2)), h2 >>>= 7, d2 -= 7;
                  }
                  if (a2.have + u2 > a2.nlen + a2.ndist) {
                    t2.msg = "invalid bit length repeat", a2.mode = Be;
                    break;
                  }
                  for (;u2--; )
                    a2.lens[a2.have++] = y2;
                }
              }
              if (a2.mode === Be)
                break;
              if (a2.lens[256] === 0) {
                t2.msg = "invalid code -- missing end-of-block", a2.mode = Be;
                break;
              }
              if (a2.lenbits = 9, z2 = { bits: a2.lenbits }, x2 = ge(1, a2.lens, 0, a2.nlen, a2.lencode, 0, a2.work, z2), a2.lenbits = z2.bits, x2) {
                t2.msg = "invalid literal/lengths set", a2.mode = Be;
                break;
              }
              if (a2.distbits = 6, a2.distcode = a2.distdyn, z2 = { bits: a2.distbits }, x2 = ge(2, a2.lens, a2.nlen, a2.ndist, a2.distcode, 0, a2.work, z2), a2.distbits = z2.bits, x2) {
                t2.msg = "invalid distances set", a2.mode = Be;
                break;
              }
              if (a2.mode = Fe, e2 === ke)
                break t;
            case Fe:
              a2.mode = Le;
            case Le:
              if (o2 >= 6 && l2 >= 258) {
                t2.next_out = s2, t2.avail_out = l2, t2.next_in = r2, t2.avail_in = o2, a2.hold = h2, a2.bits = d2, fe(t2, f2), s2 = t2.next_out, i2 = t2.output, l2 = t2.avail_out, r2 = t2.next_in, n2 = t2.input, o2 = t2.avail_in, h2 = a2.hold, d2 = a2.bits, a2.mode === Te && (a2.back = -1);
                break;
              }
              for (a2.back = 0;b2 = (E2 = a2.lencode[h2 & (1 << a2.lenbits) - 1]) >>> 16 & 255, g2 = 65535 & E2, !((m2 = E2 >>> 24) <= d2); ) {
                if (o2 === 0)
                  break t;
                o2--, h2 += n2[r2++] << d2, d2 += 8;
              }
              if (b2 && (240 & b2) == 0) {
                for (p2 = m2, v2 = b2, k2 = g2;b2 = (E2 = a2.lencode[k2 + ((h2 & (1 << p2 + v2) - 1) >> p2)]) >>> 16 & 255, g2 = 65535 & E2, !(p2 + (m2 = E2 >>> 24) <= d2); ) {
                  if (o2 === 0)
                    break t;
                  o2--, h2 += n2[r2++] << d2, d2 += 8;
                }
                h2 >>>= p2, d2 -= p2, a2.back += p2;
              }
              if (h2 >>>= m2, d2 -= m2, a2.back += m2, a2.length = g2, b2 === 0) {
                a2.mode = 16205;
                break;
              }
              if (32 & b2) {
                a2.back = -1, a2.mode = Te;
                break;
              }
              if (64 & b2) {
                t2.msg = "invalid literal/length code", a2.mode = Be;
                break;
              }
              a2.extra = 15 & b2, a2.mode = 16201;
            case 16201:
              if (a2.extra) {
                for (A2 = a2.extra;d2 < A2; ) {
                  if (o2 === 0)
                    break t;
                  o2--, h2 += n2[r2++] << d2, d2 += 8;
                }
                a2.length += h2 & (1 << a2.extra) - 1, h2 >>>= a2.extra, d2 -= a2.extra, a2.back += a2.extra;
              }
              a2.was = a2.length, a2.mode = 16202;
            case 16202:
              for (;b2 = (E2 = a2.distcode[h2 & (1 << a2.distbits) - 1]) >>> 16 & 255, g2 = 65535 & E2, !((m2 = E2 >>> 24) <= d2); ) {
                if (o2 === 0)
                  break t;
                o2--, h2 += n2[r2++] << d2, d2 += 8;
              }
              if ((240 & b2) == 0) {
                for (p2 = m2, v2 = b2, k2 = g2;b2 = (E2 = a2.distcode[k2 + ((h2 & (1 << p2 + v2) - 1) >> p2)]) >>> 16 & 255, g2 = 65535 & E2, !(p2 + (m2 = E2 >>> 24) <= d2); ) {
                  if (o2 === 0)
                    break t;
                  o2--, h2 += n2[r2++] << d2, d2 += 8;
                }
                h2 >>>= p2, d2 -= p2, a2.back += p2;
              }
              if (h2 >>>= m2, d2 -= m2, a2.back += m2, 64 & b2) {
                t2.msg = "invalid distance code", a2.mode = Be;
                break;
              }
              a2.offset = g2, a2.extra = 15 & b2, a2.mode = 16203;
            case 16203:
              if (a2.extra) {
                for (A2 = a2.extra;d2 < A2; ) {
                  if (o2 === 0)
                    break t;
                  o2--, h2 += n2[r2++] << d2, d2 += 8;
                }
                a2.offset += h2 & (1 << a2.extra) - 1, h2 >>>= a2.extra, d2 -= a2.extra, a2.back += a2.extra;
              }
              if (a2.offset > a2.dmax) {
                t2.msg = "invalid distance too far back", a2.mode = Be;
                break;
              }
              a2.mode = 16204;
            case 16204:
              if (l2 === 0)
                break t;
              if (u2 = f2 - l2, a2.offset > u2) {
                if ((u2 = a2.offset - u2) > a2.whave && a2.sane) {
                  t2.msg = "invalid distance too far back", a2.mode = Be;
                  break;
                }
                u2 > a2.wnext ? (u2 -= a2.wnext, c2 = a2.wsize - u2) : c2 = a2.wnext - u2, u2 > a2.length && (u2 = a2.length), w2 = a2.window;
              } else
                w2 = i2, c2 = s2 - a2.offset, u2 = a2.length;
              u2 > l2 && (u2 = l2), l2 -= u2, a2.length -= u2;
              do {
                i2[s2++] = w2[c2++];
              } while (--u2);
              a2.length === 0 && (a2.mode = Le);
              break;
            case 16205:
              if (l2 === 0)
                break t;
              i2[s2++] = a2.length, l2--, a2.mode = Le;
              break;
            case Ne:
              if (a2.wrap) {
                for (;d2 < 32; ) {
                  if (o2 === 0)
                    break t;
                  o2--, h2 |= n2[r2++] << d2, d2 += 8;
                }
                if (f2 -= l2, t2.total_out += f2, a2.total += f2, 4 & a2.wrap && f2 && (t2.adler = a2.check = a2.flags ? H(a2.check, i2, f2, s2 - f2) : C(a2.check, i2, f2, s2 - f2)), f2 = l2, 4 & a2.wrap && (a2.flags ? h2 : Ce(h2)) !== a2.check) {
                  t2.msg = "incorrect data check", a2.mode = Be;
                  break;
                }
                h2 = 0, d2 = 0;
              }
              a2.mode = 16207;
            case 16207:
              if (a2.wrap && a2.flags) {
                for (;d2 < 32; ) {
                  if (o2 === 0)
                    break t;
                  o2--, h2 += n2[r2++] << d2, d2 += 8;
                }
                if (4 & a2.wrap && h2 !== (4294967295 & a2.total)) {
                  t2.msg = "incorrect length check", a2.mode = Be;
                  break;
                }
                h2 = 0, d2 = 0;
              }
              a2.mode = 16208;
            case 16208:
              x2 = xe;
              break t;
            case Be:
              x2 = Ee;
              break t;
            case 16210:
              return Re;
            default:
              return Ae;
          }
      return t2.next_out = s2, t2.avail_out = l2, t2.next_in = r2, t2.avail_in = o2, a2.hold = h2, a2.bits = d2, (a2.wsize || f2 !== t2.avail_out && a2.mode < Be && (a2.mode < Ne || e2 !== pe)) && Je(t2, t2.output, t2.next_out, f2 - t2.avail_out), _2 -= t2.avail_in, f2 -= t2.avail_out, t2.total_in += _2, t2.total_out += f2, a2.total += f2, 4 & a2.wrap && f2 && (t2.adler = a2.check = a2.flags ? H(a2.check, i2, f2, t2.next_out - f2) : C(a2.check, i2, f2, t2.next_out - f2)), t2.data_type = a2.bits + (a2.last ? 64 : 0) + (a2.mode === Te ? 128 : 0) + (a2.mode === Fe || a2.mode === Ie ? 256 : 0), (_2 === 0 && f2 === 0 || e2 === pe) && x2 === ye && (x2 = Ze), x2;
    }, inflateEnd: function(t2) {
      if (Ke(t2))
        return Ae;
      var e2 = t2.state;
      return e2.window && (e2.window = null), t2.state = null, ye;
    }, inflateGetHeader: function(t2, e2) {
      if (Ke(t2))
        return Ae;
      var a2 = t2.state;
      return (2 & a2.wrap) == 0 ? Ae : (a2.head = e2, e2.done = false, ye);
    }, inflateSetDictionary: function(t2, e2) {
      var a2, n2 = e2.length;
      return Ke(t2) || (a2 = t2.state).wrap !== 0 && a2.mode !== De ? Ae : a2.mode === De && C(1, e2, n2, 0) !== a2.check ? Ee : Je(t2, e2, n2, n2) ? (a2.mode = 16210, Re) : (a2.havedict = 1, ye);
    }, inflateInfo: "pako inflate (from Nodeca project)" };
    var Ve = function() {
      this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
    }, $e = Object.prototype.toString, ta = K.Z_NO_FLUSH, ea = K.Z_FINISH, aa = K.Z_OK, na = K.Z_STREAM_END, ia = K.Z_NEED_DICT, ra = K.Z_STREAM_ERROR, sa = K.Z_DATA_ERROR, oa = K.Z_MEM_ERROR;
    function la(t2) {
      this.options = Kt({ chunkSize: 65536, windowBits: 15, to: "" }, t2 || {});
      var e2 = this.options;
      e2.raw && e2.windowBits >= 0 && e2.windowBits < 16 && (e2.windowBits = -e2.windowBits, e2.windowBits === 0 && (e2.windowBits = -15)), !(e2.windowBits >= 0 && e2.windowBits < 16) || t2 && t2.windowBits || (e2.windowBits += 32), e2.windowBits > 15 && e2.windowBits < 48 && (15 & e2.windowBits) == 0 && (e2.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new Qt, this.strm.avail_out = 0;
      var a2 = Qe.inflateInit2(this.strm, e2.windowBits);
      if (a2 !== aa)
        throw new Error(j[a2]);
      if (this.header = new Ve, Qe.inflateGetHeader(this.strm, this.header), e2.dictionary && (typeof e2.dictionary == "string" ? e2.dictionary = Wt(e2.dictionary) : $e.call(e2.dictionary) === "[object ArrayBuffer]" && (e2.dictionary = new Uint8Array(e2.dictionary)), e2.raw && (a2 = Qe.inflateSetDictionary(this.strm, e2.dictionary)) !== aa))
        throw new Error(j[a2]);
    }
    function ha(t2, e2) {
      var a2 = new la(e2);
      if (a2.push(t2), a2.err)
        throw a2.msg || j[a2.err];
      return a2.result;
    }
    la.prototype.push = function(t2, e2) {
      var a2, n2, i2, r2 = this.strm, s2 = this.options.chunkSize, o2 = this.options.dictionary;
      if (this.ended)
        return false;
      for (n2 = e2 === ~~e2 ? e2 : e2 === true ? ea : ta, $e.call(t2) === "[object ArrayBuffer]" ? r2.input = new Uint8Array(t2) : r2.input = t2, r2.next_in = 0, r2.avail_in = r2.input.length;; ) {
        for (r2.avail_out === 0 && (r2.output = new Uint8Array(s2), r2.next_out = 0, r2.avail_out = s2), (a2 = Qe.inflate(r2, n2)) === ia && o2 && ((a2 = Qe.inflateSetDictionary(r2, o2)) === aa ? a2 = Qe.inflate(r2, n2) : a2 === sa && (a2 = ia));r2.avail_in > 0 && a2 === na && r2.state.wrap > 0 && t2[r2.next_in] !== 0; )
          Qe.inflateReset(r2), a2 = Qe.inflate(r2, n2);
        switch (a2) {
          case ra:
          case sa:
          case ia:
          case oa:
            return this.onEnd(a2), this.ended = true, false;
        }
        if (i2 = r2.avail_out, r2.next_out && (r2.avail_out === 0 || a2 === na))
          if (this.options.to === "string") {
            var l2 = Jt(r2.output, r2.next_out), h2 = r2.next_out - l2, d2 = qt(r2.output, l2);
            r2.next_out = h2, r2.avail_out = s2 - h2, h2 && r2.output.set(r2.output.subarray(l2, l2 + h2), 0), this.onData(d2);
          } else
            this.onData(r2.output.length === r2.next_out ? r2.output : r2.output.subarray(0, r2.next_out));
        if (a2 !== aa || i2 !== 0) {
          if (a2 === na)
            return a2 = Qe.inflateEnd(this.strm), this.onEnd(a2), this.ended = true, true;
          if (r2.avail_in === 0)
            break;
        }
      }
      return true;
    }, la.prototype.onData = function(t2) {
      this.chunks.push(t2);
    }, la.prototype.onEnd = function(t2) {
      t2 === aa && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Pt(this.chunks)), this.chunks = [], this.err = t2, this.msg = this.strm.msg;
    };
    var da = { Inflate: la, inflate: ha, inflateRaw: function(t2, e2) {
      return (e2 = e2 || {}).raw = true, ha(t2, e2);
    }, ungzip: ha, constants: K }, _a = de.Deflate, fa = de.deflate, ua = de.deflateRaw, ca = de.gzip, wa = da.Inflate, ma = da.inflate, ba = da.inflateRaw, ga = da.ungzip, pa = K, va = { Deflate: _a, deflate: fa, deflateRaw: ua, gzip: ca, Inflate: wa, inflate: ma, inflateRaw: ba, ungzip: ga, constants: pa };
    t.Deflate = _a, t.Inflate = wa, t.constants = pa, t.default = va, t.deflate = fa, t.deflateRaw = ua, t.gzip = ca, t.inflate = ma, t.inflateRaw = ba, t.ungzip = ga, Object.defineProperty(t, "__esModule", { value: true });
  });
});

// node_modules/pizzip/js/flate.js
var require_flate = __commonJS((exports) => {
  var USE_TYPEDARRAY = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";
  var pako = require_pako_es5_min();
  exports.uncompressInputType = USE_TYPEDARRAY ? "uint8array" : "array";
  exports.compressInputType = USE_TYPEDARRAY ? "uint8array" : "array";
  exports.magic = "\b\x00";
  exports.compress = function(input, compressionOptions) {
    return pako.deflateRaw(input, {
      level: compressionOptions.level || -1
    });
  };
  exports.uncompress = function(input) {
    return pako.inflateRaw(input);
  };
});

// node_modules/pizzip/js/compressions.js
var require_compressions = __commonJS((exports) => {
  exports.STORE = {
    magic: "\x00\x00",
    compress: function compress(content) {
      return content;
    },
    uncompress: function uncompress(content) {
      return content;
    },
    compressInputType: null,
    uncompressInputType: null
  };
  exports.DEFLATE = require_flate();
});

// node_modules/pizzip/js/nodeBuffer.js
var require_nodeBuffer = __commonJS((exports, module) => {
  module.exports = function(data, encoding) {
    if (typeof data === "number") {
      return Buffer.alloc(data);
    }
    return Buffer.from(data, encoding);
  };
  module.exports.test = function(b) {
    return Buffer.isBuffer(b);
  };
});

// node_modules/pizzip/js/utils.js
var require_utils = __commonJS((exports) => {
  function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o2) {
      return typeof o2;
    } : function(o2) {
      return o2 && typeof Symbol == "function" && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
    }, _typeof(o);
  }
  var support = require_support();
  var compressions = require_compressions();
  var nodeBuffer = require_nodeBuffer();
  exports.string2binary = function(str) {
    var result = "";
    for (var i = 0;i < str.length; i++) {
      result += String.fromCharCode(str.charCodeAt(i) & 255);
    }
    return result;
  };
  exports.arrayBuffer2Blob = function(buffer, mimeType) {
    exports.checkSupport("blob");
    mimeType = mimeType || "application/zip";
    try {
      return new Blob([buffer], {
        type: mimeType
      });
    } catch (_unused) {
      try {
        var Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
        var builder = new Builder;
        builder.append(buffer);
        return builder.getBlob(mimeType);
      } catch (_unused2) {
        throw new Error("Bug : can't construct the Blob.");
      }
    }
  };
  function identity(input) {
    return input;
  }
  function stringToArrayLike(str, array) {
    for (var i = 0;i < str.length; ++i) {
      array[i] = str.charCodeAt(i) & 255;
    }
    return array;
  }
  function arrayLikeToString(array) {
    var chunk = 65536;
    var result = [], len = array.length, type = exports.getTypeOf(array);
    var k = 0, canUseApply = true;
    try {
      switch (type) {
        case "uint8array":
          String.fromCharCode.apply(null, new Uint8Array(0));
          break;
        case "nodebuffer":
          String.fromCharCode.apply(null, nodeBuffer(0));
          break;
      }
    } catch (_unused3) {
      canUseApply = false;
    }
    if (!canUseApply) {
      var resultStr = "";
      for (var i = 0;i < array.length; i++) {
        resultStr += String.fromCharCode(array[i]);
      }
      return resultStr;
    }
    while (k < len && chunk > 1) {
      try {
        if (type === "array" || type === "nodebuffer") {
          result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
        } else {
          result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
        }
        k += chunk;
      } catch (_unused4) {
        chunk = Math.floor(chunk / 2);
      }
    }
    return result.join("");
  }
  exports.applyFromCharCode = arrayLikeToString;
  function arrayLikeToArrayLike(arrayFrom, arrayTo) {
    for (var i = 0;i < arrayFrom.length; i++) {
      arrayTo[i] = arrayFrom[i];
    }
    return arrayTo;
  }
  var transform = {};
  transform.string = {
    string: identity,
    array: function array(input) {
      return stringToArrayLike(input, new Array(input.length));
    },
    arraybuffer: function arraybuffer(input) {
      return transform.string.uint8array(input).buffer;
    },
    uint8array: function uint8array(input) {
      return stringToArrayLike(input, new Uint8Array(input.length));
    },
    nodebuffer: function nodebuffer(input) {
      return stringToArrayLike(input, nodeBuffer(input.length));
    }
  };
  transform.array = {
    string: arrayLikeToString,
    array: identity,
    arraybuffer: function arraybuffer(input) {
      return new Uint8Array(input).buffer;
    },
    uint8array: function uint8array(input) {
      return new Uint8Array(input);
    },
    nodebuffer: function nodebuffer(input) {
      return nodeBuffer(input);
    }
  };
  transform.arraybuffer = {
    string: function string(input) {
      return arrayLikeToString(new Uint8Array(input));
    },
    array: function array(input) {
      return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
    },
    arraybuffer: identity,
    uint8array: function uint8array(input) {
      return new Uint8Array(input);
    },
    nodebuffer: function nodebuffer(input) {
      return nodeBuffer(new Uint8Array(input));
    }
  };
  transform.uint8array = {
    string: arrayLikeToString,
    array: function array(input) {
      return arrayLikeToArrayLike(input, new Array(input.length));
    },
    arraybuffer: function arraybuffer(input) {
      return input.buffer;
    },
    uint8array: identity,
    nodebuffer: function nodebuffer(input) {
      return nodeBuffer(input);
    }
  };
  transform.nodebuffer = {
    string: arrayLikeToString,
    array: function array(input) {
      return arrayLikeToArrayLike(input, new Array(input.length));
    },
    arraybuffer: function arraybuffer(input) {
      return transform.nodebuffer.uint8array(input).buffer;
    },
    uint8array: function uint8array(input) {
      return arrayLikeToArrayLike(input, new Uint8Array(input.length));
    },
    nodebuffer: identity
  };
  exports.transformTo = function(outputType, input) {
    if (!input) {
      input = "";
    }
    if (!outputType) {
      return input;
    }
    exports.checkSupport(outputType);
    var inputType = exports.getTypeOf(input);
    var result = transform[inputType][outputType](input);
    return result;
  };
  exports.getTypeOf = function(input) {
    if (input == null) {
      return;
    }
    if (typeof input === "string") {
      return "string";
    }
    var protoResult = Object.prototype.toString.call(input);
    if (protoResult === "[object Array]") {
      return "array";
    }
    if (support.nodebuffer && nodeBuffer.test(input)) {
      return "nodebuffer";
    }
    if (support.uint8array && protoResult === "[object Uint8Array]") {
      return "uint8array";
    }
    if (support.arraybuffer && protoResult === "[object ArrayBuffer]") {
      return "arraybuffer";
    }
    if (protoResult === "[object Promise]") {
      throw new Error("Cannot read data from a promise, you probably are running new PizZip(data) with a promise");
    }
    if (_typeof(input) === "object" && typeof input.file === "function") {
      throw new Error("Cannot read data from a pizzip instance, you probably are running new PizZip(zip) with a zipinstance");
    }
    if (protoResult === "[object Date]") {
      throw new Error("Cannot read data from a Date, you probably are running new PizZip(data) with a date");
    }
    if (_typeof(input) === "object" && input.crc32 == null) {
      throw new Error("Unsupported data given to new PizZip(data) (object given)");
    }
  };
  exports.checkSupport = function(type) {
    var supported = support[type.toLowerCase()];
    if (!supported) {
      throw new Error(type + " is not supported by this browser");
    }
  };
  exports.MAX_VALUE_16BITS = 65535;
  exports.MAX_VALUE_32BITS = -1;
  exports.pretty = function(str) {
    var res = "", code, i;
    for (i = 0;i < (str || "").length; i++) {
      code = str.charCodeAt(i);
      res += "\\x" + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
    }
    return res;
  };
  exports.findCompression = function(compressionMethod) {
    for (var method in compressions) {
      if (!compressions.hasOwnProperty(method)) {
        continue;
      }
      if (compressions[method].magic === compressionMethod) {
        return compressions[method];
      }
    }
    return null;
  };
  exports.isRegExp = function(object) {
    return Object.prototype.toString.call(object) === "[object RegExp]";
  };
  exports.extend = function() {
    var result = {};
    var i, attr;
    for (i = 0;i < arguments.length; i++) {
      for (attr in arguments[i]) {
        if (arguments[i].hasOwnProperty(attr) && typeof result[attr] === "undefined") {
          result[attr] = arguments[i][attr];
        }
      }
    }
    return result;
  };
});

// node_modules/pizzip/js/crc32.js
var require_crc32 = __commonJS((exports, module) => {
  var utils = require_utils();
  var table = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918000, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
  module.exports = function crc32(input, crc) {
    if (typeof input === "undefined" || !input.length) {
      return 0;
    }
    var isArray = utils.getTypeOf(input) !== "string";
    if (typeof crc == "undefined") {
      crc = 0;
    }
    var x = 0;
    var y = 0;
    var b = 0;
    crc ^= -1;
    for (var i = 0, iTop = input.length;i < iTop; i++) {
      b = isArray ? input[i] : input.charCodeAt(i);
      y = (crc ^ b) & 255;
      x = table[y];
      crc = crc >>> 8 ^ x;
    }
    return crc ^ -1;
  };
});

// node_modules/pizzip/js/signature.js
var require_signature = __commonJS((exports) => {
  exports.LOCAL_FILE_HEADER = "PK\x03\x04";
  exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
  exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
  exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
  exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
  exports.DATA_DESCRIPTOR = "PK\x07\b";
});

// node_modules/pizzip/js/defaults.js
var require_defaults = __commonJS((exports) => {
  exports.base64 = false;
  exports.binary = false;
  exports.dir = false;
  exports.createFolders = false;
  exports.date = null;
  exports.compression = null;
  exports.compressionOptions = null;
  exports.comment = null;
  exports.unixPermissions = null;
  exports.dosPermissions = null;
});

// node_modules/pizzip/js/compressedObject.js
var require_compressedObject = __commonJS((exports, module) => {
  function CompressedObject() {
    this.compressedSize = 0;
    this.uncompressedSize = 0;
    this.crc32 = 0;
    this.compressionMethod = null;
    this.compressedContent = null;
  }
  CompressedObject.prototype = {
    getContent: function getContent() {
      return null;
    },
    getCompressedContent: function getCompressedContent() {
      return null;
    }
  };
  module.exports = CompressedObject;
});

// node_modules/pizzip/js/utf8.js
var require_utf8 = __commonJS((exports) => {
  var utils = require_utils();
  var support = require_support();
  var nodeBuffer = require_nodeBuffer();
  var _utf8len = new Array(256);
  for (i = 0;i < 256; i++) {
    _utf8len[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
  }
  var i;
  _utf8len[254] = _utf8len[254] = 1;
  function string2buf(str) {
    var buf, c, c2, mPos, i2, bufLen = 0;
    var strLen = str.length;
    for (mPos = 0;mPos < strLen; mPos++) {
      c = str.charCodeAt(mPos);
      if ((c & 64512) === 55296 && mPos + 1 < strLen) {
        c2 = str.charCodeAt(mPos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          mPos++;
        }
      }
      bufLen += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    }
    if (support.uint8array) {
      buf = new Uint8Array(bufLen);
    } else {
      buf = new Array(bufLen);
    }
    for (i2 = 0, mPos = 0;i2 < bufLen; mPos++) {
      c = str.charCodeAt(mPos);
      if ((c & 64512) === 55296 && mPos + 1 < strLen) {
        c2 = str.charCodeAt(mPos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          mPos++;
        }
      }
      if (c < 128) {
        buf[i2++] = c;
      } else if (c < 2048) {
        buf[i2++] = 192 | c >>> 6;
        buf[i2++] = 128 | c & 63;
      } else if (c < 65536) {
        buf[i2++] = 224 | c >>> 12;
        buf[i2++] = 128 | c >>> 6 & 63;
        buf[i2++] = 128 | c & 63;
      } else {
        buf[i2++] = 240 | c >>> 18;
        buf[i2++] = 128 | c >>> 12 & 63;
        buf[i2++] = 128 | c >>> 6 & 63;
        buf[i2++] = 128 | c & 63;
      }
    }
    return buf;
  }
  function utf8border(buf, max) {
    var pos;
    max = max || buf.length;
    if (max > buf.length) {
      max = buf.length;
    }
    pos = max - 1;
    while (pos >= 0 && (buf[pos] & 192) === 128) {
      pos--;
    }
    if (pos < 0) {
      return max;
    }
    if (pos === 0) {
      return max;
    }
    return pos + _utf8len[buf[pos]] > max ? pos : max;
  }
  function buf2string(buf) {
    var i2, out, c, cLen;
    var len = buf.length;
    var utf16buf = new Array(len * 2);
    for (out = 0, i2 = 0;i2 < len; ) {
      c = buf[i2++];
      if (c < 128) {
        utf16buf[out++] = c;
        continue;
      }
      cLen = _utf8len[c];
      if (cLen > 4) {
        utf16buf[out++] = 65533;
        i2 += cLen - 1;
        continue;
      }
      c &= cLen === 2 ? 31 : cLen === 3 ? 15 : 7;
      while (cLen > 1 && i2 < len) {
        c = c << 6 | buf[i2++] & 63;
        cLen--;
      }
      if (cLen > 1) {
        utf16buf[out++] = 65533;
        continue;
      }
      if (c < 65536) {
        utf16buf[out++] = c;
      } else {
        c -= 65536;
        utf16buf[out++] = 55296 | c >> 10 & 1023;
        utf16buf[out++] = 56320 | c & 1023;
      }
    }
    if (utf16buf.length !== out) {
      if (utf16buf.subarray) {
        utf16buf = utf16buf.subarray(0, out);
      } else {
        utf16buf.length = out;
      }
    }
    return utils.applyFromCharCode(utf16buf);
  }
  exports.utf8encode = function utf8encode(str) {
    if (support.nodebuffer) {
      return nodeBuffer(str, "utf-8");
    }
    return string2buf(str);
  };
  exports.utf8decode = function utf8decode(buf) {
    if (support.nodebuffer) {
      return utils.transformTo("nodebuffer", buf).toString("utf-8");
    }
    buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);
    var result = [], len = buf.length, chunk = 65536;
    var k = 0;
    while (k < len) {
      var nextBoundary = utf8border(buf, Math.min(k + chunk, len));
      if (support.uint8array) {
        result.push(buf2string(buf.subarray(k, nextBoundary)));
      } else {
        result.push(buf2string(buf.slice(k, nextBoundary)));
      }
      k = nextBoundary;
    }
    return result.join("");
  };
});

// node_modules/pizzip/js/stringWriter.js
var require_stringWriter = __commonJS((exports, module) => {
  var utils = require_utils();
  function StringWriter() {
    this.data = [];
  }
  StringWriter.prototype = {
    append: function append(input) {
      input = utils.transformTo("string", input);
      this.data.push(input);
    },
    finalize: function finalize() {
      return this.data.join("");
    }
  };
  module.exports = StringWriter;
});

// node_modules/pizzip/js/uint8ArrayWriter.js
var require_uint8ArrayWriter = __commonJS((exports, module) => {
  var utils = require_utils();
  function Uint8ArrayWriter(length) {
    this.data = new Uint8Array(length);
    this.index = 0;
  }
  Uint8ArrayWriter.prototype = {
    append: function append(input) {
      if (input.length !== 0) {
        input = utils.transformTo("uint8array", input);
        this.data.set(input, this.index);
        this.index += input.length;
      }
    },
    finalize: function finalize() {
      return this.data;
    }
  };
  module.exports = Uint8ArrayWriter;
});

// node_modules/pizzip/js/object.js
var require_object = __commonJS((exports, module) => {
  function _createForOfIteratorHelper(r, e) {
    var t = typeof Symbol != "undefined" && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && typeof r.length == "number") {
        t && (r = t);
        var _n = 0, F = function F() {};
        return { s: F, n: function n() {
          return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
        }, e: function e(r2) {
          throw r2;
        }, f: F };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var o, a = true, u = false;
    return { s: function s() {
      t = t.call(r);
    }, n: function n() {
      var r2 = t.next();
      return a = r2.done, r2;
    }, e: function e(r2) {
      u = true, o = r2;
    }, f: function f() {
      try {
        a || t["return"] == null || t["return"]();
      } finally {
        if (u)
          throw o;
      }
    } };
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if (typeof r == "string")
        return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : undefined;
    }
  }
  function _arrayLikeToArray(r, a) {
    (a == null || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a);e < a; e++)
      n[e] = r[e];
    return n;
  }
  var support = require_support();
  var utils = require_utils();
  var _crc = require_crc32();
  var signature = require_signature();
  var defaults = require_defaults();
  var base64 = require_base64();
  var compressions = require_compressions();
  var CompressedObject = require_compressedObject();
  var nodeBuffer = require_nodeBuffer();
  var utf8 = require_utf8();
  var StringWriter = require_stringWriter();
  var Uint8ArrayWriter = require_uint8ArrayWriter();
  function getRawData(file) {
    if (file._data instanceof CompressedObject) {
      file._data = file._data.getContent();
      file.options.binary = true;
      file.options.base64 = false;
      if (utils.getTypeOf(file._data) === "uint8array") {
        var copy = file._data;
        file._data = new Uint8Array(copy.length);
        if (copy.length !== 0) {
          file._data.set(copy, 0);
        }
      }
    }
    return file._data;
  }
  function getBinaryData(file) {
    var result = getRawData(file), type = utils.getTypeOf(result);
    if (type === "string") {
      if (!file.options.binary) {
        if (support.nodebuffer) {
          return nodeBuffer(result, "utf-8");
        }
      }
      return file.asBinary();
    }
    return result;
  }
  var out = {
    load: function load() {
      throw new Error("Load method is not defined. Is the file pizzip-load.js included ?");
    },
    filter: function filter(search) {
      var result = [];
      var filename, relativePath, file, fileClone;
      for (filename in this.files) {
        if (!this.files.hasOwnProperty(filename)) {
          continue;
        }
        file = this.files[filename];
        fileClone = new ZipObject(file.name, file._data, utils.extend(file.options));
        relativePath = filename.slice(this.root.length, filename.length);
        if (filename.slice(0, this.root.length) === this.root && search(relativePath, fileClone)) {
          result.push(fileClone);
        }
      }
      return result;
    },
    file: function file(name, data, o) {
      if (arguments.length === 1) {
        if (utils.isRegExp(name)) {
          var regexp = name;
          return this.filter(function(relativePath, file) {
            return !file.dir && regexp.test(relativePath);
          });
        }
        return this.filter(function(relativePath, file) {
          return !file.dir && relativePath === name;
        })[0] || null;
      }
      name = this.root + name;
      fileAdd.call(this, name, data, o);
      return this;
    },
    folder: function folder(arg) {
      if (!arg) {
        return this;
      }
      if (utils.isRegExp(arg)) {
        return this.filter(function(relativePath, file) {
          return file.dir && arg.test(relativePath);
        });
      }
      var name = this.root + arg;
      var newFolder = folderAdd.call(this, name);
      var ret = this.shallowClone();
      ret.root = newFolder.name;
      return ret;
    },
    remove: function remove(name) {
      name = this.root + name;
      var file = this.files[name];
      if (!file) {
        if (name.slice(-1) !== "/") {
          name += "/";
        }
        file = this.files[name];
      }
      if (file && !file.dir) {
        delete this.files[name];
      } else {
        var kids = this.filter(function(relativePath, file2) {
          return file2.name.slice(0, name.length) === name;
        });
        for (var i = 0;i < kids.length; i++) {
          delete this.files[kids[i].name];
        }
      }
      return this;
    },
    generate: function generate(options) {
      options = utils.extend(options || {}, {
        base64: true,
        compression: "STORE",
        compressionOptions: null,
        type: "base64",
        platform: "DOS",
        comment: null,
        mimeType: "application/zip",
        encodeFileName: utf8.utf8encode
      });
      utils.checkSupport(options.type);
      if (options.platform === "darwin" || options.platform === "freebsd" || options.platform === "linux" || options.platform === "sunos") {
        options.platform = "UNIX";
      }
      if (options.platform === "win32") {
        options.platform = "DOS";
      }
      var zipData = [], encodedComment = utils.transformTo("string", options.encodeFileName(options.comment || this.comment || ""));
      var localDirLength = 0, centralDirLength = 0, writer, i;
      var fileNames = [];
      if (options.fileOrder instanceof Array) {
        fileNames = options.fileOrder;
      }
      for (var name in this.files) {
        if (fileNames.indexOf(name) === -1) {
          fileNames.push(name);
        }
      }
      if (typeof options.fileOrder === "function") {
        fileNames = options.fileOrder(this.files);
      }
      var _iterator = _createForOfIteratorHelper(fileNames), _step;
      try {
        for (_iterator.s();!(_step = _iterator.n()).done; ) {
          var _name = _step.value;
          if (!this.files.hasOwnProperty(_name)) {
            continue;
          }
          var file = this.files[_name];
          var compressionName = file.options.compression || options.compression.toUpperCase();
          var compression = compressions[compressionName];
          if (!compression) {
            throw new Error(compressionName + " is not a valid compression method !");
          }
          var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
          var compressedObject = generateCompressedObjectFrom.call(this, file, compression, compressionOptions);
          var zipPart = generateZipParts.call(this, _name, file, compressedObject, localDirLength, options.platform, options.encodeFileName);
          localDirLength += zipPart.fileRecord.length + compressedObject.compressedSize;
          centralDirLength += zipPart.dirRecord.length;
          zipData.push(zipPart);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var dirEnd = "";
      dirEnd = signature.CENTRAL_DIRECTORY_END + "\x00\x00" + "\x00\x00" + decToHex(zipData.length, 2) + decToHex(zipData.length, 2) + decToHex(centralDirLength, 4) + decToHex(localDirLength, 4) + decToHex(encodedComment.length, 2) + encodedComment;
      var typeName = options.type.toLowerCase();
      if (typeName === "uint8array" || typeName === "arraybuffer" || typeName === "blob" || typeName === "nodebuffer") {
        writer = new Uint8ArrayWriter(localDirLength + centralDirLength + dirEnd.length);
      } else {
        writer = new StringWriter(localDirLength + centralDirLength + dirEnd.length);
      }
      for (i = 0;i < zipData.length; i++) {
        writer.append(zipData[i].fileRecord);
        writer.append(zipData[i].compressedObject.compressedContent);
      }
      for (i = 0;i < zipData.length; i++) {
        writer.append(zipData[i].dirRecord);
      }
      writer.append(dirEnd);
      var zip = writer.finalize();
      switch (options.type.toLowerCase()) {
        case "uint8array":
        case "arraybuffer":
        case "nodebuffer":
          return utils.transformTo(options.type.toLowerCase(), zip);
        case "blob":
          return utils.arrayBuffer2Blob(utils.transformTo("arraybuffer", zip), options.mimeType);
        case "base64":
          return options.base64 ? base64.encode(zip) : zip;
        default:
          return zip;
      }
    },
    crc32: function crc32(input, crc) {
      return _crc(input, crc);
    },
    utf8encode: function utf8encode(string) {
      return utils.transformTo("string", utf8.utf8encode(string));
    },
    utf8decode: function utf8decode(input) {
      return utf8.utf8decode(input);
    }
  };
  function dataToString(asUTF8) {
    var result = getRawData(this);
    if (result === null || typeof result === "undefined") {
      return "";
    }
    if (this.options.base64) {
      result = base64.decode(result);
    }
    if (asUTF8 && this.options.binary) {
      result = out.utf8decode(result);
    } else {
      result = utils.transformTo("string", result);
    }
    if (!asUTF8 && !this.options.binary) {
      result = utils.transformTo("string", out.utf8encode(result));
    }
    return result;
  }
  function ZipObject(name, data, options) {
    this.name = name;
    this.dir = options.dir;
    this.date = options.date;
    this.comment = options.comment;
    this.unixPermissions = options.unixPermissions;
    this.dosPermissions = options.dosPermissions;
    this._data = data;
    this.options = options;
    this._initialMetadata = {
      dir: options.dir,
      date: options.date
    };
  }
  ZipObject.prototype = {
    asText: function asText() {
      return dataToString.call(this, true);
    },
    asBinary: function asBinary() {
      return dataToString.call(this, false);
    },
    asNodeBuffer: function asNodeBuffer() {
      var result = getBinaryData(this);
      return utils.transformTo("nodebuffer", result);
    },
    asUint8Array: function asUint8Array() {
      var result = getBinaryData(this);
      return utils.transformTo("uint8array", result);
    },
    asArrayBuffer: function asArrayBuffer() {
      return this.asUint8Array().buffer;
    }
  };
  function decToHex(dec, bytes) {
    var hex = "", i;
    for (i = 0;i < bytes; i++) {
      hex += String.fromCharCode(dec & 255);
      dec >>>= 8;
    }
    return hex;
  }
  function prepareFileAttrs(o) {
    o = o || {};
    if (o.base64 === true && (o.binary === null || o.binary === undefined)) {
      o.binary = true;
    }
    o = utils.extend(o, defaults);
    o.date = o.date || new Date;
    if (o.compression !== null) {
      o.compression = o.compression.toUpperCase();
    }
    return o;
  }
  function fileAdd(name, data, o) {
    var dataType = utils.getTypeOf(data), parent;
    o = prepareFileAttrs(o);
    if (typeof o.unixPermissions === "string") {
      o.unixPermissions = parseInt(o.unixPermissions, 8);
    }
    if (o.unixPermissions && o.unixPermissions & 16384) {
      o.dir = true;
    }
    if (o.dosPermissions && o.dosPermissions & 16) {
      o.dir = true;
    }
    if (o.dir) {
      name = forceTrailingSlash(name);
    }
    if (o.createFolders && (parent = parentFolder(name))) {
      folderAdd.call(this, parent, true);
    }
    if (o.dir || data === null || typeof data === "undefined") {
      o.base64 = false;
      o.binary = false;
      data = null;
      dataType = null;
    } else if (dataType === "string") {
      if (o.binary && !o.base64) {
        if (o.optimizedBinaryString !== true) {
          data = utils.string2binary(data);
        }
      }
    } else {
      o.base64 = false;
      o.binary = true;
      if (!dataType && !(data instanceof CompressedObject)) {
        throw new Error("The data of '" + name + "' is in an unsupported format !");
      }
      if (dataType === "arraybuffer") {
        data = utils.transformTo("uint8array", data);
      }
    }
    var object = new ZipObject(name, data, o);
    this.files[name] = object;
    return object;
  }
  function parentFolder(path) {
    if (path.slice(-1) === "/") {
      path = path.substring(0, path.length - 1);
    }
    var lastSlash = path.lastIndexOf("/");
    return lastSlash > 0 ? path.substring(0, lastSlash) : "";
  }
  function forceTrailingSlash(path) {
    if (path.slice(-1) !== "/") {
      path += "/";
    }
    return path;
  }
  function folderAdd(name, createFolders) {
    createFolders = typeof createFolders !== "undefined" ? createFolders : false;
    name = forceTrailingSlash(name);
    if (!this.files[name]) {
      fileAdd.call(this, name, null, {
        dir: true,
        createFolders
      });
    }
    return this.files[name];
  }
  function generateCompressedObjectFrom(file, compression, compressionOptions) {
    var result = new CompressedObject;
    var content;
    if (file._data instanceof CompressedObject) {
      result.uncompressedSize = file._data.uncompressedSize;
      result.crc32 = file._data.crc32;
      if (result.uncompressedSize === 0 || file.dir) {
        compression = compressions.STORE;
        result.compressedContent = "";
        result.crc32 = 0;
      } else if (file._data.compressionMethod === compression.magic) {
        result.compressedContent = file._data.getCompressedContent();
      } else {
        content = file._data.getContent();
        result.compressedContent = compression.compress(utils.transformTo(compression.compressInputType, content), compressionOptions);
      }
    } else {
      content = getBinaryData(file);
      if (!content || content.length === 0 || file.dir) {
        compression = compressions.STORE;
        content = "";
      }
      result.uncompressedSize = content.length;
      result.crc32 = _crc(content);
      result.compressedContent = compression.compress(utils.transformTo(compression.compressInputType, content), compressionOptions);
    }
    result.compressedSize = result.compressedContent.length;
    result.compressionMethod = compression.magic;
    return result;
  }
  function generateUnixExternalFileAttr(unixPermissions, isDir) {
    var result = unixPermissions;
    if (!unixPermissions) {
      result = isDir ? 16893 : 33204;
    }
    return (result & 65535) << 16;
  }
  function generateDosExternalFileAttr(dosPermissions) {
    return (dosPermissions || 0) & 63;
  }
  function generateZipParts(name, file, compressedObject, offset, platform, encodeFileName) {
    var useCustomEncoding = encodeFileName !== utf8.utf8encode, encodedFileName = utils.transformTo("string", encodeFileName(file.name)), utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)), comment = file.comment || "", encodedComment = utils.transformTo("string", encodeFileName(comment)), utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)), useUTF8ForFileName = utfEncodedFileName.length !== file.name.length, useUTF8ForComment = utfEncodedComment.length !== comment.length, o = file.options;
    var dosTime, dosDate, extraFields = "", unicodePathExtraField = "", unicodeCommentExtraField = "", dir, date;
    if (file._initialMetadata.dir !== file.dir) {
      dir = file.dir;
    } else {
      dir = o.dir;
    }
    if (file._initialMetadata.date !== file.date) {
      date = file.date;
    } else {
      date = o.date;
    }
    var extFileAttr = 0;
    var versionMadeBy = 0;
    if (dir) {
      extFileAttr |= 16;
    }
    if (platform === "UNIX") {
      versionMadeBy = 798;
      extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
    } else {
      versionMadeBy = 20;
      extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
    }
    dosTime = date.getHours();
    dosTime <<= 6;
    dosTime |= date.getMinutes();
    dosTime <<= 5;
    dosTime |= date.getSeconds() / 2;
    dosDate = date.getFullYear() - 1980;
    dosDate <<= 4;
    dosDate |= date.getMonth() + 1;
    dosDate <<= 5;
    dosDate |= date.getDate();
    if (useUTF8ForFileName) {
      unicodePathExtraField = decToHex(1, 1) + decToHex(_crc(encodedFileName), 4) + utfEncodedFileName;
      extraFields += "up" + decToHex(unicodePathExtraField.length, 2) + unicodePathExtraField;
    }
    if (useUTF8ForComment) {
      unicodeCommentExtraField = decToHex(1, 1) + decToHex(this.crc32(encodedComment), 4) + utfEncodedComment;
      extraFields += "uc" + decToHex(unicodeCommentExtraField.length, 2) + unicodeCommentExtraField;
    }
    var header = "";
    header += `
\x00`;
    header += !useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment) ? "\x00\b" : "\x00\x00";
    header += compressedObject.compressionMethod;
    header += decToHex(dosTime, 2);
    header += decToHex(dosDate, 2);
    header += decToHex(compressedObject.crc32, 4);
    header += decToHex(compressedObject.compressedSize, 4);
    header += decToHex(compressedObject.uncompressedSize, 4);
    header += decToHex(encodedFileName.length, 2);
    header += decToHex(extraFields.length, 2);
    var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;
    var dirRecord = signature.CENTRAL_FILE_HEADER + decToHex(versionMadeBy, 2) + header + decToHex(encodedComment.length, 2) + "\x00\x00" + "\x00\x00" + decToHex(extFileAttr, 4) + decToHex(offset, 4) + encodedFileName + extraFields + encodedComment;
    return {
      fileRecord,
      dirRecord,
      compressedObject
    };
  }
  module.exports = out;
});

// node_modules/pizzip/js/dataReader.js
var require_dataReader = __commonJS((exports, module) => {
  var utils = require_utils();
  function DataReader() {
    this.data = null;
    this.length = 0;
    this.index = 0;
    this.zero = 0;
  }
  DataReader.prototype = {
    checkOffset: function checkOffset(offset) {
      this.checkIndex(this.index + offset);
    },
    checkIndex: function checkIndex(newIndex) {
      if (this.length < this.zero + newIndex || newIndex < 0) {
        throw new Error("End of data reached (data length = " + this.length + ", asked index = " + newIndex + "). Corrupted zip ?");
      }
    },
    setIndex: function setIndex(newIndex) {
      this.checkIndex(newIndex);
      this.index = newIndex;
    },
    skip: function skip(n) {
      this.setIndex(this.index + n);
    },
    byteAt: function byteAt() {},
    readInt: function readInt(size) {
      var result = 0, i;
      this.checkOffset(size);
      for (i = this.index + size - 1;i >= this.index; i--) {
        result = (result << 8) + this.byteAt(i);
      }
      this.index += size;
      return result;
    },
    readString: function readString(size) {
      return utils.transformTo("string", this.readData(size));
    },
    readData: function readData() {},
    lastIndexOfSignature: function lastIndexOfSignature() {},
    readDate: function readDate() {
      var dostime = this.readInt(4);
      return new Date((dostime >> 25 & 127) + 1980, (dostime >> 21 & 15) - 1, dostime >> 16 & 31, dostime >> 11 & 31, dostime >> 5 & 63, (dostime & 31) << 1);
    }
  };
  module.exports = DataReader;
});

// node_modules/pizzip/js/stringReader.js
var require_stringReader = __commonJS((exports, module) => {
  var DataReader = require_dataReader();
  var utils = require_utils();
  function StringReader(data, optimizedBinaryString) {
    this.data = data;
    if (!optimizedBinaryString) {
      this.data = utils.string2binary(this.data);
    }
    this.length = this.data.length;
    this.index = 0;
    this.zero = 0;
  }
  StringReader.prototype = new DataReader;
  StringReader.prototype.byteAt = function(i) {
    return this.data.charCodeAt(this.zero + i);
  };
  StringReader.prototype.lastIndexOfSignature = function(sig) {
    return this.data.lastIndexOf(sig) - this.zero;
  };
  StringReader.prototype.readData = function(size) {
    this.checkOffset(size);
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  module.exports = StringReader;
});

// node_modules/pizzip/js/arrayReader.js
var require_arrayReader = __commonJS((exports, module) => {
  var DataReader = require_dataReader();
  function ArrayReader(data) {
    if (data) {
      this.data = data;
      this.length = this.data.length;
      this.index = 0;
      this.zero = 0;
      for (var i = 0;i < this.data.length; i++) {
        data[i] &= data[i];
      }
    }
  }
  ArrayReader.prototype = new DataReader;
  ArrayReader.prototype.byteAt = function(i) {
    return this.data[this.zero + i];
  };
  ArrayReader.prototype.lastIndexOfSignature = function(sig) {
    var sig0 = sig.charCodeAt(0), sig1 = sig.charCodeAt(1), sig2 = sig.charCodeAt(2), sig3 = sig.charCodeAt(3);
    for (var i = this.length - 4;i >= 0; --i) {
      if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
        return i - this.zero;
      }
    }
    return -1;
  };
  ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if (size === 0) {
      return [];
    }
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  module.exports = ArrayReader;
});

// node_modules/pizzip/js/uint8ArrayReader.js
var require_uint8ArrayReader = __commonJS((exports, module) => {
  var ArrayReader = require_arrayReader();
  function Uint8ArrayReader(data) {
    if (data) {
      this.data = data;
      this.length = this.data.length;
      this.index = 0;
      this.zero = 0;
    }
  }
  Uint8ArrayReader.prototype = new ArrayReader;
  Uint8ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if (size === 0) {
      return new Uint8Array(0);
    }
    var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  module.exports = Uint8ArrayReader;
});

// node_modules/pizzip/js/nodeBufferReader.js
var require_nodeBufferReader = __commonJS((exports, module) => {
  var Uint8ArrayReader = require_uint8ArrayReader();
  function NodeBufferReader(data) {
    this.data = data;
    this.length = this.data.length;
    this.index = 0;
    this.zero = 0;
  }
  NodeBufferReader.prototype = new Uint8ArrayReader;
  NodeBufferReader.prototype.readData = function(size) {
    this.checkOffset(size);
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  module.exports = NodeBufferReader;
});

// node_modules/pizzip/js/zipEntry.js
var require_zipEntry = __commonJS((exports, module) => {
  var StringReader = require_stringReader();
  var utils = require_utils();
  var CompressedObject = require_compressedObject();
  var pizzipProto = require_object();
  var support = require_support();
  var MADE_BY_DOS = 0;
  var MADE_BY_UNIX = 3;
  function ZipEntry(options, loadOptions) {
    this.options = options;
    this.loadOptions = loadOptions;
  }
  ZipEntry.prototype = {
    isEncrypted: function isEncrypted() {
      return (this.bitFlag & 1) === 1;
    },
    useUTF8: function useUTF8() {
      return (this.bitFlag & 2048) === 2048;
    },
    prepareCompressedContent: function prepareCompressedContent(reader, from, length) {
      return function() {
        var previousIndex = reader.index;
        reader.setIndex(from);
        var compressedFileData = reader.readData(length);
        reader.setIndex(previousIndex);
        return compressedFileData;
      };
    },
    prepareContent: function prepareContent(reader, from, length, compression, uncompressedSize) {
      return function() {
        var compressedFileData = utils.transformTo(compression.uncompressInputType, this.getCompressedContent());
        var uncompressedFileData = compression.uncompress(compressedFileData);
        if (uncompressedFileData.length !== uncompressedSize) {
          throw new Error("Bug : uncompressed data size mismatch");
        }
        return uncompressedFileData;
      };
    },
    readLocalPart: function readLocalPart(reader) {
      reader.skip(22);
      this.fileNameLength = reader.readInt(2);
      var localExtraFieldsLength = reader.readInt(2);
      this.fileName = reader.readData(this.fileNameLength);
      reader.skip(localExtraFieldsLength);
      if (this.compressedSize === -1 || this.uncompressedSize === -1) {
        throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " + "(compressedSize == -1 || uncompressedSize == -1)");
      }
      var compression = utils.findCompression(this.compressionMethod);
      if (compression === null) {
        throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
      }
      this.decompressed = new CompressedObject;
      this.decompressed.compressedSize = this.compressedSize;
      this.decompressed.uncompressedSize = this.uncompressedSize;
      this.decompressed.crc32 = this.crc32;
      this.decompressed.compressionMethod = this.compressionMethod;
      this.decompressed.getCompressedContent = this.prepareCompressedContent(reader, reader.index, this.compressedSize, compression);
      this.decompressed.getContent = this.prepareContent(reader, reader.index, this.compressedSize, compression, this.uncompressedSize);
      if (this.loadOptions.checkCRC32) {
        this.decompressed = utils.transformTo("string", this.decompressed.getContent());
        if (pizzipProto.crc32(this.decompressed) !== this.crc32) {
          throw new Error("Corrupted zip : CRC32 mismatch");
        }
      }
    },
    readCentralPart: function readCentralPart(reader) {
      this.versionMadeBy = reader.readInt(2);
      this.versionNeeded = reader.readInt(2);
      this.bitFlag = reader.readInt(2);
      this.compressionMethod = reader.readString(2);
      this.date = reader.readDate();
      this.crc32 = reader.readInt(4);
      this.compressedSize = reader.readInt(4);
      this.uncompressedSize = reader.readInt(4);
      this.fileNameLength = reader.readInt(2);
      this.extraFieldsLength = reader.readInt(2);
      this.fileCommentLength = reader.readInt(2);
      this.diskNumberStart = reader.readInt(2);
      this.internalFileAttributes = reader.readInt(2);
      this.externalFileAttributes = reader.readInt(4);
      this.localHeaderOffset = reader.readInt(4);
      if (this.isEncrypted()) {
        throw new Error("Encrypted zip are not supported");
      }
      this.fileName = reader.readData(this.fileNameLength);
      this.readExtraFields(reader);
      this.parseZIP64ExtraField(reader);
      this.fileComment = reader.readData(this.fileCommentLength);
    },
    processAttributes: function processAttributes() {
      this.unixPermissions = null;
      this.dosPermissions = null;
      var madeBy = this.versionMadeBy >> 8;
      this.dir = !!(this.externalFileAttributes & 16);
      if (madeBy === MADE_BY_DOS) {
        this.dosPermissions = this.externalFileAttributes & 63;
      }
      if (madeBy === MADE_BY_UNIX) {
        this.unixPermissions = this.externalFileAttributes >> 16 & 65535;
      }
      if (!this.dir && this.fileNameStr.slice(-1) === "/") {
        this.dir = true;
      }
    },
    parseZIP64ExtraField: function parseZIP64ExtraField() {
      if (!this.extraFields[1]) {
        return;
      }
      var extraReader = new StringReader(this.extraFields[1].value);
      if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
        this.uncompressedSize = extraReader.readInt(8);
      }
      if (this.compressedSize === utils.MAX_VALUE_32BITS) {
        this.compressedSize = extraReader.readInt(8);
      }
      if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
        this.localHeaderOffset = extraReader.readInt(8);
      }
      if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
        this.diskNumberStart = extraReader.readInt(4);
      }
    },
    readExtraFields: function readExtraFields(reader) {
      var start = reader.index;
      var extraFieldId, extraFieldLength, extraFieldValue;
      this.extraFields = this.extraFields || {};
      while (reader.index < start + this.extraFieldsLength) {
        extraFieldId = reader.readInt(2);
        extraFieldLength = reader.readInt(2);
        extraFieldValue = reader.readString(extraFieldLength);
        this.extraFields[extraFieldId] = {
          id: extraFieldId,
          length: extraFieldLength,
          value: extraFieldValue
        };
      }
    },
    handleUTF8: function handleUTF8() {
      var decodeParamType = support.uint8array ? "uint8array" : "array";
      if (this.useUTF8()) {
        this.fileNameStr = pizzipProto.utf8decode(this.fileName);
        this.fileCommentStr = pizzipProto.utf8decode(this.fileComment);
      } else {
        var upath = this.findExtraFieldUnicodePath();
        if (upath !== null) {
          this.fileNameStr = upath;
        } else {
          var fileNameByteArray = utils.transformTo(decodeParamType, this.fileName);
          this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
        }
        var ucomment = this.findExtraFieldUnicodeComment();
        if (ucomment !== null) {
          this.fileCommentStr = ucomment;
        } else {
          var commentByteArray = utils.transformTo(decodeParamType, this.fileComment);
          this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
        }
      }
    },
    findExtraFieldUnicodePath: function findExtraFieldUnicodePath() {
      var upathField = this.extraFields[28789];
      if (upathField) {
        var extraReader = new StringReader(upathField.value);
        if (extraReader.readInt(1) !== 1) {
          return null;
        }
        if (pizzipProto.crc32(this.fileName) !== extraReader.readInt(4)) {
          return null;
        }
        return pizzipProto.utf8decode(extraReader.readString(upathField.length - 5));
      }
      return null;
    },
    findExtraFieldUnicodeComment: function findExtraFieldUnicodeComment() {
      var ucommentField = this.extraFields[25461];
      if (ucommentField) {
        var extraReader = new StringReader(ucommentField.value);
        if (extraReader.readInt(1) !== 1) {
          return null;
        }
        if (pizzipProto.crc32(this.fileComment) !== extraReader.readInt(4)) {
          return null;
        }
        return pizzipProto.utf8decode(extraReader.readString(ucommentField.length - 5));
      }
      return null;
    }
  };
  module.exports = ZipEntry;
});

// node_modules/pizzip/js/zipEntries.js
var require_zipEntries = __commonJS((exports, module) => {
  var StringReader = require_stringReader();
  var NodeBufferReader = require_nodeBufferReader();
  var Uint8ArrayReader = require_uint8ArrayReader();
  var ArrayReader = require_arrayReader();
  var utils = require_utils();
  var sig = require_signature();
  var ZipEntry = require_zipEntry();
  var support = require_support();
  function ZipEntries(data, loadOptions) {
    this.files = [];
    this.loadOptions = loadOptions;
    if (data) {
      this.load(data);
    }
  }
  ZipEntries.prototype = {
    checkSignature: function checkSignature(expectedSignature) {
      var signature = this.reader.readString(4);
      if (signature !== expectedSignature) {
        throw new Error("Corrupted zip or bug : unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
      }
    },
    isSignature: function isSignature(askedIndex, expectedSignature) {
      var currentIndex = this.reader.index;
      this.reader.setIndex(askedIndex);
      var signature = this.reader.readString(4);
      var result = signature === expectedSignature;
      this.reader.setIndex(currentIndex);
      return result;
    },
    readBlockEndOfCentral: function readBlockEndOfCentral() {
      this.diskNumber = this.reader.readInt(2);
      this.diskWithCentralDirStart = this.reader.readInt(2);
      this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
      this.centralDirRecords = this.reader.readInt(2);
      this.centralDirSize = this.reader.readInt(4);
      this.centralDirOffset = this.reader.readInt(4);
      this.zipCommentLength = this.reader.readInt(2);
      var zipComment = this.reader.readData(this.zipCommentLength);
      var decodeParamType = support.uint8array ? "uint8array" : "array";
      var decodeContent = utils.transformTo(decodeParamType, zipComment);
      this.zipComment = this.loadOptions.decodeFileName(decodeContent);
    },
    readBlockZip64EndOfCentral: function readBlockZip64EndOfCentral() {
      this.zip64EndOfCentralSize = this.reader.readInt(8);
      this.versionMadeBy = this.reader.readString(2);
      this.versionNeeded = this.reader.readInt(2);
      this.diskNumber = this.reader.readInt(4);
      this.diskWithCentralDirStart = this.reader.readInt(4);
      this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
      this.centralDirRecords = this.reader.readInt(8);
      this.centralDirSize = this.reader.readInt(8);
      this.centralDirOffset = this.reader.readInt(8);
      this.zip64ExtensibleData = {};
      var extraDataSize = this.zip64EndOfCentralSize - 44;
      var index = 0;
      var extraFieldId, extraFieldLength, extraFieldValue;
      while (index < extraDataSize) {
        extraFieldId = this.reader.readInt(2);
        extraFieldLength = this.reader.readInt(4);
        extraFieldValue = this.reader.readString(extraFieldLength);
        this.zip64ExtensibleData[extraFieldId] = {
          id: extraFieldId,
          length: extraFieldLength,
          value: extraFieldValue
        };
      }
    },
    readBlockZip64EndOfCentralLocator: function readBlockZip64EndOfCentralLocator() {
      this.diskWithZip64CentralDirStart = this.reader.readInt(4);
      this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
      this.disksCount = this.reader.readInt(4);
      if (this.disksCount > 1) {
        throw new Error("Multi-volumes zip are not supported");
      }
    },
    readLocalFiles: function readLocalFiles() {
      var i, file;
      for (i = 0;i < this.files.length; i++) {
        file = this.files[i];
        this.reader.setIndex(file.localHeaderOffset);
        this.checkSignature(sig.LOCAL_FILE_HEADER);
        file.readLocalPart(this.reader);
        file.handleUTF8();
        file.processAttributes();
      }
    },
    readCentralDir: function readCentralDir() {
      var file;
      this.reader.setIndex(this.centralDirOffset);
      while (this.reader.readString(4) === sig.CENTRAL_FILE_HEADER) {
        file = new ZipEntry({
          zip64: this.zip64
        }, this.loadOptions);
        file.readCentralPart(this.reader);
        this.files.push(file);
      }
      if (this.centralDirRecords !== this.files.length) {
        if (this.centralDirRecords !== 0 && this.files.length === 0) {
          throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
        } else {}
      }
    },
    readEndOfCentral: function readEndOfCentral() {
      var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
      if (offset < 0) {
        var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);
        if (isGarbage) {
          throw new Error("Can't find end of central directory : is this a zip file ?");
        } else {
          throw new Error("Corrupted zip : can't find end of central directory");
        }
      }
      this.reader.setIndex(offset);
      var endOfCentralDirOffset = offset;
      this.checkSignature(sig.CENTRAL_DIRECTORY_END);
      this.readBlockEndOfCentral();
      if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
        this.zip64 = true;
        offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
        if (offset < 0) {
          throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");
        }
        this.reader.setIndex(offset);
        this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
        this.readBlockZip64EndOfCentralLocator();
        if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
          this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
          if (this.relativeOffsetEndOfZip64CentralDir < 0) {
            throw new Error("Corrupted zip : can't find the ZIP64 end of central directory");
          }
        }
        this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
        this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
        this.readBlockZip64EndOfCentral();
      }
      var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
      if (this.zip64) {
        expectedEndOfCentralDirOffset += 20;
        expectedEndOfCentralDirOffset += 12 + this.zip64EndOfCentralSize;
      }
      var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;
      if (extraBytes > 0) {
        if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {} else {
          this.reader.zero = extraBytes;
        }
      } else if (extraBytes < 0) {
        throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
      }
    },
    prepareReader: function prepareReader(data) {
      var type = utils.getTypeOf(data);
      utils.checkSupport(type);
      if (type === "string" && !support.uint8array) {
        this.reader = new StringReader(data, this.loadOptions.optimizedBinaryString);
      } else if (type === "nodebuffer") {
        this.reader = new NodeBufferReader(data);
      } else if (support.uint8array) {
        this.reader = new Uint8ArrayReader(utils.transformTo("uint8array", data));
      } else if (support.array) {
        this.reader = new ArrayReader(utils.transformTo("array", data));
      } else {
        throw new Error("Unexpected error: unsupported type '" + type + "'");
      }
    },
    load: function load(data) {
      this.prepareReader(data);
      this.readEndOfCentral();
      this.readCentralDir();
      this.readLocalFiles();
    }
  };
  module.exports = ZipEntries;
});

// node_modules/pizzip/js/load.js
var require_load = __commonJS((exports, module) => {
  var base64 = require_base64();
  var utf8 = require_utf8();
  var utils = require_utils();
  var ZipEntries = require_zipEntries();
  module.exports = function(data, options) {
    var i, input;
    options = utils.extend(options || {}, {
      base64: false,
      checkCRC32: false,
      optimizedBinaryString: false,
      createFolders: false,
      decodeFileName: utf8.utf8decode
    });
    if (options.base64) {
      data = base64.decode(data);
    }
    var zipEntries = new ZipEntries(data, options);
    var files = zipEntries.files;
    for (i = 0;i < files.length; i++) {
      input = files[i];
      this.file(input.fileNameStr, input.decompressed, {
        binary: true,
        optimizedBinaryString: true,
        date: input.date,
        dir: input.dir,
        comment: input.fileCommentStr.length ? input.fileCommentStr : null,
        unixPermissions: input.unixPermissions,
        dosPermissions: input.dosPermissions,
        createFolders: options.createFolders
      });
    }
    if (zipEntries.zipComment.length) {
      this.comment = zipEntries.zipComment;
    }
    return this;
  };
});

// node_modules/pizzip/js/deprecatedPublicUtils.js
var require_deprecatedPublicUtils = __commonJS((exports) => {
  var utils = require_utils();
  exports.string2binary = function(str) {
    return utils.string2binary(str);
  };
  exports.string2Uint8Array = function(str) {
    return utils.transformTo("uint8array", str);
  };
  exports.uint8Array2String = function(array) {
    return utils.transformTo("string", array);
  };
  exports.string2Blob = function(str) {
    var buffer = utils.transformTo("arraybuffer", str);
    return utils.arrayBuffer2Blob(buffer);
  };
  exports.arrayBuffer2Blob = function(buffer) {
    return utils.arrayBuffer2Blob(buffer);
  };
  exports.transformTo = function(outputType, input) {
    return utils.transformTo(outputType, input);
  };
  exports.getTypeOf = function(input) {
    return utils.getTypeOf(input);
  };
  exports.checkSupport = function(type) {
    return utils.checkSupport(type);
  };
  exports.MAX_VALUE_16BITS = utils.MAX_VALUE_16BITS;
  exports.MAX_VALUE_32BITS = utils.MAX_VALUE_32BITS;
  exports.pretty = function(str) {
    return utils.pretty(str);
  };
  exports.findCompression = function(compressionMethod) {
    return utils.findCompression(compressionMethod);
  };
  exports.isRegExp = function(object) {
    return utils.isRegExp(object);
  };
});

// node_modules/pizzip/js/index.js
var require_js = __commonJS((exports, module) => {
  var base64 = require_base64();
  function PizZip(data, options) {
    if (!(this instanceof PizZip)) {
      return new PizZip(data, options);
    }
    this.files = {};
    this.comment = null;
    this.root = "";
    if (data) {
      this.load(data, options);
    }
    this.clone = function() {
      var _this = this;
      var newObj = new PizZip;
      Object.keys(this.files).forEach(function(file) {
        newObj.file(file, _this.files[file].asUint8Array());
      });
      return newObj;
    };
    this.shallowClone = function() {
      var newObj = new PizZip;
      for (var i in this) {
        if (typeof this[i] !== "function") {
          newObj[i] = this[i];
        }
      }
      return newObj;
    };
  }
  PizZip.prototype = require_object();
  PizZip.prototype.load = require_load();
  PizZip.support = require_support();
  PizZip.defaults = require_defaults();
  PizZip.utils = require_deprecatedPublicUtils();
  PizZip.base64 = {
    encode: function encode(input) {
      return base64.encode(input);
    },
    decode: function decode(input) {
      return base64.decode(input);
    }
  };
  PizZip.compressions = require_compressions();
  module.exports = PizZip;
  module.exports["default"] = PizZip;
});

// node_modules/@xmldom/xmldom/lib/conventions.js
var require_conventions = __commonJS((exports) => {
  function find(list, predicate, ac) {
    if (ac === undefined) {
      ac = Array.prototype;
    }
    if (list && typeof ac.find === "function") {
      return ac.find.call(list, predicate);
    }
    for (var i = 0;i < list.length; i++) {
      if (hasOwn(list, i)) {
        var item = list[i];
        if (predicate.call(undefined, item, i, list)) {
          return item;
        }
      }
    }
  }
  function freeze(object, oc) {
    if (oc === undefined) {
      oc = Object;
    }
    if (oc && typeof oc.getOwnPropertyDescriptors === "function") {
      object = oc.create(null, oc.getOwnPropertyDescriptors(object));
    }
    return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
  }
  function hasOwn(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }
  function assign(target, source) {
    if (target === null || typeof target !== "object") {
      throw new TypeError("target is not an object");
    }
    for (var key in source) {
      if (hasOwn(source, key)) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var HTML_BOOLEAN_ATTRIBUTES = freeze({
    allowfullscreen: true,
    async: true,
    autofocus: true,
    autoplay: true,
    checked: true,
    controls: true,
    default: true,
    defer: true,
    disabled: true,
    formnovalidate: true,
    hidden: true,
    ismap: true,
    itemscope: true,
    loop: true,
    multiple: true,
    muted: true,
    nomodule: true,
    novalidate: true,
    open: true,
    playsinline: true,
    readonly: true,
    required: true,
    reversed: true,
    selected: true
  });
  function isHTMLBooleanAttribute(name) {
    return hasOwn(HTML_BOOLEAN_ATTRIBUTES, name.toLowerCase());
  }
  var HTML_VOID_ELEMENTS = freeze({
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
  });
  function isHTMLVoidElement(tagName) {
    return hasOwn(HTML_VOID_ELEMENTS, tagName.toLowerCase());
  }
  var HTML_RAW_TEXT_ELEMENTS = freeze({
    script: false,
    style: false,
    textarea: true,
    title: true
  });
  function isHTMLRawTextElement(tagName) {
    var key = tagName.toLowerCase();
    return hasOwn(HTML_RAW_TEXT_ELEMENTS, key) && !HTML_RAW_TEXT_ELEMENTS[key];
  }
  function isHTMLEscapableRawTextElement(tagName) {
    var key = tagName.toLowerCase();
    return hasOwn(HTML_RAW_TEXT_ELEMENTS, key) && HTML_RAW_TEXT_ELEMENTS[key];
  }
  function isHTMLMimeType(mimeType) {
    return mimeType === MIME_TYPE.HTML;
  }
  function hasDefaultHTMLNamespace(mimeType) {
    return isHTMLMimeType(mimeType) || mimeType === MIME_TYPE.XML_XHTML_APPLICATION;
  }
  var MIME_TYPE = freeze({
    HTML: "text/html",
    XML_APPLICATION: "application/xml",
    XML_TEXT: "text/xml",
    XML_XHTML_APPLICATION: "application/xhtml+xml",
    XML_SVG_IMAGE: "image/svg+xml"
  });
  var _MIME_TYPES = Object.keys(MIME_TYPE).map(function(key) {
    return MIME_TYPE[key];
  });
  function isValidMimeType(mimeType) {
    return _MIME_TYPES.indexOf(mimeType) > -1;
  }
  var NAMESPACE = freeze({
    HTML: "http://www.w3.org/1999/xhtml",
    SVG: "http://www.w3.org/2000/svg",
    XML: "http://www.w3.org/XML/1998/namespace",
    XMLNS: "http://www.w3.org/2000/xmlns/"
  });
  exports.assign = assign;
  exports.find = find;
  exports.freeze = freeze;
  exports.HTML_BOOLEAN_ATTRIBUTES = HTML_BOOLEAN_ATTRIBUTES;
  exports.HTML_RAW_TEXT_ELEMENTS = HTML_RAW_TEXT_ELEMENTS;
  exports.HTML_VOID_ELEMENTS = HTML_VOID_ELEMENTS;
  exports.hasDefaultHTMLNamespace = hasDefaultHTMLNamespace;
  exports.hasOwn = hasOwn;
  exports.isHTMLBooleanAttribute = isHTMLBooleanAttribute;
  exports.isHTMLRawTextElement = isHTMLRawTextElement;
  exports.isHTMLEscapableRawTextElement = isHTMLEscapableRawTextElement;
  exports.isHTMLMimeType = isHTMLMimeType;
  exports.isHTMLVoidElement = isHTMLVoidElement;
  exports.isValidMimeType = isValidMimeType;
  exports.MIME_TYPE = MIME_TYPE;
  exports.NAMESPACE = NAMESPACE;
});

// node_modules/@xmldom/xmldom/lib/errors.js
var require_errors = __commonJS((exports) => {
  var conventions = require_conventions();
  function extendError(constructor, writableName) {
    constructor.prototype = Object.create(Error.prototype, {
      constructor: { value: constructor },
      name: { value: constructor.name, enumerable: true, writable: writableName }
    });
  }
  var DOMExceptionName = conventions.freeze({
    Error: "Error",
    IndexSizeError: "IndexSizeError",
    DomstringSizeError: "DomstringSizeError",
    HierarchyRequestError: "HierarchyRequestError",
    WrongDocumentError: "WrongDocumentError",
    InvalidCharacterError: "InvalidCharacterError",
    NoDataAllowedError: "NoDataAllowedError",
    NoModificationAllowedError: "NoModificationAllowedError",
    NotFoundError: "NotFoundError",
    NotSupportedError: "NotSupportedError",
    InUseAttributeError: "InUseAttributeError",
    InvalidStateError: "InvalidStateError",
    SyntaxError: "SyntaxError",
    InvalidModificationError: "InvalidModificationError",
    NamespaceError: "NamespaceError",
    InvalidAccessError: "InvalidAccessError",
    ValidationError: "ValidationError",
    TypeMismatchError: "TypeMismatchError",
    SecurityError: "SecurityError",
    NetworkError: "NetworkError",
    AbortError: "AbortError",
    URLMismatchError: "URLMismatchError",
    QuotaExceededError: "QuotaExceededError",
    TimeoutError: "TimeoutError",
    InvalidNodeTypeError: "InvalidNodeTypeError",
    DataCloneError: "DataCloneError",
    EncodingError: "EncodingError",
    NotReadableError: "NotReadableError",
    UnknownError: "UnknownError",
    ConstraintError: "ConstraintError",
    DataError: "DataError",
    TransactionInactiveError: "TransactionInactiveError",
    ReadOnlyError: "ReadOnlyError",
    VersionError: "VersionError",
    OperationError: "OperationError",
    NotAllowedError: "NotAllowedError",
    OptOutError: "OptOutError"
  });
  var DOMExceptionNames = Object.keys(DOMExceptionName);
  function isValidDomExceptionCode(value) {
    return typeof value === "number" && value >= 1 && value <= 25;
  }
  function endsWithError(value) {
    return typeof value === "string" && value.substring(value.length - DOMExceptionName.Error.length) === DOMExceptionName.Error;
  }
  function DOMException(messageOrCode, nameOrMessage) {
    if (isValidDomExceptionCode(messageOrCode)) {
      this.name = DOMExceptionNames[messageOrCode];
      this.message = nameOrMessage || "";
    } else {
      this.message = messageOrCode;
      this.name = endsWithError(nameOrMessage) ? nameOrMessage : DOMExceptionName.Error;
    }
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, DOMException);
  }
  extendError(DOMException, true);
  Object.defineProperties(DOMException.prototype, {
    code: {
      enumerable: true,
      get: function() {
        var code = DOMExceptionNames.indexOf(this.name);
        if (isValidDomExceptionCode(code))
          return code;
        return 0;
      }
    }
  });
  var ExceptionCode = {
    INDEX_SIZE_ERR: 1,
    DOMSTRING_SIZE_ERR: 2,
    HIERARCHY_REQUEST_ERR: 3,
    WRONG_DOCUMENT_ERR: 4,
    INVALID_CHARACTER_ERR: 5,
    NO_DATA_ALLOWED_ERR: 6,
    NO_MODIFICATION_ALLOWED_ERR: 7,
    NOT_FOUND_ERR: 8,
    NOT_SUPPORTED_ERR: 9,
    INUSE_ATTRIBUTE_ERR: 10,
    INVALID_STATE_ERR: 11,
    SYNTAX_ERR: 12,
    INVALID_MODIFICATION_ERR: 13,
    NAMESPACE_ERR: 14,
    INVALID_ACCESS_ERR: 15,
    VALIDATION_ERR: 16,
    TYPE_MISMATCH_ERR: 17,
    SECURITY_ERR: 18,
    NETWORK_ERR: 19,
    ABORT_ERR: 20,
    URL_MISMATCH_ERR: 21,
    QUOTA_EXCEEDED_ERR: 22,
    TIMEOUT_ERR: 23,
    INVALID_NODE_TYPE_ERR: 24,
    DATA_CLONE_ERR: 25
  };
  var entries = Object.entries(ExceptionCode);
  for (i = 0;i < entries.length; i++) {
    key = entries[i][0];
    DOMException[key] = entries[i][1];
  }
  var key;
  var i;
  function ParseError(message, locator) {
    this.message = message;
    this.locator = locator;
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, ParseError);
  }
  extendError(ParseError);
  exports.DOMException = DOMException;
  exports.DOMExceptionName = DOMExceptionName;
  exports.ExceptionCode = ExceptionCode;
  exports.ParseError = ParseError;
});

// node_modules/@xmldom/xmldom/lib/grammar.js
var require_grammar = __commonJS((exports) => {
  function detectUnicodeSupport(RegExpImpl) {
    try {
      if (typeof RegExpImpl !== "function") {
        RegExpImpl = RegExp;
      }
      var match = new RegExpImpl("\uD834\uDF06", "u").exec("\uD834\uDF06");
      return !!match && match[0].length === 2;
    } catch (error) {}
    return false;
  }
  var UNICODE_SUPPORT = detectUnicodeSupport();
  function chars(regexp) {
    if (regexp.source[0] !== "[") {
      throw new Error(regexp + " can not be used with chars");
    }
    return regexp.source.slice(1, regexp.source.lastIndexOf("]"));
  }
  function chars_without(regexp, search) {
    if (regexp.source[0] !== "[") {
      throw new Error("/" + regexp.source + "/ can not be used with chars_without");
    }
    if (!search || typeof search !== "string") {
      throw new Error(JSON.stringify(search) + " is not a valid search");
    }
    if (regexp.source.indexOf(search) === -1) {
      throw new Error('"' + search + '" is not is /' + regexp.source + "/");
    }
    if (search === "-" && regexp.source.indexOf(search) !== 1) {
      throw new Error('"' + search + '" is not at the first postion of /' + regexp.source + "/");
    }
    return new RegExp(regexp.source.replace(search, ""), UNICODE_SUPPORT ? "u" : "");
  }
  function reg(args) {
    var self2 = this;
    return new RegExp(Array.prototype.slice.call(arguments).map(function(part) {
      var isStr = typeof part === "string";
      if (isStr && self2 === undefined && part === "|") {
        throw new Error("use regg instead of reg to wrap expressions with `|`!");
      }
      return isStr ? part : part.source;
    }).join(""), UNICODE_SUPPORT ? "mu" : "m");
  }
  function regg(args) {
    if (arguments.length === 0) {
      throw new Error("no parameters provided");
    }
    return reg.apply(regg, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
  }
  var UNICODE_REPLACEMENT_CHARACTER = "�";
  var Char = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
  if (UNICODE_SUPPORT) {
    Char = reg("[", chars(Char), "\\u{10000}-\\u{10FFFF}", "]");
  }
  var _SChar = /[\x20\x09\x0D\x0A]/;
  var SChar_s = chars(_SChar);
  var S = reg(_SChar, "+");
  var S_OPT = reg(_SChar, "*");
  var NameStartChar = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  if (UNICODE_SUPPORT) {
    NameStartChar = reg("[", chars(NameStartChar), "\\u{10000}-\\u{10FFFF}", "]");
  }
  var NameStartChar_s = chars(NameStartChar);
  var NameChar = reg("[", NameStartChar_s, chars(/[-.0-9\xB7]/), chars(/[\u0300-\u036F\u203F-\u2040]/), "]");
  var Name = reg(NameStartChar, NameChar, "*");
  var Nmtoken = reg(NameChar, "+");
  var EntityRef = reg("&", Name, ";");
  var CharRef = regg(/&#[0-9]+;|&#x[0-9a-fA-F]+;/);
  var Reference = regg(EntityRef, "|", CharRef);
  var PEReference = reg("%", Name, ";");
  var EntityValue = regg(reg('"', regg(/[^%&"]/, "|", PEReference, "|", Reference), "*", '"'), "|", reg("'", regg(/[^%&']/, "|", PEReference, "|", Reference), "*", "'"));
  var AttValue = regg('"', regg(/[^<&"]/, "|", Reference), "*", '"', "|", "'", regg(/[^<&']/, "|", Reference), "*", "'");
  var NCNameStartChar = chars_without(NameStartChar, ":");
  var NCNameChar = chars_without(NameChar, ":");
  var NCName = reg(NCNameStartChar, NCNameChar, "*");
  var QName = reg(NCName, regg(":", NCName), "?");
  var QName_exact = reg("^", QName, "$");
  var QName_group = reg("(", QName, ")");
  var SystemLiteral = regg(/"[^"]*"|'[^']*'/);
  var PI = reg(/^<\?/, "(", Name, ")", regg(S, "(", Char, "*?)"), "?", /\?>/);
  var PubidChar = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/;
  var PubidLiteral = regg('"', PubidChar, '*"', "|", "'", chars_without(PubidChar, "'"), "*'");
  var COMMENT_START = "<!--";
  var COMMENT_END = "-->";
  var Comment = reg(COMMENT_START, regg(chars_without(Char, "-"), "|", reg("-", chars_without(Char, "-"))), "*", COMMENT_END);
  var PCDATA = "#PCDATA";
  var Mixed = regg(reg(/\(/, S_OPT, PCDATA, regg(S_OPT, /\|/, S_OPT, QName), "*", S_OPT, /\)\*/), "|", reg(/\(/, S_OPT, PCDATA, S_OPT, /\)/));
  var _children_quantity = /[?*+]?/;
  var children = reg(/\([^>]+\)/, _children_quantity);
  var contentspec = regg("EMPTY", "|", "ANY", "|", Mixed, "|", children);
  var ELEMENTDECL_START = "<!ELEMENT";
  var elementdecl = reg(ELEMENTDECL_START, S, regg(QName, "|", PEReference), S, regg(contentspec, "|", PEReference), S_OPT, ">");
  var NotationType = reg("NOTATION", S, /\(/, S_OPT, Name, regg(S_OPT, /\|/, S_OPT, Name), "*", S_OPT, /\)/);
  var Enumeration = reg(/\(/, S_OPT, Nmtoken, regg(S_OPT, /\|/, S_OPT, Nmtoken), "*", S_OPT, /\)/);
  var EnumeratedType = regg(NotationType, "|", Enumeration);
  var AttType = regg(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", EnumeratedType);
  var DefaultDecl = regg(/#REQUIRED|#IMPLIED/, "|", regg(regg("#FIXED", S), "?", AttValue));
  var AttDef = regg(S, Name, S, AttType, S, DefaultDecl);
  var ATTLIST_DECL_START = "<!ATTLIST";
  var AttlistDecl = reg(ATTLIST_DECL_START, S, Name, AttDef, "*", S_OPT, ">");
  var ABOUT_LEGACY_COMPAT = "about:legacy-compat";
  var ABOUT_LEGACY_COMPAT_SystemLiteral = regg('"' + ABOUT_LEGACY_COMPAT + '"', "|", "'" + ABOUT_LEGACY_COMPAT + "'");
  var SYSTEM = "SYSTEM";
  var PUBLIC = "PUBLIC";
  var ExternalID = regg(regg(SYSTEM, S, SystemLiteral), "|", regg(PUBLIC, S, PubidLiteral, S, SystemLiteral));
  var ExternalID_match = reg("^", regg(regg(SYSTEM, S, "(?<SystemLiteralOnly>", SystemLiteral, ")"), "|", regg(PUBLIC, S, "(?<PubidLiteral>", PubidLiteral, ")", S, "(?<SystemLiteral>", SystemLiteral, ")")));
  var NDataDecl = regg(S, "NDATA", S, Name);
  var EntityDef = regg(EntityValue, "|", regg(ExternalID, NDataDecl, "?"));
  var ENTITY_DECL_START = "<!ENTITY";
  var GEDecl = reg(ENTITY_DECL_START, S, Name, S, EntityDef, S_OPT, ">");
  var PEDef = regg(EntityValue, "|", ExternalID);
  var PEDecl = reg(ENTITY_DECL_START, S, "%", S, Name, S, PEDef, S_OPT, ">");
  var EntityDecl = regg(GEDecl, "|", PEDecl);
  var PublicID = reg(PUBLIC, S, PubidLiteral);
  var NotationDecl = reg("<!NOTATION", S, Name, S, regg(ExternalID, "|", PublicID), S_OPT, ">");
  var Eq = reg(S_OPT, "=", S_OPT);
  var VersionNum = /1[.]\d+/;
  var VersionInfo = reg(S, "version", Eq, regg("'", VersionNum, "'", "|", '"', VersionNum, '"'));
  var EncName = /[A-Za-z][-A-Za-z0-9._]*/;
  var EncodingDecl = regg(S, "encoding", Eq, regg('"', EncName, '"', "|", "'", EncName, "'"));
  var SDDecl = regg(S, "standalone", Eq, regg("'", regg("yes", "|", "no"), "'", "|", '"', regg("yes", "|", "no"), '"'));
  var XMLDecl = reg(/^<\?xml/, VersionInfo, EncodingDecl, "?", SDDecl, "?", S_OPT, /\?>/);
  var DOCTYPE_DECL_START = "<!DOCTYPE";
  var CDATA_START = "<![CDATA[";
  var CDATA_END = "]]>";
  var CDStart = /<!\[CDATA\[/;
  var CDEnd = /\]\]>/;
  var CData = reg(Char, "*?", CDEnd);
  var CDSect = reg(CDStart, CData);
  exports.chars = chars;
  exports.chars_without = chars_without;
  exports.detectUnicodeSupport = detectUnicodeSupport;
  exports.reg = reg;
  exports.regg = regg;
  exports.ABOUT_LEGACY_COMPAT = ABOUT_LEGACY_COMPAT;
  exports.ABOUT_LEGACY_COMPAT_SystemLiteral = ABOUT_LEGACY_COMPAT_SystemLiteral;
  exports.AttlistDecl = AttlistDecl;
  exports.CDATA_START = CDATA_START;
  exports.CDATA_END = CDATA_END;
  exports.CDSect = CDSect;
  exports.Char = Char;
  exports.Comment = Comment;
  exports.COMMENT_START = COMMENT_START;
  exports.COMMENT_END = COMMENT_END;
  exports.DOCTYPE_DECL_START = DOCTYPE_DECL_START;
  exports.elementdecl = elementdecl;
  exports.EntityDecl = EntityDecl;
  exports.EntityValue = EntityValue;
  exports.ExternalID = ExternalID;
  exports.ExternalID_match = ExternalID_match;
  exports.Name = Name;
  exports.NotationDecl = NotationDecl;
  exports.Reference = Reference;
  exports.PEReference = PEReference;
  exports.PI = PI;
  exports.PUBLIC = PUBLIC;
  exports.PubidLiteral = PubidLiteral;
  exports.QName = QName;
  exports.QName_exact = QName_exact;
  exports.QName_group = QName_group;
  exports.S = S;
  exports.SChar_s = SChar_s;
  exports.S_OPT = S_OPT;
  exports.SYSTEM = SYSTEM;
  exports.SystemLiteral = SystemLiteral;
  exports.UNICODE_REPLACEMENT_CHARACTER = UNICODE_REPLACEMENT_CHARACTER;
  exports.UNICODE_SUPPORT = UNICODE_SUPPORT;
  exports.XMLDecl = XMLDecl;
});

// node_modules/@xmldom/xmldom/lib/dom.js
var require_dom = __commonJS((exports) => {
  var conventions = require_conventions();
  var find = conventions.find;
  var hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
  var hasOwn = conventions.hasOwn;
  var isHTMLMimeType = conventions.isHTMLMimeType;
  var isHTMLRawTextElement = conventions.isHTMLRawTextElement;
  var isHTMLVoidElement = conventions.isHTMLVoidElement;
  var MIME_TYPE = conventions.MIME_TYPE;
  var NAMESPACE = conventions.NAMESPACE;
  var PDC = Symbol();
  var errors = require_errors();
  var DOMException = errors.DOMException;
  var DOMExceptionName = errors.DOMExceptionName;
  var g = require_grammar();
  function checkSymbol(symbol) {
    if (symbol !== PDC) {
      throw new TypeError("Illegal constructor");
    }
  }
  function notEmptyString(input) {
    return input !== "";
  }
  function splitOnASCIIWhitespace(input) {
    return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
  }
  function orderedSetReducer(current, element) {
    if (!hasOwn(current, element)) {
      current[element] = true;
    }
    return current;
  }
  function toOrderedSet(input) {
    if (!input)
      return [];
    var list = splitOnASCIIWhitespace(input);
    return Object.keys(list.reduce(orderedSetReducer, {}));
  }
  function arrayIncludes(list) {
    return function(element) {
      return list && list.indexOf(element) !== -1;
    };
  }
  function validateQualifiedName(qualifiedName) {
    if (!g.QName_exact.test(qualifiedName)) {
      throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + qualifiedName + '"');
    }
  }
  function validateAndExtract(namespace, qualifiedName) {
    validateQualifiedName(qualifiedName);
    namespace = namespace || null;
    var prefix = null;
    var localName = qualifiedName;
    if (qualifiedName.indexOf(":") >= 0) {
      var splitResult = qualifiedName.split(":");
      prefix = splitResult[0];
      localName = splitResult[1];
    }
    if (prefix !== null && namespace === null) {
      throw new DOMException(DOMException.NAMESPACE_ERR, "prefix is non-null and namespace is null");
    }
    if (prefix === "xml" && namespace !== conventions.NAMESPACE.XML) {
      throw new DOMException(DOMException.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
    }
    if ((prefix === "xmlns" || qualifiedName === "xmlns") && namespace !== conventions.NAMESPACE.XMLNS) {
      throw new DOMException(DOMException.NAMESPACE_ERR, 'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace');
    }
    if (namespace === conventions.NAMESPACE.XMLNS && prefix !== "xmlns" && qualifiedName !== "xmlns") {
      throw new DOMException(DOMException.NAMESPACE_ERR, 'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"');
    }
    return [namespace, prefix, localName];
  }
  function copy(src, dest) {
    for (var p in src) {
      if (hasOwn(src, p)) {
        dest[p] = src[p];
      }
    }
  }
  function _extends(Class, Super) {
    var pt = Class.prototype;
    if (!(pt instanceof Super)) {
      let t = function() {};
      t.prototype = Super.prototype;
      t = new t;
      copy(pt, t);
      Class.prototype = pt = t;
    }
    if (pt.constructor != Class) {
      if (typeof Class != "function") {
        console.error("unknown Class:" + Class);
      }
      pt.constructor = Class;
    }
  }
  var NodeType = {};
  var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
  var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
  var TEXT_NODE = NodeType.TEXT_NODE = 3;
  var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
  var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
  var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
  var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
  var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
  var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
  var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
  var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
  var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
  var DocumentPosition = conventions.freeze({
    DOCUMENT_POSITION_DISCONNECTED: 1,
    DOCUMENT_POSITION_PRECEDING: 2,
    DOCUMENT_POSITION_FOLLOWING: 4,
    DOCUMENT_POSITION_CONTAINS: 8,
    DOCUMENT_POSITION_CONTAINED_BY: 16,
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
  });
  function commonAncestor(a, b) {
    if (b.length < a.length)
      return commonAncestor(b, a);
    var c = null;
    for (var n in a) {
      if (a[n] !== b[n])
        return c;
      c = a[n];
    }
    return c;
  }
  function docGUID(doc) {
    if (!doc.guid)
      doc.guid = Math.random();
    return doc.guid;
  }
  function NodeList() {}
  NodeList.prototype = {
    length: 0,
    item: function(index) {
      return index >= 0 && index < this.length ? this[index] : null;
    },
    toString: function(nodeFilter) {
      for (var buf = [], i = 0;i < this.length; i++) {
        serializeToString(this[i], buf, nodeFilter);
      }
      return buf.join("");
    },
    filter: function(predicate) {
      return Array.prototype.filter.call(this, predicate);
    },
    indexOf: function(item) {
      return Array.prototype.indexOf.call(this, item);
    }
  };
  NodeList.prototype[Symbol.iterator] = function() {
    var me = this;
    var index = 0;
    return {
      next: function() {
        if (index < me.length) {
          return {
            value: me[index++],
            done: false
          };
        } else {
          return {
            done: true
          };
        }
      },
      return: function() {
        return {
          done: true
        };
      }
    };
  };
  function LiveNodeList(node, refresh) {
    this._node = node;
    this._refresh = refresh;
    _updateLiveList(this);
  }
  function _updateLiveList(list) {
    var inc = list._node._inc || list._node.ownerDocument._inc;
    if (list._inc !== inc) {
      var ls = list._refresh(list._node);
      __set__(list, "length", ls.length);
      if (!list.$$length || ls.length < list.$$length) {
        for (var i = ls.length;i in list; i++) {
          if (hasOwn(list, i)) {
            delete list[i];
          }
        }
      }
      copy(ls, list);
      list._inc = inc;
    }
  }
  LiveNodeList.prototype.item = function(i) {
    _updateLiveList(this);
    return this[i] || null;
  };
  _extends(LiveNodeList, NodeList);
  function NamedNodeMap() {}
  function _findNodeIndex(list, node) {
    var i = 0;
    while (i < list.length) {
      if (list[i] === node) {
        return i;
      }
      i++;
    }
  }
  function _addNamedNode(el, list, newAttr, oldAttr) {
    if (oldAttr) {
      list[_findNodeIndex(list, oldAttr)] = newAttr;
    } else {
      list[list.length] = newAttr;
      list.length++;
    }
    if (el) {
      newAttr.ownerElement = el;
      var doc = el.ownerDocument;
      if (doc) {
        oldAttr && _onRemoveAttribute(doc, el, oldAttr);
        _onAddAttribute(doc, el, newAttr);
      }
    }
  }
  function _removeNamedNode(el, list, attr) {
    var i = _findNodeIndex(list, attr);
    if (i >= 0) {
      var lastIndex = list.length - 1;
      while (i <= lastIndex) {
        list[i] = list[++i];
      }
      list.length = lastIndex;
      if (el) {
        var doc = el.ownerDocument;
        if (doc) {
          _onRemoveAttribute(doc, el, attr);
        }
        attr.ownerElement = null;
      }
    }
  }
  NamedNodeMap.prototype = {
    length: 0,
    item: NodeList.prototype.item,
    getNamedItem: function(localName) {
      if (this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace()) {
        localName = localName.toLowerCase();
      }
      var i = 0;
      while (i < this.length) {
        var attr = this[i];
        if (attr.nodeName === localName) {
          return attr;
        }
        i++;
      }
      return null;
    },
    setNamedItem: function(attr) {
      var el = attr.ownerElement;
      if (el && el !== this._ownerElement) {
        throw new DOMException(DOMException.INUSE_ATTRIBUTE_ERR);
      }
      var oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
      if (oldAttr === attr) {
        return attr;
      }
      _addNamedNode(this._ownerElement, this, attr, oldAttr);
      return oldAttr;
    },
    setNamedItemNS: function(attr) {
      return this.setNamedItem(attr);
    },
    removeNamedItem: function(localName) {
      var attr = this.getNamedItem(localName);
      if (!attr) {
        throw new DOMException(DOMException.NOT_FOUND_ERR, localName);
      }
      _removeNamedNode(this._ownerElement, this, attr);
      return attr;
    },
    removeNamedItemNS: function(namespaceURI, localName) {
      var attr = this.getNamedItemNS(namespaceURI, localName);
      if (!attr) {
        throw new DOMException(DOMException.NOT_FOUND_ERR, namespaceURI ? namespaceURI + " : " + localName : localName);
      }
      _removeNamedNode(this._ownerElement, this, attr);
      return attr;
    },
    getNamedItemNS: function(namespaceURI, localName) {
      if (!namespaceURI) {
        namespaceURI = null;
      }
      var i = 0;
      while (i < this.length) {
        var node = this[i];
        if (node.localName === localName && node.namespaceURI === namespaceURI) {
          return node;
        }
        i++;
      }
      return null;
    }
  };
  NamedNodeMap.prototype[Symbol.iterator] = function() {
    var me = this;
    var index = 0;
    return {
      next: function() {
        if (index < me.length) {
          return {
            value: me[index++],
            done: false
          };
        } else {
          return {
            done: true
          };
        }
      },
      return: function() {
        return {
          done: true
        };
      }
    };
  };
  function DOMImplementation() {}
  DOMImplementation.prototype = {
    hasFeature: function(feature, version) {
      return true;
    },
    createDocument: function(namespaceURI, qualifiedName, doctype) {
      var contentType = MIME_TYPE.XML_APPLICATION;
      if (namespaceURI === NAMESPACE.HTML) {
        contentType = MIME_TYPE.XML_XHTML_APPLICATION;
      } else if (namespaceURI === NAMESPACE.SVG) {
        contentType = MIME_TYPE.XML_SVG_IMAGE;
      }
      var doc = new Document(PDC, { contentType });
      doc.implementation = this;
      doc.childNodes = new NodeList;
      doc.doctype = doctype || null;
      if (doctype) {
        doc.appendChild(doctype);
      }
      if (qualifiedName) {
        var root = doc.createElementNS(namespaceURI, qualifiedName);
        doc.appendChild(root);
      }
      return doc;
    },
    createDocumentType: function(qualifiedName, publicId, systemId, internalSubset) {
      validateQualifiedName(qualifiedName);
      var node = new DocumentType(PDC);
      node.name = qualifiedName;
      node.nodeName = qualifiedName;
      node.publicId = publicId || "";
      node.systemId = systemId || "";
      node.internalSubset = internalSubset || "";
      node.childNodes = new NodeList;
      return node;
    },
    createHTMLDocument: function(title) {
      var doc = new Document(PDC, { contentType: MIME_TYPE.HTML });
      doc.implementation = this;
      doc.childNodes = new NodeList;
      if (title !== false) {
        doc.doctype = this.createDocumentType("html");
        doc.doctype.ownerDocument = doc;
        doc.appendChild(doc.doctype);
        var htmlNode = doc.createElement("html");
        doc.appendChild(htmlNode);
        var headNode = doc.createElement("head");
        htmlNode.appendChild(headNode);
        if (typeof title === "string") {
          var titleNode = doc.createElement("title");
          titleNode.appendChild(doc.createTextNode(title));
          headNode.appendChild(titleNode);
        }
        htmlNode.appendChild(doc.createElement("body"));
      }
      return doc;
    }
  };
  function Node(symbol) {
    checkSymbol(symbol);
  }
  Node.prototype = {
    firstChild: null,
    lastChild: null,
    previousSibling: null,
    nextSibling: null,
    parentNode: null,
    get parentElement() {
      return this.parentNode && this.parentNode.nodeType === this.ELEMENT_NODE ? this.parentNode : null;
    },
    childNodes: null,
    ownerDocument: null,
    nodeValue: null,
    namespaceURI: null,
    prefix: null,
    localName: null,
    baseURI: "about:blank",
    get isConnected() {
      var rootNode = this.getRootNode();
      return rootNode && rootNode.nodeType === rootNode.DOCUMENT_NODE;
    },
    contains: function(other) {
      if (!other)
        return false;
      var parent = other;
      do {
        if (this === parent)
          return true;
        parent = other.parentNode;
      } while (parent);
      return false;
    },
    getRootNode: function(options) {
      var parent = this;
      do {
        if (!parent.parentNode) {
          return parent;
        }
        parent = parent.parentNode;
      } while (parent);
    },
    isEqualNode: function(otherNode) {
      if (!otherNode)
        return false;
      if (this.nodeType !== otherNode.nodeType)
        return false;
      switch (this.nodeType) {
        case this.DOCUMENT_TYPE_NODE:
          if (this.name !== otherNode.name)
            return false;
          if (this.publicId !== otherNode.publicId)
            return false;
          if (this.systemId !== otherNode.systemId)
            return false;
          break;
        case this.ELEMENT_NODE:
          if (this.namespaceURI !== otherNode.namespaceURI)
            return false;
          if (this.prefix !== otherNode.prefix)
            return false;
          if (this.localName !== otherNode.localName)
            return false;
          if (this.attributes.length !== otherNode.attributes.length)
            return false;
          for (var i = 0;i < this.attributes.length; i++) {
            var attr = this.attributes.item(i);
            if (!attr.isEqualNode(otherNode.getAttributeNodeNS(attr.namespaceURI, attr.localName))) {
              return false;
            }
          }
          break;
        case this.ATTRIBUTE_NODE:
          if (this.namespaceURI !== otherNode.namespaceURI)
            return false;
          if (this.localName !== otherNode.localName)
            return false;
          if (this.value !== otherNode.value)
            return false;
          break;
        case this.PROCESSING_INSTRUCTION_NODE:
          if (this.target !== otherNode.target || this.data !== otherNode.data) {
            return false;
          }
          break;
        case this.TEXT_NODE:
        case this.COMMENT_NODE:
          if (this.data !== otherNode.data)
            return false;
          break;
      }
      if (this.childNodes.length !== otherNode.childNodes.length) {
        return false;
      }
      for (var i = 0;i < this.childNodes.length; i++) {
        if (!this.childNodes[i].isEqualNode(otherNode.childNodes[i])) {
          return false;
        }
      }
      return true;
    },
    isSameNode: function(otherNode) {
      return this === otherNode;
    },
    insertBefore: function(newChild, refChild) {
      return _insertBefore(this, newChild, refChild);
    },
    replaceChild: function(newChild, oldChild) {
      _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
      if (oldChild) {
        this.removeChild(oldChild);
      }
    },
    removeChild: function(oldChild) {
      return _removeChild(this, oldChild);
    },
    appendChild: function(newChild) {
      return this.insertBefore(newChild, null);
    },
    hasChildNodes: function() {
      return this.firstChild != null;
    },
    cloneNode: function(deep) {
      return cloneNode(this.ownerDocument || this, this, deep);
    },
    normalize: function() {
      var child = this.firstChild;
      while (child) {
        var next = child.nextSibling;
        if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
          this.removeChild(next);
          child.appendData(next.data);
        } else {
          child.normalize();
          child = next;
        }
      }
    },
    isSupported: function(feature, version) {
      return this.ownerDocument.implementation.hasFeature(feature, version);
    },
    lookupPrefix: function(namespaceURI) {
      var el = this;
      while (el) {
        var map = el._nsMap;
        if (map) {
          for (var n in map) {
            if (hasOwn(map, n) && map[n] === namespaceURI) {
              return n;
            }
          }
        }
        el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
      }
      return null;
    },
    lookupNamespaceURI: function(prefix) {
      var el = this;
      while (el) {
        var map = el._nsMap;
        if (map) {
          if (hasOwn(map, prefix)) {
            return map[prefix];
          }
        }
        el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
      }
      return null;
    },
    isDefaultNamespace: function(namespaceURI) {
      var prefix = this.lookupPrefix(namespaceURI);
      return prefix == null;
    },
    compareDocumentPosition: function(other) {
      if (this === other)
        return 0;
      var node1 = other;
      var node2 = this;
      var attr1 = null;
      var attr2 = null;
      if (node1 instanceof Attr) {
        attr1 = node1;
        node1 = attr1.ownerElement;
      }
      if (node2 instanceof Attr) {
        attr2 = node2;
        node2 = attr2.ownerElement;
        if (attr1 && node1 && node2 === node1) {
          for (var i = 0, attr;attr = node2.attributes[i]; i++) {
            if (attr === attr1)
              return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
            if (attr === attr2)
              return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
          }
        }
      }
      if (!node1 || !node2 || node2.ownerDocument !== node1.ownerDocument) {
        return DocumentPosition.DOCUMENT_POSITION_DISCONNECTED + DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (docGUID(node2.ownerDocument) > docGUID(node1.ownerDocument) ? DocumentPosition.DOCUMENT_POSITION_FOLLOWING : DocumentPosition.DOCUMENT_POSITION_PRECEDING);
      }
      if (attr2 && node1 === node2) {
        return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
      }
      if (attr1 && node1 === node2) {
        return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
      }
      var chain1 = [];
      var ancestor1 = node1.parentNode;
      while (ancestor1) {
        if (!attr2 && ancestor1 === node2) {
          return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
        }
        chain1.push(ancestor1);
        ancestor1 = ancestor1.parentNode;
      }
      chain1.reverse();
      var chain2 = [];
      var ancestor2 = node2.parentNode;
      while (ancestor2) {
        if (!attr1 && ancestor2 === node1) {
          return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
        }
        chain2.push(ancestor2);
        ancestor2 = ancestor2.parentNode;
      }
      chain2.reverse();
      var ca = commonAncestor(chain1, chain2);
      for (var n in ca.childNodes) {
        var child = ca.childNodes[n];
        if (child === node2)
          return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
        if (child === node1)
          return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
        if (chain2.indexOf(child) >= 0)
          return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
        if (chain1.indexOf(child) >= 0)
          return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
      }
      return 0;
    }
  };
  function _xmlEncoder(c) {
    return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
  }
  copy(NodeType, Node);
  copy(NodeType, Node.prototype);
  copy(DocumentPosition, Node);
  copy(DocumentPosition, Node.prototype);
  function _visitNode(node, callback) {
    if (callback(node)) {
      return true;
    }
    if (node = node.firstChild) {
      do {
        if (_visitNode(node, callback)) {
          return true;
        }
      } while (node = node.nextSibling);
    }
  }
  function Document(symbol, options) {
    checkSymbol(symbol);
    var opt = options || {};
    this.ownerDocument = this;
    this.contentType = opt.contentType || MIME_TYPE.XML_APPLICATION;
    this.type = isHTMLMimeType(this.contentType) ? "html" : "xml";
  }
  function _onAddAttribute(doc, el, newAttr) {
    doc && doc._inc++;
    var ns = newAttr.namespaceURI;
    if (ns === NAMESPACE.XMLNS) {
      el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
    }
  }
  function _onRemoveAttribute(doc, el, newAttr, remove) {
    doc && doc._inc++;
    var ns = newAttr.namespaceURI;
    if (ns === NAMESPACE.XMLNS) {
      delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
    }
  }
  function _onUpdateChild(doc, parent, newChild) {
    if (doc && doc._inc) {
      doc._inc++;
      var childNodes = parent.childNodes;
      if (newChild && !newChild.nextSibling) {
        childNodes[childNodes.length++] = newChild;
      } else {
        var child = parent.firstChild;
        var i = 0;
        while (child) {
          childNodes[i++] = child;
          child = child.nextSibling;
        }
        childNodes.length = i;
        delete childNodes[childNodes.length];
      }
    }
  }
  function _removeChild(parentNode, child) {
    if (parentNode !== child.parentNode) {
      throw new DOMException(DOMException.NOT_FOUND_ERR, "child's parent is not parent");
    }
    var oldPreviousSibling = child.previousSibling;
    var oldNextSibling = child.nextSibling;
    if (oldPreviousSibling) {
      oldPreviousSibling.nextSibling = oldNextSibling;
    } else {
      parentNode.firstChild = oldNextSibling;
    }
    if (oldNextSibling) {
      oldNextSibling.previousSibling = oldPreviousSibling;
    } else {
      parentNode.lastChild = oldPreviousSibling;
    }
    _onUpdateChild(parentNode.ownerDocument, parentNode);
    child.parentNode = null;
    child.previousSibling = null;
    child.nextSibling = null;
    return child;
  }
  function hasValidParentNodeType(node) {
    return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
  }
  function hasInsertableNodeType(node) {
    return node && (node.nodeType === Node.CDATA_SECTION_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.DOCUMENT_TYPE_NODE || node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE || node.nodeType === Node.TEXT_NODE);
  }
  function isDocTypeNode(node) {
    return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
  }
  function isElementNode(node) {
    return node && node.nodeType === Node.ELEMENT_NODE;
  }
  function isTextNode(node) {
    return node && node.nodeType === Node.TEXT_NODE;
  }
  function isElementInsertionPossible(doc, child) {
    var parentChildNodes = doc.childNodes || [];
    if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
      return false;
    }
    var docTypeNode = find(parentChildNodes, isDocTypeNode);
    return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
  }
  function isElementReplacementPossible(doc, child) {
    var parentChildNodes = doc.childNodes || [];
    function hasElementChildThatIsNotChild(node) {
      return isElementNode(node) && node !== child;
    }
    if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
      return false;
    }
    var docTypeNode = find(parentChildNodes, isDocTypeNode);
    return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
  }
  function assertPreInsertionValidity1to5(parent, node, child) {
    if (!hasValidParentNodeType(parent)) {
      throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
    }
    if (child && child.parentNode !== parent) {
      throw new DOMException(DOMException.NOT_FOUND_ERR, "child not in parent");
    }
    if (!hasInsertableNodeType(node) || isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE) {
      throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType);
    }
  }
  function assertPreInsertionValidityInDocument(parent, node, child) {
    var parentChildNodes = parent.childNodes || [];
    var nodeChildNodes = node.childNodes || [];
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      var nodeChildElements = nodeChildNodes.filter(isElementNode);
      if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      }
      if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
      }
    }
    if (isElementNode(node)) {
      if (!isElementInsertionPossible(parent, child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
      }
    }
    if (isDocTypeNode(node)) {
      if (find(parentChildNodes, isDocTypeNode)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      }
      var parentElementChild = find(parentChildNodes, isElementNode);
      if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
      }
      if (!child && parentElementChild) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
      }
    }
  }
  function assertPreReplacementValidityInDocument(parent, node, child) {
    var parentChildNodes = parent.childNodes || [];
    var nodeChildNodes = node.childNodes || [];
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      var nodeChildElements = nodeChildNodes.filter(isElementNode);
      if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      }
      if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
      }
    }
    if (isElementNode(node)) {
      if (!isElementReplacementPossible(parent, child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
      }
    }
    if (isDocTypeNode(node)) {
      let hasDoctypeChildThatIsNotChild = function(node2) {
        return isDocTypeNode(node2) && node2 !== child;
      };
      if (find(parentChildNodes, hasDoctypeChildThatIsNotChild)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      }
      var parentElementChild = find(parentChildNodes, isElementNode);
      if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
      }
    }
  }
  function _insertBefore(parent, node, child, _inDocumentAssertion) {
    assertPreInsertionValidity1to5(parent, node, child);
    if (parent.nodeType === Node.DOCUMENT_NODE) {
      (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
    }
    var cp = node.parentNode;
    if (cp) {
      cp.removeChild(node);
    }
    if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
      var newFirst = node.firstChild;
      if (newFirst == null) {
        return node;
      }
      var newLast = node.lastChild;
    } else {
      newFirst = newLast = node;
    }
    var pre = child ? child.previousSibling : parent.lastChild;
    newFirst.previousSibling = pre;
    newLast.nextSibling = child;
    if (pre) {
      pre.nextSibling = newFirst;
    } else {
      parent.firstChild = newFirst;
    }
    if (child == null) {
      parent.lastChild = newLast;
    } else {
      child.previousSibling = newLast;
    }
    do {
      newFirst.parentNode = parent;
    } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
    _onUpdateChild(parent.ownerDocument || parent, parent, node);
    if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
      node.firstChild = node.lastChild = null;
    }
    return node;
  }
  Document.prototype = {
    implementation: null,
    nodeName: "#document",
    nodeType: DOCUMENT_NODE,
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(newChild, refChild) {
      if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
        var child = newChild.firstChild;
        while (child) {
          var next = child.nextSibling;
          this.insertBefore(child, refChild);
          child = next;
        }
        return newChild;
      }
      _insertBefore(this, newChild, refChild);
      newChild.ownerDocument = this;
      if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
        this.documentElement = newChild;
      }
      return newChild;
    },
    removeChild: function(oldChild) {
      var removed = _removeChild(this, oldChild);
      if (removed === this.documentElement) {
        this.documentElement = null;
      }
      return removed;
    },
    replaceChild: function(newChild, oldChild) {
      _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
      newChild.ownerDocument = this;
      if (oldChild) {
        this.removeChild(oldChild);
      }
      if (isElementNode(newChild)) {
        this.documentElement = newChild;
      }
    },
    importNode: function(importedNode, deep) {
      return importNode(this, importedNode, deep);
    },
    getElementById: function(id) {
      var rtv = null;
      _visitNode(this.documentElement, function(node) {
        if (node.nodeType == ELEMENT_NODE) {
          if (node.getAttribute("id") == id) {
            rtv = node;
            return true;
          }
        }
      });
      return rtv;
    },
    createElement: function(tagName) {
      var node = new Element(PDC);
      node.ownerDocument = this;
      if (this.type === "html") {
        tagName = tagName.toLowerCase();
      }
      if (hasDefaultHTMLNamespace(this.contentType)) {
        node.namespaceURI = NAMESPACE.HTML;
      }
      node.nodeName = tagName;
      node.tagName = tagName;
      node.localName = tagName;
      node.childNodes = new NodeList;
      var attrs = node.attributes = new NamedNodeMap;
      attrs._ownerElement = node;
      return node;
    },
    createDocumentFragment: function() {
      var node = new DocumentFragment(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      return node;
    },
    createTextNode: function(data) {
      var node = new Text(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      node.appendData(data);
      return node;
    },
    createComment: function(data) {
      var node = new Comment(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      node.appendData(data);
      return node;
    },
    createCDATASection: function(data) {
      var node = new CDATASection(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      node.appendData(data);
      return node;
    },
    createProcessingInstruction: function(target, data) {
      var node = new ProcessingInstruction(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      node.nodeName = node.target = target;
      node.nodeValue = node.data = data;
      return node;
    },
    createAttribute: function(name) {
      if (!g.QName_exact.test(name)) {
        throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in name "' + name + '"');
      }
      if (this.type === "html") {
        name = name.toLowerCase();
      }
      return this._createAttribute(name);
    },
    _createAttribute: function(name) {
      var node = new Attr(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      node.name = name;
      node.nodeName = name;
      node.localName = name;
      node.specified = true;
      return node;
    },
    createEntityReference: function(name) {
      if (!g.Name.test(name)) {
        throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'not a valid xml name "' + name + '"');
      }
      if (this.type === "html") {
        throw new DOMException("document is an html document", DOMExceptionName.NotSupportedError);
      }
      var node = new EntityReference(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      node.nodeName = name;
      return node;
    },
    createElementNS: function(namespaceURI, qualifiedName) {
      var validated = validateAndExtract(namespaceURI, qualifiedName);
      var node = new Element(PDC);
      var attrs = node.attributes = new NamedNodeMap;
      node.childNodes = new NodeList;
      node.ownerDocument = this;
      node.nodeName = qualifiedName;
      node.tagName = qualifiedName;
      node.namespaceURI = validated[0];
      node.prefix = validated[1];
      node.localName = validated[2];
      attrs._ownerElement = node;
      return node;
    },
    createAttributeNS: function(namespaceURI, qualifiedName) {
      var validated = validateAndExtract(namespaceURI, qualifiedName);
      var node = new Attr(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      node.nodeName = qualifiedName;
      node.name = qualifiedName;
      node.specified = true;
      node.namespaceURI = validated[0];
      node.prefix = validated[1];
      node.localName = validated[2];
      return node;
    }
  };
  _extends(Document, Node);
  function Element(symbol) {
    checkSymbol(symbol);
    this._nsMap = Object.create(null);
  }
  Element.prototype = {
    nodeType: ELEMENT_NODE,
    attributes: null,
    getQualifiedName: function() {
      return this.prefix ? this.prefix + ":" + this.localName : this.localName;
    },
    _isInHTMLDocumentAndNamespace: function() {
      return this.ownerDocument.type === "html" && this.namespaceURI === NAMESPACE.HTML;
    },
    hasAttributes: function() {
      return !!(this.attributes && this.attributes.length);
    },
    hasAttribute: function(name) {
      return !!this.getAttributeNode(name);
    },
    getAttribute: function(name) {
      var attr = this.getAttributeNode(name);
      return attr ? attr.value : null;
    },
    getAttributeNode: function(name) {
      if (this._isInHTMLDocumentAndNamespace()) {
        name = name.toLowerCase();
      }
      return this.attributes.getNamedItem(name);
    },
    setAttribute: function(name, value) {
      if (this._isInHTMLDocumentAndNamespace()) {
        name = name.toLowerCase();
      }
      var attr = this.getAttributeNode(name);
      if (attr) {
        attr.value = attr.nodeValue = "" + value;
      } else {
        attr = this.ownerDocument._createAttribute(name);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      }
    },
    removeAttribute: function(name) {
      var attr = this.getAttributeNode(name);
      attr && this.removeAttributeNode(attr);
    },
    setAttributeNode: function(newAttr) {
      return this.attributes.setNamedItem(newAttr);
    },
    setAttributeNodeNS: function(newAttr) {
      return this.attributes.setNamedItemNS(newAttr);
    },
    removeAttributeNode: function(oldAttr) {
      return this.attributes.removeNamedItem(oldAttr.nodeName);
    },
    removeAttributeNS: function(namespaceURI, localName) {
      var old = this.getAttributeNodeNS(namespaceURI, localName);
      old && this.removeAttributeNode(old);
    },
    hasAttributeNS: function(namespaceURI, localName) {
      return this.getAttributeNodeNS(namespaceURI, localName) != null;
    },
    getAttributeNS: function(namespaceURI, localName) {
      var attr = this.getAttributeNodeNS(namespaceURI, localName);
      return attr ? attr.value : null;
    },
    setAttributeNS: function(namespaceURI, qualifiedName, value) {
      var validated = validateAndExtract(namespaceURI, qualifiedName);
      var localName = validated[2];
      var attr = this.getAttributeNodeNS(namespaceURI, localName);
      if (attr) {
        attr.value = attr.nodeValue = "" + value;
      } else {
        attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      }
    },
    getAttributeNodeNS: function(namespaceURI, localName) {
      return this.attributes.getNamedItemNS(namespaceURI, localName);
    },
    getElementsByClassName: function(classNames) {
      var classNamesSet = toOrderedSet(classNames);
      return new LiveNodeList(this, function(base) {
        var ls = [];
        if (classNamesSet.length > 0) {
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE) {
              var nodeClassNames = node.getAttribute("class");
              if (nodeClassNames) {
                var matches = classNames === nodeClassNames;
                if (!matches) {
                  var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                  matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                }
                if (matches) {
                  ls.push(node);
                }
              }
            }
          });
        }
        return ls;
      });
    },
    getElementsByTagName: function(qualifiedName) {
      var isHTMLDocument = (this.nodeType === DOCUMENT_NODE ? this : this.ownerDocument).type === "html";
      var lowerQualifiedName = qualifiedName.toLowerCase();
      return new LiveNodeList(this, function(base) {
        var ls = [];
        _visitNode(base, function(node) {
          if (node === base || node.nodeType !== ELEMENT_NODE) {
            return;
          }
          if (qualifiedName === "*") {
            ls.push(node);
          } else {
            var nodeQualifiedName = node.getQualifiedName();
            var matchingQName = isHTMLDocument && node.namespaceURI === NAMESPACE.HTML ? lowerQualifiedName : qualifiedName;
            if (nodeQualifiedName === matchingQName) {
              ls.push(node);
            }
          }
        });
        return ls;
      });
    },
    getElementsByTagNameNS: function(namespaceURI, localName) {
      return new LiveNodeList(this, function(base) {
        var ls = [];
        _visitNode(base, function(node) {
          if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
            ls.push(node);
          }
        });
        return ls;
      });
    }
  };
  Document.prototype.getElementsByClassName = Element.prototype.getElementsByClassName;
  Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
  Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
  _extends(Element, Node);
  function Attr(symbol) {
    checkSymbol(symbol);
    this.namespaceURI = null;
    this.prefix = null;
    this.ownerElement = null;
  }
  Attr.prototype.nodeType = ATTRIBUTE_NODE;
  _extends(Attr, Node);
  function CharacterData(symbol) {
    checkSymbol(symbol);
  }
  CharacterData.prototype = {
    data: "",
    substringData: function(offset, count) {
      return this.data.substring(offset, offset + count);
    },
    appendData: function(text) {
      text = this.data + text;
      this.nodeValue = this.data = text;
      this.length = text.length;
    },
    insertData: function(offset, text) {
      this.replaceData(offset, 0, text);
    },
    deleteData: function(offset, count) {
      this.replaceData(offset, count, "");
    },
    replaceData: function(offset, count, text) {
      var start = this.data.substring(0, offset);
      var end = this.data.substring(offset + count);
      text = start + text + end;
      this.nodeValue = this.data = text;
      this.length = text.length;
    }
  };
  _extends(CharacterData, Node);
  function Text(symbol) {
    checkSymbol(symbol);
  }
  Text.prototype = {
    nodeName: "#text",
    nodeType: TEXT_NODE,
    splitText: function(offset) {
      var text = this.data;
      var newText = text.substring(offset);
      text = text.substring(0, offset);
      this.data = this.nodeValue = text;
      this.length = text.length;
      var newNode = this.ownerDocument.createTextNode(newText);
      if (this.parentNode) {
        this.parentNode.insertBefore(newNode, this.nextSibling);
      }
      return newNode;
    }
  };
  _extends(Text, CharacterData);
  function Comment(symbol) {
    checkSymbol(symbol);
  }
  Comment.prototype = {
    nodeName: "#comment",
    nodeType: COMMENT_NODE
  };
  _extends(Comment, CharacterData);
  function CDATASection(symbol) {
    checkSymbol(symbol);
  }
  CDATASection.prototype = {
    nodeName: "#cdata-section",
    nodeType: CDATA_SECTION_NODE
  };
  _extends(CDATASection, Text);
  function DocumentType(symbol) {
    checkSymbol(symbol);
  }
  DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
  _extends(DocumentType, Node);
  function Notation(symbol) {
    checkSymbol(symbol);
  }
  Notation.prototype.nodeType = NOTATION_NODE;
  _extends(Notation, Node);
  function Entity(symbol) {
    checkSymbol(symbol);
  }
  Entity.prototype.nodeType = ENTITY_NODE;
  _extends(Entity, Node);
  function EntityReference(symbol) {
    checkSymbol(symbol);
  }
  EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
  _extends(EntityReference, Node);
  function DocumentFragment(symbol) {
    checkSymbol(symbol);
  }
  DocumentFragment.prototype.nodeName = "#document-fragment";
  DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
  _extends(DocumentFragment, Node);
  function ProcessingInstruction(symbol) {
    checkSymbol(symbol);
  }
  ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
  _extends(ProcessingInstruction, CharacterData);
  function XMLSerializer() {}
  XMLSerializer.prototype.serializeToString = function(node, nodeFilter) {
    return nodeSerializeToString.call(node, nodeFilter);
  };
  Node.prototype.toString = nodeSerializeToString;
  function nodeSerializeToString(nodeFilter) {
    var buf = [];
    var refNode = this.nodeType === DOCUMENT_NODE && this.documentElement || this;
    var prefix = refNode.prefix;
    var uri = refNode.namespaceURI;
    if (uri && prefix == null) {
      var prefix = refNode.lookupPrefix(uri);
      if (prefix == null) {
        var visibleNamespaces = [
          { namespace: uri, prefix: null }
        ];
      }
    }
    serializeToString(this, buf, nodeFilter, visibleNamespaces);
    return buf.join("");
  }
  function needNamespaceDefine(node, isHTML, visibleNamespaces) {
    var prefix = node.prefix || "";
    var uri = node.namespaceURI;
    if (!uri) {
      return false;
    }
    if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
      return false;
    }
    var i = visibleNamespaces.length;
    while (i--) {
      var ns = visibleNamespaces[i];
      if (ns.prefix === prefix) {
        return ns.namespace !== uri;
      }
    }
    return true;
  }
  function addSerializedAttribute(buf, qualifiedName, value) {
    buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
  }
  function serializeToString(node, buf, nodeFilter, visibleNamespaces) {
    if (!visibleNamespaces) {
      visibleNamespaces = [];
    }
    var doc = node.nodeType === DOCUMENT_NODE ? node : node.ownerDocument;
    var isHTML = doc.type === "html";
    if (nodeFilter) {
      node = nodeFilter(node);
      if (node) {
        if (typeof node == "string") {
          buf.push(node);
          return;
        }
      } else {
        return;
      }
    }
    switch (node.nodeType) {
      case ELEMENT_NODE:
        var attrs = node.attributes;
        var len = attrs.length;
        var child = node.firstChild;
        var nodeName = node.tagName;
        var prefixedNodeName = nodeName;
        if (!isHTML && !node.prefix && node.namespaceURI) {
          var defaultNS;
          for (var ai = 0;ai < attrs.length; ai++) {
            if (attrs.item(ai).name === "xmlns") {
              defaultNS = attrs.item(ai).value;
              break;
            }
          }
          if (!defaultNS) {
            for (var nsi = visibleNamespaces.length - 1;nsi >= 0; nsi--) {
              var namespace = visibleNamespaces[nsi];
              if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
                defaultNS = namespace.namespace;
                break;
              }
            }
          }
          if (defaultNS !== node.namespaceURI) {
            for (var nsi = visibleNamespaces.length - 1;nsi >= 0; nsi--) {
              var namespace = visibleNamespaces[nsi];
              if (namespace.namespace === node.namespaceURI) {
                if (namespace.prefix) {
                  prefixedNodeName = namespace.prefix + ":" + nodeName;
                }
                break;
              }
            }
          }
        }
        buf.push("<", prefixedNodeName);
        for (var i = 0;i < len; i++) {
          var attr = attrs.item(i);
          if (attr.prefix == "xmlns") {
            visibleNamespaces.push({
              prefix: attr.localName,
              namespace: attr.value
            });
          } else if (attr.nodeName == "xmlns") {
            visibleNamespaces.push({ prefix: "", namespace: attr.value });
          }
        }
        for (var i = 0;i < len; i++) {
          var attr = attrs.item(i);
          if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
            var prefix = attr.prefix || "";
            var uri = attr.namespaceURI;
            addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
            visibleNamespaces.push({ prefix, namespace: uri });
          }
          serializeToString(attr, buf, nodeFilter, visibleNamespaces);
        }
        if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
          var prefix = node.prefix || "";
          var uri = node.namespaceURI;
          addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
          visibleNamespaces.push({ prefix, namespace: uri });
        }
        var canCloseTag = !child;
        if (canCloseTag && (isHTML || node.namespaceURI === NAMESPACE.HTML)) {
          canCloseTag = isHTMLVoidElement(nodeName);
        }
        if (canCloseTag) {
          buf.push("/>");
        } else {
          buf.push(">");
          if (isHTML && isHTMLRawTextElement(nodeName)) {
            while (child) {
              if (child.data) {
                buf.push(child.data);
              } else {
                serializeToString(child, buf, nodeFilter, visibleNamespaces.slice());
              }
              child = child.nextSibling;
            }
          } else {
            while (child) {
              serializeToString(child, buf, nodeFilter, visibleNamespaces.slice());
              child = child.nextSibling;
            }
          }
          buf.push("</", prefixedNodeName, ">");
        }
        return;
      case DOCUMENT_NODE:
      case DOCUMENT_FRAGMENT_NODE:
        var child = node.firstChild;
        while (child) {
          serializeToString(child, buf, nodeFilter, visibleNamespaces.slice());
          child = child.nextSibling;
        }
        return;
      case ATTRIBUTE_NODE:
        return addSerializedAttribute(buf, node.name, node.value);
      case TEXT_NODE:
        return buf.push(node.data.replace(/[<&>]/g, _xmlEncoder));
      case CDATA_SECTION_NODE:
        return buf.push(g.CDATA_START, node.data, g.CDATA_END);
      case COMMENT_NODE:
        return buf.push(g.COMMENT_START, node.data, g.COMMENT_END);
      case DOCUMENT_TYPE_NODE:
        var pubid = node.publicId;
        var sysid = node.systemId;
        buf.push(g.DOCTYPE_DECL_START, " ", node.name);
        if (pubid) {
          buf.push(" ", g.PUBLIC, " ", pubid);
          if (sysid && sysid !== ".") {
            buf.push(" ", sysid);
          }
        } else if (sysid && sysid !== ".") {
          buf.push(" ", g.SYSTEM, " ", sysid);
        }
        if (node.internalSubset) {
          buf.push(" [", node.internalSubset, "]");
        }
        buf.push(">");
        return;
      case PROCESSING_INSTRUCTION_NODE:
        return buf.push("<?", node.target, " ", node.data, "?>");
      case ENTITY_REFERENCE_NODE:
        return buf.push("&", node.nodeName, ";");
      default:
        buf.push("??", node.nodeName);
    }
  }
  function importNode(doc, node, deep) {
    var node2;
    switch (node.nodeType) {
      case ELEMENT_NODE:
        node2 = node.cloneNode(false);
        node2.ownerDocument = doc;
      case DOCUMENT_FRAGMENT_NODE:
        break;
      case ATTRIBUTE_NODE:
        deep = true;
        break;
    }
    if (!node2) {
      node2 = node.cloneNode(false);
    }
    node2.ownerDocument = doc;
    node2.parentNode = null;
    if (deep) {
      var child = node.firstChild;
      while (child) {
        node2.appendChild(importNode(doc, child, deep));
        child = child.nextSibling;
      }
    }
    return node2;
  }
  function cloneNode(doc, node, deep) {
    var node2 = new node.constructor(PDC);
    for (var n in node) {
      if (hasOwn(node, n)) {
        var v = node[n];
        if (typeof v != "object") {
          if (v != node2[n]) {
            node2[n] = v;
          }
        }
      }
    }
    if (node.childNodes) {
      node2.childNodes = new NodeList;
    }
    node2.ownerDocument = doc;
    switch (node2.nodeType) {
      case ELEMENT_NODE:
        var attrs = node.attributes;
        var attrs2 = node2.attributes = new NamedNodeMap;
        var len = attrs.length;
        attrs2._ownerElement = node2;
        for (var i = 0;i < len; i++) {
          node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
        }
        break;
      case ATTRIBUTE_NODE:
        deep = true;
    }
    if (deep) {
      var child = node.firstChild;
      while (child) {
        node2.appendChild(cloneNode(doc, child, deep));
        child = child.nextSibling;
      }
    }
    return node2;
  }
  function __set__(object, key, value) {
    object[key] = value;
  }
  try {
    if (Object.defineProperty) {
      let getTextContent = function(node) {
        switch (node.nodeType) {
          case ELEMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            var buf = [];
            node = node.firstChild;
            while (node) {
              if (node.nodeType !== 7 && node.nodeType !== 8) {
                buf.push(getTextContent(node));
              }
              node = node.nextSibling;
            }
            return buf.join("");
          default:
            return node.nodeValue;
        }
      };
      Object.defineProperty(LiveNodeList.prototype, "length", {
        get: function() {
          _updateLiveList(this);
          return this.$$length;
        }
      });
      Object.defineProperty(Node.prototype, "textContent", {
        get: function() {
          return getTextContent(this);
        },
        set: function(data) {
          switch (this.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              while (this.firstChild) {
                this.removeChild(this.firstChild);
              }
              if (data || String(data)) {
                this.appendChild(this.ownerDocument.createTextNode(data));
              }
              break;
            default:
              this.data = data;
              this.value = data;
              this.nodeValue = data;
          }
        }
      });
      __set__ = function(object, key, value) {
        object["$$" + key] = value;
      };
    }
  } catch (e) {}
  exports._updateLiveList = _updateLiveList;
  exports.Attr = Attr;
  exports.CDATASection = CDATASection;
  exports.CharacterData = CharacterData;
  exports.Comment = Comment;
  exports.Document = Document;
  exports.DocumentFragment = DocumentFragment;
  exports.DocumentType = DocumentType;
  exports.DOMImplementation = DOMImplementation;
  exports.Element = Element;
  exports.Entity = Entity;
  exports.EntityReference = EntityReference;
  exports.LiveNodeList = LiveNodeList;
  exports.NamedNodeMap = NamedNodeMap;
  exports.Node = Node;
  exports.NodeList = NodeList;
  exports.Notation = Notation;
  exports.Text = Text;
  exports.ProcessingInstruction = ProcessingInstruction;
  exports.XMLSerializer = XMLSerializer;
});

// node_modules/@xmldom/xmldom/lib/entities.js
var require_entities = __commonJS((exports) => {
  var freeze = require_conventions().freeze;
  exports.XML_ENTITIES = freeze({
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: '"'
  });
  exports.HTML_ENTITIES = freeze({
    Aacute: "Á",
    aacute: "á",
    Abreve: "Ă",
    abreve: "ă",
    ac: "∾",
    acd: "∿",
    acE: "∾̳",
    Acirc: "Â",
    acirc: "â",
    acute: "´",
    Acy: "А",
    acy: "а",
    AElig: "Æ",
    aelig: "æ",
    af: "⁡",
    Afr: "\uD835\uDD04",
    afr: "\uD835\uDD1E",
    Agrave: "À",
    agrave: "à",
    alefsym: "ℵ",
    aleph: "ℵ",
    Alpha: "Α",
    alpha: "α",
    Amacr: "Ā",
    amacr: "ā",
    amalg: "⨿",
    AMP: "&",
    amp: "&",
    And: "⩓",
    and: "∧",
    andand: "⩕",
    andd: "⩜",
    andslope: "⩘",
    andv: "⩚",
    ang: "∠",
    ange: "⦤",
    angle: "∠",
    angmsd: "∡",
    angmsdaa: "⦨",
    angmsdab: "⦩",
    angmsdac: "⦪",
    angmsdad: "⦫",
    angmsdae: "⦬",
    angmsdaf: "⦭",
    angmsdag: "⦮",
    angmsdah: "⦯",
    angrt: "∟",
    angrtvb: "⊾",
    angrtvbd: "⦝",
    angsph: "∢",
    angst: "Å",
    angzarr: "⍼",
    Aogon: "Ą",
    aogon: "ą",
    Aopf: "\uD835\uDD38",
    aopf: "\uD835\uDD52",
    ap: "≈",
    apacir: "⩯",
    apE: "⩰",
    ape: "≊",
    apid: "≋",
    apos: "'",
    ApplyFunction: "⁡",
    approx: "≈",
    approxeq: "≊",
    Aring: "Å",
    aring: "å",
    Ascr: "\uD835\uDC9C",
    ascr: "\uD835\uDCB6",
    Assign: "≔",
    ast: "*",
    asymp: "≈",
    asympeq: "≍",
    Atilde: "Ã",
    atilde: "ã",
    Auml: "Ä",
    auml: "ä",
    awconint: "∳",
    awint: "⨑",
    backcong: "≌",
    backepsilon: "϶",
    backprime: "‵",
    backsim: "∽",
    backsimeq: "⋍",
    Backslash: "∖",
    Barv: "⫧",
    barvee: "⊽",
    Barwed: "⌆",
    barwed: "⌅",
    barwedge: "⌅",
    bbrk: "⎵",
    bbrktbrk: "⎶",
    bcong: "≌",
    Bcy: "Б",
    bcy: "б",
    bdquo: "„",
    becaus: "∵",
    Because: "∵",
    because: "∵",
    bemptyv: "⦰",
    bepsi: "϶",
    bernou: "ℬ",
    Bernoullis: "ℬ",
    Beta: "Β",
    beta: "β",
    beth: "ℶ",
    between: "≬",
    Bfr: "\uD835\uDD05",
    bfr: "\uD835\uDD1F",
    bigcap: "⋂",
    bigcirc: "◯",
    bigcup: "⋃",
    bigodot: "⨀",
    bigoplus: "⨁",
    bigotimes: "⨂",
    bigsqcup: "⨆",
    bigstar: "★",
    bigtriangledown: "▽",
    bigtriangleup: "△",
    biguplus: "⨄",
    bigvee: "⋁",
    bigwedge: "⋀",
    bkarow: "⤍",
    blacklozenge: "⧫",
    blacksquare: "▪",
    blacktriangle: "▴",
    blacktriangledown: "▾",
    blacktriangleleft: "◂",
    blacktriangleright: "▸",
    blank: "␣",
    blk12: "▒",
    blk14: "░",
    blk34: "▓",
    block: "█",
    bne: "=⃥",
    bnequiv: "≡⃥",
    bNot: "⫭",
    bnot: "⌐",
    Bopf: "\uD835\uDD39",
    bopf: "\uD835\uDD53",
    bot: "⊥",
    bottom: "⊥",
    bowtie: "⋈",
    boxbox: "⧉",
    boxDL: "╗",
    boxDl: "╖",
    boxdL: "╕",
    boxdl: "┐",
    boxDR: "╔",
    boxDr: "╓",
    boxdR: "╒",
    boxdr: "┌",
    boxH: "═",
    boxh: "─",
    boxHD: "╦",
    boxHd: "╤",
    boxhD: "╥",
    boxhd: "┬",
    boxHU: "╩",
    boxHu: "╧",
    boxhU: "╨",
    boxhu: "┴",
    boxminus: "⊟",
    boxplus: "⊞",
    boxtimes: "⊠",
    boxUL: "╝",
    boxUl: "╜",
    boxuL: "╛",
    boxul: "┘",
    boxUR: "╚",
    boxUr: "╙",
    boxuR: "╘",
    boxur: "└",
    boxV: "║",
    boxv: "│",
    boxVH: "╬",
    boxVh: "╫",
    boxvH: "╪",
    boxvh: "┼",
    boxVL: "╣",
    boxVl: "╢",
    boxvL: "╡",
    boxvl: "┤",
    boxVR: "╠",
    boxVr: "╟",
    boxvR: "╞",
    boxvr: "├",
    bprime: "‵",
    Breve: "˘",
    breve: "˘",
    brvbar: "¦",
    Bscr: "ℬ",
    bscr: "\uD835\uDCB7",
    bsemi: "⁏",
    bsim: "∽",
    bsime: "⋍",
    bsol: "\\",
    bsolb: "⧅",
    bsolhsub: "⟈",
    bull: "•",
    bullet: "•",
    bump: "≎",
    bumpE: "⪮",
    bumpe: "≏",
    Bumpeq: "≎",
    bumpeq: "≏",
    Cacute: "Ć",
    cacute: "ć",
    Cap: "⋒",
    cap: "∩",
    capand: "⩄",
    capbrcup: "⩉",
    capcap: "⩋",
    capcup: "⩇",
    capdot: "⩀",
    CapitalDifferentialD: "ⅅ",
    caps: "∩︀",
    caret: "⁁",
    caron: "ˇ",
    Cayleys: "ℭ",
    ccaps: "⩍",
    Ccaron: "Č",
    ccaron: "č",
    Ccedil: "Ç",
    ccedil: "ç",
    Ccirc: "Ĉ",
    ccirc: "ĉ",
    Cconint: "∰",
    ccups: "⩌",
    ccupssm: "⩐",
    Cdot: "Ċ",
    cdot: "ċ",
    cedil: "¸",
    Cedilla: "¸",
    cemptyv: "⦲",
    cent: "¢",
    CenterDot: "·",
    centerdot: "·",
    Cfr: "ℭ",
    cfr: "\uD835\uDD20",
    CHcy: "Ч",
    chcy: "ч",
    check: "✓",
    checkmark: "✓",
    Chi: "Χ",
    chi: "χ",
    cir: "○",
    circ: "ˆ",
    circeq: "≗",
    circlearrowleft: "↺",
    circlearrowright: "↻",
    circledast: "⊛",
    circledcirc: "⊚",
    circleddash: "⊝",
    CircleDot: "⊙",
    circledR: "®",
    circledS: "Ⓢ",
    CircleMinus: "⊖",
    CirclePlus: "⊕",
    CircleTimes: "⊗",
    cirE: "⧃",
    cire: "≗",
    cirfnint: "⨐",
    cirmid: "⫯",
    cirscir: "⧂",
    ClockwiseContourIntegral: "∲",
    CloseCurlyDoubleQuote: "”",
    CloseCurlyQuote: "’",
    clubs: "♣",
    clubsuit: "♣",
    Colon: "∷",
    colon: ":",
    Colone: "⩴",
    colone: "≔",
    coloneq: "≔",
    comma: ",",
    commat: "@",
    comp: "∁",
    compfn: "∘",
    complement: "∁",
    complexes: "ℂ",
    cong: "≅",
    congdot: "⩭",
    Congruent: "≡",
    Conint: "∯",
    conint: "∮",
    ContourIntegral: "∮",
    Copf: "ℂ",
    copf: "\uD835\uDD54",
    coprod: "∐",
    Coproduct: "∐",
    COPY: "©",
    copy: "©",
    copysr: "℗",
    CounterClockwiseContourIntegral: "∳",
    crarr: "↵",
    Cross: "⨯",
    cross: "✗",
    Cscr: "\uD835\uDC9E",
    cscr: "\uD835\uDCB8",
    csub: "⫏",
    csube: "⫑",
    csup: "⫐",
    csupe: "⫒",
    ctdot: "⋯",
    cudarrl: "⤸",
    cudarrr: "⤵",
    cuepr: "⋞",
    cuesc: "⋟",
    cularr: "↶",
    cularrp: "⤽",
    Cup: "⋓",
    cup: "∪",
    cupbrcap: "⩈",
    CupCap: "≍",
    cupcap: "⩆",
    cupcup: "⩊",
    cupdot: "⊍",
    cupor: "⩅",
    cups: "∪︀",
    curarr: "↷",
    curarrm: "⤼",
    curlyeqprec: "⋞",
    curlyeqsucc: "⋟",
    curlyvee: "⋎",
    curlywedge: "⋏",
    curren: "¤",
    curvearrowleft: "↶",
    curvearrowright: "↷",
    cuvee: "⋎",
    cuwed: "⋏",
    cwconint: "∲",
    cwint: "∱",
    cylcty: "⌭",
    Dagger: "‡",
    dagger: "†",
    daleth: "ℸ",
    Darr: "↡",
    dArr: "⇓",
    darr: "↓",
    dash: "‐",
    Dashv: "⫤",
    dashv: "⊣",
    dbkarow: "⤏",
    dblac: "˝",
    Dcaron: "Ď",
    dcaron: "ď",
    Dcy: "Д",
    dcy: "д",
    DD: "ⅅ",
    dd: "ⅆ",
    ddagger: "‡",
    ddarr: "⇊",
    DDotrahd: "⤑",
    ddotseq: "⩷",
    deg: "°",
    Del: "∇",
    Delta: "Δ",
    delta: "δ",
    demptyv: "⦱",
    dfisht: "⥿",
    Dfr: "\uD835\uDD07",
    dfr: "\uD835\uDD21",
    dHar: "⥥",
    dharl: "⇃",
    dharr: "⇂",
    DiacriticalAcute: "´",
    DiacriticalDot: "˙",
    DiacriticalDoubleAcute: "˝",
    DiacriticalGrave: "`",
    DiacriticalTilde: "˜",
    diam: "⋄",
    Diamond: "⋄",
    diamond: "⋄",
    diamondsuit: "♦",
    diams: "♦",
    die: "¨",
    DifferentialD: "ⅆ",
    digamma: "ϝ",
    disin: "⋲",
    div: "÷",
    divide: "÷",
    divideontimes: "⋇",
    divonx: "⋇",
    DJcy: "Ђ",
    djcy: "ђ",
    dlcorn: "⌞",
    dlcrop: "⌍",
    dollar: "$",
    Dopf: "\uD835\uDD3B",
    dopf: "\uD835\uDD55",
    Dot: "¨",
    dot: "˙",
    DotDot: "⃜",
    doteq: "≐",
    doteqdot: "≑",
    DotEqual: "≐",
    dotminus: "∸",
    dotplus: "∔",
    dotsquare: "⊡",
    doublebarwedge: "⌆",
    DoubleContourIntegral: "∯",
    DoubleDot: "¨",
    DoubleDownArrow: "⇓",
    DoubleLeftArrow: "⇐",
    DoubleLeftRightArrow: "⇔",
    DoubleLeftTee: "⫤",
    DoubleLongLeftArrow: "⟸",
    DoubleLongLeftRightArrow: "⟺",
    DoubleLongRightArrow: "⟹",
    DoubleRightArrow: "⇒",
    DoubleRightTee: "⊨",
    DoubleUpArrow: "⇑",
    DoubleUpDownArrow: "⇕",
    DoubleVerticalBar: "∥",
    DownArrow: "↓",
    Downarrow: "⇓",
    downarrow: "↓",
    DownArrowBar: "⤓",
    DownArrowUpArrow: "⇵",
    DownBreve: "̑",
    downdownarrows: "⇊",
    downharpoonleft: "⇃",
    downharpoonright: "⇂",
    DownLeftRightVector: "⥐",
    DownLeftTeeVector: "⥞",
    DownLeftVector: "↽",
    DownLeftVectorBar: "⥖",
    DownRightTeeVector: "⥟",
    DownRightVector: "⇁",
    DownRightVectorBar: "⥗",
    DownTee: "⊤",
    DownTeeArrow: "↧",
    drbkarow: "⤐",
    drcorn: "⌟",
    drcrop: "⌌",
    Dscr: "\uD835\uDC9F",
    dscr: "\uD835\uDCB9",
    DScy: "Ѕ",
    dscy: "ѕ",
    dsol: "⧶",
    Dstrok: "Đ",
    dstrok: "đ",
    dtdot: "⋱",
    dtri: "▿",
    dtrif: "▾",
    duarr: "⇵",
    duhar: "⥯",
    dwangle: "⦦",
    DZcy: "Џ",
    dzcy: "џ",
    dzigrarr: "⟿",
    Eacute: "É",
    eacute: "é",
    easter: "⩮",
    Ecaron: "Ě",
    ecaron: "ě",
    ecir: "≖",
    Ecirc: "Ê",
    ecirc: "ê",
    ecolon: "≕",
    Ecy: "Э",
    ecy: "э",
    eDDot: "⩷",
    Edot: "Ė",
    eDot: "≑",
    edot: "ė",
    ee: "ⅇ",
    efDot: "≒",
    Efr: "\uD835\uDD08",
    efr: "\uD835\uDD22",
    eg: "⪚",
    Egrave: "È",
    egrave: "è",
    egs: "⪖",
    egsdot: "⪘",
    el: "⪙",
    Element: "∈",
    elinters: "⏧",
    ell: "ℓ",
    els: "⪕",
    elsdot: "⪗",
    Emacr: "Ē",
    emacr: "ē",
    empty: "∅",
    emptyset: "∅",
    EmptySmallSquare: "◻",
    emptyv: "∅",
    EmptyVerySmallSquare: "▫",
    emsp: " ",
    emsp13: " ",
    emsp14: " ",
    ENG: "Ŋ",
    eng: "ŋ",
    ensp: " ",
    Eogon: "Ę",
    eogon: "ę",
    Eopf: "\uD835\uDD3C",
    eopf: "\uD835\uDD56",
    epar: "⋕",
    eparsl: "⧣",
    eplus: "⩱",
    epsi: "ε",
    Epsilon: "Ε",
    epsilon: "ε",
    epsiv: "ϵ",
    eqcirc: "≖",
    eqcolon: "≕",
    eqsim: "≂",
    eqslantgtr: "⪖",
    eqslantless: "⪕",
    Equal: "⩵",
    equals: "=",
    EqualTilde: "≂",
    equest: "≟",
    Equilibrium: "⇌",
    equiv: "≡",
    equivDD: "⩸",
    eqvparsl: "⧥",
    erarr: "⥱",
    erDot: "≓",
    Escr: "ℰ",
    escr: "ℯ",
    esdot: "≐",
    Esim: "⩳",
    esim: "≂",
    Eta: "Η",
    eta: "η",
    ETH: "Ð",
    eth: "ð",
    Euml: "Ë",
    euml: "ë",
    euro: "€",
    excl: "!",
    exist: "∃",
    Exists: "∃",
    expectation: "ℰ",
    ExponentialE: "ⅇ",
    exponentiale: "ⅇ",
    fallingdotseq: "≒",
    Fcy: "Ф",
    fcy: "ф",
    female: "♀",
    ffilig: "ﬃ",
    fflig: "ﬀ",
    ffllig: "ﬄ",
    Ffr: "\uD835\uDD09",
    ffr: "\uD835\uDD23",
    filig: "ﬁ",
    FilledSmallSquare: "◼",
    FilledVerySmallSquare: "▪",
    fjlig: "fj",
    flat: "♭",
    fllig: "ﬂ",
    fltns: "▱",
    fnof: "ƒ",
    Fopf: "\uD835\uDD3D",
    fopf: "\uD835\uDD57",
    ForAll: "∀",
    forall: "∀",
    fork: "⋔",
    forkv: "⫙",
    Fouriertrf: "ℱ",
    fpartint: "⨍",
    frac12: "½",
    frac13: "⅓",
    frac14: "¼",
    frac15: "⅕",
    frac16: "⅙",
    frac18: "⅛",
    frac23: "⅔",
    frac25: "⅖",
    frac34: "¾",
    frac35: "⅗",
    frac38: "⅜",
    frac45: "⅘",
    frac56: "⅚",
    frac58: "⅝",
    frac78: "⅞",
    frasl: "⁄",
    frown: "⌢",
    Fscr: "ℱ",
    fscr: "\uD835\uDCBB",
    gacute: "ǵ",
    Gamma: "Γ",
    gamma: "γ",
    Gammad: "Ϝ",
    gammad: "ϝ",
    gap: "⪆",
    Gbreve: "Ğ",
    gbreve: "ğ",
    Gcedil: "Ģ",
    Gcirc: "Ĝ",
    gcirc: "ĝ",
    Gcy: "Г",
    gcy: "г",
    Gdot: "Ġ",
    gdot: "ġ",
    gE: "≧",
    ge: "≥",
    gEl: "⪌",
    gel: "⋛",
    geq: "≥",
    geqq: "≧",
    geqslant: "⩾",
    ges: "⩾",
    gescc: "⪩",
    gesdot: "⪀",
    gesdoto: "⪂",
    gesdotol: "⪄",
    gesl: "⋛︀",
    gesles: "⪔",
    Gfr: "\uD835\uDD0A",
    gfr: "\uD835\uDD24",
    Gg: "⋙",
    gg: "≫",
    ggg: "⋙",
    gimel: "ℷ",
    GJcy: "Ѓ",
    gjcy: "ѓ",
    gl: "≷",
    gla: "⪥",
    glE: "⪒",
    glj: "⪤",
    gnap: "⪊",
    gnapprox: "⪊",
    gnE: "≩",
    gne: "⪈",
    gneq: "⪈",
    gneqq: "≩",
    gnsim: "⋧",
    Gopf: "\uD835\uDD3E",
    gopf: "\uD835\uDD58",
    grave: "`",
    GreaterEqual: "≥",
    GreaterEqualLess: "⋛",
    GreaterFullEqual: "≧",
    GreaterGreater: "⪢",
    GreaterLess: "≷",
    GreaterSlantEqual: "⩾",
    GreaterTilde: "≳",
    Gscr: "\uD835\uDCA2",
    gscr: "ℊ",
    gsim: "≳",
    gsime: "⪎",
    gsiml: "⪐",
    Gt: "≫",
    GT: ">",
    gt: ">",
    gtcc: "⪧",
    gtcir: "⩺",
    gtdot: "⋗",
    gtlPar: "⦕",
    gtquest: "⩼",
    gtrapprox: "⪆",
    gtrarr: "⥸",
    gtrdot: "⋗",
    gtreqless: "⋛",
    gtreqqless: "⪌",
    gtrless: "≷",
    gtrsim: "≳",
    gvertneqq: "≩︀",
    gvnE: "≩︀",
    Hacek: "ˇ",
    hairsp: " ",
    half: "½",
    hamilt: "ℋ",
    HARDcy: "Ъ",
    hardcy: "ъ",
    hArr: "⇔",
    harr: "↔",
    harrcir: "⥈",
    harrw: "↭",
    Hat: "^",
    hbar: "ℏ",
    Hcirc: "Ĥ",
    hcirc: "ĥ",
    hearts: "♥",
    heartsuit: "♥",
    hellip: "…",
    hercon: "⊹",
    Hfr: "ℌ",
    hfr: "\uD835\uDD25",
    HilbertSpace: "ℋ",
    hksearow: "⤥",
    hkswarow: "⤦",
    hoarr: "⇿",
    homtht: "∻",
    hookleftarrow: "↩",
    hookrightarrow: "↪",
    Hopf: "ℍ",
    hopf: "\uD835\uDD59",
    horbar: "―",
    HorizontalLine: "─",
    Hscr: "ℋ",
    hscr: "\uD835\uDCBD",
    hslash: "ℏ",
    Hstrok: "Ħ",
    hstrok: "ħ",
    HumpDownHump: "≎",
    HumpEqual: "≏",
    hybull: "⁃",
    hyphen: "‐",
    Iacute: "Í",
    iacute: "í",
    ic: "⁣",
    Icirc: "Î",
    icirc: "î",
    Icy: "И",
    icy: "и",
    Idot: "İ",
    IEcy: "Е",
    iecy: "е",
    iexcl: "¡",
    iff: "⇔",
    Ifr: "ℑ",
    ifr: "\uD835\uDD26",
    Igrave: "Ì",
    igrave: "ì",
    ii: "ⅈ",
    iiiint: "⨌",
    iiint: "∭",
    iinfin: "⧜",
    iiota: "℩",
    IJlig: "Ĳ",
    ijlig: "ĳ",
    Im: "ℑ",
    Imacr: "Ī",
    imacr: "ī",
    image: "ℑ",
    ImaginaryI: "ⅈ",
    imagline: "ℐ",
    imagpart: "ℑ",
    imath: "ı",
    imof: "⊷",
    imped: "Ƶ",
    Implies: "⇒",
    in: "∈",
    incare: "℅",
    infin: "∞",
    infintie: "⧝",
    inodot: "ı",
    Int: "∬",
    int: "∫",
    intcal: "⊺",
    integers: "ℤ",
    Integral: "∫",
    intercal: "⊺",
    Intersection: "⋂",
    intlarhk: "⨗",
    intprod: "⨼",
    InvisibleComma: "⁣",
    InvisibleTimes: "⁢",
    IOcy: "Ё",
    iocy: "ё",
    Iogon: "Į",
    iogon: "į",
    Iopf: "\uD835\uDD40",
    iopf: "\uD835\uDD5A",
    Iota: "Ι",
    iota: "ι",
    iprod: "⨼",
    iquest: "¿",
    Iscr: "ℐ",
    iscr: "\uD835\uDCBE",
    isin: "∈",
    isindot: "⋵",
    isinE: "⋹",
    isins: "⋴",
    isinsv: "⋳",
    isinv: "∈",
    it: "⁢",
    Itilde: "Ĩ",
    itilde: "ĩ",
    Iukcy: "І",
    iukcy: "і",
    Iuml: "Ï",
    iuml: "ï",
    Jcirc: "Ĵ",
    jcirc: "ĵ",
    Jcy: "Й",
    jcy: "й",
    Jfr: "\uD835\uDD0D",
    jfr: "\uD835\uDD27",
    jmath: "ȷ",
    Jopf: "\uD835\uDD41",
    jopf: "\uD835\uDD5B",
    Jscr: "\uD835\uDCA5",
    jscr: "\uD835\uDCBF",
    Jsercy: "Ј",
    jsercy: "ј",
    Jukcy: "Є",
    jukcy: "є",
    Kappa: "Κ",
    kappa: "κ",
    kappav: "ϰ",
    Kcedil: "Ķ",
    kcedil: "ķ",
    Kcy: "К",
    kcy: "к",
    Kfr: "\uD835\uDD0E",
    kfr: "\uD835\uDD28",
    kgreen: "ĸ",
    KHcy: "Х",
    khcy: "х",
    KJcy: "Ќ",
    kjcy: "ќ",
    Kopf: "\uD835\uDD42",
    kopf: "\uD835\uDD5C",
    Kscr: "\uD835\uDCA6",
    kscr: "\uD835\uDCC0",
    lAarr: "⇚",
    Lacute: "Ĺ",
    lacute: "ĺ",
    laemptyv: "⦴",
    lagran: "ℒ",
    Lambda: "Λ",
    lambda: "λ",
    Lang: "⟪",
    lang: "⟨",
    langd: "⦑",
    langle: "⟨",
    lap: "⪅",
    Laplacetrf: "ℒ",
    laquo: "«",
    Larr: "↞",
    lArr: "⇐",
    larr: "←",
    larrb: "⇤",
    larrbfs: "⤟",
    larrfs: "⤝",
    larrhk: "↩",
    larrlp: "↫",
    larrpl: "⤹",
    larrsim: "⥳",
    larrtl: "↢",
    lat: "⪫",
    lAtail: "⤛",
    latail: "⤙",
    late: "⪭",
    lates: "⪭︀",
    lBarr: "⤎",
    lbarr: "⤌",
    lbbrk: "❲",
    lbrace: "{",
    lbrack: "[",
    lbrke: "⦋",
    lbrksld: "⦏",
    lbrkslu: "⦍",
    Lcaron: "Ľ",
    lcaron: "ľ",
    Lcedil: "Ļ",
    lcedil: "ļ",
    lceil: "⌈",
    lcub: "{",
    Lcy: "Л",
    lcy: "л",
    ldca: "⤶",
    ldquo: "“",
    ldquor: "„",
    ldrdhar: "⥧",
    ldrushar: "⥋",
    ldsh: "↲",
    lE: "≦",
    le: "≤",
    LeftAngleBracket: "⟨",
    LeftArrow: "←",
    Leftarrow: "⇐",
    leftarrow: "←",
    LeftArrowBar: "⇤",
    LeftArrowRightArrow: "⇆",
    leftarrowtail: "↢",
    LeftCeiling: "⌈",
    LeftDoubleBracket: "⟦",
    LeftDownTeeVector: "⥡",
    LeftDownVector: "⇃",
    LeftDownVectorBar: "⥙",
    LeftFloor: "⌊",
    leftharpoondown: "↽",
    leftharpoonup: "↼",
    leftleftarrows: "⇇",
    LeftRightArrow: "↔",
    Leftrightarrow: "⇔",
    leftrightarrow: "↔",
    leftrightarrows: "⇆",
    leftrightharpoons: "⇋",
    leftrightsquigarrow: "↭",
    LeftRightVector: "⥎",
    LeftTee: "⊣",
    LeftTeeArrow: "↤",
    LeftTeeVector: "⥚",
    leftthreetimes: "⋋",
    LeftTriangle: "⊲",
    LeftTriangleBar: "⧏",
    LeftTriangleEqual: "⊴",
    LeftUpDownVector: "⥑",
    LeftUpTeeVector: "⥠",
    LeftUpVector: "↿",
    LeftUpVectorBar: "⥘",
    LeftVector: "↼",
    LeftVectorBar: "⥒",
    lEg: "⪋",
    leg: "⋚",
    leq: "≤",
    leqq: "≦",
    leqslant: "⩽",
    les: "⩽",
    lescc: "⪨",
    lesdot: "⩿",
    lesdoto: "⪁",
    lesdotor: "⪃",
    lesg: "⋚︀",
    lesges: "⪓",
    lessapprox: "⪅",
    lessdot: "⋖",
    lesseqgtr: "⋚",
    lesseqqgtr: "⪋",
    LessEqualGreater: "⋚",
    LessFullEqual: "≦",
    LessGreater: "≶",
    lessgtr: "≶",
    LessLess: "⪡",
    lesssim: "≲",
    LessSlantEqual: "⩽",
    LessTilde: "≲",
    lfisht: "⥼",
    lfloor: "⌊",
    Lfr: "\uD835\uDD0F",
    lfr: "\uD835\uDD29",
    lg: "≶",
    lgE: "⪑",
    lHar: "⥢",
    lhard: "↽",
    lharu: "↼",
    lharul: "⥪",
    lhblk: "▄",
    LJcy: "Љ",
    ljcy: "љ",
    Ll: "⋘",
    ll: "≪",
    llarr: "⇇",
    llcorner: "⌞",
    Lleftarrow: "⇚",
    llhard: "⥫",
    lltri: "◺",
    Lmidot: "Ŀ",
    lmidot: "ŀ",
    lmoust: "⎰",
    lmoustache: "⎰",
    lnap: "⪉",
    lnapprox: "⪉",
    lnE: "≨",
    lne: "⪇",
    lneq: "⪇",
    lneqq: "≨",
    lnsim: "⋦",
    loang: "⟬",
    loarr: "⇽",
    lobrk: "⟦",
    LongLeftArrow: "⟵",
    Longleftarrow: "⟸",
    longleftarrow: "⟵",
    LongLeftRightArrow: "⟷",
    Longleftrightarrow: "⟺",
    longleftrightarrow: "⟷",
    longmapsto: "⟼",
    LongRightArrow: "⟶",
    Longrightarrow: "⟹",
    longrightarrow: "⟶",
    looparrowleft: "↫",
    looparrowright: "↬",
    lopar: "⦅",
    Lopf: "\uD835\uDD43",
    lopf: "\uD835\uDD5D",
    loplus: "⨭",
    lotimes: "⨴",
    lowast: "∗",
    lowbar: "_",
    LowerLeftArrow: "↙",
    LowerRightArrow: "↘",
    loz: "◊",
    lozenge: "◊",
    lozf: "⧫",
    lpar: "(",
    lparlt: "⦓",
    lrarr: "⇆",
    lrcorner: "⌟",
    lrhar: "⇋",
    lrhard: "⥭",
    lrm: "‎",
    lrtri: "⊿",
    lsaquo: "‹",
    Lscr: "ℒ",
    lscr: "\uD835\uDCC1",
    Lsh: "↰",
    lsh: "↰",
    lsim: "≲",
    lsime: "⪍",
    lsimg: "⪏",
    lsqb: "[",
    lsquo: "‘",
    lsquor: "‚",
    Lstrok: "Ł",
    lstrok: "ł",
    Lt: "≪",
    LT: "<",
    lt: "<",
    ltcc: "⪦",
    ltcir: "⩹",
    ltdot: "⋖",
    lthree: "⋋",
    ltimes: "⋉",
    ltlarr: "⥶",
    ltquest: "⩻",
    ltri: "◃",
    ltrie: "⊴",
    ltrif: "◂",
    ltrPar: "⦖",
    lurdshar: "⥊",
    luruhar: "⥦",
    lvertneqq: "≨︀",
    lvnE: "≨︀",
    macr: "¯",
    male: "♂",
    malt: "✠",
    maltese: "✠",
    Map: "⤅",
    map: "↦",
    mapsto: "↦",
    mapstodown: "↧",
    mapstoleft: "↤",
    mapstoup: "↥",
    marker: "▮",
    mcomma: "⨩",
    Mcy: "М",
    mcy: "м",
    mdash: "—",
    mDDot: "∺",
    measuredangle: "∡",
    MediumSpace: " ",
    Mellintrf: "ℳ",
    Mfr: "\uD835\uDD10",
    mfr: "\uD835\uDD2A",
    mho: "℧",
    micro: "µ",
    mid: "∣",
    midast: "*",
    midcir: "⫰",
    middot: "·",
    minus: "−",
    minusb: "⊟",
    minusd: "∸",
    minusdu: "⨪",
    MinusPlus: "∓",
    mlcp: "⫛",
    mldr: "…",
    mnplus: "∓",
    models: "⊧",
    Mopf: "\uD835\uDD44",
    mopf: "\uD835\uDD5E",
    mp: "∓",
    Mscr: "ℳ",
    mscr: "\uD835\uDCC2",
    mstpos: "∾",
    Mu: "Μ",
    mu: "μ",
    multimap: "⊸",
    mumap: "⊸",
    nabla: "∇",
    Nacute: "Ń",
    nacute: "ń",
    nang: "∠⃒",
    nap: "≉",
    napE: "⩰̸",
    napid: "≋̸",
    napos: "ŉ",
    napprox: "≉",
    natur: "♮",
    natural: "♮",
    naturals: "ℕ",
    nbsp: " ",
    nbump: "≎̸",
    nbumpe: "≏̸",
    ncap: "⩃",
    Ncaron: "Ň",
    ncaron: "ň",
    Ncedil: "Ņ",
    ncedil: "ņ",
    ncong: "≇",
    ncongdot: "⩭̸",
    ncup: "⩂",
    Ncy: "Н",
    ncy: "н",
    ndash: "–",
    ne: "≠",
    nearhk: "⤤",
    neArr: "⇗",
    nearr: "↗",
    nearrow: "↗",
    nedot: "≐̸",
    NegativeMediumSpace: "​",
    NegativeThickSpace: "​",
    NegativeThinSpace: "​",
    NegativeVeryThinSpace: "​",
    nequiv: "≢",
    nesear: "⤨",
    nesim: "≂̸",
    NestedGreaterGreater: "≫",
    NestedLessLess: "≪",
    NewLine: `
`,
    nexist: "∄",
    nexists: "∄",
    Nfr: "\uD835\uDD11",
    nfr: "\uD835\uDD2B",
    ngE: "≧̸",
    nge: "≱",
    ngeq: "≱",
    ngeqq: "≧̸",
    ngeqslant: "⩾̸",
    nges: "⩾̸",
    nGg: "⋙̸",
    ngsim: "≵",
    nGt: "≫⃒",
    ngt: "≯",
    ngtr: "≯",
    nGtv: "≫̸",
    nhArr: "⇎",
    nharr: "↮",
    nhpar: "⫲",
    ni: "∋",
    nis: "⋼",
    nisd: "⋺",
    niv: "∋",
    NJcy: "Њ",
    njcy: "њ",
    nlArr: "⇍",
    nlarr: "↚",
    nldr: "‥",
    nlE: "≦̸",
    nle: "≰",
    nLeftarrow: "⇍",
    nleftarrow: "↚",
    nLeftrightarrow: "⇎",
    nleftrightarrow: "↮",
    nleq: "≰",
    nleqq: "≦̸",
    nleqslant: "⩽̸",
    nles: "⩽̸",
    nless: "≮",
    nLl: "⋘̸",
    nlsim: "≴",
    nLt: "≪⃒",
    nlt: "≮",
    nltri: "⋪",
    nltrie: "⋬",
    nLtv: "≪̸",
    nmid: "∤",
    NoBreak: "⁠",
    NonBreakingSpace: " ",
    Nopf: "ℕ",
    nopf: "\uD835\uDD5F",
    Not: "⫬",
    not: "¬",
    NotCongruent: "≢",
    NotCupCap: "≭",
    NotDoubleVerticalBar: "∦",
    NotElement: "∉",
    NotEqual: "≠",
    NotEqualTilde: "≂̸",
    NotExists: "∄",
    NotGreater: "≯",
    NotGreaterEqual: "≱",
    NotGreaterFullEqual: "≧̸",
    NotGreaterGreater: "≫̸",
    NotGreaterLess: "≹",
    NotGreaterSlantEqual: "⩾̸",
    NotGreaterTilde: "≵",
    NotHumpDownHump: "≎̸",
    NotHumpEqual: "≏̸",
    notin: "∉",
    notindot: "⋵̸",
    notinE: "⋹̸",
    notinva: "∉",
    notinvb: "⋷",
    notinvc: "⋶",
    NotLeftTriangle: "⋪",
    NotLeftTriangleBar: "⧏̸",
    NotLeftTriangleEqual: "⋬",
    NotLess: "≮",
    NotLessEqual: "≰",
    NotLessGreater: "≸",
    NotLessLess: "≪̸",
    NotLessSlantEqual: "⩽̸",
    NotLessTilde: "≴",
    NotNestedGreaterGreater: "⪢̸",
    NotNestedLessLess: "⪡̸",
    notni: "∌",
    notniva: "∌",
    notnivb: "⋾",
    notnivc: "⋽",
    NotPrecedes: "⊀",
    NotPrecedesEqual: "⪯̸",
    NotPrecedesSlantEqual: "⋠",
    NotReverseElement: "∌",
    NotRightTriangle: "⋫",
    NotRightTriangleBar: "⧐̸",
    NotRightTriangleEqual: "⋭",
    NotSquareSubset: "⊏̸",
    NotSquareSubsetEqual: "⋢",
    NotSquareSuperset: "⊐̸",
    NotSquareSupersetEqual: "⋣",
    NotSubset: "⊂⃒",
    NotSubsetEqual: "⊈",
    NotSucceeds: "⊁",
    NotSucceedsEqual: "⪰̸",
    NotSucceedsSlantEqual: "⋡",
    NotSucceedsTilde: "≿̸",
    NotSuperset: "⊃⃒",
    NotSupersetEqual: "⊉",
    NotTilde: "≁",
    NotTildeEqual: "≄",
    NotTildeFullEqual: "≇",
    NotTildeTilde: "≉",
    NotVerticalBar: "∤",
    npar: "∦",
    nparallel: "∦",
    nparsl: "⫽⃥",
    npart: "∂̸",
    npolint: "⨔",
    npr: "⊀",
    nprcue: "⋠",
    npre: "⪯̸",
    nprec: "⊀",
    npreceq: "⪯̸",
    nrArr: "⇏",
    nrarr: "↛",
    nrarrc: "⤳̸",
    nrarrw: "↝̸",
    nRightarrow: "⇏",
    nrightarrow: "↛",
    nrtri: "⋫",
    nrtrie: "⋭",
    nsc: "⊁",
    nsccue: "⋡",
    nsce: "⪰̸",
    Nscr: "\uD835\uDCA9",
    nscr: "\uD835\uDCC3",
    nshortmid: "∤",
    nshortparallel: "∦",
    nsim: "≁",
    nsime: "≄",
    nsimeq: "≄",
    nsmid: "∤",
    nspar: "∦",
    nsqsube: "⋢",
    nsqsupe: "⋣",
    nsub: "⊄",
    nsubE: "⫅̸",
    nsube: "⊈",
    nsubset: "⊂⃒",
    nsubseteq: "⊈",
    nsubseteqq: "⫅̸",
    nsucc: "⊁",
    nsucceq: "⪰̸",
    nsup: "⊅",
    nsupE: "⫆̸",
    nsupe: "⊉",
    nsupset: "⊃⃒",
    nsupseteq: "⊉",
    nsupseteqq: "⫆̸",
    ntgl: "≹",
    Ntilde: "Ñ",
    ntilde: "ñ",
    ntlg: "≸",
    ntriangleleft: "⋪",
    ntrianglelefteq: "⋬",
    ntriangleright: "⋫",
    ntrianglerighteq: "⋭",
    Nu: "Ν",
    nu: "ν",
    num: "#",
    numero: "№",
    numsp: " ",
    nvap: "≍⃒",
    nVDash: "⊯",
    nVdash: "⊮",
    nvDash: "⊭",
    nvdash: "⊬",
    nvge: "≥⃒",
    nvgt: ">⃒",
    nvHarr: "⤄",
    nvinfin: "⧞",
    nvlArr: "⤂",
    nvle: "≤⃒",
    nvlt: "<⃒",
    nvltrie: "⊴⃒",
    nvrArr: "⤃",
    nvrtrie: "⊵⃒",
    nvsim: "∼⃒",
    nwarhk: "⤣",
    nwArr: "⇖",
    nwarr: "↖",
    nwarrow: "↖",
    nwnear: "⤧",
    Oacute: "Ó",
    oacute: "ó",
    oast: "⊛",
    ocir: "⊚",
    Ocirc: "Ô",
    ocirc: "ô",
    Ocy: "О",
    ocy: "о",
    odash: "⊝",
    Odblac: "Ő",
    odblac: "ő",
    odiv: "⨸",
    odot: "⊙",
    odsold: "⦼",
    OElig: "Œ",
    oelig: "œ",
    ofcir: "⦿",
    Ofr: "\uD835\uDD12",
    ofr: "\uD835\uDD2C",
    ogon: "˛",
    Ograve: "Ò",
    ograve: "ò",
    ogt: "⧁",
    ohbar: "⦵",
    ohm: "Ω",
    oint: "∮",
    olarr: "↺",
    olcir: "⦾",
    olcross: "⦻",
    oline: "‾",
    olt: "⧀",
    Omacr: "Ō",
    omacr: "ō",
    Omega: "Ω",
    omega: "ω",
    Omicron: "Ο",
    omicron: "ο",
    omid: "⦶",
    ominus: "⊖",
    Oopf: "\uD835\uDD46",
    oopf: "\uD835\uDD60",
    opar: "⦷",
    OpenCurlyDoubleQuote: "“",
    OpenCurlyQuote: "‘",
    operp: "⦹",
    oplus: "⊕",
    Or: "⩔",
    or: "∨",
    orarr: "↻",
    ord: "⩝",
    order: "ℴ",
    orderof: "ℴ",
    ordf: "ª",
    ordm: "º",
    origof: "⊶",
    oror: "⩖",
    orslope: "⩗",
    orv: "⩛",
    oS: "Ⓢ",
    Oscr: "\uD835\uDCAA",
    oscr: "ℴ",
    Oslash: "Ø",
    oslash: "ø",
    osol: "⊘",
    Otilde: "Õ",
    otilde: "õ",
    Otimes: "⨷",
    otimes: "⊗",
    otimesas: "⨶",
    Ouml: "Ö",
    ouml: "ö",
    ovbar: "⌽",
    OverBar: "‾",
    OverBrace: "⏞",
    OverBracket: "⎴",
    OverParenthesis: "⏜",
    par: "∥",
    para: "¶",
    parallel: "∥",
    parsim: "⫳",
    parsl: "⫽",
    part: "∂",
    PartialD: "∂",
    Pcy: "П",
    pcy: "п",
    percnt: "%",
    period: ".",
    permil: "‰",
    perp: "⊥",
    pertenk: "‱",
    Pfr: "\uD835\uDD13",
    pfr: "\uD835\uDD2D",
    Phi: "Φ",
    phi: "φ",
    phiv: "ϕ",
    phmmat: "ℳ",
    phone: "☎",
    Pi: "Π",
    pi: "π",
    pitchfork: "⋔",
    piv: "ϖ",
    planck: "ℏ",
    planckh: "ℎ",
    plankv: "ℏ",
    plus: "+",
    plusacir: "⨣",
    plusb: "⊞",
    pluscir: "⨢",
    plusdo: "∔",
    plusdu: "⨥",
    pluse: "⩲",
    PlusMinus: "±",
    plusmn: "±",
    plussim: "⨦",
    plustwo: "⨧",
    pm: "±",
    Poincareplane: "ℌ",
    pointint: "⨕",
    Popf: "ℙ",
    popf: "\uD835\uDD61",
    pound: "£",
    Pr: "⪻",
    pr: "≺",
    prap: "⪷",
    prcue: "≼",
    prE: "⪳",
    pre: "⪯",
    prec: "≺",
    precapprox: "⪷",
    preccurlyeq: "≼",
    Precedes: "≺",
    PrecedesEqual: "⪯",
    PrecedesSlantEqual: "≼",
    PrecedesTilde: "≾",
    preceq: "⪯",
    precnapprox: "⪹",
    precneqq: "⪵",
    precnsim: "⋨",
    precsim: "≾",
    Prime: "″",
    prime: "′",
    primes: "ℙ",
    prnap: "⪹",
    prnE: "⪵",
    prnsim: "⋨",
    prod: "∏",
    Product: "∏",
    profalar: "⌮",
    profline: "⌒",
    profsurf: "⌓",
    prop: "∝",
    Proportion: "∷",
    Proportional: "∝",
    propto: "∝",
    prsim: "≾",
    prurel: "⊰",
    Pscr: "\uD835\uDCAB",
    pscr: "\uD835\uDCC5",
    Psi: "Ψ",
    psi: "ψ",
    puncsp: " ",
    Qfr: "\uD835\uDD14",
    qfr: "\uD835\uDD2E",
    qint: "⨌",
    Qopf: "ℚ",
    qopf: "\uD835\uDD62",
    qprime: "⁗",
    Qscr: "\uD835\uDCAC",
    qscr: "\uD835\uDCC6",
    quaternions: "ℍ",
    quatint: "⨖",
    quest: "?",
    questeq: "≟",
    QUOT: '"',
    quot: '"',
    rAarr: "⇛",
    race: "∽̱",
    Racute: "Ŕ",
    racute: "ŕ",
    radic: "√",
    raemptyv: "⦳",
    Rang: "⟫",
    rang: "⟩",
    rangd: "⦒",
    range: "⦥",
    rangle: "⟩",
    raquo: "»",
    Rarr: "↠",
    rArr: "⇒",
    rarr: "→",
    rarrap: "⥵",
    rarrb: "⇥",
    rarrbfs: "⤠",
    rarrc: "⤳",
    rarrfs: "⤞",
    rarrhk: "↪",
    rarrlp: "↬",
    rarrpl: "⥅",
    rarrsim: "⥴",
    Rarrtl: "⤖",
    rarrtl: "↣",
    rarrw: "↝",
    rAtail: "⤜",
    ratail: "⤚",
    ratio: "∶",
    rationals: "ℚ",
    RBarr: "⤐",
    rBarr: "⤏",
    rbarr: "⤍",
    rbbrk: "❳",
    rbrace: "}",
    rbrack: "]",
    rbrke: "⦌",
    rbrksld: "⦎",
    rbrkslu: "⦐",
    Rcaron: "Ř",
    rcaron: "ř",
    Rcedil: "Ŗ",
    rcedil: "ŗ",
    rceil: "⌉",
    rcub: "}",
    Rcy: "Р",
    rcy: "р",
    rdca: "⤷",
    rdldhar: "⥩",
    rdquo: "”",
    rdquor: "”",
    rdsh: "↳",
    Re: "ℜ",
    real: "ℜ",
    realine: "ℛ",
    realpart: "ℜ",
    reals: "ℝ",
    rect: "▭",
    REG: "®",
    reg: "®",
    ReverseElement: "∋",
    ReverseEquilibrium: "⇋",
    ReverseUpEquilibrium: "⥯",
    rfisht: "⥽",
    rfloor: "⌋",
    Rfr: "ℜ",
    rfr: "\uD835\uDD2F",
    rHar: "⥤",
    rhard: "⇁",
    rharu: "⇀",
    rharul: "⥬",
    Rho: "Ρ",
    rho: "ρ",
    rhov: "ϱ",
    RightAngleBracket: "⟩",
    RightArrow: "→",
    Rightarrow: "⇒",
    rightarrow: "→",
    RightArrowBar: "⇥",
    RightArrowLeftArrow: "⇄",
    rightarrowtail: "↣",
    RightCeiling: "⌉",
    RightDoubleBracket: "⟧",
    RightDownTeeVector: "⥝",
    RightDownVector: "⇂",
    RightDownVectorBar: "⥕",
    RightFloor: "⌋",
    rightharpoondown: "⇁",
    rightharpoonup: "⇀",
    rightleftarrows: "⇄",
    rightleftharpoons: "⇌",
    rightrightarrows: "⇉",
    rightsquigarrow: "↝",
    RightTee: "⊢",
    RightTeeArrow: "↦",
    RightTeeVector: "⥛",
    rightthreetimes: "⋌",
    RightTriangle: "⊳",
    RightTriangleBar: "⧐",
    RightTriangleEqual: "⊵",
    RightUpDownVector: "⥏",
    RightUpTeeVector: "⥜",
    RightUpVector: "↾",
    RightUpVectorBar: "⥔",
    RightVector: "⇀",
    RightVectorBar: "⥓",
    ring: "˚",
    risingdotseq: "≓",
    rlarr: "⇄",
    rlhar: "⇌",
    rlm: "‏",
    rmoust: "⎱",
    rmoustache: "⎱",
    rnmid: "⫮",
    roang: "⟭",
    roarr: "⇾",
    robrk: "⟧",
    ropar: "⦆",
    Ropf: "ℝ",
    ropf: "\uD835\uDD63",
    roplus: "⨮",
    rotimes: "⨵",
    RoundImplies: "⥰",
    rpar: ")",
    rpargt: "⦔",
    rppolint: "⨒",
    rrarr: "⇉",
    Rrightarrow: "⇛",
    rsaquo: "›",
    Rscr: "ℛ",
    rscr: "\uD835\uDCC7",
    Rsh: "↱",
    rsh: "↱",
    rsqb: "]",
    rsquo: "’",
    rsquor: "’",
    rthree: "⋌",
    rtimes: "⋊",
    rtri: "▹",
    rtrie: "⊵",
    rtrif: "▸",
    rtriltri: "⧎",
    RuleDelayed: "⧴",
    ruluhar: "⥨",
    rx: "℞",
    Sacute: "Ś",
    sacute: "ś",
    sbquo: "‚",
    Sc: "⪼",
    sc: "≻",
    scap: "⪸",
    Scaron: "Š",
    scaron: "š",
    sccue: "≽",
    scE: "⪴",
    sce: "⪰",
    Scedil: "Ş",
    scedil: "ş",
    Scirc: "Ŝ",
    scirc: "ŝ",
    scnap: "⪺",
    scnE: "⪶",
    scnsim: "⋩",
    scpolint: "⨓",
    scsim: "≿",
    Scy: "С",
    scy: "с",
    sdot: "⋅",
    sdotb: "⊡",
    sdote: "⩦",
    searhk: "⤥",
    seArr: "⇘",
    searr: "↘",
    searrow: "↘",
    sect: "§",
    semi: ";",
    seswar: "⤩",
    setminus: "∖",
    setmn: "∖",
    sext: "✶",
    Sfr: "\uD835\uDD16",
    sfr: "\uD835\uDD30",
    sfrown: "⌢",
    sharp: "♯",
    SHCHcy: "Щ",
    shchcy: "щ",
    SHcy: "Ш",
    shcy: "ш",
    ShortDownArrow: "↓",
    ShortLeftArrow: "←",
    shortmid: "∣",
    shortparallel: "∥",
    ShortRightArrow: "→",
    ShortUpArrow: "↑",
    shy: "­",
    Sigma: "Σ",
    sigma: "σ",
    sigmaf: "ς",
    sigmav: "ς",
    sim: "∼",
    simdot: "⩪",
    sime: "≃",
    simeq: "≃",
    simg: "⪞",
    simgE: "⪠",
    siml: "⪝",
    simlE: "⪟",
    simne: "≆",
    simplus: "⨤",
    simrarr: "⥲",
    slarr: "←",
    SmallCircle: "∘",
    smallsetminus: "∖",
    smashp: "⨳",
    smeparsl: "⧤",
    smid: "∣",
    smile: "⌣",
    smt: "⪪",
    smte: "⪬",
    smtes: "⪬︀",
    SOFTcy: "Ь",
    softcy: "ь",
    sol: "/",
    solb: "⧄",
    solbar: "⌿",
    Sopf: "\uD835\uDD4A",
    sopf: "\uD835\uDD64",
    spades: "♠",
    spadesuit: "♠",
    spar: "∥",
    sqcap: "⊓",
    sqcaps: "⊓︀",
    sqcup: "⊔",
    sqcups: "⊔︀",
    Sqrt: "√",
    sqsub: "⊏",
    sqsube: "⊑",
    sqsubset: "⊏",
    sqsubseteq: "⊑",
    sqsup: "⊐",
    sqsupe: "⊒",
    sqsupset: "⊐",
    sqsupseteq: "⊒",
    squ: "□",
    Square: "□",
    square: "□",
    SquareIntersection: "⊓",
    SquareSubset: "⊏",
    SquareSubsetEqual: "⊑",
    SquareSuperset: "⊐",
    SquareSupersetEqual: "⊒",
    SquareUnion: "⊔",
    squarf: "▪",
    squf: "▪",
    srarr: "→",
    Sscr: "\uD835\uDCAE",
    sscr: "\uD835\uDCC8",
    ssetmn: "∖",
    ssmile: "⌣",
    sstarf: "⋆",
    Star: "⋆",
    star: "☆",
    starf: "★",
    straightepsilon: "ϵ",
    straightphi: "ϕ",
    strns: "¯",
    Sub: "⋐",
    sub: "⊂",
    subdot: "⪽",
    subE: "⫅",
    sube: "⊆",
    subedot: "⫃",
    submult: "⫁",
    subnE: "⫋",
    subne: "⊊",
    subplus: "⪿",
    subrarr: "⥹",
    Subset: "⋐",
    subset: "⊂",
    subseteq: "⊆",
    subseteqq: "⫅",
    SubsetEqual: "⊆",
    subsetneq: "⊊",
    subsetneqq: "⫋",
    subsim: "⫇",
    subsub: "⫕",
    subsup: "⫓",
    succ: "≻",
    succapprox: "⪸",
    succcurlyeq: "≽",
    Succeeds: "≻",
    SucceedsEqual: "⪰",
    SucceedsSlantEqual: "≽",
    SucceedsTilde: "≿",
    succeq: "⪰",
    succnapprox: "⪺",
    succneqq: "⪶",
    succnsim: "⋩",
    succsim: "≿",
    SuchThat: "∋",
    Sum: "∑",
    sum: "∑",
    sung: "♪",
    Sup: "⋑",
    sup: "⊃",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    supdot: "⪾",
    supdsub: "⫘",
    supE: "⫆",
    supe: "⊇",
    supedot: "⫄",
    Superset: "⊃",
    SupersetEqual: "⊇",
    suphsol: "⟉",
    suphsub: "⫗",
    suplarr: "⥻",
    supmult: "⫂",
    supnE: "⫌",
    supne: "⊋",
    supplus: "⫀",
    Supset: "⋑",
    supset: "⊃",
    supseteq: "⊇",
    supseteqq: "⫆",
    supsetneq: "⊋",
    supsetneqq: "⫌",
    supsim: "⫈",
    supsub: "⫔",
    supsup: "⫖",
    swarhk: "⤦",
    swArr: "⇙",
    swarr: "↙",
    swarrow: "↙",
    swnwar: "⤪",
    szlig: "ß",
    Tab: "\t",
    target: "⌖",
    Tau: "Τ",
    tau: "τ",
    tbrk: "⎴",
    Tcaron: "Ť",
    tcaron: "ť",
    Tcedil: "Ţ",
    tcedil: "ţ",
    Tcy: "Т",
    tcy: "т",
    tdot: "⃛",
    telrec: "⌕",
    Tfr: "\uD835\uDD17",
    tfr: "\uD835\uDD31",
    there4: "∴",
    Therefore: "∴",
    therefore: "∴",
    Theta: "Θ",
    theta: "θ",
    thetasym: "ϑ",
    thetav: "ϑ",
    thickapprox: "≈",
    thicksim: "∼",
    ThickSpace: "  ",
    thinsp: " ",
    ThinSpace: " ",
    thkap: "≈",
    thksim: "∼",
    THORN: "Þ",
    thorn: "þ",
    Tilde: "∼",
    tilde: "˜",
    TildeEqual: "≃",
    TildeFullEqual: "≅",
    TildeTilde: "≈",
    times: "×",
    timesb: "⊠",
    timesbar: "⨱",
    timesd: "⨰",
    tint: "∭",
    toea: "⤨",
    top: "⊤",
    topbot: "⌶",
    topcir: "⫱",
    Topf: "\uD835\uDD4B",
    topf: "\uD835\uDD65",
    topfork: "⫚",
    tosa: "⤩",
    tprime: "‴",
    TRADE: "™",
    trade: "™",
    triangle: "▵",
    triangledown: "▿",
    triangleleft: "◃",
    trianglelefteq: "⊴",
    triangleq: "≜",
    triangleright: "▹",
    trianglerighteq: "⊵",
    tridot: "◬",
    trie: "≜",
    triminus: "⨺",
    TripleDot: "⃛",
    triplus: "⨹",
    trisb: "⧍",
    tritime: "⨻",
    trpezium: "⏢",
    Tscr: "\uD835\uDCAF",
    tscr: "\uD835\uDCC9",
    TScy: "Ц",
    tscy: "ц",
    TSHcy: "Ћ",
    tshcy: "ћ",
    Tstrok: "Ŧ",
    tstrok: "ŧ",
    twixt: "≬",
    twoheadleftarrow: "↞",
    twoheadrightarrow: "↠",
    Uacute: "Ú",
    uacute: "ú",
    Uarr: "↟",
    uArr: "⇑",
    uarr: "↑",
    Uarrocir: "⥉",
    Ubrcy: "Ў",
    ubrcy: "ў",
    Ubreve: "Ŭ",
    ubreve: "ŭ",
    Ucirc: "Û",
    ucirc: "û",
    Ucy: "У",
    ucy: "у",
    udarr: "⇅",
    Udblac: "Ű",
    udblac: "ű",
    udhar: "⥮",
    ufisht: "⥾",
    Ufr: "\uD835\uDD18",
    ufr: "\uD835\uDD32",
    Ugrave: "Ù",
    ugrave: "ù",
    uHar: "⥣",
    uharl: "↿",
    uharr: "↾",
    uhblk: "▀",
    ulcorn: "⌜",
    ulcorner: "⌜",
    ulcrop: "⌏",
    ultri: "◸",
    Umacr: "Ū",
    umacr: "ū",
    uml: "¨",
    UnderBar: "_",
    UnderBrace: "⏟",
    UnderBracket: "⎵",
    UnderParenthesis: "⏝",
    Union: "⋃",
    UnionPlus: "⊎",
    Uogon: "Ų",
    uogon: "ų",
    Uopf: "\uD835\uDD4C",
    uopf: "\uD835\uDD66",
    UpArrow: "↑",
    Uparrow: "⇑",
    uparrow: "↑",
    UpArrowBar: "⤒",
    UpArrowDownArrow: "⇅",
    UpDownArrow: "↕",
    Updownarrow: "⇕",
    updownarrow: "↕",
    UpEquilibrium: "⥮",
    upharpoonleft: "↿",
    upharpoonright: "↾",
    uplus: "⊎",
    UpperLeftArrow: "↖",
    UpperRightArrow: "↗",
    Upsi: "ϒ",
    upsi: "υ",
    upsih: "ϒ",
    Upsilon: "Υ",
    upsilon: "υ",
    UpTee: "⊥",
    UpTeeArrow: "↥",
    upuparrows: "⇈",
    urcorn: "⌝",
    urcorner: "⌝",
    urcrop: "⌎",
    Uring: "Ů",
    uring: "ů",
    urtri: "◹",
    Uscr: "\uD835\uDCB0",
    uscr: "\uD835\uDCCA",
    utdot: "⋰",
    Utilde: "Ũ",
    utilde: "ũ",
    utri: "▵",
    utrif: "▴",
    uuarr: "⇈",
    Uuml: "Ü",
    uuml: "ü",
    uwangle: "⦧",
    vangrt: "⦜",
    varepsilon: "ϵ",
    varkappa: "ϰ",
    varnothing: "∅",
    varphi: "ϕ",
    varpi: "ϖ",
    varpropto: "∝",
    vArr: "⇕",
    varr: "↕",
    varrho: "ϱ",
    varsigma: "ς",
    varsubsetneq: "⊊︀",
    varsubsetneqq: "⫋︀",
    varsupsetneq: "⊋︀",
    varsupsetneqq: "⫌︀",
    vartheta: "ϑ",
    vartriangleleft: "⊲",
    vartriangleright: "⊳",
    Vbar: "⫫",
    vBar: "⫨",
    vBarv: "⫩",
    Vcy: "В",
    vcy: "в",
    VDash: "⊫",
    Vdash: "⊩",
    vDash: "⊨",
    vdash: "⊢",
    Vdashl: "⫦",
    Vee: "⋁",
    vee: "∨",
    veebar: "⊻",
    veeeq: "≚",
    vellip: "⋮",
    Verbar: "‖",
    verbar: "|",
    Vert: "‖",
    vert: "|",
    VerticalBar: "∣",
    VerticalLine: "|",
    VerticalSeparator: "❘",
    VerticalTilde: "≀",
    VeryThinSpace: " ",
    Vfr: "\uD835\uDD19",
    vfr: "\uD835\uDD33",
    vltri: "⊲",
    vnsub: "⊂⃒",
    vnsup: "⊃⃒",
    Vopf: "\uD835\uDD4D",
    vopf: "\uD835\uDD67",
    vprop: "∝",
    vrtri: "⊳",
    Vscr: "\uD835\uDCB1",
    vscr: "\uD835\uDCCB",
    vsubnE: "⫋︀",
    vsubne: "⊊︀",
    vsupnE: "⫌︀",
    vsupne: "⊋︀",
    Vvdash: "⊪",
    vzigzag: "⦚",
    Wcirc: "Ŵ",
    wcirc: "ŵ",
    wedbar: "⩟",
    Wedge: "⋀",
    wedge: "∧",
    wedgeq: "≙",
    weierp: "℘",
    Wfr: "\uD835\uDD1A",
    wfr: "\uD835\uDD34",
    Wopf: "\uD835\uDD4E",
    wopf: "\uD835\uDD68",
    wp: "℘",
    wr: "≀",
    wreath: "≀",
    Wscr: "\uD835\uDCB2",
    wscr: "\uD835\uDCCC",
    xcap: "⋂",
    xcirc: "◯",
    xcup: "⋃",
    xdtri: "▽",
    Xfr: "\uD835\uDD1B",
    xfr: "\uD835\uDD35",
    xhArr: "⟺",
    xharr: "⟷",
    Xi: "Ξ",
    xi: "ξ",
    xlArr: "⟸",
    xlarr: "⟵",
    xmap: "⟼",
    xnis: "⋻",
    xodot: "⨀",
    Xopf: "\uD835\uDD4F",
    xopf: "\uD835\uDD69",
    xoplus: "⨁",
    xotime: "⨂",
    xrArr: "⟹",
    xrarr: "⟶",
    Xscr: "\uD835\uDCB3",
    xscr: "\uD835\uDCCD",
    xsqcup: "⨆",
    xuplus: "⨄",
    xutri: "△",
    xvee: "⋁",
    xwedge: "⋀",
    Yacute: "Ý",
    yacute: "ý",
    YAcy: "Я",
    yacy: "я",
    Ycirc: "Ŷ",
    ycirc: "ŷ",
    Ycy: "Ы",
    ycy: "ы",
    yen: "¥",
    Yfr: "\uD835\uDD1C",
    yfr: "\uD835\uDD36",
    YIcy: "Ї",
    yicy: "ї",
    Yopf: "\uD835\uDD50",
    yopf: "\uD835\uDD6A",
    Yscr: "\uD835\uDCB4",
    yscr: "\uD835\uDCCE",
    YUcy: "Ю",
    yucy: "ю",
    Yuml: "Ÿ",
    yuml: "ÿ",
    Zacute: "Ź",
    zacute: "ź",
    Zcaron: "Ž",
    zcaron: "ž",
    Zcy: "З",
    zcy: "з",
    Zdot: "Ż",
    zdot: "ż",
    zeetrf: "ℨ",
    ZeroWidthSpace: "​",
    Zeta: "Ζ",
    zeta: "ζ",
    Zfr: "ℨ",
    zfr: "\uD835\uDD37",
    ZHcy: "Ж",
    zhcy: "ж",
    zigrarr: "⇝",
    Zopf: "ℤ",
    zopf: "\uD835\uDD6B",
    Zscr: "\uD835\uDCB5",
    zscr: "\uD835\uDCCF",
    zwj: "‍",
    zwnj: "‌"
  });
  exports.entityMap = exports.HTML_ENTITIES;
});

// node_modules/@xmldom/xmldom/lib/sax.js
var require_sax = __commonJS((exports) => {
  var conventions = require_conventions();
  var g = require_grammar();
  var errors = require_errors();
  var isHTMLEscapableRawTextElement = conventions.isHTMLEscapableRawTextElement;
  var isHTMLMimeType = conventions.isHTMLMimeType;
  var isHTMLRawTextElement = conventions.isHTMLRawTextElement;
  var hasOwn = conventions.hasOwn;
  var NAMESPACE = conventions.NAMESPACE;
  var ParseError = errors.ParseError;
  var DOMException = errors.DOMException;
  var S_TAG = 0;
  var S_ATTR = 1;
  var S_ATTR_SPACE = 2;
  var S_EQ = 3;
  var S_ATTR_NOQUOT_VALUE = 4;
  var S_ATTR_END = 5;
  var S_TAG_SPACE = 6;
  var S_TAG_CLOSE = 7;
  function XMLReader() {}
  XMLReader.prototype = {
    parse: function(source, defaultNSMap, entityMap) {
      var domBuilder = this.domBuilder;
      domBuilder.startDocument();
      _copy(defaultNSMap, defaultNSMap = Object.create(null));
      parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
      domBuilder.endDocument();
    }
  };
  var ENTITY_REG = /&#?\w+;?/g;
  function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
    var isHTML = isHTMLMimeType(domBuilder.mimeType);
    if (source.indexOf(g.UNICODE_REPLACEMENT_CHARACTER) >= 0) {
      errorHandler.warning("Unicode replacement character detected, source encoding issues?");
    }
    function fixedFromCharCode(code) {
      if (code > 65535) {
        code -= 65536;
        var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
        return String.fromCharCode(surrogate1, surrogate2);
      } else {
        return String.fromCharCode(code);
      }
    }
    function entityReplacer(a2) {
      var complete = a2[a2.length - 1] === ";" ? a2 : a2 + ";";
      if (!isHTML && complete !== a2) {
        errorHandler.error("EntityRef: expecting ;");
        return a2;
      }
      var match = g.Reference.exec(complete);
      if (!match || match[0].length !== complete.length) {
        errorHandler.error("entity not matching Reference production: " + a2);
        return a2;
      }
      var k = complete.slice(1, -1);
      if (hasOwn(entityMap, k)) {
        return entityMap[k];
      } else if (k.charAt(0) === "#") {
        return fixedFromCharCode(parseInt(k.substring(1).replace("x", "0x")));
      } else {
        errorHandler.error("entity not found:" + a2);
        return a2;
      }
    }
    function appendText(end2) {
      if (end2 > start) {
        var xt = source.substring(start, end2).replace(ENTITY_REG, entityReplacer);
        locator && position(start);
        domBuilder.characters(xt, 0, end2 - start);
        start = end2;
      }
    }
    var lineStart = 0;
    var lineEnd = 0;
    var linePattern = /\r\n?|\n|$/g;
    var locator = domBuilder.locator;
    function position(p, m) {
      while (p >= lineEnd && (m = linePattern.exec(source))) {
        lineStart = lineEnd;
        lineEnd = m.index + m[0].length;
        locator.lineNumber++;
      }
      locator.columnNumber = p - lineStart + 1;
    }
    var parseStack = [{ currentNSMap: defaultNSMapCopy }];
    var unclosedTags = [];
    var start = 0;
    while (true) {
      try {
        var tagStart = source.indexOf("<", start);
        if (tagStart < 0) {
          if (!isHTML && unclosedTags.length > 0) {
            return errorHandler.fatalError("unclosed xml tag(s): " + unclosedTags.join(", "));
          }
          if (!source.substring(start).match(/^\s*$/)) {
            var doc = domBuilder.doc;
            var text = doc.createTextNode(source.substring(start));
            if (doc.documentElement) {
              return errorHandler.error("Extra content at the end of the document");
            }
            doc.appendChild(text);
            domBuilder.currentElement = text;
          }
          return;
        }
        if (tagStart > start) {
          var fromSource = source.substring(start, tagStart);
          if (!isHTML && unclosedTags.length === 0) {
            fromSource = fromSource.replace(new RegExp(g.S_OPT.source, "g"), "");
            fromSource && errorHandler.error("Unexpected content outside root element: '" + fromSource + "'");
          }
          appendText(tagStart);
        }
        switch (source.charAt(tagStart + 1)) {
          case "/":
            var end = source.indexOf(">", tagStart + 2);
            var tagNameRaw = source.substring(tagStart + 2, end > 0 ? end : undefined);
            if (!tagNameRaw) {
              return errorHandler.fatalError("end tag name missing");
            }
            var tagNameMatch = end > 0 && g.reg("^", g.QName_group, g.S_OPT, "$").exec(tagNameRaw);
            if (!tagNameMatch) {
              return errorHandler.fatalError('end tag name contains invalid characters: "' + tagNameRaw + '"');
            }
            if (!domBuilder.currentElement && !domBuilder.doc.documentElement) {
              return;
            }
            var currentTagName = unclosedTags[unclosedTags.length - 1] || domBuilder.currentElement.tagName || domBuilder.doc.documentElement.tagName || "";
            if (currentTagName !== tagNameMatch[1]) {
              var tagNameLower = tagNameMatch[1].toLowerCase();
              if (!isHTML || currentTagName.toLowerCase() !== tagNameLower) {
                return errorHandler.fatalError('Opening and ending tag mismatch: "' + currentTagName + '" != "' + tagNameRaw + '"');
              }
            }
            var config = parseStack.pop();
            unclosedTags.pop();
            var localNSMap = config.localNSMap;
            domBuilder.endElement(config.uri, config.localName, currentTagName);
            if (localNSMap) {
              for (var prefix in localNSMap) {
                if (hasOwn(localNSMap, prefix)) {
                  domBuilder.endPrefixMapping(prefix);
                }
              }
            }
            end++;
            break;
          case "?":
            locator && position(tagStart);
            end = parseProcessingInstruction(source, tagStart, domBuilder, errorHandler);
            break;
          case "!":
            locator && position(tagStart);
            end = parseDoctypeCommentOrCData(source, tagStart, domBuilder, errorHandler, isHTML);
            break;
          default:
            locator && position(tagStart);
            var el = new ElementAttributes;
            var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
            var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler, isHTML);
            var len = el.length;
            if (!el.closed) {
              if (isHTML && conventions.isHTMLVoidElement(el.tagName)) {
                el.closed = true;
              } else {
                unclosedTags.push(el.tagName);
              }
            }
            if (locator && len) {
              var locator2 = copyLocator(locator, {});
              for (var i = 0;i < len; i++) {
                var a = el[i];
                position(a.offset);
                a.locator = copyLocator(locator, {});
              }
              domBuilder.locator = locator2;
              if (appendElement(el, domBuilder, currentNSMap)) {
                parseStack.push(el);
              }
              domBuilder.locator = locator;
            } else {
              if (appendElement(el, domBuilder, currentNSMap)) {
                parseStack.push(el);
              }
            }
            if (isHTML && !el.closed) {
              end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
            } else {
              end++;
            }
        }
      } catch (e) {
        if (e instanceof ParseError) {
          throw e;
        } else if (e instanceof DOMException) {
          throw new ParseError(e.name + ": " + e.message, domBuilder.locator, e);
        }
        errorHandler.error("element parse error: " + e);
        end = -1;
      }
      if (end > start) {
        start = end;
      } else {
        appendText(Math.max(tagStart, start) + 1);
      }
    }
  }
  function copyLocator(f, t) {
    t.lineNumber = f.lineNumber;
    t.columnNumber = f.columnNumber;
    return t;
  }
  function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler, isHTML) {
    function addAttribute(qname, value2, startIndex) {
      if (hasOwn(el.attributeNames, qname)) {
        return errorHandler.fatalError("Attribute " + qname + " redefined");
      }
      if (!isHTML && value2.indexOf("<") >= 0) {
        return errorHandler.fatalError("Unescaped '<' not allowed in attributes values");
      }
      el.addValue(qname, value2.replace(/[\t\n\r]/g, " ").replace(ENTITY_REG, entityReplacer), startIndex);
    }
    var attrName;
    var value;
    var p = ++start;
    var s = S_TAG;
    while (true) {
      var c = source.charAt(p);
      switch (c) {
        case "=":
          if (s === S_ATTR) {
            attrName = source.slice(start, p);
            s = S_EQ;
          } else if (s === S_ATTR_SPACE) {
            s = S_EQ;
          } else {
            throw new Error("attribute equal must after attrName");
          }
          break;
        case "'":
        case '"':
          if (s === S_EQ || s === S_ATTR) {
            if (s === S_ATTR) {
              errorHandler.warning('attribute value must after "="');
              attrName = source.slice(start, p);
            }
            start = p + 1;
            p = source.indexOf(c, start);
            if (p > 0) {
              value = source.slice(start, p);
              addAttribute(attrName, value, start - 1);
              s = S_ATTR_END;
            } else {
              throw new Error("attribute value no end '" + c + "' match");
            }
          } else if (s == S_ATTR_NOQUOT_VALUE) {
            value = source.slice(start, p);
            addAttribute(attrName, value, start);
            errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
            start = p + 1;
            s = S_ATTR_END;
          } else {
            throw new Error('attribute value must after "="');
          }
          break;
        case "/":
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p));
            case S_ATTR_END:
            case S_TAG_SPACE:
            case S_TAG_CLOSE:
              s = S_TAG_CLOSE;
              el.closed = true;
            case S_ATTR_NOQUOT_VALUE:
            case S_ATTR:
              break;
            case S_ATTR_SPACE:
              el.closed = true;
              break;
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          errorHandler.error("unexpected end of input");
          if (s == S_TAG) {
            el.setTagName(source.slice(start, p));
          }
          return p;
        case ">":
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p));
            case S_ATTR_END:
            case S_TAG_SPACE:
            case S_TAG_CLOSE:
              break;
            case S_ATTR_NOQUOT_VALUE:
            case S_ATTR:
              value = source.slice(start, p);
              if (value.slice(-1) === "/") {
                el.closed = true;
                value = value.slice(0, -1);
              }
            case S_ATTR_SPACE:
              if (s === S_ATTR_SPACE) {
                value = attrName;
              }
              if (s == S_ATTR_NOQUOT_VALUE) {
                errorHandler.warning('attribute "' + value + '" missed quot(")!');
                addAttribute(attrName, value, start);
              } else {
                if (!isHTML) {
                  errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                }
                addAttribute(value, value, start);
              }
              break;
            case S_EQ:
              if (!isHTML) {
                return errorHandler.fatalError(`AttValue: ' or " expected`);
              }
          }
          return p;
        case "":
          c = " ";
        default:
          if (c <= " ") {
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
                s = S_TAG_SPACE;
                break;
              case S_ATTR:
                attrName = source.slice(start, p);
                s = S_ATTR_SPACE;
                break;
              case S_ATTR_NOQUOT_VALUE:
                var value = source.slice(start, p);
                errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                addAttribute(attrName, value, start);
              case S_ATTR_END:
                s = S_TAG_SPACE;
                break;
            }
          } else {
            switch (s) {
              case S_ATTR_SPACE:
                if (!isHTML) {
                  errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                }
                addAttribute(attrName, attrName, start);
                start = p;
                s = S_ATTR;
                break;
              case S_ATTR_END:
                errorHandler.warning('attribute space is required"' + attrName + '"!!');
              case S_TAG_SPACE:
                s = S_ATTR;
                start = p;
                break;
              case S_EQ:
                s = S_ATTR_NOQUOT_VALUE;
                start = p;
                break;
              case S_TAG_CLOSE:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
          }
      }
      p++;
    }
  }
  function appendElement(el, domBuilder, currentNSMap) {
    var tagName = el.tagName;
    var localNSMap = null;
    var i = el.length;
    while (i--) {
      var a = el[i];
      var qName = a.qName;
      var value = a.value;
      var nsp = qName.indexOf(":");
      if (nsp > 0) {
        var prefix = a.prefix = qName.slice(0, nsp);
        var localName = qName.slice(nsp + 1);
        var nsPrefix = prefix === "xmlns" && localName;
      } else {
        localName = qName;
        prefix = null;
        nsPrefix = qName === "xmlns" && "";
      }
      a.localName = localName;
      if (nsPrefix !== false) {
        if (localNSMap == null) {
          localNSMap = Object.create(null);
          _copy(currentNSMap, currentNSMap = Object.create(null));
        }
        currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
        a.uri = NAMESPACE.XMLNS;
        domBuilder.startPrefixMapping(nsPrefix, value);
      }
    }
    var i = el.length;
    while (i--) {
      a = el[i];
      if (a.prefix) {
        if (a.prefix === "xml") {
          a.uri = NAMESPACE.XML;
        }
        if (a.prefix !== "xmlns") {
          a.uri = currentNSMap[a.prefix];
        }
      }
    }
    var nsp = tagName.indexOf(":");
    if (nsp > 0) {
      prefix = el.prefix = tagName.slice(0, nsp);
      localName = el.localName = tagName.slice(nsp + 1);
    } else {
      prefix = null;
      localName = el.localName = tagName;
    }
    var ns = el.uri = currentNSMap[prefix || ""];
    domBuilder.startElement(ns, localName, tagName, el);
    if (el.closed) {
      domBuilder.endElement(ns, localName, tagName);
      if (localNSMap) {
        for (prefix in localNSMap) {
          if (hasOwn(localNSMap, prefix)) {
            domBuilder.endPrefixMapping(prefix);
          }
        }
      }
    } else {
      el.currentNSMap = currentNSMap;
      el.localNSMap = localNSMap;
      return true;
    }
  }
  function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
    var isEscapableRaw = isHTMLEscapableRawTextElement(tagName);
    if (isEscapableRaw || isHTMLRawTextElement(tagName)) {
      var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
      var text = source.substring(elStartEnd + 1, elEndStart);
      if (isEscapableRaw) {
        text = text.replace(ENTITY_REG, entityReplacer);
      }
      domBuilder.characters(text, 0, text.length);
      return elEndStart;
    }
    return elStartEnd + 1;
  }
  function _copy(source, target) {
    for (var n in source) {
      if (hasOwn(source, n)) {
        target[n] = source[n];
      }
    }
  }
  function parseUtils(source, start) {
    var index = start;
    function char(n) {
      n = n || 0;
      return source.charAt(index + n);
    }
    function skip(n) {
      n = n || 1;
      index += n;
    }
    function skipBlanks() {
      var blanks = 0;
      while (index < source.length) {
        var c = char();
        if (c !== " " && c !== `
` && c !== "\t" && c !== "\r") {
          return blanks;
        }
        blanks++;
        skip();
      }
      return -1;
    }
    function substringFromIndex() {
      return source.substring(index);
    }
    function substringStartsWith(text) {
      return source.substring(index, index + text.length) === text;
    }
    function substringStartsWithCaseInsensitive(text) {
      return source.substring(index, index + text.length).toUpperCase() === text.toUpperCase();
    }
    function getMatch(args) {
      var expr = g.reg("^", args);
      var match = expr.exec(substringFromIndex());
      if (match) {
        skip(match[0].length);
        return match[0];
      }
      return null;
    }
    return {
      char,
      getIndex: function() {
        return index;
      },
      getMatch,
      getSource: function() {
        return source;
      },
      skip,
      skipBlanks,
      substringFromIndex,
      substringStartsWith,
      substringStartsWithCaseInsensitive
    };
  }
  function parseDoctypeInternalSubset(p, errorHandler) {
    function parsePI(p2, errorHandler2) {
      var match = g.PI.exec(p2.substringFromIndex());
      if (!match) {
        return errorHandler2.fatalError("processing instruction is not well-formed at position " + p2.getIndex());
      }
      if (match[1].toLowerCase() === "xml") {
        return errorHandler2.fatalError("xml declaration is only allowed at the start of the document, but found at position " + p2.getIndex());
      }
      p2.skip(match[0].length);
      return match[0];
    }
    var source = p.getSource();
    if (p.char() === "[") {
      p.skip(1);
      var intSubsetStart = p.getIndex();
      while (p.getIndex() < source.length) {
        p.skipBlanks();
        if (p.char() === "]") {
          var internalSubset = source.substring(intSubsetStart, p.getIndex());
          p.skip(1);
          return internalSubset;
        }
        var current = null;
        if (p.char() === "<" && p.char(1) === "!") {
          switch (p.char(2)) {
            case "E":
              if (p.char(3) === "L") {
                current = p.getMatch(g.elementdecl);
              } else if (p.char(3) === "N") {
                current = p.getMatch(g.EntityDecl);
              }
              break;
            case "A":
              current = p.getMatch(g.AttlistDecl);
              break;
            case "N":
              current = p.getMatch(g.NotationDecl);
              break;
            case "-":
              current = p.getMatch(g.Comment);
              break;
          }
        } else if (p.char() === "<" && p.char(1) === "?") {
          current = parsePI(p, errorHandler);
        } else if (p.char() === "%") {
          current = p.getMatch(g.PEReference);
        } else {
          return errorHandler.fatalError("Error detected in Markup declaration");
        }
        if (!current) {
          return errorHandler.fatalError("Error in internal subset at position " + p.getIndex());
        }
      }
      return errorHandler.fatalError("doctype internal subset is not well-formed, missing ]");
    }
  }
  function parseDoctypeCommentOrCData(source, start, domBuilder, errorHandler, isHTML) {
    var p = parseUtils(source, start);
    switch (isHTML ? p.char(2).toUpperCase() : p.char(2)) {
      case "-":
        var comment = p.getMatch(g.Comment);
        if (comment) {
          domBuilder.comment(comment, g.COMMENT_START.length, comment.length - g.COMMENT_START.length - g.COMMENT_END.length);
          return p.getIndex();
        } else {
          return errorHandler.fatalError("comment is not well-formed at position " + p.getIndex());
        }
      case "[":
        var cdata = p.getMatch(g.CDSect);
        if (cdata) {
          if (!isHTML && !domBuilder.currentElement) {
            return errorHandler.fatalError("CDATA outside of element");
          }
          domBuilder.startCDATA();
          domBuilder.characters(cdata, g.CDATA_START.length, cdata.length - g.CDATA_START.length - g.CDATA_END.length);
          domBuilder.endCDATA();
          return p.getIndex();
        } else {
          return errorHandler.fatalError("Invalid CDATA starting at position " + start);
        }
      case "D": {
        if (domBuilder.doc && domBuilder.doc.documentElement) {
          return errorHandler.fatalError("Doctype not allowed inside or after documentElement at position " + p.getIndex());
        }
        if (isHTML ? !p.substringStartsWithCaseInsensitive(g.DOCTYPE_DECL_START) : !p.substringStartsWith(g.DOCTYPE_DECL_START)) {
          return errorHandler.fatalError("Expected " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
        }
        p.skip(g.DOCTYPE_DECL_START.length);
        if (p.skipBlanks() < 1) {
          return errorHandler.fatalError("Expected whitespace after " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
        }
        var doctype = {
          name: undefined,
          publicId: undefined,
          systemId: undefined,
          internalSubset: undefined
        };
        doctype.name = p.getMatch(g.Name);
        if (!doctype.name)
          return errorHandler.fatalError("doctype name missing or contains unexpected characters at position " + p.getIndex());
        if (isHTML && doctype.name.toLowerCase() !== "html") {
          errorHandler.warning("Unexpected DOCTYPE in HTML document at position " + p.getIndex());
        }
        p.skipBlanks();
        if (p.substringStartsWith(g.PUBLIC) || p.substringStartsWith(g.SYSTEM)) {
          var match = g.ExternalID_match.exec(p.substringFromIndex());
          if (!match) {
            return errorHandler.fatalError("doctype external id is not well-formed at position " + p.getIndex());
          }
          if (match.groups.SystemLiteralOnly !== undefined) {
            doctype.systemId = match.groups.SystemLiteralOnly;
          } else {
            doctype.systemId = match.groups.SystemLiteral;
            doctype.publicId = match.groups.PubidLiteral;
          }
          p.skip(match[0].length);
        } else if (isHTML && p.substringStartsWithCaseInsensitive(g.SYSTEM)) {
          p.skip(g.SYSTEM.length);
          if (p.skipBlanks() < 1) {
            return errorHandler.fatalError("Expected whitespace after " + g.SYSTEM + " at position " + p.getIndex());
          }
          doctype.systemId = p.getMatch(g.ABOUT_LEGACY_COMPAT_SystemLiteral);
          if (!doctype.systemId) {
            return errorHandler.fatalError("Expected " + g.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + g.SYSTEM + " at position " + p.getIndex());
          }
        }
        if (isHTML && doctype.systemId && !g.ABOUT_LEGACY_COMPAT_SystemLiteral.test(doctype.systemId)) {
          errorHandler.warning("Unexpected doctype.systemId in HTML document at position " + p.getIndex());
        }
        if (!isHTML) {
          p.skipBlanks();
          doctype.internalSubset = parseDoctypeInternalSubset(p, errorHandler);
        }
        p.skipBlanks();
        if (p.char() !== ">") {
          return errorHandler.fatalError("doctype not terminated with > at position " + p.getIndex());
        }
        p.skip(1);
        domBuilder.startDTD(doctype.name, doctype.publicId, doctype.systemId, doctype.internalSubset);
        domBuilder.endDTD();
        return p.getIndex();
      }
      default:
        return errorHandler.fatalError('Not well-formed XML starting with "<!" at position ' + start);
    }
  }
  function parseProcessingInstruction(source, start, domBuilder, errorHandler) {
    var match = source.substring(start).match(g.PI);
    if (!match) {
      return errorHandler.fatalError("Invalid processing instruction starting at position " + start);
    }
    if (match[1].toLowerCase() === "xml") {
      if (start > 0) {
        return errorHandler.fatalError("processing instruction at position " + start + " is an xml declaration which is only at the start of the document");
      }
      if (!g.XMLDecl.test(source.substring(start))) {
        return errorHandler.fatalError("xml declaration is not well-formed");
      }
    }
    domBuilder.processingInstruction(match[1], match[2]);
    return start + match[0].length;
  }
  function ElementAttributes() {
    this.attributeNames = Object.create(null);
  }
  ElementAttributes.prototype = {
    setTagName: function(tagName) {
      if (!g.QName_exact.test(tagName)) {
        throw new Error("invalid tagName:" + tagName);
      }
      this.tagName = tagName;
    },
    addValue: function(qName, value, offset) {
      if (!g.QName_exact.test(qName)) {
        throw new Error("invalid attribute:" + qName);
      }
      this.attributeNames[qName] = this.length;
      this[this.length++] = { qName, value, offset };
    },
    length: 0,
    getLocalName: function(i) {
      return this[i].localName;
    },
    getLocator: function(i) {
      return this[i].locator;
    },
    getQName: function(i) {
      return this[i].qName;
    },
    getURI: function(i) {
      return this[i].uri;
    },
    getValue: function(i) {
      return this[i].value;
    }
  };
  exports.XMLReader = XMLReader;
  exports.parseUtils = parseUtils;
  exports.parseDoctypeCommentOrCData = parseDoctypeCommentOrCData;
});

// node_modules/@xmldom/xmldom/lib/dom-parser.js
var require_dom_parser = __commonJS((exports) => {
  var conventions = require_conventions();
  var dom = require_dom();
  var errors = require_errors();
  var entities = require_entities();
  var sax = require_sax();
  var DOMImplementation = dom.DOMImplementation;
  var hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
  var isHTMLMimeType = conventions.isHTMLMimeType;
  var isValidMimeType = conventions.isValidMimeType;
  var MIME_TYPE = conventions.MIME_TYPE;
  var NAMESPACE = conventions.NAMESPACE;
  var ParseError = errors.ParseError;
  var XMLReader = sax.XMLReader;
  function normalizeLineEndings(input) {
    return input.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028\u2029]/g, `
`);
  }
  function DOMParser(options) {
    options = options || {};
    if (options.locator === undefined) {
      options.locator = true;
    }
    this.assign = options.assign || conventions.assign;
    this.domHandler = options.domHandler || DOMHandler;
    this.onError = options.onError || options.errorHandler;
    if (options.errorHandler && typeof options.errorHandler !== "function") {
      throw new TypeError("errorHandler object is no longer supported, switch to onError!");
    } else if (options.errorHandler) {
      options.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this);
    }
    this.normalizeLineEndings = options.normalizeLineEndings || normalizeLineEndings;
    this.locator = !!options.locator;
    this.xmlns = this.assign(Object.create(null), options.xmlns);
  }
  DOMParser.prototype.parseFromString = function(source, mimeType) {
    if (!isValidMimeType(mimeType)) {
      throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + mimeType + '" is not valid.');
    }
    var defaultNSMap = this.assign(Object.create(null), this.xmlns);
    var entityMap = entities.XML_ENTITIES;
    var defaultNamespace = defaultNSMap[""] || null;
    if (hasDefaultHTMLNamespace(mimeType)) {
      entityMap = entities.HTML_ENTITIES;
      defaultNamespace = NAMESPACE.HTML;
    } else if (mimeType === MIME_TYPE.XML_SVG_IMAGE) {
      defaultNamespace = NAMESPACE.SVG;
    }
    defaultNSMap[""] = defaultNamespace;
    defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
    var domBuilder = new this.domHandler({
      mimeType,
      defaultNamespace,
      onError: this.onError
    });
    var locator = this.locator ? {} : undefined;
    if (this.locator) {
      domBuilder.setDocumentLocator(locator);
    }
    var sax2 = new XMLReader;
    sax2.errorHandler = domBuilder;
    sax2.domBuilder = domBuilder;
    var isXml = !conventions.isHTMLMimeType(mimeType);
    if (isXml && typeof source !== "string") {
      sax2.errorHandler.fatalError("source is not a string");
    }
    sax2.parse(this.normalizeLineEndings(String(source)), defaultNSMap, entityMap);
    if (!domBuilder.doc.documentElement) {
      sax2.errorHandler.fatalError("missing root element");
    }
    return domBuilder.doc;
  };
  function DOMHandler(options) {
    var opt = options || {};
    this.mimeType = opt.mimeType || MIME_TYPE.XML_APPLICATION;
    this.defaultNamespace = opt.defaultNamespace || null;
    this.cdata = false;
    this.currentElement = undefined;
    this.doc = undefined;
    this.locator = undefined;
    this.onError = opt.onError;
  }
  function position(locator, node) {
    node.lineNumber = locator.lineNumber;
    node.columnNumber = locator.columnNumber;
  }
  DOMHandler.prototype = {
    startDocument: function() {
      var impl = new DOMImplementation;
      this.doc = isHTMLMimeType(this.mimeType) ? impl.createHTMLDocument(false) : impl.createDocument(this.defaultNamespace, "");
    },
    startElement: function(namespaceURI, localName, qName, attrs) {
      var doc = this.doc;
      var el = doc.createElementNS(namespaceURI, qName || localName);
      var len = attrs.length;
      appendElement(this, el);
      this.currentElement = el;
      this.locator && position(this.locator, el);
      for (var i = 0;i < len; i++) {
        var namespaceURI = attrs.getURI(i);
        var value = attrs.getValue(i);
        var qName = attrs.getQName(i);
        var attr = doc.createAttributeNS(namespaceURI, qName);
        this.locator && position(attrs.getLocator(i), attr);
        attr.value = attr.nodeValue = value;
        el.setAttributeNode(attr);
      }
    },
    endElement: function(namespaceURI, localName, qName) {
      this.currentElement = this.currentElement.parentNode;
    },
    startPrefixMapping: function(prefix, uri) {},
    endPrefixMapping: function(prefix) {},
    processingInstruction: function(target, data) {
      var ins = this.doc.createProcessingInstruction(target, data);
      this.locator && position(this.locator, ins);
      appendElement(this, ins);
    },
    ignorableWhitespace: function(ch, start, length) {},
    characters: function(chars, start, length) {
      chars = _toString.apply(this, arguments);
      if (chars) {
        if (this.cdata) {
          var charNode = this.doc.createCDATASection(chars);
        } else {
          var charNode = this.doc.createTextNode(chars);
        }
        if (this.currentElement) {
          this.currentElement.appendChild(charNode);
        } else if (/^\s*$/.test(chars)) {
          this.doc.appendChild(charNode);
        }
        this.locator && position(this.locator, charNode);
      }
    },
    skippedEntity: function(name) {},
    endDocument: function() {
      this.doc.normalize();
    },
    setDocumentLocator: function(locator) {
      if (locator) {
        locator.lineNumber = 0;
      }
      this.locator = locator;
    },
    comment: function(chars, start, length) {
      chars = _toString.apply(this, arguments);
      var comm = this.doc.createComment(chars);
      this.locator && position(this.locator, comm);
      appendElement(this, comm);
    },
    startCDATA: function() {
      this.cdata = true;
    },
    endCDATA: function() {
      this.cdata = false;
    },
    startDTD: function(name, publicId, systemId, internalSubset) {
      var impl = this.doc.implementation;
      if (impl && impl.createDocumentType) {
        var dt = impl.createDocumentType(name, publicId, systemId, internalSubset);
        this.locator && position(this.locator, dt);
        appendElement(this, dt);
        this.doc.doctype = dt;
      }
    },
    reportError: function(level, message) {
      if (typeof this.onError === "function") {
        try {
          this.onError(level, message, this);
        } catch (e) {
          throw new ParseError("Reporting " + level + ' "' + message + '" caused ' + e, this.locator);
        }
      } else {
        console.error("[xmldom " + level + "]\t" + message, _locator(this.locator));
      }
    },
    warning: function(message) {
      this.reportError("warning", message);
    },
    error: function(message) {
      this.reportError("error", message);
    },
    fatalError: function(message) {
      this.reportError("fatalError", message);
      throw new ParseError(message, this.locator);
    }
  };
  function _locator(l) {
    if (l) {
      return `
@#[line:` + l.lineNumber + ",col:" + l.columnNumber + "]";
    }
  }
  function _toString(chars, start, length) {
    if (typeof chars == "string") {
      return chars.substr(start, length);
    } else {
      if (chars.length >= start + length || start) {
        return new java.lang.String(chars, start, length) + "";
      }
      return chars;
    }
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
    DOMHandler.prototype[key] = function() {
      return null;
    };
  });
  function appendElement(handler, node) {
    if (!handler.currentElement) {
      handler.doc.appendChild(node);
    } else {
      handler.currentElement.appendChild(node);
    }
  }
  function onErrorStopParsing(level) {
    if (level === "error")
      throw "onErrorStopParsing";
  }
  function onWarningStopParsing() {
    throw "onWarningStopParsing";
  }
  exports.__DOMHandler = DOMHandler;
  exports.DOMParser = DOMParser;
  exports.normalizeLineEndings = normalizeLineEndings;
  exports.onErrorStopParsing = onErrorStopParsing;
  exports.onWarningStopParsing = onWarningStopParsing;
});

// skills/docx-template/agent/refine.ts
var import_pizzip = __toESM(require_js(), 1);
import * as fs from "fs";
import * as path from "path";

// node_modules/@xmldom/xmldom/lib/index.js
var conventions = require_conventions();
var $assign = conventions.assign;
var $hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
var $isHTMLMimeType = conventions.isHTMLMimeType;
var $isValidMimeType = conventions.isValidMimeType;
var $MIME_TYPE = conventions.MIME_TYPE;
var $NAMESPACE = conventions.NAMESPACE;
var errors = require_errors();
var $DOMException = errors.DOMException;
var $DOMExceptionName = errors.DOMExceptionName;
var $ExceptionCode = errors.ExceptionCode;
var $ParseError = errors.ParseError;
var dom = require_dom();
var $Attr = dom.Attr;
var $CDATASection = dom.CDATASection;
var $CharacterData = dom.CharacterData;
var $Comment = dom.Comment;
var $Document = dom.Document;
var $DocumentFragment = dom.DocumentFragment;
var $DocumentType = dom.DocumentType;
var $DOMImplementation = dom.DOMImplementation;
var $Element = dom.Element;
var $Entity = dom.Entity;
var $EntityReference = dom.EntityReference;
var $LiveNodeList = dom.LiveNodeList;
var $NamedNodeMap = dom.NamedNodeMap;
var $Node = dom.Node;
var $NodeList = dom.NodeList;
var $Notation = dom.Notation;
var $ProcessingInstruction = dom.ProcessingInstruction;
var $Text = dom.Text;
var $XMLSerializer = dom.XMLSerializer;
var domParser = require_dom_parser();
var $DOMParser = domParser.DOMParser;
var $normalizeLineEndings = domParser.normalizeLineEndings;
var $onErrorStopParsing = domParser.onErrorStopParsing;
var $onWarningStopParsing = domParser.onWarningStopParsing;

// skills/docx-template/agent/refine.ts
var WORD_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
function concatenateRunText(paragraph) {
  const runs = paragraph.getElementsByTagNameNS(WORD_NS, "r");
  let text = "";
  for (let i = 0;i < runs.length; i++) {
    const tElements = runs[i].getElementsByTagNameNS(WORD_NS, "t");
    for (let j = 0;j < tElements.length; j++) {
      text += tElements[j].textContent || "";
    }
  }
  return text;
}
function replaceInParagraph(paragraph, searchValue, replaceValue) {
  const runs = paragraph.getElementsByTagNameNS(WORD_NS, "r");
  if (runs.length === 0)
    return false;
  const segments = [];
  let pos = 0;
  for (let i = 0;i < runs.length; i++) {
    const tEls = runs[i].getElementsByTagNameNS(WORD_NS, "t");
    for (let j = 0;j < tEls.length; j++) {
      const text = tEls[j].textContent || "";
      segments.push({ tNode: tEls[j], text, start: pos });
      pos += text.length;
    }
  }
  const fullText = segments.map((s) => s.text).join("");
  const matchStart = fullText.indexOf(searchValue);
  if (matchStart === -1)
    return false;
  const matchEnd = matchStart + searchValue.length;
  let placed = false;
  for (const seg of segments) {
    const segEnd = seg.start + seg.text.length;
    if (segEnd <= matchStart || seg.start >= matchEnd)
      continue;
    const keepBefore = seg.text.substring(0, Math.max(0, matchStart - seg.start));
    const keepAfter = seg.text.substring(Math.min(seg.text.length, matchEnd - seg.start));
    let newContent;
    if (!placed) {
      newContent = keepBefore + replaceValue + keepAfter;
      placed = true;
    } else {
      newContent = keepBefore + keepAfter;
    }
    seg.tNode.textContent = newContent;
    if (newContent.length > 0) {
      seg.tNode.setAttribute("xml:space", "preserve");
    }
  }
  return placed;
}
function insertTagParagraphBefore(doc, paragraph, tag) {
  const newPara = doc.createElementNS(WORD_NS, "w:p");
  const newRun = doc.createElementNS(WORD_NS, "w:r");
  const newText = doc.createElementNS(WORD_NS, "w:t");
  newText.setAttribute("xml:space", "preserve");
  newText.textContent = tag;
  newRun.appendChild(newText);
  newPara.appendChild(newRun);
  paragraph.parentNode?.insertBefore(newPara, paragraph);
}
function insertTagParagraphAfter(doc, paragraph, tag) {
  const newPara = doc.createElementNS(WORD_NS, "w:p");
  const newRun = doc.createElementNS(WORD_NS, "w:r");
  const newText = doc.createElementNS(WORD_NS, "w:t");
  newText.setAttribute("xml:space", "preserve");
  newText.textContent = tag;
  newRun.appendChild(newText);
  newPara.appendChild(newRun);
  const next = paragraph.nextSibling;
  if (next) {
    paragraph.parentNode?.insertBefore(newPara, next);
  } else {
    paragraph.parentNode?.appendChild(newPara);
  }
}
function applyModification(doc, body, mod) {
  const paragraphs = body.getElementsByTagNameNS(WORD_NS, "p");
  switch (mod.type) {
    case "replaceTag": {
      if (!mod.oldTag || !mod.newTag)
        break;
      const oldPlaceholder = `{${mod.oldTag}}`;
      const newPlaceholder = `{${mod.newTag}}`;
      for (let i = 0;i < paragraphs.length; i++) {
        replaceInParagraph(paragraphs[i], oldPlaceholder, newPlaceholder);
      }
      break;
    }
    case "addVariable": {
      if (!mod.searchText || !mod.tag)
        break;
      const tagPlaceholder = `{${mod.tag}}`;
      for (let i = 0;i < paragraphs.length; i++) {
        replaceInParagraph(paragraphs[i], mod.searchText, tagPlaceholder);
      }
      break;
    }
    case "removeTag": {
      if (!mod.oldTag)
        break;
      const placeholder = `{${mod.oldTag}}`;
      for (let i = 0;i < paragraphs.length; i++) {
        replaceInParagraph(paragraphs[i], placeholder, "");
      }
      const openTag = `{#${mod.oldTag}}`;
      const closeTag = `{/${mod.oldTag}}`;
      for (let i = paragraphs.length - 1;i >= 0; i--) {
        const text = concatenateRunText(paragraphs[i]);
        if (text.trim() === openTag || text.trim() === closeTag) {
          paragraphs[i].parentNode?.removeChild(paragraphs[i]);
        }
      }
      break;
    }
    case "wrapLoop": {
      if (!mod.loopTag || !mod.startText || !mod.endText)
        break;
      let startPara = null;
      let endPara = null;
      for (let i = 0;i < paragraphs.length; i++) {
        const text = concatenateRunText(paragraphs[i]);
        if (text.includes(mod.startText) && !startPara) {
          startPara = paragraphs[i];
        }
        if (text.includes(mod.endText)) {
          endPara = paragraphs[i];
        }
      }
      if (startPara) {
        insertTagParagraphBefore(doc, startPara, `{#${mod.loopTag}}`);
      }
      if (endPara) {
        insertTagParagraphAfter(doc, endPara, `{/${mod.loopTag}}`);
      }
      break;
    }
    case "addConditional": {
      if (!mod.conditionalTag || !mod.paragraphText)
        break;
      for (let i = 0;i < paragraphs.length; i++) {
        const text = concatenateRunText(paragraphs[i]);
        if (text.includes(mod.paragraphText)) {
          insertTagParagraphBefore(doc, paragraphs[i], `{#${mod.conditionalTag}}`);
          insertTagParagraphAfter(doc, paragraphs[i], `{/${mod.conditionalTag}}`);
          break;
        }
      }
      break;
    }
  }
}
function processXmlPart(xml, modifications) {
  const doc = new $DOMParser().parseFromString(xml, "text/xml");
  const body = doc.documentElement;
  if (!body)
    return xml;
  for (const mod of modifications) {
    applyModification(doc, body, mod);
  }
  return new $XMLSerializer().serializeToString(doc);
}
async function refine(templatePath, modificationsPath, outputPath) {
  const buffer = fs.readFileSync(templatePath);
  const zip = new import_pizzip.default(buffer);
  const modsFile = JSON.parse(fs.readFileSync(modificationsPath, "utf-8"));
  const docXml = zip.file("word/document.xml")?.asText();
  if (docXml) {
    zip.file("word/document.xml", processXmlPart(docXml, modsFile.modifications));
  }
  for (const entry of Object.keys(zip.files)) {
    if (entry.match(/^word\/header\d+\.xml$/) || entry.match(/^word\/footer\d+\.xml$/)) {
      const partXml = zip.file(entry)?.asText();
      if (partXml) {
        zip.file(entry, processXmlPart(partXml, modsFile.modifications));
      }
    }
  }
  const out = outputPath || templatePath.replace(/\.docx$/i, "_refined.docx");
  const outputBuffer = zip.generate({
    type: "nodebuffer",
    compression: "DEFLATE"
  });
  fs.writeFileSync(out, outputBuffer);
  console.log(`Refined template written to: ${out}`);
}
async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: node refine.js <template.docx> <modifications.json> [output.docx]");
    process.exit(1);
  }
  const templatePath = path.resolve(args[0]);
  const modificationsPath = path.resolve(args[1]);
  const outputPath = args[2] ? path.resolve(args[2]) : undefined;
  if (!fs.existsSync(templatePath)) {
    console.error(`File not found: ${templatePath}`);
    process.exit(1);
  }
  if (!fs.existsSync(modificationsPath)) {
    console.error(`File not found: ${modificationsPath}`);
    process.exit(1);
  }
  await refine(templatePath, modificationsPath, outputPath);
}
main().catch((err) => {
  console.error("Refinement failed:", err);
  process.exit(1);
});
export {
  refine
};
