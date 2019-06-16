'use strict';
export default function(e, r, t) {
  var n = r.prototype;
  t.en.relativeTime = {
    future: '%s',
    past: '%s前',
    s: '1秒',
    m: '1分钟',
    mm: '%d分钟前',
    h: '1小时前',
    hh: '%d小时间',
    d: '1天前',
    dd: '%d天前',
    M: '1个月前',
    MM: '%d个月前',
    y: '1年前',
    yy: '%d年前',
  };
  var o = function(e, r, n, o) {
    for (
      var d,
        i,
        a = n.$locale().relativeTime,
        u = [
          { l: 's', r: 44, d: 'second' },
          { l: 'm', r: 89 },
          { l: 'mm', r: 44, d: 'minute' },
          { l: 'h', r: 89 },
          { l: 'hh', r: 21, d: 'hour' },
          { l: 'd', r: 35 },
          { l: 'dd', r: 25, d: 'day' },
          { l: 'M', r: 45 },
          { l: 'MM', r: 10, d: 'month' },
          { l: 'y', r: 17 },
          { l: 'yy', d: 'year' },
        ],
        f = u.length,
        s = 0;
      s < f;
      s += 1
    ) {
      var l = u[s];
      l.d && (d = o ? t(e).diff(n, l.d, !0) : n.diff(e, l.d, !0));
      var m = Math.round(Math.abs(d));
      if (m <= l.r || !l.r) {
        1 === m && s > 0 && (l = u[s - 1]), (i = a[l.l].replace('%d', m));
        break;
      }
    }
    return r ? i : (d > 0 ? a.future : a.past).replace('%s', i);
  };
  (n.to = function(e, r) {
    return o(e, r, this, !0);
  }),
    (n.from = function(e, r) {
      return o(e, r, this);
    }),
    (n.toNow = function(e) {
      return this.to(t(), e);
    }),
    (n.fromNow = function(e) {
      return this.from(t(), e);
    });
}
