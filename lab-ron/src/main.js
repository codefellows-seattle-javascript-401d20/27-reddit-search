import './style/main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import superagent from 'superagent'

const apiURL = 'https://www.reddit.com/r/programming.json'

let searchFormBoard = 'aww'
let searchFormLimit = 10

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>Reddit Reader</h1>
      </header>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redditBoard: [],
    }
  }

  componentDidMount() {
    console.log('will mount')
    superagent.get(`https://www.reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}`)
      // .send({'limit': 100})
      .then(res => {
        if (res.body)
          this.setState({ redditBoard: res.body.data.children.map(post => post.data) })
      })
      .catch(console.error)
  }

  componentDidUpdate() {

    // const { author, title, url } = this.state.redditBoard
    console.log('STATE: ', this.state.redditBoard)
    // console.log(author, title, url)
  }

  render() {
    return (
      <div>
        <Header />
        <ul>
          {this.state.redditBoard.map((post, i) => {
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
      </div>
    )
  }
}

let container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<App />, container)