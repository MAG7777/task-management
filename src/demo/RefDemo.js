import React, { Component, createRef } from "react";

export default class RefDemo extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      value: "",
    };
  }
  componentDidMount() {
    console.log("DID MOUNT", this.inputRef.current);
    this.inputRef.current.focus();
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  printInputValue1 = () => {
    console.log("INPUT VALUE SECOND===>>>", this.inputRef.current.value);
    this.inputRef.current.value = "";
  };

  printInputValue2 = () => {
    console.log("INPUT VALUE===>>>", this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <>
      {/* Input with ref */}
        <div>
          <input type="text" ref={this.inputRef} />
          <button onClick={this.printInputValue1}>Input 1</button>
        </div>


        <div>
          <input
            types="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button onClick={this.printInputValue2}>Input 2</button>
        </div>
      </>
    );
  }
}
