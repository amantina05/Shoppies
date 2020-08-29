import React, {Component} from 'react'
import Search from './search'
import Results from './results'
import Nominations from './nominations'

export default class search extends Component {
  render() {
    return (
      <div className="container">
        <h1> The Shoppies</h1>
        <Search />
        {/* <Results />
        <Nominations /> */}
      </div>
    )
  }
}
