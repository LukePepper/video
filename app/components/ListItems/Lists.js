/*
 ********************************************************************************
 Creates the lists for the media items i.e. lists of Videos or Images

 Lists.js
 ********************************************************************************
 */

//todo: bugfix: first item in JSON file must have section of '' - if not there are problems displaying the section headings - fix this

var React=require('react');
var ItemListComponent=require('./ItemListComponent.js');
mediaJSON = require('json-loader!./Media.json');//JSON file containing the videos

var CommonFunctions=require('./CommonFunctions.js');

/*
function isThisItemLiked(itemSrc,allItemData){
    //todo refactor repeat of item in ListItems.js "isThisItemLiked()"
    if(itemSrc === null){
        return false;
    }
    return (
        (allItemData[itemPosition(itemSrc,allItemData)].liked) ? true : false
    );
}
function itemPosition(itemSrc,allItemData){
    //todo refactor repeat of item in ListItems.js "itemPosition()"
    var thisItemPosition;
    var currentPosition=allItemData.map(function(item,index){
        (item.src == itemSrc) ? thisItemPosition=index : null;
    });
    return thisItemPosition;
}
*/
class Lists extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            sections:  this.props.sections,
            allItemData: this.props.allItemData,
            typeOfMedia: this.props.typeOfMedia,
            doOnClick: this.props.doOnClick
        };
    }
    createItemOpenComponent(itemComponentData, componentIndex, numItemsRendered){


        return (
            <ItemListComponent
                componentIndex={componentIndex}
                numItemsRendered={numItemsRendered}
                itemComponentData={itemComponentData}
                key={Math.floor((Math.random() * 10000) + 1)}
                liked={ this.isThisItemLiked(itemComponentData.src,this.state.allItemData) }
                doOnClick={this.state.doOnClick}
                itemIsWatched={ this.itemIsWatched(itemComponentData.src) }
                typeOfMedia={this.props.typeOfMedia}
                itemPath={this.props.itemPath}
            />
        );
    }
    isThisItemLiked(itemSrc){
        //todo refactor repeat of item in ListItems.js "isThisItemLiked()"
         if(itemSrc === null){
            return false;
         }
         return (
            (this.state.allItemData[this.itemPosition(itemSrc)].liked) ? true : false
         );
    }

    itemPosition(itemSrc){
        //todo refactor repeat of item in ListItems.js "itemPosition()"
        var thisItemPosition;
        var currentPosition=this.state.allItemData.map(function(item,index){
            (item.src == itemSrc) ? thisItemPosition=index : null;
        });
        return thisItemPosition;
    }
    itemIsWatched(itemSrc){
        //todo refactor
        var returnValue=false;
        var currentPosition=this.state.allItemData.map(function(item,index){
            if((item.src == itemSrc) && item.watched == true){
                returnValue=true;
            }
        });
        return returnValue;
    }
    createPlayItemSection(headingName, videoPlayData, index){
        return(
            <div key={index}>
                <h3>{headingName}</h3>
                <ul  key={index}>{videoPlayData}</ul>
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
    componentWillMount(){


    }
    render(){
        if (this.props.typeOfQuery == 'sections'){
            return(
                <Sections sections={this.state.sections} />
            );
        }
        else{
            return(
                <div>
                    {this.createDataToRender()}
                </div>
            );
        }
    }
};

module.exports=Lists;