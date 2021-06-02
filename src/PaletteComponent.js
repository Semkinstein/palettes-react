import React, { Component } from 'react'
import ColorComponent from './ColorComponent'


export default class PaletteComponent extends Component {
    prevColor = '';

    constructor(props){
        super(props);
        this.state = {
            palette: props.generator(this.props.mainColor)
        }
        this.prevColor = this.props.mainColor;
    }
    
    componentDidUpdate(){
      if(this.props.mainColor !== this.prevColor){
        this.setState({
        palette: this.props.generator(this.props.mainColor)
        })
      }
      this.prevColor = this.props.mainColor;
    }

    render() {
        return (
            <div className="palette">
                { 
                  this.state.palette.map((value, index) => {
                  return <ColorComponent key={value + index} mainColor={value}/>
                  }) 
                }
            </div>
        )
    }
}



