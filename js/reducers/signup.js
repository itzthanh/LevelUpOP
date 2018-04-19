import { SIGNUP_PENDING, SIGNUP_SUCCESS, SIGNUP_FAIL } from '../constants/signup.js';

const defaultState = {
	signUpPending: false,
	signUpSuccess: false,
	signUpError: null
};

const signUp = (state = defaultState, action) => {
	let signUpState = null;
	switch (action.type){
		case SIGNUP_PENDING:
			signUpState = {
				...state,
				signUpPending: action.signUpPending
			};
			return signUpState;
		case SIGNUP_SUCCESS:
			signUpState = {
				...state,
				signUpSuccess: action.signUpSuccess
			};
			return signUpState;
		case SIGNUP_FAIL:
			signUpState = {
				...state,
				signUpError: action.signUpError
			};
			return signUpState;
		default:
			return state;
	}
};

export default signUp;