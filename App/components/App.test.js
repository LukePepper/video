import * as React from 'react';
import expect from 'expect';
import * as TestUtils from 'react-dom/test-utils';//TODO refactor
import {renderIntoDocument} from 'react-dom/test-utils';//TODO refactor
import Common from 'test/common.js';
var commonData = new Common;
const hostName = commonData.testServerUrl(window.location.hostname);
import {testServerUrl} from 'test/common.js' //TODO refactor: do i need this?
import App from './App'

describe('App/components/Components/App', function(){
        var AppComponent = renderIntoDocument(
            <App/>
        );
        it('AppComponent rendered', ()=>{
            expect(App).toExist;
        });
        it('Check state data', ()=>{
            expect(AppComponent.state.typeOfMedia).toEqual('videos');
            expect(AppComponent.state.selectedMenuItem).toEqual('videos');
        });
        it('Menu change', ()=>{
            let title='TestTitle1';
            var clickOnItem = AppComponent.menuChange( { currentTarget:{title: title } } );
            expect(AppComponent.state.typeOfMedia).toEqual(title);
            expect(AppComponent.state.selectedMenuItem).toEqual(title);
        });
        it('Set typeOfMedia', ()=>{
          let title='TestTitle2';
          var clickOnItem = AppComponent.setTypeOfMedia( title );
          expect(AppComponent.state.typeOfMedia).toEqual(title);
          expect(AppComponent.state.selectedMenuItem).toEqual(title);
        });
});
