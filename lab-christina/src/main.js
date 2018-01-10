'use strict'

import './style/main.scss'

import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

let searchFormBoard = 'magic'
let searchFormLimit = 4

class searchForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {searchValue: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.value)
  }
}

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
        <form onSubmit={this.handleSubmit}>
          <label>
        Search:
          </label>
          <input type='text' value={this.state.value}
            onChange={this.handleChange} />
          <input type='submit' value='submit' />
        </form>
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
