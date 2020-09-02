import React, {Component} from 'react'
import Search from './search'
import axios from 'axios'

export default class nominations extends Component {
  render() {
    return (
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
    )
  }
}
