'use strict';


var isClass = require('is-class');
var Schema = require('async-validator');
var pinyin = require('pinyin');
var isWhat = require('./lib/isWhat');


/**
 * Stream detected by isstream
 */

exports.pinyin = pinyin;
exports.isWhat = isWhat;


/**
 * Class detected by is-class
 */
exports.class = isClass;

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
}

exports.toPinyin = function toPinyin(str) {
    if (!this.isWhat.isString(str)) return str;
    const py = this.pinyin(str, {
        style: pinyin.STYLE_NORMAL, // 设置拼音风格
        heteronym: false,
    });
    let PY = '';
    for(let i = 0; i < str.length; i++){
        let word = py[i];
        for(let j = 0; word && j < word.length; j++){
            PY = PY + word[j];
            if(j !== word.length && i !== str.length - 1){
                PY = PY + ' ';
            }
        }
    }
    return PY;
}

////

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

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, t * 1000);
    });
}
