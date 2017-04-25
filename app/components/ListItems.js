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
            currentItem: '',
            doOnClick: this.playItem.bind(this),
            mediaData: mediaJSON,
            playItem: false,
            videoAutoPlay: true,
            currentVideo: '',
            likedItems: new Array(),
            watchedItems: new Array(),
            totalItems: 0,
            allItemsSrc: new Array()
        };
    }
    // Modal and Play Item  - START
    playItem(event){
        this.setState({
            currentItem: (this.state.typeOfMedia=='videos') ? videoPath+event.currentTarget.dataset.src : imagePath+event.currentTarget.dataset.src,
            playItem:true
        });
console.log();
        this.openModal();
        this.addToWatchedItems(event.currentTarget.dataset.src);//todo add this function
        event.currentTarget.className = "watched";
    }
    openModal () {
        this.setState({ isModalOpen: true })
    }
    closeModal () {
        this.setState({ isModalOpen: false })
    }
    componentWillRender(){
        if(this.state.playItem==true){
            this.setState({ isModalOpen: true });
        }
    }
    itemPosition(item){
        return this.state.allItemsSrc.indexOf(item);
    }
    addToWatchedItems(thisItemSrc){
        var addToWatchedItemsArray=this.state.watchedItems;

        if( addToWatchedItemsArray.indexOf(thisItemSrc) === -1 ) {
            addToWatchedItemsArray.push(thisItemSrc);
            this.setState({watchedItems: addToWatchedItemsArray});
        }
    }

        //new imported functions - START
        skipPrevButton(){
            if(this.itemPosition(this.state.currentItem)==0){return null};
            return(
                <div id="prevItem" className="glyphicon glyphicon-chevron-left" ref="prev" onClick={e => this.skipItem('prev',e)} />
            )
        }
        skipNextButton(){
            if(this.itemPosition(this.state.currentItem)==(this.state.totalItems-1)){return null};
            return(
                <div id="nextItem" className="glyphicon glyphicon-chevron-right" ref="next" onClick={e => this.skipItem('next',e)} />
            )
        }
        skipItem(direction, e){
            currentItemPosition=this.itemPosition(this.state.currentItem);
            if(direction=='prev' && currentItemPosition > 0){
                nextPosition=currentItemPosition-1;
                this.setState({currentItem: this.state.allItemsSrc[nextPosition]});
                this.addToWatchedItems(  this.state.allItemsSrc[nextPosition] );
                document.getElementById('item_'+nextPosition).className='watched';
            }
            else if( direction=='next' && currentItemPosition < this.state.totalItemss-1 ){
                nextPosition=currentItemPosition+1;
                this.setState({currentItem: this.state.allItemssSrc[nextPosition]});
                this.addToWatchedItemss( this.state.allItemssSrc[nextPosition] );
                document.getElementById('item_'+nextPosition).className='watched';
            }
        }
        likeItemButton(liked,event){
            var css="glyphicon glyphicon-heart"
            if(liked!=-1){
                css+=" liked";
            }
            return (
                <div id="likeButtonModal" className={css} onClick={this.like} />
            );
        }
        likeItemButtonClicked(event){
            var currentItemSrc=this.state.currentItem;
            if( isThisItemLiked ){
                event.currentTarget.className=event.currentTarget.className+" liked";
                likedItems.push( currentItemSrc );
            }
        }
        isThisItemLiked(thisItem){
            return (this.state.likedItems.indexOf(this.state.thisItem) === -1) ? false : true;
        }
        //new imported functions - END

    // Modal and Play Item  - END
    render(){
        return (
                <div className={"mediaType_"+this.state.typeOfMedia}>
                    <div className="itemPlayerContainer">
                        <div className="col-sm-1 col-md-2" />
                        <div className="col-sm-10 col-md-8 section-container">
                            <Items doOnClick={this.state.doOnClick} typeOfMedia={this.state.typeOfMedia} />
                        </div>
                        <div className="col-sm-1 col-md-2" />
                        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} onClick={this.state.doOnClick} doOnClick={this.state.doOnClick} >
                            {this.likeItemButton(this.isThisItemLiked(this.state.currentItem))}
                            {this.skipPrevButton()}
                            {this.skipNextButton()}
                            <ItemPlayer src={this.state.currentItem} typeOfMedia={this.state.typeOfMedia} autoPlay={this.state.videoAutoPlay} />
                        </Modal>
                    </div>
                </div>
        );
    }
}

module.exports=ListItems;