const defaultState = {
  tasks: null,
  count: 10,
};

export const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_COUNT":
      return {
        ...state,
        count: state.count + action.value,
      };
    default:
      return state;
  }
};

