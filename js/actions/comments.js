import * as firebase from 'firebase';

import { ADD_COMMENT, GET_ALL_COMMENTS, REMOVE_COMMENT } from '../constants/comments.js';
import { commentsDb } from '../firebase.js';


const getAllCommentsSuccess = commentsList => {
	return{
		type: GET_ALL_COMMENTS,
		commentsList
	};
};

const addNewCommentToState = comment => {
	return{
		type: ADD_COMMENT,
		comment
	};
};

export const addComment = (commentKey, comment) => {
	let commentInfo = {...comment, date:firebase.database.ServerValue.TIMESTAMP};
	return dispatch => {
		commentsDb.child(commentKey).push(commentInfo);
		
		//dispatch(addNewCommentToState(comment));
	};
};

export const getAllComments = commentKey => {
	return dispatch => {
		commentsDb.child(commentKey).on("value", snapshot => {
			let commentsList = [];
			snapshot.forEach(comment => {
				let commentInfo = {...comment.val(), commentId:comment.key};
				commentsList.push(commentInfo);
			})
			dispatch(getAllCommentsSuccess(commentsList));
		});
		
	}
};

export const removeComment = () => {

};
