'use strict'

import './style/main.scss'

import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'
import cors from 'cors'

let searchFormBoard = 'hot'
let searchFormLimit = 4

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redditBoard: [],
    }
  }

  componentWillMount() {
    console.log('will mount')
    superagent.get(`http://reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}`)
      .then(response => {
        console.log({response})
        let data = response
        if(data)
          this.setState({redditBoard: this.body.data})
      })
      .catch(console.error)
  }

  componenetDidUpdate() {
    console.log('__STATE__::', this.state)
  }

  render() {
    return (
      <div>
        <h1> Reddit Search </h1>
        <ul>
          {this.state.redditBoard.map((redditBoard, i) => {

          })}
        </ul>
      </div>
    )
  }
}

ReactDom.render(<App />, root)
