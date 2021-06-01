import React, { Component } from 'react'

export default class ColorComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            mainColor: this.props.mainColor,
        }
    }
    
    render() {
        const styles = {
            backgroundColor: this.state.mainColor
        }
        return (
            <div className="palette-color color" style={styles}> {this.state.mainColor} </div>
        )
    }
}
