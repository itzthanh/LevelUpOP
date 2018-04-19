import { ADD_QUESTION, GET_ALL_QUESTIONS, REMOVE_QUESTION } from '../constants/questions.js';

const defaultState = {};

const questions = (state = defaultState, action) => {
	let questionsState = null;
	switch(action.type){
		case GET_ALL_QUESTIONS:
			questionsState = action.questionsList;
			return questionsState;
		default:
			return state;
	}
};

export default questions;