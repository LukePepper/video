var jsdom = require('mocha-jsdom')
var expect = require('chai').expect

import jsdom from 'mocha-jsdom';

//var App=require('App');

describe('<App />', function () {

    jsdom()

    it('has document', () =>  {
        expect(1).eql(1)
        //var div = document.createElement('div')
        //expect(div.nodeName).eql('DIV')
    })

})
