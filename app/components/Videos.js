//nicely designed and implemented version of the code
var React=require('react');
var videosJSON = require('json-loader!./Videos.json');//JSON file containing the videos
var videoPath = '../videos/';//change this to http:// for non-local videos hosted on a web server
var VideoPlayer = require('./VideoPlayer');
var Modal = require('./modal');

//todo *** Set class to watched for videos that have been watched ****

//todo convert React.createClass to ES6 type class
var Videos=React.createClass({
    getInitialState: function(){
        return {
            currentVideo: 'starting_the_compressor.mp4',
            videoAutoplay: '',
            playVideoData: '',
            sections: new Array(),
            videosData: new Array(),
            isModalOpen: false,
            allVideosSrc: new Array(),
            totalVideos: 0,
            showPrevVideo: false,
            showNextVideo: true,
            watchedVideos: new Array()
        };
    },
    createSections: function(section){
        sectionsArray=this.state.sections;

        if(sectionsArray.indexOf(section)===-1) {
            sectionsArray.push(section);
        }
        this.setState({sections: sectionsArray});
        return sectionsArray;
    },
    createVideoContentsArrays: function(video){
        sectionArray = this.createSections(video.section);
        videosDataArray=this.state.videosData;

        var currentVideoData={title: video.title, src: video.src, subsection: video.subsection};

        if(videosDataArray[sectionArray.indexOf(video.section)]!=undefined){
            videosDataArray[sectionArray.indexOf(video.section)].push(currentVideoData);
            videosDataArray[sectionArray.indexOf(video.section)]=videosDataArray[sectionArray.indexOf(video.section)];
        }
        else{
            videosDataArray.push([currentVideoData]);
        }
        this.setState({ videosData: videosDataArray });
    },
     createLists: function(listData){
        listData.map(this.createVideoContentsArrays);
    },
    createVideoOpenComponent: function(videoSrc, videoTitle, componentIndex, numVideosRendered){
        return (
            <li key={componentIndex}>
                <div class="glyphicon glyphicon-
                <a href="#"  onClick={this.playVideo} data-src={videoSrc} id={'video_'+numVideosRendered} >
                    {videoTitle}
                </a>
            </li>
        );
    },
    createPlayVideosSection: function(headingName, videoPlayData, index){
        return(
            <div key={index}>
                <h3>{headingName}</h3>
                <ul  key={index}>{videoPlayData}</ul>
            </div>
        );
    },
    openModal: function() {
        this.setState({ isModalOpen: true })
    },
    closeModal: function() {
        this.setState({ isModalOpen: false })
    },
    playVideo: function(event){
        this.setState({
            currentVideo: event.currentTarget.dataset.src,
            videoAutoPlay: 'autoplay'
        });
        this.openModal();
        this.addToWatchedVideos(event.currentTarget.dataset.src);
        event.currentTarget.className = "watched";
    },
    skipPrevButton: function(){
        if(this.videoPosition(this.state.currentVideo)==0){return null};
        return(
            <div id="prevVideo" className="glyphicon glyphicon-chevron-left" ref="prev" onClick={e => this.skipVideo('prev',e)} />
        );
    },
    skipNextButton: function(){
        if(this.videoPosition(this.state.currentVideo)==(this.state.totalVideos-1)){return null};
        return(
            <div id="nextVideo" className="glyphicon glyphicon-chevron-right" ref="next" onClick={e => this.skipVideo('next',e)} />
        );
    },
    skipVideo: function(direction, e){
        currentVideoPosition=this.videoPosition(this.state.currentVideo);
        if(direction=='prev' && currentVideoPosition > 0){
            nextPosition=currentVideoPosition-1;
            this.setState({currentVideo: this.state.allVideosSrc[nextPosition]});
            this.addToWatchedVideos(  this.state.allVideosSrc[nextPosition] );
            document.getElementById('video_'+nextPosition).className='watched';
        }
        else if( direction=='next' && currentVideoPosition < this.state.totalVideos-1 ){
            nextPosition=currentVideoPosition+1;
            this.setState({currentVideo: this.state.allVideosSrc[nextPosition]});
            this.addToWatchedVideos( this.state.allVideosSrc[nextPosition] );
            document.getElementById('video_'+nextPosition).className='watched';
        }

    },
    videoPosition: function(video){
        return this.state.allVideosSrc.indexOf(video);
    },
    addToWatchedVideos: function(thisVideoSrc){
        var addToWatchedVideosArray=this.state.watchedVideos;
        if( addToWatchedVideosArray.indexOf(thisVideoSrc) === -1 ) {
            addToWatchedVideosArray.push(thisVideoSrc);
            this.setState({watchedVideos: addToWatchedVideosArray});
        }
    },
    videoHasBeenWatched: function(videoSrc){
        var watchedVideosArray=this.state.watchedVideos;
        if(watchedVideosArray.indexOf(videoSrc) === -1 ){
            return false;
        }else{
            return true;
        }
    },
    componentWillMount: function(){
       var self=this;//used to access root
       var videosData=this.state.videosData;
       var sectionsArray=this.state.sections;
       var allVideosSrc = this.state.allVideosSrc;
       var i=0;

       this.createLists(videosJSON.videos );

        var playVideosSectionsData = sectionsArray.map(function(headingName, index){
            var videoPlayData =  videosData[index].map(function(videoDataElements, index2){
                allVideosSrc.push(videoDataElements.src);
                i++;
                return (
                    self.createVideoOpenComponent( videoDataElements.src, videoDataElements.title, index2, i)
                );
            });
            return (
                self.createPlayVideosSection(headingName, videoPlayData, index)
            )
        });
        this.setState({
            playVideoData: playVideosSectionsData,
            allVideosSrc: allVideosSrc,
            totalVideos: allVideosSrc.length
        });
    },
    render: function () {
        var currentVideo = videoPath+this.state.currentVideo;
        var videoAutoPlay = this.state.videoAutoPlay;
        var videoSectionsData = this.state.playVideoData;
        var isModalOpen=this.state.isModalOpen;
        var self=this;

        return (
            <div id="videoPlayerContainer">
                <div className="col-sm-1 col-md-2" />
                <div className="col-sm-10 col-md-8">
                    <h2>Videos</h2>
                    <div className="choose-video" >
                        {videoSectionsData}
                    </div>
                </div>
                <div className="col-sm-1 col-md-2" />
                <Modal isOpen={isModalOpen} onClose={() => this.closeModal()} >
                    {this.skipPrevButton()}
                    {this.skipNextButton()}
                    <VideoPlayer src={currentVideo} autoPlay={videoAutoPlay} />
                </Modal>
            </div>
        );
    }
});

module.exports=Videos;