'use strict'

import './style/main.scss'

import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

let searchFormBoard = 'magic'
let searchFormLimit = 4

class RedditItem extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <li>
        <p>READ: {this.props.redditBoard.data.title}</p>
        <p>Author: {this.props.redditBoard.data.author}</p>
        <p>{this.props.redditBoard.data.url}</p>
      </li>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redditBoard: [],
    }
  }

  componentWillMount() {
    superagent.get(`https://www.reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}`)
      .then(response => {
        this.setState({redditBoard: response.body.data.children})
        console.log({response})
      })
      .catch(console.error)
  }

  render() {
    return (
      <div>
        <h1>Reddit Search</h1>
        <ul>
          {this.state.redditBoard.map((redditBoard, i) =>
            <RedditItem redditBoard={redditBoard} key = {i} />
          )}
        </ul>
      </div>
    )
  }
}

let container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(<App />, container)
