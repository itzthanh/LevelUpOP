import { connect } from 'react-redux';
import React from 'react';

import { addComment } from '../actions/comments.js';
import { commentsDb } from '../firebase.js';
import CommentsList from '../containers/CommentsList.js';
import styles from '../../css/add-question.css';

class Question extends React.Component{
	constructor(props){
		super(props);
		this.state={
			commentText: ''
		}
		this.addComment = this.addComment.bind(this);
	}

	addComment(){
		let questionInfo = this.props.location.state.linkState;
		let commentInfo = {
			email: this.props.email,
			comment: this.state.commentText
		};
		console.log(questionInfo);
		this.props.addComment(questionInfo.questionKey, commentInfo);
	}

	render(){
		let questionInfo = this.props.location.state.linkState;
		//console.log(this.props.location.state.linkState);
		//commentsDb.child("test").set({TEST: "custom key test"});
		return(
			<div>
				{questionInfo.questionTitle}
				<CommentsList commentKey={questionInfo.questionKey} />
				<div className="form-group basic-textarea rounded-corners">	
					<label htmlFor="comment">Comment</label>			
					<textarea
						type="text"
						id="comment"
						className={`form-control`}
						onChange = {e => this.setState({commentText: e.target.value})}
					/>
				</div>
				<div className={styles['button-wrapper-fix']}>
					<div className={styles["button-wrapper"]}>
						<button
							className={`btn ${styles["button"]}`}
							type="button"
							onClick= {this.addComment}
						> Submit				
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return{
		email: state.signIn.email
	};
};

const mapDispatchToProps = dispatch => {
	return{
		addComment: (commentKey, comment) => dispatch(addComment(commentKey,comment))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);