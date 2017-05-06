import * as React from 'react';
import expect from 'expect';
import * as TestUtils from 'react-dom/test-utils';//TODO refactor
import {renderIntoDocument} from 'react-dom/test-utils';//TODO refactor
import Common from 'test/common.js';
var commonData = new Common;
const hostName = commonData.testServerUrl(window.location.hostname);
import {testServerUrl} from 'test/common.js'; //TODO refactor: do i need this?
import ListItems from './ListItems';

describe('App/components/Components/ListItems', function(){
        var ListItems = renderIntoDocument(
            <ListItems typeOfMedia="videos" />
        );
        it('AppComponent rendered', ()=>{
            expect(ListItems).toExist;
        });
        it('Check state data', ()=>{
            // expect(AppComponent.state.typeOfMedia).toEqual('videos');
            // expect(AppComponent.state.selectedMenuItem).toEqual('videos');
        });
        it('Menu change', ()=>{
            // let title='TestTitle1';
            // var clickOnItem = AppComponent.menuChange( { currentTarget:{title: title } } );
            // expect(AppComponent.state.typeOfMedia).toEqual(title);
            // expect(AppComponent.state.selectedMenuItem).toEqual(title);
        });
        it('Set typeOfMedia', ()=>{
          // let title='TestTitle2';
          // var clickOnItem = AppComponent.setTypeOfMedia( title );
          // expect(AppComponent.state.typeOfMedia).toEqual(title);
          // expect(AppComponent.state.selectedMenuItem).toEqual(title);
        });
});
