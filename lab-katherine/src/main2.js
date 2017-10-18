import React from 'react'
import ReactDOM from 'react-dom'
import superagent from 'superagent'

class PokemonNameChange extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.pokemon.name || ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({name: e.target.value})

  }

  handleSubmit(e){
    e.preventDefault()
    this.props.changePokemonName(this.props.pokemon.name, this.state.name)
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} >
        <input
          type='text'
          name='pokemonName'
          value={this.state.name}
          onChange={this.handleChange}
          />
        <button type='submit'> update name </button>
      </form>
    )
  }
}

class PokemonItem extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    if(!this.props.pokemon.imageURL){
      superagent.get(this.props.pokemon.url)
      .then(res  => {
        console.log('res', res)
        this.props.updatePokemon({
          ...this.props.pokemon,
          imageURL: res.body.sprites.front_default,
          height: res.body.height,
        })
      })
    }
  }

  render(){
    let {pokemon} = this.props
    return (
       <li onClick={this.handleClick}>
         <p> {pokemon.name} </p>
         {pokemon.imageURL ? <img src={pokemon.imageURL} />: undefined }
         {pokemon.height ? <p> height {pokemon.height} </p> : undefined }
        <PokemonNameChange
          pokemon={pokemon}
          changePokemonName={this.props.changePokemonName}
          />

       </li>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pokemon: []
    }

    this.updatePokemon = this.updatePokemon.bind(this)
    this.changePokemonName = this.changePokemonName.bind(this)
  }

  changePokemonName(pastName, futureName){
    this.setState(prevState => {
      return {
        pokemon: prevState.pokemon.map(item => {
          return item.name === pastName ? {...item, name: futureName} : item
        })
      }
    })
  }

  updatePokemon(pokemon){
    this.setState(prevState => {
      return {
        pokemon: prevState.pokemon.map(item => {
          return item.name === pokemon.name ? pokemon : item
        })
      }
    })
  }

  componentDidMount(){
    console.log('will mount')
    // make superagent request to the pokeapi
    superagent.get('https://pokeapi.co/api/v2/pokemon/')
    .then(res => {
      if(res.body.results)
        this.setState({pokemon: res.body.results})
    })
    .catch(console.error)
  }

  componentDidUpdate(){
    console.log('__STATE__', this.state)
  }

  render(){
    console.log('render')
    return (
      <div>
        <h1> pokéslug </h1>
        <ul>
         {this.state.pokemon.map((pokemon, i) =>
           <PokemonItem
             pokemon={pokemon}
             changePokemonName={this.changePokemonName}
             updatePokemon={this.updatePokemon}
             key={i} />
         )}
        </ul>
      </div>
    )
  }
}

// create a refrence to a dom node on the body
// to mount the app
let container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<App />, container)

{"kind": "Listing", "data": {"modhash": "", "whitelist_status": "all_ads", "children": [{"kind": "t3", "data": {"domain": "daniel.haxx.se", "approved_at_utc": null, "banned_by": null, "media_embed": {}, "subreddit": "programming", "selftext_html": null, "selftext": "", "likes": null, "suggested_sort": null, "user_reports": [], "secure_media": null, "is_reddit_media_domain": false, "saved": false, "id": "76xvsv", "banned_at_utc": null, "view_count": null, "archived": false, "clicked": false, "report_reasons": null, "title": "cURL's author is awarded with the Polhemspriset award.", "num_crossposts": 0, "link_flair_text": null, "mod_reports": [], "can_mod_post": false, "is_crosspostable": false, "pinned": false, "score": 3183, "approved_by": null, "over_18": false, "hidden": false, "thumbnail": "", "subreddit_id": "t5_2fwo", "edited": false, "link_flair_css_class": null, "author_flair_css_class": null, "contest_mode": false, "gilded": 0, "downs": 0, "brand_safe": true, "secure_media_embed": {}, "removal_reason": null, "author_flair_text": null, "stickied": false, "can_gild": false, "is_self": false, "parent_whitelist_status": "all_ads", "name": "t3_76xvsv", "spoiler": false, "permalink": "/r/programming/comments/76xvsv/curls_author_is_awarded_with_the_polhemspriset/", "subreddit_type": "public", "locked": false, "hide_score": false, "created": 1508268084.0, "url": "https://daniel.haxx.se/blog/2017/10/16/polhemspriset-2017/", "whitelist_status": "all_ads", "quarantine": false, "author": "kpenchev93", "created_utc": 1508239284.0, "subreddit_name_prefixed": "r/programming", "ups": 3183, "media": null, "num_comments": 234, "visited": false, "num_reports": null, "is_video": false, "distinguished": null}},
