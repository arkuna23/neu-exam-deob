import {
    a7 as e,
    __tla as g
} from "./index-6c08ea4c.js";

let r, t, i, n, l, f, o, s = Promise.all([ (() => {
    try {
        return g;
    } catch {}
})() ]).then(async () => {
    r = a => e.get({
        url: "/infra/config/page",
        params: a
    }), f = a => e.get({
        url: "/infra/config/get?id=" + a
    }), t = a => e.get({
        url: "/infra/config/get-value-by-key?key=" + a
    }), i = a => e.post({
        url: "/infra/config/create",
        data: a
    }), o = a => e.put({
        url: "/infra/config/update",
        data: a
    }), n = a => e.delete({
        url: "/infra/config/delete?id=" + a
    }), l = a => e.download({
        url: "/infra/config/export",
        params: a
    });
});

export {
    s as __tla,
    r as a,
    t as b,
    i as c,
    n as d,
    l as e,
    f as g,
    o as u
};