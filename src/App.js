// ! Entry point for all of the other components (either through another component or directly).

//Import React
import React from 'react';

//Import SASS Files
import './App.scss';

//Import Components
import Card from './components/Card.js';
import Gradient from './components/Gradient.js';
import Button from './components/Button.js';

import generatePalette from 'get-rgba-palette';
import getPixels from 'get-pixels';

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state =
      {
        hasGeneratedPalette: false, firstColour: "#075372", secondColour: "#848784"
      };

    this.colourPalette = [];

    this.getColours("https://pbs.twimg.com/media/DfNpaMWW0AES_qg.jpg:large");
  }

  getColours = (url) =>
  {
    getPixels(url, (err, pixels) =>
    {
      if (err)
      {
        console.error("Bad Image Path");
      }
      else
      {
        this.colourPalette = generatePalette(pixels.data, 5, 20);

        this.setState({ hasGeneratedPalette: true, firstColour: "rgb(" + this.colourPalette[0][0] + "," + this.colourPalette[0][1] + "," + this.colourPalette[0][2] + ")", secondColour: "rgb(" + this.colourPalette[4][0] + "," + this.colourPalette[4][1] + "," + this.colourPalette[4][2] + ")" });
      }
    });
  }


  renderColourPalette = () =>
  {
    if (this.state.hasGeneratedPalette)
    {
      return (
        <div>
          <div style={{ height: "100px", backgroundColor: "rgb(" + this.colourPalette[0][0] + "," + this.colourPalette[0][1] + "," + this.colourPalette[0][2] + ")" }}>.</div>
          <div style={{ height: "100px", backgroundColor: "rgb(" + this.colourPalette[1][0] + "," + this.colourPalette[1][1] + "," + this.colourPalette[1][2] + ")" }}>.</div>
          <div style={{ height: "100px", backgroundColor: "rgb(" + this.colourPalette[2][0] + "," + this.colourPalette[2][1] + "," + this.colourPalette[2][2] + ")" }}>.</div>
          <div style={{ height: "100px", backgroundColor: "rgb(" + this.colourPalette[3][0] + "," + this.colourPalette[3][1] + "," + this.colourPalette[3][2] + ")" }}>.</div>
          <div style={{ height: "100px", backgroundColor: "rgb(" + this.colourPalette[4][0] + "," + this.colourPalette[4][1] + "," + this.colourPalette[4][2] + ")" }}>.</div>
        </div>
      );
    }
  }

  render()
  {
    return (
      <div id="App" style={{ backgroundColor: "#2C3A47" }}>
        <h1 id="title"> GeoColours </h1>

        <Card>
          <Gradient firstColour={this.state.firstColour} secondColour={this.state.secondColour} />
          <div id="Buttons">
            <div className="button">
              <Button width="100px" height="40px" backgroundColour="#fff" onClick={() => console.log("Button Clicked!")}>
                <img src={require("./icons/code.svg")} alt="Copy CSS Code Icon" />
                Copy CSS
              </Button>
            </div>
            <div className="button">
              <Button width="100px" height="40px" backgroundColour="#fff" onClick={() => console.log("Button Clicked!")}>
                <img src={require("./icons/image.svg")} alt="View Image Icon" />
                View Image
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default App;
