import React, { Component } from 'react'
import ColorForm from './ColorForm'
import PaletteComponent from './PaletteComponent'

export default class GeneratorCompoment extends Component {
    state = {
        mainColor: '#e6ac0c',
    }
    
    updateData = (value) =>{
        this.setState({ mainColor: value});
    }

    render() {
        return (
            <div className="generator_contents wrapper">
                <div className="inputs">
                    <ColorForm updateData={this.updateData}/>
                </div>
                <div className="palettes">
                    <PaletteComponent mainColor={this.state.mainColor}/>
                    <PaletteComponent mainColor={this.state.mainColor}/>
                    <PaletteComponent mainColor={this.state.mainColor}/>
                </div>
            </div>
        )
    }
}
