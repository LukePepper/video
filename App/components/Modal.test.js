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
                //TODO
        console.log('-setState()');
    }
    function openModal(){
                //TODO
        console.log('-openModal()');
    }
    function closeModalTest(){
        //TODO
        console.log('- closeModalTest() -');
        return true;
    }
    function addToWatchedItems(){
                //TODO
        console.log(' - addToWatchedItems() - ');
    }
    const ModalComponent = TestUtils.renderIntoDocument(
        <Modal
            isOpen={false}
            onClose={ () => this.closeModalTest() }
        />
    );

        // ModalComponent.ModalControls.likeItemButton(this.state.currentItem)
        // ModalComponent.ModalControls.renderSkipButton('prev')}
        // ModalComponent.ModalControls.renderSkipButton('next')}
        //

    it('ModalComponent rendered', ()=>{
        expect(ModalComponent).toExist;
    });
    it('Open Modal', ()=>{
        //TODO
        // console.log('before: ');
        // console.log(ModalComponent.state);
        // console.log(this.state.isModalOpen);


        // ModalComponent.openModal();
        //this.state.isModalOpen=true;//simulate ModalComponent.openModal();

        // console.log('after: ');
        // console.log(ModalComponent.state);
        // console.log(this.state.isModalOpen);
        //
        // expect(this.state.isModalOpen).toBe(true);
    });
    it('Close Modal', ()=>{
        //TODO
    });
    it('Play Item', ()=>{
                //TODO
        // let src=commonData.itemComponentData().src;
        // ModalComponent.playItem( { currentTarget:{src: src } }, this ).bind(this);
    });
    it('RenderSkip Button - > Next', ()=>{
        //TODO
    });
    it('RenderSkip Button - < Prev', ()=>{
        //TODO
    });
    it('Skip Item - > Next', ()=>{
        //TODO
    });
    it('Skip Item - < Prev', ()=>{
        //TODO
    });
    it('Render Like Item button', ()=>{
                //TODO
        //check className of like buttons
        // console.log('item.refs.modalLikeButton: ');
        // console.log(item.refs.modalLikeButton);
        // expect(item.refs.modalLikeButton.className).toEqual('glyphicon glyphicon-heart' + (testDataItem.itemIsLiked == true) ? ' liked' : '' );
    });
    it('Like Item button -> Click', ()=>{
                //TODO
        //check className of like buttons
        // console.log('item.refs.modalLikeButton: ');
        // console.log(item.refs.modalLikeButton);
        // expect(item.refs.modalLikeButton.className).toEqual('glyphicon glyphicon-heart' + (testDataItem.itemIsLiked == true) ? ' liked' : '' );
    });
    it('Like Item button -> ClassName', ()=>{
        //check className of like buttons
        // console.log('item.refs.modalLikeButton: ');
        // console.log(item.refs.modalLikeButton);
        // expect(item.refs.modalLikeButton.className).toEqual('glyphicon glyphicon-heart' + (testDataItem.itemIsLiked == true) ? ' liked' : '' );
    });

});
