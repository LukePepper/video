import * as React from 'react';
import expect from 'expect';
import {renderIntoDocument} from 'react-dom/test-utils';
import ItemPlayer from '../App/components/ListItems/ItemPlayer';

//var fetchMock = require('fetch-mock');


describe('App/components/ListItems/ItemPlayer', ()=>{
    it('should render with LIKED video ', (done)=>{
        const item = renderIntoDocument(
                <ItemPlayer typeOfMedia="videos" src="videos/drum_pick-up.mp4" itemIsLiked={true} autoPlay={true} />
        );
        expect(item).toExist();
        expect(item.state.typeOfMedia).toEqual('videos');
        expect(item.state.liked).toEqual(true);
        expect(item.state.autoPlay).toEqual(true);

        //check video with id="itemPlayer"
            //src
            //autoplay

        //check prev / next buttons

        //check like class is set correctly


        done();

    });
    it('should render with UNLIKED video ', (done)=>{
        const item = renderIntoDocument(
            <ItemPlayer typeOfMedia="videos" src="videos/drum_pick-up.mp4" itemIsLiked={false} autoPlay={true} />
        );
        expect(item).toExist();
        expect(item.state.typeOfMedia).toEqual('videos');
        expect(item.state.liked).toEqual(false);
        expect(item.state.autoPlay).toEqual(true);

        //check video with id="itemPlayer"
        //src
        //autoplay

        //check prev / next buttons

        //check like class is set correctly


        done();

    });
});

