var React=require('react');

class VideoPlayer extends React.Component{
    render(){
        return(
            <div>
                <video controls type="video/mp4" id="itemPlayer" preload src={this.props.src} ref="video" autoPlay={this.props.autoPlay} ></video>
            </div>
        )
    }
};
module.exports=VideoPlayer;
