import './style/main.scss';

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      board: 'programming',
      limit: 10,
      topics: []
    }

    this.handleBoard = this.handleBoard.bind(this);
    this.handleLimit = this.handleLimit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBoard(e) {
    let {value} = e.target;
    this.setState(() => {
      return {
        board: value
       };
    });
  }

  handleLimit(e) {
    let {value} = e.target;
    this.setState(() => {
      return {
        limit: value
       };
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    superagent.get(`https://reddit.com/r/${this.state.board}.json?limit=${this.state.limit}`)
    .then(res => {
      if(res.body.results)
        this.setState({ topics: res.body.results });
    })
    .catch(console.error);
  }

  componentDidUpdate(){
    console.log('__STATE__', this.state)
  }

  render(){
    return (
      <SearchForm
        board={this.state.board}
        limit={this.state.limit}
        handleBoard={this.handleBoard}
        handleLimit={this.handleLimit}
        handleSubmit={this.handleSubmit}
      />
    )
  }

}

class SearchForm extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input
          type="text"
          value={this.props.board}
          onChange={this.props.handleBoard}
        />
        <br />
        <input
          type="number"
          value={this.props.limit}
          onChange={this.props.handleLimit}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

let container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(<App />, container)
