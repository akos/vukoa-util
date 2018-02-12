'use strict';

var utils = require('core-util-is');
var isStearm = require('isstream');
var isClass = require('is-class');
var Schema = require('async-validator');
var pinyin = require('pinyin');

/**
 * Expose all methods in core-util-is
 */

Object.keys(utils).map(function (name) {
    exports[transform(name)] = utils[name];
});

/**
 * Stream detected by isstream
 */

exports.stream = isStearm;
exports.pinyin = pinyin;
exports.readableStream = isStearm.isReadable;
exports.writableStream = isStearm.isWritable;
exports.duplexStream = isStearm.isDuplex;

/**
 * Class detected by is-class
 */
exports.class = isClass;

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

exports.isNaN = function (oboj) {
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
    return exports.int(obj)
        && obj < MAX_INT_31
        && obj >= -MAX_INT_31;
};

exports.islong = function (obj) {
    return exports.int(obj)
        && (obj >= MAX_INT_31 || obj < -MAX_INT_31);
};

exports.isLong = function (obj) {
    return exports.object(obj)
        && exports.number(obj.high)
        && exports.number(obj.low);
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

exports.browserType = function browserType(){
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

exports.checkStr = function checkStr (str, type) {
    switch (type) {
        case 'phone':   //手机号码
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
        case 'tel':     //座机
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'card':    //身份证
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
            return /^[a-zA-Z]\w{5,17}$/.test(str)
        case 'postal':  //邮政编码
            return /[1-9]\d{5}(?!\d)/.test(str);
        case 'QQ':      //QQ号
            return /^[1-9][0-9]{4,9}$/.test(str);
        case 'email':   //邮箱
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'money':   //金额(小数点2位)
            return /^\d*(?:\.\d{0,2})?$/.test(str);
        case 'URL':     //网址
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
        case 'IP':      //IP
            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
        case 'date':    //日期时间
            return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
        case 'number':  //数字
            return /^[0-9]$/.test(str);
        case 'english': //英文
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese': //中文
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':   //小写
            return /^[a-z]+$/.test(str);
        case 'upper':   //大写
            return /^[A-Z]+$/.test(str);
        case 'HTML':    //HTML标记
            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
        default:
            return true;
    }

    // 严格的身份证校验
    exports.isCardID= function isCardID(sId) {
        if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
            alert('你输入的身份证长度或格式错误')
            return false
        }
        //身份证城市
        var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
        if(!aCity[parseInt(sId.substr(0,2))]) {
            alert('你的身份证地区非法')
            return false
        }

        // 出生日期验证
        var sBirthday=(sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2))).replace(/-/g,"/"),
            d = new Date(sBirthday)
        if(sBirthday != (d.getFullYear()+"/"+ (d.getMonth()+1) + "/" + d.getDate())) {
            alert('身份证上的出生日期非法')
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
            alert('你输入的身份证号非法')
            return false
        }

        return true
    }
}
exports.toPinyin = function toPinyin(str) {
    if (!this.isString(str)) return str;
    const py = this.pinyin(str, {
        style: pinyin.STYLE_NORMAL, // 设置拼音风格
        heteronym: false,
    });
    let PY = '';
    for(let i = 0; i < str.length; i++){
        let word = py[i];
        for(let j = 0; word && j < word.length; j++){
            PY = PY + word[j];
            if(i != PY.length){
                PY = PY + ' ';
            }
        }
    }
    return PY;
}

////

/**
 * 判断传入的参数是否是空对象
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
/**
 * 如果obj为空对象，返回null;如果obj不为空对象，直接返回
 * @param {object|any} obj - 转换的对象
 */
exports.transferEmptyObjToNull = function transferEmptyObjToNull(obj) {
    let isEmpty = true;
    if (typeof obj === 'object') {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop))
                isEmpty = false;
        }
        if (isEmpty)
            return null;
    } else
        return obj;
}
/**
 * 用async-validator验证，返回promise
 * @param {object} params
 * @param {object} rules
 * @returns {promise} 验证通过用resolve(fields)返回，验证没有通过用reject(errors)返回
 */
exports.validate = function validate(params, rules) {
    assert.ok(params);
    assert.ok(rules);

    const validator = new Schema(rules);
    return new Promise((resolve, reject) => {
        validator.validate(params, (errors, fields) => {
            errors ? reject(errors) : resolve(fields);
        });
    });
}

/**
 * 提取对象中的字段 注：为浅复制
 * @param {Array} arr - 要从obj中提取的属性
 * @param {Object} obj - 要进行提取的对象
 * @returns {Object} 这些要提取的属性组成的对象
 */
exports.extractByNames = function extractByNames(arr, obj) {
    assert.ok(arr);
    assert.ok(obj);
    const newObj = {};
    arr.forEach((key) => {
        newObj[key] = obj[key];
    });
    return newObj;
}
/**
 * 对对象进行深复制，用json方式实现
 * @param {object} obj
 */
exports.jDeepCope = function jDeepCope(obj) {
    return JSON.parse(JSON.stringify(obj));
}
/**
 * 用 promise 的方式睡眠 t 秒
 * @param {number} t - 单位是秒
 */
exports.sleep = function sleep(t) {
    assert.equal(typeof t, 'number');

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, t * 1000);
    });
}

function transform(m) {
    var name = m.slice(2);
    name = name[0].toLowerCase() + name.slice(1);
    return name;
}