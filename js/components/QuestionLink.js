import React from 'react';
import { Link } from 'react-router-dom';

class QuestionLink extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<Link to={{pathname: `/question/${this.props.questionKey}`, state: {linkState: this.props}}}>{this.props.questionTitle}</Link>
			</div>
		);
	}
}

export default QuestionLink;