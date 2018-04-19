import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import React from 'react';

import AddQuestion from './AddQuestion.js';
import { firebaseApp } from '../firebase.js';
import Layout from './Layout.js';
import { signOut } from '../actions/signin.js';

class App extends React.Component{
	constructor(props){
		super(props);
		this.signOut = this.signOut.bind(this);
	}

	signOut(){
		firebaseApp.auth().signOut();
		this.props.signOut();
	 	this.props.history.push('/signin');
	}

	render(){
		return(
			<div>
				<h3>Title</h3>
				<AddQuestion />
				<button 
					className="btn btn-danger"
					type="button"
					onClick={this.signOut}
				> Sign Out 
				</button>
			</div>
		);
	}
};

App.propTypes = {
	signOut: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return{
		signOut: () => dispatch(signOut()),
	};
};

export default connect(null, mapDispatchToProps)(App);