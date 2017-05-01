import * as React from 'react';
import expect from 'expect';
import {renderIntoDocument} from 'react-dom/test-utils';
import ItemPlayer from './ItemPlayer';

/* test data */
var testImages= {videos: "videos/drum_pick-up.mp4", images: "images/IMG_1406.JPG"};//todo change these to a generic test doc or web url
var testData = [
  { title: 'should render with LIKED video', typeOfMedia: 'videos', src: testImages.videos, itemIsLiked:true, autoPlay:true },
  { title: 'should render with UNLIKED video', typeOfMedia: 'videos', src: testImages.videos, itemIsLiked:false, autoPlay:true },
  { title: 'should render with LIKED image', typeOfMedia: 'images', src: testImages.images, itemIsLiked:true, autoPlay:true },
  { title: 'should render with UNLIKED image', typeOfMedia: 'images', src: testImages.images, itemIsLiked:false, autoPlay:true },
];

describe('App/components/ListItems/ItemPlayer', function(){
    testData.map((testDataItem)=>{
        it(testDataItem.title, (done)=>{
              const item = renderIntoDocument(
                      <ItemPlayer typeOfMedia={testDataItem.typeOfMedia} src={testDataItem.src} itemIsLiked={testDataItem.itemIsLiked} autoPlay={testDataItem.autoPlay} />
              );
              let itemRef = (testDataItem.typeOfMedia == 'videos') ? item.refs.video : item.refs.image;

              expect(item).toExist();
              expect(itemRef) .toExist();
              expect(item.state.typeOfMedia).toEqual(testDataItem.typeOfMedia);
              expect(item.state.liked).toEqual(testDataItem.itemIsLiked);
              expect(item.state.autoPlay).toEqual(testDataItem.autoPlay);
              expect(item.props.src).toEqual(testDataItem.src);
              expect(itemRef.src).toEqual(testDataItem.src);
              done();
        });
    });

});
