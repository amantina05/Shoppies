import React, {Component} from 'react'
import Search from './search'
import axios from 'axios'

export default class nominations extends Component {
  constructor() {
    super()
    this.state = {
      keyword: '',
      movies: [],
      nominees: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleSubmit(event) {
    event.preventDefault()
    // console.log(this.state);
    const res = await axios.post('/api/newNoms', this.state)
    console.log(res.data)
    this.props.nominate(res.data)
    this.setState({
      keyword: '',
      movies: [],
      nominees: []
    })
  }
  render() {
    return (
      <div className="container3">
        <h3>Nominations</h3>
        <br />
        <br />
      </div>
    )
  }
}
