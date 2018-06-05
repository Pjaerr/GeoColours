// ! Entry point for all of the other components (either through another component or directly).

//Import React
import React, { Component } from 'react';

//Import SASS Files
import './App.scss';

const generatePalette = require('get-rgba-palette');
const getPixels = require('get-pixels');

class App extends Component
{
  constructor(props)
  {
    super(props);

    this.state = { hasGeneratedPalette: false };
    this.colourPalette = [];

    this.testFunc();
  }


  testFunc = () =>
  {
    getPixels('https://pbs.twimg.com/media/DRfqQX4VQAErefq.jpg:large', (err, pixels) =>
    {
      if (err)
      {
        console.log("Bad Image Path");

        this.setState({ hasGeneratedPalette: false });
      }
      else
      {
        this.colourPalette = generatePalette(pixels.data, 5, 1000);

        console.table(this.colourPalette);

        this.setState({ hasGeneratedPalette: true });
      }
    });
  }

  renderColourPalette = () =>
  {
    if (this.state.hasGeneratedPalette)
    {
      return (
        <div>
          <div style={{ height: "100px", backgroundColor: "rgb(" + this.colourPalette[0][0] + "," + this.colourPalette[0][1] + "," + this.colourPalette[0][2] + ")" }}></div>
          <div style={{ height: "100px", backgroundColor: "rgb(" + this.colourPalette[1][0] + "," + this.colourPalette[1][1] + "," + this.colourPalette[1][2] + ")" }}></div>
          <div style={{ height: "100px", backgroundColor: "rgb(" + this.colourPalette[2][0] + "," + this.colourPalette[2][1] + "," + this.colourPalette[2][2] + ")" }}></div>
          <div style={{ height: "100px", backgroundColor: "rgb(" + this.colourPalette[3][0] + "," + this.colourPalette[3][1] + "," + this.colourPalette[3][2] + ")" }}></div>
          <div style={{ height: "100px", backgroundColor: "rgb(" + this.colourPalette[4][0] + "," + this.colourPalette[4][1] + "," + this.colourPalette[4][2] + ")" }}></div>

        </div>
      );
    }
    else
    {
      return (
        <div> No colour palette has been generated</div>
      );
    }

  }


  render()
  {
    return (
      <div className="App">
        {this.renderColourPalette()}
      </div>
    );
  }
}

export default App;
