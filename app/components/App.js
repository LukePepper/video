var React = require('react');
var Videos = require('./Videos');
var Photos = require('./Images');
//var Nav = require('./Nav');

class AppComponent extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            selectedMenuItem: 'videos'
        }
    }
    render() {
        var menuChange =   this.menuChange;
        var self = this;

        return(
            <div>

                <Videos />

            </div>
        )
    }
}
module.exports=AppComponent;


