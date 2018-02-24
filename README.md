# vukoa-util
The util module is improve more methods to check type and some assist methods for nodeJs 

dependencies:

- [core-util-is](https://github.com/isaacs/core-util-is)
- [is-stream](https://github.com/rvagg/isstream)
- [is-class](https://github.com/miguelmota/is-class)
- [pinyin](https://github.com/hotoo/pinyin)

## Install

```
npm install vukoa-util
```
## Example

```
var util = require('vukoa-util');
var what = util.isWhat;

what.isArray([1]); // => true
what.isNumber(1);//=> true
what.isGeneratorFunction(function * () {}); // => true
what.islong(Math.pow(2, 33)); // => true
util.toPinyin('测试数据'); //=> ce shi shu ju
```

## API

## var util = require('vukoa-util');
## var what = util.isWhat;

#### util.toPinyin('测试数据'')//=> ce shi shu ju
#### util.pinyin()
#### util.sleep()
#### util.transferEmptyObjToNull()
#### util.validate(params, rules)//use async-validator，return promise


#### what.isArray(arr)
#### what.isAsyncFunction(async)
#### what.isBoolean(bool)
#### what.isBrowserType()
#### what.isBuffer(buffer)
#### what.isCardID(ID)
#### what.isClass(class)
#### what.isDate(datetime)
#### what.isDouble()
#### what.isDuplexStream(stream)
#### what.isEmptyObj(obj)
#### what.isError(e)
#### what.isFalse(false)//null、undefined、false、NaN
#### what.isFinite(o)
#### what.isFunction(func)
#### what.isGenerator(gen)
#### what.isGeneratorFunction(func)
#### what.isInt(num)
#### what.isInt32(num)//32bit int
#### what.isIos()//base on navigator.userAgent
#### what.isLong(num)
#### what.isNaN(o)
#### what.isNull(null)
#### what.isNullOrUndefined()
#### what.isNumber(num)
#### what.isObject(obj)
#### what.isPC()//base on navigator.userAgent
#### what.isPrimitive(prim)
#### what.isReadableStream()
#### what.isRegExp(reg)
#### what.isSet(set)
#### what.isStream(stream)
#### what.isString(str)
#### what.isSymbol(symbol)
#### what.isTrue(o)//！=>null、undefined、false、NaN
#### what.isUndefined(undefined)
#### what.isWritableStream()
#### what.islong(num)


