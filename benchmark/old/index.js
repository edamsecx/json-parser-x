var json_parse = (function () {
  var r,
    n,
    e,
    t,
    f = {
      '"': '"',
      "\\": "\\",
      "/": "/",
      b: "b",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "	",
    },
    u = function (n) {
      throw { name: "SyntaxError", message: n, at: r, text: e };
    },
    a = function (t) {
      return (
        t && t !== n && u("Expected '" + t + "' instead of '" + n + "'"),
        (n = e.charAt(r)),
        (r += 1),
        n
      );
    },
    o = function () {
      var r,
        e = "";
      for ("-" === n && ((e = "-"), a("-")); n >= "0" && n <= "9"; )
        (e += n), a();
      if ("." === n) for (e += "."; a() && n >= "0" && n <= "9"; ) e += n;
      if ("e" === n || "E" === n)
        for (
          e += n, a(), ("-" === n || "+" === n) && ((e += n), a());
          n >= "0" && n <= "9";

        )
          (e += n), a();
      if (!isNaN((r = +e))) return r;
      u("Bad number");
    },
    i = function () {
      var r,
        e,
        t,
        o = "";
      if ('"' === n)
        for (; a(); ) {
          if ('"' === n) return a(), o;
          if ("\\" === n) {
            if ((a(), "u" === n)) {
              for (
                e = 0, t = 0;
                e < 4 && ((r = parseInt(a(), 16)), isFinite(r));
                e += 1
              )
                t = 16 * t + r;
              o += String.fromCharCode(t);
            } else if ("string" == typeof f[n]) o += f[n];
            else break;
          } else o += n;
        }
      u("Bad string");
    },
    c = function () {
      for (; n && n <= " "; ) a();
    },
    s = function () {
      switch (n) {
        case "t":
          return a("t"), a("r"), a("u"), a("e"), !0;
        case "f":
          return a("f"), a("a"), a("l"), a("s"), a("e"), !1;
        case "n":
          return a("n"), a("u"), a("l"), a("l"), null;
      }
      u("Unexpected '" + n + "'");
    },
    l = function () {
      var r = [];
      if ("[" === n) {
        if ((a("["), c(), "]" === n)) return a("]"), r;
        for (; n; ) {
          if ((r.push(t()), c(), "]" === n)) return a("]"), r;
          a(","), c();
        }
      }
      u("Bad array");
    },
    d = function () {
      var r,
        e = {};
      if ("{" === n) {
        if ((a("{"), c(), "}" === n)) return a("}"), e;
        for (; n; ) {
          if (((r = i()), c(), a(":"), (e[r] = t()), c(), "}" === n))
            return a("}"), e;
          a(","), c();
        }
      }
      u("Bad object");
    };
  return (
    (t = function () {
      switch ((c(), n)) {
        case "{":
          return d();
        case "[":
          return l();
        case '"':
          return i();
        case "-":
          return o();
        default:
          return n >= "0" && n <= "9" ? o() : s();
      }
    }),
    function (f, a) {
      var o;
      return (
        (e = f),
        (r = 0),
        (n = " "),
        (o = t()),
        c(),
        n && u("Syntax error"),
        "function" == typeof a
          ? (function r(n, e) {
              var t,
                f,
                u = n[e];
              if (u && "object" == typeof u)
                for (t in u)
                  Object.hasOwnProperty.call(u, t) &&
                    (void 0 !== (f = r(u, t)) ? (u[t] = f) : delete u[t]);
              return a.call(n, e, u);
            })({ "": o }, "")
          : o
      );
    }
  );
})();
export { json_parse as OldJSONParser };
// made by Douglas Crockford
