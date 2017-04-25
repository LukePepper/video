/*
*   DEPRECATED: delete when ready
*
*
*
*
*
*
 */



var React=require('react');
//var videosJSON = require('json-loader!./Videos.json');//JSON file containing the videos
var mediaJSON = require('json-loader!./Media.json');//JSON file containing the videos
var videoPath = '../videos/';//change this to http:// for non-local videos hosted on a web server
var imagePath = '../images/';//change this to http:// for non-local videos hosted on a web server
var VideoPlayer = require('./VideoPlayer_deleteMe');
var ImagePlayer = require('./ImagePlayer_deleteMe');
var Modal = require('./../modal');
var ModalItemList = require('./../Modal');

var Nav = require('./../Nav');
var Images = require('./Items');
var Lists = require('./Lists');
var ListItems = require('./../ListItems');

class CreateSections extends Lists{
    constructor(props) {
        super(props);
        this.state = {
            sections:  new Array()
        };
    }
    render(){

        var sections = this.testPing().toString();
        console.log(testPing);
        testPing += ' '+this.props.echoData;
        console.log(testPing);

        return(

            <div>
                { testPing }

            </div>
        )
    }
}

//todo convert React.createClass to ES6 type class
var Videos=React.createClass({
    getInitialState: function(){
        return {
            currentItem: 'starting_the_compressor.mp4',
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
            selectedMenuItem: 'videos',
            listData: '',
            mediaData: '',
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
        itemsDataArray=this.state.videosData;

        var currentVideoData={title: video.title, src: video.src, subsection: video.subsection};

        if(itemsDataArray[sectionArray.indexOf(video.section)]!=undefined){
            itemsDataArray[sectionArray.indexOf(video.section)].push(currentVideoData);
            itemsDataArray[sectionArray.indexOf(video.section)]=itemsDataArray[sectionArray.indexOf(video.section)];
        }
        else{
            itemsDataArray.push([currentVideoData]);
        }
        this.setState({ videosData: itemsDataArray });
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
            var thisVideoSrc=this.state.currentItem;
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
        var likedVideos=this.state.likedVideos;
        var self= this;
       likedVideos.map(function(likedVideoSrc, index){
           self.setLikeOnTitle(likedVideoSrc);
       });
    },
    setLikeOnTitle: function(videoSrc){
        //todo refactor
        //todo get this called from item onClick
        videoIndex=this.state.allVideosSrc.indexOf(videoSrc);
        var itemId = 'like_'+(videoIndex+1);
        document.getElementById(itemId).className=document.getElementById(itemId).className+" liked";

    },
    unsetLikeOnTitle: function(videoSrc){
        //todo refactor
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
        var currentVideoSrc=this.state.currentItem;
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
            currentItem: event.currentTarget.dataset.src,
            videoAutoPlay: 'autoplay'
        });
        this.openModal();
        this.addToWatchedVideos(event.currentTarget.dataset.src);
        event.currentTarget.className = "watched";
    },
    skipPrevButton: function(){
        if(this.videoPosition(this.state.currentItem)==0){return null};
        return(
            <div id="prevItem" className="glyphicon glyphicon-chevron-left" ref="prev" onClick={e => this.skipVideo('prev',e)} />
        );
    },
    skipNextButton: function(){
        if(this.videoPosition(this.state.currentVideo)==(this.state.totalVideos-1)){return null};
        return(
            <div id="nextItem" className="glyphicon glyphicon-chevron-right" ref="next" onClick={e => this.skipVideo('next',e)} />
        );
    },
    skipVideo: function(direction, e){
        currentVideoPosition=this.videoPosition(this.state.currentItem);
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
    /* new bits START */
    menuChange: function(event){
        this.setState({selectedMenuItem: event.currentTarget.title});
    },
    playItem: function(event){
      console.log('** video.js -> playItem() **');
        this.setState({
            currentItem: event.currentTarget.dataset.src
        });
        this.openModal();
        //this.addToWatchedItems(event.currentTarget.dataset.src);
        event.currentTarget.className = "watched";
    },
    /* new bits END */
    componentWillMount: function(){
       var self=this;//used to access root
       var videosData=this.state.videosData;
       var sectionsArray=this.state.sections;
       var allVideosSrc = this.state.allVideosSrc;
       var i=0;


       this.setState({listData: videosJSON.videos});//old style JSON file
        this.setState({mediaData: mediaJSON});//new  style combinded JSON file
       this.createLists(videosJSON.videos );
       //todo ** Start Here **
       var lists = <Lists dataJSON={videosJSON.videos} />;


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
            var currentVideo = videoPath+this.state.currentItem;
            var currentItem = imagePath+this.state.currentItem;//todo - fix these

        var videoAutoPlay = this.state.videoAutoPlay;
        var videoSectionsData = this.state.playVideoData;
        var isModalOpen=this.state.isModalOpen;
        var self=this;
        var videoIsLiked=this.state.likedVideos.indexOf(this.state.currentItem);
        var menuChange = this.menuChange;

        return (
            <div>
                    <Nav menuChange = {self.menuChange} selectedMenuItem={this.state.selectedMenuItem} />

                    {(this.state.selectedMenuItem=='videos') ?

                        <div className="itemPlayerContainer">
                            <div className="col-sm-1 col-md-2" />
                            <div className="col-sm-10 col-md-8 section-container">
                                <h2>Videos</h2>
                                <div className="chooseItem" >
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

                    {('images'==this.state.selectedMenuItem) ?
                        <ListItems typeOfMedia="images" />
                        : ""
                    }

            </div>
        );

    }
});


module.exports=Videos;