import React from 'react'
import ReactDOM from 'react-dom'
import superagent from 'superagent'

class SearchResultList extends React.Component {
  render(){
    let topics = this.props.topics
    return (
      <ul>
        {topics.map(result =>
          <li>
            <p> {result.title} </p>
            <p> up votes: {result.ups} </p>
            <a href={result.url}> click me </a>
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
      searchFormBoard: '',
      searchFormLimit: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
  }

  handleChange(e){
    let {name, value} = e.target
    this.setState({[name]: value})
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='searchFormBoard'
          placeholder='topic'
          value={this.state.searchFormBoard}
          onChange={this.handleChange}
          />
        <input
          type='number'
          name='searchFormLimit'
          placeholder='number to view'
          value={this.state.searchFormLimit}
          onChange={this.handleChange}
          />
        <button type='submit'> search </button>
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

    this.searchReddit = this.searchReddit.bind(this)
  }

  searchReddit(searchFormBoard, searchFormLimit){
    return superagent.get(`https://www.reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}`)
    .then(res => {
      let {children} = res.body.data
      let topics = children.map(child => child.data)
      return this.setState({topics})
    })
    .catch(console.error)
  }

  componentWillMount(){
    this.searchReddit('puppies', 5)
  }

  componentDidUpdate(){
    console.log('__STATE__', this.state)
  }

  render(){
    return (
      <main >
        <h1> reddit search </h1>
        <SearchForm onComplete={this.searchReddit} />
        <SearchResultList topics={this.state.topics} />
      </main>
    )
  }
}

let container = document.createElement('div')
document.body.append(container)
ReactDOM.render(<App />, container)
