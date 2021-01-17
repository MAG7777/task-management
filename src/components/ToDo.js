import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NewTask from "./NewTask/NewTask";
import Task from "./Task/Task";
import Confirm from "./Confirm";
import EditTaskModal from "./EditTaskModal";

export default class ToDo extends Component {
  state = {
    tasks: [],
    checkedTasks: new Set(),
    showConfirm: false,
    showNewTaskModal: false,
    editTask: null,
  };

  componentDidMount() {
    fetch("http://localhost:3001/task", {
      method: "GET",
      headers: {
        "Content-TYpe": "application/json",
      },
    })
      .then((response) => response.json())
      .then((tasks) => {
        if (tasks.error) {
          throw tasks.error;
        }
        this.setState({
          tasks,
        });
      })
      .catch((err) => console.log("err", err));
  }

  handleAddTaskClick = (data) => {
    fetch("http://localhost:3001/task", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((task) => {
        if (task.error) {
          throw task.error;
        }
        this.setState({
          tasks: [task, ...this.state.tasks],
          showNewTaskModal: false,
        });
      })
      .catch((err) => console.log("err", err));
  };

  //optimization handledelatetask
  handleDeleteTask = (taskId) => () => {
    fetch(`http://localhost:3001/task/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        const newTasks = this.state.tasks.filter((task) => task._id !== taskId);
        this.setState({
          tasks: newTasks,
        });
      })
      .catch((err) => console.log("err", err));
  };

  handleCheck = (taskId) => () => {
    const checkedTasks = new Set(this.state.checkedTasks);
    if (checkedTasks.has(taskId)) {
      checkedTasks.delete(taskId);
    } else {
      checkedTasks.add(taskId);
    }

    this.setState({
      checkedTasks,
    });
  };

  handleEdit = (task) => () => {
    this.setState({
      editTask: task,
    });
  };

  onRemoveSelected = () => {
    const checkedTasks = new Set(this.state.checkedTasks);

    fetch(`http://localhost:3001/task/`, {
      method: "PATCH",
      body: JSON.stringify({
        tasks: [...checkedTasks],
      }),

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        let tasks = [...this.state.tasks];

        checkedTasks.forEach((taskId) => {
          tasks = tasks.filter((task) => task._id !== taskId);
        });

        checkedTasks.clear();

        this.setState({
          tasks,
          checkedTasks,
          showConfirm: false,
        });
      })
      .catch((err) => console.log("err", err));
  };

  toggleConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    });
  };

  toggleNewTaskModal = () => {
    this.setState({
      showNewTaskModal: !this.state.showNewTaskModal,
    });
  };

  handleSave = (taskId, data) => {
    fetch(`http://localhost:3001/task/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((editedTask) => {
        if (editedTask.error) {
          throw editedTask.error;
        }
        const tasks = [...this.state.tasks];
        const foundIndex = tasks.findIndex((task) => task._id === editedTask._id
        );
        tasks[foundIndex] = editedTask;

        this.setState({
          tasks,
          editTask: null,
        });
      })
      .catch((err) => console.log("err", err));
  };

  render() {
    const {
      checkedTasks,
      tasks,
      showConfirm,
      editTask,
      showNewTaskModal,
    } = this.state;
    const showTask = tasks.map((task) => {
      return (
        <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2} >
          <Task
            data={task}
            onRemove={this.handleDeleteTask}
            onCheck={this.handleCheck(task._id)}
            onEdit={this.handleEdit(task)}
            disabled={!!checkedTasks.size}
          />
        </Col>
      );
    });
    return (
      <Container fluid>
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="text-center">
            <Button
              className="m-3"
              variant="primary"
              disabled={checkedTasks.size}
              onClick={this.toggleNewTaskModal}
            >
              Add new task
            </Button>
          </Col>
        </Row>
        <Row>{showTask}</Row>
        <Row className="justify-content-center">
          <Button
            variant="danger"
            disabled={!checkedTasks.size}
            onClick={this.toggleConfirm}
          >
            Remove selected
          </Button>
        </Row>
        {showConfirm && (
          <Confirm
            count={checkedTasks.size}
            onSubmit={this.onRemoveSelected}
            onCancel={this.toggleConfirm}
          />
        )}
        {!!editTask && (
          <EditTaskModal
            value={editTask}
            data={editTask}
            onSave={this.handleSave}
            onCancel={this.handleEdit(null)}
          />
        )}
        {showNewTaskModal && (
          <NewTask
            onAdd={this.handleAddTaskClick}
            onCancel={this.toggleNewTaskModal}
          />
        )}
      </Container>
    );
  }
}
