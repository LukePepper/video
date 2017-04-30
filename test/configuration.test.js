/**
 * tests that ES2015 is working correctly
 * Tests Mocha, Chai working correctly
 */
import { describe, before, it } from 'mocha';
import {expect} from 'chai';
import incrementer from './es2015Test';

describe('Hello World', function () {
    it('should increment a value', function () {
        var result = incrementer(8);
        expect(result).eql(9);
    });
});/**
 * Created by Luke on 30/04/2017.
 */
