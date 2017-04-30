import * as React from 'react';
import expect from 'expect';
import {renderIntoDocument} from 'react-addons-test-utils';
import deleteMe from '../App/components/deleteMe';


describe('/App/components/deleteMe', ()=> {
    it('should render', () => {
        const item = renderIntoDocument(
            <deleteMe />
        );
        //Assertion
        expect(item).toExist();
    });
});