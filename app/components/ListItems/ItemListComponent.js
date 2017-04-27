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
            liked: this.props.liked,
            doOnClick: this.props.doOnClick,
            typeOfMedia: this.props.typeOfMedia,
            itemIsWatched: this.props.itemIsWatched,
            cssClassLike: this.props.cssClassLike,
            cssClassLink: this.props.cssClassLink
        };
    }
    likeChange(e){
        //todo refactor
        if(this.state.liked==true){
           this.setState({liked: false});
        }
        else{
            this.setState({liked: true});
        }
        //this.generateCssClass();
    }
    /*
    generateCssClass(){
        var cssClassLike=(this.state.liked) ? 'glyphicon glyphicon-heart liked' : 'glyphicon glyphicon-heart';//likes
        var cssClassLink=(this.state.itemIsWatched) ? ' watched' : '';//watched

        this.setState({
            cssClassLike: cssClassLike,
            cssClassLink: cssClassLink
        });

        console.log('_________________________________________');
        console.log('      **** ItemListComponent.js ****');
        console.log('cssClassLike: '+cssClassLike);
        console.log('cssClassLink: '+cssClassLink);
        console.log('_________________________________________');
    }
    */
    /*
    cssClassData(){
        var likeStandard='';
        var likeIsLiked='glyphicon glyphicon-heart liked';
    }
    */
    componentWillMount(){
        //this.generateCssClass();

    }
    componentWillRender(){

    }
    componentWillUpdate(){
        //this.generateCssClass()
        this.setState({
            liked: this.props.liked,
            doOnClick: this.props.doOnClick,
            typeOfMedia: this.props.typeOfMedia,
            itemIsWatched: this.props.itemIsWatched
        })
    }
    render(){
        //todo try => onclick={()=>{ f1(); f2() }}
        return(
            <li key={this.state.componentIndex}>
                <div className={(this.state.liked) ? 'glyphicon glyphicon-heart liked' : 'glyphicon glyphicon-heart'} id={"like_"+this.state.numItemsRendered} onClick={ (e)=> this.likeChange(e) } key={'like_'+this.state.componentIndex} />
                <a
                    href="#"
                    className={(this.props.itemIsWatched) ? 'watched' : ''}
                    id={'item_'+this.state.numItemsRendered}
                    onClick={this.state.doOnClick}
                    data-src={this.state.itemComponentData.src}
                    key={"link_"+this.state.componentIndex}
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