/*
 ********************************************************************************
 Creates the lists for the media items i.e. lists of Videos or lists of Images

 Lists.js
 ********************************************************************************
 */

//todo: bugfix: first item in JSON file must have section of '' - if not there are problems displaying the section headings - fix this

var React=require('react');
var ItemListComponent=require('./ItemListComponent.js');
mediaJSON = require('json-loader!./Media.json');//JSON file containing the videos

class Lists extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sections:  new Array(),
            itemsData: new Array(),
            allItemsSrc: new Array(),
            allItemsData: new Array(),
            likedItems: new Array(),
            typeOfMedia: this.props.typeOfMedia,
            doOnClick: this.props.doOnClick,
        };
    }

    createDataContentsArrays(dataItem, self){
        var sectionArray = this.state.sections;
        var itemsDataArray=this.state.itemsData;
        var currentItemData={title: dataItem.title, src: dataItem.src, subsection: dataItem.subsection};

        if( sectionArray.indexOf(dataItem.section) === -1 ){
            sectionArray.push(dataItem.section);
            this.setState({ sections: sectionArray });
        }

        if(itemsDataArray[sectionArray.indexOf(dataItem.section)]!=undefined){
            itemsDataArray[sectionArray.indexOf(dataItem.section)].push(currentItemData);
            itemsDataArray[sectionArray.indexOf(dataItem.section)]=itemsDataArray[sectionArray.indexOf(dataItem.section)];
        }
        else{
            itemsDataArray.push([currentItemData]);
        }
        this.setState({ itemsData: itemsDataArray });//todo needed?

        return itemsDataArray;

    }
    createLists (listData){
        var listDataAsString=JSON.stringify(listData);
        var listDataArray=listData;
        var self=this;

        listDataArray.map(this.createDataContentsArrays, self);
    }
    createItemOpenComponent(itemComponentData, componentIndex, numItemsRendered){
        var randomNumForKey=Math.floor((Math.random() * 10000) + 1);
        var thisItemIsLiked = this.itemIsLiked(itemComponentData.src);

        return (
            <ItemListComponent
                componentIndex={componentIndex}
                numItemsRendered={numItemsRendered}
                itemComponentData={itemComponentData}
                key={randomNumForKey}
                liked={thisItemIsLiked}
                doOnClick={this.state.doOnClick}
            />
        );
    }
    itemIsLiked(itemSrc){
        if(this.state.likedItems.indexOf(itemSrc) !== -1){
            return true;
        }
        else{
            return false
        }
    }
    createPlayItemSection(headingName, videoPlayData, index){
        return(
            <div key={index}>
                <h3>{headingName}</h3>
                <ul  key={index}>{videoPlayData}</ul>
            </div>
        );
    }
    componentWillMount(){
        var itemsData=this.props.listData;
        var allItemsSrc=this.state.allItemsSrc;
        var sectionsArray=this.state.sections;
        var self=this;
        var i=0;

        var dataToRender=mediaJSON;

        if(this.state.typeOfMedia=='videos'){
            this.setState({itemsData:dataToRender.videos});
            this.createLists(dataToRender.videos);
        }
        else{
            this.setState({itemsData:dataToRender.images});
            this.createLists(dataToRender.images);
        }

        var playItemSectionsData = sectionsArray.map(function(headingName, index){
            var itemsDataFiltered = self.state.itemsData;
            var thisDataItem=itemsDataFiltered[index];
            var itemPlayData =  thisDataItem.map(function(itemDataElements, index2){
                allItemsSrc.push(itemDataElements.src);
                i++;
                return (
                    self.createItemOpenComponent( itemDataElements, index2, i)
                );
            });
            return (
                self.createPlayItemSection(headingName, itemPlayData, index)
            )
        });

        this.setState({
            allItemsData: playItemSectionsData,
            allItemsSrc: allItemsSrc,
            totalVideos: allItemsSrc.length
        });
    }
    render(){
        var allItemsDataElements=this.state.allItemsData;
        if (this.props.typeOfQuery == 'sections'){
            return(
                <Sections sections={this.state.sections} />
            );
        }
        else{
            return(
                <div>
                    {allItemsDataElements}
                </div>
            );
        }
    }
};

module.exports=Lists;