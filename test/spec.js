var React = require('react/addons')
var should = require('should')
var TestUtils = React.addons.TestUtils
var MyComponent = // a React.Component with a <button/> ...
    describe('MyComponent', function () {

        jsdom()
        it('has button that fires a dom event for click', function (done) {
            function handleClick() { done() }
            var detachedComp = TestUtils.renderIntoDocument(<MyComponent onClick={handleClick}/>)
            var button = TestUtils.findRenderedDOMComponentWithTag(detachedComp, 'button')
            var buttonNode = React.findDOMNode(button)
            should.exist(buttonNode)
            TestUtils.Simulate.click(buttonNode)
        })
    })