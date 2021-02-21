import * as actionTypes from "./actionTypes";
import { LOGOUT_SUCCESS } from "./userActionTypes";

const defaultState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
  addTaskSuccess: false,
  successMessage: null,
  removeTaskSuccess: false,
  removeTasksSuccess: false,
  editTaskSuccess: false,
};

export const taskReducer = (state = defaultState, action) => {
  const loadingState = {
    ...state,
    loading: true,
    successMessage: null,
    error: null,
  };

  switch (action.type) {

    case LOGOUT_SUCCESS:
      return defaultState;

    case actionTypes.LOADING:
      return loadingState;

    case actionTypes.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actionTypes.GET_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.tasks,
      };

    case actionTypes.GET_SINGLE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        task: action.task,
      };

    case actionTypes.ADDING_TASK_SUCCESS:
      return {
        ...loadingState,
        addTaskSuccess: false,
      };

    case actionTypes.ADD_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.task],
        addTaskSuccess: true,
        successMessage: "Task added successfuly!!!",
      };

    // Edit task

    case actionTypes.EDITING_TASK_SUCCESS:
      return {
        ...loadingState,
        editTaskSuccess: false,
      };

    case actionTypes.EDIT_TASK_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        editTaskSuccess: true,
        successMessage: "Task edited successfuly!!!",
      };
      if (action.from === "single") {
        return {
          ...newState,
          task: action.editedTask,
        };
      } else {
        const tasks = [...state.tasks];
        const foundIndex = tasks.findIndex(
          (task) => task._id === action.editedTask._id
        );
        tasks[foundIndex] = action.editedTask;
        return {
          ...newState,
          tasks: tasks,
        };
      }
    }

    case actionTypes.CHANGING_TASK_STATUS:
      return loadingState;

    case actionTypes.CHANGE_TASK_STATUS_SUCCESS: {
      let message =
        action.status === "done"
          ? "Congrat the task completed successfully!"
          : "The task is active now!";
      const newState = {
        ...state,
        loading: false,
        successMessage: message,
      };

      if (action.from === "single") {
        return {
          ...newState,
          task: action.editedTask,
        };
      } else {
        const tasks = [...state.tasks];
        const foundIndex = tasks.findIndex(
          (task) => task._id === action.editedTask._id
        );
        tasks[foundIndex] = action.editedTask;
        return {
          ...newState,
          tasks: tasks,
        };
      }
    }

    case actionTypes.REMOVING_TASK:
      return { ...loadingState, removeTaskSuccess: false };

    case actionTypes.REMOVE_TASK_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        successMessage: "Task removed successfuly!!!",
      };
      if (action.from === "single") {
        return {
          ...newState,
          task: null,
          removeTaskSuccess: true,
        };
      } else {
        const newTasks = state.tasks.filter(
          (task) => task._id !== action.taskId
        );
        return {
          ...newState,
          tasks: newTasks,
        };
      }
    }

    case actionTypes.REMOVING_MULTIPLE_TASKS:
      return { ...loadingState, removeTasksSuccess: false };

    case actionTypes.REMOVE_MULTIPLE_TASKS_SUCCESS: {
      let tasks = [...state.tasks];

      action.taskIds.forEach((taskId) => {
        tasks = tasks.filter((task) => task._id !== taskId);
      });
      return {
        ...state,
        loading: false,
        tasks: tasks,
        removeTasksSuccess: true,
        successMessage: "Tasks removed successfuly!!!",
      };
    }

    default:
      return state;
  }
};
