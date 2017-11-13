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
    this.state

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
    let topic = e.target.topic.value
    let limit = e.target.limit.value


    let { boardList } = this.props
    superagent.get(`https://www.reddit.com/r/${topic}.json?limit=${limit}`)
      .then(res => {
        if (res.body) {
          let result = res.body.data.children.map(post => post.data)
          this.setState({ boardList: result })
        }
      })
      .catch(console.error)
  }

  componentDidUpdate() {
    console.log('--> NEW STATE', this.state)
  }

  render() {
    // console.log('--PROPS:', this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='topic'
          placeholder='Search Topic'
        />

        <input
          type='number'
          name='limit'
          placeholder='Limit'
        />

        <button type='submit'>Search</button>
      </form>
    )
  }
}

class SearchResultList extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    console.log('topic:', this.props.boardList)
    return (
      <ul>
        {this.props.boardList.map((post, i) => {
          let { author, title, url, selftext_html } = post
          let image = post.preview.images[0].source.url
          return <li>
            {author}<br />
            <a href={url} target="_blank" >{title}</a>
            <p>{selftext_html}</p>
            <img src={image} />
          </li>
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
      // limit: 10,
      // topic: 'aww',
    }
    this.onComplete = this.onComplete.bind(this)
  }

  componentDidMount() {
    console.log('did mount')
  }

  componentWillMount() {
    console.log('will mount')
  }

  onComplete(boardList) {
    this.setState({ boardList })
  }

  render() {
    let { boardList, topic, limit } = this.state

    return (
      <div>

        <Header />
        <SearchForm
          // topic={topic}
          // limit={limit}
          onComplete={this.onComplete}
          boardList={boardList}
        />
        < SearchResultList
          boardList={boardList}
        />



        {/* <ul>
          {this.state.boardList.map((post, i) => {
            let { author, title, url, selftext_html } = post
            let image = post.preview.images[0].source.url
            return <li>
              {author}<br />
              <a href={url} target="_blank" >{title}</a>
              <p>{selftext_html}</p>
              <img src={image} />
            </li>
          })}
        </ul> */}
      </div>
    )
  }
}

let container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<App />, container)