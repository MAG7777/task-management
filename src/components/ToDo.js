import React, { Component } from "react";
import { Container, Row, Col, InputGroup, Button, Card } from "react-bootstrap";
import idGenerator from "../helpers/idGenerator";
import NewTask from "./NewTask";
import Task from "./Task";

export default class ToDo extends Component {
  state = {
    inputValue: "",
    tasks: [],
  };

  handleAddTaskClick = (inputValue) => {
    const tasks = [...this.state.tasks];
    const newTasks = {
      id: idGenerator(),
      text: inputValue,
    };
    tasks.unshift(newTasks);
    this.setState({
      tasks,
      //   inputValue: "",
    });
  };

  //optimization handledelatetask
  handleDeleteTask = (taskId) => () => {
    const newTasks = this.state.tasks.filter((task) => task.id !== taskId);
    this.setState({
      tasks: newTasks,
    });
  };

  render() {
    let showTask = this.state.tasks.map((task) => {
      return (
        <Col key={task.id}>
          <Task data={task} onRemove={this.handleDeleteTask} />
        </Col>
      );
    });
    return (
      <Container fluid>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <NewTask handleAddTask={this.handleAddTaskClick} />
          </Col>
        </Row>
        <Row>{showTask}</Row>
      </Container>
    );
  }
}
