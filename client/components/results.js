import React, {Component} from 'react'

export default class results extends Component {
  render() {
    return (
      <div className="container2">
        <h3>Results for</h3>
        <ul className="list">
          {this.state.movies.map(movie => (
            <li key={movie.id}>
              <p>
                {movie.Title} ({movie.Year})
              </p>
              <button onClick={this.nominate} type="button">
                Nominate
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
