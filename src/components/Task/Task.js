import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./task.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeTask, changeTaskStatus } from "../../store/actions";
import { formatDate, cutString } from "../../helpers/utils";

class Task extends PureComponent {
  state = {
    checked: false,
  };

  toggleCheckbox = () => {
    this.setState({
      checked: !this.state.checked,
    });
    this.props.onCheck();
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    const { data, removeTask, onEdit, disabled, changeTaskStatus } = this.props;
    const { checked } = this.state;

    return (
      <Card
        className={`card ${styles.taskcard} ${checked ? styles.checked : ""} ${
          data.status === "active" ? styles.activeTask : styles.pasiceTask
        }`}
      >
        <input
          type="checkbox"
          className={styles.checkbox}
          onClick={this.toggleCheckbox}
        />
        <Card.Body>
          <Link to={`/task/${data._id}`}>
            <Card.Title>Title: {data.title}</Card.Title>
          </Link>
          <Card.Text>Description: {cutString(data.description, 20)}</Card.Text>
          <Card.Text>Date: {formatDate(data.date)}</Card.Text>
          <Card.Text>Created: {formatDate(data.created_at)}</Card.Text>
          <Card.Text>Status: {formatDate(data.status)}</Card.Text>
          {data.status === "active" ? (
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
                onClick={() => changeTaskStatus(data._id, { status: "done" })}
                className="m-1"
                disabled={disabled}
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
                onClick={() => changeTaskStatus(data._id, { status: "active" })}
                className="m-1"
                disabled={disabled}
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
              onClick={onEdit}
              className="m-1"
              disabled={disabled}
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
              onClick={() => removeTask(data._id)}
              className="m-1"
              disabled={disabled}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </OverlayTrigger>
        </Card.Body>
      </Card>
    );
  }
}

Task.propTypes = {
  data: PropTypes.object.isRequired,
  onCheck: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const mapDispatchToProps = {
  removeTask,
  changeTaskStatus,
};

export default connect(null, mapDispatchToProps)(Task);
