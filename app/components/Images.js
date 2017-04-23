var React=require('react');

class Images extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedPhoto: 0
        };
    }
    render(){
        return (
            <div id="photosPlayerContainer">
                <div className="col-sm-1 col-md-2" />
                <div className="col-sm-10 col-md-8 section-container">
                    <h2>Images</h2>
                    <div className="choose-photo" >

                    </div>
                </div>
                <div className="col-sm-1 col-md-2" />
            </div>
        );
    }
}
module.exports=Images;