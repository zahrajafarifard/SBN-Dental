const initialState = {
  token: "",
  error: "",
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.token,
      };

    case "LOGIN_FAILED":
      return {
        ...state,
        error: action.error,
      };
    case "LOGOUT":
      return {
        initialState,
      };

    default:
      return state;
  }
};

export default Reducer;
