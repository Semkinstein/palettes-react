import React, { Component } from "react";
import ColorForm from "./ColorForm";
import PaletteComponent from "./PaletteComponent";

export default class GeneratorCompoment extends Component {
  state = {
    mainColor: "#e6ac0c",
  };

  updateData = (value) => {
    this.setState({ mainColor: value });
  };

  createContrastPalette(primaryColor) {
    let palette = [];
    let color = primaryColor;
    palette.push(color);

    color = hexToRGB(color);
    let hslColor = RGBToHSL(color.r, color.g, color.b);

    hslColor.l *= 1.5;
    let lightColor = HSLToRGB(hslColor.h, hslColor.s, hslColor.l);
    palette.push(RGBToHex(lightColor.r, lightColor.g, lightColor.b));

    hslColor.h += 180;
    let contrastColor = HSLToRGB(hslColor.h, hslColor.s, hslColor.l);
    palette.push(RGBToHex(contrastColor.r, contrastColor.g, contrastColor.b));

    hslColor.l /= 1.5;
    contrastColor = HSLToRGB(hslColor.h, hslColor.s, hslColor.l);
    palette.push(RGBToHex(contrastColor.r, contrastColor.g, contrastColor.b));

    return palette;
  }

  createTriadePalette(primaryColor) {
    let palette = [];
    let color = primaryColor;
    palette.push(color);

    color = hexToRGB(color);
    let hslColor = RGBToHSL(color.r, color.g, color.b);

    hslColor.h += 120;
    let nextColor = HSLToRGB(hslColor.h, hslColor.s, hslColor.l);
    palette.push(RGBToHex(nextColor.r, nextColor.g, nextColor.b));

    hslColor.h += 120;
    nextColor = HSLToRGB(hslColor.h, hslColor.s, hslColor.l);
    palette.push(RGBToHex(nextColor.r, nextColor.g, nextColor.b));

    return palette;
  }

  createTetradePalette(primaryColor) {
    let palette = [];
    let color = primaryColor;
    palette.push(color);

    color = hexToRGB(color);
    let hslColor = RGBToHSL(color.r, color.g, color.b);

    for (let degrees = 0; degrees < 3; degrees++) {
      hslColor.h += 90;
      let nextColor = HSLToRGB(hslColor.h, hslColor.s, hslColor.l);
      palette.push(RGBToHex(nextColor.r, nextColor.g, nextColor.b));
    }

    return palette;
  }

  createLightenPalette(primaryColor) {
    let palette = [];
    let color = primaryColor;
    palette.push(color);

    color = hexToRGB(color);
    let hslColor = RGBToHSL(color.r, color.g, color.b);

    let part = (100 - hslColor.l) / 5;
    do {
      hslColor.l += part;
      //hslColor.s *= 1.1;
      let nextColor = HSLToRGB(hslColor.h, hslColor.s, hslColor.l);
      palette.push(RGBToHex(nextColor.r, nextColor.g, nextColor.b));
    } while (hslColor.l < 100);
    palette.pop();
    return palette;
  }

  createDarkenPalette(primaryColor) {
    let palette = [];
    let color = primaryColor;
    palette.push(color);

    color = hexToRGB(color);
    let hslColor = RGBToHSL(color.r, color.g, color.b);

    let part = hslColor.l / 5;
    do {
      hslColor.l -= part;
      //hslColor.s /= 1.1;
      let nextColor = HSLToRGB(hslColor.h, hslColor.s, hslColor.l);
      palette.push(RGBToHex(nextColor.r, nextColor.g, nextColor.b));
    } while (hslColor.l > 1);
    //palette.pop();
    return palette;
  }

  render() {
    return (
      <div className="generator_contents wrapper">
        <div className="inputs">
          <ColorForm updateData={this.updateData} />
        </div>
        <div className="palettes">
          <PaletteComponent
            mainColor={this.state.mainColor}
            generator={this.createContrastPalette}
          />
          <PaletteComponent
            mainColor={this.state.mainColor}
            generator={this.createTriadePalette}
          />
          <PaletteComponent
            mainColor={this.state.mainColor}
            generator={this.createTetradePalette}
          />
          <PaletteComponent
            mainColor={this.state.mainColor}
            generator={this.createLightenPalette}
          />
          <PaletteComponent
            mainColor={this.state.mainColor}
            generator={this.createDarkenPalette}
          />
        </div>
      </div>
    );
  }
}

// color shanenigans

function RGBToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

function hexToRGB(color) {
  if (color.substring(0, 1) == "#") {
    color = color.substring(1);
  }

  let rgbColor = {};

  rgbColor.r = parseInt(color.substring(0, 2), 16);
  rgbColor.g = parseInt(color.substring(2, 4), 16);
  rgbColor.b = parseInt(color.substring(4), 16);

  return rgbColor;
}

function isDark(color) {
  let sum = 0;

  for (let i = 0; i < color.length; i++) {
    sum += parseInt(color[i], 16);
  }

  if (sum / 6 < 6) return true;
  return false;
}

function RGBToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  let hslColor = {
    h: h,
    s: s,
    l: l,
  };
  return hslColor;
}

function HSLToRGB(h, s, l) {
  if (h < 0) h += 360;
  if (h > 360) h -= 360;
  if (s > 100) s = 100;
  if (s < 0) s = 0;
  if (l > 100) l = 100;
  if (l < 0) l = 0;
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  let rgbColor = {
    r: r,
    g: g,
    b: b,
  };

  return rgbColor;
}
