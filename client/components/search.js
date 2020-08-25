import React, {Component} from 'react'

export default class search extends Component {
  render() {
    return (
      <div className="container">
        <h1> The Shoppies</h1>
        <div className="container1">
          <form>
            <h4>Movie title</h4>
            {/* <label htmlFor="filter"></label> */}
            <input
              name="query"
              type="text"
              id="filter"
              placeholder="Search"
              className="search-bar"
            />
          </form>
          <br />
        </div>
        <div className="container2">
          <h3>Results for</h3>
          <br />
          <br />
          <br />
        </div>
        <div className="container3">
          <h3>Nominations</h3>
          <br />
          <br />
        </div>
      </div>
    )
  }
}
