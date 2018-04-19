import { FETCHED_AT, SIGNIN_PENDING, SIGNIN_SUCCESS, SIGNIN_FAIL } from '../constants/signin.js';

const defaultState = {
	signInPending: false,
	signInSuccess: false,
	signInError: null,
	email: null,
	fetchedAt: null
};

const signIn = (state = defaultState, action) => {
	let signInState = null;
	switch (action.type){
		case SIGNIN_PENDING:
			signInState = {
				...state,
				signInPending: action.signInPending
			};
			return signInState;
		case SIGNIN_SUCCESS:
			signInState = {
				...state,
				signInSuccess: action.signInSuccess,
				email: action.email
			};
			return signInState;
		case SIGNIN_FAIL:
			signInState = {
				...state,
				signInError: action.signInError
			};
			return signInState;
		case FETCHED_AT:
			signInState = {
				...state,
				fetchedAt: Date()
			}
			return signInState;
		default:
			return state;
	};
};

export default signIn;

