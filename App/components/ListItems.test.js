import * as React from 'react';
import expect from 'expect';
import * as TestUtils from 'react-dom/test-utils';
import Common from 'test/common.js';
var commonData = new Common;
const hostName = commonData.testServerUrl(window.location.hostname);
import ListItems from './ListItems';
import mediaJSON from './ListItems/Media.json';

function isModalOpen(ListItemsComponent, testItemData){
    try{
        let modalObj = TestUtils.findRenderedDOMComponentWithClass(
            ListItemsComponent,
            'modalStyle'
        );

        if(modalObj.getAttribute('id') == 'modal'){
          return true;
        }
        else{
          return false;
        }
    }
    catch(e){
        //the modal does not exist - return false
        return false;
    }

}

describe('App/components/Components/ListItems', function(){
        const testItemData=mediaJSON.videos[2];
        var itemPosition=0;
        const ListItemsComponent = TestUtils.renderIntoDocument(
            <ListItems typeOfMedia="videos" />
        );
        const allItemData=ListItemsComponent.state.allItemData;//TODO move after test

        it('ListItemsComponent rendered', ()=>{
            expect(ListItemsComponent).toExist;
        });
        it('Check state data', ()=>{
            expect(ListItemsComponent.state.typeOfMedia).toEqual('videos');
            expect(ListItemsComponent.state.isModalOpen).toEqual(false);
            expect(ListItemsComponent.state.currentItem).toEqual(null);
            expect(ListItemsComponent.state.mediaData).toEqual(mediaJSON);
            expect(ListItemsComponent.state.videoAutoPlay).toEqual(true);
            expect(ListItemsComponent.state.itemPath).toEqual('../videos/');
        });
        it('itemPosition', ()=>{
          let thisItemPosition;
          let currentPosition=allItemData.map((item,index)=>{
              (item.src == testItemData.src) ? thisItemPosition=index : null;
          });
          let returneditemPosition =   ListItemsComponent.itemPosition(testItemData.src);
          expect(thisItemPosition).toBe(returneditemPosition);

          itemPosition = thisItemPosition;//to be used in other tests
        });
        it('setItemToLiked', ()=>{
          ListItemsComponent.setItemToLiked(testItemData.src);
          expect(ListItemsComponent.state.allItemData[itemPosition].itemIsLiked).toBe(true);
        });
        it('unsetItemToLiked', ()=>{
          ListItemsComponent.unsetItemToLiked(testItemData.src);
          expect(ListItemsComponent.state.allItemData[itemPosition].itemIsLiked).toBe(false);
        });
        it('itemLikeClicked', ()=>{
          //check like state
          ListItemsComponent.itemLikeClicked(testItemData.src);
          expect(ListItemsComponent.state.itemLiked).toBe(testItemData.src);
          //check like state is reset
          ListItemsComponent.itemLikeClicked(testItemData.src);
          expect(ListItemsComponent.state.itemLiked).toBe('');
        });
        it('addToWatchedItems', ()=>{
          ListItemsComponent.addToWatchedItems(testItemData.src);
          expect(ListItemsComponent.state.allItemData[itemPosition].watched).toBe(true);
        });
        it('isThisItemWatched', ()=>{
          let returnedValue = ListItemsComponent.isThisItemWatched(testItemData.src);
          expect(returnedValue).toBe(true);
        });
        it('totalItems', ()=>{
          let totalItems = allItemData.length;
          expect( ListItemsComponent.totalItems() ).toBe(totalItems);
        });
        it('Modal -> Open', ()=>{
          //TODO refactor using function and promise
          ListItemsComponent.state.ModalControls.playItem(testItemData.src);
          let modalObj = TestUtils.findRenderedDOMComponentWithClass(
              ListItemsComponent,
              'modalStyle'
          );
          expect(modalObj.getAttribute('id')).toBe('modal');
        });
        it('Modal -> Close', ()=>{
          //TODO refactor using function and promise
          let testPassed=false;
          ListItemsComponent.state.ModalControls.closeModal();
          try{
            let modalObj = TestUtils.findRenderedDOMComponentWithClass(
                ListItemsComponent,
                'modalStyle'
            );
          }
          catch(e){
            //we are expecting the modal to not exist as an error is a good thing
            testPassed=true;
          }
          expect(testPassed).toBe(true);
        });

        it('buildItemsStateTable', ()=>{
          /*
            //TODO
            let watchedValue = ListItemsComponent.isThisItemWatched(testItemData.src);
            expect(watchedValue).toBe(true);
console.log(watchedValue);
            ListItemsComponent.buildItemsStateTable();
console.log(watchedValue);
            watchedValue = ListItemsComponent.isThisItemWatched(testItemData.src);
console.log(ListItemsComponent.state.allItemData[itemPosition]);
console.log('itemPosition: '+itemPosition);
            expect(watchedValue).toBe(false);
*/
        });

        it('itemClicked', ()=>{
            ListItemsComponent.state.allItemData[itemPosition].watched=false;//reset the watched state
            ListItemsComponent.itemClicked(testItemData.src);
            expect(ListItemsComponent.state.itemClicked).toBe(testItemData.src);

            //check the modal is open
            //TODO refactor using function and promise
            let modalObj = TestUtils.findRenderedDOMComponentWithClass(
                ListItemsComponent,
                'modalStyle'
            );
            expect(modalObj.getAttribute('id')).toBe('modal');

            //check the modal function for stuff - i.e. updating the watched state of the clicked item
            expect(ListItemsComponent.state.currentItem).toBe(testItemData.src);
        });
});
