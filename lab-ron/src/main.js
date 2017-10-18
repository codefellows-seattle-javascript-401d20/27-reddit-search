import './style/main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import superagent from 'superagent'

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
  render() {
    return (
      <div>
        <Header/>
      </div>
    )
  }
}

let container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<App />, container)