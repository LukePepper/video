/*
 ********************************************************************************
 Creates the lists for the media items i.e. lists of Videos or Images

 Lists.js
 ********************************************************************************
 */

//todo: bugfix: first item in JSON file must have section of '' - if not there are problems displaying the section headings - fix this

var React=require('react');
var PropTypes=require('prop-types');
var ItemListComponent=require('./ItemListComponent.js');
var uuid=require('uuid');
var CommonFunctions=require('./CommonFunctions');
var mediaJSON=require('json-loader!./Media.json');//JSON file containing the videos

class Lists extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sections:  this.props.sections,
            allItemData: this.props.allItemData,
            clickedItem: ''
        };
    }
    createItemOpenComponent(itemComponentData, componentIndex, numItemsRendered){
        return (
            <ItemListComponent
                componentIndex={componentIndex}
                numItemsRendered={numItemsRendered}
                itemComponentData={itemComponentData}
                key={uuid.v4()}
                itemIsLiked={ this.isThisItemLiked(itemComponentData.src) }
                itemIsWatched={ this.isThisItemWatched(itemComponentData.src) }
                itemPath={this.props.itemPath}
                itemClicked={this.itemClicked.bind(this)}
                itemLikeClicked={this.itemLikeClicked.bind(this)}
            />
        );
    }
    createPlayItemSection(headingName, videoPlayData, index){
        return(
            <div key={uuid.v4()}>
                <h3>{headingName}</h3>
                <ul  key={uuid.v4()}>{videoPlayData}</ul>
            </div>
        );
    }
    createDataToRender(){

        //todo refactor: this is a repeated mapping loop -> store the data in the first instance of this pattern and pass down as prop
        var self=this;
        var i=0;
        var dataToRender = this.state.sections.map(function(headingName, index){
            var itemDataMap = self.state.allItemData.map(function(itemData, index2){
                if(itemData.section == headingName){
                    i++;
                    return self.createItemOpenComponent( itemData, index2, i);
                }
            });
            return self.createPlayItemSection(headingName, itemDataMap, index);
        });
        return dataToRender
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
    isThisItemLiked(itemSrc){
        return this.props.isThisItemLiked(itemSrc)
    }
    isThisItemWatched(itemSrc){
        return this.props.isThisItemWatched(itemSrc)
    }
    render(){
        return(
            <div>
                {this.createDataToRender()}
            </div>
        );
    }
}
module.exports=Lists;

Lists.propTypes={
    sections: PropTypes.array.isRequired,
    allItemData:  PropTypes.array.isRequired,
    itemPath:  PropTypes.string.isRequired,
    itemClicked: PropTypes.func.isRequired,
    itemLikeClicked: PropTypes.func.isRequired,
    isThisItemLiked: PropTypes.func.isRequired,
    isThisItemWatched: PropTypes.func.isRequired,
};