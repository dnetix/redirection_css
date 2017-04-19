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
        toFixedFix = function(n, prec) {
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
    if(!money){ return 0; }
    return parseFloat(money.replace(/[$',\s]/g, ''));
}

function numberToMoney(valor) {
    return "$" + number_format(valor);
}

function scrollTo(element){
    element = element ? element : 'header';
    $('html, body').animate({
        scrollTop: $(element).offset().top
    }, 500);
}

function calculateExpiration(app, p2p) {
    moment.locale(p2p.locale);
    app.expiration = moment(p2p.expiration).fromNow();

    if (p2p.routes && p2p.routes.state) {
        var millisecondsToExpire = (moment(p2p.expiration) - moment()) + 2000;
        // Some devices fail when the expiration its too large
        if (millisecondsToExpire < 7200000) {
            setTimeout(function () {
                location.href = p2p.routes.state;
            }, millisecondsToExpire);
        }
    }

    setInterval(function () {
        app.expiration = moment(p2p.expiration).fromNow();
    }, 10000);
}

var app = new Vue({
    el: '#app',
    data: {
        step: 4,
        expiration: p2p.expiration,
        processing: true
    },
    methods: {
    },
    computed: {
    },
    ready: function () {
        this.processing = false;
        calculateExpiration(this, p2p);
    }
});


//# sourceMappingURL=result.js.map
