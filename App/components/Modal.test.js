import * as React from 'react';
import expect from 'expect';
import * as TestUtils from 'react-dom/test-utils';
import Modal from './Modal';

describe('App/components/Components/Modal', function(){
    this.state = {
        isModalOpen: false,
        ModalControls: new Modal({self: this})
    }
    function closeModalTest(){
        //TODO
        console.log('- closeModalTest() -');
        return true;
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
        // console.log(ModalComponent.state);
        // console.log(this.state.isModalOpen);
        // ModalComponent.openModal().bind(this);
        // expect(ModalComponent.state.isModalOpen).toBe(true);
    });
    it('Close Modal', ()=>{
        //TODO
    });
    it('Play Item', ()=>{

    });
    it('RenderSkip Button - > Next', ()=>{

    });
    it('RenderSkip Button - < Prev', ()=>{

    });
    it('Skip Item - > Next', ()=>{

    });
    it('Skip Item - < Prev', ()=>{

    });
    it('Render Like Item button', ()=>{
        //check className of like buttons
        // console.log('item.refs.modalLikeButton: ');
        // console.log(item.refs.modalLikeButton);
        // expect(item.refs.modalLikeButton.className).toEqual('glyphicon glyphicon-heart' + (testDataItem.itemIsLiked == true) ? ' liked' : '' );
    });
    it('Like Item button -> Click', ()=>{
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
