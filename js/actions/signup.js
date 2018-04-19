import { firebaseApp } from '../firebase.js';
import { SIGNUP_PENDING, SIGNUP_SUCCESS, SIGNUP_FAIL } from '../constants/signup.js';


const setSignUpPending = signUpPending => {
	return {
		type: SIGNUP_PENDING,
		signUpPending
	};
};

const setSignUpSuccess = signUpSuccess => {
	return {
		type: SIGNUP_SUCCESS,
		signUpSuccess
	};
};

const setSignUpFail = signUpError => {
	return {
		type: SIGNUP_FAIL,
		signUpError
	};
};

const signUp = (email, password) => {
	return dispatch => {
		dispatch(setSignUpPending(true));
		return firebaseApp.auth().createUserWithEmailAndPassword(email, password)
			.then(res => {
				console.log('Sign up successful', res);
				dispatch(setSignUpPending(false));
				dispatch(setSignUpSuccess(true));
			})
			.catch(error => {
				console.log('Sign up failed', error);
				dispatch(setSignUpPending(false));
				dispatch(setSignUpFail(error.code));
			})
	};
};

export default signUp;