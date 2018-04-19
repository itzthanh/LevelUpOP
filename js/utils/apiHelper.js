import { questionsDb } from '../firebase.js';

export const getAllQuestions = () => {
	return new Promise((resolve, reject) => {
		let questionsArray = [];
		questionsDb.on("value", snapshot => {
			snapshot.forEach(question => {
				
				questionsArray.push(question.val());	
			});
		});
		resolve(questionsArray);
	});
};

export const generateNewQuestionId = () => {
	let id = null;
	questionsDb.on("value" , snapshot => {
		snapshot.forEach(question => {
			
		})

	});
	return id;
};
