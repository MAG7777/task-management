import React, { Component } from "react";

export default class Input extends Component {
  state = {
    inputValue: "",
    showValue: "",
  };

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleAddClick = () => {
    const { inputValue } = this.state;

    this.setState({
      inputValue: " ",
      showValue: inputValue,
    });
  };

  render() {
    return (
      <>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
        />
        <button onClick={this.handleAddClick}>Add text</button>
        <p>{this.state.showValue}</p>
      </>
    );
  }
}
