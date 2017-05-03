import * as React from 'react';
import expect from 'expect';
import {renderIntoDocument} from 'react-dom/test-utils';
import Common from 'test/common.js';
var commonData = new Common;
const hostName = commonData.testServerUrl(window.location.hostname);
import {testServerUrl} from 'test/common.js' //todo do i need this?
import Lists from './Lists'

const itemComponentData={title:'test link', src:'videos/drum_pick-up.mp4', src_thumbnail:'videos/drum_pick-up.png'};
const sections=['Test Section 0', 'Test Section 1', 'Test Section 2'];
const itemPath='/images';
const numItemsRendered=1;

 function itemClicked(){
  return true;
}
function itemLikeClicked(){
  return true;
}
function isThisItemLiked(){
  return true;
}
function isThisItemWatched(){
  return true;
}

describe('App/components/ListItems/Lists', function(){
        // var ListComponent = <Lists
        //     allItemData={itemComponentData}
        //     sections={sections}
        //     itemPath={itemPath}
        //     itemClicked={this.itemClicked.bind(this)}
        //     itemLikeClicked={this.itemLikeClicked.bind(this)}
        //     isThisItemLiked={this.isThisItemLiked.bind(this)}
        //     isThisItemWatched={this.isThisItemWatched.bind(this)}
        // />;
        it('hello world' + ' -> item exists', (done)=>{
              expect(1).toEqual(1);
              done();
        });

        //itemClicked()
        //do click
        //check state.itemClicked
        //calls func in this file

        //itemLikeClicked()
        //do click
        //check state.itemLiked
        //calls func in this file

});
