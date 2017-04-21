var React=require('react');

class VideoPlayer extends React.Component{
        render(){
            return(

                    <video controls type="video/mp4" id="videoPlayer" preload src={this.props.src} ref="video" autoPlay={this.props.autoPlay} ></video>

            )
        }
};
module.exports=VideoPlayer;
