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
      topic: 'aww',
      limit: 5,
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
          console.log(post)
          let { url, title, ups, author } = post
          let image = post.preview ? post.preview.images[0].source.url : undefined
          console.log(image)
          return (
            <li key={i}>
              <h3>{title}</h3>
              <a href={url}>Click here</a>
              <p>
                {image ? <img src={image} /> : undefined}
              </p>
              <p>up votes: {ups}</p><p> u/{author}</p>
            </li>
          )
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




/*

Should inerrit all search results through props
This component does not need to have its own state!
If there are topics in the application state it should display the unordered list
Each list item in the unordered list should contain the following
  an anchor tag with a href to the topic.url
    inside the anchor a heading tag with the topic.title
    inside the anchor a p tag with the number of topic.ups
*/