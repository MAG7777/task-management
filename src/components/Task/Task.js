import React, { PureComponent } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./task.module.css";

class Task extends PureComponent {
  state = {
    checked: false,
  };

  taggleCheckbox = () => {
    this.setState({
      checked: !this.state.checked,
    });
    this.props.onCheck();
  };

  render() {
    const { data, onRemove } = this.props;
    const {checked} = this.state;

    return (
      <Card className={`card ${styles.taskcard} ${checked ? styles.checked : "" }`}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onClick={this.taggleCheckbox}
        />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>{data.text}</Card.Text>
          <Button variant="danger" onClick={onRemove(data.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Task;
