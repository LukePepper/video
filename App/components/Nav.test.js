import * as React from 'react';
import expect from 'expect';
import * as TestUtils from 'react-dom/test-utils';
import Nav from './Nav';

describe('App/components/Components/Nav', function(){
    var navItems = {};

    function menuChange(selectedTitle){
        console.log('-menuChange()-');
        return selectedTitle;
    }
    function setTypeOfMedia(selectedMedia){
        return selectedMedia;
    }

    const NavComponent = TestUtils.renderIntoDocument(
        <Nav
            menuChange={menuChange}
            setTypeOfMedia={setTypeOfMedia}
            selectedMenuItem={'videos'}
        />
    );
    it('ModalComponent rendered', ()=>{
        expect(NavComponent).toExist;
    });
    it('Nav Items', ()=>{
        navItems=NavComponent.state.navItems;//to be used later
        expect (NavComponent.state.navItems.length).toBeGreaterThan(0);//is there at least one nav item?
    });
    it('State Tests', ()=>{
        expect (NavComponent.state.navItems.length).toBeGreaterThan(0);//is there at least one nav item?
        expect( NavComponent.state.selectedMenuItem ).toBe(navItems[0].title);
    });
    it('Clickable Items Rendered Correctly', ()=>{
        //TODO
    });
    it('Clickable Items - On Click - ClassName set correctly', ()=>{
        //TODO
    });
    it('setTypeOfMedia', ()=>{
        let typeOfMedia = (navItems.length>0) ? navItems[1].title : navItems[0].title;//if possible select a new menu item
        let returnedData = NavComponent.setTypeOfMedia(typeOfMedia);
        expect(returnedData).toEqual(typeOfMedia);
    });

    it('navBarClick', ()=>{
        let currentSelectedItem=NavComponent.state.selectedMenuItem;
        let title = (navItems.length>0) ? navItems[1].title : navItems[0].title;//if possible select a new menu item
        let clickOnItem = NavComponent.navBarClick( { currentTarget:{title: title } } );
        expect(NavComponent.state.selectedMenuItem).toEqual(title);
    });
    it('generateNavItem', ()=>{
        //TODO
    });
    it('generateNavItems', ()=>{
        //TODO
    });
});
