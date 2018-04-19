import { connect } from 'react-redux';
import React from 'react';

import { getAllComments } from '../actions/comments.js';
import { CommentsDb } from '../firebase.js';
import Comment from '../components/Comment.js';

class CommentsList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			commentsList: []
		};
	}

	componentDidMount(){
		this.props.getAllComments(this.props.commentKey);
	}

	render(){
		//console.log('this.props.commentsList',this.props.commentsList);
		return(
			this.props.commentsList.map(comment => {
				return(
					<Comment key={comment.commentId}{...comment} />
				);
			})
		);
	}
};

const mapStateToProps = state => {
	return{
		commentsList: state.comments
	};
}

const mapDispatchToProps = dispatch => {
	return{
		getAllComments: (commentKey) => dispatch(getAllComments(commentKey))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);