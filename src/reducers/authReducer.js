import { SIGN_IN, SIGN_OUT, ADD_ERROR, CLEAN_ERROR_MESSAGE} from '../actions/types'

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

export default (state, action) => {
  // = INITIAL_STATE
  switch (action.type) {
    case SIGN_IN:
      return { errorMessage: '', token: action.payload };
    case SIGN_OUT:
      return { token: null, errorMessage: '' };
    case ADD_ERROR:
      return { ...state, errorMessage: action.payload };
    case CLEAN_ERROR_MESSAGE:
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};
