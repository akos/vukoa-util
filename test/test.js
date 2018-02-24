'use strict';

const assert = require('assert');
const util = require('../index');
const what = util.isWhat;
const Long = require('long');
const semver = require('semver');

describe('isWhat', () => {
    describe('isFinite', () => {
        it('should true', () => {
            assert(what.isFinite(37) === true);
        });

        it('should false', () => {
            assert(what.isFinite(NaN) === false);
            assert(what.isFinite(Number.NaN) === false);
            assert(what.isFinite(0 / 0) === false);
            assert(what.isFinite(undefined) === false);
            assert(what.isFinite({}) === false);

            assert(what.isFinite(true) === false);
            assert(what.isFinite(null) === false);

            assert(what.isFinite("37") === false);
            assert(what.isFinite("37.37") === false);
            assert(what.isFinite("") === false);
            assert(what.isFinite(" ") === false);
            assert(what.isFinite("NaN") === false);
            assert(what.isFinite("blabla") === false);
        });
    });
    describe('isNaN', () => {
        it('should true', () => {
            assert(what.isNaN(NaN) === true);
            assert(what.isNaN(Number.NaN) === true);
            assert(what.isNaN(0 / 0) === true);
        });

        it('should false', () => {
            assert(what.isNaN(undefined) === false);
            assert(what.isNaN({}) === false);

            assert(what.isNaN(true) === false);
            assert(what.isNaN(null) === false);
            assert(what.isNaN(37) === false);

            assert(what.isNaN("37") === false);
            assert(what.isNaN("37.37") === false);
            assert(what.isNaN("") === false);
            assert(what.isNaN(" ") === false);
            assert(what.isNaN("NaN") === false);
            assert(what.isNaN("blabla") === false);
        });
    });
    describe('generator', () => {
        it('should true', () => {
            var gen = function *() {
                yield 1;
                return 2;
            };
            assert(what.isGenerator(gen()) === true);
        });

        it('should false', () => {
            var gen = function *() {};
            var fun = () => {};
            var obj = {};
            assert(what.isGenerator(gen) === false);
            assert(what.isGenerator(fun) === false);
            assert(what.isGenerator(obj) === false);
        });
    });

    describe('generatorFunction', () => {
        it('should true', () => {
            var gen = function *() {
                yield 1;
                return 2;
            };
            assert(what.isGeneratorFunction(gen) === true);
        });

        it('should false', () => {
            var gen = function *() {};
            var fun = () => {};
            var obj = {};
            assert(what.isGeneratorFunction(gen()) === false);
            assert(what.isGeneratorFunction(fun) === false);
            assert(what.isGeneratorFunction(obj) === false);
        });
    });

    describe('isPromise', () => {
        it('should true', () => {
            var pro = {
                then: () => {}
            };
            assert(what.isPromise(pro) === true);
        });

        it('should false', () => {
            var hasthen = {then: 1};
            var obj = {};
            var number = 1;
            assert(what.isPromise(hasthen) === false);
            assert(what.isPromise(obj) === false);
            assert(what.isPromise(number) === false);
        });
    });

    describe('class', () => {
        if (semver.gt(process.version.substring(1), '4.0.0')){
            it('should true', () => {
                class Foo{};
                assert(what.isClass(Foo) === true);
            });

            it('should false', () => {
                function Bar(){};
                assert(what.isClass(Bar) === false);
                assert(what.isClass({}) === false);
            });
        }
    });


    describe('isInt', () => {
        it('should true', () => {
            assert(what.isInt(0) === true);
            assert(what.isInt(-100) === true);
            assert(what.isInt(100) === true);
            assert(what.isInt(Math.pow(2, 31)) === true);
            assert(what.isInt(Math.pow(2, 50)) === true);
            assert(what.isInt(-Math.pow(2, 31)) === true);
            assert(what.isInt(-Math.pow(2, 50)) === true);
        });

        it('should false', () => {
            assert(what.isInt(0.1) === false);
            assert(what.isInt(-0.1) === false);
            assert(what.isInt(-111110.1) === false);
            assert(what.isInt(11110.12312321) === false);
            assert(what.isInt('1.1') === false);
        });
    });

    describe('isInt32', () => {
        it('should true', () => {
            assert(what.isInt32(0) === true);
            assert(what.isInt32(-100) === true);
            assert(what.isInt32(100) === true);
            assert(what.isInt32(Math.pow(2, 31) - 1) === true);
            assert(what.isInt32(-Math.pow(2, 31)) === true);
        });

        it('should false', () => {
            assert(what.isInt32(Math.pow(2, 31)) === false);
            assert(what.isInt32(Math.pow(2, 50)) === false);
            assert(what.isInt32(-Math.pow(2, 31) - 1) === false);
            assert(what.isInt32(-Math.pow(2, 50)) === false);
            assert(what.isInt32(-Math.pow(2, 63)) === false);
            assert(what.isInt32(0.1) === false);
            assert(what.isInt32(-0.1) === false);
            assert(what.isInt32(-111110.1) === false);
            assert(what.isInt32(11110.12312321) === false);
            assert(what.isInt32('1.1') === false);
        });
    });

    describe('islong', () => {
        it('should true', () => {
            assert(what.islong(Math.pow(2, 31)) === true);
            assert(what.islong(Math.pow(2, 50)) === true);
            assert(what.islong(-Math.pow(2, 31) - 1) === true);
            assert(what.islong(-Math.pow(2, 50)) === true);
            assert(what.islong(-Math.pow(2, 63)) === true);
        });

        it('should false', () => {
            assert(what.islong(0.1) === false);
            assert(what.islong(-0.1) === false);
            assert(what.islong(-111110.1) === false);
            assert(what.islong(11110.12312321) === false);
            assert(what.islong('1.1') === false);
            assert(what.islong(0) === false);
            assert(what.islong(-100) === false);
            assert(what.islong(100) === false);
            assert(what.islong(Math.pow(2, 31) - 1) === false);
            assert(what.islong(-Math.pow(2, 31)) === false);
        });
    });

    describe('isLong', () => {
        it('should true', () => {
            assert(what.isLong(Long.fromNumber(Math.pow(2, 31))) === true);
            assert(what.isLong(Long.fromString('1024102410241024')) === true);
        });

        it('should false', () => {
            assert(what.isLong(123) === false);
        });
    })

    describe('double', () => {
        it('should true', () => {
            assert(what.isDouble(0.1) === true);
            assert(what.isDouble(-0.1) === true);
            assert(what.isDouble(-111110.1) === true);
            assert(what.isDouble(11110.12312321) === true);
        });

        it('should false', () => {
            assert(what.isDouble(0) === false);
            assert(what.isDouble(-100) === false);
            assert(what.isDouble(100) === false);
            assert(what.isDouble(Math.pow(2, 31)) === false);
            assert(what.isDouble(Math.pow(2, 50)) === false);
            assert(what.isDouble(-Math.pow(2, 31)) === false);
            assert(what.isDouble(-Math.pow(2, 50)) === false);
        });
    });
});
describe('util methods', () => {
    describe('pinyin', () => {
        it('should get pinyin', () => {
            assert.equal(util.toPinyin('测试数据'), 'ce shi shu ju');
        });
    })
})