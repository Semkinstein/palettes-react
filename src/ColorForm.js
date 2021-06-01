import React, { Component } from 'react'

export default class ColorForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '#e6ac0c',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        
        this.props.updateData(this.state.value);
        event.preventDefault();
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="submit" value="GET PALETTES!"></input>
                <input type="color" className="primary-color" value={this.state.value} onChange={this.handleChange}></input>
            </form>
        )
    }
}
