//nicely designed and implemented version of the code
var React=require('react');
var videosJSON = require('json-loader!./Videos.json');//JSON file containing the videos
var videoPath = '../videos/';//change this to http:// for non-local videos hosted on a web server
var VideoPlayer = require('./VideoPlayer');
var Modal = require('./modal');
var Nav = require('./Nav');
var Images = require('./Images');

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
            watchedVideos: new Array(),
            likedVideos: new Array(),
            selectedMenuItem: 'videos'
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
        var className="glyphicon glyphicon-heart";
        var likedVideos=this.state.likedVideos;

           if(likedVideos.indexOf(videoSrc) !== -1){
               className =+ ' liked';
           }


        return (
            <li key={componentIndex}>
                <div className={className} id={"like_"+numVideosRendered} onClick={this.like} />
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
    like: function(event){
        //todo refactor this
        var likedVideos=this.state.likedVideos;

        if(event.currentTarget.id == 'likeButtonModal'){
            var thisVideoSrc=this.state.currentVideo;
            if( likedVideos.indexOf(thisVideoSrc) === -1 ){
                this.setLikeOnTitle(thisVideoSrc);
            }else{
                this.unsetLikeOnTitle(thisVideoSrc);
            }

        }else{
            var thisLikeId=event.currentTarget.id.split('_');
            thisLikeId=thisLikeId[1];
            var thisVideoSrc=this.state.allVideosSrc[thisLikeId-1];
        }

        if( likedVideos.indexOf(thisVideoSrc) === -1 ){
            likedVideos.push( thisVideoSrc );
            //event.currentTarget.className=event.currentTarget.className+" liked";
            this.setLikeOnTitle(thisVideoSrc);

        }else{
            likedVideos.splice( likedVideos.indexOf(thisVideoSrc), 1 ) ;
            this.unsetLikeOnTitle(thisVideoSrc);
        }
        this.setState({likedVideos:likedVideos});
    },
    resetLikesOnTitles: function(){
        console.log('resetLikesOnTitles');
        var likedVideos=this.state.likedVideos;
        var self= this;
       likedVideos.map(function(likedVideoSrc, index){
           console.log('likedVideoSrc: '+likedVideoSrc);
           self.setLikeOnTitle(likedVideoSrc);
       });
    },
    setLikeOnTitle: function(videoSrc){
        videoIndex=this.state.allVideosSrc.indexOf(videoSrc);
        var itemId = 'like_'+(videoIndex+1);
        document.getElementById(itemId).className=document.getElementById(itemId).className+" liked";

    },
    unsetLikeOnTitle: function(videoSrc){
        videoIndex=this.state.allVideosSrc.indexOf(videoSrc);
        var itemId = 'like_'+(videoIndex+1);
        newClassName= document.getElementById(itemId).className.replace(/ liked/gi,'');
        document.getElementById(itemId).className=newClassName;
    },
    likeVideoButton: function(liked,event){
        var css="glyphicon glyphicon-heart"
        if(liked!=-1){
            css+=" liked";
        }
        return (
            <div id="likeButtonModal" className={css} onClick={this.like} />
        );
    },
    likeVideoButtonClicked: function(event){
        var currentVideoSrc=this.state.currentVideo;
        if( likedVideos.indexOf(this.state.allVideosSrc[thisVideoId]) === -1 ){
            event.currentTarget.className=event.currentTarget.className+" liked";
            likedVideos.push( currentVideoSrc );
        }
        else{

        }
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
    menuChange: function(event){
        this.setState({selectedMenuItem: event.currentTarget.title});
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
        var videoIsLiked=this.state.likedVideos.indexOf(this.state.currentVideo);
        var menuChange = this.menuChange;

        return (
            <div>
                    <Nav menuChange = {self.menuChange} selectedMenuItem={this.state.selectedMenuItem} />

                    {(this.state.selectedMenuItem=='videos') ?

                        <div id="videoPlayerContainer">
                            <div className="col-sm-1 col-md-2" />
                            <div className="col-sm-10 col-md-8 section-container">
                                <h2>Videos</h2>
                                <div className="choose-video" >
                                    {videoSectionsData}
                                </div>
                            </div>
                            <div className="col-sm-1 col-md-2" />
                            <Modal isOpen={isModalOpen} onClose={() => this.closeModal()} >
                                {this.likeVideoButton(videoIsLiked)}
                                {this.skipPrevButton()}
                                {this.skipNextButton()}
                                <VideoPlayer src={currentVideo} autoPlay={videoAutoPlay} />
                            </Modal>
                        </div>
                     : ""}

                    {('images'==this.state.selectedMenuItem) ? <Images /> : ""}

            </div>
        );

    }
});

module.exports=Videos;