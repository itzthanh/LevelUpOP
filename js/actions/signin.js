import { firebaseApp } from '../firebase.js';
import { FETCHED_AT, SIGNIN_PENDING, SIGNIN_SUCCESS, SIGNIN_FAIL } from '../constants/signin.js';

const setSignInPending = signInPending => {
	return{
		type:SIGNIN_PENDING,
		signInPending
	};
};

const setSignInSuccess = (signInSuccess, email) => {
	return{
		type:SIGNIN_SUCCESS,
		signInSuccess,
		email
	};
};

const setSignInFail = signInError => {
	return{
		type:SIGNIN_FAIL,
		signInError
	};		
};

const setFetchedAt = () => {
	return{
		type:FETCHED_AT
	};
};

export const signIn = (email, password) => {
	return dispatch => {
		dispatch(setSignInPending(true));
		return firebaseApp.auth().signInWithEmailAndPassword(email, password)
			.then(
				res => {
					dispatch(setSignInPending(false));
					dispatch(setSignInSuccess(true, email));
					return true;
				}, 
				error => {
					console.error('error: ', error);
					dispatch(setSignInPending(false));
					dispatch(setSignInFail(error.code));
				}
			)
	}
};

export const signedIn = () => {
	return dispatch => {
		firebaseApp.auth().onAuthStateChanged(user => {
			if (user){
				dispatch(setSignInSuccess(true, user.email));
				dispatch(setSignInFail(null));
			}
			dispatch(setFetchedAt());
		});
	};
};

export const signOut = () => {
	return dispatch => {
		dispatch(setSignInSuccess(false, null));
		dispatch(setSignInFail(null));
		dispatch(setFetchedAt());
	};
};