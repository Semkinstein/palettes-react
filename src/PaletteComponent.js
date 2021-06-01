import React, { Component } from 'react'
import ColorComponent from './ColorComponent'


export default class PaletteComponent extends Component {
    prevColor = '';
    constructor(props){
        super(props);
        this.state = {
            palette: createContrastPalette(this.props.mainColor)
        }
        this.prevColor = this.props.mainColor;
    }
    
    componentDidUpdate(){
      if(this.props.mainColor !== this.prevColor){
        this.setState({
        palette: createContrastPalette(this.props.mainColor)
        })
      }
      this.prevColor = this.props.mainColor;
    }

    render() {
      //const palette = createContrastPalette(this.props.mainColor);
      //this.setState({palette: palette});
      //const renderPalette = palette.map
        return (
            <div className="palette">
                { 
                  this.state.palette.map((value) => {
                  return <ColorComponent key={value} mainColor={value}/>
                  }) 
                }
            </div>
        )
    }
}


function createContrastPalette(primaryColor){
  let palette = [];
  let color = primaryColor;
  palette.push(color);
  
  color = hexToRGB(color);
  let hslColor = RGBToHSL(color.r, color.g, color.b);

  hslColor.h += 180;
  console.log(hslColor);
  let contrastColor = HSLToRGB(hslColor.h, hslColor.s, hslColor.l);
  palette.push( RGBToHex(contrastColor.r, contrastColor.g, contrastColor.b) );

  return palette;
}

// color shanenigans



function RGBToHex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

function hexToRGB(color) {

  if(color.substring(0,1) == '#') {
     color = color.substring(1);
   }

  let rgbColor = {};

  rgbColor.r = parseInt(color.substring(0,2),16);
  rgbColor.g = parseInt(color.substring(2,4),16);
  rgbColor.b = parseInt(color.substring(4),16);

  return rgbColor;
 }

function isDark(color){
    let sum = 0;

    for(let i=0; i<color.length; i++){
        sum += parseInt(color[i], 16);
    }

    if(sum/6 < 6) return true;
    return false;
}

function RGBToHSL(r, g, b) {
  r /= 255; 
  g /= 255; 
  b /= 255;

  let cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0)
  h = 0;
  // Red is max
  else if (cmax == r)
  h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
  h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  
// Make negative hues positive behind 360°
  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  let hslColor = {
    h: h,
    s: s,
    l: l
  }
  return hslColor;
}
  
 
function HSLToRGB(h,s,l) {
  if(h < 0)
    h += 360;
  if(h > 360)
    h -= 360;
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;  
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  let rgbColor = {
    r: r,
    g: g,
    b: b
  }

  return rgbColor;
}

