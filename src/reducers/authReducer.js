import { types } from "../types/types";

const initialState = {
  checking: true,
  //   uid: null,
  //   name: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };

    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      };

    case types.authStartRegister:
      return {
        ...state,
        checking: false,
        ...action.payload,
      };

    case types.authLogout:
      return {
        checking: false,
      };
      
    default:
      return state;
  }
};
