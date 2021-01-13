import React, { Component } from 'react'
import GlobalFonts from './fonts/fonts';
import Root from './containers/Root'


export class App extends Component {
  render() {
    return (
        <Root>
          <GlobalFonts />
        </Root>
    ) 
  }
}

export default App
