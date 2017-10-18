'use strict'

import './style/main.scss'

import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'
import cors from 'cors'

class App extends React.Component {
  componentWillMount() {
    console.log('will mount')
    superagent.get(`http://reddit.com/r/${'hot'}.json?limit=${4}`)
      .then(response => {
        console.log(response)
      })
  }
  render() {
    return (
      <div>
        <h1> Reddit Search </h1>
      </div>
    )
  }
}

ReactDom.render(<App />, root)
