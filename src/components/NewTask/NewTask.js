import React, { PureComponent, createRef } from "react";
import { FormControl, Button, Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./newTask.module.css";
import { connect } from "react-redux";
import { addTask } from "../../store/actions";

class NewTask extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      date: new Date(),
      valid: true,
      validationType: null,
    };

    this.titleInputRef = createRef();
  }

  valitadionErrors = {
    requiredError: "The field is required!",
    lengthError: "The Title length should be less than 50 characters",
  };

  componentDidMount() {
    this.titleInputRef.current.focus();
  }

  handleChange = (type, value) => {
    if (type === "title" && !this.state.valid) {
      this.setState({
        [type]: value,
        valid: true,
      });
      return;
    }
    this.setState({
      [type]: value,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleSave();
    }
  };

  handleSave = () => {
    let { title, description, date } = this.state;
    title = title.trim();
    if (!title) {
      this.setState({
        valid: false,
        validationType: "requiredError",
      });
      return;
    }
    if (title.length > 50) {
      this.setState({
        valid: false,
        validationType: "lengthError",
      });
      return;
    }
    date = date || new Date();
    const data = {
      title,
      description,
      date: date.toISOString().slice(0, 10),
    };
    this.props.addTask(data);
  };

  render() {
    const { valid, validationType } = this.state;
    let errorMessage = "";
    if (!valid) {
      errorMessage = this.valitadionErrors[validationType];
    }
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={this.props.onCancel}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className="text-danger">{errorMessage}</Form.Label>
            <FormControl
              className={!valid ? styles.invalid : null}
              onChange={(event) => {
                this.handleChange("title", event.target.value);
              }}
              onKeyDown={this.handleKeyDown}
              value={this.state.title}
              placeholder="Title"
              aria-label="Title"
              aria-describedby="basic-addon2"
              ref={this.titleInputRef}
            />
          </Form.Group>
          <Form.Control
            onChange={(event) => {
              this.handleChange("description", event.target.value);
            }}
            as="textarea"
            rows={3}
            placeholder="Description"
            className="my-3"
          />
          <div className={styles.datePicker}>
            <DatePicker
              selected={this.state.date}
              minDate={new Date()}
              onChange={(value) => this.handleChange("date", value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSave} variant="success">
            Add
          </Button>
          <Button onClick={this.props.onCancel} variant="secondary">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

NewTask.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addTask: addTask,
};

export default connect(null, mapDispatchToProps)(NewTask);
