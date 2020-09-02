import React, {Component} from 'react'
import Nominations from './nominations'

export default class search extends Component {
  constructor() {
    super()
    this.state = {
      keyword: '',
      movies: [],
      nominees: [],
      disabledNominate: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.findMovie = this.findMovie.bind(this)
    this.renderMovies = this.renderMovies.bind(this)
    this.clickNominate = this.clickNominate.bind(this)
    this.removeNominate = this.removeNominate.bind(this)
    this.banner = this.banner.bind(this)
  }
  handleChange = event =>
    this.setState({[event.target.name]: event.target.value})

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      keyword: '',
      movies: [],
      nominees: []
    })
  }

  findMovie = () =>
    fetch(`http://www.omdbapi.com/?apikey=81340766&s=${this.state.keyword}`)
      .then(response => response.json())
      .then(this.renderMovies)

  renderMovies = response => this.setState({movies: response.Search})

  clickNominate = movie => {
    const test = [...this.state.nominees, movie]
    // this.setState({nominees: test})

    // //if movie has been added to nominations then disable
    // if (this.state.disabledNominate === false) {
    //   this.setState({nominees: test, disabledNominate: true})
    // } else {
    //   this.setState({nominees: test, disabledNominate: false})
    // }

    if (this.state.nominees.length >= 5) {
      // this.setState({nominees: test})
      this.banner()
    }
    this.setState({nominees: test})
  }

  removeNominate = imdbID => {
    // event.preventDefault()
    const curr = this.state.nominees.filter(
      nominee => nominee.imdbID !== imdbID
    )
    this.setState({
      nominees: curr
    })
  }

  banner = () => {
    alert('You have reached maximum amount of nominations.')
  }

  render() {
    return (
      <div>
        <div className="container1">
          <form onSubmit={this.handleSubmit}>
            <h4>Movie title</h4>
            <input
              className="search-bar"
              type="text"
              name="keyword"
              placeholder="Search"
              value={this.state.keyword}
              onChange={this.handleChange}
            />
            <button onClick={this.findMovie} type="submit" display="none">
              Search
            </button>
          </form>
          <br />
        </div>
        <div className="container2">
          <h3>Results for</h3>
          <ul className="list">
            {this.state.movies.map(movie => (
              <li key={movie.imdbID}>
                <p>
                  {movie.Title} ({movie.Year})
                </p>
                <img src={movie.Poster} height="50" width="40" />
                <button
                  value={null}
                  onClick={() => this.clickNominate(movie)}
                  disabled={this.state.disabledNominate}
                  type="button"
                >
                  Nominate
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>{/* <Nominations /> */}</div>
        <div className="container3">
          <h3>Nominations</h3>
          <ul className="list">
            {this.state.nominees.map(nominee => (
              <li key={nominee.imdbID}>
                <p>
                  {nominee.Title} ({nominee.Year})
                </p>
                <button
                  onClick={() => this.removeNominate(nominee.imdbID)}
                  type="button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
