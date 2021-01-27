import React, { Component } from "react";
import EditTaskModal from "../../EditTaskModal";
import { Button, OverlayTrigger, Tooltip, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./singleTask.module.css";
import {
  getSingleTask,
  removeTask,
  changeTaskStatus,
} from "../../../store/actions";
import { connect } from "react-redux";
import { formatDate } from "../../../helpers/utils";

class SingleTask extends Component {
  state = {
    isEdit: false,
  };
  componentDidMount() {
    const taskId = this.props.match.params.id;
    this.props.getSingleTask(taskId);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.removeTaskSuccess && this.props.removeTaskSuccess) {
      this.props.history.push("/");
    }
    if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
      this.toggleEditModal();
    }
  }

  handleRemove = () => {
    const taskId = this.props.task._id;
    this.props.removeTask(taskId, "single");
  };

  toggleEditModal = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  render() {
    const { isEdit } = this.state;
    const { task, changeTaskStatus } = this.props;
    return (
      <>
        {task ? (
          <div>
            <div className={styles.taskCardContainer}>
              <Card className="bg-dark text-white">
                <Card.Header as="h5">Title:{task.title}</Card.Header>
                <Card.Body>
                  <Card.Title>Description:{task.description}</Card.Title>
                  <Card.Text>Date: {formatDate(task.date)}</Card.Text>
                  <Card.Text>Created: {formatDate(task.created_at)}</Card.Text>
                  {task.status === "active" ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          <strong>Mark as done</strong>.
                        </Tooltip>
                      }
                    >
                      <Button
                        variant="success"
                        onClick={() =>
                          changeTaskStatus(task._id, { status: "done" }, "single")
                        }
                        className="m-1"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                    </OverlayTrigger>
                  ) : (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          <strong>Mark as active</strong>.
                        </Tooltip>
                      }
                    >
                      <Button
                        variant="warning"
                        onClick={() =>
                          changeTaskStatus(task._id, { status: "active" }, "single")
                        }
                        className="m-1"
                      >
                        <FontAwesomeIcon icon={faHistory} />
                      </Button>
                    </OverlayTrigger>
                  )}
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
                onCancel={this.toggleEditModal}
                from="single"
              />
            )}
          </div>
        ) : (
          <div>Task not found</div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    task: state.task,
    removeTaskSuccess: state.removeTaskSuccess,
    editTaskSuccess: state.editTaskSuccess,
  };
};
const mapDispatchToProps = {
  getSingleTask,
  removeTask,
  changeTaskStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);
