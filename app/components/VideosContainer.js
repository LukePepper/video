var React=require('react');
var ReactDOM=require('react-dom');

var videoList=[
    {
        title: "Starting the compressor",
        src: "starting_the_compressor.mp4",
        subSection: false,
        section: ""
    },
    {
        title: "Drum Selection",
        src: "drum_selection.mp4",
        subSection: false,
        section: ""
    },
    {
        title: "Drum Pickup",
        src: "drum pick-up.mp4",
        subSection: false,
        section: ""
    },
    {
        title: "Removing a Drum from the Grease Stand",
        src: "operation_of_grease_stand_removing_drum.mp4",
        subSection: true,
        section: "Operation of Grease Stand"
    },
    {
        title: "Removing a Dented Drum from the Grease Stand",
        src: "operation_of_grease_stand_removing_dented_drum.mp4",
        subSection: true,
        section: "Operation of Grease Stand"
    },
    {
        title: "Operating the Grease Stand",
        src: "operation_of_grease_stand.mp4",
        subSection: true,
        section: "Operation of Grease Stand"
    },
    {
        title: "Dealing With a Water Contaminated Drum",
        src: "opereation_of_grease_stand_water_contamination.mp4",
        ssubSection: true,
        section: "Operation of Grease Stand"
    },
    {
        title: "Heavy Metals",
        src: "heavy_metals.mp4",
        subSection: false,
        section: ""
    },
    {
        title: "Starting The Mixing Machine",
        src: "mixing_machine_starting.mp4",
        subSection: true,
        section: "The Mixing Machine"
    },
    {
        title: "Adding Additives to the Mixing Machine (Heavy Metals, Tackifier, Setal)",
        src: "mixing_machine_additives.mp4",
        subSection: true,
        section: "The Mixing Machine"
    },
    {
        title: "Extractor Operation",
        src: "extractor_operation.mp4",
        subSection: false,
        section: ""
    },
    {
        title: "Floveyor Operation",
        src: "floveyor_operation.mp4",
        subSection: false,
        section: ""
    },
    {
        title: "Rinstrum R420 Operation (Premium Lube)",
        src: "load_cell_operation_r420.mp4",
        subSection: true,
        section: "Load Cell Operation"
    },
    {
        title: "Rinstrum R2100 Operation (ZN50)",
        src: "load_cell_operation_r2100.mp4",
        subSection: true,
        section: "Load Cell Operation"
    },
    {
        title: "Cleaning the Filter",
        src: "load_cell_operation_clearning_filter.mp4",
        subSection: true,
        section: "Load Cell Operation"
    },
    {
        title: "Packaging Selection",
        src: "packaging_selection.mp4",
        subSection: false,
        section: ""
    },
    {
        title: "Wrapping of a Pallet",
        src: "wrapping_a_pallet.mp4",
        subSection: false,
        section: ""
    },
    {
        title: "ZN50",
        src: "ZN50.mp4",
        subSection: false,
        section: ""
    }
];

var prevSection='';
var videoLIs = videoList.map(function(video, i){
    console.log('prevSection: '+prevSection + ' --->  this subSection: '+video.section);
    var thisVideoSection=video.section;

    if(video.subSection==true){
        var objToReturn;

        if(thisVideoSection!=prevSection){
            objToReturn=(
                <div key={i}>
                    <h3 key={i}>{video.section}</h3>
                    <li className="subSection" key={video.title}><a href={video.src}>{video.title}</a></li>
                </div>
            );
            prevSection=video.section;
        } else{
        objToReturn=(
            <li key={video.title}><a href={video.src}>{video.title}</a></li>
            );

        }
    }
    else{
        var objToReturn=(
            <li><a href={video.src}>{video.title}</a></li>
        );
    }

    return (
        objToReturn
    );
});

var VideoListContainer=React.createClass({
    propTypes: {
        title:          React.PropTypes.string,
        src:            React.PropTypes.string,
        subSection:     React.PropTypes.bool,
        section:        React.PropTypes.string
    },

    getInitialState: function () {
        return {section : ""};
    },

    render: function () {

        var currentVideo=videoList[1];
        var title=currentVideo.title;
        var src=currentVideo.src;
        var subSection=currentVideo.subSection;
        var section=currentVideo.section;

        return (

                <ul>
                    {videoLIs}
                </ul>

        );
    }
});


//module.exports=testComponent;
module.exports=VideoListContainer;


