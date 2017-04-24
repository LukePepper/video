/*
 ********************************************************
 * DEPRECATED: check for any refs and then delete when ready
 *
 * Renders the lists of images
 *
 * Images.js
 ********************************************************
 */

var React=require('react');
var Lists = require('./Lists');
var ImagePlayer = require('./ImagePlayer');
var mediaJSON = require('json-loader!./Media.json');//JSON file containing the videos

class Images extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            typeOfMedia: this.props.typeOfMedia,
            doOnClick: this.props.doOnClick,
        };
    }
    componentWillRender(){
        this.setState({
            mediaData: mediaJSON,
            isModalOpen: this.props.isModalOpen,
            currentItem: this.props.currentItem
        })
    }
    render(){
        return (
            <div>
                <h2>{this.state.typeOfMedia}</h2>
                <div className="chooseItem" >
                    <Lists listData={this.state.mediaData} typeOfMedia={this.state.typeOfMedia} doOnClick={this.state.doOnClick}  />
                </div>
            </div>
        );
    }
}
module.exports=Images;
