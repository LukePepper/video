import React from 'react';

export default class testData extends React.Component {

  //todo try using these: import {testImages} from 'common.js'
  constructor(props) {
      super(props);
      this.state = {testServerUrl: null};
  }
  testServerUrl(hostName){
    return (hostName == '' ) ? '' : 'http://localhost:8081/';
  }
  testImages(){
    return {videos: "videos/drum_pick-up.mp4", images: "images/IMG_1406.JPG"};
  }
  render(){
    return(
      <div>
        {this.testServerUrl()}
      </div>
    )
  }
}
