import React, {Component} from 'react'
import Search from './search'
import Results from './results'
import Nominations from './nominations'

export default class search extends Component {
  render() {
    return (
      <div className="container">
        <center>
          {/* <h1> The Shoppies</h1> */}
          <br />
        </center>
        <Search />
        {/* <Results /> */}
        {/* <Nominations /> */}
      </div>
    )
  }
}
