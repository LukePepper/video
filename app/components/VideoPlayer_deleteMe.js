/*
 ********************************************************
 * DEPRICATED: delete when <ready></ready>
 *
 *
 * */

var React=require('react');

class VideoPlayer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            src: this.props.src,
            liked: this.props.liked,
            autoPlay: this.props.autoPlay
        };
    }
    render(){
        return(
            <div className="itemPlayerImageContainer">
                <video controls type="video/mp4" id="itemPlayer" preload src={this.state.src} ref="video" autoPlay={this.state.autoPlay} />
            </div>
        )
    }
};
module.exports=VideoPlayer;
