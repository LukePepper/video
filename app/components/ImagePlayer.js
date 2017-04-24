/*
********************************************************
* Renders the image player
*
* ImagesPlayer.js
********************************************************
*/

var React=require('react');

class ImagePlayer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            src: this.props.src,
            liked: this.props.liked
        };
    }
    render(){
        return(
            <div className="itemPlayerImageContainer">
                <img id="itemPlayer" src={this.state.src} ref="image"  />
            </div>
        )
    }
};
module.exports=ImagePlayer;
