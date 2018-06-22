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
        toastEnabled: false, hasGeneratedGradient: true, hasGeneratedPalette: false, firstColour: "#075372", secondColour: "#848784"
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
      this.images.push(posts[i].data);
    }
  }

  generateGradient = () =>
  {
    if (this.state.hasGeneratedGradient)
    {
      this.setState({ hasGeneratedGradient: false, hasGeneratedPalette: false });

      this.updateGradient(window.location.href + '?url=' + this.images[this.currentImage].thumbnail);

      if (this.currentImage < this.images.length - 1)
      {
        this.currentImage++;
      }
      else
      {
        this.currentImage = 0;
      }
    }
  }

  updateGradient = (url) =>
  {

    getPixels(url, (err, pixels) =>
    {
      if (err)
      {
        console.error(err);
        this.generateGradient();
      }
      else
      {
        this.colourPalette = generatePalette(pixels.data, 5, 20);

        this.setState({ viewingImage: false, hasGeneratedGradient: true, hasGeneratedPalette: true, firstColour: "rgb(" + this.colourPalette[0][0] + "," + this.colourPalette[0][1] + "," + this.colourPalette[0][2] + ")", secondColour: "rgb(" + this.colourPalette[4][0] + "," + this.colourPalette[4][1] + "," + this.colourPalette[4][2] + ")" });
      }
    });
  }

  copyGradientCode = () =>
  {
    this.viewImage();

    let firstColour = this.state.firstColour;
    let secondColour = this.state.secondColour;

    let code = "background:" + firstColour + ";\n background: -webkit-linear-gradient(to bottom, " + firstColour + ", " + secondColour + "); \n background: linear-gradient(to bottom, " + firstColour + ", " + secondColour + "); ";

    const textField = document.createElement('textarea');
    textField.innerText = code;
    const parentElement = document.getElementById("root");
    parentElement.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    parentElement.removeChild(textField);

    if (!this.state.toastEnabled)
    {
      this.setState({ toastEnabled: true });

      setTimeout(() => { this.setState({ toastEnabled: false }); }, 6000);
    }
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

  renderLoadingAnim = () =>
  {
    if (!this.state.hasGeneratedGradient)
    {
      return (
        <div id="loading-anim">
          <img src={require("./icons/refresh-cw.svg")} alt="Loading" />
        </div>
      );
    }
  }

  viewImage = () =>
  {
    this.setState({ viewingImage: true });
  }

  renderImage = () =>
  {
    console.table(this.images[this.currentImage]);
    return (


      <div>
      </div>

    );
  }


  render()
  {
    return (
      <div id="App" style={{ backgroundColor: "#2C3A47" }}>
        <h1 id="title"> GeoColours </h1>

        <Card>
          {
            this.state.viewingImage ?
              this.state.hasGeneratedGradient ?
                <Gradient firstColour={this.state.firstColour} secondColour={this.state.secondColour} /> :
                this.renderLoadingAnim() :
              this.renderImage()
          }
          <div id="buttons">
            <div className="button">
              <Button width="100px" height="40px" backgroundColour="#fff" onClick={this.copyGradientCode}>
                <img src={require("./icons/code.svg")} alt="Copy CSS Code" />
                Copy CSS
              </Button>
            </div>
            <div className="button">
              <Button width="100px" height="40px" backgroundColour="#fff" onClick={this.generateGradient}>
                <img src={require("./icons/refresh-cw.svg")} alt="Generate New Gradient" />
                Generate
              </Button>
            </div>
          </div>
        </Card>

        {this.renderColourPalette()}

        <div id="toast" style={{ display: this.state.toastEnabled ? "block" : "none" }}>
          CSS Copied 👌
        </div>
      </div>
    );
  }
}

export default App;
