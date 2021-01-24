import * as actionTypes from "./actionTypes";

const defaultState = {
  tasks: [],
  loading: false,
  error: null,
  addTaskSuccess: false,
  successMessage: null,
  removeTasksSuccess: false,
  editTaskSuccess: false
};

export const mainReducer = (state = defaultState, action) => {
  const loadingState = {
    ...state,
    loading: true,
    successMessage: null,
    error: null,
  };

  switch (action.type) {
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

    case actionTypes.EDIT_TASK_SUCCESS:
      const tasks = [...state.tasks];
      const foundIndex = tasks.findIndex(
        (task) => task._id === action.editedTask._id
      );
      tasks[foundIndex] = action.editedTask;
      return {
        ...state,
        loading: false,
        tasks: tasks,
        editTaskSuccess: true,
        successMessage: "Task edited successfuly!!!",
      };

    case actionTypes.REMOVING_TASK:
      return { ...loadingState, removeTaskSuccess: false };

    case actionTypes.REMOVE_TASK_SUCCESS:
      const newTasks = state.tasks.filter((task) => task._id !== action.taskId);
      return {
        ...state,
        loading: false,
        tasks: newTasks,
        successMessage: "Task removed successfuly!!!",
      };

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
