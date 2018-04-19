import { ADD_COMMENT, GET_ALL_COMMENTS, REMOVE_COMMENT } from '../constants/comments.js';

const defaultState = [];

const comments = (state = defaultState, action) => {
	let commentsState = null;
	switch(action.type){
		// case ADD_COMMENT:
		// 	commentsState = [...state, action.comment];
		// 	return commentsState;
		case GET_ALL_COMMENTS:
			commentsState = [...action.commentsList];
			return commentsState;
		default:
			return state;
	}
};

export default comments;