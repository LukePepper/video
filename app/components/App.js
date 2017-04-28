var React = require('react');
var ListItems = require('./ListItems');
var Nav = require('./Nav');

class AppComponent extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            typeOfMedia: 'videos',
            selectedMenuItem: 'videos'
        }
    }
    menuChange(event){
        this.setState({
            selectedMenuItem: event.currentTarget.title,
            typeOfMedia: event.currentTarget.title
        });
    }
    render() {
        //todo - bugfix re: needing to add a div to first component to render on menu change

        return(
            <div>
                <Nav menuChange={this.menuChange.bind(this)} selectedMenuItem={this.state.selectedMenuItem} />
                {(this.state.typeOfMedia == 'videos') ?
                        <div>
                            <ListItems typeOfMedia="videos" />
                        </div>
                    :
                        <ListItems typeOfMedia="images" />
                }
            </div>
        )
    }
}
module.exports=AppComponent;


