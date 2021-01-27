import request from "../helpers/request";
import * as actionTypes from "./actionTypes";

const apiURL = process.env.REACT_APP_API_URL;

export function getSingleTask(taskId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    request(`${apiURL}/task/${taskId}`)
      .then((task) => {
        dispatch({ type: actionTypes.GET_SINGLE_TASK_SUCCESS, task });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function getTasks(params = {}) {
  let url = `${apiURL}/task`;

  let query = "?";
  for (let key in params) {
    query += `${key}=${params[key]}&`;
  }

  if (query !== "?") {
    url += query;
  }

  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    request(url)
      .then((tasks) => {
        dispatch({ type: actionTypes.GET_TASKS_SUCCESS, tasks });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function editTask(taskId, data, from = "tasks") {
  return (dispatch) => {
    dispatch({ type: actionTypes.EDITING_TASK_SUCCESS });

    request(`${apiURL}/task/${taskId}`, "PUT", data)
      .then((editedTask) => {
        dispatch({ type: actionTypes.EDIT_TASK_SUCCESS, editedTask, from });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function addTask(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADDING_TASK_SUCCESS });

    request(`${apiURL}/task`, "POST", data)
      .then((task) => {
        dispatch({ type: actionTypes.ADD_TASK_SUCCESS, task });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function removeTask(taskId, from = "tasks") {
  return (dispatch) => {
    dispatch({ type: actionTypes.REMOVING_TASK });

    request(`${apiURL}/task/${taskId}`, "DELETE")
      .then(() => {
        dispatch({ type: actionTypes.REMOVE_TASK_SUCCESS, taskId, from });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function removeMultipleTasks(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.REMOVING_MULTIPLE_TASKS });

    request(`${apiURL}/task/`, "PATCH", data)
      .then(() => {
        dispatch({
          type: actionTypes.REMOVE_MULTIPLE_TASKS_SUCCESS,
          taskIds: data.tasks,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function changeTaskStatus(taskId, data, from = "tasks") {
  return (dispatch) => {
    dispatch({ type: actionTypes.CHANGING_TASK_STATUS });

    request(`${apiURL}/task/${taskId}`, "PUT", data)
      .then((editedTask) => {
        dispatch({
          type: actionTypes.CHANGE_TASK_STATUS_SUCCESS,
          editedTask,
          from,
          status: data.status,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}
