/*
 ********************************************************************************
 Functions common to two or more components

 CommonFunctions.js
 ********************************************************************************
 */
var React=require('react');

class CommonFunctions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemSrc: this.props.itemSrc,
            allItemData: this.props.allItemData,
            typeOfCall: this.props.typeOfCall
        };
    }

    isThisItemLiked() {
        itemSrc=this.props.itemSrc;
        //todo refactor repeat of item in ListItems.js "isThisItemLiked()"
        if (itemSrc === null) {
            return false;
        }
        return (
            (allItemData[itemPosition(itemSrc, allItemData)].itemIsLiked) ? true : false
        );
    }

    itemPosition(itemSrc, allItemData) {
        //todo refactor repeat of item in ListItems.js "itemPosition()"
        var thisItemPosition;
        var currentPosition = allItemData.map(function (item, index) {
            (item.src == itemSrc) ? thisItemPosition = index : null;
        });
        return thisItemPosition;
    }

    aardvark() {
        return 'aardvark';
    }

    render(){
        return (
            hi
        );
    }
}

module.exports=CommonFunctions;