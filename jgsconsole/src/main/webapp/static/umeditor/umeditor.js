(function(g) {
    function G(a, b, c) {
        var d;
        b = b.toLowerCase();
        return (d = a.__allListeners || c && (a.__allListeners = {})) && (d[b] || c && (d[b] = []))
    }
    function H(a, b, c, d, e, f) {
        d = d && a[b];
        var h;
        for (!d && (d = a[c]); !d && (h = (h || a).parentNode); ) {
            if ("BODY" == h.tagName || f && !f(h))
                return null;
            d = h[c]
        }
        return d && e && !e(d) ? H(d, b, c, !1, e) : d
    }
    UMEDITOR_CONFIG = window.UMEDITOR_CONFIG || {};
    window.UM = {
        plugins: {},
        commands: {},
        I18N: {},
        version: "1.2.2"
    };
    var B = UM.dom = {}
      , m = UM.browser = function() {
        var a = navigator.userAgent.toLowerCase()
          , b = window.opera
          , c = {
            ie: /(msie\s|trident.*rv:)([\w.]+)/.test(a),
            opera: !!b && b.version,
            webkit: -1 < a.indexOf(" applewebkit/"),
            mac: -1 < a.indexOf("macintosh"),
            quirks: "BackCompat" == document.compatMode
        };
        c.gecko = "Gecko" == navigator.product && !c.webkit && !c.opera && !c.ie;
        var d = 0;
        if (c.ie) {
            var d = a.match(/(?:msie\s([\w.]+))/)
              , e = a.match(/(?:trident.*rv:([\w.]+))/)
              , d = d && e && d[1] && e[1] ? Math.max(1 * d[1], 1 * e[1]) : d && d[1] ? 1 * d[1] : e && e[1] ? 1 * e[1] : 0;
            c.ie11Compat = 11 == document.documentMode;
            c.ie9Compat = 9 == document.documentMode;
            c.ie8 = !!document.documentMode;
            c.ie8Compat = 8 == document.documentMode;
            c.ie7Compat = 7 == d && !document.documentMode || 7 == document.documentMode;
            c.ie6Compat = 7 > d || c.quirks;
            c.ie9above = 8 < d;
            c.ie9below = 9 > d
        }
        c.gecko && (e = a.match(/rv:([\d\.]+)/)) && (e = e[1].split("."),
        d = 1E4 * e[0] + 100 * (e[1] || 0) + 1 * (e[2] || 0));
        /chrome\/(\d+\.\d)/i.test(a) && (c.chrome = +RegExp.$1);
        /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(a) && !/chrome/i.test(a) && (c.safari = +(RegExp.$1 || RegExp.$2));
        c.opera && (d = parseFloat(b.version()));
        c.webkit && (d = parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));
        c.version = d;
        c.isCompatible = !c.mobile && (c.ie && 6 <= d || c.gecko && 10801 <= d || c.opera && 9.5 <= d || c.air && 1 <= d || c.webkit && 522 <= d || !1);
        return c
    }()
      , E = m.ie
      , n = UM.utils = {
        each: function(a, b, c) {
            if (null != a)
                if (a.length === +a.length)
                    for (var d = 0, e = a.length; d < e; d++) {
                        if (!1 === b.call(c, a[d], d, a))
                            return !1
                    }
                else
                    for (d in a)
                        if (a.hasOwnProperty(d) && !1 === b.call(c, a[d], d, a))
                            return !1
        },
        makeInstance: function(a) {
            var b = new Function;
            b.prototype = a;
            a = new b;
            b.prototype = null;
            return a
        },
        extend: function(a, b, c) {
            if (b)
                for (var d in b)
                    c && a.hasOwnProperty(d) || (a[d] = b[d]);
            return a
        },
        extend2: function(a) {
            for (var b = arguments, c = 1; c < b.length; c++) {
                var d = b[c], e;
                for (e in d)
                    a.hasOwnProperty(e) || (a[e] = d[e])
            }
            return a
        },
        inherits: function(a, b) {
            var c = a.prototype
              , d = n.makeInstance(b.prototype);
            n.extend(d, c, !0);
            a.prototype = d;
            return d.constructor = a
        },
        bind: function(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        },
        defer: function(a, b, c) {
            var d;
            return function() {
                c && clearTimeout(d);
                d = setTimeout(a, b)
            }
        },
        indexOf: function(a, b, c) {
            var d = -1;
            c = this.isNumber(c) ? c : 0;
            this.each(a, function(a, f) {
                if (f >= c && a === b)
                    return d = f,
                    !1
            });
            return d
        },
        removeItem: function(a, b) {
            for (var c = 0, d = a.length; c < d; c++)
                a[c] === b && (a.splice(c, 1),
                c--)
        },
        trim: function(a) {
            return a.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "")
        },
        listToMap: function(a) {
            if (!a)
                return {};
            a = n.isArray(a) ? a : a.split(",");
            for (var b = 0, c, d = {}; c = a[b++]; )
                d[c.toUpperCase()] = d[c] = 1;
            return d
        },
        unhtml: function(a, b) {
            return a ? a.replace(b || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp);)?/g, function(a, b) {
                return b ? a : {
                    "<": "&lt;",
                    "&": "&amp;",
                    '"': "&quot;",
                    ">": "&gt;",
                    "'": "&#39;"
                }[a]
            }) : ""
        },
        html: function(a) {
            return a ? a.replace(/&((g|l|quo)t|amp|#39);/g, function(a) {
                return {
                    "&lt;": "<",
                    "&amp;": "&",
                    "&quot;": '"',
                    "&gt;": ">",
                    "&#39;": "'"
                }[a]
            }) : ""
        },
        cssStyleToDomStyle: function() {
            var a = document.createElement("div").style
              , b = {
                "float": void 0 != a.cssFloat ? "cssFloat" : void 0 != a.styleFloat ? "styleFloat" : "float"
            };
            return function(a) {
                return b[a] || (b[a] = a.toLowerCase().replace(/-./g, function(a) {
                    return a.charAt(1).toUpperCase()
                }))
            }
        }(),
        loadFile: function() {
            function a(a, d) {
                try {
                    for (var e = 0, f; f = b[e++]; )
                        if (f.doc === a && f.url == (d.src || d.href))
                            return f
                } catch (h) {
                    return null
                }
            }
            var b = [];
            return function(c, d, e) {
                var f = a(c, d);
                if (f)
                    f.ready ? e && e() : f.funs.push(e);
                else if (b.push({
                    doc: c,
                    url: d.src || d.href,
                    funs: [e]
                }),
                !c.body) {
                    e = [];
                    for (var h in d)
                        "tag" != h && e.push(h + '="' + d[h] + '"');
                    c.write("<" + d.tag + " " + e.join(" ") + " ></" + d.tag + ">")
                } else if (!d.id || !c.getElementById(d.id)) {
                    var l = c.createElement(d.tag);
                    delete d.tag;
                    for (h in d)
                        l.setAttribute(h, d[h]);
                    l.onload = l.onreadystatechange = function() {
                        if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                            f = a(c, d);
                            if (0 < f.funs.length) {
                                f.ready = 1;
                                for (var b; b = f.funs.pop(); )
                                    b()
                            }
                            l.onload = l.onreadystatechange = null
                        }
                    }
                    ;
                    l.onerror = function() {
                        throw Error("The load " + (d.href || d.src) + " fails,check the url settings of file umeditor.config.js ");
                    }
                    ;
                    c.getElementsByTagName("head")[0].appendChild(l)
                }
            }
        }(),
        isEmptyObject: function(a) {
            if (null == a)
                return !0;
            if (this.isArray(a) || this.isString(a))
                return 0 === a.length;
            for (var b in a)
                if (a.hasOwnProperty(b))
                    return !1;
            return !0
        },
        fixColor: function(a, b) {
            if (/color/i.test(a) && /rgba?/.test(b)) {
                var c = b.split(",");
                if (3 < c.length)
                    return "";
                b = "#";
                for (var d = 0, e; e = c[d++]; )
                    e = parseInt(e.replace(/[^\d]/gi, ""), 10).toString(16),
                    b += 1 == e.length ? "0" + e : e;
                b = b.toUpperCase()
            }
            return b
        },
        clone: function(a, b) {
            var c;
            b = b || {};
            for (var d in a)
                a.hasOwnProperty(d) && (c = a[d],
                "object" == typeof c ? (b[d] = n.isArray(c) ? [] : {},
                n.clone(a[d], b[d])) : b[d] = c);
            return b
        },
        transUnitToPx: function(a) {
            if (!/(pt|cm)/.test(a))
                return a;
            var b;
            a.replace(/([\d.]+)(\w+)/, function(c, d, e) {
                a = d;
                b = e
            });
            switch (b) {
            case "cm":
                a = 25 * parseFloat(a);
                break;
            case "pt":
                a = Math.round(96 * parseFloat(a) / 72)
            }
            return a + (a ? "px" : "")
        },
        cssRule: m.ie && 11 != m.version ? function(a, b, c) {
            var d;
            c = c || document;
            d = c.indexList ? c.indexList : c.indexList = {};
            var e;
            if (d[a])
                e = c.styleSheets[d[a]];
            else {
                if (void 0 === b)
                    return "";
                e = c.createStyleSheet("", c = c.styleSheets.length);
                d[a] = c
            }
            if (void 0 === b)
                return e.cssText;
            e.cssText = b || ""
        }
        : function(a, b, c) {
            c = c || document;
            var d = c.getElementsByTagName("head")[0], e;
            if (!(e = c.getElementById(a))) {
                if (void 0 === b)
                    return "";
                e = c.createElement("style");
                e.id = a;
                d.appendChild(e)
            }
            if (void 0 === b)
                return e.innerHTML;
            "" !== b ? e.innerHTML = b : d.removeChild(e)
        }
    };
    n.each("String Function Array Number RegExp Object".split(" "), function(a) {
        UM.utils["is" + a] = function(b) {
            return Object.prototype.toString.apply(b) == "[object " + a + "]"
        }
    });
    var I = UM.EventBase = function() {}
    ;
    I.prototype = {
        addListener: function(a, b) {
            a = n.trim(a).split(" ");
            for (var c = 0, d; d = a[c++]; )
                G(this, d, !0).push(b)
        },
        removeListener: function(a, b) {
            a = n.trim(a).split(" ");
            for (var c = 0, d; d = a[c++]; )
                n.removeItem(G(this, d) || [], b)
        },
        fireEvent: function() {
            for (var a = arguments[0], a = n.trim(a).split(" "), b = 0, c; c = a[b++]; ) {
                var d = G(this, c), e, f, h;
                if (d)
                    for (h = d.length; h--; )
                        if (d[h]) {
                            f = d[h].apply(this, arguments);
                            if (!0 === f)
                                return f;
                            void 0 !== f && (e = f)
                        }
                if (f = this["on" + c.toLowerCase()])
                    e = f.apply(this, arguments)
            }
            return e
        }
    };
    var q = B.dtd = function() {
        function a(a) {
            for (var b in a)
                a[b.toUpperCase()] = a[b];
            return a
        }
        var b = n.extend2
          , c = a({
            isindex: 1,
            fieldset: 1
        })
          , d = a({
            input: 1,
            button: 1,
            select: 1,
            textarea: 1,
            label: 1
        })
          , e = b(a({
            a: 1
        }), d)
          , f = b({
            iframe: 1
        }, e)
          , h = a({
            hr: 1,
            ul: 1,
            menu: 1,
            div: 1,
            blockquote: 1,
            noscript: 1,
            table: 1,
            center: 1,
            address: 1,
            dir: 1,
            pre: 1,
            h5: 1,
            dl: 1,
            h4: 1,
            noframes: 1,
            h6: 1,
            ol: 1,
            h1: 1,
            h3: 1,
            h2: 1
        })
          , l = a({
            ins: 1,
            del: 1,
            script: 1,
            style: 1
        })
          , s = b(a({
            b: 1,
            acronym: 1,
            bdo: 1,
            "var": 1,
            "#": 1,
            abbr: 1,
            code: 1,
            br: 1,
            i: 1,
            cite: 1,
            kbd: 1,
            u: 1,
            strike: 1,
            s: 1,
            tt: 1,
            strong: 1,
            q: 1,
            samp: 1,
            em: 1,
            dfn: 1,
            span: 1
        }), l)
          , p = b(a({
            sub: 1,
            img: 1,
            embed: 1,
            object: 1,
            sup: 1,
            basefont: 1,
            map: 1,
            applet: 1,
            font: 1,
            big: 1,
            small: 1
        }), s)
          , r = b(a({
            p: 1
        }), p)
          , d = b(a({
            iframe: 1
        }), p, d)
          , p = a({
            img: 1,
            embed: 1,
            noscript: 1,
            br: 1,
            kbd: 1,
            center: 1,
            button: 1,
            basefont: 1,
            h5: 1,
            h4: 1,
            samp: 1,
            h6: 1,
            ol: 1,
            h1: 1,
            h3: 1,
            h2: 1,
            form: 1,
            font: 1,
            "#": 1,
            select: 1,
            menu: 1,
            ins: 1,
            abbr: 1,
            label: 1,
            code: 1,
            table: 1,
            script: 1,
            cite: 1,
            input: 1,
            iframe: 1,
            strong: 1,
            textarea: 1,
            noframes: 1,
            big: 1,
            small: 1,
            span: 1,
            hr: 1,
            sub: 1,
            bdo: 1,
            "var": 1,
            div: 1,
            object: 1,
            sup: 1,
            strike: 1,
            dir: 1,
            map: 1,
            dl: 1,
            applet: 1,
            del: 1,
            isindex: 1,
            fieldset: 1,
            ul: 1,
            b: 1,
            acronym: 1,
            a: 1,
            blockquote: 1,
            i: 1,
            u: 1,
            s: 1,
            tt: 1,
            address: 1,
            q: 1,
            pre: 1,
            p: 1,
            em: 1,
            dfn: 1
        })
          , g = b(a({
            a: 0
        }), d)
          , u = a({
            tr: 1
        })
          , v = a({
            "#": 1
        })
          , w = b(a({
            param: 1
        }), p)
          , k = b(a({
            form: 1
        }), c, f, h, r)
          , m = a({
            li: 1,
            ol: 1,
            ul: 1
        })
          , x = a({
            style: 1,
            script: 1
        })
          , q = a({
            base: 1,
            link: 1,
            meta: 1,
            title: 1
        })
          , x = b(q, x)
          , C = a({
            head: 1,
            body: 1
        })
          , z = a({
            html: 1
        })
          , A = a({
            address: 1,
            blockquote: 1,
            center: 1,
            dir: 1,
            div: 1,
            dl: 1,
            fieldset: 1,
            form: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            hr: 1,
            isindex: 1,
            menu: 1,
            noframes: 1,
            ol: 1,
            p: 1,
            pre: 1,
            table: 1,
            ul: 1
        })
          , D = a({
            area: 1,
            base: 1,
            basefont: 1,
            br: 1,
            col: 1,
            command: 1,
            dialog: 1,
            embed: 1,
            hr: 1,
            img: 1,
            input: 1,
            isindex: 1,
            keygen: 1,
            link: 1,
            meta: 1,
            param: 1,
            source: 1,
            track: 1,
            wbr: 1
        });
        return a({
            $nonBodyContent: b(z, C, q),
            $block: A,
            $inline: g,
            $inlineWithA: b(a({
                a: 1
            }), g),
            $body: b(a({
                script: 1,
                style: 1
            }), A),
            $cdata: a({
                script: 1,
                style: 1
            }),
            $empty: D,
            $nonChild: a({
                iframe: 1,
                textarea: 1
            }),
            $listItem: a({
                dd: 1,
                dt: 1,
                li: 1
            }),
            $list: a({
                ul: 1,
                ol: 1,
                dl: 1
            }),
            $isNotEmpty: a({
                table: 1,
                ul: 1,
                ol: 1,
                dl: 1,
                iframe: 1,
                area: 1,
                base: 1,
                col: 1,
                hr: 1,
                img: 1,
                embed: 1,
                input: 1,
                link: 1,
                meta: 1,
                param: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1
            }),
            $removeEmpty: a({
                a: 1,
                abbr: 1,
                acronym: 1,
                address: 1,
                b: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                q: 1,
                s: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                tt: 1,
                u: 1,
                "var": 1
            }),
            $removeEmptyBlock: a({
                p: 1,
                div: 1
            }),
            $tableContent: a({
                caption: 1,
                col: 1,
                colgroup: 1,
                tbody: 1,
                td: 1,
                tfoot: 1,
                th: 1,
                thead: 1,
                tr: 1,
                table: 1
            }),
            $notTransContent: a({
                pre: 1,
                script: 1,
                style: 1,
                textarea: 1
            }),
            html: C,
            head: x,
            style: v,
            script: v,
            body: k,
            base: {},
            link: {},
            meta: {},
            title: v,
            col: {},
            tr: a({
                td: 1,
                th: 1
            }),
            img: {},
            embed: {},
            colgroup: a({
                thead: 1,
                col: 1,
                tbody: 1,
                tr: 1,
                tfoot: 1
            }),
            noscript: k,
            td: k,
            br: {},
            th: k,
            center: k,
            kbd: g,
            button: b(r, h),
            basefont: {},
            h5: g,
            h4: g,
            samp: g,
            h6: g,
            ol: m,
            h1: g,
            h3: g,
            option: v,
            h2: g,
            form: b(c, f, h, r),
            select: a({
                optgroup: 1,
                option: 1
            }),
            font: g,
            ins: g,
            menu: m,
            abbr: g,
            label: g,
            table: a({
                thead: 1,
                col: 1,
                tbody: 1,
                tr: 1,
                colgroup: 1,
                caption: 1,
                tfoot: 1
            }),
            code: g,
            tfoot: u,
            cite: g,
            li: k,
            input: {},
            iframe: k,
            strong: g,
            textarea: v,
            noframes: k,
            big: g,
            small: g,
            span: a({
                "#": 1,
                br: 1,
                b: 1,
                strong: 1,
                u: 1,
                i: 1,
                em: 1,
                sub: 1,
                sup: 1,
                strike: 1,
                span: 1
            }),
            hr: g,
            dt: g,
            sub: g,
            optgroup: a({
                option: 1
            }),
            param: {},
            bdo: g,
            "var": g,
            div: k,
            object: w,
            sup: g,
            dd: k,
            strike: g,
            area: {},
            dir: m,
            map: b(a({
                area: 1,
                form: 1,
                p: 1
            }), c, l, h),
            applet: w,
            dl: a({
                dt: 1,
                dd: 1
            }),
            del: g,
            isindex: {},
            fieldset: b(a({
                legend: 1
            }), p),
            thead: u,
            ul: m,
            acronym: g,
            b: g,
            a: b(a({
                a: 1
            }), d),
            blockquote: b(a({
                td: 1,
                tr: 1,
                tbody: 1,
                li: 1
            }), k),
            caption: g,
            i: g,
            u: g,
            tbody: u,
            s: g,
            address: b(f, r),
            tt: g,
            legend: g,
            q: g,
            pre: b(s, e),
            p: b(a({
                a: 1
            }), g),
            em: g,
            dfn: g
        })
    }()
      , J = E && 9 > m.version ? {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder"
    } : {
        tabindex: "tabIndex",
        readonly: "readOnly"
    }
      , K = n.listToMap("-webkit-box -moz-box block list-item table table-row-group table-header-group table-footer-group table-row table-column-group table-column table-cell table-caption".split(" "))
      , k = B.domUtils = {
        NODE_ELEMENT: 1,
        NODE_DOCUMENT: 9,
        NODE_TEXT: 3,
        NODE_COMMENT: 8,
        NODE_DOCUMENT_FRAGMENT: 11,
        POSITION_IDENTICAL: 0,
        POSITION_DISCONNECTED: 1,
        POSITION_FOLLOWING: 2,
        POSITION_PRECEDING: 4,
        POSITION_IS_CONTAINED: 8,
        POSITION_CONTAINS: 16,
        fillChar: E && "6" == m.version ? "\ufeff" : "\u200b",
        keys: {
            8: 1,
            46: 1,
            16: 1,
            17: 1,
            18: 1,
            37: 1,
            38: 1,
            39: 1,
            40: 1,
            13: 1
        },
        breakParent: function(a, b) {
            var c, d = a, e = a, f, h;
            do {
                d = d.parentNode;
                f ? (c = d.cloneNode(!1),
                c.appendChild(f),
                f = c,
                c = d.cloneNode(!1),
                c.appendChild(h),
                h = c) : (f = d.cloneNode(!1),
                h = f.cloneNode(!1));
                for (; c = e.previousSibling; )
                    f.insertBefore(c, f.firstChild);
                for (; c = e.nextSibling; )
                    h.appendChild(c);
                e = d
            } while (b !== d);c = b.parentNode;
            c.insertBefore(f, b);
            c.insertBefore(h, b);
            c.insertBefore(a, h);
            k.remove(b);
            return a
        },
        trimWhiteTextNode: function(a) {
            function b(b) {
                for (var d; (d = a[b]) && 3 == d.nodeType && k.isWhitespace(d); )
                    a.removeChild(d)
            }
            b("firstChild");
            b("lastChild")
        },
        getPosition: function(a, b) {
            if (a === b)
                return 0;
            var c, d = [a], e = [b];
            for (c = a; c = c.parentNode; ) {
                if (c === b)
                    return 10;
                d.push(c)
            }
            for (c = b; c = c.parentNode; ) {
                if (c === a)
                    return 20;
                e.push(c)
            }
            d.reverse();
            e.reverse();
            if (d[0] !== e[0])
                return 1;
            for (c = -1; c++,
            d[c] === e[c]; )
                ;
            a = d[c];
            for (b = e[c]; a = a.nextSibling; )
                if (a === b)
                    return 4;
            return 2
        },
        getNodeIndex: function(a, b) {
            for (var c = a, d = 0; c = c.previousSibling; )
                b && 3 == c.nodeType ? c.nodeType != c.nextSibling.nodeType && d++ : d++;
            return d
        },
        inDoc: function(a, b) {
            return 10 == k.getPosition(a, b)
        },
        findParent: function(a, b, c) {
            if (a && !k.isBody(a))
                for (a = c ? a : a.parentNode; a; ) {
                    if (!b || b(a) || k.isBody(a))
                        return b && !b(a) && k.isBody(a) ? null : a;
                    a = a.parentNode
                }
            return null
        },
        findParentByTagName: function(a, b, c, d) {
            b = n.listToMap(n.isArray(b) ? b : [b]);
            return k.findParent(a, function(a) {
                return b[a.tagName] && !(d && d(a))
            }, c)
        },
        findParents: function(a, b, c, d) {
            for (b = b && (c && c(a) || !c) ? [a] : []; a = k.findParent(a, c); )
                b.push(a);
            return d ? b : b.reverse()
        },
        insertAfter: function(a, b) {
            return a.parentNode.insertBefore(b, a.nextSibling)
        },
        remove: function(a, b) {
            var c = a.parentNode, d;
            if (c) {
                if (b && a.hasChildNodes())
                    for (; d = a.firstChild; )
                        c.insertBefore(d, a);
                c.removeChild(a)
            }
            return a
        },
        getNextDomNode: function(a, b, c, d) {
            return H(a, "firstChild", "nextSibling", b, c, d)
        },
        getPreDomNode: function(a, b, c, d) {
            return H(a, "lastChild", "previousSibling", b, c, d)
        },
        isBookmarkNode: function(a) {
            return 1 == a.nodeType && a.id && /^_baidu_bookmark_/i.test(a.id)
        },
        getWindow: function(a) {
            a = a.ownerDocument || a;
            return a.defaultView || a.parentWindow
        },
        getCommonAncestor: function(a, b) {
            if (a === b)
                return a;
            for (var c = [a], d = [b], e = a, f = -1; e = e.parentNode; ) {
                if (e === b)
                    return e;
                c.push(e)
            }
            for (e = b; e = e.parentNode; ) {
                if (e === a)
                    return e;
                d.push(e)
            }
            c.reverse();
            for (d.reverse(); f++,
            c[f] === d[f]; )
                ;
            return 0 == f ? null : c[f - 1]
        },
        clearEmptySibling: function(a, b, c) {
            function d(a, b) {
                for (var d; a && !k.isBookmarkNode(a) && (k.isEmptyInlineElement(a) || !RegExp("[^\t\n\r" + k.fillChar + "]").test(a.nodeValue)); )
                    d = a[b],
                    k.remove(a),
                    a = d
            }
            !b && d(a.nextSibling, "nextSibling");
            !c && d(a.previousSibling, "previousSibling")
        },
        split: function(a, b) {
            var c = a.ownerDocument;
            if (m.ie && b == a.nodeValue.length) {
                var d = c.createTextNode("");
                return k.insertAfter(a, d)
            }
            d = a.splitText(b);
            m.ie8 && (c = c.createTextNode(""),
            k.insertAfter(d, c),
            k.remove(c));
            return d
        },
        isWhitespace: function(a) {
            return !RegExp("[^ \t\n\r" + k.fillChar + "]").test(a.nodeValue)
        },
        getXY: function(a) {
            for (var b = 0, c = 0; a.offsetParent; )
                c += a.offsetTop,
                b += a.offsetLeft,
                a = a.offsetParent;
            return {
                x: b,
                y: c
            }
        },
        isEmptyInlineElement: function(a) {
            if (1 != a.nodeType || !q.$removeEmpty[a.tagName])
                return 0;
            for (a = a.firstChild; a; ) {
                if (k.isBookmarkNode(a) || 1 == a.nodeType && !k.isEmptyInlineElement(a) || 3 == a.nodeType && !k.isWhitespace(a))
                    return 0;
                a = a.nextSibling
            }
            return 1
        },
        isBlockElm: function(a) {
            return 1 == a.nodeType && (q.$block[a.tagName] || K[k.getComputedStyle(a, "display")]) && !q.$nonChild[a.tagName]
        },
        getElementsByTagName: function(a, b, c) {
            if (c && n.isString(c)) {
                var d = c;
                c = function(a) {
                    var b = !1;
                    g.each(n.trim(d).replace(/[ ]{2,}/g, " ").split(" "), function(l, d) {
                        if (g(a).hasClass(d))
                            return b = !0,
                            !1
                    });
                    return b
                }
            }
            b = n.trim(b).replace(/[ ]{2,}/g, " ").split(" ");
            for (var e = [], f = 0, h; h = b[f++]; ) {
                h = a.getElementsByTagName(h);
                for (var l = 0, s; s = h[l++]; )
                    c && !c(s) || e.push(s)
            }
            return e
        },
        unSelectable: E && m.ie9below || m.opera ? function(a) {
            a.onselectstart = function() {
                return !1
            }
            ;
            a.onclick = a.onkeyup = a.onkeydown = function() {
                return !1
            }
            ;
            a.unselectable = "on";
            a.setAttribute("unselectable", "on");
            for (var b = 0, c; c = a.all[b++]; )
                switch (c.tagName.toLowerCase()) {
                case "iframe":
                case "textarea":
                case "input":
                case "select":
                    break;
                default:
                    c.unselectable = "on",
                    a.setAttribute("unselectable", "on")
                }
        }
        : function(a) {
            a.style.MozUserSelect = a.style.webkitUserSelect = a.style.msUserSelect = a.style.KhtmlUserSelect = "none"
        }
        ,
        removeAttributes: function(a, b) {
            b = n.isArray(b) ? b : n.trim(b).replace(/[ ]{2,}/g, " ").split(" ");
            for (var c = 0, d; d = b[c++]; ) {
                d = J[d] || d;
                switch (d) {
                case "className":
                    a[d] = "";
                    break;
                case "style":
                    a.style.cssText = "",
                    !m.ie && a.removeAttributeNode(a.getAttributeNode("style"))
                }
                a.removeAttribute(d)
            }
        },
        createElement: function(a, b, c) {
            return k.setAttributes(a.createElement(b), c)
        },
        setAttributes: function(a, b) {
            for (var c in b)
                if (b.hasOwnProperty(c)) {
                    var d = b[c];
                    switch (c) {
                    case "class":
                        a.className = d;
                        break;
                    case "style":
                        a.style.cssText = a.style.cssText + ";" + d;
                        break;
                    case "innerHTML":
                        a[c] = d;
                        break;
                    case "value":
                        a.value = d;
                        break;
                    default:
                        a.setAttribute(J[c] || c, d)
                    }
                }
            return a
        },
        getComputedStyle: function(a, b) {
            return n.transUnitToPx(n.fixColor(b, g(a).css(b)))
        },
        preventDefault: function(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        },
        removeStyle: function(a, b) {
            m.ie ? ("color" == b && (b = "(^|;)" + b),
            a.style.cssText = a.style.cssText.replace(RegExp(b + "[^:]*:[^;]+;?", "ig"), "")) : a.style.removeProperty ? a.style.removeProperty(b) : a.style.removeAttribute(n.cssStyleToDomStyle(b));
            a.style.cssText || k.removeAttributes(a, ["style"])
        },
        getStyle: function(a, b) {
            var c = a.style[n.cssStyleToDomStyle(b)];
            return n.fixColor(b, c)
        },
        setStyle: function(a, b, c) {
            a.style[n.cssStyleToDomStyle(b)] = c;
            n.trim(a.style.cssText) || this.removeAttributes(a, "style")
        },
        removeDirtyAttr: function(a) {
            for (var b = 0, c, d = a.getElementsByTagName("*"); c = d[b++]; )
                c.removeAttribute("_moz_dirty");
            a.removeAttribute("_moz_dirty")
        },
        getChildCount: function(a, b) {
            var c = 0
              , d = a.firstChild;
            for (b = b || function() {
                return 1
            }
            ; d; )
                b(d) && c++,
                d = d.nextSibling;
            return c
        },
        isEmptyNode: function(a) {
            return !a.firstChild || 0 == k.getChildCount(a, function(a) {
                return !k.isBr(a) && !k.isBookmarkNode(a) && !k.isWhitespace(a)
            })
        },
        isBr: function(a) {
            return 1 == a.nodeType && "BR" == a.tagName
        },
        isFillChar: function(a, b) {
            return 3 == a.nodeType && !a.nodeValue.replace(RegExp((b ? "^" : "") + k.fillChar), "").length
        },
        isEmptyBlock: function(a, b) {
            if (1 != a.nodeType)
                return 0;
            b = b || RegExp("[ \t\r\n" + k.fillChar + "]", "g");
            if (0 < a[m.ie ? "innerText" : "textContent"].replace(b, "").length)
                return 0;
            for (var c in q.$isNotEmpty)
                if (a.getElementsByTagName(c).length)
                    return 0;
            return 1
        },
        isCustomeNode: function(a) {
            return 1 == a.nodeType && a.getAttribute("_ue_custom_node_")
        },
        fillNode: function(a, b) {
            var c = m.ie ? a.createTextNode(k.fillChar) : a.createElement("br");
            b.innerHTML = "";
            b.appendChild(c)
        },
        isBoundaryNode: function(a, b) {
            for (var c; !k.isBody(a); )
                if (c = a,
                a = a.parentNode,
                c !== a[b])
                    return !1;
            return !0
        },
        isFillChar: function(a, b) {
            return 3 == a.nodeType && !a.nodeValue.replace(RegExp((b ? "^" : "") + k.fillChar), "").length
        },
        isBody: function(a) {
            return g(a).hasClass("edui-body-container")
        }
    }
      , F = RegExp(k.fillChar, "g");
    (function() {
        function a(a, b, d, c) {
            1 == b.nodeType && (q.$empty[b.tagName] || q.$nonChild[b.tagName]) && (d = k.getNodeIndex(b) + (a ? 0 : 1),
            b = b.parentNode);
            a ? (c.startContainer = b,
            c.startOffset = d,
            c.endContainer || c.collapse(!0)) : (c.endContainer = b,
            c.endOffset = d,
            c.startContainer || c.collapse(!1));
            c.collapsed = c.startContainer && c.endContainer && c.startContainer === c.endContainer && c.startOffset == c.endOffset;
            return c
        }
        function b(a, b) {
            try {
                if (f && k.inDoc(f, a))
                    if (f.nodeValue.replace(F, "").length)
                        f.nodeValue = f.nodeValue.replace(F, "");
                    else {
                        var d = f.parentNode;
                        for (k.remove(f); d && k.isEmptyInlineElement(d) && (m.safari ? !(k.getPosition(d, b) & k.POSITION_CONTAINS) : !d.contains(b)); )
                            f = d.parentNode,
                            k.remove(d),
                            d = f
                    }
            } catch (c) {}
        }
        function c(a, b) {
            var d;
            for (a = a[b]; a && k.isFillChar(a); )
                d = a[b],
                k.remove(a),
                a = d
        }
        var d = 0, e = k.fillChar, f, h = B.Range = function(a, b) {
            this.startContainer = this.startOffset = this.endContainer = this.endOffset = null;
            this.document = a;
            this.collapsed = !0;
            this.body = b
        }
        ;
        h.prototype = {
            deleteContents: function() {
                var a;
                if (!this.collapsed) {
                    a = this.startContainer;
                    var b = this.endContainer, d = this.startOffset, c = this.endOffset, h = this.document, e = h.createDocumentFragment(), f, g;
                    1 == a.nodeType && (a = a.childNodes[d] || (f = a.appendChild(h.createTextNode(""))));
                    1 == b.nodeType && (b = b.childNodes[c] || (g = b.appendChild(h.createTextNode(""))));
                    if (a === b && 3 == a.nodeType)
                        e.appendChild(h.createTextNode(a.substringData(d, c - d))),
                        a.deleteData(d, c - d),
                        this.collapse(!0);
                    else {
                        for (var t, n, x = e, q = k.findParents(a, !0), C = k.findParents(b, !0), z = 0; q[z] == C[z]; )
                            z++;
                        for (var A = z, D; D = q[A]; A++) {
                            t = D.nextSibling;
                            D == a ? f || (3 == this.startContainer.nodeType ? (x.appendChild(h.createTextNode(a.nodeValue.slice(d))),
                            a.deleteData(d, a.nodeValue.length - d)) : x.appendChild(a)) : (n = D.cloneNode(!1),
                            x.appendChild(n));
                            for (; t && t !== b && t !== C[A]; )
                                D = t.nextSibling,
                                x.appendChild(t),
                                t = D;
                            x = n
                        }
                        x = e;
                        q[z] || (x.appendChild(q[z - 1].cloneNode(!1)),
                        x = x.firstChild);
                        for (A = z; d = C[A]; A++) {
                            t = d.previousSibling;
                            d == b ? g || 3 != this.endContainer.nodeType || (x.appendChild(h.createTextNode(b.substringData(0, c))),
                            b.deleteData(0, c)) : (n = d.cloneNode(!1),
                            x.appendChild(n));
                            if (A != z || !q[z])
                                for (; t && t !== a; )
                                    d = t.previousSibling,
                                    x.insertBefore(t, x.firstChild),
                                    t = d;
                            x = n
                        }
                        this.setStartBefore(C[z] ? q[z] ? C[z] : q[z - 1] : C[z - 1]).collapse(!0);
                        f && k.remove(f);
                        g && k.remove(g)
                    }
                }
                m.webkit && (a = this.startContainer,
                3 != a.nodeType || a.nodeValue.length || (this.setStartBefore(a).collapse(!0),
                k.remove(a)));
                return this
            },
            inFillChar: function() {
                var a = this.startContainer;
                return this.collapsed && 3 == a.nodeType && a.nodeValue.replace(RegExp("^" + k.fillChar), "").length + 1 == a.nodeValue.length ? !0 : !1
            },
            setStart: function(b, d) {
                return a(!0, b, d, this)
            },
            setEnd: function(b, d) {
                return a(!1, b, d, this)
            },
            setStartAfter: function(a) {
                return this.setStart(a.parentNode, k.getNodeIndex(a) + 1)
            },
            setStartBefore: function(a) {
                return this.setStart(a.parentNode, k.getNodeIndex(a))
            },
            setEndAfter: function(a) {
                return this.setEnd(a.parentNode, k.getNodeIndex(a) + 1)
            },
            setEndBefore: function(a) {
                return this.setEnd(a.parentNode, k.getNodeIndex(a))
            },
            setStartAtFirst: function(a) {
                return this.setStart(a, 0)
            },
            setStartAtLast: function(a) {
                return this.setStart(a, 3 == a.nodeType ? a.nodeValue.length : a.childNodes.length)
            },
            setEndAtFirst: function(a) {
                return this.setEnd(a, 0)
            },
            setEndAtLast: function(a) {
                return this.setEnd(a, 3 == a.nodeType ? a.nodeValue.length : a.childNodes.length)
            },
            selectNode: function(a) {
                return this.setStartBefore(a).setEndAfter(a)
            },
            selectNodeContents: function(a) {
                return this.setStart(a, 0).setEndAtLast(a)
            },
            cloneRange: function() {
                return (new h(this.document)).setStart(this.startContainer, this.startOffset).setEnd(this.endContainer, this.endOffset)
            },
            collapse: function(a) {
                a ? (this.endContainer = this.startContainer,
                this.endOffset = this.startOffset) : (this.startContainer = this.endContainer,
                this.startOffset = this.endOffset);
                this.collapsed = !0;
                return this
            },
            shrinkBoundary: function(a) {
                function b(a) {
                    return 1 == a.nodeType && !k.isBookmarkNode(a) && !q.$empty[a.tagName] && !q.$nonChild[a.tagName]
                }
                for (var d, c = this.collapsed; 1 == this.startContainer.nodeType && (d = this.startContainer.childNodes[this.startOffset]) && b(d); )
                    this.setStart(d, 0);
                if (c)
                    return this.collapse(!0);
                if (!a)
                    for (; 1 == this.endContainer.nodeType && 0 < this.endOffset && (d = this.endContainer.childNodes[this.endOffset - 1]) && b(d); )
                        this.setEnd(d, d.childNodes.length);
                return this
            },
            trimBoundary: function(a) {
                this.txtToElmBoundary();
                var b = this.startContainer
                  , d = this.startOffset
                  , c = this.collapsed
                  , h = this.endContainer;
                if (3 == b.nodeType) {
                    if (0 == d)
                        this.setStartBefore(b);
                    else if (d >= b.nodeValue.length)
                        this.setStartAfter(b);
                    else {
                        var e = k.split(b, d);
                        b === h ? this.setEnd(e, this.endOffset - d) : b.parentNode === h && (this.endOffset += 1);
                        this.setStartBefore(e)
                    }
                    if (c)
                        return this.collapse(!0)
                }
                a || (d = this.endOffset,
                h = this.endContainer,
                3 == h.nodeType && (0 == d ? this.setEndBefore(h) : (d < h.nodeValue.length && k.split(h, d),
                this.setEndAfter(h))));
                return this
            },
            txtToElmBoundary: function(a) {
                function b(a, d) {
                    var l = a[d + "Container"]
                      , c = a[d + "Offset"];
                    if (3 == l.nodeType)
                        if (!c)
                            a["set" + d.replace(/(\w)/, function(a) {
                                return a.toUpperCase()
                            }) + "Before"](l);
                        else if (c >= l.nodeValue.length)
                            a["set" + d.replace(/(\w)/, function(a) {
                                return a.toUpperCase()
                            }) + "After"](l)
                }
                if (a || !this.collapsed)
                    b(this, "start"),
                    b(this, "end");
                return this
            },
            insertNode: function(a) {
                var b = a
                  , d = 1;
                11 == a.nodeType && (b = a.firstChild,
                d = a.childNodes.length);
                this.trimBoundary(!0);
                var c = this.startContainer
                  , h = c.childNodes[this.startOffset];
                h ? c.insertBefore(a, h) : c.appendChild(a);
                b.parentNode === this.endContainer && (this.endOffset += d);
                return this.setStartBefore(b)
            },
            setCursor: function(a, b) {
                return this.collapse(!a).select(b)
            },
            createBookmark: function(a, b) {
                var c, h = this.document.createElement("span");
                h.style.cssText = "display:none;line-height:0px;";
                h.appendChild(this.document.createTextNode("\u200d"));
                h.id = "_baidu_bookmark_start_" + (b ? "" : d++);
                this.collapsed || (c = h.cloneNode(!0),
                c.id = "_baidu_bookmark_end_" + (b ? "" : d++));
                this.insertNode(h);
                c && this.collapse().insertNode(c).setEndBefore(c);
                this.setStartAfter(h);
                return {
                    start: a ? h.id : h,
                    end: c ? a ? c.id : c : null,
                    id: a
                }
            },
            moveToBookmark: function(a) {
                var b = a.id ? this.document.getElementById(a.start) : a.start;
                a = a.end && a.id ? this.document.getElementById(a.end) : a.end;
                this.setStartBefore(b);
                k.remove(b);
                a ? (this.setEndBefore(a),
                k.remove(a)) : this.collapse(!0);
                return this
            },
            adjustmentBoundary: function() {
                if (!this.collapsed) {
                    for (; !k.isBody(this.startContainer) && this.startOffset == this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length && this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length; )
                        this.setStartAfter(this.startContainer);
                    for (; !k.isBody(this.endContainer) && !this.endOffset && this.endContainer[3 == this.endContainer.nodeType ? "nodeValue" : "childNodes"].length; )
                        this.setEndBefore(this.endContainer)
                }
                return this
            },
            getClosedNode: function() {
                var a;
                if (!this.collapsed) {
                    var b = this.cloneRange().adjustmentBoundary().shrinkBoundary();
                    b.collapsed || 1 != b.startContainer.nodeType || b.startContainer !== b.endContainer || 1 != b.endOffset - b.startOffset || (b = b.startContainer.childNodes[b.startOffset]) && 1 == b.nodeType && (q.$empty[b.tagName] || q.$nonChild[b.tagName]) && (a = b)
                }
                return a
            },
            select: m.ie ? function(a, d) {
                var h;
                this.collapsed || this.shrinkBoundary();
                var g = this.getClosedNode();
                if (g && !d) {
                    try {
                        h = this.document.body.createControlRange(),
                        h.addElement(g),
                        h.select()
                    } catch (y) {}
                    return this
                }
                var g = this.createBookmark()
                  , u = g.start;
                h = this.document.body.createTextRange();
                h.moveToElementText(u);
                h.moveStart("character", 1);
                if (!this.collapsed) {
                    var v = this.document.body.createTextRange()
                      , u = g.end;
                    v.moveToElementText(u);
                    h.setEndPoint("EndToEnd", v)
                } else if (!a && 3 != this.startContainer.nodeType) {
                    var v = this.document.createTextNode(e)
                      , w = this.document.createElement("span");
                    w.appendChild(this.document.createTextNode(e));
                    u.parentNode.insertBefore(w, u);
                    u.parentNode.insertBefore(v, u);
                    b(this.document, v);
                    f = v;
                    c(w, "previousSibling");
                    c(u, "nextSibling");
                    h.moveStart("character", -1);
                    h.collapse(!0)
                }
                this.moveToBookmark(g);
                w && k.remove(w);
                try {
                    h.select()
                } catch (t) {}
                return this
            }
            : function(a) {
                function d(a) {
                    function b(d, c, l) {
                        3 == d.nodeType && d.nodeValue.length < c && (a[l + "Offset"] = d.nodeValue.length)
                    }
                    b(a.startContainer, a.startOffset, "start");
                    b(a.endContainer, a.endOffset, "end")
                }
                var h = k.getWindow(this.document)
                  , g = h.getSelection();
                m.gecko ? this.body.focus() : h.focus();
                if (g) {
                    g.removeAllRanges();
                    this.collapsed && !a && (a = h = this.startContainer,
                    1 == h.nodeType && (a = h.childNodes[this.startOffset]),
                    3 == h.nodeType && this.startOffset || (a ? a.previousSibling && 3 == a.previousSibling.nodeType : h.lastChild && 3 == h.lastChild.nodeType) || (a = this.document.createTextNode(e),
                    this.insertNode(a),
                    b(this.document, a),
                    c(a, "previousSibling"),
                    c(a, "nextSibling"),
                    f = a,
                    this.setStart(a, m.webkit ? 1 : 0).collapse(!0)));
                    h = this.document.createRange();
                    if (this.collapsed && m.opera && 1 == this.startContainer.nodeType)
                        if (a = this.startContainer.childNodes[this.startOffset]) {
                            for (; a && k.isBlockElm(a); )
                                if (1 == a.nodeType && a.childNodes[0])
                                    a = a.childNodes[0];
                                else
                                    break;
                            a && this.setStartBefore(a).collapse(!0)
                        } else
                            (a = this.startContainer.lastChild) && k.isBr(a) && this.setStartBefore(a).collapse(!0);
                    d(this);
                    h.setStart(this.startContainer, this.startOffset);
                    h.setEnd(this.endContainer, this.endOffset);
                    g.addRange(h)
                }
                return this
            }
            ,
            createAddress: function(a, b) {
                function d(a) {
                    for (var c = a ? h.startContainer : h.endContainer, l = k.findParents(c, !0, function(a) {
                        return !k.isBody(a)
                    }), e = [], f = 0, p; p = l[f++]; )
                        e.push(k.getNodeIndex(p, b));
                    l = 0;
                    if (b)
                        if (3 == c.nodeType) {
                            for (c = c.previousSibling; c && 3 == c.nodeType; )
                                l += c.nodeValue.replace(F, "").length,
                                c = c.previousSibling;
                            l += a ? h.startOffset : h.endOffset
                        } else if (c = c.childNodes[a ? h.startOffset : h.endOffset])
                            l = k.getNodeIndex(c, b);
                        else
                            for (c = a ? h.startContainer : h.endContainer,
                            a = c.firstChild; a; )
                                if (k.isFillChar(a))
                                    a = a.nextSibling;
                                else if (l++,
                                3 == a.nodeType)
                                    for (; a && 3 == a.nodeType; )
                                        a = a.nextSibling;
                                else
                                    a = a.nextSibling;
                    else
                        l = a ? k.isFillChar(c) ? 0 : h.startOffset : h.endOffset;
                    0 > l && (l = 0);
                    e.push(l);
                    return e
                }
                var c = {}
                  , h = this;
                c.startAddress = d(!0);
                a || (c.endAddress = h.collapsed ? [].concat(c.startAddress) : d());
                return c
            },
            moveToAddress: function(a, b) {
                function d(a, b) {
                    for (var l = c.body, h, e, f = 0, s, p = a.length; f < p; f++)
                        if (s = a[f],
                        h = l,
                        l = l.childNodes[s],
                        !l) {
                            e = s;
                            break
                        }
                    b ? l ? c.setStartBefore(l) : c.setStart(h, e) : l ? c.setEndBefore(l) : c.setEnd(h, e)
                }
                var c = this;
                d(a.startAddress, !0);
                !b && a.endAddress && d(a.endAddress);
                return c
            },
            equals: function(a) {
                for (var b in this)
                    if (this.hasOwnProperty(b) && this[b] !== a[b])
                        return !1;
                return !0
            },
            scrollIntoView: function() {
                var a = g('<span style="padding:0;margin:0;display:block;border:0">&nbsp;</span>');
                this.cloneRange().insertNode(a.get(0));
                var b = g(window).scrollTop()
                  , d = g(window).height()
                  , c = a.offset().top;
                if (c < b - d || c > b + d)
                    c > b + d ? window.scrollTo(0, c - d + a.height()) : window.scrollTo(0, b - c);
                a.remove()
            },
            getOffset: function() {
                var a = this.createBookmark()
                  , b = g(a.start).css("display", "inline-block").offset();
                this.moveToBookmark(a);
                return b
            }
        }
    }
    )();
    (function() {
        function a(a, b) {
            var c = k.getNodeIndex;
            a = a.duplicate();
            a.collapse(b);
            var h = a.parentElement();
            if (!h.hasChildNodes())
                return {
                    container: h,
                    offset: 0
                };
            for (var l = h.children, s, p = a.duplicate(), g = 0, y = l.length - 1, u = -1; g <= y; ) {
                u = Math.floor((g + y) / 2);
                s = l[u];
                p.moveToElementText(s);
                var v = p.compareEndPoints("StartToStart", a);
                if (0 < v)
                    y = u - 1;
                else if (0 > v)
                    g = u + 1;
                else
                    return {
                        container: h,
                        offset: c(s)
                    }
            }
            if (-1 == u) {
                p.moveToElementText(h);
                p.setEndPoint("StartToStart", a);
                p = p.text.replace(/(\r\n|\r)/g, "\n").length;
                l = h.childNodes;
                if (!p)
                    return s = l[l.length - 1],
                    {
                        container: s,
                        offset: s.nodeValue.length
                    };
                for (c = l.length; 0 < p; )
                    p -= l[--c].nodeValue.length;
                return {
                    container: l[c],
                    offset: -p
                }
            }
            p.collapse(0 < v);
            p.setEndPoint(0 < v ? "StartToStart" : "EndToStart", a);
            p = p.text.replace(/(\r\n|\r)/g, "\n").length;
            if (!p)
                return q.$empty[s.tagName] || q.$nonChild[s.tagName] ? {
                    container: h,
                    offset: c(s) + (0 < v ? 0 : 1)
                } : {
                    container: s,
                    offset: 0 < v ? 0 : s.childNodes.length
                };
            for (; 0 < p; )
                try {
                    l = s,
                    s = s[0 < v ? "previousSibling" : "nextSibling"],
                    p -= s.nodeValue.length
                } catch (w) {
                    return {
                        container: h,
                        offset: c(l)
                    }
                }
            return {
                container: s,
                offset: 0 < v ? -p : s.nodeValue.length + p
            }
        }
        function b(b, c) {
            if (b.item)
                c.selectNode(b.item(0));
            else {
                var f = a(b, !0);
                c.setStart(f.container, f.offset);
                0 != b.compareEndPoints("StartToEnd", b) && (f = a(b, !1),
                c.setEnd(f.container, f.offset))
            }
            return c
        }
        function c(a, b) {
            var c;
            try {
                c = a.getNative(b).createRange()
            } catch (h) {
                return null
            }
            var l = c.item ? c.item(0) : c.parentElement();
            return (l.ownerDocument || l) === a.document ? c : null
        }
        (B.Selection = function(a, b) {
            var f = this;
            f.document = a;
            f.body = b;
            if (m.ie9below)
                g(b).on("beforedeactivate", function() {
                    f._bakIERange = f.getIERange()
                }).on("activate", function() {
                    try {
                        var a = c(f);
                        a && f.rangeInBody(a) || !f._bakIERange || f._bakIERange.select()
                    } catch (b) {}
                    f._bakIERange = null
                })
        }
        ).prototype = {
            hasNativeRange: function() {
                var a;
                if (!m.ie || m.ie9above) {
                    a = this.getNative();
                    if (!a.rangeCount)
                        return !1;
                    a = a.getRangeAt(0)
                } else
                    a = c(this);
                return this.rangeInBody(a)
            },
            getNative: function(a) {
                var b = this.document;
                try {
                    return b ? m.ie9below || a ? b.selection : k.getWindow(b).getSelection() : null
                } catch (c) {
                    return null
                }
            },
            getIERange: function(a) {
                var b = c(this, a);
                return b && this.rangeInBody(b, a) || !this._bakIERange ? b : this._bakIERange
            },
            rangeInBody: function(a, b) {
                var c = m.ie9below || b ? a.item ? a.item() : a.parentElement() : a.startContainer;
                return c === this.body || k.inDoc(c, this.body)
            },
            cache: function() {
                this.clear();
                this._cachedRange = this.getRange();
                this._cachedStartElement = this.getStart();
                this._cachedStartElementPath = this.getStartElementPath()
            },
            getStartElementPath: function() {
                if (this._cachedStartElementPath)
                    return this._cachedStartElementPath;
                var a = this.getStart();
                return a ? k.findParents(a, !0, null, !0) : []
            },
            clear: function() {
                this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null
            },
            isFocus: function() {
                return this.hasNativeRange()
            },
            getRange: function() {
                function a(b) {
                    for (var d = c.body.firstChild, l = b.collapsed; d && d.firstChild; )
                        b.setStart(d, 0),
                        d = d.firstChild;
                    b.startContainer || b.setStart(c.body, 0);
                    l && b.collapse(!0)
                }
                var c = this;
                if (null != c._cachedRange)
                    return this._cachedRange;
                var f = new B.Range(c.document,c.body);
                if (m.ie9below) {
                    var h = c.getIERange();
                    if (h && this.rangeInBody(h))
                        try {
                            b(h, f)
                        } catch (l) {
                            a(f)
                        }
                    else
                        a(f)
                } else {
                    var s = c.getNative();
                    if (s && s.rangeCount && c.rangeInBody(s.getRangeAt(0)))
                        h = s.getRangeAt(0),
                        s = s.getRangeAt(s.rangeCount - 1),
                        f.setStart(h.startContainer, h.startOffset).setEnd(s.endContainer, s.endOffset),
                        f.collapsed && k.isBody(f.startContainer) && !f.startOffset && a(f);
                    else {
                        if (this._bakRange && (this._bakRange.startContainer === this.body || k.inDoc(this._bakRange.startContainer, this.body)))
                            return this._bakRange;
                        a(f)
                    }
                }
                return this._bakRange = f
            },
            getStart: function() {
                if (this._cachedStartElement)
                    return this._cachedStartElement;
                var a = m.ie9below ? this.getIERange() : this.getRange(), b, c;
                if (m.ie9below) {
                    if (!a)
                        return this.document.body.firstChild;
                    if (a.item)
                        return a.item(0);
                    b = a.duplicate();
                    0 < b.text.length && b.moveStart("character", 1);
                    b.collapse(1);
                    b = b.parentElement();
                    for (c = a = a.parentElement(); a = a.parentNode; )
                        if (a == b) {
                            b = c;
                            break
                        }
                } else if (b = a.startContainer,
                1 == b.nodeType && b.hasChildNodes() && (b = b.childNodes[Math.min(b.childNodes.length - 1, a.startOffset)]),
                3 == b.nodeType)
                    return b.parentNode;
                return b
            },
            getText: function() {
                var a;
                return this.isFocus() && (a = this.getNative()) ? (a = m.ie9below ? a.createRange() : a.getRangeAt(0),
                m.ie9below ? a.text : a.toString()) : ""
            }
        }
    }
    )();
    (function() {
        function a(a, b) {
            var c;
            if (b.textarea)
                if (n.isString(b.textarea))
                    for (var d = 0, e, f = k.getElementsByTagName(a, "textarea"); e = f[d++]; ) {
                        if (e.id == "umeditor_textarea_" + b.options.textarea) {
                            c = e;
                            break
                        }
                    }
                else
                    c = b.textarea;
            c || (a.appendChild(c = k.createElement(document, "textarea", {
                name: b.options.textarea,
                id: "umeditor_textarea_" + b.options.textarea,
                style: "display:none"
            })),
            b.textarea = c);
            c.value = b.hasContents() ? b.options.allHtmlEnabled ? b.getAllHtml() : b.getContent(null, null, !0) : ""
        }
        function b(a) {
            for (var b in UM.plugins)
                -1 == a.options.excludePlugins.indexOf(b) && (UM.plugins[b].call(a),
                a.plugins[b] = 1);
            a.langIsReady = !0;
            a.fireEvent("langReady")
        }
        function c(a) {
            for (var b in a)
                return b
        }
        var d = 0, e, f = UM.Editor = function(a) {
            var l = this;
            l.uid = d++;
            I.call(l);
            l.commands = {};
            l.options = n.extend(n.clone(a || {}), UMEDITOR_CONFIG, !0);
            l.shortcutkeys = {};
            l.inputRules = [];
            l.outputRules = [];
            l.setOpt({
                isShow: !0,
                initialContent: "",
                initialStyle: "",
                autoClearinitialContent: !1,
                textarea: "editorValue",
                focus: !1,
                focusInEnd: !0,
                autoClearEmptyNode: !0,
                fullscreen: !1,
                readonly: !1,
                zIndex: 999,
                enterTag: "p",
                lang: "zh-cn",
                langPath: l.options.UMEDITOR_HOME_URL + "lang/",
                theme: "default",
                themePath: l.options.UMEDITOR_HOME_URL + "themes/",
                allHtmlEnabled: !1,
                autoSyncData: !0,
                autoHeightEnabled: !0,
                excludePlugins: ""
            });
            l.plugins = {};
            n.isEmptyObject(UM.I18N) ? n.loadFile(document, {
                src: l.options.langPath + l.options.lang + "/" + l.options.lang + ".js",
                tag: "script",
                type: "text/javascript",
                defer: "defer"
            }, function() {
                b(l)
            }) : (l.options.lang = c(UM.I18N),
            b(l))
        }
        ;
        f.prototype = {
            ready: function(a) {
                a && (this.isReady ? a.apply(this) : this.addListener("ready", a))
            },
            setOpt: function(a, b) {
                var c = {};
                n.isString(a) ? c[a] = b : c = a;
                n.extend(this.options, c, !0)
            },
            getOpt: function(a) {
                return this.options[a] || ""
            },
            destroy: function() {
                this.fireEvent("destroy");
                var a = this.container.parentNode;
                a === document.body && (a = this.container);
                var b = this.textarea;
                b ? b.style.display = "" : (b = document.createElement("textarea"),
                a.parentNode.insertBefore(b, a));
                b.style.width = this.body.offsetWidth + "px";
                b.style.height = this.body.offsetHeight + "px";
                b.value = this.getContent();
                b.id = this.key;
                a.contains(b) && g(b).insertBefore(a);
                a.innerHTML = "";
                k.remove(a);
                UM.clearCache(this.id);
                for (var c in this)
                    this.hasOwnProperty(c) && delete this[c]
            },
            initialCont: function(a) {
                if (a) {
                    a.getAttribute("name") && (this.options.textarea = a.getAttribute("name"));
                    if (a && /script|textarea/ig.test(a.tagName)) {
                        var b = document.createElement("div");
                        a.parentNode.insertBefore(b, a);
                        this.options.initialContent = UM.htmlparser(a.value || a.innerHTML || this.options.initialContent).toHtml();
                        a.className && (b.className = a.className);
                        a.style.cssText && (b.style.cssText = a.style.cssText);
                        /textarea/i.test(a.tagName) ? (this.textarea = a,
                        this.textarea.style.display = "none") : (a.parentNode.removeChild(a),
                        a.id && (b.id = a.id));
                        a = b;
                        a.innerHTML = ""
                    }
                    return a
                }
                return null
            },
            render: function(a) {
                var b = this.options
                  , c = function(b) {
                    return parseInt(g(a).css(b))
                };
                n.isString(a) && (a = document.getElementById(a));
                a && (this.id = a.getAttribute("id"),
                UM.setEditor(this),
                n.cssRule("edui-style-body", this.options.initialStyle, document),
                a = this.initialCont(a),
                a.className += " edui-body-container",
                b.minFrameWidth = b.initialFrameWidth ? b.initialFrameWidth : b.initialFrameWidth = g(a).width() || UM.defaultWidth,
                b.initialFrameHeight ? b.minFrameHeight = b.initialFrameHeight : b.initialFrameHeight = b.minFrameHeight = g(a).height() || UM.defaultHeight,
                a.style.width = /%$/.test(b.initialFrameWidth) ? "100%" : b.initialFrameWidth - c("padding-left") - c("padding-right") + "px",
                c = /%$/.test(b.initialFrameHeight) ? "100%" : b.initialFrameHeight - c("padding-top") - c("padding-bottom"),
                this.options.autoHeightEnabled ? (a.style.minHeight = c + "px",
                a.style.height = "",
                m.ie && 6 >= m.version && (a.style.height = c,
                a.style.setExpression("height", "this.scrollHeight <= " + c + ' ? "' + c + 'px" : "auto"'))) : g(a).height(c),
                a.style.zIndex = b.zIndex,
                this._setup(a))
            },
            _setup: function(b) {
                var c = this
                  , d = c.options;
                b.contentEditable = !0;
                document.body.spellcheck = !1;
                c.document = document;
                c.window = document.defaultView || document.parentWindow;
                c.body = b;
                c.$body = g(b);
                c.selection = new B.Selection(document,c.body);
                c._isEnabled = !1;
                var e;
                m.gecko && (e = this.selection.getNative()) && e.removeAllRanges();
                this._initEvents();
                for (var f = b.parentNode; f && !k.isBody(f); f = f.parentNode)
                    if ("FORM" == f.tagName) {
                        c.form = f;
                        if (c.options.autoSyncData)
                            g(b).on("blur", function() {
                                a(f, c)
                            });
                        else
                            g(f).on("submit", function() {
                                a(this, c)
                            });
                        break
                    }
                if (d.initialContent)
                    if (d.autoClearinitialContent) {
                        var y = c.execCommand;
                        c.execCommand = function() {
                            c.fireEvent("firstBeforeExecCommand");
                            return y.apply(c, arguments)
                        }
                        ;
                        this._setDefaultContent(d.initialContent)
                    } else
                        this.setContent(d.initialContent, !1, !0);
                k.isEmptyNode(c.body) && (c.body.innerHTML = "<p>" + (m.ie ? "" : "<br/>") + "</p>");
                d.focus && setTimeout(function() {
                    c.focus(c.options.focusInEnd);
                    !c.options.autoClearinitialContent && c._selectionChange()
                }, 0);
                c.container || (c.container = b.parentNode);
                c._bindshortcutKeys();
                c.isReady = 1;
                c.fireEvent("ready");
                d.onready && d.onready.call(c);
                if (!m.ie || m.ie9above)
                    g(c.body).on("blur focus", function(a) {
                        var b = c.selection.getNative();
                        if ("blur" == a.type)
                            0 < b.rangeCount && (c._bakRange = b.getRangeAt(0));
                        else {
                            try {
                                c._bakRange && b.addRange(c._bakRange)
                            } catch (d) {}
                            c._bakRange = null
                        }
                    });
                !d.isShow && c.setHide();
                d.readonly && c.setDisabled()
            },
            sync: function(b) {
                (b = b ? document.getElementById(b) : k.findParent(this.body.parentNode, function(a) {
                    return "FORM" == a.tagName
                }, !0)) && a(b, this)
            },
            setHeight: function(a, b) {
                !b && (this.options.initialFrameHeight = a);
                this.options.autoHeightEnabled ? (g(this.body).css({
                    "min-height": a + "px"
                }),
                m.ie && 6 >= m.version && this.container && (this.container.style.height = a,
                this.container.style.setExpression("height", "this.scrollHeight <= " + a + ' ? "' + a + 'px" : "auto"'))) : g(this.body).height(a);
                this.fireEvent("resize")
            },
            setWidth: function(a) {
                this.$container && this.$container.width(a);
                g(this.body).width(a - 1 * g(this.body).css("padding-left").replace("px", "") - 1 * g(this.body).css("padding-right").replace("px", ""));
                this.fireEvent("resize")
            },
            addshortcutkey: function(a, b) {
                var c = {};
                b ? c[a] = b : c = a;
                n.extend(this.shortcutkeys, c)
            },
            _bindshortcutKeys: function() {
                var a = this
                  , b = this.shortcutkeys;
                a.addListener("keydown", function(c, d) {
                    var e = d.keyCode || d.which, f;
                    for (f in b)
                        for (var u = b[f].split(","), g = 0, w; w = u[g++]; ) {
                            w = w.split(":");
                            var t = w[0];
                            w = w[1];
                            if (/^(ctrl)(\+shift)?\+(\d+)$/.test(t.toLowerCase()) || /^(\d+)$/.test(t))
                                if ("ctrl" == RegExp.$1 && (d.ctrlKey || d.metaKey) && ("" != RegExp.$2 ? d[RegExp.$2.slice(1) + "Key"] : 1) && e == RegExp.$3 || e == RegExp.$1)
                                    -1 != a.queryCommandState(f, w) && a.execCommand(f, w),
                                    k.preventDefault(d)
                        }
                })
            },
            getContent: function(a, b, c, d, e) {
                a && n.isFunction(a) && (b = a);
                if (b ? !b() : !this.hasContents())
                    return "";
                this.fireEvent("beforegetcontent");
                a = UM.htmlparser(this.body.innerHTML, d);
                this.filterOutputRule(a);
                this.fireEvent("aftergetcontent", a);
                return a.toHtml(e)
            },
            getAllHtml: function() {
                var a = [];
                this.fireEvent("getAllHtml", a);
                if (m.ie && 8 < m.version) {
                    var b = "";
                    n.each(this.document.styleSheets, function(a) {
                        b += a.href ? '<link rel="stylesheet" type="text/css" href="' + a.href + '" />' : "<style>" + a.cssText + "</style>"
                    });
                    n.each(this.document.getElementsByTagName("script"), function(a) {
                        b += a.outerHTML
                    })
                }
                return "<html><head>" + (this.options.charset ? '<meta http-equiv="Content-Type" content="text/html; charset=' + this.options.charset + '"/>' : "") + (b || this.document.getElementsByTagName("head")[0].innerHTML) + a.join("\n") + "</head><body " + (E && 9 > m.version ? 'class="view"' : "") + ">" + this.getContent(null, null, !0) + "</body></html>"
            },
            getPlainTxt: function() {
                var a = RegExp(k.fillChar, "g")
                  , b = this.body.innerHTML.replace(/[\n\r]/g, "")
                  , b = b.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, "\n").replace(/<br\/?>/gi, "\n").replace(/<[^>/]+>/g, "").replace(/(\n)?<\/([^>]+)>/g, function(a, b, c) {
                    return q.$block[c] ? "\n" : b ? b : ""
                });
                return b.replace(a, "").replace(/\u00a0/g, " ").replace(/&nbsp;/g, " ")
            },
            getContentTxt: function() {
                return this.body[m.ie ? "innerText" : "textContent"].replace(RegExp(k.fillChar, "g"), "").replace(/\u00a0/g, " ")
            },
            setContent: function(b, c, d) {
                this.fireEvent("beforesetcontent", b);
                b = UM.htmlparser(b);
                this.filterInputRule(b);
                b = b.toHtml();
                this.body.innerHTML = (c ? this.body.innerHTML : "") + b;
                if ("p" == this.options.enterTag)
                    if (c = this.body.firstChild,
                    !c || 1 == c.nodeType && (q.$cdata[c.tagName] || "DIV" == c.tagName && c.getAttribute("cdata_tag") || k.isCustomeNode(c)) && c === this.body.lastChild)
                        this.body.innerHTML = "<p>" + (m.ie ? "&nbsp;" : "<br/>") + "</p>" + this.body.innerHTML;
                    else
                        for (var e = this.document.createElement("p"); c; ) {
                            for (; c && (3 == c.nodeType || 1 == c.nodeType && q.p[c.tagName] && !q.$cdata[c.tagName]); )
                                b = c.nextSibling,
                                e.appendChild(c),
                                c = b;
                            if (e.firstChild)
                                if (c)
                                    c.parentNode.insertBefore(e, c),
                                    e = this.document.createElement("p");
                                else {
                                    this.body.appendChild(e);
                                    break
                                }
                            c = c.nextSibling
                        }
                this.fireEvent("aftersetcontent");
                this.fireEvent("contentchange");
                !d && this._selectionChange();
                this._bakRange = this._bakIERange = this._bakNativeRange = null;
                var f;
                m.gecko && (f = this.selection.getNative()) && f.removeAllRanges();
                this.options.autoSyncData && this.form && a(this.form, this)
            },
            focus: function(a) {
                try {
                    var b = this.selection.getRange();
                    a ? b.setStartAtLast(this.body.lastChild).setCursor(!1, !0) : b.select(!0);
                    this.fireEvent("focus")
                } catch (c) {}
            },
            blur: function() {
                var a = this.selection.getNative();
                a.empty ? a.empty() : a.removeAllRanges();
                this.fireEvent("blur")
            },
            isFocus: function() {
                return !0 === this.fireEvent("isfocus") ? !0 : this.selection.isFocus()
            },
            _initEvents: function() {
                var a = this
                  , b = function() {
                    a._proxyDomEvent.apply(a, arguments)
                };
                g(a.body).on("click contextmenu mousedown keydown keyup keypress mouseup mouseover mouseout selectstart", b).on("focus blur", b).on("mouseup keydown", function(b) {
                    "keydown" == b.type && (b.ctrlKey || b.metaKey || b.shiftKey || b.altKey) || 2 != b.button && a._selectionChange(250, b)
                })
            },
            _proxyDomEvent: function(a) {
                return this.fireEvent(a.type.replace(/^on/, ""), a)
            },
            _selectionChange: function(a, b) {
                var c = this, d = !1, f, g;
                m.ie && 9 > m.version && b && "mouseup" == b.type && !this.selection.getRange().collapsed && (d = !0,
                f = b.clientX,
                g = b.clientY);
                clearTimeout(e);
                e = setTimeout(function() {
                    if (c.selection.getNative()) {
                        var a;
                        if (d && "None" == c.selection.getNative().type) {
                            a = c.document.body.createTextRange();
                            try {
                                a.moveToPoint(f, g)
                            } catch (e) {
                                a = null
                            }
                        }
                        var h;
                        a && (h = c.selection.getIERange,
                        c.selection.getIERange = function() {
                            return a
                        }
                        );
                        c.selection.cache();
                        h && (c.selection.getIERange = h);
                        c.selection._cachedRange && c.selection._cachedStartElement && (c.fireEvent("beforeselectionchange"),
                        c.fireEvent("selectionchange", !!b),
                        c.fireEvent("afterselectionchange"),
                        c.selection.clear())
                    }
                }, a || 50)
            },
            _callCmdFn: function(a, b) {
                b = Array.prototype.slice.call(b, 0);
                var c = b.shift().toLowerCase(), d, e;
                e = (d = this.commands[c] || UM.commands[c]) && d[a];
                if (!(d && e || "queryCommandState" != a))
                    return 0;
                if (e)
                    return e.apply(this, [c].concat(b))
            },
            execCommand: function(a) {
                if (!this.isFocus()) {
                    var b = this.selection._bakRange;
                    b ? b.select() : this.focus(!0)
                }
                a = a.toLowerCase();
                var c, b = this.commands[a] || UM.commands[a];
                if (!b || !b.execCommand)
                    return null;
                b.notNeedUndo || this.__hasEnterExecCommand ? (c = this._callCmdFn("execCommand", arguments),
                this.__hasEnterExecCommand || b.ignoreContentChange || this._ignoreContentChange || this.fireEvent("contentchange")) : (this.__hasEnterExecCommand = !0,
                -1 != this.queryCommandState.apply(this, arguments) && (this.fireEvent("saveScene"),
                this.fireEvent("beforeexeccommand", a),
                c = this._callCmdFn("execCommand", arguments),
                b.ignoreContentChange || this._ignoreContentChange || this.fireEvent("contentchange"),
                this.fireEvent("afterexeccommand", a),
                this.fireEvent("saveScene")),
                this.__hasEnterExecCommand = !1);
                this.__hasEnterExecCommand || b.ignoreContentChange || this._ignoreContentChange || this._selectionChange();
                return c
            },
            queryCommandState: function(a) {
                try {
                    return this._callCmdFn("queryCommandState", arguments)
                } catch (b) {
                    return 0
                }
            },
            queryCommandValue: function(a) {
                try {
                    return this._callCmdFn("queryCommandValue", arguments)
                } catch (b) {
                    return null
                }
            },
            hasContents: function(a) {
                if (a)
                    for (var b = 0, c; c = a[b++]; )
                        if (0 < this.body.getElementsByTagName(c).length)
                            return !0;
                if (!k.isEmptyBlock(this.body))
                    return !0;
                a = ["div"];
                for (b = 0; c = a[b++]; ) {
                    c = k.getElementsByTagName(this.body, c);
                    for (var d = 0, e; e = c[d++]; )
                        if (k.isCustomeNode(e))
                            return !0
                }
                return !1
            },
            reset: function() {
                this.fireEvent("reset")
            },
            isEnabled: function() {
                return !0 != this._isEnabled
            },
            setEnabled: function() {
                var a;
                this.body.contentEditable = !0;
                if (this.lastBk) {
                    a = this.selection.getRange();
                    try {
                        a.moveToBookmark(this.lastBk),
                        delete this.lastBk
                    } catch (b) {
                        a.setStartAtFirst(this.body).collapse(!0)
                    }
                    a.select(!0)
                }
                this.bkqueryCommandState && (this.queryCommandState = this.bkqueryCommandState,
                delete this.bkqueryCommandState);
                this._bkproxyDomEvent && (this._proxyDomEvent = this._bkproxyDomEvent,
                delete this._bkproxyDomEvent);
                this.fireEvent("setEnabled")
            },
            enable: function() {
                return this.setEnabled()
            },
            setDisabled: function(a, b) {
                var c = this;
                c.body.contentEditable = !1;
                c._except = a ? n.isArray(a) ? a : [a] : [];
                c.lastBk || (c.lastBk = c.selection.getRange().createBookmark(!0));
                c.bkqueryCommandState || (c.bkqueryCommandState = c.queryCommandState,
                c.queryCommandState = function(a) {
                    return -1 != n.indexOf(c._except, a) ? c.bkqueryCommandState.apply(c, arguments) : -1
                }
                );
                b || c._bkproxyDomEvent || (c._bkproxyDomEvent = c._proxyDomEvent,
                c._proxyDomEvent = function() {
                    return !1
                }
                );
                c.fireEvent("selectionchange");
                c.fireEvent("setDisabled", c._except)
            },
            disable: function(a) {
                return this.setDisabled(a)
            },
            _setDefaultContent: function() {
                function a() {
                    var b = this;
                    b.document.getElementById("initContent") && (b.body.innerHTML = "<p>" + (E ? "" : "<br/>") + "</p>",
                    b.removeListener("firstBeforeExecCommand focus", a),
                    setTimeout(function() {
                        b.focus();
                        b._selectionChange()
                    }, 0))
                }
                return function(b) {
                    this.body.innerHTML = '<p id="initContent">' + b + "</p>";
                    this.addListener("firstBeforeExecCommand focus", a)
                }
            }(),
            setShow: function() {
                var a = this.selection.getRange();
                if ("none" == this.container.style.display) {
                    try {
                        a.moveToBookmark(this.lastBk),
                        delete this.lastBk
                    } catch (b) {
                        a.setStartAtFirst(this.body).collapse(!0)
                    }
                    setTimeout(function() {
                        a.select(!0)
                    }, 100);
                    this.container.style.display = ""
                }
            },
            show: function() {
                return this.setShow()
            },
            setHide: function() {
                this.lastBk || (this.lastBk = this.selection.getRange().createBookmark(!0));
                this.container.style.display = "none"
            },
            hide: function() {
                return this.setHide()
            },
            getLang: function(a) {
                var b = UM.I18N[this.options.lang];
                if (!b)
                    throw Error("not import language file");
                a = (a || "").split(".");
                for (var c = 0, d; (d = a[c++]) && (b = b[d],
                b); )
                    ;
                return b
            },
            getContentLength: function(a, b) {
                var c = this.getContent(!1, !1, !0).length;
                if (a) {
                    b = (b || []).concat(["hr", "img", "iframe"]);
                    for (var c = this.getContentTxt().replace(/[\t\r\n]+/g, "").length, d = 0, e; e = b[d++]; )
                        c += this.body.getElementsByTagName(e).length
                }
                return c
            },
            addInputRule: function(a, b) {
                a.ignoreUndo = b;
                this.inputRules.push(a)
            },
            filterInputRule: function(a, b) {
                for (var c = 0, d; d = this.inputRules[c++]; )
                    b && d.ignoreUndo || d.call(this, a)
            },
            addOutputRule: function(a, b) {
                a.ignoreUndo = b;
                this.outputRules.push(a)
            },
            filterOutputRule: function(a, b) {
                for (var c = 0, d; d = this.outputRules[c++]; )
                    b && d.ignoreUndo || d.call(this, a)
            }
        };
        n.inherits(f, I)
    }
    )();
    UM.filterWord = function() {
        function a(a) {
            return a = a.replace(/[\d.]+\w+/g, function(a) {
                return n.transUnitToPx(a)
            })
        }
        function b(b) {
            return b.replace(/[\t\r\n]+/g, " ").replace(/\x3c!--[\s\S]*?--\x3e/ig, "").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi, function(b) {
                if (m.opera)
                    return "";
                try {
                    if (/Bitmap/i.test(b))
                        return "";
                    var c = b.match(/width:([ \d.]*p[tx])/i)[1]
                      , f = b.match(/height:([ \d.]*p[tx])/i)[1]
                      , h = b.match(/src=\s*"([^"]*)"/i)[1];
                    return '<img width="' + a(c) + '" height="' + a(f) + '" src="' + h + '" />'
                } catch (l) {
                    return ""
                }
            }).replace(/<\/?div[^>]*>/g, "").replace(/v:\w+=(["']?)[^'"]+\1/g, "").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>").replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/ig, function(a, b, c, h) {
                return "class" == b && "MsoListParagraph" == h ? a : ""
            }).replace(/<(font|span)[^>]*>(\s*)<\/\1>/gi, function(a, b, c) {
                return c.replace(/[\t\r\n ]+/g, " ")
            }).replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi, function(b, c, f, h) {
                b = [];
                h = h.replace(/^\s+|\s+$/, "").replace(/&#39;/g, "'").replace(/&quot;/gi, "'").split(/;\s*/g);
                f = 0;
                for (var l; l = h[f]; f++) {
                    var g, p = l.split(":");
                    if (2 == p.length && (l = p[0].toLowerCase(),
                    g = p[1].toLowerCase(),
                    !(/^(background)\w*/.test(l) && 0 == g.replace(/(initial|\s)/g, "").length || /^(margin)\w*/.test(l) && /^0\w+$/.test(g)))) {
                        switch (l) {
                        case "mso-padding-alt":
                        case "mso-padding-top-alt":
                        case "mso-padding-right-alt":
                        case "mso-padding-bottom-alt":
                        case "mso-padding-left-alt":
                        case "mso-margin-alt":
                        case "mso-margin-top-alt":
                        case "mso-margin-right-alt":
                        case "mso-margin-bottom-alt":
                        case "mso-margin-left-alt":
                        case "mso-height":
                        case "mso-width":
                        case "mso-vertical-align-alt":
                            /<table/.test(c) || (b[f] = l.replace(/^mso-|-alt$/g, "") + ":" + a(g));
                            continue;
                        case "horiz-align":
                            b[f] = "text-align:" + g;
                            continue;
                        case "vert-align":
                            b[f] = "vertical-align:" + g;
                            continue;
                        case "font-color":
                        case "mso-foreground":
                            b[f] = "color:" + g;
                            continue;
                        case "mso-background":
                        case "mso-highlight":
                            b[f] = "background:" + g;
                            continue;
                        case "mso-default-height":
                            b[f] = "min-height:" + a(g);
                            continue;
                        case "mso-default-width":
                            b[f] = "min-width:" + a(g);
                            continue;
                        case "mso-padding-between-alt":
                            b[f] = "border-collapse:separate;border-spacing:" + a(g);
                            continue;
                        case "text-line-through":
                            if ("single" == g || "double" == g)
                                b[f] = "text-decoration:line-through";
                            continue;
                        case "mso-zero-height":
                            "yes" == g && (b[f] = "display:none");
                            continue;
                        case "margin":
                            if (!/[1-9]/.test(g))
                                continue
                        }
                        /^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(l) || /text\-indent|padding|margin/.test(l) && /\-[\d.]+/.test(g) || (b[f] = l + ":" + p[1])
                    }
                }
                return c + (b.length ? ' style="' + b.join(";").replace(/;{2,}/g, ";") + '"' : "")
            }).replace(/[\d.]+(cm|pt)/g, function(a) {
                return n.transUnitToPx(a)
            })
        }
        return function(a) {
            return /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<(v|o):|lang=)/ig.test(a) ? b(a) : a
        }
    }();
    (function() {
        function a(a, b, c) {
            a.push(m);
            return b + (c ? 1 : -1)
        }
        function b(a, b) {
            for (var c = 0; c < b; c++)
                a.push(r)
        }
        function c(e, f, l, h) {
            switch (e.type) {
            case "root":
                for (var g = 0, k; k = e.children[g++]; )
                    l && "element" == k.type && !q.$inlineWithA[k.tagName] && 1 < g && (a(f, h, !0),
                    b(f, h)),
                    c(k, f, l, h);
                break;
            case "text":
                "pre" == e.parentNode.tagName ? f.push(e.data) : f.push(p[e.parentNode.tagName] ? n.html(e.data) : e.data.replace(/[ ]{2}/g, " &nbsp;"));
                break;
            case "element":
                d(e, f, l, h);
                break;
            case "comment":
                f.push("\x3c!--" + e.data + "--\x3e")
            }
            return f
        }
        function d(d, e, f, h) {
            var l = "";
            if (d.attrs) {
                var l = [], g = d.attrs, p;
                for (p in g)
                    l.push(p + (void 0 !== g[p] ? '="' + (k[p] ? n.html(g[p]).replace(/["]/g, function(a) {
                        return "&quot;"
                    }) : n.unhtml(g[p])) + '"' : ""));
                l = l.join(" ")
            }
            e.push("<" + d.tagName + (l ? " " + l : "") + (q.$empty[d.tagName] ? "/" : "") + ">");
            f && !q.$inlineWithA[d.tagName] && "pre" != d.tagName && d.children && d.children.length && (h = a(e, h, !0),
            b(e, h));
            if (d.children && d.children.length)
                for (l = 0; g = d.children[l++]; )
                    f && "element" == g.type && !q.$inlineWithA[g.tagName] && 1 < l && (a(e, h),
                    b(e, h)),
                    c(g, e, f, h);
            q.$empty[d.tagName] || (f && !q.$inlineWithA[d.tagName] && "pre" != d.tagName && d.children && d.children.length && (h = a(e, h),
            b(e, h)),
            e.push("</" + d.tagName + ">"))
        }
        function e(a, b) {
            var c;
            if ("element" == a.type && a.getAttr("id") == b)
                return a;
            if (a.children && a.children.length)
                for (var d = 0; c = a.children[d++]; )
                    if (c = e(c, b))
                        return c
        }
        function f(a, b, c) {
            "element" == a.type && a.tagName == b && c.push(a);
            if (a.children && a.children.length)
                for (var d = 0, e; e = a.children[d++]; )
                    f(e, b, c)
        }
        function h(a, b) {
            if (a.children && a.children.length)
                for (var c = 0, d; d = a.children[c]; )
                    h(d, b),
                    d.parentNode && (d.children && d.children.length && b(d),
                    d.parentNode && c++);
            else
                b(a)
        }
        var l = UM.uNode = function(a) {
            this.type = a.type;
            this.data = a.data;
            this.tagName = a.tagName;
            this.parentNode = a.parentNode;
            this.attrs = a.attrs || {};
            this.children = a.children
        }
          , k = {
            href: 1,
            src: 1,
            _src: 1,
            _href: 1,
            cdata_data: 1
        }
          , p = {
            style: 1,
            script: 1
        }
          , r = "    "
          , m = "\n";
        l.createElement = function(a) {
            return /[<>]/.test(a) ? UM.htmlparser(a).children[0] : new l({
                type: "element",
                children: [],
                tagName: a
            })
        }
        ;
        l.createText = function(a, b) {
            return new UM.uNode({
                type: "text",
                data: b ? a : n.unhtml(a || "")
            })
        }
        ;
        l.prototype = {
            toHtml: function(a) {
                var b = [];
                c(this, b, a, 0);
                return b.join("")
            },
            innerHTML: function(a) {
                if ("element" != this.type || q.$empty[this.tagName])
                    return this;
                if (n.isString(a)) {
                    if (this.children)
                        for (var b = 0, c; c = this.children[b++]; )
                            c.parentNode = null;
                    this.children = [];
                    a = UM.htmlparser(a);
                    for (b = 0; c = a.children[b++]; )
                        this.children.push(c),
                        c.parentNode = this;
                    return this
                }
                a = new UM.uNode({
                    type: "root",
                    children: this.children
                });
                return a.toHtml()
            },
            innerText: function(a, b) {
                if ("element" != this.type || q.$empty[this.tagName])
                    return this;
                if (a) {
                    if (this.children)
                        for (var c = 0, d; d = this.children[c++]; )
                            d.parentNode = null;
                    this.children = [];
                    this.appendChild(l.createText(a, b));
                    return this
                }
                return this.toHtml().replace(/<[^>]+>/g, "")
            },
            getData: function() {
                return "element" == this.type ? "" : this.data
            },
            firstChild: function() {
                return this.children ? this.children[0] : null
            },
            lastChild: function() {
                return this.children ? this.children[this.children.length - 1] : null
            },
            previousSibling: function() {
                for (var a = this.parentNode, b = 0, c; c = a.children[b]; b++)
                    if (c === this)
                        return 0 == b ? null : a.children[b - 1]
            },
            nextSibling: function() {
                for (var a = this.parentNode, b = 0, c; c = a.children[b++]; )
                    if (c === this)
                        return a.children[b]
            },
            replaceChild: function(a, b) {
                if (this.children) {
                    a.parentNode && a.parentNode.removeChild(a);
                    for (var c = 0, d; d = this.children[c]; c++)
                        if (d === b)
                            return this.children.splice(c, 1, a),
                            b.parentNode = null,
                            a.parentNode = this,
                            a
                }
            },
            appendChild: function(a) {
                if ("root" == this.type || "element" == this.type && !q.$empty[this.tagName]) {
                    this.children || (this.children = []);
                    a.parentNode && a.parentNode.removeChild(a);
                    for (var b = 0, c; c = this.children[b]; b++)
                        if (c === a) {
                            this.children.splice(b, 1);
                            break
                        }
                    this.children.push(a);
                    a.parentNode = this;
                    return a
                }
            },
            insertBefore: function(a, b) {
                if (this.children) {
                    a.parentNode && a.parentNode.removeChild(a);
                    for (var c = 0, d; d = this.children[c]; c++)
                        if (d === b)
                            return this.children.splice(c, 0, a),
                            a.parentNode = this,
                            a
                }
            },
            insertAfter: function(a, b) {
                if (this.children) {
                    a.parentNode && a.parentNode.removeChild(a);
                    for (var c = 0, d; d = this.children[c]; c++)
                        if (d === b)
                            return this.children.splice(c + 1, 0, a),
                            a.parentNode = this,
                            a
                }
            },
            removeChild: function(a, b) {
                if (this.children)
                    for (var c = 0, d; d = this.children[c]; c++)
                        if (d === a) {
                            this.children.splice(c, 1);
                            d.parentNode = null;
                            if (b && d.children && d.children.length)
                                for (var e = 0, f; f = d.children[e]; e++)
                                    this.children.splice(c + e, 0, f),
                                    f.parentNode = this;
                            return d
                        }
            },
            getAttr: function(a) {
                return this.attrs && this.attrs[a.toLowerCase()]
            },
            setAttr: function(a, b) {
                if (a)
                    if (this.attrs || (this.attrs = {}),
                    n.isObject(a))
                        for (var c in a)
                            a[c] ? this.attrs[c.toLowerCase()] = a[c] : delete this.attrs[c];
                    else
                        b ? this.attrs[a.toLowerCase()] = b : delete this.attrs[a];
                else
                    delete this.attrs
            },
            hasAttr: function(a) {
                a = this.getAttr(a);
                return null !== a && void 0 !== a
            },
            getIndex: function() {
                for (var a = this.parentNode, b = 0, c; c = a.children[b]; b++)
                    if (c === this)
                        return b;
                return -1
            },
            getNodeById: function(a) {
                var b;
                if (this.children && this.children.length)
                    for (var c = 0; b = this.children[c++]; )
                        if (b = e(b, a))
                            return b
            },
            getNodesByTagName: function(a) {
                a = n.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
                var b = []
                  , c = this;
                n.each(a, function(a) {
                    if (c.children && c.children.length)
                        for (var d = 0, e; e = c.children[d++]; )
                            f(e, a, b)
                });
                return b
            },
            getStyle: function(a) {
                var b = this.getAttr("style");
                return b ? (a = b.match(RegExp("(^|;)\\s*" + a + ":([^;]+)", "i"))) && a[0] ? a[2] : "" : ""
            },
            setStyle: function(a, b) {
                function c(a, b) {
                    d = d.replace(RegExp("(^|;)\\s*" + a + ":([^;]+;?)", "gi"), "$1");
                    b && (d = a + ":" + n.unhtml(b) + ";" + d)
                }
                var d = this.getAttr("style");
                d || (d = "");
                if (n.isObject(a))
                    for (var e in a)
                        c(e, a[e]);
                else
                    c(a, b);
                this.setAttr("style", n.trim(d))
            },
            hasClass: function(a) {
                if (this.hasAttr("class")) {
                    var b = this.getAttr("class").split(/\s+/)
                      , c = !1;
                    g.each(b, function(b, d) {
                        d === a && (c = !0)
                    });
                    return c
                }
                return !1
            },
            addClass: function(a) {
                var b = null
                  , c = !1;
                this.hasAttr("class") ? (b = this.getAttr("class"),
                b = b.split(/\s+/),
                b.forEach(function(b) {
                    b === a && (c = !0)
                }),
                !c && b.push(a),
                this.setAttr("class", b.join(" "))) : this.setAttr("class", a)
            },
            removeClass: function(a) {
                if (this.hasAttr("class")) {
                    var b = this.getAttr("class")
                      , b = b.replace(RegExp("\\b" + a + "\\b", "g"), "");
                    this.setAttr("class", n.trim(b).replace(/[ ]{2,}/g, " "))
                }
            },
            traversal: function(a) {
                this.children && this.children.length && h(this, a);
                return this
            }
        }
    }
    )();
    UM.htmlparser = function(a, b) {
        function c(a, b) {
            if (r[a.tagName]) {
                var c = g.createElement(r[a.tagName]);
                a.appendChild(c);
                c.appendChild(g.createText(b))
            } else
                a.appendChild(g.createText(b))
        }
        function d(a, b, c) {
            var e;
            if (e = p[b]) {
                for (var h = a, k; "root" != h.type; ) {
                    if (n.isArray(e) ? -1 != n.indexOf(e, h.tagName) : e == h.tagName) {
                        a = h;
                        k = !0;
                        break
                    }
                    h = h.parentNode
                }
                k || (a = d(a, n.isArray(e) ? e[0] : e))
            }
            e = new g({
                parentNode: a,
                type: "element",
                tagName: b.toLowerCase(),
                children: q.$empty[b] ? null : []
            });
            if (c) {
                for (h = {}; k = f.exec(c); )
                    h[k[1].toLowerCase()] = l[k[1].toLowerCase()] ? k[2] || k[3] || k[4] : n.unhtml(k[2] || k[3] || k[4]);
                e.attrs = h
            }
            a.children.push(e);
            return q.$empty[b] ? a : e
        }
        var e = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\s\/>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g
          , f = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g
          , h = {
            b: 1,
            code: 1,
            i: 1,
            u: 1,
            strike: 1,
            s: 1,
            tt: 1,
            strong: 1,
            q: 1,
            samp: 1,
            em: 1,
            span: 1,
            sub: 1,
            img: 1,
            sup: 1,
            font: 1,
            big: 1,
            small: 1,
            iframe: 1,
            a: 1,
            br: 1,
            pre: 1
        };
        a = a.replace(RegExp(k.fillChar, "g"), "");
        b || (a = a.replace(RegExp("[\\r\\t\\n" + (b ? "" : " ") + "]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n" + (b ? "" : " ") + "]*", "g"), function(a, c) {
            return c && h[c.toLowerCase()] ? a.replace(/(^[\n\r]+)|([\n\r]+$)/g, "") : a.replace(RegExp("^[\\r\\n" + (b ? "" : " ") + "]+"), "").replace(RegExp("[\\r\\n" + (b ? "" : " ") + "]+$"), "")
        }));
        for (var l = {
            href: 1,
            src: 1
        }, g = UM.uNode, p = {
            td: "tr",
            tr: ["tbody", "thead", "tfoot"],
            tbody: "table",
            th: "tr",
            thead: "table",
            tfoot: "table",
            caption: "table",
            li: ["ul", "ol"],
            dt: "dl",
            dd: "dl",
            option: "select"
        }, r = {
            ol: "li",
            ul: "li"
        }, m, u = 0, v = 0, w = new g({
            type: "root",
            children: []
        }), t = w; m = e.exec(a); ) {
            u = m.index;
            try {
                if (u > v && c(t, a.slice(v, u)),
                m[3])
                    q.$cdata[t.tagName] ? c(t, m[0]) : t = d(t, m[3].toLowerCase(), m[4]);
                else if (m[1]) {
                    if ("root" != t.type)
                        if (q.$cdata[t.tagName] && !q.$cdata[m[1]])
                            c(t, m[0]);
                        else {
                            for (u = t; "element" == t.type && t.tagName != m[1].toLowerCase(); )
                                if (t = t.parentNode,
                                "root" == t.type)
                                    throw t = u,
                                    "break";
                            t = t.parentNode
                        }
                } else
                    m[2] && t.children.push(new g({
                        type: "comment",
                        data: m[2],
                        parentNode: t
                    }))
            } catch (L) {}
            v = e.lastIndex
        }
        v < a.length && c(t, a.slice(v));
        return w
    }
    ;
    UM.filterNode = function() {
        function a(b, c) {
            switch (b.type) {
            case "element":
                var d;
                if (d = c[b.tagName])
                    if ("-" === d)
                        b.parentNode.removeChild(b);
                    else if (n.isFunction(d)) {
                        var e = b.parentNode
                          , f = b.getIndex();
                        d(b);
                        if (b.parentNode) {
                            if (b.children)
                                for (d = 0; f = b.children[d]; )
                                    a(f, c),
                                    f.parentNode && d++
                        } else
                            for (d = f; f = e.children[d]; )
                                a(f, c),
                                f.parentNode && d++
                    } else {
                        if ((d = d.$) && b.attrs) {
                            var f = {}, h;
                            for (e in d) {
                                h = b.getAttr(e);
                                if ("style" == e && n.isArray(d[e])) {
                                    var l = [];
                                    n.each(d[e], function(a) {
                                        var c;
                                        (c = b.getStyle(a)) && l.push(a + ":" + c)
                                    });
                                    h = l.join(";")
                                }
                                h && (f[e] = h)
                            }
                            b.attrs = f
                        }
                        if (b.children)
                            for (d = 0; f = b.children[d]; )
                                a(f, c),
                                f.parentNode && d++
                    }
                else if (q.$cdata[b.tagName])
                    b.parentNode.removeChild(b);
                else
                    for (e = b.parentNode,
                    f = b.getIndex(),
                    b.parentNode.removeChild(b, !0),
                    d = f; f = e.children[d]; )
                        a(f, c),
                        f.parentNode && d++;
                break;
            case "comment":
                b.parentNode.removeChild(b)
            }
        }
        return function(b, c) {
            if (n.isEmptyObject(c))
                return b;
            var d;
            (d = c["-"]) && n.each(d.split(" "), function(a) {
                c[a] = "-"
            });
            d = 0;
            for (var e; e = b.children[d]; )
                a(e, c),
                e.parentNode && d++;
            return b
        }
    }();
    UM.commands.inserthtml = {
        execCommand: function(a, b, c) {
            var d = this, e;
            if (b && !0 !== d.fireEvent("beforeinserthtml", b)) {
                e = d.selection.getRange();
                a = e.document.createElement("div");
                a.style.display = "inline";
                c || (b = UM.htmlparser(b),
                d.options.filterRules && UM.filterNode(b, d.options.filterRules),
                d.filterInputRule(b),
                b = b.toHtml());
                a.innerHTML = n.trim(b);
                if (!e.collapsed && (b = e.startContainer,
                k.isFillChar(b) && e.setStartBefore(b),
                b = e.endContainer,
                k.isFillChar(b) && e.setEndAfter(b),
                e.txtToElmBoundary(),
                e.endContainer && 1 == e.endContainer.nodeType && (b = e.endContainer.childNodes[e.endOffset]) && k.isBr(b) && e.setEndAfter(b),
                0 == e.startOffset && (b = e.startContainer,
                k.isBoundaryNode(b, "firstChild") && (b = e.endContainer,
                e.endOffset == (3 == b.nodeType ? b.nodeValue.length : b.childNodes.length) && k.isBoundaryNode(b, "lastChild") && (d.body.innerHTML = "<p>" + (m.ie ? "" : "<br/>") + "</p>",
                e.setStart(d.body.firstChild, 0).collapse(!0)))),
                !e.collapsed && e.deleteContents(),
                1 == e.startContainer.nodeType)) {
                    b = e.startContainer.childNodes[e.startOffset];
                    var f;
                    if (b && k.isBlockElm(b) && (f = b.previousSibling) && k.isBlockElm(f)) {
                        for (e.setEnd(f, f.childNodes.length).collapse(); b.firstChild; )
                            f.appendChild(b.firstChild);
                        k.remove(b)
                    }
                }
                var h, l;
                c = 0;
                var g;
                e.inFillChar() && (b = e.startContainer,
                k.isFillChar(b) ? (e.setStartBefore(b).collapse(!0),
                k.remove(b)) : k.isFillChar(b, !0) && (b.nodeValue = b.nodeValue.replace(F, ""),
                e.startOffset--,
                e.collapsed && e.collapse(!0)));
                for (; b = a.firstChild; ) {
                    if (c) {
                        for (h = d.document.createElement("p"); b && (3 == b.nodeType || !q.$block[b.tagName]); )
                            g = b.nextSibling,
                            h.appendChild(b),
                            b = g;
                        h.firstChild && (b = h)
                    }
                    e.insertNode(b);
                    g = b.nextSibling;
                    if (!c && b.nodeType == k.NODE_ELEMENT && k.isBlockElm(b) && (h = k.findParent(b, function(a) {
                        return k.isBlockElm(a)
                    })) && "body" != h.tagName.toLowerCase() && (!q[h.tagName][b.nodeName] || b.parentNode !== h)) {
                        if (q[h.tagName][b.nodeName])
                            for (l = b.parentNode; l !== h; )
                                f = l,
                                l = l.parentNode;
                        else
                            f = h;
                        k.breakParent(b, f || l);
                        f = b.previousSibling;
                        k.trimWhiteTextNode(f);
                        f.childNodes.length || k.remove(f);
                        !m.ie && (p = b.nextSibling) && k.isBlockElm(p) && p.lastChild && !k.isBr(p.lastChild) && p.appendChild(d.document.createElement("br"));
                        c = 1
                    }
                    var p = b.nextSibling;
                    if (!a.firstChild && p && k.isBlockElm(p)) {
                        e.setStart(p, 0).collapse(!0);
                        break
                    }
                    e.setEndAfter(b).collapse()
                }
                b = e.startContainer;
                g && k.isBr(g) && k.remove(g);
                if (k.isBlockElm(b) && k.isEmptyNode(b))
                    if (g = b.nextSibling)
                        k.remove(b),
                        1 == g.nodeType && q.$block[g.tagName] && e.setStart(g, 0).collapse(!0).shrinkBoundary();
                    else
                        try {
                            b.innerHTML = m.ie ? k.fillChar : "<br/>"
                        } catch (r) {
                            e.setStartBefore(b),
                            k.remove(b)
                        }
                try {
                    if (m.ie9below && 1 == e.startContainer.nodeType && !e.startContainer.childNodes[e.startOffset] && (f = e.startContainer.childNodes[e.startOffset - 1]) && 1 == f.nodeType && q.$empty[f.tagName]) {
                        var y = this.document.createTextNode(k.fillChar);
                        e.insertNode(y).setStart(y, 0).collapse(!0)
                    }
                    setTimeout(function() {
                        e.select(!0)
                    })
                } catch (u) {}
                setTimeout(function() {
                    e = d.selection.getRange();
                    e.scrollIntoView();
                    d.fireEvent("afterinserthtml")
                }, 200)
            }
        }
    };
    UM.commands.insertimage = {
        execCommand: function(a, b) {
            b = n.isArray(b) ? b : [b];
            if (b.length) {
                var c = [], d = "", e;
                e = b[0];
                if (1 == b.length)
                    d = '<img src="' + e.src + '" ' + (e._src ? ' _src="' + e._src + '" ' : "") + (e.width ? 'width="' + e.width + '" ' : "") + (e.height ? ' height="' + e.height + '" ' : "") + ("left" == e.floatStyle || "right" == e.floatStyle ? ' style="float:' + e.floatStyle + ';"' : "") + (e.title && "" != e.title ? ' title="' + e.title + '"' : "") + (e.border && "0" != e.border ? ' border="' + e.border + '"' : "") + (e.alt && "" != e.alt ? ' alt="' + e.alt + '"' : "") + (e.hspace && "0" != e.hspace ? ' hspace = "' + e.hspace + '"' : "") + (e.vspace && "0" != e.vspace ? ' vspace = "' + e.vspace + '"' : "") + "/>",
                    "center" == e.floatStyle && (d = '<p style="text-align: center">' + d + "</p>"),
                    c.push(d);
                else
                    for (var f = 0; e = b[f++]; )
                        d = "<p " + ("center" == e.floatStyle ? 'style="text-align: center" ' : "") + '><img src="' + e.src + '" ' + (e.width ? 'width="' + e.width + '" ' : "") + (e._src ? ' _src="' + e._src + '" ' : "") + (e.height ? ' height="' + e.height + '" ' : "") + ' style="' + (e.floatStyle && "center" != e.floatStyle ? "float:" + e.floatStyle + ";" : "") + (e.border || "") + '" ' + (e.title ? ' title="' + e.title + '"' : "") + " /></p>",
                        c.push(d);
                this.execCommand("insertHtml", c.join(""), !0)
            }
        }
    };
    UM.plugins.justify = function() {
        var a = this;
        g.each(["justifyleft", "justifyright", "justifycenter", "justifyfull"], function(b, c) {
            a.commands[c] = {
                execCommand: function(a) {
                    return this.document.execCommand(a)
                },
                queryCommandValue: function(a) {
                    var b = this.document.queryCommandValue(a);
                    return !0 === b || "true" === b ? a.replace(/justify/, "") : ""
                },
                queryCommandState: function(a) {
                    return this.document.queryCommandState(a) ? 1 : 0
                }
            }
        })
    }
    ;
    UM.plugins.font = function() {
        var a = this
          , b = {
            forecolor: "forecolor",
            backcolor: "backcolor",
            fontsize: "fontsize",
            fontfamily: "fontname"
        }
          , c = {
            forecolor: "color",
            backcolor: "background-color",
            fontsize: "font-size",
            fontfamily: "font-family"
        }
          , d = {
            forecolor: "color",
            fontsize: "size",
            fontfamily: "face"
        };
        a.setOpt({
            fontfamily: [{
                name: "songti",
                val: "\u5b8b\u4f53,SimSun"
            }, {
                name: "yahei",
                val: "\u5fae\u8f6f\u96c5\u9ed1,Microsoft YaHei"
            }, {
                name: "kaiti",
                val: "\u6977\u4f53,\u6977\u4f53_GB2312, SimKai"
            }, {
                name: "heiti",
                val: "\u9ed1\u4f53, SimHei"
            }, {
                name: "lishu",
                val: "\u96b6\u4e66, SimLi"
            }, {
                name: "andaleMono",
                val: "andale mono"
            }, {
                name: "arial",
                val: "arial, helvetica,sans-serif"
            }, {
                name: "arialBlack",
                val: "arial black,avant garde"
            }, {
                name: "comicSansMs",
                val: "comic sans ms"
            }, {
                name: "impact",
                val: "impact,chicago"
            }, {
                name: "timesNewRoman",
                val: "times new roman"
            }, {
                name: "sans-serif",
                val: "sans-serif"
            }],
            fontsize: [12,14,16,18,20,24,32]
        });
        a.addOutputRule(function(a) {
            n.each(a.getNodesByTagName("font"), function(a) {
                if ("font" == a.tagName) {
                    var b = [], c;
                    for (c in a.attrs)
                        switch (c) {
                        case "size":
                            var d = a.attrs[c];
                            g.each({
                            	12: "1",
                                14: "2",
                                16: "3",
                                18: "4",
                                20: "5",
                                24: "6",
                                32: "7"
                            }, function(a, b) {
                                if (b == d)
                                    return d = a,
                                    !1
                            });
                            b.push("font-size:" + d + "px !important");
                            break;
                        case "color":
                            b.push("color:" + a.attrs[c] + " !important");
                            break;
                        case "face":
                            b.push("font-family:" + a.attrs[c] + " !important");
                            break;
                        case "style":
                            b.push(a.attrs[c])
                        }
                    a.attrs = {
                        style: b.join(";")
                    }
                }
                a.tagName = "span";
                "span" == a.parentNode.tagName && 1 == a.parentNode.children.length && (g.each(a.attrs, function(b, c) {
                    a.parentNode.attrs[b] = "style" == b ? a.parentNode.attrs[b] + c : c
                }),
                a.parentNode.removeChild(a, !0))
            })
        });
        for (var e in b)
            (function(e) {
                a.commands[e] = {
                    execCommand: function(a, d) {
                        if ("transparent" != d) {
                            var e = this.selection.getRange();
                            if (e.collapsed) {
                                var f = g("<span></span>").css(c[a], d)[0];
                                e.insertNode(f).setStart(f, 0).setCursor()
                            } else {
                                "fontsize" == a && (d = {
                                        12: "1",
                                        14: "2",
                                        16: "3",
                                        18: "4",
                                        20: "5",
                                        24: "6",
                                        32: "7"
                                }[(d + "").replace(/px/, "")]);
                                this.document.execCommand(b[a], !1, d);
                                m.gecko && g.each(this.$body.find("a"), function(a, b) {
                                    var c = b.parentNode;
                                    if (c.lastChild === c.firstChild && /FONT|SPAN/.test(c.tagName)) {
                                        var d = c.cloneNode(!1);
                                        d.innerHTML = b.innerHTML;
                                        g(b).html("").append(d).insertBefore(c);
                                        g(c).remove()
                                    }
                                });
                                if (!m.ie) {
                                    var f = this.selection.getNative().getRangeAt(0).commonAncestorContainer
                                      , e = this.selection.getRange()
                                      , k = e.createBookmark(!0);
                                    g(f).find("a").each(function(a, b) {
                                        var c = b.parentNode;
                                        "FONT" == c.nodeName && (c = c.cloneNode(!1),
                                        c.innerHTML = b.innerHTML,
                                        g(b).html("").append(c))
                                    });
                                    e.moveToBookmark(k).select()
                                }
                                return !0
                            }
                        }
                    },
                    queryCommandValue: function(b) {
                        var e = a.selection.getStart()
                          , f = g(e).css(c[b]);
                        void 0 === f && (f = g(e).attr(d[b]));
                        return f ? n.fixColor(b, f).replace(/px/, "") : ""
                    },
                    queryCommandState: function(a) {
                        return this.queryCommandValue(a)
                    }
                }
            }
            )(e)
    }
    ;
    UM.plugins.link = function() {
        this.setOpt("autourldetectinie", !1);
        m.ie && !1 === this.options.autourldetectinie && this.addListener("keyup", function(a, b) {
            var c = b.keyCode;
            if (13 == c || 32 == c) {
                var d = this.selection.getRange().startContainer;
                13 == c ? "P" == d.nodeName && (c = d.previousSibling) && 1 == c.nodeType && (c = c.lastChild) && "A" == c.nodeName && !c.getAttribute("_href") && k.remove(c, !0) : 32 == c && 3 == d.nodeType && /^\s$/.test(d.nodeValue) && (d = d.previousSibling) && "A" == d.nodeName && !d.getAttribute("_href") && k.remove(d, !0)
            }
        });
        this.addOutputRule(function(a) {
            g.each(a.getNodesByTagName("a"), function(a, c) {
                var d = n.html(c.getAttr("_href"));
                /^(ftp|https?|\/|file)/.test(d) || (d = "http://" + d);
                c.setAttr("href", d);
                c.setAttr("_href");
                "" == c.getAttr("title") && c.setAttr("title")
            })
        });
        this.addInputRule(function(a) {
            g.each(a.getNodesByTagName("a"), function(a, c) {
                c.setAttr("_href", n.html(c.getAttr("href")))
            })
        });
        this.commands.link = {
            execCommand: function(a, b) {
                var c = this.selection.getRange();
                if (c.collapsed) {
                    var d = c.startContainer;
                    (d = k.findParentByTagName(d, "a", !0)) ? (g(d).attr(b),
                    c.selectNode(d).select()) : c.insertNode(g("<a>" + b.href + "</a>").attr(b)[0]).select()
                } else
                    this.document.execCommand("createlink", !1, "_umeditor_link"),
                    n.each(k.getElementsByTagName(this.body, "a", function(a) {
                        return "_umeditor_link" == a.getAttribute("href")
                    }), function(a) {
                        "_umeditor_link" == g(a).text() && g(a).text(b.href);
                        k.setAttributes(a, b);
                        c.selectNode(a).select()
                    })
            },
            queryCommandState: function() {
                return this.queryCommandValue("link") ? 1 : 0
            },
            queryCommandValue: function() {
                var a = this.selection.getStartElementPath(), b;
                g.each(a, function(a, d) {
                    if ("A" == d.nodeName)
                        return b = d,
                        !1
                });
                return b
            }
        };
        this.commands.unlink = {
            execCommand: function() {
                this.document.execCommand("unlink")
            }
        }
    }
    ;
    UM.commands.print = {
        execCommand: function() {
            var a = "editor_print_" + +new Date;
            g('<iframe src="" id="' + a + '" name="' + a + '" frameborder="0"></iframe>').attr("id", a).css({
                width: "0px",
                height: "0px",
                overflow: "hidden",
                "float": "left",
                position: "absolute",
                top: "-10000px",
                left: "-10000px"
            }).appendTo(this.$container.find(".edui-dialog-container"));
            var b = window.open("", a, "").document;
            b.open();
            b.write("<html><head></head><body><div>" + this.getContent(null, null, !0) + "</div><script>setTimeout(function(){window.print();setTimeout(function(){window.parent.$('#" + a + "').remove();},100);},200);\x3c/script></body></html>");
            b.close()
        },
        notNeedUndo: 1
    };
    UM.plugins.paragraph = function() {
        this.setOpt("paragraph", {
            p: "",
            h1: "",
            h2: "",
            h3: "",
            h4: "",
            h5: "",
            h6: ""
        });
        this.commands.paragraph = {
            execCommand: function(a, b) {
                return this.document.execCommand("formatBlock", !1, "<" + b + ">")
            },
            queryCommandValue: function() {
                try {
                    var a = this.document.queryCommandValue("formatBlock")
                } catch (b) {}
                return a
            }
        }
    }
    ;
    UM.plugins.horizontal = function() {
        var a = this;
        a.commands.horizontal = {
            execCommand: function() {
                this.document.execCommand("insertHorizontalRule");
                var b = a.selection.getRange().txtToElmBoundary(!0)
                  , c = b.startContainer;
                if (k.isBody(b.startContainer))
                    (c = b.startContainer.childNodes[b.startOffset]) || (c = g("<p></p>").appendTo(b.startContainer).html(m.ie ? "&nbsp;" : "<br/>")[0]),
                    b.setStart(c, 0).setCursor();
                else {
                    for (; q.$inline[c.tagName] && c.lastChild === c.firstChild; ) {
                        var d = c.parentNode;
                        d.appendChild(c.firstChild);
                        d.removeChild(c);
                        c = d
                    }
                    for (; q.$inline[c.tagName]; )
                        c = c.parentNode;
                    1 == c.childNodes.length && "HR" == c.lastChild.nodeName ? (d = c.lastChild,
                    g(d).insertBefore(c),
                    b.setStart(c, 0).setCursor()) : (d = g("hr", c)[0],
                    k.breakParent(d, c),
                    (c = d.previousSibling) && k.isEmptyBlock(c) && g(c).remove(),
                    b.setStart(d.nextSibling, 0).setCursor())
                }
            }
        }
    }
    ;
    UM.commands.cleardoc = {
        execCommand: function() {
            var a = this
              , b = a.selection.getRange();
            a.body.innerHTML = "<p>" + (E ? "" : "<br/>") + "</p>";
            b.setStart(a.body.firstChild, 0).setCursor(!1, !0);
            setTimeout(function() {
                a.fireEvent("clearDoc")
            }, 0)
        }
    };
    UM.plugins.undo = function() {
        function a(a, b) {
            if (a.length != b.length)
                return 0;
            for (var c = 0, d = a.length; c < d; c++)
                if (a[c] != b[c])
                    return 0;
            return 1
        }
        function b() {
            this.undoManger.save()
        }
        var c, d = this.options.maxUndoCount || 20, e = this.options.maxInputCount || 20, f = RegExp(k.fillChar + "|</hr>", "gi"), h = {
            ol: 1,
            ul: 1,
            table: 1,
            tbody: 1,
            tr: 1,
            body: 1
        }, l = this.options.autoClearEmptyNode;
        this.undoManger = new function() {
            this.list = [];
            this.index = 0;
            this.hasRedo = this.hasUndo = !1;
            this.undo = function() {
                if (this.hasUndo)
                    if (this.list[this.index - 1] || 1 != this.list.length) {
                        for (; this.list[this.index].content == this.list[this.index - 1].content; )
                            if (this.index--,
                            0 == this.index)
                                return this.restore(0);
                        this.restore(--this.index)
                    } else
                        this.reset()
            }
            ;
            this.redo = function() {
                if (this.hasRedo) {
                    for (; this.list[this.index].content == this.list[this.index + 1].content; )
                        if (this.index++,
                        this.index == this.list.length - 1)
                            return this.restore(this.index);
                    this.restore(++this.index)
                }
            }
            ;
            this.restore = function() {
                var a = this.editor
                  , b = this.list[this.index]
                  , c = UM.htmlparser(b.content.replace(f, ""));
                a.options.autoClearEmptyNode = !1;
                a.filterInputRule(c, !0);
                a.options.autoClearEmptyNode = l;
                a.body.innerHTML = c.toHtml();
                a.fireEvent("afterscencerestore");
                m.ie && n.each(k.getElementsByTagName(a.document, "td th caption p"), function(b) {
                    k.isEmptyNode(b) && k.fillNode(a.document, b)
                });
                try {
                    var d = (new B.Range(a.document,a.body)).moveToAddress(b.address);
                    if (m.ie && d.collapsed && 1 == d.startContainer.nodeType) {
                        var e = d.startContainer.childNodes[d.startOffset];
                        (!e || 1 == e.nodeType && q.$empty[e]) && d.insertNode(a.document.createTextNode(" ")).collapse(!0)
                    }
                    d.select(h[d.startContainer.nodeName.toLowerCase()])
                } catch (g) {}
                this.update();
                this.clearKey();
                a.fireEvent("reset", !0)
            }
            ;
            this.getScene = function() {
                var a = this.editor
                  , b = a.selection.getRange().createAddress(!1, !0);
                a.fireEvent("beforegetscene");
                var c = UM.htmlparser(a.body.innerHTML, !0);
                a.options.autoClearEmptyNode = !1;
                a.filterOutputRule(c, !0);
                a.options.autoClearEmptyNode = l;
                c = c.toHtml();
                m.ie && (c = c.replace(/>&nbsp;</g, "><").replace(/\s*</g, "<").replace(/>\s*/g, ">"));
                a.fireEvent("aftergetscene");
                return {
                    address: b,
                    content: c
                }
            }
            ;
            this.save = function(b, e) {
                clearTimeout(c);
                var f = this.getScene(e), l = this.list[this.index], h;
                if (h = l)
                    if (h = l.content == f.content)
                        b ? l = 1 : (l = l.address,
                        h = f.address,
                        l = l.collapsed != h.collapsed ? 0 : a(l.startAddress, h.startAddress) && a(l.endAddress, h.endAddress) ? 1 : 0),
                        h = l;
                h || (this.list = this.list.slice(0, this.index + 1),
                this.list.push(f),
                this.list.length > d && this.list.shift(),
                this.index = this.list.length - 1,
                this.clearKey(),
                this.update())
            }
            ;
            this.update = function() {
                this.hasRedo = !!this.list[this.index + 1];
                this.hasUndo = !!this.list[this.index - 1]
            }
            ;
            this.reset = function() {
                this.list = [];
                this.index = 0;
                this.hasRedo = this.hasUndo = !1;
                this.clearKey()
            }
            ;
            this.clearKey = function() {
                p = 0
            }
        }
        ;
        this.undoManger.editor = this;
        this.addListener("saveScene", function() {
            var a = Array.prototype.splice.call(arguments, 1);
            this.undoManger.save.apply(this.undoManger, a)
        });
        this.addListener("beforeexeccommand", b);
        this.addListener("afterexeccommand", b);
        this.addListener("reset", function(a, b) {
            b || this.undoManger.reset()
        });
        this.commands.redo = this.commands.undo = {
            execCommand: function(a) {
                this.undoManger[a]()
            },
            queryCommandState: function(a) {
                return this.undoManger["has" + ("undo" == a.toLowerCase() ? "Undo" : "Redo")] ? 0 : -1
            },
            notNeedUndo: 1
        };
        var s = {
            16: 1,
            17: 1,
            18: 1,
            37: 1,
            38: 1,
            39: 1,
            40: 1
        }
          , p = 0
          , r = !1;
        this.addListener("ready", function() {
            g(this.body).on("compositionstart", function() {
                r = !0
            }).on("compositionend", function() {
                r = !1
            })
        });
        this.addshortcutkey({
            Undo: "ctrl+90",
            Redo: "ctrl+89,shift+ctrl+z"
        });
        var y = !0;
        this.addListener("keydown", function(a, b) {
            var d = this;
            if (!(s[b.keyCode || b.which] || b.ctrlKey || b.metaKey || b.shiftKey || b.altKey || r))
                if (d.selection.getRange().collapsed) {
                    0 == d.undoManger.list.length && d.undoManger.save(!0);
                    clearTimeout(c);
                    var f = function(a) {
                        a.selection.getRange().collapsed && a.fireEvent("contentchange");
                        a.undoManger.save(!1, !0);
                        a.fireEvent("selectionchange")
                    };
                    c = setTimeout(function() {
                        if (r)
                            var a = setInterval(function() {
                                r || (f(d),
                                clearInterval(a))
                            }, 300);
                        else
                            f(d)
                    }, 200);
                    p++;
                    p >= e && f(d)
                } else
                    d.undoManger.save(!1, !0),
                    y = !1
        });
        this.addListener("keyup", function(a, b) {
            s[b.keyCode || b.which] || b.ctrlKey || b.metaKey || b.shiftKey || b.altKey || r || y || (this.undoManger.save(!1, !0),
            y = !0)
        })
    }
    ;
    UM.plugins.paste = function() {
        function a(a) {
            var b = this.document;
            if (!b.getElementById("baidu_pastebin")) {
                var c = this.selection.getRange()
                  , h = c.createBookmark()
                  , l = b.createElement("div");
                l.id = "baidu_pastebin";
                m.webkit && l.appendChild(b.createTextNode(k.fillChar + k.fillChar));
                this.body.appendChild(l);
                h.start.style.display = "";
                l.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" + g(h.start).position().top + "px";
                c.selectNodeContents(l).select(!0);
                setTimeout(function() {
                    if (m.webkit)
                        for (var g = 0, p = b.querySelectorAll("#baidu_pastebin"), r; r = p[g++]; )
                            if (k.isEmptyNode(r))
                                k.remove(r);
                            else {
                                l = r;
                                break
                            }
                    try {
                        l.parentNode.removeChild(l)
                    } catch (n) {}
                    c.moveToBookmark(h).select(!0);
                    a(l)
                }, 0)
            }
        }
        function b(a) {
            var b;
            if (a.firstChild) {
                var f = k.getElementsByTagName(a, "span");
                b = 0;
                for (var h; h = f[b++]; )
                    "_baidu_cut_start" != h.id && "_baidu_cut_end" != h.id || k.remove(h);
                if (m.webkit) {
                    h = a.querySelectorAll("div br");
                    for (b = 0; f = h[b++]; )
                        f = f.parentNode,
                        "DIV" == f.tagName && 1 == f.childNodes.length && (f.innerHTML = "<p><br/></p>",
                        k.remove(f));
                    f = a.querySelectorAll("#baidu_pastebin");
                    for (b = 0; h = f[b++]; ) {
                        var l = c.document.createElement("p");
                        for (h.parentNode.insertBefore(l, h); h.firstChild; )
                            l.appendChild(h.firstChild);
                        k.remove(h)
                    }
                    h = a.querySelectorAll("meta");
                    for (b = 0; f = h[b++]; )
                        k.remove(f);
                    h = a.querySelectorAll("br");
                    for (b = 0; f = h[b++]; )
                        /^apple-/i.test(f.className) && k.remove(f)
                }
                if (m.gecko)
                    for (h = a.querySelectorAll("[_moz_dirty]"),
                    b = 0; f = h[b++]; )
                        f.removeAttribute("_moz_dirty");
                if (!m.ie)
                    for (h = a.querySelectorAll("span.Apple-style-span"),
                    b = 0; f = h[b++]; )
                        k.remove(f, !0);
                b = a.innerHTML;
                b = UM.filterWord(b);
                a = UM.htmlparser(b);
                c.options.filterRules && UM.filterNode(a, c.options.filterRules);
                c.filterInputRule(a);
                m.webkit && ((b = a.lastChild()) && "element" == b.type && "br" == b.tagName && a.removeChild(b),
                n.each(c.body.querySelectorAll("div"), function(a) {
                    k.isEmptyBlock(a) && k.remove(a)
                }));
                b = {
                    html: a.toHtml()
                };
                c.fireEvent("beforepaste", b, a);
                b.html && (c.execCommand("insertHtml", b.html, !0),
                c.fireEvent("afterpaste", b))
            }
        }
        var c = this;
        c.addListener("ready", function() {
            g(c.body).on("cut", function() {
                !c.selection.getRange().collapsed && c.undoManger && c.undoManger.save()
            }).on(m.ie || m.opera ? "keydown" : "paste", function(d) {
                (!m.ie && !m.opera || (d.ctrlKey || d.metaKey) && "86" == d.keyCode) && a.call(c, function(a) {
                    b(a)
                })
            })
        })
    }
    ;
    UM.plugins.list = function() {
        this.setOpt({
            insertorderedlist: {
                decimal: "",
                "lower-alpha": "",
                "lower-roman": "",
                "upper-alpha": "",
                "upper-roman": ""
            },
            insertunorderedlist: {
                circle: "",
                disc: "",
                square: ""
            }
        });
        this.addInputRule(function(a) {
            n.each(a.getNodesByTagName("li"), function(a) {
                0 == a.children.length && a.parentNode.removeChild(a)
            })
        });
        this.commands.insertorderedlist = this.commands.insertunorderedlist = {
            execCommand: function(a) {
                this.document.execCommand(a);
                a = this.selection.getRange();
                var b = a.createBookmark(!0);
                this.$body.find("ol,ul").each(function(a, b) {
                    var e = b.parentNode;
                    "P" == e.tagName && e.lastChild === e.firstChild && (g(b).children().each(function(a, b) {
                        var c = e.cloneNode(!1);
                        g(c).append(b.innerHTML);
                        g(b).html("").append(c)
                    }),
                    g(b).insertBefore(e),
                    g(e).remove());
                    q.$inline[e.tagName] && ("SPAN" == e.tagName && g(b).children().each(function(a, b) {
                        var c = e.cloneNode(!1);
                        if ("P" != b.firstChild.nodeName) {
                            for (; b.firstChild; )
                                c.appendChild(b.firstChild);
                            g("<p></p>").appendTo(b).append(c)
                        } else {
                            for (; b.firstChild; )
                                c.appendChild(b.firstChild);
                            g(b.firstChild).append(c)
                        }
                    }),
                    k.remove(e, !0))
                });
                a.moveToBookmark(b).select();
                return !0
            },
            queryCommandState: function(a) {
                return this.document.queryCommandState(a)
            }
        }
    }
    ;
    (function() {
        var a = {
            textarea: function(a, c) {
                var d = c.ownerDocument.createElement("textarea");
                d.style.cssText = "resize:none;border:0;padding:0;margin:0;overflow-y:auto;outline:0";
                m.ie && 8 > m.version && (d.style.width = c.offsetWidth + "px",
                d.style.height = c.offsetHeight + "px",
                c.onresize = function() {
                    d.style.width = c.offsetWidth + "px";
                    d.style.height = c.offsetHeight + "px"
                }
                );
                c.appendChild(d);
                return {
                    container: d,
                    setContent: function(a) {
                        d.value = a
                    },
                    getContent: function() {
                        return d.value
                    },
                    select: function() {
                        var a;
                        m.ie ? (a = d.createTextRange(),
                        a.collapse(!0),
                        a.select()) : (d.setSelectionRange(0, 0),
                        d.focus())
                    },
                    dispose: function() {
                        c.removeChild(d);
                        c = d = c.onresize = null
                    }
                }
            }
        };
        UM.plugins.source = function() {
            var b = this, c = !1, d;
            this.options.sourceEditor = "textarea";
            b.setOpt({
                sourceEditorFirst: !1
            });
            var e = b.getContent, f;
            b.commands.source = {
                execCommand: function() {
                    if (c = !c) {
                        f = b.selection.getRange().createAddress(!1, !0);
                        b.undoManger && b.undoManger.save(!0);
                        m.gecko && (b.body.contentEditable = !1);
                        b.body.style.cssText += ";position:absolute;left:-32768px;top:-32768px;";
                        b.fireEvent("beforegetcontent");
                        var l = UM.htmlparser(b.body.innerHTML);
                        b.filterOutputRule(l);
                        l.traversal(function(a) {
                            if ("element" == a.type)
                                switch (a.tagName) {
                                case "td":
                                case "th":
                                case "caption":
                                    a.children && 1 == a.children.length && "br" == a.firstChild().tagName && a.removeChild(a.firstChild());
                                    break;
                                case "pre":
                                    a.innerText(a.innerText().replace(/&nbsp;/g, " "))
                                }
                        });
                        b.fireEvent("aftergetcontent");
                        l = l.toHtml(!0);
                        d = a.textarea(b, b.body.parentNode);
                        d.setContent(l);
                        g(d.container).width(g(b.body).width() + parseInt(g(b.body).css("padding-left")) + parseInt(g(b.body).css("padding-right"))).height(g(b.body).height());
                        setTimeout(function() {
                            d.select()
                        });
                        b.getContent = function() {
                            return d.getContent() || "<p>" + (m.ie ? "" : "<br/>") + "</p>"
                        }
                    } else {
                        b.$body.css({
                            position: "",
                            left: "",
                            top: ""
                        });
                        l = d.getContent() || "<p>" + (m.ie ? "" : "<br/>") + "</p>";
                        l = l.replace(RegExp("[\\r\\t\\n ]*</?(\\w+)\\s*(?:[^>]*)>", "g"), function(a, b) {
                            return b && !q.$inlineWithA[b.toLowerCase()] ? a.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g, "") : a.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g, "")
                        });
                        b.setContent(l);
                        d.dispose();
                        d = null;
                        b.getContent = e;
                        b.body.firstChild || (b.body.innerHTML = "<p>" + (m.ie ? "" : "<br/>") + "</p>");
                        b.undoManger && b.undoManger.save(!0);
                        m.gecko && (b.body.contentEditable = !0);
                        try {
                            b.selection.getRange().moveToAddress(f).select()
                        } catch (h) {}
                    }
                    this.fireEvent("sourcemodechanged", c)
                },
                queryCommandState: function() {
                    return c | 0
                },
                notNeedUndo: 1
            };
            var h = b.queryCommandState;
            b.queryCommandState = function(a) {
                a = a.toLowerCase();
                return c ? a in {
                    source: 1,
                    fullscreen: 1
                } ? h.apply(this, arguments) : -1 : h.apply(this, arguments)
            }
        }
    }
    )();
    UM.plugins.enterkey = function() {
        var a, b = this, c = b.options.enterTag;
        b.addListener("keyup", function(c, e) {
            if (13 == (e.keyCode || e.which)) {
                var f = b.selection.getRange(), h = f.startContainer, l;
                if (m.ie)
                    b.fireEvent("saveScene", !0, !0);
                else {
                    if (/h\d/i.test(a)) {
                        if (m.gecko)
                            k.findParentByTagName(h, "h1 h2 h3 h4 h5 h6 blockquote caption table".split(" "), !0) || (b.document.execCommand("formatBlock", !1, "<p>"),
                            l = 1);
                        else if (1 == h.nodeType) {
                            var h = b.document.createTextNode(""), g;
                            f.insertNode(h);
                            if (g = k.findParentByTagName(h, "div", !0)) {
                                for (l = b.document.createElement("p"); g.firstChild; )
                                    l.appendChild(g.firstChild);
                                g.parentNode.insertBefore(l, g);
                                k.remove(g);
                                f.setStartBefore(h).setCursor();
                                l = 1
                            }
                            k.remove(h)
                        }
                        b.undoManger && l && b.undoManger.save()
                    }
                    m.opera && f.select()
                }
            }
        });
        b.addListener("keydown", function(d, e) {
            if (13 == (e.keyCode || e.which))
                if (b.fireEvent("beforeenterkeydown"))
                    k.preventDefault(e);
                else {
                    b.fireEvent("saveScene", !0, !0);
                    a = "";
                    var f = b.selection.getRange();
                    if (!f.collapsed) {
                        var h = f.startContainer
                          , l = f.endContainer
                          , h = k.findParentByTagName(h, "td", !0)
                          , l = k.findParentByTagName(l, "td", !0);
                        if (h && l && h !== l || !h && l || h && !l) {
                            e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                            return
                        }
                    }
                    "p" != c || m.ie || ((h = k.findParentByTagName(f.startContainer, "ol ul p h1 h2 h3 h4 h5 h6 blockquote caption".split(" "), !0)) || m.opera ? (a = h.tagName,
                    "p" == h.tagName.toLowerCase() && m.gecko && k.removeDirtyAttr(h)) : (b.document.execCommand("formatBlock", !1, "<p>"),
                    m.gecko && (f = b.selection.getRange(),
                    (h = k.findParentByTagName(f.startContainer, "p", !0)) && k.removeDirtyAttr(h))))
                }
        });
        m.ie && b.addListener("setDisabled", function() {
            g(b.body).find("p").each(function(a, b) {
                k.isEmptyBlock(b) && (b.innerHTML = "&nbsp;")
            })
        })
    }
    ;
    UM.commands.preview = {
        execCommand: function() {
            var a = window.open("", "_blank", "").document
              , b = this.getContent(null, null, !0)
              , c = this.getOpt("UMEDITOR_HOME_URL")
              , c = -1 != b.indexOf("mathquill-embedded-latex") ? '<link rel="stylesheet" href="' + c + 'third-party/mathquill/mathquill.css"/><script src="' + c + 'third-party/jquery.min.js">\x3c/script><script src="' + c + 'third-party/mathquill/mathquill.min.js">\x3c/script>' : "";
            a.open();
            a.write("<html><head>" + c + "</head><body><div>" + b + "</div></body></html>");
            a.close()
        },
        notNeedUndo: 1
    };
    UM.plugins.basestyle = function() {
        var a = this;
        a.addshortcutkey({
            Bold: "ctrl+66",
            Italic: "ctrl+73",
            Underline: "ctrl+shift+85",
            strikeThrough: "ctrl+shift+83"
        });
        a.addOutputRule(function(a) {
            g.each(a.getNodesByTagName("b i u strike s"), function(a, b) {
                switch (b.tagName) {
                case "b":
                    b.tagName = "strong";
                    break;
                case "i":
                    b.tagName = "em";
                    break;
                case "u":
                    b.tagName = "span";
                    b.setStyle("text-decoration", "underline");
                    break;
                case "s":
                case "strike":
                    b.tagName = "span",
                    b.setStyle("text-decoration", "line-through")
                }
            })
        });
        g.each("bold underline superscript subscript italic strikethrough".split(" "), function(b, c) {
            a.commands[c] = {
                execCommand: function(a) {
                    var b = this.selection.getRange();
                    return b.collapsed && 1 != this.queryCommandState(a) ? (a = this.document.createElement({
                        bold: "strong",
                        underline: "u",
                        superscript: "sup",
                        subscript: "sub",
                        italic: "em",
                        strikethrough: "strike"
                    }[a]),
                    b.insertNode(a).setStart(a, 0).setCursor(!1),
                    !0) : this.document.execCommand(a)
                },
                queryCommandState: function(a) {
                    if (m.gecko)
                        return this.document.queryCommandState(a);
                    var b = this.selection.getStartElementPath()
                      , c = !1;
                    g.each(b, function(b, e) {
                        switch (a) {
                        case "bold":
                            if ("STRONG" == e.nodeName || "B" == e.nodeName)
                                return c = 1,
                                !1;
                            break;
                        case "underline":
                            if ("U" == e.nodeName || "SPAN" == e.nodeName && "underline" == g(e).css("text-decoration"))
                                return c = 1,
                                !1;
                            break;
                        case "superscript":
                            if ("SUP" == e.nodeName)
                                return c = 1,
                                !1;
                            break;
                        case "subscript":
                            if ("SUB" == e.nodeName)
                                return c = 1,
                                !1;
                            break;
                        case "italic":
                            if ("EM" == e.nodeName || "I" == e.nodeName)
                                return c = 1,
                                !1;
                            break;
                        case "strikethrough":
                            if ("S" == e.nodeName || "STRIKE" == e.nodeName || "SPAN" == e.nodeName && "line-through" == g(e).css("text-decoration"))
                                return c = 1,
                                !1
                        }
                    });
                    return c
                }
            }
        })
    }
    ;
    UM.plugins.video = function() {
        function a(a, b, f, h, l, g) {
            return g ? '<embed type="application/x-shockwave-flash" class="edui-faked-video" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + a + '" width="' + b + '" height="' + f + '"' + (l ? ' style="float:' + l + '"' : "") + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >' : "<img " + (h ? 'id="' + h + '"' : "") + ' width="' + b + '" height="' + f + '" _url="' + a + '" class="edui-faked-video" src="' + c.options.UMEDITOR_HOME_URL + 'themes/default/images/spacer.gif" style="background:url(' + c.options.UMEDITOR_HOME_URL + "themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;" + (l ? "float:" + l + ";" : "") + '" />'
        }
        function b(b, c) {
            n.each(b.getNodesByTagName(c ? "img" : "embed"), function(b) {
                if ("edui-faked-video" == b.getAttr("class")) {
                    var d = a(c ? b.getAttr("_url") : b.getAttr("src"), b.getAttr("width"), b.getAttr("height"), null, b.getStyle("float") || "", c);
                    b.parentNode.replaceChild(UM.uNode.createElement(d), b)
                }
            })
        }
        var c = this;
        c.addOutputRule(function(a) {
            b(a, !0)
        });
        c.addInputRule(function(a) {
            b(a)
        });
        c.commands.insertvideo = {
            execCommand: function(b, e) {
                e = n.isArray(e) ? e : [e];
                for (var f = [], h = 0, l, g = e.length; h < g; h++)
                    l = e[h],
                    f.push(a(l.url, l.width || 420, l.height || 280, "tmpVedio" + h, l.align, !1));
                c.execCommand("inserthtml", f.join(""), !0)
            },
            queryCommandState: function() {
                var a = c.selection.getRange().getClosedNode();
                return a && "edui-faked-video" == a.className ? 1 : 0
            }
        }
    }
    ;
    UM.plugins.selectall = function() {
        this.commands.selectall = {
            execCommand: function() {
                var a = this.body
                  , b = this.selection.getRange();
                b.selectNodeContents(a);
                k.isEmptyBlock(a) && (m.opera && a.firstChild && 1 == a.firstChild.nodeType && b.setStartAtFirst(a.firstChild),
                b.collapse(!0));
                b.select(!0)
            },
            notNeedUndo: 1
        };
        this.addshortcutkey({
            selectAll: "ctrl+65"
        })
    }
    ;
    UM.plugins.removeformat = function() {
        this.setOpt({
            removeFormatTags: "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var",
            removeFormatAttributes: "class,style,lang,width,height,align,hspace,valign"
        });
        this.commands.removeformat = {
            execCommand: function(a, b, c, d, e) {
                function f(a) {
                    if (3 == a.nodeType || "span" != a.tagName.toLowerCase())
                        return 0;
                    if (m.ie) {
                        var b = a.attributes;
                        if (b.length) {
                            a = 0;
                            for (var c = b.length; a < c; a++)
                                if (b[a].specified)
                                    return 0;
                            return 1
                        }
                    }
                    return !a.attributes.length
                }
                function h(a) {
                    var b = a.createBookmark();
                    a.collapsed && a.enlarge(!0);
                    if (!e) {
                        var d = k.findParentByTagName(a.startContainer, "a", !0);
                        d && a.setStartBefore(d);
                        (d = k.findParentByTagName(a.endContainer, "a", !0)) && a.setEndAfter(d)
                    }
                    p = a.createBookmark();
                    for (d = p.start; (r = d.parentNode) && !k.isBlockElm(r); )
                        k.breakParent(d, r),
                        k.clearEmptySibling(d);
                    if (p.end) {
                        for (d = p.end; (r = d.parentNode) && !k.isBlockElm(r); )
                            k.breakParent(d, r),
                            k.clearEmptySibling(d);
                        for (var d = k.getNextDomNode(p.start, !1, n), h; d && d != p.end; )
                            h = k.getNextDomNode(d, !0, n),
                            q.$empty[d.tagName.toLowerCase()] || k.isBookmarkNode(d) || (l.test(d.tagName) ? c ? (k.removeStyle(d, c),
                            f(d) && "text-decoration" != c && k.remove(d, !0)) : k.remove(d, !0) : q.$tableContent[d.tagName] || q.$list[d.tagName] || (k.removeAttributes(d, g),
                            f(d) && k.remove(d, !0))),
                            d = h
                    }
                    d = p.start.parentNode;
                    !k.isBlockElm(d) || q.$tableContent[d.tagName] || q.$list[d.tagName] || k.removeAttributes(d, g);
                    d = p.end.parentNode;
                    p.end && k.isBlockElm(d) && !q.$tableContent[d.tagName] && !q.$list[d.tagName] && k.removeAttributes(d, g);
                    a.moveToBookmark(p).moveToBookmark(b);
                    d = a.startContainer;
                    for (h = a.collapsed; 1 == d.nodeType && k.isEmptyNode(d) && q.$removeEmpty[d.tagName]; )
                        b = d.parentNode,
                        a.setStartBefore(d),
                        a.startContainer === a.endContainer && a.endOffset--,
                        k.remove(d),
                        d = b;
                    if (!h)
                        for (d = a.endContainer; 1 == d.nodeType && k.isEmptyNode(d) && q.$removeEmpty[d.tagName]; )
                            b = d.parentNode,
                            a.setEndBefore(d),
                            k.remove(d),
                            d = b
                }
                var l = RegExp("^(?:" + (b || this.options.removeFormatTags).replace(/,/g, "|") + ")$", "i")
                  , g = c ? [] : (d || this.options.removeFormatAttributes).split(",");
                a = new B.Range(this.document);
                var p, r, n = function(a) {
                    return 1 == a.nodeType
                };
                a = this.selection.getRange();
                a.collapsed || (h(a),
                a.select())
            }
        }
    }
    ;
    UM.plugins.keystrokes = function() {
        var a = this
          , b = !0;
        a.addListener("keydown", function(c, d) {
            var e = d.keyCode || d.which
              , f = a.selection.getRange();
            if (!(f.collapsed || d.ctrlKey || d.shiftKey || d.altKey || d.metaKey) && (65 <= e && 90 >= e || 48 <= e && 57 >= e || 96 <= e && 111 >= e || {
                13: 1,
                8: 1,
                46: 1
            }[e])) {
                var h = f.startContainer;
                k.isFillChar(h) && f.setStartBefore(h);
                h = f.endContainer;
                k.isFillChar(h) && f.setEndAfter(h);
                f.txtToElmBoundary();
                f.endContainer && 1 == f.endContainer.nodeType && (h = f.endContainer.childNodes[f.endOffset]) && k.isBr(h) && f.setEndAfter(h);
                if (0 == f.startOffset && (h = f.startContainer,
                k.isBoundaryNode(h, "firstChild") && (h = f.endContainer,
                f.endOffset == (3 == h.nodeType ? h.nodeValue.length : h.childNodes.length) && k.isBoundaryNode(h, "lastChild")))) {
                    a.fireEvent("saveScene");
                    a.body.innerHTML = "<p>" + (m.ie ? "" : "<br/>") + "</p>";
                    f.setStart(a.body.firstChild, 0).setCursor(!1, !0);
                    a._selectionChange();
                    return
                }
            }
            if (8 == e) {
                f = a.selection.getRange();
                b = f.collapsed;
                if (a.fireEvent("delkeydown", d))
                    return;
                var l;
                f.collapsed && f.inFillChar() && (h = f.startContainer,
                k.isFillChar(h) ? (f.setStartBefore(h).shrinkBoundary(!0).collapse(!0),
                k.remove(h)) : (h.nodeValue = h.nodeValue.replace(RegExp("^" + k.fillChar), ""),
                f.startOffset--,
                f.collapse(!0).select(!0)));
                if (h = f.getClosedNode()) {
                    a.fireEvent("saveScene");
                    f.setStartBefore(h);
                    k.remove(h);
                    f.setCursor();
                    a.fireEvent("saveScene");
                    k.preventDefault(d);
                    return
                }
                if (!m.ie && (h = k.findParentByTagName(f.startContainer, "table", !0),
                l = k.findParentByTagName(f.endContainer, "table", !0),
                h && !l || !h && l || h !== l)) {
                    d.preventDefault();
                    return
                }
                h = f.startContainer;
                f.collapsed && 1 == h.nodeType && (h = h.childNodes[f.startOffset - 1]) && 1 == h.nodeType && "BR" == h.tagName && (a.fireEvent("saveScene"),
                f.setStartBefore(h).collapse(!0),
                k.remove(h),
                f.select(),
                a.fireEvent("saveScene"));
                if (m.chrome && f.collapsed) {
                    for (; 0 == f.startOffset && !k.isEmptyBlock(f.startContainer); )
                        f.setStartBefore(f.startContainer);
                    (h = f.startContainer.childNodes[f.startOffset - 1]) && "BR" == h.nodeName && (f.setStartBefore(h),
                    a.fireEvent("saveScene"),
                    g(h).remove(),
                    f.setCursor(),
                    a.fireEvent("saveScene"))
                }
            }
            if (m.gecko && 46 == e && (e = a.selection.getRange(),
            e.collapsed && (h = e.startContainer,
            k.isEmptyBlock(h)))) {
                for (e = h.parentNode; 1 == k.getChildCount(e) && !k.isBody(e); )
                    h = e,
                    e = e.parentNode;
                h === e.lastChild && d.preventDefault()
            }
        });
        a.addListener("keyup", function(a, d) {
            var e;
            if (8 == (d.keyCode || d.which) && !this.fireEvent("delkeyup")) {
                e = this.selection.getRange();
                if (e.collapsed) {
                    var f;
                    if ((f = k.findParentByTagName(e.startContainer, "h1 h2 h3 h4 h5 h6".split(" "), !0)) && k.isEmptyBlock(f)) {
                        var h = f.previousSibling;
                        if (h && "TABLE" != h.nodeName) {
                            k.remove(f);
                            e.setStartAtLast(h).setCursor(!1, !0);
                            return
                        }
                        if ((h = f.nextSibling) && "TABLE" != h.nodeName) {
                            k.remove(f);
                            e.setStartAtFirst(h).setCursor(!1, !0);
                            return
                        }
                    }
                    k.isBody(e.startContainer) && (f = k.createElement(this.document, "p", {
                        innerHTML: m.ie ? k.fillChar : "<br/>"
                    }),
                    e.insertNode(f).setStart(f, 0).setCursor(!1, !0))
                }
                !b && (3 == e.startContainer.nodeType || 1 == e.startContainer.nodeType && k.isEmptyBlock(e.startContainer)) && (m.ie ? (f = e.document.createElement("span"),
                e.insertNode(f).setStartBefore(f).collapse(!0),
                e.select(),
                k.remove(f)) : e.select())
            }
        })
    }
    ;
    UM.plugins.autosave = function() {
        function a(a) {
            var l = null;
            new Date - c < d || (a.hasContents() ? (c = new Date,
            a._saveFlag = null,
            l = b.body.innerHTML,
            !1 !== a.fireEvent("beforeautosave", {
                content: l
            }) && (f.saveLocalData(e, l),
            a.fireEvent("afterautosave", {
                content: l
            }))) : e && f.removeItem(e))
        }
        var b = this
          , c = new Date
          , d = 20
          , e = null;
        b.setOpt("saveInterval", 500);
        var f = UM.LocalStorage = function() {
            function a() {
                var b = document.createElement("div");
                b.style.display = "none";
                if (!b.addBehavior)
                    return null;
                b.addBehavior("#default#userdata");
                return {
                    getItem: function(a) {
                        var d = null;
                        try {
                            document.body.appendChild(b),
                            b.load(c),
                            d = b.getAttribute(a),
                            document.body.removeChild(b)
                        } catch (e) {}
                        return d
                    },
                    setItem: function(a, d) {
                        document.body.appendChild(b);
                        b.setAttribute(a, d);
                        b.save(c);
                        document.body.removeChild(b)
                    },
                    removeItem: function(a) {
                        document.body.appendChild(b);
                        b.removeAttribute(a);
                        b.save(c);
                        document.body.removeChild(b)
                    }
                }
            }
            var b = window.localStorage || a() || null
              , c = "localStorage";
            return {
                saveLocalData: function(a, c) {
                    return b && c ? (b.setItem(a, c),
                    !0) : !1
                },
                getLocalData: function(a) {
                    return b ? b.getItem(a) : null
                },
                removeItem: function(a) {
                    b && b.removeItem(a)
                }
            }
        }();
        b.addListener("ready", function() {
            var a = null
              , a = b.key ? b.key + "-drafts-data" : (b.container.parentNode.id || "ue-common") + "-drafts-data";
            e = (location.protocol + location.host + location.pathname).replace(/[.:\/]/g, "_") + a
        });
        b.addListener("contentchange", function() {
            e && (b._saveFlag && window.clearTimeout(b._saveFlag),
            0 < b.options.saveInterval ? b._saveFlag = window.setTimeout(function() {
                a(b)
            }, b.options.saveInterval) : a(b))
        });
        b.commands.clearlocaldata = {
            execCommand: function(a, b) {
                e && f.getLocalData(e) && f.removeItem(e)
            },
            notNeedUndo: !0,
            ignoreContentChange: !0
        };
        b.commands.getlocaldata = {
            execCommand: function(a, b) {
                return e ? f.getLocalData(e) || "" : ""
            },
            notNeedUndo: !0,
            ignoreContentChange: !0
        };
        b.commands.drafts = {
            execCommand: function(a, c) {
                e && (b.body.innerHTML = f.getLocalData(e) || "<p>" + (m.ie ? "&nbsp;" : "<br/>") + "</p>",
                b.focus(!0))
            },
            queryCommandState: function() {
                return e ? null === f.getLocalData(e) ? -1 : 0 : -1
            },
            notNeedUndo: !0,
            ignoreContentChange: !0
        }
    }
    ;
    UM.plugins.autoupload = function() {
        var a = this;
        a.setOpt("pasteImageEnabled", !0);
        a.setOpt("dropFileEnabled", !0);
        var b = function(b, d) {
            var e = new FormData;
            e.append(d.options.imageFieldName || "upfile", b, b.name || "blob." + b.type.substr(6));
            e.append("type", "ajax");
            var f = new XMLHttpRequest;
            f.open("post", a.options.imageUrl, true);
            f.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            function loadAutoupImg() {
            	if(f.readyState == 4)
            	    if(f.status == 200)
            			var rls = JSON.parse(dealBackJson(f.responseText));
            			var e = a.options.imagePath + rls.url;
		            	d.execCommand("insertimage", {
		                    src: e,
		                    _src: e
		                })
            }
            f.onreadystatechange = loadAutoupImg;
            f.send(e)
        };
        a.addListener("ready", function() {
            if (window.FormData && window.FileReader) {
                var c = function(c) {
                    var e = !1;
                    "paste" == c.type ? (c = c.originalEvent,
                    c = c.clipboardData && c.clipboardData.items && 1 == c.clipboardData.items.length && /^image\//.test(c.clipboardData.items[0].type) ? c.clipboardData.items : null) : (c = c.originalEvent,
                    c = c.dataTransfer && c.dataTransfer.files ? c.dataTransfer.files : null);
                    if (c) {
                        for (var f = c.length, h; f--; ){
                            h = c[f],
                            h.getAsFile && (h = h.getAsFile()),
                            h && 0 < h.size && /image\/\w+/i.test(h.type) && (b(h, a),
                            e = !0);
                        }
                        if (e)
                            return !1
                    }
                };
                a.getOpt("pasteImageEnabled") && a.$body.on("paste", c);
                a.getOpt("dropFileEnabled") && a.$body.on("drop", c);
                a.$body.on("dragover", function(a) {
                    if ("Files" == a.originalEvent.dataTransfer.types[0])
                        return !1
                })
            }
        })
    }
    ;
    UM.plugins.formula = function() {
        function a() {
            return c.$body.find("iframe.edui-formula-active")[0] || null
        }
        function b() {
            var b = a();
            b && b.contentWindow.formula.blur()
        }
        var c = this;
        c.addInputRule(function(a) {
            g.each(a.getNodesByTagName("span"), function(a, b) {
                if (b.hasClass("mathquill-embedded-latex")) {
                    for (var d, l = ""; d = b.firstChild(); )
                        l += d.data,
                        b.removeChild(d);
                    b.tagName = "iframe";
                    b.setAttr({
                        frameborder: "0",
                        src: c.getOpt("UMEDITOR_HOME_URL") + "dialogs/formula/formula.html",
                        "data-latex": n.unhtml(l)
                    })
                }
            })
        });
        c.addOutputRule(function(a) {
            g.each(a.getNodesByTagName("iframe"), function(a, b) {
                b.hasClass("mathquill-embedded-latex") && (b.tagName = "span",
                b.appendChild(UM.uNode.createText(b.getAttr("data-latex"))),
                b.setAttr({
                    frameborder: "",
                    src: "",
                    "data-latex": ""
                }))
            })
        });
        c.addListener("click", function() {
            b()
        });
        c.addListener("afterexeccommand", function(a, c) {
            "formula" != c && b()
        });
        c.commands.formula = {
            execCommand: function(b, e) {
                var f = a();
                f ? f.contentWindow.formula.insertLatex(e) : (c.execCommand("inserthtml", '<span class="mathquill-embedded-latex">' + e + "</span>"),
                m.ie && m.ie9below && setTimeout(function() {
                    var a = c.selection.getRange()
                      , b = a.startContainer;
                    1 != b.nodeType || b.childNodes[a.startOffset] || (a.insertNode(c.document.createTextNode(" ")),
                    a.setCursor())
                }, 100))
            },
            queryCommandState: function(a) {
                return 0
            },
            queryCommandValue: function(b) {
                return (b = a()) && b.contentWindow.formula.getLatex()
            }
        }
    }
    ;
    (function(a) {
        function b(b, c, d) {
            b.prototype = a.extend2(a.extend({}, c), (UM.ui[d] || e).prototype, !0);
            b.prototype.supper = (UM.ui[d] || e).prototype;
            UM.ui[d] && UM.ui[d].prototype.defaultOpt && (b.prototype.defaultOpt = a.extend({}, UM.ui[d].prototype.defaultOpt, b.prototype.defaultOpt || {}));
            return b
        }
        function c(b, c) {
            a[f + c] = b;
            a.fn[f + c] = function(c) {
                var d, e = Array.prototype.slice.call(arguments, 1);
                this.each(function(f, h) {
                    var g = a(h)
                      , k = g.edui();
                    k || (b(c && a.isPlainObject(c) ? c : {}, g),
                    g.edui(k));
                    if ("string" == a.type(c))
                        if ("this" == c)
                            d = k;
                        else {
                            d = k[c].apply(k, e);
                            if (d !== k && void 0 !== d)
                                return !1;
                            d = null
                        }
                });
                return null !== d ? d : this
            }
        }
        a.parseTmpl = function(a, b) {
            var c = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/<%=([\s\S]+?)%>/g, function(a, b) {
                return "'," + b.replace(/\\'/g, "'") + ",'"
            }).replace(/<%([\s\S]+?)%>/g, function(a, b) {
                return "');" + b.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('"
            }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');"
              , c = new Function("obj",c);
            return b ? c(b) : c
        }
        ;
        a.extend2 = function(b, c) {
            for (var d = arguments, e = "boolean" == a.type(d[d.length - 1]) ? d[d.length - 1] : !1, f = "boolean" == a.type(d[d.length - 1]) ? d.length - 1 : d.length, h = 1; h < f; h++) {
                var g = d[h], k;
                for (k in g)
                    e && b.hasOwnProperty(k) || (b[k] = g[k])
            }
            return b
        }
        ;
        a.IE6 = !!window.ActiveXObject && 6 == parseFloat(navigator.userAgent.match(/msie (\d+)/i)[1]);
        var d = []
          , e = function() {}
          , f = "edui";
        e.prototype = {
            on: function(b, c) {
                this.root().on(b, a.proxy(c, this));
                return this
            },
            off: function(b, c) {
                this.root().off(b, a.proxy(c, this));
                return this
            },
            trigger: function(a, b) {
                return !1 === this.root().trigger(a, b) ? !1 : this
            },
            root: function(a) {
                return this._$el || (this._$el = a)
            },
            destroy: function() {},
            data: function(a, b) {
                return void 0 !== b ? (this.root().data(f + a, b),
                this) : this.root().data(f + a)
            },
            register: function(b, c, e) {
                d.push({
                    evtname: b,
                    $els: a.isArray(c) ? c : [c],
                    handler: a.proxy(e, c)
                })
            }
        };
        a.fn.edui = function(a) {
            return a ? this.data("eduiwidget", a) : this.data("eduiwidget")
        }
        ;
        var h = 1;
        UM.ui = {
            define: function(d, e, g) {
                var k = UM.ui[d] = b(function(b, c) {
                    var e = function() {};
                    a.extend(e.prototype, k.prototype, {
                        guid: d + h++,
                        widgetName: d
                    });
                    e = new e;
                    if ("string" == a.type(b))
                        return e.init && e.init({}),
                        e.root().edui(e),
                        e.root().find("a").click(function(a) {
                            a.preventDefault()
                        }),
                        e.root()[f + d].apply(e.root(), arguments);
                    c && e.root(c);
                    e.init && e.init(!b || a.isPlainObject(b) ? a.extend2(b || {}, e.defaultOpt || {}, !0) : b);
                    try {
                        e.root().find("a").click(function(a) {
                            a.preventDefault()
                        })
                    } catch (g) {}
                    return e.root().edui(e)
                }, e, g);
                c(k, d)
            }
        };
        a(function() {
            a(document).on("click mouseup mousedown dblclick mouseover", function(b) {
                a.each(d, function(c, d) {
                    d.evtname == b.type && a.each(d.$els, function(c, e) {
                        e[0] === b.target || a.contains(e[0], b.target) || d.handler(b)
                    })
                })
            })
        })
    }
    )(jQuery);
    UM.ui.define("button", {
        tpl: '<<%if(!texttype){%>div class="edui-btn edui-btn-<%=icon%> <%if(name){%>edui-btn-name-<%=name%><%}%>" unselectable="on" onmousedown="return false" <%}else{%>a class="edui-text-btn"<%}%><% if(title) {%> data-original-title="<%=title%>" <%};%>> <% if(icon) {%><div unselectable="on" class="edui-icon-<%=icon%> edui-icon"></div><% }; %><%if(text) {%><span unselectable="on" onmousedown="return false" class="edui-button-label"><%=text%></span><%}%><%if(caret && text){%><span class="edui-button-spacing"></span><%}%><% if(caret) {%><span unselectable="on" onmousedown="return false" class="edui-caret"></span><% };%></<%if(!texttype){%>div<%}else{%>a<%}%>>',
        defaultOpt: {
            text: "",
            title: "",
            icon: "",
            width: "",
            caret: !1,
            texttype: !1,
            click: function() {}
        },
        init: function(a) {
            var b = this;
            b.root(g(g.parseTmpl(b.tpl, a))).click(function(c) {
                b.wrapclick(a.click, c)
            });
            b.root().hover(function() {
                b.root().hasClass("edui-disabled") || b.root().toggleClass("edui-hover")
            });
            return b
        },
        wrapclick: function(a, b) {
            this.disabled() || (this.root().trigger("wrapclick"),
            g.proxy(a, this, b)());
            return this
        },
        label: function(a) {
            if (void 0 === a)
                return this.root().find(".edui-button-label").text();
            this.root().find(".edui-button-label").text(a);
            return this
        },
        disabled: function(a) {
            if (void 0 === a)
                return this.root().hasClass("edui-disabled");
            this.root().toggleClass("edui-disabled", a);
            this.root().hasClass("edui-disabled") && this.root().removeClass("edui-hover");
            return this
        },
        active: function(a) {
            if (void 0 === a)
                return this.root().hasClass("edui-active");
            this.root().toggleClass("edui-active", a);
            return this
        },
        mergeWith: function(a) {
            var b = this;
            b.data("$mergeObj", a);
            a.edui().data("$mergeObj", b.root());
            g.contains(document.body, a[0]) || a.appendTo(b.root());
            b.on("click", function() {
                b.wrapclick(function() {
                    a.edui().show()
                })
            }).register("click", b.root(), function(b) {
                a.hide()
            })
        }
    });
    (function() {
        UM.ui.define("toolbar", {
            tpl: '<div class="edui-toolbar"  ><div class="edui-btn-toolbar" unselectable="on" onmousedown="return false"  ></div></div>',
            init: function() {
                var a = this.root(g(this.tpl));
                this.data("$btnToolbar", a.find(".edui-btn-toolbar"))
            },
            appendToBtnmenu: function(a) {
                var b = this.data("$btnToolbar");
                a = g.isArray(a) ? a : [a];
                g.each(a, function(a, d) {
                    b.append(d)
                })
            }
        })
    }
    )();
    UM.ui.define("menu", {
        show: function(a, b, c, d, e) {
            c = c || "position";
            !1 !== this.trigger("beforeshow") && (this.root().css(g.extend({
                display: "block"
            }, a ? {
                top: a[c]().top + ("right" == b ? 0 : a.outerHeight()) - (d || 0),
                left: a[c]().left + ("right" == b ? a.outerWidth() : 0) - (e || 0)
            } : {})),
            this.trigger("aftershow"))
        },
        hide: function(a) {
            var b;
            !1 !== this.trigger("beforehide") && ((b = this.root().data("parentmenu")) && (b.data("parentmenu") || a) && b.edui().hide(),
            this.root().css("display", "none"),
            this.trigger("afterhide"))
        },
        attachTo: function(a) {
            var b = this;
            a.data("$mergeObj") || (a.data("$mergeObj", b.root()),
            a.on("wrapclick", function(a) {
                b.show()
            }),
            b.register("click", a, function(a) {
                b.hide()
            }),
            b.data("$mergeObj", a))
        }
    });
    UM.ui.define("dropmenu", {
        tmpl: '<ul class="edui-dropdown-menu" aria-labelledby="dropdownMenu" ><%for(var i=0,ci;ci=data[i++];){%><%if(ci.divider){%><li class="edui-divider"></li><%}else{%><li <%if(ci.active||ci.disabled){%>class="<%= ci.active|| \'\' %> <%=ci.disabled||\'\' %>" <%}%> data-value="<%= ci.value%>"><a href="#" tabindex="-1"><em class="edui-dropmenu-checkbox"><i class="edui-icon-ok"></i></em><%= ci.label%></a></li><%}%><%}%></ul>',
        defaultOpt: {
            data: [],
            click: function() {}
        },
        init: function(a) {
            var b = this
              , c = {
                click: 1,
                mouseover: 1,
                mouseout: 1
            };
            this.root(g(g.parseTmpl(this.tmpl, a))).on("click", 'li[class!="edui-disabled edui-divider edui-dropdown-submenu"]', function(c) {
                g.proxy(a.click, b, c, g(this).data("value"), g(this))()
            }).find("li").each(function(d, e) {
                var f = g(this);
                if (!f.hasClass("edui-disabled edui-divider edui-dropdown-submenu")) {
                    var h = a.data[d];
                    g.each(c, function(a) {
                        h[a] && f[a](function(c) {
                            g.proxy(h[a], e)(c, h, b.root)
                        })
                    })
                }
            })
        },
        disabled: function(a) {
            g("li[class!=edui-divider]", this.root()).each(function() {
                var b = g(this);
                !0 === a ? b.addClass("edui-disabled") : g.isFunction(a) ? b.toggleClass("edui-disabled", a(li)) : b.removeClass("edui-disabled")
            })
        },
        val: function(a) {
            var b;
            g('li[class!="edui-divider edui-disabled edui-dropdown-submenu"]', this.root()).each(function() {
                var c = g(this);
                if (void 0 === a) {
                    if (c.find("em.edui-dropmenu-checked").length)
                        return b = c.data("value"),
                        !1
                } else
                    c.find("em").toggleClass("edui-dropmenu-checked", c.data("value") == a)
            });
            if (void 0 === a)
                return b
        },
        addSubmenu: function(a, b, c) {
            c = c || 0;
            var d = g("li[class!=edui-divider]", this.root());
            a = g('<li class="edui-dropdown-submenu"><a tabindex="-1" href="#">' + a + "</a></li>").append(b);
            0 <= c && c < d.length ? a.insertBefore(d[c]) : 0 > c ? a.insertBefore(d[0]) : c >= d.length && a.appendTo(d)
        }
    }, "menu");
    UM.ui.define("splitbutton", {
        tpl: '<div class="edui-splitbutton <%if (name){%>edui-splitbutton-<%= name %><%}%>"  unselectable="on" <%if(title){%>data-original-title="<%=title%>"<%}%>><div class="edui-btn"  unselectable="on" ><%if(icon){%><div  unselectable="on" class="edui-icon-<%=icon%> edui-icon"></div><%}%><%if(text){%><%=text%><%}%></div><div  unselectable="on" class="edui-btn edui-dropdown-toggle" ><div  unselectable="on" class="edui-caret"></div></div></div>',
        defaultOpt: {
            text: "",
            title: "",
            click: function() {}
        },
        init: function(a) {
            var b = this;
            b.root(g(g.parseTmpl(b.tpl, a)));
            b.root().find(".edui-btn:first").click(function(c) {
                b.disabled() || g.proxy(a.click, b)()
            });
            b.root().find(".edui-dropdown-toggle").click(function() {
                b.disabled() || b.trigger("arrowclick")
            });
            b.root().hover(function() {
                b.root().hasClass("edui-disabled") || b.root().toggleClass("edui-hover")
            });
            return b
        },
        wrapclick: function(a, b) {
            this.disabled() || g.proxy(a, this, b)();
            return this
        },
        disabled: function(a) {
            if (void 0 === a)
                return this.root().hasClass("edui-disabled");
            this.root().toggleClass("edui-disabled", a).find(".edui-btn").toggleClass("edui-disabled", a);
            return this
        },
        active: function(a) {
            if (void 0 === a)
                return this.root().hasClass("edui-active");
            this.root().toggleClass("edui-active", a).find(".edui-btn:first").toggleClass("edui-active", a);
            return this
        },
        mergeWith: function(a) {
            var b = this;
            b.data("$mergeObj", a);
            a.edui().data("$mergeObj", b.root());
            g.contains(document.body, a[0]) || a.appendTo(b.root());
            b.root().delegate(".edui-dropdown-toggle", "click", function() {
                b.wrapclick(function() {
                    a.edui().show()
                })
            });
            b.register("click", b.root().find(".edui-dropdown-toggle"), function(b) {
                a.hide()
            })
        }
    });
    UM.ui.define("colorsplitbutton", {
        tpl: '<div class="edui-splitbutton <%if (name){%>edui-splitbutton-<%= name %><%}%>"  unselectable="on" <%if(title){%>data-original-title="<%=title%>"<%}%>><div class="edui-btn"  unselectable="on" ><%if(icon){%><div  unselectable="on" class="edui-icon-<%=icon%> edui-icon"></div><%}%><div class="edui-splitbutton-color-label" <%if (color) {%>style="background: <%=color%>"<%}%>></div><%if(text){%><%=text%><%}%></div><div  unselectable="on" class="edui-btn edui-dropdown-toggle" ><div  unselectable="on" class="edui-caret"></div></div></div>',
        defaultOpt: {
            color: ""
        },
        init: function(a) {
            this.supper.init.call(this, a)
        },
        colorLabel: function() {
            return this.root().find(".edui-splitbutton-color-label")
        }
    }, "splitbutton");
    UM.ui.define("popup", {
        tpl: '<div class="edui-dropdown-menu edui-popup"<%if(!<%=stopprop%>){%>onmousedown="return false"<%}%>><div class="edui-popup-body" unselectable="on" onmousedown="return false"><%=subtpl%></div><div class="edui-popup-caret"></div></div>',
        defaultOpt: {
            stopprop: !1,
            subtpl: "",
            width: "",
            height: ""
        },
        init: function(a) {
            this.root(g(g.parseTmpl(this.tpl, a)));
            return this
        },
        mergeTpl: function(a) {
            return g.parseTmpl(this.tpl, {
                subtpl: a
            })
        },
        show: function(a, b) {
            b || (b = {});
            var c = b.fnname || "position";
            !1 !== this.trigger("beforeshow") && (this.root().css(g.extend({
                display: "block"
            }, a ? {
                top: a[c]().top + ("right" == b.dir ? 0 : a.outerHeight()) - (b.offsetTop || 0),
                left: a[c]().left + ("right" == b.dir ? a.outerWidth() : 0) - (b.offsetLeft || 0),
                position: "absolute"
            } : {})),
            this.root().find(".edui-popup-caret").css({
                top: b.caretTop || 0,
                left: b.caretLeft || 0,
                position: "absolute"
            }).addClass(b.caretDir || "up"),
            this.trigger("aftershow"))
        },
        hide: function() {
            this.root().css("display", "none");
            this.trigger("afterhide")
        },
        attachTo: function(a, b) {
            var c = this;
            a.data("$mergeObj") || (a.data("$mergeObj", c.root()),
            a.on("wrapclick", function(d) {
                c.show(a, b)
            }),
            c.register("click", a, function(a) {
                c.hide()
            }),
            c.data("$mergeObj", a))
        },
        getBodyContainer: function() {
            return this.root().find(".edui-popup-body")
        }
    });
    UM.ui.define("scale", {
        tpl: '<div class="edui-scale" unselectable="on"><span class="edui-scale-hand0"></span><span class="edui-scale-hand1"></span><span class="edui-scale-hand2"></span><span class="edui-scale-hand3"></span><span class="edui-scale-hand4"></span><span class="edui-scale-hand5"></span><span class="edui-scale-hand6"></span><span class="edui-scale-hand7"></span></div>',
        defaultOpt: {
            $doc: g(document),
            $wrap: g(document)
        },
        init: function(a) {
            a.$doc && (this.defaultOpt.$doc = a.$doc);
            a.$wrap && (this.defaultOpt.$wrap = a.$wrap);
            this.root(g(g.parseTmpl(this.tpl, a)));
            this.initStyle();
            this.startPos = this.prePos = {
                x: 0,
                y: 0
            };
            this.dragId = -1;
            return this
        },
        initStyle: function() {
            n.cssRule("edui-style-scale", ".edui-scale{display:none;position:absolute;border:1px solid #38B2CE;cursor:hand;}.edui-scale span{position:absolute;left:0;top:0;width:7px;height:7px;overflow:hidden;font-size:0px;display:block;background-color:#3C9DD0;}.edui-scale .edui-scale-hand0{cursor:nw-resize;top:0;margin-top:-4px;left:0;margin-left:-4px;}.edui-scale .edui-scale-hand1{cursor:n-resize;top:0;margin-top:-4px;left:50%;margin-left:-4px;}.edui-scale .edui-scale-hand2{cursor:ne-resize;top:0;margin-top:-4px;left:100%;margin-left:-3px;}.edui-scale .edui-scale-hand3{cursor:w-resize;top:50%;margin-top:-4px;left:0;margin-left:-4px;}.edui-scale .edui-scale-hand4{cursor:e-resize;top:50%;margin-top:-4px;left:100%;margin-left:-3px;}.edui-scale .edui-scale-hand5{cursor:sw-resize;top:100%;margin-top:-3px;left:0;margin-left:-4px;}.edui-scale .edui-scale-hand6{cursor:s-resize;top:100%;margin-top:-3px;left:50%;margin-left:-4px;}.edui-scale .edui-scale-hand7{cursor:se-resize;top:100%;margin-top:-3px;left:100%;margin-left:-3px;}")
        },
        _eventHandler: function(a) {
            var b = this.defaultOpt.$doc;
            switch (a.type) {
            case "mousedown":
                var c = a.target || a.srcElement;
                -1 != c.className.indexOf("edui-scale-hand") && (this.dragId = c.className.slice(-1),
                this.startPos.x = this.prePos.x = a.clientX,
                this.startPos.y = this.prePos.y = a.clientY,
                b.bind("mousemove", g.proxy(this._eventHandler, this)));
                break;
            case "mousemove":
                -1 != this.dragId && (this.updateContainerStyle(this.dragId, {
                    x: a.clientX - this.prePos.x,
                    y: a.clientY - this.prePos.y
                }),
                this.prePos.x = a.clientX,
                this.prePos.y = a.clientY,
                this.updateTargetElement());
                break;
            case "mouseup":
                -1 != this.dragId && (this.dragId = -1,
                this.updateTargetElement(),
                this.data("$scaleTarget").parent() && this.attachTo(this.data("$scaleTarget"))),
                b.unbind("mousemove", g.proxy(this._eventHandler, this))
            }
        },
        updateTargetElement: function() {
            var a = this.root()
              , b = this.data("$scaleTarget");
            b.css({
                width: a.width(),
                height: a.height()
            });
            this.attachTo(b)
        },
        updateContainerStyle: function(a, b) {
            var c = this.root(), d, e = [[0, 0, -1, -1], [0, 0, 0, -1], [0, 0, 1, -1], [0, 0, -1, 0], [0, 0, 1, 0], [0, 0, -1, 1], [0, 0, 0, 1], [0, 0, 1, 1]];
            0 != e[a][0] && (d = parseInt(c.offset().left) + b.x,
            c.css("left", this._validScaledProp("left", d)));
            0 != e[a][1] && (d = parseInt(c.offset().top) + b.y,
            c.css("top", this._validScaledProp("top", d)));
            0 != e[a][2] && (d = c.width() + e[a][2] * b.x,
            c.css("width", this._validScaledProp("width", d)));
            0 != e[a][3] && (d = c.height() + e[a][3] * b.y,
            c.css("height", this._validScaledProp("height", d)))
        },
        _validScaledProp: function(a, b) {
            var c = this.root()
              , d = this.defaultOpt.$doc
              , e = function(a, c, d) {
                return a + c > d ? d - c : b
            };
            b = isNaN(b) ? 0 : b;
            switch (a) {
            case "left":
                return 0 > b ? 0 : e(b, c.width(), d.width());
            case "top":
                return 0 > b ? 0 : e(b, c.height(), d.height());
            case "width":
                return 0 >= b ? 1 : e(b, c.offset().left, d.width());
            case "height":
                return 0 >= b ? 1 : e(b, c.offset().top, d.height())
            }
        },
        show: function(a) {
            a && this.attachTo(a);
            this.root().bind("mousedown", g.proxy(this._eventHandler, this));
            this.defaultOpt.$doc.bind("mouseup", g.proxy(this._eventHandler, this));
            this.root().show();
            this.trigger("aftershow")
        },
        hide: function() {
            this.root().unbind("mousedown", g.proxy(this._eventHandler, this));
            this.defaultOpt.$doc.unbind("mouseup", g.proxy(this._eventHandler, this));
            this.root().hide();
            this.trigger("afterhide")
        },
        attachTo: function(a) {
            var b = a.offset()
              , c = this.root()
              , d = this.defaultOpt.$wrap
              , e = d.offset();
            this.data("$scaleTarget", a);
            this.root().css({
                position: "absolute",
                width: a.width(),
                height: a.height(),
                left: b.left - e.left - parseInt(d.css("border-left-width")) - parseInt(c.css("border-left-width")),
                top: b.top - e.top - parseInt(d.css("border-top-width")) - parseInt(c.css("border-top-width"))
            })
        },
        getScaleTarget: function() {
            return this.data("$scaleTarget")[0]
        }
    });
    UM.ui.define("colorpicker", {
        tpl: function(a) {
            for (var b = "ffffff 000000 eeece1 1f497d 4f81bd c0504d 9bbb59 8064a2 4bacc6 f79646 f2f2f2 7f7f7f ddd9c3 c6d9f0 dbe5f1 f2dcdb ebf1dd e5e0ec dbeef3 fdeada d8d8d8 595959 c4bd97 8db3e2 b8cce4 e5b9b7 d7e3bc ccc1d9 b7dde8 fbd5b5 bfbfbf 3f3f3f 938953 548dd4 95b3d7 d99694 c3d69b b2a2c7 92cddc fac08f a5a5a5 262626 494429 17365d 366092 953734 76923c 5f497a 31859b e36c09 7f7f7f 0c0c0c 1d1b10 0f243e 244061 632423 4f6128 3f3151 205867 974806 c00000 ff0000 ffc000 ffff00 92d050 00b050 00b0f0 0070c0 002060 7030a0 ".split(" "), c = '<div unselectable="on" onmousedown="return false" class="edui-colorpicker<%if (name){%> edui-colorpicker-<%=name%><%}%>" ><table unselectable="on" onmousedown="return false"><tr><td colspan="10">' + a.lang_themeColor + '</td> </tr><tr class="edui-colorpicker-firstrow" >', d = 0; d < b.length; d++)
                d && 0 === d % 10 && (c += "</tr>" + (60 == d ? '<tr><td colspan="10">' + a.lang_standardColor + "</td></tr>" : "") + "<tr" + (60 == d ? ' class="edui-colorpicker-firstrow"' : "") + ">"),
                c += 70 > d ? '<td><a unselectable="on" onmousedown="return false" title="' + b[d] + '" class="edui-colorpicker-colorcell" data-color="#' + b[d] + '" style="background-color:#' + b[d] + ";border:solid #ccc;" + (10 > d || 60 <= d ? "border-width:1px;" : 10 <= d && 20 > d ? "border-width:1px 1px 0 1px;" : "border-width:0 1px 0 1px;") + '"></a></td>' : "";
            return c + "</tr></table></div>"
        },
        init: function(a) {
            var b = this;
            b.root(g(g.parseTmpl(b.supper.mergeTpl(b.tpl(a)), a)));
            b.root().on("click", function(a) {
                b.trigger("pickcolor", g(a.target).data("color"))
            })
        }
    }, "popup");
    (function() {
        UM.ui.define("combobox", function() {
            return {
                tpl: '<ul class="dropdown-menu edui-combobox-menu<%if (comboboxName!==\'\') {%> edui-combobox-<%=comboboxName%><%}%>" unselectable="on" onmousedown="return false" role="menu" aria-labelledby="dropdownMenu"><%if(autoRecord) {%><%for( var i=0, len = recordStack.length; i<len; i++ ) {%><%var index = recordStack[i];%><li class="<%=itemClassName%><%if( selected == index ) {%> edui-combobox-checked<%}%>" data-item-index="<%=index%>" unselectable="on" onmousedown="return false"><span class="edui-combobox-icon" unselectable="on" onmousedown="return false"></span><label class="<%=labelClassName%>" style="<%=itemStyles[ index ]%>" unselectable="on" onmousedown="return false"><%=items[index]%></label></li><%}%><%if( i ) {%><li class="edui-combobox-item-separator"></li><%}%><%}%><%for( var i=0, label; label = items[i]; i++ ) {%><li class="<%=itemClassName%><%if( selected == i ) {%> edui-combobox-checked<%}%> edui-combobox-item-<%=i%>" data-item-index="<%=i%>" unselectable="on" onmousedown="return false"><span class="edui-combobox-icon" unselectable="on" onmousedown="return false"></span><label class="<%=labelClassName%>" style="<%=itemStyles[ i ]%>" unselectable="on" onmousedown="return false"><%=label%></label></li><%}%></ul>',
                defaultOpt: {
                    recordStack: [],
                    items: [],
                    value: [],
                    comboboxName: "",
                    selected: "",
                    autoRecord: !0,
                    recordCount: 5
                },
                init: function(a) {
                    g.extend(this._optionAdaptation(a), this._createItemMapping(a.recordStack, a.items), {
                        itemClassName: "edui-combobox-item",
                        iconClass: "edui-combobox-checked-icon",
                        labelClassName: "edui-combobox-item-label"
                    });
                    this._transStack(a);
                    this.root(g(g.parseTmpl(this.tpl, a)));
                    this.data("options", a).initEvent()
                },
                initEvent: function() {
                    this.initSelectItem();
                    this.initItemActive()
                },
                initSelectItem: function() {
                    var a = this;
                    a.root().delegate(".edui-combobox-item", "click", function() {
                        var b = g(this)
                          , c = b.attr("data-item-index");
                        a.trigger("comboboxselect", {
                            index: c,
                            label: b.find(".edui-combobox-item-label").text(),
                            value: a.data("options").value[c]
                        }).select(c);
                        a.hide();
                        return !1
                    })
                },
                initItemActive: function() {
                    var a = {
                        mouseenter: "addClass",
                        mouseleave: "removeClass"
                    };
                    if (g.IE6)
                        this.root().delegate(".edui-combobox-item", "mouseenter mouseleave", function(b) {
                            g(this)[a[b.type]]("edui-combobox-item-hover")
                        }).one("afterhide", function() {})
                },
                select: function(a) {
                    var b = this.data("options").itemCount
                    	, c = this.data("options").autowidthitem;
                    c && !c.length && (c = this.data("options").items);
                    if (0 == b)
                        return null;
                    0 > a ? a = b + a % b : a >= b && (a = b - 1);
                    this.trigger("changebefore", c[a]);
                    this._update(a);
                    this.trigger("changeafter", c[a]);
                    return null
                },
                selectItemByLabel: function(a) {
                    var b = this.data("options").itemMapping
                      , c = this
                      , d = null;
                    !g.isArray(a) && (a = [a]);
                    g.each(a, function(a, f) {
                        d = b[f];
                        if (void 0 !== d)
                            return c.select(d),
                            !1
                    })
                },
                _transStack: function(a) {
                    var b = []
                      , c = -1
                      , d = -1;
                    g.each(a.recordStack, function(e, f) {
                        c = a.itemMapping[f];
                        g.isNumeric(c) && (b.push(c),
                        f == a.selected && (d = c))
                    });
                    a.recordStack = b;
                    a.selected = d;
                    b = null
                },
                _optionAdaptation: function(a) {
                    if (!("itemStyles"in a)) {
                        a.itemStyles = [];
                        for (var b = 0, c = a.items.length; b < c; b++)
                            a.itemStyles.push("")
                    }
                    a.autowidthitem = a.autowidthitem || a.items;
                    a.itemCount = a.items.length;
                    return a
                },
                _createItemMapping: function(a, b) {
                    var c = {}
                      , d = {
                        recordStack: [],
                        mapping: {}
                    };
                    g.each(b, function(a, b) {
                        c[b] = a
                    });
                    d.itemMapping = c;
                    g.each(a, function(a, b) {
                        void 0 !== c[b] && (d.recordStack.push(c[b]),
                        d.mapping[b] = c[b])
                    });
                    return d
                },
                _update: function(a) {
                    var b = this.data("options")
                      , c = []
                      , d = null;
                    g.each(b.recordStack, function(b, d) {
                        d != a && c.push(d)
                    });
                    c.unshift(a);
                    c.length > b.recordCount && (c.length = b.recordCount);
                    b.recordStack = c;
                    b.selected = a;
                    d = g(g.parseTmpl(this.tpl, b));
                    this.root().html(d.html());
                    c = d = null
                }
            }
        }(), "menu")
    }
    )();
    (function() {
        UM.ui.define("buttoncombobox", function() {
            return {
                defaultOpt: {
                    label: "",
                    title: ""
                },
                init: function(a) {
                    var b = this
                      , c = g.eduibutton({
                        caret: !0,
                        name: a.comboboxName,
                        title: a.title,
                        text: a.label,
                        click: function() {
                            b.show(this.root())
                        }
                    });
                    b.supper.init.call(b, a);
                    b.on("changebefore", function(a, b) {
                        c.eduibutton("label", b)
                    });
                    b.data("button", c);
                    b.attachTo(c)
                },
                button: function() {
                    return this.data("button")
                }
            }
        }(), "combobox")
    }
    )();
    UM.ui.define("modal", {
        tpl: '<div class="edui-modal" tabindex="-1" ><div class="edui-modal-header"><div class="edui-close" data-hide="modal"></div><h3 class="edui-title"><%=title%></h3></div><div class="edui-modal-body"  style="<%if(width){%>width:<%=width%>px;<%}%><%if(height){%>height:<%=height%>px;<%}%>"> </div><% if(cancellabel || oklabel) {%><div class="edui-modal-footer"><div class="edui-modal-tip"></div><%if(oklabel){%><div class="edui-btn edui-btn-primary" data-ok="modal"><%=oklabel%></div><%}%><%if(cancellabel){%><div class="edui-btn" data-hide="modal"><%=cancellabel%></div><%}%></div><%}%></div>',
        defaultOpt: {
            title: "",
            cancellabel: "",
            oklabel: "",
            width: "",
            height: "",
            backdrop: !0,
            keyboard: !0
        },
        init: function(a) {
            this.root(g(g.parseTmpl(this.tpl, a || {})));
            this.data("options", a);
            if (a.okFn)
                this.on("ok", g.proxy(a.okFn, this));
            if (a.cancelFn)
                this.on("beforehide", g.proxy(a.cancelFn, this));
            this.root().delegate('[data-hide="modal"]', "click", g.proxy(this.hide, this)).delegate('[data-ok="modal"]', "click", g.proxy(this.ok, this));
            g('[data-hide="modal"],[data-ok="modal"]', this.root()).hover(function() {
                g(this).toggleClass("edui-hover")
            })
        },
        toggle: function() {
            return this[this.data("isShown") ? "hide" : "show"]()
        },
        show: function() {
            var a = this;
            a.trigger("beforeshow");
            a.data("isShown") || (a.data("isShown", !0),
            a.escape(),
            a.backdrop(function() {
                a.autoCenter();
                a.root().show().focus().trigger("aftershow")
            }))
        },
        showTip: function(a) {
            g(".edui-modal-tip", this.root()).html(a).fadeIn()
        },
        hideTip: function(a) {
            g(".edui-modal-tip", this.root()).fadeOut(function() {
                g(this).html("")
            })
        },
        autoCenter: function() {
            !g.IE6 && this.root().css("margin-left", -(this.root().width() / 2))
        },
        hide: function() {
            this.trigger("beforehide");
            this.data("isShown") && (this.data("isShown", !1),
            this.escape(),
            this.hideModal())
        },
        escape: function() {
            var a = this;
            if (a.data("isShown") && a.data("options").keyboard)
                a.root().on("keyup", function(b) {
                    27 == b.which && a.hide()
                });
            else
                a.data("isShown") || a.root().off("keyup")
        },
        hideModal: function() {
            var a = this;
            a.root().hide();
            a.backdrop(function() {
                a.removeBackdrop();
                a.trigger("afterhide")
            })
        },
        removeBackdrop: function() {
            this.$backdrop && this.$backdrop.remove();
            this.$backdrop = null
        },
        backdrop: function(a) {
            this.data("isShown") && this.data("options").backdrop && (this.$backdrop = g('<div class="edui-modal-backdrop" />').click("static" == this.data("options").backdrop ? g.proxy(this.root()[0].focus, this.root()[0]) : g.proxy(this.hide, this)));
            this.trigger("afterbackdrop");
            a && a()
        },
        attachTo: function(a) {
            var b = this;
            a.data("$mergeObj") || (a.data("$mergeObj", b.root()),
            a.on("click", function() {
                b.toggle(a)
            }),
            b.data("$mergeObj", a))
        },
        ok: function() {
            this.trigger("beforeok");
            !1 !== this.trigger("ok", this) && this.hide()
        },
        getBodyContainer: function() {
            return this.root().find(".edui-modal-body")
        }
    });
    UM.ui.define("tooltip", {
        tpl: '<div class="edui-tooltip" unselectable="on" onmousedown="return false"><div class="edui-tooltip-arrow" unselectable="on" onmousedown="return false"></div><div class="edui-tooltip-inner" unselectable="on" onmousedown="return false"></div></div>',
        init: function(a) {
            this.root(g(g.parseTmpl(this.tpl, a || {})))
        },
        content: function(a) {
            a = g(a.currentTarget).attr("data-original-title");
            this.root().find(".edui-tooltip-inner").text(a)
        },
        position: function(a) {
            a = g(a.currentTarget);
            this.root().css(g.extend({
                display: "block"
            }, a ? {
                top: a.outerHeight(),
                left: (a.outerWidth() - this.root().outerWidth()) / 2
            } : {}))
        },
        show: function(a) {
            g(a.currentTarget).hasClass("edui-disabled") || (this.content(a),
            this.root().appendTo(g(a.currentTarget)),
            this.position(a),
            this.root().css("display", "block"))
        },
        hide: function() {
            this.root().css("display", "none")
        },
        attachTo: function(a) {
            function b(a) {
                var b = this;
                g.contains(document.body, b.root()[0]) || b.root().appendTo(a);
                b.data("tooltip", b.root());
                a.each(function() {
                    if (g(this).attr("data-original-title"))
                        g(this).on("mouseenter", g.proxy(b.show, b)).on("mouseleave click", g.proxy(b.hide, b))
                })
            }
            var c = this;
            "undefined" === g.type(a) ? g("[data-original-title]").each(function(a, e) {
                b.call(c, g(e))
            }) : a.data("tooltip") || b.call(c, a)
        }
    });
    UM.ui.define("tab", {
        init: function(a) {
            var b = this
              , c = a.selector;
            g.type(c) && (b.root(g(c, a.context)),
            b.data("context", a.context),
            g(c, b.data("context")).on("click", function(a) {
                b.show(a)
            }))
        },
        show: function(a) {
            var b = this, c = g(a.target), d = c.closest("ul"), e, f;
            e = (e = c.attr("data-context")) && e.replace(/.*(?=#[^\s]*$)/, "");
            a = c.parent("li");
            a.length && !a.hasClass("edui-active") && (f = d.find(".edui-active:last a")[0],
            a = g.Event("beforeshow", {
                target: c[0],
                relatedTarget: f
            }),
            b.trigger(a),
            a.isDefaultPrevented() || (e = g(e, b.data("context")),
            b.activate(c.parent("li"), d),
            b.activate(e, e.parent(), function() {
                b.trigger({
                    type: "aftershow",
                    relatedTarget: f
                })
            })))
        },
        activate: function(a, b, c) {
            if (void 0 === a)
                return g(".edui-tab-item.edui-active", this.root()).index();
            b.find("> .edui-active").removeClass("edui-active");
            a.addClass("edui-active");
            c && c()
        }
    });
    UM.ui.define("separator", {
        tpl: '<div class="edui-separator" unselectable="on" onmousedown="return false" ></div>',
        init: function(a) {
            this.root(g(g.parseTmpl(this.tpl, a)));
            return this
        }
    });
    (function() {
        var a = {}
          , b = {}
          , c = []
          , d = {}
          , e = {}
          , f = {}
          , h = null;
        n.extend(UM, {
            defaultWidth: 500,
            defaultHeight: 500,
            registerUI: function(b, c) {
                n.each(b.split(/\s+/), function(b) {
                    a[b] = c
                })
            },
            setEditor: function(a) {
                !b[a.id] && (b[a.id] = a)
            },
            registerWidget: function(a, b, c) {
                d[a] = g.extend2(b, {
                    $root: "",
                    _preventDefault: !1,
                    root: function(a) {
                        return this.$root || (this.$root = a)
                    },
                    preventDefault: function() {
                        this._preventDefault = !0
                    },
                    clear: !1
                });
                c && (e[a] = c)
            },
            getWidgetData: function(a) {
                return d[a]
            },
            setWidgetBody: function(a, b, c) {
                c._widgetData || n.extend(c, {
                    _widgetData: {},
                    getWidgetData: function(a) {
                        return this._widgetData[a]
                    },
                    getWidgetCallback: function(a) {
                        var c = this;
                        return function() {
                            return e[a].apply(c, [c, b].concat(Array.prototype.slice.call(arguments, 0)))
                        }
                    }
                });
                var f = d[a];
                if (!f)
                    return null;
                f = c._widgetData[a];
                f || (f = d[a],
                f = c._widgetData[a] = "function" == g.type(f) ? f : n.clone(f));
                f.root(b.edui().getBodyContainer());
                f.initContent(c, b);
                f._preventDefault || f.initEvent(c, b);
                f.width && b.width(f.width)
            },
            setActiveWidget: function(a) {},
            getEditor: function(a, c) {
                var d = b[a] || (b[a] = this.createEditor(a, c));
                h = h ? Math.max(d.getOpt("zIndex"), h) : d.getOpt("zIndex");
                return d
            },
            setTopEditor: function(a) {
                g.each(b, function(b, c) {
                    a == c ? a.$container && a.$container.css("zIndex", h + 1) : c.$container && c.$container.css("zIndex", c.getOpt("zIndex"))
                })
            },
            clearCache: function(a) {
                b[a] && delete b[a]
            },
            delEditor: function(a) {
                var c;
                (c = b[a]) && c.destroy()
            },
            ready: function(a) {
                c.push(a)
            },
            createEditor: function(a, b) {
                function d() {
                    var b = this.createUI("#" + a, e);
                    e.key = a;
                    e.ready(function() {
                        g.each(c, function(a, b) {
                            g.proxy(b, e)()
                        })
                    });
                    var f = e.options;
                    f.minFrameWidth = f.initialFrameWidth ? f.initialFrameWidth : f.initialFrameWidth = e.$body.width() || UM.defaultWidth;
                    b.css({
                        width: f.initialFrameWidth,
                        zIndex: e.getOpt("zIndex")
                    });
                    UM.browser.ie && 6 === UM.browser.version && document.execCommand("BackgroundImageCache", !1, !0);
                    e.render(a);
                    g.eduitooltip && g.eduitooltip("attachTo", g("[data-original-title]", b)).css("z-index", e.getOpt("zIndex") + 1);
                    b.find("a").click(function(a) {
                        a.preventDefault()
                    });
                    e.fireEvent("afteruiready")
                }
                var e = new UM.Editor(b);
                e.langIsReady ? g.proxy(d, this)() : e.addListener("langReady", g.proxy(d, this));
                return e
            },
            createUI: function(b, c) {
                var d = g(b)
                  , e = g('<div class="edui-container"><div class="edui-editor-body"></div></div>').insertBefore(d);
                c.$container = e;
                c.container = e[0];
                c.$body = d;
                m.ie && m.ie9above && g('<span style="padding:0;margin:0;height:0;width:0"></span>').insertAfter(e);
                g.each(a, function(a, b) {
                    var d = b.call(c, a);
                    d && (f[a] = d)
                });
                e.find(".edui-editor-body").append(d).before(this.createToolbar(c.options, c));
                e.find(".edui-toolbar").append(g('<div class="edui-dialog-container"></div>'));
                return e
            },
            createToolbar: function(a, b) {
                var c = g.eduitoolbar()
                  , d = c.edui();
                if (a.toolbar && a.toolbar.length) {
                    var e = [];
                    g.each(a.toolbar, function(a, b) {
                        g.each(b.split(/\s+/), function(a, b) {
                            if ("|" == b)
                                g.eduiseparator && e.push(g.eduiseparator());
                            else {
                                var c = f[b];
                                "fullscreen" == b ? c && e.unshift(c) : c && e.push(c)
                            }
                        });
                        e.length && d.appendToBtnmenu(e)
                    })
                } else
                    c.find(".edui-btn-toolbar").remove();
                return c
            }
        })
    }
    )();
    UM.registerUI("bold italic redo undo underline strikethrough superscript subscript insertorderedlist insertunorderedlist cleardoc selectall link unlink print preview justifyleft justifycenter justifyright justifyfull removeformat horizontal drafts", function(a) {
        var b = this
          , c = g.eduibutton({
            icon: a,
            click: function() {
                b.execCommand(a)
            },
            title: this.getLang("labelMap")[a] || ""
        });
        this.addListener("selectionchange", function() {
            var b = this.queryCommandState(a);
            c.edui().disabled(-1 == b).active(1 == b)
        });
        return c
    });
    (function() {
        function a(a) {
            var b = this;
            if (!a)
                throw Error("invalid params, notfound editor");
            b.editor = a;
            h[a.uid] = this;
            a.addListener("destroy", function() {
                delete h[a.uid];
                b.editor = null
            })
        }
        var b = {}
          , c = "width height position top left margin padding overflowX overflowY".split(" ")
          , d = {}
          , e = {}
          , f = {}
          , h = {};
        UM.registerUI("fullscreen", function(b) {
            var c = this
              , d = g.eduibutton({
                icon: "fullscreen",
                title: c.options.labelMap && c.options.labelMap[b] || c.getLang("labelMap." + b),
                click: function() {
                    c.execCommand(b);
                    UM.setTopEditor(c)
                }
            });
            c.addListener("selectionchange", function() {
                var a = this.queryCommandState(b);
                d.edui().disabled(-1 == a).active(1 == a)
            });
            c.addListener("ready", function() {
                c.options.fullscreen && a.getInstance(c).toggle()
            });
            return d
        });
        UM.commands.fullscreen = {
            execCommand: function(b) {
                a.getInstance(this).toggle()
            },
            queryCommandState: function(a) {
                return this._edui_fullscreen_status
            },
            notNeedUndo: 1
        };
        a.prototype = {
            toggle: function() {
                var a = this.editor
                  , b = this.isFullState();
                a.fireEvent("beforefullscreenchange", !b);
                this.update(!b);
                b ? this.revert() : this.enlarge();
                a.fireEvent("afterfullscreenchange", !b);
                "true" === a.body.contentEditable && a.fireEvent("fullscreenchanged", !b);
                a.fireEvent("selectionchange")
            },
            enlarge: function() {
                this.saveSataus();
                this.setDocumentStatus();
                this.resize()
            },
            revert: function() {
                var a = this.editor.options
                  , a = /%$/.test(a.initialFrameHeight) ? "100%" : a.initialFrameHeight - this.getStyleValue("padding-top") - this.getStyleValue("padding-bottom") - this.getStyleValue("border-width");
                g.IE6 && this.getEditorHolder().style.setExpression("height", "this.scrollHeight <= " + a + ' ? "' + a + 'px" : "auto"');
                this.revertContainerStatus();
                this.revertContentAreaStatus();
                this.revertDocumentStatus()
            },
            update: function(a) {
                this.editor._edui_fullscreen_status = a
            },
            resize: function() {
                var a = null
                  , b = a = 0
                  , c = 0
                  , d = 0
                  , e = this.editor
                  , f = null
                  , h = null;
                this.isFullState() && (a = g(window),
                b = a.width(),
                a = a.height(),
                h = this.getEditorHolder(),
                c = parseInt(k.getComputedStyle(h, "border-width"), 10) || 0,
                c += parseInt(k.getComputedStyle(e.container, "border-width"), 10) || 0,
                d += parseInt(k.getComputedStyle(h, "padding-left"), 10) + parseInt(k.getComputedStyle(h, "padding-right"), 10) || 0,
                g.IE6 && h.style.setExpression("height", null),
                f = this.getBound(),
                g(e.container).css({
                    width: b + "px",
                    height: a + "px",
                    position: g.IE6 ? "absolute" : "fixed",
                    top: f.top,
                    left: f.left,
                    margin: 0,
                    padding: 0,
                    overflowX: "hidden",
                    overflowY: "hidden"
                }),
                g(h).css({
                    width: b - 2 * c - d + "px",
                    height: a - 2 * c - (e.options.withoutToolbar ? 0 : g(".edui-toolbar", e.container).outerHeight()) - g(".edui-bottombar", e.container).outerHeight() + "px",
                    overflowX: "hidden",
                    overflowY: "auto"
                }))
            },
            saveSataus: function() {
                for (var a = this.editor.container.style, d = null, e = {}, f = 0, h = c.length; f < h; f++)
                    d = c[f],
                    e[d] = a[d];
                b[this.editor.uid] = e;
                this.saveContentAreaStatus();
                this.saveDocumentStatus()
            },
            saveContentAreaStatus: function() {
                var a = g(this.getEditorHolder());
                d[this.editor.uid] = {
                    width: a.css("width"),
                    overflowX: a.css("overflowX"),
                    overflowY: a.css("overflowY"),
                    height: a.css("height")
                }
            },
            saveDocumentStatus: function() {
                var a = g(this.getEditorDocumentBody());
                e[this.editor.uid] = {
                    overflowX: a.css("overflowX"),
                    overflowY: a.css("overflowY")
                };
                f[this.editor.uid] = {
                    overflowX: g(this.getEditorDocumentElement()).css("overflowX"),
                    overflowY: g(this.getEditorDocumentElement()).css("overflowY")
                }
            },
            revertContainerStatus: function() {
                g(this.editor.container).css(this.getEditorStatus())
            },
            revertContentAreaStatus: function() {
                var a = this.getEditorHolder()
                  , b = this.getContentAreaStatus();
                this.supportMin() && (delete b.height,
                a.style.height = null);
                g(a).css(b)
            },
            revertDocumentStatus: function() {
                var a = this.getDocumentStatus();
                g(this.getEditorDocumentBody()).css("overflowX", a.body.overflowX);
                g(this.getEditorDocumentElement()).css("overflowY", a.html.overflowY)
            },
            setDocumentStatus: function() {
                g(this.getEditorDocumentBody()).css({
                    overflowX: "hidden",
                    overflowY: "hidden"
                });
                g(this.getEditorDocumentElement()).css({
                    overflowX: "hidden",
                    overflowY: "hidden"
                })
            },
            isFullState: function() {
                return !!this.editor._edui_fullscreen_status
            },
            getEditorStatus: function() {
                return b[this.editor.uid]
            },
            getContentAreaStatus: function() {
                return d[this.editor.uid]
            },
            getEditorDocumentElement: function() {
                return this.editor.container.ownerDocument.documentElement
            },
            getEditorDocumentBody: function() {
                return this.editor.container.ownerDocument.body
            },
            getEditorHolder: function() {
                return this.editor.body
            },
            getDocumentStatus: function() {
                return {
                    body: e[this.editor.uid],
                    html: f[this.editor.uid]
                }
            },
            supportMin: function() {
                var a = null;
                this._support || (a = document.createElement("div"),
                this._support = "minWidth"in a.style);
                return this._support
            },
            getBound: function() {
                var a = {
                    html: !0,
                    body: !0
                }
                  , b = {
                    top: 0,
                    left: 0
                }
                  , c = null;
                if (!g.IE6)
                    return b;
                (c = this.editor.container.offsetParent) && !a[c.nodeName.toLowerCase()] && (a = c.getBoundingClientRect(),
                b.top = -a.top,
                b.left = -a.left);
                return b
            },
            getStyleValue: function(a) {
                return parseInt(k.getComputedStyle(this.getEditorHolder(), a))
            }
        };
        g.extend(a, {
            listen: function() {
                var b = null;
                a._hasFullscreenListener || (a._hasFullscreenListener = !0,
                g(window).on("resize", function() {
                    null !== b && (window.clearTimeout(b),
                    b = null);
                    b = window.setTimeout(function() {
                        for (var a in h)
                            h[a].resize();
                        b = null
                    }, 50)
                }))
            },
            getInstance: function(b) {
                h[b.uid] || new a(b);
                return h[b.uid]
            }
        });
        a.listen()
    }
    )();
    UM.registerUI("link image video map formula", function(a) {
        var b = this, c, d, e = {
            title: b.options.labelMap && b.options.labelMap[a] || b.getLang("labelMap." + a),
            url: b.options.UMEDITOR_HOME_URL + "dialogs/" + a + "/" + a + ".js"
        }, f = g.eduibutton({
            icon: a,
            title: this.getLang("labelMap")[a] || ""
        });
        n.loadFile(document, {
            src: e.url,
            tag: "script",
            type: "text/javascript",
            defer: "defer"
        }, function() {
            var h = UM.getWidgetData(a);
            if (h) {
                if (h.buttons) {
                    var k = h.buttons.ok;
                    k && (e.oklabel = k.label || b.getLang("ok"),
                    k.exec && (e.okFn = function() {
                        return g.proxy(k.exec, null, b, d)()
                    }
                    ));
                    var m = h.buttons.cancel;
                    m && (e.cancellabel = m.label || b.getLang("cancel"),
                    m.exec && (e.cancelFn = function() {
                        return g.proxy(m.exec, null, b, d)()
                    }
                    ))
                }
                h.width && (e.width = h.width);
                h.height && (e.height = h.height);
                d = g.eduimodal(e);
                d.attr("id", "edui-dialog-" + a).addClass("edui-dialog-" + a).find(".edui-modal-body").addClass("edui-dialog-" + a + "-body");
                d.edui().on("beforehide", function() {
                    var a = b.selection.getRange();
                    a.equals(c) && a.select()
                }).on("beforeshow", function() {
                    var e = this.root()
                      , f = null
                      , h = null;
                    c = b.selection.getRange();
                    e.parent()[0] || b.$container.find(".edui-dialog-container").append(e);
                    g.IE6 && (f = {
                        width: g(window).width(),
                        height: g(window).height()
                    },
                    h = e.parents(".edui-toolbar")[0].getBoundingClientRect(),
                    e.css({
                        position: "absolute",
                        margin: 0,
                        left: (f.width - e.width()) / 2 - h.left,
                        top: 100 - h.top
                    }));
                    UM.setWidgetBody(a, d, b);
                    UM.setTopEditor(b)
                }).on("afterbackdrop", function() {
                    this.$backdrop.css("zIndex", b.getOpt("zIndex") + 1).appendTo(b.$container.find(".edui-dialog-container"));
                    d.css("zIndex", b.getOpt("zIndex") + 2)
                }).on("beforeok", function() {
                    try {
                        c.select()
                    } catch (a) {}
                }).attachTo(f)
            }
        });
        b.addListener("selectionchange", function() {
            var b = this.queryCommandState(a);
            f.edui().disabled(-1 == b).active(1 == b)
        });
        return f
    });
    UM.registerUI("emotion formula", function(a) {
        var b = this
          , c = b.options.UMEDITOR_HOME_URL + "dialogs/" + a + "/" + a + ".js"
          , d = g.eduibutton({
            icon: a,
            title: this.getLang("labelMap")[a] || ""
        });
        n.loadFile(document, {
            src: c,
            tag: "script",
            type: "text/javascript",
            defer: "defer"
        }, function() {
            var e = {
                url: c
            }
              , f = UM.getWidgetData(a);
            f.width && (e.width = f.width);
            f.height && (e.height = f.height);
            g.eduipopup(e).css("zIndex", b.options.zIndex + 1).addClass("edui-popup-" + a).edui().on("beforeshow", function() {
                var c = this.root();
                c.parent().length || b.$container.find(".edui-dialog-container").append(c);
                UM.setWidgetBody(a, c, b);
                UM.setTopEditor(b)
            }).attachTo(d, {
                offsetTop: -5,
                offsetLeft: 10,
                caretLeft: 11,
                caretTop: -8
            });
            b.addListener("selectionchange", function() {
                var b = this.queryCommandState(a);
                d.edui().disabled(-1 == b).active(1 == b)
            })
        });
        return d
    });
    UM.registerUI("imagescale", function() {
        var a = this, b;
        a.setOpt("imageScaleEnabled", !0);
        m.webkit && a.getOpt("imageScaleEnabled") && (a.addListener("click", function(c, d) {
            var e = a.selection.getRange().getClosedNode()
              , f = d.target;
            if (e && "IMG" == e.tagName && f == e) {
                if (!b) {
                    b = g.eduiscale({
                        $wrap: a.$container
                    }).css("zIndex", a.options.zIndex);
                    a.$container.append(b);
                    var h = function() {
                        b.edui().hide()
                    }, k = function(a) {
                        var b = a.target || a.srcElement;
                        b && -1 == b.className.indexOf("edui-scale") && h(a)
                    }, m;
                    b.edui().on("aftershow", function() {
                        g(document).bind("keydown", h);
                        g(document).bind("mousedown", k);
                        a.selection.getNative().removeAllRanges()
                    }).on("afterhide", function() {
                        g(document).unbind("keydown", h);
                        g(document).unbind("mousedown", k);
                        var c = b.edui().getScaleTarget();
                        c.parentNode && a.selection.getRange().selectNode(c).select()
                    }).on("mousedown", function(c) {
                        a.selection.getNative().removeAllRanges();
                        (c = c.target || c.srcElement) && -1 == c.className.indexOf("edui-scale-hand") && (m = setTimeout(function() {
                            b.edui().hide()
                        }, 200))
                    }).on("mouseup", function(a) {
                        (a = a.target || a.srcElement) && -1 == a.className.indexOf("edui-scale-hand") && clearTimeout(m)
                    })
                }
                b.edui().show(g(e))
            } else
                b && "none" != b.css("display") && b.edui().hide()
        }),
        a.addListener("click", function(b, d) {
            "IMG" == d.target.tagName && (new B.Range(a.document,a.body)).selectNode(d.target).select()
        }))
    });
    UM.registerUI("autofloat", function() {
        var a = this
          , b = a.getLang();
        a.setOpt({
            autoFloatEnabled: !0,
            topOffset: 0
        });
        var c = a.options.topOffset;
        !1 !== a.options.autoFloatEnabled && a.ready(function() {
            function d() {
                var a = document.body.style;
                a.backgroundImage = 'url("about:blank")';
                a.backgroundAttachment = "fixed"
            }
            function e() {
                p.parentNode && p.parentNode.removeChild(p);
                r.style.cssText = q
            }
            function f() {
                var b = a.container, d;
                try {
                    d = b.getBoundingClientRect()
                } catch (f) {
                    d = {
                        left: 0,
                        top: 0,
                        height: 0,
                        width: 0
                    }
                }
                Math.round(d.left);
                var g = Math.round(d.top)
                  , n = Math.round(d.bottom - d.top);
                Math.round(d.right - d.left);
                for (var q; (q = b.ownerDocument) !== document && (b = k.getWindow(q).frameElement); )
                    d = b.getBoundingClientRect(),
                    g += d.top;
                b = a.options.toolbarTopOffset || 0;
                0 > g && g + n - r.offsetHeight > b ? u || (g = k.getXY(r),
                n = k.getComputedStyle(r, "position"),
                b = k.getComputedStyle(r, "left"),
                r.style.width = r.offsetWidth + "px",
                r.style.zIndex = 1 * a.options.zIndex + 1,
                r.parentNode.insertBefore(p, r),
                h || l && m.ie ? ("absolute" != r.style.position && (r.style.position = "absolute"),
                r.style.top = (document.body.scrollTop || document.documentElement.scrollTop) - y + c + "px") : "fixed" != r.style.position && (r.style.position = "fixed",
                r.style.top = c + "px",
                ("absolute" == n || "relative" == n) && parseFloat(b) && (r.style.left = g.x + "px"))) : e()
            }
            var h = m.ie && 6 >= m.version, l = m.quirks, q, p = document.createElement("div"), r, y, u = !1, v = n.defer(function() {
                f()
            }, m.ie ? 200 : 100, !0);
            a.addListener("destroy", function() {
                g(window).off("scroll resize", f);
                a.removeListener("keydown", v)
            });
            var w;
            UM.ui ? w = 1 : (alert(b.autofloatMsg),
            w = 0);
            w && (r = g(".edui-toolbar", a.container)[0],
            a.addListener("afteruiready", function() {
                setTimeout(function() {
                    y = g(r).offset().top
                }, 100)
            }),
            q = r.style.cssText,
            p.style.height = r.offsetHeight + "px",
            h && d(),
            g(window).on("scroll resize", f),
            a.addListener("keydown", v),
            a.addListener("resize", function() {
                e();
                p.style.height = r.offsetHeight + "px";
                f()
            }),
            a.addListener("beforefullscreenchange", function(a, b) {
                b && (e(),
                u = b)
            }),
            a.addListener("fullscreenchanged", function(a, b) {
                b || f();
                u = b
            }),
            a.addListener("sourcemodechanged", function(a, b) {
                setTimeout(function() {
                    f()
                }, 0)
            }),
            a.addListener("clearDoc", function() {
                setTimeout(function() {
                    f()
                }, 0)
            }))
        })
    });
    UM.registerUI("source", function(a) {
        var b = this;
        b.addListener("fullscreenchanged", function() {
            b.$container.find("textarea").width(b.$body.width() - 10).height(b.$body.height())
        });
        var c = g.eduibutton({
            icon: a,
            click: function() {
                b.execCommand(a);
                UM.setTopEditor(b)
            },
            title: this.getLang("labelMap")[a] || ""
        });
        this.addListener("selectionchange", function() {
            var b = this.queryCommandState(a);
            c.edui().disabled(-1 == b).active(1 == b)
        });
        return c
    });
    UM.registerUI("paragraph fontfamily fontsize", function(a) {
        function b(a, c) {
            var d = g("<span>").html(a).css({
                display: "inline",
                position: "absolute",
                top: -1E7,
                left: -1E5
            }).appendTo(document.body)
              , e = d.width();
            d.remove();
            if (50 > e)
                return a;
            a = a.slice(0, c ? -4 : -1);
            return a.length ? b(a + "...", !0) : "..."
        }
        function c(a) {
            var c = [], d;
            for (d in a.items)
                a.value.push(d),
                c.push(d),
                a.autowidthitem.push(b(d));
            a.items = c;
            a.autoRecord = !1;
            return a
        }
        function d(a) {
            for (var c = null, d = [], e = 0, f = a.items.length; e < f; e++)
                c = a.items[e].val,
                d.push(c.split(/\s*,\s*/)[0]),
                a.itemStyles.push("font-family: " + c),
                a.value.push(c),
                a.autowidthitem.push(b(d[e]));
            a.items = d;
            return a
        }
        function e(a) {
            var b = null
              , c = [];
            a.itemStyles = [];
            a.value = [];
            for (var d = 0, e = a.items.length; d < e; d++)
                b = a.items[d],
                c.push(b),
                a.itemStyles.push("font-size: " + b + "px");
            a.value = a.items;
            a.items = c;
            a.autoRecord = !1;
            return a
        }
        var f = this
          , h = f.options.labelMap && f.options.labelMap[a] || f.getLang("labelMap." + a)
          , h = {
            label: h,
            title: h,
            comboboxName: a,
            items: f.options[a] || [],
            itemStyles: [],
            value: [],
            autowidthitem: []
        }
          , k = null
          , m = null;
        if (0 == h.items.length)
            return null;
        switch (a) {
        case "paragraph":
            h = c(h);
            break;
        case "fontfamily":
            h = d(h);
            break;
        case "fontsize":
            h = e(h)
        }
        k = g.eduibuttoncombobox(h).css("zIndex", f.getOpt("zIndex") + 1);
        m = k.edui();
        m.on("comboboxselect", function(b, c) {
            f.execCommand(a, c.value)
        }).on("beforeshow", function() {
            0 === k.parent().length && k.appendTo(f.$container.find(".edui-dialog-container"));
            UM.setTopEditor(f)
        });
        this.addListener("selectionchange", function(b) {
            b = this.queryCommandState(a);
            var c = this.queryCommandValue(a);
            m.button().edui().disabled(-1 == b).active(1 == b);
            c && (c = c.replace(/['"]/g, "").toLowerCase().split(/['|"]?\s*,\s*[\1]?/),
            m.selectItemByLabel(c))
        });
        return m.button().addClass("edui-combobox")
    });
    UM.registerUI("forecolor backcolor", function(a) {
        var b = this
          , c = null
          , d = null
          , e = null;
        this.addListener("selectionchange", function() {
            var b = this.queryCommandState(a);
            e.edui().disabled(-1 == b).active(1 == b)
        });
        e = g.eduicolorsplitbutton({
            icon: a,
            caret: !0,
            name: a,
            title: b.getLang("labelMap")[a],
            click: function() {
                b.execCommand(a, k.getComputedStyle(d[0], "background-color"))
            }
        });
        d = e.edui().colorLabel();
        c = g.eduicolorpicker({
            name: a,
            lang_clearColor: b.getLang("clearColor") || "",
            lang_themeColor: b.getLang("themeColor") || "",
            lang_standardColor: b.getLang("standardColor") || ""
        }).on("pickcolor", function(c, e) {
            window.setTimeout(function() {
                d.css("backgroundColor", e);
                b.execCommand(a, e)
            }, 0)
        }).on("show", function() {
            UM.setActiveWidget(colorPickerWidget.root())
        }).css("zIndex", b.getOpt("zIndex") + 1);
        e.edui().on("arrowclick", function() {
            c.parent().length || b.$container.find(".edui-dialog-container").append(c);
            c.edui().show(e, {
                caretDir: "down",
                offsetTop: -5,
                offsetLeft: 8,
                caretLeft: 11,
                caretTop: -8
            });
            UM.setTopEditor(b)
        }).register("click", e, function() {
            c.edui().hide()
        });
        return e
    })
}
)(jQuery);
