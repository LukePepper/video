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
            doOnClick: this.playItem.bind(this),
            mediaData: mediaJSON,
            playItem: false,
            videoAutoPlay: true,
            currentVideo: '',
            likedItems: new Array(),
            watchedItems: new Array(),
            totalItems: 0,
            allItemsSrc: new Array(),
            allItemData: new Array(),
            sections: new Array(),
            itemPath: ''
        };
    }
    // Modal and Play Item  - START
    playItem(event){
        this.setState({
            currentItem: (this.state.typeOfMedia=='videos') ? event.currentTarget.dataset.src : event.currentTarget.dataset.src,
            playItem:true
        });
        this.openModal();
        this.addToWatchedItems(event.currentTarget.dataset.src);
        event.currentTarget.className = "watched";//todo: refactor this targeting the states/props

    }
    openModal () {
        this.setState({ isModalOpen: true })
    }
    closeModal () {
        this.setState({ isModalOpen: false })
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
        //todo update style on object - do with ItemListComponent
    }
    setTitleCssToWatched(itemSrc){
        var itemId = 'item_'+(this.itemPosition(itemSrc)+1);
        document.getElementById(itemId).className="watched";//todo: refactor this targeting the states/props
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

        this.setTitleCssToWatched(this.state.allItemData[nextPosition].src);//set the item css todo: refactor this targeting the states/props
        this.setState({currentItem: this.state.allItemData[nextPosition].src});//set the state
    }
    likeItemButton(thisItemSrc){
        return (
            <div id="likeButtonModal" className={ (this.isThisItemLiked(thisItemSrc)) ? 'glyphicon glyphicon-heart liked' : 'glyphicon glyphicon-heart' } onClick={this.like} />
        );
    }
        likeItemButtonClicked(event){
            //todo refactor
            var currentItemSrc=this.state.currentItem;
            if( isThisItemLiked ){
                event.currentTarget.className=event.currentTarget.className+" liked";
                likedItems.push( currentItemSrc );//todo
            }
        }
    setItemToLiked(itemSrc){
        this.state.allItemData[this.itemPosition(itemSrc)].liked=true;
    }
    isThisItemLiked(itemSrc){
        if(itemSrc === null){
            return false;
        }
        return (
            (this.state.allItemData[this.itemPosition(itemSrc)].liked) ? true : false
        );
    }
        buildItemsStateTable(){
            //todo refactor
                /* todo
                    * build data structure to hold all items - {src:"xxx.png",watched:false,liked:false}
                    * - refactor other functions to use and update this data structure
                    * - pass down this data structure to Lists.js to ingest (via Items.js)
                    * - look at Lists.js line 89 onwards to see how it is done currently
                 */

            var mediaData=this.state.mediaData;//pull in the data from JSON
            mediaData=(this.state.typeOfMedia=='videos') ? mediaData.videos : mediaData.images;//pull out the bits we need

            var sectionsArray=new Array();//build an array of sections
            var sections = mediaData.map(function(itemData){
                (sectionsArray.indexOf(itemData.section) === -1 ) ? sectionsArray.push(itemData.section) : null;
            });
            //todo order sections alphabetically?

            //order array based on sections (i.e. so it is ready to render to the lists)
            var itemsArrayOrdered=new Array();
            var sections = sectionsArray.map(function(section, index){
                var itemOrdering=mediaData.map(function(item, index2){
                    (item.section == section) ? itemsArrayOrdered.push(item) : null;
                });
            });

            //store to states
            this.setState({
                allItemData: itemsArrayOrdered,
                sections: sections
            });

        }
    // Modal and Play Item  - END
    componentWillMount(){
        this.buildItemsStateTable();//build the arrays of items and sections
        (this.state.typeOfMedia == 'videos') ? this.setState({ itemPath : videoPath}) : this.setState({ itemPath : imagePath});//select the path based on typeOfMedia
    }
    componentWillRender(){
        if(this.state.playItem==true){
            this.setState({ isModalOpen: true });
        }
    }
    render(){
        return (
                <div className={"mediaType_"+this.state.typeOfMedia}>
                    <div className="itemPlayerContainer">
                        <div className="col-sm-1 col-md-2" />
                        <div className="col-sm-10 col-md-8 section-container">
                            <Items doOnClick={this.state.doOnClick} typeOfMedia={this.state.typeOfMedia} allItemData={this.state.allItemData} sections={this.state.allItemData} />
                        </div>
                        <div className="col-sm-1 col-md-2" />
                        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} onClick={this.state.doOnClick} doOnClick={this.state.doOnClick} >
                            {this.likeItemButton(this.state.currentItem)}
                            {this.renderSkipButton('prev')}
                            {this.renderSkipButton('next')}
                            <ItemPlayer src={this.state.itemPath+this.state.currentItem} typeOfMedia={this.state.typeOfMedia} autoPlay={this.state.videoAutoPlay} />
                        </Modal>
                    </div>
                </div>
        );
    }
}

module.exports=ListItems;