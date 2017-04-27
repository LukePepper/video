/*
 ********************************************************
 * Renders the lists of images or videos
 *
 * Items.js
 ********************************************************
 */

//todo remove mediaJSON once refactor done

var React=require('react');
var Lists = require('./Lists');
var mediaJSON = require('json-loader!./Media.json');//JSON file containing the videos

class Items extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            typeOfMedia: this.props.typeOfMedia,
            doOnClick: this.props.doOnClick,
        };
    }
    /* new event handler stuff */
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
                    <Lists
                        listData={this.state.mediaData}
                        typeOfMedia={this.state.typeOfMedia}
                        doOnClick={this.state.doOnClick}
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

