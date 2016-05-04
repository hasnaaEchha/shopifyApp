﻿(function () {
    function p(a, k, o) {
        if (!k.is || !k.getCustomData("block_processed"))k.is && CKEDITOR.dom.element.setMarker(o, k, "block_processed", !0), a.push(k)
    }

    function n(a, k) {
        function o() {
            this.foreach(function (d) {
                if (/^(?!vbox|hbox)/.test(d.type) && (d.setup || (d.setup = function (c) {
                        d.setValue(c.getAttribute(d.id) || "", 1)
                    }), !d.commit))d.commit = function (c) {
                    var a = this.getValue();
                    "dir" == d.id && c.getComputedStyle("direction") == a || (a ? c.setAttribute(d.id, a) : c.removeAttribute(d.id))
                }
            })
        }

        var n = function () {
            var d = CKEDITOR.tools.extend({},
                CKEDITOR.dtd.$blockLimit);
            a.config.div_wrapTable && (delete d.td, delete d.th);
            return d
        }(), q = CKEDITOR.dtd.div, l = {}, m = [];
        return {
            title: a.lang.div.title, minWidth: 400, minHeight: 165, contents: [{
                id: "info", label: a.lang.common.generalTab, title: a.lang.common.generalTab, elements: [{
                    type: "hbox", widths: ["50%", "50%"], children: [{
                        id: "elementStyle",
                        type: "select",
                        style: "width: 100%;",
                        label: a.lang.div.styleSelectLabel,
                        "default": "",
                        items: [[a.lang.common.notSet, ""]],
                        onChange: function () {
                            var d = ["info:elementStyle", "info:class",
                                "advanced:dir", "advanced:style"], c = this.getDialog(), h = c._element && c._element.clone() || new CKEDITOR.dom.element("div", a.document);
                            this.commit(h, !0);
                            for (var d = [].concat(d), b = d.length, i, f = 0; f < b; f++)(i = c.getContentElement.apply(c, d[f].split(":"))) && i.setup && i.setup(h, !0)
                        },
                        setup: function (a) {
                            for (var c in l)l[c].checkElementRemovable(a, !0) && this.setValue(c, 1)
                        },
                        commit: function (a) {
                            var c;
                            (c = this.getValue()) ? l[c].applyToObject(a) : a.removeAttribute("style")
                        }
                    }, {
                        id: "class", type: "text", requiredContent: "div(cke-xyz)",
                        label: a.lang.common.cssClass, "default": ""
                    }]
                }]
            }, {
                id: "advanced", label: a.lang.common.advancedTab, title: a.lang.common.advancedTab, elements: [{
                    type: "vbox",
                    padding: 1,
                    children: [{
                        type: "hbox",
                        widths: ["50%", "50%"],
                        children: [{
                            type: "text",
                            id: "id",
                            requiredContent: "div[id]",
                            label: a.lang.common.id,
                            "default": ""
                        }, {
                            type: "text",
                            id: "lang",
                            requiredContent: "div[lang]",
                            label: a.lang.common.langCode,
                            "default": ""
                        }]
                    }, {
                        type: "hbox", children: [{
                            type: "text",
                            id: "style",
                            requiredContent: "div{cke-xyz}",
                            style: "width: 100%;",
                            label: a.lang.common.cssStyle,
                            "default": "",
                            commit: function (a) {
                                a.setAttribute("style", this.getValue())
                            }
                        }]
                    }, {
                        type: "hbox",
                        children: [{
                            type: "text",
                            id: "title",
                            requiredContent: "div[title]",
                            style: "width: 100%;",
                            label: a.lang.common.advisoryTitle,
                            "default": ""
                        }]
                    }, {
                        type: "select",
                        id: "dir",
                        requiredContent: "div[dir]",
                        style: "width: 100%;",
                        label: a.lang.common.langDir,
                        "default": "",
                        items: [[a.lang.common.notSet, ""], [a.lang.common.langDirLtr, "ltr"], [a.lang.common.langDirRtl, "rtl"]]
                    }]
                }]
            }], onLoad: function () {
                o.call(this);
                var d = this, c = this.getContentElement("info",
                    "elementStyle");
                a.getStylesSet(function (h) {
                    var b, i;
                    if (h)for (var f = 0; f < h.length; f++)i = h[f], i.element && "div" == i.element && (b = i.name, l[b] = i = new CKEDITOR.style(i), a.filter.check(i) && (c.items.push([b, b]), c.add(b, b)));
                    c[1 < c.items.length ? "enable" : "disable"]();
                    setTimeout(function () {
                        d._element && c.setup(d._element)
                    }, 0)
                })
            }, onShow: function () {
                "editdiv" == k && this.setupContent(this._element = CKEDITOR.plugins.div.getSurroundDiv(a))
            }, onOk: function () {
                if ("editdiv" == k)m = [this._element]; else {
                    var d = [], c = {}, h = [], b, i = a.getSelection(),
                        f = i.getRanges(), l = i.createBookmarks(), g, j;
                    for (g = 0; g < f.length; g++)for (j = f[g].createIterator(); b = j.getNextParagraph();)if (b.getName()in n && !b.isReadOnly()) {
                        var e = b.getChildren();
                        for (b = 0; b < e.count(); b++)p(h, e.getItem(b), c)
                    } else {
                        for (; !q[b.getName()] && !b.equals(f[g].root);)b = b.getParent();
                        p(h, b, c)
                    }
                    CKEDITOR.dom.element.clearAllMarkers(c);
                    f = [];
                    g = null;
                    for (j = 0; j < h.length; j++)b = h[j], e = a.elementPath(b).blockLimit, e.isReadOnly() && (e = e.getParent()), a.config.div_wrapTable && e.is(["td", "th"]) && (e = a.elementPath(e.getParent()).blockLimit),
                    e.equals(g) || (g = e, f.push([])), f[f.length - 1].push(b);
                    for (g = 0; g < f.length; g++) {
                        e = f[g][0];
                        h = e.getParent();
                        for (b = 1; b < f[g].length; b++)h = h.getCommonAncestor(f[g][b]);
                        j = new CKEDITOR.dom.element("div", a.document);
                        for (b = 0; b < f[g].length; b++) {
                            for (e = f[g][b]; !e.getParent().equals(h);)e = e.getParent();
                            f[g][b] = e
                        }
                        for (b = 0; b < f[g].length; b++)if (e = f[g][b], !e.getCustomData || !e.getCustomData("block_processed"))e.is && CKEDITOR.dom.element.setMarker(c, e, "block_processed", !0), b || j.insertBefore(e), j.append(e);
                        CKEDITOR.dom.element.clearAllMarkers(c);
                        d.push(j)
                    }
                    i.selectBookmarks(l);
                    m = d
                }
                d = m.length;
                for (c = 0; c < d; c++)this.commitContent(m[c]), !m[c].getAttribute("style") && m[c].removeAttribute("style");
                this.hide()
            }, onHide: function () {
                "editdiv" == k && this._element.removeCustomData("elementStyle");
                delete this._element
            }
        }
    }

    CKEDITOR.dialog.add("creatediv", function (a) {
        return n(a, "creatediv")
    });
    CKEDITOR.dialog.add("editdiv", function (a) {
        return n(a, "editdiv")
    })
})();