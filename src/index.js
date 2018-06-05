// ! Application Entry Point [index.js]

//Import React
import React from 'react';
import ReactDOM from 'react-dom';

//Import App component (What all of the other components go through)
import App from './App';

//Import default Create-React-App service worker for use in production.
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
