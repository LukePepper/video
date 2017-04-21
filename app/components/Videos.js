//nicely designed and implemented version of the code
var React=require('react');
var videosJSON = require('json-loader!./Videos.json');//JSON file containing the videos
var videoPath = '../videos/';//change this to http:// for non-local videos hosted on a web server
var VideoPlayer = require('./VideoPlayer');
var Modal = require('./modal');

//todo convert React.createClass to ES6 type class
var Videos=React.createClass({
    getInitialState: function(){
        return {
            currentVideo: 'starting_the_compressor.mp4',
            videoAutoplay: '',
            playVideoData: '',
            sections: new Array(),
            videosData: new Array(),
            isModalOpen: false
        };
    },
    createSections: function(section){
        //builds an array of the various sections and stores to state
        sectionsArray=this.state.sections;

        if(sectionsArray.indexOf(section)===-1) {
            sectionsArray.push(section);
        }
        this.setState({sections: sectionsArray});
        return sectionsArray;
    },
    createVideoContentsArrays: function(video){
        sectionArray = this.createSections(video.section);//adds all sections to an array
        videosDataArray=this.state.videosData;

        var currentVideoData={title: video.title, src: video.src, subsection: video.subsection};
        var currentSectionIndex=sectionArray.indexOf(video.section);
        var currentVideosDataArrayRowContents=videosDataArray[currentSectionIndex];//contents of the row at the moment

        if(currentVideosDataArrayRowContents!=undefined){
            currentVideosDataArrayRowContents.push(currentVideoData);
            videosDataArray[currentSectionIndex]=currentVideosDataArrayRowContents; //add this video data to the array row that already exists
        }
        else{
            videosDataArray.push([currentVideoData]);
        }
        this.setState({videosData: videosDataArray});
    },
    playVideo: function(videoSrc){
        this.setState({currentVideo: videoSrc});
        this.setState({videoAutoPlay: 'autoplay'});
        this.openModal();
    },
    createLists: function(listData){
        listData.map(this.createVideoContentsArrays);
    },
    createVideoOpenComponent: function(videoSrc, videoTitle, componentIndex){
        return (
            <li key={componentIndex} >
                <a href="#"  onClick={ () => this.playVideo(videoSrc) } >
                    {videoTitle}
                </a>
            </li>
        );
    },
    createPlayVideosSection: function(headingName, videoPlayData, index){
        return(
            <div key={index}>
                <h3>{headingName}</h3>
                <ul>{videoPlayData}</ul>
            </div>
        );
    },
    openModal: function() {
        this.setState({ isModalOpen: true })
    },
    closeModal: function() {
        this.setState({ isModalOpen: false })
    },
    componentWillMount: function(){


       var self=this;//used to access root
       var videosData=this.state.videosData;
       var sectionsArray=this.state.sections;

       this.createLists(videosJSON.videos );//ingest the data from the JSON file

        var playVideosSectionsData = sectionsArray.map(function(headingName, index){
            var videoPlayData =  videosData[index].map(function(videoDataElements, index2){
                return (
                    self.createVideoOpenComponent( videoDataElements.src, videoDataElements.title, index2)
                );
            });

            return (
                self.createPlayVideosSection(headingName, videoPlayData, index)
            )
        });

        this.setState({playVideoData: playVideosSectionsData});
    },
    render: function () {
        var currentVideo = videoPath+this.state.currentVideo;
        var videoAutoPlay = this.state.videoAutoPlay;
        var videoSectionsData = this.state.playVideoData;
        var isModalOpen=this.state.isModalOpen;
        var self=this;

        return (

            <div id="videoPlayerContainer">
                <div className="col-sm-1 col-md-2"></div>
                <div className="col-sm-10 col-md-8">
                    <h2>Videos</h2>
                    <div className="choose-video" >
                        {videoSectionsData}
                    </div>
                </div>
                <div className="col-sm-1 col-md-2"></div>
                <Modal isOpen={isModalOpen} onClose={() => this.closeModal()} >
                    <VideoPlayer src={currentVideo} autoPlay={videoAutoPlay} />
                </Modal>
            </div>
        );
    }
});


module.exports=Videos;