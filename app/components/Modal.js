/*
********************************************************************************
    Modal - displayed on item list onCLick - displays images or videos
********************************************************************************
*/
var React=require('react');

class ModalItemList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,

        }
    }
    closeModal() {
        this.setState({ isModalOpen: false });
    }
    render() {

        if (this.props.isOpen === false){
            return null
        }

        return (
            <div>
                <div className="modalStyle">
                    {this.props.children}
                    <div className="glyphicon glyphicon-remove" aria-hidden="true" id="closeModal" onClick={e => this.close(e)}></div>
                </div>
                <div className="backdrop" onClick={e => this.close(e)} />
            </div>
        )
    }

    close(e) {
        e.preventDefault()

        if (this.props.onClose) {
            this.props.onClose()
        }
        else{
        }
    }
}
module.exports=ModalItemList;