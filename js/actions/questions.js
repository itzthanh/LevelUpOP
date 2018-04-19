import { ADD_QUESTION, GET_ALL_QUESTIONS, REMOVE_QUESTION } from '../constants/questions.js';
import { questionsDb } from '../firebase.js';


// export const removeQuestion = () => {

// };

const getAllQuestionsSuccess = questionsList => {
	return{
		type: GET_ALL_QUESTIONS,
		questionsList
	};
};

export const getAllQuestions = () => {
	return dispatch => {
		let questionsList = {};
		questionsDb.on("value", snapshot => {
			snapshot.forEach(question => {
				let questionInfo = question.val();
				questionsList = {...questionsList};
				questionsList[question.key] = questionInfo;

			});
			dispatch(getAllQuestionsSuccess(questionsList));
		});
	}
};

export const addQuestion = (date, name, email, questionTitle, questionText) => {
	return dispatch => {
		return questionsDb.push({date, name, email, questionTitle, questionText});
	};
};