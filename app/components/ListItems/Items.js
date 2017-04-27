/*
 ********************************************************
 * Renders the lists of images or videos
 *
 * Items.js
 ********************************************************
 */

var React=require('react');
var PropTypes=require('prop-types');
var Lists = require('./Lists');

class Items extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            typeOfMedia: this.props.typeOfMedia,
        };
    }
    /* event handler stuff */
    itemClicked(clickedItemSrc){
        this.setState({itemClicked:clickedItemSrc}, function(){
            this.props.itemClicked(this.state.itemClicked);
        });
    }
    itemLikeClicked(clickedLikeItemSrc){
        this.setState({itemLiked:clickedLikeItemSrc}, function(){
            this.props.itemLikeClicked(this.state.itemLiked);
        });
    }
    render(){
        return (
            <div>
                <h2>{this.state.typeOfMedia}</h2>
                <div className="chooseItem" >
                    <Lists
                        allItemData={this.props.allItemData}
                        sections={this.props.sections}
                        itemPath={this.props.itemPath}
                        itemClicked={this.itemClicked.bind(this)}
                        itemLikeClicked={this.itemLikeClicked.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
module.exports=Items;

ItemspropTypes={
    typeOfMedia: PropTypes.string.isRequired,
}