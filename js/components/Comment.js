import React from 'react';

class Comment extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		//console.log('Comment Props', this.props);
		return(
			<div>Comment: {this.props.comment}</div>
		)
	}
}

export default Comment;