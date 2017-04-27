/*
 ********************************************************************************
     Creates the list item elements - i.e. click-able link: Like Icon, Title

     ItemListComponent.js
 ********************************************************************************
 */

var React=require('react');
var uuid=require('uuid');

class ItemListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentIndex: this.props.componentIndex,
            numItemsRendered: this.props.numItemsRendered,
            itemComponentData: this.props.itemComponentData,
            itemIsLiked: this.props.itemIsLiked,
            itemIsWatched: this.props.itemIsWatched,
            itemClicked: '',
            itemLiked: ''
        };
    }
    itemLikeClicked(e){
        var newLikeState = (this.state.itemIsLiked) ? false : true;
        this.setState(
            {
                itemIsLiked: newLikeState,
                itemLiked:  e.currentTarget.dataset.src
            },
            function(){
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
            function(){
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
module.exports=ItemListComponent;