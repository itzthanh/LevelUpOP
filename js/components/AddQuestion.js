import { connect } from 'react-redux';
import React from 'react';

import { addQuestion } from '../actions/questions.js';
import { generateNewQuestionId } from '../utils/apiHelper.js';

import styles from '../../css/add-question.css';

class AddQuestion extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name:'',
			questionText: '',
			questionTitle: '',
			activeInput:{
				name: false,
				question: false,
				questionTitle: false
			}
		};
		this.addQuestion = this.addQuestion.bind(this);
		this.onLabelClick = this.onLabelClick.bind(this);
		this.onNameInput = this.onNameInput.bind(this);
		this.onQuestionTitleInput = this.onQuestionTitleInput.bind(this);
		this.onQuestionTextArea = this.onQuestionTextArea.bind(this);
	}

	addQuestion(){
		let {name, questionTitle, questionText} = this.state;
		let email = this.props.email;
		let date = new Date();
		//console.log('2', date.toDateString(), name, email, questionTitle, questionText);
		//console.log('new id: ', generateNewQuestionId());
		this.props.addQuestion(date.toDateString(), name, email, questionTitle, questionText);
	}

	onLabelClick(input){
		console.log(this.nameInputElement);
		input === 'name' ? this.nameInputElement.focus() : this.questionTitleInputElement.focus();
	}

	onNameInput(onBlur = true){
		if (onBlur && !this.state.name){
			this.setState({activeInput: {...this.state.activeInput, name:false}});
		} else{
			this.setState({activeInput: {...this.state.activeInput, name:true}});
		}
	}

	onQuestionTitleInput(onBlur = true){
		if (onBlur && !this.state.questionTitle){
			this.setState({activeInput: {...this.state.activeInput, questionTitle:false}});
		} else{
			this.setState({activeInput: {...this.state.activeInput, questionTitle:true}});
		}
	}

	onQuestionTextArea(onBlur = true){
		if (onBlur && !this.state.question){
			this.setState({activeInput: {...this.state.activeInput, question:false}});
		} else{
			this.setState({activeInput: {...this.state.activeInput, question:true}});
		}
	}

	render(){
		let nameLabelHover = this.state.activeInput.name && `active ${styles['active']}`;
		let questionTitleLabelHover = this.state.activeInput.questionTitle && `active ${styles['active']}`;
		// let questionLabelHover = this.state.activeInput.question && `active ${styles['active']}`;
		
		return(
			<section>

				<div className={`card ${styles["form-wrapper"]}`}>
					<div>Email:{this.props.email}</div>
					<div className={`card-body ${styles["form"]}`}>
						<div className={styles["form-header"]}>
							<h3 className={styles["form-Title"]}>Ask a Question</h3>
						</div>
						<div className={styles["form-body"]}>
							<div className="md-form">					
								<input
									type="text"
									id="question-title"
									className={`form-control ${styles["input"]}`}
									ref={input => this.questionTitleInputElement = input}
									onBlur = {this.onQuestionTitleInput}
									onFocus = {e => this.onQuestionTitleInput(false)}
									onChange = {e => this.setState({questionTitle: e.target.value})}
								/>
								<label className={`${styles["input-label"]} ${questionTitleLabelHover}`} onClick = {e => {this.onLabelClick('questionTitle')}}>Question Title</label>
							</div>
							<div className="md-form">					
								<input
									type="text"
									id="name"
									className={`form-control ${styles["input"]}`}
									ref={input => this.nameInputElement = input}
									onBlur = {this.onNameInput}
									onFocus = {e => this.onNameInput(false)}
									onChange = {e => this.setState({name: e.target.value})}
								/>
								<label className={`${styles["input-label"]} ${nameLabelHover}`} onClick = {e => {this.onLabelClick('name')}}>Your Name</label>
							</div>
							<div className="md-form">
								<textarea 
									type="text" 
									id="question-text" 
									className="md-textarea"
									onChange={e => this.setState({questionText: e.target.value})}>
								</textarea>
								<label htmlFor="question-text" className={styles["textarea-label"]}>Question Body</label>
							</div>
						</div>	
						<div className={styles["signup-footer"]}>
							<div onClick={this.addQuestion}>Post Question</div>
						</div>	
					</div>	
				</div>
			</section>
		)
	}
};

const mapStateToProps = state => {
	return{
		email: state.signIn.email
	};
};

const mapDispatchToProps = dispatch => {
	return{
		addQuestion: (date, name, email, questionTitle, questionText) => {
			dispatch(addQuestion(date, name, email, questionTitle, questionText))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);



			