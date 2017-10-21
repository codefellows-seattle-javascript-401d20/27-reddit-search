import React from 'react'
import ReactDOM from 'react-dom'
import superagent from 'superagent'

class SearchResultList extends React.Component {
  render(){
    let topics = this.props.topics
    return (
      <ul>
        {topics.map((result, i) =>
          <li key={i}>
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
      searchFormLimit: 0,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
    this.setState({searchFormBoard: '', searchFormLimit: 0})
  }

  handleChange(e){
    let {name, value, type} = e.target
    value = type === 'number' ? Number(value) : value
    console.log('value: ', value)
    console.log('typeof value: ', typeof value)
    console.log('this.state: ', this.state)
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
          placeholder='number (limit 0-100)'
          min='0'
          max='100'
          step='any'
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
