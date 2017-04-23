var React=require('react');
mediaJSON = require('json-loader!./Media.json');//JSON file containing the videos

class Sections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: new Array(),
            itemsData: new Array()
        };
    }
    createSections(section){
        sectionsArray=this.props.sections;

        if(sectionsArray.indexOf(section)===-1) {
            sectionsArray.push(section);
        }
        return sectionsArray;
    }
    render(){
        return sectionsArray;
    }
}

class Lists extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sections:  new Array(),
            itemsData: new Array(),
            allItemsSrc: new Array(),
            allItemsData: new Array(),
            likedVideos: new Array(),
            typeOfMedia: 'videos'
        };
    }
    testPing(){
        console.log('Lists.js - PING');
        return 'PING';
    }
    createSections(section){

        //todo remove this function

        sectionsArray=this.state.sections;

        if(sectionsArray.indexOf(section)===-1) {
            sectionsArray.push(section);
        }
        this.setState({sections: sectionsArray});//todo needed?

        return sectionsArray;
    }
    createDataContentsArrays(dataItem, self){
        var sectionArray = this.state.sections;
        itemsDataArray=this.state.itemsData;
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

    createItemOpenComponent(itemComponentData, componentIndex, numVideosRendered){
        var className="glyphicon glyphicon-heart";
        var likedVideos=this.state.likedVideos;

        if(likedVideos.indexOf(itemComponentData.src) !== -1){
            className =+ ' liked';
        }


        return (
            <li key={componentIndex}>
                <div className={className} id={"like_"+numVideosRendered} onClick={this.like} />
                <a href="#"  onClick={this.playVideo} data-src={itemComponentData.src} id={'video_'+numVideosRendered} >
                        {itemComponentData.title}
                </a>
            </li>
        );
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
        var typeOfMedia=this.props.typeOfMedia;

        if(typeOfMedia=='videos'){
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