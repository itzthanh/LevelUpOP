import { connect } from 'react-redux';
import React from 'react';

import { getAllQuestions } from '../actions/questions.js';
import { questionsDb } from '../firebase.js';
import QuestionLink from '../components/QuestionLink.js';

class QuestionsList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			questionsList: []
		};
	}

	componentDidMount(){
		this.props.getAllQuestions();
	}

	render(){
		return Object.keys(this.props.questionsList).map((key) => {
			let props = this.props.questionsList[key];
			return <QuestionLink key={key} questionKey={key} {...props} />
		});		
	}
};

const mapStateToProps = state => {
	return{
		questionsList: state.questions
	};
}

const mapDispatchToProps = dispatch => {
	return{
		getAllQuestions: () => dispatch(getAllQuestions())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);