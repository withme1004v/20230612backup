!(function t(e, i, s) {
  function n(o, a) {
    if (!i[o]) {
      if (!e[o]) {
        var l = "function" == typeof require && require;
        if (!a && l) return l(o, !0);
        if (r) return r(o, !0);
        var h = new Error("Cannot find module '" + o + "'");
        throw ((h.code = "MODULE_NOT_FOUND"), h);
      }
      var c = (i[o] = { exports: {} });
      e[o][0].call(
        c.exports,
        function (t) {
          return n(e[o][1][t] || t);
        },
        c,
        c.exports,
        t,
        e,
        i,
        s
      );
    }
    return i[o].exports;
  }
  for (
    var r = "function" == typeof require && require, o = 0;
    o < s.length;
    o++
  )
    n(s[o]);
  return n;
})(
  {
    1: [
      function (t, e, i) {
        "use strict";
        var s = t(6),
          n = t(7),
          r = t(10),
          o = t(49).EventEmitterMicro,
          a = o.prototype,
          l = t(15),
          h = t(17),
          c = [
            l.BUSY,
            l.CHECKED,
            l.DISABLED,
            l.EXPANDED,
            l.HIDDEN,
            l.INVALID,
            l.PRESSED,
            l.SELECTED,
          ],
          u = function (t, e) {
            o.call(this),
              (this._options = e || {}),
              (this._selector = e.selector || ".navitem"),
              (this._allowMultiSelection = e.multiSelection || !1);
            var i = c.indexOf(e.state) > -1 ? e.state : l.SELECTED;
            (this.el = t),
              (this._navItems = t.querySelectorAll(this._selector)),
              (this._navItems = Array.prototype.slice.call(this._navItems)),
              (this._state = i),
              (this._navKeys = {}),
              (this.selectOption = this.selectOption.bind(this)),
              (this._handleKeyDown = this._handleKeyDown.bind(this)),
              this._setup();
          };
        (u.ONSELECT = "onSelect"), (u.ONFOCUS = "onFocus");
        var d = (u.prototype = Object.create(a));
        (d._setup = function () {
          for (
            var t = [h.ARROW_DOWN, h.ARROW_RIGHT],
              e = [h.ARROW_UP, h.ARROW_LEFT],
              i = [h.ENTER, h.SPACEBAR],
              s = 0;
            s < t.length;
            s++
          )
            this.addNavkey(t[s], this._arrowDown.bind(this, !0)),
              this.addNavkey(e[s], this._arrowDown.bind(this, null)),
              this.addNavkey(i[s], this.selectOption);
          this._setupNavItems();
        }),
          (d._setupNavItems = function () {
            if (this._navItems.length) {
              for (var t = 0; t < this._navItems.length; t++)
                this._setTabbingByIndex(t);
              (void 0 !== this.focusedNavItemIndex &&
                void 0 !== this.selectedNavitemIndex) ||
                this.setSelectedItemByIndex(0, !0);
            }
          }),
          (d._setTabbingByIndex = function (t) {
            var e = this._navItems[t];
            r(e.getAttribute(this._state)) &&
              ((this.focusedNavItemIndex = t), (this.selectedNavitemIndex = t)),
              r(e.getAttribute(l.DISABLED)) ? s(e) : n(e);
          }),
          (d.start = function () {
            this._navItems.length < 1 ||
              (this.el.addEventListener("keydown", this._handleKeyDown),
              this.el.addEventListener("click", this.selectOption));
          }),
          (d.stop = function () {
            this.el.removeEventListener("keydown", this._handleKeyDown),
              this.el.removeEventListener("click", this.selectOption);
          }),
          (d._handleKeyDown = function (t) {
            if (t.ctrlKey || t.altKey || t.metaKey) return !0;
            this._navKeys[t.keyCode] && this._navKeys[t.keyCode](t);
          }),
          (d._arrowDown = function (t, e, i) {
            e.preventDefault(),
              (this.previousNavItemIndex = this.focusedNavItemIndex),
              (this.focusedNavItemIndex = this._calculateIndex(
                t,
                this.focusedNavItemIndex
              )),
              this._navItems[this.focusedNavItemIndex].focus(),
              i ||
                this.trigger(u.ONFOCUS, {
                  event: e,
                  index: this.focusedNavItemIndex,
                  el: this._navItems[this.focusedNavItemIndex],
                });
          }),
          (d.selectOption = function (t, e) {
            t.preventDefault();
            var i = this._navItems.indexOf(document.activeElement);
            i > -1 &&
              document.activeElement !==
                this._navItems[this.focusedNavItemIndex] &&
              (this.focusedNavItemIndex = i),
              this._allowMultiSelection
                ? this._toggleState()
                : (this._navItems[this.selectedNavitemIndex].setAttribute(
                    this._state,
                    "false"
                  ),
                  this._navItems[this.focusedNavItemIndex].setAttribute(
                    this._state,
                    "true"
                  )),
              (this.selectedNavitemIndex = this.focusedNavItemIndex),
              e ||
                this.trigger(u.ONSELECT, {
                  event: t,
                  index: this.selectedNavitemIndex,
                  el: this._navItems[this.selectedNavitemIndex],
                });
          }),
          (d._toggleState = function () {
            var t = this._navItems[this.focusedNavItemIndex].getAttribute(
              this._state
            );
            r(t)
              ? this._navItems[this.focusedNavItemIndex].setAttribute(
                  this._state,
                  "false"
                )
              : this._navItems[this.focusedNavItemIndex].setAttribute(
                  this._state,
                  "true"
                );
          }),
          (d._calculateIndex = function (t, e) {
            var i = e;
            if (!0 === t) {
              if (
                ((i = ++i >= this._navItems.length ? 0 : i),
                !r(this._navItems[i].getAttribute(l.DISABLED)) ||
                  this._navItems[i].hasAttribute("disabled"))
              )
                return i;
            } else if (
              ((i = --i < 0 ? this._navItems.length - 1 : i),
              !r(this._navItems[i].getAttribute(l.DISABLED)) ||
                this._navItems[i].hasAttribute("disabled"))
            )
              return i;
            return this._calculateIndex(t, i);
          }),
          (d.updateNavItems = function () {
            var t = this.el.querySelectorAll(this._selector);
            this._navItems = Array.prototype.slice.call(t);
          }),
          (d.addNavItem = function (t) {
            t &&
              t.nodeType &&
              this._navItems.indexOf(t) < 0 &&
              (r(t.getAttribute(l.DISABLED)) || n(t), this._navItems.push(t));
          }),
          (d.setSelectedItemByIndex = function (t, e) {
            this._allowMultiSelection ||
              isNaN(this.selectedNavitemIndex) ||
              this._navItems[this.selectedNavitemIndex].setAttribute(
                this._state,
                "false"
              ),
              (this.focusedNavItemIndex = t),
              (this.selectedNavitemIndex = t),
              this._navItems[this.selectedNavitemIndex].setAttribute(
                this._state,
                "true"
              ),
              e ||
                this.trigger(u.ONSELECT, {
                  event: null,
                  index: this.focusedNavItemIndex,
                  el: this._navItems[this.focusedNavItemIndex],
                });
          }),
          (d.getSelectedItem = function () {
            return this._navItems[this.selectedNavitemIndex];
          }),
          (d.getFocusedItem = function (t) {
            return this._navItems[this.focusedNavItemIndex];
          }),
          (d.addNavkey = function (t, e) {
            "function" == typeof e && "number" == typeof t
              ? (this._navKeys[t] = e)
              : console.warn("incorrect types arguments were passed");
          }),
          (d.removeNavkey = function (t) {
            delete this._navKeys[t];
          }),
          (d.destroy = function () {
            for (var t in (a.destroy.call(this),
            this.stop(),
            (this.el = null),
            (this._options = null),
            (this._selector = null),
            (this.focusedNavItemIndex = null),
            (this.selectedNavitemIndex = null),
            (this._navItems = null),
            (this._state = null),
            (this.selectOption = null),
            (this._handleKeyDown = null),
            this._navKeys))
              this._navKeys.hasOwnProperty(t) && this.removeNavkey(t);
            this._navKeys = null;
          }),
          (e.exports = u);
      },
      { 10: 10, 15: 15, 17: 17, 49: 49, 6: 6, 7: 7 },
    ],
    2: [
      function (t, e, i) {
        "use strict";
        var s = t(5),
          n = t(9),
          r = t(14),
          o = function (t, e) {
            (e = e || {}),
              (this._tabbables = null),
              (this._excludeHidden = e.excludeHidden),
              (this._firstTabbableElement = e.firstFocusElement),
              (this._lastTabbableElement = null),
              (this._relatedTarget = null),
              (this.el = t),
              (this._handleOnFocus = this._handleOnFocus.bind(this));
          },
          a = o.prototype;
        (a.start = function (t) {
          this.updateTabbables(), n(this.el, null, this._excludeHidden);
          let e = document.activeElement;
          this._firstTabbableElement
            ? this.el.contains(document.activeElement) ||
              t ||
              (this._firstTabbableElement.focus(),
              (e = this._firstTabbableElement))
            : console.warn(
                "this._firstTabbableElement is null, CircularTab needs at least one tabbable element."
              ),
            (this._relatedTarget = e),
            document.addEventListener("focus", this._handleOnFocus, !0);
        }),
          (a.stop = function () {
            r(this.el),
              document.removeEventListener("focus", this._handleOnFocus, !0);
          }),
          (a.updateTabbables = function () {
            (this._tabbables = s.getTabbableElements(
              this.el,
              this._excludeHidden
            )),
              (this._firstTabbableElement =
                this._firstTabbableElement || this._tabbables[0]),
              (this._lastTabbableElement =
                this._tabbables[this._tabbables.length - 1]);
          }),
          (a._handleOnFocus = function (t) {
            if (this.el.contains(t.target)) this._relatedTarget = t.target;
            else {
              if (
                (t.preventDefault(),
                this.updateTabbables(),
                this._relatedTarget === this._lastTabbableElement ||
                  null === this._relatedTarget)
              )
                return (
                  this._firstTabbableElement.focus(),
                  void (this._relatedTarget = this._firstTabbableElement)
                );
              if (
                this._relatedTarget === this._firstTabbableElement &&
                this._lastTabbableElement
              )
                return (
                  this._lastTabbableElement.focus(),
                  void (this._relatedTarget = this._lastTabbableElement)
                );
            }
          }),
          (a.destroy = function () {
            this.stop(),
              (this.el = null),
              (this._tabbables = null),
              (this._firstTabbableElement = null),
              (this._lastTabbableElement = null),
              (this._relatedTarget = null),
              (this._handleOnFocus = null);
          }),
          (e.exports = o);
      },
      { 14: 14, 5: 5, 9: 9 },
    ],
    3: [
      function (t, e, i) {
        "use strict";
        var s = t(15),
          n = t(18),
          r = t(7),
          o = t(6),
          a = t(10),
          l = t(1),
          h = l.prototype,
          c = function (t, e) {
            (e = e || {}),
              l.call(this, t, {
                selector: e.selector || "*[role=" + n.OPTION + "]",
                state: e.state || s.SELECTED,
              });
          },
          u = (c.prototype = Object.create(h));
        (u._setTabbingByIndex = function (t) {
          var e = this._navItems[t];
          a(e.getAttribute(this._state))
            ? ((this.focusedNavItemIndex = t),
              (this.selectedNavitemIndex = t),
              this._enableElement(e))
            : this._disableElement(e);
        }),
          (u.setSelectedItemByIndex = function (t, e) {
            isNaN(this.selectedNavitemIndex) ||
              this._disableElement(this._navItems[this.selectedNavitemIndex]),
              h.setSelectedItemByIndex.call(this, t, e),
              this._enableElement(this._navItems[this.selectedNavitemIndex]);
          }),
          (u.addNavItem = function (t) {
            t &&
              t.nodeType &&
              this._navItems.indexOf(t) < 0 &&
              (a(t.getAttribute(s.DISABLED)) || this._disableElement(t),
              this._navItems.push(t));
          }),
          (u._arrowDown = function (t, e) {
            h._arrowDown.call(this, t, e, !0), this.selectOption(e);
          }),
          (u._enableElement = function (t) {
            r(t), t.setAttribute(this._state, "true");
          }),
          (u._disableElement = function (t) {
            o(t), t.setAttribute(this._state, "false");
          }),
          (u.selectOption = function (t) {
            o(this._navItems[this.selectedNavitemIndex]),
              h.selectOption.call(this, t),
              r(this._navItems[this.focusedNavItemIndex]);
          }),
          (e.exports = c);
      },
      { 1: 1, 10: 10, 15: 15, 18: 18, 6: 6, 7: 7 },
    ],
    4: [
      function (t, e, i) {
        "use strict";
        function s() {
          this._createElements(), this._bindEvents();
        }
        var n = s.prototype;
        (n._bindEvents = function () {
          this._onResize = this._resize.bind(this);
        }),
          (n._createElements = function () {
            this.span = document.createElement("span");
            var t = this.span.style;
            if (
              ((t.visibility = "hidden"),
              (t.position = "absolute"),
              (t.top = "0"),
              (t.bottom = "0"),
              (t.zIndex = "-1"),
              (this.span.innerHTML = "&nbsp;"),
              !window.ResizeObserver)
            ) {
              this.iframe = document.createElement("iframe");
              var e = this.iframe.style;
              (e.position = "absolute"),
                (e.top = "0"),
                (e.left = "0"),
                (e.width = "100%"),
                (e.height = "100%"),
                this.span.appendChild(this.iframe);
            }
            document.body.appendChild(this.span);
          }),
          (n.detect = function (t) {
            (this.originalSize = t || 17),
              (this.currentSize = parseFloat(
                window.getComputedStyle(this.span)["font-size"]
              )),
              this.currentSize > this.originalSize && this._onResize(),
              this.isDetecting ||
                (window.ResizeObserver
                  ? ((this.resizeObserver = new ResizeObserver(this._onResize)),
                    this.resizeObserver.observe(this.span))
                  : this.iframe.contentWindow.addEventListener(
                      "resize",
                      this._onResize
                    ),
                (this.isDetecting = !0));
          }),
          (n._resize = function () {
            (this.currentSize = parseFloat(
              window.getComputedStyle(this.span)["font-size"]
            )),
              this.originalSize < this.currentSize
                ? document.documentElement.classList.add("text-zoom")
                : document.documentElement.classList.remove("text-zoom"),
              window.dispatchEvent(new Event("resize")),
              window.dispatchEvent(
                new CustomEvent("resize:text-zoom", { detail: this })
              );
          }),
          (n.getScale = function () {
            return this.currentSize / this.originalSize;
          }),
          (n.remove = function () {
            this.isDetecting &&
              (this.resizeObserver && this.resizeObserver.unobserve(this.span),
              this.iframe &&
                this.iframe.contentWindow.removeEventListener(
                  "resize",
                  this._onResize
                ),
              (this.isDetecting = !1));
          }),
          (n.destroy = function () {
            this.remove(),
              this.span &&
                this.span.parentElement &&
                this.span.parentElement.removeChild(this.span),
              (this.span = null),
              (this.iframe = null),
              (this.resizeObserver = null);
          }),
          (e.exports = new s());
      },
      {},
    ],
    5: [
      function (t, e, i) {
        "use strict";
        var s = t(16),
          n = function () {
            this.focusableSelectors = s.selectors;
          },
          r = n.prototype;
        (r.isFocusableElement = function (t, e, i) {
          return (
            !(e && !this._isDisplayed(t)) &&
            (s.nodeName[t.nodeName]
              ? !t.disabled
              : !t.contentEditable ||
                ((i = i || parseFloat(t.getAttribute("tabindex"))), !isNaN(i)))
          );
        }),
          (r.isTabbableElement = function (t, e) {
            if (e && !this._isDisplayed(t)) return !1;
            var i = t.getAttribute("tabindex");
            return (
              (i = parseFloat(i)),
              isNaN(i) ? this.isFocusableElement(t, e, i) : i >= 0
            );
          }),
          (r._isDisplayed = function (t) {
            var e = t.getBoundingClientRect();
            return (
              (0 !== e.top ||
                0 !== e.left ||
                0 !== e.width ||
                0 !== e.height) &&
              "hidden" !== window.getComputedStyle(t).visibility
            );
          }),
          (r.getTabbableElements = function (t, e) {
            for (
              var i = t.querySelectorAll(this.focusableSelectors),
                s = i.length,
                n = [],
                r = 0;
              r < s;
              r++
            )
              this.isTabbableElement(i[r], e) && n.push(i[r]);
            return n;
          }),
          (r.getFocusableElements = function (t, e) {
            for (
              var i = t.querySelectorAll(this.focusableSelectors),
                s = i.length,
                n = [],
                r = 0;
              r < s;
              r++
            )
              this.isFocusableElement(i[r], e) && n.push(i[r]);
            return n;
          }),
          (e.exports = new n());
      },
      { 16: 16 },
    ],
    6: [
      function (t, e, i) {
        "use strict";
        const s = t(12);
        e.exports = function (t) {
          s(t, "tabindex", "-1");
        };
      },
      { 12: 12 },
    ],
    7: [
      function (t, e, i) {
        "use strict";
        var s = t(5);
        let n = (t) => {
          s.isTabbableElement(t) || t.setAttribute("tabindex", "0");
        };
        e.exports = function (t) {
          t instanceof Node
            ? n(t)
            : t.forEach((t) => {
                n(t);
              });
        };
      },
      { 5: 5 },
    ],
    8: [
      function (t, e, i) {
        "use strict";
        var s = t(15),
          n = t(5),
          r = function (t, e) {
            var i = t.getAttribute("data-original-" + e);
            i ||
              ((i = t.getAttribute(e) || ""),
              t.setAttribute("data-original-" + e, i));
          };
        e.exports = function (t, e) {
          if (n.isFocusableElement(t, e))
            r(t, "tabindex"), t.setAttribute("tabindex", "-1");
          else
            for (var i = n.getTabbableElements(t, e), o = i.length; o--; )
              r(i[o], "tabindex"), i[o].setAttribute("tabindex", "-1");
          r(t, s.HIDDEN), t.setAttribute(s.HIDDEN, "true");
        };
      },
      { 15: 15, 5: 5 },
    ],
    9: [
      function (t, e, i) {
        "use strict";
        var s = t(8);
        e.exports = function t(e, i, n) {
          i = i || document.body;
          for (var r = e, o = e; (r = r.previousElementSibling); ) s(r, n);
          for (; (o = o.nextElementSibling); ) s(o, n);
          e.parentElement && e.parentElement !== i && t(e.parentElement, i, n);
        };
      },
      { 8: 8 },
    ],
    10: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t) {
          return "string" == typeof t ? "true" === (t = t.toLowerCase()) : t;
        };
      },
      {},
    ],
    11: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t, e) {
          let i;
          (i = t instanceof NodeList ? t : [].concat(t)),
            (e = Array.isArray(e) ? e : [].concat(e)),
            i.forEach((t) => {
              e.forEach((e) => {
                t.removeAttribute(e);
              });
            });
        };
      },
      {},
    ],
    12: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t, e, i) {
          let s;
          "string" != typeof i && (i = i.toString()),
            (s = t instanceof NodeList ? t : [].concat(t)),
            s.forEach((t) => {
              t.setAttribute(e, i);
            });
        };
      },
      {},
    ],
    13: [
      function (t, e, i) {
        "use strict";
        var s = t(11),
          n = t(15),
          r = "data-original-",
          o = function (t, e) {
            var i = t.getAttribute(r + e);
            null !== i &&
              ("" === i ? s(t, e) : t.setAttribute(e, i), s(t, r + e));
          };
        e.exports = function (t) {
          o(t, "tabindex"), o(t, n.HIDDEN);
          for (
            var e = t.querySelectorAll("[".concat(r + "tabindex", "]")),
              i = e.length;
            i--;

          )
            o(e[i], "tabindex");
        };
      },
      { 11: 11, 15: 15 },
    ],
    14: [
      function (t, e, i) {
        "use strict";
        var s = t(13);
        e.exports = function t(e, i) {
          i = i || document.body;
          for (var n = e, r = e; (n = n.previousElementSibling); ) s(n);
          for (; (r = r.nextElementSibling); ) s(r);
          e.parentElement && e.parentElement !== i && t(e.parentElement, i);
        };
      },
      { 13: 13 },
    ],
    15: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          AUTOCOMPLETE: "aria-autocomplete",
          CHECKED: "aria-checked",
          DISABLED: "aria-disabled",
          EXPANDED: "aria-expanded",
          HASPOPUP: "aria-haspopup",
          HIDDEN: "aria-hidden",
          INVALID: "aria-invalid",
          LABEL: "aria-label",
          LEVEL: "aria-level",
          MULTILINE: "aria-multiline",
          MULTISELECTABLE: "aria-multiselectable",
          ORIENTATION: "aria-orientation",
          PRESSED: "aria-pressed",
          READONLY: "aria-readonly",
          REQUIRED: "aria-required",
          SELECTED: "aria-selected",
          SORT: "aria-sort",
          VALUEMAX: "aria-valuemax",
          VALUEMIN: "aria-valuemin",
          VALUENOW: "aria-valuenow",
          VALUETEXT: "aria-valuetext",
          ATOMIC: "aria-atomic",
          BUSY: "aria-busy",
          LIVE: "aria-live",
          RELEVANT: "aria-relevant",
          DROPEFFECT: "aria-dropeffect",
          GRABBED: "aria-grabbed",
          ACTIVEDESCENDANT: "aria-activedescendant",
          CONTROLS: "aria-controls",
          DESCRIBEDBY: "aria-describedby",
          FLOWTO: "aria-flowto",
          LABELLEDBY: "aria-labelledby",
          OWNS: "aria-owns",
          POSINSET: "aria-posinset",
          SETSIZE: "aria-setsize",
        };
      },
      {},
    ],
    16: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          selectors: [
            "input",
            "select",
            "textarea",
            "button",
            "optgroup",
            "option",
            "menuitem",
            "fieldset",
            "object",
            "a[href]",
            "[tabindex]",
            "[contenteditable]",
          ].join(","),
          nodeName: {
            INPUT: "input",
            SELECT: "select",
            TEXTAREA: "textarea",
            BUTTON: "button",
            OPTGROUP: "optgroup",
            OPTION: "option",
            MENUITEM: "menuitem",
            FIELDSET: "fieldset",
            OBJECT: "object",
            A: "a",
          },
        };
      },
      {},
    ],
    17: [
      function (t, e, i) {
        "use strict";
        e.exports = t(58);
      },
      { 58: 58 },
    ],
    18: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          ALERT: "alert",
          ALERTDIALOG: "alertdialog",
          BUTTON: "button",
          CHECKBOX: "checkbox",
          DIALOG: "dialog",
          GRIDCELL: "gridcell",
          LINK: "link",
          LOG: "log",
          MARQUEE: "marquee",
          MENUITEM: "menuitem",
          MENUITEMCHECKBOX: "menuitemcheckbox",
          MENUITEMRADIO: "menuitemradio",
          OPTION: "option",
          PROGRESSBAR: "progressbar",
          RADIO: "radio",
          SCROLLBAR: "scrollbar",
          SLIDER: "slider",
          SPINBUTTON: "spinbutton",
          STATUS: "status",
          SWITCH: "switch",
          TAB: "tab",
          TABPANEL: "tabpanel",
          TEXTBOX: "textbox",
          TIMER: "timer",
          TOOLTIP: "tooltip",
          TREEITEM: "treeitem",
          COMBOBOX: "combobox",
          GRID: "grid",
          LISTBOX: "listbox",
          MENU: "menu",
          MENUBAR: "menubar",
          RADIOGROUP: "radiogroup",
          TABLIST: "tablist",
          TREE: "tree",
          TREEGRID: "treegrid",
          ARTICLE: "article",
          COLUMNHEADER: "columnheader",
          DEFINITION: "definition",
          DIRECTORY: "directory",
          DOCUMENT: "document",
          GROUP: "group",
          HEADING: "heading",
          IMG: "img",
          LIST: "list",
          LISTITEM: "listitem",
          MATH: "math",
          NOTE: "note",
          PRESENTATION: "presentation",
          REGION: "region",
          ROW: "row",
          ROWGROUP: "rowgroup",
          ROWHEADER: "rowheader",
          SEPARATOR: "separator",
          TOOLBAR: "toolbar",
          APPLICATION: "application",
          BANNER: "banner",
          COMPLEMENTARY: "complementary",
          CONTENTINFO: "contentinfo",
          FORM: "form",
          MAIN: "main",
          NAVIGATION: "navigation",
          SEARCH: "search",
        };
      },
      {},
    ],
    19: [
      function (t, e, i) {
        "use strict";
        var s = (function () {
          var t = ["", "-webkit-", "-moz-", "-o-", "-ms-"],
            e = document.createElement("_"),
            i = ["", "-webkit-", "-moz-", "-o-", "-ms-"];
          function s(s) {
            for (var n = 0; n < i.length; n++) {
              var r = t[n] + s;
              if (void 0 !== e.style[r]) return r;
            }
          }
          var n = ["-webkit-", "", "-moz-", "-o-", "-ms-"];
          return {
            filter: (function (t) {
              for (var i = 0; i < n.length; i++) {
                var s = n[i] + t;
                if (void 0 !== e.style[s]) return s;
              }
            })("filter"),
            transform: s("transform"),
            transformOrigin: s("transform-origin"),
            transition: s("transition"),
            transitionDelay: s("transition-delay"),
            transitionDuration: s("transition-duration"),
            transitionProperty: s("transition-property"),
            transitionTimingFunction: s("transition-timing-function"),
            transitionEnd: {
              "animation-delay": "transitionend",
              "-o-animation-delay": "oTransitionEnd",
              "-moz-animation-delay": "transitionend",
              "-webkit-animation-delay": "webkitTransitionEnd",
              "-ms-animation-delay": "transitionend",
            }[s("animation-delay")],
            animation: s("animation"),
            animationDelay: s("animation-delay"),
            animationDirection: s("animation-direction"),
            animationDuration: s("animation-duration"),
            animationFillMode: s("animation-fill-mode"),
            animationIterationCount: s("animation-iteration-count"),
            animationName: s("animation-name"),
            animationTimingFunction: s("animation-timing-function"),
            animationPlayState: s("animation-play-state"),
            animationStart: {
              "animation-delay": "animationstart",
              "-o-animation-delay": "oanimationstart",
              "-moz-animation-delay": "animationstart",
              "-webkit-animation-delay": "webkitAnimationStart",
              "-ms-animation-delay": "MSAnimationStart",
            }[s("animation-delay")],
            animationIteration: {
              "animation-delay": "animationiteration",
              "-o-animation-delay": "oanimationiteration",
              "-moz-animation-delay": "animationiteration",
              "-webkit-animation-delay": "webkitAnimationIteration",
              "-ms-animation-delay": "MSAnimationIteration",
            }[s("animation-delay")],
            animationEnd: {
              "animation-delay": "animationend",
              "-o-animation-delay": "oanimationend",
              "-moz-animation-delay": "animationend",
              "-webkit-animation-delay": "webkitAnimationEnd",
              "-ms-animation-delay": "MSAnimationEnd",
            }[s("animation-delay")],
          };
        })();
        e.exports = s;
      },
      {},
    ],
    20: [
      function (t, e, i) {
        "use strict";
        const s = t(93).ScrollContainer,
          n = {
            componentName: "chapternav",
            scrollEasing: "ease-out",
            scrollDuration: 0.4,
            usePaddles: !0,
          };
        e.exports = class {
          constructor(t, e) {
            return (
              (this.el = t),
              (e = Object.assign({}, n, e)),
              (this.options = {
                componentName: e.componentName,
                itemsSelector:
                  e.itemsSelector || ".".concat(e.componentName, "-items"),
                itemSelector:
                  e.itemSelector || ".".concat(e.componentName, "-link"),
                itemLabelSelector:
                  e.itemLabelSelector || ".".concat(e.componentName, "-label"),
                itemNewSelector:
                  e.itemNewSelector || ".".concat(e.componentName, "-new"),
                leftPaddleSelector:
                  e.leftPaddleSelector ||
                  ".".concat(e.componentName, "-paddle-left"),
                rightPaddleSelector:
                  e.rightPaddleSelector ||
                  ".".concat(e.componentName, "-paddle-right"),
                tallClass: e.tallClass || "".concat(e.componentName, "-tall"),
                scrollEasing: e.scrollEasing,
                scrollDuration: e.scrollDuration,
                usePaddles: e.usePaddles,
              }),
              this.setChapternavTall(this.isChapternavTall()),
              new s(this.el, this.options)
            );
          }
          isChapternavTall() {
            const t = this.el.querySelectorAll(this.options.itemSelector);
            let e = !1;
            return (
              t.forEach((t) => {
                const i = t.querySelector(this.options.itemLabelSelector),
                  s = !!t.querySelector(this.options.itemNewSelector),
                  n = i.getElementsByTagName("BR").length > 0;
                s && n && (e = !0);
              }),
              e
            );
          }
          setChapternavTall(t) {
            !0 === t
              ? this.el.classList.add(this.options.tallClass)
              : this.el.classList.remove(this.options.tallClass);
          }
        };
      },
      { 93: 93 },
    ],
    21: [
      function (t, e, i) {
        "use strict";
        const s = t(20),
          n = document.getElementById("chapternav");
        n && (e.exports = new s(n));
      },
      { 20: 20 },
    ],
    22: [
      function (t, e, i) {
        "use strict";
        t(53), t(53);
        var s = t(23);
        e.exports = function () {
          var t,
            e = Array.prototype.slice.call(arguments),
            i = e.shift(e);
          if (i.classList && i.classList.add)
            i.classList.add.apply(i.classList, e);
          else for (t = 0; t < e.length; t++) s(i, e[t]);
        };
      },
      { 23: 23, 53: 53 },
    ],
    23: [
      function (t, e, i) {
        "use strict";
        var s = t(24);
        e.exports = function (t, e) {
          s(t, e) || (t.className += " " + e);
        };
      },
      { 24: 24 },
    ],
    24: [
      function (t, e, i) {
        "use strict";
        var s = t(25);
        e.exports = function (t, e) {
          return s(e).test(t.className);
        };
      },
      { 25: 25 },
    ],
    25: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t) {
          return new RegExp("(\\s|^)" + t + "(\\s|$)");
        };
      },
      {},
    ],
    26: [
      function (t, e, i) {
        "use strict";
        var s = t(24),
          n = t(25);
        e.exports = function (t, e) {
          s(t, e) && (t.className = t.className.replace(n(e), "$1").trim());
        };
      },
      { 24: 24, 25: 25 },
    ],
    27: [
      function (t, e, i) {
        "use strict";
        t(53), t(53);
        var s = t(26);
        e.exports = function () {
          var t,
            e = Array.prototype.slice.call(arguments),
            i = e.shift(e);
          if (i.classList && i.classList.remove)
            i.classList.remove.apply(i.classList, e);
          else for (t = 0; t < e.length; t++) s(i, e[t]);
        };
      },
      { 26: 26, 53: 53 },
    ],
    28: [
      function (t, e, i) {
        "use strict";
        var s = !1,
          n = window || self;
        try {
          s = !!n.localStorage.getItem("f7c9180f-5c45-47b4-8de4-428015f096c0");
        } catch (t) {}
        e.exports = s;
      },
      {},
    ],
    29: [
      function (t, e, i) {
        "use strict";
        e.exports = t(30)("error");
      },
      { 30: 30 },
    ],
    30: [
      function (t, e, i) {
        "use strict";
        var s = t(28);
        e.exports = function (t) {
          return function () {
            if (
              s &&
              "object" == typeof window.console &&
              "function" == typeof console[t]
            )
              return console[t].apply(
                console,
                Array.prototype.slice.call(arguments, 0)
              );
          };
        };
      },
      { 28: 28 },
    ],
    31: [
      function (t, e, i) {
        "use strict";
        e.exports = t(30)("log");
      },
      { 30: 30 },
    ],
    32: [
      function (t, e, i) {
        "use strict";
        var s = t(36),
          n = t(34);
        e.exports = function (t, e, i, r) {
          return (e = n(t, e)), s(t, e, i, r);
        };
      },
      { 34: 34, 36: 36 },
    ],
    33: [
      function (t, e, i) {
        "use strict";
        var s = t(37),
          n = t(34);
        e.exports = function (t, e, i, r) {
          return (e = n(t, e)), s(t, e, i, r);
        };
      },
      { 34: 34, 37: 37 },
    ],
    34: [
      function (t, e, i) {
        "use strict";
        var s = t(71);
        e.exports = function (t, e) {
          var i;
          return (
            (i =
              "tagName" in t
                ? t.tagName
                : t === window
                ? "window"
                : "document"),
            s(e, i) || e
          );
        };
      },
      { 71: 71 },
    ],
    35: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t) {
          return void 0 !== (t = t || window.event).target
            ? t.target
            : t.srcElement;
        };
      },
      {},
    ],
    36: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t, e, i, s) {
          return (
            t.addEventListener
              ? t.addEventListener(e, i, !!s)
              : t.attachEvent("on" + e, i),
            t
          );
        };
      },
      {},
    ],
    37: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t, e, i, s) {
          return (
            t.removeEventListener
              ? t.removeEventListener(e, i, !!s)
              : t.detachEvent("on" + e, i),
            t
          );
        };
      },
      {},
    ],
    38: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t) {
          var e;
          if ((t = t || window) === window) {
            if ((e = window.pageXOffset)) return e;
            t =
              document.documentElement ||
              document.body.parentNode ||
              document.body;
          }
          return t.scrollLeft;
        };
      },
      {},
    ],
    39: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t) {
          var e;
          if ((t = t || window) === window) {
            if ((e = window.pageYOffset)) return e;
            t =
              document.documentElement ||
              document.body.parentNode ||
              document.body;
          }
          return t.scrollTop;
        };
      },
      {},
    ],
    40: [
      function (t, e, i) {
        "use strict";
        e.exports = 8;
      },
      {},
    ],
    41: [
      function (t, e, i) {
        "use strict";
        e.exports = 11;
      },
      {},
    ],
    42: [
      function (t, e, i) {
        "use strict";
        e.exports = 1;
      },
      {},
    ],
    43: [
      function (t, e, i) {
        "use strict";
        e.exports = 3;
      },
      {},
    ],
    44: [
      function (t, e, i) {
        "use strict";
        var s = t(47);
        e.exports = function (t, e) {
          return (
            !!s(t) &&
            ("number" == typeof e
              ? t.nodeType === e
              : -1 !== e.indexOf(t.nodeType))
          );
        };
      },
      { 47: 47 },
    ],
    45: [
      function (t, e, i) {
        "use strict";
        var s = t(44),
          n = t(40),
          r = t(41),
          o = t(42),
          a = t(43),
          l = [o, a, n, r],
          h = [o, a, n],
          c = [o, r];
        e.exports = {
          parentNode: function (t, e, i, n) {
            if (((n = n || "target"), (t || e) && !s(t, c)))
              throw new TypeError(
                i + ": " + n + " must be an Element, or Document Fragment"
              );
          },
          childNode: function (t, e, i, n) {
            if (((n = n || "target"), (t || e) && !s(t, h)))
              throw new TypeError(
                i + ": " + n + " must be an Element, TextNode, or Comment"
              );
          },
          insertNode: function (t, e, i, n) {
            if (((n = n || "node"), (t || e) && !s(t, l)))
              throw new TypeError(
                i +
                  ": " +
                  n +
                  " must be an Element, TextNode, Comment, or Document Fragment"
              );
          },
          hasParentNode: function (t, e, i) {
            if (((i = i || "target"), !t.parentNode))
              throw new TypeError(e + ": " + i + " must have a parentNode");
          },
        };
      },
      { 40: 40, 41: 41, 42: 42, 43: 43, 44: 44 },
    ],
    46: [
      function (t, e, i) {
        "use strict";
        var s = t(44),
          n = t(42);
        e.exports = function (t) {
          return s(t, n);
        };
      },
      { 42: 42, 44: 44 },
    ],
    47: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t) {
          return !(!t || !t.nodeType);
        };
      },
      {},
    ],
    48: [
      function (t, e, i) {
        "use strict";
        var s = t(45);
        e.exports = function (t) {
          return (
            s.childNode(t, !0, "remove"),
            t.parentNode ? t.parentNode.removeChild(t) : t
          );
        };
      },
      { 45: 45 },
    ],
    49: [
      function (t, e, i) {
        "use strict";
        e.exports = { EventEmitterMicro: t(50) };
      },
      { 50: 50 },
    ],
    50: [
      function (t, e, i) {
        "use strict";
        function s() {
          this._events = {};
        }
        var n = s.prototype;
        (n.on = function (t, e) {
          (this._events[t] = this._events[t] || []), this._events[t].unshift(e);
        }),
          (n.once = function (t, e) {
            var i = this;
            this.on(t, function s(n) {
              i.off(t, s), void 0 !== n ? e(n) : e();
            });
          }),
          (n.off = function (t, e) {
            if (this.has(t)) {
              if (1 === arguments.length)
                return (this._events[t] = null), void delete this._events[t];
              var i = this._events[t].indexOf(e);
              -1 !== i && this._events[t].splice(i, 1);
            }
          }),
          (n.trigger = function (t, e) {
            if (this.has(t))
              for (var i = this._events[t].length - 1; i >= 0; i--)
                void 0 !== e ? this._events[t][i](e) : this._events[t][i]();
          }),
          (n.has = function (t) {
            return t in this._events != !1 && 0 !== this._events[t].length;
          }),
          (n.destroy = function () {
            for (var t in this._events) this._events[t] = null;
            this._events = null;
          }),
          (e.exports = s);
      },
      {},
    ],
    51: [
      function (t, e, i) {
        "use strict";
        var s = {};
        e.exports = function (t, e, i) {
          if (
            ((t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")),
            i || !s.hasOwnProperty(t))
          ) {
            var n = new RegExp("[\\?&]" + t + "=([^&#]*)").exec(
                location.search
              ),
              r = null === n ? e : decodeURIComponent(n[1].replace(/\+/g, " "));
            ("true" !== r && "false" !== r) || (r = "true" === r),
              isNaN(parseFloat(r)) || (r = parseFloat(r)),
              (s[t] = r);
          }
          return s[t];
        };
      },
      {},
    ],
    52: [
      function (t, e, i) {
        e.exports = function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      },
      {},
    ],
    53: [function (t, e, i) {}, {}],
    54: [
      function (t, e, i) {
        "use strict";
        var s = t(49).EventEmitterMicro,
          n = t(36),
          r = t(37),
          o = t(68),
          a = t(56);
        function l(t) {
          (this._keysDown = {}),
            (this._DOMKeyDown = this._DOMKeyDown.bind(this)),
            (this._DOMKeyUp = this._DOMKeyUp.bind(this)),
            (this._context = t || document),
            n(this._context, "keydown", this._DOMKeyDown, !0),
            n(this._context, "keyup", this._DOMKeyUp, !0),
            s.call(this);
        }
        var h = (l.prototype = o(s.prototype));
        (h.onDown = function (t, e) {
          return this.on("keydown:" + t, e);
        }),
          (h.onceDown = function (t, e) {
            return this.once("keydown:" + t, e);
          }),
          (h.offDown = function (t, e) {
            return this.off("keydown:" + t, e);
          }),
          (h.onUp = function (t, e) {
            return this.on("keyup:" + t, e);
          }),
          (h.onceUp = function (t, e) {
            return this.once("keyup:" + t, e);
          }),
          (h.offUp = function (t, e) {
            return this.off("keyup:" + t, e);
          }),
          (h.isDown = function (t) {
            return (t += ""), this._keysDown[t] || !1;
          }),
          (h.isUp = function (t) {
            return !this.isDown(t);
          }),
          (h.destroy = function () {
            return (
              r(this._context, "keydown", this._DOMKeyDown, !0),
              r(this._context, "keyup", this._DOMKeyUp, !0),
              (this._keysDown = null),
              (this._context = null),
              s.prototype.destroy.call(this),
              this
            );
          }),
          (h._DOMKeyDown = function (t) {
            var e = this._normalizeKeyboardEvent(t),
              i = (e.keyCode += "");
            this._trackKeyDown(i), this.trigger("keydown:" + i, e);
          }),
          (h._DOMKeyUp = function (t) {
            var e = this._normalizeKeyboardEvent(t),
              i = (e.keyCode += "");
            this._trackKeyUp(i), this.trigger("keyup:" + i, e);
          }),
          (h._normalizeKeyboardEvent = function (t) {
            return new a(t);
          }),
          (h._trackKeyUp = function (t) {
            this._keysDown[t] && (this._keysDown[t] = !1);
          }),
          (h._trackKeyDown = function (t) {
            this._keysDown[t] || (this._keysDown[t] = !0);
          }),
          (e.exports = l);
      },
      { 36: 36, 37: 37, 49: 49, 56: 56, 68: 68 },
    ],
    55: [
      function (t, e, i) {
        "use strict";
        var s = t(54);
        e.exports = new s();
      },
      { 54: 54 },
    ],
    56: [
      function (t, e, i) {
        "use strict";
        var s = t(57),
          n = ["keyLocation", "keyIdentifier"];
        function r(t) {
          var e;
          for (e in ((this.originalEvent = t), t))
            -1 === n.indexOf(e) &&
              "function" != typeof t[e] &&
              (this[e] = t[e]);
          this.keyCode || (this.keyCode = this._getKeyCode()),
            (this.location =
              void 0 !== this.originalEvent.location
                ? this.originalEvent.location
                : this.originalEvent.keyLocation);
        }
        (r.prototype = {
          preventDefault: function () {
            if ("function" == typeof this.originalEvent.preventDefault)
              return this.originalEvent.preventDefault();
            this.originalEvent.returnValue = !1;
          },
          stopPropagation: function () {
            return this.originalEvent.stopPropagation();
          },
          _getKeyCode: function () {
            return s[this.code] || -1;
          },
        }),
          (e.exports = r);
      },
      { 57: 57 },
    ],
    57: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          Backspace: 8,
          Tab: 9,
          Enter: 13,
          NumpadEnter: 13,
          ShiftLeft: 16,
          ShiftRight: 16,
          ControlLeft: 17,
          ControlRight: 17,
          AltLeft: 18,
          AltRight: 18,
          CapsLock: 20,
          Escape: 27,
          PageUp: 33,
          PageDown: 34,
          End: 35,
          Home: 36,
          ArrowLeft: 37,
          ArrowUp: 38,
          ArrowRight: 39,
          ArrowDown: 40,
          Delete: 46,
          Digit0: 48,
          Digit1: 49,
          Digit2: 50,
          Digit3: 51,
          Digit4: 52,
          Digit5: 53,
          Digit6: 54,
          Digit7: 55,
          Digit8: 56,
          Digit9: 57,
          KeyA: 65,
          KeyB: 66,
          KeyC: 67,
          KeyD: 68,
          KeyE: 69,
          KeyF: 70,
          KeyG: 71,
          KeyH: 72,
          KeyI: 73,
          KeyJ: 74,
          KeyK: 75,
          KeyL: 76,
          KeyM: 77,
          KeyN: 78,
          KeyO: 79,
          KeyP: 80,
          KeyQ: 81,
          KeyR: 82,
          KeyS: 83,
          KeyT: 84,
          KeyU: 85,
          KeyV: 86,
          KeyW: 87,
          KeyX: 88,
          KeyY: 89,
          KeyZ: 90,
          Numpad0: 96,
          Numpad1: 97,
          Numpad2: 98,
          Numpad3: 99,
          Numpad4: 100,
          Numpad5: 101,
          Numpad6: 102,
          Numpad7: 103,
          Numpad8: 104,
          Numpad9: 105,
          NumpadMultiply: 106,
          NumpadAdd: 107,
          NumpadSubtract: 109,
          NumpadDecimal: 110,
          NumpadDivide: 111,
          NumpadEqual: 187,
          Backquote: 192,
          BracketLeft: 219,
          BracketRight: 221,
          Backslash: 220,
          Semicolon: 186,
          Quote: 222,
          Space: 32,
          Equal: 187,
          Comma: 188,
          Minus: 189,
          Period: 190,
          Slash: 191,
        };
      },
      {},
    ],
    58: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          BACKSPACE: 8,
          TAB: 9,
          ENTER: 13,
          SHIFT: 16,
          CONTROL: 17,
          ALT: 18,
          COMMAND: 91,
          CAPSLOCK: 20,
          ESCAPE: 27,
          PAGE_UP: 33,
          PAGE_DOWN: 34,
          END: 35,
          HOME: 36,
          ARROW_LEFT: 37,
          ARROW_UP: 38,
          ARROW_RIGHT: 39,
          ARROW_DOWN: 40,
          DELETE: 46,
          ZERO: 48,
          ONE: 49,
          TWO: 50,
          THREE: 51,
          FOUR: 52,
          FIVE: 53,
          SIX: 54,
          SEVEN: 55,
          EIGHT: 56,
          NINE: 57,
          A: 65,
          B: 66,
          C: 67,
          D: 68,
          E: 69,
          F: 70,
          G: 71,
          H: 72,
          I: 73,
          J: 74,
          K: 75,
          L: 76,
          M: 77,
          N: 78,
          O: 79,
          P: 80,
          Q: 81,
          R: 82,
          S: 83,
          T: 84,
          U: 85,
          V: 86,
          W: 87,
          X: 88,
          Y: 89,
          Z: 90,
          NUMPAD_ZERO: 96,
          NUMPAD_ONE: 97,
          NUMPAD_TWO: 98,
          NUMPAD_THREE: 99,
          NUMPAD_FOUR: 100,
          NUMPAD_FIVE: 101,
          NUMPAD_SIX: 102,
          NUMPAD_SEVEN: 103,
          NUMPAD_EIGHT: 104,
          NUMPAD_NINE: 105,
          NUMPAD_ASTERISK: 106,
          NUMPAD_PLUS: 107,
          NUMPAD_DASH: 109,
          NUMPAD_DOT: 110,
          NUMPAD_SLASH: 111,
          NUMPAD_EQUALS: 187,
          TICK: 192,
          LEFT_BRACKET: 219,
          RIGHT_BRACKET: 221,
          BACKSLASH: 220,
          SEMICOLON: 186,
          APOSTRAPHE: 222,
          APOSTROPHE: 222,
          SPACEBAR: 32,
          CLEAR: 12,
          COMMA: 188,
          DOT: 190,
          SLASH: 191,
        };
      },
      {},
    ],
    59: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          Modal: t(60),
          Renderer: t(61),
          classNames: t(62),
          dataAttributes: t(63),
        };
      },
      { 60: 60, 61: 61, 62: 62, 63: 63 },
    ],
    60: [
      function (t, e, i) {
        "use strict";
        var s = {
            addEventListener: t(32),
            removeEventListener: t(33),
            target: t(35),
          },
          n = { getScrollX: t(38), getScrollY: t(39) },
          r = { create: t(68), defaults: t(69) },
          o = t(55),
          a = t(58),
          l = t(49).EventEmitterMicro,
          h = t(61),
          c = { retainScrollPosition: !1 };
        function u(t, e) {
          l.call(this),
            (this.options = r.defaults(c, t)),
            (this.renderer = new h(e)),
            (this.opened = !1),
            (this._keysToClose = [a.ESCAPE]),
            (this._attachedKeysToClose = []),
            (this.close = this.close.bind(this));
        }
        var d = (u.prototype = r.create(l.prototype));
        (d.open = function () {
          this.options.retainScrollPosition && this._saveScrollPosition(),
            this.opened ||
              (this._attachEvents(),
              this.trigger("willopen"),
              this.renderer.open(),
              (this.opened = !0),
              this.trigger("open"));
        }),
          (d.close = function (t) {
            var e, i;
            if (this.opened) {
              if (
                t &&
                "click" === t.type &&
                ((e = s.target(t)),
                (i = this.renderer.options.dataAttributes.close),
                !e.hasAttribute(i))
              )
                return;
              this.trigger("willclose"),
                this._removeEvents(),
                this.renderer.close(),
                this.options.retainScrollPosition &&
                  this._restoreScrollPosition(),
                (this.opened = !1),
                this.trigger("close");
            }
          }),
          (d.render = function () {
            this.renderer.render();
          }),
          (d.appendContent = function (t, e) {
            this.renderer.appendContent(t, e);
          }),
          (d.removeContent = function (t) {
            this.renderer.removeContent(t);
          }),
          (d.destroy = function () {
            for (var t in (this._removeEvents(), this.renderer.destroy(), this))
              this.hasOwnProperty(t) && (this[t] = null);
          }),
          (d.addKeyToClose = function (t) {
            -1 === this._keysToClose.indexOf(t) &&
              (this._keysToClose.push(t), this._bindKeyToClose(t));
          }),
          (d.removeKeyToClose = function (t) {
            var e = this._keysToClose.indexOf(t);
            -1 !== e && this._keysToClose.splice(e, 1),
              this._releaseKeyToClose(t);
          }),
          (d._bindKeyToClose = function (t) {
            -1 === this._attachedKeysToClose.indexOf(t) &&
              (o.onUp(t, this.close), this._attachedKeysToClose.push(t));
          }),
          (d._releaseKeyToClose = function (t) {
            var e = this._attachedKeysToClose.indexOf(t);
            -1 !== e &&
              (o.offUp(t, this.close), this._attachedKeysToClose.splice(e, 1));
          }),
          (d._removeEvents = function () {
            this.renderer.modalElement &&
              s.removeEventListener(
                this.renderer.modalElement,
                "click",
                this.close
              ),
              this._keysToClose.forEach(this._releaseKeyToClose, this);
          }),
          (d._attachEvents = function () {
            this.renderer.modalElement &&
              s.addEventListener(
                this.renderer.modalElement,
                "click",
                this.close
              ),
              this._keysToClose.forEach(this._bindKeyToClose, this);
          }),
          (d._restoreScrollPosition = function () {
            window.scrollTo(this._scrollX || 0, this._scrollY || 0);
          }),
          (d._saveScrollPosition = function () {
            (this._scrollX = n.getScrollX()), (this._scrollY = n.getScrollY());
          }),
          (e.exports = u);
      },
      {
        32: 32,
        33: 33,
        35: 35,
        38: 38,
        39: 39,
        49: 49,
        55: 55,
        58: 58,
        61: 61,
        68: 68,
        69: 69,
      },
    ],
    61: [
      function (t, e, i) {
        "use strict";
        var s = { add: t(22), remove: t(27) },
          n = { defaults: t(69) },
          r = { remove: t(48), isElement: t(46) },
          o = {
            modalElement: null,
            contentElement: null,
            closeButton: null,
            classNames: t(62),
            dataAttributes: t(63),
          },
          a = function (t) {
            (t = t || {}),
              (this.options = n.defaults(o, t)),
              (this.options.classNames = n.defaults(
                o.classNames,
                t.classNames
              )),
              (this.options.dataAttributes = n.defaults(
                o.dataAttributes,
                t.dataAttributes
              )),
              (this.modalElement = this.options.modalElement),
              (this.contentElement = this.options.contentElement),
              (this.closeButton = this.options.closeButton);
          },
          l = a.prototype;
        (l.render = function () {
          return (
            r.isElement(this.modalElement) ||
              (this.modalElement = this.renderModalElement(
                this.options.classNames.modalElement
              )),
            r.isElement(this.contentElement) ||
              (this.contentElement = this.renderContentElement(
                this.options.classNames.contentElement
              )),
            !1 !== this.closeButton &&
              (r.isElement(this.closeButton) ||
                (this.closeButton = this.renderCloseButton(
                  this.options.classNames.closeButton
                )),
              this.modalElement.appendChild(this.closeButton)),
            this.modalElement.appendChild(this.contentElement),
            document.body.appendChild(this.modalElement),
            this.modalElement
          );
        }),
          (l.renderCloseButton = function (t) {
            var e;
            return (
              (t = t || this.options.classNames.closeButton),
              (e = this._renderElement("button", t)).setAttribute(
                this.options.dataAttributes.close,
                ""
              ),
              e
            );
          }),
          (l.renderModalElement = function (t) {
            return (
              (t = t || this.options.classNames.modalElement),
              this._renderElement("div", t)
            );
          }),
          (l.renderContentElement = function (t) {
            return (
              (t = t || this.options.classNames.contentElement),
              this._renderElement("div", t)
            );
          }),
          (l.appendContent = function (t, e) {
            r.isElement(t) &&
              (void 0 === arguments[1]
                ? this.contentElement.appendChild(t)
                : r.isElement(e) && e.appendChild(t));
          }),
          (l.removeContent = function (t) {
            t
              ? this.modalElement.contains(t) && r.remove(t)
              : this._emptyContent();
          }),
          (l.open = function () {
            var t = [document.documentElement].concat(
                this.options.classNames.documentElement
              ),
              e = [this.modalElement].concat(this.options.classNames.modalOpen);
            s.add.apply(null, t), s.add.apply(null, e);
          }),
          (l.close = function () {
            var t = [document.documentElement].concat(
                this.options.classNames.documentElement
              ),
              e = [this.modalElement].concat(this.options.classNames.modalOpen);
            s.remove.apply(null, t), s.remove.apply(null, e);
          }),
          (l.destroy = function () {
            var t = [document.documentElement].concat(
              this.options.classNames.documentElement
            );
            for (var e in (this.modalElement &&
              document.body.contains(this.modalElement) &&
              (this.close(), document.body.removeChild(this.modalElement)),
            s.remove.apply(null, t),
            this))
              this.hasOwnProperty(e) && (this[e] = null);
          }),
          (l._renderElement = function (t, e) {
            var i = document.createElement(t),
              n = [i];
            return e && (n = n.concat(e)), s.add.apply(null, n), i;
          }),
          (l._emptyContent = function () {
            this.contentElement.innerHTML = "";
          }),
          (e.exports = a);
      },
      { 22: 22, 27: 27, 46: 46, 48: 48, 62: 62, 63: 63, 69: 69 },
    ],
    62: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          modalElement: "modal",
          modalOpen: "modal-open",
          documentElement: "has-modal",
          contentElement: "modal-content",
          closeButton: "modal-close",
        };
      },
      {},
    ],
    63: [
      function (t, e, i) {
        "use strict";
        e.exports = { close: "data-modal-close" };
      },
      {},
    ],
    64: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          Modal: t(65),
          createStandardModal: t(67),
          createFullViewportModal: t(66),
        };
      },
      { 65: 65, 66: 66, 67: 67 },
    ],
    65: [
      function (t, e, i) {
        "use strict";
        var s = t(59).Modal,
          n = t(49).EventEmitterMicro,
          r = t(2);
        function o(t) {
          n.call(this),
            (this.options = t || {}),
            (this._modal = new s(t, this.options.renderer)),
            (this.opened = !1),
            this._render(),
            (this.closeButton = this._modal.renderer.closeButton),
            (this.modalElement = this._modal.renderer.modalElement),
            (this.contentElement = this._modal.renderer.contentElement),
            this.modalElement.setAttribute("role", "dialog"),
            this.modalElement.setAttribute("aria-label", "Modal"),
            this.modalElement.setAttribute("aria-modal", "true"),
            this.modalElement.setAttribute("tabindex", "-1"),
            this.closeButton.setAttribute("aria-label", "Close"),
            (this._circularTab = new r(this.modalElement)),
            (this._onWillOpen = this._onWillOpen.bind(this)),
            (this._onOpen = this._onOpen.bind(this)),
            (this._onWillClose = this._onWillClose.bind(this)),
            (this._onClose = this._onClose.bind(this)),
            this._bindEvents();
        }
        var a = (o.prototype = Object.create(n.prototype));
        (a.open = function () {
          this._modal.open(), (this.opened = this._modal.opened);
        }),
          (a.close = function () {
            this._modal.close();
          }),
          (a.appendContent = function (t) {
            this._modal.appendContent(t);
          }),
          (a.removeContent = function (t) {
            this._modal.removeContent(t);
          }),
          (a.destroy = function () {
            for (var t in (this._releaseEvents(),
            this._modal.destroy(),
            this._removeModalFocus(),
            this._circularTab.destroy(),
            (this._focusObj = null),
            this))
              this.hasOwnProperty(t) && (this[t] = null);
          }),
          (a.addKeyToClose = function (t) {
            this._modal.addKeyToClose(t);
          }),
          (a.removeKeyToClose = function (t) {
            this._modal.removeKeyToClose(t);
          }),
          (a._render = function () {
            this._modal.render(),
              this._modal.renderer.modalElement.setAttribute(
                "aria-hidden",
                "true"
              );
          }),
          (a._bindEvents = function () {
            this._modal.on("willopen", this._onWillOpen),
              this._modal.on("open", this._onOpen),
              this._modal.on("willclose", this._onWillClose),
              this._modal.on("close", this._onClose);
          }),
          (a._releaseEvents = function () {
            this._modal.off("willopen", this._onWillOpen),
              this._modal.off("open", this._onOpen),
              this._modal.off("willclose", this._onWillClose),
              this._modal.off("close", this._onClose);
          }),
          (a._onWillOpen = function () {
            this.trigger("willopen");
          }),
          (a._onOpen = function () {
            (this.opened = this._modal.opened),
              this._giveModalFocus(),
              this.trigger("open");
          }),
          (a._onWillClose = function () {
            this.trigger("willclose"), this._removeModalFocus();
          }),
          (a._onClose = function () {
            (this.opened = this._modal.opened), this.trigger("close");
          }),
          (a._giveModalFocus = function () {
            this.modalElement.removeAttribute("aria-hidden"),
              (this._activeElement = document.activeElement),
              this._circularTab.start(!0),
              setTimeout(
                function () {
                  this.modalElement.focus();
                }.bind(this),
                300
              );
          }),
          (a._removeModalFocus = function () {
            this._circularTab.stop(),
              this.modalElement.setAttribute("aria-hidden", "true"),
              this._activeElement &&
                (this._activeElement.focus(), (this._activeElement = null));
          }),
          (e.exports = o);
      },
      { 2: 2, 49: 49, 59: 59 },
    ],
    66: [
      function (t, e, i) {
        "use strict";
        var s = t(65),
          n = t(59).classNames,
          r = {
            retainScrollPosition: !0,
            renderer: {
              classNames: {
                documentElement: [n.documentElement].concat(
                  "has-modal-full-viewport"
                ),
                modalElement: [n.modalElement].concat("modal-full-viewport"),
              },
            },
          };
        e.exports = function (t, e) {
          var i = new s(r),
            n = e || {};
          return (
            t && i.appendContent(t),
            n.removeContainerPadding &&
              i.modalElement.classList.add("remove-container-padding"),
            i
          );
        };
      },
      { 59: 59, 65: 65 },
    ],
    67: [
      function (t, e, i) {
        "use strict";
        var s = t(65),
          n = t(59).classNames,
          r = t(59).dataAttributes,
          o = { add: t(22) },
          a = {
            renderer: {
              classNames: {
                documentElement: [n.documentElement].concat(
                  "has-modal-standard"
                ),
                modalElement: [n.modalElement].concat("modal-standard"),
              },
            },
          };
        e.exports = function (t) {
          var e = new s(a);
          t && e.appendContent(t);
          var i = document.createElement("div"),
            n = document.createElement("div"),
            l = document.createElement("div"),
            h = document.createElement("div");
          return (
            o.add(i, "content-table"),
            o.add(n, "content-cell"),
            o.add(l, "content-wrapper"),
            o.add(h, "content-padding", "large-8", "medium-10"),
            e.modalElement.setAttribute(r.close, ""),
            l.setAttribute(r.close, ""),
            n.setAttribute(r.close, ""),
            i.appendChild(n),
            n.appendChild(l),
            l.appendChild(h),
            e.modalElement.appendChild(i),
            h.appendChild(e.contentElement),
            h.appendChild(e.closeButton),
            e
          );
        };
      },
      { 22: 22, 59: 59, 65: 65 },
    ],
    68: [
      function (t, e, i) {
        "use strict";
        var s = function () {};
        e.exports = function (t) {
          if (arguments.length > 1)
            throw new Error("Second argument not supported");
          if (null === t || "object" != typeof t)
            throw new TypeError("Object prototype may only be an Object.");
          return "function" == typeof Object.create
            ? Object.create(t)
            : ((s.prototype = t), new s());
        };
      },
      {},
    ],
    69: [
      function (t, e, i) {
        "use strict";
        var s = t(70);
        e.exports = function (t, e) {
          if ("object" != typeof t)
            throw new TypeError("defaults: must provide a defaults object");
          if ("object" != typeof (e = e || {}))
            throw new TypeError("defaults: options must be a typeof object");
          return s({}, t, e);
        };
      },
      { 70: 70 },
    ],
    70: [
      function (t, e, i) {
        "use strict";
        t(53);
        var s = Object.prototype.hasOwnProperty;
        e.exports = function () {
          var t, e;
          return (
            (t =
              arguments.length < 2
                ? [{}, arguments[0]]
                : [].slice.call(arguments)),
            (e = t.shift()),
            t.forEach(function (t) {
              if (null != t) for (var i in t) s.call(t, i) && (e[i] = t[i]);
            }),
            e
          );
        };
      },
      { 53: 53 },
    ],
    71: [
      function (t, e, i) {
        "use strict";
        var s = t(75),
          n = t(72),
          r = t(74),
          o = t(73),
          a = {};
        e.exports = function t(e, i) {
          var l, h, c;
          if (
            ((i = i || "div"),
            (e = e.toLowerCase()),
            i in a || (a[i] = {}),
            e in (h = a[i]))
          )
            return h[e];
          if (s(e, i)) return (h[e] = e);
          if (e in n)
            for (c = 0; c < n[e].length; c++)
              if (((l = n[e][c]), s(l.toLowerCase(), i))) return (h[e] = l);
          for (c = 0; c < o.evt.length; c++)
            if (((l = o.evt[c] + e), s(l, i))) return o.reduce(c), (h[e] = l);
          return "window" !== i && r.indexOf(e)
            ? (h[e] = t(e, "window"))
            : (h[e] = !1);
        };
      },
      { 72: 72, 73: 73, 74: 74, 75: 75 },
    ],
    72: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          transitionend: ["webkitTransitionEnd", "MSTransitionEnd"],
          animationstart: ["webkitAnimationStart", "MSAnimationStart"],
          animationend: ["webkitAnimationEnd", "MSAnimationEnd"],
          animationiteration: [
            "webkitAnimationIteration",
            "MSAnimationIteration",
          ],
          fullscreenchange: ["MSFullscreenChange"],
          fullscreenerror: ["MSFullscreenError"],
        };
      },
      {},
    ],
    73: [
      function (t, e, i) {
        "use strict";
        var s = ["-webkit-", "-moz-", "-ms-"],
          n = ["Webkit", "Moz", "ms"],
          r = ["webkit", "moz", "ms"],
          o = function () {
            this.initialize();
          },
          a = o.prototype;
        (a.initialize = function () {
          (this.reduced = !1), (this.css = s), (this.dom = n), (this.evt = r);
        }),
          (a.reduce = function (t) {
            this.reduced ||
              ((this.reduced = !0),
              (this.css = [this.css[t]]),
              (this.dom = [this.dom[t]]),
              (this.evt = [this.evt[t]]));
          }),
          (e.exports = new o());
      },
      {},
    ],
    74: [
      function (t, e, i) {
        "use strict";
        e.exports = [
          "transitionend",
          "animationstart",
          "animationend",
          "animationiteration",
        ];
      },
      {},
    ],
    75: [
      function (t, e, i) {
        "use strict";
        var s = { window: window, document: document };
        e.exports = function (t, e) {
          var i;
          return (
            (t = "on" + t),
            e in s || (s[e] = document.createElement(e)),
            t in (i = s[e]) ||
              ("setAttribute" in i &&
                (i.setAttribute(t, "return;"), "function" == typeof i[t]))
          );
        };
      },
      {},
    ],
    76: [
      function (t, e, i) {
        "use strict";
        var s = t(94).SharedInstance,
          n = function () {
            this._currentID = 0;
          };
        (n.prototype.getNewID = function () {
          return this._currentID++, "raf:" + this._currentID;
        }),
          (e.exports = s.share(
            "ac-raf-emitter-id-generator:sharedRAFEmitterIDGeneratorInstance",
            "1.0.3",
            n
          ));
      },
      { 94: 94 },
    ],
    77: [
      function (t, e, i) {
        "use strict";
        e.exports = { majorVersionNumber: "3.x" };
      },
      {},
    ],
    78: [
      function (t, e, i) {
        "use strict";
        var s,
          n = t(49).EventEmitterMicro,
          r = t(88),
          o = t(87);
        function a(t) {
          (t = t || {}),
            n.call(this),
            (this.id = o.getNewID()),
            (this.executor = t.executor || r),
            this._reset(),
            (this._willRun = !1),
            (this._didDestroy = !1);
        }
        ((s = a.prototype = Object.create(n.prototype)).run = function () {
          return this._willRun || (this._willRun = !0), this._subscribe();
        }),
          (s.cancel = function () {
            this._unsubscribe(),
              this._willRun && (this._willRun = !1),
              this._reset();
          }),
          (s.destroy = function () {
            var t = this.willRun();
            return (
              this.cancel(),
              (this.executor = null),
              n.prototype.destroy.call(this),
              (this._didDestroy = !0),
              t
            );
          }),
          (s.willRun = function () {
            return this._willRun;
          }),
          (s.isRunning = function () {
            return this._isRunning;
          }),
          (s._subscribe = function () {
            return this.executor.subscribe(this);
          }),
          (s._unsubscribe = function () {
            return this.executor.unsubscribe(this);
          }),
          (s._onAnimationFrameStart = function (t) {
            (this._isRunning = !0),
              (this._willRun = !1),
              this._didEmitFrameData ||
                ((this._didEmitFrameData = !0), this.trigger("start", t));
          }),
          (s._onAnimationFrameEnd = function (t) {
            this._willRun || (this.trigger("stop", t), this._reset());
          }),
          (s._reset = function () {
            (this._didEmitFrameData = !1), (this._isRunning = !1);
          }),
          (e.exports = a);
      },
      { 49: 49, 87: 87, 88: 88 },
    ],
    79: [
      function (t, e, i) {
        "use strict";
        var s,
          n = t(50);
        function r(t) {
          (t = t || {}),
            this._reset(),
            this.updatePhases(),
            (this.eventEmitter = new n()),
            (this._willRun = !1),
            (this._totalSubscribeCount = -1),
            (this._requestAnimationFrame = window.requestAnimationFrame),
            (this._cancelAnimationFrame = window.cancelAnimationFrame),
            (this._boundOnAnimationFrame = this._onAnimationFrame.bind(this)),
            (this._boundOnExternalAnimationFrame =
              this._onExternalAnimationFrame.bind(this));
        }
        ((s = r.prototype).frameRequestedPhase = "requested"),
          (s.startPhase = "start"),
          (s.runPhases = ["update", "external", "draw"]),
          (s.endPhase = "end"),
          (s.disabledPhase = "disabled"),
          (s.beforePhaseEventPrefix = "before:"),
          (s.afterPhaseEventPrefix = "after:"),
          (s.subscribe = function (t, e) {
            return (
              this._totalSubscribeCount++,
              this._nextFrameSubscribers[t.id] ||
                (e
                  ? this._nextFrameSubscribersOrder.unshift(t.id)
                  : this._nextFrameSubscribersOrder.push(t.id),
                (this._nextFrameSubscribers[t.id] = t),
                this._nextFrameSubscriberArrayLength++,
                this._nextFrameSubscriberCount++,
                this._run()),
              this._totalSubscribeCount
            );
          }),
          (s.subscribeImmediate = function (t, e) {
            return (
              this._totalSubscribeCount++,
              this._subscribers[t.id] ||
                (e
                  ? this._subscribersOrder.splice(
                      this._currentSubscriberIndex + 1,
                      0,
                      t.id
                    )
                  : this._subscribersOrder.unshift(t.id),
                (this._subscribers[t.id] = t),
                this._subscriberArrayLength++,
                this._subscriberCount++),
              this._totalSubscribeCount
            );
          }),
          (s.unsubscribe = function (t) {
            return (
              !!this._nextFrameSubscribers[t.id] &&
              ((this._nextFrameSubscribers[t.id] = null),
              this._nextFrameSubscriberCount--,
              0 === this._nextFrameSubscriberCount && this._cancel(),
              !0)
            );
          }),
          (s.getSubscribeID = function () {
            return (this._totalSubscribeCount += 1);
          }),
          (s.destroy = function () {
            var t = this._cancel();
            return (
              this.eventEmitter.destroy(),
              (this.eventEmitter = null),
              (this.phases = null),
              (this._subscribers = null),
              (this._subscribersOrder = null),
              (this._nextFrameSubscribers = null),
              (this._nextFrameSubscribersOrder = null),
              (this._rafData = null),
              (this._boundOnAnimationFrame = null),
              (this._onExternalAnimationFrame = null),
              t
            );
          }),
          (s.useExternalAnimationFrame = function (t) {
            if ("boolean" == typeof t) {
              var e = this._isUsingExternalAnimationFrame;
              return (
                t &&
                  this._animationFrame &&
                  (this._cancelAnimationFrame.call(
                    window,
                    this._animationFrame
                  ),
                  (this._animationFrame = null)),
                !this._willRun ||
                  t ||
                  this._animationFrame ||
                  (this._animationFrame = this._requestAnimationFrame.call(
                    window,
                    this._boundOnAnimationFrame
                  )),
                (this._isUsingExternalAnimationFrame = t),
                t ? this._boundOnExternalAnimationFrame : e || !1
              );
            }
          }),
          (s.updatePhases = function () {
            this.phases || (this.phases = []),
              (this.phases.length = 0),
              this.phases.push(this.frameRequestedPhase),
              this.phases.push(this.startPhase),
              Array.prototype.push.apply(this.phases, this.runPhases),
              this.phases.push(this.endPhase),
              (this._runPhasesLength = this.runPhases.length),
              (this._phasesLength = this.phases.length);
          }),
          (s._run = function () {
            if (!this._willRun)
              return (
                (this._willRun = !0),
                0 === this.lastFrameTime &&
                  (this.lastFrameTime = performance.now()),
                (this._animationFrameActive = !0),
                this._isUsingExternalAnimationFrame ||
                  (this._animationFrame = this._requestAnimationFrame.call(
                    window,
                    this._boundOnAnimationFrame
                  )),
                this.phase === this.disabledPhase &&
                  ((this.phaseIndex = 0),
                  (this.phase = this.phases[this.phaseIndex])),
                !0
              );
          }),
          (s._cancel = function () {
            var t = !1;
            return (
              this._animationFrameActive &&
                (this._animationFrame &&
                  (this._cancelAnimationFrame.call(
                    window,
                    this._animationFrame
                  ),
                  (this._animationFrame = null)),
                (this._animationFrameActive = !1),
                (this._willRun = !1),
                (t = !0)),
              this._isRunning || this._reset(),
              t
            );
          }),
          (s._onAnimationFrame = function (t) {
            for (
              this._subscribers = this._nextFrameSubscribers,
                this._subscribersOrder = this._nextFrameSubscribersOrder,
                this._subscriberArrayLength =
                  this._nextFrameSubscriberArrayLength,
                this._subscriberCount = this._nextFrameSubscriberCount,
                this._nextFrameSubscribers = {},
                this._nextFrameSubscribersOrder = [],
                this._nextFrameSubscriberArrayLength = 0,
                this._nextFrameSubscriberCount = 0,
                this.phaseIndex = 0,
                this.phase = this.phases[this.phaseIndex],
                this._isRunning = !0,
                this._willRun = !1,
                this._didRequestNextRAF = !1,
                this._rafData.delta = t - this.lastFrameTime,
                this.lastFrameTime = t,
                this._rafData.fps = 0,
                this._rafData.delta >= 1e3 && (this._rafData.delta = 0),
                0 !== this._rafData.delta &&
                  (this._rafData.fps = 1e3 / this._rafData.delta),
                this._rafData.time = t,
                this._rafData.naturalFps = this._rafData.fps,
                this._rafData.timeNow = Date.now(),
                this.phaseIndex++,
                this.phase = this.phases[this.phaseIndex],
                this.eventEmitter.trigger(
                  this.beforePhaseEventPrefix + this.phase
                ),
                this._currentSubscriberIndex = 0;
              this._currentSubscriberIndex < this._subscriberArrayLength;
              this._currentSubscriberIndex++
            )
              null !==
                this._subscribers[
                  this._subscribersOrder[this._currentSubscriberIndex]
                ] &&
                !1 ===
                  this._subscribers[
                    this._subscribersOrder[this._currentSubscriberIndex]
                  ]._didDestroy &&
                this._subscribers[
                  this._subscribersOrder[this._currentSubscriberIndex]
                ]._onAnimationFrameStart(this._rafData);
            for (
              this.eventEmitter.trigger(
                this.afterPhaseEventPrefix + this.phase
              ),
                this._runPhaseIndex = 0;
              this._runPhaseIndex < this._runPhasesLength;
              this._runPhaseIndex++
            ) {
              for (
                this.phaseIndex++,
                  this.phase = this.phases[this.phaseIndex],
                  this.eventEmitter.trigger(
                    this.beforePhaseEventPrefix + this.phase
                  ),
                  this._currentSubscriberIndex = 0;
                this._currentSubscriberIndex < this._subscriberArrayLength;
                this._currentSubscriberIndex++
              )
                null !==
                  this._subscribers[
                    this._subscribersOrder[this._currentSubscriberIndex]
                  ] &&
                  !1 ===
                    this._subscribers[
                      this._subscribersOrder[this._currentSubscriberIndex]
                    ]._didDestroy &&
                  this._subscribers[
                    this._subscribersOrder[this._currentSubscriberIndex]
                  ].trigger(this.phase, this._rafData);
              this.eventEmitter.trigger(
                this.afterPhaseEventPrefix + this.phase
              );
            }
            for (
              this.phaseIndex++,
                this.phase = this.phases[this.phaseIndex],
                this.eventEmitter.trigger(
                  this.beforePhaseEventPrefix + this.phase
                ),
                this._currentSubscriberIndex = 0;
              this._currentSubscriberIndex < this._subscriberArrayLength;
              this._currentSubscriberIndex++
            )
              null !==
                this._subscribers[
                  this._subscribersOrder[this._currentSubscriberIndex]
                ] &&
                !1 ===
                  this._subscribers[
                    this._subscribersOrder[this._currentSubscriberIndex]
                  ]._didDestroy &&
                this._subscribers[
                  this._subscribersOrder[this._currentSubscriberIndex]
                ]._onAnimationFrameEnd(this._rafData);
            this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase),
              this._willRun
                ? ((this.phaseIndex = 0),
                  (this.phaseIndex = this.phases[this.phaseIndex]))
                : this._reset();
          }),
          (s._onExternalAnimationFrame = function (t) {
            this._isUsingExternalAnimationFrame && this._onAnimationFrame(t);
          }),
          (s._reset = function () {
            this._rafData || (this._rafData = {}),
              (this._rafData.time = 0),
              (this._rafData.delta = 0),
              (this._rafData.fps = 0),
              (this._rafData.naturalFps = 0),
              (this._rafData.timeNow = 0),
              (this._subscribers = {}),
              (this._subscribersOrder = []),
              (this._currentSubscriberIndex = -1),
              (this._subscriberArrayLength = 0),
              (this._subscriberCount = 0),
              (this._nextFrameSubscribers = {}),
              (this._nextFrameSubscribersOrder = []),
              (this._nextFrameSubscriberArrayLength = 0),
              (this._nextFrameSubscriberCount = 0),
              (this._didEmitFrameData = !1),
              (this._animationFrame = null),
              (this._animationFrameActive = !1),
              (this._isRunning = !1),
              (this._shouldReset = !1),
              (this.lastFrameTime = 0),
              (this._runPhaseIndex = -1),
              (this.phaseIndex = -1),
              (this.phase = this.disabledPhase);
          }),
          (e.exports = r);
      },
      { 50: 50 },
    ],
    80: [
      function (t, e, i) {
        "use strict";
        var s = t(82),
          n = function (t) {
            (this.phase = t),
              (this.rafEmitter = new s()),
              this._cachePhaseIndex(),
              (this.requestAnimationFrame =
                this.requestAnimationFrame.bind(this)),
              (this.cancelAnimationFrame =
                this.cancelAnimationFrame.bind(this)),
              (this._onBeforeRAFExecutorStart =
                this._onBeforeRAFExecutorStart.bind(this)),
              (this._onBeforeRAFExecutorPhase =
                this._onBeforeRAFExecutorPhase.bind(this)),
              (this._onAfterRAFExecutorPhase =
                this._onAfterRAFExecutorPhase.bind(this)),
              this.rafEmitter.on(this.phase, this._onRAFExecuted.bind(this)),
              this.rafEmitter.executor.eventEmitter.on(
                "before:start",
                this._onBeforeRAFExecutorStart
              ),
              this.rafEmitter.executor.eventEmitter.on(
                "before:" + this.phase,
                this._onBeforeRAFExecutorPhase
              ),
              this.rafEmitter.executor.eventEmitter.on(
                "after:" + this.phase,
                this._onAfterRAFExecutorPhase
              ),
              (this._frameCallbacks = []),
              (this._currentFrameCallbacks = []),
              (this._nextFrameCallbacks = []),
              (this._phaseActive = !1),
              (this._currentFrameID = -1),
              (this._cancelFrameIdx = -1),
              (this._frameCallbackLength = 0),
              (this._currentFrameCallbacksLength = 0),
              (this._nextFrameCallbacksLength = 0),
              (this._frameCallbackIteration = 0);
          },
          r = n.prototype;
        (r.requestAnimationFrame = function (t, e) {
          return (
            !0 === e &&
            this.rafEmitter.executor.phaseIndex > 0 &&
            this.rafEmitter.executor.phaseIndex <= this.phaseIndex
              ? this._phaseActive
                ? ((this._currentFrameID =
                    this.rafEmitter.executor.subscribeImmediate(
                      this.rafEmitter,
                      !0
                    )),
                  this._frameCallbacks.push(this._currentFrameID, t),
                  (this._frameCallbackLength += 2))
                : ((this._currentFrameID =
                    this.rafEmitter.executor.subscribeImmediate(
                      this.rafEmitter,
                      !1
                    )),
                  this._currentFrameCallbacks.push(this._currentFrameID, t),
                  (this._currentFrameCallbacksLength += 2))
              : ((this._currentFrameID = this.rafEmitter.run()),
                this._nextFrameCallbacks.push(this._currentFrameID, t),
                (this._nextFrameCallbacksLength += 2)),
            this._currentFrameID
          );
        }),
          (r.cancelAnimationFrame = function (t) {
            (this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(t)),
              this._cancelFrameIdx > -1
                ? this._cancelNextAnimationFrame()
                : ((this._cancelFrameIdx =
                    this._currentFrameCallbacks.indexOf(t)),
                  this._cancelFrameIdx > -1
                    ? this._cancelCurrentAnimationFrame()
                    : ((this._cancelFrameIdx = this._frameCallbacks.indexOf(t)),
                      this._cancelFrameIdx > -1 &&
                        this._cancelRunningAnimationFrame()));
          }),
          (r._onRAFExecuted = function (t) {
            for (
              this._frameCallbackIteration = 0;
              this._frameCallbackIteration < this._frameCallbackLength;
              this._frameCallbackIteration += 2
            )
              this._frameCallbacks[this._frameCallbackIteration + 1](t.time, t);
            (this._frameCallbacks.length = 0), (this._frameCallbackLength = 0);
          }),
          (r._onBeforeRAFExecutorStart = function () {
            Array.prototype.push.apply(
              this._currentFrameCallbacks,
              this._nextFrameCallbacks.splice(0, this._nextFrameCallbacksLength)
            ),
              (this._currentFrameCallbacksLength =
                this._nextFrameCallbacksLength),
              (this._nextFrameCallbacks.length = 0),
              (this._nextFrameCallbacksLength = 0);
          }),
          (r._onBeforeRAFExecutorPhase = function () {
            (this._phaseActive = !0),
              Array.prototype.push.apply(
                this._frameCallbacks,
                this._currentFrameCallbacks.splice(
                  0,
                  this._currentFrameCallbacksLength
                )
              ),
              (this._frameCallbackLength = this._currentFrameCallbacksLength),
              (this._currentFrameCallbacks.length = 0),
              (this._currentFrameCallbacksLength = 0);
          }),
          (r._onAfterRAFExecutorPhase = function () {
            this._phaseActive = !1;
          }),
          (r._cachePhaseIndex = function () {
            this.phaseIndex = this.rafEmitter.executor.phases.indexOf(
              this.phase
            );
          }),
          (r._cancelRunningAnimationFrame = function () {
            this._frameCallbacks.splice(this._cancelFrameIdx, 2),
              (this._frameCallbackLength -= 2);
          }),
          (r._cancelCurrentAnimationFrame = function () {
            this._currentFrameCallbacks.splice(this._cancelFrameIdx, 2),
              (this._currentFrameCallbacksLength -= 2);
          }),
          (r._cancelNextAnimationFrame = function () {
            this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2),
              (this._nextFrameCallbacksLength -= 2),
              0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel();
          }),
          (e.exports = n);
      },
      { 82: 82 },
    ],
    81: [
      function (t, e, i) {
        "use strict";
        var s = t(80),
          n = function () {
            this.events = {};
          },
          r = n.prototype;
        (r.requestAnimationFrame = function (t) {
          return (
            this.events[t] || (this.events[t] = new s(t)),
            this.events[t].requestAnimationFrame
          );
        }),
          (r.cancelAnimationFrame = function (t) {
            return (
              this.events[t] || (this.events[t] = new s(t)),
              this.events[t].cancelAnimationFrame
            );
          }),
          (e.exports = new n());
      },
      { 80: 80 },
    ],
    82: [
      function (t, e, i) {
        "use strict";
        var s = t(78),
          n = function (t) {
            s.call(this, t);
          };
        ((n.prototype = Object.create(s.prototype))._subscribe = function () {
          return this.executor.subscribe(this, !0);
        }),
          (e.exports = n);
      },
      { 78: 78 },
    ],
    83: [
      function (t, e, i) {
        "use strict";
        var s = t(81);
        e.exports = s.cancelAnimationFrame("draw");
      },
      { 81: 81 },
    ],
    84: [
      function (t, e, i) {
        "use strict";
        var s = t(81);
        e.exports = s.cancelAnimationFrame("update");
      },
      { 81: 81 },
    ],
    85: [
      function (t, e, i) {
        "use strict";
        var s = t(81);
        e.exports = s.requestAnimationFrame("draw");
      },
      { 81: 81 },
    ],
    86: [
      function (t, e, i) {
        "use strict";
        var s = t(81);
        e.exports = s.requestAnimationFrame("external");
      },
      { 81: 81 },
    ],
    87: [
      function (t, e, i) {
        "use strict";
        var s = t(94).SharedInstance,
          n = t(77).majorVersionNumber,
          r = function () {
            this._currentID = 0;
          };
        (r.prototype.getNewID = function () {
          return this._currentID++, "raf:" + this._currentID;
        }),
          (e.exports = s.share(
            "@marcom/ac-raf-emitter/sharedRAFEmitterIDGeneratorInstance",
            n,
            r
          ));
      },
      { 77: 77, 94: 94 },
    ],
    88: [
      function (t, e, i) {
        "use strict";
        var s = t(94).SharedInstance,
          n = t(77).majorVersionNumber,
          r = t(79);
        e.exports = s.share(
          "@marcom/ac-raf-emitter/sharedRAFExecutorInstance",
          n,
          r
        );
      },
      { 77: 77, 79: 79, 94: 94 },
    ],
    89: [
      function (t, e, i) {
        "use strict";
        var s = t(81);
        e.exports = s.requestAnimationFrame("update");
      },
      { 81: 81 },
    ],
    90: [
      function (t, e, i) {
        "use strict";
        var s;
        function n(t) {
          (t = t || {}),
            this._reset(),
            (this._willRun = !1),
            (this._totalSubscribeCount = -1),
            (this._requestAnimationFrame = window.requestAnimationFrame),
            (this._cancelAnimationFrame = window.cancelAnimationFrame),
            (this._boundOnAnimationFrame = this._onAnimationFrame.bind(this)),
            (this._boundOnExternalAnimationFrame =
              this._onExternalAnimationFrame.bind(this));
        }
        t(53),
          ((s = n.prototype).subscribe = function (t, e) {
            return (
              this._totalSubscribeCount++,
              this._nextFrameSubscribers[t.id] ||
                (e
                  ? this._nextFrameSubscribersOrder.unshift(t.id)
                  : this._nextFrameSubscribersOrder.push(t.id),
                (this._nextFrameSubscribers[t.id] = t),
                this._nextFrameSubscriberArrayLength++,
                this._nextFrameSubscriberCount++,
                this._run()),
              this._totalSubscribeCount
            );
          }),
          (s.unsubscribe = function (t) {
            return (
              !!this._nextFrameSubscribers[t.id] &&
              ((this._nextFrameSubscribers[t.id] = null),
              this._nextFrameSubscriberCount--,
              0 === this._nextFrameSubscriberCount && this._cancel(),
              !0)
            );
          }),
          (s.trigger = function (t, e) {
            var i;
            for (i = 0; i < this._subscriberArrayLength; i++)
              null !== this._subscribers[this._subscribersOrder[i]] &&
                !1 ===
                  this._subscribers[this._subscribersOrder[i]]._didDestroy &&
                this._subscribers[this._subscribersOrder[i]].trigger(t, e);
          }),
          (s.destroy = function () {
            var t = this._cancel();
            return (
              (this._subscribers = null),
              (this._subscribersOrder = null),
              (this._nextFrameSubscribers = null),
              (this._nextFrameSubscribersOrder = null),
              (this._rafData = null),
              (this._boundOnAnimationFrame = null),
              (this._onExternalAnimationFrame = null),
              t
            );
          }),
          (s.useExternalAnimationFrame = function (t) {
            if ("boolean" == typeof t) {
              var e = this._isUsingExternalAnimationFrame;
              return (
                t &&
                  this._animationFrame &&
                  (this._cancelAnimationFrame.call(
                    window,
                    this._animationFrame
                  ),
                  (this._animationFrame = null)),
                !this._willRun ||
                  t ||
                  this._animationFrame ||
                  (this._animationFrame = this._requestAnimationFrame.call(
                    window,
                    this._boundOnAnimationFrame
                  )),
                (this._isUsingExternalAnimationFrame = t),
                t ? this._boundOnExternalAnimationFrame : e || !1
              );
            }
          }),
          (s._run = function () {
            if (!this._willRun)
              return (
                (this._willRun = !0),
                0 === this.lastFrameTime &&
                  (this.lastFrameTime = performance.now()),
                (this._animationFrameActive = !0),
                this._isUsingExternalAnimationFrame ||
                  (this._animationFrame = this._requestAnimationFrame.call(
                    window,
                    this._boundOnAnimationFrame
                  )),
                !0
              );
          }),
          (s._cancel = function () {
            var t = !1;
            return (
              this._animationFrameActive &&
                (this._animationFrame &&
                  (this._cancelAnimationFrame.call(
                    window,
                    this._animationFrame
                  ),
                  (this._animationFrame = null)),
                (this._animationFrameActive = !1),
                (this._willRun = !1),
                (t = !0)),
              this._isRunning || this._reset(),
              t
            );
          }),
          (s._onSubscribersAnimationFrameStart = function (t) {
            var e;
            for (e = 0; e < this._subscriberArrayLength; e++)
              null !== this._subscribers[this._subscribersOrder[e]] &&
                !1 ===
                  this._subscribers[this._subscribersOrder[e]]._didDestroy &&
                this._subscribers[
                  this._subscribersOrder[e]
                ]._onAnimationFrameStart(t);
          }),
          (s._onSubscribersAnimationFrameEnd = function (t) {
            var e;
            for (e = 0; e < this._subscriberArrayLength; e++)
              null !== this._subscribers[this._subscribersOrder[e]] &&
                !1 ===
                  this._subscribers[this._subscribersOrder[e]]._didDestroy &&
                this._subscribers[
                  this._subscribersOrder[e]
                ]._onAnimationFrameEnd(t);
          }),
          (s._onAnimationFrame = function (t) {
            (this._subscribers = this._nextFrameSubscribers),
              (this._subscribersOrder = this._nextFrameSubscribersOrder),
              (this._subscriberArrayLength =
                this._nextFrameSubscriberArrayLength),
              (this._subscriberCount = this._nextFrameSubscriberCount),
              (this._nextFrameSubscribers = {}),
              (this._nextFrameSubscribersOrder = []),
              (this._nextFrameSubscriberArrayLength = 0),
              (this._nextFrameSubscriberCount = 0),
              (this._isRunning = !0),
              (this._willRun = !1),
              (this._didRequestNextRAF = !1),
              (this._rafData.delta = t - this.lastFrameTime),
              (this.lastFrameTime = t),
              (this._rafData.fps = 0),
              this._rafData.delta >= 1e3 && (this._rafData.delta = 0),
              0 !== this._rafData.delta &&
                (this._rafData.fps = 1e3 / this._rafData.delta),
              (this._rafData.time = t),
              (this._rafData.naturalFps = this._rafData.fps),
              (this._rafData.timeNow = Date.now()),
              this._onSubscribersAnimationFrameStart(this._rafData),
              this.trigger("update", this._rafData),
              this.trigger("external", this._rafData),
              this.trigger("draw", this._rafData),
              this._onSubscribersAnimationFrameEnd(this._rafData),
              this._willRun || this._reset();
          }),
          (s._onExternalAnimationFrame = function (t) {
            this._isUsingExternalAnimationFrame && this._onAnimationFrame(t);
          }),
          (s._reset = function () {
            (this._rafData = {
              time: 0,
              delta: 0,
              fps: 0,
              naturalFps: 0,
              timeNow: 0,
            }),
              (this._subscribers = {}),
              (this._subscribersOrder = []),
              (this._subscriberArrayLength = 0),
              (this._subscriberCount = 0),
              (this._nextFrameSubscribers = {}),
              (this._nextFrameSubscribersOrder = []),
              (this._nextFrameSubscriberArrayLength = 0),
              (this._nextFrameSubscriberCount = 0),
              (this._didEmitFrameData = !1),
              (this._animationFrame = null),
              (this._animationFrameActive = !1),
              (this._isRunning = !1),
              (this._shouldReset = !1),
              (this.lastFrameTime = 0);
          }),
          (e.exports = n);
      },
      { 53: 53 },
    ],
    91: [
      function (t, e, i) {
        "use strict";
        var s = t(94).SharedInstance,
          n = t(90);
        e.exports = s.share(
          "ac-raf-executor:sharedRAFExecutorInstance",
          "2.0.1",
          n
        );
      },
      { 90: 90, 94: 94 },
    ],
    92: [
      function (t, e, i) {
        "use strict";
        var s = t(180),
          n = t(181),
          r = t(173),
          o = t(123),
          a = t(112);
        function l(t, e) {
          (this.el = t),
            (this._options = e || {}),
            (this._wrapper = this.el.querySelector(
              this._options.itemsSelector
            )),
            (this._items = Array.prototype.slice.call(
              this.el.querySelectorAll(this._options.itemSelector)
            )),
            (this.lastCenteredItem = this._items[0]),
            (this._isRightToLeft =
              "rtl" === window.getComputedStyle(t).direction),
            (this._inlineStart = this._isRightToLeft ? "right" : "left"),
            (this._inlineEnd = this._isRightToLeft ? "left" : "right"),
            (this._scrollType = this._scrollDirection()),
            (this._usePaddles =
              void 0 === this._options.usePaddles || this._options.usePaddles),
            (this.centerItem = this.centerItem.bind(this)),
            this._init();
        }
        var h = l.prototype;
        (h._init = function () {
          this._usePaddles && this._setupPaddles();
        }),
          (h.centerItem = function (t, e) {
            this.lastCenteredItem = t;
            var i = 0.5 * s(this.el).width,
              r = n(t).left + 0.5 * s(t).width,
              o = Math.round(r - i);
            e
              ? (this.el.scrollLeft = this._setNormalizedScroll(o))
              : (this._destroyCurrentClip(),
                this._isRightToLeft && (o *= -1),
                this._smoothScrollTo(o));
          }),
          (h._getPaddles = function () {
            var t = this._isRightToLeft
                ? this._options.rightPaddleSelector
                : this._options.leftPaddleSelector,
              e = this._isRightToLeft
                ? this._options.leftPaddleSelector
                : this._options.rightPaddleSelector;
            return {
              start: this.el.querySelector(t),
              end: this.el.querySelector(e),
            };
          }),
          (h._setupPaddles = function () {
            this.el.classList.add("with-paddles"),
              (this._paddles = this._getPaddles()),
              (this._children = this._wrapper.children),
              (this._childCount = this._wrapper.children.length),
              (this._onScrollClipComplete =
                this._onScrollClipComplete.bind(this)),
              (this._onPaddleStartClick = this._onPaddleStartClick.bind(this)),
              this._paddles.start.addEventListener(
                "click",
                this._onPaddleStartClick
              ),
              (this._onPaddleEndClick = this._onPaddleEndClick.bind(this)),
              this._paddles.end.addEventListener(
                "click",
                this._onPaddleEndClick
              ),
              (this._onScroll = this._onScroll.bind(this)),
              this._wrapper.addEventListener("scroll", this._onScroll),
              (this._updateElementMetrics =
                this._updateElementMetrics.bind(this)),
              window.addEventListener("resize", this._updateElementMetrics),
              window.addEventListener(
                "orientationchange",
                this._updateElementMetrics
              ),
              this._updateElementMetrics();
          }),
          (h._updateElementMetrics = function () {
            (this._wrapperWidth = this._wrapper.offsetWidth),
              (this._contentWidth = this._wrapper.scrollWidth),
              this._contentWidth <= this._wrapperWidth &&
                (this._destroyCurrentClip(),
                0 !== this._wrapper.scrollLeft &&
                  (this._wrapper.scrollLeft = 0)),
              (this._scrollStart = this._wrapper.scrollLeft),
              this._usePaddles &&
                ((this._paddleWidth = this._paddles.start.offsetWidth),
                this._updatePaddleDisplay());
          }),
          (h._onScroll = function () {
            this._lockPaddles ||
              ((this._scrollStart = this._wrapper.scrollLeft),
              this._updatePaddleDisplay());
          }),
          (h._updatePaddleDisplay = function () {
            var t =
              this._getNormalizedScroll(this._scrollStart) + this._wrapperWidth;
            (this._paddles.start.disabled =
              this._getNormalizedScroll(this._scrollStart) <= 1),
              (this._paddles.end.disabled = t >= this._contentWidth - 1);
          }),
          (h._onPaddleStartClick = function (t) {
            this._smoothScrollTo(this._getPaddleStartScrollDestination());
          }),
          (h._getPaddleStartScrollDestination = function () {
            var t,
              e,
              i = this._getNormalizedScroll(this._scrollStart);
            for (e = this._childCount - 1; e > 0; e--)
              if (
                (t = this._normalizePosition(n(this._children[e])))[
                  this._inlineStart
                ] < i
              )
                return t[this._inlineEnd] - this._wrapperWidth;
            return 0;
          }),
          (h._onPaddleEndClick = function (t) {
            this._smoothScrollTo(this._getPaddleEndScrollDestination());
          }),
          (h._getPaddleEndScrollDestination = function () {
            var t,
              e,
              i =
                this._getNormalizedScroll(this._scrollStart) +
                this._wrapperWidth;
            for (e = 0; e < this._childCount; e++)
              if (
                (t = this._normalizePosition(n(this._children[e])))[
                  this._inlineEnd
                ] > i
              )
                return t[this._inlineStart];
            return this._contentWidth;
          }),
          (h._getBoundedScrollX = function (t) {
            var e = this._contentWidth - this._wrapperWidth;
            return Math.max(Math.min(t, e), 0);
          }),
          (h._smoothScrollTo = function (t) {
            if (
              (this._updateElementMetrics(),
              !this._lockPaddles && t !== this._scrollStart)
            ) {
              var e = this._wrapper.scrollLeft,
                i = {
                  ease: o.fromCSSString(a[this._options.scrollEasing]),
                  draw: (i) => {
                    this._wrapper.scrollLeft = ((t, e, i) => t * (i - e) + e)(
                      i,
                      e,
                      this._setNormalizedScroll(t)
                    );
                  },
                };
              this._usePaddles && (this._lockPaddles = !0),
                (this._clip = new r(this._options.scrollDuration, i)),
                this._clip.play().then(() => {
                  this._destroyCurrentClip(),
                    (this._clip = null),
                    this._usePaddles && this._onScrollClipComplete();
                });
            }
          }),
          (h._onScrollClipComplete = function () {
            this._updatePaddleDisplay(),
              (this._lockPaddles = !1),
              this._onScroll();
          }),
          (h._scrollDirection = function () {
            var t = "reverse",
              e = document.createElement("div");
            return (
              (e.style.cssText =
                "width:2px; height:1px; position:absolute; top:-1000px; overflow:scroll; font-size: 14px;"),
              (e.style.direction = "rtl"),
              (e.innerHTML = "test"),
              document.body.appendChild(e),
              e.scrollLeft > 0
                ? (t = "default")
                : ((e.scrollLeft = 1), 0 === e.scrollLeft && (t = "negative")),
              document.body.removeChild(e),
              t
            );
          }),
          (h._getNormalizedScroll = function (t) {
            if (!this._isRightToLeft) return t;
            var e = Math.abs(t);
            return (
              "default" === this._scrollType &&
                (e = this._contentWidth - this._wrapperWidth - e),
              e
            );
          }),
          (h._setNormalizedScroll = function (t) {
            var e = this._getBoundedScrollX(t);
            return this._isRightToLeft && "reverse" !== this._scrollType
              ? "negative" === this._scrollType
                ? -e
                : -(e - this._contentWidth + this._wrapperWidth)
              : e;
          }),
          (h._normalizePosition = function (t) {
            return this._isRightToLeft
              ? {
                  top: t.top,
                  right: this._wrapperWidth - t.right + this._paddleWidth,
                  bottom: t.bottom,
                  left: this._wrapperWidth - t.left + this._paddleWidth,
                }
              : {
                  top: t.top,
                  right: t.right - this._paddleWidth,
                  bottom: t.bottom,
                  left: t.left - this._paddleWidth,
                };
          }),
          (h._destroyCurrentClip = function () {
            this._clip &&
              this._clip._isPlaying &&
              (this._clip.destroy(), (this._lockPaddles = !1));
          }),
          (h._destroyPaddles = function () {
            this._paddles.start.removeEventListener(
              "click",
              this._onPaddleStartClick
            ),
              this._paddles.end.removeEventListener(
                "click",
                this._onPaddleEndClick
              ),
              this._wrapper.removeEventListener("scroll", this._onScroll),
              (this._paddles = null);
          }),
          (h.destroy = function () {
            (this._items = null),
              this._destroyCurrentClip(),
              this._destroyPaddles(),
              window.removeEventListener("resize", this._updateElementMetrics),
              window.removeEventListener(
                "orientationchange",
                this._updateElementMetrics
              );
          }),
          (e.exports = l);
      },
      { 112: 112, 123: 123, 173: 173, 180: 180, 181: 181 },
    ],
    93: [
      function (t, e, i) {
        "use strict";
        var s = t(92);
        e.exports = { ScrollContainer: s };
      },
      { 92: 92 },
    ],
    94: [
      function (t, e, i) {
        "use strict";
        e.exports = { SharedInstance: t(95) };
      },
      { 95: 95 },
    ],
    95: [
      function (t, e, i) {
        "use strict";
        var s,
          n = window,
          r = n.AC,
          o =
            ((s = {}),
            {
              get: function (t, e) {
                var i = null;
                return s[t] && s[t][e] && (i = s[t][e]), i;
              },
              set: function (t, e, i) {
                return (
                  s[t] || (s[t] = {}),
                  (s[t][e] = "function" == typeof i ? new i() : i),
                  s[t][e]
                );
              },
              share: function (t, e, i) {
                var s = this.get(t, e);
                return s || (s = this.set(t, e, i)), s;
              },
              remove: function (t, e) {
                var i = typeof e;
                if ("string" !== i && "number" !== i) s[t] && (s[t] = null);
                else {
                  if (!s[t] || !s[t][e]) return;
                  s[t][e] = null;
                }
              },
            });
        r || (r = n.AC = {}),
          r.SharedInstance || (r.SharedInstance = o),
          (e.exports = r.SharedInstance);
      },
      {},
    ],
    96: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t) {
          var e = (t = (t = t || window.location.search).replace(
              /^[^?]*\?/,
              ""
            ))
              ? t.split("&")
              : [],
            i = {},
            s = new RegExp("=");
          return (
            e.forEach(function (t) {
              var e, n;
              if (s.test(t)) {
                var r = t.split("=", 2);
                (e = r[0]), (n = r[1]);
              } else (e = t), (n = null);
              i[e] = n;
            }),
            i
          );
        };
      },
      {},
    ],
    97: [
      function (t, e, i) {
        "use strict";
        var s = t(96);
        e.exports = function (t) {
          var e,
            i = "",
            n = !1;
          return (
            t
              ? window.URL && "function" == typeof window.URL
                ? (e = new URL(t, window.location))
                : (((e = document.createElement("a")).href = t),
                  (e.href = e.href),
                  (function (t) {
                    var e = t.port,
                      i = new RegExp(":" + e);
                    return e && !i.test(t.href) && i.test(t.host);
                  })(e) &&
                    ((i = e.host.replace(new RegExp(":" + e.port), "")),
                    (n = !0)))
              : (e = window.location),
            {
              hash: e.hash,
              host: i || e.host,
              hostname: e.hostname,
              href: e.href,
              origin: e.origin || e.protocol + "//" + (i || e.host),
              pathname: e.pathname,
              port: n ? "" : e.port,
              protocol: e.protocol,
              search: e.search,
              searchParams: s(e.search),
            }
          );
        };
      },
      { 96: 96 },
    ],
    98: [
      function (t, e, i) {
        "use strict";
        var s = {
          ua: window.navigator.userAgent,
          platform: window.navigator.platform,
          vendor: window.navigator.vendor,
        };
        e.exports = t(101)(s);
      },
      { 101: 101 },
    ],
    99: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          browser: {
            safari: !1,
            chrome: !1,
            firefox: !1,
            ie: !1,
            opera: !1,
            android: !1,
            edge: !1,
            version: {
              name: "",
              major: 0,
              minor: 0,
              patch: 0,
              documentMode: !1,
            },
          },
          os: {
            osx: !1,
            ios: !1,
            android: !1,
            windows: !1,
            linux: !1,
            fireos: !1,
            chromeos: !1,
            version: { name: "", major: 0, minor: 0, patch: 0 },
          },
        };
      },
      {},
    ],
    100: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          browser: [
            {
              name: "edge",
              userAgent: "Edge",
              version: ["rv", "Edge"],
              test: function (t) {
                return (
                  t.ua.indexOf("Edge") > -1 ||
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" === t.ua
                );
              },
            },
            { name: "chrome", userAgent: "Chrome" },
            {
              name: "firefox",
              test: function (t) {
                return (
                  t.ua.indexOf("Firefox") > -1 && -1 === t.ua.indexOf("Opera")
                );
              },
              version: "Firefox",
            },
            { name: "android", userAgent: "Android" },
            {
              name: "safari",
              test: function (t) {
                return (
                  t.ua.indexOf("Safari") > -1 && t.vendor.indexOf("Apple") > -1
                );
              },
              version: "Version",
            },
            {
              name: "ie",
              test: function (t) {
                return t.ua.indexOf("IE") > -1 || t.ua.indexOf("Trident") > -1;
              },
              version: ["MSIE", "rv"],
              parseDocumentMode: function () {
                var t = !1;
                return (
                  document.documentMode &&
                    (t = parseInt(document.documentMode, 10)),
                  t
                );
              },
            },
            {
              name: "opera",
              userAgent: "Opera",
              version: ["Version", "Opera"],
            },
          ],
          os: [
            {
              name: "windows",
              test: function (t) {
                return t.platform.indexOf("Win") > -1;
              },
              version: "Windows NT",
            },
            {
              name: "osx",
              userAgent: "Mac",
              test: function (t) {
                return t.platform.indexOf("Mac") > -1;
              },
            },
            {
              name: "ios",
              test: function (t) {
                return t.ua.indexOf("iPhone") > -1 || t.ua.indexOf("iPad") > -1;
              },
              version: ["iPhone OS", "CPU OS"],
            },
            {
              name: "linux",
              userAgent: "Linux",
              test: function (t) {
                return (
                  t.platform.indexOf("Linux") > -1 &&
                  -1 === t.ua.indexOf("Android")
                );
              },
            },
            {
              name: "fireos",
              test: function (t) {
                return (
                  t.ua.indexOf("Firefox") > -1 && t.ua.indexOf("Mobile") > -1
                );
              },
              version: "rv",
            },
            { name: "android", userAgent: "Android" },
            { name: "chromeos", userAgent: "CrOS" },
          ],
        };
      },
      {},
    ],
    101: [
      function (t, e, i) {
        "use strict";
        var s = t(99),
          n = t(100);
        function r(t, e) {
          if ("function" == typeof t.parseVersion) return t.parseVersion(e);
          var i,
            s = t.version || t.userAgent;
          "string" == typeof s && (s = [s]);
          for (var n, r = s.length, o = 0; o < r; o++)
            if (
              (n = e.match(
                ((i = s[o]), new RegExp(i + "[a-zA-Z\\s/:]+([0-9_.]+)", "i"))
              )) &&
              n.length > 1
            )
              return n[1].replace(/_/g, ".");
        }
        function o(t, e, i) {
          for (var s, n, o = t.length, a = 0; a < o; a++)
            if (
              ("function" == typeof t[a].test
                ? !0 === t[a].test(i) && (s = t[a].name)
                : i.ua.indexOf(t[a].userAgent) > -1 && (s = t[a].name),
              s)
            ) {
              if (((e[s] = !0), "string" == typeof (n = r(t[a], i.ua)))) {
                var l = n.split(".");
                (e.version.name = n),
                  l &&
                    l.length > 0 &&
                    ((e.version.major = parseInt(l[0] || 0)),
                    (e.version.minor = parseInt(l[1] || 0)),
                    (e.version.patch = parseInt(l[2] || 0)));
              } else
                "edge" === s &&
                  ((e.version.name = "12.0.0"),
                  (e.version.major = "12"),
                  (e.version.minor = "0"),
                  (e.version.patch = "0"));
              return (
                "function" == typeof t[a].parseDocumentMode &&
                  (e.version.documentMode = t[a].parseDocumentMode()),
                e
              );
            }
          return e;
        }
        e.exports = function (t) {
          var e = {};
          return (
            (e.browser = o(n.browser, s.browser, t)),
            (e.os = o(n.os, s.os, t)),
            e
          );
        };
      },
      { 100: 100, 99: 99 },
    ],
    102: [
      function (t, e, i) {
        "use strict";
        class s {
          constructor(t = {}) {
            (this.options = t),
              "loading" === document.readyState
                ? document.addEventListener("readystatechange", (t) => {
                    "interactive" === document.readyState && this._init();
                  })
                : this._init();
          }
          _init() {
            if (
              ((this._images = Array.from(
                document.querySelectorAll("*[".concat(s.DATA_ATTRIBUTE, "]"))
              )),
              (this.AnimSystem = this._findAnim()),
              null === this.AnimSystem)
            )
              return null;
            this._addKeyframesToImages();
          }
          _defineKeyframeOptions(t = null) {
            const e = t.getAttribute(s.DATA_DOWNLOAD_AREA_KEYFRAME) || "{}";
            return Object.assign(
              {},
              { start: "t - 200vh", end: "b + 100vh", event: "AnimLazyImage" },
              JSON.parse(e)
            );
          }
          _addKeyframesToImages() {
            (this._scrollGroup = this.AnimSystem.getGroupForTarget(
              document.body
            )),
              this._images.forEach((t) => {
                this.AnimSystem.getGroupForTarget(t) &&
                  (this._scrollGroup = this.AnimSystem.getGroupForTarget(t));
                let e = this._defineKeyframeOptions(t);
                this._scrollGroup
                  .addKeyframe(t, e)
                  .controller.once("AnimLazyImage:enter", () => {
                    this._imageIsInLoadRange(t);
                  });
              });
          }
          _cleanUpImageAttributes(t) {
            let e = !1;
            try {
              e = this._scrollGroup
                .getControllerForTarget(t)
                .getNearestKeyframeForAttribute(
                  "AnimLazyImage"
                ).isCurrentlyInRange;
            } catch (t) {
              e = !1;
            }
            e || t.setAttribute(s.DATA_ATTRIBUTE, "");
          }
          _downloadingImageAttributes(t) {
            t.removeAttribute(s.DATA_ATTRIBUTE);
          }
          _imageIsInLoadRange(t) {
            this._downloadImage(t);
          }
          _downloadImage(t) {
            this._downloadingImageAttributes(t);
          }
          _findAnim() {
            var t = Array.from(
              document.querySelectorAll(
                "[data-anim-group],[data-anim-scroll-group],[data-anim-time-group]"
              )
            );
            return (
              t
                .map((t) => (t._animInfo ? t._animInfo.group : null))
                .filter((t) => null !== t),
              t[0] && t[0]._animInfo
                ? t[0]._animInfo.group.anim
                : (console.error(
                    "AnimLazyImage: AnimSystem not found, please initialize anim before instantiating"
                  ),
                  null)
            );
          }
        }
        (s.DATA_DOWNLOAD_AREA_KEYFRAME = "data-download-area-keyframe"),
          (s.DATA_ATTRIBUTE = "data-anim-lazy-image"),
          (e.exports = s);
      },
      {},
    ],
    103: [
      function (t, e, i) {
        "use strict";
        e.exports = { version: "3.5.0", major: "3.x", majorMinor: "3.5" };
      },
      {},
    ],
    104: [
      function (t, e, i) {
        "use strict";
        const s = t(49).EventEmitterMicro,
          n = t(111),
          r = t(106),
          o = t(107),
          a = t(109),
          l = t(128),
          h = t(129),
          c = t(130),
          u = t(103),
          d = {};
        "undefined" != typeof window &&
          ((d.update = t(89)),
          (d.cancelUpdate = t(84)),
          (d.external = t(86)),
          (d.draw = t(85)));
        let m = null;
        class p extends s {
          constructor() {
            if ((super(), m))
              throw "You cannot create multiple AnimSystems. You probably want to create multiple groups instead. You can have unlimited groups on a page";
            (m = this),
              (this.groups = []),
              (this.scrollSystems = []),
              (this.timeSystems = []),
              (this.tweenGroup = null),
              (this._forceUpdateRAFId = -1),
              (this.initialized = !1),
              (this.model = n),
              (this.plugins = { keyframe: [], parser: [] }),
              (this.version = u.version),
              (this._resolveReady = () => {}),
              (this.ready = new Promise((t) => (this._resolveReady = t))),
              (this.onScroll = this.onScroll.bind(this)),
              (this.onResizedDebounced = this.onResizedDebounced.bind(this)),
              (this.onResizeImmediate = this.onResizeImmediate.bind(this));
          }
          initialize() {
            return (
              this.initialized ||
                "undefined" == typeof window ||
                ((this.initialized = !0),
                (this.timeSystems = []),
                (this.scrollSystems = []),
                (this.groups = []),
                this.setupEvents(),
                this.initializeResizeFilter(),
                this.initializeModel(),
                this.createDOMGroups(),
                this.createDOMKeyframes(),
                (this.tweenGroup = new c(null, this)),
                this.groups.unshift(this.tweenGroup),
                this._resolveReady()),
              this.ready
            );
          }
          use(t, e) {
            t.install(this, e);
          }
          remove() {
            return this.initialized
              ? Promise.all(this.groups.map((t) => t.remove())).then(() => {
                  (this.groups = null),
                    (this.scrollSystems = null),
                    (this.timeSystems = null),
                    window.clearTimeout(n.RESIZE_TIMEOUT),
                    window.removeEventListener("scroll", this.onScroll),
                    window.removeEventListener(
                      "resize",
                      this.onResizeImmediate
                    ),
                    (this._events = {}),
                    (this.initialized = !1),
                    (this.ready = new Promise((t) => (this._resolveReady = t)));
                })
              : ((this.ready = new Promise((t) => (this._resolveReady = t))),
                Promise.resolve());
          }
          destroy() {
            return this.remove();
          }
          createTimeGroup(t, e) {
            t instanceof HTMLElement || (t = (e = t || {}).el);
            let i = new h(t, this);
            return (
              e && e.name && (i.name = e.name),
              this.groups.push(i),
              this.timeSystems.push(i),
              this.trigger(n.EVENTS.ON_GROUP_CREATED, i),
              i
            );
          }
          createScrollGroup(t, e) {
            if (!t)
              throw "AnimSystem scroll based groups must supply an HTMLElement";
            let i = new l(t, this);
            return (
              (e = e || {}).name && (i.name = e.name),
              e.getPosition &&
                e.getMaxPosition &&
                ((i.getPosition = e.getPosition),
                (i.createViewableRange = () => ({
                  a: 0,
                  d: e.getMaxPosition(),
                }))),
              (i.getPosition = e.getPosition || i.getPosition),
              (i.getPosition = e.getPosition || i.getPosition),
              this.groups.push(i),
              this.scrollSystems.push(i),
              this.trigger(n.EVENTS.ON_GROUP_CREATED, i),
              i
            );
          }
          removeGroup(t) {
            return Promise.all(
              t.keyframeControllers.map((e) => t.removeKeyframeController(e))
            ).then(() => {
              let e = this.groups.indexOf(t);
              -1 !== e && this.groups.splice(e, 1),
                (e = this.scrollSystems.indexOf(t)),
                -1 !== e && this.scrollSystems.splice(e, 1),
                (e = this.timeSystems.indexOf(t)),
                -1 !== e && this.timeSystems.splice(e, 1),
                t.destroy();
            });
          }
          createDOMGroups() {
            document.body.setAttribute("data-anim-scroll-group", "body"),
              document
                .querySelectorAll("[data-anim-scroll-group]")
                .forEach((t) => this.createScrollGroup(t)),
              document
                .querySelectorAll("[data-anim-time-group]")
                .forEach((t) => this.createTimeGroup(t)),
              this.trigger(n.EVENTS.ON_DOM_GROUPS_CREATED, this.groups);
          }
          createDOMKeyframes() {
            let t = [];
            [
              "data-anim-keyframe",
              r.DATA_ATTRIBUTE,
              o.DATA_ATTRIBUTE,
              a.DATA_ATTRIBUTE,
            ].forEach(function (e) {
              for (let i = 0; i < 12; i++)
                t.push(e + (0 === i ? "" : "-" + (i - 1)));
            });
            for (let e = 0; e < t.length; e++) {
              let i = t[e],
                s = document.querySelectorAll("[" + i + "]");
              for (let t = 0; t < s.length; t++) {
                const e = s[t],
                  n = JSON.parse(e.getAttribute(i));
                this.addKeyframe(e, n);
              }
            }
            d.update(() => {
              null !== this.groups &&
                (this.groups.forEach((t) => t.onKeyframesDirty({ silent: !0 })),
                this.groups.forEach((t) =>
                  t.trigger(n.EVENTS.ON_DOM_KEYFRAMES_CREATED, t)
                ),
                this.trigger(n.EVENTS.ON_DOM_KEYFRAMES_CREATED, this),
                this.groups.forEach((t) => {
                  t.forceUpdate({ waitForNextUpdate: !1, silent: !0 }),
                    t.reconcile();
                }),
                this.onScroll());
            }, !0);
          }
          initializeResizeFilter() {
            if (n.cssDimensionsTracker) return;
            const t =
              document.querySelector(".cssDimensionsTracker") ||
              document.createElement("div");
            t.setAttribute("cssDimensionsTracker", "true"),
              (t.style.position = "fixed"),
              (t.style.top = "0"),
              (t.style.width = "100%"),
              (t.style.height = "100vh"),
              (t.style.pointerEvents = "none"),
              (t.style.visibility = "hidden"),
              (t.style.zIndex = "-1"),
              document.documentElement.appendChild(t),
              (n.cssDimensionsTracker = t);
          }
          initializeModel() {
            (n.pageMetrics.windowHeight = n.cssDimensionsTracker.clientHeight),
              (n.pageMetrics.windowWidth = n.cssDimensionsTracker.clientWidth),
              (n.pageMetrics.scrollY = window.scrollY || window.pageYOffset),
              (n.pageMetrics.scrollX = window.scrollX || window.pageXOffset),
              (n.pageMetrics.breakpoint = n.getBreakpoint());
            let t = document.documentElement.getBoundingClientRect();
            (n.pageMetrics.documentOffsetX = t.left + n.pageMetrics.scrollX),
              (n.pageMetrics.documentOffsetY = t.top + n.pageMetrics.scrollY);
          }
          setupEvents() {
            window.removeEventListener("scroll", this.onScroll),
              window.addEventListener("scroll", this.onScroll),
              window.removeEventListener("resize", this.onResizeImmediate),
              window.addEventListener("resize", this.onResizeImmediate);
          }
          onScroll() {
            (n.pageMetrics.scrollY = window.scrollY || window.pageYOffset),
              (n.pageMetrics.scrollX = window.scrollX || window.pageXOffset);
            for (let t = 0, e = this.scrollSystems.length; t < e; t++)
              this.scrollSystems[t].updateTimeline();
            this.trigger(n.PageEvents.ON_SCROLL, n.pageMetrics);
          }
          onResizeImmediate() {
            let t = n.cssDimensionsTracker.clientWidth,
              e = n.cssDimensionsTracker.clientHeight;
            if (
              t === n.pageMetrics.windowWidth &&
              e === n.pageMetrics.windowHeight
            )
              return;
            (n.pageMetrics.windowWidth = t),
              (n.pageMetrics.windowHeight = e),
              (n.pageMetrics.scrollY = window.scrollY || window.pageYOffset),
              (n.pageMetrics.scrollX = window.scrollX || window.pageXOffset);
            let i = document.documentElement.getBoundingClientRect();
            (n.pageMetrics.documentOffsetX = i.left + n.pageMetrics.scrollX),
              (n.pageMetrics.documentOffsetY = i.top + n.pageMetrics.scrollY),
              window.clearTimeout(n.RESIZE_TIMEOUT),
              (n.RESIZE_TIMEOUT = window.setTimeout(
                this.onResizedDebounced,
                250
              )),
              this.trigger(n.PageEvents.ON_RESIZE_IMMEDIATE, n.pageMetrics);
          }
          onResizedDebounced() {
            d.update(() => {
              let t = n.pageMetrics.breakpoint,
                e = n.getBreakpoint();
              if (e !== t) {
                (n.pageMetrics.previousBreakpoint = t),
                  (n.pageMetrics.breakpoint = e);
                for (let t = 0, e = this.groups.length; t < e; t++)
                  this.groups[t]._onBreakpointChange();
                this.trigger(n.PageEvents.ON_BREAKPOINT_CHANGE, n.pageMetrics);
              }
              for (let t = 0, e = this.groups.length; t < e; t++)
                this.groups[t].forceUpdate({ waitForNextUpdate: !1 });
              this.trigger(n.PageEvents.ON_RESIZE_DEBOUNCED, n.pageMetrics);
            }, !0);
          }
          forceUpdate({ waitForNextUpdate: t = !0, silent: e = !1 } = {}) {
            -1 !== this._forceUpdateRAFId &&
              d.cancelUpdate(this._forceUpdateRAFId);
            let i = () => {
              for (let t = 0, i = this.groups.length; t < i; t++) {
                this.groups[t].forceUpdate({
                  waitForNextUpdate: !1,
                  silent: e,
                });
              }
              return -1;
            };
            this._forceUpdateRAFId = t ? d.update(i, !0) : i();
          }
          addKeyframe(t, e) {
            let i = this.getGroupForTarget(t);
            return (
              (i = i || this.getGroupForTarget(document.body)),
              i.addKeyframe(t, e)
            );
          }
          addEvent(t, e) {
            let i = this.getGroupForTarget(t);
            return (
              (i = i || this.getGroupForTarget(document.body)), i.addEvent(t, e)
            );
          }
          getTimeGroupForTarget(t) {
            return this._getGroupForTarget(t, (t) => t instanceof h);
          }
          getScrollGroupForTarget(t) {
            return this._getGroupForTarget(t, (t) => !(t instanceof h));
          }
          getGroupForTarget(t) {
            return this._getGroupForTarget(t, () => !0);
          }
          getGroupByName(t) {
            return this.groups.find((e) => e.name === t);
          }
          _getGroupForTarget(t, e) {
            if (t._animInfo && t._animInfo.group && e(t._animInfo.group))
              return t._animInfo.group;
            let i = t;
            for (; i; ) {
              if (i._animInfo && i._animInfo.isGroup && e(i._animInfo.group))
                return i._animInfo.group;
              i = i.parentElement;
            }
          }
          getControllerForTarget(t) {
            return t._animInfo && t._animInfo.controller
              ? t._animInfo.controller
              : null;
          }
          addTween(t, e) {
            return this.tweenGroup.addKeyframe(t, e);
          }
        }
        (e.exports =
          "undefined" == typeof window
            ? new p()
            : window.AC.SharedInstance.share("AnimSystem", u.major, p)),
          (e.exports.default = e.exports);
      },
      {
        103: 103,
        106: 106,
        107: 107,
        109: 109,
        111: 111,
        128: 128,
        129: 129,
        130: 130,
        49: 49,
        84: 84,
        85: 85,
        86: 86,
        89: 89,
      },
    ],
    105: [
      function (t, e, i) {
        "use strict";
        const s = t(111);
        class n {
          constructor(t, e) {
            (this._index = 0), (this.keyframe = t), e && (this.name = e);
          }
          get start() {
            return this.keyframe.jsonProps.start;
          }
          set index(t) {
            this._index = t;
          }
          get index() {
            return this._index;
          }
        }
        e.exports = class {
          constructor(t) {
            (this.timeGroup = t),
              (this.chapters = []),
              (this.chapterNames = {}),
              (this.currentChapter = null),
              (this.tween = null);
          }
          addChapter(t) {
            const { position: e, name: i } = t;
            if (void 0 === e)
              throw ReferenceError(
                "Cannot add chapter without target position."
              );
            t._impIsFirst ||
              0 !== this.chapters.length ||
              this.addChapter({ position: 0, _impIsFirst: !0 });
            let s = this.timeGroup.addKeyframe(this, {
              start: e,
              end: e,
              event: "Chapter",
            });
            this.timeGroup.forceUpdate({ waitForNextFrame: !1, silent: !0 });
            const r = new n(s, i);
            if ((this.chapters.push(r), i)) {
              if (this.chapterNames.hasOwnProperty(i))
                throw ReferenceError(
                  'Duplicate chapter name assigned - "'.concat(
                    i,
                    '" is already in use'
                  )
                );
              this.chapterNames[i] = r;
            }
            return (
              this.chapters
                .sort((t, e) => t.start - e.start)
                .forEach((t, e) => (t.index = e)),
              (this.currentChapter = this.currentChapter || this.chapters[0]),
              r
            );
          }
          playToChapter(t) {
            let e;
            if (t.hasOwnProperty("index")) e = this.chapters[t.index];
            else {
              if (!t.hasOwnProperty("name"))
                throw ReferenceError(
                  "Cannot play to chapter without target index or name"
                );
              e = this.chapterNames[t.name];
            }
            if (!e || (this.currentChapter === e && !0 !== t.force)) return;
            let i = t.ease || "easeInOutCubic";
            this.tween &&
              this.tween.controller &&
              (this.tween.remove(), (i = "easeOutQuint")),
              this.timeGroup.timeScale(t.timeScale || 1);
            const n =
                void 0 !== t.duration
                  ? t.duration
                  : this.getDurationToChapter(e),
              r = this.timeGroup.time(),
              o = e.start;
            let a = !1;
            this.tween = this.timeGroup.anim.addTween(
              { time: r },
              {
                easeFunction: i,
                duration: n,
                time: [r, o],
                onStart: () =>
                  this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_INITIATED, {
                    player: this,
                    next: e,
                  }),
                onDraw: (t) => {
                  let i = t.tweenProps.time.current;
                  this.timeGroup.time(i),
                    t.keyframe.curvedT > 0.5 &&
                      !a &&
                      ((a = !0),
                      (this.currentIndex = e.index),
                      (this.currentChapter = e),
                      this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_OCCURRED, {
                        player: this,
                        current: e,
                      }));
                },
                onComplete: () => {
                  this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_COMPLETED, {
                    player: this,
                    current: e,
                  }),
                    this.timeGroup.paused(!0),
                    (this.tween = null);
                },
              }
            );
          }
          getDurationToChapter(t) {
            const e = this.chapters[t.index - 1] || this.chapters[t.index + 1];
            return Math.abs(e.start - t.start);
          }
        };
      },
      { 111: 111 },
    ],
    106: [
      function (t, e, i) {
        "use strict";
        const s = t(111),
          n = t(120),
          r = t(113),
          o = t(206),
          a = t(114),
          l = t(123),
          h = t(119),
          c = t(131),
          u = t(133),
          d = t(132),
          m = t(122),
          { cssAttributes: p } = t(125);
        class f {
          constructor(t, e) {
            (this.controller = t),
              (this.anchors = []),
              (this.jsonProps = e),
              (this.ease = t.group.defaultEase),
              (this.easeFunction = a.linear),
              (this.start = 0),
              (this.end = 0),
              (this.localT = 0),
              (this.curvedT = 0),
              (this.id = 0),
              (this.event = ""),
              (this.needsEventDispatch = !1),
              (this.snapAtCreation = !1),
              (this.isEnabled = !1),
              (this.animValues = {}),
              (this.breakpointMask = "SMLX"),
              (this.disabledWhen = []),
              (this.keyframeType = s.KeyframeTypes.Interpolation),
              (this.hold = !1),
              (this.preserveState = !1),
              (this.markedForRemoval = !1);
            let i = !1;
            Object.defineProperty(this, "hidden", {
              get: () => i,
              set(e) {
                (i = e), (t.group.keyframesDirty = !0);
              },
            }),
              (this.uuid = m()),
              (this.destroyed = !1);
          }
          destroy() {
            (this.destroyed = !0),
              (this.controller = null),
              (this.disabledWhen = null),
              (this.anchors = null),
              (this.jsonProps = null),
              (this.easeFunction = null),
              (this.animValues = null);
          }
          remove() {
            return this.controller.removeKeyframe(this);
          }
          parseOptions(t) {
            (this.jsonProps = t),
              t.relativeTo &&
                console.error(
                  "KeyframeError: relativeTo has been removed. Use 'anchors' property instead. Found 'relativeTo':\"".concat(
                    t.relativeTo,
                    '"'
                  )
                ),
              void 0 === t.end && void 0 === t.duration && (t.end = t.start),
              "" !== t.anchors && t.anchors
                ? ((this.anchors = []),
                  (t.anchors = Array.isArray(t.anchors)
                    ? t.anchors
                    : [t.anchors]),
                  t.anchors.forEach((e, i) => {
                    let s = u(e, this.controller.group.element);
                    if (!s) {
                      let s = "";
                      return (
                        "string" == typeof e &&
                          (s =
                            " Provided value was a string, so a failed attempt was made to find anchor with the provided querystring in group.element, or in the document."),
                        void console.warn(
                          "Keyframe on",
                          this.controller.element,
                          " failed to find anchor at index ".concat(
                            i,
                            " in array"
                          ),
                          t.anchors,
                          ". Anchors must be JS Object references, Elements references, or valid query selector strings. ".concat(
                            s
                          )
                        )
                      );
                    }
                    this.anchors.push(s), this.controller.group.metrics.add(s);
                  }))
                : ((this.anchors = []), (t.anchors = [])),
              t.ease ? (this.ease = parseFloat(t.ease)) : (t.ease = this.ease),
              t.hasOwnProperty("snapAtCreation")
                ? (this.snapAtCreation = t.snapAtCreation)
                : (t.snapAtCreation = this.snapAtCreation),
              t.easeFunction ||
                (t.easeFunction = s.KeyframeDefaults.easeFunctionString),
              t.breakpointMask
                ? (this.breakpointMask = t.breakpointMask)
                : (t.breakpointMask = this.breakpointMask),
              t.disabledWhen
                ? (this.disabledWhen = Array.isArray(t.disabledWhen)
                    ? t.disabledWhen
                    : [t.disabledWhen])
                : (t.disabledWhen = this.disabledWhen),
              t.hasOwnProperty("hold")
                ? (this.hold = t.hold)
                : (t.hold = this.hold),
              t.hasOwnProperty("preserveState")
                ? (this.preserveState = t.preserveState)
                : (t.preserveState = s.KeyframeDefaults.preserveState),
              (this.easeFunction = a[t.easeFunction]),
              a.hasOwnProperty(t.easeFunction) ||
                (t.easeFunction.includes("bezier")
                  ? (this.easeFunction = l.fromCSSString(t.easeFunction))
                  : t.easeFunction.includes("spring")
                  ? (this.easeFunction = h.fromCSSString(t.easeFunction))
                  : console.error(
                      "Keyframe parseOptions cannot find 'easeFunction' named '" +
                        t.easeFunction +
                        "'"
                    ));
            for (let e in t) {
              if (-1 !== s.KeyframeJSONReservedWords.indexOf(e)) continue;
              let i = t[e];
              if (Array.isArray(i)) {
                if (
                  (1 === i.length && ((i[1] = i[0]), (i[0] = null)),
                  void 0 === this.controller.tweenProps[e] ||
                    !this.controller._ownerIsElement)
                ) {
                  let o = 0;
                  this.controller._ownerIsElement ||
                    (o = this.controller.element[e] || 0);
                  const a = e.startsWith("--");
                  let l =
                      i[2] ||
                      (a ||
                      [
                        "opacity",
                        "z-index",
                        "font-weight",
                        "zIndex",
                        "fontWeight",
                      ].includes(e)
                        ? void 0
                        : "px"),
                    h = this.controller.group.anim.plugins.keyframe.reduce(
                      (i, s) => i || s.parseProp.call(this, t, e),
                      null
                    );
                  if (
                    !h &&
                    this.controller._ownerIsElement &&
                    (a || p.includes(e))
                  ) {
                    let i = d(e),
                      n = t.round || ["zIndex"].includes(i);
                    (o = parseFloat(
                      this.controller
                        .getTargetComputedStyle()
                        .getPropertyValue(i)
                    )),
                      isNaN(o) && (o = 0),
                      (h = new r(
                        o,
                        s.KeyframeDefaults.epsilon,
                        this.snapAtCreation,
                        e,
                        n,
                        l
                      )),
                      this.controller.cssAttributes.push(h);
                  }
                  h ||
                    (h = new n(
                      o,
                      s.KeyframeDefaults.epsilon,
                      this.snapAtCreation,
                      e,
                      t.round,
                      l
                    )),
                    (this.controller.tweenProps[e] = h);
                }
                (this.animValues[e] =
                  this.controller.group.expressionParser.parseArray(this, i)),
                  this.controller.tweenProps[e].calculateEpsilon(
                    t,
                    this.animValues[e]
                  );
              }
            }
            (this.keyframeType = this.hold
              ? s.KeyframeTypes.InterpolationForward
              : s.KeyframeTypes.Interpolation),
              t.event && (this.event = t.event);
          }
          overwriteProps(t) {
            this.animValues = {};
            let e = Object.assign({}, this.jsonProps, t);
            this.controller.updateKeyframe(this, e);
          }
          updateLocalProgress(t) {
            if (this.start === this.end || t < this.start || t > this.end)
              return (
                (this.localT =
                  t < this.start
                    ? this.hold
                      ? this.localT
                      : 0
                    : t > this.end
                    ? 1
                    : 0),
                void (this.curvedT = this.easeFunction(this.localT))
              );
            const e = (t - this.start) / (this.end - this.start),
              i = this.hold ? this.localT : 0;
            (this.localT = o.clamp(e, i, 1)),
              (this.curvedT = this.easeFunction(this.localT));
          }
          reconcile(t) {
            this.controller.tweenProps[t].reconcile(
              this.animValues[t],
              this.curvedT
            ) &&
              (this.needsEventDispatch ||
                ((this.needsEventDispatch = !0),
                this.controller.keyframesRequiringDispatch.push(this)));
          }
          reset(t) {
            this.localT = t || 0;
            let e = this.ease;
            this.ease = 1;
            for (let t in this.animValues) this.reconcile(t);
            this.ease = e;
          }
          onDOMRead(t) {
            let e = this.controller.tweenProps[t].update(
              this.animValues[t],
              this.curvedT,
              this.ease
            );
            return (
              "" === this.event ||
                this.needsEventDispatch ||
                (e &&
                  ((this.needsEventDispatch = !0),
                  this.controller.keyframesRequiringDispatch.push(this))),
              e
            );
          }
          isInRange(t) {
            return t >= this.start && t <= this.end;
          }
          setEnabled(t) {
            t = t || c(Array.from(document.documentElement.classList));
            let e =
                -1 !== this.breakpointMask.indexOf(s.pageMetrics.breakpoint),
              i = !1;
            return (
              this.disabledWhen.length > 0 &&
                (i = this.disabledWhen.some((e) => void 0 !== t[e])),
              (this.isEnabled = e && !i),
              this.isEnabled
            );
          }
          evaluateConstraints() {
            (this.start = this.controller.group.expressionParser.parseTimeValue(
              this,
              this.jsonProps.start
            )),
              (this.end = this.controller.group.expressionParser.parseTimeValue(
                this,
                this.jsonProps.end
              )),
              this.evaluateInterpolationConstraints();
          }
          evaluateInterpolationConstraints() {
            for (let t in this.animValues) {
              let e = this.jsonProps[t];
              this.animValues[t] =
                this.controller.group.expressionParser.parseArray(this, e);
            }
          }
        }
        (f.DATA_ATTRIBUTE = "data-anim-tween"), (e.exports = f);
      },
      {
        111: 111,
        113: 113,
        114: 114,
        119: 119,
        120: 120,
        122: 122,
        123: 123,
        125: 125,
        131: 131,
        132: 132,
        133: 133,
        206: 206,
      },
    ],
    107: [
      function (t, e, i) {
        "use strict";
        const s = t(106),
          n = t(111),
          r = t(120);
        class o extends s {
          constructor(t, e) {
            super(t, e),
              (this.keyframeType = n.KeyframeTypes.CSSClass),
              (this._triggerType = o.TRIGGER_TYPE_CSS_CLASS),
              (this.cssClass = ""),
              (this.friendlyName = ""),
              (this.style = { on: null, off: null }),
              (this.toggle = n.KeyframeDefaults.toggle),
              (this.isApplied = !1);
          }
          parseOptions(t) {
            if (!this.controller._ownerIsElement)
              throw new TypeError(
                "CSS Keyframes cannot be applied to JS Objects"
              );
            if (
              ((t.x = void 0),
              (t.y = void 0),
              (t.z = void 0),
              (t.scale = void 0),
              (t.scaleX = void 0),
              (t.scaleY = void 0),
              (t.rotationX = void 0),
              (t.rotationY = void 0),
              (t.rotationZ = void 0),
              (t.rotation = void 0),
              (t.opacity = void 0),
              (t.hold = void 0),
              void 0 !== t.toggle && (this.toggle = t.toggle),
              void 0 !== t.cssClass)
            )
              (this._triggerType = o.TRIGGER_TYPE_CSS_CLASS),
                (this.cssClass = t.cssClass),
                (this.friendlyName = "." + this.cssClass),
                void 0 === this.controller.tweenProps.targetClasses &&
                  (this.controller.tweenProps.targetClasses = {
                    add: [],
                    remove: [],
                  });
            else {
              if (void 0 === t.style || !this.isValidStyleProperty(t.style))
                throw new TypeError(
                  "KeyframeCSSClass no 'cssClass` property found. If using `style` property its also missing or invalid"
                );
              if (
                ((this._triggerType = o.TRIGGER_TYPE_STYLE_PROPERTY),
                (this.style = t.style),
                (this.friendlyName = "style"),
                (this.toggle = void 0 !== this.style.off || this.toggle),
                this.toggle && void 0 === this.style.off)
              ) {
                this.style.off = {};
                for (let t in this.style.on) this.style.off[t] = "";
              }
              void 0 === this.controller.tweenProps.targetStyles &&
                (this.controller.tweenProps.targetStyles = {});
            }
            if (
              (void 0 === t.end && (t.end = t.start),
              (t.toggle = this.toggle),
              this._triggerType === o.TRIGGER_TYPE_CSS_CLASS)
            )
              this.isApplied = this.controller.element.classList.contains(
                this.cssClass
              );
            else {
              let t = getComputedStyle(this.controller.element);
              this.isApplied = !0;
              for (let e in this.style.on)
                if (t[e] !== this.style.on[e]) {
                  this.isApplied = !1;
                  break;
                }
            }
            s.prototype.parseOptions.call(this, t),
              (this.animValues[this.friendlyName] = [0, 0]),
              void 0 === this.controller.tweenProps[this.friendlyName] &&
                (this.controller.tweenProps[this.friendlyName] = new r(
                  0,
                  1,
                  !1,
                  this.friendlyName
                )),
              (this.keyframeType = n.KeyframeTypes.CSSClass);
          }
          updateLocalProgress(t) {
            (this.isApplied && !this.toggle) ||
              (this.start !== this.end
                ? !this.isApplied && t >= this.start && t <= this.end
                  ? this._apply()
                  : this.isApplied &&
                    this.toggle &&
                    (t < this.start || t > this.end) &&
                    this._unapply()
                : !this.isApplied && t >= this.start
                ? this._apply()
                : this.isApplied &&
                  this.toggle &&
                  t < this.start &&
                  this._unapply());
          }
          _apply() {
            if (this._triggerType === o.TRIGGER_TYPE_CSS_CLASS)
              this.controller.tweenProps.targetClasses.add.push(this.cssClass),
                (this.controller.needsClassUpdate = !0);
            else {
              for (let t in this.style.on)
                this.controller.tweenProps.targetStyles[t] = this.style.on[t];
              this.controller.needsStyleUpdate = !0;
            }
            this.isApplied = !0;
          }
          _unapply() {
            if (this._triggerType === o.TRIGGER_TYPE_CSS_CLASS)
              this.controller.tweenProps.targetClasses.remove.push(
                this.cssClass
              ),
                (this.controller.needsClassUpdate = !0);
            else {
              for (let t in this.style.off)
                this.controller.tweenProps.targetStyles[t] = this.style.off[t];
              this.controller.needsStyleUpdate = !0;
            }
            this.isApplied = !1;
          }
          isValidStyleProperty(t) {
            if (!t.hasOwnProperty("on")) return !1;
            if ("object" != typeof t.on)
              throw new TypeError(
                "KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}"
              );
            if (
              this.toggle &&
              t.hasOwnProperty("off") &&
              "object" != typeof t.off
            )
              throw new TypeError(
                "KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}"
              );
            return !0;
          }
          reconcile(t) {}
          onDOMRead(t) {}
          evaluateInterpolationConstraints() {}
        }
        (o.TRIGGER_TYPE_CSS_CLASS = 0),
          (o.TRIGGER_TYPE_STYLE_PROPERTY = 1),
          (o.DATA_ATTRIBUTE = "data-anim-classname"),
          (e.exports = o);
      },
      { 106: 106, 111: 111, 120: 120 },
    ],
    108: [
      function (t, e, i) {
        "use strict";
        const s = t(111),
          n = t(120),
          r = (t(113), t(116)),
          o = t(110),
          a = (t(106), t(107)),
          l = t(117),
          h = t(131),
          c = t(122),
          u = t(49).EventEmitterMicro,
          d = t(178),
          m = {};
        "undefined" != typeof window &&
          ((m.update = t(89)), (m.external = t(86)), (m.draw = t(85)));
        const {
            transformAttributes: p,
            cssAttributes: f,
            domAttributes: _,
          } = t(125),
          g = Math.PI / 180,
          b = {
            create: t(210),
            rotateX: t(211),
            rotateY: t(212),
            rotateZ: t(213),
            scale: t(214),
          };
        e.exports = class extends u {
          constructor(t, e) {
            super(),
              (this._events.draw = []),
              (this.uuid = c()),
              (this.group = t),
              (this.element = e),
              (this._ownerIsElement = this.element instanceof Element),
              this._ownerIsElement
                ? (this.friendlyName =
                    this.element.tagName +
                    "." +
                    Array.from(this.element.classList).join("."))
                : (this.friendlyName = this.element.friendlyName || this.uuid),
              (this.element._animInfo =
                this.element._animInfo || new o(t, this)),
              (this.element._animInfo.controller = this),
              (this.element._animInfo.group = this.group),
              this.element._animInfo.controllers.push(this),
              (this.tweenProps = this.element._animInfo.tweenProps),
              (this.eventObject = new r(this)),
              (this.needsStyleUpdate = !1),
              (this.needsClassUpdate = !1),
              (this.elementMetrics = this.group.metrics.add(this.element)),
              (this.attributes = []),
              (this.cssAttributes = []),
              (this.domAttributes = []),
              (this.keyframes = {}),
              (this._allKeyframes = []),
              (this._activeKeyframes = []),
              (this.keyframesRequiringDispatch = []),
              this.updateCachedValuesFromElement(),
              (this.boundsMin = 0),
              (this.boundsMax = 0),
              (this.mat2d = new Float32Array(6)),
              (this.mat4 = b.create()),
              (this.needsWrite = !0),
              (this.onDOMWriteImp = this._ownerIsElement
                ? this.onDOMWriteForElement
                : this.onDOMWriteForObject);
          }
          destroy() {
            if (this.element._animInfo) {
              this.element._animInfo.controller === this &&
                (this.element._animInfo.controller = null);
              let t = this.element._animInfo.controllers.indexOf(this);
              if (
                (-1 !== t && this.element._animInfo.controllers.splice(t, 1),
                0 === this.element._animInfo.controllers.length)
              )
                this.element._animInfo = null;
              else {
                let t = this.element._animInfo.controllers.find(
                  (t) => t.group !== t.group.anim.tweenGroup
                );
                t &&
                  ((this.element._animInfo.controller = t),
                  (this.element._animInfo.group = t.group));
              }
            }
            (this.eventObject.controller = null),
              (this.eventObject.element = null),
              (this.eventObject.keyframe = null),
              (this.eventObject.tweenProps = null),
              (this.eventObject = null),
              (this.elementMetrics = null),
              (this.group = null),
              (this.keyframesRequiringDispatch = null);
            for (let t = 0; t < this._allKeyframes.length; t++)
              this._allKeyframes[t].destroy();
            (this._allKeyframes = null),
              (this._activeKeyframes = null),
              (this.attributes = null),
              (this.keyframes = null),
              (this.element = null),
              (this.tweenProps = null),
              (this.destroyed = !0),
              super.destroy();
          }
          remove() {
            return this.group.removeKeyframeController(this);
          }
          updateCachedValuesFromElement() {
            if (!this._ownerIsElement) return;
            const t = this.getTargetComputedStyle(!0);
            let e = new DOMMatrix(t.getPropertyValue("transform")),
              i = d(e),
              r = s.KeyframeDefaults.epsilon;
            ["x", "y", "z"].forEach((t, e) => {
              this.tweenProps[t] = new n(i.translation[e], r, !1, t);
            }),
              (this.tweenProps.rotation = new n(
                i.rotation[2],
                r,
                !1,
                "rotation"
              )),
              ["rotationX", "rotationY", "rotationZ"].forEach((t, e) => {
                this.tweenProps[t] = new n(i.rotation[e], r, !1, t);
              }),
              (this.tweenProps.scale = new n(i.scale[0], r, !1, "scale")),
              ["scaleX", "scaleY", "scaleZ"].forEach((t, e) => {
                this.tweenProps[t] = new n(i.scale[e], r, !1, t);
              }),
              _.forEach((t) => {
                let e = isNaN(this.element[t]) ? 0 : this.element[t];
                this.tweenProps[t] = new n(e, r, !1, t, !1);
              });
          }
          addKeyframe(t) {
            let e = l(t);
            if (!e)
              throw new Error(
                "AnimSystem Cannot create keyframe for from options `" + t + "`"
              );
            let i = new e(this, t);
            return (
              i.parseOptions(t),
              (i.id = this._allKeyframes.length),
              this._allKeyframes.push(i),
              i
            );
          }
          needsUpdate() {
            for (let t = 0, e = this.attributes.length; t < e; t++) {
              let e = this.attributes[t];
              if (this.tweenProps[e].needsUpdate()) return !0;
            }
            return !1;
          }
          updateLocalProgress(t) {
            for (let e = 0, i = this.attributes.length; e < i; e++) {
              let i = this.attributes[e],
                s = this.keyframes[this.attributes[e]];
              if (1 === s.length) {
                s[0].updateLocalProgress(t);
                continue;
              }
              let n = this.getNearestKeyframeForAttribute(i, t);
              n && n.updateLocalProgress(t);
            }
          }
          reconcile() {
            for (let t = 0, e = this.attributes.length; t < e; t++) {
              let e = this.attributes[t],
                i = this.getNearestKeyframeForAttribute(
                  e,
                  this.group.position.local
                );
              i.updateLocalProgress(this.group.position.local),
                i.snapAtCreation && i.reconcile(e);
            }
          }
          determineActiveKeyframes(t) {
            t = t || h(Array.from(document.documentElement.classList));
            let e = this._activeKeyframes,
              i = this.attributes,
              s = {};
            (this._activeKeyframes = []),
              (this.attributes = []),
              (this.keyframes = {});
            for (let e = 0; e < this._allKeyframes.length; e++) {
              let i = this._allKeyframes[e];
              if (i.markedForRemoval || i.hidden || !i.setEnabled(t))
                for (let t in i.animValues)
                  (this.tweenProps[t].isActive = i.preserveState),
                    i.preserveState && (s[t] = !0);
              else {
                this._activeKeyframes.push(i);
                for (let t in i.animValues)
                  (this.keyframes[t] = this.keyframes[t] || []),
                    this.keyframes[t].push(i),
                    -1 === this.attributes.indexOf(t) &&
                      ((s[t] = !0),
                      this.attributes.push(t),
                      (this.tweenProps[t].isActive = !0));
              }
            }
            this.attributes.forEach((t) => (this.tweenProps[t].isActive = !0)),
              (this.cssAttributes = this.attributes
                .filter((t) => f.includes(t) || t.startsWith("--"))
                .map((t) => this.tweenProps[t])),
              (this.domAttributes = this.attributes
                .filter((t) => _.includes(t))
                .map((t) => this.tweenProps[t]));
            let n = e.filter((t) => -1 === this._activeKeyframes.indexOf(t));
            if (0 === n.length) return;
            let r = i.filter(
              (t) => -1 === this.attributes.indexOf(t) && !s.hasOwnProperty(t)
            );
            if (0 !== r.length)
              if (((this.needsWrite = !0), this._ownerIsElement))
                m.external(() => {
                  let t = r.some((t) => p.includes(t)),
                    e = t && Object.keys(s).some((t) => p.includes(t));
                  t && !e && this.element.style.removeProperty("transform");
                  for (let t = 0, e = r.length; t < e; ++t) {
                    let e = r[t],
                      i = this.tweenProps[e],
                      s = i.isActive ? i.target : i.initialValue;
                    (i.current = i.target = s),
                      !i.isActive &&
                        f.includes(e) &&
                        (this.element.style[e] = null);
                  }
                  for (let t = 0, e = n.length; t < e; ++t) {
                    let e = n[t];
                    e instanceof a && !e.preserveState && e._unapply();
                  }
                }, !0);
              else
                for (let t = 0, e = r.length; t < e; ++t) {
                  let e = this.tweenProps[r[t]];
                  (e.current = e.target), (e.isActive = !1);
                }
          }
          onDOMRead(t) {
            for (let e = 0, i = this.attributes.length; e < i; e++) {
              let i = this.attributes[e],
                s = this.getNearestKeyframeForAttribute(i, t);
              s && s.onDOMRead(i) && (this.needsWrite = !0);
            }
          }
          onDOMWrite() {
            (this.needsWrite ||
              this.needsClassUpdate ||
              this.needsStyleUpdate) &&
              ((this.needsWrite = !1),
              this.onDOMWriteImp(),
              this.handleEventDispatch());
          }
          onDOMWriteForObject() {
            for (let t = 0, e = this.attributes.length; t < e; t++) {
              let e = this.attributes[t];
              this.element[e] = this.tweenProps[e].current;
            }
          }
          onDOMWriteForElement(t = this.element.style) {
            this.handleStyleTransform(t);
            for (let e = 0, i = this.cssAttributes.length; e < i; e++)
              this.cssAttributes[e].set(t);
            for (let t = 0, e = this.domAttributes.length; t < e; t++)
              this.domAttributes[t].set(this.element);
            if (this.needsStyleUpdate) {
              for (let t in this.tweenProps.targetStyles)
                null !== this.tweenProps.targetStyles[t] &&
                  (this.element.style[t] = this.tweenProps.targetStyles[t]),
                  (this.tweenProps.targetStyles[t] = null);
              this.needsStyleUpdate = !1;
            }
            this.needsClassUpdate &&
              (this.tweenProps.targetClasses.add.length > 0 &&
                this.element.classList.add.apply(
                  this.element.classList,
                  this.tweenProps.targetClasses.add
                ),
              this.tweenProps.targetClasses.remove.length > 0 &&
                this.element.classList.remove.apply(
                  this.element.classList,
                  this.tweenProps.targetClasses.remove
                ),
              (this.tweenProps.targetClasses.add.length = 0),
              (this.tweenProps.targetClasses.remove.length = 0),
              (this.needsClassUpdate = !1));
          }
          handleStyleTransform(t = this.element.style) {
            let e = this.tweenProps;
            if (e.z.isActive || e.rotationX.isActive || e.rotationY.isActive) {
              const i = this.mat4;
              (i[0] = 1),
                (i[1] = 0),
                (i[2] = 0),
                (i[3] = 0),
                (i[4] = 0),
                (i[5] = 1),
                (i[6] = 0),
                (i[7] = 0),
                (i[8] = 0),
                (i[9] = 0),
                (i[10] = 1),
                (i[11] = 0),
                (i[12] = 0),
                (i[13] = 0),
                (i[14] = 0),
                (i[15] = 1);
              const s = e.x.current,
                n = e.y.current,
                r = e.z.current;
              if (
                ((i[12] = i[0] * s + i[4] * n + i[8] * r + i[12]),
                (i[13] = i[1] * s + i[5] * n + i[9] * r + i[13]),
                (i[14] = i[2] * s + i[6] * n + i[10] * r + i[14]),
                (i[15] = i[3] * s + i[7] * n + i[11] * r + i[15]),
                0 !== e.rotation.current || 0 !== e.rotationZ.current)
              ) {
                const t = (e.rotation.current || e.rotationZ.current) * g;
                b.rotateZ(i, i, t);
              }
              if (0 !== e.rotationX.current) {
                const t = e.rotationX.current * g;
                b.rotateX(i, i, t);
              }
              if (0 !== e.rotationY.current) {
                const t = e.rotationY.current * g;
                b.rotateY(i, i, t);
              }
              (1 === e.scale.current &&
                1 === e.scaleX.current &&
                1 === e.scaleY.current) ||
                b.scale(i, i, [e.scale.current, e.scale.current, 1]),
                (t.transform =
                  "matrix3d(" +
                  i[0] +
                  "," +
                  i[1] +
                  "," +
                  i[2] +
                  "," +
                  i[3] +
                  "," +
                  i[4] +
                  "," +
                  i[5] +
                  "," +
                  i[6] +
                  "," +
                  i[7] +
                  "," +
                  i[8] +
                  "," +
                  i[9] +
                  "," +
                  i[10] +
                  "," +
                  i[11] +
                  "," +
                  i[12] +
                  "," +
                  i[13] +
                  "," +
                  i[14] +
                  "," +
                  i[15] +
                  ")");
            } else if (
              e.x.isActive ||
              e.y.isActive ||
              e.rotation.isActive ||
              e.rotationZ.isActive ||
              e.scale.isActive ||
              e.scaleX.isActive ||
              e.scaleY.isActive
            ) {
              const i = this.mat2d;
              (i[0] = 1),
                (i[1] = 0),
                (i[2] = 0),
                (i[3] = 1),
                (i[4] = 0),
                (i[5] = 0);
              const s = e.x.current,
                n = e.y.current,
                r = i[0],
                o = i[1],
                a = i[2],
                l = i[3],
                h = i[4],
                c = i[5];
              if (
                ((i[0] = r),
                (i[1] = o),
                (i[2] = a),
                (i[3] = l),
                (i[4] = r * s + a * n + h),
                (i[5] = o * s + l * n + c),
                0 !== e.rotation.current || 0 !== e.rotationZ.current)
              ) {
                const t = (e.rotation.current || e.rotationZ.current) * g,
                  s = i[0],
                  n = i[1],
                  r = i[2],
                  o = i[3],
                  a = i[4],
                  l = i[5],
                  h = Math.sin(t),
                  c = Math.cos(t);
                (i[0] = s * c + r * h),
                  (i[1] = n * c + o * h),
                  (i[2] = s * -h + r * c),
                  (i[3] = n * -h + o * c),
                  (i[4] = a),
                  (i[5] = l);
              }
              e.scaleX.isActive || e.scaleY.isActive
                ? ((i[0] = i[0] * e.scaleX.current),
                  (i[1] = i[1] * e.scaleX.current),
                  (i[2] = i[2] * e.scaleY.current),
                  (i[3] = i[3] * e.scaleY.current))
                : ((i[0] = i[0] * e.scale.current),
                  (i[1] = i[1] * e.scale.current),
                  (i[2] = i[2] * e.scale.current),
                  (i[3] = i[3] * e.scale.current)),
                (t.transform =
                  "matrix(" +
                  i[0] +
                  ", " +
                  i[1] +
                  ", " +
                  i[2] +
                  ", " +
                  i[3] +
                  ", " +
                  i[4] +
                  ", " +
                  i[5] +
                  ")");
            }
          }
          handleEventDispatch() {
            if (0 !== this.keyframesRequiringDispatch.length) {
              for (
                let t = 0, e = this.keyframesRequiringDispatch.length;
                t < e;
                t++
              ) {
                let e = this.keyframesRequiringDispatch[t];
                (e.needsEventDispatch = !1),
                  (this.eventObject.keyframe = e),
                  (this.eventObject.pageMetrics = s.pageMetrics),
                  (this.eventObject.event = e.event),
                  this.trigger(e.event, this.eventObject);
              }
              this.keyframesRequiringDispatch.length = 0;
            }
            if (0 !== this._events.draw.length) {
              (this.eventObject.keyframe = null),
                (this.eventObject.event = "draw");
              for (let t = this._events.draw.length - 1; t >= 0; t--)
                this._events.draw[t](this.eventObject);
            }
          }
          updateAnimationConstraints() {
            for (let t = 0, e = this._activeKeyframes.length; t < e; t++)
              this._activeKeyframes[t].evaluateConstraints();
            this.attributes.forEach((t) => {
              1 !== this.keyframes[t].length &&
                this.keyframes[t].sort(s.KeyframeComparison);
            }),
              this.updateDeferredPropertyValues();
          }
          refreshMetrics() {
            let t = new Set([this.element]);
            this._allKeyframes.forEach((e) =>
              e.anchors.forEach((e) => t.add(e))
            ),
              this.group.metrics.refreshCollection(t),
              (this.group.keyframesDirty = !0);
          }
          getTargetComputedStyle(t = !1) {
            return this._ownerIsElement
              ? ((t || void 0 === this.group.computedStyleCache[this.uuid]) &&
                  (this.group.computedStyleCache[this.uuid] = getComputedStyle(
                    this.element
                  )),
                this.group.computedStyleCache[this.uuid])
              : null;
          }
          updateDeferredPropertyValues() {
            for (let t = 0, e = this.attributes.length; t < e; t++) {
              let e = this.attributes[t],
                i = this.keyframes[e];
              if (!(i[0].keyframeType > s.KeyframeTypes.InterpolationForward))
                for (let t = 0, s = i.length; t < s; t++) {
                  let n = i[t];
                  null === n.jsonProps[e][0] &&
                    (0 === t
                      ? (n.jsonProps[e][0] = n.animValues[e][0] =
                          this.tweenProps[e].current)
                      : (n.animValues[e][0] = i[t - 1].animValues[e][1])),
                    null === n.jsonProps[e][1] &&
                      (n.animValues[e][1] =
                        t === s - 1
                          ? this.tweenProps[e].current
                          : i[t + 1].animValues[e][0]),
                    n.snapAtCreation &&
                      ((n.jsonProps[e][0] = n.animValues[e][0]),
                      (n.jsonProps[e][1] = n.animValues[e][1]));
                }
            }
          }
          getBounds(t) {
            (this.boundsMin = Number.MAX_VALUE),
              (this.boundsMax = -Number.MAX_VALUE);
            for (let e = 0, i = this.attributes.length; e < i; e++) {
              let i = this.keyframes[this.attributes[e]];
              for (let e = 0; e < i.length; e++) {
                let s = i[e];
                (this.boundsMin = Math.min(s.start, this.boundsMin)),
                  (this.boundsMax = Math.max(s.end, this.boundsMax)),
                  (t.min = Math.min(s.start, t.min)),
                  (t.max = Math.max(s.end, t.max));
              }
            }
          }
          getNearestKeyframeForAttribute(t, e) {
            e = void 0 !== e ? e : this.group.position.local;
            let i = null,
              s = Number.POSITIVE_INFINITY,
              n = this.keyframes[t];
            if (void 0 === n) return null;
            let r = n.length;
            if (0 === r) return null;
            if (1 === r) return n[0];
            for (let t = 0; t < r; t++) {
              let r = n[t];
              if (r.isInRange(e)) {
                i = r;
                break;
              }
              let o = Math.min(Math.abs(e - r.start), Math.abs(e - r.end));
              o < s && ((s = o), (i = r));
            }
            return i;
          }
          getAllKeyframesForAttribute(t) {
            return this.keyframes[t];
          }
          updateKeyframe(t, e) {
            t.parseOptions(e),
              t.evaluateConstraints(),
              (this.group.keyframesDirty = !0),
              m.update(() => {
                this.trigger(s.EVENTS.ON_KEYFRAME_UPDATED, t),
                  this.group.trigger(s.EVENTS.ON_KEYFRAME_UPDATED, t);
              }, !0);
          }
          removeKeyframe(t) {
            return t.controller !== this
              ? Promise.resolve(null)
              : ((t.markedForRemoval = !0),
                (this.group.keyframesDirty = !0),
                new Promise((e) => {
                  this.group.rafEmitter.executor.eventEmitter.once(
                    "before:draw",
                    () => {
                      e(t), t.destroy();
                      let i = this._allKeyframes.indexOf(t);
                      -1 !== i && this._allKeyframes.splice(i, 1);
                    }
                  );
                }));
          }
          updateAnimation(t, e) {
            return (
              this.group.gui &&
                console.warn(
                  "KeyframeController.updateAnimation(keyframe,props) has been deprecated. Please use updateKeyframe(keyframe,props)"
                ),
              this.updateKeyframe(t, e)
            );
          }
        };
      },
      {
        106: 106,
        107: 107,
        110: 110,
        111: 111,
        113: 113,
        116: 116,
        117: 117,
        120: 120,
        122: 122,
        125: 125,
        131: 131,
        178: 178,
        210: 210,
        211: 211,
        212: 212,
        213: 213,
        214: 214,
        49: 49,
        85: 85,
        86: 86,
        89: 89,
      },
    ],
    109: [
      function (t, e, i) {
        "use strict";
        const s = t(106),
          n = t(111),
          r = t(120);
        class o extends s {
          constructor(t, e) {
            super(t, e),
              (this.keyframeType = n.KeyframeTypes.Event),
              (this.isApplied = !1),
              (this.hasDuration = !1),
              (this.isCurrentlyInRange = !1);
          }
          parseOptions(t) {
            (t.x = void 0),
              (t.y = void 0),
              (t.scale = void 0),
              (t.scaleX = void 0),
              (t.scaleY = void 0),
              (t.rotation = void 0),
              (t.style = void 0),
              (t.cssClass = void 0),
              (t.rotation = void 0),
              (t.opacity = void 0),
              (t.hold = void 0),
              (this.event = t.event),
              (this.animValues[this.event] = [0, 0]),
              void 0 === this.controller.tweenProps[this.event] &&
                (this.controller.tweenProps[this.event] = new r(
                  0,
                  1,
                  !1,
                  this.event
                )),
              super.parseOptions(t),
              (this.keyframeType = n.KeyframeTypes.Event);
          }
          updateLocalProgress(t) {
            if (this.hasDuration) {
              let e = this.isCurrentlyInRange,
                i = t >= this.start && t <= this.end;
              if (e === i) return;
              return (
                (this.isCurrentlyInRange = i),
                void (i && !e
                  ? this._trigger(this.event + ":enter")
                  : e && !i && this._trigger(this.event + ":exit"))
              );
            }
            !this.isApplied && t >= this.start
              ? ((this.isApplied = !0), this._trigger(this.event))
              : this.isApplied &&
                t < this.start &&
                ((this.isApplied = !1), this._trigger(this.event + ":reverse"));
          }
          _trigger(t) {
            (this.controller.eventObject.event = t),
              (this.controller.eventObject.keyframe = this),
              this.controller.trigger(t, this.controller.eventObject);
          }
          evaluateConstraints() {
            super.evaluateConstraints(),
              (this.hasDuration = this.start !== this.end);
          }
          reset(t) {
            (this.isApplied = !1),
              (this.isCurrentlyInRange = !1),
              super.reset(t);
          }
          onDOMRead(t) {}
          reconcile(t) {}
          evaluateInterpolationConstraints() {}
        }
        (o.DATA_ATTRIBUTE = "data-anim-event"), (e.exports = o);
      },
      { 106: 106, 111: 111, 120: 120 },
    ],
    110: [
      function (t, e, i) {
        "use strict";
        const s = t(121);
        e.exports = class {
          constructor(t, e, i = !1) {
            (this.isGroup = i),
              (this.group = t),
              (this.controller = e),
              (this.controllers = []),
              (this.tweenProps = new s());
          }
        };
      },
      { 121: 121 },
    ],
    111: [
      function (t, e, i) {
        "use strict";
        const s = {
          GUI_INSTANCE: null,
          ANIM_INSTANCE: null,
          VIEWPORT_EMITTER_ELEMENT: void 0,
          LOCAL_STORAGE_KEYS: {
            GuiPosition: "anim-ui.position",
            GroupCollapsedStates: "anim-ui.group-collapsed-states",
            scrollY: "anim-ui.scrollY-position",
            path: "anim-ui.path",
          },
          RESIZE_TIMEOUT: -1,
          BREAKPOINTS: [
            { name: "S", mediaQuery: "only screen and (max-width: 734px)" },
            { name: "M", mediaQuery: "only screen and (max-width: 1068px)" },
            { name: "L", mediaQuery: "only screen and (min-width: 1069px)" },
          ],
          getBreakpoint: function () {
            for (let t = 0; t < s.BREAKPOINTS.length; t++) {
              let e = s.BREAKPOINTS[t];
              if (window.matchMedia(e.mediaQuery).matches) return e.name;
            }
          },
          KeyframeDefaults: {
            ease: 1,
            epsilon: 0.05,
            preserveState: !1,
            easeFunctionString: "linear",
            easeFunction: "linear",
            hold: !1,
            snapAtCreation: !1,
            toggle: !1,
            breakpointMask: "SMLX",
            event: "",
            disabledWhen: [],
            cssClass: "",
          },
          KeyframeTypes: {
            Interpolation: 0,
            InterpolationForward: 1,
            CSSClass: 2,
            Event: 3,
          },
          EVENTS: {
            ON_DOM_KEYFRAMES_CREATED: "ON_DOM_KEYFRAMES_CREATED",
            ON_DOM_GROUPS_CREATED: "ON_DOM_GROUPS_CREATED",
            ON_GROUP_CREATED: "ON_GROUP_CREATED",
            ON_KEYFRAME_UPDATED: "ON_KEYFRAME_UPDATED",
            ON_TIMELINE_START: "ON_TIMELINE_START",
            ON_TIMELINE_UPDATE: "ON_TIMELINE_UPDATE",
            ON_TIMELINE_COMPLETE: "ON_TIMELINE_COMPLETE",
            ON_CHAPTER_INITIATED: "ON_CHAPTER_INITIATED",
            ON_CHAPTER_OCCURRED: "ON_CHAPTER_OCCURRED",
            ON_CHAPTER_COMPLETED: "ON_CHAPTER_COMPLETED",
          },
          PageEvents: {
            ON_SCROLL: "ON_SCROLL",
            ON_RESIZE_IMMEDIATE: "ON_RESIZE_IMMEDIATE",
            ON_RESIZE_DEBOUNCED: "ON_RESIZE_DEBOUNCED",
            ON_BREAKPOINT_CHANGE: "ON_BREAKPOINT_CHANGE",
          },
          KeyframeJSONReservedWords: [
            "event",
            "cssClass",
            "style",
            "anchors",
            "start",
            "end",
            "epsilon",
            "easeFunction",
            "ease",
            "breakpointMask",
            "disabledWhen",
          ],
          TweenProps: t(121),
          TargetValue: t(120),
          CSSTargetValue: t(113),
          pageMetrics: new (function () {
            (this.scrollX = 0),
              (this.scrollY = 0),
              (this.windowWidth = 0),
              (this.windowHeight = 0),
              (this.documentOffsetX = 0),
              (this.documentOffsetY = 0),
              (this.previousBreakpoint = ""),
              (this.breakpoint = "");
          })(),
          KeyframeComparison: function (t, e) {
            return t.start < e.start ? -1 : t.start > e.start ? 1 : 0;
          },
        };
        e.exports = s;
      },
      { 113: 113, 120: 120, 121: 121 },
    ],
    112: [
      function (t, e, i) {
        "use strict";
        const s = {
          easeInCubic: "cubic-bezier(0.42, 0.0, 1.0, 1.0)",
          easeOutCubic: "cubic-bezier(0.0, 0.0, 0.58, 1.0)",
          easeInOutCubic: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
          easeInCirc: "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
          easeOutCirc: "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
          easeInOutCirc: "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
          easeInExpo: "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
          easeOutExpo: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
          easeInOutExpo: "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
          easeInQuad: "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
          easeOutQuad: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
          easeInOutQuad: "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
          easeInQuart: "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
          easeOutQuart: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
          easeInOutQuart: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
          easeInQuint: "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
          easeOutQuint: "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
          easeInOutQuint: "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
          easeInSine: "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
          easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
          easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
          easeInBack: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
          easeOutBack: "cubic-bezier(0.175,  0.885, 0.320, 1.275)",
          easeInOutBack: "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
          linear: "cubic-bezier(0.0, 0.0, 1.0, 1.0)",
          ease: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
          "ease-in": "cubic-bezier(0.42, 0.0, 1.0, 1.0)",
          "ease-out": "cubic-bezier(0.0, 0.0, 0.58, 1.0)",
          "ease-in-out": "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
        };
        e.exports = s;
      },
      {},
    ],
    113: [
      function (t, e, i) {
        "use strict";
        const s = t(120),
          n = t(132);
        e.exports = class extends s {
          constructor(t, e, i, s, r = !1, o) {
            super(t, e, i, (s = n(s)), r, o);
          }
          set(t) {
            let e = this.current;
            this.round && (e = Math.round(e)),
              this.suffix && (e += this.suffix),
              t.setProperty(this.key, e);
          }
        };
      },
      { 120: 120, 132: 132 },
    ],
    114: [
      function (t, e, i) {
        "use strict";
        e.exports = new (class {
          constructor() {
            (this.linear = function (t) {
              return t;
            }),
              (this.easeInQuad = function (t) {
                return t * t;
              }),
              (this.easeOutQuad = function (t) {
                return t * (2 - t);
              }),
              (this.easeInOutQuad = function (t) {
                return t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1;
              }),
              (this.easeInSin = function (t) {
                return 1 + Math.sin((Math.PI / 2) * t - Math.PI / 2);
              }),
              (this.easeOutSin = function (t) {
                return Math.sin((Math.PI / 2) * t);
              }),
              (this.easeInOutSin = function (t) {
                return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
              }),
              (this.easeInElastic = function (t) {
                return 0 === t ? t : (0.04 - 0.04 / t) * Math.sin(25 * t) + 1;
              }),
              (this.easeOutElastic = function (t) {
                return ((0.04 * t) / --t) * Math.sin(25 * t);
              }),
              (this.easeInOutElastic = function (t) {
                return (t -= 0.5) < 0
                  ? (0.02 + 0.01 / t) * Math.sin(50 * t)
                  : (0.02 - 0.01 / t) * Math.sin(50 * t) + 1;
              }),
              (this.easeOutBack = function (t) {
                return (t -= 1) * t * (2.70158 * t + 1.70158) + 1;
              }),
              (this.easeInCubic = function (t) {
                return t * t * t;
              }),
              (this.easeOutCubic = function (t) {
                return --t * t * t + 1;
              }),
              (this.easeInOutCubic = function (t) {
                return t < 0.5
                  ? 4 * t * t * t
                  : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
              }),
              (this.easeInQuart = function (t) {
                return t * t * t * t;
              }),
              (this.easeOutQuart = function (t) {
                return 1 - --t * t * t * t;
              }),
              (this.easeInOutQuart = function (t) {
                return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
              }),
              (this.easeInQuint = function (t) {
                return t * t * t * t * t;
              }),
              (this.easeOutQuint = function (t) {
                return 1 + --t * t * t * t * t;
              }),
              (this.easeInOutQuint = function (t) {
                return t < 0.5
                  ? 16 * t * t * t * t * t
                  : 1 + 16 * --t * t * t * t * t;
              });
          }
        })();
      },
      {},
    ],
    115: [
      function (t, e, i) {
        "use strict";
        const s = t(111),
          n = (t, e) => (null == t ? e : t);
        class r {
          constructor(t) {
            (this.top = 0),
              (this.bottom = 0),
              (this.left = 0),
              (this.right = 0),
              (this.height = 0),
              (this.width = 0);
          }
          toString() {
            return "top:"
              .concat(this.top, ", bottom:")
              .concat(this.bottom, ", left:")
              .concat(this.left, ", right:")
              .concat(this.right, ", height:")
              .concat(this.height, ", width:")
              .concat(this.width);
          }
          toObject() {
            return {
              top: this.top,
              bottom: this.bottom,
              left: this.left,
              right: this.right,
              height: this.height,
              width: this.width,
            };
          }
        }
        e.exports = class {
          constructor() {
            this.clear();
          }
          clear() {
            this._metrics = new WeakMap();
          }
          destroy() {
            this._metrics = null;
          }
          add(t) {
            let e = this._metrics.get(t);
            if (e) return e;
            let i = new r(t);
            return this._metrics.set(t, i), this._refreshMetrics(t, i);
          }
          get(t) {
            return this._metrics.get(t);
          }
          refreshCollection(t) {
            t.forEach((t) => this._refreshMetrics(t, null));
          }
          refreshMetrics(t) {
            return this._refreshMetrics(t);
          }
          _refreshMetrics(t, e) {
            if (((e = e || this._metrics.get(t)), !(t instanceof Element)))
              return (
                (e.width = n(t.width, 0)),
                (e.height = n(t.height, 0)),
                (e.top = n(t.top, n(t.y, 0))),
                (e.left = n(t.left, n(t.x, 0))),
                (e.right = e.left + e.width),
                (e.bottom = e.top + e.height),
                e
              );
            if (void 0 === t.offsetWidth) {
              let i = t.getBoundingClientRect();
              return (
                (e.width = i.width),
                (e.height = i.height),
                (e.top = s.pageMetrics.scrollY + i.top),
                (e.left = s.pageMetrics.scrollX + i.left),
                (e.right = e.left + e.width),
                (e.bottom = e.top + e.height),
                e
              );
            }
            (e.width = t.offsetWidth),
              (e.height = t.offsetHeight),
              (e.top = s.pageMetrics.documentOffsetY),
              (e.left = s.pageMetrics.documentOffsetX);
            let i = t;
            for (; i; )
              (e.top += i.offsetTop),
                (e.left += i.offsetLeft),
                (i = i.offsetParent);
            return (
              (e.right = e.left + e.width), (e.bottom = e.top + e.height), e
            );
          }
        };
      },
      { 111: 111 },
    ],
    116: [
      function (t, e, i) {
        "use strict";
        e.exports = class {
          constructor(t) {
            (this.controller = t),
              (this.element = this.controller.element),
              (this.keyframe = null),
              (this.event = ""),
              (this.tweenProps = this.controller.tweenProps);
          }
        };
      },
      {},
    ],
    117: [
      function (t, e, i) {
        "use strict";
        const s = t(111),
          n = t(106),
          r = t(109),
          o = t(107),
          a = function (t) {
            for (let e in t) {
              let i = t[e];
              if (
                -1 === s.KeyframeJSONReservedWords.indexOf(e) &&
                Array.isArray(i)
              )
                return !0;
            }
            return !1;
          };
        e.exports = function (t) {
          if (void 0 !== t.cssClass || void 0 !== t.style) {
            if (a(t))
              throw "CSS Keyframes cannot tween values, please use multiple keyframes instead";
            return o;
          }
          if (a(t)) return n;
          if (t.event) return r;
          throw (
            (delete t.anchors,
            "Could not determine tween type based on ".concat(
              JSON.stringify(t)
            ))
          );
        };
      },
      { 106: 106, 107: 107, 109: 109, 111: 111 },
    ],
    118: [
      function (t, e, i) {
        "use strict";
        e.exports = class {
          constructor() {
            (this.local = 0),
              (this.localUnclamped = 0),
              (this.lastPosition = 0);
          }
        };
      },
      {},
    ],
    119: [
      function (t, e, i) {
        "use strict";
        const { map: s } = t(206),
          n = {};
        class r {
          constructor(t, e, i, s) {
            (this.mass = t),
              (this.stiffness = e),
              (this.damping = i),
              (this.initialVelocity = s),
              (this.m_w0 = Math.sqrt(this.stiffness / this.mass)),
              (this.m_zeta =
                this.damping / (2 * Math.sqrt(this.stiffness * this.mass))),
              this.m_zeta < 1
                ? ((this.m_wd =
                    this.m_w0 * Math.sqrt(1 - this.m_zeta * this.m_zeta)),
                  (this.m_A = 1),
                  (this.m_B =
                    (this.m_zeta * this.m_w0 - this.initialVelocity) /
                    this.m_wd))
                : ((this.m_wd = 0),
                  (this.m_A = 1),
                  (this.m_B = -this.initialVelocity + this.m_w0));
          }
          solve(t) {
            return (
              1 -
              (t =
                this.m_zeta < 1
                  ? Math.exp(-t * this.m_zeta * this.m_w0) *
                    (this.m_A * Math.cos(this.m_wd * t) +
                      this.m_B * Math.sin(this.m_wd * t))
                  : (this.m_A + this.m_B * t) * Math.exp(-t * this.m_w0))
            );
          }
        }
        const o = /\d*\.?\d+/g;
        (r.fromCSSString = function (t) {
          let e = t.match(o);
          if (4 !== e.length)
            throw "SpringEasing could not convert ".concat(
              cssString,
              " to spring params"
            );
          let i = e.map(Number),
            a = new r(...i);
          const l = a.solve.bind(a);
          let h = 0;
          let c = (function () {
            if (n[t]) return n[t];
            let e,
              i = 0;
            for (;;) {
              h += 1 / 6;
              if (1 === l(h)) {
                if ((i++, i >= 16)) {
                  e = h * (1 / 6);
                  break;
                }
              } else i = 0;
            }
            return (n[t] = e), n[t];
          })();
          return function (t) {
            return 0 === t || 1 === t ? t : l(s(t, 0, 1, 0, c));
          };
        }),
          (e.exports = r);
      },
      { 206: 206 },
    ],
    120: [
      function (t, e, i) {
        "use strict";
        e.exports = class {
          constructor(t, e, i, s, n = !1, r) {
            (this.epsilon = parseFloat(e)),
              (this.snapAtCreation = i),
              (this.initialValue = t),
              (this.target = t),
              (this.current = t),
              (this.previousValue = t),
              (this.isActive = !1),
              (this.key = s),
              (this.round = n),
              (this.suffix = r);
          }
          update(t, e, i) {
            (this.target = t[0] + e * (t[1] - t[0])),
              (this.previousValue = this.current),
              (this.current += (this.target - this.current) * i);
            let s = this.delta(this.current, this.target);
            return (
              s < this.epsilon && ((this.current = this.target), (s = 0)),
              s > this.epsilon ||
                (0 === s && this.previousValue !== this.current)
            );
          }
          reconcile(t, e) {
            return (this.initialValue = t[0]), this.update(t, e, 1);
          }
          needsUpdate() {
            return this.delta(this.current, this.target) > this.epsilon;
          }
          delta(t, e) {
            return Math.abs(t - e);
          }
          calculateEpsilon(t, e) {
            if (t.epsilon) return void (this.epsilon = t.epsilon);
            let i = this.delta(e[0], e[1]),
              s = Math.min(0.001 * i, this.epsilon, 0.05);
            this.epsilon = Math.max(s, 0.001);
          }
          set(t) {
            let e = this.current;
            this.round && (e = Math.round(e)),
              this.suffix && (e += this.suffix),
              (t[this.key] = e);
          }
        };
      },
      {},
    ],
    121: [
      function (t, e, i) {
        "use strict";
        e.exports = class {};
      },
      {},
    ],
    122: [
      function (t, e, i) {
        "use strict";
        e.exports = () => Math.random().toString(16).slice(-4);
      },
      {},
    ],
    123: [
      function (t, e, i) {
        "use strict";
        const s = Math.abs;
        class n {
          constructor(t, e, i, s) {
            (this.cp = new Float32Array(6)),
              (this.cp[0] = 3 * t),
              (this.cp[1] = 3 * (i - t) - this.cp[0]),
              (this.cp[2] = 1 - this.cp[0] - this.cp[1]),
              (this.cp[3] = 3 * e),
              (this.cp[4] = 3 * (s - e) - this.cp[3]),
              (this.cp[5] = 1 - this.cp[3] - this.cp[4]);
          }
          sampleCurveX(t) {
            return ((this.cp[2] * t + this.cp[1]) * t + this.cp[0]) * t;
          }
          sampleCurveY(t) {
            return ((this.cp[5] * t + this.cp[4]) * t + this.cp[3]) * t;
          }
          sampleCurveDerivativeX(t) {
            return (3 * this.cp[2] * t + 2 * this.cp[1]) * t + this.cp[0];
          }
          solveCurveX(t) {
            var e, i, n, r, o, a;
            for (n = t, a = 0; a < 5; a++) {
              if (((r = this.sampleCurveX(n) - t), s(r) < 1e-5)) return n;
              if (((o = this.sampleCurveDerivativeX(n)), s(o) < 1e-5)) break;
              n -= r / o;
            }
            if ((n = t) < (e = 0)) return e;
            if (n > (i = 1)) return i;
            for (; e < i; ) {
              if (((r = this.sampleCurveX(n)), s(r - t) < 1e-5)) return n;
              t > r ? (e = n) : (i = n), (n = 0.5 * (i - e) + e);
            }
            return n;
          }
          solve(t) {
            return this.sampleCurveY(this.solveCurveX(t));
          }
        }
        const r = /\d*\.?\d+/g;
        (n.fromCSSString = function (t) {
          let e = t.match(r);
          if (4 !== e.length)
            throw "UnitBezier could not convert ".concat(t, " to cubic-bezier");
          let i = e.map(Number),
            s = new n(i[0], i[1], i[2], i[3]);
          return s.solve.bind(s);
        }),
          (e.exports = n);
      },
      {},
    ],
    124: [
      function (t, e, i) {
        "use strict";
        e.exports = class {
          constructor(t, e) {
            (this.a = t.top - e),
              this.a < 0 && (this.a = t.top),
              (this.b = t.top),
              (this.d = t.bottom),
              (this.c = Math.max(this.d - e, this.b));
          }
        };
      },
      {},
    ],
    125: [
      function (t, e, i) {
        "use strict";
        let s = [
          "borderRadius",
          "bottom",
          "fontSize",
          "fontWeight",
          "height",
          "left",
          "lineHeight",
          "marginBottom",
          "marginLeft",
          "marginRight",
          "marginTop",
          "maxHeight",
          "maxWidth",
          "opacity",
          "paddingBottom",
          "paddingLeft",
          "paddingRight",
          "paddingTop",
          "right",
          "top",
          "width",
          "zIndex",
          "color",
          "background-color",
          "fill",
          "stroke",
          "strokeDashoffset",
        ];
        s.push(
          ...s.map((t) => t.replace(/[A-Z]/g, (t) => "-" + t.toLowerCase()))
        );
        e.exports = {
          transformAttributes: [
            "x",
            "y",
            "z",
            "scale",
            "scaleX",
            "scaleY",
            "rotation",
            "rotationX",
            "rotationY",
            "rotationZ",
          ],
          cssAttributes: s,
          domAttributes: ["currentTime", "scrollLeft", "scrollTop"],
        };
      },
      {},
    ],
    126: [
      function (t, e, i) {
        "use strict";
        const s = t(127),
          n = new (t(115))();
        class r {
          constructor(t) {
            (this.group = t),
              (this.data = {
                target: null,
                anchors: null,
                metrics: this.group.metrics,
              });
          }
          parseArray(t, e) {
            return [
              this.parseExpression(t, e[0]),
              this.parseExpression(t, e[1]),
            ];
          }
          parseExpression(t, e) {
            if (!e) return null;
            if ("number" == typeof e) return e;
            if ("string" != typeof e)
              throw "Expression must be a string, received "
                .concat(typeof e, ": ")
                .concat(e);
            return (
              (this.data.target = t.controller.element),
              (this.data.anchors = t.anchors),
              (this.data.keyframe = t.keyframe),
              this.group.anim.plugins.parser.reduce(
                (i, s) => i || s.parseExpression.call(this, t, e),
                null
              ) || r._parse(e, this.data)
            );
          }
          parseTimeValue(t, e) {
            if ("number" == typeof e) return e;
            let i = this.group.expressionParser.parseExpression(t, e);
            return this.group.convertScrollPositionToTValue(i);
          }
          destroy() {
            this.group = null;
          }
          static parse(t, e) {
            return (
              (e = e || {}) &&
                (n.clear(),
                e.target && n.add(e.target),
                e.anchors && e.anchors.forEach((t) => n.add(t))),
              (e.metrics = n),
              r._parse(t, e)
            );
          }
          static _parse(t, e) {
            return s.Parse(t).execute(e);
          }
        }
        (r.programs = s.programs),
          "undefined" != typeof window && (window.ExpressionParser = r),
          (e.exports = r);
      },
      { 115: 115, 127: 127 },
    ],
    127: [
      function (t, e, i) {
        "use strict";
        const s = t(111),
          n = t(206),
          r = {},
          o = {
            smoothstep: (t, e, i) =>
              (i = o.clamp((i - t) / (e - t), 0, 1)) * i * (3 - 2 * i),
            deg: (t) => (180 * t) / Math.PI,
            rad: (t) => (t * Math.PI) / 180,
            random: (t, e) => Math.random() * (e - t) + t,
            atan: Math.atan2,
          };
        Object.getOwnPropertyNames(Math).forEach((t) =>
          o[t] ? null : (o[t.toLowerCase()] = Math[t])
        ),
          Object.getOwnPropertyNames(n).forEach((t) =>
            o[t] ? null : (o[t.toLowerCase()] = n[t])
          );
        let a = null;
        const l = "a",
          h = "ALPHA",
          c = "(",
          u = ")",
          d = "PLUS",
          m = "MINUS",
          p = "MUL",
          f = "DIV",
          _ = "INTEGER_CONST",
          g = "FLOAT_CONST",
          b = ",",
          E = "EOF",
          y = {
            NUMBERS: /\d|\d\.\d/,
            DIGIT: /\d/,
            OPERATOR: /[-+*/]/,
            PAREN: /[()]/,
            WHITE_SPACE: /\s/,
            ALPHA: /[a-zA-Z]|%/,
            ALPHANUMERIC: /[a-zA-Z0-9]/,
            OBJECT_UNIT: /^(t|l|b|r|%w|%h|%|h|w)$/,
            GLOBAL_METRICS_UNIT: /^(px|vh|vw)$/,
            ANY_UNIT: /^(t|l|b|r|%w|%h|%|h|w|px|vh|vw)$/,
            MATH_FUNCTION: new RegExp(
              "\\b(".concat(Object.keys(o).join("|"), ")\\b"),
              "i"
            ),
          },
          v = function (t, e, i, s = "") {
            let n = e.slice(Math.max(i, 0), Math.min(e.length, i + 3)),
              r = new Error(
                "Expression Error. "
                  .concat(t, ' in expression "')
                  .concat(e, '", near "')
                  .concat(n, '"')
              );
            throw (
              (console.error(r.message, a ? a.keyframe || a.target : ""), r)
            );
          },
          w = {
            round: 1,
            clamp: 3,
            lerp: 3,
            random: 2,
            atan: 2,
            floor: 1,
            ceil: 1,
            abs: 1,
            cos: 1,
            sin: 1,
            smoothstep: 3,
            rad: 1,
            deg: 1,
            pow: 2,
            calc: 1,
          };
        class x {
          constructor(t, e) {
            (this.type = t), (this.value = e);
          }
        }
        (x.ONE = new x("100", 100)), (x.EOF = new x(E, null));
        class I {
          constructor(t) {
            this.type = t;
          }
        }
        class A extends I {
          constructor(t, e) {
            super("UnaryOp"), (this.token = this.op = t), (this.expr = e);
          }
        }
        class T extends I {
          constructor(t, e, i) {
            super("BinOp"), (this.left = t), (this.op = e), (this.right = i);
          }
        }
        class C extends I {
          constructor(t, e) {
            if (
              (super("MathOp"),
              (this.op = t),
              (this.list = e),
              w[t.value] && e.length !== w[t.value])
            )
              throw new Error(
                "Incorrect number of arguments for '"
                  .concat(t.value, "'. Received ")
                  .concat(e.length, ", expected ")
                  .concat(w[t.value])
              );
          }
        }
        class S extends I {
          constructor(t) {
            super("Num"), (this.token = t), (this.value = t.value);
          }
        }
        class O extends I {
          constructor(t, e, i) {
            super("RefValue"), (this.num = t), (this.ref = e), (this.unit = i);
          }
        }
        class R extends I {
          constructor(t, e) {
            super("CSSValue"), (this.ref = t), (this.propertyName = e);
          }
        }
        class D extends I {
          constructor(t, e) {
            super("PropValue"), (this.ref = t), (this.propertyName = e);
          }
        }
        class P {
          constructor(t) {
            let e;
            for (
              this.text = t,
                this.pos = 0,
                this.char = this.text[this.pos],
                this.tokens = [];
              (e = this.getNextToken()) && e !== x.EOF;

            )
              this.tokens.push(e);
            this.tokens.push(e);
          }
          advance() {
            this.char = this.text[++this.pos];
          }
          skipWhiteSpace() {
            for (; null != this.char && y.WHITE_SPACE.test(this.char); )
              this.advance();
          }
          name() {
            let t = "";
            for (; null != this.char && y.ALPHA.test(this.char); )
              (t += this.char), this.advance();
            return new x(h, t);
          }
          number() {
            let t = "";
            for (
              "." === this.char && ((t += this.char), this.advance());
              null != this.char && y.DIGIT.test(this.char);

            )
              (t += this.char), this.advance();
            if (null != this.char && "." === this.char)
              for (
                t.includes(".") &&
                  v(
                    "Number appears to contain 2 decimal points",
                    this.text,
                    this.pos
                  ),
                  t += this.char,
                  this.advance();
                null != this.char && y.DIGIT.test(this.char);

              )
                (t += this.char), this.advance();
            return (
              "." === t &&
                v(
                  "Attempted to parse a number, but found only a decimal point",
                  this.text,
                  this.pos
                ),
              t.includes(".") ? new x(g, parseFloat(t)) : new x(_, parseInt(t))
            );
          }
          getNextToken() {
            for (; null != this.char; )
              if (y.WHITE_SPACE.test(this.char)) this.skipWhiteSpace();
              else {
                if ("." === this.char || y.DIGIT.test(this.char))
                  return this.number();
                if ("," === this.char) return this.advance(), new x(b, ",");
                if (y.OPERATOR.test(this.char)) {
                  let t = "",
                    e = this.char;
                  switch (e) {
                    case "+":
                      t = d;
                      break;
                    case "-":
                      t = m;
                      break;
                    case "*":
                      t = p;
                      break;
                    case "/":
                      t = f;
                  }
                  return this.advance(), new x(t, e);
                }
                if (y.PAREN.test(this.char)) {
                  let t = "",
                    e = this.char;
                  switch (e) {
                    case "(":
                      t = c;
                      break;
                    case ")":
                      t = u;
                  }
                  return this.advance(), new x(t, e);
                }
                if (y.ALPHA.test(this.char)) return this.name();
                v(
                  'Unexpected character "'.concat(this.char, '"'),
                  this.text,
                  this.pos
                );
              }
            return x.EOF;
          }
        }
        class N {
          constructor(t) {
            (this.lexer = t), (this.pos = 0);
          }
          get currentToken() {
            return this.lexer.tokens[this.pos];
          }
          error(t, e = "") {
            v(t, e, this.lexer.text, this.pos);
          }
          consume(t) {
            let e = this.currentToken;
            return (
              e.type === t
                ? (this.pos += 1)
                : this.error(
                    "Invalid token "
                      .concat(this.currentToken.value, ", expected ")
                      .concat(t)
                  ),
              e
            );
          }
          consumeList(t) {
            t.includes(this.currentToken)
              ? (this.pos += 1)
              : this.error(
                  "Invalid token "
                    .concat(this.currentToken.value, ", expected ")
                    .concat(tokenType)
                );
          }
          expr() {
            let t = this.term();
            for (
              ;
              this.currentToken.type === d || this.currentToken.type === m;

            ) {
              const e = this.currentToken;
              switch (e.value) {
                case "+":
                  this.consume(d);
                  break;
                case "-":
                  this.consume(m);
              }
              t = new T(t, e, this.term());
            }
            return t;
          }
          term() {
            let t = this.factor();
            for (
              ;
              this.currentToken.type === p || this.currentToken.type === f;

            ) {
              const e = this.currentToken;
              switch (e.value) {
                case "*":
                  this.consume(p);
                  break;
                case "/":
                  this.consume(f);
              }
              t = new T(t, e, this.factor());
            }
            return t;
          }
          factor() {
            if (this.currentToken.type === d)
              return new A(this.consume(d), this.factor());
            if (this.currentToken.type === m)
              return new A(this.consume(m), this.factor());
            if (this.currentToken.type === _ || this.currentToken.type === g) {
              let t = new S(this.currentToken);
              if (
                ((this.pos += 1),
                y.OPERATOR.test(this.currentToken.value) ||
                  this.currentToken.type === u ||
                  this.currentToken.type === b ||
                  this.currentToken.type === E)
              )
                return t;
              if (this.currentToken.type === h && this.currentToken.value === l)
                return (
                  this.consume(h),
                  new O(t, this.anchorIndex(), this.unit(y.ANY_UNIT))
                );
              if (this.currentToken.type === h)
                return (
                  "%a" === this.currentToken.value &&
                    this.error("%a is invalid, try removing the %"),
                  new O(t, null, this.unit())
                );
              this.error("Expected a scaling unit type", "Such as 'h' / 'w'");
            } else {
              if (y.OBJECT_UNIT.test(this.currentToken.value))
                return new O(new S(x.ONE), null, this.unit());
              if (this.currentToken.value === l) {
                this.consume(h);
                const t = this.anchorIndex();
                if (y.OBJECT_UNIT.test(this.currentToken.value))
                  return new O(new S(x.ONE), t, this.unit());
              } else if (this.currentToken.type === h) {
                if ("calc" === this.currentToken.value)
                  return this.consume(h), this.expr();
                if (
                  "css" === this.currentToken.value ||
                  "var" === this.currentToken.value ||
                  "prop" === this.currentToken.value
                ) {
                  const t = "prop" !== this.currentToken.value ? R : D;
                  this.consume(h), this.consume(c);
                  const e = this.propertyName();
                  let i = null;
                  return (
                    this.currentToken.type === b &&
                      (this.consume(b),
                      this.consume(h),
                      (i = this.anchorIndex())),
                    this.consume(u),
                    new t(i, e)
                  );
                }
                if (y.MATH_FUNCTION.test(this.currentToken.value)) {
                  const t = this.currentToken.value.toLowerCase();
                  if ("number" == typeof o[t])
                    return this.consume(h), new S(new x(h, o[t]));
                  const e = x[t] || new x(t, t),
                    i = [];
                  this.consume(h), this.consume(c);
                  let s = null;
                  do {
                    this.currentToken.value === b && this.consume(b),
                      (s = this.expr()),
                      i.push(s);
                  } while (this.currentToken.value === b);
                  return this.consume(u), new C(e, i);
                }
              } else if (this.currentToken.type === c) {
                this.consume(c);
                let t = this.expr();
                return this.consume(u), t;
              }
            }
            this.error("Unexpected token ".concat(this.currentToken.value));
          }
          propertyName() {
            let t = "";
            for (
              ;
              this.currentToken.type === h || this.currentToken.type === m;

            )
              (t += this.currentToken.value), (this.pos += 1);
            return t;
          }
          unit(t = y.ANY_UNIT) {
            const e = this.currentToken;
            if (e.type === h && t.test(e.value))
              return (
                this.consume(h),
                new x(
                  h,
                  (e.value = e.value.replace(/%(h|w)/, "$1").replace("%", "h"))
                )
              );
            this.error("Expected unit type");
          }
          anchorIndex() {
            const t = this.currentToken;
            if (t.type === _) return this.consume(_), new S(t);
            this.error(
              "Invalid anchor reference",
              ". Should be something like a0, a1, a2"
            );
          }
          parse() {
            const t = this.expr();
            return (
              this.currentToken !== x.EOF &&
                this.error("Unexpected token ".concat(this.currentToken.value)),
              t
            );
          }
        }
        class M {
          constructor(t) {
            (this.parser = t), (this.root = t.parse());
          }
          visit(t) {
            let e = this[t.type];
            if (!e) throw new Error("No visit method named, ".concat(e));
            return e.call(this, t);
          }
          BinOp(t) {
            switch (t.op.type) {
              case d:
                return this.visit(t.left) + this.visit(t.right);
              case m:
                return this.visit(t.left) - this.visit(t.right);
              case p:
                return this.visit(t.left) * this.visit(t.right);
              case f:
                return this.visit(t.left) / this.visit(t.right);
            }
          }
          RefValue(t) {
            let e = this.unwrapReference(t),
              i = t.unit.value,
              n = t.num.value;
            const r = a.metrics.get(e);
            switch (i) {
              case "h":
                return 0.01 * n * r.height;
              case "t":
                return 0.01 * n * r.top;
              case "vh":
                return 0.01 * n * s.pageMetrics.windowHeight;
              case "vw":
                return 0.01 * n * s.pageMetrics.windowWidth;
              case "px":
                return n;
              case "w":
                return 0.01 * n * r.width;
              case "b":
                return 0.01 * n * r.bottom;
              case "l":
                return 0.01 * n * r.left;
              case "r":
                return 0.01 * n * r.right;
            }
          }
          PropValue(t) {
            return (null === t.ref ? a.target : a.anchors[t.ref.value])[
              t.propertyName
            ];
          }
          CSSValue(t) {
            let e = this.unwrapReference(t);
            const i = getComputedStyle(e).getPropertyValue(t.propertyName);
            return "" === i ? 0 : M.Parse(i).execute(a);
          }
          Num(t) {
            return t.value;
          }
          UnaryOp(t) {
            return t.op.type === d
              ? +this.visit(t.expr)
              : t.op.type === m
              ? -this.visit(t.expr)
              : void 0;
          }
          MathOp(t) {
            let e = t.list.map((t) => this.visit(t));
            return o[t.op.value].apply(null, e);
          }
          unwrapReference(t) {
            return null === t.ref
              ? a.target
              : (t.ref.value >= a.anchors.length &&
                  console.error(
                    "Not enough anchors supplied for expression ".concat(
                      this.parser.lexer.text
                    ),
                    a.target
                  ),
                a.anchors[t.ref.value]);
          }
          execute(t) {
            return (a = t), this.visit(this.root);
          }
          static Parse(t) {
            return r[t] || (r[t] = new M(new N(new P(t))));
          }
        }
        (M.programs = r), (e.exports = M);
      },
      { 111: 111, 206: 206 },
    ],
    128: [
      function (t, e, i) {
        "use strict";
        const s = t(49).EventEmitterMicro,
          n = t(206),
          r = t(131),
          o = t(111),
          a = t(110),
          l = t(118),
          h = t(124),
          c = t(115),
          u = t(126),
          d = t(108),
          m = {};
        "undefined" != typeof window &&
          ((m.create = t(78)), (m.update = t(89)), (m.draw = t(85)));
        let p = 0;
        e.exports = class extends s {
          constructor(t, e) {
            super(),
              (this.anim = e),
              (this.element = t),
              (this.name =
                this.name || t.getAttribute("data-anim-scroll-group")),
              (this.isEnabled = !0),
              (this.position = new l()),
              (this.metrics = new c()),
              this.metrics.add(this.element),
              (this.expressionParser = new u(this)),
              (this.boundsMin = 0),
              (this.boundsMax = 0),
              (this.timelineUpdateRequired = !1),
              (this._keyframesDirty = !1),
              (this.viewableRange = this.createViewableRange()),
              (this.defaultEase = o.KeyframeDefaults.ease),
              (this.keyframeControllers = []),
              this.updateProgress(this.getPosition()),
              (this.onDOMRead = this.onDOMRead.bind(this)),
              (this.onDOMWrite = this.onDOMWrite.bind(this)),
              (this.gui = null),
              (this.computedStyleCache = {}),
              this.finalizeInit();
          }
          finalizeInit() {
            (this.element._animInfo = new a(this, null, !0)),
              this.setupRAFEmitter();
          }
          destroy() {
            (this.destroyed = !0),
              this.expressionParser.destroy(),
              (this.expressionParser = null);
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
              this.keyframeControllers[t].destroy();
            (this.keyframeControllers = null),
              (this.position = null),
              (this.viewableRange = null),
              this.gui && (this.gui.destroy(), (this.gui = null)),
              this.metrics.destroy(),
              (this.metrics = null),
              this.rafEmitter.destroy(),
              (this.rafEmitter = null),
              (this.anim = null),
              this.element._animInfo &&
                this.element._animInfo.group === this &&
                ((this.element._animInfo.group = null),
                (this.element._animInfo = null)),
              (this.element = null),
              (this.isEnabled = !1),
              super.destroy();
          }
          removeKeyframeController(t) {
            return this.keyframeControllers.includes(t)
              ? (t._allKeyframes.forEach((t) => (t.markedForRemoval = !0)),
                (this.keyframesDirty = !0),
                new Promise((e) => {
                  m.draw(() => {
                    const i = this.keyframeControllers.indexOf(t);
                    -1 !== i
                      ? (this.keyframeControllers.splice(i, 1),
                        t.onDOMWrite(),
                        t.destroy(),
                        this.gui && this.gui.create(),
                        e())
                      : e();
                  });
                }))
              : Promise.resolve();
          }
          remove() {
            return this.anim.removeGroup(this);
          }
          clear() {
            return Promise.all(
              this.keyframeControllers.map((t) =>
                this.removeKeyframeController(t)
              )
            );
          }
          setupRAFEmitter(t) {
            this.rafEmitter && this.rafEmitter.destroy(),
              (this.rafEmitter = t || new m.create()),
              this.rafEmitter.on("update", this.onDOMRead),
              this.rafEmitter.on("draw", this.onDOMWrite),
              this.rafEmitter.once("external", () => this.reconcile());
          }
          requestDOMChange() {
            return !!this.isEnabled && this.rafEmitter.run();
          }
          onDOMRead() {
            this.keyframesDirty && this.onKeyframesDirty();
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
              this.keyframeControllers[t].onDOMRead(this.position.local);
          }
          onDOMWrite() {
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
              this.keyframeControllers[t].onDOMWrite();
            this.needsUpdate() && this.requestDOMChange(),
              (this.computedStyleCache = {});
          }
          needsUpdate() {
            if (this._keyframesDirty) return !0;
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
              if (this.keyframeControllers[t].needsUpdate()) return !0;
            return !1;
          }
          addKeyframe(t, e) {
            let i = this.getControllerForTarget(t);
            return (
              null === i &&
                ((i = new d(this, t)), this.keyframeControllers.push(i)),
              (this.keyframesDirty = !0),
              i.addKeyframe(e)
            );
          }
          addEvent(t, e) {
            e.event = e.event || "Generic-Event-Name-" + p++;
            let i = void 0 !== e.end && e.end !== e.start;
            const s = this.addKeyframe(t, e);
            return (
              i
                ? (e.onEnterOnce &&
                    s.controller.once(e.event + ":enter", e.onEnterOnce),
                  e.onExitOnce &&
                    s.controller.once(e.event + ":exit", e.onExitOnce),
                  e.onEnter && s.controller.on(e.event + ":enter", e.onEnter),
                  e.onExit && s.controller.on(e.event + ":exit", e.onExit))
                : (e.onEventOnce && s.controller.once(e.event, e.onEventOnce),
                  e.onEventReverseOnce &&
                    s.controller.once(
                      e.event + ":reverse",
                      e.onEventReverseOnce
                    ),
                  e.onEvent && s.controller.on(e.event, e.onEvent),
                  e.onEventReverse &&
                    s.controller.on(e.event + ":reverse", e.onEventReverse)),
              s
            );
          }
          forceUpdate({ waitForNextUpdate: t = !0, silent: e = !1 } = {}) {
            this.isEnabled &&
              (this.refreshMetrics(),
              (this.timelineUpdateRequired = !0),
              t
                ? (this.keyframesDirty = !0)
                : this.onKeyframesDirty({ silent: e }));
          }
          onKeyframesDirty({ silent: t = !1 } = {}) {
            this.determineActiveKeyframes(),
              (this.keyframesDirty = !1),
              this.metrics.refreshMetrics(this.element),
              (this.viewableRange = this.createViewableRange());
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
              this.keyframeControllers[t].updateAnimationConstraints();
            this.updateBounds(),
              this.updateProgress(this.getPosition()),
              t || this.updateTimeline(),
              this.gui && this.gui.create();
          }
          refreshMetrics() {
            let t = new Set([this.element]);
            this.keyframeControllers.forEach((e) => {
              t.add(e.element),
                e._allKeyframes.forEach((e) =>
                  e.anchors.forEach((e) => t.add(e))
                );
            }),
              this.metrics.refreshCollection(t),
              (this.viewableRange = this.createViewableRange());
          }
          reconcile() {
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
              this.keyframeControllers[t].reconcile();
          }
          determineActiveKeyframes(t) {
            t = t || r(Array.from(document.documentElement.classList));
            for (let e = 0, i = this.keyframeControllers.length; e < i; e++)
              this.keyframeControllers[e].determineActiveKeyframes(t);
          }
          updateBounds() {
            if (0 === this.keyframeControllers.length)
              return (this.boundsMin = 0), void (this.boundsMax = 0);
            let t = {
              min: Number.POSITIVE_INFINITY,
              max: Number.NEGATIVE_INFINITY,
            };
            for (let e = 0, i = this.keyframeControllers.length; e < i; e++)
              this.keyframeControllers[e].getBounds(t);
            let e = this.convertTValueToScrollPosition(t.min),
              i = this.convertTValueToScrollPosition(t.max);
            i - e < o.pageMetrics.windowHeight
              ? ((t.min = this.convertScrollPositionToTValue(
                  e - 0.5 * o.pageMetrics.windowHeight
                )),
                (t.max = this.convertScrollPositionToTValue(
                  i + 0.5 * o.pageMetrics.windowHeight
                )))
              : ((t.min -= 0.001), (t.max += 0.001)),
              (this.boundsMin = t.min),
              (this.boundsMax = t.max),
              (this.timelineUpdateRequired = !0);
          }
          createViewableRange() {
            return new h(
              this.metrics.get(this.element),
              o.pageMetrics.windowHeight
            );
          }
          _onBreakpointChange(t, e) {
            (this.keyframesDirty = !0), this.determineActiveKeyframes();
          }
          updateProgress(t) {
            this.hasDuration()
              ? ((this.position.localUnclamped =
                  (t - this.viewableRange.a) /
                  (this.viewableRange.d - this.viewableRange.a)),
                (this.position.local = n.clamp(
                  this.position.localUnclamped,
                  this.boundsMin,
                  this.boundsMax
                )))
              : (this.position.local = this.position.localUnclamped = 0);
          }
          performTimelineDispatch() {
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
              this.keyframeControllers[t].updateLocalProgress(
                this.position.local
              );
            this.trigger(o.EVENTS.ON_TIMELINE_UPDATE, this.position.local),
              this.trigger("update", this.position.local),
              (this.timelineUpdateRequired = !1),
              this.position.lastPosition !== this.position.local &&
                (this.position.lastPosition <= this.boundsMin &&
                this.position.localUnclamped > this.boundsMin
                  ? (this.trigger(o.EVENTS.ON_TIMELINE_START, this),
                    this.trigger("start", this))
                  : this.position.lastPosition >= this.boundsMin &&
                    this.position.localUnclamped < this.boundsMin
                  ? (this.trigger(
                      o.EVENTS.ON_TIMELINE_START + ":reverse",
                      this
                    ),
                    this.trigger("start:reverse", this))
                  : this.position.lastPosition <= this.boundsMax &&
                    this.position.localUnclamped >= this.boundsMax
                  ? (this.trigger(o.EVENTS.ON_TIMELINE_COMPLETE, this),
                    this.trigger("complete", this))
                  : this.position.lastPosition >= this.boundsMax &&
                    this.position.localUnclamped < this.boundsMax &&
                    (this.trigger(
                      o.EVENTS.ON_TIMELINE_COMPLETE + ":reverse",
                      this
                    ),
                    this.trigger("complete:reverse", this))),
              null !== this.gui && this.gui.onScrollUpdate(this.position);
          }
          updateTimeline(t) {
            if (!this.isEnabled) return !1;
            void 0 === t && (t = this.getPosition()), this.updateProgress(t);
            let e =
                this.position.lastPosition === this.boundsMin ||
                this.position.lastPosition === this.boundsMax,
              i =
                this.position.localUnclamped === this.boundsMin ||
                this.position.localUnclamped === this.boundsMax;
            if (
              !this.timelineUpdateRequired &&
              e &&
              i &&
              this.position.lastPosition === t
            )
              return void (this.position.local = this.position.localUnclamped);
            if (
              this.timelineUpdateRequired ||
              (this.position.localUnclamped > this.boundsMin &&
                this.position.localUnclamped < this.boundsMax)
            )
              return (
                this.performTimelineDispatch(),
                this.requestDOMChange(),
                void (this.position.lastPosition = this.position.localUnclamped)
              );
            let s =
                this.position.lastPosition > this.boundsMin &&
                this.position.lastPosition < this.boundsMax,
              n =
                this.position.localUnclamped <= this.boundsMin ||
                this.position.localUnclamped >= this.boundsMax;
            if (s && n)
              return (
                this.performTimelineDispatch(),
                this.requestDOMChange(),
                void (this.position.lastPosition = this.position.localUnclamped)
              );
            const r =
                this.position.lastPosition < this.boundsMin &&
                this.position.localUnclamped > this.boundsMax,
              o =
                this.position.lastPosition > this.boundsMax &&
                this.position.localUnclamped < this.boundsMax;
            (r || o) &&
              (this.performTimelineDispatch(),
              this.requestDOMChange(),
              (this.position.lastPosition = this.position.localUnclamped)),
              null !== this.gui && this.gui.onScrollUpdate(this.position);
          }
          _onScroll(t) {
            this.updateTimeline(t);
          }
          convertScrollPositionToTValue(t) {
            return this.hasDuration()
              ? n.map(t, this.viewableRange.a, this.viewableRange.d, 0, 1)
              : 0;
          }
          convertTValueToScrollPosition(t) {
            return this.hasDuration()
              ? n.map(t, 0, 1, this.viewableRange.a, this.viewableRange.d)
              : 0;
          }
          hasDuration() {
            return this.viewableRange.a !== this.viewableRange.d;
          }
          getPosition() {
            return o.pageMetrics.scrollY;
          }
          getControllerForTarget(t) {
            if (!t._animInfo || !t._animInfo.controllers) return null;
            if (t._animInfo.controller && t._animInfo.controller.group === this)
              return t._animInfo.controller;
            const e = t._animInfo.controllers;
            for (let t = 0, i = e.length; t < i; t++)
              if (e[t].group === this) return e[t];
            return null;
          }
          trigger(t, e) {
            if (void 0 !== this._events[t])
              for (let i = this._events[t].length - 1; i >= 0; i--)
                void 0 !== e ? this._events[t][i](e) : this._events[t][i]();
          }
          set keyframesDirty(t) {
            (this._keyframesDirty = t),
              this._keyframesDirty && this.requestDOMChange();
          }
          get keyframesDirty() {
            return this._keyframesDirty;
          }
        };
      },
      {
        108: 108,
        110: 110,
        111: 111,
        115: 115,
        118: 118,
        124: 124,
        126: 126,
        131: 131,
        206: 206,
        49: 49,
        78: 78,
        85: 85,
        89: 89,
      },
    ],
    129: [
      function (t, e, i) {
        "use strict";
        const s = t(128),
          n = t(105),
          r = t(206);
        let o = 0;
        const a = {};
        "undefined" != typeof window && (a.create = t(78));
        class l extends s {
          constructor(t, e) {
            t ||
              ((t = document.createElement("div")).className =
                "TimeGroup-" + o++),
              super(t, e),
              (this.name = this.name || t.getAttribute("data-anim-time-group")),
              (this._isPaused = !0),
              (this._repeats = 0),
              (this._isReversed = !1),
              (this._timeScale = 1),
              (this._chapterPlayer = new n(this)),
              (this.now = performance.now());
          }
          finalizeInit() {
            if (!this.anim)
              throw "TimeGroup not instantiated correctly. Please use `AnimSystem.createTimeGroup(el)`";
            (this.onPlayTimeUpdate = this.onPlayTimeUpdate.bind(this)),
              super.finalizeInit();
          }
          progress(t) {
            if (void 0 === t)
              return 0 === this.boundsMax
                ? 0
                : this.position.local / this.boundsMax;
            let e = t * this.boundsMax;
            (this.timelineUpdateRequired = !0), this.updateTimeline(e);
          }
          time(t) {
            if (void 0 === t) return this.position.local;
            (t = r.clamp(t, this.boundsMin, this.duration)),
              (this.timelineUpdateRequired = !0),
              this.updateTimeline(t);
          }
          play(t) {
            this.reversed(!1),
              (this.isEnabled = !0),
              (this._isPaused = !1),
              this.time(t),
              (this.now = performance.now()),
              this._playheadEmitter.run();
          }
          reverse(t) {
            this.reversed(!0),
              (this.isEnabled = !0),
              (this._isPaused = !1),
              this.time(t),
              (this.now = performance.now()),
              this._playheadEmitter.run();
          }
          reversed(t) {
            if (void 0 === t) return this._isReversed;
            this._isReversed = t;
          }
          restart() {
            this._isReversed
              ? (this.progress(1), this.reverse(this.time()))
              : (this.progress(0), this.play(this.time()));
          }
          pause(t) {
            this.time(t), (this._isPaused = !0);
          }
          paused(t) {
            return void 0 === t
              ? this._isPaused
              : ((this._isPaused = t), this._isPaused || this.play(), this);
          }
          onPlayTimeUpdate() {
            if (this._isPaused) return;
            let t = performance.now(),
              e = (t - this.now) / 1e3;
            (this.now = t), this._isReversed && (e = -e);
            let i = this.time() + e * this._timeScale;
            if (this._repeats === l.REPEAT_FOREVER || this._repeats > 0) {
              let t = !1;
              !this._isReversed && i > this.boundsMax
                ? ((i -= this.boundsMax), (t = !0))
                : this._isReversed &&
                  i < 0 &&
                  ((i = this.boundsMax + i), (t = !0)),
                t &&
                  (this._repeats =
                    this._repeats === l.REPEAT_FOREVER
                      ? l.REPEAT_FOREVER
                      : this._repeats - 1);
            }
            this.time(i);
            let s = !this._isReversed && this.position.local !== this.duration,
              n = this._isReversed && 0 !== this.position.local;
            s || n ? this._playheadEmitter.run() : this.paused(!0);
          }
          updateProgress(t) {
            this.hasDuration()
              ? ((this.position.localUnclamped = t),
                (this.position.local = r.clamp(
                  this.position.localUnclamped,
                  this.boundsMin,
                  this.boundsMax
                )))
              : (this.position.local = this.position.localUnclamped = 0);
          }
          updateBounds() {
            if (0 === this.keyframeControllers.length)
              return (this.boundsMin = 0), void (this.boundsMax = 0);
            let t = {
              min: Number.POSITIVE_INFINITY,
              max: Number.NEGATIVE_INFINITY,
            };
            for (let e = 0, i = this.keyframeControllers.length; e < i; e++)
              this.keyframeControllers[e].getBounds(t);
            (this.boundsMin = 0),
              (this.boundsMax = t.max),
              (this.viewableRange.a = this.viewableRange.b = 0),
              (this.viewableRange.c = this.viewableRange.d = this.boundsMax),
              (this.timelineUpdateRequired = !0);
          }
          setupRAFEmitter(t) {
            (this._playheadEmitter = new a.create()),
              this._playheadEmitter.on("update", this.onPlayTimeUpdate),
              super.setupRAFEmitter(t);
          }
          get duration() {
            return (
              this.keyframesDirty && this.onKeyframesDirty({ silent: !0 }),
              this.boundsMax
            );
          }
          timeScale(t) {
            return void 0 === t
              ? this._timeScale
              : ((this._timeScale = t), this);
          }
          repeats(t) {
            if (void 0 === t) return this._repeats;
            this._repeats = t;
          }
          getPosition() {
            return this.position.local;
          }
          addChapter(t) {
            return this._chapterPlayer.addChapter(t);
          }
          playToChapter(t) {
            this._chapterPlayer.playToChapter(t);
          }
          convertScrollPositionToTValue(t) {
            return t;
          }
          convertTValueToScrollPosition(t) {
            return t;
          }
          hasDuration() {
            return this.duration > 0;
          }
          destroy() {
            this._playheadEmitter.destroy(),
              (this._playheadEmitter = null),
              super.destroy();
          }
          get timelineProgress() {
            return this.progress();
          }
          set timelineProgress(t) {
            this.progress(t);
          }
          get progressValue() {
            return this.progress();
          }
          set progressValue(t) {
            this.progress(t);
          }
          get timeValue() {
            return this.time();
          }
          set timeValue(t) {
            this.time(t);
          }
        }
        (l.REPEAT_FOREVER = -1), (e.exports = l);
      },
      { 105: 105, 128: 128, 206: 206, 78: 78 },
    ],
    130: [
      function (t, e, i) {
        "use strict";
        const s = t(128),
          n = (t(105), t(206));
        let r = 0;
        const o = {};
        "undefined" != typeof window && (o.create = t(78));
        e.exports = class extends s {
          constructor(t, e) {
            t ||
              ((t = document.createElement("div")).className =
                "TweenGroup-" + r++),
              super(t, e),
              (this.name = "Tweens"),
              (this.keyframes = []),
              (this._isPaused = !1),
              (this.now = performance.now());
          }
          finalizeInit() {
            (this.onTimeEmitterUpdate = this.onTimeEmitterUpdate.bind(this)),
              (this.removeExpiredKeyframeControllers =
                this.removeExpiredKeyframeControllers.bind(this)),
              super.finalizeInit();
          }
          destroy() {
            this._timeEmitter.destroy(),
              (this._timeEmitter = null),
              (this._keyframes = []),
              super.destroy();
          }
          setupRAFEmitter(t) {
            (this.now = performance.now()),
              (this._timeEmitter = new o.create()),
              this._timeEmitter.on("update", this.onTimeEmitterUpdate),
              this._timeEmitter.run(),
              super.setupRAFEmitter(t);
          }
          addKeyframe(t, e) {
            if (void 0 !== e.start || void 0 !== e.end)
              throw Error(
                "Tweens do not have a start or end, they can only have a duration. Consider using a TimeGroup instead"
              );
            if ("number" != typeof e.duration)
              throw Error(
                "Tween options.duration is undefined, or is not a number"
              );
            let i, s;
            (e.start = (e.delay || 0) + this.position.localUnclamped),
              (e.end = e.start + e.duration),
              (e.preserveState = !0),
              (e.snapAtCreation = !0),
              t._animInfo &&
                ((i = t._animInfo.group), (s = t._animInfo.controller));
            let n = super.addKeyframe(t, e);
            return (
              (t._animInfo.group = i),
              (t._animInfo.controller = s),
              e.onStart &&
                n.controller.once("draw", (t) => {
                  (t.keyframe = n), e.onStart(t), (t.keyframe = null);
                }),
              e.onDraw &&
                n.controller.on("draw", (t) => {
                  (t.keyframe = n), e.onDraw(t), (t.keyframe = null);
                }),
              this.removeOverlappingProps(n),
              this.keyframes.push(n),
              this._timeEmitter.willRun() ||
                ((this.now = performance.now()), this._timeEmitter.run()),
              n
            );
          }
          removeOverlappingProps(t) {
            if (t.controller._allKeyframes.length <= 1) return;
            let e = Object.keys(t.animValues),
              i = t.controller;
            for (let s = 0, n = i._allKeyframes.length; s < n; s++) {
              const n = i._allKeyframes[s];
              if (n === t) continue;
              if (n.markedForRemoval) continue;
              let r = Object.keys(n.animValues),
                o = r.filter((t) => e.includes(t));
              o.length !== r.length
                ? o.forEach((t) => delete n.animValues[t])
                : (n.markedForRemoval = !0);
            }
          }
          onTimeEmitterUpdate(t) {
            if (this._isPaused || 0 === this.keyframeControllers.length) return;
            let e = performance.now(),
              i = (e - this.now) / 1e3;
            this.now = e;
            let s = this.position.local + i;
            (this.position.local = this.position.localUnclamped = s),
              this.onTimeUpdate();
          }
          onTimeUpdate() {
            for (let t = 0, e = this.keyframes.length; t < e; t++)
              this.keyframes[t].updateLocalProgress(
                this.position.localUnclamped
              );
            this.requestDOMChange(),
              this._timeEmitter.run(),
              null !== this.gui && this.gui.onScrollUpdate(this.position);
          }
          onDOMRead() {
            if (
              (this.keyframesDirty && this.onKeyframesDirty(),
              0 !== this.keyframes.length)
            )
              for (let t = 0, e = this.keyframes.length; t < e; t++) {
                this.keyframes[t].controller.needsWrite = !0;
                for (let e in this.keyframes[t].animValues)
                  this.keyframes[t].onDOMRead(e);
              }
          }
          onDOMWrite() {
            super.onDOMWrite(), this.removeExpiredKeyframes();
          }
          removeExpiredKeyframes() {
            let t = this.keyframes.length,
              e = t;
            for (; t--; ) {
              let e = this.keyframes[t];
              e.destroyed
                ? this.keyframes.splice(t, 1)
                : (e.markedForRemoval &&
                    (e.jsonProps.onComplete &&
                      1 === e.localT &&
                      ((e.controller.eventObject.keyframe = e),
                      e.jsonProps.onComplete(e.controller.eventObject),
                      (e.jsonProps.onComplete = null)),
                    (null !== this.gui && this.gui.isDraggingPlayhead) ||
                      (e.remove(), this.keyframes.splice(t, 1))),
                  1 === e.localT && (e.markedForRemoval = !0));
            }
            (this.keyframes.length === e && 0 !== this.keyframes.length) ||
              this._timeEmitter.executor.eventEmitter.once(
                "after:draw",
                this.removeExpiredKeyframeControllers
              );
          }
          removeExpiredKeyframeControllers() {
            for (let t = 0, e = this.keyframeControllers.length; t < e; t++) {
              let e = !0,
                i = this.keyframeControllers[t];
              for (let t = 0, s = i._allKeyframes.length; t < s; t++)
                if (!i._allKeyframes[t].destroyed) {
                  e = !1;
                  break;
                }
              e && i.remove();
            }
          }
          updateBounds() {
            (this.boundsMin = Math.min(...this.keyframes.map((t) => t.start))),
              (this.boundsMax = Math.max(...this.keyframes.map((t) => t.end)));
          }
          play() {
            (this.isEnabled = !0),
              (this._isPaused = !1),
              (this.now = performance.now()),
              this._timeEmitter.run();
          }
          pause() {
            this._isPaused = !0;
          }
          paused() {
            return this._isPaused;
          }
          time(t) {
            if (void 0 === t) return this.position.local;
            (this.position.local = this.position.localUnclamped =
              n.clamp(t, this.boundsMin, this.boundsMax)),
              this.onTimeUpdate();
          }
          performTimelineDispatch() {}
          hasDuration() {
            return !0;
          }
          getPosition() {
            return this.position.local;
          }
          updateProgress(t) {}
          get duration() {
            return this.boundsMax;
          }
        };
      },
      { 105: 105, 128: 128, 206: 206, 78: 78 },
    ],
    131: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t) {
          return t.reduce((t, e) => ((t[e] = e), t), {});
        };
      },
      {},
    ],
    132: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t) {
          return t.startsWith("--")
            ? t
            : t.replace(/[A-Z]/g, (t) => "-" + t.toLowerCase());
        };
      },
      {},
    ],
    133: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t, e) {
          if ("string" != typeof t) return t;
          try {
            return (
              (e || document).querySelector(t) || document.querySelector(t)
            );
          } catch (t) {
            return !1;
          }
        };
      },
      {},
    ],
    134: [
      function (t, e, i) {
        arguments[4][103][0].apply(i, arguments);
      },
      { 103: 103 },
    ],
    135: [
      function (t, e, i) {
        arguments[4][104][0].apply(i, arguments);
      },
      {
        104: 104,
        134: 134,
        137: 137,
        138: 138,
        140: 140,
        142: 142,
        158: 158,
        159: 159,
        160: 160,
        49: 49,
        84: 84,
        85: 85,
        86: 86,
        89: 89,
      },
    ],
    136: [
      function (t, e, i) {
        arguments[4][105][0].apply(i, arguments);
      },
      { 105: 105, 142: 142 },
    ],
    137: [
      function (t, e, i) {
        arguments[4][106][0].apply(i, arguments);
      },
      {
        106: 106,
        142: 142,
        143: 143,
        144: 144,
        149: 149,
        150: 150,
        152: 152,
        153: 153,
        155: 155,
        161: 161,
        162: 162,
        163: 163,
        206: 206,
      },
    ],
    138: [
      function (t, e, i) {
        arguments[4][107][0].apply(i, arguments);
      },
      { 107: 107, 137: 137, 142: 142, 150: 150 },
    ],
    139: [
      function (t, e, i) {
        arguments[4][108][0].apply(i, arguments);
      },
      {
        108: 108,
        137: 137,
        138: 138,
        141: 141,
        142: 142,
        143: 143,
        146: 146,
        147: 147,
        150: 150,
        152: 152,
        155: 155,
        161: 161,
        178: 178,
        210: 210,
        211: 211,
        212: 212,
        213: 213,
        214: 214,
        49: 49,
        85: 85,
        86: 86,
        89: 89,
      },
    ],
    140: [
      function (t, e, i) {
        arguments[4][109][0].apply(i, arguments);
      },
      { 109: 109, 137: 137, 142: 142, 150: 150 },
    ],
    141: [
      function (t, e, i) {
        arguments[4][110][0].apply(i, arguments);
      },
      { 110: 110, 151: 151 },
    ],
    142: [
      function (t, e, i) {
        arguments[4][111][0].apply(i, arguments);
      },
      { 111: 111, 143: 143, 150: 150, 151: 151 },
    ],
    143: [
      function (t, e, i) {
        arguments[4][113][0].apply(i, arguments);
      },
      { 113: 113, 150: 150, 162: 162 },
    ],
    144: [
      function (t, e, i) {
        arguments[4][114][0].apply(i, arguments);
      },
      { 114: 114 },
    ],
    145: [
      function (t, e, i) {
        arguments[4][115][0].apply(i, arguments);
      },
      { 115: 115, 142: 142 },
    ],
    146: [
      function (t, e, i) {
        arguments[4][116][0].apply(i, arguments);
      },
      { 116: 116 },
    ],
    147: [
      function (t, e, i) {
        arguments[4][117][0].apply(i, arguments);
      },
      { 117: 117, 137: 137, 138: 138, 140: 140, 142: 142 },
    ],
    148: [
      function (t, e, i) {
        arguments[4][118][0].apply(i, arguments);
      },
      { 118: 118 },
    ],
    149: [
      function (t, e, i) {
        arguments[4][119][0].apply(i, arguments);
      },
      { 119: 119, 206: 206 },
    ],
    150: [
      function (t, e, i) {
        arguments[4][120][0].apply(i, arguments);
      },
      { 120: 120 },
    ],
    151: [
      function (t, e, i) {
        arguments[4][121][0].apply(i, arguments);
      },
      { 121: 121 },
    ],
    152: [
      function (t, e, i) {
        arguments[4][122][0].apply(i, arguments);
      },
      { 122: 122 },
    ],
    153: [
      function (t, e, i) {
        arguments[4][123][0].apply(i, arguments);
      },
      { 123: 123 },
    ],
    154: [
      function (t, e, i) {
        arguments[4][124][0].apply(i, arguments);
      },
      { 124: 124 },
    ],
    155: [
      function (t, e, i) {
        arguments[4][125][0].apply(i, arguments);
      },
      { 125: 125 },
    ],
    156: [
      function (t, e, i) {
        arguments[4][126][0].apply(i, arguments);
      },
      { 126: 126, 145: 145, 157: 157 },
    ],
    157: [
      function (t, e, i) {
        arguments[4][127][0].apply(i, arguments);
      },
      { 127: 127, 142: 142, 206: 206 },
    ],
    158: [
      function (t, e, i) {
        arguments[4][128][0].apply(i, arguments);
      },
      {
        128: 128,
        139: 139,
        141: 141,
        142: 142,
        145: 145,
        148: 148,
        154: 154,
        156: 156,
        161: 161,
        206: 206,
        49: 49,
        78: 78,
        85: 85,
        89: 89,
      },
    ],
    159: [
      function (t, e, i) {
        arguments[4][129][0].apply(i, arguments);
      },
      { 129: 129, 136: 136, 158: 158, 206: 206, 78: 78 },
    ],
    160: [
      function (t, e, i) {
        arguments[4][130][0].apply(i, arguments);
      },
      { 130: 130, 136: 136, 158: 158, 206: 206, 78: 78 },
    ],
    161: [
      function (t, e, i) {
        arguments[4][131][0].apply(i, arguments);
      },
      { 131: 131 },
    ],
    162: [
      function (t, e, i) {
        arguments[4][132][0].apply(i, arguments);
      },
      { 132: 132 },
    ],
    163: [
      function (t, e, i) {
        arguments[4][133][0].apply(i, arguments);
      },
      { 133: 133 },
    ],
    164: [
      function (t, e, i) {
        "use strict";
        const s = t(49).EventEmitterMicro,
          n = t(142),
          r = { create: t(78), update: t(89), draw: t(85) },
          o = () => {};
        let a = 0;
        e.exports = class extends s {
          constructor(t) {
            super(),
              (this.el = t.el),
              (this.gum = t.gum),
              (this.componentName = t.componentName),
              (this._keyframeController = null);
          }
          destroy() {
            (this.el = null),
              (this.gum = null),
              (this._keyframeController = null),
              super.destroy();
          }
          addKeyframe(t) {
            const e = t.el || this.el;
            return (t.group || this.anim).addKeyframe(e, t);
          }
          addDiscreteEvent(t) {
            t.event = t.event || "Generic-Event-Name-" + a++;
            let e = void 0 !== t.end && t.end !== t.start;
            const i = this.addKeyframe(t);
            return (
              e
                ? (t.onEnterOnce &&
                    i.controller.once(t.event + ":enter", t.onEnterOnce),
                  t.onExitOnce &&
                    i.controller.once(t.event + ":exit", t.onExitOnce),
                  t.onEnter && i.controller.on(t.event + ":enter", t.onEnter),
                  t.onExit && i.controller.on(t.event + ":exit", t.onExit))
                : (t.onEventOnce && i.controller.once(t.event, t.onEventOnce),
                  t.onEventReverseOnce &&
                    i.controller.once(
                      t.event + ":reverse",
                      t.onEventReverseOnce
                    ),
                  t.onEvent && i.controller.on(t.event, t.onEvent),
                  t.onEventReverse &&
                    i.controller.on(t.event + ":reverse", t.onEventReverse)),
              i
            );
          }
          addRAFLoop(t) {
            let e = ["start", "end"];
            if (!e.every((e) => t.hasOwnProperty(e)))
              return void console.log(
                "BubbleGum.BaseComponent::addRAFLoop required options are missing: " +
                  e.join(" ")
              );
            const i = new r.create();
            i.on("update", t.onUpdate || o),
              i.on("draw", t.onDraw || o),
              i.on("draw", () => i.run());
            const { onEnter: s, onExit: n } = t;
            return (
              (t.onEnter = () => {
                i.run(), s && s();
              }),
              (t.onExit = () => {
                i.cancel(), n && n();
              }),
              this.addDiscreteEvent(t)
            );
          }
          addContinuousEvent(t) {
            t.onDraw ||
              console.log(
                "BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"
              ),
              (t.event = t.event || "Generic-Event-Name-" + a++);
            let e = this.addKeyframe(t);
            return e.controller.on(t.event, t.onDraw), e;
          }
          mounted() {}
          onResizeImmediate(t) {}
          onResizeDebounced(t) {}
          onBreakpointChange(t) {}
          get anim() {
            return this.gum.anim;
          }
          get keyframeController() {
            return (
              this._keyframeController ||
              (this._keyframeController = this.anim.getControllerForTarget(
                this.el
              ))
            );
          }
          get pageMetrics() {
            return n.pageMetrics;
          }
        };
      },
      { 142: 142, 49: 49, 78: 78, 85: 85, 89: 89 },
    ],
    165: [
      function (t, e, i) {
        "use strict";
        const s = t(49).EventEmitterMicro,
          n = t(179),
          r = t(135),
          o = t(142),
          a = t(166),
          l = {};
        class h extends s {
          constructor(t, e = {}) {
            super(),
              (this.el = t),
              (this.anim = r),
              (this.componentAttribute = e.attribute || "data-component-list"),
              (this.components = []),
              (this.componentsInitialized = !1),
              this.el.getAttribute("data-anim-scroll-group") ||
                this.el.setAttribute(
                  "data-anim-scroll-group",
                  "bubble-gum-group"
                ),
              n.add(() => {
                r.initialize().then(() => {
                  this.initComponents(),
                    this.setupEvents(),
                    this.components.forEach((t) => t.mounted()),
                    this.trigger(h.EVENTS.DOM_COMPONENTS_MOUNTED);
                });
              });
          }
          initComponents() {
            const t = Array.prototype.slice.call(
              this.el.querySelectorAll("[".concat(this.componentAttribute, "]"))
            );
            this.el.hasAttribute(this.componentAttribute) && t.push(this.el);
            for (let e = 0; e < t.length; e++) {
              let i = t[e],
                s = i.getAttribute(this.componentAttribute).split(" ");
              for (let t = 0, e = s.length; t < e; t++) {
                let e = s[t];
                "" !== e &&
                  " " !== e &&
                  this.addComponent({ el: i, componentName: e });
              }
            }
            this.componentsInitialized = !0;
          }
          setupEvents() {
            (this.onResizeDebounced = this.onResizeDebounced.bind(this)),
              (this.onResizeImmediate = this.onResizeImmediate.bind(this)),
              (this.onBreakpointChange = this.onBreakpointChange.bind(this)),
              r.on(o.PageEvents.ON_RESIZE_IMMEDIATE, this.onResizeImmediate),
              r.on(o.PageEvents.ON_RESIZE_DEBOUNCED, this.onResizeDebounced),
              r.on(o.PageEvents.ON_BREAKPOINT_CHANGE, this.onBreakpointChange);
          }
          addComponent(t) {
            const { el: e, componentName: i, data: s } = t;
            if (!a.hasOwnProperty(i))
              throw (
                "BubbleGum::addComponent could not add component to '" +
                e.className +
                "'. No component type '" +
                i +
                "' found!"
              );
            const n = a[i];
            if (!h.componentIsSupported(n, i))
              return (
                void 0 === l[i] &&
                  (console.log(
                    "BubbleGum::addComponent unsupported component '" +
                      i +
                      "'. Reason: '" +
                      i +
                      ".IS_SUPPORTED' returned false"
                  ),
                  (l[i] = !0)),
                null
              );
            let r = e.dataset.componentList || "";
            r.includes(i) ||
              (e.dataset.componentList = r.split(" ").concat(i).join(" "));
            let c = new n({
              el: e,
              data: s,
              componentName: t.componentName,
              gum: this,
              pageMetrics: o.pageMetrics,
            });
            return (
              this.components.push(c),
              this.componentsInitialized && c.mounted(),
              c
            );
          }
          removeComponent(t) {
            const e = this.components.indexOf(t);
            -1 !== e &&
              (this.components.splice(e, 1),
              (t.el.dataset.componentList = t.el.dataset.componentList
                .split(" ")
                .filter((e) => e !== t.componentName)
                .join(" ")),
              t.destroy());
          }
          getComponentOfType(t, e = document.documentElement) {
            const i = "[".concat(this.componentAttribute, "*=").concat(t, "]"),
              s = e.matches(i) ? e : e.querySelector(i);
            return s
              ? this.components.find((e) => e instanceof a[t] && e.el === s)
              : null;
          }
          getComponentsOfType(t, e = document.documentElement) {
            const i = "[".concat(this.componentAttribute, "*=").concat(t, "]"),
              s = e.matches(i) ? [e] : Array.from(e.querySelectorAll(i));
            return this.components.filter(
              (e) => e instanceof a[t] && s.includes(e.el)
            );
          }
          getComponentsForElement(t) {
            return this.components.filter((e) => e.el === t);
          }
          onResizeImmediate() {
            this.components.forEach((t) => t.onResizeImmediate(o.pageMetrics));
          }
          onResizeDebounced() {
            this.components.forEach((t) => t.onResizeDebounced(o.pageMetrics));
          }
          onBreakpointChange() {
            this.components.forEach((t) => t.onBreakpointChange(o.pageMetrics));
          }
          static componentIsSupported(t, e) {
            const i = t.IS_SUPPORTED;
            if (void 0 === i) return !0;
            if ("function" != typeof i)
              return (
                console.error(
                  'BubbleGum::addComponent error in "' +
                    e +
                    '".IS_SUPPORTED - it should be a function which returns true/false'
                ),
                !0
              );
            const s = t.IS_SUPPORTED();
            return void 0 === s
              ? (console.error(
                  'BubbleGum::addComponent error in "' +
                    e +
                    '".IS_SUPPORTED - it should be a function which returns true/false'
                ),
                !0)
              : s;
          }
        }
        (h.EVENTS = { DOM_COMPONENTS_MOUNTED: "DOM_COMPONENTS_MOUNTED" }),
          (e.exports = h);
      },
      { 135: 135, 142: 142, 166: 166, 179: 179, 49: 49 },
    ],
    166: [
      function (t, e, i) {
        "use strict";
        e.exports = { BaseComponent: t(164) };
      },
      { 164: 164 },
    ],
    167: [
      function (t, e, i) {
        "use strict";
        var s,
          n = t(49).EventEmitterMicro,
          r = t(91),
          o = t(76);
        function a(t) {
          (t = t || {}),
            n.call(this),
            (this.id = o.getNewID()),
            (this.executor = t.executor || r),
            this._reset(),
            (this._willRun = !1),
            (this._didDestroy = !1);
        }
        ((s = a.prototype = Object.create(n.prototype)).run = function () {
          return this._willRun || (this._willRun = !0), this._subscribe();
        }),
          (s.cancel = function () {
            this._unsubscribe(),
              this._willRun && (this._willRun = !1),
              this._reset();
          }),
          (s.destroy = function () {
            var t = this.willRun();
            return (
              this.cancel(),
              (this.executor = null),
              n.prototype.destroy.call(this),
              (this._didDestroy = !0),
              t
            );
          }),
          (s.willRun = function () {
            return this._willRun;
          }),
          (s.isRunning = function () {
            return this._isRunning;
          }),
          (s._subscribe = function () {
            return this.executor.subscribe(this);
          }),
          (s._unsubscribe = function () {
            return this.executor.unsubscribe(this);
          }),
          (s._onAnimationFrameStart = function (t) {
            (this._isRunning = !0),
              (this._willRun = !1),
              this._didEmitFrameData ||
                ((this._didEmitFrameData = !0), this.trigger("start", t));
          }),
          (s._onAnimationFrameEnd = function (t) {
            this._willRun || (this.trigger("stop", t), this._reset());
          }),
          (s._reset = function () {
            (this._didEmitFrameData = !1), (this._isRunning = !1);
          }),
          (e.exports = a);
      },
      { 49: 49, 76: 76, 91: 91 },
    ],
    168: [
      function (t, e, i) {
        "use strict";
        var s = t(170),
          n = function (t) {
            (this.rafEmitter = new s()),
              this.rafEmitter.on(t, this._onRAFExecuted.bind(this)),
              (this.requestAnimationFrame =
                this.requestAnimationFrame.bind(this)),
              (this.cancelAnimationFrame =
                this.cancelAnimationFrame.bind(this)),
              (this._frameCallbacks = []),
              (this._nextFrameCallbacks = []),
              (this._currentFrameID = -1),
              (this._cancelFrameIdx = -1),
              (this._frameCallbackLength = 0),
              (this._nextFrameCallbacksLength = 0),
              (this._frameCallbackIteration = 0);
          },
          r = n.prototype;
        (r.requestAnimationFrame = function (t) {
          return (
            (this._currentFrameID = this.rafEmitter.run()),
            this._nextFrameCallbacks.push(this._currentFrameID, t),
            (this._nextFrameCallbacksLength += 2),
            this._currentFrameID
          );
        }),
          (r.cancelAnimationFrame = function (t) {
            (this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(t)),
              -1 !== this._cancelFrameIdx &&
                (this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2),
                (this._nextFrameCallbacksLength -= 2),
                0 === this._nextFrameCallbacksLength &&
                  this.rafEmitter.cancel());
          }),
          (r._onRAFExecuted = function (t) {
            for (
              this._frameCallbacks = this._nextFrameCallbacks,
                this._frameCallbackLength = this._nextFrameCallbacksLength,
                this._nextFrameCallbacks = [],
                this._nextFrameCallbacksLength = 0,
                this._frameCallbackIteration = 0;
              this._frameCallbackIteration < this._frameCallbackLength;
              this._frameCallbackIteration += 2
            )
              this._frameCallbacks[this._frameCallbackIteration + 1](t.time, t);
          }),
          (e.exports = n);
      },
      { 170: 170 },
    ],
    169: [
      function (t, e, i) {
        "use strict";
        var s = t(168),
          n = function () {
            this.events = {};
          },
          r = n.prototype;
        (r.requestAnimationFrame = function (t) {
          return (
            this.events[t] || (this.events[t] = new s(t)),
            this.events[t].requestAnimationFrame
          );
        }),
          (r.cancelAnimationFrame = function (t) {
            return (
              this.events[t] || (this.events[t] = new s(t)),
              this.events[t].cancelAnimationFrame
            );
          }),
          (e.exports = new n());
      },
      { 168: 168 },
    ],
    170: [
      function (t, e, i) {
        "use strict";
        var s = t(167),
          n = function (t) {
            s.call(this, t);
          };
        ((n.prototype = Object.create(s.prototype))._subscribe = function () {
          return this.executor.subscribe(this, !0);
        }),
          (e.exports = n);
      },
      { 167: 167 },
    ],
    171: [
      function (t, e, i) {
        "use strict";
        var s = t(169);
        e.exports = s.requestAnimationFrame("draw");
      },
      { 169: 169 },
    ],
    172: [
      function (t, e, i) {
        "use strict";
        var s = t(169);
        e.exports = s.requestAnimationFrame("update");
      },
      { 169: 169 },
    ],
    173: [
      function (t, e, i) {
        "use strict";
        const s = t(172),
          n = t(171),
          r = t(174),
          o = t(176),
          a = t(177),
          l = t(175);
        e.exports = class {
          constructor(t, e = {}) {
            if ("number" != typeof t || !isFinite(t))
              throw new TypeError(
                'Clip duration must be a finite number; got "'.concat(t, '"')
              );
            "function" == typeof e && (e = { draw: e }),
              (this.ease = o(e.ease)),
              (this.update = o(e.update)),
              (this.draw = e.draw),
              (this.prepare = o(e.prepare)),
              (this.finish = o(e.finish)),
              (this._duration = 1e3 * t),
              (this._startTime = null),
              (this._isPrepared = !1),
              (this._promise = null),
              (this._isPlaying = !1);
          }
          get isReversed() {
            return this._duration < 0;
          }
          get isComplete() {
            const t = this.progress;
            return (!this.isReversed && t >= 1) || (this.isReversed && t <= 0);
          }
          get progress() {
            if (0 === this._duration) return 1;
            let t = (this.lastFrameTime - this._startTime) / this._duration;
            return this.isReversed && (t = 1 + t), l(t, 0, 1);
          }
          get easedProgress() {
            return this.ease ? this.ease(this.progress) : this.progress;
          }
          _run(t, e) {
            (this.lastFrameTime = Date.now()),
              null === this._startTime &&
                (this._startTime = this.lastFrameTime);
            const i = this.easedProgress;
            this.update && s(() => this._isPlaying && this.update(i)),
              n(() => {
                this._isPlaying &&
                  (this.draw(i),
                  this.isComplete
                    ? a(n, [this.finish, e])
                    : this._run(this, e));
              });
          }
          play() {
            if ("function" != typeof this.draw)
              throw new Error(
                'Clip must be given a "draw" function as an option or have its "draw" method overriden.'
              );
            return (
              (this._isPlaying = !0),
              this._promise ||
                (this._promise = new Promise((t, e) => {
                  !this._isPrepared && this.prepare
                    ? ((this._isPrepared = !0),
                      n(() =>
                        r(this.prepare(), () => {
                          this._run(this, t);
                        })
                      ))
                    : this._run(this, t);
                })),
              this._promise
            );
          }
          destroy() {
            (this._isPlaying = !1),
              (this.draw = this.finish = this.update = null);
          }
          static play() {
            return new this(...arguments).play();
          }
        };
      },
      { 171: 171, 172: 172, 174: 174, 175: 175, 176: 176, 177: 177 },
    ],
    174: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t, e) {
          t instanceof Promise ? t.then(e) : e();
        };
      },
      {},
    ],
    175: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t, e, i) {
          return Math.min(Math.max(t, e), i);
        };
      },
      {},
    ],
    176: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t) {
          return "function" == typeof t ? t : null;
        };
      },
      {},
    ],
    177: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t, e) {
          const i = e.length;
          let s = 0;
          !(function n() {
            "function" == typeof e[s] && t(e[s]), s++, s < i && n();
          })();
        };
      },
      {},
    ],
    178: [
      function (t, e, i) {
        "use strict";
        "undefined" != typeof window &&
          (window.DOMMatrix =
            window.DOMMatrix ||
            window.WebKitCSSMatrix ||
            window.CSSMatrix ||
            window.MSCSSMatrix);
        const s = 180 / Math.PI,
          n = (t) => Math.round(1e6 * t) / 1e6;
        function r(t) {
          return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
        }
        function o(t, e) {
          return 0 === e ? Array.from(t) : [t[0] / e, t[1] / e, t[2] / e];
        }
        function a(t, e) {
          return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
        }
        function l(t, e, i, s) {
          return [
            t[0] * i + e[0] * s,
            t[1] * i + e[1] * s,
            t[2] * i + e[2] * s,
          ];
        }
        function h(t) {
          const e = new Float32Array(4),
            i = new Float32Array(3),
            h = new Float32Array(3),
            c = new Float32Array(3);
          (c[0] = t[3][0]), (c[1] = t[3][1]), (c[2] = t[3][2]);
          const u = new Array(3);
          for (let e = 0; e < 3; e++) u[e] = t[e].slice(0, 3);
          (i[0] = r(u[0])),
            (u[0] = o(u[0], i[0])),
            (h[0] = a(u[0], u[1])),
            (u[1] = l(u[1], u[0], 1, -h[0])),
            (i[1] = r(u[1])),
            (u[1] = o(u[1], i[1])),
            (h[0] /= i[1]),
            (h[1] = a(u[0], u[2])),
            (u[2] = l(u[2], u[0], 1, -h[1])),
            (h[2] = a(u[1], u[2])),
            (u[2] = l(u[2], u[1], 1, -h[2])),
            (i[2] = r(u[2])),
            (u[2] = o(u[2], i[2])),
            (h[1] /= i[2]),
            (h[2] /= i[2]);
          const d =
            ((m = u[1]),
            (p = u[2]),
            [
              m[1] * p[2] - m[2] * p[1],
              m[2] * p[0] - m[0] * p[2],
              m[0] * p[1] - m[1] * p[0],
            ]);
          var m, p;
          if (a(u[0], d) < 0)
            for (let t = 0; t < 3; t++)
              (i[t] *= -1), (u[t][0] *= -1), (u[t][1] *= -1), (u[t][2] *= -1);
          let f;
          return (
            (e[0] =
              0.5 * Math.sqrt(Math.max(1 + u[0][0] - u[1][1] - u[2][2], 0))),
            (e[1] =
              0.5 * Math.sqrt(Math.max(1 - u[0][0] + u[1][1] - u[2][2], 0))),
            (e[2] =
              0.5 * Math.sqrt(Math.max(1 - u[0][0] - u[1][1] + u[2][2], 0))),
            (e[3] =
              0.5 * Math.sqrt(Math.max(1 + u[0][0] + u[1][1] + u[2][2], 0))),
            u[2][1] > u[1][2] && (e[0] = -e[0]),
            u[0][2] > u[2][0] && (e[1] = -e[1]),
            u[1][0] > u[0][1] && (e[2] = -e[2]),
            (f =
              e[0] < 0.001 && e[0] >= 0 && e[1] < 0.001 && e[1] >= 0
                ? [0, 0, n((180 * Math.atan2(u[0][1], u[0][0])) / Math.PI)]
                : (function (t) {
                    const [e, i, r, o] = t,
                      a = e * e,
                      l = i * i,
                      h = r * r,
                      c = e * i + r * o,
                      u = o * o + a + l + h;
                    return c > 0.49999 * u
                      ? [0, 2 * Math.atan2(e, o) * s, 90]
                      : c < -0.49999 * u
                      ? [0, -2 * Math.atan2(e, o) * s, -90]
                      : [
                          n(
                            Math.atan2(
                              2 * e * o - 2 * i * r,
                              1 - 2 * a - 2 * h
                            ) * s
                          ),
                          n(
                            Math.atan2(
                              2 * i * o - 2 * e * r,
                              1 - 2 * l - 2 * h
                            ) * s
                          ),
                          n(Math.asin(2 * e * i + 2 * r * o) * s),
                        ];
                  })(e)),
            {
              translation: c,
              rotation: f,
              eulerRotation: f,
              scale: [n(i[0]), n(i[1]), n(i[2])],
            }
          );
        }
        e.exports = function (t) {
          t instanceof Element &&
            (t = String(getComputedStyle(t).transform).trim());
          let e = new DOMMatrix(t);
          const i = new Array(4);
          for (let t = 1; t < 5; t++) {
            const s = (i[t - 1] = new Float32Array(4));
            for (let i = 1; i < 5; i++) s[i - 1] = e["m".concat(t).concat(i)];
          }
          return h(i);
        };
      },
      {},
    ],
    179: [
      function (t, e, i) {
        "use strict";
        let s = !1,
          n = !1,
          r = [],
          o = -1;
        e.exports = {
          NUMBER_OF_FRAMES_TO_WAIT: 30,
          add: function (t) {
            if ((n && t(), r.push(t), s)) return;
            s = !0;
            let e = document.documentElement.scrollHeight,
              i = 0;
            const a = () => {
              let t = document.documentElement.scrollHeight;
              if (e !== t) i = 0;
              else if ((i++, i >= this.NUMBER_OF_FRAMES_TO_WAIT))
                return void r.forEach((t) => t());
              (e = t), (o = requestAnimationFrame(a));
            };
            o = requestAnimationFrame(a);
          },
          reset() {
            cancelAnimationFrame(o), (s = !1), (n = !1), (r = []);
          },
        };
      },
      {},
    ],
    180: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t, e) {
          var i;
          return e
            ? { width: (i = t.getBoundingClientRect()).width, height: i.height }
            : { width: t.offsetWidth, height: t.offsetHeight };
        };
      },
      {},
    ],
    181: [
      function (t, e, i) {
        "use strict";
        var s = t(180);
        e.exports = function (t, e) {
          var i, n, r, o, a, l, h;
          return (
            e
              ? ((n = (i = t.getBoundingClientRect()).top),
                (r = i.left),
                (o = i.width),
                (a = i.height),
                t.offsetParent &&
                  ((n -= (l = t.offsetParent.getBoundingClientRect()).top),
                  (r -= l.left)))
              : ((h = s(t, e)),
                (n = t.offsetTop),
                (r = t.offsetLeft),
                (o = h.width),
                (a = h.height)),
            { top: n, right: r + o, bottom: n + a, left: r }
          );
        };
      },
      { 180: 180 },
    ],
    182: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          getWindow: function () {
            return window;
          },
          getDocument: function () {
            return document;
          },
          getNavigator: function () {
            return navigator;
          },
        };
      },
      {},
    ],
    183: [
      function (t, e, i) {
        "use strict";
        var s = t(182),
          n = t(184);
        function r() {
          var t = s.getWindow(),
            e = s.getDocument(),
            i = s.getNavigator();
          return !!(
            "ontouchstart" in t ||
            (t.DocumentTouch && e instanceof t.DocumentTouch) ||
            i.maxTouchPoints > 0 ||
            i.msMaxTouchPoints > 0
          );
        }
        (e.exports = n(r)), (e.exports.original = r);
      },
      { 182: 182, 184: 184 },
    ],
    184: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t) {
          var e;
          return function () {
            return void 0 === e && (e = t.apply(this, arguments)), e;
          };
        };
      },
      {},
    ],
    185: [
      function (t, e, i) {
        "use strict";
        const s = t(50),
          n = t(187),
          r = t(194),
          o = t(190),
          a = t(197),
          l = t(201),
          h = t(189),
          c = t(195),
          u = t(199),
          d = [
            "beforeCreate",
            "created",
            "beforeMount",
            "createItems",
            "itemsCreated",
            "mounted",
            "animateToItem",
            "onItemChangeInitiated",
            "onItemChangeOccurred",
            "onItemChangeCompleted",
            "onResizeImmediate",
            "onBreakpointChange",
            "onResizeDebounced",
            "destroy",
          ];
        class m extends s {
          constructor(t) {
            super(t),
              (this.el = t.el),
              (this.model = Object.assign(
                { options: t },
                JSON.parse(JSON.stringify(n))
              )),
              (this.model.Item.ConstructorFunction =
                n.Item.ConstructorFunction),
              (this._items = []),
              (this.currentIndex = 0),
              d.forEach((t) => {
                this[t] = (...e) => {
                  this["__".concat(t)] &&
                    this["__".concat(t)].forEach((t) => t.apply(this, e));
                };
              });
            const e = this.destroy;
            (this.destroy = (...t) => {
              e.apply(this, t), s.prototype.destroy.call(this);
            }),
              this.on(
                n.Events.ITEM_CHANGE_INITIATED,
                this.onItemChangeInitiated
              ),
              this.on(n.Events.ITEM_CHANGE_OCCURRED, this.onItemChangeOccurred),
              this.on(
                n.Events.ITEM_CHANGE_COMPLETED,
                this.onItemChangeCompleted
              ),
              ["beforeCreate", "created", "beforeMount", "createItems"].forEach(
                (e) => this[e](t)
              );
          }
        }
        (m.withMixins = (...t) => {
          const e = class extends m {},
            i = e.prototype;
          return (
            t.unshift(r, l, a),
            t.push(h, u, o, c),
            t.forEach((t) => {
              for (const e in t)
                d.includes(e)
                  ? ((i["__".concat(e)] = i["__".concat(e)] || []),
                    i["__".concat(e)].push(t[e]))
                  : (i[e] = t[e]);
            }),
            e
          );
        }),
          (e.exports = m);
      },
      {
        187: 187,
        189: 189,
        190: 190,
        194: 194,
        195: 195,
        197: 197,
        199: 199,
        201: 201,
        50: 50,
      },
    ],
    186: [
      function (t, e, i) {
        "use strict";
        const s = t(49).EventEmitterMicro,
          n = {};
        "undefined" != typeof window &&
          ((n.draw = t(85)), (n.cancelDraw = t(83)));
        e.exports = class extends s {
          constructor(t) {
            super(),
              (this._x = 0),
              (this._y = 0),
              (this._opacity = 0),
              (this._width = 0),
              (this._height = 0),
              (this._zIndex = 0),
              (this.index = t.index),
              (this.el = t.el),
              (this.applyDraw = this.applyDraw.bind(this)),
              this.measure();
          }
          measure() {
            const t = getComputedStyle(this.el);
            (this._width = this.el.clientWidth),
              (this._height = this.el.clientHeight),
              (this._zIndex = parseInt(t.getPropertyValue("z-index"))),
              (this._opacity = parseFloat(t.getPropertyValue("opacity")));
          }
          select() {
            this.el.classList.add("current"), this.trigger("select", this);
          }
          deselect() {
            this.el.classList.remove("current"), this.trigger("deselect", this);
          }
          progress(t) {}
          needsRedraw() {
            n.cancelDraw(this._rafID),
              (this._rafID = n.draw(this.applyDraw, !0));
          }
          applyDraw() {
            (this.el.style.zIndex = this._zIndex),
              (this.el.style.opacity = this._opacity),
              (this.el.style.transform = "translate("
                .concat(this._x, "px, ")
                .concat(this._y, "px)"));
          }
          get id() {
            return this.el.id;
          }
          get height() {
            return this._height;
          }
          set height(t) {
            (this._height = t), this.needsRedraw();
          }
          get width() {
            return this._width;
          }
          set width(t) {
            (this._width = t), this.needsRedraw();
          }
          get x() {
            return this._x;
          }
          set x(t) {
            (this._x = t), this.needsRedraw();
          }
          get y() {
            return this._y;
          }
          set y(t) {
            (this._y = t), this.needsRedraw();
          }
          get opacity() {
            return this._opacity;
          }
          set opacity(t) {
            (this._opacity = t), this.needsRedraw();
          }
          get zIndex() {
            return this._zIndex;
          }
          set zIndex(t) {
            (this._zIndex = t), this.needsRedraw();
          }
        };
      },
      { 49: 49, 83: 83, 85: 85 },
    ],
    187: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          PrefersReducedMotion: !1,
          IsRTL: !1,
          IsTouch: !1,
          Slide: { Selector: ".item-container", duration: 1 },
          Fade: { duration: 0.5 },
          Item: {
            Selector: ".item-container .gallery-item",
            ConstructorFunction: t(186),
          },
          DotNav: { Selector: ".dotnav" },
          PaddleNav: { Selector: ".paddlenav" },
          ChapterPlayer: { defaultEase: (t) => t },
          FadeCaptionOnChange: {
            ItemSelector: ".captions-gallery [data-captions-gallery-item]",
          },
          TabNav: {
            ItemSelector: ".tablist-wrapper li",
            RoamingTabIndexSelector: "a",
          },
          SwipeDrag: {
            DesktopSwipe: !1,
            movementRateMultiplier: 1.5,
            velocityMultiplier: 8,
          },
          Events: {
            ITEM_CHANGE_INITIATED: "ITEM_CHANGE_INITIATED",
            ITEM_CHANGE_OCCURRED: "ITEM_CHANGE_OCCURRED",
            ITEM_CHANGE_COMPLETED: "ITEM_CHANGE_COMPLETED",
          },
        };
      },
      { 186: 186 },
    ],
    188: [
      function (t, e, i) {
        "use strict";
        let s;
        try {
          s = t("@marcom/ac-analytics").observer.Gallery;
        } catch (t) {}
        e.exports = {
          created(t) {
            this.analytics = {
              lastTrackedItem: null,
              observer: null,
              events: { UPDATE: "update", UPDATE_COMPLETE: "update:complete" },
            };
          },
          mounted() {
            if (s) {
              let t = this.el.getAttribute("id");
              t ||
                (console.warn(
                  "No ID attribute found on the Mixin Gallery element - please add an ID",
                  this
                ),
                (t = "null")),
                (this.analytics.observer = new s(this, {
                  galleryName: t,
                  beforeUpdateEvent: this.analytics.events.UPDATE,
                  afterUpdateEvent: this.analytics.events.UPDATE_COMPLETE,
                  trackAutoRotate: !0,
                }));
            }
          },
          onItemChangeCompleted(t) {
            if (
              !t.previous ||
              t.current === this.analytics.lastTrackedItem ||
              (t.current === t.previous && !this.analytics.lastTrackedItem)
            )
              return;
            this.analytics.lastTrackedItem = t.current;
            let e = {
              incoming: { id: t.current.id },
              outgoing: { id: t.previous.id },
              interactionEvent: this.lastInteractionEvent,
            };
            this.trigger(this.analytics.events.UPDATE_COMPLETE, e);
          },
        };
      },
      { undefined: void 0 },
    ],
    189: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          createItems(t) {
            if (this._items.length) this.itemsCreated();
            else {
              if (!this.model.Item.ConstructorFunction)
                throw new ReferenceError(
                  "MixinGallery::AutoCreateItems - this.model.Item.ConstructorFunction is null"
                );
              if (0 === this._items.length) {
                (this._items = []),
                  Array.from(
                    this.el.querySelectorAll(this.model.Item.Selector)
                  ).forEach((t, e) => {
                    const i = new this.model.Item.ConstructorFunction({
                      el: t,
                      index: e,
                    });
                    this._items.push(i);
                  });
                let t = this._items[this._items.length - 1];
                for (let e = 0; e < this._items.length; e++) {
                  const i = this._items[e];
                  (i.prev = t), (i.next = this._items[e + 1]), (t = i);
                }
                t.next = this._items[0];
              }
              this.itemsCreated();
            }
          },
        };
      },
      {},
    ],
    190: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          itemsCreated(t) {
            this.model.options.gum ||
              this._isVue ||
              (this.anim.on("ON_RESIZE_IMMEDIATE", this.onResizeImmediate),
              this.anim.on("ON_RESIZE_DEBOUNCED", this.onResizeDebounced),
              this.anim.on("ON_BREAKPOINT_CHANGE", this.onBreakpointChange),
              requestAnimationFrame(this.mounted));
          },
          destroy() {
            this.model.options.gum ||
              this._isVue ||
              (this.anim.off("ON_RESIZE_IMMEDIATE", this.onResizeImmediate),
              this.anim.off("ON_RESIZE_DEBOUNCED", this.onResizeDebounced),
              this.anim.off("ON_BREAKPOINT_CHANGE", this.onBreakpointChange));
          },
        };
      },
      {},
    ],
    191: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          beforeCreate() {
            this.clampedIndex = !0;
          },
          wrappedIndex(t) {
            return Math.max(0, Math.min(t, this._items.length - 1));
          },
        };
      },
      {},
    ],
    192: [
      function (t, e, i) {
        "use strict";
        console.warn(
          "DotNav is deprecated. Please use the TabNav mixin for functionality, and import the Sasskit dotnav module into your SCSS. Refer to the configurator for markup."
        );
        const s = t(3),
          n = t(15),
          r = t(18);
        e.exports = {
          created() {
            (this.dotNav = {
              navElement: null,
              current: null,
              roamingTabIndex: null,
              items: [],
              onRoamingTabIndexSelect(t) {
                if (0 === this.dotNav.items.filter((e) => e === t.el).length)
                  throw "Could not find tab nav item";
              },
            }),
              (this.dotNav.onRoamingTabIndexSelect =
                this.dotNav.onRoamingTabIndexSelect.bind(this));
          },
          itemsCreated() {
            (this.dotNav.navElement = this.el.querySelector(
              this.model.DotNav.Selector
            )),
              this._items.forEach((t, e) => {
                const i = this.dotNav.navElement.querySelector(
                  "a[data-ac-gallery-trigger=".concat(t.id, "]")
                );
                i.setAttribute("role", r.TAB),
                  i.setAttribute(n.CONTROLS, t.id),
                  i.setAttribute(n.SELECTED, !1),
                  t.on("select", () => {
                    i.classList.add("current"),
                      i.parentElement.classList.add("current"),
                      i.setAttribute(n.SELECTED, !0);
                  }),
                  t.on("deselect", () => {
                    i.classList.remove("current"),
                      i.parentElement.classList.remove("current"),
                      i.setAttribute(n.SELECTED, !1);
                  }),
                  i.parentElement.addEventListener("click", (e) => {
                    e.preventDefault(), (this.lastInteractionEvent = e);
                    let i =
                      this.currentIndex +
                      (t.index - this.wrappedIndex(this.currentIndex));
                    this.animateToItem(i);
                  }),
                  this.dotNav.items.push(i),
                  t.el.setAttribute("role", r.TABPANEL),
                  t.el.setAttribute(n.LABELLEDBY, this.dotNav.items[e].id);
              });
          },
          mounted() {
            (this.dotNav.roamingTabIndex = new s(this.dotNav.navElement, {
              selector: "a",
            })),
              this.dotNav.roamingTabIndex.start(),
              this.dotNav.roamingTabIndex.on(
                "onSelect",
                this.dotNav.onRoamingTabIndexSelect
              );
          },
          onItemChangeCompleted(t) {
            let e = this.dotNav.items.filter(
              (e) => e.getAttribute("data-ac-gallery-trigger") === t.current.id
            )[0];
            this.setCurrentItem(e),
              this.dotNav.roamingTabIndex.setSelectedItemByIndex(
                this.wrappedIndex(this.currentIndex),
                !0
              );
          },
          setCurrentItem(t) {
            t !== this.dotNav.current && (this.dotNav.current = t);
          },
        };
      },
      { 15: 15, 18: 18, 3: 3 },
    ],
    193: [
      function (t, e, i) {
        "use strict";
        const s = t(173),
          n = t(114);
        e.exports = {
          mounted() {
            this.el.classList.remove("peeking"),
              this._items.forEach((t) => {
                t.measure(),
                  (t.x = 0),
                  (t.zIndex = t === this.currentItem ? 2 : 0);
              }),
              this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                gallery: this,
                previous: null,
                current: this.currentItem,
              });
          },
          animateToItem(t) {
            if (
              this.currentIndex === t ||
              this.currentIndex === this.wrappedIndex(t)
            )
              return;
            this.el.parentElement.scrollLeft = 0;
            let e = this.model.IsTouch ? "easeOutCubic" : "easeInOutCubic";
            this.clip &&
              this.clip._isPlaying &&
              ((e = "easeOutQuint"), this.clip.destroy());
            const i = this.selections.occurred.previous,
              r = this.selections.occurred.current,
              o = this._items[this.wrappedIndex(t)];
            (o.opacity = 0),
              i && (i.zIndex = 0),
              r && (r.zIndex = 1),
              (o.zIndex = 2);
            let a = !1;
            (this.clip = new s(this.model.Fade.duration, {
              ease: n[e],
              prepare: () =>
                this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
                  gallery: this,
                  next: o,
                }),
              update: (t) => {
                t > 0.5 &&
                  !a &&
                  ((a = !0),
                  (this.currentIndex = o.index),
                  this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                    gallery: this,
                    current: o,
                  })),
                  (o.opacity = t);
              },
              draw: () => {},
              finish: () => {
                this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                  gallery: this,
                  current: o,
                });
              },
            })),
              this.clip.play().then(() => {
                this.clip.destroy(), (this.clip = null);
              });
          },
          onResizeImmediate() {
            this.clip && (this.clip.destroy(), (this.clip = null)),
              this.resetFadeItems();
          },
          resetFadeItems() {
            this._items.forEach((t) => {
              (t.zIndex = t === this.currentItem ? 2 : 0), (t.opacity = 1);
            });
          },
          destroy() {
            this.clip && this.clip.destroy(), this.resetFadeItems();
          },
        };
      },
      { 114: 114, 173: 173 },
    ],
    194: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          beforeCreate() {
            Object.defineProperties(this, {
              currentItem: {
                configurable: !0,
                get: () => this._items[this.wrappedIndex(this.currentIndex)],
              },
            });
          },
          wrappedIndex(t) {
            return (t %= this._items.length) < 0 ? this._items.length + t : t;
          },
          getItemForTrigger(t) {
            return this._items.find((e) => e.id === t);
          },
        };
      },
      {},
    ],
    195: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          mounted() {
            const t = this._items[this.wrappedIndex(this.currentIndex)];
            this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
              gallery: this,
              next: t,
            }),
              this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                gallery: this,
                current: t,
              }),
              this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                gallery: this,
                current: t,
              });
          },
        };
      },
      {},
    ],
    196: [
      function (t, e, i) {
        "use strict";
        const s = ["INPUT", "SELECT", "TEXTAREA"];
        e.exports = {
          created() {
            (this.handleIntersect = this.handleIntersect.bind(this)),
              (this.onKeyDown = this.onKeyDown.bind(this)),
              (this.observer = new IntersectionObserver(this.handleIntersect)),
              this.observer.observe(this.el),
              (this.isInView = !1);
          },
          destroy() {
            window.removeEventListener("keydown", this.onKeyDown),
              this.observer.disconnect(),
              (this.observer = null),
              (this.isInView = !1);
          },
          handleIntersect(t) {
            t.forEach((t) => {
              (this.isInView = t.isIntersecting),
                t.isIntersecting
                  ? window.addEventListener("keydown", this.onKeyDown)
                  : window.removeEventListener("keydown", this.onKeyDown);
            });
          },
          onKeyDown(t) {
            if ((37 !== t.keyCode && 39 !== t.keyCode) || this.inputHasFocus())
              return;
            let e = this.model.IsRTL ? -1 : 1,
              i = 37 === t.keyCode ? -1 : 1;
            this.lastInteractionEvent = t;
            const s = this.currentIndex + i * e;
            this.animateToItem(s);
          },
          inputHasFocus: function () {
            return -1 !== s.indexOf(document.activeElement.nodeName);
          },
        };
      },
      {},
    ],
    197: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          beforeCreate() {
            document.body._animInfo &&
              ((this.anim = document.body._animInfo.group.anim),
              (this.model.pageMetrics = this.anim.model.pageMetrics));
          },
          addKeyframe(t) {
            const e = t.el || this.el;
            return (t.group || this.anim).addKeyframe(e, t);
          },
          addDiscreteEvent(t) {
            t.event = t.event || "Generic-Event-Name-" + tmpUUID++;
            let e = void 0 !== t.end && t.end !== t.start;
            const i = this.addKeyframe(t);
            return (
              e
                ? (t.onEnterOnce &&
                    i.controller.once(t.event + ":enter", t.onEnterOnce),
                  t.onExitOnce &&
                    i.controller.once(t.event + ":exit", t.onExitOnce),
                  t.onEnter && i.controller.on(t.event + ":enter", t.onEnter),
                  t.onExit && i.controller.on(t.event + ":exit", t.onExit))
                : (t.onEventOnce && i.controller.once(t.event, t.onEventOnce),
                  t.onEventReverseOnce &&
                    i.controller.once(
                      t.event + ":reverse",
                      t.onEventReverseOnce
                    ),
                  t.onEvent && i.controller.on(t.event, t.onEvent),
                  t.onEventReverse &&
                    i.controller.on(t.event + ":reverse", t.onEventReverse)),
              i
            );
          },
          addRAFLoop(t) {
            let e = ["start", "end"];
            if (!e.every((e) => t.hasOwnProperty(e)))
              return void console.log(
                "BubbleGum.BaseComponent::addRAFLoop required options are missing: " +
                  e.join(" ")
              );
            const i = new RAFEmitter.create();
            i.on("update", t.onUpdate || noop),
              i.on("draw", t.onDraw || noop),
              i.on("draw", () => i.run());
            const { onEnter: s, onExit: n } = t;
            return (
              (t.onEnter = () => {
                i.run(), s && s();
              }),
              (t.onExit = () => {
                i.cancel(), n && n();
              }),
              this.addDiscreteEvent(t)
            );
          },
          addContinuousEvent(t) {
            t.onDraw ||
              console.log(
                "BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"
              ),
              (t.event = t.event || "Generic-Event-Name-" + tmpUUID++);
            let e = this.addKeyframe(t);
            return e.controller.on(t.event, t.onDraw), e;
          },
        };
      },
      {},
    ],
    198: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          onItemChangeOccurred(t) {
            const { previous: e, current: i } = this.selections.occurred;
            e && e !== i && e.deselect(), i.select();
          },
        };
      },
      {},
    ],
    199: [
      function (t, e, i) {
        "use strict";
        const s = t(8),
          n = t(13);
        e.exports = {
          itemsCreated(t) {
            this._items.forEach((t, e) => {
              e === this.wrappedIndex(this.currentIndex) ? n(t.el) : s(t.el);
            });
          },
          onItemChangeCompleted(t) {
            const { previous: e, current: i } = this.selections.completed;
            e && e !== i && s(e.el), n(i.el);
          },
        };
      },
      { 13: 13, 8: 8 },
    ],
    200: [
      function (t, e, i) {
        "use strict";
        const s = t(3),
          n = t(15),
          r = t(18);
        e.exports = {
          created() {
            this.tabNav = { items: [], current: null };
          },
          itemsCreated() {
            Array.from(
              this.el.querySelectorAll(this.model.TabNav.ItemSelector)
            ).forEach((t, e) => {
              const i = new o(t, e),
                s = this.getItemForTrigger(i.trigger);
              (i.onSelected = (t) => {
                (this.lastInteractionEvent = t), t.preventDefault();
                let i = e - this.wrappedIndex(this.currentIndex),
                  s = this.currentIndex + i;
                this.animateToItem(s);
              }),
                s.on("select", () => {
                  t.classList.add("current"),
                    i.anchorEl.classList.add("current");
                }),
                s.on("deselect", () => {
                  t.classList.remove("current"),
                    i.anchorEl.classList.remove("current");
                }),
                i.anchorEl.addEventListener("click", i.onSelected),
                this.tabNav.items.push(i);
            }),
              this._items.forEach((t, e) => {
                t.el.setAttribute("role", r.TABPANEL),
                  t.el.setAttribute(
                    n.LABELLEDBY,
                    this.tabNav.items[e].anchorEl.id
                  ),
                  this.tabNav.items[e].anchorEl.setAttribute(
                    n.CONTROLS,
                    t.el.id
                  );
              });
          },
          mounted() {
            const t = this.tabNav.items[0].el.parentElement;
            this.roamingTabIndex = new s(t, {
              selector: this.model.TabNav.RoamingTabIndexSelector,
            });
          },
          onItemChangeCompleted(t) {
            let e = this.tabNav.items.filter(
              (e) => e.trigger === t.current.id
            )[0];
            this.setCurrentItem(e),
              this.roamingTabIndex.setSelectedItemByIndex(e.index, !0),
              document.activeElement.parentElement.parentElement ===
                e.el.parentElement && e.anchorEl.focus();
          },
          setCurrentItem(t) {
            t !== this.tabNav.current && (this.tabNav.current = t);
          },
        };
        class o {
          constructor(t, e) {
            (this.el = t),
              (this.index = e),
              (this.anchorEl = t.querySelector("a")),
              (this.trigger = this.anchorEl.getAttribute(
                "data-ac-gallery-trigger"
              )),
              this.anchorEl.setAttribute("role", r.TAB);
          }
        }
      },
      { 15: 15, 18: 18, 3: 3 },
    ],
    201: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          beforeCreate() {
            this.selections = {
              initiated: { current: null, previous: null },
              occurred: { current: null, previous: null },
              completed: { current: null, previous: null },
            };
          },
          onItemChangeInitiated(t) {
            (this.selections.initiated.previous =
              this.selections.initiated.current),
              (this.selections.initiated.current =
                this.selections.initiated.next),
              (this.selections.initiated.next = t.next);
          },
          onItemChangeOccurred(t) {
            (this.selections.occurred.previous = t.previous =
              this.selections.occurred.current),
              (this.selections.occurred.current = t.current);
          },
          onItemChangeCompleted(t) {
            (this.selections.completed.previous = t.previous =
              this.selections.completed.current),
              (this.selections.completed.current = t.current);
          },
        };
      },
      {},
    ],
    202: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          PICTURE_DATA_DOWNLOAD_AREA_KEYFRAME: "data-download-area-keyframe",
          PICTURE_DATA_LAZY: "data-lazy",
          PICTURE_DATA_EMPTY_SOURCE: "data-empty",
          PICTURE_DATA_LOADED: "data-picture-loaded",
          PICTURE_CLASS_LOADED: "loaded",
        };
      },
      {},
    ],
    203: [
      function (t, e, i) {
        "use strict";
        const s = t(202).PICTURE_CLASS_LOADED,
          n = t(202).PICTURE_DATA_LOADED,
          r = t(202).PICTURE_DATA_EMPTY_SOURCE;
        e.exports =
          ((window.__pictureElementInstancesLoaded = new Map()),
          void (window.__lp = function (t) {
            const e = t.target.parentElement;
            e.querySelector("[".concat(r, "]"))
              ? t.stopImmediatePropagation()
              : (e.classList.add("".concat(s)),
                e.setAttribute("".concat(n), ""),
                window.__pictureElementInstancesLoaded.set(e.id, e),
                (t.target.onload = null));
          }));
      },
      { 202: 202 },
    ],
    204: [
      function (t, e, i) {
        "use strict";
        const s = t(202).PICTURE_DATA_LAZY,
          n = t(202).PICTURE_DATA_EMPTY_SOURCE,
          r = t(202).PICTURE_DATA_DOWNLOAD_AREA_KEYFRAME;
        e.exports = class {
          constructor(t = {}) {
            (this.options = t), this._init();
          }
          _init() {
            (this._pictures = Array.from(
              document.querySelectorAll("*[".concat(s, "]"))
            )),
              (this.AnimSystem = this._findAnim()),
              null !== this.AnimSystem &&
                (this._injectSources(),
                this._addKeyframesToImages(),
                this._addMethodsToPictures());
          }
          _addMethodsToPictures() {
            this._pictures.forEach((t) => {
              t.forceLoad = () => {
                this._downloadImage(t);
              };
            });
          }
          _injectSources() {
            this._pictures.forEach((t) => {
              const e = t.nextElementSibling;
              if (e && "NOSCRIPT" === e.nodeName) {
                const i = t.querySelector("img"),
                  s = e.textContent.match(/<source .+ \/>/g);
                s && i.insertAdjacentHTML("beforebegin", s.join(""));
              }
            });
          }
          _defineKeyframeOptions(t) {
            const e = t.getAttribute(r) || "{}";
            return Object.assign(
              {},
              {
                start: "t - 200vh",
                end: "b + 100vh",
                event: "PictureLazyLoading",
              },
              JSON.parse(e)
            );
          }
          _addKeyframesToImages() {
            this._pictures.forEach((t) => {
              (t.__scrollGroup = this.AnimSystem.getGroupForTarget(
                document.body
              )),
                this.AnimSystem.getGroupForTarget(t) &&
                  (t.__scrollGroup = this.AnimSystem.getGroupForTarget(t));
              let e = this._defineKeyframeOptions(t);
              t.__scrollGroup
                .addKeyframe(t, e)
                .controller.once("PictureLazyLoading:enter", () => {
                  this._imageIsInLoadRange(t);
                });
            });
          }
          _imageIsInLoadRange(t) {
            t.querySelector("img") && this._downloadImage(t);
          }
          _downloadImage(t) {
            const e = t.querySelector("[".concat(n, "]"));
            e && t.removeChild(e);
          }
          _findAnim() {
            var t = Array.from(
              document.querySelectorAll(
                "[data-anim-group],[data-anim-scroll-group],[data-anim-time-group]"
              )
            );
            return (
              t
                .map((t) => (t._animInfo ? t._animInfo.group : null))
                .filter((t) => null !== t),
              t[0] && t[0]._animInfo
                ? t[0]._animInfo.group.anim
                : (console.error(
                    "PictureLazyLoading: AnimSystem not found, please initialize anim before instantiating"
                  ),
                  null)
            );
          }
        };
      },
      { 202: 202 },
    ],
    205: [
      function (t, e, i) {
        "use strict";
        const s = t(204),
          n = t(203);
        e.exports = { PictureLazyLoading: s, PictureHead: n };
      },
      { 203: 203, 204: 204 },
    ],
    206: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          lerp: function (t, e, i) {
            return e + (i - e) * t;
          },
          map: function (t, e, i, s, n) {
            return s + ((n - s) * (t - e)) / (i - e);
          },
          mapClamp: function (t, e, i, s, n) {
            var r = s + ((n - s) * (t - e)) / (i - e);
            return Math.max(s, Math.min(n, r));
          },
          norm: function (t, e, i) {
            return (t - e) / (i - e);
          },
          clamp: function (t, e, i) {
            return Math.max(e, Math.min(i, t));
          },
          randFloat: function (t, e) {
            return Math.random() * (e - t) + t;
          },
          randInt: function (t, e) {
            return Math.floor(Math.random() * (e - t) + t);
          },
        };
      },
      {},
    ],
    207: [
      function (t, e, i) {
        "use strict";
        var s = t(49).EventEmitterMicro,
          n = t(89),
          r = "viewport-emitter",
          o = { removeNamespace: !0 },
          a = "data-viewport-emitter-dispatch",
          l = "data-viewport-emitter-state",
          h =
            "only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)",
          c = "only screen and (orientation: portrait)",
          u = "only screen and (orientation: landscape)",
          d = "change:any",
          m = "change:orientation",
          p = "change:retina",
          f = "change:viewport";
        function _(t, e) {
          s.call(this),
            (this._id = t || r),
            (this._options = Object.assign({}, o, e)),
            (this._allowDOMEventDispatch = !1),
            (this._allowElementStateData = !1),
            (this._options.removeNamespace =
              "boolean" != typeof this._options.removeNamespace ||
              this._options.removeNamespace),
            (this._el = this._initViewportEl(this._id)),
            (this._resizing = !1),
            (this._mediaQueryLists = {
              resolution: { retina: window.matchMedia(h) },
              orientation: {
                portrait: window.matchMedia(c),
                landscape: window.matchMedia(u),
              },
            }),
            (this._viewport = this._getViewport(this._options.removeNamespace)),
            (this._retina = this._getRetina(
              this._mediaQueryLists.resolution.retina
            )),
            (this._orientation = this._initOrientation()),
            this._addListeners(),
            this._updateElementStateData();
        }
        Object.defineProperty(_, "DOM_DISPATCH_ATTRIBUTE", {
          get: function () {
            return a;
          },
        }),
          Object.defineProperty(_, "DOM_STATE_ATTRIBUTE", {
            get: function () {
              return l;
            },
          });
        var g = (_.prototype = Object.create(s.prototype));
        Object.defineProperty(g, "id", {
          get: function () {
            return this._id;
          },
        }),
          Object.defineProperty(g, "element", {
            get: function () {
              return this._el;
            },
          }),
          Object.defineProperty(g, "mediaQueryLists", {
            get: function () {
              return this._mediaQueryLists;
            },
          }),
          Object.defineProperty(g, "viewport", {
            get: function () {
              return this._viewport;
            },
          }),
          Object.defineProperty(g, "retina", {
            get: function () {
              return this._retina;
            },
          }),
          Object.defineProperty(g, "orientation", {
            get: function () {
              return this._orientation;
            },
          }),
          Object.defineProperty(g, "hasDomDispatch", {
            get: function () {
              return this._allowDOMEventDispatch;
            },
          }),
          (g.destroy = function () {
            for (var t in (this._removeListeners(), this._options))
              this._options[t] = null;
            for (var e in this._mediaQueryLists) {
              var i = this._mediaQueryLists[e];
              for (var n in i) i[n] = null;
            }
            (this._id = null),
              (this._el = null),
              (this._viewport = null),
              (this._retina = null),
              (this._orientation = null),
              s.prototype.destroy.call(this);
          }),
          (g._initViewportEl = function (t) {
            var e = document.getElementById(t);
            return (
              e ||
                (((e = document.createElement("div")).id = t),
                (e = document.body.appendChild(e))),
              e.hasAttribute(a) ||
                (e.setAttribute(a, ""), (this._allowDOMEventDispatch = !0)),
              e.hasAttribute(l) || (this._allowElementStateData = !0),
              e
            );
          }),
          (g._dispatch = function (t, e) {
            var i = {
              viewport: this._viewport,
              orientation: this._orientation,
              retina: this._retina,
            };
            if (this._allowDOMEventDispatch) {
              var s = new CustomEvent(t, { detail: e }),
                n = new CustomEvent(d, { detail: i });
              this._el.dispatchEvent(s), this._el.dispatchEvent(n);
            }
            this.trigger(t, e), this.trigger(d, i);
          }),
          (g._addListeners = function () {
            (this._onOrientationChange = this._onOrientationChange.bind(this)),
              (this._onRetinaChange = this._onRetinaChange.bind(this)),
              (this._onViewportChange = this._onViewportChange.bind(this)),
              (this._onViewportChangeUpdate =
                this._onViewportChangeUpdate.bind(this)),
              this._mediaQueryLists.orientation.portrait.addListener(
                this._onOrientationChange
              ),
              this._mediaQueryLists.orientation.landscape.addListener(
                this._onOrientationChange
              ),
              this._mediaQueryLists.resolution.retina.addListener(
                this._onRetinaChange
              ),
              window.addEventListener("resize", this._onViewportChange);
          }),
          (g._removeListeners = function () {
            this._mediaQueryLists.orientation.portrait.removeListener(
              this._onOrientationChange
            ),
              this._mediaQueryLists.orientation.landscape.removeListener(
                this._onOrientationChange
              ),
              this._mediaQueryLists.resolution.retina.removeListener(
                this._onRetinaChange
              ),
              window.removeEventListener("resize", this._onViewportChange);
          }),
          (g._updateElementStateData = function () {
            if (this._allowElementStateData) {
              var t = JSON.stringify({
                viewport: this._viewport,
                orientation: this._orientation,
                retina: this._retina,
              });
              this._el.setAttribute(l, t);
            }
          }),
          (g._getViewport = function (t) {
            var e = window.getComputedStyle(this._el, "::before").content;
            return e
              ? ((e = e.replace(/["']/g, "")), t ? e.split(":").pop() : e)
              : null;
          }),
          (g._getRetina = function (t) {
            return t.matches;
          }),
          (g._getOrientation = function (t) {
            var e = this._orientation;
            if (t.matches) {
              return t.media.match(/portrait|landscape/)[0];
            }
            return e;
          }),
          (g._initOrientation = function () {
            var t = this._getOrientation(
              this._mediaQueryLists.orientation.portrait
            );
            return (
              t ||
              this._getOrientation(this._mediaQueryLists.orientation.landscape)
            );
          }),
          (g._onViewportChange = function () {
            this._resizing ||
              ((this._resizing = !0), n(this._onViewportChangeUpdate));
          }),
          (g._onViewportChangeUpdate = function () {
            var t = this._viewport;
            if (
              ((this._viewport = this._getViewport(
                this._options.removeNamespace
              )),
              t !== this._viewport)
            ) {
              var e = { from: t, to: this._viewport };
              this._updateElementStateData(), this._dispatch(f, e);
            }
            this._resizing = !1;
          }),
          (g._onRetinaChange = function (t) {
            var e = this._retina;
            if (((this._retina = this._getRetina(t)), e !== this._retina)) {
              var i = { from: e, to: this._retina };
              this._updateElementStateData(), this._dispatch(p, i);
            }
          }),
          (g._onOrientationChange = function (t) {
            var e = this._orientation;
            if (
              ((this._orientation = this._getOrientation(t)),
              e !== this._orientation)
            ) {
              var i = { from: e, to: this._orientation };
              this._updateElementStateData(), this._dispatch(m, i);
            }
          }),
          (e.exports = _);
      },
      { 49: 49, 89: 89 },
    ],
    208: [
      function (t, e, i) {
        "use strict";
        var s = t(207);
        e.exports = new s();
      },
      { 207: 207 },
    ],
    209: [
      function (t, e, i) {
        "use strict";
        const s = t(97),
          n = t(29),
          r = t(31),
          o = { requestMethod: "GET", timeout: 3e4 };
        Object.freeze(o);
        const a = { response: null, xhr: null };
        Object.freeze(a);
        const l = { evt: null, xhr: null };
        Object.freeze(l);
        e.exports = class {
          static get IS_SUPPORTED() {
            const t = window.XMLHttpRequest,
              e = window.Promise;
            return t && "function" == typeof t && e && "function" == typeof e;
          }
          static isCORSRequest(t) {
            return window.location.hostname !== s(t).hostname;
          }
          constructor(t, e) {
            t || "string" == typeof t
              ? ((this._src = s(t).href),
                (this._opts = Object.assign({}, o, e)),
                (this._xhr = new XMLHttpRequest()),
                (this._promise = null),
                (this._metrics = {
                  progress: 0,
                  totalAssetSize: null,
                  time: {
                    requested: null,
                    load: { start: null, end: null, total: null },
                  },
                }),
                (this._onLoadStart = this._onLoadStart.bind(this)),
                (this._onProgress = this._onProgress.bind(this)),
                (this._rejectData = this._rejectData.bind(this)))
              : n(
                  "createXhr(src, opts), a src is required to create an XMLHttpRequest"
                );
          }
          get xhr() {
            return this._xhr;
          }
          get requestUrl() {
            return this._src;
          }
          get progress() {
            return this._metrics.progress;
          }
          get totalAssetSize() {
            return this._metrics.totalAssetSize;
          }
          get requestedAtTime() {
            return this._metrics.time.requested;
          }
          get loadStartTime() {
            return this._metrics.time.load.start;
          }
          get loadEndTime() {
            return this._metrics.time.load.end;
          }
          get totalLoadTime() {
            return this._metrics.time.load.total;
          }
          open() {
            0 === this._xhr.readyState &&
              (this._xhr.open(
                this._opts.requestMethod,
                this._src,
                !0,
                this._opts.user,
                this._opts.password
              ),
              this._setXhrProps(),
              r("XmlHttpRequest opened and properties set"));
          }
          send(t) {
            return (
              (t = void 0 === t ? null : t),
              this._promise
                ? this._promise
                : (this._promise = new Promise((e, i) => {
                    (this._xhr.onprogress = this._onProgress),
                      (this._xhr.onloadstart = this._onLoadStart),
                      (this._xhr.onload = (t) => this._onLoad(e, i, t)),
                      (this._xhr.ontimeout = (t) => this._rejectData(i, t)),
                      (this._xhr.onerror = (t) => this._rejectData(i, t)),
                      (this._xhr.onabort = (t) => this._rejectData(i, t)),
                      (this._metrics.time.requested = Date.now()),
                      this._xhr.send(t),
                      r("XmlHttpRequest sent");
                  }))
            );
          }
          destroy() {
            return (
              4 !== this._xhr.readyState && this._xhr.abort(),
              (this._promise = this._promise || Promise.resolve()),
              this._promise
                .then(
                  () => {
                    this._nullifyConstructorProps();
                  },
                  () => {
                    this._nullifyConstructorProps();
                  }
                )
                .then(() => Promise.resolve())
            );
          }
          _nullifyConstructorProps() {
            (this._src = null),
              (this._metrics = {
                progress: null,
                totalAssetSize: null,
                time: {
                  requested: null,
                  load: { start: null, end: null, total: null },
                },
              });
          }
          _calcTotalLoadTime() {
            (this._metrics.time.load.end = Date.now()),
              (this._metrics.time.load.total =
                this._metrics.time.load.end - this._metrics.time.load.start);
          }
          _setXhrProps() {
            Object.keys(this._opts).forEach((t) => {
              t in this._xhr &&
                "function" != typeof this._xhr[t] &&
                (this._xhr[t] = this._opts[t]);
            });
          }
          _onLoadStart() {
            (this._metrics.time.load.start = Date.now()),
              (this._metrics.progress = 0),
              r("XmlHttpRequest loading");
          }
          _onLoad(t, e, i) {
            if (200 !== this._xhr.status) return this._rejectData(e, i);
            this._calcTotalLoadTime();
            const s = Object.assign({}, a, {
              response: this._xhr.response,
              xhr: this._xhr,
            });
            return r("XmlHttpRequest loaded"), t(s);
          }
          _onProgress(t) {
            this._metrics.totalAssetSize ||
              (this._metrics.totalAssetSize = t.total),
              (this._metrics.progress = t.total ? t.loaded / t.total : 0);
          }
          _rejectData(t, e) {
            const i = Object.assign({}, l, { evt: e, xhr: this._xhr });
            return n("XhrRequest failed due to", i), t(i);
          }
        };
      },
      { 29: 29, 31: 31, 97: 97 },
    ],
    210: [
      function (t, e, i) {
        "use strict";
        e.exports = function () {
          var t = new Float32Array(16);
          return (
            (t[0] = 1),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = 1),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = 1),
            (t[11] = 0),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = 0),
            (t[15] = 1),
            t
          );
        };
      },
      {},
    ],
    211: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t, e, i) {
          var s = Math.sin(i),
            n = Math.cos(i),
            r = e[4],
            o = e[5],
            a = e[6],
            l = e[7],
            h = e[8],
            c = e[9],
            u = e[10],
            d = e[11];
          e !== t &&
            ((t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[12] = e[12]),
            (t[13] = e[13]),
            (t[14] = e[14]),
            (t[15] = e[15]));
          return (
            (t[4] = r * n + h * s),
            (t[5] = o * n + c * s),
            (t[6] = a * n + u * s),
            (t[7] = l * n + d * s),
            (t[8] = h * n - r * s),
            (t[9] = c * n - o * s),
            (t[10] = u * n - a * s),
            (t[11] = d * n - l * s),
            t
          );
        };
      },
      {},
    ],
    212: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t, e, i) {
          var s = Math.sin(i),
            n = Math.cos(i),
            r = e[0],
            o = e[1],
            a = e[2],
            l = e[3],
            h = e[8],
            c = e[9],
            u = e[10],
            d = e[11];
          e !== t &&
            ((t[4] = e[4]),
            (t[5] = e[5]),
            (t[6] = e[6]),
            (t[7] = e[7]),
            (t[12] = e[12]),
            (t[13] = e[13]),
            (t[14] = e[14]),
            (t[15] = e[15]));
          return (
            (t[0] = r * n - h * s),
            (t[1] = o * n - c * s),
            (t[2] = a * n - u * s),
            (t[3] = l * n - d * s),
            (t[8] = r * s + h * n),
            (t[9] = o * s + c * n),
            (t[10] = a * s + u * n),
            (t[11] = l * s + d * n),
            t
          );
        };
      },
      {},
    ],
    213: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t, e, i) {
          var s = Math.sin(i),
            n = Math.cos(i),
            r = e[0],
            o = e[1],
            a = e[2],
            l = e[3],
            h = e[4],
            c = e[5],
            u = e[6],
            d = e[7];
          e !== t &&
            ((t[8] = e[8]),
            (t[9] = e[9]),
            (t[10] = e[10]),
            (t[11] = e[11]),
            (t[12] = e[12]),
            (t[13] = e[13]),
            (t[14] = e[14]),
            (t[15] = e[15]));
          return (
            (t[0] = r * n + h * s),
            (t[1] = o * n + c * s),
            (t[2] = a * n + u * s),
            (t[3] = l * n + d * s),
            (t[4] = h * n - r * s),
            (t[5] = c * n - o * s),
            (t[6] = u * n - a * s),
            (t[7] = d * n - l * s),
            t
          );
        };
      },
      {},
    ],
    214: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t, e, i) {
          var s = i[0],
            n = i[1],
            r = i[2];
          return (
            (t[0] = e[0] * s),
            (t[1] = e[1] * s),
            (t[2] = e[2] * s),
            (t[3] = e[3] * s),
            (t[4] = e[4] * n),
            (t[5] = e[5] * n),
            (t[6] = e[6] * n),
            (t[7] = e[7] * n),
            (t[8] = e[8] * r),
            (t[9] = e[9] * r),
            (t[10] = e[10] * r),
            (t[11] = e[11] * r),
            (t[12] = e[12]),
            (t[13] = e[13]),
            (t[14] = e[14]),
            (t[15] = e[15]),
            t
          );
        };
      },
      {},
    ],
    215: [
      function (t, e, i) {
        "use strict";
        const s = t(164),
          n = t(185),
          r = t(191),
          o = t(193),
          a = t(200),
          l = t(196),
          h = t(198),
          c = t(188),
          u = t(192),
          d = t(219);
        e.exports = class extends s {
          constructor(t) {
            super(t);
            const e = {
              beforeCreate() {
                (this.model.PrefersReducedMotion =
                  document.documentElement.classList.contains(
                    "reduced-motion"
                  )),
                  (this.model.IsRTL =
                    "rtl" === document.documentElement.getAttribute("dir")),
                  (this.model.IsTouch =
                    "ontouchstart" in document.documentElement),
                  (this.model.Fade.duration = 0.5);
              },
            };
            new (n.withMixins(e, r, o, u, a, d, l, h, c))({ el: this.el });
          }
        };
      },
      {
        164: 164,
        185: 185,
        188: 188,
        191: 191,
        192: 192,
        193: 193,
        196: 196,
        198: 198,
        200: 200,
        219: 219,
      },
    ],
    216: [
      function (t, e, i) {
        "use strict";
        const s = t(164),
          n = t(230),
          r = t(31),
          o = t(29),
          a = t(51)("breakAPI") ? 1 : 5e3;
        e.exports = class extends s {
          constructor(t) {
            super(t);
          }
          mounted() {
            (this.arcadeComponent = this.gum.getComponentOfType(
              "ArcadeTileComponent",
              this.el
            )),
              this.init();
          }
          init() {
            const t = "APIQuery on element #".concat(this.el.id),
              e = this.el.dataset.locale,
              i = this.el.dataset.lang,
              s = document
                .querySelector('meta[property="apple-arcade-token"]')
                .getAttribute("content"),
              r = {
                url: ""
                  .concat("https://amp-api.apps.apple.com", "/v1/editorial/")
                  .concat(e, "/rooms/1565192533?l=")
                  .concat(i, "&platform=")
                  .concat("iphone")
                  .concat(
                    "&sparseLimit[contents]=19&limit[contents]=19&fields=artwork"
                  ),
                timeOut: a,
                componentName: t,
                headers: { Authorization: "Bearer " + s },
              };
            this.anim.addEvent(this.el, {
              start: "t - 250vh",
              end: "b + 150vh",
              event: "init-arcade-tile",
              onEnterOnce: () => {
                n(r)
                  .then((t) => this.handleRequestSuccess(t))
                  .catch((t) => {
                    o(t), this.destroy();
                  });
              },
            });
          }
          handleRequestSuccess(t) {
            r(t.message);
            try {
              const e = t.response.data[0].relationships.contents.data;
              try {
                this.arcadeComponent.init(e);
              } catch (t) {
                o(t), this.arcadeComponent.destroy();
              }
            } catch (t) {
              o(t), this.destroy();
            }
          }
          destroy() {
            this.arcadeComponent.destroy();
          }
        };
      },
      { 164: 164, 230: 230, 29: 29, 31: 31, 51: 51 },
    ],
    217: [
      function (t, e, i) {
        "use strict";
        const s = t(164),
          n = t(31);
        e.exports = class extends s {
          constructor(t) {
            super(t), (this.gridContainer = this.el), (this.imgSize = 454);
          }
          init(t) {
            (this.games = t.slice(0, 17)),
              this.games.length >= 17
                ? this.createGridMarkup()
                : (n("not enough returned from the API to fill grid items"),
                  this.destroy());
          }
          createGridMarkup() {
            const t = this.games.reduce(
              (t, e) => (t += this.gridMarkup(e)),
              ""
            );
            this.gridContainer.innerHTML = t;
          }
          imgUrl(t, e, i) {
            return t
              .replace("{w}", this.imgSize)
              .replace("{h}", this.imgSize)
              .replace("{c}", "")
              .replace("{f}", "jpg");
          }
          gridMarkup(t) {
            const e = Object.values(t.attributes.platformAttributes)[0],
              { bgColor: i, url: s } = e.artwork;
            return '\n            <div \n                class="game" \n                style="\n                    background-color: #'
              .concat(i, ";\n                    background-image:url(")
              .concat(
                this.imgUrl(s),
                ');\n                "\n            ></div>\n        '
              );
          }
          destroy() {
            this.el.closest(".arcade-dynamic").classList.add("hide");
          }
        };
      },
      { 164: 164, 31: 31 },
    ],
    218: [
      function (t, e, i) {
        "use strict";
        e.exports = class {
          constructor(t) {
            (this.tryItFreeLink = t), this._updateTryItFreeLink();
          }
          _updateTryItFreeLink() {
            this.tryItFreeLink.removeAttribute("data-analytics-click"),
              this.tryItFreeLink.removeAttribute(
                "data-analytics-intrapage-link"
              ),
              this.tryItFreeLink.setAttribute(
                "data-rid-relay",
                '{"288":"itsct"}'
              ),
              this.tryItFreeLink.setAttribute("data-analytics-exit-link", "");
          }
        };
      },
      {},
    ],
    219: [
      function (t, e, i) {
        "use strict";
        const s = t(89),
          n = t(85),
          r = t(15),
          o = t(8),
          a = t(13);
        e.exports = {
          itemsCreated() {
            this.captionContainer = this.el.querySelector(
              ".gallery-captions-container"
            );
            const t = this.captionContainer
              ? this.captionContainer.querySelectorAll(".gallery-caption")
              : null;
            t &&
              (this._items.forEach((e, i) => {
                (e.caption = { el: t[i], height: 0 }),
                  o(e.caption.el),
                  e.el.setAttribute(r.DESCRIBEDBY, e.caption.el.id),
                  e.on("select", () => {
                    e.caption.el.classList.add("current"),
                      a(e.caption.el),
                      this.setCaptionContainerHeight(e);
                  }),
                  e.on("deselect", () => {
                    e.caption.el.classList.remove("current"), o(e.caption.el);
                  });
              }),
              this.measureCaptions());
          },
          mounted() {
            window.addEventListener("resize:text-zoom", () => {
              this.measureCaptions(),
                this.setCaptionContainerHeight(
                  this._items[this.wrappedIndex(this.currentIndex)]
                );
            });
          },
          measureCaptions() {
            s(() => {
              this._items.forEach(
                (t) => (t.caption.height = t.caption.el.clientHeight)
              );
            });
          },
          setCaptionContainerHeight(t) {
            n(() => {
              this.captionContainer.style.height = "".concat(
                t.caption.height,
                "px"
              );
            });
          },
          onResizeDebounced() {
            this.measureCaptions(),
              this.setCaptionContainerHeight(
                this._items[this.wrappedIndex(this.currentIndex)]
              );
          },
        };
      },
      { 13: 13, 15: 15, 8: 8, 85: 85, 89: 89 },
    ],
    220: [
      function (t, e, i) {
        "use strict";
        const s = t(173),
          n = t(114);
        e.exports = {
          mounted() {
            this.el.classList.remove("peeking"),
              this._items.forEach((t) => {
                t.measure(),
                  (t.x = 0),
                  (t.zIndex = t === this.currentItem ? 2 : 0),
                  (t.opacity = t === this.currentItem ? 1 : 0),
                  (t.el.style.visibility =
                    t === this.currentItem ? "visible" : "hidden");
              }),
              this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                gallery: this,
                previous: null,
                current: this.currentItem,
              });
          },
          animateToItem(t) {
            if (
              this.currentIndex === t ||
              this.currentIndex === this.wrappedIndex(t)
            )
              return;
            this.el.parentElement.scrollLeft = 0;
            let e = this.model.IsTouch ? "easeOutCubic" : "easeInOutCubic";
            this.clip &&
              this.clip._isPlaying &&
              ((e = "easeOutQuint"), this.clip.destroy());
            const i = this.selections.occurred.previous,
              r = this.selections.occurred.current,
              o = this._items[this.wrappedIndex(t)];
            (o.opacity = 0),
              i && (i.zIndex = 0),
              r && (r.zIndex = 1),
              (o.zIndex = 2);
            let a = !1;
            (this.clip = new s(this.model.Fade.duration, {
              ease: n[e],
              prepare: () => {
                this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
                  gallery: this,
                  next: o,
                }),
                  this._items.forEach((t) => {
                    t.el.style.visibility = (this.currentItem, "visible");
                  });
              },
              update: (t) => {
                t > 0.5 &&
                  !a &&
                  ((a = !0),
                  (this.currentIndex = o.index),
                  this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                    gallery: this,
                    current: o,
                  })),
                  (o.opacity = t);
              },
              draw: () => {},
              finish: () => {
                this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                  gallery: this,
                  current: o,
                });
              },
            })),
              this.clip.play().then(() => {
                this._items.forEach((t) => {
                  t.el.style.visibility =
                    t === this.currentItem ? "visible" : "hidden";
                }),
                  this.clip.destroy(),
                  (this.clip = null);
              });
          },
          onResizeImmediate() {
            this.clip && (this.clip.destroy(), (this.clip = null)),
              this.resetFadeItems();
          },
          resetFadeItems() {
            this._items.forEach((t) => {
              (t.zIndex = t === this.currentItem ? 2 : 0),
                (t.opacity = t === this.currentItem ? 1 : 0);
            });
          },
          destroy() {
            this.clip && this.clip.destroy(), this.resetFadeItems();
          },
        };
      },
      { 114: 114, 173: 173 },
    ],
    221: [
      function (t, e, i) {
        "use strict";
        const s = t(89),
          n = t(85);
        e.exports = {
          itemsCreated() {
            this.tablesContainer = this.el.querySelector(".item-container");
            const t = this.tablesContainer.querySelectorAll(".gallery-item");
            this._items.forEach((e, i) => {
              e.table = { el: t[i], height: 0 };
            });
          },
          mounted() {
            (this.galleryItemNotebooks = document.querySelector(
              ".gallery-item.notebooks"
            )),
              window.addEventListener("resize:text-zoom", () => {
                this.measureTables(),
                  clearTimeout(this.resizeTimer),
                  (this.resizeTimer = setTimeout(() => {
                    const t = this._items[this.currentIndex];
                    t.table.height !== this.tablesContainer.clientHeight &&
                      this.setTableContainerHeight(t);
                  }, 800));
              });
          },
          onItemChangeInitiated() {
            const t = this.selections.initiated.next,
              e = this.selections.initiated.next.prev;
            this.measureTables(),
              this.setTableContainerHeight(t),
              this._items.forEach((t) =>
                t.table.el.classList.remove("current")
              ),
              this.setPreviousItemOpacity(e),
              t.table.el.classList.add("current");
          },
          measureTables() {
            s(() => {
              this._items.forEach(
                (t) => (t.table.height = t.table.el.clientHeight)
              );
            });
          },
          setTableContainerHeight(t) {
            n(() => {
              this.tablesContainer.style.height = "".concat(
                t.table.height,
                "px"
              );
            });
          },
          setPreviousItemOpacity(t) {
            t.table.el.style.opacity = 0;
          },
          onResizeDebounced() {
            this.measureTables(),
              this.setTableContainerHeight(this._items[this.currentIndex]);
            const t = 0 === this.currentIndex ? 1 : 0;
            this.setPreviousItemOpacity(this._items[t]);
          },
          onBreakpointChange() {
            this.onResizeDebounced();
          },
        };
      },
      { 85: 85, 89: 89 },
    ],
    222: [
      function (t, e, i) {
        "use strict";
        const s = t(164),
          n = t(185),
          r = t(191),
          o = t(220),
          a = t(200),
          l = t(196),
          h = t(198),
          c = t(188),
          u = t(221);
        e.exports = class extends s {
          constructor(t) {
            super(t);
            let e = this.anim;
            const i = {
              beforeCreate() {
                (this.model.PrefersReducedMotion =
                  document.documentElement.classList.contains(
                    "reduced-motion"
                  )),
                  (this.model.IsRTL =
                    "rtl" === document.documentElement.getAttribute("dir")),
                  (this.model.IsTouch =
                    "ontouchstart" in document.documentElement),
                  (this.model.Fade.duration = 0.5),
                  window.location.search.includes("compare=desktop") &&
                    (this.currentIndex = 1);
              },
              mounted() {
                requestAnimationFrame(() => {
                  e.forceUpdate();
                });
              },
            };
            new (n.withMixins(i, r, o, u, a, l, h, c))({ el: this.el });
          }
        };
      },
      {
        164: 164,
        185: 185,
        188: 188,
        191: 191,
        196: 196,
        198: 198,
        200: 200,
        220: 220,
        221: 221,
      },
    ],
    223: [
      function (t, e, i) {
        "use strict";
        const s = t(64).createStandardModal,
          n = t(89),
          r = t(85);
        e.exports = class {
          constructor(t, e) {
            (this.button = t),
              this.button.setAttribute(
                "data-analytics-click",
                "prop3: try it free modal"
              ),
              (this._openModal = this._openModal.bind(this)),
              n(() => {
                const t = e.getAttribute("data-modal-close-label");
                r(() => {
                  this.modal = s(e);
                  const i = (this.element = this.modal.modalElement);
                  this.element.classList.add("modal-notify"),
                    t && this.modal.closeButton.setAttribute("aria-label", t),
                    this.element.setAttribute(
                      "aria-labelledby",
                      "modal-notify-headline"
                    ),
                    (this.element.tabIndex = -1),
                    (this.modal._giveModalFocus = function () {
                      this.modalElement.removeAttribute("aria-hidden"),
                        (this._activeElement = document.activeElement),
                        r(() => i.focus()),
                        this._circularTab.start();
                    }),
                    this._onDeepLinkLoad();
                });
              }),
              this._addLinkEvents();
          }
          _onDeepLinkLoad() {
            const t = window.location.hash;
            new RegExp("#notify-me", "i").test(t) && this._openModal();
          }
          _addLinkEvents() {
            r(() => this.button.setAttribute("role", "button")),
              this.button.addEventListener("click", this._openModal, !0);
          }
          _openModal(t) {
            t && t.preventDefault(),
              r(() => {
                this.modal.open();
              });
          }
        };
      },
      { 64: 64, 85: 85, 89: 89 },
    ],
    224: [
      function (t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", { value: !0 }),
          (i.default = void 0);
        const s = document.createElement("template");
        s.innerHTML =
          '\n\t<style type="text/css">\n\t\t:host {\n\t\t\tdisplay: inline-block;\n\t\t\tcursor: pointer;\n\t\t}\n\n\t\t[name^="play"],\n\t\t[name^="pause"],\n\t\t[name^="replay"],\n\t\t[name^="loading"] {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t:host(.paused) [name^="play"],\n\t\t:host(.playing) [name^="pause"],\n\t\t:host(.loading) [name^="loading"],\n\t\t:host(.replay) [name^="replay"] {\n\t\t\tdisplay: block;\n\t\t}\n\t</style>\n\t<slot name="play"></slot>\n\t<slot name="pause"></slot>\n\t<slot name="replay"></slot>\n\t<slot name="loading"></slot>\n';
        class n extends HTMLElement {
          constructor() {
            super(),
              this.attachShadow({ mode: "open" }),
              this.shadowRoot.appendChild(s.content.cloneNode(!0));
            const t = this.dataset.analyticsTitlePlay,
              e = this.dataset.analyticsTitlePause,
              i = this.dataset.analyticsTitleReplay;
            (this.attribs = {
              playing: {
                acaTitle: t,
                acaClick: "prop3:" + t,
                ariaLabel: this.dataset.ariaPlaying,
              },
              paused: {
                acaTitle: e,
                acaClick: "prop3:" + e,
                ariaLabel: this.dataset.ariaPaused,
              },
              replay: {
                acaTitle: i,
                acaClick: "prop3:" + i,
                ariaLabel: this.dataset.ariaReplay,
              },
            }),
              (this._states = ["playing", "paused", "replay", "loading"]);
          }
          static get observedAttributes() {
            return ["state", "enabled"];
          }
          attributeChangedCallback(t, e, i) {
            "state" === t && (this.state = i),
              "enabled" === t && (this.enabled = i);
          }
          set state(t) {
            this[t] && ((this._btnState = t), this[t]());
          }
          get state() {
            return this._btnState;
          }
          set enabled(t) {
            this._enabled(t);
          }
          _enabled(t) {
            "true" === t
              ? (this.setAttribute("tabindex", "0"),
                this.removeAttribute("aria-hidden"))
              : "false" === t &&
                (this.setAttribute("tabindex", "-1"),
                this.setAttribute("aria-hidden", !0));
          }
          get enabled() {
            return "maybe";
          }
          paused() {
            this.setAttributes("paused"), this.setAttribute("enabled", "true");
          }
          playing() {
            this.setAttributes("playing"), this.setAttribute("enabled", "true");
          }
          replay() {
            this.setAttributes("replay"), this.setAttribute("enabled", "true");
          }
          loading() {
            this.classList.remove(...this._states),
              this.classList.add("loading"),
              this.setAttribute("enabled", "false");
          }
          setAttributes(t) {
            this.classList.remove(...this._states),
              this.classList.add(t),
              this.setAttribute(
                "data-analytics-click",
                this.attribs[t].acaClick
              ),
              this.setAttribute(
                "data-analytics-title",
                this.attribs[t].acaTitle
              ),
              this.setAttribute("aria-label", this.attribs[t].ariaLabel);
          }
        }
        i.default = n;
      },
      {},
    ],
    225: [
      function (t, e, i) {
        "use strict";
        const s = t(164),
          n = t(19),
          r = t(226),
          o = t(208),
          a = t(227),
          l = { xlarge: 476, large: 476, medium: 342, small: 342, xsmall: 342 },
          h = { xlarge: 270, large: 270, medium: 193, small: 193, xsmall: 193 },
          c = { xlarge: 0.5, large: 0.5, medium: 0.3, small: 0.2, xsmall: 0.2 };
        e.exports = class extends s {
          constructor(t) {
            super(t),
              (this.topHoverMult = 1),
              (this.bottomHoverMult = 1),
              (this.onUpdate = this.onUpdate.bind(this)),
              (this.onDraw = this.onDraw.bind(this)),
              (this.onCollectionsResponse =
                this.onCollectionsResponse.bind(this)),
              (this.topTransform = 0),
              (this.bottomTransform = 0),
              (this.onError = this.onError.bind(this)),
              (this.measure = this.measure.bind(this)),
              (this.render = this.render.bind(this)),
              (this.controlsEl = this.el.querySelector(".controls")),
              (this.playPauseBtn =
                this.el.parentElement.querySelector("play-pause-btn")),
              (this.anchorEl = document.querySelector(
                this.el.getAttribute("data-anim-anchor")
              )),
              (this.collectionId = this.el.getAttribute("data-collection")),
              (this.watchNowText = this.el.getAttribute("data-watch-now")),
              (this.previewNowText = this.el.getAttribute("data-preview-now")),
              (this.locale = this.el.getAttribute("data-locale")),
              (this.token = this.el.getAttribute("data-figaro-token")),
              (this.country = this.el.getAttribute("data-country")),
              (this.storefront = this.el.getAttribute("data-storefront")),
              (this.version = this.el.getAttribute("data-version")),
              (this.TvPlusRouterItems = []);
          }
          handleKeyUp(t) {
            ("Enter" !== t.key &&
              13 !== t.keyCode &&
              "Space" !== t.code &&
              32 !== t.keyCode) ||
              t.target !== this.playPauseBtn ||
              this.togglePlayPauseClick(t);
          }
          togglePlayPauseClick() {
            this.paused
              ? ((this.paused = !1),
                this.playPauseBtn.setAttribute("state", "playing"))
              : ((this.paused = !0),
                this.playPauseBtn.setAttribute("state", "paused"));
          }
          mounted() {
            (this.togglePlayPauseClick = this.togglePlayPauseClick.bind(this)),
              (this.handleKeyUp = this.handleKeyUp.bind(this)),
              this.playPauseBtn.addEventListener(
                "click",
                this.togglePlayPauseClick
              ),
              this.playPauseBtn.addEventListener("keydown", this.handleKeyUp),
              this.playPauseBtn.setAttribute("enabled", "true"),
              (this.playPauseBtn.state = "playing"),
              (this.paused = !1);
            const t = { locale: this.locale, sf: this.storefront };
            this.version && (t.v = this.version),
              this.anim.addEvent(this.el, {
                start: "t - 250vh",
                end: "b + 150vh",
                event: "init-atv-tile",
                onEnterOnce: () =>
                  r(this.collectionId, t)
                    .then(this.onCollectionsResponse)
                    .catch(this.onError),
              });
          }
          cloneRow() {
            const t = this.topListEl.cloneNode(!0);
            t.classList.add("clone"), this.topRowEl.appendChild(t);
            const e = this.bottomListEl.cloneNode(!0);
            e.classList.add("clone"), this.bottomRowEl.appendChild(e);
          }
          measure() {
            (this.densityMult = o.retina ? 2 : 1),
              (this.showWidth = Math.ceil(l[o.viewport] * this.densityMult)),
              (this.showHeight = Math.ceil(h[o.viewport] * this.densityMult)),
              (this.topMaxTransform = this.topListEl
                ? -this.topListEl.offsetWidth
                : null),
              (this.topSpeed = 0.8 * c[o.viewport]),
              (this.bottomMaxTransform = this.bottomListEl
                ? -this.bottomListEl.offsetWidth
                : null),
              (this.bottomSpeed = 1 * c[o.viewport]);
          }
          onError(t) {
            this.el.parentElement.classList.add("fallback"),
              (this.el.style.display = "none"),
              this.anim.forceUpdate();
          }
          onCollectionsResponse(t) {
            const e = JSON.parse(t.response);
            document.querySelector(".tv-plus").classList.remove("fallback"),
              document.querySelector(".controls").classList.add("enhanced"),
              this.anim.forceUpdate(),
              (this.shows = e.data.shelf.items),
              (this.showCount = this.shows.length),
              this.render(),
              this.observe(),
              this.cloneRow(),
              this.setupAccessibility(),
              this.enableAccessibility(),
              this.measure(),
              this.startAnimation();
          }
          render() {
            (this.topRowEl = document.createElement("DIV")),
              (this.bottomRowEl = document.createElement("DIV")),
              (this.topListEl = document.createElement("UL")),
              (this.bottomListEl = document.createElement("UL")),
              this.topRowEl.appendChild(this.topListEl),
              this.bottomRowEl.appendChild(this.bottomListEl),
              this.topRowEl.classList.add("transform-wrapper"),
              this.topRowEl.classList.add("will-change-t"),
              this.bottomRowEl.classList.add("transform-wrapper"),
              this.bottomRowEl.classList.add("will-change-t");
            const t = Math.ceil(this.shows.length / 2);
            this.measure(),
              this.shows.forEach((e, i) => {
                const s = document.createElement("LI");
                i < t
                  ? this.topListEl.appendChild(s)
                  : this.bottomListEl.appendChild(s);
                let n = this.watchNowText.replace("{title}", ""),
                  r = this.watchNowText.replace("{title}", e.title);
                e.releaseDate &&
                  e.releaseDate > Date.now() &&
                  ((n = this.previewNowText.replace("{title}", "")),
                  (r = this.previewNowText.replace("{title}", e.title)));
                const o = "stream now - " + e.title.toLowerCase(),
                  l = a(e.images.shelfImage, this.showWidth);
                (s.style.backgroundImage = "url(" + l + ")"),
                  (s.innerHTML = '\n\t\t\t\t<a href="'
                    .concat(e.url, "?")
                    .concat(
                      this.token,
                      '" target="_blank"\n\t\t\t\t\tdata-analytics-exit-link\n\t\t\t\t\taria-label="'
                    )
                    .concat(r, '"\n\t\t\t\t\tdata-analytics-title="')
                    .concat(
                      o,
                      '">\n\t\t\t\t<h4 class="marquee-hover-content" aria-hidden="true">\n\t\t\t\t\t<span aria-hidden="true" class="marquee-cta">'
                    )
                    .concat(n, "</span>\n\t\t\t\t</h4>\n\t\t\t"));
              }),
              this.el.appendChild(this.topRowEl),
              this.el.appendChild(this.bottomRowEl);
          }
          startAnimation() {
            document.documentElement.classList.contains("reduced-motion")
              ? this.controlsEl.classList.add("hide-controls")
              : (this.anchorEl ||
                  console.error("Could not find anchor element."),
                (this.animation = this.addRAFLoop({
                  el: this.el,
                  start: "a0t - 100vh - 100w",
                  end: "b + 200vh",
                  anchors: [this.anchorEl],
                  onUpdate: this.onUpdate,
                  onDraw: this.onDraw,
                })));
          }
          onUpdate() {
            this.paused ||
              ((this.topTransform -= this.topSpeed * this.topHoverMult),
              this.topTransform < this.topMaxTransform &&
                (this.topTransform = 0),
              (this.bottomTransform -= this.bottomSpeed * this.bottomHoverMult),
              this.bottomTransform < this.bottomMaxTransform &&
                (this.bottomTransform = 0));
          }
          onDraw() {
            this.paused ||
              ((this.topRowEl.style[n.transform] =
                "translateX(" + this.topTransform + "px)"),
              (this.bottomRowEl.style[n.transform] =
                "translateX(" + this.bottomTransform + "px)"));
          }
          observe() {
            const t = () => {
              (this.paused = !0),
                this.playPauseBtn.setAttribute("state", "paused");
            };
            this.topRowEl.addEventListener("focusin", t),
              this.bottomRowEl.addEventListener("focusin", t),
              this.topRowEl.addEventListener("mouseover", () => {
                this.topHoverMult = 0.3;
              }),
              this.topRowEl.addEventListener("mouseout", () => {
                this.topHoverMult = 1;
              }),
              this.bottomRowEl.addEventListener("mouseover", () => {
                this.bottomHoverMult = 0.3;
              }),
              this.bottomRowEl.addEventListener("mouseout", () => {
                this.bottomHoverMult = 1;
              });
          }
          handleMarqueeItemIntersect(t) {
            const e = t[0],
              i = e.target;
            e.isIntersecting
              ? (i.removeAttribute("aria-hidden"),
                i
                  .querySelectorAll("a")
                  .forEach((t) => t.removeAttribute("tabindex")))
              : (i.setAttribute("aria-hidden", !0),
                i
                  .querySelectorAll("a")
                  .forEach((t) => t.setAttribute("tabindex", "-1")));
          }
          setupAccessibility() {
            const t = { root: this.el, rootMargin: "0px", threshold: 1 };
            (this.marqueeItems = Array.from(this.el.querySelectorAll("li")).map(
              (e) => ({
                el: e,
                observer: new IntersectionObserver(
                  this.handleMarqueeItemIntersect,
                  t
                ),
                anchors: e.querySelectorAll("a"),
              })
            )),
              (this.active = !1);
          }
          enableAccessibility() {
            this.marqueeItems.forEach((t) => {
              t.el.setAttribute("aria-hidden", !0),
                t.anchors.forEach((t) => t.setAttribute("tabindex", "-1")),
                t.observer.observe(t.el);
            });
          }
          disableAccessibility() {
            this.marqueeItems.forEach((t) => {
              t.el.setAttribute("aria-hidden", !0),
                t.anchors.forEach((t) => t.setAttribute("tabindex", "-1")),
                t.observer.unobserve(t.el);
            });
          }
          onBreakpointChange() {
            this.measure();
          }
          onResizeDebounced() {
            this.measure();
          }
        };
      },
      { 164: 164, 19: 19, 208: 208, 226: 226, 227: 227 },
    ],
    226: [
      function (t, e, i) {
        "use strict";
        const s = t(209),
          n = {
            caller: "web-marketing",
            ctx_dt: "river",
            sf: "143441",
            v: "54",
            pfm: "web",
            locale: "en-US",
            profile: "Full",
          };
        e.exports = function (t, e = {}) {
          const i =
              "https://uts-api-web-marketing.itunes.apple.com/uts/v3/shelves/" +
              t +
              (function (t) {
                let e = Object.entries(t).reduce(
                  (t, e) => (t += e[0] + "=" + e[1] + "&"),
                  "?"
                );
                return (e = e.substring(0, e.length - 1)), e;
              })(Object.assign(n, e)),
            r = new s(i);
          return r.open(), r.send();
        };
      },
      { 209: 209 },
    ],
    227: [
      function (t, e, i) {
        "use strict";
        e.exports = function (t, e, i = "", s = null, n = "jpg") {
          if (!t) return null;
          const r = t.width / t.height,
            o = Math.floor(e / r);
          let a = e,
            l = o;
          return (
            s > o && ((l = s), (a = s * r)),
            (a = Math.ceil(a)),
            (l = Math.ceil(l)),
            t.url
              .replace("{w}", a)
              .replace("{h}", l)
              .replace("{c}", i)
              .replace("tc.", ".")
              .replace("{f}", n)
          );
        };
      },
      {},
    ],
    228: [
      function (t, e, i) {
        "use strict";
        var s = t(52)(t(224));
        const n = t(104),
          r = t(165),
          o = t(166),
          a = t(229),
          l = t(64).createStandardModal,
          h = t("@marcom/data-relay"),
          c = t(98),
          u = t(183),
          d = t(218),
          m = t(223),
          p = (t(21), t(4)),
          f = t(102),
          _ = t(205).PictureLazyLoading,
          g = {
            initialize: function () {
              customElements.define("play-pause-btn", s.default),
                window.addEventListener("keydown", (t) => {
                  ("Space" !== t.code && 32 !== t.keyCode) ||
                    "PLAY-PAUSE-BTN" !== t.target.tagName ||
                    t.preventDefault();
                }),
                Object.assign(o, a);
              let t = document.querySelector(".main");
              const e = new r(t),
                i = document.querySelector('[data-link-type="free-trial"]');
              return (
                i && this.initializeFreeTrialLink(i),
                e.anim.on(n.model.EVENTS.ON_DOM_GROUPS_CREATED, () => {
                  new f(), new _();
                }),
                g.setupDataRelay(),
                g.setupArcadeLink(),
                g.setupChatLink(),
                p.detect(),
                this
              );
            },
            initializeFreeTrialLink(t) {
              const e = document
                .getElementById("trial-modal")
                .content.querySelector("[data-modal-content]");
              t.addEventListener("click", function (i) {
                if (
                  (i.preventDefault(),
                  document.documentElement.classList.contains("trial-support"))
                ) {
                  let e = t.getAttribute("data-trial-url");
                  window.location.href = e;
                } else l(e).open();
              });
            },
            setupArcadeLink() {
              let t = document.querySelector("#arcade-try-it-free"),
                e = document.querySelector("[data-notify-modal]"),
                i = c.os.version.major,
                s = c.os.version.minor,
                n = c.os.ios && i >= 13,
                r = c.os.osx && i >= 10 && s >= 15 && u(),
                o = c.os.osx && i >= 10 && s >= 15;
              t && (n || r || o ? new d(t) : new m(t, e));
            },
            setupDataRelay() {
              if (h) {
                let t = new h({
                  properties: {
                    customAnalyticsAttribute: "data-analytics-exit-link",
                  },
                });
                t &&
                  t.passiveTrackingOptions &&
                  (t.passiveTrackingOptions.overwriteAppMeasurementValues = !0);
              }
            },
            openNewWindow(t) {
              t.preventDefault(),
                window.open(this.href, "chat", "width=375,height=773");
            },
            setupChatLink() {
              let t = document.querySelectorAll("[data-chat-link]");
              t &&
                t.forEach((t) => {
                  t.addEventListener("click", this.openNewWindow);
                });
            },
          };
        e.exports = g.initialize();
      },
      {
        102: 102,
        104: 104,
        165: 165,
        166: 166,
        183: 183,
        205: 205,
        21: 21,
        218: 218,
        223: 223,
        224: 224,
        229: 229,
        4: 4,
        52: 52,
        64: 64,
        98: 98,
        undefined: void 0,
      },
    ],
    229: [
      function (t, e, i) {
        "use strict";
        e.exports = {
          MixinGalleryComponent: t(222),
          AppGalleryComponent: t(215),
          ArcadeAPIQuery: t(216),
          ArcadeTileComponent: t(217),
          TvPlusRiverComponent: t(225),
        };
      },
      { 215: 215, 216: 216, 217: 217, 222: 222, 225: 225 },
    ],
    230: [
      function (t, e, i) {
        "use strict";
        const s = t(209),
          n = t(31);
        e.exports = function ({
          url: t = null,
          responseType: e = "json",
          timeOut: i = 3e4,
          componentName: r = "",
          headers: o = {},
        }) {
          const a = r ? " for ".concat(r) : "";
          return new Promise((r, l) => {
            if (t) {
              const h = new s(t, { responseType: e, timeout: i });
              h.open();
              for (const t in o) h.xhr.setRequestHeader(t, o[t]);
              h.xhr.addEventListener("timeout", () => {
                l(
                  "timeout getting data"
                    .concat(a, " after ")
                    .concat(i, "ms. JSON URL = ")
                    .concat(t)
                );
              }),
                h
                  .send()
                  .then((e) => {
                    n("JSON = "),
                      n(e.response),
                      r({
                        response: e.response,
                        message: "Got data in "
                          .concat(h.totalLoadTime, "ms")
                          .concat(a, ". JSON URL = ")
                          .concat(t),
                      });
                  })
                  .catch(() => {
                    l(
                      "Error getting data".concat(a, ". JSON URL = ").concat(t)
                    );
                  });
            } else l("No data url".concat(a, ". JSON URL = ").concat(t));
          });
        };
      },
      { 209: 209, 31: 31 },
    ],
  },
  {},
  [228]
);
