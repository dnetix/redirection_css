!function (e, t, i) {
    "use strict";
    "function" == typeof define && define.amd ? define(i) : "undefined" != typeof module && module.exports ? module.exports = i() : t.exports ? t.exports = i() : t[e] = i()
}("Fingerprint2", this, function () {
    "use strict";
    var e = function (t) {
        if (!(this instanceof e)) return new e(t);
        var i = {
            swfContainerId: "fingerprintjs2",
            swfPath: "flash/compiled/FontList.swf",
            detectScreenOrientation: !0,
            sortPluginsFor: [/palemoon/i],
            userDefinedFonts: []
        };
        this.options = this.extend(t, i), this.nativeForEach = Array.prototype.forEach, this.nativeMap = Array.prototype.map
    };
    return e.prototype = {
        extend: function (e, t) {
            if (null == e) return t;
            for (var i in e) null != e[i] && t[i] !== e[i] && (t[i] = e[i]);
            return t
        }, get: function (e) {
            var t = [];
            t = this.userAgentKey(t), t = this.languageKey(t), t = this.colorDepthKey(t), t = this.pixelRatioKey(t), t = this.hardwareConcurrencyKey(t), t = this.screenResolutionKey(t), t = this.availableScreenResolutionKey(t), t = this.timezoneOffsetKey(t), t = this.sessionStorageKey(t), t = this.localStorageKey(t), t = this.indexedDbKey(t), t = this.addBehaviorKey(t), t = this.openDatabaseKey(t), t = this.cpuClassKey(t), t = this.platformKey(t), t = this.doNotTrackKey(t), t = this.pluginsKey(t), t = this.canvasKey(t), t = this.webglKey(t), t = this.adBlockKey(t), t = this.hasLiedLanguagesKey(t), t = this.hasLiedResolutionKey(t), t = this.hasLiedOsKey(t), t = this.hasLiedBrowserKey(t), t = this.touchSupportKey(t), t = this.customEntropyFunction(t);
            var i = this;
            this.fontsKey(t, function (t) {
                var a = [];
                i.each(t, function (e) {
                    var t = e.value;
                    "undefined" != typeof e.value.join && (t = e.value.join(";")), a.push(t)
                });
                var r = i.x64hash128(a.join("~~~"), 31);
                return e(r, t)
            })
        }, customEntropyFunction: function (e) {
            return "function" == typeof this.options.customFunction && e.push({
                key: "custom",
                value: this.options.customFunction()
            }), e
        }, userAgentKey: function (e) {
            return this.options.excludeUserAgent || e.push({key: "user_agent", value: this.getUserAgent()}), e
        }, getUserAgent: function () {
            return navigator.userAgent
        }, languageKey: function (e) {
            return this.options.excludeLanguage || e.push({
                key: "language",
                value: navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || ""
            }), e
        }, colorDepthKey: function (e) {
            return this.options.excludeColorDepth || e.push({key: "color_depth", value: screen.colorDepth || -1}), e
        }, pixelRatioKey: function (e) {
            return this.options.excludePixelRatio || e.push({key: "pixel_ratio", value: this.getPixelRatio()}), e
        }, getPixelRatio: function () {
            return window.devicePixelRatio || ""
        }, screenResolutionKey: function (e) {
            return this.options.excludeScreenResolution ? e : this.getScreenResolution(e)
        }, getScreenResolution: function (e) {
            var t;
            return t = this.options.detectScreenOrientation && screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height], "undefined" != typeof t && e.push({
                key: "resolution",
                value: t
            }), e
        }, availableScreenResolutionKey: function (e) {
            return this.options.excludeAvailableScreenResolution ? e : this.getAvailableScreenResolution(e)
        }, getAvailableScreenResolution: function (e) {
            var t;
            return screen.availWidth && screen.availHeight && (t = this.options.detectScreenOrientation ? screen.availHeight > screen.availWidth ? [screen.availHeight, screen.availWidth] : [screen.availWidth, screen.availHeight] : [screen.availHeight, screen.availWidth]), "undefined" != typeof t && e.push({
                key: "available_resolution",
                value: t
            }), e
        }, timezoneOffsetKey: function (e) {
            return this.options.excludeTimezoneOffset || e.push({
                key: "timezone_offset",
                value: (new Date).getTimezoneOffset()
            }), e
        }, sessionStorageKey: function (e) {
            return !this.options.excludeSessionStorage && this.hasSessionStorage() && e.push({
                key: "session_storage",
                value: 1
            }), e
        }, localStorageKey: function (e) {
            return !this.options.excludeSessionStorage && this.hasLocalStorage() && e.push({
                key: "local_storage",
                value: 1
            }), e
        }, indexedDbKey: function (e) {
            return !this.options.excludeIndexedDB && this.hasIndexedDB() && e.push({key: "indexed_db", value: 1}), e
        }, addBehaviorKey: function (e) {
            return document.body && !this.options.excludeAddBehavior && document.body.addBehavior && e.push({
                key: "add_behavior",
                value: 1
            }), e
        }, openDatabaseKey: function (e) {
            return !this.options.excludeOpenDatabase && window.openDatabase && e.push({
                key: "open_database",
                value: 1
            }), e
        }, cpuClassKey: function (e) {
            return this.options.excludeCpuClass || e.push({key: "cpu_class", value: this.getNavigatorCpuClass()}), e
        }, platformKey: function (e) {
            return this.options.excludePlatform || e.push({
                key: "navigator_platform",
                value: this.getNavigatorPlatform()
            }), e
        }, doNotTrackKey: function (e) {
            return this.options.excludeDoNotTrack || e.push({key: "do_not_track", value: this.getDoNotTrack()}), e
        }, canvasKey: function (e) {
            return !this.options.excludeCanvas && this.isCanvasSupported() && e.push({
                key: "canvas",
                value: this.getCanvasFp()
            }), e
        }, webglKey: function (e) {
            return this.options.excludeWebGL ? e : this.isWebGlSupported() ? (e.push({
                key: "webgl",
                value: this.getWebglFp()
            }), e) : e
        }, adBlockKey: function (e) {
            return this.options.excludeAdBlock || e.push({key: "adblock", value: this.getAdBlock()}), e
        }, hasLiedLanguagesKey: function (e) {
            return this.options.excludeHasLiedLanguages || e.push({
                key: "has_lied_languages",
                value: this.getHasLiedLanguages()
            }), e
        }, hasLiedResolutionKey: function (e) {
            return this.options.excludeHasLiedResolution || e.push({
                key: "has_lied_resolution",
                value: this.getHasLiedResolution()
            }), e
        }, hasLiedOsKey: function (e) {
            return this.options.excludeHasLiedOs || e.push({key: "has_lied_os", value: this.getHasLiedOs()}), e
        }, hasLiedBrowserKey: function (e) {
            return this.options.excludeHasLiedBrowser || e.push({
                key: "has_lied_browser",
                value: this.getHasLiedBrowser()
            }), e
        }, fontsKey: function (e, t) {
            return this.options.excludeJsFonts ? this.flashFontsKey(e, t) : this.jsFontsKey(e, t)
        }, flashFontsKey: function (e, t) {
            return this.options.excludeFlashFonts ? t(e) : this.hasSwfObjectLoaded() && this.hasMinFlashInstalled() ? "undefined" == typeof this.options.swfPath ? t(e) : void this.loadSwfAndDetectFonts(function (i) {
                e.push({key: "swf_fonts", value: i.join(";")}), t(e)
            }) : t(e)
        }, jsFontsKey: function (e, t) {
            var i = this;
            return setTimeout(function () {
                var a = ["monospace", "sans-serif", "serif"],
                    r = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Garamond", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"],
                    n = ["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"];
                i.options.extendedJsFonts && (r = r.concat(n)), r = r.concat(i.options.userDefinedFonts);
                var o = "mmmmmmmmmmlli", s = "72px", l = document.getElementsByTagName("body")[0],
                    h = document.createElement("div"), u = document.createElement("div"), c = {}, d = {},
                    g = function () {
                        var e = document.createElement("span");
                        return e.style.position = "absolute", e.style.left = "-9999px", e.style.fontSize = s, e.style.lineHeight = "normal", e.innerHTML = o, e
                    }, p = function (e, t) {
                        var i = g();
                        return i.style.fontFamily = "'" + e + "'," + t, i
                    }, f = function () {
                        for (var e = [], t = 0, i = a.length; t < i; t++) {
                            var r = g();
                            r.style.fontFamily = a[t], h.appendChild(r), e.push(r)
                        }
                        return e
                    }, m = function () {
                        for (var e = {}, t = 0, i = r.length; t < i; t++) {
                            for (var n = [], o = 0, s = a.length; o < s; o++) {
                                var l = p(r[t], a[o]);
                                u.appendChild(l), n.push(l)
                            }
                            e[r[t]] = n
                        }
                        return e
                    }, T = function (e) {
                        for (var t = !1, i = 0; i < a.length; i++) if (t = e[i].offsetWidth !== c[a[i]] || e[i].offsetHeight !== d[a[i]]) return t;
                        return t
                    }, S = f();
                l.appendChild(h);
                for (var x = 0, v = a.length; x < v; x++) c[a[x]] = S[x].offsetWidth, d[a[x]] = S[x].offsetHeight;
                var E = m();
                l.appendChild(u);
                for (var M = [], A = 0, y = r.length; A < y; A++) T(E[r[A]]) && M.push(r[A]);
                l.removeChild(u), l.removeChild(h), e.push({key: "js_fonts", value: M}), t(e)
            }, 1)
        }, pluginsKey: function (e) {
            return this.options.excludePlugins || (this.isIE() ? this.options.excludeIEPlugins || e.push({
                key: "ie_plugins",
                value: this.getIEPlugins()
            }) : e.push({key: "regular_plugins", value: this.getRegularPlugins()})), e
        }, getRegularPlugins: function () {
            for (var e = [], t = 0, i = navigator.plugins.length; t < i; t++) e.push(navigator.plugins[t]);
            return this.pluginsShouldBeSorted() && (e = e.sort(function (e, t) {
                return e.name > t.name ? 1 : e.name < t.name ? -1 : 0
            })), this.map(e, function (e) {
                var t = this.map(e, function (e) {
                    return [e.type, e.suffixes].join("~")
                }).join(",");
                return [e.name, e.description, t].join("::")
            }, this)
        }, getIEPlugins: function () {
            var e = [];
            if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window) {
                var t = ["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"];
                e = this.map(t, function (e) {
                    try {
                        return new ActiveXObject(e), e
                    } catch (t) {
                        return null
                    }
                })
            }
            return navigator.plugins && (e = e.concat(this.getRegularPlugins())), e
        }, pluginsShouldBeSorted: function () {
            for (var e = !1, t = 0, i = this.options.sortPluginsFor.length; t < i; t++) {
                var a = this.options.sortPluginsFor[t];
                if (navigator.userAgent.match(a)) {
                    e = !0;
                    break
                }
            }
            return e
        }, touchSupportKey: function (e) {
            return this.options.excludeTouchSupport || e.push({key: "touch_support", value: this.getTouchSupport()}), e
        }, hardwareConcurrencyKey: function (e) {
            return this.options.excludeHardwareConcurrency || e.push({
                key: "hardware_concurrency",
                value: this.getHardwareConcurrency()
            }), e
        }, hasSessionStorage: function () {
            try {
                return !!window.sessionStorage
            } catch (e) {
                return !0
            }
        }, hasLocalStorage: function () {
            try {
                return !!window.localStorage
            } catch (e) {
                return !0
            }
        }, hasIndexedDB: function () {
            try {
                return !!window.indexedDB
            } catch (e) {
                return !0
            }
        }, getHardwareConcurrency: function () {
            return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "unknown"
        }, getNavigatorCpuClass: function () {
            return navigator.cpuClass ? navigator.cpuClass : "unknown"
        }, getNavigatorPlatform: function () {
            return navigator.platform ? navigator.platform : "unknown"
        }, getDoNotTrack: function () {
            return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : "unknown"
        }, getTouchSupport: function () {
            var e = 0, t = !1;
            "undefined" != typeof navigator.maxTouchPoints ? e = navigator.maxTouchPoints : "undefined" != typeof navigator.msMaxTouchPoints && (e = navigator.msMaxTouchPoints);
            try {
                document.createEvent("TouchEvent"), t = !0
            } catch (i) {
            }
            var a = "ontouchstart" in window;
            return [e, t, a]
        }, getCanvasFp: function () {
            var e = [], t = document.createElement("canvas");
            t.width = 2e3, t.height = 200, t.style.display = "inline";
            var i = t.getContext("2d");
            return i.rect(0, 0, 10, 10), i.rect(2, 2, 6, 6), e.push("canvas winding:" + (i.isPointInPath(5, 5, "evenodd") === !1 ? "yes" : "no")), i.textBaseline = "alphabetic", i.fillStyle = "#f60", i.fillRect(125, 1, 62, 20), i.fillStyle = "#069", this.options.dontUseFakeFontInCanvas ? i.font = "11pt Arial" : i.font = "11pt no-real-font-123", i.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15), i.fillStyle = "rgba(102, 204, 0, 0.2)", i.font = "18pt Arial", i.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45), i.globalCompositeOperation = "multiply", i.fillStyle = "rgb(255,0,255)", i.beginPath(), i.arc(50, 50, 50, 0, 2 * Math.PI, !0), i.closePath(), i.fill(), i.fillStyle = "rgb(0,255,255)", i.beginPath(), i.arc(100, 50, 50, 0, 2 * Math.PI, !0), i.closePath(), i.fill(), i.fillStyle = "rgb(255,255,0)", i.beginPath(), i.arc(75, 100, 50, 0, 2 * Math.PI, !0), i.closePath(), i.fill(), i.fillStyle = "rgb(255,0,255)", i.arc(75, 75, 75, 0, 2 * Math.PI, !0), i.arc(75, 75, 25, 0, 2 * Math.PI, !0), i.fill("evenodd"), e.push("canvas fp:" + t.toDataURL()), e.join("~")
        }, getWebglFp: function () {
            var e, t = function (t) {
                return e.clearColor(0, 0, 0, 1), e.enable(e.DEPTH_TEST), e.depthFunc(e.LEQUAL), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), "[" + t[0] + ", " + t[1] + "]"
            }, i = function (e) {
                var t,
                    i = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic");
                return i ? (t = e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === t && (t = 2), t) : null
            };
            if (e = this.getWebglCanvas(), !e) return null;
            var a = [],
                r = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}",
                n = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}",
                o = e.createBuffer();
            e.bindBuffer(e.ARRAY_BUFFER, o);
            var s = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
            e.bufferData(e.ARRAY_BUFFER, s, e.STATIC_DRAW), o.itemSize = 3, o.numItems = 3;
            var l = e.createProgram(), h = e.createShader(e.VERTEX_SHADER);
            e.shaderSource(h, r), e.compileShader(h);
            var u = e.createShader(e.FRAGMENT_SHADER);
            e.shaderSource(u, n), e.compileShader(u), e.attachShader(l, h), e.attachShader(l, u), e.linkProgram(l), e.useProgram(l), l.vertexPosAttrib = e.getAttribLocation(l, "attrVertex"), l.offsetUniform = e.getUniformLocation(l, "uniformOffset"), e.enableVertexAttribArray(l.vertexPosArray), e.vertexAttribPointer(l.vertexPosAttrib, o.itemSize, e.FLOAT, !1, 0, 0), e.uniform2f(l.offsetUniform, 1, 1), e.drawArrays(e.TRIANGLE_STRIP, 0, o.numItems), null != e.canvas && a.push(e.canvas.toDataURL()), a.push("extensions:" + e.getSupportedExtensions().join(";")), a.push("webgl aliased line width range:" + t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))), a.push("webgl aliased point size range:" + t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))), a.push("webgl alpha bits:" + e.getParameter(e.ALPHA_BITS)), a.push("webgl antialiasing:" + (e.getContextAttributes().antialias ? "yes" : "no")), a.push("webgl blue bits:" + e.getParameter(e.BLUE_BITS)), a.push("webgl depth bits:" + e.getParameter(e.DEPTH_BITS)), a.push("webgl green bits:" + e.getParameter(e.GREEN_BITS)), a.push("webgl max anisotropy:" + i(e)), a.push("webgl max combined texture image units:" + e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS)), a.push("webgl max cube map texture size:" + e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)), a.push("webgl max fragment uniform vectors:" + e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)), a.push("webgl max render buffer size:" + e.getParameter(e.MAX_RENDERBUFFER_SIZE)), a.push("webgl max texture image units:" + e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)), a.push("webgl max texture size:" + e.getParameter(e.MAX_TEXTURE_SIZE)), a.push("webgl max varying vectors:" + e.getParameter(e.MAX_VARYING_VECTORS)), a.push("webgl max vertex attribs:" + e.getParameter(e.MAX_VERTEX_ATTRIBS)), a.push("webgl max vertex texture image units:" + e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)), a.push("webgl max vertex uniform vectors:" + e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)), a.push("webgl max viewport dims:" + t(e.getParameter(e.MAX_VIEWPORT_DIMS))), a.push("webgl red bits:" + e.getParameter(e.RED_BITS)), a.push("webgl renderer:" + e.getParameter(e.RENDERER)), a.push("webgl shading language version:" + e.getParameter(e.SHADING_LANGUAGE_VERSION)), a.push("webgl stencil bits:" + e.getParameter(e.STENCIL_BITS)), a.push("webgl vendor:" + e.getParameter(e.VENDOR)), a.push("webgl version:" + e.getParameter(e.VERSION));
            try {
                var c = e.getExtension("WEBGL_debug_renderer_info");
                c && (a.push("webgl unmasked vendor:" + e.getParameter(c.UNMASKED_VENDOR_WEBGL)), a.push("webgl unmasked renderer:" + e.getParameter(c.UNMASKED_RENDERER_WEBGL)))
            } catch (d) {
            }
            return e.getShaderPrecisionFormat ? (a.push("webgl vertex shader high float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision), a.push("webgl vertex shader high float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).rangeMin), a.push("webgl vertex shader high float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).rangeMax), a.push("webgl vertex shader medium float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision), a.push("webgl vertex shader medium float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).rangeMin), a.push("webgl vertex shader medium float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).rangeMax), a.push("webgl vertex shader low float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).precision), a.push("webgl vertex shader low float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).rangeMin), a.push("webgl vertex shader low float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).rangeMax), a.push("webgl fragment shader high float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision), a.push("webgl fragment shader high float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).rangeMin), a.push("webgl fragment shader high float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).rangeMax), a.push("webgl fragment shader medium float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision), a.push("webgl fragment shader medium float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).rangeMin), a.push("webgl fragment shader medium float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).rangeMax), a.push("webgl fragment shader low float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).precision), a.push("webgl fragment shader low float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).rangeMin), a.push("webgl fragment shader low float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).rangeMax), a.push("webgl vertex shader high int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).precision), a.push("webgl vertex shader high int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).rangeMin), a.push("webgl vertex shader high int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).rangeMax), a.push("webgl vertex shader medium int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).precision), a.push("webgl vertex shader medium int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).rangeMin), a.push("webgl vertex shader medium int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).rangeMax), a.push("webgl vertex shader low int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).precision), a.push("webgl vertex shader low int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).rangeMin), a.push("webgl vertex shader low int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).rangeMax), a.push("webgl fragment shader high int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).precision), a.push("webgl fragment shader high int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).rangeMin), a.push("webgl fragment shader high int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).rangeMax), a.push("webgl fragment shader medium int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).precision), a.push("webgl fragment shader medium int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).rangeMin), a.push("webgl fragment shader medium int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).rangeMax), a.push("webgl fragment shader low int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).precision), a.push("webgl fragment shader low int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).rangeMin), a.push("webgl fragment shader low int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).rangeMax), a.join("~")) : a.join("~")
        }, getAdBlock: function () {
            var e = document.createElement("div");
            e.innerHTML = "&nbsp;", e.className = "adsbox";
            var t = !1;
            try {
                document.body.appendChild(e), t = 0 === document.getElementsByClassName("adsbox")[0].offsetHeight, document.body.removeChild(e)
            } catch (i) {
                t = !1
            }
            return t
        }, getHasLiedLanguages: function () {
            if ("undefined" != typeof navigator.languages) try {
                var e = navigator.languages[0].substr(0, 2);
                if (e !== navigator.language.substr(0, 2)) return !0
            } catch (t) {
                return !0
            }
            return !1
        }, getHasLiedResolution: function () {
            return screen.width < screen.availWidth || screen.height < screen.availHeight
        }, getHasLiedOs: function () {
            var e, t = navigator.userAgent.toLowerCase(), i = navigator.oscpu, a = navigator.platform.toLowerCase();
            e = t.indexOf("windows phone") >= 0 ? "Windows Phone" : t.indexOf("win") >= 0 ? "Windows" : t.indexOf("android") >= 0 ? "Android" : t.indexOf("linux") >= 0 ? "Linux" : t.indexOf("iphone") >= 0 || t.indexOf("ipad") >= 0 ? "iOS" : t.indexOf("mac") >= 0 ? "Mac" : "Other";
            var r;
            if (r = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, r && "Windows Phone" !== e && "Android" !== e && "iOS" !== e && "Other" !== e) return !0;
            if ("undefined" != typeof i) {
                if (i = i.toLowerCase(), i.indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e) return !0;
                if (i.indexOf("linux") >= 0 && "Linux" !== e && "Android" !== e) return !0;
                if (i.indexOf("mac") >= 0 && "Mac" !== e && "iOS" !== e) return !0;
                if (0 === i.indexOf("win") && 0 === i.indexOf("linux") && i.indexOf("mac") >= 0 && "other" !== e) return !0
            }
            return a.indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e || ((a.indexOf("linux") >= 0 || a.indexOf("android") >= 0 || a.indexOf("pike") >= 0) && "Linux" !== e && "Android" !== e || ((a.indexOf("mac") >= 0 || a.indexOf("ipad") >= 0 || a.indexOf("ipod") >= 0 || a.indexOf("iphone") >= 0) && "Mac" !== e && "iOS" !== e || (0 === a.indexOf("win") && 0 === a.indexOf("linux") && a.indexOf("mac") >= 0 && "other" !== e || "undefined" == typeof navigator.plugins && "Windows" !== e && "Windows Phone" !== e)))
        }, getHasLiedBrowser: function () {
            var e, t = navigator.userAgent.toLowerCase(), i = navigator.productSub;
            if (e = t.indexOf("firefox") >= 0 ? "Firefox" : t.indexOf("opera") >= 0 || t.indexOf("opr") >= 0 ? "Opera" : t.indexOf("chrome") >= 0 ? "Chrome" : t.indexOf("safari") >= 0 ? "Safari" : t.indexOf("trident") >= 0 ? "Internet Explorer" : "Other", ("Chrome" === e || "Safari" === e || "Opera" === e) && "20030107" !== i) return !0;
            var a = eval.toString().length;
            if (37 === a && "Safari" !== e && "Firefox" !== e && "Other" !== e) return !0;
            if (39 === a && "Internet Explorer" !== e && "Other" !== e) return !0;
            if (33 === a && "Chrome" !== e && "Opera" !== e && "Other" !== e) return !0;
            var r;
            try {
                throw"a"
            } catch (n) {
                try {
                    n.toSource(), r = !0
                } catch (o) {
                    r = !1
                }
            }
            return !(!r || "Firefox" === e || "Other" === e)
        }, isCanvasSupported: function () {
            var e = document.createElement("canvas");
            return !(!e.getContext || !e.getContext("2d"))
        }, isWebGlSupported: function () {
            if (!this.isCanvasSupported()) return !1;
            var e, t = document.createElement("canvas");
            try {
                e = t.getContext && (t.getContext("webgl") || t.getContext("experimental-webgl"))
            } catch (i) {
                e = !1
            }
            return !!window.WebGLRenderingContext && !!e
        }, isIE: function () {
            return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent))
        }, hasSwfObjectLoaded: function () {
            return "undefined" != typeof window.swfobject
        }, hasMinFlashInstalled: function () {
            return swfobject.hasFlashPlayerVersion("9.0.0")
        }, addFlashDivNode: function () {
            var e = document.createElement("div");
            e.setAttribute("id", this.options.swfContainerId), document.body.appendChild(e)
        }, loadSwfAndDetectFonts: function (e) {
            var t = "___fp_swf_loaded";
            window[t] = function (t) {
                e(t)
            };
            var i = this.options.swfContainerId;
            this.addFlashDivNode();
            var a = {onReady: t}, r = {allowScriptAccess: "always", menu: "false"};
            swfobject.embedSWF(this.options.swfPath, i, "1", "1", "9.0.0", !1, a, r, {})
        }, getWebglCanvas: function () {
            var e = document.createElement("canvas"), t = null;
            try {
                t = e.getContext("webgl") || e.getContext("experimental-webgl")
            } catch (i) {
            }
            return t || (t = null), t
        }, each: function (e, t, i) {
            if (null !== e) if (this.nativeForEach && e.forEach === this.nativeForEach) e.forEach(t, i); else if (e.length === +e.length) {
                for (var a = 0, r = e.length; a < r; a++) if (t.call(i, e[a], a, e) === {}) return
            } else for (var n in e) if (e.hasOwnProperty(n) && t.call(i, e[n], n, e) === {}) return
        }, map: function (e, t, i) {
            var a = [];
            return null == e ? a : this.nativeMap && e.map === this.nativeMap ? e.map(t, i) : (this.each(e, function (e, r, n) {
                a[a.length] = t.call(i, e, r, n)
            }), a)
        }, x64Add: function (e, t) {
            e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
            var i = [0, 0, 0, 0];
            return i[3] += e[3] + t[3], i[2] += i[3] >>> 16, i[3] &= 65535, i[2] += e[2] + t[2], i[1] += i[2] >>> 16, i[2] &= 65535, i[1] += e[1] + t[1], i[0] += i[1] >>> 16, i[1] &= 65535, i[0] += e[0] + t[0], i[0] &= 65535, [i[0] << 16 | i[1], i[2] << 16 | i[3]]
        }, x64Multiply: function (e, t) {
            e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
            var i = [0, 0, 0, 0];
            return i[3] += e[3] * t[3], i[2] += i[3] >>> 16, i[3] &= 65535, i[2] += e[2] * t[3], i[1] += i[2] >>> 16, i[2] &= 65535, i[2] += e[3] * t[2], i[1] += i[2] >>> 16, i[2] &= 65535, i[1] += e[1] * t[3], i[0] += i[1] >>> 16, i[1] &= 65535, i[1] += e[2] * t[2], i[0] += i[1] >>> 16, i[1] &= 65535, i[1] += e[3] * t[1], i[0] += i[1] >>> 16, i[1] &= 65535, i[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0], i[0] &= 65535, [i[0] << 16 | i[1], i[2] << 16 | i[3]]
        }, x64Rotl: function (e, t) {
            return t %= 64, 32 === t ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : (t -= 32, [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t])
        }, x64LeftShift: function (e, t) {
            return t %= 64, 0 === t ? e : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0]
        }, x64Xor: function (e, t) {
            return [e[0] ^ t[0], e[1] ^ t[1]]
        }, x64Fmix: function (e) {
            return e = this.x64Xor(e, [0, e[0] >>> 1]), e = this.x64Multiply(e, [4283543511, 3981806797]), e = this.x64Xor(e, [0, e[0] >>> 1]), e = this.x64Multiply(e, [3301882366, 444984403]), e = this.x64Xor(e, [0, e[0] >>> 1])
        }, x64hash128: function (e, t) {
            e = e || "", t = t || 0;
            for (var i = e.length % 16, a = e.length - i, r = [0, t], n = [0, t], o = [0, 0], s = [0, 0], l = [2277735313, 289559509], h = [1291169091, 658871167], u = 0; u < a; u += 16) o = [255 & e.charCodeAt(u + 4) | (255 & e.charCodeAt(u + 5)) << 8 | (255 & e.charCodeAt(u + 6)) << 16 | (255 & e.charCodeAt(u + 7)) << 24, 255 & e.charCodeAt(u) | (255 & e.charCodeAt(u + 1)) << 8 | (255 & e.charCodeAt(u + 2)) << 16 | (255 & e.charCodeAt(u + 3)) << 24],
                s = [255 & e.charCodeAt(u + 12) | (255 & e.charCodeAt(u + 13)) << 8 | (255 & e.charCodeAt(u + 14)) << 16 | (255 & e.charCodeAt(u + 15)) << 24, 255 & e.charCodeAt(u + 8) | (255 & e.charCodeAt(u + 9)) << 8 | (255 & e.charCodeAt(u + 10)) << 16 | (255 & e.charCodeAt(u + 11)) << 24], o = this.x64Multiply(o, l), o = this.x64Rotl(o, 31), o = this.x64Multiply(o, h), r = this.x64Xor(r, o), r = this.x64Rotl(r, 27), r = this.x64Add(r, n), r = this.x64Add(this.x64Multiply(r, [0, 5]), [0, 1390208809]), s = this.x64Multiply(s, h), s = this.x64Rotl(s, 33), s = this.x64Multiply(s, l), n = this.x64Xor(n, s), n = this.x64Rotl(n, 31), n = this.x64Add(n, r), n = this.x64Add(this.x64Multiply(n, [0, 5]), [0, 944331445]);
            switch (o = [0, 0], s = [0, 0], i) {
                case 15:
                    s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 14)], 48));
                case 14:
                    s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 13)], 40));
                case 13:
                    s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 12)], 32));
                case 12:
                    s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 11)], 24));
                case 11:
                    s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 10)], 16));
                case 10:
                    s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 9)], 8));
                case 9:
                    s = this.x64Xor(s, [0, e.charCodeAt(u + 8)]), s = this.x64Multiply(s, h), s = this.x64Rotl(s, 33), s = this.x64Multiply(s, l), n = this.x64Xor(n, s);
                case 8:
                    o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 7)], 56));
                case 7:
                    o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 6)], 48));
                case 6:
                    o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 5)], 40));
                case 5:
                    o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 4)], 32));
                case 4:
                    o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 3)], 24));
                case 3:
                    o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 2)], 16));
                case 2:
                    o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 1)], 8));
                case 1:
                    o = this.x64Xor(o, [0, e.charCodeAt(u)]), o = this.x64Multiply(o, l), o = this.x64Rotl(o, 31), o = this.x64Multiply(o, h), r = this.x64Xor(r, o)
            }
            return r = this.x64Xor(r, [0, e.length]), n = this.x64Xor(n, [0, e.length]), r = this.x64Add(r, n), n = this.x64Add(n, r), r = this.x64Fmix(r), n = this.x64Fmix(n), r = this.x64Add(r, n), n = this.x64Add(n, r), ("00000000" + (r[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (r[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (n[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (n[1] >>> 0).toString(16)).slice(-8)
        }
    }, e.VERSION = "1.5.1", e
});

function keyCodeAsText(code) {
    var codes = {
        0: "WakeUp",
        8: "Backspace",
        13: "Enter",
        18: "Alt",
        20: "CapsLock",
        27: "Escape",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        48: "0",
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",
        65: "a",
        66: "b",
        67: "c",
        68: "d",
        69: "e",
        70: "f",
        71: "g",
        72: "h",
        73: "i",
        74: "j",
        75: "k",
        76: "l",
        77: "m",
        78: "n",
        79: "o",
        80: "p",
        81: "q",
        82: "r",
        83: "s",
        84: "t",
        85: "u",
        86: "v",
        87: "w",
        88: "x",
        89: "y",
        90: "z",
        96: "0",
        97: "1",
        98: "2",
        99: "3",
        100: "4",
        101: "5",
        102: "6",
        103: "7",
        104: "8",
        105: "9",
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        187: "+",
        188: ",",
        189: "-",
        190: ".",
        191: "}",
        192: "ñ",
        219: "Dead",
        220: "|",
        221: "¿",
        222: "{",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12"
    };
    return codes[code];
}

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '')
        .replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s,
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k)
                .toFixed(prec);
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
        .split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
            .length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1)
            .join('0');
    }
    return s.join(dec);
}

