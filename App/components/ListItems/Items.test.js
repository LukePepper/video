import * as React from 'react';
import expect from 'expect';
import {renderIntoDocument} from 'react-dom/test-utils';
import Common from 'test/common.js';
var commonData = new Common;
const hostName = commonData.testServerUrl(window.location.hostname);
import Items from './Items'

const itemComponentData={title:'test link', src:'videos/drum_pick-up.mp4', src_thumbnail:'videos/drum_pick-up.png'};
const sections=['Test Section 0', 'Test Section 1', 'Test Section 2'];
const itemPath='/images';
const numItemsRendered=1;
const typeOfMedia='videos';

var itemClickedVal=false;
var itemLikeClickedVal=false;

function itemClicked(){
  itemClickedVal=true;
  return true;
}
function itemLikeClicked(){
  itemLikeClickedVal=true;
  return true;
}
function isThisItemLiked(){
  return true;
}
function isThisItemWatched(){
  return true;
}

describe('App/components/ListItems/Items', function(){
        let itemsComponent =  renderIntoDocument(
        <Items
            typeOfMedia={typeOfMedia}
            allItemData={[itemComponentData]}
            sections={sections}
            itemPath={itemPath}
            itemClicked={itemClicked}
            itemLikeClicked={itemLikeClicked}
            isThisItemLiked={isThisItemLiked}
            isThisItemWatched={isThisItemWatched}
        />);
        it('Check State Data', ()=>{
            expect(itemsComponent.state.typeOfMedia).toEqual(typeOfMedia);
        });
        it('Click -> ITEM is clicked', ()=>{
            let clickOnItem = itemsComponent.itemClicked(itemComponentData.src);//simulate item click
            expect(itemComponentData.src).toEqual(itemsComponent.state.itemClicked);//check the state and ensure the correct data is stored
            expect(itemClickedVal).toBe(true);  //check the click calls the function: itemClicked() in this file
        });
        it('Click -> LIKED is clickled', ()=>{
          let clickOnItemLike = itemsComponent.itemLikeClicked(itemComponentData.src);//simulate item click
          expect(itemComponentData.src).toEqual(itemsComponent.state.itemLiked);//check the state and ensure the correct data is stored
          expect(itemLikeClickedVal).toBe(true);  //check the click calls the function: itemClicked() in this file
        });
});
