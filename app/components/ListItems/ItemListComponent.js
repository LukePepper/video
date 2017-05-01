/*
 ********************************************************************************
     Creates the list item elements - i.e. click-able link: Like Icon, Title

     ItemListComponent.js
 ********************************************************************************
 */

//var React=require('react');
//var PropTypes=require('prop-types');
//var uuid=require('uuid');
import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

export default class ItemListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numItemsRendered: this.props.numItemsRendered,
            itemComponentData: this.props.itemComponentData,
            itemIsLiked: this.props.itemIsLiked,
            itemIsWatched: this.props.itemIsWatched,
            itemClicked: '',
            itemLiked: ''
        };
    }
    itemLikeClicked(e){
        let newLikeState = (this.state.itemIsLiked) ? false : true;
        this.setState(
            {
                itemIsLiked: newLikeState,
                itemLiked:  e.currentTarget.dataset.src
            },
            ()=>{
                this.props.itemLikeClicked(this.state.itemLiked);
            }
        );
    }
    itemClicked(e){
        this.setState(
            {
                itemClicked: e.currentTarget.dataset.src,
                itemIsWatched: 'watched'
            },
            ()=>{
                this.props.itemClicked(this.state.itemClicked);
            }
        );
    }
    render(){
        return(
            <li key={uuid.v4()}>
                <div
                    className={(this.state.itemIsLiked) ? 'glyphicon glyphicon-heart liked' : 'glyphicon glyphicon-heart'}
                    id={"like_"+this.state.numItemsRendered}
                    onClick={this.itemLikeClicked.bind(this)}
                    key={uuid.v4()}
                    data-src={this.state.itemComponentData.src}
                />
                <a
                    href="#"
                    className={(this.state.itemIsWatched) ? 'watched' : ''}
                    id={'item_'+this.state.numItemsRendered}
                    onClick={this.itemClicked.bind(this)}
                    data-src={this.state.itemComponentData.src}
                    key={uuid.v4()}
                    style={{ backgroundImage: 'url('+ this.props.itemPath + this.state.itemComponentData.src_thumbnail + ' )' } }
                >
                    <div className="linkText">
                        {this.state.itemComponentData.title}
                    </div>
                </a>
            </li>
        );
    }
}
//module.exports=ItemListComponent;

ItemListComponent.propTypes={
        componentIndex: PropTypes.number,
        numItemsRendered:  PropTypes.number,
        itemComponentData:  PropTypes.object,
        itemIsLiked: PropTypes.bool,
        itemIsWatched: PropTypes.bool,
        itemLikeClicked: PropTypes.func,
        ItemClicked: PropTypes.func,
        itemPath: PropTypes.string
}
