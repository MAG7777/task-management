import React, { Component } from "react";
import Spinner from "../../Spinner/Spinner";
import EditTaskModal from "../../EditTaskModal";
import { Button, OverlayTrigger, Tooltip, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./singleTask.module.css";

export default class SingleTask extends Component {
  state = {
    task: null,
    isEdit: false,
  };
  componentDidMount() {
    const taskId = this.props.match.params.id;
    fetch(`http://localhost:3001/task/${taskId}`, {
      method: "GET",
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
          task,
        });
      })
      .catch((err) => console.log("err", err));
  }

  handleRemove = () => {
    const taskId = this.state.task._id;
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
        this.props.history.push("/");
      })
      .catch((err) => console.log("err", err));
  };

  toggleEditModal = () => {
    this.setState({ isEdit: !this.state.isEdit });
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
      .then((data) => {
        if (data.error) {
          throw data.error;
        }

        this.setState({
          task: data,
          isEdit: false,
        });
      })
      .catch((err) => console.log("err", err));
  };

  render() {
    const { task, isEdit } = this.state;
    return (
      <>
        {task ? (
          <div>
            <div className={styles.taskCardContainer}>
              <Card className="bg-dark text-white">
                <Card.Header as="h5">Title:{task.title}</Card.Header>
                <Card.Body>
                  <Card.Title>Description:{task.description}</Card.Title>
                  <Card.Text>Date: {task.date.slice(0, 10)}</Card.Text>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        <strong>Edit</strong>.
                      </Tooltip>
                    }
                  >
                    <Button
                      variant="info"
                      onClick={this.toggleEditModal}
                      className="m-1"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        <strong>Remove</strong>.
                      </Tooltip>
                    }
                  >
                    <Button
                      variant="danger"
                      onClick={this.handleRemove}
                      className="m-1"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </OverlayTrigger>
                </Card.Body>
              </Card>
            </div>

            {isEdit && (
              <EditTaskModal
                data={task}
                onSave={this.handleSave}
                onCancel={this.toggleEditModal}
              />
            )}
          </div>
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}
