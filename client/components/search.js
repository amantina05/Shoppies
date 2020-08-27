import React, {Component} from 'react'

export default class search extends Component {
  constructor() {
    super()
    this.state = {
      keyword: '',
      movies: [],
      nominees: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.findMovie = this.findMovie.bind(this)
    this.renderMovies = this.renderMovies.bind(this)
    this.clickNominate = this.clickNominate.bind(this)
    this.removeNominate = this.removeNominate.bind(this)
  }
  handleChange = event =>
    this.setState({[event.target.name]: event.target.value})
  // console.log(event.target.value)

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
  // .then(this.clickNominate)
  // console.log(this.state.keyword)

  renderMovies = response => this.setState({movies: response.Search})
  // console.log(movies)
  // console.log(response.Search)

  clickNominate = movie => {
    // console.log('added')
    // console.log(this.state.movies)
    const test = [...this.state.nominees, movie]
    this.setState({nominees: test})
  }

  removeNominate = imdbID => {
    // event.preventDefault()
    console.log(imdbID)
    console.log('removed')
    const curr = this.state.nominees.filter(
      nominee => nominee.imdbID !== imdbID
    )
    this.setState({
      nominees: curr
    })
    // console.log(this.state.nominees)
  }

  render() {
    return (
      <div>
        <div className="container1">
          <form onSubmit={this.handleSubmit}>
            {/* <form> */}
            <h4>Movie title</h4>
            {/* <label htmlFor="filter"></label> */}
            <input
              className="search-bar"
              type="text"
              name="keyword"
              placeholder="Search"
              value={this.state.keyword}
              onChange={this.handleChange}
            />
            <button onClick={this.findMovie} type="button">
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
                <button onClick={() => this.clickNominate(movie)} type="button">
                  Nominate
                </button>
              </li>
            ))}
          </ul>
        </div>
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
