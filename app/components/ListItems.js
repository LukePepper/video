/**********************************************
 * Container for: lists: i.e. videos, images
 * Container for: modal and item state info
 *
 * Change these vars when moving from locally stored media to media stored on a web server:
 * var videoPath = '../videos/';//change this to http:// for non-local videos hosted on a web server
 * var imagePath = '../images/';//change this to http:// for non-local videos hosted on a web server
 *
 * ListItems.js
  ********************************************/

var React=require('react');
var mediaJSON=require('json-loader!./ListItems/Media.json');//JSON file containing the videos
var Modal = require('./Modal');
var Items = require('./ListItems/Items');
var ItemPlayer = require('./ListItems/ItemPlayer');
var videoPath = '../videos/';//change this to http:// for non-local videos hosted on a web server
var imagePath = '../images/';//change this to http:// for non-local videos hosted on a web server


class ListItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            typeOfMedia: this.props.typeOfMedia,
            isModalOpen: false,
            currentItem: null,
            mediaData: mediaJSON,
            videoAutoPlay: true,
            allItemData: [],
            sections: [],
            itemPath: '',
            itemClicked: '',
            itemLiked: ''
        };
    }
    // Modal and Play Item  - START
    openModal () {
        this.setState({ isModalOpen: true })
    }
    closeModal () {
        this.setState({ isModalOpen: false })
    }
    playItem(clickedItemSrc){
        //is this a call from the item onClick?
        if(clickedItemSrc.currentTarget !== undefined){
            clickedItem.src = currentTarget.dataset.src;
        }
        this.setState({
            currentItem: clickedItemSrc
        });
        this.openModal();
        this.addToWatchedItems(clickedItemSrc);
    }
    renderSkipButton(typeOfButton){
        if( typeOfButton=='next'){
            if(this.itemPosition(this.state.currentItem)>=(this.totalItems()-1)){return null};
        }
        else{
            if(this.itemPosition(this.state.currentItem)<1){return null};
        }
        return(
            <div id={typeOfButton+'Item'} className={ (typeOfButton=='next') ? "glyphicon glyphicon-chevron-right" : "glyphicon glyphicon-chevron-left" } ref={typeOfButton} onClick={e => this.skipItem(typeOfButton,e)} />
        )
    }
    skipItem(direction, e){
        var currentItemPosition=this.itemPosition(this.state.currentItem);
        if(direction=='prev' && currentItemPosition > 0){
            var nextPosition=currentItemPosition-1;
        }
        else if( direction=='next' && currentItemPosition < this.totalItems()-1 ){
            var nextPosition=currentItemPosition+1;
        }

        this.addToWatchedItems(this.state.allItemData[nextPosition].src);
        this.setState({currentItem: this.state.allItemData[nextPosition].src});//set the state
    }
    likeItemButton(thisItemSrc){
        return (
            <div id="likeButtonModal" className={ (this.isThisItemLiked(thisItemSrc)) ? 'glyphicon glyphicon-heart itemIsLiked' : 'glyphicon glyphicon-heart' } onClick={this.like} />
        );
    }
    // Modal and Play Item  - END
    setItemToLiked(itemSrc){
        this.state.allItemData[this.itemPosition(itemSrc)].itemIsLiked=true;
    }
    unsetItemToLiked(itemSrc){
        this.state.allItemData[this.itemPosition(itemSrc)].itemIsLiked=false;
    }
    isThisItemLiked(itemSrc){
        if(itemSrc === null){
            return false;
        }
        return (
            (this.state.allItemData[this.itemPosition(itemSrc)].itemIsLiked) ? true : false
        );
    }
    itemPosition(itemSrc){
        var thisItemPosition;
        var currentPosition=this.state.allItemData.map(function(item,index){
            (item.src == itemSrc) ? thisItemPosition=index : null;
        });
        return thisItemPosition;
    }
    totalItems(){
        return this.state.allItemData.length;
    }
    addToWatchedItems(thisItemSrc){
        this.state.allItemData[this.itemPosition(thisItemSrc)].watched=true;
    }
    buildItemsStateTable(){
        //todo refactor
        var mediaData=this.state.mediaData;//pull in the data from JSON
        mediaData=(this.state.typeOfMedia=='videos') ? mediaData.videos : mediaData.images;//pull out the bits we need
        var sectionsArray=[];//build an array of sections

        var sections = mediaData.map(function(itemData){
            (sectionsArray.indexOf(itemData.section) === -1 ) ? sectionsArray.push(itemData.section) : null;
        });
        //todo order sections alphabetically?

        //order array based on sections (i.e. so it is ready to render to the lists)
        var itemsArrayOrdered=[];
        var sections = sectionsArray.map(function(section, index){
            var itemOrdering=mediaData.map(function(item, index2){
                (item.section == section) ? itemsArrayOrdered.push(item) : null;
            });
            return section;
        });

        //store to states
        this.setState({
            allItemData: itemsArrayOrdered,
            sections: sections
        });

    }


    /*  event handler stuff */
    itemClicked(clickedItemSrc){
        this.setState({itemClicked:clickedItemSrc}, function(){
            this.playItem(clickedItemSrc);
        });
    }
    itemLikeClicked(clickedLikeItemSrc){
        if(this.isThisItemLiked(clickedLikeItemSrc)){
            var newState = '';
            this.unsetItemToLiked(clickedLikeItemSrc);
        }
        else{
            var newState = clickedLikeItemSrc;
            this.setItemToLiked(clickedLikeItemSrc);
        }
        this.setState({itemLiked:newState}, function(){

        });
    }

    componentWillMount(){
        this.buildItemsStateTable();//build the arrays of items and sections
        (this.state.typeOfMedia == 'videos') ? this.setState({ itemPath : videoPath}) : this.setState({ itemPath : imagePath});//select the path based on typeOfMedia
    }
    render(){
        return (
                <div className={"mediaType_"+this.state.typeOfMedia}>
                    <div className="itemPlayerContainer">
                        <div className="col-sm-1 col-md-2" />
                        <div className="col-sm-10 col-md-8 section-container">
                            <Items
                                typeOfMedia={this.state.typeOfMedia}
                                allItemData={this.state.allItemData}
                                sections={this.state.sections}
                                itemPath={this.state.itemPath}
                                itemClicked={this.itemClicked.bind(this)}
                                itemLikeClicked={this.itemLikeClicked.bind(this)}
                            />
                        </div>
                        <div className="col-sm-1 col-md-2" />
                        <Modal
                            isOpen={this.state.isModalOpen}
                            onClose={() => this.closeModal()}
                        >
                            {this.likeItemButton(this.state.currentItem)}
                            {this.renderSkipButton('prev')}
                            {this.renderSkipButton('next')}
                            <ItemPlayer
                                src={this.state.itemPath+this.state.currentItem}
                                typeOfMedia={this.state.typeOfMedia}
                                autoPlay={this.state.videoAutoPlay} />
                        </Modal>
                    </div>
                </div>
        );
    }
}
module.exports=ListItems;