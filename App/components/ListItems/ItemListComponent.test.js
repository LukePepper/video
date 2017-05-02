import * as React from 'react';
import expect from 'expect';
import {renderIntoDocument} from 'react-dom/test-utils';
import Common from 'test/common.js';
var commonData = new Common;
import ItemListComponent from './ItemListComponent';
const hostName = (window.location.hostname == '' ) ? '' : 'http://localhost:8081/';

const itemComponentData={src:'videos/drum_pick-up.mp4', title:'test link'};
const testData = [
  { title: 'should render with LIKED item, UNWATCHED', itemComponentData: Common.itemComponentData, numItemsRendered: 1, src: itemComponentData.src, itemIsLiked:true, itemIsWatched:false },
  { title: 'should render with UNLIKED item, UNWATCHED', itemComponentData: Common.itemComponentData, numItemsRendered: 1, src: itemComponentData.src, itemIsLiked:false, itemIsWatched:false },
  { title: 'should render with LIKED item, WATCHED', itemComponentData: Common.itemComponentData, numItemsRendered: 1, src: itemComponentData.src, itemIsLiked:true, itemIsWatched:true },
  { title: 'should render with UNLIKED item, WATCHED', itemComponentData: Common.itemComponentData, numItemsRendered: 1, src: itemComponentData.src, itemIsLiked:false, itemIsWatched:true },
];

describe('App/components/ListItems/ListComponent', function(){
    testData.map((testDataItem)=>{
        it(testDataItem.title, (done)=>{
              const item = renderIntoDocument(
                      <ItemListComponent
                          numItemsRendered={testDataItem.numItemsRendered}
                          itemComponentData={itemComponentData}
                          src={itemComponentData.src}
                          itemIsLiked={testDataItem.itemIsLiked}
                          itemIsWatched={testDataItem.itemIsWatched}
                          itemPath={hostName}
                      />
              );

              expect(item).toExist();
              expect(item.state.numItemsRendered).toEqual(testDataItem.numItemsRendered);
              expect(item.state.itemIsLiked).toEqual(testDataItem.itemIsLiked);
              expect(item.state.itemIsWatched).toEqual(testDataItem.itemIsWatched);
              expect(item.state.itemComponentData.src).toEqual(itemComponentData.src);

              //todo
              //check the link text
              //check css of like and watched
              //click the ITEM and check the watched state and className
              //click the LIKE and check the watched state and className
              //check the bg image

              done();
        });
    });

});
