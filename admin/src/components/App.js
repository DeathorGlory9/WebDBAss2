import React, { Component } from 'react';
import Header from './Header'
import Main from './Main'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
	<MuiThemeProvider>
  <div>
    <Header />
    <Main />
  </div>
  </MuiThemeProvider>
)


export default App
