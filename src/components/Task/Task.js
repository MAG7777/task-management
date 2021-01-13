import React, { PureComponent } from "react";
import { Card, Button } from "react-bootstrap";
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
          <Card.Title>Card Title</Card.Title>
          <Card.Text>{data.text}</Card.Text>
          <Button
            variant="info"
            onClick={onEdit}
            className="m-1"
            disabled={disabled}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            variant="danger"
            onClick={onRemove(data.id)}
            className="m-1"
            disabled={disabled}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Task;
