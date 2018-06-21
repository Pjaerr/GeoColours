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
import request from "request";


class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state =
      {
        hasGeneratedPalette: false, firstColour: "#075372", secondColour: "#848784"
      };

    this.images = [];
    this.currentImage = 0;
    this.colourPalette = [];

    this.sendRedditRequest();
  }


  sendRedditRequest = () =>
  {
    request("https://www.reddit.com/r/EarthPorn/hot.json?&jsonp", (error, response, body) =>
    {
      if (error)
      {
        console.error(error);
        return;
      }

      body = JSON.parse(body);

      this.grabImagesFromReddit(body.data.children);

      this.generateGradient();
    });
  }

  grabImagesFromReddit = (posts) =>
  {
    for (let i = 0; i < posts.length; i++)
    {
      this.images.push(window.location.href + '?url=' + posts[i].data.preview.images[0].source.url);
    }
  }

  generateGradient = () =>
  {
    this.updateGradient(this.images[this.currentImage]);

    if (this.currentImage < this.images.length)
    {
      this.currentImage++;
    }
    else
    {
      this.currentImage = 0;
    }
  }

  updateGradient = (url) =>
  {
    getPixels(url, (err, pixels) =>
    {
      if (err)
      {
        console.error(err);
      }
      else
      {
        this.colourPalette = generatePalette(pixels.data, 5, 20);

        this.setState({ hasGeneratedPalette: true, firstColour: "rgb(" + this.colourPalette[0][0] + "," + this.colourPalette[0][1] + "," + this.colourPalette[0][2] + ")", secondColour: "rgb(" + this.colourPalette[4][0] + "," + this.colourPalette[4][1] + "," + this.colourPalette[4][2] + ")" });
      }
    });
  }

  copyGradientCode = () =>
  {
    let firstColour = this.state.firstColour;
    let secondColour = this.state.secondColour;

    let code = "background:" + firstColour + ";\n background: -webkit-linear-gradient(to bottom, " + firstColour + ", " + secondColour + "); \n background: linear-gradient(to bottom, " + firstColour + ", " + secondColour + "); ";

    console.log("Copied Code!");

    const textField = document.createElement('textarea');
    textField.innerText = code;
    const parentElement = document.getElementById("root");
    parentElement.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    parentElement.removeChild(textField);
  }

  renderColourPalette = () =>
  {
    if (this.state.hasGeneratedPalette)
    {
      return (
        <div className="palette-container">
          <div className="palette-container-colour" style={{ backgroundColor: "rgb(" + this.colourPalette[0][0] + "," + this.colourPalette[0][1] + "," + this.colourPalette[0][2] + ")" }}></div>
          <div className="palette-container-colour" style={{ backgroundColor: "rgb(" + this.colourPalette[1][0] + "," + this.colourPalette[1][1] + "," + this.colourPalette[1][2] + ")" }}></div>
          <div className="palette-container-colour" style={{ backgroundColor: "rgb(" + this.colourPalette[2][0] + "," + this.colourPalette[2][1] + "," + this.colourPalette[2][2] + ")" }}></div>
          <div className="palette-container-colour" style={{ backgroundColor: "rgb(" + this.colourPalette[3][0] + "," + this.colourPalette[3][1] + "," + this.colourPalette[3][2] + ")" }}></div>
          <div className="palette-container-colour" style={{ backgroundColor: "rgb(" + this.colourPalette[4][0] + "," + this.colourPalette[4][1] + "," + this.colourPalette[4][2] + ")" }}></div>
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
              <Button width="100px" height="40px" backgroundColour="#fff" onClick={this.copyGradientCode}>
                <img src={require("./icons/code.svg")} alt="Copy CSS Code Icon" />
                Copy CSS
              </Button>
            </div>
            <div className="button">
              <Button width="100px" height="40px" backgroundColour="#fff" onClick={this.generateGradient}>
                <img src={require("./icons/refresh-cw.svg")} alt="View Image Icon" />
                Generate
              </Button>
            </div>
          </div>
        </Card>

        {this.renderColourPalette()}
      </div>
    );
  }
}

export default App;
