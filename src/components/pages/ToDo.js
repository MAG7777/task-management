import React, { PureComponent } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NewTask from "../NewTask/NewTask";
import Task from "../Task/Task";
import Confirm from "../Confirm";
import EditTaskModal from "../EditTaskModal";
import Search from "../Search/Search";
import { connect } from "react-redux";
import { getTasks, removeMultipleTasks } from "../../store/actions";

class ToDo extends PureComponent {
  state = {
    checkedTasks: new Set(),
    showConfirm: false,
    showNewTaskModal: false,
    editTask: null,
  };

  componentDidMount() {
    this.props.getTasks();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
      this.setState({
        showNewTaskModal: false,
      });
    }
    if (!prevProps.removeTasksSuccess && this.props.removeTasksSuccess) {
      this.setState({
        showConfirm: false,
        checkedTasks: new Set()
      });
    }
    if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
      this.setState({
        editTask: null,
      });
    }
  }

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
    const checkedTasks = [...this.state.checkedTasks];
    this.props.removeMultipleTasks({ tasks: checkedTasks });
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

  render() {
    const {
      checkedTasks,
      showConfirm,
      editTask,
      showNewTaskModal,
    } = this.state;

    const { tasks } = this.props;
    const showTask = tasks.map((task) => {
      return (
        <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={3}>
          <Task
            data={task}
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
        <Search/>
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
            onCancel={this.handleEdit(null)}
          />
        )}
        {showNewTaskModal && <NewTask onCancel={this.toggleNewTaskModal} />}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    addTaskSuccess: state.addTaskSuccess,
    removeTasksSuccess: state.removeTasksSuccess,
    editTaskSuccess: state.editTaskSuccess
  };
};

const mapDispatchToProps = {
  getTasks,
  removeMultipleTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
