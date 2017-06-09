import * as React from 'react';
import expect from 'expect';
import * as TestUtils from 'react-dom/test-utils';
import Common from 'test/common.js';
var commonData = new Common;
import Modal from './Modal';

describe('App/components/Components/Modal', function(){
    const testSrc='movie.'
    this.state = {
        isModalOpen: false,
        ModalControls: new Modal({self: this}),
        unitTest: true
    }
    function setState(){
    }
    function openModal(){
    }
    function closeModalTest(){
        return true;
    }
    function addToWatchedItems(){
    }
    const ModalComponent = TestUtils.renderIntoDocument(
        <Modal
            isOpen={false}
            onClose={ () => this.closeModalTest() }
            self={ setState() }
            setState = { () => setState() }
        />
    );
    it('ModalComponent rendered', ()=>{
        expect(ModalComponent).toExist;
    });
    it('Open Modal', ()=>{
        this.state.isModalOpen = ModalComponent.openModal();
        expect(this.state.isModalOpen).toBe(true);
        //functionality also tested in ListItemsTest.js
    });
    it('Close Modal', ()=>{
        this.state.isModalOpen = ModalComponent.closeModal();
        expect(this.state.isModalOpen).toBe(false);
        //functionality tested in ListItemsTest.js -> Modal -> Close
    });
});
