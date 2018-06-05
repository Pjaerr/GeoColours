// ! Entry point for all of the other components (either through another component or directly).

//Import React
import React, { Component } from 'react';

//Import SASS Files
import './App.scss';

class App extends Component
{
  render()
  {
    return (
      <div className="App">
        Hello World!
      </div>
    );
  }
}

export default App;
