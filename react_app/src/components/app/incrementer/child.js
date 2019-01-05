import React from "react";

class Child extends React.Component {
    render() {
        return (
            <div>
                <span> The Number is {this.props.count >5 ? 'greater than 5' : 'less than 5'}</span>
            </div>
        )
    }
}

export default Child;