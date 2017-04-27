/*
 ********************************************************************************
     Creates the list item elements - i.e. click-able link: Like Icon, Title

     ItemListComponent.js
 ********************************************************************************
 */

var React=require('react');

class ItemListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentIndex: this.props.componentIndex,
            numItemsRendered: this.props.numItemsRendered,
            itemComponentData: this.props.itemComponentData,
            itemIsLiked: this.props.itemIsLiked,
            doOnClick: this.props.doOnClick,
            typeOfMedia: this.props.typeOfMedia,
            itemIsWatched: this.props.itemIsWatched,
            cssClassLike: this.props.cssClassLike,
            cssClassLink: this.props.cssClassLink,
            itemClicked: '',
            itemLikedClicked: '',
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
    componentWillMount(){
    }
    componentWillRender(){
    }
    componentWillUpdate(){
    }
    render(){
        return(
            <li key={this.state.componentIndex}>

                <a
                    href="#"
                    className={(this.state.itemIsWatched) ? 'watched' : ''}
                    id={'item_'+this.state.numItemsRendered}
                    onClick={this.itemClicked.bind(this)}
                    data-src={this.state.itemComponentData.src}
                    key={"link_"+this.state.componentIndex}
                    style={{ backgroundImage: 'url('+ this.props.itemPath + this.state.itemComponentData.src_thumbnail + ' )' } }
                >
                    <div className="linkText">
                        {this.state.itemComponentData.title}
                    </div>
                </a>

                <div>
                    <div
                        className={(this.state.itemIsLiked) ? 'glyphicon glyphicon-heart liked' : 'glyphicon glyphicon-heart'}
                        id={"like_"+this.state.numItemsRendered}
                        onClick={this.itemLikeClicked.bind(this)}
                        key={'like_'+this.state.componentIndex}
                        data-src={this.state.itemComponentData.src}
                    />
                </div>

            </li>
        );
    }
}
module.exports=ItemListComponent;