function moneyToNumber(money) {
    if (!money) {
        return 0;
    }
    return parseFloat(money.replace(/[$',\s]/g, ''));
}

function numberToMoney(valor) {
    return "$" + number_format(valor);
}

function scrollTo(element) {
    element = element ? element : 'header';
    $('html, body').animate({
        scrollTop: $(element).offset().top
    }, 500);
}

function sendFrameMessage(type, data) {
    if (!data) {
        data = {};
    }
    data.type = type;
    parent.postMessage(JSON.stringify(data), '*');
}

function cancelPayment() {
    location.href = p2p.routes.cancel;
}

function goBackMerchant() {
    if (p2p.isFrame) {
        var notify = p2p.notify;
        sendFrameMessage('response', notify);
        sendFrameMessage('close', {});
        return true;
    }
    location.href = p2p.routes.merchant;
}

function cardEncode(number) {
    if (number && number !== "") {
        return btoa(number);
    }
    return null;
}


/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
    throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
    'use strict';
    var version = $.fn.jquery.split(' ')[0].split('.')
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
        throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
    }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
    // ============================================================

    function transitionEnd() {
        var el = document.createElement('bootstrap')

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {end: transEndEventNames[name]}
            }
        }

        return false // explicit for ie8 (  ._.)
    }

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false
        var $el = this
        $(this).one('bsTransitionEnd', function () {
            called = true
        })
        var callback = function () {
            if (!called) $($el).trigger($.support.transition.end)
        }
        setTimeout(callback, duration)
        return this
    }

    $(function () {
        $.support.transition = transitionEnd()

        if (!$.support.transition) return

        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function (e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        }
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // ALERT CLASS DEFINITION
    // ======================

    var dismiss = '[data-dismiss="alert"]'
    var Alert = function (el) {
        $(el).on('click', dismiss, this.close)
    }

    Alert.VERSION = '3.3.7'

    Alert.TRANSITION_DURATION = 150

    Alert.prototype.close = function (e) {
        var $this = $(this)
        var selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = $(selector === '#' ? [] : selector)

        if (e) e.preventDefault()

        if (!$parent.length) {
            $parent = $this.closest('.alert')
        }

        $parent.trigger(e = $.Event('close.bs.alert'))

        if (e.isDefaultPrevented()) return

        $parent.removeClass('in')

        function removeElement() {
            // detach from parent, fire event then clean up data
            $parent.detach().trigger('closed.bs.alert').remove()
        }

        $.support.transition && $parent.hasClass('fade') ?
            $parent
                .one('bsTransitionEnd', removeElement)
                .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
            removeElement()
    }


    // ALERT PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.alert')

            if (!data) $this.data('bs.alert', (data = new Alert(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    var old = $.fn.alert

    $.fn.alert = Plugin
    $.fn.alert.Constructor = Alert


    // ALERT NO CONFLICT
    // =================

    $.fn.alert.noConflict = function () {
        $.fn.alert = old
        return this
    }


    // ALERT DATA-API
    // ==============

    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // BUTTON PUBLIC CLASS DEFINITION
    // ==============================

    var Button = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, Button.DEFAULTS, options)
        this.isLoading = false
    }

    Button.VERSION = '3.3.7'

    Button.DEFAULTS = {
        loadingText: 'loading...'
    }

    Button.prototype.setState = function (state) {
        var d = 'disabled'
        var $el = this.$element
        var val = $el.is('input') ? 'val' : 'html'
        var data = $el.data()

        state += 'Text'

        if (data.resetText == null) $el.data('resetText', $el[val]())

        // push to event loop to allow forms to submit
        setTimeout($.proxy(function () {
            $el[val](data[state] == null ? this.options[state] : data[state])

            if (state == 'loadingText') {
                this.isLoading = true
                $el.addClass(d).attr(d, d).prop(d, true)
            } else if (this.isLoading) {
                this.isLoading = false
                $el.removeClass(d).removeAttr(d).prop(d, false)
            }
        }, this), 0)
    }

    Button.prototype.toggle = function () {
        var changed = true
        var $parent = this.$element.closest('[data-toggle="buttons"]')

        if ($parent.length) {
            var $input = this.$element.find('input')
            if ($input.prop('type') == 'radio') {
                if ($input.prop('checked')) changed = false
                $parent.find('.active').removeClass('active')
                this.$element.addClass('active')
            } else if ($input.prop('type') == 'checkbox') {
                if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
                this.$element.toggleClass('active')
            }
            $input.prop('checked', this.$element.hasClass('active'))
            if (changed) $input.trigger('change')
        } else {
            this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
            this.$element.toggleClass('active')
        }
    }


    // BUTTON PLUGIN DEFINITION
    // ========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.button')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.button', (data = new Button(this, options)))

            if (option == 'toggle') data.toggle()
            else if (option) data.setState(option)
        })
    }

    var old = $.fn.button

    $.fn.button = Plugin
    $.fn.button.Constructor = Button


    // BUTTON NO CONFLICT
    // ==================

    $.fn.button.noConflict = function () {
        $.fn.button = old
        return this
    }


    // BUTTON DATA-API
    // ===============

    $(document)
        .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
            var $btn = $(e.target).closest('.btn')
            Plugin.call($btn, 'toggle')
            if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
                // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
                e.preventDefault()
                // The target component still receive the focus
                if ($btn.is('input,button')) $btn.trigger('focus')
                else $btn.find('input:visible,button:visible').first().trigger('focus')
            }
        })
        .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
            $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
        })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // CAROUSEL CLASS DEFINITION
    // =========================

    var Carousel = function (element, options) {
        this.$element = $(element)
        this.$indicators = this.$element.find('.carousel-indicators')
        this.options = options
        this.paused = null
        this.sliding = null
        this.interval = null
        this.$active = null
        this.$items = null

        this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

        this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
            .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
            .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
    }

    Carousel.VERSION = '3.3.7'

    Carousel.TRANSITION_DURATION = 600

    Carousel.DEFAULTS = {
        interval: 5000,
        pause: 'hover',
        wrap: true,
        keyboard: true
    }

    Carousel.prototype.keydown = function (e) {
        if (/input|textarea/i.test(e.target.tagName)) return
        switch (e.which) {
            case 37:
                this.prev();
                break
            case 39:
                this.next();
                break
            default:
                return
        }

        e.preventDefault()
    }

    Carousel.prototype.cycle = function (e) {
        e || (this.paused = false)

        this.interval && clearInterval(this.interval)

        this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

        return this
    }

    Carousel.prototype.getItemIndex = function (item) {
        this.$items = item.parent().children('.item')
        return this.$items.index(item || this.$active)
    }

    Carousel.prototype.getItemForDirection = function (direction, active) {
        var activeIndex = this.getItemIndex(active)
        var willWrap = (direction == 'prev' && activeIndex === 0)
            || (direction == 'next' && activeIndex == (this.$items.length - 1))
        if (willWrap && !this.options.wrap) return active
        var delta = direction == 'prev' ? -1 : 1
        var itemIndex = (activeIndex + delta) % this.$items.length
        return this.$items.eq(itemIndex)
    }

    Carousel.prototype.to = function (pos) {
        var that = this
        var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

        if (pos > (this.$items.length - 1) || pos < 0) return

        if (this.sliding) return this.$element.one('slid.bs.carousel', function () {
            that.to(pos)
        }) // yes, "slid"
        if (activeIndex == pos) return this.pause().cycle()

        return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
    }

    Carousel.prototype.pause = function (e) {
        e || (this.paused = true)

        if (this.$element.find('.next, .prev').length && $.support.transition) {
            this.$element.trigger($.support.transition.end)
            this.cycle(true)
        }

        this.interval = clearInterval(this.interval)

        return this
    }

    Carousel.prototype.next = function () {
        if (this.sliding) return
        return this.slide('next')
    }

    Carousel.prototype.prev = function () {
        if (this.sliding) return
        return this.slide('prev')
    }

    Carousel.prototype.slide = function (type, next) {
        var $active = this.$element.find('.item.active')
        var $next = next || this.getItemForDirection(type, $active)
        var isCycling = this.interval
        var direction = type == 'next' ? 'left' : 'right'
        var that = this

        if ($next.hasClass('active')) return (this.sliding = false)

        var relatedTarget = $next[0]
        var slideEvent = $.Event('slide.bs.carousel', {
            relatedTarget: relatedTarget,
            direction: direction
        })
        this.$element.trigger(slideEvent)
        if (slideEvent.isDefaultPrevented()) return

        this.sliding = true

        isCycling && this.pause()

        if (this.$indicators.length) {
            this.$indicators.find('.active').removeClass('active')
            var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
            $nextIndicator && $nextIndicator.addClass('active')
        }

        var slidEvent = $.Event('slid.bs.carousel', {relatedTarget: relatedTarget, direction: direction}) // yes, "slid"
        if ($.support.transition && this.$element.hasClass('slide')) {
            $next.addClass(type)
            $next[0].offsetWidth // force reflow
            $active.addClass(direction)
            $next.addClass(direction)
            $active
                .one('bsTransitionEnd', function () {
                    $next.removeClass([type, direction].join(' ')).addClass('active')
                    $active.removeClass(['active', direction].join(' '))
                    that.sliding = false
                    setTimeout(function () {
                        that.$element.trigger(slidEvent)
                    }, 0)
                })
                .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
        } else {
            $active.removeClass('active')
            $next.addClass('active')
            this.sliding = false
            this.$element.trigger(slidEvent)
        }

        isCycling && this.cycle()

        return this
    }


    // CAROUSEL PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.carousel')
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var action = typeof option == 'string' ? option : options.slide

            if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
            if (typeof option == 'number') data.to(option)
            else if (action) data[action]()
            else if (options.interval) data.pause().cycle()
        })
    }

    var old = $.fn.carousel

    $.fn.carousel = Plugin
    $.fn.carousel.Constructor = Carousel


    // CAROUSEL NO CONFLICT
    // ====================

    $.fn.carousel.noConflict = function () {
        $.fn.carousel = old
        return this
    }


    // CAROUSEL DATA-API
    // =================

    var clickHandler = function (e) {
        var href
        var $this = $(this)
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
        if (!$target.hasClass('carousel')) return
        var options = $.extend({}, $target.data(), $this.data())
        var slideIndex = $this.attr('data-slide-to')
        if (slideIndex) options.interval = false

        Plugin.call($target, options)

        if (slideIndex) {
            $target.data('bs.carousel').to(slideIndex)
        }

        e.preventDefault()
    }

    $(document)
        .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
        .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

    $(window).on('load', function () {
        $('[data-ride="carousel"]').each(function () {
            var $carousel = $(this)
            Plugin.call($carousel, $carousel.data())
        })
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
    'use strict';

    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================

    var Collapse = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, Collapse.DEFAULTS, options)
        this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
            '[data-toggle="collapse"][data-target="#' + element.id + '"]')
        this.transitioning = null

        if (this.options.parent) {
            this.$parent = this.getParent()
        } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger)
        }

        if (this.options.toggle) this.toggle()
    }

    Collapse.VERSION = '3.3.7'

    Collapse.TRANSITION_DURATION = 350

    Collapse.DEFAULTS = {
        toggle: true
    }

    Collapse.prototype.dimension = function () {
        var hasWidth = this.$element.hasClass('width')
        return hasWidth ? 'width' : 'height'
    }

    Collapse.prototype.show = function () {
        if (this.transitioning || this.$element.hasClass('in')) return

        var activesData
        var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

        if (actives && actives.length) {
            activesData = actives.data('bs.collapse')
            if (activesData && activesData.transitioning) return
        }

        var startEvent = $.Event('show.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        if (actives && actives.length) {
            Plugin.call(actives, 'hide')
            activesData || actives.data('bs.collapse', null)
        }

        var dimension = this.dimension()

        this.$element
            .removeClass('collapse')
            .addClass('collapsing')[dimension](0)
            .attr('aria-expanded', true)

        this.$trigger
            .removeClass('collapsed')
            .attr('aria-expanded', true)

        this.transitioning = 1

        var complete = function () {
            this.$element
                .removeClass('collapsing')
                .addClass('collapse in')[dimension]('')
            this.transitioning = 0
            this.$element
                .trigger('shown.bs.collapse')
        }

        if (!$.support.transition) return complete.call(this)

        var scrollSize = $.camelCase(['scroll', dimension].join('-'))

        this.$element
            .one('bsTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
    }

    Collapse.prototype.hide = function () {
        if (this.transitioning || !this.$element.hasClass('in')) return

        var startEvent = $.Event('hide.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        var dimension = this.dimension()

        this.$element[dimension](this.$element[dimension]())[0].offsetHeight

        this.$element
            .addClass('collapsing')
            .removeClass('collapse in')
            .attr('aria-expanded', false)

        this.$trigger
            .addClass('collapsed')
            .attr('aria-expanded', false)

        this.transitioning = 1

        var complete = function () {
            this.transitioning = 0
            this.$element
                .removeClass('collapsing')
                .addClass('collapse')
                .trigger('hidden.bs.collapse')
        }

        if (!$.support.transition) return complete.call(this)

        this.$element
            [dimension](0)
            .one('bsTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
    }

    Collapse.prototype.toggle = function () {
        this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

    Collapse.prototype.getParent = function () {
        return $(this.options.parent)
            .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
            .each($.proxy(function (i, element) {
                var $element = $(element)
                this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
            }, this))
            .end()
    }

    Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
        var isOpen = $element.hasClass('in')

        $element.attr('aria-expanded', isOpen)
        $trigger
            .toggleClass('collapsed', !isOpen)
            .attr('aria-expanded', isOpen)
    }

    function getTargetFromTrigger($trigger) {
        var href
        var target = $trigger.attr('data-target')
            || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

        return $(target)
    }


    // COLLAPSE PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.collapse')
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
            if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.collapse

    $.fn.collapse = Plugin
    $.fn.collapse.Constructor = Collapse


    // COLLAPSE NO CONFLICT
    // ====================

    $.fn.collapse.noConflict = function () {
        $.fn.collapse = old
        return this
    }


    // COLLAPSE DATA-API
    // =================

    $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
        var $this = $(this)

        if (!$this.attr('data-target')) e.preventDefault()

        var $target = getTargetFromTrigger($this)
        var data = $target.data('bs.collapse')
        var option = data ? 'toggle' : $this.data()

        Plugin.call($target, option)
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // DROPDOWN CLASS DEFINITION
    // =========================

    var backdrop = '.dropdown-backdrop'
    var toggle = '[data-toggle="dropdown"]'
    var Dropdown = function (element) {
        $(element).on('click.bs.dropdown', this.toggle)
    }

    Dropdown.VERSION = '3.3.7'

    function getParent($this) {
        var selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = selector && $(selector)

        return $parent && $parent.length ? $parent : $this.parent()
    }

    function clearMenus(e) {
        if (e && e.which === 3) return
        $(backdrop).remove()
        $(toggle).each(function () {
            var $this = $(this)
            var $parent = getParent($this)
            var relatedTarget = {relatedTarget: this}

            if (!$parent.hasClass('open')) return

            if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

            $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

            if (e.isDefaultPrevented()) return

            $this.attr('aria-expanded', 'false')
            $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
        })
    }

    Dropdown.prototype.toggle = function (e) {
        var $this = $(this)

        if ($this.is('.disabled, :disabled')) return

        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')

        clearMenus()

        if (!isActive) {
            if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
                // if mobile we use a backdrop because click events don't delegate
                $(document.createElement('div'))
                    .addClass('dropdown-backdrop')
                    .insertAfter($(this))
                    .on('click', clearMenus)
            }

            var relatedTarget = {relatedTarget: this}
            $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

            if (e.isDefaultPrevented()) return

            $this
                .trigger('focus')
                .attr('aria-expanded', 'true')

            $parent
                .toggleClass('open')
                .trigger($.Event('shown.bs.dropdown', relatedTarget))
        }

        return false
    }

    Dropdown.prototype.keydown = function (e) {
        if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

        var $this = $(this)

        e.preventDefault()
        e.stopPropagation()

        if ($this.is('.disabled, :disabled')) return

        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')

        if (!isActive && e.which != 27 || isActive && e.which == 27) {
            if (e.which == 27) $parent.find(toggle).trigger('focus')
            return $this.trigger('click')
        }

        var desc = ' li:not(.disabled):visible a'
        var $items = $parent.find('.dropdown-menu' + desc)

        if (!$items.length) return

        var index = $items.index(e.target)

        if (e.which == 38 && index > 0) index--         // up
        if (e.which == 40 && index < $items.length - 1) index++         // down
        if (!~index) index = 0

        $items.eq(index).trigger('focus')
    }


    // DROPDOWN PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.dropdown')

            if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    var old = $.fn.dropdown

    $.fn.dropdown = Plugin
    $.fn.dropdown.Constructor = Dropdown


    // DROPDOWN NO CONFLICT
    // ====================

    $.fn.dropdown.noConflict = function () {
        $.fn.dropdown = old
        return this
    }


    // APPLY TO STANDARD DROPDOWN ELEMENTS
    // ===================================

    $(document)
        .on('click.bs.dropdown.data-api', clearMenus)
        .on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
            e.stopPropagation()
        })
        .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
        .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
        .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // MODAL CLASS DEFINITION
    // ======================

    var Modal = function (element, options) {
        this.options = options
        this.$body = $(document.body)
        this.$element = $(element)
        this.$dialog = this.$element.find('.modal-dialog')
        this.$backdrop = null
        this.isShown = null
        this.originalBodyPad = null
        this.scrollbarWidth = 0
        this.ignoreBackdropClick = false

        if (this.options.remote) {
            this.$element
                .find('.modal-content')
                .load(this.options.remote, $.proxy(function () {
                    this.$element.trigger('loaded.bs.modal')
                }, this))
        }
    }

    Modal.VERSION = '3.3.7'

    Modal.TRANSITION_DURATION = 300
    Modal.BACKDROP_TRANSITION_DURATION = 150

    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    }

    Modal.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget)
    }

    Modal.prototype.show = function (_relatedTarget) {
        var that = this
        var e = $.Event('show.bs.modal', {relatedTarget: _relatedTarget})

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.checkScrollbar()
        this.setScrollbar()
        this.$body.addClass('modal-open')

        this.escape()
        this.resize()

        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

        this.$dialog.on('mousedown.dismiss.bs.modal', function () {
            that.$element.one('mouseup.dismiss.bs.modal', function (e) {
                if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
            })
        })

        this.backdrop(function () {
            var transition = $.support.transition && that.$element.hasClass('fade')

            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body) // don't move modals dom position
            }

            that.$element
                .show()
                .scrollTop(0)

            that.adjustDialog()

            if (transition) {
                that.$element[0].offsetWidth // force reflow
            }

            that.$element.addClass('in')

            that.enforceFocus()

            var e = $.Event('shown.bs.modal', {relatedTarget: _relatedTarget})

            transition ?
                that.$dialog // wait for modal to slide in
                    .one('bsTransitionEnd', function () {
                        that.$element.trigger('focus').trigger(e)
                    })
                    .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
                that.$element.trigger('focus').trigger(e)
        })
    }

    Modal.prototype.hide = function (e) {
        if (e) e.preventDefault()

        e = $.Event('hide.bs.modal')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()
        this.resize()

        $(document).off('focusin.bs.modal')

        this.$element
            .removeClass('in')
            .off('click.dismiss.bs.modal')
            .off('mouseup.dismiss.bs.modal')

        this.$dialog.off('mousedown.dismiss.bs.modal')

        $.support.transition && this.$element.hasClass('fade') ?
            this.$element
                .one('bsTransitionEnd', $.proxy(this.hideModal, this))
                .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
            this.hideModal()
    }

    Modal.prototype.enforceFocus = function () {
        $(document)
            .off('focusin.bs.modal') // guard against infinite focus loop
            .on('focusin.bs.modal', $.proxy(function (e) {
                if (document !== e.target &&
                    this.$element[0] !== e.target &&
                    !this.$element.has(e.target).length) {
                    this.$element.trigger('focus')
                }
            }, this))
    }

    Modal.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
                e.which == 27 && this.hide()
            }, this))
        } else if (!this.isShown) {
            this.$element.off('keydown.dismiss.bs.modal')
        }
    }

    Modal.prototype.resize = function () {
        if (this.isShown) {
            $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
        } else {
            $(window).off('resize.bs.modal')
        }
    }

    Modal.prototype.hideModal = function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
            that.$body.removeClass('modal-open')
            that.resetAdjustments()
            that.resetScrollbar()
            that.$element.trigger('hidden.bs.modal')
        })
    }

    Modal.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
    }

    Modal.prototype.backdrop = function (callback) {
        var that = this
        var animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate

            this.$backdrop = $(document.createElement('div'))
                .addClass('modal-backdrop ' + animate)
                .appendTo(this.$body)

            this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false
                    return
                }
                if (e.target !== e.currentTarget) return
                this.options.backdrop == 'static'
                    ? this.$element[0].focus()
                    : this.hide()
            }, this))

            if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

            this.$backdrop.addClass('in')

            if (!callback) return

            doAnimate ?
                this.$backdrop
                    .one('bsTransitionEnd', callback)
                    .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callback()

        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in')

            var callbackRemove = function () {
                that.removeBackdrop()
                callback && callback()
            }
            $.support.transition && this.$element.hasClass('fade') ?
                this.$backdrop
                    .one('bsTransitionEnd', callbackRemove)
                    .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callbackRemove()

        } else if (callback) {
            callback()
        }
    }

    // these following methods are used to handle overflowing modals

    Modal.prototype.handleUpdate = function () {
        this.adjustDialog()
    }

    Modal.prototype.adjustDialog = function () {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        })
    }

    Modal.prototype.resetAdjustments = function () {
        this.$element.css({
            paddingLeft: '',
            paddingRight: ''
        })
    }

    Modal.prototype.checkScrollbar = function () {
        var fullWindowWidth = window.innerWidth
        if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect()
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
        this.scrollbarWidth = this.measureScrollbar()
    }

    Modal.prototype.setScrollbar = function () {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
        this.originalBodyPad = document.body.style.paddingRight || ''
        if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
    }

    Modal.prototype.resetScrollbar = function () {
        this.$body.css('padding-right', this.originalBodyPad)
    }

    Modal.prototype.measureScrollbar = function () { // thx walsh
        var scrollDiv = document.createElement('div')
        scrollDiv.className = 'modal-scrollbar-measure'
        this.$body.append(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        this.$body[0].removeChild(scrollDiv)
        return scrollbarWidth
    }


    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.modal')
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
            if (typeof option == 'string') data[option](_relatedTarget)
            else if (options.show) data.show(_relatedTarget)
        })
    }

    var old = $.fn.modal

    $.fn.modal = Plugin
    $.fn.modal.Constructor = Modal


    // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function () {
        $.fn.modal = old
        return this
    }


    // MODAL DATA-API
    // ==============

    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
        var $this = $(this)
        var href = $this.attr('href')
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
        var option = $target.data('bs.modal') ? 'toggle' : $.extend({remote: !/#/.test(href) && href}, $target.data(), $this.data())

        if ($this.is('a')) e.preventDefault()

        $target.one('show.bs.modal', function (showEvent) {
            if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
            $target.one('hidden.bs.modal', function () {
                $this.is(':visible') && $this.trigger('focus')
            })
        })
        Plugin.call($target, option, this)
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // TOOLTIP PUBLIC CLASS DEFINITION
    // ===============================

    var Tooltip = function (element, options) {
        this.type = null
        this.options = null
        this.enabled = null
        this.timeout = null
        this.hoverState = null
        this.$element = null
        this.inState = null

        this.init('tooltip', element, options)
    }

    Tooltip.VERSION = '3.3.7'

    Tooltip.TRANSITION_DURATION = 150

    Tooltip.DEFAULTS = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        container: false,
        viewport: {
            selector: 'body',
            padding: 0
        }
    }

    Tooltip.prototype.init = function (type, element, options) {
        this.enabled = true
        this.type = type
        this.$element = $(element)
        this.options = this.getOptions(options)
        this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
        this.inState = {click: false, hover: false, focus: false}

        if (this.$element[0] instanceof document.constructor && !this.options.selector) {
            throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
        }

        var triggers = this.options.trigger.split(' ')

        for (var i = triggers.length; i--;) {
            var trigger = triggers[i]

            if (trigger == 'click') {
                this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
            } else if (trigger != 'manual') {
                var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin'
                var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

                this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
                this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
            }
        }

        this.options.selector ?
            (this._options = $.extend({}, this.options, {trigger: 'manual', selector: ''})) :
            this.fixTitle()
    }

    Tooltip.prototype.getDefaults = function () {
        return Tooltip.DEFAULTS
    }

    Tooltip.prototype.getOptions = function (options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options)

        if (options.delay && typeof options.delay == 'number') {
            options.delay = {
                show: options.delay,
                hide: options.delay
            }
        }

        return options
    }

    Tooltip.prototype.getDelegateOptions = function () {
        var options = {}
        var defaults = this.getDefaults()

        this._options && $.each(this._options, function (key, value) {
            if (defaults[key] != value) options[key] = value
        })

        return options
    }

    Tooltip.prototype.enter = function (obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget).data('bs.' + this.type)

        if (!self) {
            self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
            $(obj.currentTarget).data('bs.' + this.type, self)
        }

        if (obj instanceof $.Event) {
            self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
        }

        if (self.tip().hasClass('in') || self.hoverState == 'in') {
            self.hoverState = 'in'
            return
        }

        clearTimeout(self.timeout)

        self.hoverState = 'in'

        if (!self.options.delay || !self.options.delay.show) return self.show()

        self.timeout = setTimeout(function () {
            if (self.hoverState == 'in') self.show()
        }, self.options.delay.show)
    }

    Tooltip.prototype.isInStateTrue = function () {
        for (var key in this.inState) {
            if (this.inState[key]) return true
        }

        return false
    }

    Tooltip.prototype.leave = function (obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget).data('bs.' + this.type)

        if (!self) {
            self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
            $(obj.currentTarget).data('bs.' + this.type, self)
        }

        if (obj instanceof $.Event) {
            self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
        }

        if (self.isInStateTrue()) return

        clearTimeout(self.timeout)

        self.hoverState = 'out'

        if (!self.options.delay || !self.options.delay.hide) return self.hide()

        self.timeout = setTimeout(function () {
            if (self.hoverState == 'out') self.hide()
        }, self.options.delay.hide)
    }

    Tooltip.prototype.show = function () {
        var e = $.Event('show.bs.' + this.type)

        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e)

            var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
            if (e.isDefaultPrevented() || !inDom) return
            var that = this

            var $tip = this.tip()

            var tipId = this.getUID(this.type)

            this.setContent()
            $tip.attr('id', tipId)
            this.$element.attr('aria-describedby', tipId)

            if (this.options.animation) $tip.addClass('fade')

            var placement = typeof this.options.placement == 'function' ?
                this.options.placement.call(this, $tip[0], this.$element[0]) :
                this.options.placement

            var autoToken = /\s?auto?\s?/i
            var autoPlace = autoToken.test(placement)
            if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

            $tip
                .detach()
                .css({top: 0, left: 0, display: 'block'})
                .addClass(placement)
                .data('bs.' + this.type, this)

            this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
            this.$element.trigger('inserted.bs.' + this.type)

            var pos = this.getPosition()
            var actualWidth = $tip[0].offsetWidth
            var actualHeight = $tip[0].offsetHeight

            if (autoPlace) {
                var orgPlacement = placement
                var viewportDim = this.getPosition(this.$viewport)

                placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' :
                    placement == 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' :
                        placement == 'right' && pos.right + actualWidth > viewportDim.width ? 'left' :
                            placement == 'left' && pos.left - actualWidth < viewportDim.left ? 'right' :
                                placement

                $tip
                    .removeClass(orgPlacement)
                    .addClass(placement)
            }

            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

            this.applyPlacement(calculatedOffset, placement)

            var complete = function () {
                var prevHoverState = that.hoverState
                that.$element.trigger('shown.bs.' + that.type)
                that.hoverState = null

                if (prevHoverState == 'out') that.leave(that)
            }

            $.support.transition && this.$tip.hasClass('fade') ?
                $tip
                    .one('bsTransitionEnd', complete)
                    .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
                complete()
        }
    }

    Tooltip.prototype.applyPlacement = function (offset, placement) {
        var $tip = this.tip()
        var width = $tip[0].offsetWidth
        var height = $tip[0].offsetHeight

        // manually read margins because getBoundingClientRect includes difference
        var marginTop = parseInt($tip.css('margin-top'), 10)
        var marginLeft = parseInt($tip.css('margin-left'), 10)

        // we must check for NaN for ie 8/9
        if (isNaN(marginTop)) marginTop = 0
        if (isNaN(marginLeft)) marginLeft = 0

        offset.top += marginTop
        offset.left += marginLeft

        // $.fn.offset doesn't round pixel values
        // so we use setOffset directly with our own function B-0
        $.offset.setOffset($tip[0], $.extend({
            using: function (props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                })
            }
        }, offset), 0)

        $tip.addClass('in')

        // check to see if placing tip in new offset caused the tip to resize itself
        var actualWidth = $tip[0].offsetWidth
        var actualHeight = $tip[0].offsetHeight

        if (placement == 'top' && actualHeight != height) {
            offset.top = offset.top + height - actualHeight
        }

        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

        if (delta.left) offset.left += delta.left
        else offset.top += delta.top

        var isVertical = /top|bottom/.test(placement)
        var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
        var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

        $tip.offset(offset)
        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
    }

    Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
        this.arrow()
            .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
            .css(isVertical ? 'top' : 'left', '')
    }

    Tooltip.prototype.setContent = function () {
        var $tip = this.tip()
        var title = this.getTitle()

        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
        $tip.removeClass('fade in top bottom left right')
    }

    Tooltip.prototype.hide = function (callback) {
        var that = this
        var $tip = $(this.$tip)
        var e = $.Event('hide.bs.' + this.type)

        function complete() {
            if (that.hoverState != 'in') $tip.detach()
            if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
                that.$element
                    .removeAttr('aria-describedby')
                    .trigger('hidden.bs.' + that.type)
            }
            callback && callback()
        }

        this.$element.trigger(e)

        if (e.isDefaultPrevented()) return

        $tip.removeClass('in')

        $.support.transition && $tip.hasClass('fade') ?
            $tip
                .one('bsTransitionEnd', complete)
                .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
            complete()

        this.hoverState = null

        return this
    }

    Tooltip.prototype.fixTitle = function () {
        var $e = this.$element
        if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
            $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
        }
    }

    Tooltip.prototype.hasContent = function () {
        return this.getTitle()
    }

    Tooltip.prototype.getPosition = function ($element) {
        $element = $element || this.$element

        var el = $element[0]
        var isBody = el.tagName == 'BODY'

        var elRect = el.getBoundingClientRect()
        if (elRect.width == null) {
            // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
            elRect = $.extend({}, elRect, {width: elRect.right - elRect.left, height: elRect.bottom - elRect.top})
        }
        var isSvg = window.SVGElement && el instanceof window.SVGElement
        // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
        // See https://github.com/twbs/bootstrap/issues/20280
        var elOffset = isBody ? {top: 0, left: 0} : (isSvg ? null : $element.offset())
        var scroll = {scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()}
        var outerDims = isBody ? {width: $(window).width(), height: $(window).height()} : null

        return $.extend({}, elRect, scroll, outerDims, elOffset)
    }

    Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2} :
            placement == 'top' ? {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2} :
                placement == 'left' ? {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth} :
                    /* placement == 'right' */ {
                        top: pos.top + pos.height / 2 - actualHeight / 2,
                        left: pos.left + pos.width
                    }

    }

    Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
        var delta = {top: 0, left: 0}
        if (!this.$viewport) return delta

        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
        var viewportDimensions = this.getPosition(this.$viewport)

        if (/right|left/.test(placement)) {
            var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll
            var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
            if (topEdgeOffset < viewportDimensions.top) { // top overflow
                delta.top = viewportDimensions.top - topEdgeOffset
            } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
                delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
            }
        } else {
            var leftEdgeOffset = pos.left - viewportPadding
            var rightEdgeOffset = pos.left + viewportPadding + actualWidth
            if (leftEdgeOffset < viewportDimensions.left) { // left overflow
                delta.left = viewportDimensions.left - leftEdgeOffset
            } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
                delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
            }
        }

        return delta
    }

    Tooltip.prototype.getTitle = function () {
        var title
        var $e = this.$element
        var o = this.options

        title = $e.attr('data-original-title')
            || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)

        return title
    }

    Tooltip.prototype.getUID = function (prefix) {
        do prefix += ~~(Math.random() * 1000000)
        while (document.getElementById(prefix))
        return prefix
    }

    Tooltip.prototype.tip = function () {
        if (!this.$tip) {
            this.$tip = $(this.options.template)
            if (this.$tip.length != 1) {
                throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
            }
        }
        return this.$tip
    }

    Tooltip.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
    }

    Tooltip.prototype.enable = function () {
        this.enabled = true
    }

    Tooltip.prototype.disable = function () {
        this.enabled = false
    }

    Tooltip.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }

    Tooltip.prototype.toggle = function (e) {
        var self = this
        if (e) {
            self = $(e.currentTarget).data('bs.' + this.type)
            if (!self) {
                self = new this.constructor(e.currentTarget, this.getDelegateOptions())
                $(e.currentTarget).data('bs.' + this.type, self)
            }
        }

        if (e) {
            self.inState.click = !self.inState.click
            if (self.isInStateTrue()) self.enter(self)
            else self.leave(self)
        } else {
            self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
        }
    }

    Tooltip.prototype.destroy = function () {
        var that = this
        clearTimeout(this.timeout)
        this.hide(function () {
            that.$element.off('.' + that.type).removeData('bs.' + that.type)
            if (that.$tip) {
                that.$tip.detach()
            }
            that.$tip = null
            that.$arrow = null
            that.$viewport = null
            that.$element = null
        })
    }


    // TOOLTIP PLUGIN DEFINITION
    // =========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.tooltip')
            var options = typeof option == 'object' && option

            if (!data && /destroy|hide/.test(option)) return
            if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.tooltip

    $.fn.tooltip = Plugin
    $.fn.tooltip.Constructor = Tooltip


    // TOOLTIP NO CONFLICT
    // ===================

    $.fn.tooltip.noConflict = function () {
        $.fn.tooltip = old
        return this
    }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // POPOVER PUBLIC CLASS DEFINITION
    // ===============================

    var Popover = function (element, options) {
        this.init('popover', element, options)
    }

    if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

    Popover.VERSION = '3.3.7'

    Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    })


    // NOTE: POPOVER EXTENDS tooltip.js
    // ================================

    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

    Popover.prototype.constructor = Popover

    Popover.prototype.getDefaults = function () {
        return Popover.DEFAULTS
    }

    Popover.prototype.setContent = function () {
        var $tip = this.tip()
        var title = this.getTitle()
        var content = this.getContent()

        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
        $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
            this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
            ](content)

        $tip.removeClass('fade top bottom left right in')

        // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
        // this manually by checking the contents.
        if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
    }

    Popover.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }

    Popover.prototype.getContent = function () {
        var $e = this.$element
        var o = this.options

        return $e.attr('data-content')
            || (typeof o.content == 'function' ?
                o.content.call($e[0]) :
                o.content)
    }

    Popover.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
    }


    // POPOVER PLUGIN DEFINITION
    // =========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.popover')
            var options = typeof option == 'object' && option

            if (!data && /destroy|hide/.test(option)) return
            if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.popover

    $.fn.popover = Plugin
    $.fn.popover.Constructor = Popover


    // POPOVER NO CONFLICT
    // ===================

    $.fn.popover.noConflict = function () {
        $.fn.popover = old
        return this
    }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // SCROLLSPY CLASS DEFINITION
    // ==========================

    function ScrollSpy(element, options) {
        this.$body = $(document.body)
        this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options)
        this.selector = (this.options.target || '') + ' .nav li > a'
        this.offsets = []
        this.targets = []
        this.activeTarget = null
        this.scrollHeight = 0

        this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
        this.refresh()
        this.process()
    }

    ScrollSpy.VERSION = '3.3.7'

    ScrollSpy.DEFAULTS = {
        offset: 10
    }

    ScrollSpy.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }

    ScrollSpy.prototype.refresh = function () {
        var that = this
        var offsetMethod = 'offset'
        var offsetBase = 0

        this.offsets = []
        this.targets = []
        this.scrollHeight = this.getScrollHeight()

        if (!$.isWindow(this.$scrollElement[0])) {
            offsetMethod = 'position'
            offsetBase = this.$scrollElement.scrollTop()
        }

        this.$body
            .find(this.selector)
            .map(function () {
                var $el = $(this)
                var href = $el.data('target') || $el.attr('href')
                var $href = /^#./.test(href) && $(href)

                return ($href
                    && $href.length
                    && $href.is(':visible')
                    && [[$href[offsetMethod]().top + offsetBase, href]]) || null
            })
            .sort(function (a, b) {
                return a[0] - b[0]
            })
            .each(function () {
                that.offsets.push(this[0])
                that.targets.push(this[1])
            })
    }

    ScrollSpy.prototype.process = function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
        var scrollHeight = this.getScrollHeight()
        var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height()
        var offsets = this.offsets
        var targets = this.targets
        var activeTarget = this.activeTarget
        var i

        if (this.scrollHeight != scrollHeight) {
            this.refresh()
        }

        if (scrollTop >= maxScroll) {
            return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
        }

        if (activeTarget && scrollTop < offsets[0]) {
            this.activeTarget = null
            return this.clear()
        }

        for (i = offsets.length; i--;) {
            activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
            && this.activate(targets[i])
        }
    }

    ScrollSpy.prototype.activate = function (target) {
        this.activeTarget = target

        this.clear()

        var selector = this.selector +
            '[data-target="' + target + '"],' +
            this.selector + '[href="' + target + '"]'

        var active = $(selector)
            .parents('li')
            .addClass('active')

        if (active.parent('.dropdown-menu').length) {
            active = active
                .closest('li.dropdown')
                .addClass('active')
        }

        active.trigger('activate.bs.scrollspy')
    }

    ScrollSpy.prototype.clear = function () {
        $(this.selector)
            .parentsUntil(this.options.target, '.active')
            .removeClass('active')
    }


    // SCROLLSPY PLUGIN DEFINITION
    // ===========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.scrollspy')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.scrollspy

    $.fn.scrollspy = Plugin
    $.fn.scrollspy.Constructor = ScrollSpy


    // SCROLLSPY NO CONFLICT
    // =====================

    $.fn.scrollspy.noConflict = function () {
        $.fn.scrollspy = old
        return this
    }


    // SCROLLSPY DATA-API
    // ==================

    $(window).on('load.bs.scrollspy.data-api', function () {
        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this)
            Plugin.call($spy, $spy.data())
        })
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // TAB CLASS DEFINITION
    // ====================

    var Tab = function (element) {
        // jscs:disable requireDollarBeforejQueryAssignment
        this.element = $(element)
        // jscs:enable requireDollarBeforejQueryAssignment
    }

    Tab.VERSION = '3.3.7'

    Tab.TRANSITION_DURATION = 150

    Tab.prototype.show = function () {
        var $this = this.element
        var $ul = $this.closest('ul:not(.dropdown-menu)')
        var selector = $this.data('target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        if ($this.parent('li').hasClass('active')) return

        var $previous = $ul.find('.active:last a')
        var hideEvent = $.Event('hide.bs.tab', {
            relatedTarget: $this[0]
        })
        var showEvent = $.Event('show.bs.tab', {
            relatedTarget: $previous[0]
        })

        $previous.trigger(hideEvent)
        $this.trigger(showEvent)

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

        var $target = $(selector)

        this.activate($this.closest('li'), $ul)
        this.activate($target, $target.parent(), function () {
            $previous.trigger({
                type: 'hidden.bs.tab',
                relatedTarget: $this[0]
            })
            $this.trigger({
                type: 'shown.bs.tab',
                relatedTarget: $previous[0]
            })
        })
    }

    Tab.prototype.activate = function (element, container, callback) {
        var $active = container.find('> .active')
        var transition = callback
            && $.support.transition
            && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

        function next() {
            $active
                .removeClass('active')
                .find('> .dropdown-menu > .active')
                .removeClass('active')
                .end()
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', false)

            element
                .addClass('active')
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', true)

            if (transition) {
                element[0].offsetWidth // reflow for transition
                element.addClass('in')
            } else {
                element.removeClass('fade')
            }

            if (element.parent('.dropdown-menu').length) {
                element
                    .closest('li.dropdown')
                    .addClass('active')
                    .end()
                    .find('[data-toggle="tab"]')
                    .attr('aria-expanded', true)
            }

            callback && callback()
        }

        $active.length && transition ?
            $active
                .one('bsTransitionEnd', next)
                .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
            next()

        $active.removeClass('in')
    }


    // TAB PLUGIN DEFINITION
    // =====================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.tab')

            if (!data) $this.data('bs.tab', (data = new Tab(this)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.tab

    $.fn.tab = Plugin
    $.fn.tab.Constructor = Tab


    // TAB NO CONFLICT
    // ===============

    $.fn.tab.noConflict = function () {
        $.fn.tab = old
        return this
    }


    // TAB DATA-API
    // ============

    var clickHandler = function (e) {
        e.preventDefault()
        Plugin.call($(this), 'show')
    }

    $(document)
        .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
        .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // AFFIX CLASS DEFINITION
    // ======================

    var Affix = function (element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options)

        this.$target = $(this.options.target)
            .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
            .on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this))

        this.$element = $(element)
        this.affixed = null
        this.unpin = null
        this.pinnedOffset = null

        this.checkPosition()
    }

    Affix.VERSION = '3.3.7'

    Affix.RESET = 'affix affix-top affix-bottom'

    Affix.DEFAULTS = {
        offset: 0,
        target: window
    }

    Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
        var scrollTop = this.$target.scrollTop()
        var position = this.$element.offset()
        var targetHeight = this.$target.height()

        if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

        if (this.affixed == 'bottom') {
            if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
            return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
        }

        var initializing = this.affixed == null
        var colliderTop = initializing ? scrollTop : position.top
        var colliderHeight = initializing ? targetHeight : height

        if (offsetTop != null && scrollTop <= offsetTop) return 'top'
        if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

        return false
    }

    Affix.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset
        this.$element.removeClass(Affix.RESET).addClass('affix')
        var scrollTop = this.$target.scrollTop()
        var position = this.$element.offset()
        return (this.pinnedOffset = position.top - scrollTop)
    }

    Affix.prototype.checkPositionWithEventLoop = function () {
        setTimeout($.proxy(this.checkPosition, this), 1)
    }

    Affix.prototype.checkPosition = function () {
        if (!this.$element.is(':visible')) return

        var height = this.$element.height()
        var offset = this.options.offset
        var offsetTop = offset.top
        var offsetBottom = offset.bottom
        var scrollHeight = Math.max($(document).height(), $(document.body).height())

        if (typeof offset != 'object') offsetBottom = offsetTop = offset
        if (typeof offsetTop == 'function') offsetTop = offset.top(this.$element)
        if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

        var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

        if (this.affixed != affix) {
            if (this.unpin != null) this.$element.css('top', '')

            var affixType = 'affix' + (affix ? '-' + affix : '')
            var e = $.Event(affixType + '.bs.affix')

            this.$element.trigger(e)

            if (e.isDefaultPrevented()) return

            this.affixed = affix
            this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

            this.$element
                .removeClass(Affix.RESET)
                .addClass(affixType)
                .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
        }

        if (affix == 'bottom') {
            this.$element.offset({
                top: scrollHeight - height - offsetBottom
            })
        }
    }


    // AFFIX PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.affix')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.affix

    $.fn.affix = Plugin
    $.fn.affix.Constructor = Affix


    // AFFIX NO CONFLICT
    // =================

    $.fn.affix.noConflict = function () {
        $.fn.affix = old
        return this
    }


    // AFFIX DATA-API
    // ==============

    $(window).on('load', function () {
        $('[data-spy="affix"]').each(function () {
            var $spy = $(this)
            var data = $spy.data()

            data.offset = data.offset || {}

            if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
            if (data.offsetTop != null) data.offset.top = data.offsetTop

            Plugin.call($spy, data)
        })
    })

}(jQuery);

