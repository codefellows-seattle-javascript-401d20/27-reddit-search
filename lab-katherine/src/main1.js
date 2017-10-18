import React from 'react'
import ReactDOM from 'react-dom'
import superagent from 'superagent'

// class App should contain all of the application state
// should contain methods for modifying the application state
// the state should have a topics array for holding the results of the search
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      content: []
    }
  }

  componentDidMount(){
    console.log('will mount')
    // make superagent request to reddit
    superagent.get(`http://reddit.com/r/programming.json?limit=100`)
    .then(res => {
      console.log({res})
      if(res.body.results)
        this.setState({ content: res.body.results })
    })
    .catch(console.error)
  }

  componentDidUpdate(){
    console.log('__STATE__', this.state)
  }

  render(){
    console.log('render')
    return(
      <div>
        <header>
          <h1> Reddit Search </h1>
          <ul>
            {this.state.content.map((content, i) =>
              <li key={i}>
                {content.topic}
              </li>
            )}
          </ul>
        </header>
      </div>
    )
  }
}

// class SearchForm should contain a text input for the user to supply a reddit board to look up
// should contain a number input for the user to limit the number of results to return
// the number must be less than 0 and greater than 100
// onSubmit the form should make a request to reddit
// it should make a get request to http://reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}
// on success it should pass the results to the application state
// on failure it should add a class to the form called error and turn the form's inputs borders red


// create reference to a dom node on the body
// to mount the app
let container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<App />, container)
