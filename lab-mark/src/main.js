'use strict'

import './style/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import superagent from 'superagent'

class SearchResultList extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <ul>
       {this.props.topics.map((topic, i) =>
         <li key={i}>
            <a href={topic.data.url}>{topic.data.title}
              <p>ups:{topic.data.ups}</p>
            </a>
          </li>
       )}
      </ul>
    )
  }
}

class SearchForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      reqError: false,
      limitError: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    let searchFormBoard = e.target.board.value;
    let searchFormLimit = e.target.limit.value;

    // If no limit provided, search for max (100)
    if (!searchFormLimit)
      searchFormLimit = 100;

    if (searchFormLimit < 0 || searchFormLimit > 100)
      return this.setState({limitError: true})

    console.log('Board', searchFormBoard);
    console.log('Limit', searchFormLimit);
    superagent.get(`https://www.reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}`)
    .then(res  => {
      this.setState({limitError: false, reqError: false})
      this.props.updateTopics(res.body.data.children)
    })
    .catch(err => this.setState({reqError: true}))
  }

  render(){
    let {reqError} = this.state
    let {limitError} = this.state
    return (
        <form onSubmit={this.handleSubmit}>
          Reddit Board: <input type='text' name='board' className={reqError ? 'error' : 'noError'} /> <br />
          Limit: <input type='number' name='limit' className={limitError ? 'error' : 'noError'} /> <br />
          <button type='submit'>Search</button>
        </form>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      topics: [],
    }

    this.updateTopics = this.updateTopics.bind(this)
  }

  updateTopics(topics){
    this.setState({topics: topics})
  }

  componentDidUpdate(){
    console.log('__STATE__', this.state)
  }

  render(){
    return (
      <div>
        <h1> Reddit Board Search </h1>

        <SearchForm
        topics={this.state.topics}
        updateTopics={this.updateTopics}
        />

        <SearchResultList
          topics={this.state.topics}
        />

      </div>
    )
  }
}

let container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<App />, container)
