import React, { PureComponent } from "react";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./task.module.css";

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
    const { data, onRemove, onEdit, disabled } = this.props;
    const { checked } = this.state;

    return (
      <Card
        className={`card ${styles.taskcard} ${checked ? styles.checked : ""}`}
      >
        <input
          type="checkbox"
          className={styles.checkbox}
          onClick={this.toggleCheckbox}
        />
        <Card.Body>
          <Card.Title>Title: {data.title}</Card.Title>
          <Card.Text>Description: {data.description}</Card.Text>
          <Card.Text>
            Date: {data.date ? data.date.slice(0, 10) : "none"}
          </Card.Text>

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
              onClick={onRemove(data._id)}
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

export default Task;
