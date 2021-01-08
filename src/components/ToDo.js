import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";
import idGenerator from "../helpers/idGenerator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default class ToDo extends Component {
  state = {
    inputValue: "",
    tasks: [],
  };

  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleAddTaskClick = () => {
    // const { inputValue, tasks } = this.state;
    //wrong way, state must be immutable
    // tasks.push(inputValue)
    // this.setState({
    //   tasks
    // });

    // first way
    // this.setState({
    //     tasks:[...tasks, inputValue]
    // })

    //second way
    const { inputValue } = this.state;
    if (!inputValue) {
      return;
    }
    const tasks = [...this.state.tasks];
    //or
    // const tasks = this.state.tasks.slice()
    //or
    // const tasks = [].concat(this.state.tasks)
    const newTasks = {
      id: idGenerator(),
      text: inputValue,
    };
    tasks.unshift(newTasks);
    this.setState({
      tasks,
      inputValue: "",
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleAddTaskClick();
    }
  };

  handleDeleteTask = (taskId) => {
    return () => {
      const newTasks = this.state.tasks.filter((task) => task.id !== taskId);
      this.setState({
        tasks: newTasks,
      });
    };
  };

  //optimization handledelatetask
//   handleDeleteTask = (taskId) => () => {
//     const newTasks = this.state.tasks.filter((task) => task.id !== taskId);
//     this.setState({
//       tasks: newTasks,
//     });
//   };

  render() {
    let showTask = this.state.tasks.map((task) => {
      return (
        <Col key={task.id}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <InputGroup.Prepend>
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup.Prepend>
              <Card.Text>{task.text}</Card.Text>
              <Button variant="danger" onClick={this.handleDeleteTask(task.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return (
      <Container fluid>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <InputGroup className="my-3">
              <FormControl
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                value={this.state.inputValue}
                placeholder="Input task"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button
                  variant="outline-primary"
                  onClick={this.handleAddTaskClick}
                >
                  Add task
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row>{showTask}</Row>
      </Container>
    );
  }
}
