var React=require('react');

class Nav extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            navItems:  [{ title:'videos', url:'/video'}, {title:'images',url:'/images'}],
            selectedMenuItem: 'videos'
        };
    }
    navBarClick(event){
        this.setState({selectedMenuItem:event.currentTarget.title});
    }
    generateNavItem(item,index){
        var menuChange =   this.props.menuChange;
        return(
            <li className={(item.title==this.props.selectedMenuItem) ? "selected" : ""} key={index}><a onClick={e => menuChange(e)} title={item.title}>{item.title}</a></li>
        )
    }
    generateNavItems(){
        var self=this;
        var navItems=this.state.navItems.map(function(item, index){
            return(
                self.generateNavItem(item,index)
            );
        });
        return (
            navItems
        );
    }
    componentWillMount(){
        if(this.props.navItems!==null){
            setState({
               navItems: this.props.navItems
            });
        }
    }
    render(){
        return(
            <div id="topNav">
                <div className="col-sm-1 col-md-2" />
                <div className="navContainer col-sm-10 col-md-8 ">
                    <nav>
                        <ul>
                            {this.generateNavItems()}
                        </ul>
                    </nav>
                </div>
                <div className="col-sm-1 col-md-2" />
            </div>
        )
    }
};
module.exports=Nav;