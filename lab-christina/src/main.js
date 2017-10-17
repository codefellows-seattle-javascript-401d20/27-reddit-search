'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //topics array rom result of the search
    }
    //bind my methods of my Component
  }

  handleChange(e){
    this.setState({result: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.nextSearchResult(this.props.redditSearch.result, this.state.result)
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} >
        <input
          type='text'
          name='searchResults'
          value={this.state.result}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}
