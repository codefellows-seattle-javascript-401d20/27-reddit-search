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
    superagent.get(`http://www.reddit.com/r/${this.state.board}.json?limit=${this.state.limit}`)
    .then(res => {
      if(res.body.data) {
        console.log(res.body.data)
        let {children} = res.body.data;
        let searchResults = children.map(child => child.data);
        this.setState({ topics: searchResults });
      }
    })
    .catch(console.error);
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state)
  }

  render() {
    return (
      <div>
        <SearchForm
          board={this.state.board}
          limit={this.state.limit}
          handleBoard={this.handleBoard}
          handleLimit={this.handleLimit}
          handleSubmit={this.handleSubmit}
        />
        <SearchResultsList topics={this.state.topics} />
      </div>
    )
  }

}

class SearchForm extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
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

class SearchResultsList extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <ul>
        {this.props.topics.map((topic, i) =>
          <li key={i}>
            <a href={topic.url}>
              <heading> {topic.title} </heading>
              <p> {topic.ups} </p>
            </a>
          </li>
        )}
      </ul>
    )
  }
}

let container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(<App />, container)
