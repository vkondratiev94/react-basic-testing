import React, { Component } from 'react'
import './App.css'

export default class App extends Component {
  state = {
    count: 0,
    hasError: false
  }

  handleIncrement = () => {
    this.setState(({ count }) => ({
      count: count + 1,
      hasError: false
    }))
  }

  handleDecrement = () => {
    if (this.state.count > 0) {
      return this.setState(({ count }) => ({
        count: count - 1,
        hasError: false
      }))
    }
    this.setState({ hasError: true })
  }

  render() {
    const { count, hasError } = this.state
    const errorClass = hasError ? '' : 'hidden'
    return (
      <div data-test='component-app'>
        <h1 data-test='counter-display'>The counter is currently {count}</h1>
        <button
          data-test='increment-button'
          onClick={this.handleIncrement}
        >Increment</button>
        <button
          data-test='decrement-button'
          onClick={this.handleDecrement}
        >Decrement</button>
        <p
          data-test='error-display'
          className={`error ${errorClass}`}
        >Counter can't go below zero</p>
      </div>
    )
  }
}
