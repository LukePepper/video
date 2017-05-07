import * as React from 'react';
import expect from 'expect';
import * as TestUtils from 'react-dom/test-utils';
import Modal from './Modal';

describe('App/components/Components/Modal', function(){
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
    //check className of like buttons
    // console.log('item.refs.modalLikeButton: ');
    // console.log(item.refs.modalLikeButton);
    // expect(item.refs.modalLikeButton.className).toEqual('glyphicon glyphicon-heart' + (testDataItem.itemIsLiked == true) ? ' liked' : '' );
    it('ListItemsComponent rendered', ()=>{
        expect(ListItemsComponent).toExist;
    });
});
