var React = require('react');
//var videoList = require('./VideosContainer.js');

var testComponent=React.createClass({
    render: function () {
        return <h1>Hello World!</h1>;
    }
});

var VideoListComponent=React.createClass({
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
       var objToRender;
        console.log(videoList.length);
       //this.state.section
        //this.setState.section({section: XXXXX});

        var videoListObj=testObj.map(function(videoObj){
            return(
                {videoObj.src}
            )

        });

        /*
        for(i=0;i<videoList.length;i++){
            return(
                <ul>
                    <li>{videoList[i].title}</li>
                    <li>{videoList[i].src}</li>
                    <li>{videoList[i].subSection}</li>
                    <li>{videoList[i].section}</li>
                </ul>
            )
        }
        */


    }
});


//module.exports=testComponent;
module.exports=VideoListComponent;

