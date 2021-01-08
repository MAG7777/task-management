import { render } from "@testing-library/react";
import React, { Component } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

export default class NewTask extends Component {
  state = {
    inputValue: "",
  };

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.sendValue();
    }
  };

  sendValue = () => {
    const { inputValue } = this.state;
    if (!inputValue) {
      return;
    }
    this.props.handleAddTask(inputValue);
    this.setState({
      inputValue: "",
    });
  };

  render() {
    return (
      <InputGroup className="my-3">
        <FormControl
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={this.state.inputValue}
          placeholder="Input task"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-primary" onClick={this.sendValue}>
            Add task
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}
