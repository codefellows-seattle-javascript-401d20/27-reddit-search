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





class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redditArticles: [],
    }
  }

  componentDidMount() {
    console.log('will mount')
    superagent.get('https://www.reddit.com/r/programming.json')
      .then(res => {
        if (res.body.results)
          this.setState({redditArticles: res.body.results})
      })
      .catch(console.error)
  }

  componentDidUpdate(){
    console.log('STATE: ', this.state)
  }


  render() {
    return (
      <div>
        <Header />
      </div>
    )
  }
}

let container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<App />, container)