// Generated by CoffeeScript 1.8.0

/*
 jQuery Credit Card Validator 1.0

 Copyright 2012-2015 Pawel Decowski

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software
 is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included
 in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 IN THE SOFTWARE.
 */

(function () {
    var $,
        __indexOf = [].indexOf || function (item) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item) return i;
            }
            return -1;
        };

    $ = jQuery;

    $.fn.validateCreditCard = function (callback, options) {
        var bind, card, card_type, card_types, get_card_type, is_valid_length, is_valid_luhn, normalize, validateCard,
            validate_number, _i, _len, _ref;
        card_types = [
            {
                name: 'amex',
                pattern: /^3[47]/,
                valid_length: [15]
            }, {
                name: 'diners_club_carte_blanche',
                pattern: /^30[0-5]/,
                valid_length: [14]
            }, {
                name: 'diners',
                pattern: /^3(0[0-5]|[68][0-9])/,
                valid_length: [14]
            }, {
                name: 'jcb',
                pattern: /^35(2[89]|[3-8][0-9])/,
                valid_length: [16]
            }, {
                name: 'laser',
                pattern: /^6(304|70[69]|771)/,
                valid_length: [16, 17, 18, 19]
            }, {
                name: 'visa_electron',
                pattern: /^4(0(2739|6238)|2(1544|3949)|5(0942|732[01]|760[2345])|64620|91(511|60[23]|614)|99812)/,
                valid_length: [16]
            }, {
                name: 'elo',
                pattern: /^(4011|438935|451416|4576|457393|504175|506699|5067|5090[4567]|636297|636368)/,
                valid_length: [16]
            }, {
                name: 'visa',
                pattern: /^4/,
                valid_length: [13, 16, 19]
            }, {
                name: 'codensa',
                pattern: /^590712/,
                valid_length: [16]
            }, {
                name: 'master',
                pattern: /^(5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/,
                valid_length: [16]
            }, {
                name: 'maestro',
                pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
                valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
            }, {
                name: 'discover',
                pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
                valid_length: [16]
            }, {
                name: 'ris',
                pattern: /^6372[0-9]{12}/,
                valid_length: [16]
            }
        ];
        bind = false;
        if (callback) {
            if (typeof callback === 'object') {
                options = callback;
                bind = false;
                callback = null;
            } else if (typeof callback === 'function') {
                bind = true;
            }
        }
        if (options == null) {
            options = {};
        }
        if (options.accept == null) {
            options.accept = (function () {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = card_types.length; _i < _len; _i++) {
                    card = card_types[_i];
                    _results.push(card.name);
                }
                return _results;
            })();
        }
        _ref = options.accept;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            card_type = _ref[_i];
            if (__indexOf.call((function () {
                    var _j, _len1, _results;
                    _results = [];
                    for (_j = 0, _len1 = card_types.length; _j < _len1; _j++) {
                        card = card_types[_j];
                        _results.push(card.name);
                    }
                    return _results;
                })(), card_type) < 0) {
                throw "Credit card type '" + card_type + "' is not supported";
            }
        }
        get_card_type = function (number) {
            var _j, _len1, _ref1;
            _ref1 = (function () {
                var _k, _len1, _ref1, _results;
                _results = [];
                for (_k = 0, _len1 = card_types.length; _k < _len1; _k++) {
                    card = card_types[_k];
                    if (_ref1 = card.name, __indexOf.call(options.accept, _ref1) >= 0) {
                        _results.push(card);
                    }
                }
                return _results;
            })();
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                card_type = _ref1[_j];
                if (number.match(card_type.pattern)) {
                    return card_type;
                }
            }
            return null;
        };
        is_valid_luhn = function (number) {
            var _base, sum, _actual, _j = 0;
            _base = number.split('');
            sum = +_base.pop();
            while (_actual = _base.pop()) {
                _actual = +_actual;
                if (_j % 2 == 0) {
                    _actual *= 2;
                    if (_actual > 9) {
                        _actual -= 9;
                    }
                }
                _j++;
                sum += _actual;
            }
            return sum % 10 === 0;
        };
        is_valid_length = function (number, card_type) {
            var _ref1;
            return _ref1 = number.length, __indexOf.call(card_type.valid_length, _ref1) >= 0;
        };
        validate_number = (function (_this) {
            return function (number) {
                var length_valid, luhn_valid;
                card_type = get_card_type(number);
                luhn_valid = false;
                length_valid = false;
                if (card_type != null) {
                    luhn_valid = is_valid_luhn(number);
                    length_valid = is_valid_length(number, card_type);
                }
                return {
                    card_type: card_type,
                    valid: luhn_valid && length_valid,
                    luhn_valid: luhn_valid,
                    length_valid: length_valid
                };
            };
        })(this);
        validateCard = (function (_this) {
            return function () {
                var number;
                number = normalize($(_this).val());
                return validate_number(number);
            };
        })(this);
        normalize = function (number) {
            return number ? number.replace(/[ -]/g, '') : '';
        };
        if (!bind) {
            return validateCard();
        }
        this.on('keyup blur', (function (_this) {
            return function () {
                return callback.call(_this, validateCard());
            };
        })(this));
        callback.call(this, validateCard());
        return this;
    };

}).call(this);

