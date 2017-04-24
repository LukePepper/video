var React=require('react');
var Lists = require('./Lists');
var ImagePlayer = require('./ImagePlayer');
var mediaJSON = require('json-loader!./Media.json');//JSON file containing the videos

class Images extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            typeOfMedia: 'images',
            isModalOpen: false,
            currentItem: '',
            doOnClick: this.props.doOnClick
        };
    }
    componentWillRender(){
        this.setState({
            mediaData: mediaJSON,
            isModalOpen: this.props.isModalOpen,
            currentItem: this.props.currentItem
        })
    }
    playItem(){
        console.log('images.js playItem()');
    }
    render(){
        return (
            <div>
                <h2>Images</h2>
                <div className="chooseItem" >
                    <Lists listData={this.state.mediaData} typeOfMedia='{this.state.typeOfMedia}' doOnClick={this.state.doOnClick} />
                </div>
            </div>
        );
    }
}
module.exports=Images;
