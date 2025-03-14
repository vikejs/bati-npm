function Br(t) {
  return Object.keys(t).reduce((i, r) => {
    const o = t[r];
    return i[r] = Object.assign({}, o), Vi(o.value) && !Fr(o.value) && !Array.isArray(o.value) && (i[r].value = Object.assign({}, o.value)), Array.isArray(o.value) && (i[r].value = o.value.slice(0)), i;
  }, {});
}
function Hr(t) {
  return t ? Object.keys(t).reduce((i, r) => {
    const o = t[r];
    return i[r] = Vi(o) && "value" in o ? o : {
      value: o
    }, i[r].attribute || (i[r].attribute = _r(r)), i[r].parse = "parse" in i[r] ? i[r].parse : typeof i[r].value != "string", i;
  }, {}) : {};
}
function Vr(t) {
  return Object.keys(t).reduce((i, r) => (i[r] = t[r].value, i), {});
}
function Jr(t, e) {
  const i = Br(e);
  return Object.keys(e).forEach((o) => {
    const n = i[o], a = t.getAttribute(n.attribute), l = t[o];
    a != null && (n.value = n.parse ? Hi(a) : a), l != null && (n.value = Array.isArray(l) ? l.slice(0) : l), n.reflect && di(t, n.attribute, n.value, !!n.parse), Object.defineProperty(t, o, {
      get() {
        return n.value;
      },
      set(s) {
        const c = n.value;
        n.value = s, n.reflect && di(this, n.attribute, n.value, !!n.parse);
        for (let M = 0, u = this.__propertyChangedCallbacks.length; M < u; M++)
          this.__propertyChangedCallbacks[M](o, s, c);
      },
      enumerable: !0,
      configurable: !0
    });
  }), i;
}
function Hi(t) {
  if (t)
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
}
function di(t, e, i, r) {
  if (i == null || i === !1) return t.removeAttribute(e);
  let o = r ? JSON.stringify(i) : i;
  t.__updating[e] = !0, o === "true" && (o = ""), t.setAttribute(e, o), Promise.resolve().then(() => delete t.__updating[e]);
}
function _r(t) {
  return t.replace(/\.?([A-Z]+)/g, (e, i) => "-" + i.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function Vi(t) {
  return t != null && (typeof t == "object" || typeof t == "function");
}
function Fr(t) {
  return Object.prototype.toString.call(t) === "[object Function]";
}
function $r(t) {
  return typeof t == "function" && t.toString().indexOf("class") === 0;
}
let ze;
function Xr(t, e) {
  const i = Object.keys(e);
  return class extends t {
    static get observedAttributes() {
      return i.map((o) => e[o].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized) return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = Jr(this, e);
      const o = Vr(this.props), n = this.Component, a = ze;
      try {
        ze = this, this.__initialized = !0, $r(n) ? new n(o, {
          element: this
        }) : n(o, {
          element: this
        });
      } finally {
        ze = a;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected) return;
      this.__propertyChangedCallbacks.length = 0;
      let o = null;
      for (; o = this.__releaseCallbacks.pop(); ) o(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(o, n, a) {
      if (this.__initialized && !this.__updating[o] && (o = this.lookupProp(o), o in e)) {
        if (a == null && !this[o]) return;
        this[o] = e[o].parse ? Hi(a) : a;
      }
    }
    lookupProp(o) {
      if (e)
        return i.find((n) => o === n || o === e[n].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(o) {
      this.__releaseCallbacks.push(o);
    }
    addPropertyChangedCallback(o) {
      this.__propertyChangedCallbacks.push(o);
    }
  };
}
function Kr(t, e = {}, i = {}) {
  const {
    BaseElement: r = HTMLElement,
    extension: o,
    customElements: n = window.customElements
  } = i;
  return (a) => {
    let l = n.get(t);
    return l ? (l.prototype.Component = a, l) : (l = Xr(r, Hr(e)), l.prototype.Component = a, l.prototype.registeredTag = t, n.define(t, l, o), l);
  };
}
const qr = !1, to = (t, e) => t === e, F = Symbol("solid-proxy"), Ji = typeof Proxy == "function", Ue = Symbol("solid-track"), oe = {
  equals: to
};
let _i = qi;
const at = 1, ne = 2, Fi = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, Ae = {};
var v = null;
let pe = null, eo = null, O = null, Q = null, nt = null, Ne = 0;
function ee(t, e) {
  const i = O, r = v, o = t.length === 0, n = e === void 0 ? r : e, a = o ? Fi : {
    owned: null,
    cleanups: null,
    context: n ? n.context : null,
    owner: n
  }, l = o ? t : () => t(() => Y(() => Zt(a)));
  v = a, O = null;
  try {
    return ut(l, !0);
  } finally {
    O = i, v = r;
  }
}
function k(t, e) {
  e = e ? Object.assign({}, oe, e) : oe;
  const i = {
    value: t,
    observers: null,
    observerSlots: null,
    comparator: e.equals || void 0
  }, r = (o) => (typeof o == "function" && (o = o(i.value)), Ki(i, o));
  return [Xi.bind(i), r];
}
function io(t, e, i) {
  const r = ye(t, e, !0, at);
  Ct(r);
}
function E(t, e, i) {
  const r = ye(t, e, !1, at);
  Ct(r);
}
function Dt(t, e, i) {
  _i = co;
  const r = ye(t, e, !1, at);
  r.user = !0, nt ? nt.push(r) : Ct(r);
}
function p(t, e, i) {
  i = i ? Object.assign({}, oe, i) : oe;
  const r = ye(t, e, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = i.equals || void 0, Ct(r), Xi.bind(r);
}
function ro(t) {
  return t && typeof t == "object" && "then" in t;
}
function oo(t, e, i) {
  let r, o, n;
  typeof e == "function" ? (r = t, o = e, n = i || {}) : (r = !0, o = t, n = e || {});
  let a = null, l = Ae, s = !1, c = "initialValue" in n, M = typeof r == "function" && p(r);
  const u = /* @__PURE__ */ new Set(), [g, d] = (n.storage || k)(n.initialValue), [N, I] = k(void 0), [b, w] = k(void 0, {
    equals: !1
  }), [z, j] = k(c ? "ready" : "unresolved");
  function T(A, x, m, S) {
    return a === A && (a = null, S !== void 0 && (c = !0), (A === l || x === l) && n.onHydrated && queueMicrotask(
      () => n.onHydrated(S, {
        value: x
      })
    ), l = Ae, L(x, m)), x;
  }
  function L(A, x) {
    ut(() => {
      x === void 0 && d(() => A), j(x !== void 0 ? "errored" : c ? "ready" : "unresolved"), I(x);
      for (const m of u.keys()) m.decrement();
      u.clear();
    }, !1);
  }
  function C() {
    const A = ao, x = g(), m = N();
    if (m !== void 0 && !a) throw m;
    return O && O.user, x;
  }
  function h(A = !0) {
    if (A !== !1 && s) return;
    s = !1;
    const x = M ? M() : r;
    if (x == null || x === !1) {
      T(a, Y(g));
      return;
    }
    const m = l !== Ae ? l : Y(
      () => o(x, {
        value: g(),
        refetching: A
      })
    );
    return ro(m) ? (a = m, "value" in m ? (m.status === "success" ? T(a, m.value, void 0, x) : T(a, void 0, Ge(m.value), x), m) : (s = !0, queueMicrotask(() => s = !1), ut(() => {
      j(c ? "refreshing" : "pending"), w();
    }, !1), m.then(
      (S) => T(m, S, void 0, x),
      (S) => T(m, void 0, Ge(S), x)
    ))) : (T(a, m, void 0, x), m);
  }
  return Object.defineProperties(C, {
    state: {
      get: () => z()
    },
    error: {
      get: () => N()
    },
    loading: {
      get() {
        const A = z();
        return A === "pending" || A === "refreshing";
      }
    },
    latest: {
      get() {
        if (!c) return C();
        const A = N();
        if (A && !a) throw A;
        return g();
      }
    }
  }), M ? io(() => h(!1)) : h(!1), [
    C,
    {
      refetch: h,
      mutate: d
    }
  ];
}
function Ze(t) {
  return ut(t, !1);
}
function Y(t) {
  if (O === null) return t();
  const e = O;
  O = null;
  try {
    return t();
  } finally {
    O = e;
  }
}
function no(t, e, i) {
  const r = Array.isArray(t);
  let o;
  return (n) => {
    let a;
    if (r) {
      a = Array(t.length);
      for (let s = 0; s < t.length; s++) a[s] = t[s]();
    } else a = t();
    const l = Y(() => e(a, o, n));
    return o = a, l;
  };
}
function je(t) {
  Dt(() => Y(t));
}
function Jt(t) {
  return v === null || (v.cleanups === null ? v.cleanups = [t] : v.cleanups.push(t)), t;
}
function Pe() {
  return O;
}
const [Gs, Ws] = /* @__PURE__ */ k(!1);
function De(t, e) {
  const i = Symbol("context");
  return {
    id: i,
    Provider: Mo(i),
    defaultValue: t
  };
}
function U(t) {
  let e;
  return v && v.context && (e = v.context[t.id]) !== void 0 ? e : t.defaultValue;
}
function $i(t) {
  const e = p(t), i = p(() => We(e()));
  return i.toArray = () => {
    const r = i();
    return Array.isArray(r) ? r : r != null ? [r] : [];
  }, i;
}
let ao;
function Xi() {
  if (this.sources && this.state)
    if (this.state === at) Ct(this);
    else {
      const t = Q;
      Q = null, ut(() => le(this), !1), Q = t;
    }
  if (O) {
    const t = this.observers ? this.observers.length : 0;
    O.sources ? (O.sources.push(this), O.sourceSlots.push(t)) : (O.sources = [this], O.sourceSlots = [t]), this.observers ? (this.observers.push(O), this.observerSlots.push(O.sources.length - 1)) : (this.observers = [O], this.observerSlots = [O.sources.length - 1]);
  }
  return this.value;
}
function Ki(t, e, i) {
  let r = t.value;
  return (!t.comparator || !t.comparator(r, e)) && (t.value = e, t.observers && t.observers.length && ut(() => {
    for (let o = 0; o < t.observers.length; o += 1) {
      const n = t.observers[o], a = pe && pe.running;
      a && pe.disposed.has(n), (a ? !n.tState : !n.state) && (n.pure ? Q.push(n) : nt.push(n), n.observers && tr(n)), a || (n.state = at);
    }
    if (Q.length > 1e6)
      throw Q = [], new Error();
  }, !1)), e;
}
function Ct(t) {
  if (!t.fn) return;
  Zt(t);
  const e = Ne;
  lo(
    t,
    t.value,
    e
  );
}
function lo(t, e, i) {
  let r;
  const o = v, n = O;
  O = v = t;
  try {
    r = t.fn(e);
  } catch (a) {
    return t.pure && (t.state = at, t.owned && t.owned.forEach(Zt), t.owned = null), t.updatedAt = i + 1, er(a);
  } finally {
    O = n, v = o;
  }
  (!t.updatedAt || t.updatedAt <= i) && (t.updatedAt != null && "observers" in t ? Ki(t, r) : t.value = r, t.updatedAt = i);
}
function ye(t, e, i, r = at, o) {
  const n = {
    fn: t,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: e,
    owner: v,
    context: v ? v.context : null,
    pure: i
  };
  return v === null || v !== Fi && (v.owned ? v.owned.push(n) : v.owned = [n]), n;
}
function ae(t) {
  if (t.state === 0) return;
  if (t.state === ne) return le(t);
  if (t.suspense && Y(t.suspense.inFallback)) return t.suspense.effects.push(t);
  const e = [t];
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < Ne); )
    t.state && e.push(t);
  for (let i = e.length - 1; i >= 0; i--)
    if (t = e[i], t.state === at)
      Ct(t);
    else if (t.state === ne) {
      const r = Q;
      Q = null, ut(() => le(t, e[0]), !1), Q = r;
    }
}
function ut(t, e) {
  if (Q) return t();
  let i = !1;
  e || (Q = []), nt ? i = !0 : nt = [], Ne++;
  try {
    const r = t();
    return so(i), r;
  } catch (r) {
    i || (nt = null), Q = null, er(r);
  }
}
function so(t) {
  if (Q && (qi(Q), Q = null), t) return;
  const e = nt;
  nt = null, e.length && ut(() => _i(e), !1);
}
function qi(t) {
  for (let e = 0; e < t.length; e++) ae(t[e]);
}
function co(t) {
  let e, i = 0;
  for (e = 0; e < t.length; e++) {
    const r = t[e];
    r.user ? t[i++] = r : ae(r);
  }
  for (e = 0; e < i; e++) ae(t[e]);
}
function le(t, e) {
  t.state = 0;
  for (let i = 0; i < t.sources.length; i += 1) {
    const r = t.sources[i];
    if (r.sources) {
      const o = r.state;
      o === at ? r !== e && (!r.updatedAt || r.updatedAt < Ne) && ae(r) : o === ne && le(r, e);
    }
  }
}
function tr(t) {
  for (let e = 0; e < t.observers.length; e += 1) {
    const i = t.observers[e];
    i.state || (i.state = ne, i.pure ? Q.push(i) : nt.push(i), i.observers && tr(i));
  }
}
function Zt(t) {
  let e;
  if (t.sources)
    for (; t.sources.length; ) {
      const i = t.sources.pop(), r = t.sourceSlots.pop(), o = i.observers;
      if (o && o.length) {
        const n = o.pop(), a = i.observerSlots.pop();
        r < o.length && (n.sourceSlots[a] = r, o[r] = n, i.observerSlots[r] = a);
      }
    }
  if (t.tOwned) {
    for (e = t.tOwned.length - 1; e >= 0; e--) Zt(t.tOwned[e]);
    delete t.tOwned;
  }
  if (t.owned) {
    for (e = t.owned.length - 1; e >= 0; e--) Zt(t.owned[e]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (e = t.cleanups.length - 1; e >= 0; e--) t.cleanups[e]();
    t.cleanups = null;
  }
  t.state = 0;
}
function Ge(t) {
  return t instanceof Error ? t : new Error(typeof t == "string" ? t : "Unknown error", {
    cause: t
  });
}
function er(t, e = v) {
  throw Ge(t);
}
function We(t) {
  if (typeof t == "function" && !t.length) return We(t());
  if (Array.isArray(t)) {
    const e = [];
    for (let i = 0; i < t.length; i++) {
      const r = We(t[i]);
      Array.isArray(r) ? e.push.apply(e, r) : e.push(r);
    }
    return e;
  }
  return t;
}
function Mo(t, e) {
  return function(r) {
    let o;
    return E(
      () => o = Y(() => (v.context = {
        ...v.context,
        [t]: r.value
      }, $i(() => r.children))),
      void 0
    ), o;
  };
}
const uo = Symbol("fallback");
function Ii(t) {
  for (let e = 0; e < t.length; e++) t[e]();
}
function go(t, e, i = {}) {
  let r = [], o = [], n = [], a = 0, l = e.length > 1 ? [] : null;
  return Jt(() => Ii(n)), () => {
    let s = t() || [], c = s.length, M, u;
    return s[Ue], Y(() => {
      let d, N, I, b, w, z, j, T, L;
      if (c === 0)
        a !== 0 && (Ii(n), n = [], r = [], o = [], a = 0, l && (l = [])), i.fallback && (r = [uo], o[0] = ee((C) => (n[0] = C, i.fallback())), a = 1);
      else if (a === 0) {
        for (o = new Array(c), u = 0; u < c; u++)
          r[u] = s[u], o[u] = ee(g);
        a = c;
      } else {
        for (I = new Array(c), b = new Array(c), l && (w = new Array(c)), z = 0, j = Math.min(a, c); z < j && r[z] === s[z]; z++) ;
        for (j = a - 1, T = c - 1; j >= z && T >= z && r[j] === s[T]; j--, T--)
          I[T] = o[j], b[T] = n[j], l && (w[T] = l[j]);
        for (d = /* @__PURE__ */ new Map(), N = new Array(T + 1), u = T; u >= z; u--)
          L = s[u], M = d.get(L), N[u] = M === void 0 ? -1 : M, d.set(L, u);
        for (M = z; M <= j; M++)
          L = r[M], u = d.get(L), u !== void 0 && u !== -1 ? (I[u] = o[M], b[u] = n[M], l && (w[u] = l[M]), u = N[u], d.set(L, u)) : n[M]();
        for (u = z; u < c; u++)
          u in I ? (o[u] = I[u], n[u] = b[u], l && (l[u] = w[u], l[u](u))) : o[u] = ee(g);
        o = o.slice(0, a = c), r = s.slice(0);
      }
      return o;
    });
    function g(d) {
      if (n[u] = d, l) {
        const [N, I] = k(u);
        return l[u] = I, e(s[u], N);
      }
      return e(s[u]);
    }
  };
}
function D(t, e) {
  return Y(() => t(e || {}));
}
function $t() {
  return !0;
}
const Re = {
  get(t, e, i) {
    return e === F ? i : t.get(e);
  },
  has(t, e) {
    return e === F ? !0 : t.has(e);
  },
  set: $t,
  deleteProperty: $t,
  getOwnPropertyDescriptor(t, e) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return t.get(e);
      },
      set: $t,
      deleteProperty: $t
    };
  },
  ownKeys(t) {
    return t.keys();
  }
};
function me(t) {
  return (t = typeof t == "function" ? t() : t) ? t : {};
}
function Io() {
  for (let t = 0, e = this.length; t < e; ++t) {
    const i = this[t]();
    if (i !== void 0) return i;
  }
}
function ir(...t) {
  let e = !1;
  for (let a = 0; a < t.length; a++) {
    const l = t[a];
    e = e || !!l && F in l, t[a] = typeof l == "function" ? (e = !0, p(l)) : l;
  }
  if (Ji && e)
    return new Proxy(
      {
        get(a) {
          for (let l = t.length - 1; l >= 0; l--) {
            const s = me(t[l])[a];
            if (s !== void 0) return s;
          }
        },
        has(a) {
          for (let l = t.length - 1; l >= 0; l--)
            if (a in me(t[l])) return !0;
          return !1;
        },
        keys() {
          const a = [];
          for (let l = 0; l < t.length; l++)
            a.push(...Object.keys(me(t[l])));
          return [...new Set(a)];
        }
      },
      Re
    );
  const i = {}, r = /* @__PURE__ */ Object.create(null);
  for (let a = t.length - 1; a >= 0; a--) {
    const l = t[a];
    if (!l) continue;
    const s = Object.getOwnPropertyNames(l);
    for (let c = s.length - 1; c >= 0; c--) {
      const M = s[c];
      if (M === "__proto__" || M === "constructor") continue;
      const u = Object.getOwnPropertyDescriptor(l, M);
      if (!r[M])
        r[M] = u.get ? {
          enumerable: !0,
          configurable: !0,
          get: Io.bind(i[M] = [u.get.bind(l)])
        } : u.value !== void 0 ? u : void 0;
      else {
        const g = i[M];
        g && (u.get ? g.push(u.get.bind(l)) : u.value !== void 0 && g.push(() => u.value));
      }
    }
  }
  const o = {}, n = Object.keys(r);
  for (let a = n.length - 1; a >= 0; a--) {
    const l = n[a], s = r[l];
    s && s.get ? Object.defineProperty(o, l, s) : o[l] = s ? s.value : void 0;
  }
  return o;
}
function rr(t, ...e) {
  if (Ji && F in t) {
    const o = new Set(e.length > 1 ? e.flat() : e[0]), n = e.map((a) => new Proxy(
      {
        get(l) {
          return a.includes(l) ? t[l] : void 0;
        },
        has(l) {
          return a.includes(l) && l in t;
        },
        keys() {
          return a.filter((l) => l in t);
        }
      },
      Re
    ));
    return n.push(
      new Proxy(
        {
          get(a) {
            return o.has(a) ? void 0 : t[a];
          },
          has(a) {
            return o.has(a) ? !1 : a in t;
          },
          keys() {
            return Object.keys(t).filter((a) => !o.has(a));
          }
        },
        Re
      )
    ), n;
  }
  const i = {}, r = e.map(() => ({}));
  for (const o of Object.getOwnPropertyNames(t)) {
    const n = Object.getOwnPropertyDescriptor(t, o), a = !n.get && !n.set && n.enumerable && n.writable && n.configurable;
    let l = !1, s = 0;
    for (const c of e)
      c.includes(o) && (l = !0, a ? r[s][o] = n.value : Object.defineProperty(r[s], o, n)), ++s;
    l || (a ? i[o] = n.value : Object.defineProperty(i, o, n));
  }
  return [...r, i];
}
const or = (t) => `Stale read from <${t}>.`;
function gt(t) {
  const e = "fallback" in t && {
    fallback: () => t.fallback
  };
  return p(go(() => t.each, t.children, e || void 0));
}
function P(t) {
  const e = t.keyed, i = p(() => t.when, void 0, void 0), r = e ? i : p(i, void 0, {
    equals: (o, n) => !o == !n
  });
  return p(
    () => {
      const o = r();
      if (o) {
        const n = t.children;
        return typeof n == "function" && n.length > 0 ? Y(
          () => n(
            e ? o : () => {
              if (!Y(r)) throw or("Show");
              return i();
            }
          )
        ) : n;
      }
      return t.fallback;
    },
    void 0,
    void 0
  );
}
function No(t) {
  const e = $i(() => t.children), i = p(() => {
    const r = e(), o = Array.isArray(r) ? r : [r];
    let n = () => {
    };
    for (let a = 0; a < o.length; a++) {
      const l = a, s = o[a], c = n, M = p(
        () => c() ? void 0 : s.when,
        void 0,
        void 0
      ), u = s.keyed ? M : p(M, void 0, {
        equals: (g, d) => !g == !d
      });
      n = () => c() || (u() ? [l, M, s] : void 0);
    }
    return n;
  });
  return p(
    () => {
      const r = i()();
      if (!r) return t.fallback;
      const [o, n, a] = r, l = a.children;
      return typeof l == "function" && l.length > 0 ? Y(
        () => l(
          a.keyed ? n() : () => {
            var c;
            if (((c = Y(i)()) == null ? void 0 : c[0]) !== o) throw or("Match");
            return n();
          }
        )
      ) : l;
    },
    void 0,
    void 0
  );
}
function Ni(t) {
  return t;
}
const jo = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "hidden",
  "indeterminate",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected"
], Do = /* @__PURE__ */ new Set([
  "className",
  "value",
  "readOnly",
  "formNoValidate",
  "isMap",
  "noModule",
  "playsInline",
  ...jo
]), yo = /* @__PURE__ */ new Set([
  "innerHTML",
  "textContent",
  "innerText",
  "children"
]), Lo = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), bo = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  class: "className",
  formnovalidate: {
    $: "formNoValidate",
    BUTTON: 1,
    INPUT: 1
  },
  ismap: {
    $: "isMap",
    IMG: 1
  },
  nomodule: {
    $: "noModule",
    SCRIPT: 1
  },
  playsinline: {
    $: "playsInline",
    VIDEO: 1
  },
  readonly: {
    $: "readOnly",
    INPUT: 1,
    TEXTAREA: 1
  }
});
function wo(t, e) {
  const i = bo[t];
  return typeof i == "object" ? i[e] ? i.$ : void 0 : i;
}
const To = /* @__PURE__ */ new Set([
  "beforeinput",
  "click",
  "dblclick",
  "contextmenu",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart"
]), xo = /* @__PURE__ */ new Set([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animate",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "circle",
  "clipPath",
  "color-profile",
  "cursor",
  "defs",
  "desc",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "font",
  "font-face",
  "font-face-format",
  "font-face-name",
  "font-face-src",
  "font-face-uri",
  "foreignObject",
  "g",
  "glyph",
  "glyphRef",
  "hkern",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "metadata",
  "missing-glyph",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "set",
  "stop",
  "svg",
  "switch",
  "symbol",
  "text",
  "textPath",
  "tref",
  "tspan",
  "use",
  "view",
  "vkern"
]), fo = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function ho(t, e, i) {
  let r = i.length, o = e.length, n = r, a = 0, l = 0, s = e[o - 1].nextSibling, c = null;
  for (; a < o || l < n; ) {
    if (e[a] === i[l]) {
      a++, l++;
      continue;
    }
    for (; e[o - 1] === i[n - 1]; )
      o--, n--;
    if (o === a) {
      const M = n < r ? l ? i[l - 1].nextSibling : i[n - l] : s;
      for (; l < n; ) t.insertBefore(i[l++], M);
    } else if (n === l)
      for (; a < o; )
        (!c || !c.has(e[a])) && e[a].remove(), a++;
    else if (e[a] === i[n - 1] && i[l] === e[o - 1]) {
      const M = e[--o].nextSibling;
      t.insertBefore(i[l++], e[a++].nextSibling), t.insertBefore(i[--n], M), e[o] = i[n];
    } else {
      if (!c) {
        c = /* @__PURE__ */ new Map();
        let u = l;
        for (; u < n; ) c.set(i[u], u++);
      }
      const M = c.get(e[a]);
      if (M != null)
        if (l < M && M < n) {
          let u = a, g = 1, d;
          for (; ++u < o && u < n && !((d = c.get(e[u])) == null || d !== M + g); )
            g++;
          if (g > M - l) {
            const N = e[a];
            for (; l < M; ) t.insertBefore(i[l++], N);
          } else t.replaceChild(i[l++], e[a++]);
        } else a++;
      else e[a++].remove();
    }
  }
}
const ji = "_$DX_DELEGATE";
function f(t, e, i, r) {
  let o;
  const n = () => {
    const l = document.createElement("template");
    return l.innerHTML = t, l.content.firstChild;
  }, a = () => (o || (o = n())).cloneNode(!0);
  return a.cloneNode = a, a;
}
function Et(t, e = window.document) {
  const i = e[ji] || (e[ji] = /* @__PURE__ */ new Set());
  for (let r = 0, o = t.length; r < o; r++) {
    const n = t[r];
    i.has(n) || (i.add(n), e.addEventListener(n, Co));
  }
}
function Z(t, e, i) {
  i == null ? t.removeAttribute(e) : t.setAttribute(e, i);
}
function zo(t, e, i, r) {
  r == null ? t.removeAttributeNS(e, i) : t.setAttributeNS(e, i, r);
}
function Ao(t, e, i) {
  i ? t.setAttribute(e, "") : t.removeAttribute(e);
}
function K(t, e) {
  e == null ? t.removeAttribute("class") : t.className = e;
}
function Be(t, e, i, r) {
  if (r)
    Array.isArray(i) ? (t[`$$${e}`] = i[0], t[`$$${e}Data`] = i[1]) : t[`$$${e}`] = i;
  else if (Array.isArray(i)) {
    const o = i[0];
    t.addEventListener(e, i[0] = (n) => o.call(t, i[1], n));
  } else t.addEventListener(e, i, typeof i != "function" && i);
}
function yt(t, e, i = {}) {
  const r = Object.keys(e || {}), o = Object.keys(i);
  let n, a;
  for (n = 0, a = o.length; n < a; n++) {
    const l = o[n];
    !l || l === "undefined" || e[l] || (Di(t, l, !1), delete i[l]);
  }
  for (n = 0, a = r.length; n < a; n++) {
    const l = r[n], s = !!e[l];
    !l || l === "undefined" || i[l] === s || !s || (Di(t, l, !0), i[l] = s);
  }
  return i;
}
function nr(t, e, i) {
  if (!e) return i ? Z(t, "style") : e;
  const r = t.style;
  if (typeof e == "string") return r.cssText = e;
  typeof i == "string" && (r.cssText = i = void 0), i || (i = {}), e || (e = {});
  let o, n;
  for (n in i)
    e[n] == null && r.removeProperty(n), delete i[n];
  for (n in e)
    o = e[n], o !== i[n] && (r.setProperty(n, o), i[n] = o);
  return i;
}
function po(t, e = {}, i, r) {
  const o = {};
  return E(
    () => o.children = Pt(t, e.children, o.children)
  ), E(() => typeof e.ref == "function" && jt(e.ref, t)), E(() => mo(t, e, i, !0, o, !0)), o;
}
function jt(t, e, i) {
  return Y(() => t(e, i));
}
function y(t, e, i, r) {
  if (i !== void 0 && !r && (r = []), typeof e != "function") return Pt(t, e, r, i);
  E((o) => Pt(t, e(), o, i), r);
}
function mo(t, e, i, r, o = {}, n = !1) {
  e || (e = {});
  for (const a in o)
    if (!(a in e)) {
      if (a === "children") continue;
      o[a] = yi(t, a, null, o[a], i, n, e);
    }
  for (const a in e) {
    if (a === "children")
      continue;
    const l = e[a];
    o[a] = yi(t, a, l, o[a], i, n, e);
  }
}
function So(t) {
  return t.toLowerCase().replace(/-([a-z])/g, (e, i) => i.toUpperCase());
}
function Di(t, e, i) {
  const r = e.trim().split(/\s+/);
  for (let o = 0, n = r.length; o < n; o++)
    t.classList.toggle(r[o], i);
}
function yi(t, e, i, r, o, n, a) {
  let l, s, c, M, u;
  if (e === "style") return nr(t, i, r);
  if (e === "classList") return yt(t, i, r);
  if (i === r) return r;
  if (e === "ref")
    n || i(t);
  else if (e.slice(0, 3) === "on:") {
    const g = e.slice(3);
    r && t.removeEventListener(g, r, typeof r != "function" && r), i && t.addEventListener(g, i, typeof i != "function" && i);
  } else if (e.slice(0, 10) === "oncapture:") {
    const g = e.slice(10);
    r && t.removeEventListener(g, r, !0), i && t.addEventListener(g, i, !0);
  } else if (e.slice(0, 2) === "on") {
    const g = e.slice(2).toLowerCase(), d = To.has(g);
    if (!d && r) {
      const N = Array.isArray(r) ? r[0] : r;
      t.removeEventListener(g, N);
    }
    (d || i) && (Be(t, g, i, d), d && Et([g]));
  } else if (e.slice(0, 5) === "attr:")
    Z(t, e.slice(5), i);
  else if (e.slice(0, 5) === "bool:")
    Ao(t, e.slice(5), i);
  else if ((u = e.slice(0, 5) === "prop:") || (c = yo.has(e)) || !o && ((M = wo(e, t.tagName)) || (s = Do.has(e))) || (l = t.nodeName.includes("-") || "is" in a))
    u && (e = e.slice(5), s = !0), e === "class" || e === "className" ? K(t, i) : l && !s && !c ? t[So(e)] = i : t[M || e] = i;
  else {
    const g = o && e.indexOf(":") > -1 && fo[e.split(":")[0]];
    g ? zo(t, g, e, i) : Z(t, Lo[e] || e, i);
  }
  return i;
}
function Co(t) {
  let e = t.target;
  const i = `$$${t.type}`, r = t.target, o = t.currentTarget, n = (s) => Object.defineProperty(t, "target", {
    configurable: !0,
    value: s
  }), a = () => {
    const s = e[i];
    if (s && !e.disabled) {
      const c = e[`${i}Data`];
      if (c !== void 0 ? s.call(e, c, t) : s.call(e, t), t.cancelBubble) return;
    }
    return e.host && typeof e.host != "string" && !e.host._$host && e.contains(t.target) && n(e.host), !0;
  }, l = () => {
    for (; a() && (e = e._$host || e.parentNode || e.host); ) ;
  };
  if (Object.defineProperty(t, "currentTarget", {
    configurable: !0,
    get() {
      return e || document;
    }
  }), t.composedPath) {
    const s = t.composedPath();
    n(s[0]);
    for (let c = 0; c < s.length - 2 && (e = s[c], !!a()); c++) {
      if (e._$host) {
        e = e._$host, l();
        break;
      }
      if (e.parentNode === o)
        break;
    }
  } else l();
  n(r);
}
function Pt(t, e, i, r, o) {
  for (; typeof i == "function"; ) i = i();
  if (e === i) return i;
  const n = typeof e, a = r !== void 0;
  if (t = a && i[0] && i[0].parentNode || t, n === "string" || n === "number") {
    if (n === "number" && (e = e.toString(), e === i))
      return i;
    if (a) {
      let l = i[0];
      l && l.nodeType === 3 ? l.data !== e && (l.data = e) : l = document.createTextNode(e), i = Tt(t, i, r, l);
    } else
      i !== "" && typeof i == "string" ? i = t.firstChild.data = e : i = t.textContent = e;
  } else if (e == null || n === "boolean")
    i = Tt(t, i, r);
  else {
    if (n === "function")
      return E(() => {
        let l = e();
        for (; typeof l == "function"; ) l = l();
        i = Pt(t, l, i, r);
      }), () => i;
    if (Array.isArray(e)) {
      const l = [], s = i && Array.isArray(i);
      if (He(l, e, i, o))
        return E(() => i = Pt(t, l, i, r, !0)), () => i;
      if (l.length === 0) {
        if (i = Tt(t, i, r), a) return i;
      } else s ? i.length === 0 ? Li(t, l, r) : ho(t, i, l) : (i && Tt(t), Li(t, l));
      i = l;
    } else if (e.nodeType) {
      if (Array.isArray(i)) {
        if (a) return i = Tt(t, i, r, e);
        Tt(t, i, null, e);
      } else i == null || i === "" || !t.firstChild ? t.appendChild(e) : t.replaceChild(e, t.firstChild);
      i = e;
    }
  }
  return i;
}
function He(t, e, i, r) {
  let o = !1;
  for (let n = 0, a = e.length; n < a; n++) {
    let l = e[n], s = i && i[t.length], c;
    if (!(l == null || l === !0 || l === !1)) if ((c = typeof l) == "object" && l.nodeType)
      t.push(l);
    else if (Array.isArray(l))
      o = He(t, l, s) || o;
    else if (c === "function")
      if (r) {
        for (; typeof l == "function"; ) l = l();
        o = He(
          t,
          Array.isArray(l) ? l : [l],
          Array.isArray(s) ? s : [s]
        ) || o;
      } else
        t.push(l), o = !0;
    else {
      const M = String(l);
      s && s.nodeType === 3 && s.data === M ? t.push(s) : t.push(document.createTextNode(M));
    }
  }
  return o;
}
function Li(t, e, i = null) {
  for (let r = 0, o = e.length; r < o; r++) t.insertBefore(e[r], i);
}
function Tt(t, e, i, r) {
  if (i === void 0) return t.textContent = "";
  const o = r || document.createTextNode("");
  if (e.length) {
    let n = !1;
    for (let a = e.length - 1; a >= 0; a--) {
      const l = e[a];
      if (o !== l) {
        const s = l.parentNode === t;
        !n && !a ? s ? t.replaceChild(o, l) : t.insertBefore(o, i) : s && l.remove();
      } else n = !0;
    }
  } else t.insertBefore(o, i);
  return [o];
}
const Eo = "http://www.w3.org/2000/svg";
function vo(t, e = !1) {
  return e ? document.createElementNS(Eo, t) : document.createElement(t);
}
function Oo(t, e) {
  const i = p(t);
  return p(() => {
    const r = i();
    switch (typeof r) {
      case "function":
        return Y(() => r(e));
      case "string":
        const o = xo.has(r), n = vo(r, o);
        return po(n, e, o), n;
    }
  });
}
function qe(t) {
  const [, e] = rr(t, ["component"]);
  return Oo(() => t.component, e);
}
function ko(t) {
  const e = Object.keys(t), i = {};
  for (let r = 0; r < e.length; r++) {
    const [o, n] = k(t[e[r]]);
    Object.defineProperty(i, e[r], {
      get: o,
      set(a) {
        n(() => a);
      }
    });
  }
  return i;
}
function Yo(t) {
  if (t.assignedSlot && t.assignedSlot._$owner) return t.assignedSlot._$owner;
  let e = t.parentNode;
  for (; e && !e._$owner && !(e.assignedSlot && e.assignedSlot._$owner); )
    e = e.parentNode;
  return e && e.assignedSlot ? e.assignedSlot._$owner : t._$owner;
}
function Qo(t) {
  return (e, i) => {
    const { element: r } = i;
    return ee((o) => {
      const n = ko(e);
      r.addPropertyChangedCallback((l, s) => n[l] = s), r.addReleaseCallback(() => {
        r.renderRoot.textContent = "", o();
      });
      const a = t(n, i);
      return y(r.renderRoot, a);
    }, Yo(r));
  };
}
function Uo(t, e, i) {
  return arguments.length === 2 && (i = e, e = {}), Kr(t, e)(Qo(i));
}
var Le = [
  // Vike
  {
    category: "Frontend Framework",
    label: "Vike",
    flag: "vike",
    image: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaGFtbWVyIiB3aWR0aD0iNDcuMjE3IiBoZWlnaHQ9IjQ3LjIxNyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSItNTAgLTUwIDQ3LjIxNyA0Ny4yMTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzAuMjksLTIxLjMpIj4KICA8ZyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICA8cGF0aCBkPSJtLTguNTExLTEwLjQ0OSAxLjEyNiA0LjA2NCAyLjcwNy0yLjc2NXoiIGZpbGw9IiNhYmFiYWIiLz4KICAgPHBhdGggZD0ibS0yLjI3My0yNC40OTYtNi4yMzggMTQuMDQ3IDMuODMzIDEuMjk5IDYuMjM4LTE0LjA0OHoiIGZpbGw9IiM5NDk0OTQiLz4KICAgPHBhdGggZD0ibS0yLjI3My0yNC40OTYgMy40NjUtMS4yMDQuMzY4IDIuNTAyeiIgZmlsbD0iI2FiYWJhYiIvPgogICA8cGF0aCBkPSJtMTcuNTExIDQuNjc0LTIuNzA3IDIuNzY2LTIyLjE4OS0xMy44MjUgMi43MDctMi43NjV6IiBmaWxsPSIjOTQ5NDk0Ii8+CiAgPC9nPgogIDxnIHN0cm9rZT0iIzgyODI4MiI+CiAgIDxwYXRoIGQ9Im0tMTAuNTI2IDIzLjcwNS0xLjE3IDIuNjM0IiBzdHJva2Utd2lkdGg9IjkuNiIvPgogICA8cGF0aCBkPSJtLTEzLjg5OSAyNi41MjhjLTEuODUxLTEuMTUzLTIuMzI2LTIuMTMzLTEuMDg3LTIuMjM5IDEuMjQtLjEwNiAzLjY0My43MDkgNS40OTQgMS44NjIgMS44NSAxLjE1MyAyLjMyNiAyLjEzMiAxLjA4NiAyLjIzOC0xLjIzOS4xMDYtMy42NDItLjcwOC01LjQ5My0xLjg2MSIgZmlsbD0iIzgyODI4MiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgIDxwYXRoIGQ9Im0tMTIuNzMgMjMuODk0YzEuODUxIDEuMTUzIDQuMjU1IDEuOTY3IDUuNDk0IDEuODYxcy43NjQtMS4wODUtMS4wODctMi4yMzhjLTEuODUtMS4xNTMtNC4yNTQtMS45NjctNS40OTMtMS44NjEtMS4yNC4xMDYtLjc2NCAxLjA4NSAxLjA4NiAyLjIzOCIgZmlsbD0iIzgyODI4MiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgPC9nPgogIDxnIHN0cm9rZT0iIzdhN2E3YSI+CiAgIDxwYXRoIGQ9Im0tOS44NDQgMjIuMTY5LS4zOS44NzgiIHN0cm9rZS13aWR0aD0iOS4xIi8+CiAgIDxwYXRoIGQ9Im0tMTIuNDM3IDIzLjIzNWMtMS44NTEtMS4xNTMtMi4zMjYtMi4xMzItMS4wODctMi4yMzggMS4yNC0uMTA2IDMuNjQzLjcwOCA1LjQ5NCAxLjg2MSAxLjg1IDEuMTUzIDIuMzI2IDIuMTMzIDEuMDg2IDIuMjM5LTEuMjM5LjEwNi0zLjY0Mi0uNzA5LTUuNDkzLTEuODYyIiBmaWxsPSIjN2E3YTdhIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjUiLz4KICAgPHBhdGggZD0ibS0xMi4wNDcgMjIuMzU3YzEuODUgMS4xNTMgNC4yNTQgMS45NjggNS40OTMgMS44NjIgMS4yNC0uMTA2Ljc2NC0xLjA4Ni0xLjA4Ny0yLjIzOS0xLjg1LTEuMTUzLTQuMjU0LTEuOTY3LTUuNDkzLTEuODYxcy0uNzY0IDEuMDg1IDEuMDg3IDIuMjM4IiBmaWxsPSIjN2E3YTdhIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjUiLz4KICA8L2c+CiAgPGcgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KICAgPHBhdGggZD0ibS0xNi43MS05Ljc0OCA4LjE5OS0uNzAxIDEuMTI2IDQuMDY0LTguMTk5LjcwMXoiIGZpbGw9IiM5NDk0OTQiLz4KICAgPHBhdGggZD0ibTIzLjc0OS05LjM3My02LjIzOCAxNC4wNDctMjIuMTg5LTEzLjgyNCA2LjIzOC0xNC4wNDh6IiBmaWxsPSIjNzU3NTc1Ii8+CiAgIDxwYXRoIGQ9Im0xMC4yNzEtMTYuMDczIDMuNzUxIDMuNTM0Yy4wNjIuMDU4LjA4My4xNTYuMDUyLjIzOGwtMS45NSA1LjEyOGMtLjA0Ni4xMjEtLjE4LjE1My0uMjY4LjA2NWwtMS4wMjQtMS4wM2MtLjA5NS0uMDk2LS4yNDItLjA0OC0uMjc1LjA5MWwtLjUxNiAyLjE1MmMtLjAzNC4xNDUtLjE5MS4xOS0uMjg0LjA4MiAwIDAtLjYwNi0uNjk2LS42MDYtLjY5Ni0uMDk0LS4xMDgtLjI1LS4wNjMtLjI4NS4wODJsLS44MDMgMy4zODRjLS4wNS4yMTItLjMxNy4xNzgtLjMzNi0uMDQzbC0uMDE0LS4xNDdzLjA1OC05Ljg5Mi4wNTgtOS44OTJjLjAwMS0uMTY1LjE2NS0uMjUzLjI3Ny0uMTQ4bDEuMDc3IDEuMDA5Yy4xMDEuMDk1LjI1LjAzNC4yNzQtLjExMWwuNTk3LTMuNTg3Yy4wMjUtLjE0Ni4xNzQtLjIwNi4yNzUtLjExMXoiIGZpbGw9IiNmYmJmMjgiIHN0cm9rZT0iI2ZiYmYyOCIgc3Ryb2tlLXdpZHRoPSIuNiIvPgogICA8cGF0aCBkPSJtLTE2LjcxLTkuNzQ4IDguMTk5LS43MDEgNi4yMzgtMTQuMDQ3LTguMTk5LjcwMXoiIGZpbGw9IiM3NTc1NzUiLz4KICA8L2c+CiAgPHBhdGggZD0ibS0xLjc1NCAzLjk1MS03Ljk5MiAxNy45OTgiIHN0cm9rZT0iIzkxNTEyYiIgc3Ryb2tlLXdpZHRoPSI4LjYiLz4KICA8ZyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICA8cGF0aCBkPSJtLTExLjk1IDIyLjEzOGMtMS44NTEtMS4xNTMtMi4zMjYtMi4xMzItMS4wODctMi4yMzggMS4yNC0uMTA2IDMuNjQzLjcwOCA1LjQ5NCAxLjg2MXMyLjMyNiAyLjEzMiAxLjA4NyAyLjIzOGMtMS4yNC4xMDYtMy42NDMtLjcwOC01LjQ5NC0xLjg2MSIgZmlsbD0iIzkxNTEyYiIvPgogICA8cGF0aCBkPSJtLTMuOTU4IDQuMTM5YzEuODUxIDEuMTUzIDQuMjU0IDEuOTY4IDUuNDk0IDEuODYyIDEuMjM5LS4xMDYuNzY0LTEuMDg2LTEuMDg3LTIuMjM5cy00LjI1NC0xLjk2Ny01LjQ5My0xLjg2MWMtMS4yNC4xMDYtLjc2NCAxLjA4NSAxLjA4NiAyLjIzOCIgZmlsbD0iIzkxNTEyYiIvPgogICA8cGF0aCBkPSJtMS4xOTItMjUuNy4zNjggMi41MDIgMjIuMTg5IDEzLjgyNS0uMzY4LTIuNTAzeiIgZmlsbD0iIzk0OTQ5NCIvPgogICA8cGF0aCBkPSJtLTEwLjQ3Mi0yMy43OTUgOC4xOTktLjcwMSAzLjQ2NS0xLjIwNC04LjE5OS43MDF6IiBmaWxsPSIjOTQ5NDk0Ii8+CiAgPC9nPgogIDxnIHN0cm9rZT0iIzZlNmU2ZSI+CiAgIDxwYXRoIGQ9Im0tLjQ4NyAxLjA5Ny0xLjE3IDIuNjM0IiBzdHJva2Utd2lkdGg9IjkuMSIvPgogICA8cGF0aCBkPSJtLTMuODYgMy45MmMtMS44NTEtMS4xNTMtMi4zMjYtMi4xMzItMS4wODctMi4yMzhzMy42NDMuNzA4IDUuNDkzIDEuODYxYzEuODUxIDEuMTUzIDIuMzI3IDIuMTMyIDEuMDg3IDIuMjM4LTEuMjM5LjEwNi0zLjY0My0uNzA4LTUuNDkzLTEuODYxIiBmaWxsPSIjNmU2ZTZlIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjUiLz4KICAgPHBhdGggZD0ibS0yLjY5MSAxLjI4NmMxLjg1MSAxLjE1MyA0LjI1NCAxLjk2NyA1LjQ5NCAxLjg2MSAxLjIzOS0uMTA2Ljc2NC0xLjA4NS0xLjA4Ny0yLjIzOHMtNC4yNTQtMS45NjctNS40OTMtMS44NjFjLTEuMjQuMTA2LS43NjQgMS4wODUgMS4wODYgMi4yMzgiIGZpbGw9IiM2ZTZlNmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIuNSIvPgogIDwvZz4KICA8ZyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICA8cGF0aCBkPSJtMTguMjY5IDYuMjM2LTMuNDY1IDEuMjA0IDIuNzA3LTIuNzY2eiIgZmlsbD0iI2FiYWJhYiIvPgogICA8cGF0aCBkPSJtMTQuODA0IDcuNDQtOC4xOTkuNzAxLTIyLjE4OS0xMy44MjUgOC4xOTktLjcwMXoiIGZpbGw9IiM3NTc1NzUiLz4KICAgPHBhdGggZD0ibS0xNi43MS05Ljc0OCAxLjEyNiA0LjA2NC0uMzY3LTIuNTAyeiIgZmlsbD0iI2FiYWJhYiIvPgogICA8cGF0aCBkPSJtMjQuNTA3LTcuODEyLTYuMjM4IDE0LjA0OC0uNzU4LTEuNTYyIDYuMjM4LTE0LjA0N3oiIGZpbGw9IiM5NDk0OTQiLz4KICAgPHBhdGggZD0ibS0xMC40NzItMjMuNzk1LTYuMjM4IDE0LjA0Ny43NTkgMS41NjIgNi4yMzctMTQuMDQ4eiIgZmlsbD0iIzk0OTQ5NCIvPgogICA8cGF0aCBkPSJtMjQuNTA3LTcuODEyLTEuMTI2LTQuMDY0LjM2OCAyLjUwM3oiIGZpbGw9IiNhYmFiYWIiLz4KICAgPHBhdGggZD0ibTIzLjM4MS0xMS44NzYtOC4xOTkuNzAxLTIyLjE4OS0xMy44MjQgOC4xOTktLjcwMXoiIGZpbGw9IiM3NTc1NzUiLz4KICAgPHBhdGggZD0ibS0xMC40NzItMjMuNzk1IDMuNDY1LTEuMjA0LTIuNzA3IDIuNzY1eiIgZmlsbD0iI2FiYWJhYiIvPgogICA8cGF0aCBkPSJtMTguMjY5IDYuMjM2LTguMTk5LjcwMS0zLjQ2NSAxLjIwNCA4LjE5OS0uNzAxeiIgZmlsbD0iIzk0OTQ5NCIvPgogICA8cGF0aCBkPSJtLTE1Ljk1MS04LjE4Ni4zNjcgMi41MDIgMjIuMTg5IDEzLjgyNS0uMzY3LTIuNTAzeiIgZmlsbD0iIzk0OTQ5NCIvPgogICA8cGF0aCBkPSJtMTguMjY5IDYuMjM2LTguMTk5LjcwMSA2LjIzOC0xNC4wNDggOC4xOTktLjcwMXoiIGZpbGw9IiM3NTc1NzUiLz4KICAgPHBhdGggZD0ibS05LjcxNC0yMi4yMzQtNi4yMzcgMTQuMDQ4IDIyLjE4OSAxMy44MjQgNi4yMzctMTQuMDQ3eiIgZmlsbD0iIzc1NzU3NSIvPgogICA8cGF0aCBkPSJtMi41NDUtMTIuNzktNC41ODMtMS42NTljLS4wNzYtLjAyNy0uMTU2LjAwOC0uMTk1LjA4NSAwIDAtMi40NjMgNC44MDgtMi40NjMgNC44MDgtLjA1OC4xMTQtLjAwNS4yNjMuMTA3LjI5OGwxLjI5Ni40MTZjLjEyMi4wMzkuMTcxLjIxLjA5My4zMjEgMCAwLTEuMjA1IDEuNzIyLTEuMjA1IDEuNzIyLS4wODEuMTE2LS4wMjQuMjk0LjEwNS4zMjVsLjgyNy4xOTZjLjEyOC4wMzEuMTg2LjIwOS4xMDQuMzI1IDAgMC0xLjg5OSAyLjcwMS0xLjg5OSAyLjcwMS0uMTE4LjE2OS4wNTYuNDEuMjIuMzA0bC4xMS0uMDcgNi44NDktNS42NjFjLjExNS0uMDk1LjA4My0uMzA0LS4wNTQtLjM1NGwtMS4zMTItLjQ4Yy0uMTIzLS4wNDUtLjE2NS0uMjI0LS4wNzgtLjMzMSAwIDAgMi4xNTctMi42MTUgMi4xNTctMi42MTUuMDg3LS4xMDYuMDQ1LS4yODYtLjA3OS0uMzMxeiIgZmlsbD0iI2ZiYmYyOCIgc3Ryb2tlPSIjZmJiZjI4IiBzdHJva2Utd2lkdGg9Ii42Ii8+CiAgIDxwYXRoIGQ9Im0yNC41MDctNy44MTItOC4xOTkuNzAxLTEuMTI2LTQuMDY0IDguMTk5LS43MDF6IiBmaWxsPSIjOTQ5NDk0Ii8+CiAgIDxwYXRoIGQ9Im0xNS4xODItMTEuMTc1LTIuNzA3IDIuNzY2LTIyLjE4OS0xMy44MjUgMi43MDctMi43NjV6IiBmaWxsPSIjOTQ5NDk0Ii8+CiAgIDxwYXRoIGQ9Im0xMC4wNyA2LjkzNy0zLjQ2NSAxLjIwNC0uMzY3LTIuNTAzeiIgZmlsbD0iI2FiYWJhYiIvPgogICA8cGF0aCBkPSJtMTYuMzA4LTcuMTExLTYuMjM4IDE0LjA0OC0zLjgzMi0xLjI5OSA2LjIzNy0xNC4wNDd6IiBmaWxsPSIjOTQ5NDk0Ii8+CiAgIDxwYXRoIGQ9Im0xNi4zMDgtNy4xMTEtMS4xMjYtNC4wNjQtMi43MDcgMi43NjZ6IiBmaWxsPSIjYWJhYmFiIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K",
    url: "https://vike.dev",
    tagline: "Flexible, lean, reliable, community-driven, fast Vite-based frontend framework",
    repo: "vikejs/vike",
    links: [
      {
        label: "Docs",
        href: "https://vike.dev"
      },
      {
        label: "FAQ",
        href: "https://vike.dev/faq"
      }
    ],
    invisibleCli: !0,
    readonly: !0
  },
  // UI Framework
  {
    category: "UI Framework",
    label: "React",
    flag: "react",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxLjEzZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDIyOCI+PHBhdGggZmlsbD0iIzAwRDhGRiIgZD0iTTIxMC40ODMgNzMuODI0YTE3MS40OSAxNzEuNDkgMCAwIDAtOC4yNC0yLjU5N2MuNDY1LTEuOS44OTMtMy43NzcgMS4yNzMtNS42MjFjNi4yMzgtMzAuMjgxIDIuMTYtNTQuNjc2LTExLjc2OS02Mi43MDhjLTEzLjM1NS03LjctMzUuMTk2LjMyOS01Ny4yNTQgMTkuNTI2YTE3MS4yMyAxNzEuMjMgMCAwIDAtNi4zNzUgNS44NDhhMTU1Ljg2NiAxNTUuODY2IDAgMCAwLTQuMjQxLTMuOTE3QzEwMC43NTkgMy44MjkgNzcuNTg3LTQuODIyIDYzLjY3MyAzLjIzM0M1MC4zMyAxMC45NTcgNDYuMzc5IDMzLjg5IDUxLjk5NSA2Mi41ODhhMTcwLjk3NCAxNzAuOTc0IDAgMCAwIDEuODkyIDguNDhjLTMuMjguOTMyLTYuNDQ1IDEuOTI0LTkuNDc0IDIuOThDMTcuMzA5IDgzLjQ5OCAwIDk4LjMwNyAwIDExMy42NjhjMCAxNS44NjUgMTguNTgyIDMxLjc3OCA0Ni44MTIgNDEuNDI3YTE0NS41MiAxNDUuNTIgMCAwIDAgNi45MjEgMi4xNjVhMTY3LjQ2NyAxNjcuNDY3IDAgMCAwLTIuMDEgOS4xMzhjLTUuMzU0IDI4LjItMS4xNzMgNTAuNTkxIDEyLjEzNCA1OC4yNjZjMTMuNzQ0IDcuOTI2IDM2LjgxMi0uMjIgNTkuMjczLTE5Ljg1NWExNDUuNTY3IDE0NS41NjcgMCAwIDAgNS4zNDItNC45MjNhMTY4LjA2NCAxNjguMDY0IDAgMCAwIDYuOTIgNi4zMTRjMjEuNzU4IDE4LjcyMiA0My4yNDYgMjYuMjgyIDU2LjU0IDE4LjU4NmMxMy43MzEtNy45NDkgMTguMTk0LTMyLjAwMyAxMi40LTYxLjI2OGExNDUuMDE2IDE0NS4wMTYgMCAwIDAtMS41MzUtNi44NDJjMS42Mi0uNDggMy4yMS0uOTc0IDQuNzYtMS40ODhjMjkuMzQ4LTkuNzIzIDQ4LjQ0My0yNS40NDMgNDguNDQzLTQxLjUyYzAtMTUuNDE3LTE3Ljg2OC0zMC4zMjYtNDUuNTE3LTM5Ljg0NFptLTYuMzY1IDcwLjk4NGMtMS40LjQ2My0yLjgzNi45MS00LjMgMS4zNDVjLTMuMjQtMTAuMjU3LTcuNjEyLTIxLjE2My0xMi45NjMtMzIuNDMyYzUuMTA2LTExIDkuMzEtMjEuNzY3IDEyLjQ1OS0zMS45NTdjMi42MTkuNzU4IDUuMTYgMS41NTcgNy42MSAyLjRjMjMuNjkgOC4xNTYgMzguMTQgMjAuMjEzIDM4LjE0IDI5LjUwNGMwIDkuODk2LTE1LjYwNiAyMi43NDMtNDAuOTQ2IDMxLjE0Wm0tMTAuNTE0IDIwLjgzNGMyLjU2MiAxMi45NCAyLjkyNyAyNC42NCAxLjIzIDMzLjc4N2MtMS41MjQgOC4yMTktNC41OSAxMy42OTgtOC4zODIgMTUuODkzYy04LjA2NyA0LjY3LTI1LjMyLTEuNC00My45MjctMTcuNDEyYTE1Ni43MjYgMTU2LjcyNiAwIDAgMS02LjQzNy01Ljg3YzcuMjE0LTcuODg5IDE0LjQyMy0xNy4wNiAyMS40NTktMjcuMjQ2YzEyLjM3Ni0xLjA5OCAyNC4wNjgtMi44OTQgMzQuNjcxLTUuMzQ1YTEzNC4xNyAxMzQuMTcgMCAwIDEgMS4zODYgNi4xOTNaTTg3LjI3NiAyMTQuNTE1Yy03Ljg4MiAyLjc4My0xNC4xNiAyLjg2My0xNy45NTUuNjc1Yy04LjA3NS00LjY1Ny0xMS40MzItMjIuNjM2LTYuODUzLTQ2Ljc1MmExNTYuOTIzIDE1Ni45MjMgMCAwIDEgMS44NjktOC40OTljMTAuNDg2IDIuMzIgMjIuMDkzIDMuOTg4IDM0LjQ5OCA0Ljk5NGM3LjA4NCA5Ljk2NyAxNC41MDEgMTkuMTI4IDIxLjk3NiAyNy4xNWExMzQuNjY4IDEzNC42NjggMCAwIDEtNC44NzcgNC40OTJjLTkuOTMzIDguNjgyLTE5Ljg4NiAxNC44NDItMjguNjU4IDE3Ljk0Wk01MC4zNSAxNDQuNzQ3Yy0xMi40ODMtNC4yNjctMjIuNzkyLTkuODEyLTI5Ljg1OC0xNS44NjNjLTYuMzUtNS40MzctOS41NTUtMTAuODM2LTkuNTU1LTE1LjIxNmMwLTkuMzIyIDEzLjg5Ny0yMS4yMTIgMzcuMDc2LTI5LjI5M2MyLjgxMy0uOTggNS43NTctMS45MDUgOC44MTItMi43NzNjMy4yMDQgMTAuNDIgNy40MDYgMjEuMzE1IDEyLjQ3NyAzMi4zMzJjLTUuMTM3IDExLjE4LTkuMzk5IDIyLjI0OS0xMi42MzQgMzIuNzkyYTEzNC43MTggMTM0LjcxOCAwIDAgMS02LjMxOC0xLjk3OVptMTIuMzc4LTg0LjI2Yy00LjgxMS0yNC41ODctMS42MTYtNDMuMTM0IDYuNDI1LTQ3Ljc4OWM4LjU2NC00Ljk1OCAyNy41MDIgMi4xMTEgNDcuNDYzIDE5LjgzNWExNDQuMzE4IDE0NC4zMTggMCAwIDEgMy44NDEgMy41NDVjLTcuNDM4IDcuOTg3LTE0Ljc4NyAxNy4wOC0yMS44MDggMjYuOTg4Yy0xMi4wNCAxLjExNi0yMy41NjUgMi45MDgtMzQuMTYxIDUuMzA5YTE2MC4zNDIgMTYwLjM0MiAwIDAgMS0xLjc2LTcuODg3Wm0xMTAuNDI3IDI3LjI2OGEzNDcuOCAzNDcuOCAwIDAgMC03Ljc4NS0xMi44MDNjOC4xNjggMS4wMzMgMTUuOTk0IDIuNDA0IDIzLjM0MyA0LjA4Yy0yLjIwNiA3LjA3Mi00Ljk1NiAxNC40NjUtOC4xOTMgMjIuMDQ1YTM4MS4xNTEgMzgxLjE1MSAwIDAgMC03LjM2NS0xMy4zMjJabS00NS4wMzItNDMuODYxYzUuMDQ0IDUuNDY1IDEwLjA5NiAxMS41NjYgMTUuMDY1IDE4LjE4NmEzMjIuMDQgMzIyLjA0IDAgMCAwLTMwLjI1Ny0uMDA2YzQuOTc0LTYuNTU5IDEwLjA2OS0xMi42NTIgMTUuMTkyLTE4LjE4Wk04Mi44MDIgODcuODNhMzIzLjE2NyAzMjMuMTY3IDAgMCAwLTcuMjI3IDEzLjIzOGMtMy4xODQtNy41NTMtNS45MDktMTQuOTgtOC4xMzQtMjIuMTUyYzcuMzA0LTEuNjM0IDE1LjA5My0yLjk3IDIzLjIwOS0zLjk4NGEzMjEuNTI0IDMyMS41MjQgMCAwIDAtNy44NDggMTIuODk3Wm04LjA4MSA2NS4zNTJjLTguMzg1LS45MzYtMTYuMjkxLTIuMjAzLTIzLjU5My0zLjc5M2MyLjI2LTcuMyA1LjA0NS0xNC44ODUgOC4yOTgtMjIuNmEzMjEuMTg3IDMyMS4xODcgMCAwIDAgNy4yNTcgMTMuMjQ2YzIuNTk0IDQuNDggNS4yOCA4Ljg2OCA4LjAzOCAxMy4xNDdabTM3LjU0MiAzMS4wM2MtNS4xODQtNS41OTItMTAuMzU0LTExLjc3OS0xNS40MDMtMTguNDMzYzQuOTAyLjE5MiA5Ljg5OS4yOSAxNC45NzguMjljNS4yMTggMCAxMC4zNzYtLjExNyAxNS40NTMtLjM0M2MtNC45ODUgNi43NzQtMTAuMDE4IDEyLjk3LTE1LjAyOCAxOC40ODZabTUyLjE5OC01Ny44MTdjMy40MjIgNy44IDYuMzA2IDE1LjM0NSA4LjU5NiAyMi41MmMtNy40MjIgMS42OTQtMTUuNDM2IDMuMDU4LTIzLjg4IDQuMDcxYTM4Mi40MTcgMzgyLjQxNyAwIDAgMCA3Ljg1OS0xMy4wMjZhMzQ3LjQwMyAzNDcuNDAzIDAgMCAwIDcuNDI1LTEzLjU2NVptLTE2Ljg5OCA4LjEwMWEzNTguNTU3IDM1OC41NTcgMCAwIDEtMTIuMjgxIDE5LjgxNWEzMjkuNCAzMjkuNCAwIDAgMS0yMy40NDQuODIzYy03Ljk2NyAwLTE1LjcxNi0uMjQ4LTIzLjE3OC0uNzMyYTMxMC4yMDIgMzEwLjIwMiAwIDAgMS0xMi41MTMtMTkuODQ2aC4wMDFhMzA3LjQxIDMwNy40MSAwIDAgMS0xMC45MjMtMjAuNjI3YTMxMC4yNzggMzEwLjI3OCAwIDAgMSAxMC44OS0yMC42MzdsLS4wMDEuMDAxYTMwNy4zMTggMzA3LjMxOCAwIDAgMSAxMi40MTMtMTkuNzYxYzcuNjEzLS41NzYgMTUuNDItLjg3NiAyMy4zMS0uODc2SDEyOGM3LjkyNiAwIDE1Ljc0My4zMDMgMjMuMzU0Ljg4M2EzMjkuMzU3IDMyOS4zNTcgMCAwIDEgMTIuMzM1IDE5LjY5NWEzNTguNDg5IDM1OC40ODkgMCAwIDEgMTEuMDM2IDIwLjU0YTMyOS40NzIgMzI5LjQ3MiAwIDAgMS0xMSAyMC43MjJabTIyLjU2LTEyMi4xMjRjOC41NzIgNC45NDQgMTEuOTA2IDI0Ljg4MSA2LjUyIDUxLjAyNmMtLjM0NCAxLjY2OC0uNzMgMy4zNjctMS4xNSA1LjA5Yy0xMC42MjItMi40NTItMjIuMTU1LTQuMjc1LTM0LjIzLTUuNDA4Yy03LjAzNC0xMC4wMTctMTQuMzIzLTE5LjEyNC0yMS42NC0yNy4wMDhhMTYwLjc4OSAxNjAuNzg5IDAgMCAxIDUuODg4LTUuNGMxOC45LTE2LjQ0NyAzNi41NjQtMjIuOTQxIDQ0LjYxMi0xOC4zWk0xMjggOTAuODA4YzEyLjYyNSAwIDIyLjg2IDEwLjIzNSAyMi44NiAyMi44NnMtMTAuMjM1IDIyLjg2LTIyLjg2IDIyLjg2cy0yMi44Ni0xMC4yMzUtMjIuODYtMjIuODZzMTAuMjM1LTIyLjg2IDIyLjg2LTIyLjg2WiIvPjwvc3ZnPg==",
    url: "https://react.dev",
    spectrum: "beaten_path",
    tagline: "The library for web and native user interfaces",
    repo: "facebook/react",
    selected: !0,
    links: [
      {
        label: "Learn",
        href: "https://react.dev/learn"
      },
      {
        label: "Docs",
        href: "https://react.dev/reference/react"
      }
    ]
  },
  {
    category: "UI Framework",
    label: "Vue",
    flag: "vue",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxLjE2ZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDIyMSI+PHBhdGggZmlsbD0iIzQxQjg4MyIgZD0iTTIwNC44IDBIMjU2TDEyOCAyMjAuOEwwIDBoOTcuOTJMMTI4IDUxLjJMMTU3LjQ0IDBoNDcuMzZaIi8+PHBhdGggZmlsbD0iIzQxQjg4MyIgZD0ibTAgMGwxMjggMjIwLjhMMjU2IDBoLTUxLjJMMTI4IDEzMi40OEw1MC41NiAwSDBaIi8+PHBhdGggZmlsbD0iIzM1NDk1RSIgZD0iTTUwLjU2IDBMMTI4IDEzMy4xMkwyMDQuOCAwaC00Ny4zNkwxMjggNTEuMkw5Ny45MiAwSDUwLjU2WiIvPjwvc3ZnPg==",
    url: "https://vuejs.org",
    tagline: "The Progressive JavaScript Framework",
    repo: "vuejs/core",
    links: [
      {
        label: "Quick start",
        href: "https://vuejs.org/guide/quick-start.html"
      },
      {
        label: "Examples",
        href: "https://vuejs.org/examples/#hello-world"
      },
      {
        label: "API",
        href: "https://vuejs.org/api/"
      }
    ]
  },
  {
    category: "UI Framework",
    label: "SolidJS",
    flag: "solid",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxLjA4ZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIyNTYgMjM5IDI1NiAyMzkiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0ibG9nb3NTb2xpZGpzSWNvbjAiIHgxPSIyNy41IiB4Mj0iMTUyIiB5MT0iMyIgeTI9IjYzLjUiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQ5LjU2IDIzMy4xMikgc2NhbGUoMS42MTAwNikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4xIiBzdG9wLWNvbG9yPSIjNzZiM2UxIi8+PHN0b3Agb2Zmc2V0PSIuMyIgc3RvcC1jb2xvcj0iI2RjZjJmZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzc2YjNlMSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJsb2dvc1NvbGlkanNJY29uMSIgeDE9Ijk1LjgiIHgyPSI3NCIgeTE9IjMyLjYiIHkyPSIxMDUuMiIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgyNDkuNTYgMjMzLjEyKSBzY2FsZSgxLjYxMDA2KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzc2YjNlMSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM0Mzc3YmIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxZjNiNzciLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ibG9nb3NTb2xpZGpzSWNvbjIiIHgxPSIxOC40IiB4Mj0iMTQ0LjMiIHkxPSI2NC4yIiB5Mj0iMTQ5LjgiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQ5LjU2IDIzMy4xMikgc2NhbGUoMS42MTAwNikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMzMTVhYTkiLz48c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjNTE4YWM4Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMzE1YWE5Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImxvZ29zU29saWRqc0ljb24zIiB4MT0iNzUuMiIgeDI9IjI0LjQiIHkxPSI3NC41IiB5Mj0iMjYwLjgiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQ5LjU2IDIzMy4xMikgc2NhbGUoMS42MTAwNikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM0Mzc3YmIiLz48c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjMWEzMzZiIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMWEzMzZiIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZmlsbD0iIzc2YjNlMSIgZD0iTTUxMiAyODkuNDcycy04NS4zMzMtNjIuNzkxLTE1MS4zNDctNDguMzAxbC00LjgyOSAxLjYxYy05LjY2IDMuMjIxLTE3LjcxMSA4LjA1LTIyLjU0MiAxNC40OTFsLTMuMjE5IDQuODI5bC0yNC4xNTIgNDEuODYybDQxLjg2MyA4LjA1MWMxNy43MSAxMS4yNyA0MC4yNTEgMTYuMTAxIDYxLjE4MiAxMS4yN2w3NC4wNjMgMTQuNDkxTDUxMiAyODkuNDcyWiIvPjxwYXRoIGZpbGw9InVybCgjbG9nb3NTb2xpZGpzSWNvbjApIiBkPSJNNTEyIDI4OS40NzJzLTg1LjMzMy02Mi43OTEtMTUxLjM0Ny00OC4zMDFsLTQuODI5IDEuNjFjLTkuNjYgMy4yMjEtMTcuNzExIDguMDUtMjIuNTQyIDE0LjQ5MWwtMy4yMTkgNC44MjlsLTI0LjE1MiA0MS44NjJsNDEuODYzIDguMDUxYzE3LjcxIDExLjI3IDQwLjI1MSAxNi4xMDEgNjEuMTgyIDExLjI3bDc0LjA2MyAxNC40OTFMNTEyIDI4OS40NzJaIiBvcGFjaXR5PSIuMyIvPjxwYXRoIGZpbGw9IiM1MThhYzgiIGQ9Im0zMzMuMjgyIDI4OS40NzJsLTYuNDM5IDEuNjExYy0yNy4zNzEgOC4wNS0zNS40MjEgMzMuODExLTIwLjkzMiA1Ni4zNTJjMTYuMTAxIDIwLjkzMSA0OS45MTMgMzIuMjAxIDc3LjI4NCAyNC4xNTFsOTkuODI0LTMzLjgxMXMtODUuMzM0LTYyLjc5Mi0xNDkuNzM3LTQ4LjMwM1oiLz48cGF0aCBmaWxsPSJ1cmwoI2xvZ29zU29saWRqc0ljb24xKSIgZD0ibTMzMy4yODIgMjg5LjQ3MmwtNi40MzkgMS42MTFjLTI3LjM3MSA4LjA1LTM1LjQyMSAzMy44MTEtMjAuOTMyIDU2LjM1MmMxNi4xMDEgMjAuOTMxIDQ5LjkxMyAzMi4yMDEgNzcuMjg0IDI0LjE1MWw5OS44MjQtMzMuODExcy04NS4zMzQtNjIuNzkyLTE0OS43MzctNDguMzAzWiIgb3BhY2l0eT0iLjMiLz48cGF0aCBmaWxsPSJ1cmwoI2xvZ29zU29saWRqc0ljb24yKSIgZD0iTTQ2NS4zMDggMzYxLjkyNWMtMTguNDM5LTIzLjAzNi00OS4wMDgtMzIuNTg4LTc3LjI4My0yNC4xNWwtOTkuODIzIDMyLjIwMUwyNTYgNDI2LjMyOGwxODAuMzI3IDMwLjU5MmwzMi4yMDEtNTcuOTYzYzYuNDQxLTExLjI3MSA0LjgzMS0yNC4xNS0zLjIyLTM3LjAzMloiLz48cGF0aCBmaWxsPSJ1cmwoI2xvZ29zU29saWRqc0ljb24zKSIgZD0iTTQzMy4xMDYgNDE4LjI3N2MtMTguNDM5LTIzLjAzNi00OS4wMDYtMzIuNTg4LTc3LjI4Mi0yNC4xNUwyNTYgNDI2LjMyOHM4NS4zMzMgNjQuNDAyIDE1MS4zNDYgNDguMzAzbDQuODMtMS42MTJjMjcuMzcxLTguMDQ5IDM3LjAzMS0zMy44MSAyMC45My01NC43NDJaIi8+PC9zdmc+",
    url: "https://www.solidjs.com",
    spectrum: "bleeding_edge",
    tagline: "Simple and performant reactivity for building user interfaces",
    repo: "solidjs/solid",
    links: [
      {
        label: "Getting started",
        href: "https://www.solidjs.com/guides/getting-started"
      },
      {
        label: "Examples",
        href: "https://www.solidjs.com/examples"
      },
      {
        label: "API",
        href: "https://www.solidjs.com/docs/latest/api"
      }
    ]
  },
  // CSS
  {
    category: "CSS",
    label: "TailwindCSS",
    flag: "tailwindcss",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxLjY3ZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDE1NCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJsb2dvc1RhaWx3aW5kY3NzSWNvbjAiIHgxPSItMi43NzglIiB4Mj0iMTAwJSIgeTE9IjMyJSIgeTI9IjY3LjU1NiUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMyMjk4QkQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwRUQ3QjUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2xvZ29zVGFpbHdpbmRjc3NJY29uMCkiIGQ9Ik0xMjggMEM5My44NjcgMCA3Mi41MzMgMTcuMDY3IDY0IDUxLjJDNzYuOCAzNC4xMzMgOTEuNzMzIDI3LjczMyAxMDguOCAzMmM5LjczNyAyLjQzNCAxNi42OTcgOS40OTkgMjQuNDAxIDE3LjMxOEMxNDUuNzUxIDYyLjA1NyAxNjAuMjc1IDc2LjggMTkyIDc2LjhjMzQuMTMzIDAgNTUuNDY3LTE3LjA2NyA2NC01MS4yYy0xMi44IDE3LjA2Ny0yNy43MzMgMjMuNDY3LTQ0LjggMTkuMmMtOS43MzctMi40MzQtMTYuNjk3LTkuNDk5LTI0LjQwMS0xNy4zMThDMTc0LjI0OSAxNC43NDMgMTU5LjcyNSAwIDEyOCAwWk02NCA3Ni44QzI5Ljg2NyA3Ni44IDguNTMzIDkzLjg2NyAwIDEyOGMxMi44LTE3LjA2NyAyNy43MzMtMjMuNDY3IDQ0LjgtMTkuMmM5LjczNyAyLjQzNCAxNi42OTcgOS40OTkgMjQuNDAxIDE3LjMxOEM4MS43NTEgMTM4Ljg1NyA5Ni4yNzUgMTUzLjYgMTI4IDE1My42YzM0LjEzMyAwIDU1LjQ2Ny0xNy4wNjcgNjQtNTEuMmMtMTIuOCAxNy4wNjctMjcuNzMzIDIzLjQ2Ny00NC44IDE5LjJjLTkuNzM3LTIuNDM0LTE2LjY5Ny05LjQ5OS0yNC40MDEtMTcuMzE4QzExMC4yNDkgOTEuNTQzIDk1LjcyNSA3Ni44IDY0IDc2LjhaIi8+PC9zdmc+",
    url: "https://tailwindcss.com",
    spectrum: "beaten_path",
    tagline: "Rapidly build modern websites without ever leaving your HTML",
    repo: "tailwindlabs/tailwindcss",
    links: [
      {
        label: "Docs",
        href: "https://tailwindcss.com/docs/installation"
      }
    ]
  },
  {
    category: "CSS",
    label: "Compiled",
    flag: "compiled-css",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFf0lEQVR4nLSaXWzbVBvHz3OOncRJnY926vp27Uu7Tm3Vsi7hsxpDRahjrMAFEqsYlAk6IQECpF2ttEwwGBLccAE3fAmhCfEhJK4AiQ+BGGKirJuYhoRg68pKV5bSZCEfrpPYMXLSpE5iJ3ZyciRfxD5+nud3nuc5/9ouc/fjh1Ajhgxc09Kmx76QCL+5Y/WNMbu0Mt8IP7gRRtXxj/uuo0lb560y8fauuseONcpPQwDW2I6BqGv46fzvhGNon8i0DzbCV0MAQvyeFxBgpnACEAnzo9ON8EUdQGTa+wTH4L2l5+Pc0HiSae2h7Y86wNWmkUMIdOwCZkL87hna/qgCyMDxcaf/QaPrcS4wQTsLVAGizuvHFWCbDCcAZkP8nc/T9EkVIMb5x6vNiXP+/SLTPkDLJzUAGTiXaOsaqToREAm57zhCyy81AMHWvQsBtpuZu64LVLJADUC0b91penI2C3uP0vBLD4DdErAyP8EN3rfGdgzV65caQJpp7bN6z9Wm2w/X65cKgIIAScTzf6v30VBnKgASuLwIsMPyjRTUmU4GsM1d671xLvCQyLRZLr/8oAKQAYep7VN3qFlw167OVABAScn13F+PLlACkBL1GahdnakAMBkhXK+NXBas94JlgEi6ZehvsXNMUQA2jKTSkFkLWrVVNGp8arMEEJW8vScje0+djo58fjY2/JqibFyzSavnrTovHXHO/4BVXbAEsCBuPwyY2DDG6LK47cmLwsAT+Wu29PKvVmzpjhp0wTSAIPOdQalnAgCj7IEB/S5c96paUup1R2pprpaYS4fVpzbTAAupwDMIGBtgjDAGpGYBMLGfS+x8U+0HLnXhRM1Ra0f2qc18FkwBJDKe7mCmbxJng1cD3zgSmZbhS2L/pF0KnidS5EJdwa8PK+psCuBP6cYjCBh7Lujc6mth5pOBY3KG5ZrEc5/WHT2yps5VARIZX88q6psoDTp/qL9l4NoWU/0HeeHMB1QALKhzVYC/lJtnAAibX31t4AUYwOhyevApLnXpLJu+QqWZzapzRQBB8V4Tgv4Jo9LJB6/+TiJ3b0jesssXP/E6FQCT6lwRYBkPTyFMWKPSKT2/Im3b7xbmPiTyvwtUCEyosyGAiDwdIXztI0aB51d/4zygkNJ1DyhS2hf7/hUqACbU2RBgmdwyhXBu58Ga8ikEDtos5HpDAldnQvH1eBM/vkfk2BIVgirqrAsggrcjzO44qA2utOZLM5PPTkxpuwmjdNIX+/ZlKgBV1FkX4Ipt5FnAjKNazeudF1DLdtWGN3HybSLR6gXjd6plACLe1B2x+Sd1gwa9oIu3VhH5tuYMp1PNsa9fpAJQ4Z1qGUDQcds0rO88heDUstEtHShrbAm7NudteYTZ40SK1P1ndnYY6EIRgIg3dUUd/gNFwYFRves3tvb1Okay3Bz75iUqAAbqXASw6hqdzv29vx4c6DdqGZAmOwizRGvTI8y+z0iRP6gQ6GShAJAkrd0xZ+Bh/T3eXAOrBwNyotiBmoWvnqMCoPPFswAQ4ken1NovXVH9oMGwsW0grJQ69QizH7Pplfqf2FC5OmcBUqS5Pe4MHMg1K6my0pUb246iF8t9Koov/h1Fdd54p5oFCPO7pxAQB4C65aoHyX7mNax3w8bGyImCv+g5dQtzHzFShM6/G2jUGadI8/+izhseLboOCOECiEHpGGSHlxd/0POJkSz5KO5IeXXGIX7PjLr6uqBqRrKrTQwbWwvDKaE5hxJeNHKq6gIjhX+jQrCuzjjO7bi/4jzQguiXVf5cS/rMO5VsZXek6JfUPrPGOf8+7BZOvYsQqvpytrg/SNkuxWWCPzUn545Xs+NZO/0Jl5z/rN7gFYQyvPDzW/8FAAD//wWcstmJqV1FAAAAAElFTkSuQmCC",
    url: "https://compiledcssinjs.com",
    tagline: "A familiar and performant compile time CSS-in-JS library for React.",
    repo: "atlassian-labs/compiled",
    links: [
      {
        label: "Docs",
        href: "https://compiledcssinjs.com/docs/"
      }
    ]
  },
  {
    category: "CSS",
    label: "PandaCSS",
    flag: "panda-css",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHNoYXBlLXJlbmRlcmluZz0nZ2VvbWV0cmljUHJlY2lzaW9uJyB0ZXh0LXJlbmRlcmluZz0nZ2VvbWV0cmljUHJlY2lzaW9uJyBpbWFnZS1yZW5kZXJpbmc9J29wdGltaXplUXVhbGl0eScgZmlsbC1ydWxlPSdldmVub2RkJyBjbGlwLXJ1bGU9J2V2ZW5vZGQnIHZpZXdCb3g9JzAgMCA1MDcgNTEyLjMzJz48ZyBmaWxsLXJ1bGU9J25vbnplcm8nPjxwYXRoIGZpbGw9JyNGNkU0NTgnIGQ9J00wIDU4LjdDMCAyNi4yOCAyNi4yOCAwIDU4LjcxIDBoMzg5LjU4QzQ4MC43MiAwIDUwNyAyNi4yOCA1MDcgNTguN3YzOTQuOTNjMCAzMi40Mi0yNi4yOCA1OC43LTU4LjcxIDU4LjdINTguNzFDMjYuMjggNTEyLjMzIDAgNDg2LjA1IDAgNDUzLjYzVjU4Ljd6Jy8+PHBhdGggZD0nTTMyNC45MSAxMTQuNTJjLTI3Ljk4LTguMDQtNTYuNTEtOS4xMy04NS41OC02LjUyLTE2LjI3IDEuNjgtMzEuOTIgNC45MS00Ny4wMSAxMC41OC0zMi42MSAxMi4yNS01Ny4wOSAzMy40Ni03MS42OSA2NS40MS0xMC40NyAyMi45LTE0LjI1IDQ3LjIzLTE0LjY1IDcyLjE5LS40MiAyNi4zOCAyLjg5IDUyLjQgOC4xNCA3OC4xOSA0Ljc2IDIzLjM4IDExLjExIDQ2LjI5IDIwLjE2IDY4LjQyLjg2IDIuMSAxLjkzIDIuODEgNC4yMyAyLjggMjguNjQtLjA1IDU3LjI4LS4wNSA4NS45Mi0uMDUgOC40OCAwIDE2Ljk1IDAgMjUuNDQtLjAxLjY1IDAgMS4zLS4wNCAyLjA0LS4wOC4zOC0uMDEuNzktLjA0IDEuMjMtLjA2LS4xNy0uNC0uMzItLjc4LS40Ny0xLjE0LS4yOC0uNjktLjUzLTEuMy0uOC0xLjg4LTIuMDctNC40NC00LjE5LTguODQtNi4zMS0xMy4yNS00LjU4LTkuNTgtOS4xNi0xOS4xNS0xMy4zMS0yOC45LTEyLjU4LTI5LjU5LTIyLjIxLTYwLjA2LTI1LjE1LTkyLjMxLTEuMy0xNC4yMy0xLjExLTI4LjM3IDIuODMtNDIuMjQgNC41Mi0xNS44NSAxNC4yLTI3LjA0IDMwLjI1LTMxLjcxIDE0Ljc1LTQuMyAyOS43LTQuMjcgNDQuMzUuNDcgMTMuMDkgNC4yMyAyMS42MyAxMy4xNyAyNS4yNiAyNi41NiAyLjc4IDEwLjI3IDIuNzggMjAuNjYuNjcgMzEuMDItMS42MiA3Ljk4LTQuODkgMTUuMjYtMTAuNzcgMjEuMDktMTAuNTYgMTAuNDUtMjMuNzQgMTIuODUtMzcuODggMTIuMDUtMi41Mi0uMTQtNS4wMy0uNDItNy42MS0uNzEtMS4yMS0uMTMtMi40NC0uMjYtMy42OS0uMzkuMDQuNDEuMDUuNzcuMDggMS4xMi4wMy42OC4wNiAxLjI2LjIgMS44My42IDIuNDIgMS4xOCA0Ljg1IDEuNzUgNy4yOCAxLjM5IDUuODYgMi43NyAxMS43MiA0LjU1IDE3LjQ1IDMuNDkgMTEuMjcgNy41NSAyMi4yNSAxMi4xNiAzMi45OCAzMi44Mi0yLjU2IDYzLjA2LTEwLjcyIDk1LjE1LTI5Ljk4LjQ4LS4zLjkyLS41OCAxLjM2LS44NSAxMy43OS04LjU5IDI0Ljk0LTE5LjcyIDMyLjY0LTM0LjA5IDEyLjQ2LTIzLjI4IDE0Ljg5LTQ4LjE3IDExLjE4LTczLjg3LTMuODItMjYuNTItMTUuNzItNDguNzgtMzYuMi02Ni4yNC0xNC4yMS0xMi4xMS0zMC42NC0yMC4wNC00OC40Ny0yNS4xNnonLz48L2c+PC9zdmc+",
    url: "https://panda-css.com/",
    tagline: "Write type-safe styles with ease using panda",
    repo: "chakra-ui/panda",
    links: [
      {
        label: "Docs",
        href: "https://panda-css.com/docs/overview/getting-started"
      }
    ]
  },
  // UI Component Libraries
  {
    category: "UI Component Libraries",
    label: "daisyUI",
    flag: "daisyui",
    dependsOn: ["tailwindcss"],
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzInIGhlaWdodD0nMzInIHZpZXdCb3g9JzAgMCA0MTUgNDE1JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHg9JzgyLjUnIHk9JzI5MCcgd2lkdGg9JzI1MCcgaGVpZ2h0PScxMjUnIHJ4PSc2Mi41JyBmaWxsPScjMUFEMUE1Jz48L3JlY3Q+PGNpcmNsZSBjeD0nMjA3LjUnIGN5PScxMzUnIHI9JzEzMCcgZmlsbD0nYmxhY2snIGZpbGwtb3BhY2l0eT0nLjMnPjwvY2lyY2xlPjxjaXJjbGUgY3g9JzIwNy41JyBjeT0nMTM1JyByPScxMjUnIGZpbGw9J3doaXRlJz48L2NpcmNsZT48Y2lyY2xlIGN4PScyMDcuNScgY3k9JzEzNScgcj0nNTYnIGZpbGw9JyNGRjk5MDMnPjwvY2lyY2xlPjwvc3ZnPg==",
    url: "https://daisyui.com",
    tagline: "The most popular component library for Tailwind CSS",
    repo: "saadeghi/daisyui",
    links: [
      {
        label: "Docs",
        href: "https://daisyui.com/docs/use/"
      }
    ]
  },
  {
    category: "UI Component Libraries",
    label: "shadcn/ui",
    flag: "shadcn-ui",
    dependsOn: ["tailwindcss", "react"],
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiBjbGFzcz0iaC02IHctNiI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgyNTZ2MjU2SDB6Ii8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxNiIgZD0ibTIwOCAxMjgtODAgODBtNjQtMTY4TDQwIDE5MiIvPjwvc3ZnPg==",
    url: "https://ui.shadcn.com",
    tagline: "Beautifully designed components that you can copy and paste into your apps.",
    repo: "shadcn-ui/ui",
    links: [
      {
        label: "Docs",
        href: "https://ui.shadcn.com/docs"
      }
    ]
  },
  {
    category: "UI Component Libraries",
    label: "Mantine",
    flag: "mantine",
    dependsOn: ["react"],
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxNjMgMTYzIj48cGF0aCBmaWxsPSIjMzM5QUYwIiBkPSJNMTYyLjE2MiA4MS41YzAtNDUuMDExLTM2LjMwMS04MS41LTgxLjA4LTgxLjVDMzYuMzAxIDAgMCAzNi40ODkgMCA4MS41IDAgMTI2LjUxIDM2LjMwMSAxNjMgODEuMDgxIDE2M3M4MS4wODEtMzYuNDkgODEuMDgxLTgxLjUiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNjUuOTgzIDQzLjA0OWE2LjIzIDYuMjMgMCAwIDAtLjMzNiA2Ljg4NCA2LjEgNi4xIDAgMCAwIDEuNjE4IDEuNzg2YzkuNDQ0IDcuMDM2IDE0Ljg2NiAxNy43OTQgMTQuODY2IDI5LjUycy01LjQyMiAyMi40ODQtMTQuODY2IDI5LjUyYTYuMiA2LjIgMCAwIDAtMS42MTYgMS43ODYgNi4yIDYuMiAwIDAgMC0uNjk0IDQuNjkzIDYuMiA2LjIgMCAwIDAgMS4wMjggMi4xODYgNi4xNSA2LjE1IDAgMCAwIDYuNDU3IDIuMzE5IDYuMiA2LjIgMCAwIDAgMi4xNzctMS4wMzUgNTAgNTAgMCAwIDAgNy45NDctNy4zOWgxNy40OTNjMy40MDYgMCA2LjE3NC0yLjc3MiA2LjE3NC02LjE5NHMtMi43NjItNi4xOTQtNi4xNzQtNi4xOTRoLTkuNjU1YTQ5LjIgNDkuMiAwIDAgMCA0LjA3MS0xOS42OSA0OS4yIDQ5LjIgMCAwIDAtNC4wNy0xOS42OTJoOS42NmMzLjQwNiAwIDYuMTczLTIuNzcxIDYuMTczLTYuMTk0cy0yLjc2Mi02LjE5My02LjE3My02LjE5M0g4Mi41NzRhNTAgNTAgMCAwIDAtNy45NTItNy4zOTcgNi4xNSA2LjE1IDAgMCAwLTQuNTc4LTEuMTUzIDYuMiA2LjIgMCAwIDAtNC4wNTUgMi40Mzh6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNTYuMjM2IDc5LjM5MWE5LjMgOS4zIDAgMCAxIC42MzItMy42MDggOS4zIDkuMyAwIDAgMSAxLjk2Ny0zLjA3NyA5LjEgOS4xIDAgMCAxIDIuOTk0LTIuMDYzIDkuMDYgOS4wNiAwIDAgMSA3LjEwMyAwIDkuMTUgOS4xNSAwIDAgMSAyLjk5NSAyLjA2MyA5LjMgOS4zIDAgMCAxIDEuOTY3IDMuMDc3IDkuMzQgOS4zNCAwIDAgMS0yLjEyNSAxMC4wMDMgOS4xIDkuMSAwIDAgMS02LjM4OCAyLjYzIDkuMSA5LjEgMCAwIDEtNi4zOS0yLjYzIDkuMyA5LjMgMCAwIDEtMi43NTUtNi4zOTUiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==",
    url: "https://mantine.dev",
    tagline: "A fully featured React components library.",
    repo: "mantinedev/mantine",
    links: [
      {
        label: "Docs",
        href: "https://mantine.dev/getting-started/"
      }
    ]
  },
  // Auth
  {
    category: "Auth",
    label: "Auth.js",
    flag: "authjs",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0iIzg4ODg4OCIgZD0ibTUwLjAyNyAxMC40NTlsLS4wMTgtLjAzMmwtMzMuNjA2IDE5LjQwNGwuMDc2LjEzMnYyMi44OTNoLjAxNGMuMjg2IDE5LjExMSAxNC44NTkgMzQuNzU1IDMzLjUxOSAzNi43MThjMTguNjYtMS45NjIgMzMuMjM0LTE3LjYwNiAzMy41MTktMzYuNzE4VjI5Ljk1M2wuMDY2LS4xMTRsLTMzLjU3LTE5LjM4em0tLjAxNSA2OS4wOTdWNTEuNjc3SDI2LjQzNVYzNS42NTFMNTAuMDEyIDIyLjA0djI5LjYzN2gyMy41NjN2MS4xNzloLjAxN2MtLjI3OCAxMy41OTMtMTAuNDM5IDI0Ljc5OC0yMy41OCAyNi43eiIvPjwvc3ZnPg==",
    url: "https://authjs.dev",
    spectrum: "bleeding_edge",
    tagline: "Authentication for the Web",
    repo: "nextauthjs/next-auth",
    links: [
      {
        label: "Getting started",
        href: "https://authjs.dev/getting-started/introduction"
      },
      {
        label: "API",
        href: "https://authjs.dev/reference"
      }
    ]
  },
  {
    category: "Auth",
    label: "Auth0",
    flag: "auth0",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIwLjllbSIgaGVpZ2h0PSIxZW0iIHZpZXdCb3g9IjAgMCAyNTYgMjg1Ij48cGF0aCBkPSJNMjIwLjQxMiAwaC05Mi40MTVsMjguNTYyIDg5LjAwNmg5Mi40MTZsLTc0Ljc3IDUzLjA3N2wyOC41NyA4OS41MTFjNDguMTI4LTM1LjA2IDYzLjg1NC04OC4xMiA0Ni4yMDgtMTQyLjU4OEwyMjAuNDEzIDBaTTcuMDE4IDg5LjAwNmg5Mi40MTZMMTI3Ljk5NyAwSDM1LjU4OUw3LjAxOSA4OS4wMDZjLTE3LjY1NSA1NC40NjgtMS45MiAxMDcuNTI5IDQ2LjIwNyAxNDIuNTg4bDI4LjU2My04OS41MWwtNzQuNzctNTMuMDc4Wm00Ni4yMDggMTQyLjU4OGw3NC43NyA1Mi45N2w3NC43Ny01Mi45N2wtNzQuNzctNTMuODQ3bC03NC43NyA1My44NDdaIi8+PC9zdmc+",
    url: "https://auth0.com",
    tagline: "Secure access for everyone. But not just anyone.",
    repo: "nextauthjs/next-auth",
    links: [
      {
        label: "Auth0 doc",
        href: "https://auth0.com/docs"
      },
      {
        label: "Auth.js auth0 provider doc",
        href: "https://authjs.dev/reference/core/providers/auth0"
      }
    ]
  },
  {
    category: "Auth",
    label: "Firebase",
    flag: "firebase-auth",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIwLjczZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDM1MSI+PGRlZnM+PGZpbHRlciBpZD0ibG9nb3NGaXJlYmFzZTAiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiIHg9Ii01MCUiIHk9Ii01MCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dCbHVySW5uZXIxIiBzdGREZXZpYXRpb249IjE3LjUiLz48ZmVPZmZzZXQgaW49InNoYWRvd0JsdXJJbm5lcjEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0SW5uZXIxIi8+PGZlQ29tcG9zaXRlIGluPSJzaGFkb3dPZmZzZXRJbm5lcjEiIGluMj0iU291cmNlQWxwaGEiIGsyPSItMSIgazM9IjEiIG9wZXJhdG9yPSJhcml0aG1ldGljIiByZXN1bHQ9InNoYWRvd0lubmVySW5uZXIxIi8+PGZlQ29sb3JNYXRyaXggaW49InNoYWRvd0lubmVySW5uZXIxIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMDYgMCIvPjwvZmlsdGVyPjxmaWx0ZXIgaWQ9ImxvZ29zRmlyZWJhc2UxIiB3aWR0aD0iMjAwJSIgaGVpZ2h0PSIyMDAlIiB4PSItNTAlIiB5PSItNTAlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPjxmZUdhdXNzaWFuQmx1ciBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93Qmx1cklubmVyMSIgc3RkRGV2aWF0aW9uPSIzLjUiLz48ZmVPZmZzZXQgZHg9IjEiIGR5PSItOSIgaW49InNoYWRvd0JsdXJJbm5lcjEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0SW5uZXIxIi8+PGZlQ29tcG9zaXRlIGluPSJzaGFkb3dPZmZzZXRJbm5lcjEiIGluMj0iU291cmNlQWxwaGEiIGsyPSItMSIgazM9IjEiIG9wZXJhdG9yPSJhcml0aG1ldGljIiByZXN1bHQ9InNoYWRvd0lubmVySW5uZXIxIi8+PGZlQ29sb3JNYXRyaXggaW49InNoYWRvd0lubmVySW5uZXIxIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMDkgMCIvPjwvZmlsdGVyPjxwYXRoIGlkPSJsb2dvc0ZpcmViYXNlMiIgZD0ibTEuMjUzIDI4MC43MzJsMS42MDUtMy4xMzFsOTkuMzUzLTE4OC41MThsLTQ0LjE1LTgzLjQ3NUM1NC4zOTItMS4yODMgNDUuMDc0LjQ3NCA0My44NyA4LjE4OEwxLjI1MyAyODAuNzMyWiIvPjxwYXRoIGlkPSJsb2dvc0ZpcmViYXNlMyIgZD0ibTEzNC40MTcgMTQ4Ljk3NGwzMi4wMzktMzIuODEybC0zMi4wMzktNjEuMDA3Yy0zLjA0Mi01Ljc5MS0xMC40MzMtNi4zOTgtMTMuNDQzLS41OWwtMTcuNzA1IDM0LjEwOWwtLjUzIDEuNzQ0bDMxLjY3OCA1OC41NTZaIi8+PC9kZWZzPjxwYXRoIGZpbGw9IiNGRkMyNEEiIGQ9Im0wIDI4Mi45OThsMi4xMjMtMi45NzJMMTAyLjUyNyA4OS41MTJsLjIxMi0yLjAxN0w1OC40OCA0LjM1OEM1NC43Ny0yLjYwNiA0NC4zMy0uODQ1IDQzLjExNCA2Ljk1MUwwIDI4Mi45OThaIi8+PHVzZSBmaWxsPSIjRkZBNzEyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGhyZWY9IiNsb2dvc0ZpcmViYXNlMiIvPjx1c2UgZmlsdGVyPSJ1cmwoI2xvZ29zRmlyZWJhc2UwKSIgaHJlZj0iI2xvZ29zRmlyZWJhc2UyIi8+PHBhdGggZmlsbD0iI0Y0QkQ2MiIgZD0ibTEzNS4wMDUgMTUwLjM4bDMyLjk1NS0zMy43NWwtMzIuOTY1LTYyLjkzYy0zLjEyOS01Ljk1Ny0xMS44NjYtNS45NzUtMTQuOTYyIDBMMTAyLjQyIDg3LjI4N3YyLjg2bDMyLjU4NCA2MC4yMzNaIi8+PHVzZSBmaWxsPSIjRkZBNTBFIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGhyZWY9IiNsb2dvc0ZpcmViYXNlMyIvPjx1c2UgZmlsdGVyPSJ1cmwoI2xvZ29zRmlyZWJhc2UxKSIgaHJlZj0iI2xvZ29zRmlyZWJhc2UzIi8+PHBhdGggZmlsbD0iI0Y2ODIwQyIgZD0ibTAgMjgyLjk5OGwuOTYyLS45NjhsMy40OTYtMS40MmwxMjguNDc3LTEyOGwxLjYyOC00LjQzMWwtMzIuMDUtNjEuMDc0eiIvPjxwYXRoIGZpbGw9IiNGREUwNjgiIGQ9Im0xMzkuMTIxIDM0Ny41NTFsMTE2LjI3NS02NC44NDdsLTMzLjIwNC0yMDQuNDk1Yy0xLjAzOS02LjM5OC04Ljg4OC04LjkyNy0xMy40NjgtNC4zNEwwIDI4Mi45OThsMTE1LjYwOCA2NC41NDhhMjQuMTI2IDI0LjEyNiAwIDAgMCAyMy41MTMuMDA1Ii8+PHBhdGggZmlsbD0iI0ZDQ0EzRiIgZD0iTTI1NC4zNTQgMjgyLjE2TDIyMS40MDIgNzkuMjE4Yy0xLjAzLTYuMzUtNy41NTgtOC45NzctMTIuMTAzLTQuNDI0TDEuMjkgMjgyLjZsMTE0LjMzOSA2My45MDhhMjMuOTQzIDIzLjk0MyAwIDAgMCAyMy4zMzQuMDA2bDExNS4zOTItNjQuMzU1WiIvPjxwYXRoIGZpbGw9IiNFRUFCMzciIGQ9Ik0xMzkuMTIgMzQ1LjY0YTI0LjEyNiAyNC4xMjYgMCAwIDEtMjMuNTEyLS4wMDVMLjkzMSAyODIuMDE1bC0uOTMuOTgzbDExNS42MDcgNjQuNTQ4YTI0LjEyNiAyNC4xMjYgMCAwIDAgMjMuNTEzLjAwNWwxMTYuMjc1LTY0Ljg0N2wtLjI4NS0xLjc1MmwtMTE1Ljk5IDY0LjY4OVoiLz48L3N2Zz4=",
    url: "https://firebase.google.com",
    tagline: "Firebase Authentication aims to make building secure authentication systems easy, while improving the sign-in and onboarding experience for end users",
    links: [
      {
        label: "Getting started",
        href: "https://firebase.google.com/docs/web/setup"
      },
      {
        label: "API",
        href: "https://firebase.google.com/docs/reference"
      }
    ]
  },
  {
    category: "Auth",
    label: "Lucia",
    flag: "lucia-auth",
    image: "data:image/svg+xml;base64,PHN2ZyBpZD0nV2Fyc3R3YV8xJyBkYXRhLW5hbWU9J1dhcnN0d2EgMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgdmlld0JveD0nMCAwIDIwMDAgMjAwMCc+PHBhdGggZmlsbD0nIzVmNTdmZicgZD0nbTE2NDcuNjYsMTY3My4zNkwxMDAwLDcyLjczLDM1Mi4zNCwxNjczLjM2bC0xMDIuNzQsMjUzLjkxaDE1MDAuOGwtMTAyLjc0LTI1My45MVptLTY0Ny42Ni01NDlsLTQ0Mi44Miw1NDUuMzksOTkuNTUtMjQ2LjA0LDM0My4yNy04NDguMzUsMzQzLjI2LDg0OC4zNSw5OS41NSwyNDYuMDQtNDQyLjgxLTU0NS4zOVonIC8+PC9zdmc+",
    url: "https://lucia-auth.com",
    spectrum: "bleeding_edge",
    tagline: "Lucia is an auth library for your server that abstracts away the complexity of handling sessions",
    links: [
      {
        label: "Getting started",
        href: "https://lucia-auth.com/getting-started/"
      },
      {
        label: "API reference",
        href: "https://lucia-auth.com/reference/main/"
      }
    ]
  },
  // RPC
  {
    category: "Data fetching",
    label: "Telefunc",
    flag: "telefunc",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDcuMDIiIGhlaWdodD0iNDcuMDIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDQ3LjAyIDQ3LjAyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPGNpcmNsZSBjeD0iMjMuNTEiIGN5PSIyMy41MSIgcj0iMjEuOTUiIGZpbGw9IiNmN2UwMTgiIHN0cm9rZT0iIzMxMzQzZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIzLjEyIiBzdHlsZT0icGFpbnQtb3JkZXI6bm9ybWFsIi8+CiA8ZyB0cmFuc2Zvcm09Im1hdHJpeCguOTU1MDMgMCAwIC45NTUwMyAuMzQ0MDUgMS4wMTE3KSIgZmlsbD0iIzMxMzQzZCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIj4KICA8cGF0aCBkPSJtMjEuODA0IDEzLjkxMyA2LjQzMzMgOS42NDU4LTYuNDMzMyA5LjY0NDFoNS44ODI0bDMuNDkzLTUuMjM1MiAzLjQ5MTMgNS4yMzUyaDUuODgyNGwtMTIuODY3LTE5LjI5eiIgY29sb3I9IiMwMDAwMDAiIGNvbG9yLXJlbmRlcmluZz0iYXV0byIgZG9taW5hbnQtYmFzZWxpbmU9ImF1dG8iIGltYWdlLXJlbmRlcmluZz0iYXV0byIgc29saWQtY29sb3I9IiMwMDAwMDAiIHN0eWxlPSJmb250LWZlYXR1cmUtc2V0dGluZ3M6bm9ybWFsO2ZvbnQtdmFyaWFudC1hbHRlcm5hdGVzOm5vcm1hbDtmb250LXZhcmlhbnQtY2Fwczpub3JtYWw7Zm9udC12YXJpYW50LWxpZ2F0dXJlczpub3JtYWw7Zm9udC12YXJpYW50LW51bWVyaWM6bm9ybWFsO2ZvbnQtdmFyaWFudC1wb3NpdGlvbjpub3JtYWw7aXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO3NoYXBlLXBhZGRpbmc6MDt0ZXh0LWRlY29yYXRpb24tY29sb3I6IzAwMDAwMDt0ZXh0LWRlY29yYXRpb24tbGluZTpub25lO3RleHQtZGVjb3JhdGlvbi1zdHlsZTpzb2xpZDt0ZXh0LWluZGVudDowO3RleHQtb3JpZW50YXRpb246bWl4ZWQ7dGV4dC10cmFuc2Zvcm06bm9uZTt3aGl0ZS1zcGFjZTpub3JtYWwiLz4KICA8cGF0aCBkPSJtMTQuODgyIDEzLjkxMyA2LjQzMzMgOS42NDU4LTYuNDMzMyA5LjY0NDFoNS44ODI0YzIuMDg1NS0zLjI5MTEgNC4wNDUyLTYuMjk1OSA2LjIyMjEtOS45NjE4bC02LjIyMjEtOS4zMjgxeiIgY29sb3I9IiMwMDAwMDAiIGNvbG9yLXJlbmRlcmluZz0iYXV0byIgZG9taW5hbnQtYmFzZWxpbmU9ImF1dG8iIGZpbGwtb3BhY2l0eT0iLjU3MzE1IiBpbWFnZS1yZW5kZXJpbmc9ImF1dG8iIHNvbGlkLWNvbG9yPSIjMDAwMDAwIiBzdHlsZT0iZm9udC1mZWF0dXJlLXNldHRpbmdzOm5vcm1hbDtmb250LXZhcmlhbnQtYWx0ZXJuYXRlczpub3JtYWw7Zm9udC12YXJpYW50LWNhcHM6bm9ybWFsO2ZvbnQtdmFyaWFudC1saWdhdHVyZXM6bm9ybWFsO2ZvbnQtdmFyaWFudC1udW1lcmljOm5vcm1hbDtmb250LXZhcmlhbnQtcG9zaXRpb246bm9ybWFsO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtzaGFwZS1wYWRkaW5nOjA7dGV4dC1kZWNvcmF0aW9uLWNvbG9yOiMwMDAwMDA7dGV4dC1kZWNvcmF0aW9uLWxpbmU6bm9uZTt0ZXh0LWRlY29yYXRpb24tc3R5bGU6c29saWQ7dGV4dC1pbmRlbnQ6MDt0ZXh0LW9yaWVudGF0aW9uOm1peGVkO3RleHQtdHJhbnNmb3JtOm5vbmU7d2hpdGUtc3BhY2U6bm9ybWFsIi8+CiAgPHBhdGggZD0ibTcuOTYwNCAxMy45MTMgNi40MzMzIDkuNjQ1OC02LjQzMzMgOS42NDQxaDUuODgyNGMyLjA4NTUtMy4yOTExIDQuMDQ1Mi02LjI5NTkgNi4yMjIxLTkuOTYxOGwtNi4yMjIxLTkuMzI4MXoiIGNvbG9yPSIjMDAwMDAwIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGRvbWluYW50LWJhc2VsaW5lPSJhdXRvIiBmaWxsLW9wYWNpdHk9Ii4yNzY1NSIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIiBzb2xpZC1jb2xvcj0iIzAwMDAwMCIgc3R5bGU9ImZvbnQtZmVhdHVyZS1zZXR0aW5nczpub3JtYWw7Zm9udC12YXJpYW50LWFsdGVybmF0ZXM6bm9ybWFsO2ZvbnQtdmFyaWFudC1jYXBzOm5vcm1hbDtmb250LXZhcmlhbnQtbGlnYXR1cmVzOm5vcm1hbDtmb250LXZhcmlhbnQtbnVtZXJpYzpub3JtYWw7Zm9udC12YXJpYW50LXBvc2l0aW9uOm5vcm1hbDtpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7c2hhcGUtcGFkZGluZzowO3RleHQtZGVjb3JhdGlvbi1jb2xvcjojMDAwMDAwO3RleHQtZGVjb3JhdGlvbi1saW5lOm5vbmU7dGV4dC1kZWNvcmF0aW9uLXN0eWxlOnNvbGlkO3RleHQtaW5kZW50OjA7dGV4dC1vcmllbnRhdGlvbjptaXhlZDt0ZXh0LXRyYW5zZm9ybTpub25lO3doaXRlLXNwYWNlOm5vcm1hbCIvPgogPC9nPgo8L3N2Zz4K",
    url: "https://telefunc.com",
    tagline: "Remote Functions. Instead of API",
    repo: "brillout/telefunc",
    spectrum: "bleeding_edge"
  },
  {
    category: "Data fetching",
    label: "tRPC",
    flag: "trpc",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIwLjg0ZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDMwNSI+PHBhdGggZmlsbD0iIzM5OENDQiIgZD0iTTI4LjU3IDI0NC40ODRoMjEuOTgydjExLjE1M0gyOC41NzF2MjUuMzA4YTE2Ljg4IDE2Ljg4IDAgMCAwIC43MzggNS4zNjRhOC4xNTIgOC4xNTIgMCAwIDAgMi4wODggMy40YTcuODE1IDcuODE1IDAgMCAwIDMuMyAxLjg1MWMxLjIzNS4zMyAyLjUwNC41MSAzLjc4LjUzNmwuNTQ3LjAwMmMxLjE1IDAgMi4zMzggMCAzLjU2My0uMTYybC43MjctLjA5bDEuNDA5LS4xNmMuNDYxLS4wNTQuOTE1LS4xMTMgMS4zNjYtLjE4OGwuNjYtLjEwNWwxLjI0LS4xODRjLjQwMS0uMDYuNzktLjEyNCAxLjE3NS0uMTk5bC45MTgtLjE4NGwuNDI3LS4wOWwuNzktLjE3NmwuMzY2LS4wODdsMS40NzYgMTAuMzlhMTguNTA1IDE4LjUwNSAwIDAgMS0zLjc1MiAxLjZhMzUuOSAzNS45IDAgMCAxLTQuNTEzIDEuMTEzYy0xLjYuMy0zLjI2NC41MjYtNS4wMDIuNjg4YTU0LjI4IDU0LjI4IDAgMCAxLTUuMDg5LjIzOGEyOC4zOTYgMjguMzk2IDAgMCAxLTguNzUyLTEuMjVhMTYuODMgMTYuODMgMCAwIDEtNi43MjctNC4wMDJhMTcuMzQzIDE3LjM0MyAwIDAgMS00LjMwMi02Ljg1MmEyOS4xOTYgMjkuMTk2IDAgMCAxLTEuNTI1LTEwLjAwM3YtMjYuNzU4SDB2LTExLjE1M2gxMy40NDF2LTE0LjQxN2gxNS4xM3YxNC40MTdabTUzLjg4IDI5LjI3MXYyOS42MDlINjcuMTU2di03OS4yMzZoMjYuNjJhNDIuNTIgNDIuNTIgMCAwIDEgMTEuOTE2IDEuNTVhMjYuNjcgMjYuNjcgMCAwIDEgOS4xNCA0LjU1MmExOS44OCAxOS44OCAwIDAgMSA1Ljc5IDcuNTAyYTI0LjU3IDI0LjU3IDAgMCAxIDIuMDUgMTAuMzRhMjYuNzIgMjYuNzIgMCAwIDEtMS4wMTIgNy42NGEyMC4zMzEgMjAuMzMxIDAgMCAxLTcuNDAzIDEwLjgwNGEzMC4wOTYgMzAuMDk2IDAgMCAxLTUuOTAxIDMuNDg4bDE3LjAzIDMyLjY5N3YuNzEzaC0xNi40NDNMOTQuMDQgMjczLjc1NUg4Mi40NVptLjAxMi0xMi40MjhoMTEuMzE1YTE3Ljg2OCAxNy44NjggMCAwIDAgNi4yNTItMWExMC44NjYgMTAuODY2IDAgMCAwIDQuMzktMi45MTRhMTAuNTI4IDEwLjUyOCAwIDAgMCAyLjExMi0zLjU4OWMuNDQ4LTEuMzU4LjY5Mi0yLjc3NS43MjMtNC4yMDNsLjAwMi0uNTM2YTE1LjEwNCAxNS4xMDQgMCAwIDAtLjk1LTUuNTc2YTkuODY1IDkuODY1IDAgMCAwLTIuODUtNC4wMDFhMTIuMDY2IDEyLjA2NiAwIDAgMC00LjE0LTIuMTc2YTE5LjE0MyAxOS4xNDMgMCAwIDAtNC45Ny0uNzZsLTExLjg4NC0uMDAzdjI0Ljc1OFptNjcuODQ1IDQyLjAzN0gxMzUuMDR2LTc5LjIzNmgyNy4wOTVhMzQuNDEgMzQuNDEgMCAwIDEgMTEuNzAzIDEuODc2YTI2LjYzMyAyNi42MzMgMCAwIDEgOC45MjggNS4yMDFhMjMuMzA3IDIzLjMwNyAwIDAgMSA1LjYyNyA4LjA1M2EyNi4zNTggMjYuMzU4IDAgMCAxIDEuOTg4IDkuNzIzdi42NjdhMjQuMTcgMjQuMTcgMCAwIDEtMS45ODggOS44NTNhMjIuNTA3IDIyLjUwNyAwIDAgMS01LjYyNyA3Ljc3N2EyNi4zNyAyNi4zNyAwIDAgMS04Ljk2NSA1LjE3N2EzNC43MjMgMzQuNzIzIDAgMCAxLTExLjcwNCAxLjg1aC0xMS44MDNsLjAxMyAyOS4wNTlabTAtNDEuNDYyaDExLjgwM2ExNS4wMDQgMTUuMDA0IDAgMCAwIDUuNjY0LS45ODhhMTEuNTUzIDExLjU1MyAwIDAgMCA0LjAyNi0yLjY2M2ExMS4xNzggMTEuMTc4IDAgMCAwIDIuMzY0LTMuODg5Yy41My0xLjQ3Ni44LTMuMDMzLjgtNC42MDFhMTYuMzY3IDE2LjM2NyAwIDAgMC0uOC01LjE2NGExMS45NjYgMTEuOTY2IDAgMCAwLTIuMzY0LTQuMjAyYTExLjU5IDExLjU5IDAgMCAwLTQuMDI2LTIuODI1YTE0LjI2NyAxNC4yNjcgMCAwIDAtNS42NjQtMS4wMzhoLTExLjgwM3YyNS4zN1ptMTAzLjA0MiAyNy40MmEyNS4zMDcgMjUuMzA3IDAgMCAxLTUuOTAyIDguMTY1YTI2LjA0NSAyNi4wNDUgMCAwIDEtOC44MTUgNS4yMDJhMzMuNjQ3IDMzLjY0NyAwIDAgMS0xMC41NTggMS44MTRsLS43Ny0uMDAxYTMwLjc1OSAzMC43NTkgMCAwIDEtOS4wNTMtMS4yNWEyNS4zNDUgMjUuMzQ1IDAgMCAxLTcuNTAyLTMuNjc3YTI1LjcwNyAyNS43MDcgMCAwIDEtNS40MTQtNS4zODlhMzMuNjcyIDMzLjY3MiAwIDAgMS00LjAwMS02Ljk2NGE0MS41NzUgNDEuNTc1IDAgMCAxLTIuNDEzLTguMzc4YTUzLjQwOCA1My40MDggMCAwIDEtLjg1MS05LjY5di0xMC42NjZhNTMuNDMgNTMuNDMgMCAwIDEgLjc2My05LjExNWEzOS40MTEgMzkuNDExIDAgMCAxIDEuOTUtNy4xNjFsLjMzOC0uODY2YTMwLjQwOSAzMC40MDkgMCAwIDEgNC41NzctOC4wNTNhMjkuMjcxIDI5LjI3MSAwIDAgMSA2LjQxNC01Ljk3NmEyNi4xNTggMjYuMTU4IDAgMCAxIDcuMDUyLTMuMTg5YTI5LjEwOCAyOS4xMDggMCAwIDEgNy40OC0xLjExbC43Ni0uMDAzYTMzLjc2IDMzLjc2IDAgMCAxIDExLjYxNiAxLjg1YTIzLjc1NyAyMy43NTcgMCAwIDEgMTQuMzQyIDEzLjY1NWEzNy40MTEgMzcuNDExIDAgMCAxIDIuNjEzIDExLjE1M2gtMTUuMjNjLS4wOS0yLjEyLS40NDItNC4yMi0xLjA1LTYuMjUyYTEyLjM1NCAxMi4zNTQgMCAwIDAtMi40MjUtNC40NjNhMTAuNDE2IDEwLjQxNiAwIDAgMC00LjA1Mi0yLjYzOWExNi43MyAxNi43MyAwIDAgMC01LjgwMS0uOWExNC4yNDIgMTQuMjQyIDAgMCAwLTMuMzUxLjM4OGMtMSAuMjQzLTEuOTU5LjYyNi0yLjg1MSAxLjEzN2ExMS4zMjggMTEuMzI4IDAgMCAwLTMuNzUxIDMuNzUyYTIxLjk2OSAyMS45NjkgMCAwIDAtMi41MDEgNS42MzlhMzQuMDEgMzQuMDEgMCAwIDAtMS4wMjUgNS41MjZhNTguNzY3IDU4Ljc2NyAwIDAgMC0uMzI1IDYuNTAydjEwLjc2NmE2MS4yOCA2MS4yOCAwIDAgMCAuNTEyIDguNDY1YTI4LjkyIDI4LjkyIDAgMCAwIDEuNiA2LjUwMmExNS45OTIgMTUuOTkyIDAgMCAwIDEuODI2IDMuMzc2Yy42NjcuOTYgMS40ODcgMS44MDQgMi40MjYgMi41YTEwLjAwMyAxMC4wMDMgMCAwIDAgMy4yODggMS42YTE0LjU2IDE0LjU2IDAgMCAwIDQuMDUyLjUyNmExNy45MTggMTcuOTE4IDAgMCAwIDUuMzg5LS43NjNhMTAuMzAzIDEwLjMwMyAwIDAgMCA0LjA4OC0yLjRhMTEuMjUzIDExLjI1MyAwIDAgMCAyLjY2NC00LjE5YTIwLjk2OSAyMC45NjkgMCAwIDAgMS4yNS02LjE1SDI1NmEzMC4zOTYgMzAuMzk2IDAgMCAxLTIuNjUgMTAuNzI3Wk0xODYuMzggOTIuNDAybDM4LjQ4NiAyMi4yMnY0NC40NjJsLTM4LjQ4NiAyMi4yMmwtMTcuMDg1LTkuODgxbC00MS41NDUgMjMuOTg0bC00MS4yOTYtMjMuODQ3bC0xNi44NDYgOS43NDNsLTM4LjQ4Ni0yMi4yNTZWMTE0LjYybDM4LjQ4Ni0yMi4yMTlsMzguNDg2IDIyLjIydjQ0LjQyNWwtMTEuNjQzIDYuNzMzbDMxLjI5OSAxOC4wNzRsMzEuNTQ4LTE4LjIxMmwtMTEuNDA1LTYuNTk1VjExNC42MmwzOC40ODctMjIuMjE5Wk0xNTcuODk2IDEyNi4ydjI3LjEybDIzLjQ4MiAxMy41NTV2LTI3LjEyTDE1Ny44OTYgMTI2LjJabTU2Ljk2Ny0uMDM3bC0yMy40ODIgMTMuNTU0djI3LjE1OGwyMy40ODItMTMuNTkydi0yNy4xMlptLTE3My43MzggMHYyNy4xMmwyMy40ODEgMTMuNTU0di0yNy4xMmwtMjMuNDgxLTEzLjU1NFptNTYuOTY2IDBMNzQuNjEgMTM5LjcxNnYyNy4xMmwyMy40ODItMTMuNTU0di0yNy4xMlptODguMjg5LTIyLjE4MmwtMjMuNDgyIDEzLjU1NGwyMy40ODIgMTMuNTY3bDIzLjQ4MS0xMy41NjdsLTIzLjQ4MS0xMy41NTRabS0xMTYuNzcyLS4wMzdsLTIzLjQ4MiAxMy41OTFsMjMuNDgyIDEzLjUzbDIzLjQ4Mi0xMy41M2wtMjMuNDgyLTEzLjU5MVptMTkuMTQzLTY4LjkydjExLjU0bC0zNS42MSAyMC41N3YzNC43NzJsLTEwLjAwMyA1Ljc3N1Y2MS4zNTVMODguNzUgMzUuMDIzWk0xMjcuMjM3IDBsMzguNTEyIDIyLjIxOXYxMi4yMTlsNDYuNjEzIDI2LjkxN3Y0Ni4wMzlsLTEwLjAwMy01Ljc3N1Y2Ny4xMzJsLTM2LjYxLTIxLjE0MXYyMC42NjZsLTM4LjQ4NyAyMi4yMTlsLTM4LjQ4Ni0yMi4yMTlWMjIuMjE5TDEyNy4yMzcgMFpNOTguNzggMzMuNzZ2MjcuMTJsMjMuNDU3IDEzLjU1NFY0Ny4zMjZMOTguNzc5IDMzLjc2Wm01Ni45NDIgMGwtMjMuNDU3IDEzLjU2NnYyNy4wOTZMMTU1LjcyIDYwLjg4VjMzLjc2Wm0tMjguNDg0LTIyLjIwN0wxMDMuNzggMjUuMTA3bDIzLjQ1NyAxMy41NTRsMjMuNDgyLTEzLjU1NGwtMjMuNDgyLTEzLjU1NFoiLz48L3N2Zz4=",
    url: "https://trpc.io",
    spectrum: "beaten_path",
    tagline: "End-to-end typesafe APIs made easy",
    repo: "trpc/trpc",
    links: [
      {
        label: "Getting started",
        href: "https://trpc.io/docs/getting-started"
      },
      {
        label: "Docs",
        href: "https://trpc.io/docs"
      }
    ]
  },
  {
    category: "Data fetching",
    label: "ts-rest",
    flag: "ts-rest",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTE2JyBoZWlnaHQ9JzExNScgdmlld0JveD0nMCAwIDExNiAxMTUnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PGcgY2xpcC1wYXRoPSd1cmwoI2NsaXAwXzEzXzIwKSc+PHJlY3Qgd2lkdGg9JzExNicgaGVpZ2h0PScxMTYnIHJ4PScyNicgZmlsbD0nIzkzMzNFQScvPjxwYXRoIGQ9J002Mi40ODcgNTkuOTU2Nkw5NS4xMTY2IDYwLjEyNjJMOTUuMTQ5MyA1My44MjEyTDYyLjUxOTggNTMuNjUxN0w2Mi40ODcgNTkuOTU2NlpNNjIuNTg2MyA0MC44NDY5TDk1LjIxNTkgNDEuMDE2NEw5NS4yNDkzIDM0LjU4MTVMNjIuNjE5NyAzNC40MTJMNjIuNTg2MyA0MC44NDY5Wk02Mi40MTY4IDczLjQ3NjVMOTUuMDQ2MyA3My42NDZMOTUuMDEyOSA4MC4wODA5TDYyLjM4MzMgNzkuOTExNEw2Mi40MTY4IDczLjQ3NjVaJyBmaWxsPSd3aGl0ZScvPjxwYXRoIGQ9J000Ni4wNiA2NC45MkM1Mi4zIDYyLjU4IDU1Ljg3NSA1Ny41MSA1NS44NzUgNTAuNTU1QzU1Ljg3NSA0MC41NDUgNDguNTk1IDM0LjUgMzYuNyAzNC41SDE4LjVWNDAuOTM1SDM2LjQ0QzQ0LjMwNSA0MC45MzUgNDguNCA0NC40NDUgNDguNCA1MC41NTVDNDguNCA1Ni42IDQ0LjMwNSA2MC4xNzUgMzYuNDQgNjAuMTc1SDE4LjVWODBIMjUuOTFWNjYuNDhIMzYuN0MzNy40OCA2Ni40OCAzOC4zMjUgNjYuNDggMzkuMDQgNjYuNDE1TDQ4LjU5NSA4MEg1Ni42NTVMNDYuMDYgNjQuOTJaJyBmaWxsPSd3aGl0ZScvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9J2NsaXAwXzEzXzIwJz48cmVjdCB3aWR0aD0nMTE2JyBoZWlnaHQ9JzExNScgZmlsbD0nd2hpdGUnLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=",
    url: "https://ts-rest.com",
    tagline: "Incrementally adoptable type-safety for your new and existing APIs",
    repo: "ts-rest/ts-rest",
    links: [
      {
        label: "Quickstart",
        href: "https://ts-rest.com/docs/quickstart"
      },
      {
        label: "Docs",
        href: "https://ts-rest.com/docs/intro"
      }
    ]
  },
  // Server
  {
    category: "Server",
    label: "Hono",
    flag: "hono",
    image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjUwMHB4IiBoZWlnaHQ9IjUwMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxnPjxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuOTkzIiBmaWxsPSIjZmY1YjExIiBkPSJNIDI1Ny41LDAuNSBDIDI1OC44MjIsMC4zMzAwMzQgMjU5Ljk4OSwwLjY2MzM2OCAyNjEsMS41QyAyOTguMTkzLDQ2Ljg5MzYgMzMzLjE5Myw5My44OTM2IDM2NiwxNDIuNUMgMzkwLjI4OSwxNzkuMDY5IDQxMC45NTUsMjE3LjczNSA0MjgsMjU4LjVDIDQ1NS4yMjEsMzMxLjEwNCA0NDEuMDU0LDM5NC4yNzEgMzg1LjUsNDQ4QyAzMzYuODkyLDQ4OS4wODIgMjgwLjg5Miw1MDUuMDgyIDIxNy41LDQ5NkMgMTQxLjcyNyw0ODAuNTUxIDkwLjIyNjUsNDM2LjcxOCA2MywzNjQuNUMgNTUuOTA4MSwzNDAuOTg5IDUzLjU3NDgsMzE2Ljk4OSA1NiwyOTIuNUMgNjAuMDM4NCwyNTAuMzQ3IDcwLjAzODQsMjA5LjY4IDg2LDE3MC41QyA5Mi42NTA5LDE1NC41MTQgMTAxLjMxOCwxMzkuODQ4IDExMiwxMjYuNUMgMTIwLjcxNSwxMzYuODggMTI5LjA0OCwxNDcuNTQ3IDEzNywxNTguNUMgMTQwLjY4MiwxNjIuMzQ5IDE0NC41MTUsMTY2LjAxNiAxNDguNSwxNjkuNUMgMTc4LjkxNywxMDkuMTM2IDIxNS4yNTEsNTIuODAyOCAyNTcuNSwwLjUgWiIvPjwvZz4KPGc+PHBhdGggc3R5bGU9Im9wYWNpdHk6MSIgZmlsbD0iI2ZmOTc1OCIgZD0iTSAyNTAuNSw4MS41IEMgMjg3LjE5MywxMjQuMDYgMzIwLjM2LDE2OS4zOTMgMzUwLDIxNy41QyAzNTkuMjkzLDIzMy40MTggMzY2Ljk1OSwyNTAuMDg1IDM3MywyNjcuNUMgMzg1LjU4NCwzMTcuMDA4IDM3Mi4wODQsMzU3Ljg0MiAzMzIuNSwzOTBDIDI5NC4yMTYsNDE2LjkzOSAyNTIuMjE2LDQyNC45MzkgMjA2LjUsNDE0QyAxNTcuMjAxLDM5OC43MDIgMTI4LjcwMSwzNjUuNTM1IDEyMSwzMTQuNUMgMTE5LjEzMSwyOTguNDA5IDEyMC43OTgsMjgyLjc0MiAxMjYsMjY3LjVDIDEzMy40MTgsMjQ4LjY2MyAxNDIuNDE4LDIzMC42NjMgMTUzLDIxMy41QyAxNjMsMTk4LjgzMyAxNzMsMTg0LjE2NyAxODMsMTY5LjVDIDIwNS43MTYsMTQwLjI5IDIyOC4yMTYsMTEwLjk1NyAyNTAuNSw4MS41IFoiLz48L2c+Cjwvc3ZnPgo=",
    url: "https://hono.dev",
    tagline: "Fast, lightweight, built on web standards. Support for any JavaScript runtime.",
    repo: "honojs/hono",
    links: [
      {
        label: "Getting started",
        href: "https://hono.dev/top"
      },
      {
        label: "API",
        href: "https://hono.dev/api/hono"
      }
    ]
  },
  {
    category: "Server",
    label: "h3",
    flag: "h3",
    url: "https://github.com/unjs/h3",
    tagline: "Minimal H(TTP) framework built for high performance and portability",
    repo: "unjs/h3"
  },
  {
    category: "Server",
    label: "Express",
    flag: "express",
    url: "https://expressjs.com",
    spectrum: "beaten_path",
    tagline: "Fast, unopinionated, minimalist web framework for Node.js",
    repo: "expressjs/express",
    links: [
      {
        label: "Getting started",
        href: "https://expressjs.com/en/starter/installing.html"
      },
      {
        label: "API",
        href: "https://expressjs.com/en/4x/api.html"
      }
    ]
  },
  {
    category: "Server",
    label: "Fastify",
    flag: "fastify",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nODQ5JyBoZWlnaHQ9JzU0NScgdmlld0JveD0nMCAwIDg0OSA1NDUnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTgyMi4xOCA3Ny4zMkw4NDguOSA4LjExTDg0Ny43NSAzLjgzTDU4My40MSA3My40OEM2MTEuNTUgMzIuNyA2MDEuOSAwIDYwMS45IDBDNjAxLjkgMCA1MTcuNDkgNTMuOTEgNDUzLjY0IDUyLjQ5QzM4OS43OSA1MS4wNyAzNjkuMjMgMzQuMDUgMjcxLjMzIDY1LjI2QzE3My40MyA5Ni40NyAxNDUuNzcgMTkyLjI2IDExNy40IDIxMi44MUM4OS4wMyAyMzMuMzYgMCAzMDAuNDIgMCAzMDAuNDJMMC4xOTAwMDIgMzAxLjYyTDgwLjQ1IDI3Ni4wNkM4MC40NSAyNzYuMDYgNTguNDUgMjk2LjgxIDExLjY4IDM1OS44M0MxMS42OCAzNTkuODMgMTAuODYgMzU5LjA4IDkuNSAzNTcuODNMOS41NyAzNTguMjZDOS41NyAzNTguMjYgNDcuMTcgNDE1LjcyIDg0LjA2IDQwNS4wOEM4OC4zNzQ0IDQwMy43MzkgOTIuNTU1NSA0MDIuMDAxIDk2LjU1IDM5OS44OUMxMTEuNCA0MDguMTYgMTMwLjc5IDQxNi4yOSAxNTIuMiA0MTguNTNDMTQyLjU2OCA0MDcuMTIgMTMzLjY4OSAzOTUuMDk0IDEyNS42MiAzODIuNTNMMTM1LjYyIDM3Ni4wMkwxMzQuMDYgMzc3LjE0TDE2NC42MyAzODguMzZMMTYxLjIzIDM1OS42TDE2MS41MyAzNTkuNDFMMTkxLjUzIDM3MC40MUwxODcuNzkgMzQ0LjI4QzE5MS41OSAzNDIuMjggMTk1LjQgMzQwLjQxIDE5OS4xOSAzMzguNjVMMjMwLjU1IDIyMC4yNkwzNjAuMDEgMTMxLjk0TDM0OS43MyAxNTcuODNDMzIzLjQ3IDIyMi4zOSAyNzQuMTcgMjM3LjYgMjc0LjE3IDIzNy42TDI1My42IDI0NS40QzIzOC4yOSAyNjMuNDkgMjMxLjg2IDI2Ny45NCAyMjYuNiAzMjguNjVDMjM4LjkzIDMyNS41NCAyNTAuNzIgMzI0LjgyIDI2MS40IDMyNy42NUMzMTYuNzMgMzQyLjU1IDMzNS44OSA0MDkuMjMgMzIwLjk5IDQyNy42NUMzMTcuMjYgNDMyLjI3IDMwOC4zOCA0NDAuMTcgMjk3LjE3IDQ0OS40MkgyNzQuNzJMMjc0LjQzIDQ2Ny42MUwyNzIuMTIgNDY5LjQxSDI0OS4yOEwyNDguOTkgNDg3LjE2QzI0Ni45OSA0ODguNyAyNDQuOTkgNDkwLjIxIDI0Mi45OSA0OTEuNjhDMjIxLjUyIDQ5Mi4xMyAxOTQuMzQgNDczLjQxIDE5NC4zNCA0NzMuNDFDMTk0LjM0IDQ5MC40MSAyMDguNTMgNTE2LjY4IDIwOC41MyA1MTYuNjhMMjExLjA0IDUxNS40NkwyMDguODkgNTE3LjAzQzIwOC44OSA1MTcuMDMgMjY2LjM1IDU1NS4zNCAzMDIuNTIgNTQxLjE1QzMzNC43MiA1MjguNiA0MTcuOTkgNDYyLjk3IDQ4OS44OCA0MzEuOUw3MDcuNDIgMzc0LjZMNzM2LjExIDMwMC4yOUw1NzAuMzMgMzQzLjk1VjI3Ny4xOUw3NjQuOCAyMjUuOTVMNzkzLjQ5IDE1MS42TDU3MC4zMyAyMTAuNFYxNDMuNjhMODIyLjE4IDc3LjMyWk00MjcuMzYgMjE4Ljc5TDQ3OC45OCAyMDUuMTlMNDc5LjY3IDIwNy43OEw0NjMuNTUgMjQ5LjVMNDEwLjA3IDI2My42TDQyNy4zNiAyMTguNzlaTTQ0NS4xOCAzMDguMDlMMzkxLjY4IDMyMi4xOUw0MDguOTcgMjc3LjM4TDQ2MC41NSAyNjMuNzhMNDYxLjI0IDI2Ni4zN0w0NDUuMTggMzA4LjA5Wk01MTQuODkgMjkzLjA5TDQ2MS4zOCAzMDcuMTlMNDc4LjY4IDI2Mi4zOUw1MzAuMyAyNDguNzhMNTMwLjk5IDI1MS4zN0w1MTQuODkgMjkzLjA5WicgZmlsbD0nIzIxNUZGNicvPjwvc3ZnPgo=",
    url: "https://fastify.dev",
    tagline: "Fast and low overhead web framework, for Node.js",
    repo: "fastify/fastify",
    links: [
      {
        label: "Getting started",
        href: "https://fastify.dev/docs/latest/Guides/Getting-Started/"
      },
      {
        label: "API",
        href: "https://fastify.dev/docs/latest/Reference/"
      }
    ]
  },
  {
    category: "Server",
    label: "HatTip",
    flag: "hattip",
    image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMjYzIDIyOCIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBpZD0iSGF0VGlwTG9nbyIgdHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgMSwgMC43MTcxMDUsIDcuODg4MTU4KSI+CiAgICA8cGF0aCBkPSJNMzQuNjMsMTYyLjMxMWMtMCwwIC0xMi4xNjEsLTYxLjc4IC0xMi42NzksLTgxLjAxOGMwLC0wIDEuODkyLC01My4zNDIgNzUuMDU3LC02OC41OGMwLDAgNzkuMTcxLC0zMC4wNzYgMTA1LjUzOCwyNC4zMzZjMCwtMCAyMy4wNDMsNTcuMzIzIDI1LjM0LDc2Ljg5Yy0wLC0wIC01NC40NywzOS4wNzMgLTE5MS44MjEsNTQuMzY3bC0xLjQzNSwtNS45OTVaIiBzdHlsZT0iZmlsbDojMjMzNjNmO2ZpbGwtcnVsZTpub256ZXJvOyIvPgogICAgPHBhdGggZD0iTTM5LjI3NywxODEuNjkybC0zLjIxMiwtMTMuMzg2YzAsMCAxMjEuOTM0LC0xMS4yMzUgMTkxLjgyMSwtNTQuMzY3bDMuODg3LDE2LjIwNGMtMCwwIC04OS4xLDU5LjYzNyAtMTkyLjQ5Niw1MS41NDlaIiBzdHlsZT0iZmlsbDojMDRiNTc4O2ZpbGwtcnVsZTpub256ZXJvOyIvPgogICAgPHBhdGggZD0iTTMzLjg1MiwxNTguMDI0bDUuNDI1LDIzLjY2OGMtMCwtMCA4OS4wNTksMTEuMTM3IDE5Mi40OTYsLTUxLjU0OWwtMy44ODcsLTE2LjIwNGwyNC44ODksLTEyLjAwNmMwLDAgNy4yMzEsLTMuOTczIDQuNTI0LDcuNDgxYy0wLC0wIDEuNjM5LDU3Ljk1MyAtMTMwLjI1MSw4Ny4zMTRjLTEyNi43NTQsMjguMjE4IC0xMzEuMzg1LC0zMi41NzUgLTExNy4wOTQsLTM1LjYxM2wyMy44OTgsLTMuMDkxWiIgc3R5bGU9ImZpbGw6IzIzMzY0MDtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICA8L2c+Cjwvc3ZnPg==",
    url: "https://github.com/hattipjs/hattip",
    spectrum: "bleeding_edge",
    tagline: "Like Express, but for the future",
    repo: "hattipjs/hattip"
  },
  // Database
  {
    category: "Database",
    label: "Drizzle",
    flag: "drizzle",
    image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI4MHB4IiBoZWlnaHQ9IjI4MHB4IiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgdGV4dC1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uOyBpbWFnZS1yZW5kZXJpbmc6b3B0aW1pemVRdWFsaXR5OyBmaWxsLXJ1bGU6ZXZlbm9kZDsgY2xpcC1ydWxlOmV2ZW5vZGQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPGc+PHBhdGggc3R5bGU9Im9wYWNpdHk6MSIgZmlsbD0iIzAwMDAwMCIgZD0iTSAtMC41LC0wLjUgQyA5Mi44MzMzLC0wLjUgMTg2LjE2NywtMC41IDI3OS41LC0wLjVDIDI3OS41LDkyLjgzMzMgMjc5LjUsMTg2LjE2NyAyNzkuNSwyNzkuNUMgMTg2LjE2NywyNzkuNSA5Mi44MzMzLDI3OS41IC0wLjUsMjc5LjVDIC0wLjUsMTg2LjE2NyAtMC41LDkyLjgzMzMgLTAuNSwtMC41IFoiLz48L2c+CjxnPjxwYXRoIHN0eWxlPSJvcGFjaXR5OjEiIGZpbGw9IiNjMWYyNGQiIGQ9Ik0gMTMzLjUsODQuNSBDIDE0Mi44MTQsODIuNzI2OSAxNDYuNjQ3LDg2LjM5MzUgMTQ1LDk1LjVDIDEzNS45MDYsMTEyLjAyOCAxMjYuNTcyLDEyOC4zNjIgMTE3LDE0NC41QyAxMTEuMjQ5LDE0OS45ODQgMTA2LjI0OSwxNDkuMzE3IDEwMiwxNDIuNUMgMTAxLjMzMywxNDAuODMzIDEwMS4zMzMsMTM5LjE2NyAxMDIsMTM3LjVDIDExMS41NDcsMTE5LjA0MSAxMjIuMDQ3LDEwMS4zNzUgMTMzLjUsODQuNSBaIi8+PC9nPgo8Zz48cGF0aCBzdHlsZT0ib3BhY2l0eToxIiBmaWxsPSIjYzBmMTRkIiBkPSJNIDIyMy41LDg0LjUgQyAyMzMuNTM5LDgzLjY5NzIgMjM3LjAzOSw4OC4wMzA1IDIzNCw5Ny41QyAyMjUuMzQ3LDExMi44MDEgMjE2LjY4MSwxMjguMTM1IDIwOCwxNDMuNUMgMjAzLjM4NywxNDkuNzM3IDE5OC4zODcsMTUwLjA3MSAxOTMsMTQ0LjVDIDE5MS41NzgsMTQxLjk3IDE5MS4yNDUsMTM5LjMwMyAxOTIsMTM2LjVDIDIwMC41MiwxMjIuNzk0IDIwOC41MiwxMDguNzk0IDIxNiw5NC41QyAyMTguMjg5LDkwLjg4MTIgMjIwLjc4OSw4Ny41NDc5IDIyMy41LDg0LjUgWiIvPjwvZz4KPGc+PHBhdGggc3R5bGU9Im9wYWNpdHk6MSIgZmlsbD0iI2MwZjE0ZCIgZD0iTSA3NS41LDEyMC41IEMgODMuOTg4NSwxMTkuNjE4IDg3LjgyMTgsMTIzLjI4NSA4NywxMzEuNUMgNzcuOTA1NywxNDguMDI4IDY4LjU3MjQsMTY0LjM2MiA1OSwxODAuNUMgNTYuMDQ1MywxODQuMjc3IDUyLjIxMiwxODUuNDQzIDQ3LjUsMTg0QyA0My44Njk3LDE4MC45NSA0Mi43MDMsMTc3LjExNyA0NCwxNzIuNUMgNTMsMTU2LjUgNjIsMTQwLjUgNzEsMTI0LjVDIDcyLjM5NjgsMTIyLjkzIDczLjg5NjgsMTIxLjU5NiA3NS41LDEyMC41IFoiLz48L2c+CjxnPjxwYXRoIHN0eWxlPSJvcGFjaXR5OjEiIGZpbGw9IiNjMWYyNGQiIGQ9Ik0gMTY1LjUsMTIwLjUgQyAxNzQuMTY0LDExOS4zMzIgMTc3Ljk5NywxMjIuOTk5IDE3NywxMzEuNUMgMTY3LjQxNCwxNDcuNjcxIDE1OC4wOCwxNjQuMDA0IDE0OSwxODAuNUMgMTQ2LjM5OCwxODQuMjEyIDE0Mi44OTgsMTg1LjM3OCAxMzguNSwxODRDIDEzMy45MzEsMTgxLjQ1OSAxMzIuNDMxLDE3Ny42MjUgMTM0LDE3Mi41QyAxNDMuNTcyLDE1Ni4zNjIgMTUyLjkwNiwxNDAuMDI4IDE2MiwxMjMuNUMgMTYzLjE0NSwxMjIuMzY0IDE2NC4zMTIsMTIxLjM2NCAxNjUuNSwxMjAuNSBaIi8+PC9nPgo8L3N2Zz4K",
    url: "https://orm.drizzle.team/",
    tagline: "Headless TypeScript ORM that feels like SPA with SSR",
    repo: "drizzle-team/drizzle-orm",
    links: [
      {
        label: "Docs & Getting started",
        href: "https://orm.drizzle.team/docs/overview"
      }
    ]
  },
  {
    category: "Database",
    label: "SQLite",
    flag: "sqlite",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTI4IDEyOCI+Cgk8ZGVmcz4KCQk8bGluZWFyR3JhZGllbnQgaWQ9ImRldmljb25TcWxpdGUwIiB4MT0iLTE1LjYxNSIgeDI9Ii02Ljc0MSIgeTE9Ii05LjEwOCIgeTI9Ii05LjEwOCIgZ3JhZGllbnRUcmFuc2Zvcm09InJvdGF0ZSg5MCAtOTAuNDg2IDY0LjYzNClzY2FsZSg5LjI3MTIpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CgkJCTxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzk1ZDdmNCIgLz4KCQkJPHN0b3Agb2Zmc2V0PSIuOTIiIHN0b3AtY29sb3I9IiMwZjdmY2MiIC8+CgkJCTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzBmN2ZjYyIgLz4KCQk8L2xpbmVhckdyYWRpZW50PgoJPC9kZWZzPgoJPHBhdGggZmlsbD0iIzBiN2ZjYyIgZD0iTTY5LjUgOTkuMTc2Yy0uMDU5LS43My0uMDk0LTEuMi0uMDk0LTEuMlM2Ny4yIDgzLjA4NyA2NC41NyA3OC42NDJjLS40MTQtLjcwNy4wNDMtMy41OTQgMS4yMDctNy44OGMuNjggMS4xNjkgMy41NCA2LjE5MiA0LjExOCA3LjgxYy42NDggMS44MjQuNzggMi4zNDcuNzggMi4zNDdzLTEuNTctOC4wODItNC4xNDQtMTIuNzk3YTE2MiAxNjIgMCAwIDEgMi4wMDQtNi4yNjVjLjk3MyAxLjcxIDMuMzEzIDUuODU5IDMuODI4IDcuM2MuMTAyLjI5My4xOTIuNTQzLjI3Ljc3NGwuMDc0LS40MTRjLS41OS0yLjUwNC0xLjc1LTYuODYtMy4zMzYtMTAuMDgyYzMuNTItMTguMzI4IDE1LjUzMS00Mi44MjQgMjcuODQtNTMuNzU0SDE2LjljLTUuMzg3IDAtOS43ODkgNC40MDYtOS43ODkgOS43ODl2ODguNTdjMCA1LjM4MyA0LjQwNiA5Ljc4OSA5Ljc5IDkuNzg5aDUyLjg5N2ExMTkgMTE5IDAgMCAxLS4yOTctMTQuNjUyIiAvPgoJPHBhdGggZmlsbD0idXJsKCNkZXZpY29uU3FsaXRlMCkiIGQ9Ik02NS43NzcgNzAuNzYyYy42OCAxLjE2OCAzLjU0IDYuMTg4IDQuMTE3IDcuODA5Yy42NDkgMS44MjQuNzgxIDIuMzQ3Ljc4MSAyLjM0N3MtMS41Ny04LjA4Mi00LjE0NC0xMi43OTdhMTY1IDE2NSAwIDAgMSAyLjAwNC02LjI3Yy44ODcgMS41NjcgMi45MjIgNS4xNjkgMy42NTIgNi44NzJsLjA4Mi0uOTYxYy0uNjQ4LTIuNDk2LTEuNjMzLTUuNzY2LTIuODk4LTguMzI4YzMuMjQyLTE2Ljg3MSAxMy42OC0zOC45NyAyNC45MjYtNTAuODk4SDE2Ljg5OWE2Ljk0IDYuOTQgMCAwIDAtNi45MzQgNi45MzN2ODIuMTFjMTcuNTI3LTYuNzMxIDM4LjY2NC0xMi44OCA1Ni44NTUtMTIuNjE0Yy0uNjcyLTIuNjA1LTEuNDQxLTQuOTYtMi4yNS02LjMyNGMtLjQxNC0uNzA3LjA0My0zLjU5NyAxLjIwNy03Ljg3OSIgLz4KCTxwYXRoIGZpbGw9IiMwMDM5NTYiIGQ9Ik0xMTUuOTUgMi43ODFjLTUuNS00LjkwNi0xMi4xNjQtMi45MzMtMTguNzM0IDIuODk5YTQ0IDQ0IDAgMCAwLTIuOTE0IDIuODU5Yy0xMS4yNSAxMS45MjYtMjEuNjg0IDM0LjAyMy0yNC45MjYgNTAuODk1YzEuMjYyIDIuNTYzIDIuMjUgNS44MzIgMi44OTQgOC4zMjhjLjE2OC42NC4zMiAxLjI0Mi40NDIgMS43NTRjLjI4NSAxLjIwNy40MzcgMS45OTYuNDM3IDEuOTk2cy0uMTAxLS4zODMtLjUxNS0xLjU4MmMtLjA3OC0uMjMtLjE2OC0uNDg0LS4yNy0uNzczYTggOCAwIDAgMC0uMTcyLS40MzRjLS43MzQtMS43MDMtMi43NjUtNS4zMDUtMy42NTYtNi44NjdjLS43NjIgMi4yNS0xLjQzNyA0LjM2LTIuMDA0IDYuMjY1YzIuNTc4IDQuNzE1IDQuMTQ5IDEyLjc5NyA0LjE0OSAxMi43OTdzLS4xMzctLjUyMy0uNzgyLTIuMzQ3Yy0uNTc4LTEuNjIxLTMuNDQxLTYuNjQtNC4xMTctNy44MDljLTEuMTY0IDQuMjgxLTEuNjI1IDcuMTcyLTEuMjA3IDcuODhjLjgwOSAxLjM2MiAxLjU3NCAzLjcyMiAyLjI1IDYuMzIzYzEuNTI0IDUuODY3IDIuNTg2IDEzLjAxMiAyLjU4NiAxMy4wMTJzLjAzMS40NjkuMDk0IDEuMmExMTkgMTE5IDAgMCAwIC4yOTcgMTQuNjUxYy41MDQgNi4xMSAxLjQ1MyAxMS4zNjMgMi42NjQgMTQuMTcybC44MjgtLjQ0OWMtMS43ODEtNS41MzUtMi41MDQtMTIuNzkzLTIuMTg4LTIxLjE1NmMuNDgtMTIuNzkzIDMuNDIyLTI4LjIxNSA4Ljg1Ni00NC4yODljOS4xOTEtMjQuMjcgMjEuOTM4LTQzLjczOCAzMy42MDItNTMuMDM1Yy0xMC42MzMgOS42MDItMjUuMDIzIDQwLjY4NC0yOS4zMzIgNTIuMTk1Yy00LjgyIDEyLjg5MS04LjIzOCAyNC45ODQtMTAuMzAxIDM2LjU3NGMzLjU1LTEwLjg2MyAxNS4wNDctMTUuNTMgMTUuMDQ3LTE1LjUzczUuNjM3LTYuOTU4IDEyLjIyNy0xNi44ODhjLTMuOTUuOTAzLTEwLjQzIDIuNDQyLTEyLjU5OCAzLjM1MmMtMy4yIDEuMzQ0LTQuMDY3IDEuOC00LjA2NyAxLjhzMTAuMzcxLTYuMzEyIDE5LjI3LTkuMTcxYzEyLjIzNC0xOS4yNyAyNS41NjItNDYuNjQ4IDEyLjE0MS01OC42MjEiIC8+Cjwvc3ZnPg==",
    url: "https://www.sqlite.org/",
    tagline: "SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine",
    repo: "sqlite/sqlite",
    links: [
      {
        label: "better-sqlite3: API",
        href: "https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md"
      },
      {
        label: "D1: Getting started",
        href: "https://developers.cloudflare.com/d1/get-started/"
      }
    ]
  },
  {
    category: "Database",
    label: "Prisma",
    flag: "prisma",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIwLjgzZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDMxMCI+PHBhdGggZD0iTTI1NC4zMTMgMjM1LjUxOUwxNDggOS43NDlBMTcuMDYzIDE3LjA2MyAwIDAgMCAxMzMuNDczLjAzN2ExNi44NyAxNi44NyAwIDAgMC0xNS41MzMgOC4wNTJMMi42MzMgMTk0Ljg0OGExNy40NjUgMTcuNDY1IDAgMCAwIC4xOTMgMTguNzQ3TDU5LjIgMzAwLjg5NmExOC4xMyAxOC4xMyAwIDAgMCAyMC4zNjMgNy40ODlsMTYzLjU5OS00OC4zOTJhMTcuOTI5IDE3LjkyOSAwIDAgMCAxMS4yNi05LjcyMmExNy41NDIgMTcuNTQyIDAgMCAwLS4xMDEtMTQuNzZsLS4wMDguMDA4Wm0tMjMuODAyIDkuNjgzbC0xMzguODIzIDQxLjA1Yy00LjIzNSAxLjI2LTguMy0yLjQxMS03LjQxOS02LjY4NWw0OS41OTgtMjM3LjQ4NGMuOTI3LTQuNDQzIDcuMDYzLTUuMTQ3IDkuMDAzLTEuMDM1bDkxLjgxNCAxOTQuOTczYTYuNjMgNi42MyAwIDAgMS00LjE4IDkuMThoLjAwN1oiLz48L3N2Zz4=",
    url: "https://www.prisma.io",
    spectrum: "beaten_path",
    tagline: "Next-generation Node.js and TypeScript ORM",
    repo: "prisma/prisma",
    links: [
      {
        label: "Getting started",
        href: "https://www.prisma.io/docs/getting-started"
      },
      {
        label: "Docs",
        href: "https://www.prisma.io/docs"
      }
    ]
  },
  {
    category: "Database",
    label: "EdgeDB",
    flag: "edgedb",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyLjIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgNTEyIDIzMi43MjciPjxwYXRoIGZpbGw9IiM0RDRENEQiIGQ9Ik00MzMuNjY3IDExNS4yMzhjMCAzNS4zMzMtMTQuMTY3IDQxLjY2Ni0zMC4wMDIgNDEuNjY2SDM3MFY3My41NzFoMzMuNjY2YzE1LjgzNSAwIDMwLjAwMiA2LjMzNCAzMC4wMDIgNDEuNjY3Wm0tMTcuMTY3LjAwNGMwLTI0LjY2Ny03LjUtMjUuODMzLTE4LjMzMy0yNS44MzNoLTEwLjQ5OXY1MS42NjZoMTAuNWMxMC44MzMgMCAxOC4zMzItMS4xNjcgMTguMzMyLTI1LjgzM1ptLTE3OC4zMzYgNDEuNjYyVjczLjU3MWg1My4wMDF2MTUuODM0aC0zNS4zMzR2MTdoMjYuNjY2djE1LjY2NmgtMjYuNjY2djE5aDM1LjMzNHYxNS44MzNoLTUzWk0zMjAgMjMyLjcyN2gxNy40NTVWMEgzMjB2MjMyLjcyN1pNNDY4Ljk5NSAxMTkuOTF2MjEuMTY2aDE0LjY2OGM5LjE2NiAwIDExLjUtNiAxMS41LTEwLjVjMC0zLjUtMS42NjgtMTAuNjY2LTE0LjE2OC0xMC42NjZoLTEyWm0wLTMwLjUwMnYxNS44MzNoMTJjNi44MzMgMCAxMC44MzMtMyAxMC44MzMtOHMtNC03LjgzMy0xMC44MzMtNy44MzNoLTEyWk00NTEuMzM0IDczLjU3aDMzLjk5OGMxNy44MzYgMCAyMy4xNjggMTIuNSAyMy4xNjggMjEuNWMwIDguMzM0LTUuMzMyIDE0LjMzNC05IDE2YzEwLjY2NyA1LjE2NyAxMi41IDE1LjY2NyAxMi41IDIxYzAgNy0zLjUgMjQuODMzLTI2LjY2OCAyNC44MzNoLTMzLjk5OFY3My41NzFabS0zMTQuNjY1IDQxLjY2N2MwIDM1LjMzMy0xNC4xNjcgNDEuNjY2LTMwIDQxLjY2Nkg3My4wMDJWNzMuNTcxaDMzLjY2N2MxNS44MzMgMCAzMCA2LjMzNCAzMCA0MS42NjdabTUxLjk5NyAyNi41MDdjOSAwIDEzLjY2Ni0zIDE1LjMzMy01di05LjE2NmgtMTQuMzM0di0xNC4zMzRoMjguNXYzMy4xNjdjLTIuNSAzLjgzMy0xNi4xNjYgMTEuMzMzLTI4LjY2NiAxMS4zMzNjLTIwLjUgMC0zNy44MzMtOC0zNy44MzMtNDMuMzMzczE3LjUtNDEuNjY2IDMzLjMzMy00MS42NjZjMjQuODMzIDAgMzEgMTMgMzMgMjQuNWwtMTQuNjY3IDMuMzMzYy0uODMzLTUuMzM0LTUuNS0xMi0xNi4xNjYtMTJjLTEwLjgzNCAwLTE4LjMzNCAxLjE2Ni0xOC4zMzQgMjUuODMzYzAgMjQuNjY3IDcuODM0IDI3LjMzMyAxOS44MzQgMjcuMzMzWk0xMTkuNSAxMTUuMjQyYzAtMjQuNjY3LTcuNS0yNS44MzMtMTguMzMzLTI1LjgzM2gtMTAuNXY1MS42NjZoMTAuNWMxMC44MzMgMCAxOC4zMzMtMS4xNjcgMTguMzMzLTI1LjgzM1pNMCAxNTYuOTA0VjczLjU3MWg1M3YxNS44MzRIMTcuNjY3djE3aDI2LjY2NnYxNS42NjZIMTcuNjY3djE5SDUzdjE1LjgzM0gwWiIvPjwvc3ZnPg==",
    url: "https://www.edgedb.com",
    spectrum: "bleeding_edge",
    tagline: "A graph-like schema with a relational core",
    repo: "edgedb/edgedb",
    links: [
      {
        label: "Getting started",
        href: "https://www.edgedb.com/docs/intro/quickstart"
      },
      {
        label: "Docs",
        href: "https://www.edgedb.com/docs"
      }
    ]
  },
  // Analytics
  {
    category: "Analytics",
    label: "Plausible.io",
    flag: "plausible.io",
    image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+bG9nbzwvdGl0bGU+CiAgICA8ZGVmcz4KICAgICAgICA8cmFkaWFsR3JhZGllbnQgY3g9Ijc5LjEzMDUyNjMlIiBjeT0iODcuNjQ0ODE1OCUiIGZ4PSI3OS4xMzA1MjYzJSIgZnk9Ijg3LjY0NDgxNTglIiByPSI5Ni45ODk3NzYzJSIgaWQ9InJhZGlhbEdyYWRpZW50LTEiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMjQ0MEU2IiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM1NjYxQjMiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgICAgICAgPHJhZGlhbEdyYWRpZW50IGN4PSIxLjUwNjEwNDU3ZS0wNSUiIGN5PSIzMC4yMTk4OTQxJSIgZng9IjEuNTA2MTA0NTdlLTA1JSIgZnk9IjMwLjIxOTg5NDElIiByPSI2Mi4yNjg4NzczJSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwwLjMwMjE5OSksc2NhbGUoMS4wMDAwMDAsMC43MjI1MTkpLHJvdGF0ZSg2MS43MzQ1MjIpLHRyYW5zbGF0ZSgtMC4wMDAwMDAsLTAuMzAyMTk5KSIgaWQ9InJhZGlhbEdyYWRpZW50LTIiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNjU3NENEIiBzdG9wLW9wYWNpdHk9IjAuNSIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNjU3NENEIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImxvZ28iPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjwvcmVjdD4KICAgICAgICAgICAgPGcgaWQ9IkJpdG1hcCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi41MzEwMTcsIDAuMDQ5NjI4KSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy40Njg5ODMsIDkuOTY3NTIzKSBzY2FsZSgtMSwgMSkgcm90YXRlKC0xODAuMDAwMDAwKSB0cmFuc2xhdGUoLTcuNDY4OTgzLCAtOS45Njc1MjMpIHRyYW5zbGF0ZSgwLjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBmaWxsPSJ1cmwoI3JhZGlhbEdyYWRpZW50LTEpIiBjeD0iNy40Njg5ODI2NCIgY3k9IjEyLjQ2NjA2MjciIHI9IjcuNDY4OTgyNjQiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02LjE4ODU4NTYyLDE5Ljg1MTExNjYgQzQuNjQ1MTYxMywxOS41ODMxMjY2IDMuMzQ0OTEzMTgsMTguOTI4MDM5NyAyLjI2Nzk5MDEsMTcuODc1OTMwNSBDMS4xNjEyOTAzNCwxNi43OTQwNDQ3IDAuNDc2NDI2ODE4LDE1LjUzMzQ5ODggMC4xNDM5MjA2MTUsMTMuOTYwMjk3OCBMMC4wMjk3NzY2OTQsMTMuNDI0MzE3NiBMMC4wMTQ4ODgzNTY2LDYuNzE0NjQwMTkgTDEuOTE2MDAwMDNlLTA4LC00LjkyOTM5MDIzZS0xNiBMMC4xMzg5NTc4MzYsLTQuOTI5MzkwMjNlLTE2IEMwLjIxODM2MjMwMiwtNC45MjkzOTAyM2UtMTYgMC40NzE0NjQwNCwwLjAyNDgxMzg5NTggMC42OTk3NTE4OCwwLjA0OTYyNzc5MTYgQzIuNjUwMTI0MDgsMC4yODc4NDExOTEgNC4zMDc2OTIzMiwxLjQ2ODk4MjYzIDUuMjEwOTE4MTQsMy4yNjA1NDU5MSBDNS40MzkyMDU5OCwzLjcxNzEyMTU5IDUuNjAyOTc3NjgsNC4yNDMxNzYxNyA1LjcxNzEyMTYsNC44OTgyNjMwMyBDNS44MTE0MTQ0Miw1LjQ1NDA5NDI5IDUuODE2Mzc3Miw1LjYzNzcxNzEzIDUuODAxNDg4ODYsOC41MzU5ODAxNSBMNS43ODY2MDA1MiwxMS41ODgwODkzIEw1LjkwNTcwNzIyLDExLjg4NTg1NjEgQzYuMDY5NDc4OTIsMTIuMjkyODA0IDYuNTIxMDkxODQsMTIuNzQ0NDE2OSA2LjkyODAzOTcyLDEyLjkwODE4ODYgTDcuMjI1ODA2NDgsMTMuMDI3Mjk1MyBMMTAuMDA0OTYyOCwxMy4wMzIyNTgxIEMxMS41MzM0OTg4LDEzLjAzMjI1ODEgMTIuODczNDQ5MiwxMy4wNTIxMDkyIDEyLjk3NzY2NzUsMTMuMDcxOTYwMyBDMTMuNDY0MDE5OSwxMy4xNjYyNTMxIDEzLjk4NTExMTcsMTMuNTczMjAxIDE0LjE5MzU0ODQsMTQuMDI0ODEzOSBDMTQuMjUzMTAxOCwxNC4xNDg4ODM0IDE0LjMzMjUwNjIsMTQuMzkyMDU5NiAxNC4zNjcyNDU3LDE0LjU1NTgzMTMgQzE0LjQyMTgzNjIsMTQuODI4Nzg0MSAxNC40MTY4NzM1LDE0LjkwMzIyNTggMTQuMzM3NDY5LDE1LjIxMDkxODEgQzE0LjA4OTMzLDE2LjEyNDA2OTUgMTMuMjE1ODgwOSwxNy4zODk1NzgyIDEyLjMyMjU4MDcsMTguMTI5MDMyMyBDMTEuMzEwMTczNywxOC45Njc3NDE5IDEwLjE5MzU0ODQsMTkuNTI4NTM2IDguOTg3NTkzMDgsMTkuODExNDE0NCBDOC4zNTIzNTczNCwxOS45NTUzMzUgNi45MTMxNTEzOCwxOS45ODAxNDg5IDYuMTg4NTg1NjIsMTkuODUxMTE2NiBaIiBpZD0iUGF0aCIgZmlsbD0idXJsKCNyYWRpYWxHcmFkaWVudC0yKSI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=",
    url: "https://plausible.io",
    tagline: "Easy to use and privacy-friendly Google Analytics alternative",
    repo: "plausible/analytics"
  },
  {
    category: "Analytics",
    label: "Google Analytics",
    flag: "google-analytics",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIwLjkxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI4NCI+PHBhdGggZmlsbD0iI0Y5QUIwMCIgZD0iTTI1Ni4wMDMgMjQ3LjkzM2EzNS4yMjQgMzUuMjI0IDAgMCAxLTM5LjM3NiAzNS4xNjFjLTE4LjA0NC0yLjY3LTMxLjI2Ni0xOC4zNzEtMzAuODI2LTM2LjYwNlYzNi44NDVDMTg1LjM2NSAxOC41OTEgMTk4LjYyIDIuODgxIDIxNi42ODcuMjRhMzUuMjIxIDM1LjIyMSAwIDAgMSAzOS4zMTYgMzUuMTZ2MjEyLjUzM1oiLz48cGF0aCBmaWxsPSIjRTM3NDAwIiBkPSJNMzUuMTAxIDIxMy4xOTNjMTkuMzg2IDAgMzUuMTAxIDE1LjcxNiAzNS4xMDEgMzUuMTAxYzAgMTkuMzg2LTE1LjcxNSAzNS4xMDEtMzUuMTAxIDM1LjEwMVMwIDI2Ny42OCAwIDI0OC4yOTVjMC0xOS4zODYgMTUuNzE1LTM1LjEwMiAzNS4xMDEtMzUuMTAyWm05Mi4zNTgtMTA2LjM4N2MtMTkuNDc3IDEuMDY4LTM0LjU5IDE3LjQwNi0zNC4xMzcgMzYuOTA4djk0LjI4NWMwIDI1LjU4OCAxMS4yNTkgNDEuMTIyIDI3Ljc1NSA0NC40MzNhMzUuMTYxIDM1LjE2MSAwIDAgMCA0Mi4xNDYtMzQuNTZWMTQyLjA4OWEzNS4yMjIgMzUuMjIyIDAgMCAwLTM1Ljc2NC0zNS4yODJaIi8+PC9zdmc+",
    url: "https://analytics.google.com/"
  },
  {
    category: "Analytics",
    label: "Segment",
    flag: "segment",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIwLjk3ZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI2NSI+PHBhdGggZmlsbD0iIzRGQjU4QiIgZD0ibTIzMy41NiAxNDEuOTI3bC4xNy4wMTNsMTcuODkyIDEuODdhNC45MjcgNC45MjcgMCAwIDEgMy4yMjUgMS43MDdsLjEzMy4xNjNsLS4xNy4wODVhNC45MyA0LjkzIDAgMCAxIDEuMDIgMy43NGExMzMuMjcyIDEzMy4yNzIgMCAwIDEtNDEuNjA0IDgxLjA4M2ExMjguODYgMTI4Ljg2IDAgMCAxLTg3LjYyOSAzNC4zOGExMjcuNDg4IDEyNy40ODggMCAwIDEtNDYuMTU2LTguNTdsLS44MDItLjMxMmE0LjcxNiA0LjcxNiAwIDAgMS0yLjY4Ni0yLjUzM2wtLjA3Ny0uMTg3YTQuODkxIDQuODkxIDAgMCAxLS4wODMtMy42Nmw3LjA2Mi0xNy4yM2E0Ljg0NiA0Ljg0NiAwIDAgMSA2LjExOC0yLjc5OWwuMTYzLjA2YzM2LjA5NyAxMy45MzkgNzYuOTggNi4wODkgMTA1LjM0OS0yMC4yMjdhMTA0LjQ1NSAxMDQuNDU1IDAgMCAwIDMyLjg5MS02My4zMmE0LjkzIDQuOTMgMCAwIDEgNS4wMTMtNC4yN2wuMTcuMDA3Wm0tMTkwLjA4IDY0LjMxbC4yNTEtLjAwMmwuMjUzLjAwMmM4LjEyLjA5MyAxNC42NTggNi42NTkgMTQuNzQ2IDE0Ljc0OXYuMjUzYzAgLjA4NCAwIC4xNjgtLjAwMi4yNTJjLS4xNDEgOC4yODQtNi45NyAxNC44ODYtMTUuMjU0IDE0Ljc0NWMtOC4yODQtLjE0MS0xNC44ODUtNi45Ny0xNC43NDUtMTUuMjU0Yy4xMzktOC4xMTUgNi42OTUtMTQuNjE1IDE0Ljc1LTE0Ljc0NVpNNC45MyAxNDcuMDgyaDE0Ni4zMTZhNC45NzMgNC45NzMgMCAwIDEgNC45MjggNC44NDRsLjAwMi4xNzF2MTguMzE2YTQuOTc0IDQuOTc0IDAgMCAxLTQuNzYgNS4wMWwtLjE3LjAwNUg0LjkzQTQuOTc1IDQuOTc1IDAgMCAxIDAgMTcwLjU4NHYtMTguNjU5YTQuOTc1IDQuOTc1IDAgMCAxIDQuNzU1LTQuODM4bC4xNzUtLjAwNVpNMTY5LjU2IDcuMzExYTQuOTc0IDQuOTc0IDAgMCAxIDIuODQ4IDIuNjM1YTUuMDk2IDUuMDk2IDAgMCAxIDAgMy44NjdsLTYuMzc1IDE2Ljk5OWE0Ljg0NSA0Ljg0NSAwIDAgMS02LjE2MiAyLjk3NEExMDEuMjI4IDEwMS4yMjggMCAwIDAgNjIuMTMgNTEuMjUyYTEwNS4yNjcgMTA1LjI2NyAwIDAgMC0zNC41MDcgNTQuOTlhNC45MyA0LjkzIDAgMCAxLTQuNzYgMy42OThoLTEuMTA1TDQuMjUgMTA1LjczM2E0Ljg4NiA0Ljg4NiAwIDAgMS0zLjEwMy0yLjI5NWgtLjA4NUE0LjkyOSA0LjkyOSAwIDAgMSAuNTEgOTkuNTdhMTMzLjM5MyAxMzMuMzkzIDAgMCAxIDQ0LjQxLTcwLjIwNEM3OS43MzkuNyAxMjcuMDE5LTcuNjY2IDE2OS41NiA3LjMxMVptLTY0LjgwNyA3My40MzRIMjUxLjA3YTQuOTcyIDQuOTcyIDAgMCAxIDQuOTIyIDQuNjdsLjAwOC4xNzR2MTguMzE3YTQuOTczIDQuOTczIDAgMCAxLTQuNzYgNS4wMWwtLjE3LjAwNUgxMDQuNzU0YTQuOTcyIDQuOTcyIDAgMCAxLTQuODg2LTQuODQybC0uMDAyLS4xNzNWODUuNzU5YTQuOTcyIDQuOTcyIDAgMCAxIDQuNzE1LTUuMDA4bC4xNzMtLjAwNlptMTAxLjU3Mi01NS44ODNsLjI1Mi0uMDAybC4yNTMuMDAyYzguMTIuMDkzIDE0LjY1OCA2LjY1OSAxNC43NDYgMTQuNzQ4di4yNTNjMCAuMDg1IDAgLjE3LS4wMDIuMjUzYy0uMTQgOC4yODQtNi45NyAxNC44ODUtMTUuMjU0IDE0Ljc0NGMtOC4yODQtLjE0LTE0Ljg4NS02Ljk3LTE0Ljc0NC0xNS4yNTNjLjEzOC04LjExNiA2LjY5NC0xNC42MTYgMTQuNzQ5LTE0Ljc0NVoiLz48L3N2Zz4=",
    url: "https://segment.com",
    disabled: !0
  },
  // Hosting
  {
    category: "Hosting",
    label: "Cloudflare",
    flag: "cloudflare",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyLjE5ZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDExNyI+PHBhdGggZmlsbD0iI2ZiYWQ0MSIgZD0iTTIwNS41MiA1MC44MTNjLS44NTggMC0xLjcwNS4wMy0yLjU1MS4wNThxLS4yMDcuMDEyLS4zOTguMDk0YTEuNDIgMS40MiAwIDAgMC0uOTIuOTk0bC0zLjYyOCAxMi42NzJjLTEuNTY1IDUuNDQ5LS45ODMgMTAuNDggMS42NDYgMTQuMTc0YzIuNDEgMy40MTYgNi40MiA1LjQyMSAxMS4yODkgNS42NTVsMTkuNjc5IDEuMTk0Yy41ODUuMDMgMS4wOTIuMzEyIDEuNC43NzZhMS45MiAxLjkyIDAgMCAxIC4yIDEuNjkyYTIuNSAyLjUgMCAwIDEtMi4xMzQgMS42NjJsLTIwLjQ0OCAxLjE5M2MtMTEuMTEuNTE1LTIzLjA2MiA5LjU4LTI3LjI1NSAyMC42MzNsLTEuNDc0IDMuOWExLjA5MiAxLjA5MiAwIDAgMCAuOTY3IDEuNDloNzAuNDI1YTEuODcgMS44NyAwIDAgMCAxLjgxLTEuMzY1QTUxLjIgNTEuMiAwIDAgMCAyNTYgMTAxLjgyOGMwLTI4LjE2LTIyLjU4Mi01MC45ODQtNTAuNDQ5LTUwLjk4NCIvPjxwYXRoIGZpbGw9IiNmNjgyMWYiIGQ9Im0xNzQuNzgyIDExNS4zNjJsMS4zMDMtNC41ODNjMS41NjgtNS40NDkuOTg3LTEwLjQ4LTEuNjM5LTE0LjE3M2MtMi40MTgtMy40MTctNi40MjQtNS40MjItMTEuMjk2LTUuNjU2bC05Mi4zMTItMS4xOTNhMS44MiAxLjgyIDAgMCAxLTEuNDU5LS43NzZhMS45MiAxLjkyIDAgMCAxLS4yMDMtMS42OTNhMi41IDIuNSAwIDAgMSAyLjE1NC0xLjY2Mmw5My4xNzMtMS4xOTNjMTEuMDYzLS41MTEgMjMuMDE1LTkuNTggMjcuMjA4LTIwLjYzM2w1LjMxMy0xNC4wNGMuMjE0LS41OTYuMjctMS4yMzguMTU2LTEuODZDMTkxLjEyNiAyMC41MSAxNjYuOTEgMCAxMzcuOTYgMEMxMTEuMjY5IDAgODguNjI2IDE3LjQwMyA4MC41IDQxLjU5NmEyNyAyNyAwIDAgMC0xOS4xNTYtNS4zNTlDNDguNTQ5IDM3LjUyNCAzOC4yNSA0Ny45NDYgMzYuOTc5IDYwLjg4YTI3LjkgMjcuOSAwIDAgMCAuNzAyIDkuNjQyQzE2Ljc3MyA3MS4xNDUgMCA4OC40NTQgMCAxMDkuNzI2YzAgMS45MjMuMTM3IDMuODE4LjQxMyA1LjY2N2MuMTE1Ljg5Ny44NzkgMS41NyAxLjc4MyAxLjU2OGgxNzAuNDhhMi4yMiAyLjIyIDAgMCAwIDIuMTA2LTEuNjMiLz48L3N2Zz4=",
    url: "https://pages.cloudflare.com/",
    tagline: "Create full-stack applications that are instantly deployed to the Cloudflare global network",
    repo: "cloudflare/workers-sdk",
    links: [
      {
        label: "Docs",
        href: "https://developers.cloudflare.com/pages/"
      },
      {
        label: "Vike integration",
        href: "https://vike.dev/cloudflare-pages#full-stack"
      },
      {
        label: "vike-cloudflare",
        href: "https://github.com/vikejs/vike-cloudflare"
      }
    ]
  },
  {
    category: "Hosting",
    label: "Vercel",
    flag: "vercel",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxLjE2ZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDIyMiI+PHBhdGggZD0ibTEyOCAwbDEyOCAyMjEuNzA1SDB6Ii8+PC9zdmc+",
    url: "https://vercel.com",
    tagline: "Develop with your favorite tools. Launch globally, instantly. Keep pushing",
    repo: "vercel/vercel",
    links: [
      {
        label: "Guides",
        href: "https://vercel.com/guides"
      },
      {
        label: "Docs",
        href: "https://vercel.com/docs"
      }
    ]
  },
  {
    category: "Hosting",
    label: "Netlify",
    flag: "netlify",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxLjE0ZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDIyNiI+PHBhdGggZmlsbD0iIzA1QkRCQSIgZD0iTTY5LjE4MSAxODguMDg3aC0yLjQxN2wtMTIuMDY1LTEyLjA2NXYtMi40MTdsMTguNDQ0LTE4LjQ0NGgxMi43NzhsMS43MDQgMS43MDR2MTIuNzc4ek01NC42OTkgNTEuNjI4di0yLjQxN2wxMi4wNjUtMTIuMDY1aDIuNDE3TDg3LjYyNSA1NS41OXYxMi43NzhsLTEuNzA0IDEuNzA0SDczLjE0M3oiLz48cGF0aCBmaWxsPSIjMDE0ODQ3IiBkPSJNMTYwLjkwNiAxNDkuMTk4aC0xNy41NTJsLTEuNDY2LTEuNDY2di00MS4wODljMC03LjMxLTIuODczLTEyLjk3Ni0xMS42ODktMTMuMTc0Yy00LjUzNy0uMTE5LTkuNzI3IDAtMTUuMjc0LjIxOGwtLjgzMy44NTJ2NTMuMTczbC0xLjQ2NiAxLjQ2Nkg5NS4wNzRsLTEuNDY2LTEuNDY2di03MC4xOWwxLjQ2Ni0xLjQ2N2gzOS41MDNjMTUuMzU0IDAgMjcuNzk1IDEyLjQ0MSAyNy43OTUgMjcuNzk1djQzLjg4MmwtMS40NjYgMS40NjZaIi8+PHBhdGggZmlsbD0iIzA1QkRCQSIgZD0iTTcxLjY3NyAxMjIuODg5SDEuNDY2TDAgMTIxLjQyM1YxMDMuODNsMS40NjYtMS40NjZoNzAuMjExbDEuNDY2IDEuNDY2djE3LjU5M3ptMTgyLjg1NyAwaC03MC4yMTFsLTEuNDY2LTEuNDY2VjEwMy44M2wxLjQ2Ni0xLjQ2Nmg3MC4yMTFMMjU2IDEwMy44M3YxNy41OTN6TTExNy44NzYgNTQuMTI0VjEuNDY2TDExOS4zNDIgMGgxNy41OTNsMS40NjYgMS40NjZ2NTIuNjU4bC0xLjQ2NiAxLjQ2NmgtMTcuNTkzem0wIDE2OS42NjN2LTUyLjY1OGwxLjQ2Ni0xLjQ2NmgxNy41OTNsMS40NjYgMS40NjZ2NTIuNjU4bC0xLjQ2NiAxLjQ2NWgtMTcuNTkzeiIvPjwvc3ZnPg==",
    url: "https://www.netlify.com",
    disabled: !0
  },
  {
    category: "Hosting",
    label: "AWS",
    flag: "aws",
    image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDY0ICg5MzUzNykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+SWNvbi1BcmNoaXRlY3R1cmUvNjQvQXJjaF9BV1MtQ2xvdWQtRGV2ZWxvcG1lbnQtS2l0XzY0PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjEwMCUiIHgyPSIxMDAlIiB5Mj0iMCUiIGlkPSJsaW5lYXJHcmFkaWVudC0xIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzJFMjdBRCIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNTI3RkZGIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgPGcgaWQ9Ikljb24tQXJjaGl0ZWN0dXJlLzY0L0FyY2hfQVdTLUNsb3VkLURldmVsb3BtZW50LUtpdF82NCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ikljb24tQXJjaGl0ZWN0dXJlLUJHLzY0L0RldmVsb3Blci1Ub29scyIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0xKSI+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHg9IjAiIHk9IjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PC9yZWN0PgogICAgICAgIDwvZz4KICAgICAgICA8cGF0aCBkPSJNNjgsMzkuMzA1NTI0OSBDNjgsNDYuMjM0NzA3OCA2My4yNjYyNDk1LDQ4Ljc3NjA0MTMgNjAuNDQ1MjU1OSw0OS42NzQ4MDU2IEw1OS44NDU3MjAzLDQ3Ljc2ODMwNTYgQzYyLjY1OTc2NTcsNDYuODcyNTQwNSA2Ni4wMTQ3ODI4LDQ0LjY3NzExNjIgNjYuMDE0NzgyOCwzOS4zMDU1MjQ5IEM2Ni4wMTQ3ODI4LDMyLjUxNDMwNTggNjAuNDU2MTc0NiwzMC44MTg3NTA1IDU4LjA2Njk2NTYsMzAuNDA0ODU5IEM1Ny41MzM5MzQ4LDMwLjMxMjg4MzEgNTcuMTczNjE3OSwyOS44MDgwMTU1IDU3LjI1MzAyNjYsMjkuMjcwMTU2NiBMNTcuMjUzMDI2NiwyOS4yNzAxNTY2IEM1Ny4wMTY3ODU3LDI2LjE3NTk2OCA1NS41Nzc1MDMyLDIzLjk1MDU1MTYgNTMuMzkwNzg2NSwyMy4zMDY3MjA0IEM1MS41NzQzMTI3LDIyLjc3Mjg2MDQgNDkuNjIyODQ0MiwyMy40ODA2NzQ4IDQ4LjQyNTc1ODIsMjUuMTE0MjQ2NCBDNDguMjA4Mzc2OSwyNS40MTExNjg2IDQ3Ljg0MTExMTcsMjUuNTYyMTI5IDQ3LjQ4MDc5NDgsMjUuNTA5MTQyOSBDNDcuMTE3NSwyNS40NTUxNTcgNDYuODEzNzYxOCwyNS4yMDIyMjM0IDQ2LjY5MTY3MSwyNC44NTMzMTQ5IEM0NS44NjY4MTMyLDIyLjUwMzkzMSA0NC42NzE3MTI0LDIwLjUyNzQ0OTMgNDMuMTQwMTE3MywxOC45Nzg4NTU0IEM0MS4yNjAxMTY2LDE3LjA3OTM1MzUgMzYuMTAyNTIyMywxMi45OTQ0MjQ4IDI4LjgxMjgwNDcsMTYuMTAxNjA5OSBDMjQuNjAzMTUxNSwxNy44OTcxMzkxIDIxLjMwNTcwNTcsMjMuMDY5NzgyNiAyMS4zMDU3MDU3LDI3Ljg3NjUyMjEgQzIxLjMwNTcwNTcsMjguNDExMzgxOCAyMS4zMzc0NjkyLDI4Ljk1MDI0MDUgMjEuNDAwOTk2MiwyOS40NzkxMDE4IEMyMS40NTk1NjAxLDI5Ljk3Njk3MTIgMjEuMTQyOTE3OSwzMC40NDE4NDkzIDIwLjY2MDUxMDEsMzAuNTY1ODE2OCBDMTguMTY3MDc3MywzMS4yMDY2NDg4IDEzLjk4NTIxNzIsMzMuMTgyMTMwNyAxMy45ODUyMTcyLDM5LjIyMTU0NjkgQzEzLjk4NTIxNzIsMzkuNDE3NDk1NSAxMy45OTAxODAzLDM5LjYwOTQ0NTIgMTQuMDAwMTA2NCwzOS43OTgzOTU2IEMxNC4xODY3MTY4LDQzLjY4NjM3NiAxNy4wMjc1NjI2LDQ3LjAyNjUwMDEgMjAuOTEwNjQ3NSw0Ny45MjMyNjUgTDIwLjQ2NTk1ODgsNDkuODcxNzU0IEMxNS43MjEyODk3LDQ4Ljc3NTA0MTYgMTIuMjQ2MTY2OSw0NC42NzQxMTcgMTIuMDE2ODc0MywzOS44OTgzNjk0IEMxMi4wMDQ5NjMsMzkuNjgwNDI2NiAxMiwzOS40NTI0ODY0IDEyLDM5LjIyMTU0NjkgQzEyLDMyLjMxNDM1ODMgMTYuNjM3NDY3NCwyOS43NjcwMjYzIDE5LjM1MjI1MiwyOC44NjkyNjE3IEMxOS4zMzE0MDcyLDI4LjUzODM0ODUgMTkuMzIwNDg4NSwyOC4yMDY0MzU1IDE5LjMyMDQ4ODUsMjcuODc2NTIyMSBDMTkuMzIwNDg4NSwyMi4yMzQwMDE4IDIzLjA2ODU3ODYsMTYuMzgwNTM2OCAyOC4wMzk1NjI1LDE0LjI2MDA5MjkgQzMzLjg2NDE4OTksMTEuNzc0NzQ0NiA0MC4wMzYyMzAyLDEzLjAxMTQyMDMgNDQuNTQ1NjUxMSwxNy41NjcyMjU2IEM0NS45NDgyMDcxLDE4Ljk4NDg1MzggNDcuMDk3NjQ3OSwyMC43MDQ0MDI5IDQ3Ljk3NDEyMTMsMjIuNjk0ODgwOSBDNDkuNjQyNjk2NCwyMS4yODIyNTEzIDUxLjg0OTI2NTMsMjAuNzcwMzg1NiA1My45NDc2Mzk5LDIxLjM4ODIyMzYgQzU2LjgyNjIwNDksMjIuMjM1MDAxNSA1OC43NTI4NTgyLDI0LjkwNjMwMSA1OS4xODI2NTc3LDI4LjU5NDMzMzggQzYxLjk5ODY4ODMsMjkuMjU3MTYgNjgsMzEuNTgwNTUwNyA2OCwzOS4zMDU1MjQ5IEw2OCwzOS4zMDU1MjQ5IFogTTU2Ljg5ODY2NTMsNjEuMzEzNzUzNCBMNDkuOTYzMzA4OSw2NS4xOTk3MzQzIEw0OS45NjMzMDg5LDU2LjU1NDAwMTYgTDU2Ljg5ODY2NTMsNTIuNjEyMDM1NCBMNTYuODk4NjY1Myw2MS4zMTM3NTM0IFogTTM5LjAwNzg4NzcsNjEuMjg4NzYgTDMyLjA4NzQyMDUsNjUuMjc2NzE0MiBMMzIuMDg3NDIwNSw1Ni41MjAwMTA1IEwzOS4wMDc4ODc3LDUyLjU5MDA0MTEgTDM5LjAwNzg4NzcsNjEuMjg4NzYgWiBNMzEuMDkxODM0LDU0Ljc5MDQ2NDEgTDI0LjE2OTM4MTYsNTAuOTA1NDgyOSBMMzEuMTAzNzQ1Myw0Ny4wMjA1MDE3IEwzNy45NzE2MDQzLDUwLjg4MjQ4ODkgTDMxLjA5MTgzNCw1NC43OTA0NjQxIFogTTIzLjEyMTE4NjksNTIuNjA2MDM2OSBMMzAuMTAyMjAzMiw1Ni41MjQwMDk1IEwzMC4xMDIyMDMyLDY1LjI4MTcxMjggTDIzLjEyMTE4NjksNjEuMjg2NzYwNSBMMjMuMTIxMTg2OSw1Mi42MDYwMzY5IFogTTQwLjAyOTI4MiwzMi4wNTM0MjY3IEw0Ni45MTEwMzc1LDM1Ljg5ODQxODQgTDQwLjAwMDQ5NjMsMzkuNzYzNDA0OCBMMzMuMTQ0NTQ4NiwzNS45MTg0MTMxIEw0MC4wMjkyODIsMzIuMDUzNDI2NyBaIE00Mi4wMzIzNjYxLDUwLjg4NDQ4ODQgTDQ4Ljk1NDgxODYsNDcuMDA0NTA1OSBMNTUuODY1MzU5Nyw1MC45MDM0ODM0IEw0OC45NzA3MDAzLDU0LjgyMjQ1NTcgTDQyLjAzMjM2NjEsNTAuODg0NDg4NCBaIE00MC45OTMxMDQ5LDUyLjU4OTA0MTQgTDQ3Ljk3ODA5MTcsNTYuNTU0MDAxNiBMNDcuOTc4MDkxNyw2NS4xOTk3MzQzIEw0MC45OTMxMDQ5LDYxLjI4MDc2MjEgTDQwLjk5MzEwNDksNTIuNTg5MDQxNCBaIE00Ny45NjQxOTUyLDQ1LjI3MTk2MDIgTDQwLjk5MzEwNDksNDkuMTc3OTM1OSBMNDAuOTkzMTA0OSw0MS40OTQ5NTA3IEw0Ny45NjQxOTUyLDM3LjU5Njk3MjkgTDQ3Ljk2NDE5NTIsNDUuMjcxOTYwMiBaIE0zMi4wOTczNDY1LDM3LjYxODk2NzIgTDM5LjAwNzg4NzcsNDEuNDkzOTUxIEwzOS4wMDc4ODc3LDQ5LjE3NDkzNjcgTDMyLjA5NzM0NjUsNDUuMjg4OTU1OCBMMzIuMDk3MzQ2NSwzNy42MTg5NjcyIFogTTU4LjM5MTU0ODYsNTAuMDM2NzEwNyBDNTguMzg2NTg1Niw1MC4wMzM3MTE1IDU4LjM4MDYzLDUwLjAzMjcxMTggNTguMzc1NjY2OSw1MC4wMjk3MTI2IEw1OC4zNzY2NTk1LDUwLjAyNzcxMzEgTDQ5Ljk0OTQxMjQsNDUuMjczOTU5NyBMNDkuOTQ5NDEyNCwzNS44OTg0MTg0IEM0OS45NDk0MTI0LDM1LjU0MzUxMTQgNDkuNzYzNzk0NiwzNS4yMTY1OTcyIDQ5LjQ2MDA1NjQsMzUuMDM2NjQ0NCBDNDkuNDUyMTE1NSwzNS4wMzI2NDU0IDQ5LjQ0NTE2NzIsMzUuMDMwNjQ1OSA0OS40MzcyMjY0LDM1LjAyNjY0NyBMNDkuNDM5MjExNiwzNS4wMjM2NDc4IEw0MC41MTA2OTcxLDMwLjAzNTk1NTggQzQwLjIwODk0NDEsMjkuODY4OTk5NSAzOS44NDM2NjQxLDI5Ljg2ODk5OTUgMzkuNTQ1ODgxNiwzMC4wMzY5NTU1IEwzMC42MjIzMzAxLDM1LjA0NTY0MiBMMzAuNjIzMzIyOCwzNS4wNDc2NDE1IEMzMC42MTYzNzQ1LDM1LjA1MTY0MDQgMzAuNjA4NDMzNiwzNS4wNTI2NDAyIDMwLjYwMTQ4NTQsMzUuMDU2NjM5MSBDMzAuMjk4NzM5NywzNS4yMzY1OTE5IDMwLjExMjEyOTMsMzUuNTY0NTA1OSAzMC4xMTIxMjkzLDM1LjkxODQxMzEgTDMwLjExMjEyOTMsNDUuMjg2OTU2MyBMMjEuNjQ2MTcwNSw1MC4wMzA3MTIzIEwyMS42NDgxNTU3LDUwLjAzMjcxMTggQzIxLjY0MDIxNDgsNTAuMDM2NzEwNyAyMS42MzIyNzQsNTAuMDM4NzEwMiAyMS42MjUzMjU3LDUwLjA0MjcwOTIgQzIxLjMyMjU4MDEsNTAuMjIxNjYyMiAyMS4xMzU5Njk3LDUwLjU1MDU3NiAyMS4xMzU5Njk3LDUwLjkwNDQ4MzIgTDIxLjEzNTk2OTcsNjEuODY4NjA3OSBDMjEuMTM1OTY5Nyw2Mi4yMjg1MTM1IDIxLjMyNzU0MzEsNjIuNTYwNDI2NSAyMS42MzgyMjk2LDYyLjczNzM4MDEgTDMwLjU5NjUyMjMsNjcuODY1MDM1NCBMMzAuNjA0NDYzMiw2Ny44NzAwMzQxIEwzMC42MDQ0NjMyLDY3Ljg2OTAzNDMgQzMwLjc1NzMyNDksNjcuOTU2MDExNSAzMC45MjYwNjg0LDY4IDMxLjA5NDgxMTgsNjggQzMxLjI2NDU0NzksNjggMzEuNDM1Mjc2Niw2Ny45NTYwMTE1IDMxLjU4ODEzODMsNjcuODY4MDM0NiBMNDAuMDA3NDQ0Niw2My4wMTYzMDY5IEw0OC40ODgyOTI1LDY3Ljc3NDA1OTMgTDQ4LjQ4OTI4NTEsNjcuNzcxMDYgQzQ4LjYzOTE2OSw2Ny44NTUwMzggNDguODAzOTQyMSw2Ny45MDAwMjYyIDQ4Ljk3MDcwMDMsNjcuOTAwMDI2MiBDNDkuMTM2NDY2LDY3LjkwMDAyNjIgNDkuMzAzMjI0Miw2Ny44NTgwMzcyIDQ5LjQ1MzEwODEsNjcuNzc0MDU5MyBMNTguMzc0Njc0Myw2Mi43NzUzNzAxIEM1OC42ODkzMzEyLDYyLjU5ODQxNjUgNTguODgzODgyNSw2Mi4yNjQ1MDQxIDU4Ljg4Mzg4MjUsNjEuOTAxNTk5MyBMNTguODgzODgyNSw1MC45MDA0ODQyIEM1OC44ODM4ODI1LDUwLjU0NDU3NzUgNTguNjk3MjcyMSw1MC4yMTY2NjM1IDU4LjM5MTU0ODYsNTAuMDM2NzEwNyBMNTguMzkxNTQ4Niw1MC4wMzY3MTA3IFoiIGlkPSJBV1MtQ2xvdWQtRGV2ZWxvcG1lbnQtS2l0X0ljb25fNjRfU3F1aWQiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+",
    url: "https://aws.amazon.com",
    tagline: "Deploy to AWS Lambda with Infrastructure as Code with the AWS CDK",
    repo: "aws/aws-cdk",
    links: [
      {
        label: "Docs",
        href: "https://github.com/aws/aws-cdk"
      }
    ]
  },
  // Linter
  {
    category: "Linter",
    label: "ESLint",
    flag: "eslint",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxLjE0ZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDIyNSI+PHBhdGggZmlsbD0iIzgwODBGMiIgZD0ibTc3Ljk2NSA4MC41NjhsNDguNTctMjguMDQyYTMuOTI5IDMuOTI5IDAgMCAxIDMuOTMgMGw0OC41NyAyOC4wNDJBMy45MzIgMy45MzIgMCAwIDEgMTgxIDgzLjk3MXY1Ni4wODRjMCAxLjQwMy0uNzUgMi43LTEuOTY1IDMuNDAzbC00OC41NyAyOC4wNDJhMy45MjkgMy45MjkgMCAwIDEtMy45MyAwbC00OC41Ny0yOC4wNDJBMy45MzEgMy45MzEgMCAwIDEgNzYgMTQwLjA1NVY4My45N2MuMDAxLTEuNDA0Ljc1LTIuNyAxLjk2NS0zLjQwMyIvPjxwYXRoIGZpbGw9IiM0QjMyQzMiIGQ9Ik0yNTQuNDE3IDEwNy40MTdMMTk2LjMyMyA2LjM1QzE5NC4yMTMgMi42OTYgMTkwLjMxNSAwIDE4Ni4wOTUgMEg2OS45MDZjLTQuMjIgMC04LjEyIDIuNjk2LTEwLjIzIDYuMzVMMS41ODMgMTA3LjE5NGMtMi4xMSAzLjY1NS0yLjExIDguMjY4IDAgMTEuOTIzbDU4LjA5MyAxMDAuMjM5YzIuMTEgMy42NTQgNi4wMSA1LjUyMiAxMC4yMyA1LjUyMmgxMTYuMTg4YzQuMjIgMCA4LjExOS0xLjgxMiAxMC4yMjgtNS40NjdsNTguMDk0LTEwMC40MDJjMi4xMTItMy42NTMgMi4xMTItNy45MzggMC0xMS41OTJabS00OC4xMDUgNDguNmMwIDEuNDg1LS44OTQgMi44Ni0yLjE4MiAzLjYwNGwtNzMuOTk5IDQyLjY5M2E0LjIxIDQuMjEgMCAwIDEtNC4xODYgMGwtNzQuMDU2LTQyLjY5M2MtMS4yODctLjc0NC0yLjE4OC0yLjExOC0yLjE4OC0zLjYwNVY3MC42MjhjMC0xLjQ4Ny44ODgtMi44NiAyLjE3Ni0zLjYwNGw3My45OTUtNDIuNjk0YTQuMjAyIDQuMjAyIDAgMCAxIDQuMTg1IDBsNzQuMDYgNDIuNjk0YzEuMjg5Ljc0NCAyLjE5NSAyLjExNyAyLjE5NSAzLjYwNHY4NS4zODhaIi8+PC9zdmc+",
    url: "https://eslint.org",
    tagline: "Find and fix problems in your JavaScript code",
    repo: "eslint/eslint",
    links: [
      {
        label: "Docs",
        href: "https://eslint.org/docs/latest/"
      }
    ]
  },
  {
    category: "Linter",
    label: "Prettier",
    flag: "prettier",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHJlY3Qgd2lkdGg9IjI0LjM4MSIgaGVpZ2h0PSIxMi4xOSIgeD0iMTgyLjg1NyIgeT0iNDguNzYyIiBmaWxsPSIjNTZCM0I0IiByeD0iNSIvPjxyZWN0IHdpZHRoPSI3My4xNDMiIGhlaWdodD0iMTIuMTkiIHk9IjI0My44MSIgZmlsbD0iI0VBNUU1RSIgcng9IjUiLz48cmVjdCB3aWR0aD0iNDguNzYyIiBoZWlnaHQ9IjEyLjE5IiB4PSIxNDYuMjg2IiB5PSIxNDYuMjg2IiBmaWxsPSIjQkY4NUJGIiByeD0iNSIvPjxyZWN0IHdpZHRoPSI2MC45NTIiIGhlaWdodD0iMTIuMTkiIHg9IjczLjE0MyIgeT0iMTQ2LjI4NiIgZmlsbD0iI0VBNUU1RSIgcng9IjUiLz48cmVjdCB3aWR0aD0iNjAuOTUyIiBoZWlnaHQ9IjEyLjE5IiB5PSIxNDYuMjg2IiBmaWxsPSIjNTZCM0I0IiByeD0iNSIvPjxyZWN0IHdpZHRoPSI3My4xNDMiIGhlaWdodD0iMTIuMTkiIHk9IjE5NS4wNDgiIGZpbGw9IiNCRjg1QkYiIHJ4PSI1Ii8+PHJlY3Qgd2lkdGg9IjczLjE0MyIgaGVpZ2h0PSIxMi4xOSIgeT0iOTcuNTI0IiBmaWxsPSIjQkY4NUJGIiByeD0iNSIvPjxyZWN0IHdpZHRoPSIxMzQuMDk1IiBoZWlnaHQ9IjEyLjE5IiB4PSI2MC45NTIiIHk9IjI0LjM4MSIgZmlsbD0iI0Y3QkEzRSIgcng9IjUiLz48cmVjdCB3aWR0aD0iNDguNzYyIiBoZWlnaHQ9IjEyLjE5IiB5PSIyNC4zODEiIGZpbGw9IiNFQTVFNUUiIHJ4PSI1Ii8+PHJlY3Qgd2lkdGg9IjI0LjM4MSIgaGVpZ2h0PSIxMi4xOSIgeD0iNDguNzYyIiB5PSIyMTkuNDI5IiBmaWxsPSIjRjdCQTNFIiByeD0iNSIvPjxyZWN0IHdpZHRoPSIyNC4zODEiIGhlaWdodD0iMTIuMTkiIHg9IjQ4Ljc2MiIgeT0iNzMuMTQzIiBmaWxsPSIjNTZCM0I0IiByeD0iNSIvPjxyZWN0IHdpZHRoPSIzNi41NzEiIGhlaWdodD0iMTIuMTkiIHk9IjIxOS40MjkiIGZpbGw9IiM1NkIzQjQiIHJ4PSI1Ii8+PHJlY3Qgd2lkdGg9IjM2LjU3MSIgaGVpZ2h0PSIxMi4xOSIgeT0iNzMuMTQzIiBmaWxsPSIjRjdCQTNFIiByeD0iNSIvPjxyZWN0IHdpZHRoPSIyNC4zODEiIGhlaWdodD0iMTIuMTkiIHg9IjE1OC40NzYiIHk9IjIxOS40MjkiIGZpbGw9IiNEMEQ0RDgiIG9wYWNpdHk9Ii41IiByeD0iNSIvPjxyZWN0IHdpZHRoPSI2MC45NTIiIGhlaWdodD0iMTIuMTkiIHg9Ijg1LjMzMyIgeT0iMjE5LjQyOSIgZmlsbD0iI0QwRDREOCIgb3BhY2l0eT0iLjUiIHJ4PSI1Ii8+PHJlY3Qgd2lkdGg9IjYwLjk1MiIgaGVpZ2h0PSIxMi4xOSIgeD0iMTk1LjA0OCIgeT0iMjE5LjQyOSIgZmlsbD0iI0QwRDREOCIgb3BhY2l0eT0iLjUiIHJ4PSI1Ii8+PHJlY3Qgd2lkdGg9IjEwOS43MTQiIGhlaWdodD0iMTIuMTkiIHg9Ijk3LjUyNCIgeT0iMTIxLjkwNSIgZmlsbD0iIzU2QjNCNCIgcng9IjUiLz48cmVjdCB3aWR0aD0iNDguNzYyIiBoZWlnaHQ9IjEyLjE5IiB4PSIzNi41NzEiIHk9IjEyMS45MDUiIGZpbGw9IiNGN0JBM0UiIHJ4PSI1Ii8+PHJlY3Qgd2lkdGg9IjI0LjM4MSIgaGVpZ2h0PSIxMi4xOSIgeT0iMTIxLjkwNSIgZmlsbD0iI0VBNUU1RSIgcng9IjUiLz48cmVjdCB3aWR0aD0iNjAuOTUyIiBoZWlnaHQ9IjEyLjE5IiB4PSIxMDkuNzE0IiB5PSI0OC43NjIiIGZpbGw9IiNCRjg1QkYiIHJ4PSI1Ii8+PHJlY3Qgd2lkdGg9Ijk3LjUyNCIgaGVpZ2h0PSIxMi4xOSIgeT0iNDguNzYyIiBmaWxsPSIjNTZCM0I0IiByeD0iNSIvPjxyZWN0IHdpZHRoPSIxMjEuOTA1IiBoZWlnaHQ9IjEyLjE5IiB4PSIzNi41NzEiIHk9IjE3MC42NjciIGZpbGw9IiNGN0JBM0UiIHJ4PSI1Ii8+PHJlY3Qgd2lkdGg9IjI0LjM4MSIgaGVpZ2h0PSIxMi4xOSIgeT0iMTcwLjY2NyIgZmlsbD0iI0JGODVCRiIgcng9IjUiLz48cmVjdCB3aWR0aD0iNzMuMTQzIiBoZWlnaHQ9IjEyLjE5IiB4PSIxNDYuMjg2IiB5PSI3My4xNDMiIGZpbGw9IiNFQTVFNUUiIHJ4PSI1Ii8+PHJlY3Qgd2lkdGg9IjczLjE0MyIgaGVpZ2h0PSIxMi4xOSIgeD0iMTQ2LjI4NiIgeT0iOTcuNTI0IiBmaWxsPSIjRjdCQTNFIiByeD0iNSIvPjxyZWN0IHdpZHRoPSIxNTguNDc2IiBoZWlnaHQ9IjEyLjE5IiBmaWxsPSIjNTZCM0I0IiByeD0iNSIvPjxyZWN0IHdpZHRoPSI4NS4zMzMiIGhlaWdodD0iMTIuMTkiIHg9IjE3MC42NjciIGZpbGw9IiNEMEQ0RDgiIG9wYWNpdHk9Ii41IiByeD0iNSIvPjxyZWN0IHdpZHRoPSIzNi41NzEiIGhlaWdodD0iMTIuMTkiIHg9IjE3MC42NjciIHk9IjE3MC42NjciIGZpbGw9IiNEMEQ0RDgiIG9wYWNpdHk9Ii41IiByeD0iNSIvPjxyZWN0IHdpZHRoPSIzNi41NzEiIGhlaWdodD0iMTIuMTkiIHg9IjIxOS40MjkiIHk9IjE3MC42NjciIGZpbGw9IiNEMEQ0RDgiIG9wYWNpdHk9Ii41IiByeD0iNSIvPjxyZWN0IHdpZHRoPSI0OC43NjIiIGhlaWdodD0iMTIuMTkiIHg9IjIwNy4yMzgiIHk9IjE0Ni4yODYiIGZpbGw9IiNEMEQ0RDgiIG9wYWNpdHk9Ii41IiByeD0iNSIvPjxyZWN0IHdpZHRoPSI0OC43NjIiIGhlaWdodD0iMTIuMTkiIHg9IjIwNy4yMzgiIHk9IjI0LjM4MSIgZmlsbD0iI0QwRDREOCIgb3BhY2l0eT0iLjUiIHJ4PSI1Ii8+PHJlY3Qgd2lkdGg9IjM2LjU3MSIgaGVpZ2h0PSIxMi4xOSIgeD0iMjE5LjQyOSIgeT0iMTIxLjkwNSIgZmlsbD0iI0QwRDREOCIgb3BhY2l0eT0iLjUiIHJ4PSI1Ii8+PHJlY3Qgd2lkdGg9IjM2LjU3MSIgaGVpZ2h0PSIxMi4xOSIgeD0iMjE5LjQyOSIgeT0iNDguNzYyIiBmaWxsPSIjRDBENEQ4IiBvcGFjaXR5PSIuNSIgcng9IjUiLz48cmVjdCB3aWR0aD0iMjQuMzgxIiBoZWlnaHQ9IjEyLjE5IiB4PSIyMzEuNjE5IiB5PSI3My4xNDMiIGZpbGw9IiNEMEQ0RDgiIG9wYWNpdHk9Ii41IiByeD0iNSIvPjxyZWN0IHdpZHRoPSIyNC4zODEiIGhlaWdodD0iMTIuMTkiIHg9IjIzMS42MTkiIHk9Ijk3LjUyNCIgZmlsbD0iI0QwRDREOCIgb3BhY2l0eT0iLjUiIHJ4PSI1Ii8+PHJlY3Qgd2lkdGg9IjEyMS45MDUiIGhlaWdodD0iMTIuMTkiIHg9IjEzNC4wOTUiIHk9IjE5NS4wNDgiIGZpbGw9IiNEMEQ0RDgiIG9wYWNpdHk9Ii41IiByeD0iNSIvPjxyZWN0IHdpZHRoPSIzNi41NzEiIGhlaWdodD0iMTIuMTkiIHg9Ijg1LjMzMyIgeT0iMTk1LjA0OCIgZmlsbD0iI0QwRDREOCIgb3BhY2l0eT0iLjUiIHJ4PSI1Ii8+PHJlY3Qgd2lkdGg9IjczLjE0MyIgaGVpZ2h0PSIxMi4xOSIgeD0iMTgyLjg1NyIgeT0iMjQzLjgxIiBmaWxsPSIjRDBENEQ4IiBvcGFjaXR5PSIuNSIgcng9IjUiLz48cmVjdCB3aWR0aD0iODUuMzMzIiBoZWlnaHQ9IjEyLjE5IiB4PSI4NS4zMzMiIHk9IjI0My44MSIgZmlsbD0iI0QwRDREOCIgb3BhY2l0eT0iLjUiIHJ4PSI1Ii8+PHJlY3Qgd2lkdGg9IjQ4Ljc2MiIgaGVpZ2h0PSIxMi4xOSIgeD0iODUuMzMzIiB5PSI3My4xNDMiIGZpbGw9IiNEMEQ0RDgiIG9wYWNpdHk9Ii41IiByeD0iNSIvPjxyZWN0IHdpZHRoPSI0OC43NjIiIGhlaWdodD0iMTIuMTkiIHg9Ijg1LjMzMyIgeT0iOTcuNTI0IiBmaWxsPSIjRDBENEQ4IiBvcGFjaXR5PSIuNSIgcng9IjUiLz48L3N2Zz4=",
    url: "https://prettier.io",
    tagline: "An opinionated code formatter",
    repo: "prettier/prettier",
    links: [
      {
        label: "Docs",
        href: "https://prettier.io/docs/en/"
      }
    ]
  },
  {
    category: "Linter",
    label: "Biome",
    flag: "biome",
    image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICdodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQnPjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2ZXJzaW9uPScxLjEnIHdpZHRoPSc0OHB4JyBoZWlnaHQ9JzQ4cHgnIHN0eWxlPSdzaGFwZS1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uOyB0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IGltYWdlLXJlbmRlcmluZzpvcHRpbWl6ZVF1YWxpdHk7IGZpbGwtcnVsZTpldmVub2RkOyBjbGlwLXJ1bGU6ZXZlbm9kZCcgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPjxnPjxwYXRoIHN0eWxlPSdvcGFjaXR5OjEnIGZpbGw9JyNlNWIxMWMnIGQ9J00gMzEuNSw0MS41IEMgMjguODMzMyw0MS41IDI2LjE2NjcsNDEuNSAyMy41LDQxLjVDIDIzLjUsMzguODMzMyAyMy41LDM2LjE2NjcgMjMuNSwzMy41QyAyNS4yNjQ2LDMyLjUzODYgMjcuMjY0NiwzMi4yMDUzIDI5LjUsMzIuNUMgMjkuNzczMywzMC41NDkgMjkuMTA2NiwyOS4wNDkgMjcuNSwyOEMgMjMuODQ4NCwyNy41MDE0IDIwLjE4MTcsMjcuMzM0NyAxNi41LDI3LjVDIDE2LjUsMzIuNSAxNi41LDM3LjUgMTYuNSw0Mi41QyAxMy4xNjY3LDQyLjUgOS44MzMzMyw0Mi41IDYuNSw0Mi41QyA2LjUsMzQuNSA2LjUsMjYuNSA2LjUsMTguNUMgMTMuNSwxOC41IDIwLjUsMTguNSAyNy41LDE4LjVDIDI4LjU4NjIsMTguMzggMjkuMjUyOCwxNy43MTMzIDI5LjUsMTYuNUMgMjkuNDU3MywxNS41ODM2IDI5LjEyMzksMTQuOTE2OSAyOC41LDE0LjVDIDIxLjQ5MjEsMTQuNjY2MyAxNC40OTIxLDE0LjQ5OTYgNy41LDE0QyA2LjU0OTQ4LDEwLjk0MzMgNi4yMTYxNCw3Ljc3NjU5IDYuNSw0LjVDIDE0Ljg0LDQuMzMzNiAyMy4xNzMzLDQuNTAwMjcgMzEuNSw1QyAzOS44NjA5LDkuMjUxNDYgNDEuNTI3NSwxNS4yNTE1IDM2LjUsMjNDIDQxLjc1NiwyOC41OTM1IDQxLjc1NiwzNC4yNjAyIDM2LjUsNDBDIDM0Ljk3NTEsNDEuMDA4NiAzMy4zMDg0LDQxLjUwODYgMzEuNSw0MS41IFonLz48L2c+PGc+PHBhdGggc3R5bGU9J29wYWNpdHk6MC42ODInIGZpbGw9JyM5MjhlMzYnIGQ9J00gMjguNSwxNC41IEMgMjkuMTIzOSwxNC45MTY5IDI5LjQ1NzMsMTUuNTgzNiAyOS41LDE2LjVDIDI5LjI1MjgsMTcuNzEzMyAyOC41ODYyLDE4LjM4IDI3LjUsMTguNUMgMjguMjM0MSwxNy4yOTIxIDI4LjU2NzQsMTUuOTU4NyAyOC41LDE0LjUgWicvPjwvZz48Zz48cGF0aCBzdHlsZT0nb3BhY2l0eTowLjc1OCcgZmlsbD0nI2M0YTMyMycgZD0nTSAyMy41LDMzLjUgQyAyMy41LDM2LjE2NjcgMjMuNSwzOC44MzMzIDIzLjUsNDEuNUMgMjYuMTY2Nyw0MS41IDI4LjgzMzMsNDEuNSAzMS41LDQxLjVDIDI4LjcxMzEsNDIuNDc2NyAyNS43MTMxLDQyLjgxIDIyLjUsNDIuNUMgMjIuMTksMzkuMjg2OSAyMi41MjMzLDM2LjI4NjkgMjMuNSwzMy41IFonLz48L2c+PC9zdmc+Cg==",
    url: "https://biomejs.dev",
    spectrum: "bleeding_edge"
  },
  // Error tracking
  {
    category: "Error tracking",
    label: "Sentry",
    flag: "sentry",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxLjEzZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDIyNyI+PHBhdGggZmlsbD0iIzM2MkQ1OSIgZD0iTTE0OC4zNjggMTIuNDAzYTIzLjkzNSAyMy45MzUgMCAwIDAtNDEuMDAzIDBMNzMuNjQgNzAuMTY1YzUyLjQyNiAyNi4xNzQgODcuMDUgNzguMTc3IDkwLjk3NSAxMzYuNjQyaC0yMy42NzljLTMuOTE4LTUwLjExMy0zNC4wNjEtOTQuNDEtNzkuMjM4LTExNi40NDhsLTMxLjIxMyA1My45N2E4MS41OTUgODEuNTk1IDAgMCAxIDQ3LjMwNyA2Mi4zNzVoLTU0LjM4YTMuODk1IDMuODk1IDAgMCAxLTMuMTc4LTUuNjlsMTUuMDY5LTI1LjYyNmE1NS4wNDYgNTUuMDQ2IDAgMCAwLTE3LjIyMS05LjczOEwzLjE2NyAxOTEuMjc3YTIzLjI2OSAyMy4yNjkgMCAwIDAgOC42NjIgMzEuOTgyYTIzLjg4NCAyMy44ODQgMCAwIDAgMTEuNTgzIDMuMDc1aDc0LjQ3MWE5OS40MzIgOTkuNDMyIDAgMCAwLTQxLjAwMy04OC43MmwxMS44NC0yMC41YzM1LjY3OSAyNC41MDQgNTUuNzU0IDY2LjAzOCA1Mi43OSAxMDkuMjJoNjMuMDk0YzIuOTktNjUuNDMtMjkuMDQ3LTEyNy41MTItODQuMTA3LTE2Mi45ODZsMjMuOTM1LTQxLjAwMmEzLjk0NyAzLjk0NyAwIDAgMSA1LjM4Mi0xLjM4NGMyLjcxNiAxLjQ4NiAxMDMuOTkzIDE3OC4yMDggMTA1Ljg5IDE4MC4yNThhMy44OTUgMy44OTUgMCAwIDEtMy40ODYgNS43OTJoLTI0LjM5NmMuMzA3IDYuNTI2LjMwNyAxMy4wMzUgMCAxOS41MjhoMjQuNDk5QTIzLjUyOCAyMy41MjggMCAwIDAgMjU2IDIwMi45MWEyMy4wMTUgMjMuMDE1IDAgMCAwLTMuMTc4LTExLjY4NUwxNDguMzY4IDEyLjQwM1oiLz48L3N2Zz4=",
    url: "https://sentry.io"
  },
  {
    category: "Error tracking",
    label: "Logrocket",
    flag: "logrocket",
    image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAuMDAgMC4wMCAxMTQ2LjAwIDE3ODMuMDAiPgo8cGF0aCBmaWxsPSIjNzE1MmExIiBkPSIKICBNIDM3Mi4yNCAxMjc5Ljc3CiAgUSAzNDYuNTQgMTI5OC44OCAzMjIuMTggMTMxOS42OAogIEMgMjkyLjkwIDEzNDQuNjYgMjYzLjgwIDEzNjkuNzYgMjM0LjEzIDEzOTQuMjkKICBDIDIwMi45MyAxNDIwLjA5IDE3NS40MyAxNDU1LjExIDEzMC4zNCAxNDQ3LjYyCiAgQyAxMDEuNDYgMTQ0Mi44MyA3NS4xMCAxNDIzLjM2IDY4LjE3IDEzOTMuOTYKICBDIDQ3LjM2IDEzMDUuNzggMjYuNDMgMTIxNy42MiA2LjQ0IDExMjkuMjUKICBRIDMuNjAgMTExNi42OCAyLjU1IDExMDkuNjQKICBDIC04Ljg3IDEwMzIuNDMgMjMuMTAgOTU1LjU1IDgzLjQ3IDkwNi44OQogIFEgMTM0Ljk3IDg2NS4zOCAxODcuNTMgODI1LjIxCiAgQyAxOTEuNDkgODIyLjE4IDE5My4yMSA4MTkuMDYgMTkyLjkxIDgxNC4yNQogIEMgMTc5LjY3IDYwMy40MyAyNDguMjYgMzk5LjYwIDM2MS40NiAyMjQuMjAKICBDIDM4My43MiAxODkuNjkgNDA4LjY2IDE1Ni40NyA0MzUuMDcgMTIzLjU3CiAgQyA0NzMuODUgNzUuMjQgNTE3LjU1IDMyLjM2IDU3MC42NiAwLjYwCiAgQSAwLjgxIDAuODAgLTQ1LjMgMCAxIDU3MS41MCAwLjU5CiAgQyA2NDguNjkgNDYuMTcgNzA1LjA0IDExNi4wMCA3NTYuNzcgMTg4LjU0CiAgUSA3NjIuODYgMTk3LjA3IDc2OC4yMSAyMDQuOTUKICBDIDg4OS44MiAzODQuMTEgOTY0LjI0IDYwMC4xNyA5NDkuNTkgODE4LjczCiAgQSAwLjk5IDAuOTggMjEuNSAwIDAgOTQ5Ljk1IDgxOS41NQogIEMgOTkyLjA4IDg1My4zOSAxMDM4LjgyIDg4OC43OSAxMDcyLjIxIDkxNy4wMwogIFEgMTA4OC4xMCA5MzAuNDYgMTEwMy42MyA5NTIuMzQKICBRIDExNDYuNzYgMTAxMy4wOSAxMTQ1LjI5IDEwODcuMjQKICBDIDExNDUuMDIgMTEwMS4wNiAxMTQyLjgyIDExMTQuMTUgMTEzOS42OCAxMTI5LjQ4CiAgQyAxMTIxLjQzIDEyMTguNzMgMTEwMi4yMSAxMzE1LjQ2IDEwODMuOTMgMTM5Ni45MwogIEMgMTA3My41NCAxNDQzLjIwIDEwMTMuNzMgMTQ2My4wMiA5NzQuNjAgMTQ0Mi4xMwogIFEgOTY4LjY2IDE0MzguOTYgOTU4LjcwIDE0MzAuODMKICBDIDg5Ni40OCAxMzc5Ljk2IDgzNC42MiAxMzI4LjcwIDc3Mi40OSAxMjc3Ljg5CiAgQSAwLjg1IDAuODQgNDMuMyAwIDAgNzcxLjM4IDEyNzcuOTIKICBDIDcxOS4xMSAxMzI1LjgyIDY1Mi4zMyAxMzU0Ljg4IDU4MS40NSAxMzU3LjY4CiAgQyA1MDUuMTMgMTM2MC42OSA0MzAuMjkgMTMzMC43MyAzNzMuMTQgMTI3OS44MQogIEEgMC43MSAwLjcxIDAuMCAwIDAgMzcyLjI0IDEyNzkuNzcKICBaCiAgTSA0MDkuOTcgNTkyLjcwCiAgQyA0MjEuNDggNjg1LjIxIDUwNy45OSA3NDIuODggNTk5LjI0IDcyOC40NgogIEMgNjM1LjgyIDcyMi42OCA2NjguMDcgNzA1LjQ4IDY5Mi45NCA2NzguNDQKICBDIDc1MC40OCA2MTUuODUgNzQ2LjQ4IDUyMC4yNiA2ODQuMTkgNDYyLjU1CiAgUSA2MzkuMjEgNDIwLjg5IDU3Ni4wMSA0MTguNjEKICBDIDQ4MC42NyA0MTUuMTggMzk3Ljg4IDQ5NS40NSA0MDkuOTcgNTkyLjcwCiAgWiIKLz4KPGVsbGlwc2UgZmlsbD0iIzcxNTJhMSIgY3g9IjAuMDAiIGN5PSIwLjAwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1NjkuODYsNTc2LjU1KSByb3RhdGUoLTAuMSkiIHJ4PSI3OS41MCIgcnk9Ijc2LjQ1Ii8+CjxwYXRoIGZpbGw9IiM3MTUyYTEiIGQ9IgogIE0gNDYyLjgzIDE2MTkuNzkKICBBIDAuNzAgMC43MCAwLjAgMCAwIDQ2MS43MiAxNjE5LjYyCiAgUSA0NDguMTIgMTYzMy4wMCA0MzQuMzYgMTY0Ni4zNgogIFEgNDIwLjc0IDE2NTkuNTcgNDEzLjQ0IDE2NjUuMTkKICBDIDM5NC4yMCAxNjc5Ljk5IDM1OS43NCAxNjY3LjIxIDM1NC43NyAxNjQzLjI1CiAgUSAzNTQuMDYgMTYzOS44MyAzNTQuMDIgMTYzMy4yMQogIFEgMzUzLjUwIDE1NTIuNTQgMzU0LjA4IDE0NzEuODcKICBRIDM1NC4xNCAxNDYyLjk2IDM1NS41NiAxNDU4LjQzCiAgUSAzNTguMzEgMTQ0OS42OSAzNjUuMTYgMTQ0My45MAogIFEgMzg3LjA4IDE0MjUuMzggNDEyLjEyIDE0MzguMDgKICBDIDUwOS4xMSAxNDg3LjI5IDYzMi4zMyAxNDg2LjE0IDcyOS41MyAxNDM4LjUzCiAgUSA3MzYuNjkgMTQzNS4wMiA3NDEuMDEgMTQzNC4xMAogIEMgNzU4Ljk2IDE0MzAuMjcgNzgwLjcyIDE0MzkuNTggNzg2LjY1IDE0NTguMTQKICBRIDc4OC4yMCAxNDYzLjAwIDc4OC4yOCAxNDc0LjUzCiAgUSA3ODkuMDMgMTU5Mi4yMyA3ODguMzAgMTYzOS43NQogIFEgNzg4LjI2IDE2NDIuNjIgNzg2LjQ4IDE2NDcuMzkKICBDIDc3OS4xOCAxNjY3LjA2IDc1Mi4wNSAxNjc3LjQwIDczMy4zNyAxNjY3Ljc4CiAgQyA3MjguMTkgMTY2NS4xMSA3MjEuNTYgMTY1OS4wMCA3MTcuNjkgMTY1NS4zMQogIFEgNjk4Ljg2IDE2MzcuMzkgNjgwLjI4IDE2MTkuMzYKICBBIDAuNTAgMC41MCAwLjAgMCAwIDY3OS40OSAxNjE5LjQ5CiAgQyA2NTUuODUgMTY2NC42MSA2MzIuODkgMTcxMC4yMCA2MDguNzcgMTc1NS4xMwogIFEgNjAyLjU0IDE3NjYuNzQgNjAyLjM3IDE3NjYuOTkKICBDIDU5MC4yNCAxNzg1LjQzIDU1OS41NiAxNzg2LjkyIDU0NC4yNSAxNzcxLjg5CiAgUSA1NDAuODcgMTc2OC41OCA1MzYuNDIgMTc2MC4yNwogIEMgNTExLjQ0IDE3MTMuNjUgNDg3LjU5IDE2NjYuNDQgNDYyLjgzIDE2MTkuNzkKICBaIgovPgo8L3N2Zz4K",
    url: "https://logrocket.com",
    disabled: !0
  }
], Zo = Le.map((t) => t.flag);
Le.filter((t) => !t.invisibleCli).map((t) => t.flag);
var ar = /* @__PURE__ */ ((t) => (t.Frontend = "Frontend", t.Data = "Data", t.Deployment = "Deployment", t.Utilities = "Utilities", t))(ar || {}), lr = [
  {
    label: "Frontend Framework",
    group: "Frontend",
    description: "Flexible, robust, community-driven, and fast Vite-based frontend framework.",
    required: !0
  },
  {
    label: "UI Framework",
    group: "Frontend",
    description: `It’s recommended to choose a frontend lib to kickstart a new Vike project,
as they each come with a wide range of integrations. You can at any time eject and take control over integration code
so that it doesn’t get in your way.`,
    required: !0
  },
  {
    label: "CSS",
    group: "Frontend",
    description: `These CSS libraries are deeply integrated with UI frameworks.
They showcase their respective recommended usage and how they integrate with Vite and Vike.`
  },
  {
    label: "UI Component Libraries",
    group: "Frontend",
    description: `These UI Component Libraries are deeply integrated with UI frameworks.
They showcase their respective recommended usage and how they integrate with Vite and Vike.`
  },
  {
    label: "Auth",
    group: "Data",
    description: `Ready to use self-hosted or cloud-based Auth solutions.
Requires to also select a Server of your choosing.`
  },
  {
    label: "Data fetching",
    group: "Data",
    description: `Data fetching libraries to help you interact with your backend.
Selecting one of those usually requires you to also choose a Server.`
  },
  {
    label: "Server",
    group: "Data",
    description: `Mostly required by other integrations such as Auth or RPC,
it's recommended to only install a Server if you really need to, as Vike doesn't require one to operate.`
  },
  {
    label: "Database",
    group: "Data",
    description: "Helping you get started with a database solution."
  },
  {
    label: "Hosting",
    group: "Deployment",
    description: "Quickly host your Vike project with a Serverless or VPS (coming soon) solution."
  },
  {
    label: "Linter",
    multiple: !0,
    group: "Utilities",
    description: `Well known linting and formatting tools, pre-configured to match their recommended usage,
tailored for Vike.`
  },
  {
    label: "Analytics",
    group: "Utilities",
    description: "Keep track of your website traffic with these ready-to-get-started Analytics solutions."
  },
  {
    label: "Error tracking",
    group: "Utilities",
    description: "Coming soon: Error Tracking solution for frontend and backend"
  }
], W = /* @__PURE__ */ ((t) => (t[t.ERROR_AUTH_R_SERVER = 0] = "ERROR_AUTH_R_SERVER", t[t.ERROR_COMPILED_R_REACT = 1] = "ERROR_COMPILED_R_REACT", t[t.ERROR_DRIZZLE_R_SERVER = 2] = "ERROR_DRIZZLE_R_SERVER", t[t.ERROR_DATA_R_SERVER = 3] = "ERROR_DATA_R_SERVER", t[t.ERROR_LUCIA_R_COMPAT_DATABASE = 4] = "ERROR_LUCIA_R_COMPAT_DATABASE", t[t.ERROR_CLOUDFLARE_R_COMPAT_SERVER = 5] = "ERROR_CLOUDFLARE_R_COMPAT_SERVER", t[t.ERROR_AWS_R_COMPAT_SERVER = 6] = "ERROR_AWS_R_COMPAT_SERVER", t[t.ERROR_MANTINE_R_REACT = 7] = "ERROR_MANTINE_R_REACT", t[t.ERROR_SHADCN_R_REACT = 8] = "ERROR_SHADCN_R_REACT", t[t.WARN_SHADCN_R_TAILWINDCSS = 9] = "WARN_SHADCN_R_TAILWINDCSS", t[t.INFO_HATTIP = 10] = "INFO_HATTIP", t[t.INFO_STACKBLITZ_COMPAT = 11] = "INFO_STACKBLITZ_COMPAT", t))(W || {});
function Xt(t, e, i) {
  const r = Array.from(sr(i));
  return (o) => o.has(e) && !r.every((n) => o.has(n)) && t;
}
function Po(t, e) {
  return (i) => i.has(e) && t;
}
function It(t, e) {
  return (i) => e(i) && t;
}
function sr(t) {
  const e = /* @__PURE__ */ new Set();
  for (const i of t)
    Zo.includes(i) && e.add(Le.find((r) => r.flag === i).category), e.add(i);
  return e;
}
var Go = [
  Xt(0, "Auth", ["Server"]),
  Xt(1, "compiled-css", ["react"]),
  Po(10, "hattip"),
  Xt(2, "drizzle", ["Server"]),
  Xt(3, "Data fetching", ["Server"]),
  It(5, (t) => t.has("cloudflare") ? t.has("hono") || t.has("hattip") ? !1 : t.has("Server") : !1),
  It(6, (t) => t.has("aws") ? !(t.has("hono") || t.has("hattip")) : !1),
  It(4, (t) => t.has("lucia-auth") ? !(t.has("sqlite") || t.has("drizzle")) : !1),
  It(7, (t) => t.has("mantine") ? t.has("vue") || t.has("solid") : !1),
  It(8, (t) => t.has("shadcn-ui") ? t.has("vue") || t.has("solid") : !1),
  It(9, (t) => t.has("shadcn-ui") ? t.has("daisyui") || t.has("compiled-css") : !1),
  It(11, (t) => t.has("drizzle") || t.has("sqlite") || t.has("cloudflare"))
];
function Wo(t, e) {
  const i = sr(t), r = [];
  for (const o of Go) {
    const n = o(i);
    typeof n == "number" && (n in e ? r.push(e[n]) : console.warn("No handler defined for rule", n));
  }
  return r;
}
const Ve = Symbol("store-raw"), ft = Symbol("store-node"), ot = Symbol("store-has"), cr = Symbol("store-self");
function Mr(t) {
  let e = t[F];
  if (!e && (Object.defineProperty(t, F, {
    value: e = new Proxy(t, Ho)
  }), !Array.isArray(t))) {
    const i = Object.keys(t), r = Object.getOwnPropertyDescriptors(t);
    for (let o = 0, n = i.length; o < n; o++) {
      const a = i[o];
      r[a].get && Object.defineProperty(t, a, {
        enumerable: r[a].enumerable,
        get: r[a].get.bind(e)
      });
    }
  }
  return e;
}
function se(t) {
  let e;
  return t != null && typeof t == "object" && (t[F] || !(e = Object.getPrototypeOf(t)) || e === Object.prototype || Array.isArray(t));
}
function Gt(t, e = /* @__PURE__ */ new Set()) {
  let i, r, o, n;
  if (i = t != null && t[Ve]) return i;
  if (!se(t) || e.has(t)) return t;
  if (Array.isArray(t)) {
    Object.isFrozen(t) ? t = t.slice(0) : e.add(t);
    for (let a = 0, l = t.length; a < l; a++)
      o = t[a], (r = Gt(o, e)) !== o && (t[a] = r);
  } else {
    Object.isFrozen(t) ? t = Object.assign({}, t) : e.add(t);
    const a = Object.keys(t), l = Object.getOwnPropertyDescriptors(t);
    for (let s = 0, c = a.length; s < c; s++)
      n = a[s], !l[n].get && (o = t[n], (r = Gt(o, e)) !== o && (t[n] = r));
  }
  return t;
}
function ce(t, e) {
  let i = t[e];
  return i || Object.defineProperty(t, e, {
    value: i = /* @__PURE__ */ Object.create(null)
  }), i;
}
function Wt(t, e, i) {
  if (t[e]) return t[e];
  const [r, o] = k(i, {
    equals: !1,
    internal: !0
  });
  return r.$ = o, t[e] = r;
}
function Ro(t, e) {
  const i = Reflect.getOwnPropertyDescriptor(t, e);
  return !i || i.get || !i.configurable || e === F || e === ft || (delete i.value, delete i.writable, i.get = () => t[F][e]), i;
}
function ur(t) {
  Pe() && Wt(ce(t, ft), cr)();
}
function Bo(t) {
  return ur(t), Reflect.ownKeys(t);
}
const Ho = {
  get(t, e, i) {
    if (e === Ve) return t;
    if (e === F) return i;
    if (e === Ue)
      return ur(t), i;
    const r = ce(t, ft), o = r[e];
    let n = o ? o() : t[e];
    if (e === ft || e === ot || e === "__proto__") return n;
    if (!o) {
      const a = Object.getOwnPropertyDescriptor(t, e);
      Pe() && (typeof n != "function" || t.hasOwnProperty(e)) && !(a && a.get) && (n = Wt(r, e, n)());
    }
    return se(n) ? Mr(n) : n;
  },
  has(t, e) {
    return e === Ve || e === F || e === Ue || e === ft || e === ot || e === "__proto__" ? !0 : (Pe() && Wt(ce(t, ot), e)(), e in t);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: Bo,
  getOwnPropertyDescriptor: Ro
};
function Me(t, e, i, r = !1) {
  if (!r && t[e] === i) return;
  const o = t[e], n = t.length;
  i === void 0 ? (delete t[e], t[ot] && t[ot][e] && o !== void 0 && t[ot][e].$()) : (t[e] = i, t[ot] && t[ot][e] && o === void 0 && t[ot][e].$());
  let a = ce(t, ft), l;
  if ((l = Wt(a, e, o)) && l.$(() => i), Array.isArray(t) && t.length !== n) {
    for (let s = t.length; s < n; s++) (l = a[s]) && l.$();
    (l = Wt(a, "length", n)) && l.$(t.length);
  }
  (l = a[cr]) && l.$();
}
function gr(t, e) {
  const i = Object.keys(e);
  for (let r = 0; r < i.length; r += 1) {
    const o = i[r];
    Me(t, o, e[o]);
  }
}
function Vo(t, e) {
  if (typeof e == "function" && (e = e(t)), e = Gt(e), Array.isArray(e)) {
    if (t === e) return;
    let i = 0, r = e.length;
    for (; i < r; i++) {
      const o = e[i];
      t[i] !== o && Me(t, i, o);
    }
    Me(t, "length", r);
  } else gr(t, e);
}
function Yt(t, e, i = []) {
  let r, o = t;
  if (e.length > 1) {
    r = e.shift();
    const a = typeof r, l = Array.isArray(t);
    if (Array.isArray(r)) {
      for (let s = 0; s < r.length; s++)
        Yt(t, [r[s]].concat(e), i);
      return;
    } else if (l && a === "function") {
      for (let s = 0; s < t.length; s++)
        r(t[s], s) && Yt(t, [s].concat(e), i);
      return;
    } else if (l && a === "object") {
      const { from: s = 0, to: c = t.length - 1, by: M = 1 } = r;
      for (let u = s; u <= c; u += M)
        Yt(t, [u].concat(e), i);
      return;
    } else if (e.length > 1) {
      Yt(t[r], e, [r].concat(i));
      return;
    }
    o = t[r], i = [r].concat(i);
  }
  let n = e[0];
  typeof n == "function" && (n = n(o, i), n === o) || r === void 0 && n == null || (n = Gt(n), r === void 0 || se(o) && se(n) && !Array.isArray(n) ? gr(o, n) : Me(t, r, n));
}
function Jo(...[t, e]) {
  const i = Gt(t || {}), r = Array.isArray(i), o = Mr(i);
  function n(...a) {
    Ze(() => {
      r && a.length === 1 ? Vo(i, a[0]) : Yt(i, a);
    });
  }
  return [o, n];
}
var _o = /* @__PURE__ */ f("<div>");
const dr = De();
function Fo(t) {
  let e;
  je(() => {
    if (e) {
      const o = Xo(e);
      r(o);
    }
  });
  const [i, r] = k(document);
  return D(dr.Provider, {
    value: i,
    get children() {
      var o = _o(), n = e;
      return typeof n == "function" ? jt(n, o) : e = o, o.style.setProperty("display", "contents"), y(o, () => t.children), o;
    }
  });
}
function $o() {
  return U(dr);
}
function Xo(t) {
  let e = t;
  for (; e; ) {
    if (e instanceof ShadowRoot)
      return e;
    if (e = e.parentNode, !e || e === document)
      break;
  }
  return document;
}
var Ko = /* @__PURE__ */ f('<span class=inline-block>A <span class=font-bold>Server</span> is required when using <span class=font-bold>Auth</span>. Check <a class=link href=https://vike.dev/integration#server-side-tools target=_blank>Vike documentation.</a><ul class="list-custom list-dot"><li>Either pick a server (Express.js / H3 / ...) or unselect <span class=font-bold>'), qo = /* @__PURE__ */ f('<span class=inline-block><span class=font-bold>React</span> is required when using <span class=font-bold>Compiled</span>.<ul class="list-custom list-dot"><li>Either pick React or unselect <span class=font-bold>Compiled'), tn = /* @__PURE__ */ f('<span class=inline-block><span class=font-bold>React</span> is required when using <span class=font-bold>Mantine</span>.<ul class="list-custom list-dot"><li>Either pick React or unselect <span class=font-bold>Mantine'), en = /* @__PURE__ */ f("<span class=inline-block><span class=font-bold>HatTip</span> is an experimental project. Prefer <span class=font-bold>(Hono / Express.js / H3 / Fastify)</span> for production use"), rn = /* @__PURE__ */ f('<span class=inline-block>A <span class=font-bold>Server</span> is required when using <span class=font-bold>Drizzle</span>.<ul class="list-custom list-dot"><li>Either pick a server (Express.js / H3 / ...) or unselect <span class=font-bold>Drizzle'), on = /* @__PURE__ */ f('<span class=inline-block>A <span class=font-bold>Server</span> is required when using <span class=font-bold>Data fetching</span>.<ul class="list-custom list-dot"><li>Either pick a server (Express.js / H3 / ...) or unselect <span class=font-bold>'), nn = /* @__PURE__ */ f('<span class=inline-block><span class=font-bold>Cloudflare</span> is not compatible with <span class=font-bold></span>.<ul class="list-custom list-dot"><li>Either pick a <span class=font-bold>Hono</span> or <span class=font-bold>HatTip</span>, or unselect <span class=font-bold>'), an = /* @__PURE__ */ f('<span class=inline-block><span class=font-bold>Lucia</span> requires a <span class=font-bold>Database</span>, and is currently only compatible with <span class=font-bold>SQLite</span> or <span class=font-bold>Drizzle</span><ul class="list-custom list-dot"><li>Either pick a <span class=font-bold>SQLite</span> or <span class=font-bold>Drizzle</span>, or unselect <span class=font-bold>Lucia'), ln = /* @__PURE__ */ f('<span class=inline-block><ul class="list-custom list-dot"><li>Compatible servers: <span class=font-bold>Hono</span>, <span class=font-bold>HatTip'), bi = /* @__PURE__ */ f("<span class=font-bold>AWS"), sn = /* @__PURE__ */ f("<span class=font-bold>"), cn = /* @__PURE__ */ f('<span class=inline-block><span class=font-bold>React</span> is required with <span class=font-bold>shadcn/ui</span>.<ul class="list-custom list-dot"><li>Either pick a <span class=font-bold>React</span> or unselect <span class=font-bold>shadcn/ui'), Mn = /* @__PURE__ */ f("<span class=inline-block><span class=font-bold>shadcn/ui</span> integration is tied to <span class=font-bold>TailwindCSS</span>. Using another CSS library with it may have unpredictable behaviour.");
function rt(t) {
  return {
    type: "error",
    value: t
  };
}
function un(t) {
  return {
    type: "warning",
    value: t
  };
}
function gn(t) {
  return {
    type: "info",
    value: t
  };
}
function dn(t) {
  return {
    type: "invisible",
    value: t
  };
}
const In = {
  [W.ERROR_AUTH_R_SERVER]: rt(() => {
    const {
      selectedFeatures: t
    } = U(R), e = p(() => {
      var i;
      return (i = t().filter((r) => r.category === "Auth")) == null ? void 0 : i[0].label;
    });
    return (() => {
      var i = Ko(), r = i.firstChild, o = r.nextSibling, n = o.nextSibling, a = n.nextSibling, l = a.nextSibling, s = l.nextSibling, c = s.nextSibling, M = c.firstChild, u = M.firstChild, g = u.nextSibling;
      return y(g, e), i;
    })();
  }),
  [W.ERROR_COMPILED_R_REACT]: rt(() => qo()),
  [W.ERROR_MANTINE_R_REACT]: rt(() => tn()),
  [W.INFO_HATTIP]: gn(() => en()),
  [W.ERROR_DRIZZLE_R_SERVER]: rt(() => rn()),
  [W.ERROR_DATA_R_SERVER]: rt(() => {
    const {
      selectedFeatures: t
    } = U(R), e = p(() => {
      var i;
      return (i = t().filter((r) => r.category === "Data fetching")) == null ? void 0 : i[0].label;
    });
    return (() => {
      var i = on(), r = i.firstChild, o = r.nextSibling, n = o.nextSibling, a = n.nextSibling, l = a.nextSibling, s = l.nextSibling, c = s.firstChild, M = c.firstChild, u = M.nextSibling;
      return y(u, e), i;
    })();
  }),
  [W.ERROR_CLOUDFLARE_R_COMPAT_SERVER]: rt(() => {
    const {
      selectedFeatures: t
    } = U(R), e = p(() => {
      var i;
      return (i = t().filter((r) => r.category === "Server")) == null ? void 0 : i[0].label;
    });
    return (() => {
      var i = nn(), r = i.firstChild, o = r.nextSibling, n = o.nextSibling, a = n.nextSibling, l = a.nextSibling, s = l.firstChild, c = s.firstChild, M = c.nextSibling, u = M.nextSibling, g = u.nextSibling, d = g.nextSibling, N = d.nextSibling;
      return y(n, e), y(N, e), i;
    })();
  }),
  [W.ERROR_LUCIA_R_COMPAT_DATABASE]: rt(() => an()),
  [W.ERROR_AWS_R_COMPAT_SERVER]: rt(() => {
    const {
      selectedFeatures: t
    } = U(R), e = p(() => {
      var i, r;
      return (r = (i = t().filter((o) => o.category === "Server")) == null ? void 0 : i[0]) == null ? void 0 : r.label;
    });
    return (() => {
      var i = ln(), r = i.firstChild;
      return y(i, (() => {
        var o = p(() => !!e());
        return () => o() && [bi(), " deployment is not compatible with", " ", (() => {
          var n = sn();
          return y(n, e), n;
        })(), "."];
      })(), r), y(i, (() => {
        var o = p(() => !e());
        return () => o() && [bi(), " deployment requires a compatible server."];
      })(), r), i;
    })();
  }),
  [W.ERROR_SHADCN_R_REACT]: rt(() => cn()),
  [W.WARN_SHADCN_R_TAILWINDCSS]: un(() => Mn()),
  [W.INFO_STACKBLITZ_COMPAT]: dn(function() {
    const t = $o(), {
      selectedFeatures: e
    } = U(R), i = p(() => e().filter((o) => o.flag === "drizzle" || o.flag === "sqlite" || o.flag === "cloudflare"));
    function r() {
      var o;
      (o = t == null ? void 0 : t()) == null || o.querySelectorAll(".stackblitz-cta").forEach((n) => {
        n.classList.add("tooltip"), n.setAttribute("data-tip", "Stackblitz does not support the following features: " + i().map((a) => a.label).join(", "));
      });
    }
    return Dt(no(i, r)), je(r), Jt(() => {
      var o;
      (o = t == null ? void 0 : t()) == null || o.querySelectorAll(".stackblitz-cta").forEach((n) => {
        n.classList.remove("tooltip"), n.removeAttribute("data-tip");
      });
    }), [];
  })
};
function Nn() {
  const t = Le.map((c) => ({
    ...c,
    alt: c.disabled ? "Coming soon" : void 0,
    selected: !!(c.selected ?? c.readonly)
  })), [e, i] = Jo(t);
  function r(c, M, u) {
    const g = lr.find((d) => d.label === c);
    g != null && g.multiple || Ze(() => i((d) => d.category === c && !d.readonly, "selected", !1)), i((d) => d.flag === M, "selected", (g == null ? void 0 : g.required) ?? u);
  }
  const o = p(() => e.filter((c) => c.selected)), n = p(() => o().filter((c) => !c.invisibleCli).map((c) => c.flag));
  function a(c) {
    Ze(() => {
      for (const M of t)
        if (c.includes(M.category)) {
          const u = t.findIndex((g) => g.category === M.category);
          i((g) => g.category === M.category && !g.readonly, "selected", (g, [d, N]) => N === u);
        } else c.includes(M.flag) ? i((u) => u.flag === M.flag && !u.readonly, "selected", !0) : i((u) => u.flag === M.flag && !u.readonly, "selected", !1);
    });
  }
  const l = p(() => o().map((c) => c.flag)), s = p(() => {
    const c = Wo(l(), In);
    return {
      size: c.length,
      error: c.filter((M) => M.type === "error").map((M) => M.value),
      warning: c.filter((M) => M.type === "warning").map((M) => M.value),
      info: c.filter((M) => M.type === "info").map((M) => M.value),
      invisible: c.filter((M) => M.type === "invisible").map((M) => M.value)
    };
  });
  return {
    selectedFeaturesFlags: n,
    selectFeature: r,
    selectedFeatures: o,
    currentFeatures: e,
    selectPreset: a,
    selectedFlags: l,
    rules: s
  };
}
const R = De(void 0);
function jn(t) {
  const e = Nn();
  return D(R.Provider, {
    value: e,
    get children() {
      return t.children;
    }
  });
}
function Ir(t) {
  var e, i, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var o = t.length;
    for (e = 0; e < o; e++) t[e] && (i = Ir(t[e])) && (r && (r += " "), r += i);
  } else for (i in t) t[i] && (r && (r += " "), r += i);
  return r;
}
function J() {
  for (var t, e, i = 0, r = "", o = arguments.length; i < o; i++) (t = arguments[i]) && (e = Ir(t)) && (r && (r += " "), r += e);
  return r;
}
var Dn = /* @__PURE__ */ f("<a target=_blank><span>"), yn = /* @__PURE__ */ f("<span>"), Ln = /* @__PURE__ */ f("<span class=text-lg>Scaffolds a web app using <!>.");
const bn = new Intl.ListFormat("en");
function wn(t) {
  return t.feature.url ? (() => {
    var e = Dn(), i = e.firstChild;
    return y(i, () => t.feature.label), E((r) => {
      var o = t.feature.url, n = J("text-primary link link-hover", t.feature.label === "Vike" && "font-semibold");
      return o !== r.e && Z(e, "href", r.e = o), n !== r.t && K(i, r.t = n), r;
    }, {
      e: void 0,
      t: void 0
    }), e;
  })() : (() => {
    var e = yn();
    return y(e, () => t.feature.label), E(() => K(e, J("text-primary", t.feature.label === "Vike" && "font-semibold"))), e;
  })();
}
function Tn() {
  const {
    selectedFeatures: t
  } = U(R), e = p(() => bn.formatToParts(t().map((i) => i.label)).map((i) => i.type === "literal" ? i.value : D(wn, {
    get feature() {
      return t().find((r) => r.label === i.value);
    }
  })));
  return (() => {
    var i = Ln(), r = i.firstChild, o = r.nextSibling;
    return o.nextSibling, y(i, e, o), i;
  })();
}
var xn = /* @__PURE__ */ f('<div class="w-full rounded-md border-l-2"><ul class="flex flex-col gap-2 tracking-wide list-custom p-2 rounded-md">'), fn = /* @__PURE__ */ f("<li>");
function Se(t) {
  return (() => {
    var e = xn(), i = e.firstChild;
    return y(i, D(gt, {
      get each() {
        return t.children;
      },
      children: (r) => (() => {
        var o = fn();
        return y(o, D(qe, {
          component: r
        })), o;
      })()
    })), E((r) => {
      var o = !!t.info, n = !!t.warning, a = !!t.error, l = {
        "bg-info/25 list-info": t.info,
        "bg-warning/25 list-warning": t.warning,
        "bg-error/25 list-error": t.error
      };
      return o !== r.e && e.classList.toggle("border-info", r.e = o), n !== r.t && e.classList.toggle("border-warning", r.t = n), a !== r.a && e.classList.toggle("border-error", r.a = a), r.o = yt(i, l, r.o), r;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), e;
  })();
}
function Nr(t) {
  return [D(P, {
    get when() {
      var e;
      return (e = t.info) == null ? void 0 : e.length;
    },
    get children() {
      return D(Se, {
        info: !0,
        get children() {
          return t.info;
        }
      });
    }
  }), D(P, {
    get when() {
      var e;
      return (e = t.warning) == null ? void 0 : e.length;
    },
    get children() {
      return D(Se, {
        warning: !0,
        get children() {
          return t.warning;
        }
      });
    }
  }), D(P, {
    get when() {
      var e;
      return (e = t.error) == null ? void 0 : e.length;
    },
    get children() {
      return D(Se, {
        error: !0,
        get children() {
          return t.error;
        }
      });
    }
  }), D(P, {
    get when() {
      var e;
      return (e = t.invisible) == null ? void 0 : e.length;
    },
    get children() {
      return D(gt, {
        get each() {
          return t.invisible;
        },
        children: (e) => D(qe, {
          component: e
        })
      });
    }
  })];
}
const Rt = Math.min, H = Math.max, ue = Math.round, Kt = Math.floor, q = (t) => ({
  x: t,
  y: t
}), hn = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, zn = {
  start: "end",
  end: "start"
};
function be(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Lt(t) {
  return t.split("-")[0];
}
function _t(t) {
  return t.split("-")[1];
}
function An(t) {
  return t === "x" ? "y" : "x";
}
function jr(t) {
  return t === "y" ? "height" : "width";
}
function At(t) {
  return ["top", "bottom"].includes(Lt(t)) ? "y" : "x";
}
function Dr(t) {
  return An(At(t));
}
function pn(t, e, i) {
  i === void 0 && (i = !1);
  const r = _t(t), o = Dr(t), n = jr(o);
  let a = o === "x" ? r === (i ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[n] > e.floating[n] && (a = ge(a)), [a, ge(a)];
}
function mn(t) {
  const e = ge(t);
  return [Je(t), e, Je(e)];
}
function Je(t) {
  return t.replace(/start|end/g, (e) => zn[e]);
}
function Sn(t, e, i) {
  const r = ["left", "right"], o = ["right", "left"], n = ["top", "bottom"], a = ["bottom", "top"];
  switch (t) {
    case "top":
    case "bottom":
      return i ? e ? o : r : e ? r : o;
    case "left":
    case "right":
      return e ? n : a;
    default:
      return [];
  }
}
function Cn(t, e, i, r) {
  const o = _t(t);
  let n = Sn(Lt(t), i === "start", r);
  return o && (n = n.map((a) => a + "-" + o), e && (n = n.concat(n.map(Je)))), n;
}
function ge(t) {
  return t.replace(/left|right|bottom|top/g, (e) => hn[e]);
}
function En(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function vn(t) {
  return typeof t != "number" ? En(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function de(t) {
  const {
    x: e,
    y: i,
    width: r,
    height: o
  } = t;
  return {
    width: r,
    height: o,
    top: i,
    left: e,
    right: e + r,
    bottom: i + o,
    x: e,
    y: i
  };
}
function wi(t, e, i) {
  let {
    reference: r,
    floating: o
  } = t;
  const n = At(e), a = Dr(e), l = jr(a), s = Lt(e), c = n === "y", M = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, g = r[l] / 2 - o[l] / 2;
  let d;
  switch (s) {
    case "top":
      d = {
        x: M,
        y: r.y - o.height
      };
      break;
    case "bottom":
      d = {
        x: M,
        y: r.y + r.height
      };
      break;
    case "right":
      d = {
        x: r.x + r.width,
        y: u
      };
      break;
    case "left":
      d = {
        x: r.x - o.width,
        y: u
      };
      break;
    default:
      d = {
        x: r.x,
        y: r.y
      };
  }
  switch (_t(e)) {
    case "start":
      d[a] -= g * (i && c ? -1 : 1);
      break;
    case "end":
      d[a] += g * (i && c ? -1 : 1);
      break;
  }
  return d;
}
const On = async (t, e, i) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: n = [],
    platform: a
  } = i, l = n.filter(Boolean), s = await (a.isRTL == null ? void 0 : a.isRTL(e));
  let c = await a.getElementRects({
    reference: t,
    floating: e,
    strategy: o
  }), {
    x: M,
    y: u
  } = wi(c, r, s), g = r, d = {}, N = 0;
  for (let I = 0; I < l.length; I++) {
    const {
      name: b,
      fn: w
    } = l[I], {
      x: z,
      y: j,
      data: T,
      reset: L
    } = await w({
      x: M,
      y: u,
      initialPlacement: r,
      placement: g,
      strategy: o,
      middlewareData: d,
      rects: c,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    M = z ?? M, u = j ?? u, d = {
      ...d,
      [b]: {
        ...d[b],
        ...T
      }
    }, L && N <= 50 && (N++, typeof L == "object" && (L.placement && (g = L.placement), L.rects && (c = L.rects === !0 ? await a.getElementRects({
      reference: t,
      floating: e,
      strategy: o
    }) : L.rects), {
      x: M,
      y: u
    } = wi(c, g, s)), I = -1);
  }
  return {
    x: M,
    y: u,
    placement: g,
    strategy: o,
    middlewareData: d
  };
};
async function yr(t, e) {
  var i;
  e === void 0 && (e = {});
  const {
    x: r,
    y: o,
    platform: n,
    rects: a,
    elements: l,
    strategy: s
  } = t, {
    boundary: c = "clippingAncestors",
    rootBoundary: M = "viewport",
    elementContext: u = "floating",
    altBoundary: g = !1,
    padding: d = 0
  } = be(e, t), N = vn(d), b = l[g ? u === "floating" ? "reference" : "floating" : u], w = de(await n.getClippingRect({
    element: (i = await (n.isElement == null ? void 0 : n.isElement(b))) == null || i ? b : b.contextElement || await (n.getDocumentElement == null ? void 0 : n.getDocumentElement(l.floating)),
    boundary: c,
    rootBoundary: M,
    strategy: s
  })), z = u === "floating" ? {
    x: r,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, j = await (n.getOffsetParent == null ? void 0 : n.getOffsetParent(l.floating)), T = await (n.isElement == null ? void 0 : n.isElement(j)) ? await (n.getScale == null ? void 0 : n.getScale(j)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, L = de(n.convertOffsetParentRelativeRectToViewportRelativeRect ? await n.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: l,
    rect: z,
    offsetParent: j,
    strategy: s
  }) : z);
  return {
    top: (w.top - L.top + N.top) / T.y,
    bottom: (L.bottom - w.bottom + N.bottom) / T.y,
    left: (w.left - L.left + N.left) / T.x,
    right: (L.right - w.right + N.right) / T.x
  };
}
const kn = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var i, r;
      const {
        placement: o,
        middlewareData: n,
        rects: a,
        initialPlacement: l,
        platform: s,
        elements: c
      } = e, {
        mainAxis: M = !0,
        crossAxis: u = !0,
        fallbackPlacements: g,
        fallbackStrategy: d = "bestFit",
        fallbackAxisSideDirection: N = "none",
        flipAlignment: I = !0,
        ...b
      } = be(t, e);
      if ((i = n.arrow) != null && i.alignmentOffset)
        return {};
      const w = Lt(o), z = At(l), j = Lt(l) === l, T = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), L = g || (j || !I ? [ge(l)] : mn(l)), C = N !== "none";
      !g && C && L.push(...Cn(l, I, N, T));
      const h = [l, ...L], A = await yr(e, b), x = [];
      let m = ((r = n.flip) == null ? void 0 : r.overflows) || [];
      if (M && x.push(A[w]), u) {
        const it = pn(o, a, T);
        x.push(A[it[0]], A[it[1]]);
      }
      if (m = [...m, {
        placement: o,
        overflows: x
      }], !x.every((it) => it <= 0)) {
        var S, V;
        const it = (((S = n.flip) == null ? void 0 : S.index) || 0) + 1, gi = h[it];
        if (gi)
          return {
            data: {
              index: it,
              overflows: m
            },
            reset: {
              placement: gi
            }
          };
        let Ot = (V = m.filter((wt) => wt.overflows[0] <= 0).sort((wt, lt) => wt.overflows[1] - lt.overflows[1])[0]) == null ? void 0 : V.placement;
        if (!Ot)
          switch (d) {
            case "bestFit": {
              var G;
              const wt = (G = m.filter((lt) => {
                if (C) {
                  const st = At(lt.placement);
                  return st === z || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  st === "y";
                }
                return !0;
              }).map((lt) => [lt.placement, lt.overflows.filter((st) => st > 0).reduce((st, Rr) => st + Rr, 0)]).sort((lt, st) => lt[1] - st[1])[0]) == null ? void 0 : G[0];
              wt && (Ot = wt);
              break;
            }
            case "initialPlacement":
              Ot = l;
              break;
          }
        if (o !== Ot)
          return {
            reset: {
              placement: Ot
            }
          };
      }
      return {};
    }
  };
};
async function Yn(t, e) {
  const {
    placement: i,
    platform: r,
    elements: o
  } = t, n = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = Lt(i), l = _t(i), s = At(i) === "y", c = ["left", "top"].includes(a) ? -1 : 1, M = n && s ? -1 : 1, u = be(e, t);
  let {
    mainAxis: g,
    crossAxis: d,
    alignmentAxis: N
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: u.mainAxis || 0,
    crossAxis: u.crossAxis || 0,
    alignmentAxis: u.alignmentAxis
  };
  return l && typeof N == "number" && (d = l === "end" ? N * -1 : N), s ? {
    x: d * M,
    y: g * c
  } : {
    x: g * c,
    y: d * M
  };
}
const Qn = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var i, r;
      const {
        x: o,
        y: n,
        placement: a,
        middlewareData: l
      } = e, s = await Yn(e, t);
      return a === ((i = l.offset) == null ? void 0 : i.placement) && (r = l.arrow) != null && r.alignmentOffset ? {} : {
        x: o + s.x,
        y: n + s.y,
        data: {
          ...s,
          placement: a
        }
      };
    }
  };
}, Un = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(e) {
      var i, r;
      const {
        placement: o,
        rects: n,
        platform: a,
        elements: l
      } = e, {
        apply: s = () => {
        },
        ...c
      } = be(t, e), M = await yr(e, c), u = Lt(o), g = _t(o), d = At(o) === "y", {
        width: N,
        height: I
      } = n.floating;
      let b, w;
      u === "top" || u === "bottom" ? (b = u, w = g === (await (a.isRTL == null ? void 0 : a.isRTL(l.floating)) ? "start" : "end") ? "left" : "right") : (w = u, b = g === "end" ? "top" : "bottom");
      const z = I - M.top - M.bottom, j = N - M.left - M.right, T = Rt(I - M[b], z), L = Rt(N - M[w], j), C = !e.middlewareData.shift;
      let h = T, A = L;
      if ((i = e.middlewareData.shift) != null && i.enabled.x && (A = j), (r = e.middlewareData.shift) != null && r.enabled.y && (h = z), C && !g) {
        const m = H(M.left, 0), S = H(M.right, 0), V = H(M.top, 0), G = H(M.bottom, 0);
        d ? A = N - 2 * (m !== 0 || S !== 0 ? m + S : H(M.left, M.right)) : h = I - 2 * (V !== 0 || G !== 0 ? V + G : H(M.top, M.bottom));
      }
      await s({
        ...e,
        availableWidth: A,
        availableHeight: h
      });
      const x = await a.getDimensions(l.floating);
      return N !== x.width || I !== x.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function we() {
  return typeof window < "u";
}
function vt(t) {
  return Lr(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function B(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function et(t) {
  var e;
  return (e = (Lr(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Lr(t) {
  return we() ? t instanceof Node || t instanceof B(t).Node : !1;
}
function $(t) {
  return we() ? t instanceof Element || t instanceof B(t).Element : !1;
}
function tt(t) {
  return we() ? t instanceof HTMLElement || t instanceof B(t).HTMLElement : !1;
}
function Ti(t) {
  return !we() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof B(t).ShadowRoot;
}
function Ft(t) {
  const {
    overflow: e,
    overflowX: i,
    overflowY: r,
    display: o
  } = X(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + i) && !["inline", "contents"].includes(o);
}
function Zn(t) {
  return ["table", "td", "th"].includes(vt(t));
}
function Te(t) {
  return [":popover-open", ":modal"].some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
function ti(t) {
  const e = ei(), i = $(t) ? X(t) : t;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((r) => i[r] ? i[r] !== "none" : !1) || (i.containerType ? i.containerType !== "normal" : !1) || !e && (i.backdropFilter ? i.backdropFilter !== "none" : !1) || !e && (i.filter ? i.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((r) => (i.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (i.contain || "").includes(r));
}
function Pn(t) {
  let e = dt(t);
  for (; tt(e) && !pt(e); ) {
    if (ti(e))
      return e;
    if (Te(e))
      return null;
    e = dt(e);
  }
  return null;
}
function ei() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function pt(t) {
  return ["html", "body", "#document"].includes(vt(t));
}
function X(t) {
  return B(t).getComputedStyle(t);
}
function xe(t) {
  return $(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function dt(t) {
  if (vt(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    Ti(t) && t.host || // Fallback.
    et(t)
  );
  return Ti(e) ? e.host : e;
}
function br(t) {
  const e = dt(t);
  return pt(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : tt(e) && Ft(e) ? e : br(e);
}
function Bt(t, e, i) {
  var r;
  e === void 0 && (e = []), i === void 0 && (i = !0);
  const o = br(t), n = o === ((r = t.ownerDocument) == null ? void 0 : r.body), a = B(o);
  if (n) {
    const l = _e(a);
    return e.concat(a, a.visualViewport || [], Ft(o) ? o : [], l && i ? Bt(l) : []);
  }
  return e.concat(o, Bt(o, [], i));
}
function _e(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function wr(t) {
  const e = X(t);
  let i = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const o = tt(t), n = o ? t.offsetWidth : i, a = o ? t.offsetHeight : r, l = ue(i) !== n || ue(r) !== a;
  return l && (i = n, r = a), {
    width: i,
    height: r,
    $: l
  };
}
function ii(t) {
  return $(t) ? t : t.contextElement;
}
function ht(t) {
  const e = ii(t);
  if (!tt(e))
    return q(1);
  const i = e.getBoundingClientRect(), {
    width: r,
    height: o,
    $: n
  } = wr(e);
  let a = (n ? ue(i.width) : i.width) / r, l = (n ? ue(i.height) : i.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: a,
    y: l
  };
}
const Gn = /* @__PURE__ */ q(0);
function Tr(t) {
  const e = B(t);
  return !ei() || !e.visualViewport ? Gn : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Wn(t, e, i) {
  return e === void 0 && (e = !1), !i || e && i !== B(t) ? !1 : e;
}
function bt(t, e, i, r) {
  e === void 0 && (e = !1), i === void 0 && (i = !1);
  const o = t.getBoundingClientRect(), n = ii(t);
  let a = q(1);
  e && (r ? $(r) && (a = ht(r)) : a = ht(t));
  const l = Wn(n, i, r) ? Tr(n) : q(0);
  let s = (o.left + l.x) / a.x, c = (o.top + l.y) / a.y, M = o.width / a.x, u = o.height / a.y;
  if (n) {
    const g = B(n), d = r && $(r) ? B(r) : r;
    let N = g, I = _e(N);
    for (; I && r && d !== N; ) {
      const b = ht(I), w = I.getBoundingClientRect(), z = X(I), j = w.left + (I.clientLeft + parseFloat(z.paddingLeft)) * b.x, T = w.top + (I.clientTop + parseFloat(z.paddingTop)) * b.y;
      s *= b.x, c *= b.y, M *= b.x, u *= b.y, s += j, c += T, N = B(I), I = _e(N);
    }
  }
  return de({
    width: M,
    height: u,
    x: s,
    y: c
  });
}
function ri(t, e) {
  const i = xe(t).scrollLeft;
  return e ? e.left + i : bt(et(t)).left + i;
}
function xr(t, e, i) {
  i === void 0 && (i = !1);
  const r = t.getBoundingClientRect(), o = r.left + e.scrollLeft - (i ? 0 : (
    // RTL <body> scrollbar.
    ri(t, r)
  )), n = r.top + e.scrollTop;
  return {
    x: o,
    y: n
  };
}
function Rn(t) {
  let {
    elements: e,
    rect: i,
    offsetParent: r,
    strategy: o
  } = t;
  const n = o === "fixed", a = et(r), l = e ? Te(e.floating) : !1;
  if (r === a || l && n)
    return i;
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = q(1);
  const M = q(0), u = tt(r);
  if ((u || !u && !n) && ((vt(r) !== "body" || Ft(a)) && (s = xe(r)), tt(r))) {
    const d = bt(r);
    c = ht(r), M.x = d.x + r.clientLeft, M.y = d.y + r.clientTop;
  }
  const g = a && !u && !n ? xr(a, s, !0) : q(0);
  return {
    width: i.width * c.x,
    height: i.height * c.y,
    x: i.x * c.x - s.scrollLeft * c.x + M.x + g.x,
    y: i.y * c.y - s.scrollTop * c.y + M.y + g.y
  };
}
function Bn(t) {
  return Array.from(t.getClientRects());
}
function Hn(t) {
  const e = et(t), i = xe(t), r = t.ownerDocument.body, o = H(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), n = H(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -i.scrollLeft + ri(t);
  const l = -i.scrollTop;
  return X(r).direction === "rtl" && (a += H(e.clientWidth, r.clientWidth) - o), {
    width: o,
    height: n,
    x: a,
    y: l
  };
}
function Vn(t, e) {
  const i = B(t), r = et(t), o = i.visualViewport;
  let n = r.clientWidth, a = r.clientHeight, l = 0, s = 0;
  if (o) {
    n = o.width, a = o.height;
    const c = ei();
    (!c || c && e === "fixed") && (l = o.offsetLeft, s = o.offsetTop);
  }
  return {
    width: n,
    height: a,
    x: l,
    y: s
  };
}
function Jn(t, e) {
  const i = bt(t, !0, e === "fixed"), r = i.top + t.clientTop, o = i.left + t.clientLeft, n = tt(t) ? ht(t) : q(1), a = t.clientWidth * n.x, l = t.clientHeight * n.y, s = o * n.x, c = r * n.y;
  return {
    width: a,
    height: l,
    x: s,
    y: c
  };
}
function xi(t, e, i) {
  let r;
  if (e === "viewport")
    r = Vn(t, i);
  else if (e === "document")
    r = Hn(et(t));
  else if ($(e))
    r = Jn(e, i);
  else {
    const o = Tr(t);
    r = {
      x: e.x - o.x,
      y: e.y - o.y,
      width: e.width,
      height: e.height
    };
  }
  return de(r);
}
function fr(t, e) {
  const i = dt(t);
  return i === e || !$(i) || pt(i) ? !1 : X(i).position === "fixed" || fr(i, e);
}
function _n(t, e) {
  const i = e.get(t);
  if (i)
    return i;
  let r = Bt(t, [], !1).filter((l) => $(l) && vt(l) !== "body"), o = null;
  const n = X(t).position === "fixed";
  let a = n ? dt(t) : t;
  for (; $(a) && !pt(a); ) {
    const l = X(a), s = ti(a);
    !s && l.position === "fixed" && (o = null), (n ? !s && !o : !s && l.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || Ft(a) && !s && fr(t, a)) ? r = r.filter((M) => M !== a) : o = l, a = dt(a);
  }
  return e.set(t, r), r;
}
function Fn(t) {
  let {
    element: e,
    boundary: i,
    rootBoundary: r,
    strategy: o
  } = t;
  const a = [...i === "clippingAncestors" ? Te(e) ? [] : _n(e, this._c) : [].concat(i), r], l = a[0], s = a.reduce((c, M) => {
    const u = xi(e, M, o);
    return c.top = H(u.top, c.top), c.right = Rt(u.right, c.right), c.bottom = Rt(u.bottom, c.bottom), c.left = H(u.left, c.left), c;
  }, xi(e, l, o));
  return {
    width: s.right - s.left,
    height: s.bottom - s.top,
    x: s.left,
    y: s.top
  };
}
function $n(t) {
  const {
    width: e,
    height: i
  } = wr(t);
  return {
    width: e,
    height: i
  };
}
function Xn(t, e, i) {
  const r = tt(e), o = et(e), n = i === "fixed", a = bt(t, !0, n, e);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const s = q(0);
  if (r || !r && !n)
    if ((vt(e) !== "body" || Ft(o)) && (l = xe(e)), r) {
      const g = bt(e, !0, n, e);
      s.x = g.x + e.clientLeft, s.y = g.y + e.clientTop;
    } else o && (s.x = ri(o));
  const c = o && !r && !n ? xr(o, l) : q(0), M = a.left + l.scrollLeft - s.x - c.x, u = a.top + l.scrollTop - s.y - c.y;
  return {
    x: M,
    y: u,
    width: a.width,
    height: a.height
  };
}
function Ce(t) {
  return X(t).position === "static";
}
function fi(t, e) {
  if (!tt(t) || X(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let i = t.offsetParent;
  return et(t) === i && (i = i.ownerDocument.body), i;
}
function hr(t, e) {
  const i = B(t);
  if (Te(t))
    return i;
  if (!tt(t)) {
    let o = dt(t);
    for (; o && !pt(o); ) {
      if ($(o) && !Ce(o))
        return o;
      o = dt(o);
    }
    return i;
  }
  let r = fi(t, e);
  for (; r && Zn(r) && Ce(r); )
    r = fi(r, e);
  return r && pt(r) && Ce(r) && !ti(r) ? i : r || Pn(t) || i;
}
const Kn = async function(t) {
  const e = this.getOffsetParent || hr, i = this.getDimensions, r = await i(t.floating);
  return {
    reference: Xn(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function qn(t) {
  return X(t).direction === "rtl";
}
const ta = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Rn,
  getDocumentElement: et,
  getClippingRect: Fn,
  getOffsetParent: hr,
  getElementRects: Kn,
  getClientRects: Bn,
  getDimensions: $n,
  getScale: ht,
  isElement: $,
  isRTL: qn
};
function zr(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function ea(t, e) {
  let i = null, r;
  const o = et(t);
  function n() {
    var l;
    clearTimeout(r), (l = i) == null || l.disconnect(), i = null;
  }
  function a(l, s) {
    l === void 0 && (l = !1), s === void 0 && (s = 1), n();
    const c = t.getBoundingClientRect(), {
      left: M,
      top: u,
      width: g,
      height: d
    } = c;
    if (l || e(), !g || !d)
      return;
    const N = Kt(u), I = Kt(o.clientWidth - (M + g)), b = Kt(o.clientHeight - (u + d)), w = Kt(M), j = {
      rootMargin: -N + "px " + -I + "px " + -b + "px " + -w + "px",
      threshold: H(0, Rt(1, s)) || 1
    };
    let T = !0;
    function L(C) {
      const h = C[0].intersectionRatio;
      if (h !== s) {
        if (!T)
          return a();
        h ? a(!1, h) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      h === 1 && !zr(c, t.getBoundingClientRect()) && a(), T = !1;
    }
    try {
      i = new IntersectionObserver(L, {
        ...j,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      i = new IntersectionObserver(L, j);
    }
    i.observe(t);
  }
  return a(!0), n;
}
function hi(t, e, i, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: n = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: s = !1
  } = r, c = ii(t), M = o || n ? [...c ? Bt(c) : [], ...Bt(e)] : [];
  M.forEach((w) => {
    o && w.addEventListener("scroll", i, {
      passive: !0
    }), n && w.addEventListener("resize", i);
  });
  const u = c && l ? ea(c, i) : null;
  let g = -1, d = null;
  a && (d = new ResizeObserver((w) => {
    let [z] = w;
    z && z.target === c && d && (d.unobserve(e), cancelAnimationFrame(g), g = requestAnimationFrame(() => {
      var j;
      (j = d) == null || j.observe(e);
    })), i();
  }), c && !s && d.observe(c), d.observe(e));
  let N, I = s ? bt(t) : null;
  s && b();
  function b() {
    const w = bt(t);
    I && !zr(I, w) && i(), I = w, N = requestAnimationFrame(b);
  }
  return i(), () => {
    var w;
    M.forEach((z) => {
      o && z.removeEventListener("scroll", i), n && z.removeEventListener("resize", i);
    }), u == null || u(), (w = d) == null || w.disconnect(), d = null, s && cancelAnimationFrame(N);
  };
}
const ia = Qn, ra = kn, oa = Un, na = (t, e, i) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: ta,
    ...i
  }, n = {
    ...o.platform,
    _c: r
  };
  return On(t, e, {
    ...o,
    platform: n
  });
};
function zi(t, e, i) {
  const r = () => (i == null ? void 0 : i.placement) ?? "bottom", o = () => (i == null ? void 0 : i.strategy) ?? "absolute", n = i == null ? void 0 : i.offset, [a, l] = k({
    x: null,
    y: null,
    placement: r(),
    strategy: o(),
    middlewareData: {}
  }), [s, c] = k();
  Dt(() => {
    const g = s();
    if (g)
      throw g.value;
  });
  const M = p(() => (t(), e(), {}));
  function u() {
    const g = t(), d = e();
    if (g && d) {
      const N = M();
      na(g, d, {
        middleware: i == null ? void 0 : i.middleware,
        placement: r(),
        strategy: o()
      }).then(
        (I) => {
          N === M() && l(I);
        },
        (I) => {
          c(I);
        }
      );
    }
  }
  return Dt(() => {
    const g = t(), d = e();
    if (i == null || i.middleware, r(), o(), g && d)
      if (i != null && i.whileElementsMounted) {
        const N = i.whileElementsMounted(g, d, u);
        N && Jt(N);
      } else
        u();
  }), {
    get x() {
      return a().x;
    },
    get y() {
      return a().y;
    },
    get placement() {
      return a().placement;
    },
    get strategy() {
      return a().strategy;
    },
    get middlewareData() {
      return a().middlewareData;
    },
    get modal() {
      const g = a(), d = {
        right: "padding-left",
        left: "padding-right",
        bottom: "padding-top",
        top: "padding-bottom"
      }, N = g.placement.split("-")[0];
      return {
        position: g.strategy,
        top: g.y ? g.y + "px" : 0,
        left: g.x ? g.x + "px" : 0,
        [d[N]]: n ? n + "px" : 0
      };
    },
    update: u
  };
}
var aa = /* @__PURE__ */ f('<div class="flex items-center justify-center"><div>'), la = /* @__PURE__ */ f("<div><div></div><div role=tooltip><div>");
function sa() {
  return !!globalThis.navigator && /firefox/i.test(navigator.userAgent);
}
function oi(t) {
  Dt(() => {
    t.reference && i(t.reference);
  });
  const [e, i] = k(t.reference), [r, o] = k(), [n, a] = k(), [l, s] = k(), c = sa() ? {
    transition: "none",
    transform: "none"
  } : {
    transition: "transform 300ms"
  }, M = zi(e, n, {
    placement: t.placement,
    whileElementsMounted: hi,
    middleware: t.withReference ? [ia(({
      rects: I
    }) => -I.reference.width - (t.arrow ? 4 : 0)), oa({
      apply({
        elements: I,
        rects: b
      }) {
        Object.assign(I.floating.style, {
          width: `${b.reference.width + (t.arrow ? 4 : 0) + 1}px`,
          minHeight: `${b.reference.height}px`,
          ...c
        });
      }
    })] : [ra({
      fallbackAxisSideDirection: "end"
    })],
    offset: t.offset
  }), u = t.arrow && t.withReference ? zi(r, l, {
    placement: t.placement.split("-")[0],
    whileElementsMounted: hi,
    middleware: []
  }) : void 0, g = {
    right: "",
    left: "flex-row-reverse",
    bottom: "flex-col",
    top: "flex-col-reverse"
  }, d = {
    right: "-mr-1",
    left: "-ml-1",
    bottom: "-mb-1",
    top: "-mt-1"
  };
  je(() => {
    M.update(), u == null || u.update();
  });
  const N = p(() => M.placement.split("-")[0]);
  return (() => {
    var I = la(), b = I.firstChild, w = b.nextSibling, z = w.firstChild;
    return b.$$click = (j) => "blur" in j.target && typeof j.target.blur == "function" && j.target.blur(), jt((j) => {
      o(j), t.reference || i(j);
    }, b), y(b, () => t.children), jt(a, w), y(w, D(P, {
      get when() {
        return t.arrow;
      },
      get children() {
        var j = aa(), T = j.firstChild;
        return jt(s, T), E((L) => {
          var C = {
            "w-1 relative hidden lg:block": t.withReference,
            invisible: t.disabled
          }, h = J("w-2 h-2 rotate-45", t.arrowClass, d[N()]), A = !!t.withReference, x = u != null && u.y ? `${u.y - 4}px` : void 0;
          return L.e = yt(j, C, L.e), h !== L.t && K(T, L.t = h), A !== L.a && T.classList.toggle("absolute", L.a = A), x !== L.o && ((L.o = x) != null ? T.style.setProperty("top", x) : T.style.removeProperty("top")), L;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0
        }), j;
      }
    }), z), y(z, () => t.tip), E((j) => {
      var T = J("dropdown", t.class), L = !t.disabled, C = J(t.class), h = J("dropdown-content z-10 absolute bg-transparent flex", g[N()]), A = M.modal, x = J("rounded-md flex-row items-center", t.tooltipClass), m = !!t.disabled;
      return T !== j.e && K(I, j.e = T), L !== j.t && I.classList.toggle("dropdown-hover", j.t = L), C !== j.a && K(b, j.a = C), h !== j.o && K(w, j.o = h), j.i = nr(w, A, j.i), x !== j.n && K(z, j.n = x), m !== j.s && z.classList.toggle("invisible", j.s = m), j;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0,
      n: void 0,
      s: void 0
    }), I;
  })();
}
Et(["click"]);
var ca = /* @__PURE__ */ f('<div class="tabs tabs-lg tabs-lift group rounded-md shadow-sm content-stretch items-stretch outline-offset-2 relative"><input type=radio class="tab tab-active text-xl font-semibold cursor-default"checked tabindex=-1><div class="tab-content bg-base-100 border-base-300 rounded-md px-5 !h-[22rem]"><div class></div></div><button class="btn btn-md btn-primary btn-outline absolute right-4 bottom-4 gap-0 px-3 transition-all"><svg xmlns=http://www.w3.org/2000/svg class="h-6 w-6"viewBox="0 0 24 24"><path fill=none stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M15 19h4m0 0v-4m0 4l-4-4M9 5H5m0 0v4m0-4l4 4m6-4h4m0 0v4m0-4l-4 4M9 19H5m0 0v-4m0 4l4-4"></path></svg><span class="overflow-hidden text-nowrap w-0 group-hover:w-24 transition-all">Detailed view'), Ma = /* @__PURE__ */ f("<div>"), ua = /* @__PURE__ */ f('<dialog class=modal inert><div class="modal-box w-11/12 max-w-5xl"><h3 class="font-bold text-xl"></h3><div></div><div class=modal-action><form method=dialog><button class=btn>Close</button></form></div></div><form method=dialog class=modal-backdrop><button>close'), ga = /* @__PURE__ */ f('<span class="-ml-1 text-xs opacity-60">(required)'), da = /* @__PURE__ */ f('<div class="flex flex-col items-baseline"><div class="divider divider-start font-semibold"><span></span></div><div class="flex flex-row flex-wrap gap-2">'), Ia = /* @__PURE__ */ f('<img class="w-4 h-4">'), Na = /* @__PURE__ */ f('<button type=button class="btn btn-sm rounded-md text-nowrap">');
function ja(t) {
  const {
    currentFeatures: e,
    selectFeature: i,
    rules: r
  } = U(R), [o, n] = k();
  function a() {
    const s = Y(o);
    s && (s.open ? s.removeAttribute("inert") : s.setAttribute("inert", ""));
  }
  function l() {
    const s = Y(o);
    s && (s.showModal(), a());
  }
  return [(() => {
    var s = ca(), c = s.firstChild, M = c.nextSibling, u = M.firstChild, g = M.nextSibling;
    return s.style.setProperty("--tab-radius", "0.375rem"), y(u, D(gt, {
      get each() {
        return t.categories;
      },
      children: (d) => {
        const N = p(() => e.filter((I) => I.category === d.label));
        return (() => {
          var I = da(), b = I.firstChild, w = b.firstChild, z = b.nextSibling;
          return y(w, () => d.label), y(b, D(P, {
            get when() {
              return d.required;
            },
            get children() {
              return ga();
            }
          }), null), y(z, D(gt, {
            get each() {
              return N();
            },
            children: (j) => D(oi, {
              tip: "Vike cannot be disabled. It is the foundation that allows all others tools to work cohesively",
              placement: "right",
              arrow: !0,
              offset: 8,
              tooltipClass: "text-center w-64 p-2 text-sm shadow-md bg-primary text-primary-content",
              arrowClass: "bg-primary",
              get disabled() {
                return j.flag !== "vike";
              },
              get children() {
                var T = Na();
                return T.$$click = () => {
                  j.readonly || j.disabled || i(d.label, j.flag, !j.selected);
                }, y(T, D(P, {
                  get when() {
                    return j.image;
                  },
                  get children() {
                    var L = Ia();
                    return E(() => Z(L, "src", j.image)), L;
                  }
                }), null), y(T, () => j.label, null), E((L) => {
                  var C = j.flag, h = j.disabled, A = {
                    "!btn-primary !btn-active": j.selected
                  };
                  return C !== L.e && Z(T, "data-flag", L.e = C), h !== L.t && (T.disabled = L.t = h), L.a = yt(T, A, L.a), L;
                }, {
                  e: void 0,
                  t: void 0,
                  a: void 0
                }), T;
              }
            })
          })), I;
        })();
      }
    })), g.$$click = l, E(() => Z(c, "aria-label", t.label)), s;
  })(), (() => {
    var s = ua(), c = s.firstChild, M = c.firstChild, u = M.nextSibling;
    return s.addEventListener("close", a), jt(n, s), y(M, () => t.label), y(c, D(P, {
      get when() {
        return r().size > 0;
      },
      get children() {
        var g = Ma();
        return y(g, D(Nr, {
          get error() {
            return r().error;
          },
          get warning() {
            return r().warning;
          },
          get info() {
            return r().info;
          }
        })), E((d) => yt(g, {
          "flex flex-col gap-2 leading-6 rounded-md mt-4": r().invisible.length < r().size
        }, d)), g;
      }
    }), u), y(u, () => t.children), s;
  })()];
}
Et(["click"]);
var Da = /* @__PURE__ */ f('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 64 64"><path fill=#86613e d="M63.45 53.623c0 .672-1.126 1.217-2.51 1.217H2.5c-1.385 0-2.508-.545-2.508-1.217l3.154-8.34c0-.672 1.121-1.217 2.505-1.217h52.13c1.385 0 2.508.545 2.508 1.217l3.155 8.34M55.26 36.35c0 .497-.836.904-1.863.904h-43.35c-1.029 0-1.861-.407-1.861-.904l2.34-6.186c0-.499.833-.902 1.859-.902h38.671c1.029 0 1.861.403 1.861.902l2.341 6.186m-5.297-13.3c0 .385-.646.7-1.44.7H14.933c-.792 0-1.44-.315-1.44-.7l1.813-4.794c0-.387.645-.698 1.442-.698h29.961c.794 0 1.44.312 1.44.698l1.812 4.794m-4.481-9.421c0 .29-.486.525-1.089.525H19.063c-.603 0-1.089-.235-1.089-.525l1.369-3.615c0-.293.487-.529 1.085-.529h22.6c.6 0 1.089.235 1.089.529l1.363 3.615"></path><path fill=#a87c4f d="M63.45 52.53c0 .672-1.126 1.215-2.51 1.215H2.5c-1.385 0-2.508-.543-2.508-1.215l3.154-8.339c0-.673 1.121-1.217 2.505-1.217h52.13c1.385 0 2.508.544 2.508 1.217l3.155 8.339M55.26 35.26c0 .497-.836.901-1.863.901h-43.35c-1.029 0-1.861-.404-1.861-.901l2.34-6.188c0-.497.833-.902 1.859-.902h38.671c1.029 0 1.861.405 1.861.902l2.341 6.188m-5.297-13.3c0 .387-.646.7-1.44.7H14.933c-.792 0-1.44-.313-1.44-.7l1.813-4.794c0-.385.645-.698 1.442-.698h29.961c.794 0 1.44.313 1.44.698l1.812 4.794m-4.481-9.424c0 .29-.486.529-1.089.529H19.063c-.603 0-1.089-.239-1.089-.529l1.369-3.615c0-.293.487-.525 1.085-.525h22.6c.6 0 1.089.231 1.089.525l1.363 3.615"></path><path fill=#929497 d="M13.1 61.51c-.614 1.875-3.99 2.534-5.949 1.943c-1.959-.589-4.337-2.975-3.723-4.85l20.706-56.11c.615-1.877 1.802-2.921 3.761-2.33c1.957.588 2.146 2.585 1.532 4.462L13.1 61.509"></path><path fill=#b1b1b2 d="M9.829 63.45c-1.959-.589-4.337-2.973-3.723-4.85L26.811 2.49c.327-1 .822-1.76 1.504-2.167a2.853 2.853 0 0 0-.419-.164c-1.959-.589-3.146.453-3.761 2.33L3.429 58.599c-.614 1.877 1.764 4.261 3.723 4.85c.84.253 1.935.275 2.965.073a4.329 4.329 0 0 1-.288-.073"></path><path fill=#929497 d="M50.26 61.51c.618 1.875 3.99 2.534 5.951 1.943c1.959-.589 4.339-2.975 3.725-4.85L39.228 2.493c-.612-1.877-1.8-2.921-3.759-2.33c-1.959.588-2.146 2.585-1.532 4.462L50.26 61.509"></path><path fill=#b1b1b2 d="M53.53 63.45c1.959-.589 4.335-2.973 3.723-4.85L36.545 2.49c-.327-1-.817-1.76-1.5-2.167c.13-.062.266-.12.419-.164c1.959-.589 3.146.453 3.759 2.33l20.708 56.11c.614 1.877-1.766 4.261-3.725 4.85c-.84.253-1.934.275-2.965.073c.098-.02.196-.045.289-.072">'), ya = /* @__PURE__ */ f('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 36 36"><path fill=#67757F d="M16 34.375a1 1 0 1 1-2 0V26a1 1 0 1 1 2 0v8.375z"></path><circle cx=15.41 cy=15.625 r=13.873 fill=#E1E8ED></circle><path fill=#50A5E6 d="M3.592 16.139c.232 6.334 5.427 11.402 11.818 11.402s11.586-5.068 11.818-11.402H3.592z"></path><path fill=#67757F d="M30 24a2 2 0 0 1-2 2H3a2 2 0 0 1 0-4h25a2 2 0 0 1 2 2z"></path><path fill=#67757F d="M2.622 35.207a.999.999 0 1 1-1.883-.673l3.317-9.262a1 1 0 1 1 1.883.673l-3.317 9.262zm25.757 0a1 1 0 0 0 1.882-.673l-3.359-9.345a1 1 0 1 0-1.882.672l3.359 9.346z"></path><path fill=#E1E8ED d="M19.006 2.266S32.36 6.948 33.778 7.404c3.725 1.199 2.184 5.224-.385 4.582c-5.083-1.271-14.387-4.068-15.415-4.068s1.028-5.652 1.028-5.652z"></path><path fill=#9AAAB4 d="M29 23a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h25a1 1 0 0 1 1 1z"></path><ellipse cx=15.41 cy=16.139 fill=#3B94D9 rx=11.818 ry=1.629></ellipse><ellipse cx=34.047 cy=9.982 fill=#AAB8C2 rx=1.341 ry=.974 transform="rotate(-74.365 34.047 9.981)">');
function Ar(t) {
  return (() => {
    var e = Da();
    return E(() => Z(e, "class", J("fill-current", t.class))), e;
  })();
}
function pr(t) {
  return (() => {
    var e = ya();
    return E(() => Z(e, "class", J("fill-current", t.class))), e;
  })();
}
var La = /* @__PURE__ */ f('<span class="font-mono text-xs opacity-90"><span class="border-l border-solid border-primary py-0.5 px-1 rounded-l-md"></span><span class="border-r border-solid border-primary underline decoration-primary py-0.5 px-1 rounded-r-md">');
async function ba(t) {
  return await (await fetch(`https://img.shields.io/github/commit-activity/y/${t}.json`)).json();
}
function wa(t) {
  if (!t.repo)
    return [];
  const [e, {
    refetch: i
  }] = oo(t.repo, ba, {
    ssrLoadFrom: "initial"
  });
  return je(i), D(P, {
    get when() {
      return e();
    },
    children: (r) => (() => {
      var o = La(), n = o.firstChild, a = n.nextSibling;
      return y(n, () => r().label), y(a, () => r().message), o;
    })()
  });
}
const Ta = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
function Ai(t) {
  const e = {};
  let i;
  for (; i = Ta.exec(t); )
    e[i[1]] = i[2];
  return e;
}
function xa(t, e) {
  if (typeof t == "string") {
    if (typeof e == "string")
      return `${t};${e}`;
    t = Ai(t);
  } else typeof e == "string" && (e = Ai(e));
  return { ...t, ...e };
}
function mr(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function fa(t, e) {
  const i = t.indexOf(e);
  i > -1 && t.splice(i, 1);
}
const Sr = (t, e, i) => Math.min(Math.max(i, t), e), _ = {
  duration: 0.3,
  delay: 0,
  endDelay: 0,
  repeat: 0,
  easing: "ease"
}, Ht = (t) => typeof t == "number", zt = (t) => Array.isArray(t) && !Ht(t[0]), ha = (t, e, i) => {
  const r = e - t;
  return ((i - t) % r + r) % r + t;
};
function za(t, e) {
  return zt(t) ? t[ha(0, t.length, e)] : t;
}
const Cr = (t, e, i) => -i * t + i * e + t, Er = () => {
}, ct = (t) => t, ni = (t, e, i) => e - t === 0 ? 1 : (i - t) / (e - t);
function vr(t, e) {
  const i = t[t.length - 1];
  for (let r = 1; r <= e; r++) {
    const o = ni(0, e, r);
    t.push(Cr(i, 1, o));
  }
}
function Aa(t) {
  const e = [0];
  return vr(e, t - 1), e;
}
function pa(t, e = Aa(t.length), i = ct) {
  const r = t.length, o = r - e.length;
  return o > 0 && vr(e, o), (n) => {
    let a = 0;
    for (; a < r - 2 && !(n < e[a + 1]); a++)
      ;
    let l = Sr(0, 1, ni(e[a], e[a + 1], n));
    return l = za(i, a)(l), Cr(t[a], t[a + 1], l);
  };
}
const Or = (t) => Array.isArray(t) && Ht(t[0]), Fe = (t) => typeof t == "object" && !!t.createAnimation, Vt = (t) => typeof t == "function", ma = (t) => typeof t == "string", Ee = {
  ms: (t) => t * 1e3,
  s: (t) => t / 1e3
}, kr = (t, e, i) => (((1 - 3 * i + 3 * e) * t + (3 * i - 6 * e)) * t + 3 * e) * t, Sa = 1e-7, Ca = 12;
function Ea(t, e, i, r, o) {
  let n, a, l = 0;
  do
    a = e + (i - e) / 2, n = kr(a, r, o) - t, n > 0 ? i = a : e = a;
  while (Math.abs(n) > Sa && ++l < Ca);
  return a;
}
function Qt(t, e, i, r) {
  if (t === e && i === r)
    return ct;
  const o = (n) => Ea(n, 0, 1, t, i);
  return (n) => n === 0 || n === 1 ? n : kr(o(n), e, r);
}
const va = (t, e = "end") => (i) => {
  i = e === "end" ? Math.min(i, 0.999) : Math.max(i, 1e-3);
  const r = i * t, o = e === "end" ? Math.floor(r) : Math.ceil(r);
  return Sr(0, 1, o / t);
}, Oa = {
  ease: Qt(0.25, 0.1, 0.25, 1),
  "ease-in": Qt(0.42, 0, 1, 1),
  "ease-in-out": Qt(0.42, 0, 0.58, 1),
  "ease-out": Qt(0, 0, 0.58, 1)
}, ka = /\((.*?)\)/;
function pi(t) {
  if (Vt(t))
    return t;
  if (Or(t))
    return Qt(...t);
  const e = Oa[t];
  if (e)
    return e;
  if (t.startsWith("steps")) {
    const i = ka.exec(t);
    if (i) {
      const r = i[1].split(",");
      return va(parseFloat(r[0]), r[1].trim());
    }
  }
  return ct;
}
class Ya {
  constructor(e, i = [0, 1], { easing: r, duration: o = _.duration, delay: n = _.delay, endDelay: a = _.endDelay, repeat: l = _.repeat, offset: s, direction: c = "normal", autoplay: M = !0 } = {}) {
    if (this.startTime = null, this.rate = 1, this.t = 0, this.cancelTimestamp = null, this.easing = ct, this.duration = 0, this.totalDuration = 0, this.repeat = 0, this.playState = "idle", this.finished = new Promise((g, d) => {
      this.resolve = g, this.reject = d;
    }), r = r || _.easing, Fe(r)) {
      const g = r.createAnimation(i);
      r = g.easing, i = g.keyframes || i, o = g.duration || o;
    }
    this.repeat = l, this.easing = zt(r) ? ct : pi(r), this.updateDuration(o);
    const u = pa(i, s, zt(r) ? r.map(pi) : ct);
    this.tick = (g) => {
      var d;
      n = n;
      let N = 0;
      this.pauseTime !== void 0 ? N = this.pauseTime : N = (g - this.startTime) * this.rate, this.t = N, N /= 1e3, N = Math.max(N - n, 0), this.playState === "finished" && this.pauseTime === void 0 && (N = this.totalDuration);
      const I = N / this.duration;
      let b = Math.floor(I), w = I % 1;
      !w && I >= 1 && (w = 1), w === 1 && b--;
      const z = b % 2;
      (c === "reverse" || c === "alternate" && z || c === "alternate-reverse" && !z) && (w = 1 - w);
      const j = N >= this.totalDuration ? 1 : Math.min(w, 1), T = u(this.easing(j));
      e(T), this.pauseTime === void 0 && (this.playState === "finished" || N >= this.totalDuration + a) ? (this.playState = "finished", (d = this.resolve) === null || d === void 0 || d.call(this, T)) : this.playState !== "idle" && (this.frameRequestId = requestAnimationFrame(this.tick));
    }, M && this.play();
  }
  play() {
    const e = performance.now();
    this.playState = "running", this.pauseTime !== void 0 ? this.startTime = e - this.pauseTime : this.startTime || (this.startTime = e), this.cancelTimestamp = this.startTime, this.pauseTime = void 0, this.frameRequestId = requestAnimationFrame(this.tick);
  }
  pause() {
    this.playState = "paused", this.pauseTime = this.t;
  }
  finish() {
    this.playState = "finished", this.tick(0);
  }
  stop() {
    var e;
    this.playState = "idle", this.frameRequestId !== void 0 && cancelAnimationFrame(this.frameRequestId), (e = this.reject) === null || e === void 0 || e.call(this, !1);
  }
  cancel() {
    this.stop(), this.tick(this.cancelTimestamp);
  }
  reverse() {
    this.rate *= -1;
  }
  commitStyles() {
  }
  updateDuration(e) {
    this.duration = e, this.totalDuration = e * (this.repeat + 1);
  }
  get currentTime() {
    return this.t;
  }
  set currentTime(e) {
    this.pauseTime !== void 0 || this.rate === 0 ? this.pauseTime = e : this.startTime = performance.now() - e / this.rate;
  }
  get playbackRate() {
    return this.rate;
  }
  set playbackRate(e) {
    this.rate = e;
  }
}
class Qa {
  setAnimation(e) {
    this.animation = e, e == null || e.finished.then(() => this.clearAnimation()).catch(() => {
    });
  }
  clearAnimation() {
    this.animation = this.generator = void 0;
  }
}
const ve = /* @__PURE__ */ new WeakMap();
function Yr(t) {
  return ve.has(t) || ve.set(t, {
    transforms: [],
    values: /* @__PURE__ */ new Map()
  }), ve.get(t);
}
function Ua(t, e) {
  return t.has(e) || t.set(e, new Qa()), t.get(e);
}
const Za = ["", "X", "Y", "Z"], Pa = ["translate", "scale", "rotate", "skew"], mt = {
  x: "translateX",
  y: "translateY",
  z: "translateZ"
}, mi = {
  syntax: "<angle>",
  initialValue: "0deg",
  toDefaultUnit: (t) => t + "deg"
}, Ga = {
  translate: {
    syntax: "<length-percentage>",
    initialValue: "0px",
    toDefaultUnit: (t) => t + "px"
  },
  rotate: mi,
  scale: {
    syntax: "<number>",
    initialValue: 1,
    toDefaultUnit: ct
  },
  skew: mi
}, St = /* @__PURE__ */ new Map(), fe = (t) => `--motion-${t}`, Ie = ["x", "y", "z"];
Pa.forEach((t) => {
  Za.forEach((e) => {
    Ie.push(t + e), St.set(fe(t + e), Ga[t]);
  });
});
const Wa = (t, e) => Ie.indexOf(t) - Ie.indexOf(e), Ra = new Set(Ie), ai = (t) => Ra.has(t), Ba = (t, e) => {
  mt[e] && (e = mt[e]);
  const { transforms: i } = Yr(t);
  mr(i, e), t.style.transform = Qr(i);
}, Qr = (t) => t.sort(Wa).reduce(Ha, "").trim(), Ha = (t, e) => `${t} ${e}(var(${fe(e)}))`, $e = (t) => t.startsWith("--"), Si = /* @__PURE__ */ new Set();
function Va(t) {
  if (!Si.has(t)) {
    Si.add(t);
    try {
      const { syntax: e, initialValue: i } = St.has(t) ? St.get(t) : {};
      CSS.registerProperty({
        name: t,
        inherits: !1,
        syntax: e,
        initialValue: i
      });
    } catch {
    }
  }
}
const Oe = (t, e) => document.createElement("div").animate(t, e), Ci = {
  cssRegisterProperty: () => typeof CSS < "u" && Object.hasOwnProperty.call(CSS, "registerProperty"),
  waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
  partialKeyframes: () => {
    try {
      Oe({ opacity: [1] });
    } catch {
      return !1;
    }
    return !0;
  },
  finished: () => !!Oe({ opacity: [0, 1] }, { duration: 1e-3 }).finished,
  linearEasing: () => {
    try {
      Oe({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }
}, ke = {}, xt = {};
for (const t in Ci)
  xt[t] = () => (ke[t] === void 0 && (ke[t] = Ci[t]()), ke[t]);
const Ja = 0.015, _a = (t, e) => {
  let i = "";
  const r = Math.round(e / Ja);
  for (let o = 0; o < r; o++)
    i += t(ni(0, r - 1, o)) + ", ";
  return i.substring(0, i.length - 2);
}, Ei = (t, e) => Vt(t) ? xt.linearEasing() ? `linear(${_a(t, e)})` : _.easing : Or(t) ? Fa(t) : t, Fa = ([t, e, i, r]) => `cubic-bezier(${t}, ${e}, ${i}, ${r})`;
function $a(t, e) {
  for (let i = 0; i < t.length; i++)
    t[i] === null && (t[i] = i ? t[i - 1] : e());
  return t;
}
const Xa = (t) => Array.isArray(t) ? t : [t];
function Xe(t) {
  return mt[t] && (t = mt[t]), ai(t) ? fe(t) : t;
}
const Ut = {
  get: (t, e) => {
    e = Xe(e);
    let i = $e(e) ? t.style.getPropertyValue(e) : getComputedStyle(t)[e];
    if (!i && i !== 0) {
      const r = St.get(e);
      r && (i = r.initialValue);
    }
    return i;
  },
  set: (t, e, i) => {
    e = Xe(e), $e(e) ? t.style.setProperty(e, i) : t.style[e] = i;
  }
};
function Ka(t, e = !0) {
  if (!(!t || t.playState === "finished"))
    try {
      t.stop ? t.stop() : (e && t.commitStyles(), t.cancel());
    } catch {
    }
}
function qa(t, e) {
  var i;
  let r = (e == null ? void 0 : e.toDefaultUnit) || ct;
  const o = t[t.length - 1];
  if (ma(o)) {
    const n = ((i = o.match(/(-?[\d.]+)([a-z%]*)/)) === null || i === void 0 ? void 0 : i[2]) || "";
    n && (r = (a) => a + n);
  }
  return r;
}
function tl() {
  return window.__MOTION_DEV_TOOLS_RECORD;
}
function el(t, e, i, r = {}, o) {
  const n = tl(), a = r.record !== !1 && n;
  let l, { duration: s = _.duration, delay: c = _.delay, endDelay: M = _.endDelay, repeat: u = _.repeat, easing: g = _.easing, persist: d = !1, direction: N, offset: I, allowWebkitAcceleration: b = !1, autoplay: w = !0 } = r;
  const z = Yr(t), j = ai(e);
  let T = xt.waapi();
  j && Ba(t, e);
  const L = Xe(e), C = Ua(z.values, L), h = St.get(L);
  return Ka(C.animation, !(Fe(g) && C.generator) && r.record !== !1), () => {
    const A = () => {
      var S, V;
      return (V = (S = Ut.get(t, L)) !== null && S !== void 0 ? S : h == null ? void 0 : h.initialValue) !== null && V !== void 0 ? V : 0;
    };
    let x = $a(Xa(i), A);
    const m = qa(x, h);
    if (Fe(g)) {
      const S = g.createAnimation(x, e !== "opacity", A, L, C);
      g = S.easing, x = S.keyframes || x, s = S.duration || s;
    }
    if ($e(L) && (xt.cssRegisterProperty() ? Va(L) : T = !1), j && !xt.linearEasing() && (Vt(g) || zt(g) && g.some(Vt)) && (T = !1), T) {
      h && (x = x.map((G) => Ht(G) ? h.toDefaultUnit(G) : G)), x.length === 1 && (!xt.partialKeyframes() || a) && x.unshift(A());
      const S = {
        delay: Ee.ms(c),
        duration: Ee.ms(s),
        endDelay: Ee.ms(M),
        easing: zt(g) ? void 0 : Ei(g, s),
        direction: N,
        iterations: u + 1,
        fill: "both"
      };
      l = t.animate({
        [L]: x,
        offset: I,
        easing: zt(g) ? g.map((G) => Ei(G, s)) : void 0
      }, S), l.finished || (l.finished = new Promise((G, it) => {
        l.onfinish = G, l.oncancel = it;
      }));
      const V = x[x.length - 1];
      l.finished.then(() => {
        d || (Ut.set(t, L, V), l.cancel());
      }).catch(Er), b || (l.playbackRate = 1.000001);
    } else if (o && j)
      x = x.map((S) => typeof S == "string" ? parseFloat(S) : S), x.length === 1 && x.unshift(parseFloat(A())), l = new o((S) => {
        Ut.set(t, L, m ? m(S) : S);
      }, x, Object.assign(Object.assign({}, r), {
        duration: s,
        easing: g
      }));
    else {
      const S = x[x.length - 1];
      Ut.set(t, L, h && Ht(S) ? h.toDefaultUnit(S) : S);
    }
    return a && n(t, e, x, {
      duration: s,
      delay: c,
      easing: g,
      repeat: u,
      offset: I
    }, "motion-one"), C.setAnimation(l), l && !w && l.pause(), l;
  };
}
const il = (t, e) => (
  /**
   * TODO: Make test for this
   * Always return a new object otherwise delay is overwritten by results of stagger
   * and this results in no stagger
   */
  t[e] ? Object.assign(Object.assign({}, t), t[e]) : Object.assign({}, t)
);
function rl(t, e) {
  return typeof t == "string" ? t = document.querySelectorAll(t) : t instanceof Element && (t = [t]), Array.from(t || []);
}
function Ur(t, e) {
  var i = {};
  for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (i[r] = t[r]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(t); o < r.length; o++)
      e.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[o]) && (i[r[o]] = t[r[o]]);
  return i;
}
const ol = {
  any: 0,
  all: 1
};
function nl(t, e, { root: i, margin: r, amount: o = "any" } = {}) {
  if (typeof IntersectionObserver > "u")
    return () => {
    };
  const n = rl(t), a = /* @__PURE__ */ new WeakMap(), l = (c) => {
    c.forEach((M) => {
      const u = a.get(M.target);
      if (M.isIntersecting !== !!u)
        if (M.isIntersecting) {
          const g = e(M);
          Vt(g) ? a.set(M.target, g) : s.unobserve(M.target);
        } else u && (u(M), a.delete(M.target));
    });
  }, s = new IntersectionObserver(l, {
    root: i,
    rootMargin: r,
    threshold: typeof o == "number" ? o : ol[o]
  });
  return n.forEach((c) => s.observe(c)), () => s.disconnect();
}
function al(t, e) {
  return typeof t != typeof e ? !0 : Array.isArray(t) && Array.isArray(e) ? !ll(t, e) : t !== e;
}
function ll(t, e) {
  const i = e.length;
  if (i !== t.length)
    return !1;
  for (let r = 0; r < i; r++)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function sl(t) {
  return typeof t == "object";
}
function vi(t, e) {
  if (sl(t))
    return t;
  if (t && e)
    return e[t];
}
let Mt;
function cl() {
  if (!Mt)
    return;
  const t = Mt.sort(ul).map(gl);
  t.forEach(Oi), t.forEach(Oi), Mt = void 0;
}
function Ye(t) {
  Mt ? mr(Mt, t) : (Mt = [t], requestAnimationFrame(cl));
}
function Ml(t) {
  Mt && fa(Mt, t);
}
const ul = (t, e) => t.getDepth() - e.getDepth(), gl = (t) => t.animateUpdates(), Oi = (t) => t.next(), ki = (t, e) => new CustomEvent(t, { detail: { target: e } });
function Ke(t, e, i) {
  t.dispatchEvent(new CustomEvent(e, { detail: { originalEvent: i } }));
}
function Yi(t, e, i) {
  t.dispatchEvent(new CustomEvent(e, { detail: { originalEntry: i } }));
}
const dl = {
  isActive: (t) => !!t.inView,
  subscribe: (t, { enable: e, disable: i }, { inViewOptions: r = {} }) => {
    const { once: o } = r, n = Ur(r, ["once"]);
    return nl(t, (a) => {
      if (e(), Yi(t, "viewenter", a), !o)
        return (l) => {
          i(), Yi(t, "viewleave", l);
        };
    }, n);
  }
}, Qi = (t, e, i) => (r) => {
  r.pointerType && r.pointerType !== "mouse" || (i(), Ke(t, e, r));
}, Il = {
  isActive: (t) => !!t.hover,
  subscribe: (t, { enable: e, disable: i }) => {
    const r = Qi(t, "hoverstart", e), o = Qi(t, "hoverend", i);
    return t.addEventListener("pointerenter", r), t.addEventListener("pointerleave", o), () => {
      t.removeEventListener("pointerenter", r), t.removeEventListener("pointerleave", o);
    };
  }
}, Nl = {
  isActive: (t) => !!t.press,
  subscribe: (t, { enable: e, disable: i }) => {
    const r = (n) => {
      i(), Ke(t, "pressend", n), window.removeEventListener("pointerup", r);
    }, o = (n) => {
      e(), Ke(t, "pressstart", n), window.addEventListener("pointerup", r);
    };
    return t.addEventListener("pointerdown", o), () => {
      t.removeEventListener("pointerdown", o), window.removeEventListener("pointerup", r);
    };
  }
}, ie = { inView: dl, hover: Il, press: Nl }, Ui = ["initial", "animate", ...Object.keys(ie), "exit"], Zi = /* @__PURE__ */ new WeakMap();
function jl(t = {}, e) {
  let i, r = e ? e.getDepth() + 1 : 0;
  const o = { initial: !0, animate: !0 }, n = {}, a = {};
  for (const I of Ui)
    a[I] = typeof t[I] == "string" ? t[I] : e == null ? void 0 : e.getContext()[I];
  const l = t.initial === !1 ? "animate" : "initial";
  let s = vi(t[l] || a[l], t.variants) || {}, c = Ur(s, ["transition"]);
  const M = Object.assign({}, c);
  function* u() {
    var I, b;
    const w = c;
    c = {};
    const z = {};
    for (const h of Ui) {
      if (!o[h])
        continue;
      const A = vi(t[h]);
      if (A)
        for (const x in A)
          x !== "transition" && (c[x] = A[x], z[x] = il((b = (I = A.transition) !== null && I !== void 0 ? I : t.transition) !== null && b !== void 0 ? b : {}, x));
    }
    const j = /* @__PURE__ */ new Set([
      ...Object.keys(c),
      ...Object.keys(w)
    ]), T = [];
    j.forEach((h) => {
      var A;
      c[h] === void 0 && (c[h] = M[h]), al(w[h], c[h]) && ((A = M[h]) !== null && A !== void 0 || (M[h] = Ut.get(i, h)), T.push(el(i, h, c[h], z[h], Ya)));
    }), yield;
    const L = T.map((h) => h()).filter(Boolean);
    if (!L.length)
      return;
    const C = c;
    i.dispatchEvent(ki("motionstart", C)), Promise.all(L.map((h) => h.finished)).then(() => {
      i.dispatchEvent(ki("motioncomplete", C));
    }).catch(Er);
  }
  const g = (I, b) => () => {
    o[I] = b, Ye(N);
  }, d = () => {
    for (const I in ie) {
      const b = ie[I].isActive(t), w = n[I];
      b && !w ? n[I] = ie[I].subscribe(i, {
        enable: g(I, !0),
        disable: g(I, !1)
      }, t) : !b && w && (w(), delete n[I]);
    }
  }, N = {
    update: (I) => {
      i && (t = I, d(), Ye(N));
    },
    setActive: (I, b) => {
      i && (o[I] = b, Ye(N));
    },
    animateUpdates: u,
    getDepth: () => r,
    getTarget: () => c,
    getOptions: () => t,
    getContext: () => a,
    mount: (I) => (i = I, Zi.set(i, N), d(), () => {
      Zi.delete(i), Ml(N);
      for (const b in n)
        n[b]();
    }),
    isMounted: () => !!i
  };
  return N;
}
function Dl(t) {
  const e = {}, i = [];
  for (let r in t) {
    const o = t[r];
    ai(r) && (mt[r] && (r = mt[r]), i.push(r), r = fe(r));
    let n = Array.isArray(o) ? o[0] : o;
    const a = St.get(r);
    a && (n = Ht(o) ? a.toDefaultUnit(o) : o), e[r] = n;
  }
  return i.length && (e.transform = Qr(i)), e;
}
var yl = De();
function Ll(t, e, i, r) {
  const o = jl((i == null ? void 0 : i.initial) === !1 ? {
    ...e(),
    initial: !1
  } : e(), r);
  return Dt(() => {
    if (i && !i.mount()) return;
    const n = t(), a = o.mount(n);
    Dt(() => o.update(e())), Jt(() => {
      i && e().exit ? (o.setActive("exit", !0), n.addEventListener("motioncomplete", a)) : a();
    });
  }), [o, Dl(o.getTarget())];
}
var bl = ["initial", "animate", "inView", "inViewOptions", "hover", "press", "variants", "transition", "exit"], wl = ["tag"], Pi = De(), Gi = (t) => {
  const [e, , i] = rr(t, bl, wl), [r, o] = Ll(() => n, () => ({
    ...e
  }), U(yl), U(Pi));
  let n;
  return D(Pi.Provider, {
    value: r,
    get children() {
      return D(qe, ir(i, {
        ref: (a) => {
          var l;
          n = a, (l = t.ref) == null || l.call(t, a);
        },
        get component() {
          return t.tag || "div";
        },
        get style() {
          return xa(t.style, o);
        }
      }));
    }
  });
}, Tl = new Proxy(Gi, {
  get: (t, e) => (i) => D(Gi, ir(i, {
    tag: e
  }))
}), xl = /* @__PURE__ */ f('<div id=bati-features class="grid grid-cols-1 lg:grid-cols-2 grid-flow-dense gap-4 box-border relative bg-transparent mt-4">'), fl = /* @__PURE__ */ f('<div class="flex flex-col relative gap">'), hl = /* @__PURE__ */ f('<span class="-ml-1 text-xs opacity-60">(required)'), zl = /* @__PURE__ */ f('<div class="divider divider-start font-semibold"><span>'), Al = /* @__PURE__ */ f('<div class="flex flex-col lg:flex-row relative"><div class="basis-1/4 w-full gap-y-2"></div><div class=basis-3/4>'), pl = /* @__PURE__ */ f('<label class="group flex items-center cursor-pointer h-12 min-w-60 col-start-1 lg:mr-4"><div class="flex justify-center items-center pr-2.5"><input aria-describedby=details type=checkbox class=checkbox></div><div class="inline-flex gap-2 items-center w-full group"><div class="inline-flex flex-col gap-0 leading-5"><span></span></div><div class=flex-1>'), ml = /* @__PURE__ */ f('<img class="max-w-5 max-h-5">'), Sl = /* @__PURE__ */ f("<span class=text-xs>"), Cl = /* @__PURE__ */ f("<p> Battle-Tested Solution: time-proven library, an industry favorite known for its reliability and widespread adoption."), El = /* @__PURE__ */ f("<p> Stay Ahead of the Game: bleeding-edge library for unparalleled features and performance."), vl = /* @__PURE__ */ f("<div class=opacity-60>"), Ol = /* @__PURE__ */ f('<ul class="list-custom list-check inline-flex gap-2 my-2 flex-wrap">'), kl = /* @__PURE__ */ f('<div class="mx-1 p-2 border-dashed border-t-2 border-t-neutral italic">'), Yl = /* @__PURE__ */ f('<div class="rounded-md relative h-full"role=tooltip id=details><div class="px-3 pb-2 pt-1"><div class="flex items-baseline"><h2 class="text-primary text-lg font-bold"></h2><span class=flex-1>'), Ql = /* @__PURE__ */ f("<ul><a class=link target=_blank tabindex=0>");
function Ul() {
  return (() => {
    var t = xl();
    return y(t, D(gt, {
      get each() {
        return Object.values(ar);
      },
      children: (e) => {
        const i = p(() => lr.filter((r) => r.group === e));
        return D(ja, {
          label: e,
          flipLabel: e,
          get categories() {
            return i();
          },
          class: "w-full sm:w-auto rounded-md",
          get children() {
            var r = fl();
            return y(r, D(gt, {
              get each() {
                return i();
              },
              children: (o) => D(Zl, o)
            })), r;
          }
        });
      }
    })), t;
  })();
}
function Zl(t) {
  const {
    currentFeatures: e
  } = U(R), i = p(() => e.filter((n) => n.category === t.label)), [r, o] = k();
  return [(() => {
    var n = zl(), a = n.firstChild;
    return y(a, () => t.label), y(n, D(P, {
      get when() {
        return t.required;
      },
      get children() {
        return hl();
      }
    }), null), n;
  })(), (() => {
    var n = Al(), a = n.firstChild, l = a.nextSibling;
    return y(a, D(gt, {
      get each() {
        return i();
      },
      children: (s) => D(Pl, {
        feature: s,
        category: t,
        reference: r
      })
    })), y(l, D(Bl, {
      get description() {
        return t.description;
      },
      ref: (s) => {
        o({
          getBoundingClientRect() {
            return s.getBoundingClientRect();
          },
          contextElement: s
        });
      }
    })), n;
  })()];
}
function Pl(t) {
  const {
    selectFeature: e
  } = U(R);
  return D(oi, {
    get tip() {
      return D(Rl, {
        get feature() {
          return t.feature;
        }
      });
    },
    class: "w-full px-1.5",
    placement: "right-start",
    arrow: !0,
    tooltipClass: "text-sm p-0 w-full border-l-2 border-neutral-300 dark:border-neutral-500 shadow-md shadow-base-300 backdrop-blur-md bg-base-300/30 dark:bg-neutral/70",
    arrowClass: "shadow shadow-base-300 bg-neutral-300 dark:bg-neutral-500",
    get disabled() {
      return t.feature.disabled;
    },
    withReference: !0,
    get reference() {
      return t.reference();
    },
    get children() {
      var i = pl(), r = i.firstChild, o = r.firstChild, n = r.nextSibling, a = n.firstChild, l = a.firstChild;
      return a.nextSibling, o.addEventListener("change", () => {
        e(t.category.label, t.feature.flag, !t.feature.selected);
      }), y(n, (() => {
        var s = p(() => !!t.feature.image);
        return () => s() && (() => {
          var c = ml();
          return E((M) => {
            var u = t.feature.image, g = `${t.feature.label} logo`;
            return u !== M.e && Z(c, "src", M.e = u), g !== M.t && Z(c, "alt", M.t = g), M;
          }, {
            e: void 0,
            t: void 0
          }), c;
        })();
      })(), a), y(l, () => t.feature.label), y(a, (() => {
        var s = p(() => !!t.feature.alt);
        return () => s() && (() => {
          var c = Sl();
          return y(c, () => t.feature.alt), c;
        })();
      })(), null), y(n, (() => {
        var s = p(() => t.feature.spectrum === "beaten_path");
        return () => s() && D(Ar, {
          class: "w-4 opacity-80"
        });
      })(), null), y(n, (() => {
        var s = p(() => t.feature.spectrum === "bleeding_edge");
        return () => s() && D(pr, {
          class: "w-4 opacity-80"
        });
      })(), null), E((s) => {
        var c = {
          "opacity-50 cursor-not-allowed": t.feature.disabled
        }, M = !!t.feature.selected, u = !t.feature.disabled, g = !!t.category.multiple, d = !t.category.multiple, N = t.feature.disabled || t.feature.readonly;
        return s.e = yt(i, c, s.e), M !== s.t && o.classList.toggle("checkbox-success", s.t = M), u !== s.a && o.classList.toggle("border-solid", s.a = u), g !== s.o && o.classList.toggle("rounded", s.o = g), d !== s.i && o.classList.toggle("rounded-full", s.i = d), N !== s.n && (o.disabled = s.n = N), s;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0,
        i: void 0,
        n: void 0
      }), E(() => o.checked = t.feature.selected), i;
    }
  });
}
function Gl() {
  return (() => {
    var t = Cl(), e = t.firstChild;
    return y(t, D(Ar, {
      class: "max-w-4 max-h-4 opacity-80 inline align-baseline mr-1"
    }), e), t;
  })();
}
function Wl() {
  return (() => {
    var t = El(), e = t.firstChild;
    return y(t, D(pr, {
      class: "max-w-4 max-h-4 opacity-80 inline align-baseline mr-1"
    }), e), t;
  })();
}
function Rl(t) {
  const e = [];
  return t.feature.url && e.push({
    label: "Homepage",
    href: t.feature.url
  }), t.feature.links && e.push(...t.feature.links), (() => {
    var i = Yl(), r = i.firstChild, o = r.firstChild, n = o.firstChild;
    return n.nextSibling, y(n, () => t.feature.label), y(o, D(wa, {
      get repo() {
        return t.feature.repo;
      }
    }), null), y(r, D(P, {
      get when() {
        return t.feature.tagline;
      },
      get children() {
        var a = vl();
        return y(a, () => t.feature.tagline), a;
      }
    }), null), y(r, D(P, {
      get when() {
        return e.length > 0;
      },
      get children() {
        var a = Ol();
        return y(a, D(gt, {
          each: e,
          children: (l) => (() => {
            var s = Ql(), c = s.firstChild;
            return y(c, () => l.label), E(() => Z(c, "href", l.href)), s;
          })()
        })), a;
      }
    }), null), y(i, D(P, {
      get when() {
        return t.feature.spectrum;
      },
      get children() {
        var a = kl();
        return y(a, D(No, {
          get children() {
            return [D(Ni, {
              get when() {
                return t.feature.spectrum === "beaten_path";
              },
              get children() {
                return D(Gl, {});
              }
            }), D(Ni, {
              get when() {
                return t.feature.spectrum === "bleeding_edge";
              },
              get children() {
                return D(Wl, {});
              }
            })];
          }
        })), a;
      }
    }), null), i;
  })();
}
function Bl(t) {
  return D(Tl.div, {
    exit: {
      opacity: 0
    },
    class: "flex-1 rounded-md shadow-inner shadow-base-300 bg-base-200 h-full py-2 px-3 ml-4 lg:ml-0",
    animate: {
      opacity: 1
    },
    transition: {
      duration: 0.2,
      easing: "ease-in-out"
    },
    ref(e) {
      var i = t.ref;
      typeof i == "function" ? i(e) : t.ref = e;
    },
    get children() {
      return t.description;
    }
  });
}
var Hl = /* @__PURE__ */ f("<button type=button>"), Vl = /* @__PURE__ */ f('<div class="w-full flex box-border gap-2">');
function kt(t) {
  const {
    selectPreset: e
  } = U(R);
  return D(oi, {
    get tip() {
      return t.description;
    },
    placement: "bottom",
    arrow: !0,
    offset: 12,
    tooltipClass: "text-center w-64 p-2 text-sm shadow-md bg-base-200 text-neutral dark:bg-neutral dark:text-neutral-content",
    arrowClass: "bg-base-200 dark:bg-neutral",
    get disabled() {
      return t.disabled;
    },
    get children() {
      var i = Hl();
      return i.$$click = () => !t.disabled && e(t.features), y(i, () => t.title), E((r) => {
        var o = t.disabled, n = J("btn btn-sm whitespace-nowrap", t.class), a = !!t.disabled;
        return o !== r.e && (i.disabled = r.e = o), n !== r.t && K(i, r.t = n), a !== r.a && i.classList.toggle("cursor-not-allowed", r.a = a), r;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      }), i;
    }
  });
}
function Jl() {
  return (() => {
    var t = Vl();
    return y(t, D(kt, {
      title: "Frontend",
      features: ["UI Framework", "CSS", "Linter"],
      description: "Frontend app with a UI Framework and Tailwind CSS"
    }), null), y(t, D(kt, {
      title: "Full-stack",
      features: ["UI Framework", "Data fetching", "Auth", "Database", "CSS", "UI Component Libraries", "Server", "Linter"],
      description: "Full-stack app with Data Fetching, Auth, a Database and a Server"
    }), null), y(t, D(kt, {
      title: "Next.js",
      features: ["react", "Auth", "Data fetching", "hono", "vercel", "Linter"],
      description: "Next.js like app with Data Fetching, Auth, Hono and Vercel"
    }), null), y(t, D(kt, {
      title: "Nuxt",
      features: ["vue", "Auth", "Data fetching", "h3", "Linter"],
      description: "Nuxt like app with Data Fetching, Auth and h3"
    }), null), y(t, D(kt, {
      title: "CMS",
      features: ["UI Framework"],
      disabled: !0,
      description: ""
    }), null), t;
  })();
}
Et(["click"]);
function _l(t) {
  let e;
  const [i, r] = k(!1);
  async function o() {
    clearTimeout(e), r(!0);
    const l = window.getSelection();
    if (l) {
      const s = l.toString().replaceAll(`
`, " ");
      await navigator.clipboard.writeText(s), t.classList.remove("tooltip-primary"), t.classList.add("tooltip", "tooltip-open", "tooltip-success"), e = setTimeout(() => {
        t.classList.remove("tooltip", "tooltip-open", "tooltip-success"), r(!1);
      }, 3e3);
    }
  }
  function n() {
    t.classList.remove("tooltip-success"), t.classList.add("tooltip", "tooltip-open", "tooltip-primary"), r(!1);
  }
  function a() {
    i() || t.classList.remove("tooltip", "tooltip-open", "tooltip-primary");
  }
  t.addEventListener("click", o), t.addEventListener("mouseenter", n), t.addEventListener("mouseleave", a), Jt(() => t.removeEventListener("click", o));
}
var Fl = /* @__PURE__ */ f('<kbd role=tabpanel class="group h-10 join-item rounded-md cursor-pointer relative flex-1 justify-start pl-9 tooltip tooltip-primary text-left inline-flex tooltip-bottom kbd kbd-sm select-all flex-wrap leading-9 gap-2.5"><svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="lucide lucide-terminal absolute top-2 left-2 opacity-40 h-5"><polyline points="4 17 10 11 4 5"></polyline><line x1=12 x2=20 y1=19 y2=19>');
function $l(t) {
  return (() => {
    var e = Fl();
    return e.firstChild, Be(e, "click", t.onClick, !0), Be(e, "mouseenter", t.onMouseEnter), jt(_l, e, () => !0), y(e, () => t.children, null), E(() => Z(e, "data-tip", t.tooltipText)), e;
  })();
}
Et(["click"]);
const Xl = 500, Kl = 20, ql = 300, ts = "https://stackblitz.com", Wi = [
  "angular-cli",
  "create-react-app",
  "html",
  "javascript",
  "node",
  "polymer",
  "typescript",
  "vue"
], es = ["project", "search", "ports", "settings"], is = ["light", "dark"], rs = ["editor", "preview"], Ri = {
  clickToLoad: (t) => Nt("ctl", t),
  devToolsHeight: (t) => Bi("devtoolsheight", t),
  forceEmbedLayout: (t) => Nt("embed", t),
  hideDevTools: (t) => Nt("hidedevtools", t),
  hideExplorer: (t) => Nt("hideExplorer", t),
  hideNavigation: (t) => Nt("hideNavigation", t),
  openFile: (t) => qt("file", t),
  showSidebar: (t) => os("showSidebar", t),
  sidebarView: (t) => Qe("sidebarView", t, es),
  startScript: (t) => qt("startScript", t),
  terminalHeight: (t) => Bi("terminalHeight", t),
  theme: (t) => Qe("theme", t, is),
  view: (t) => Qe("view", t, rs),
  zenMode: (t) => Nt("zenMode", t),
  organization: (t) => `${qt("orgName", t == null ? void 0 : t.name)}&${qt("orgProvider", t == null ? void 0 : t.provider)}`,
  crossOriginIsolated: (t) => Nt("corp", t)
};
function Zr(t = {}) {
  const e = Object.entries(t).map(([i, r]) => r != null && Ri.hasOwnProperty(i) ? Ri[i](r) : "").filter(Boolean);
  return e.length ? `?${e.join("&")}` : "";
}
function Nt(t, e) {
  return e === !0 ? `${t}=1` : "";
}
function os(t, e) {
  return typeof e == "boolean" ? `${t}=${e ? "1" : "0"}` : "";
}
function Bi(t, e) {
  if (typeof e == "number" && !Number.isNaN(e)) {
    const i = Math.min(100, Math.max(0, e));
    return `${t}=${encodeURIComponent(Math.round(i))}`;
  }
  return "";
}
function Qe(t, e = "", i = []) {
  return i.includes(e) ? `${t}=${encodeURIComponent(e)}` : "";
}
function qt(t, e) {
  return (Array.isArray(e) ? e : [e]).filter((r) => typeof r == "string" && r.trim() !== "").map((r) => `${t}=${encodeURIComponent(r)}`).join("&");
}
function Pr() {
  return Math.random().toString(36).slice(2, 6) + Math.random().toString(36).slice(2, 6);
}
function li(t, e) {
  return `${Gr(e)}${t}${Zr(e)}`;
}
function si(t, e) {
  const i = {
    forceEmbedLayout: !0
  };
  return e && typeof e == "object" && Object.assign(i, e), `${Gr(i)}${t}${Zr(i)}`;
}
function Gr(t = {}) {
  return (typeof t.origin == "string" ? t.origin : ts).replace(/\/$/, "");
}
function ci(t, e, i) {
  if (!e || !t || !t.parentNode)
    throw new Error("Invalid Element");
  t.id && (e.id = t.id), t.className && (e.className = t.className), ns(e, i), as(t, e, i), t.replaceWith(e);
}
function Mi(t) {
  if (typeof t == "string") {
    const e = document.getElementById(t);
    if (!e)
      throw new Error(`Could not find element with id '${t}'`);
    return e;
  } else if (t instanceof HTMLElement)
    return t;
  throw new Error(`Invalid element: ${t}`);
}
function ui(t) {
  return t && t.newWindow === !1 ? "_self" : "_blank";
}
function ns(t, e = {}) {
  const i = Object.hasOwnProperty.call(e, "height") ? `${e.height}` : `${ql}`, r = Object.hasOwnProperty.call(e, "width") ? `${e.width}` : void 0;
  t.setAttribute("height", i), r ? t.setAttribute("width", r) : t.setAttribute("style", "width:100%;");
}
function as(t, e, i = {}) {
  var o, n;
  const r = ((n = (o = t.allow) == null ? void 0 : o.split(";")) == null ? void 0 : n.map((a) => a.trim())) ?? [];
  i.crossOriginIsolated && !r.includes("cross-origin-isolated") && r.push("cross-origin-isolated"), r.length > 0 && (e.allow = r.join("; "));
}
class ls {
  constructor(e) {
    this.pending = {}, this.port = e, this.port.onmessage = this.messageListener.bind(this);
  }
  request({ type: e, payload: i }) {
    return new Promise((r, o) => {
      const n = Pr();
      this.pending[n] = { resolve: r, reject: o }, this.port.postMessage({
        type: e,
        payload: {
          ...i,
          // Ensure the payload object includes the request ID
          __reqid: n
        }
      });
    });
  }
  messageListener(e) {
    var l;
    if (typeof ((l = e.data.payload) == null ? void 0 : l.__reqid) != "string")
      return;
    const { type: i, payload: r } = e.data, { __reqid: o, __success: n, __error: a } = r;
    this.pending[o] && (n ? this.pending[o].resolve(this.cleanResult(r)) : this.pending[o].reject(a ? `${i}: ${a}` : i), delete this.pending[o]);
  }
  cleanResult(e) {
    const i = { ...e };
    return delete i.__reqid, delete i.__success, delete i.__error, Object.keys(i).length ? i : null;
  }
}
class ss {
  constructor(e, i) {
    this.editor = {
      /**
       * Open one of several files in tabs and/or split panes.
       *
       * @since 1.7.0 Added support for opening multiple files
       */
      openFile: (r) => this._rdc.request({
        type: "SDK_OPEN_FILE",
        payload: { path: r }
      }),
      /**
       * Set a project file as the currently selected file.
       *
       * - This may update the highlighted file in the file explorer,
       *   and the currently open and/or focused editor tab.
       * - It will _not_ open a new editor tab if the provided path does not
       *   match a currently open tab. See `vm.editor.openFile` to open files.
       *
       * @since 1.7.0
       * @experimental
       */
      setCurrentFile: (r) => this._rdc.request({
        type: "SDK_SET_CURRENT_FILE",
        payload: { path: r }
      }),
      /**
       * Change the color theme
       *
       * @since 1.7.0
       */
      setTheme: (r) => this._rdc.request({
        type: "SDK_SET_UI_THEME",
        payload: { theme: r }
      }),
      /**
       * Change the display mode of the project:
       *
       * - `default`: show the editor and preview pane
       * - `editor`: show the editor pane only
       * - `preview`: show the preview pane only
       *
       * @since 1.7.0
       */
      setView: (r) => this._rdc.request({
        type: "SDK_SET_UI_VIEW",
        payload: { view: r }
      }),
      /**
       * Change the display mode of the sidebar:
       *
       * - `true`: show the sidebar
       * - `false`: hide the sidebar
       *
       * @since 1.7.0
       */
      showSidebar: (r = !0) => this._rdc.request({
        type: "SDK_TOGGLE_SIDEBAR",
        payload: { visible: r }
      })
    }, this.preview = {
      /**
       * The origin (protocol and domain) of the preview iframe.
       *
       * In WebContainers-based projects, the origin will always be `null`;
       * try using `vm.preview.getUrl` instead.
       *
       * @see https://developer.stackblitz.com/guides/user-guide/available-environments
       */
      origin: "",
      /**
       * Get the current preview URL.
       *
       * In both and EngineBlock and WebContainers-based projects, the preview URL
       * may not reflect the exact path of the current page, after user navigation.
       *
       * In WebContainers-based projects, the preview URL will be `null` initially,
       * and until the project starts a web server.
       *
       * @since 1.7.0
       * @experimental
       */
      getUrl: () => this._rdc.request({
        type: "SDK_GET_PREVIEW_URL",
        payload: {}
      }).then((r) => (r == null ? void 0 : r.url) ?? null),
      /**
       * Change the path of the preview URL.
       *
       * In WebContainers-based projects, this will be ignored if there is no
       * currently running web server.
       *
       * @since 1.7.0
       * @experimental
       */
      setUrl: (r = "/") => {
        if (typeof r != "string" || !r.startsWith("/"))
          throw new Error(`Invalid argument: expected a path starting with '/', got '${r}'`);
        return this._rdc.request({
          type: "SDK_SET_PREVIEW_URL",
          payload: { path: r }
        });
      }
    }, this._rdc = new ls(e), Object.defineProperty(this.preview, "origin", {
      value: typeof i.previewOrigin == "string" ? i.previewOrigin : null,
      writable: !1
    });
  }
  /**
   * Apply batch updates to the project files in one call.
   */
  applyFsDiff(e) {
    const i = (r) => r !== null && typeof r == "object";
    if (!i(e) || !i(e.create))
      throw new Error("Invalid diff object: expected diff.create to be an object.");
    if (!Array.isArray(e.destroy))
      throw new Error("Invalid diff object: expected diff.destroy to be an array.");
    return this._rdc.request({
      type: "SDK_APPLY_FS_DIFF",
      payload: e
    });
  }
  /**
   * Get the project’s defined dependencies.
   *
   * In EngineBlock projects, version numbers represent the resolved dependency versions.
   * In WebContainers-based projects, returns data from the project’s `package.json` without resolving installed version numbers.
   */
  getDependencies() {
    return this._rdc.request({
      type: "SDK_GET_DEPS_SNAPSHOT",
      payload: {}
    });
  }
  /**
   * Get a snapshot of the project files and their content.
   */
  getFsSnapshot() {
    return this._rdc.request({
      type: "SDK_GET_FS_SNAPSHOT",
      payload: {}
    });
  }
}
const re = [];
class cs {
  constructor(e) {
    this.id = Pr(), this.element = e, this.pending = new Promise((i, r) => {
      const o = ({ data: c, ports: M }) => {
        (c == null ? void 0 : c.action) === "SDK_INIT_SUCCESS" && c.id === this.id && (this.vm = new ss(M[0], c.payload), i(this.vm), a());
      }, n = () => {
        var c;
        (c = this.element.contentWindow) == null || c.postMessage(
          {
            action: "SDK_INIT",
            id: this.id
          },
          "*"
        );
      };
      function a() {
        window.clearInterval(s), window.removeEventListener("message", o);
      }
      window.addEventListener("message", o), n();
      let l = 0;
      const s = window.setInterval(() => {
        if (this.vm) {
          a();
          return;
        }
        if (l >= Kl) {
          a(), r("Timeout: Unable to establish a connection with the StackBlitz VM"), re.forEach((c, M) => {
            c.id === this.id && re.splice(M, 1);
          });
          return;
        }
        l++, n();
      }, Xl);
    }), re.push(this);
  }
}
const Ms = (t) => {
  const e = t instanceof Element ? "element" : "id";
  return re.find((i) => i[e] === t) ?? null;
};
function us(t, e) {
  const i = document.createElement("input");
  return i.type = "hidden", i.name = t, i.value = e, i;
}
function gs(t) {
  return t.replace(/\[/g, "%5B").replace(/\]/g, "%5D");
}
function Wr({
  template: t,
  title: e,
  description: i,
  dependencies: r,
  files: o,
  settings: n
}) {
  if (!Wi.includes(t)) {
    const c = Wi.map((M) => `'${M}'`).join(", ");
    console.warn(`Unsupported project.template: must be one of ${c}`);
  }
  const a = [], l = (c, M, u = "") => {
    a.push(us(c, typeof M == "string" ? M : u));
  };
  l("project[title]", e), typeof i == "string" && i.length > 0 && l("project[description]", i), l("project[template]", t, "javascript"), r && (t === "node" ? console.warn(
    "Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template."
  ) : l("project[dependencies]", JSON.stringify(r))), n && l("project[settings]", JSON.stringify(n)), Object.entries(o).forEach(([c, M]) => {
    l(`project[files][${gs(c)}]`, M);
  });
  const s = document.createElement("form");
  return s.method = "POST", s.setAttribute("style", "display:none!important;"), s.append(...a), s;
}
function ds(t, e) {
  const i = Wr(t);
  return i.action = si("/run", e), i.id = "sb_run", `<!doctype html>
<html>
<head><title></title></head>
<body>
  ${i.outerHTML}
  <script>document.getElementById('${i.id}').submit();<\/script>
</body>
</html>`;
}
function Is(t, e) {
  const i = Wr(t);
  i.action = li("/run", e), i.target = ui(e), document.body.appendChild(i), i.submit(), document.body.removeChild(i);
}
function he(t) {
  return t != null && t.contentWindow ? (Ms(t) ?? new cs(t)).pending : Promise.reject("Provided element is not an iframe.");
}
function Ns(t, e) {
  Is(t, e);
}
function js(t, e) {
  const i = li(`/edit/${t}`, e), r = ui(e);
  window.open(i, r);
}
function Ds(t, e) {
  const i = li(`/github/${t}`, e), r = ui(e);
  window.open(i, r);
}
function ys(t, e, i) {
  var a;
  const r = Mi(t), o = ds(e, i), n = document.createElement("iframe");
  return ci(r, n, i), (a = n.contentDocument) == null || a.write(o), he(n);
}
function Ls(t, e, i) {
  const r = Mi(t), o = document.createElement("iframe");
  return o.src = si(`/edit/${e}`, i), ci(r, o, i), he(o);
}
function bs(t, e, i) {
  const r = Mi(t), o = document.createElement("iframe");
  return o.src = si(`/github/${e}`, i), ci(r, o, i), he(o);
}
const ws = {
  connect: he,
  embedGithubProject: bs,
  embedProject: ys,
  embedProjectId: Ls,
  openGithubProject: Ds,
  openProject: Ns,
  openProjectId: js
};
var Ts = /* @__PURE__ */ f('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 256 368"><path fill=#49A2F8 d="M109.586 217.013H0L200.34 0l-53.926 150.233H256L55.645 367.246l53.927-150.233z">'), xs = /* @__PURE__ */ f('<button><span class="text-nowrap overflow-hidden inline-block font-bold">Try me in Stackblitz');
const fs = (t) => `{
  "installDependencies": false,
  "startCommand": "pnpm create vike@latest ${t.join(" ")} --force . && pnpm i && pnpm run dev",
  "env": {
    "NODE_ENV": "development"
  }
}`;
function hs(t) {
  ws.openProject(t, {});
}
function zs(t) {
  return (() => {
    var e = Ts();
    return E(() => Z(e, "class", t.class)), e;
  })();
}
function As(t) {
  return (() => {
    var e = xs(), i = e.firstChild;
    return e.$$click = () => hs({
      title: "Vike project",
      description: "Project generated with Vike's scaffolder",
      template: "node",
      files: {
        ".stackblitzrc": fs(t.flags),
        "README.md": "Waiting for CLI to finish. This file will automatically refresh when the project is ready"
      }
    }), y(e, D(zs, {
      class: "h-6"
    }), i), E(() => K(e, J("tooltip-bottom tooltip-warning left-[1px] btn btn-sm hover:btn-ghost group h-auto stackblitz-cta", t.class))), e;
  })();
}
Et(["click"]);
function ps() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
    const e = Math.random() * 16 | 0;
    return (t === "x" ? e : e & 3 | 8).toString(16);
  });
}
function ms(t, e) {
  var r, o;
  const i = ps();
  switch (console.log({
    interactionid: i,
    event: t,
    data: e
  }), t) {
    case "copy": {
      e.flags.length === 0 && ((r = globalThis.zaraz) == null || r.track(t, {
        flag: void 0,
        package_manager: e.package_manager,
        interactionid: i
      }));
      for (const n of e.flags)
        (o = globalThis.zaraz) == null || o.track(t, {
          flag: n,
          package_manager: e.package_manager,
          interactionid: i
        });
    }
  }
}
var Ss = /* @__PURE__ */ f('<div role=tabpanel class="tab-content !h-auto w-full bg-base-100 border-base-300 p-1.5"><div class="sm:join flex flex-row w-full rounded-md">'), Cs = /* @__PURE__ */ f(`<div role=tablist class="tabs tabs-lift tabs-sm flex-1"><input type=radio name=package_manager role=tab class=tab aria-label=npm><input type=radio name=package_manager role=tab class=tab aria-label=pnpm><input type=radio name=package_manager role=tab class=tab aria-label=yarn><input type=radio name=package_manager role=tab class=tab aria-label=bun><script>
      const p = localStorage.getItem("packageManager");
      if (p) {
        const select = 'input[name="package_manager"][aria-label="' + p + '"]';
        const el = document.querySelector(select);
        if (el) {
          el.checked = true;
        }
      }`);
function te(t) {
  return (() => {
    var e = Ss(), i = e.firstChild;
    return y(i, D($l, {
      get onMouseEnter() {
        return t.onMouseEnter;
      },
      get onClick() {
        return t.onClick;
      },
      get tooltipText() {
        return t.tooltipText;
      },
      get children() {
        return t.children;
      }
    }), null), y(i, D(As, {
      get flags() {
        return t.flags;
      },
      class: "join-item hidden sm:flex font-normal"
    }), null), e;
  })();
}
function Es() {
  const {
    selectedFeaturesFlags: t
  } = U(R), [e, i] = k("Copy to Clipboard");
  function r() {
    return t().map((g) => `--${g}`);
  }
  const o = p(() => ["npm", "create", "vike@latest", "---", ...r()]), n = p(() => ["pnpm", "create", "vike@latest", ...r()]), a = p(() => ["yarn", "create", "vike@latest", ...r()]), l = p(() => ["bun", "create", "vike@latest", ...r()]), s = () => {
    i("Copy to Clipboard");
  }, c = (g) => {
    ms("copy", {
      flags: t(),
      package_manager: g
    }), i("Copied to Clipboard!");
  }, M = (g) => {
    localStorage.setItem("packageManager", g);
  }, u = localStorage.getItem("packageManager") || "npm";
  return (() => {
    var g = Cs(), d = g.firstChild, N = d.nextSibling, I = N.nextSibling, b = I.nextSibling, w = b.nextSibling;
    return d.addEventListener("change", () => M("npm")), d.checked = u === "npm", y(g, D(te, {
      onMouseEnter: s,
      onClick: () => c("npm"),
      get tooltipText() {
        return e();
      },
      get flags() {
        return r();
      },
      get children() {
        return o().join(" ");
      }
    }), N), N.addEventListener("change", () => M("pnpm")), N.checked = u === "pnpm", y(g, D(te, {
      onMouseEnter: s,
      onClick: () => c("pnpm"),
      get tooltipText() {
        return e();
      },
      get flags() {
        return r();
      },
      get children() {
        return n().join(" ");
      }
    }), I), I.addEventListener("change", () => M("yarn")), I.checked = u === "yarn", y(g, D(te, {
      onMouseEnter: s,
      onClick: () => c("yarn"),
      get tooltipText() {
        return e();
      },
      get flags() {
        return r();
      },
      get children() {
        return a().join(" ");
      }
    }), b), b.addEventListener("change", () => M("bun")), b.checked = u === "bun", y(g, D(te, {
      onMouseEnter: s,
      onClick: () => c("bun"),
      get tooltipText() {
        return e();
      },
      get flags() {
        return r();
      },
      get children() {
        return l().join(" ");
      }
    }), w), g;
  })();
}
var vs = /* @__PURE__ */ f("<div>"), Os = /* @__PURE__ */ f('<div class="flex flex-col bg-base-300 p-6 rounded-xl shadow-2xl font-sans bati-widget"><div class="mb-2 w-full"></div><div class=flex></div><div class="divider my-2"></div><div class="w-full flex flex-col relative"><div class="flex items-center py-2 px-3 overflow-auto md:overflow-visible bg-base-100 rounded-md"><span class="text-lg font-bold">Presets</span><div class="divider divider-horizontal mx-1">');
function ks(t) {
  const {
    rules: e
  } = U(R);
  return D(Fo, {
    get children() {
      var i = Os(), r = i.firstChild, o = r.nextSibling, n = o.nextSibling, a = n.nextSibling, l = a.firstChild, s = l.firstChild;
      return s.nextSibling, y(r, D(Tn, {})), y(o, D(Es, {})), y(i, D(P, {
        get when() {
          return e().size > 0;
        },
        get children() {
          var c = vs();
          return y(c, D(Nr, {
            get error() {
              return e().error;
            },
            get warning() {
              return e().warning;
            },
            get info() {
              return e().info;
            },
            get invisible() {
              return e().invisible;
            }
          })), E((M) => yt(c, {
            "flex flex-col gap-2 leading-6 rounded-md mt-4": e().invisible.length < e().size
          }, M)), c;
        }
      }), n), y(l, D(Jl, {}), null), y(a, D(Ul, {}), null), E((c) => {
        var M = t.theme, u = !t.widget;
        return M !== c.e && Z(i, "data-theme", c.e = M), u !== c.t && i.classList.toggle("w-11/12", c.t = u), c;
      }, {
        e: void 0,
        t: void 0
      }), i;
    }
  });
}
const Ys = `/*! tailwindcss v4.0.12 | MIT License | https://tailwindcss.com */@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-neutral-200:oklch(.922 0 0);--color-neutral-300:oklch(.87 0 0);--color-neutral-500:oklch(.556 0 0);--color-neutral-800:oklch(.269 0 0);--spacing:.25rem;--container-5xl:64rem;--text-xs:.75rem;--text-xs--line-height:calc(1/.75);--text-sm:.875rem;--text-sm--line-height:calc(1.25/.875);--text-lg:1.125rem;--text-lg--line-height:calc(1.75/1.125);--text-xl:1.25rem;--text-xl--line-height:calc(1.75/1.25);--text-8xl:6rem;--text-8xl--line-height:1;--font-weight-normal:400;--font-weight-semibold:600;--font-weight-bold:700;--tracking-wide:.025em;--leading-loose:2;--radius-md:.375rem;--radius-xl:.75rem;--ease-in-out:cubic-bezier(.4,0,.2,1);--blur-md:12px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-font-feature-settings:var(--font-sans--font-feature-settings);--default-font-variation-settings:var(--font-sans--font-variation-settings);--default-mono-font-family:var(--font-mono);--default-mono-font-feature-settings:var(--font-mono--font-feature-settings);--default-mono-font-variation-settings:var(--font-mono--font-variation-settings)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}body{line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1;color:color-mix(in oklab,currentColor 50%,transparent)}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}:where(:root),:root:has(input.theme-controller[value=light]:checked),[data-theme=light]{color-scheme:light;--color-base-100:oklch(100% 0 0);--color-base-200:oklch(98% 0 0);--color-base-300:oklch(95% 0 0);--color-base-content:oklch(21% .006 285.885);--color-primary:oklch(45% .24 277.023);--color-primary-content:oklch(93% .034 272.788);--color-secondary:oklch(65% .241 354.308);--color-secondary-content:oklch(94% .028 342.258);--color-accent:oklch(77% .152 181.912);--color-accent-content:oklch(38% .063 188.416);--color-neutral:oklch(14% .005 285.823);--color-neutral-content:oklch(92% .004 286.32);--color-info:oklch(74% .16 232.661);--color-info-content:oklch(29% .066 243.157);--color-success:oklch(76% .177 163.223);--color-success-content:oklch(37% .077 168.94);--color-warning:oklch(82% .189 84.429);--color-warning-content:oklch(41% .112 45.904);--color-error:oklch(71% .194 13.428);--color-error-content:oklch(27% .105 12.094);--radius-selector:.5rem;--radius-field:.25rem;--radius-box:.5rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}@media (prefers-color-scheme:dark){:root{color-scheme:dark;--color-base-100:oklch(25.33% .016 252.42);--color-base-200:oklch(23.26% .014 253.1);--color-base-300:oklch(21.15% .012 254.09);--color-base-content:oklch(97.807% .029 256.847);--color-primary:oklch(58% .233 277.117);--color-primary-content:oklch(96% .018 272.314);--color-secondary:oklch(65% .241 354.308);--color-secondary-content:oklch(94% .028 342.258);--color-accent:oklch(77% .152 181.912);--color-accent-content:oklch(38% .063 188.416);--color-neutral:oklch(14% .005 285.823);--color-neutral-content:oklch(92% .004 286.32);--color-info:oklch(74% .16 232.661);--color-info-content:oklch(29% .066 243.157);--color-success:oklch(76% .177 163.223);--color-success-content:oklch(37% .077 168.94);--color-warning:oklch(82% .189 84.429);--color-warning-content:oklch(41% .112 45.904);--color-error:oklch(71% .194 13.428);--color-error-content:oklch(27% .105 12.094);--radius-selector:.5rem;--radius-field:.25rem;--radius-box:.5rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}}:root:has(input.theme-controller[value=light]:checked),[data-theme=light]{color-scheme:light;--color-base-100:oklch(100% 0 0);--color-base-200:oklch(98% 0 0);--color-base-300:oklch(95% 0 0);--color-base-content:oklch(21% .006 285.885);--color-primary:oklch(45% .24 277.023);--color-primary-content:oklch(93% .034 272.788);--color-secondary:oklch(65% .241 354.308);--color-secondary-content:oklch(94% .028 342.258);--color-accent:oklch(77% .152 181.912);--color-accent-content:oklch(38% .063 188.416);--color-neutral:oklch(14% .005 285.823);--color-neutral-content:oklch(92% .004 286.32);--color-info:oklch(74% .16 232.661);--color-info-content:oklch(29% .066 243.157);--color-success:oklch(76% .177 163.223);--color-success-content:oklch(37% .077 168.94);--color-warning:oklch(82% .189 84.429);--color-warning-content:oklch(41% .112 45.904);--color-error:oklch(71% .194 13.428);--color-error-content:oklch(27% .105 12.094);--radius-selector:.5rem;--radius-field:.25rem;--radius-box:.5rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}:root:has(input.theme-controller[value=dark]:checked),[data-theme=dark]{color-scheme:dark;--color-base-100:oklch(25.33% .016 252.42);--color-base-200:oklch(23.26% .014 253.1);--color-base-300:oklch(21.15% .012 254.09);--color-base-content:oklch(97.807% .029 256.847);--color-primary:oklch(58% .233 277.117);--color-primary-content:oklch(96% .018 272.314);--color-secondary:oklch(65% .241 354.308);--color-secondary-content:oklch(94% .028 342.258);--color-accent:oklch(77% .152 181.912);--color-accent-content:oklch(38% .063 188.416);--color-neutral:oklch(14% .005 285.823);--color-neutral-content:oklch(92% .004 286.32);--color-info:oklch(74% .16 232.661);--color-info-content:oklch(29% .066 243.157);--color-success:oklch(76% .177 163.223);--color-success-content:oklch(37% .077 168.94);--color-warning:oklch(82% .189 84.429);--color-warning-content:oklch(41% .112 45.904);--color-error:oklch(71% .194 13.428);--color-error-content:oklch(27% .105 12.094);--radius-selector:.5rem;--radius-field:.25rem;--radius-box:.5rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}:root{--fx-noise:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.34' numOctaves='4' stitchTiles='stitch'%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)' opacity='0.2'%3E%3C/rect%3E%3C/svg%3E")}.chat{--mask-chat:url("data:image/svg+xml,%3csvg width='13' height='13' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='M0 11.5004C0 13.0004 2 13.0004 2 13.0004H12H13V0.00036329L12.5 0C12.5 0 11.977 2.09572 11.8581 2.50033C11.6075 3.35237 10.9149 4.22374 9 5.50036C6 7.50036 0 10.0004 0 11.5004Z'/%3e%3c/svg%3e")}:root,[data-theme]{background-color:var(--root-bg,var(--color-base-100));color:var(--color-base-content)}:where(:root:has(.modal-open,.modal[open],.modal:target,.modal-toggle:checked,.drawer:not(.drawer-open)>.drawer-toggle:checked)){scrollbar-gutter:stable;background-image:linear-gradient(var(--color-base-100),var(--color-base-100));--root-bg:color-mix(in srgb,var(--color-base-100),oklch(0% 0 0) 40%)}@property --radialprogress{syntax: "<percentage>"; inherits: true; initial-value: 0%;}:root:has(.modal-open,.modal[open],.modal:target,.modal-toggle:checked,.drawer:not([class*=drawer-open])>.drawer-toggle:checked){overflow:hidden}:root{scrollbar-color:color-mix(in oklch,currentColor 35%,#0000)#0000}}@layer components{:root{--lm:"";--lm2:""}.list-custom>li{list-style:inside}.list-custom>li>*{vertical-align:top}.list-custom>li::marker{content:var(--lm)var(--lm2)" "}li.list-colon::marker{--lm2:":"}.list-custom.list-colon>li::marker{--lm2:":"}li.list-star::marker{--lm:"★"}.list-custom.list-star>li::marker{--lm:"★"}li.list-dot::marker{--lm:"•"}.list-custom.list-dot>li::marker{--lm:"•"}li.list-info::marker{--lm:"🛈"}.list-custom.list-info>li::marker{--lm:"🛈"}li.list-warning::marker{--lm:"⚠"}.list-custom.list-warning>li::marker{--lm:"⚠"}li.list-error::marker{--lm:"⮿"}.list-custom.list-error>li::marker{--lm:"⮿"}li.list-check::marker{--lm:"🗸"}.list-custom.list-check>li::marker{--lm:"🗸"}.listbox{cursor:pointer;height:calc(var(--spacing)*12);min-height:calc(var(--spacing)*12);padding-right:calc(var(--spacing)*10);padding-left:calc(var(--spacing)*4);font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));--tw-leading:var(--leading-loose);line-height:var(--leading-loose);align-items:center;display:inline-flex;position:relative}.listbox[multiple]{height:auto}.listbox [role=combobox]{appearance:none;--tw-outline-style:none;-webkit-user-select:none;user-select:none;outline-style:none;flex-grow:1}@media (forced-colors:active){.listbox [role=combobox]{outline-offset:2px;outline:2px solid #0000}}.listbox [role=listbox]{top:100%;left:calc(var(--spacing)*0);z-index:50;width:100%;position:absolute;overflow:visible}.listbox [role=combobox]:not([aria-expanded=true])~[role=listbox]{display:none}.listbox [role=listbox] [role=option]{box-sizing:border-box;height:calc(var(--spacing)*12);min-height:calc(var(--spacing)*12);width:100%;padding-right:calc(var(--spacing)*10);padding-left:calc(var(--spacing)*4);font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height));--tw-leading:var(--leading-loose);line-height:var(--leading-loose);border-radius:0;align-items:center;display:inline-flex}.listbox{border-style:var(--tw-border-style);--tw-border-style:solid;border-style:solid;border-width:2px;border-color:color-mix(in oklab,var(--color-base-content)0%,transparent);background-color:var(--color-base-100);padding-right:calc(var(--spacing)*10);--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold);background-image:linear-gradient(45deg,#0000 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,#0000 50%);background-position:calc(100% - 20px) calc(1px + 50%),calc(100% - 16px) calc(1px + 50%);background-repeat:no-repeat;background-size:4px 4px,4px 4px}.listbox .listbox-bordered{border-color:color-mix(in oklab,var(--color-base-content)20%,transparent)}.listbox:focus{outline-width:1px;outline-style:var(--tw-outline-style);outline-offset:2px;outline-width:2px;outline-color:color-mix(in oklab,var(--color-base-content)20%,transparent)}.listbox [role=listbox]{background-color:var(--color-base-100);--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a),0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);--tw-shadow-color:var(--color-base-300);border-radius:.25rem}.listbox [role=listbox] [role=option][aria-selected=true]{border-style:var(--tw-border-style);--tw-border-style:solid;border-style:solid;border-width:2px;border-color:color-mix(in oklab,var(--color-base-content)20%,transparent);border-radius:.25rem}.listbox [role=listbox] [role=option][aria-disabled=true]{cursor:not-allowed;border-color:var(--color-base-200);background-color:var(--color-base-200);opacity:.2}.listbox [role=listbox] [role=option]:first-of-type{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.listbox [role=listbox] [role=option]:last-of-type{border-bottom-right-radius:.25rem;border-bottom-left-radius:.25rem}.listbox .listbox-ghost{background-color:color-mix(in oklab,var(--color-base-100)5%,transparent)}.listbox .listbox-ghost:focus{background-color:color-mix(in oklab,var(--color-base-100)100%,transparent);color:var(--color-base-content)}.listbox .listbox-primary{border-color:color-mix(in oklab,var(--color-primary)60%,transparent)}.listbox .listbox-primary:focus{outline-color:var(--color-primary)}.listbox .listbox-primary [role=listbox] [role=option][aria-selected=true]{border-color:color-mix(in oklab,var(--color-primary)60%,transparent);background-color:color-mix(in oklab,var(--color-primary)10%,transparent)}.listbox .listbox-primary [role=listbox] [role=option]:hover{background-color:color-mix(in oklab,var(--color-primary)10%,transparent)}.listbox .listbox-secondary{border-color:color-mix(in oklab,var(--color-secondary)60%,transparent)}.listbox .listbox-secondary:focus{outline-color:var(--color-secondary)}.listbox .listbox-secondary [role=listbox] [role=option][aria-selected=true]{border-color:color-mix(in oklab,var(--color-secondary)60%,transparent);background-color:color-mix(in oklab,var(--color-secondary)10%,transparent)}.listbox .listbox-secondary [role=listbox] [role=option]:hover{background-color:color-mix(in oklab,var(--color-secondary)10%,transparent)}.listbox .listbox-accent{border-color:color-mix(in oklab,var(--color-accent)60%,transparent)}.listbox .listbox-accent:focus{outline-color:var(--color-accent)}.listbox .listbox-accent [role=listbox] [role=option][aria-selected=true]{border-color:color-mix(in oklab,var(--color-accent)60%,transparent);background-color:color-mix(in oklab,var(--color-accent)10%,transparent)}.listbox .listbox-accent [role=listbox] [role=option]:hover{background-color:color-mix(in oklab,var(--color-accent)10%,transparent)}.listbox .listbox-info{border-color:color-mix(in oklab,var(--color-info)60%,transparent)}.listbox .listbox-info:focus{outline-color:var(--color-info)}.listbox .listbox-info [role=listbox] [role=option][aria-selected=true]{border-color:color-mix(in oklab,var(--color-info)60%,transparent);background-color:color-mix(in oklab,var(--color-info)10%,transparent)}.listbox .listbox-info [role=listbox] [role=option]:hover{background-color:color-mix(in oklab,var(--color-info)10%,transparent)}.listbox .listbox-success{border-color:color-mix(in oklab,var(--color-success)60%,transparent)}.listbox .listbox-success:focus{outline-color:var(--color-success)}.listbox .listbox-success [role=listbox] [role=option][aria-selected=true]{border-color:color-mix(in oklab,var(--color-success)60%,transparent);background-color:color-mix(in oklab,var(--color-success)10%,transparent)}.listbox .listbox-success [role=listbox] [role=option]:hover{background-color:color-mix(in oklab,var(--color-success)10%,transparent)}.listbox .listbox-warning{border-color:color-mix(in oklab,var(--color-warning)60%,transparent)}.listbox .listbox-warning:focus{outline-color:var(--color-warning)}.listbox .listbox-warning [role=listbox] [role=option][aria-selected=true]{border-color:color-mix(in oklab,var(--color-warning)60%,transparent);background-color:color-mix(in oklab,var(--color-warning)10%,transparent)}.listbox .listbox-warning [role=listbox] [role=option]:hover{background-color:color-mix(in oklab,var(--color-warning)10%,transparent)}.listbox .listbox-error{border-color:color-mix(in oklab,var(--color-error)60%,transparent)}.listbox .listbox-error:focus{outline-color:var(--color-error)}.listbox .listbox-error [role=listbox] [role=option][aria-selected=true]{border-color:color-mix(in oklab,var(--color-error)60%,transparent);background-color:color-mix(in oklab,var(--color-error)10%,transparent)}.listbox .listbox-error [role=listbox] [role=option]:hover{background-color:color-mix(in oklab,var(--color-error)10%,transparent)}.listbox .listbox-disabled,.listbox:disabled,.listbox[disabled],.listbox[aria-disabled=true]{cursor:not-allowed;border-color:var(--color-base-200);background-color:var(--color-base-200);color:color-mix(in oklab,var(--color-base-content)20%,transparent);--tw-outline-style:none!important;outline-style:none!important}:is(.listbox .listbox-disabled,.listbox:disabled,.listbox[disabled],.listbox[aria-disabled=true])::placeholder{color:color-mix(in oklab,var(--color-base-content)20%,transparent)}@media (forced-colors:active){:is(.listbox .listbox-disabled,.listbox:disabled,.listbox[disabled],.listbox[aria-disabled=true]){outline-offset:2px!important;outline:2px solid #0000!important}}.listbox -multiple,.listbox[multiple],.listbox[size].listbox:not([size="1"]){padding-right:calc(var(--spacing)*4);background-image:none}}@layer utilities{.modal{pointer-events:none;visibility:hidden;width:100%;max-width:none;height:100%;max-height:none;color:inherit;transition:transform .3s ease-out,visibility .3s allow-discrete,opacity .1s ease-out;overscroll-behavior:contain;z-index:999;background-color:#0000;place-items:center;margin:0;padding:0;display:grid;position:fixed;inset:0;overflow:hidden}.modal:not(dialog:not(.modal-open)),.modal::backdrop{opacity:1;transition:display .3s ease-out allow-discrete,opacity .3s ease-out,visibility .3s ease-out allow-discrete;background-color:#0006}@starting-style{.modal:not(dialog:not(.modal-open)){visibility:hidden}}@starting-style{.modal:not(dialog:not(.modal-open)){opacity:0}}.modal.modal-open,.modal[open],.modal:target{pointer-events:auto;visibility:visible;opacity:1}@starting-style{:is(.modal.modal-open,.modal[open],.modal:target){visibility:hidden}}@starting-style{:is(.modal.modal-open,.modal[open],.modal:target){opacity:0}}:is(.modal.modal-open,.modal[open],.modal:target) .modal-box{opacity:1;translate:0;scale:1}.tooltip{--tt-bg:var(--color-neutral);--tt-off: calc(100% + .5rem) ;--tt-tail: calc(100% + 1px + .25rem) ;display:inline-block;position:relative}.tooltip>:where(.tooltip-content),.tooltip[data-tip]:before{border-radius:var(--radius-field);text-align:center;white-space:normal;max-width:20rem;color:var(--color-neutral-content);opacity:0;background-color:var(--tt-bg);pointer-events:none;z-index:1;--tw-content:attr(data-tip);content:var(--tw-content);width:max-content;padding-block:.25rem;padding-inline:.5rem;font-size:.875rem;line-height:1.25em;transition:opacity .2s cubic-bezier(.4,0,.2,1) 75ms,transform .2s cubic-bezier(.4,0,.2,1) 75ms;position:absolute}.tooltip:after{opacity:0;background-color:var(--tt-bg);content:"";pointer-events:none;--mask-tooltip:url("data:image/svg+xml,%3Csvg width='10' height='4' viewBox='0 0 8 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.500009 1C3.5 1 3.00001 4 5.00001 4C7 4 6.5 1 9.5 1C10 1 10 0.499897 10 0H0C-1.99338e-08 0.5 0 1 0.500009 1Z' fill='black'/%3E%3C/svg%3E%0A");width:.625rem;height:.25rem;-webkit-mask-position:-1px 0;mask-position:-1px 0;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-image:var(--mask-tooltip);mask-image:var(--mask-tooltip);transition:opacity .2s cubic-bezier(.4,0,.2,1) 75ms,transform .2s cubic-bezier(.4,0,.2,1) 75ms;display:block;position:absolute}:is(.tooltip.tooltip-open,.tooltip[data-tip]:hover,.tooltip:hover,.tooltip:has(:focus-visible))>.tooltip-content,:is(.tooltip.tooltip-open,.tooltip[data-tip]:hover,.tooltip:hover,.tooltip:has(:focus-visible))[data-tip]:before,:is(.tooltip.tooltip-open,.tooltip[data-tip]:hover,.tooltip:hover,.tooltip:has(:focus-visible)):after{opacity:1;--tt-pos:0rem;transition:opacity .2s cubic-bezier(.4,0,.2,1),transform .2s cubic-bezier(.4,0,.2,1)}.tooltip>.tooltip-content,.tooltip[data-tip]:before{transform:translate(-50%)translateY(var(--tt-pos,.25rem));inset:auto auto var(--tt-off)50%}.tooltip:after{transform:translate(-50%)translateY(var(--tt-pos,.25rem));inset:auto auto var(--tt-tail)50%}.tab{cursor:pointer;appearance:none;text-align:center;webkit-user-select:none;-webkit-user-select:none;user-select:none;--tab-p:1rem;--tab-bg:var(--color-base-100);--tab-border-color:var(--color-base-300);--tab-radius-ss:0;--tab-radius-se:0;--tab-radius-es:0;--tab-radius-ee:0;--tab-order:0;--tab-radius-min:calc(.75rem - var(--border));flex-wrap:wrap;order:var(--tab-order);height:calc(var(--size-field,.25rem)*10);border-color:#0000;justify-content:center;align-items:center;padding-inline-start:var(--tab-p);padding-inline-end:var(--tab-p);font-size:.875rem;display:inline-flex;position:relative}@media (hover:hover){.tab:hover{color:var(--color-base-content)}}.tab:is(input[type=radio]){min-width:fit-content}.tab:is(input[type=radio]):after{content:attr(aria-label)}.tab:is(label){position:relative}.tab:is(label) input{cursor:pointer;appearance:none;opacity:0;position:absolute;inset:0}:is(.tab:checked,.tab:is(label:has(:checked)),.tab:is(.tab-active,[aria-selected=true]))+.tab-content{height:100%;display:block}.tab:not(:checked,label:has(:checked),:hover,.tab-active,[aria-selected=true]){color:color-mix(in oklab,var(--color-base-content)50%,transparent)}.tab:not(input):empty{cursor:default;flex-grow:1}.tab:focus{outline-style:none}@media (forced-colors:active){.tab:focus{outline-offset:2px;outline:2px solid #0000}}.tab:focus-visible,.tab:is(label:has(:checked:focus-visible)){outline-offset:-5px;outline:2px solid}.tab[disabled]{pointer-events:none;opacity:.4}.dropdown{position-area:var(--anchor-v,bottom)var(--anchor-h,span-right);display:inline-block;position:relative}.dropdown>:not(summary):focus{outline-style:none}@media (forced-colors:active){.dropdown>:not(summary):focus{outline-offset:2px;outline:2px solid #0000}}.dropdown .dropdown-content{position:absolute}.dropdown:not(details,.dropdown-open,.dropdown-hover:hover,:focus-within) .dropdown-content{transform-origin:top;opacity:0;display:none;scale:95%}.dropdown[popover],.dropdown .dropdown-content{z-index:999;transition-behavior:allow-discrete;transition-property:opacity,scale,display;transition-duration:.2s;transition-timing-function:cubic-bezier(.4,0,.2,1);animation:.2s dropdown}@starting-style{:is(.dropdown[popover],.dropdown .dropdown-content){scale:95%}}@starting-style{:is(.dropdown[popover],.dropdown .dropdown-content){opacity:0}}:is(.dropdown.dropdown-open,.dropdown:not(.dropdown-hover):focus,.dropdown:focus-within)>[tabindex]:first-child{pointer-events:none}:is(.dropdown.dropdown-open,.dropdown:not(.dropdown-hover):focus,.dropdown:focus-within) .dropdown-content{opacity:1}.dropdown.dropdown-hover:hover .dropdown-content{opacity:1;scale:100%}.dropdown:is(details) summary::-webkit-details-marker{display:none}:is(.dropdown.dropdown-open,.dropdown:focus,.dropdown:focus-within) .dropdown-content{scale:100%}.dropdown:where([popover]){background:0 0}.dropdown[popover]{color:inherit;position:fixed}@supports not (position-area:bottom){.dropdown[popover]{margin:auto}.dropdown[popover].dropdown-open:not(:popover-open){transform-origin:top;opacity:0;display:none;scale:95%}.dropdown[popover]::backdrop{background-color:oklab(0% none none/.3)}}.dropdown[popover]:not(.dropdown-open,:popover-open){transform-origin:top;opacity:0;display:none;scale:95%}.btn{cursor:pointer;text-align:center;vertical-align:middle;outline-offset:2px;webkit-user-select:none;-webkit-user-select:none;user-select:none;padding-inline:var(--btn-p);color:var(--btn-fg);height:var(--size);outline-color:var(--btn-color,var(--color-base-content));background-color:var(--btn-bg);background-size:auto,calc(var(--noise)*100%);background-image:none,var(--btn-noise);border-width:var(--border);border-style:solid;border-color:var(--btn-border);text-shadow:0 .5px oklch(100% 0 0/calc(var(--depth)*.15));box-shadow:0 .5px 0 .5px oklch(100% 0 0/calc(var(--depth)*6%)) inset,var(--btn-shadow);--size:calc(var(--size-field,.25rem)*10);--btn-bg:var(--btn-color,var(--color-base-200));--btn-fg:var(--color-base-content);--btn-p:1rem;--btn-border:color-mix(in oklab,var(--btn-bg),#000 calc(var(--depth)*5%));--btn-shadow:0 3px 2px -2px color-mix(in oklab,var(--btn-bg)calc(var(--depth)*30%),#0000),0 4px 3px -2px color-mix(in oklab,var(--btn-bg)calc(var(--depth)*30%),#0000);--btn-noise:var(--fx-noise);border-start-start-radius:var(--join-ss,var(--radius-field));border-start-end-radius:var(--join-se,var(--radius-field));border-end-end-radius:var(--join-ee,var(--radius-field));border-end-start-radius:var(--join-es,var(--radius-field));flex-wrap:nowrap;flex-shrink:0;justify-content:center;align-items:center;gap:.375rem;font-size:.875rem;font-weight:600;text-decoration-line:none;transition-property:color,background-color,border-color,box-shadow;transition-duration:.2s;transition-timing-function:cubic-bezier(0,0,.2,1);display:inline-flex}@media (hover:hover){.btn:hover{--btn-bg:color-mix(in oklab,var(--btn-color,var(--color-base-200)),#000 7%)}}.btn.btn-active{--btn-bg:color-mix(in oklab,var(--btn-color,var(--color-base-200)),#000 7%);--btn-shadow:0 0 0 0 oklch(0% 0 0/0),0 0 0 0 oklch(0% 0 0/0);isolation:isolate}.btn:focus-visible{outline-width:2px;outline-style:solid}.btn:active:not(.btn-active){--btn-bg:color-mix(in oklab,var(--btn-color,var(--color-base-200)),#000 5%);--btn-border:color-mix(in oklab,var(--btn-color,var(--color-base-200)),#000 7%);--btn-shadow:0 0 0 0 oklch(0% 0 0/0),0 0 0 0 oklch(0% 0 0/0);translate:0 .5px}.btn:is(:disabled,[disabled],.btn-disabled){pointer-events:none;--btn-border:#0000;--btn-noise:none;--btn-fg:color-mix(in oklch,var(--color-base-content)20%,#0000)}.btn:is(:disabled,[disabled],.btn-disabled):not(.btn-link,.btn-ghost){background-color:color-mix(in oklab,var(--color-base-content)10%,transparent);box-shadow:none}@media (hover:hover){.btn:is(:disabled,[disabled],.btn-disabled):hover{pointer-events:none;background-color:color-mix(in oklab,var(--color-neutral)20%,transparent);--btn-border:#0000;--btn-fg:color-mix(in oklch,var(--color-base-content)20%,#0000)}}.btn:is(input[type=checkbox],input[type=radio]){appearance:none}.btn:is(input[type=checkbox],input[type=radio]):after{content:attr(aria-label)}.btn:is(input[type=checkbox],input[type=radio]):checked{--btn-bg:color-mix(in oklab,var(--btn-color,var(--color-base-200)),#000 7%);--btn-shadow:0 0 0 0 oklch(0% 0 0/0),0 0 0 0 oklch(0% 0 0/0);isolation:isolate;outline-width:2px;outline-style:solid}.invisible{visibility:hidden}.tabs-lift{--tabs-height:auto;--tabs-direction:row}.tabs-lift>.tab{--tab-border:0 0 var(--border)0;--tab-radius-ss:min(var(--radius-field),var(--tab-radius-min));--tab-radius-se:min(var(--radius-field),var(--tab-radius-min));--tab-radius-es:0;--tab-radius-ee:0;--tab-paddings:var(--border)var(--tab-p)0 var(--tab-p);--tab-border-colors:#0000 #0000 var(--tab-border-color)#0000;--tab-corner-width: calc(100% + min(var(--radius-field),var(--tab-radius-min))*2) ;--tab-corner-height:min(var(--radius-field),var(--tab-radius-min));--tab-corner-position:top left,top right;border-width:var(--tab-border);padding:var(--tab-paddings);border-color:var(--tab-border-colors);border-start-start-radius:var(--tab-radius-ss);border-start-end-radius:var(--tab-radius-se);border-end-end-radius:var(--tab-radius-ee);border-end-start-radius:var(--tab-radius-es)}.tabs-lift>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled,[disabled]),.tabs-lift>.tab:is(input:checked,label:has(:checked)){--tab-border:var(--border)var(--border)0 var(--border);--tab-border-colors:var(--tab-border-color)var(--tab-border-color)#0000 var(--tab-border-color);--tab-paddings:0 calc(var(--tab-p) - var(--border))var(--border)calc(var(--tab-p) - var(--border));--tab-inset:auto auto 0 auto;--tab-grad:calc(69% - var(--border));--radius-start:radial-gradient(circle at top left,#0000 var(--tab-grad),var(--tab-border-color)calc(var(--tab-grad) + .25px),var(--tab-border-color)calc(var(--tab-grad) + var(--border)),var(--tab-bg)calc(var(--tab-grad) + var(--border) + .25px));--radius-end:radial-gradient(circle at top right,#0000 var(--tab-grad),var(--tab-border-color)calc(var(--tab-grad) + .25px),var(--tab-border-color)calc(var(--tab-grad) + var(--border)),var(--tab-bg)calc(var(--tab-grad) + var(--border) + .25px));background-color:var(--tab-bg)}:is(.tabs-lift>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled,[disabled]),.tabs-lift>.tab:is(input:checked,label:has(:checked))):before{z-index:1;content:"";width:var(--tab-corner-width);height:var(--tab-corner-height);background-position:var(--tab-corner-position);background-image:var(--radius-start),var(--radius-end);background-size:min(var(--radius-field),var(--tab-radius-min))min(var(--radius-field),var(--tab-radius-min));inset:var(--tab-inset);background-repeat:no-repeat;display:block;position:absolute}:is(.tabs-lift>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled,[disabled]),.tabs-lift>.tab:is(input:checked,label:has(:checked))):first-child:before{--radius-start:none}[dir=rtl] :is(.tabs-lift>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled,[disabled]),.tabs-lift>.tab:is(input:checked,label:has(:checked))):first-child:before{transform:rotateY(180deg)}:is(.tabs-lift>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled,[disabled]),.tabs-lift>.tab:is(input:checked,label:has(:checked))):last-child:before{--radius-end:none}[dir=rtl] :is(.tabs-lift>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled,[disabled]),.tabs-lift>.tab:is(input:checked,label:has(:checked))):last-child:before{transform:rotateY(180deg)}.tabs-lift:has(.tab-content)>.tab:first-child:not(.tab-active,[aria-selected=true]){--tab-border-colors:var(--tab-border-color)var(--tab-border-color)#0000 var(--tab-border-color)}.tabs-lift .tab-content{--tabcontent-margin:calc(-1*var(--border))0 0 0;--tabcontent-radius-ss:0;--tabcontent-radius-se:var(--radius-box);--tabcontent-radius-es:var(--radius-box);--tabcontent-radius-ee:var(--radius-box)}:is(.tabs-lift :checked,.tabs-lift label:has(:checked),.tabs-lift :is(.tab-active,[aria-selected=true]))+.tab-content:first-child,:is(.tabs-lift :checked,.tabs-lift label:has(:checked),.tabs-lift :is(.tab-active,[aria-selected=true]))+.tab-content:nth-child(n+3){--tabcontent-radius-ss:var(--radius-box)}.select{border:var(--border)solid #0000;appearance:none;background-color:var(--color-base-100);vertical-align:middle;width:clamp(3rem,20rem,100%);height:var(--size);text-overflow:ellipsis;box-shadow:0 1px color-mix(in oklab,var(--input-color)calc(var(--depth)*10%),#0000) inset,0 -1px oklch(100% 0 0/calc(var(--depth)*.1)) inset;border-color:var(--input-color);--input-color:color-mix(in oklab,var(--color-base-content)20%,#0000);--size:calc(var(--size-field,.25rem)*10);background-image:linear-gradient(45deg,#0000 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,#0000 50%);background-position:calc(100% - 20px) calc(1px + 50%),calc(100% - 16.1px) calc(1px + 50%);background-repeat:no-repeat;background-size:4px 4px,4px 4px;border-start-start-radius:var(--join-ss,var(--radius-field));border-start-end-radius:var(--join-se,var(--radius-field));border-end-end-radius:var(--join-ee,var(--radius-field));border-end-start-radius:var(--join-es,var(--radius-field));flex-shrink:1;align-items:center;gap:.375rem;padding-inline:1rem 1.75rem;font-size:.875rem;display:inline-flex;position:relative}[dir=rtl] .select{background-position:12px calc(1px + 50%),16px calc(1px + 50%)}.select select{appearance:none;background:inherit;border-radius:inherit;border-style:none;width:calc(100% + 2.75rem);height:calc(100% - 2px);margin-inline:-1rem -1.75rem;padding-inline:1rem 1.75rem}.select select:focus,.select select:focus-within{outline-style:none}@media (forced-colors:active){:is(.select select:focus,.select select:focus-within){outline-offset:2px;outline:2px solid #0000}}.select:focus,.select:focus-within{--input-color:var(--color-base-content);box-shadow:0 1px color-mix(in oklab,var(--input-color)calc(var(--depth)*10%),#0000);outline:2px solid var(--input-color);outline-offset:2px}.select:has(>select[disabled]),.select:is(:disabled,[disabled]){cursor:not-allowed;border-color:var(--color-base-200);background-color:var(--color-base-200);color:color-mix(in oklab,var(--color-base-content)40%,transparent)}:is(.select:has(>select[disabled]),.select:is(:disabled,[disabled]))::placeholder{color:color-mix(in oklab,var(--color-base-content)20%,transparent)}.select:has(>select[disabled])>select[disabled]{cursor:not-allowed}.checkbox{border:var(--border)solid var(--input-color,color-mix(in oklab,var(--color-base-content)20%,#0000));cursor:pointer;appearance:none;border-radius:var(--radius-selector);vertical-align:middle;color:var(--color-base-content);box-shadow:0 1px oklch(0% 0 0/calc(var(--depth)*.1)) inset,0 0 #0000 inset,0 0 #0000;--size:calc(var(--size-selector,.25rem)*6);width:var(--size);height:var(--size);background-size:auto,calc(var(--noise)*100%);background-image:none,var(--fx-noise);flex-shrink:0;padding:.25rem;transition:background-color .2s,box-shadow .2s;position:relative}.checkbox:before{--tw-content:"";content:var(--tw-content);opacity:0;clip-path:polygon(20% 100%,20% 80%,50% 80%,50% 80%,70% 80%,70% 100%);width:100%;height:100%;box-shadow:0 3px oklch(100% 0 0/calc(var(--depth)*.1)) inset;background-color:currentColor;font-size:1rem;line-height:.75;transition:clip-path .3s .1s,opacity .1s .1s,rotate .3s .1s,translate .3s .1s;display:block;rotate:45deg}.checkbox:focus-visible{outline:2px solid var(--input-color,currentColor);outline-offset:2px}.checkbox:checked,.checkbox[aria-checked=true]{background-color:var(--input-color,#0000);box-shadow:0 0 #0000 inset,0 8px 0 -4px oklch(100% 0 0/calc(var(--depth)*.1)) inset,0 1px oklch(0% 0 0/calc(var(--depth)*.1))}:is(.checkbox:checked,.checkbox[aria-checked=true]):before{clip-path:polygon(20% 100%,20% 80%,50% 80%,50% 0%,70% 0%,70% 100%);opacity:1}@media print{:is(.checkbox:checked,.checkbox[aria-checked=true]):before{--tw-content:"✔︎";clip-path:none;background-color:#0000;rotate:none}}@media (forced-colors:active){:is(.checkbox:checked,.checkbox[aria-checked=true]):before{--tw-content:"✔︎";clip-path:none;background-color:#0000;rotate:none}}.checkbox:indeterminate:before{opacity:1;clip-path:polygon(20% 100%,20% 80%,50% 80%,50% 80%,80% 80%,80% 100%);translate:0 -35%;rotate:none}.checkbox:disabled{cursor:not-allowed;opacity:.2}.radio{cursor:pointer;appearance:none;vertical-align:middle;border:var(--border)solid var(--input-color,color-mix(in srgb,currentColor 20%,#0000));box-shadow:0 1px oklch(0% 0 0/calc(var(--depth)*.1)) inset;--size:calc(var(--size-selector,.25rem)*6);width:var(--size);height:var(--size);color:var(--input-color,currentColor);border-radius:3.40282e38px;flex-shrink:0;padding:.25rem;position:relative}.radio:before{--tw-content:"";content:var(--tw-content);background-size:auto,calc(var(--noise)*100%);background-image:none,var(--fx-noise);border-radius:3.40282e38px;width:100%;height:100%;display:block}.radio:focus-visible{outline:2px solid}.radio:checked,.radio[aria-checked=true]{background-color:var(--color-base-100);border-color:currentColor;animation:.2s ease-out radio}:is(.radio:checked,.radio[aria-checked=true]):before{box-shadow:0 -1px oklch(0% 0 0/calc(var(--depth)*.1)) inset,0 8px 0 -4px oklch(100% 0 0/calc(var(--depth)*.1)) inset,0 1px oklch(0% 0 0/calc(var(--depth)*.1));background-color:currentColor}@media print{:is(.radio:checked,.radio[aria-checked=true]):before{outline-offset:-1rem;outline:.25rem solid}}@media (forced-colors:active){:is(.radio:checked,.radio[aria-checked=true]):before{outline-style:var(--tw-outline-style);outline-offset:-1px;outline-width:1px}}.radio:disabled{cursor:not-allowed;opacity:.2}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.tooltip-bottom>.tooltip-content,.tooltip-bottom[data-tip]:before{transform:translate(-50%)translateY(var(--tt-pos,-.25rem));inset:var(--tt-off)auto auto 50%}.tooltip-bottom:after{transform:translate(-50%)translateY(var(--tt-pos,-.25rem))rotate(180deg);inset:var(--tt-tail)auto auto 50%}.top-0{top:calc(var(--spacing)*0)}.top-2{top:calc(var(--spacing)*2)}.right-0{right:calc(var(--spacing)*0)}.right-4{right:calc(var(--spacing)*4)}.bottom-4{bottom:calc(var(--spacing)*4)}.left-2{left:calc(var(--spacing)*2)}.left-\\[1px\\]{left:1px}.modal-backdrop{color:#0000;z-index:-1;grid-row-start:1;grid-column-start:1;place-self:stretch stretch;display:grid}.modal-backdrop button{cursor:pointer}.z-10{z-index:10}.tab-content{order:var(--tabcontent-order);--tabcontent-radius-ss:0;--tabcontent-radius-se:0;--tabcontent-radius-es:0;--tabcontent-radius-ee:0;--tabcontent-order:1;width:100%;margin:var(--tabcontent-margin);border-color:#0000;border-width:var(--border);border-start-start-radius:var(--tabcontent-radius-ss);border-start-end-radius:var(--tabcontent-radius-se);border-end-end-radius:var(--tabcontent-radius-ee);border-end-start-radius:var(--tabcontent-radius-es);display:none}.modal-box{background-color:var(--color-base-100);border-top-left-radius:var(--modal-tl,var(--radius-box));border-top-right-radius:var(--modal-tr,var(--radius-box));border-bottom-left-radius:var(--modal-bl,var(--radius-box));border-bottom-right-radius:var(--modal-br,var(--radius-box));opacity:0;overscroll-behavior:contain;grid-row-start:1;grid-column-start:1;width:91.6667%;max-width:32rem;max-height:100vh;padding:1.5rem;transition:translate .3s ease-out,scale .3s ease-out,opacity .2s ease-out 50ms,box-shadow .3s ease-out;overflow-y:auto;scale:95%;box-shadow:0 25px 50px -12px #00000040}.col-start-1{grid-column-start:1}.container{width:100%}@media (width>=40rem){.container{max-width:40rem}}@media (width>=48rem){.container{max-width:48rem}}@media (width>=64rem){.container{max-width:64rem}}@media (width>=80rem){.container{max-width:80rem}}@media (width>=96rem){.container{max-width:96rem}}.divider{white-space:nowrap;height:1rem;margin:var(--divider-m,1rem 0);flex-direction:row;align-self:stretch;align-items:center;display:flex}.divider:before,.divider:after{content:"";background-color:color-mix(in oklab,var(--color-base-content)10%,transparent);flex-grow:1;width:100%;height:.125rem}@media print{.divider:before,.divider:after{border:.5px solid}}.divider:not(:empty){gap:1rem}.mx-1{margin-inline:calc(var(--spacing)*1)}.mx-auto{margin-inline:auto}.my-2{margin-block:calc(var(--spacing)*2)}.label{white-space:nowrap;color:color-mix(in oklab,currentColor 60%,transparent);align-items:center;gap:.375rem;display:inline-flex}.label:has(input){cursor:pointer}.label:is(.input>*,.select>*){white-space:nowrap;height:calc(100% - .5rem);font-size:inherit;align-items:center;padding-inline:.75rem;display:flex}.label:is(.input>*,.select>*):first-child{border-inline-end:var(--border)solid color-mix(in oklab,currentColor 10%,#0000);margin-inline:-.75rem .75rem}.label:is(.input>*,.select>*):last-child{border-inline-start:var(--border)solid color-mix(in oklab,currentColor 10%,#0000);margin-inline:.75rem -.75rem}.join-item:where(:not(:first-child)){margin-block-start:0;margin-inline-start:calc(var(--border,1px)*-1)}.modal-action{justify-content:flex-end;gap:.5rem;margin-top:1.5rem;display:flex}.-mt-1{margin-top:calc(var(--spacing)*-1)}.mt-4{margin-top:calc(var(--spacing)*4)}.mt-8{margin-top:calc(var(--spacing)*8)}.-mr-1{margin-right:calc(var(--spacing)*-1)}.mr-1{margin-right:calc(var(--spacing)*1)}.-mb-1{margin-bottom:calc(var(--spacing)*-1)}.mb-2{margin-bottom:calc(var(--spacing)*2)}.-ml-1{margin-left:calc(var(--spacing)*-1)}.ml-4{margin-left:calc(var(--spacing)*4)}.box-border{box-sizing:border-box}.kbd{border-radius:var(--radius-field);background-color:var(--color-base-200);vertical-align:middle;border:var(--border)solid color-mix(in srgb,var(--color-base-content)20%,#0000);border-bottom:calc(var(--border) + 1px)solid color-mix(in srgb,var(--color-base-content)20%,#0000);--size:calc(var(--size-selector,.25rem)*6);height:var(--size);min-width:var(--size);justify-content:center;align-items:center;padding-left:.5em;padding-right:.5em;font-size:.875rem;display:inline-flex}.tabs{--tabs-height:auto;--tabs-direction:row;height:var(--tabs-height);flex-wrap:wrap;flex-direction:var(--tabs-direction);display:flex}.footer{grid-auto-flow:row;place-items:start;gap:2.5rem 1rem;width:100%;font-size:.875rem;line-height:1.25rem;display:grid}.footer>*{place-items:start;gap:.5rem;display:grid}.footer.footer-center{text-align:center;grid-auto-flow:column dense;place-items:center}.footer.footer-center>*{place-items:center}.contents{display:contents}.divider-start:before{display:none}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.divider-horizontal{--divider-m:0 1rem}.divider-horizontal.divider{flex-direction:column;width:1rem;height:auto}.divider-horizontal.divider:before,.divider-horizontal.divider:after{width:.125rem;height:100%}.tabs-lg :where(.tab){height:calc(var(--size-field,.25rem)*12);--tab-p:1rem;--tab-radius-min:calc(1.5rem - var(--border));font-size:1.125rem}.tabs-sm :where(.tab){height:calc(var(--size-field,.25rem)*8);--tab-p:.5rem;--tab-radius-min:calc(.5rem - var(--border));font-size:.875rem}.\\!h-\\[22rem\\]{height:22rem!important}.\\!h-auto{height:auto!important}.h-2{height:calc(var(--spacing)*2)}.h-4{height:calc(var(--spacing)*4)}.h-5{height:calc(var(--spacing)*5)}.h-6{height:calc(var(--spacing)*6)}.h-10{height:calc(var(--spacing)*10)}.h-12{height:calc(var(--spacing)*12)}.h-auto{height:auto}.h-full{height:100%}.max-h-4{max-height:calc(var(--spacing)*4)}.max-h-5{max-height:calc(var(--spacing)*5)}.w-0{width:calc(var(--spacing)*0)}.w-1{width:calc(var(--spacing)*1)}.w-2{width:calc(var(--spacing)*2)}.w-4{width:calc(var(--spacing)*4)}.w-6{width:calc(var(--spacing)*6)}.w-11\\/12{width:91.6667%}.w-64{width:calc(var(--spacing)*64)}.w-full{width:100%}.max-w-4{max-width:calc(var(--spacing)*4)}.max-w-5{max-width:calc(var(--spacing)*5)}.max-w-5xl{max-width:var(--container-5xl)}.min-w-60{min-width:calc(var(--spacing)*60)}.flex-1{flex:1}.basis-1\\/4{flex-basis:25%}.basis-3\\/4{flex-basis:75%}.rotate-45{rotate:45deg}.transform{transform:var(--tw-rotate-x)var(--tw-rotate-y)var(--tw-rotate-z)var(--tw-skew-x)var(--tw-skew-y)}.link{cursor:pointer;text-decoration-line:underline}.link:focus{outline-style:none}@media (forced-colors:active){.link:focus{outline-offset:2px;outline:2px solid #0000}}.link:focus-visible{outline-offset:2px;outline:2px solid}.cursor-default{cursor:default}.cursor-not-allowed{cursor:not-allowed}.cursor-pointer{cursor:pointer}.grid-flow-dense{grid-auto-flow:dense}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.flex-col{flex-direction:column}.flex-col-reverse{flex-direction:column-reverse}.flex-row{flex-direction:row}.flex-row-reverse{flex-direction:row-reverse}.flex-wrap{flex-wrap:wrap}.content-stretch{align-content:stretch}.items-baseline{align-items:baseline}.items-center{align-items:center}.items-stretch{align-items:stretch}.justify-center{justify-content:center}.justify-start{justify-content:flex-start}.gap-0{gap:calc(var(--spacing)*0)}.gap-2{gap:calc(var(--spacing)*2)}.gap-2\\.5{gap:calc(var(--spacing)*2.5)}.gap-4{gap:calc(var(--spacing)*4)}.gap-8{gap:calc(var(--spacing)*8)}.gap-y-2{row-gap:calc(var(--spacing)*2)}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.rounded{border-radius:.25rem}.rounded-full{border-radius:3.40282e38px}.rounded-md{border-radius:var(--radius-md)}.rounded-xl{border-radius:var(--radius-xl)}.rounded-l-md{border-top-left-radius:var(--radius-md);border-bottom-left-radius:var(--radius-md)}.rounded-r-md{border-top-right-radius:var(--radius-md);border-bottom-right-radius:var(--radius-md)}.border-t-2{border-top-style:var(--tw-border-style);border-top-width:2px}.border-r{border-right-style:var(--tw-border-style);border-right-width:1px}.border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.border-dashed{--tw-border-style:dashed;border-style:dashed}.border-solid{--tw-border-style:solid;border-style:solid}.border-base-300{border-color:var(--color-base-300)}.border-error{border-color:var(--color-error)}.border-info{border-color:var(--color-info)}.border-neutral-300{border-color:var(--color-neutral-300)}.border-primary{border-color:var(--color-primary)}.border-warning{border-color:var(--color-warning)}.border-t-neutral{border-top-color:var(--color-neutral)}.bg-base-100{background-color:var(--color-base-100)}.bg-base-200{background-color:var(--color-base-200)}.bg-base-300{background-color:var(--color-base-300)}.bg-base-300\\/30{background-color:color-mix(in oklab,var(--color-base-300)30%,transparent)}.bg-error\\/25{background-color:color-mix(in oklab,var(--color-error)25%,transparent)}.bg-info\\/25{background-color:color-mix(in oklab,var(--color-info)25%,transparent)}.bg-neutral-300{background-color:var(--color-neutral-300)}.bg-primary{background-color:var(--color-primary)}.bg-transparent{background-color:#0000}.bg-warning\\/25{background-color:color-mix(in oklab,var(--color-warning)25%,transparent)}.fill-base-100{fill:var(--color-base-100)}.fill-current{fill:currentColor}.fill-neutral-800{fill:var(--color-neutral-800)}.p-0{padding:calc(var(--spacing)*0)}.p-1\\.5{padding:calc(var(--spacing)*1.5)}.p-2{padding:calc(var(--spacing)*2)}.p-4{padding:calc(var(--spacing)*4)}.p-6{padding:calc(var(--spacing)*6)}.px-1{padding-inline:calc(var(--spacing)*1)}.px-1\\.5{padding-inline:calc(var(--spacing)*1.5)}.px-3{padding-inline:calc(var(--spacing)*3)}.px-5{padding-inline:calc(var(--spacing)*5)}.py-0\\.5{padding-block:calc(var(--spacing)*.5)}.py-2{padding-block:calc(var(--spacing)*2)}.pt-1{padding-top:calc(var(--spacing)*1)}.pr-2\\.5{padding-right:calc(var(--spacing)*2.5)}.pb-2{padding-bottom:calc(var(--spacing)*2)}.pb-4{padding-bottom:calc(var(--spacing)*4)}.pb-8{padding-bottom:calc(var(--spacing)*8)}.pl-9{padding-left:calc(var(--spacing)*9)}.text-center{text-align:center}.text-left{text-align:left}.align-baseline{vertical-align:baseline}.font-mono{font-family:var(--font-mono)}.font-sans{font-family:var(--font-sans)}.text-8xl{font-size:var(--text-8xl);line-height:var(--tw-leading,var(--text-8xl--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.btn-md{--btn-p:1rem;--size:calc(var(--size-field,.25rem)*10);font-size:.875rem}.btn-sm{--btn-p:.75rem;--size:calc(var(--size-field,.25rem)*8);font-size:.75rem}.kbd-sm{--size:calc(var(--size-selector,.25rem)*5);font-size:.75rem}.leading-5{--tw-leading:calc(var(--spacing)*5);line-height:calc(var(--spacing)*5)}.leading-6{--tw-leading:calc(var(--spacing)*6);line-height:calc(var(--spacing)*6)}.leading-9{--tw-leading:calc(var(--spacing)*9);line-height:calc(var(--spacing)*9)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-normal{--tw-font-weight:var(--font-weight-normal);font-weight:var(--font-weight-normal)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide{--tw-tracking:var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-nowrap{text-wrap:nowrap}.whitespace-nowrap{white-space:nowrap}.checkbox-success{color:var(--color-success-content);--input-color:var(--color-success)}.tooltip-primary{--tt-bg:var(--color-primary)}.tooltip-primary>.tooltip-content,.tooltip-primary[data-tip]:before{color:var(--color-primary-content)}.tooltip-success{--tt-bg:var(--color-success)}.tooltip-success>.tooltip-content,.tooltip-success[data-tip]:before{color:var(--color-success-content)}.tooltip-warning{--tt-bg:var(--color-warning)}.tooltip-warning>.tooltip-content,.tooltip-warning[data-tip]:before{color:var(--color-warning-content)}.text-base-content{color:var(--color-base-content)}.text-neutral{color:var(--color-neutral)}.text-primary{color:var(--color-primary)}.text-primary-content{color:var(--color-primary-content)}.italic{font-style:italic}.link-hover{text-decoration-line:none}@media (hover:hover){.link-hover:hover{text-decoration-line:underline}}.underline{text-decoration-line:underline}.decoration-primary{-webkit-text-decoration-color:var(--color-primary);text-decoration-color:var(--color-primary)}.opacity-40{opacity:.4}.opacity-50{opacity:.5}.opacity-60{opacity:.6}.opacity-80{opacity:.8}.opacity-90{opacity:.9}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-2xl{--tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-inner{--tw-shadow:inset 0 2px 4px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a),0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-base-300{--tw-shadow-color:var(--color-base-300)}.outline-offset-2{outline-offset:2px}.blur{--tw-blur:blur(8px);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.backdrop-blur-md{--tw-backdrop-blur:blur(var(--blur-md));-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.ease-in-out{--tw-ease:var(--ease-in-out);transition-timing-function:var(--ease-in-out)}.btn-outline:not(.btn-active,:hover,:active:focus,:focus-visible,:disabled,[disabled],.btn-disabled){--btn-shadow:"";--btn-bg:#0000;--btn-fg:var(--btn-color);--btn-border:var(--btn-color);--btn-noise:none}.\\!btn-primary{--btn-color:var(--color-primary)!important;--btn-fg:var(--color-primary-content)!important}.btn-primary{--btn-color:var(--color-primary);--btn-fg:var(--color-primary-content)}.select-all{-webkit-user-select:all;user-select:all}@media (hover:hover){.group-hover\\:w-24:is(:where(.group):hover *){width:calc(var(--spacing)*24)}.group-hover\\:scale-110:is(:where(.group):hover *){--tw-scale-x:110%;--tw-scale-y:110%;--tw-scale-z:110%;scale:var(--tw-scale-x)var(--tw-scale-y)}.hover\\:btn-ghost:hover:not(.btn-active,:hover,:active:focus,:focus-visible){--btn-shadow:"";--btn-bg:#0000;--btn-border:#0000;--btn-noise:none}.hover\\:btn-ghost:hover:not(.btn-active,:hover,:active:focus,:focus-visible):not(:disabled,[disabled],.btn-disabled){--btn-fg:currentColor;outline-color:currentColor}}@media (width>=40rem){.sm\\:join{--join-ss:0;--join-se:0;--join-es:0;--join-ee:0;align-items:stretch;display:inline-flex}.sm\\:join :where(.join-item){border-start-start-radius:var(--join-ss,0);border-start-end-radius:var(--join-se,0);border-end-end-radius:var(--join-ee,0);border-end-start-radius:var(--join-es,0)}.sm\\:join :where(.join-item) *{--join-ss:var(--radius-field);--join-se:var(--radius-field);--join-es:var(--radius-field);--join-ee:var(--radius-field)}.sm\\:join>.join-item:where(:first-child),.sm\\:join :first-child:not(:last-child) :where(.join-item){--join-ss:var(--radius-field);--join-se:0;--join-es:var(--radius-field);--join-ee:0}.sm\\:join>.join-item:where(:last-child),.sm\\:join :last-child:not(:first-child) :where(.join-item){--join-ss:0;--join-se:var(--radius-field);--join-es:0;--join-ee:var(--radius-field)}.sm\\:flex{display:flex}.sm\\:w-auto{width:auto}}@media (width>=48rem){.md\\:overflow-visible{overflow:visible}}@media (width>=64rem){.lg\\:mr-4{margin-right:calc(var(--spacing)*4)}.lg\\:ml-0{margin-left:calc(var(--spacing)*0)}.lg\\:block{display:block}.lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.lg\\:flex-row{flex-direction:row}}@media (prefers-color-scheme:dark){.dark\\:border-neutral-500{border-color:var(--color-neutral-500)}.dark\\:bg-neutral{background-color:var(--color-neutral)}.dark\\:bg-neutral-500{background-color:var(--color-neutral-500)}.dark\\:bg-neutral\\/70{background-color:color-mix(in oklab,var(--color-neutral)70%,transparent)}.dark\\:fill-neutral-200{fill:var(--color-neutral-200)}.dark\\:text-neutral-content{color:var(--color-neutral-content)}}}@keyframes dropdown{0%{opacity:0}}@keyframes rating{0%,40%{filter:brightness(1.05)contrast(1.05);scale:1.1}}@keyframes radio{0%{padding:5px}50%{padding:3px}}@keyframes progress{50%{background-position-x:-115%}}@keyframes skeleton{0%{background-position:150%}to{background-position:-50%}}@keyframes toast{0%{opacity:0;scale:.9}to{opacity:1;scale:1}}@property --tw-rotate-x{syntax:"*";inherits:false;initial-value:rotateX(0)}@property --tw-rotate-y{syntax:"*";inherits:false;initial-value:rotateY(0)}@property --tw-rotate-z{syntax:"*";inherits:false;initial-value:rotateZ(0)}@property --tw-skew-x{syntax:"*";inherits:false;initial-value:skewX(0)}@property --tw-skew-y{syntax:"*";inherits:false;initial-value:skewY(0)}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-scale-x{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-y{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-z{syntax:"*";inherits:false;initial-value:1}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}`;
var Qs = /* @__PURE__ */ f("<style>");
function Us(t) {
  return D(jn, {
    get children() {
      return [(() => {
        var e = Qs();
        return y(e, Ys), e;
      })(), p(() => t.children)];
    }
  });
}
function Zs(t) {
  return D(Us, {
    get children() {
      return D(ks, {
        widget: !0,
        get theme() {
          return t.theme;
        }
      });
    }
  });
}
Uo("bati-widget", { theme: "" }, Zs);
