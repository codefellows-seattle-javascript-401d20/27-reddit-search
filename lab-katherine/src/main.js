import React from 'react'
import ReactDOM from 'react-dom'
import superagent from 'superagent'

class Header extends React.Component {
  render() {
    return (
        <div>
          <header>
            <h1> Reddit Search </h1>
          </header>
        </div>
      )
  }
}

// class App should contain all of the application state
// should contain methods for modifying the application state
// the state should have a topics array for holding the results of the search
class App extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      topics: [],
    }
    this.handleTopics = this.topics.bind(this)
  }

  componentDidUpdate(){
    console.log('__STATE__', this.state)
  }

  handleTopics(topics){
    this.setState(
      {topics: topics}
    )
  }

    render(){
      return(
        <div>
          <Header />
          <SearchForm />
          <SearchResultList />
          <ul>
           {this.state.topics.map((topics, i) =>
             <TopicsItem
               topics={topics}
               changeTopicName={this.changeTopicName}
               updateTopics={this.updateTopic}
               key={i} />
           )}
          </ul>
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

// class SearchResultList should inherit all search results through props
// This component does not need to have its own state!
// If there are topics in the application state it should display the unordered list
// Each list item in the unordered list should contain the following
  // an anchor tag with a href to the topic.url
    // inside the anchor a heading tag with the topic.title
    // inside the anchor a p tag with the number of topic.ups

// create reference to a dom node on the body
// to mount the app
let container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<App />, container)
