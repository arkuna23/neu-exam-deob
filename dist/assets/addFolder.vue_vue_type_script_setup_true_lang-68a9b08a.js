import {
    d as P,
    r as u,
    p as x,
    h as A,
    j as F,
    o as w,
    c as C,
    k as m,
    l as d,
    v as _,
    a as o,
    A as D,
    m as T,
    P as q,
    O as z,
    Q as E,
    J,
    aU as Q,
    __tla as R
} from "./index-6c08ea4c.js";

import {
    v as B,
    c as G
} from "./validate-b72f006c.js";

import {
    e as H,
    c as K,
    u as L,
    __tla as M
} from "./activityAdmin-9a4ffc20.js";

let h, S = Promise.all([ (() => {
    try {
        return R;
    } catch {}
})(), (() => {
    try {
        return M;
    } catch {}
})() ]).then(async () => {
    h = P({
        __name: "addFolder",
        emits: [ "refresh" ],
        setup(W, {
            expose: N,
            emit: y
        }) {
            const c = u(), r = u(!1), v = u("新建文件夹"), e = u({
                resName: ""
            }), p = y, g = x(), n = A(), l = u({}), b = u({
                resName: [ {
                    required: !0,
                    message: "文件夹名称不能为空",
                    trigger: "blur"
                }, {
                    validator: B,
                    message: "文件夹名称不能为空",
                    trigger: "change"
                }, {
                    validator: async function(s, a, t) {
                        await H({
                            folderName: a,
                            parentId: l.value.fatherObj.id,
                            creator: n.getUser.id
                        }) ? t(new Error("文件夹名称与当前层级下的文件夹同名")) : t();
                    },
                    message: "文件夹名称与当前层级下的文件夹同名",
                    trigger: "change"
                }, {
                    validator: G,
                    message: '字符串中不能包含字符 "\\" 或 "/"',
                    trigger: "change"
                }, {
                    max: 100,
                    message: "长度在100个字符以内",
                    trigger: "blur"
                } ]
            }), j = () => {
                c.value.validate(s => {
                    if (s) {
                        const a = {
                            ...l.value.fatherObj
                        };
                        a.children = [ {
                            actName: e.value.resName,
                            resName: e.value.resName,
                            resType: 0,
                            resDesc: e.value.resName,
                            pvtParentId: "",
                            pvtAncestorId: "",
                            pubParentId: "",
                            pubAncestorId: "",
                            neuParentId: "0",
                            neuAncestorId: "0",
                            release: 0,
                            creatorName: n.getUser.nickname,
                            updaterName: n.getUser.nickname
                        } ], l.value.type == "add" ? K(a).then(t => {
                            t && (g.success("提交成功"), r.value = !1, p("refresh"));
                        }) : l.value.type == "edit" && L({
                            ...l.value.editObject,
                            resType: 0,
                            actName: e.value.resName,
                            resName: e.value.resName,
                            updaterName: n.getUser.nickname
                        }).then(t => {
                            t && (g.success("提交成功"), r.value = !1, p("refresh"));
                        }), r.value = !1;
                    }
                });
            }, k = () => {
                e.value.resName = "", c.value.resetFields();
            };
            return N({
                openDialog: s => {
                    r.value = !0, v.value = s.title, l.value = s, s.type == "edit" ? Object.assign(e.value, s.editObject) : e.value.resName = "";
                }
            }), (s, a) => {
                const t = q, U = z, I = E, f = J, O = Q, V = F("trim");
                return w(), C("div", null, [ m(O, {
                    modelValue: o(r),
                    "onUpdate:modelValue": a[2] || (a[2] = i => T(r) ? r.value = i : null),
                    scroll: !0,
                    "max-height": "210",
                    title: o(v),
                    width: "420",
                    onClose: k
                }, {
                    footer: d(() => [ m(f, {
                        type: "default",
                        onClick: a[1] || (a[1] = i => r.value = !1)
                    }, {
                        default: d(() => [ _("取消") ]),
                        _: 1
                    }), m(f, {
                        type: "primary",
                        onClick: j
                    }, {
                        default: d(() => [ _("确定") ]),
                        _: 1
                    }) ]),
                    default: d(() => [ m(I, {
                        ref_key: "addFolderFormRef",
                        ref: c,
                        model: o(e),
                        rules: o(b),
                        class: "neu"
                    }, {
                        default: d(() => [ m(U, {
                            label: "文件夹名称",
                            prop: "resName"
                        }, {
                            default: d(() => [ D(m(t, {
                                size: "large",
                                modelValue: o(e).resName,
                                "onUpdate:modelValue": a[0] || (a[0] = i => o(e).resName = i),
                                placeholder: "请输入文件夹名称",
                                clearable: ""
                            }, null, 8, [ "modelValue" ]), [ [ V ] ]) ]),
                            _: 1
                        }) ]),
                        _: 1
                    }, 8, [ "model", "rules" ]) ]),
                    _: 1
                }, 8, [ "modelValue", "title" ]) ]);
            };
        }
    });
});

export {
    h as _,
    S as __tla
};