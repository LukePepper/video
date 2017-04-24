/*
 ********************************************************
 * Renders the item player
 *
 * ImagesPlayer.js
 ********************************************************
 */

var React=require('react');

class ItemPlayer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            typeOfMedia: this.props.typeOfMedia,
            src: this.props.src,
            liked: this.props.liked,
            autoPlay: this.props.autoPlay
        };
    }
    render(){
        return(
            <div>
                 {(this.state.typeOfMedia=='videos') ?
                    <div className="itemPlayerImageContainer">
                        <video controls type="video/mp4" id="itemPlayer" preload src={this.state.src} ref="video" autoPlay={this.state.autoPlay} />
                    </div>
                    :
                    <div className="itemPlayerImageContainer">
                        <img id="itemPlayer" src={this.state.src} ref="image"  />
                    </div>
                }
            </div>
        );
    }
};

module.exports=ItemPlayer;