import { combineReducers } from 'redux';

import comments from './comments.js';
import questions from './questions.js';
import signIn from './signin.js';
import signUp from './signUp.js';


const rootReducer = combineReducers({comments, questions, signIn, signUp});

export default rootReducer;