function makeCreditCardHelper(app) {
    $(".card-input").validateCreditCard(function (result) {
        var cardBox = $(this).closest(".card-validator");
        if ($(this).length) {
            app.franchise = null;
            cardBox.removeClass().addClass('card-validator');
            if (result.card_type) {
                if (result.valid) {
                    app.franchise = result.card_type.name;
                }
                cardBox.addClass(result.card_type.name);
            }
        }
    });

    $(".cvv-hint-toggle").on('click', function () {
        $(".cvv-hint").toggleClass('hidden');
    });

    $(".expiration-input").on('keydown keyup', function (event) {
        var expiration = app.instrument.card.expiration;
        var key = keyCodeAsText(event.which);
        if (event.type == 'keydown') {
            var maxLength = 5;
            if (key) {
                // Allow only those characters
                if (!key.match(/\d|Tab|Enter|Arrow\w+|Backspace|\//)) {
                    return false;
                }
                if (expiration) {
                    if (expiration.length >= maxLength) {
                        if (!key.match(/Tab|Enter|Arrow\w+|Backspace/)) {
                            return false;
                        }
                    }
                    if (expiration.length == 2 && key.match(/\d/)) {
                        app.instrument.card.expiration += "/";
                    }
                }
            } else {
                if (expiration && expiration.length == 2) {
                    app.instrument.card.expiration += "/";
                }
            }
            return true;
        } else {
            if (expiration && expiration.match(/\/\//)) {
                app.instrument.card.expiration = expiration.replace('//', '/');
            }
        }
    });
}

function calculateExpiration(app, p2p) {
    moment.locale(p2p.locale);

    var diff = moment() - moment(p2p.date);
    var realNow = function () {
        return moment().subtract(diff / 1000, 'seconds');
    };
    app.expiration = moment(p2p.expiration).from(realNow());

    if (p2p.actionable) {
        var millisecondsToExpire = (moment(p2p.expiration) - realNow()) + 2000;
        // Some devices fail when the expiration its too large
        if (millisecondsToExpire < 7200000) {
            setTimeout(function () {
                location.href = p2p.routes.state;
            }, millisecondsToExpire);
        }
    }

    setInterval(function () {
        app.expiration = moment(p2p.expiration).from(realNow());
    }, 10000);
}

/**
 * By default if its not provided the required, its REQUIRED
 */
var namePattern = '/^[a-zñáéíóúäëïöüàèìòùÑÁÉÍÓÚÄËÏÖÜÀÈÌÒÙÇçÃã\'\\.\\&\\- ]{2,60}$/i';
var validationList = {
    'payer.name': {
        fields: 'name',
        pattern: namePattern
    },
    'payer.surname': {
        fields: 'surname',
        required: false,
        validator: validateSurname
    },
    'payer.document': {
        fields: 'document',
        validator: validateDocument
    },
    'payer.documentType': {
        fields: 'document_type'
    },
    'payer.email': {
        fields: 'email',
        pattern: '/^([a-z\\d_\.\-])+\\@(([a-zA-Z0-9\-])+\\.)+([a-z\\d]{2,4})$/i'
    },
    'payer.mobile': {
        fields: 'mobile',
        pattern: '/([0|\+?\\d{1,5})?([0-9 \(\)]{7,})([\(\)\\w\\d\\. ]+)?/',
        maxLength: 19
    },
    'gateway': {
        fields: 'payment-method-grid',
        validator: validatePaymentMethod
    },
    'instrument.card.number': {
        fields: 'codensa_number|card_number|diners_number|debit_number|ris_number',
        validator: validateCardNumber
    },
    'instrument.card.expiration': {
        fields: 'codensa_expiration|card_expiration|diners_expiration|debit_expiration|ris_expiration',
        pattern: '/^((1[012])|(0\\d))\/\\d{2}$/',
        validator: validateExpiration
    },
    'instrument.card.cvv': {
        fields: 'codensa_cvv|card_cvv|diners_cvv|debit_cvv|diners_wallet_cvv|wallet_card_cvv',
        pattern: '/^\\d{3,4}$/',
        validator: validateCVV
    },
    'instrument.card.kind': {
        fields: 'debit_kind'
    },
    'instrument.card.installments': {
        fields: 'codensa_installments|card_installments|diners_installments|ris_installments|wallet_card_installments'
    },
    'instrument.bank.interface': {
        fields: 'pse_bank_interface'
    },
    'instrument.bank.code': {
        fields: 'pse_bank_code|account_bank'
    },
    'instrument.pin': {
        fields: 'ganapin_pin|ris_pin'
    },
    'instrument.otp': {
        fields: 'diners_otp|diners_wallet_otp',
        required: false,
        validator: validateOTP
    },
    'instrument.password': {
        fields: 'ganapin_password'
    },
    'instrument.credit': {
        fields: 'diners_credit|diners_wallet_credit',
        validator: validateCredit
    },
    'partialPayment': {
        fields: 'partial_payment',
        validator: validatePartialAmount
    },
    'instrument.accountType': {
        fields: 'account_type'
    },
    'instrument.accountNumber': {
        fields: 'account_number',
        pattern: '/^[\\w\\-]{3,20}$/'
    },
    'helpers.wOtp': {
        fields: 'w_otp',
        pattern: '/^\\d{6}$/'
    }
};

/**
 * Handles the .validation fields, keep in mind it should be invoked from a listener
 * @param event
 */
validationEventListener = function (event) {
    var field = $(this);
    var fields, validation = null;
    var id = field.attr('id');
    var idPattern = new RegExp(id + '(\\||$)');
    for (var temporalRule in validationList) {
        fields = validationList[temporalRule]['fields'];
        if (fields.search(idPattern) != -1) {
            validation = temporalRule;
            break;
        }
    }
    validate(validation);
};

/**
 * It could validate one or more rules passing a string or an array
 * @param validations
 * @param omit
 * @returns {boolean}
 */
function validate(validations, omit) {
    validations = validations.split('|');
    var passing = true;
    var rule = null;
    for (var validation in validations) {
        if (validations.hasOwnProperty(validation)) {
            var itemPassing = true;
            // Instead of the index, validation is the name
            validation = validations[validation];

            rule = validationList[validation];
            if (!rule) {
                continue;
            }
            var fields = rule['fields'];
            manageClassForFieldGroups(fields, 'is-invalid', false, omit);
            manageClassForFieldGroups(fields, 'is-correct', false, omit);

            // Default validation
            var regex = rule['pattern'] ? getRegExp(rule['pattern']) : null;
            var maxLength = rule['maxLength'] ? rule['maxLength'] : null;
            var value = getValueWithNotation(validation);

            if (rule.hasOwnProperty('required') && rule['required'] == false && (!value || value.length == 0)) {
                // Does not need validation because its not required and there is no value
            } else {
                if (!value || value.length == 0) {
                    passing = false;
                    itemPassing = false;
                }
                if (regex && !regex.test(value)) {
                    passing = false;
                    itemPassing = false;
                }
                if (value && maxLength && value.length > maxLength) {
                    passing = false;
                    itemPassing = false;
                }
            }

            if (rule['validator']) {
                // It has a custom function to validate
                if (!rule['validator'](validation, rule, omit)) {
                    passing = false;
                    itemPassing = false;
                }
            }

            if (itemPassing) {
                manageClassForFieldGroups(fields, 'is-correct', true, omit);
            } else {
                manageClassForFieldGroups(fields, 'is-invalid', true, omit);
            }

        }

    }
    return passing;
}

/**
 * Parses a PHP regex expression to a Javascript one
 * @param pattern
 * @returns {*}
 */
function getRegExp(pattern) {
    if (!pattern)
        return false;

    var regex = pattern;
    var modifiers = null;
    var lastIndex = -1;
    if (regex) {
        regex = regex.substr(1);
        lastIndex = regex.lastIndexOf('/');
        modifiers = regex.substr(lastIndex).substr(1);
        regex = regex.substr(0, regex.lastIndexOf('/'));
        regex = new RegExp(regex, modifiers);
    }
    return regex;
}

function manageClassForFieldGroups(fields, css, add, omit) {
    if (!omit) {
        fields = fields.split('|');
        var elementsGroup = null;
        for (var field in fields) {
            if (fields.hasOwnProperty(field)) {
                field = fields[field];
                elementsGroup = $("#" + field).closest('.form-group');
                if (add) {
                    elementsGroup.addClass(css);
                } else {
                    elementsGroup.removeClass(css);
                }
            }
        }
    }
}

function getValueWithNotation(notation) {
    try {
        notation = notation.split('.');
        var holder = app[notation[0]];
        for (var i = 1; i < notation.length; i++) {
            holder = holder[notation[i]];
        }
        return holder;
    } catch (e) {
        return null;
    }
}

function validateDocument(validation, rule, omit) {
    manageClassForFieldGroups('document_type|document', 'is-correct', false, omit);
    manageClassForFieldGroups('document_type|document', 'is-invalid', false, omit);

    var type = getValueWithNotation('payer.documentType');
    var value = getValueWithNotation('payer.document');

    if (!type || !value || value.length < 5) {
        return false;
    }

    var documentTypeValidator = {
        'CC': '/^[1-9][0-9]{4,9}$/',
        'CE': '/^([a-zA-Z]{1,5})?[1-9][0-9]{3,7}$/',
        'NIT': '/^[1-9][0-9]{6,8}(\\-[0-9])?$/',
        'RUT': '/^[1-9][0-9]{4,9}(\\-[0-9])?$/',
        'TI': '/^[1-9][0-9]{4,11}$/',
        'SSN': '/^([0-9]{3}\\-[0-9]{2}\\-[0-9]{4}|[0-9]{9})$/',
        'PPN': '/^[a-zA-z0-9]{4,12}$/',
        'CPF': '/^\\d{11}$/',
        'CI': '/^(\\d{9}\-?\\d)$/',
        'RUC': '/^\\d{13,14}$/',
        'TAX': '/^\\w{4,12}$/'
    };
    if (!type) {
        manageClassForFieldGroups('document_type', 'is-invalid', true, omit);
        return false;
    }
    var regex = getRegExp(documentTypeValidator[type]);
    if (!regex || !regex.test(value)) {
        manageClassForFieldGroups('document', 'is-invalid', true, omit);
        return false;
    }
    manageClassForFieldGroups('document_type|document', 'is-correct', true, omit);
    return true;
}

function validateCredit(validation, rule, omit) {
    try {
        if (!app.helpers.dinersService) {
            return true;
        }
        var creditSplit = app.helpers.creditSelected.split('|');
        if (creditSplit.length === 4) {
            app.instrument.credit.code = creditSplit[0];
            app.instrument.credit.type = creditSplit[1];
            app.instrument.credit.groupCode = creditSplit[2];
            app.instrument.credit.installment = creditSplit[3];
            return true;
        }
    } catch (e) {
    }
    return false;
}

function validatePaymentMethod(validation, rule, omit) {
    if (!getValueWithNotation(validation)) {
        $("#" + rule['fields']).addClass('is-invalid');
        return false;
    }

    return true;
}

function validateCardNumber(validation, rule, omit) {
    var valid = app.validCreditCard;
    manageClassForFieldGroups(rule['fields'], 'is-invalid', false, omit);
    if (!valid) {
        manageClassForFieldGroups(rule['fields'], 'is-invalid', true, omit);
    } else {
        app.instrument.card.name = app.payer.name + " " + app.payer.surname;
    }
    return valid;
}

function validatePartialAmount(validation, rule, omit) {
    var amount = getValueWithNotation(validation);
    if (amount < p2p.session.minPayment) {
        // Sets the maximum amount to be payed
        // app.payment = p2p.session.minPayment;
        return false;
    }
    if (amount > p2p.session.remaining) {
        // Sets the maximum amount to be payed
        // app.payment = p2p.session.remaining;
        return false;
    }
    return true;
}

function validateExpiration(validation, rule, omit) {
    var expiration = getValueWithNotation(validation);
    try {
        var month = +expiration.split('/')[0];
        var year = +expiration.split('/')[1];
        var actualMonth = (new Date()).getMonth() + 1;
        var actualYear = (new Date()).getYear() - 100;

        if (actualYear > year) {
            return false;
        }
        if (year - actualYear > 30) {
            return false;
        }
        return !(actualYear == year && actualMonth > month);

    } catch (e) {
        return false;
    }
}

function validateCVV(validation, rule, omit) {
    var cvv = getValueWithNotation(validation);
    if (cvv) {
        try {
            if (!app.franchise) {
                return false;
            }
            if (app.franchise == "amex") {
                return cvv.length == 4;
            } else {
                return cvv.length == 3;
            }
        } catch (e) {
            return false;
        }
    }
    return false;
}

function validateOTP(validation, rule, omit) {
    var otp = getValueWithNotation(validation);
    if (getValueWithNotation('helpers.avoidOtp')) {
        return true;
    } else {
        return /\d{6}/.test(otp);
    }
}

function validateSurname(validation, rule, omit) {
    var documentType = getValueWithNotation('payer.documentType');
    if (documentType && p2p.businessDocumentTypes.indexOf(documentType) !== -1) {
        return true;
    } else {
        var value = getValueWithNotation('payer.surname');
        return !(!value || !getRegExp(namePattern).test(value));
    }
}

var timeout;
var app = new Vue({
    el: '#app',
    data: {
        step: 1,
        wallet: p2p.wallet,
        payer: p2p.payer,
        instrument: {
            card: {
                name: null,
                number: null,
                expiration: null,
                expirationMonth: null,
                expirationYear: null,
                installments: null,
                cvv: null
            },
            credit: {
                code: null,
                type: null,
                groupCode: null,
                installment: null
            },
            otp: null
        },
        walletGateway: null,
        gateway: null,
        franchise: null,
        fingerprint: null,
        partialPayment: p2p.session.remaining,
        error: null,
        processing: true,
        expiration: p2p.expiration,
        authorizeShare: false,
        helpers: {
            wOtp: null,
            wTrust: true,
            wError: null,
            deleteMethod: null,
            interest: null,
            creditSelected: null,
            creditTypes: null,
            otpGenerated: false,
            creditLoader: false,
            interestLoader: false,
            otpLoader: false,
            dinersService: true,
            avoidOtp: false
        },
        errorCount: 0,
        _token: p2p._token
    },
    methods: {
        payerContinue: payerContinue,
        checkPayerEmail: checkPayerEmail,
        cancelPayment: cancelPayment,
        goBackMerchant: goBackMerchant,
        handleProceed: handleProceed,
        selectGateway: selectGateway,
        handleAssignGanaPin: assignGanaPin,
        dnCreditTypes: dnCreditTypes,
        dnInterest: dnInterest,
        authWallet: authWallet,
        revokeWalletUser: revokeWalletUser,
        selectMethod: function (method, b) {
            if (app.helpers.deleteMethod) {
                return true;
            }
            if (method.disabled) {
                return true;
            }
            if (app.methodSelected) {
                resetSelectedPaymentMethod();
            } else {
                app.gateway = null;
                app.wallet.method = method.id;
                app.walletGateway = method.gateway;

                if (method.gateway == 'card') {
                    app.franchise = method.franchise;
                } else if (method.gateway == 'diners') {
                    app.franchise = method.franchise;
                    dnCreditTypes();
                }

            }
        },
        handleMethodRemove: function (method) {
            // TODO: Remove the payment method
            if (app.helpers.deleteMethod === null) {
                app.helpers.deleteMethod = method.id;
                timeout = setTimeout(function () {
                    app.helpers.deleteMethod = null;
                }, 5000);
            } else {
                if (app.helpers.deleteMethod === method.id) {
                    clearTimeout(timeout);

                    $.ajax({
                        method: "POST",
                        url: p2p.routes.walletRemove,
                        data: {
                            email: app.payer.email,
                            method: app.helpers.deleteMethod,
                            _token: p2p._token
                        },
                        dataType: "json",
                        success: function (data) {
                            resetSelectedPaymentMethod();

                            app.wallet = data.wallet;
                            if (data.payer) {
                                app.payer = data.payer;
                            }
                        },
                        error: function (data) {
                            handleAjaxError(data);
                        }
                    });

                } else {
                    clearTimeout(timeout);
                    timeout = setTimeout(function () {
                        app.helpers.deleteMethod = null;
                    }, 300);
                }
            }
        },
        dnOtpGenerate: dnOtpGenerate
    },
    computed: {
        validCreditCard: function () {
            if (this.franchise) {
                var availables = p2p.availableFranchises[this.gateway];
                if (availables) {
                    return availables.indexOf(this.franchise) !== -1;
                }
            }
            return false;
        },
        methodSelected: function () {
            return !!(this.gateway || this.walletGateway);
        },
        partialAmount: function () {
            return p2p.session.currency + " $" + number_format(this.payment);
        },
        cvvLength: function () {
            return this.franchise === 'amex' ? 4 : 3;
        },
        payerRegistered: function () {
            return this.wallet.state === 'registered' || this.wallet.state === 'set';
        },
        payerUnknown: function () {
            return this.wallet.state === 'unknown' || this.wallet.state === 'update';
        },
        displayFullPerson: function () {
            return this.wallet.state === 'unregistered' || this.wallet.state === 'update';
        },
        isBusinessDocument: function () {
            return !!(this.payer.documentType && (p2p.businessDocumentTypes.indexOf(this.payer.documentType) !== -1));
        }
    },
    ready: function () {
        this.processing = false;
        $('.validation').on('blur change', validationEventListener);

        makeCreditCardHelper(this);
        calculateExpiration(this, p2p);
        readyWallets(this, p2p);

        new Fingerprint2().get(function (result, components) {
            app.fingerprint = result;

            if (validate('payer.name|payer.surname|payer.document|payer.email', true)) {
                payerContinue();
            }
        });

        if (p2p.isFrame) {
            sendFrameMessage('ehlo', {});
        }
    }
});

function checkPayerEmail() {
    var rules = [
        'payer.email'
    ];
    if (validate(rules.join('|'))) {
        $.ajax({
            method: "POST",
            url: p2p.routes.walletCheck,
            data: {
                email: app.payer.email,
                _token: p2p._token
            },
            dataType: "json",
            success: function (data) {
                resetSelectedPaymentMethod();
                app.wallet = data.wallet;
                if (data.payer) {
                    app.payer = data.payer;
                }
            },
            error: function (data) {
                handleAjaxError(data);
                app.wallet.state = 'unregistered';
            }
        });
    }
}

function authWallet() {
    var rules = [
        'helpers.wOtp'
    ];
    if (validate(rules.join('|'))) {
        $.ajax({
            method: "POST",
            url: p2p.routes.walletAuth,
            data: {
                id: app.wallet.id,
                otp: app.helpers.wOtp,
                trust: app.helpers.wTrust,
                fingerprint: app.fingerprint,
                email: app.payer.email,
                _token: p2p._token
            },
            dataType: "json",
            success: function (data) {
                app.helpers.wError = null;
                app.wallet.authorized = true;
                $("#w_modal").modal('hide');
                handleProceed();
            },
            error: function (data) {
                var response = data.responseJSON.status;
                if (response.reason === 'WC') {
                    app.error = response.message;
                    $("#w_modal").modal('hide');
                    app.helpers.wError = null;
                } else {
                    app.helpers.wError = response.message;
                }
                app.helpers.wOtp = null;
            }
        });
    }
}

function handleAjaxError(data) {
    if (data.status === 408) {
        location.reload();
    } else if (data.status === 0) {
        app.error = p2p.lang.connectionError;
    } else if (data.responseJSON) {
        var status = data.responseJSON.status;

        // TODO: Improve
        if (status.reason === 'OT') {
            app.instrument.otp = null;
            app.error = status.message;
            app.errorCount++;
            if (app.errorCount >= 4) {
                alert(p2p.lang.maxErrorsReached);
                cancelPayment();
            }
        } else if (status.reason === 'WA') {

            $("#w_modal").modal();

        } else {
            app.error = status.message;
        }

        return status;
    } else if (data.responseText) {
        console.log(data);
    }
}

function payerContinue() {
    var rules;
    if (app.payerUnknown) {
        checkPayerEmail();
    } else {
        rules = [
            'payer.email',
            'payer.document',
            'payer.documentType',
            'payer.name',
            'payer.surname',
            'payer.mobile'
        ];
        // Validate the data
        if (validate(rules.join('|'))) {
            app.wallet.state = 'set';
        }
    }
}

function handleProceed() {
    var gatewayRules = {
        'card': {
            rules: [
                'instrument.card.number',
                'instrument.card.expiration',
                'instrument.card.cvv',
                'instrument.card.installments'
            ],
            additional: null
        },
        'codensa': {
            rules: [
                'instrument.card.number',
                'instrument.card.expiration',
                'instrument.card.cvv',
                'instrument.card.installments'
            ],
            additional: null
        },
        'debit': {
            rules: [
                'instrument.card.number',
                'instrument.card.kind',
                'instrument.card.expiration',
                'instrument.card.cvv'
            ],
            additional: null
        },
        'pse': {
            rules: [
                'instrument.bank.interface',
                'instrument.bank.code'
            ],
            additional: null
        },
        'paypal': {
            rules: [],
            additional: null
        },
        'ris': {
            rules: [
                'instrument.card.number',
                'instrument.card.expiration',
                'instrument.pin',
                'instrument.card.installments'
            ],
            additional: null
        },
        'ganapin': {
            rules: [
                'instrument.password'
            ],
            additional: null
        },
        'cash': {
            rules: [],
            additional: null
        },
        'alkosto': {
            rules: [],
            additional: null
        },
        'exito': {
            rules: [],
            additional: null
        },
        'safetypay': {
            rules: [],
            additional: null
        },
        'diners': {
            rules: [
                'instrument.card.number',
                'instrument.card.expiration',
                'instrument.card.cvv',
                'instrument.otp'
            ],
            additional: function () {
                if (!p2p.isSubscription) {
                    return validate('instrument.credit');
                }
                return true;
            }
        },
        'account': {
            rules: [
                'instrument.bank.code',
                'instrument.accountType',
                'instrument.accountNumber'
            ],
            additional: null
        }
    };

    var walletRules = {
        'diners': {
            rules: [
                'instrument.card.cvv'
            ],
            additional: function () {
                if (!p2p.isSubscription) {
                    return validate('instrument.credit');
                }
                return true;
            }
        },
        'card': {
            rules: [
                'instrument.card.cvv',
                'instrument.card.installments'
            ],
            additional: null
        }
    };

    var actualRules = null;
    if (app.gateway) {
        actualRules = gatewayRules[app.gateway];
    } else if (app.walletGateway) {
        actualRules = walletRules[app.walletGateway];
    }

    if (!actualRules) {
        console.log("No rules defined for the gateway: " + app.gateway);
        return false;
    }

    if (!actualRules.rules.length || validate(actualRules.rules.join('|'))) {
        if (!actualRules.additional || actualRules.additional()) {
            // Proceed
            proceed();
            return true;
        }
    }
    // Fallback
    console.log("Falling back");
    return false;
}

function assignGanaPin() {
    var validationRules = {
        rules: [
            'instrument.pin',
            'instrument.password'
        ],
        additional: null
    };

    if (!validate(validationRules.rules.join('|'))) {
        return false;
    }

    app.processing = true;
    var pinWrapper = $("#ganapin_well");
    var pinMessage = $("#ganapin_message");

    $.ajax({
        method: "POST",
        url: p2p.routes.ganapin,
        data: app.$data,
        dataType: "json",
        success: function (data) {
            pinWrapper.removeClass('invalid valid');
            if (data.status !== 'APPROVED') {
                pinWrapper.addClass('invalid');
                pinMessage.html(data.message);
            } else {
                pinWrapper.addClass('valid');
                p2pData.instrument.pin = '';
                pinMessage.html(data.message)
            }
            app.processing = false;
        },
        error: function (data) {
            pinMessage.html(data.responseJSON.status.message);
            app.processing = false;
        }
    });
}

function proceed() {
    app.processing = true;

    var timer;
    var gateway = app.gateway;
    if (!gateway) {
        gateway = app.walletGateway;
    }
    // At this point the input its valid
    if (gateway === 'card' || gateway === 'debit' || gateway === 'diners') {
        // A timer to this particular payment method
        timer = setTimeout(function () {
            gotoState();
        }, 20000);
    }

    if (app.instrument.card.expiration) {
        var expirationSplit = app.instrument.card.expiration.split('/');
        if (expirationSplit.length === 2) {
            app.instrument.card.expirationMonth = expirationSplit[0];
            app.instrument.card.expirationYear = expirationSplit[1];
        }
    }

    // Clone and b64 encode
    var data = JSON.parse(JSON.stringify(app.$data));
    data.instrument.card.number = cardEncode(data.instrument.card.number);

    $.ajax({
        method: "POST",
        url: p2p.routes.process,
        data: data,
        dataType: "json",
        success: function (data) {
            location.href = data.url;
        },
        error: function (data) {
            handleAjaxError(data);
            clearTimeout(timer);
            app.processing = false;
        }
    });

}

function selectGateway(gateway) {
    if (app.methodSelected) {
        resetSelectedPaymentMethod();
    } else {
        if (gateway) {
            app.gateway = gateway;
        }
    }
}

function gotoState() {
    location.href = p2p.routes.state;
}

function dnCreditTypes() {
    if (p2p.isSubscription) {
        dnOtpGenerate();
        return true;
    }

    if (app.wallet.method) {
        // Do nothing
    } else {
        var validationRules = {
            rules: [
                'instrument.card.number'
            ],
            additional: null
        };

        if (!validate(validationRules.rules.join('|'))) {
            return false;
        }
    }

    app.helpers.creditLoader = true;
    $.ajax({
        method: "POST",
        url: p2p.routes.dnExtra,
        data: {
            'action': 'creditTypes',
            'wallet': {
                'id': app.wallet.id,
                'method': app.wallet.method
            },
            'cardNumber': cardEncode(app.instrument.card.number),
            '_token': p2p._token
        },
        dataType: "json",
        success: function (data) {
            app.helpers.creditLoader = false;
            app.helpers.dinersService = data.service;
            if (data.service) {
                app.helpers.creditTypes = data.creditTypes;
                app.instrument.credit = {};
                app.instrument.otp = null;
                dnOtpGenerate();
            } else {
                app.helpers.otpLoader = false;
                app.helpers.otpGenerated = false;
                app.helpers.creditTypes = null;
                app.instrument.credit = data.creditTypes[0];
                app.instrument.otp = '000000';
            }
        },
        error: function (data) {
            handleAjaxError(data);
            app.helpers.creditLoader = false;
        }
    });
}

function dnInterest() {
    if (p2p.isSubscription) {
        return true;
    }

    var validationRules = {
        rules: [
            'instrument.credit'
        ],
        additional: null
    };

    if (!validate(validationRules.rules.join('|'))) {
        return false;
    }

    app.helpers.interestLoader = true;
    app.helpers.interest = null;
    $.ajax({
        method: "POST",
        url: p2p.routes.dnExtra,
        data: {
            'action': 'interest',
            'wallet': {
                'id': app.wallet.id,
                'method': app.wallet.method
            },
            'cardNumber': cardEncode(app.instrument.card.number),
            'credit': app.instrument.credit,
            '_token': p2p._token
        },
        dataType: "json",
        success: function (data) {
            app.helpers.interestLoader = false;
            app.helpers.interest = data;
        },
        error: function (data) {
            handleAjaxError(data);
            app.helpers.interestLoader = false;
        }
    });
}

function dnOtpGenerate() {
    if (app.wallet.method) {
        return false;
    } else {
        var validationRules = {
            rules: [
                'instrument.card.number'
            ],
            additional: null
        };

        if (!validate(validationRules.rules.join('|'))) {
            return false;
        }
    }

    app.helpers.otpLoader = true;
    app.helpers.avoidOtp = false;
    $.ajax({
        method: "POST",
        url: p2p.routes.dnExtra,
        data: {
            'action': 'otpGenerate',
            'wallet': {
                'id': app.wallet.id,
                'method': app.wallet.method
            },
            'cardNumber': cardEncode(app.instrument.card.number),
            '_token': p2p._token
        },
        dataType: "json",
        success: function (data) {
            var generated = data.status.status == 'OK';
            app.helpers.otpLoader = false;
            app.helpers.otpGenerated = generated;
            if (!generated) {
                if (data.status.reason == 'NR') {
                    app.helpers.avoidOtp = true;
                } else {
                    app.error = data.status.message;
                }
            }
        },
        error: function (data) {
            handleAjaxError(data);
            app.helpers.otpLoader = false;
        }
    });
}

function resetSelectedPaymentMethod() {
    app.gateway = null;
    app.walletGateway = null;
    app.wallet.method = null;
    app.franchise = null;
    // TODO: Some kind of restore
    app.helpers = {
        interest: null,
        creditSelected: null,
        creditTypes: null,
        otpGenerated: false,
        creditLoader: false,
        interestLoader: false,
        otpLoader: false
    };
    app.instrument.card.number = null;
    app.instrument.otp = null;
}

function revokeWalletUser() {
    app.wallet.id = null;
    app.wallet.state = 'unregistered';
    app.wallet.methods = null;
    app.wallet.method = null;
    // TODO: make the call to really revoke
}

function onVisaCheckoutReady() {
    if ($("#method_vc")) {
        V.init({
            apikey: _vc.apiKey,
            externalClientId: _vc.externalClientId,
            settings: {
                locale: p2p.locale,
                countryCode: p2p.countryCode,
                displayName: p2p.merchantName,
                logoUrl: p2p.logoUrl,
                review: {
                    message: p2p.session.description.replace(/[^\d\w \-]/gi, ''),
                    buttonAction: p2p.lang.continueVc
                },
                dataLevel: "SUMMARY"
            },
            paymentRequest: {
                merchantRequestId: p2p.session.reference,
                currencyCode: p2p.session.currency ? p2p.session.currency : 'COP',
                subtotal: p2p.session.subtotal - p2p.session.discount,
                shippingHandling: +p2p.session.shipping,
                tax: +p2p.session.tax,
                total: +p2p.session.total,
                description: p2p.session.description.replace(/[^\d\w \-]/gi, ''),
                orderId: p2p.session.reference
            }
        });

        V.on("payment.success", function (data) {
            $.ajax({
                method: "POST",
                url: p2p.routes.visaDecrypt,
                data: {
                    login: p2p.login,
                    encKey: data.encKey,
                    payload: data.encPaymentData,
                    callid: data.callid,
                    _token: p2p._token
                },
                dataType: "json",
                success: function (data) {
                    location.href = data.url;
                },
                error: function (data) {
                    handleAjaxError(data);
                    app.processing = false;
                }
            })
        });
        V.on("payment.cancel", function (a, b) {
            // TODO: What do I have to do
            console.log(a, b);
        });
        V.on("payment.error", function (a, b) {
            // TODO: What do I have to do
            console.log('Error', a, b);
        });
    }
}

function readyWallets(app, p2p) {
    if ($("#method_masterpass")) {
        $("#masterpass-button").find("img").on('click', masterpassInquiry);

        /**
         * Receives the information given by masterpass and send it back to the server to decrypt
         * @param data
         */
        function masterpassSuccess(data) {
            app.processing = true;
            $.ajax({
                method: "POST",
                url: p2p.routes.mpDecrypt,
                data: $.extend(data, {
                    _token: p2p._token
                }),
                dataType: 'json',
                success: function (data) {
                    location.href = data.url;
                    app.processing = false;
                },
                error: function (data) {
                    app.error = data.status.message;
                    app.processing = false;
                }
            });
        }

        function masterpassInquiry() {
            app.processing = true;
            $.ajax({
                method: "POST",
                url: p2p.routes.mpInquiry,
                data: {
                    _token: p2p._token
                },
                dataType: 'json',
                success: function (data) {
                    MasterPass.client.checkout({
                        "requestToken": data.requestToken,
                        "callbackUrl": data.callbackUrl,
                        "failureCallback": console.log,
                        "cancelCallback": console.log,
                        "successCallback": masterpassSuccess,
                        "merchantCheckoutId": data.merchantCheckoutId,
                        // "allowedCardTypes": ["master,amex,diners,discover,maestro,visa"],
                        "version": "v6",
                        "suppressShippingAddressEnable": true
                    });
                    app.processing = false;
                },
                error: function (data) {
                    handleAjaxError(data);
                    app.processing = false;
                }
            });
        }
    }
}

//# sourceMappingURL=main.js.map
