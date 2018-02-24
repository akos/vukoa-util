'use strict';
var utils = require('core-util-is');
var isStearm = require('isstream');
var isClass = require('is-class');

Object.keys(utils).map(function (name) {
    exports[name] = utils[name];
});

exports.isStream = isStearm;
exports.isReadableStream = isStearm.isReadable;
exports.isWritableStream = isStearm.isWritable;
exports.isDuplexStream = isStearm.isDuplex;

exports.isClass = isClass;

/**
 * Extend method
 */
exports.isString = function isString  (str) {
    //是否字符串
    return Object.prototype.toString.call(str).slice(8, -1) === 'String'
}
exports.isFinite = function (o) {
    return Number.isFinite(o);
};

exports.isNaN = function (obj) {
    return Number.isNaN(obj);
};

exports.isGenerator = function (obj) {
    return obj
        && 'function' === typeof obj.next
        && 'function' === typeof obj.throw;
};

exports.isGeneratorFunction = function (obj) {
    return obj
        && obj.constructor
        && 'GeneratorFunction' === obj.constructor.name;
};

exports.isAsyncFunction = function (obj) {
    return obj
        && obj.constructor
        && 'AsyncFunction' === obj.constructor.name;
};

exports.isPromise = function (obj) {
    return obj
        && 'function' === typeof obj.then;
};

var MAX_INT_31 = Math.pow(2, 31);

exports.isInt = function (obj) {
    return utils.isNumber(obj)
        && obj % 1 === 0;
};

exports.isInt32 = function (obj) {
    return exports.isInt(obj)
        && obj < MAX_INT_31
        && obj >= -MAX_INT_31;
};

exports.islong = function (obj) {
    return exports.isInt(obj)
        && (obj >= MAX_INT_31 || obj < -MAX_INT_31);
};

exports.isLong = function (obj) {
    return exports.isObject(obj)
        && exports.isNumber(obj.high)
        && exports.isNumber(obj.low);
};

exports.isDouble = function (obj) {
    return utils.isNumber(obj)
        && !isNaN(obj)
        && obj % 1 !== 0;
};

/**
 * override core-util-is
 */

exports.isDate = function isDate(obj) {
    return obj instanceof Date;
};

exports.isRegExp = function isRegExp(obj) {
    return obj instanceof RegExp;
};

exports.isError = function isError(obj) {
    return obj instanceof Error;
};

exports.isArray = function isArray(obj) {
    return Array.isArray(obj);
};
/////


exports.isDate = function isDate(o) { //是否时间
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
}


exports.isError = function isError(o) { //是否错误对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
}

exports.isSymbol = function isSymbol (o) { //是否Symbol函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
}


exports.isSet = function isSet(o) { //是否Set对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}



exports.isFalse = function isFalse(o) {
    if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
    return false
}

exports.isTrue = function isTrue(o) {
    return !this.isFalse(o)
}

exports.isIos = function isIos () {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        // return "Android";
        return false
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        // return "iPhone";
        return true
    } else if (u.indexOf('iPad') > -1) {//iPad
        // return "iPad";
        return false
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
        // return "Windows Phone";
        return false
    }else{
        return false
    }
}

exports.isPC = function isPC () { //是否为PC端
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

exports.isBrowserType = function isBrowserType(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) return "IE7"
        else if(fIEVersion == 8) return "IE8";
        else if(fIEVersion == 9) return "IE9";
        else if(fIEVersion == 10) return "IE10";
        else return "IE7以下"//IE版本过低
    }
    if (isIE11) return 'IE11';
    if (isEdge) return "Edge";
    if (isFF) return "FF";
    if (isOpera) return "Opera";
    if (isSafari) return "Safari";
    if (isChrome) return "Chrome";
}
/**
 * @param {object} obj
 * @returns {boolean}
 */
exports.isEmptyObj = function isEmptyObj(obj) {
    let isEmpty = true;
    if (typeof obj === 'object') {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop))
                isEmpty = false;
        }
    } else
        isEmpty = false;

    return isEmpty;
}
// 严格的身份证校验
exports.isCardID = function isCardID(sId) {
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
        return false
    }
    //身份证城市
    var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
    if(!aCity[parseInt(sId.substr(0,2))]) {
        return false
    }

    // 出生日期验证
    var sBirthday=(sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2))).replace(/-/g,"/"),
        d = new Date(sBirthday)
    if(sBirthday != (d.getFullYear()+"/"+ (d.getMonth()+1) + "/" + d.getDate())) {
        return false
    }

    // 身份证号码校验
    var sum = 0,
        weights =  [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        codes = "10X98765432"
    for (var i = 0; i < sId.length - 1; i++) {
        sum += sId[i] * weights[i];
    }
    var last = codes[sum % 11]; //计算出来的最后一位身份证号码
    if (sId[sId.length-1] != last) {
        return false
    }

    return true
}
