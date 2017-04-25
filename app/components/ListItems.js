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
            allItemsSrc: new Array(),
            allItemData: new Array(),
            sections: new Array()
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

    itemPosition(item){
console.log('++++++++++++++++++++++++++++');
console.log('ListItems.js ->');
console.log('item: '.item);
console.log(' this.state.allItemsSrc: ')  ;
console.log( this.state.allItemsSrc );
console.log('++++++++++++++++++++++++++++');

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
console.log('__________________________________________________________');
console.log('this.itemPosition(this.state.currentItem): ');
console.log( this.itemPosition(this.state.currentItem) );

console.log('this.state.currentItem: ');
console.log(this.state.currentItem);
console.log('__________________________________________________________');

            if(this.itemPosition(this.state.currentItem)<1){return null};
            return(
                <div id="prevItem" className="glyphicon glyphicon-chevron-left" ref="prev" onClick={e => this.skipItem('prev',e)} />
            )
        }
        skipNextButton(){

console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
console.log('this.itemPosition(this.state.currentItem): ');
console.log( this.itemPosition(this.state.currentItem) );

console.log('this.state.currentItem: ');
console.log(this.state.currentItem);
console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

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
        buildItemsStateTable(){
                /* todo
                    * build data structure to hold all items - {src:"xxx.png",watched:false,liked:false}
                    * - must be ordered same way as the items are rendered on screen
                    * - refactor other functions to use and update this data structure
                    * - pass down this data structure to Lists.js to ingest (via Items.js)
                    * - look at Lists.js line 89 onwards to see how it is done currently
                    *
                    * build a second array of sections??
                 */

                //pull in the data from JSON
            var mediaData=this.state.mediaData;

                //pull out the bits we need
            mediaData=(this.state.typeOfMedia=='videos') ? mediaData.videos : mediaData.images;

                //build an array of sections
            var sectionsArray=new Array();
            var sections = mediaData.map(function(itemData){
                (sectionsArray.indexOf(itemData.section) === -1 ) ? sectionsArray.push(itemData.section) : null;
            })

                //order array based on sections (i.e. so it is ready to render to the lists)
            var itemsArrayOrdered=new Array();
            var sections = sectionsArray.map(function(section, index){
                var itemOrdering=mediaData.map(function(item, index2){
                    if(item.section == section){
                        itemsArrayOrdered.push(item);
                    }
                });
            });

                //store to states
            this.setState({
                allItemData: itemsArrayOrdered,
                sections: sections
            });


                //add to props for Lists.js to ingest (via Items.js)


            /*
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

             */

        }
        //new imported functions - END

    // Modal and Play Item  - END
    componentWillMount(){
        this.buildItemsStateTable();
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