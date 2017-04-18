var React=require('react');

var Videos= React.createClass({
    propTypes: {
        title:          React.PropTypes.string,
        src:            React.PropTypes.string,
        subSection:     React.PropTypes.bool,
        section:        React.PropTypes.string
    },

    render: function () {
        var title=this.props.title;
        var src=this.props.src;
        var subSection=this.props.subSection;
        var section=this.props.section;

        return (
            <div>
                <ul>
                    <li>{title}</li>
                    <li>{src}</li>
                    <li>{subSection}</li>
                    <li>{section}</li>
                </ul>
            </div>
        );
    }
});

module.exports=Videos;