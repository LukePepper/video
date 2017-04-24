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
            currentVideo: ''
        };
    }
    componentWillRender(){

    }
    // Modal and Play Item  - START
    playItem(event){
        this.setState({
            currentItem: (this.state.typeOfMedia=='videos') ? videoPath+event.currentTarget.dataset.src : imagePath+event.currentTarget.dataset.src,
            playItem:true
        });

        this.openModal();

        //this.addToWatchedItems(event.currentTarget.dataset.src);//todo add this function
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
                            <ItemPlayer src={this.state.currentItem} typeOfMedia={this.state.typeOfMedia} autoPlay={this.state.videoAutoPlay} />
                        </Modal>
                    </div>
                </div>
        );
    }
}

module.exports=ListItems;