var React = require('react');
var Videos = require('./Videos');

var appComponent=React.createClass({
    render: function () {
        return(
            <div>
                <Videos />
            </div>
        )
    }
});
module.exports=appComponent;


