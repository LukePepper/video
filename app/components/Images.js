var React=require('react');
var Lists = require('./Lists');
var mediaJSON = require('json-loader!./Media.json');//JSON file containing the videos

class Images extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            typeOfMedia: 'images'
        };
    }
    componentWillRender(){
        this.setState({mediaData: mediaJSON})
    }
    render(){
        return (
            <div className="itemPlayerContainer">
                <div className="col-sm-1 col-md-2" />
                <div className="col-sm-10 col-md-8 section-container">
                    <h2>Images</h2>
                    <div className="chooseItem" >
                        <Lists listData={this.state.mediaData} typeOfMedia='{this.state.typeOfMedia}' />
                    </div>
                </div>
                <div className="col-sm-1 col-md-2" />
            </div>
        );
    }
}
module.exports=Images;