import './style/main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import superagent from 'superagent'

const apiURL = 'https://www.reddit.com/r/programming.json'


class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>Reddit Reader</h1>
      </header>
    )
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topic: 'programming',
      limit: 0,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let { name, value, type } = e.target
    value = type === 'number' ? Number(value) : value
    this.setState({ [name]: value })
  }


  handleSubmit(e) {
    e.preventDefault()
    let { topic, limit } = this.state
    superagent.get(`https://www.reddit.com/r/${topic}.json?limit=${limit}`)
      .then(res => {
        if (res.body) {
          let result = res.body.data.children.map(post => post.data)
          this.props.onComplete(result)

        }
      })
      .catch(console.error)
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='topic'
          value={this.state.topic}
          onChange={this.handleChange}
          placeholder='Search Topic'
        />

        <input
          type='number'
          name='limit'
          value={this.state.limit}
          onChange={this.handleChange}
          placeholder='Limit'
        />

        <button type='submit'>Search</button>
      </form>
    )
  }
}

class SearchResultList extends React.Component {
  render() {
    console.log(this.props.boardList)

    return (

      <ul>
        {this.props.boardList.map((post, i) => {
          console.log('post', post)
          return <li> lul </li>
        })}
      </ul>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boardList: [],
    }

    this.handleComplete = this.handleComplete.bind(this)
  }

  handleComplete(boardList) {
    this.setState({ boardList })
  }

  render() {
    return (
      <div>
        <Header />
        <SearchForm onComplete={this.handleComplete} />
        <SearchResultList boardList={this.state.boardList} />
      </div>
    )
  }
}

let container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<App />, container)