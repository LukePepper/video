//nicely designed and implemented version of the code
var React=require('react');

/*
//TODO move to external file
//import videosJSON from ('videos.json');
*/

var videosJSON = {"videos": [
        {
            "title": "Starting the compressor",
            "src": "starting_the_compressor.mp4",
            "subsection": false,
            "section": ""
        },
        {
            "title": "Drum Selection",
            "src": "drum_selection.mp4",
            "subsection": false,
            "section": ""
        },
        {
            "title": "Drum Pickup",
            "src": "drum pick-up.mp4",
            "subsection": false,
            "section": ""
        },
        {
            "title": "Removing a Drum from the Grease Stand",
            "src": "operation_of_grease_stand_removing_drum.mp4",
            "subsection": true,
            "section": "Operation of Grease Stand"
        },
        {
            "title": "Removing a Dented Drum from the Grease Stand",
            "src": "operation_of_grease_stand_removing_dented_drum.mp4",
            "subsection": true,
            "section": "Operation of Grease Stand"
        },
        {
            "title": "Operating the Grease Stand",
            "src": "operation_of_grease_stand.mp4",
            "subsection": true,
            "section": "Operation of Grease Stand"
        },
        {
            "title": "Dealing With a Water Contaminated Drum",
            "src": "opereation_of_grease_stand_water_contamination.mp4",
            "subsection": true,
            "section": "Operation of Grease Stand"
        },
        {
            "title": "Heavy Metals",
            "src": "heavy_metals.mp4",
            "subsection": false,
            "section": ""
        },
        {
            "title": "Starting The Mixing Machine",
            "src": "mixing_machine_starting.mp4",
            "subsection": true,
            "section": "The Mixing Machine"
        },
        {
            "title": "Adding Additives to the Mixing Machine (Heavy Metals, Tackifier, Setal)",
            "src": "mixing_machine_additives.mp4",
            "subsection": true,
            "section": "The Mixing Machine"
        },
        {
            "title": "Extractor Operation",
            "src": "extractor_operation.mp4",
            "subsection": false,
            "section": ""
        },
        {
            "title": "Floveyor Operation",
            "src": "floveyor_operation.mp4",
            "subsection": false,
            "section": ""
        },
        {
            "title": "Rinstrum R420 Operation (Premium Lube)",
            "src": "load_cell_operation_r420.mp4",
            "subsection": true,
            "section": "Load Cell Operation"
        },
        {
            "title": "Rinstrum R2100 Operation (ZN50)",
            "src": "load_cell_operation_r2100.mp4",
            "subsection": true,
            "section": "Load Cell Operation"
        },
        {
            "title": "Cleaning the Filter",
            "src": "load_cell_operation_clearning_filter.mp4",
            "subsection": true,
            "section": "Load Cell Operation"
        },
        {
            "title": "Packaging Selection",
            "src": "packaging_selection.mp4",
            "subsection": false,
            "section": ""
        },
        {
            "title": "Wrapping of a Pallet",
            "src": "wrapping_a_pallet.mp4",
            "subsection": false,
            "section": ""
        },
        {
            "title": "ZN50",
            "src": "ZN50.mp4",
            "subsection": false,
            "section": ""
        }
    ]
};
var videosSectionArray = new Array();
var videosData = new Array();

var Videos=React.createClass({
    propTypes: {
        title:          React.PropTypes.string,
        src:            React.PropTypes.string,
        subSection:     React.PropTypes.bool,
        section:        React.PropTypes.string
    },

    createVideoSections: function(videoSection){
        //build an array of the various sections
        if(videosSectionArray.indexOf(videoSection)===-1) {
            videosSectionArray.push(videoSection);
        }
        //todo add the array to state
    },

    createVideoContentsArrays: function(video){
        this.createVideoSections(video.section);//add all sections to an array
        
        var currentVideoData=[
            video.title,video.src,video.subsection
        ];

        var currentSectionIndex=videosSectionArray.indexOf(video.section);
        var currentVideosDataArrayRowContents=videosData[currentSectionIndex];//contents of the row at the moment

        if(currentVideosDataArrayRowContents!=undefined){
            currentVideosDataArrayRowContents.push(currentVideoData);
            videosData[currentSectionIndex]=currentVideosDataArrayRowContents; //add this video data to the array row that already exisits
        }
        else{
            videosData[currentSectionIndex]=[currentVideoData];
        }
    },

    createVideos: function (video) {
        return (
            <div key={video.title}>
                <a href={video.src}>
                    {video.title}, {video.src}, {video.subSection}, {video.section}
                </a>
            </div>
        )
    },

    createLists: function(listData){
        listData.map(this.createVideoContentsArrays);

        var videoSectionsData = videosSectionArray.map(function(headingName, index){

            var sectionData =  videosData[index].map(function(dataElements, index2){
                console.log(dataElements);
                return (
                    <li src={dataElements[1]} key={index2}> {dataElements[0]} </li>
                );
            });

            return (
                <div key={index}>
                    <h3>{headingName}</h3>
                    <ul>{sectionData}</ul>
                </div>
            )
        });

        return (
            <div>
                {videoSectionsData}
            </div>
        );
    },

    render: function () {
        var dataToRender =  this.createLists(videosJSON.videos );

        return (
            <div>
                {dataToRender}
            </div>
        );
    }
});

module.exports=Videos;