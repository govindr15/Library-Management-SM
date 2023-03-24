const initalState = {
  user: null,
};
const userReducer = (state = initalState, action) => {
  const { type } = action;

  switch (type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default userReducer;
