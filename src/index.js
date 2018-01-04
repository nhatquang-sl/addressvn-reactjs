import React from "react";
import ReactDOM from "react-dom";

require('jquery');
require('../node_modules/bootstrap/dist/js/bootstrap');
require('../node_modules/bootstrap/dist/css/bootstrap.css');
require('../scss/app.scss');
import App from './components/app/app';

ReactDOM.render((
  <App />
), document.getElementById('root'))