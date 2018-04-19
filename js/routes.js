import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import React from 'react';
import ReactLoading from 'react-loading';

import ConditionalRoute  from './containers/ConditionalRoute.js';
import App from './components/App.js';
import InvalidPage from './components/InvalidPage.js';
import Question from './components/Question.js';
import QuestionsList from './containers/QuestionsList.js';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn.js';

import { signedIn, signOut } from './actions/signin.js';

import styles from '../css/add-question.css';


class Routes extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		this.setState({mountedAt: Date()});
		this.props.signedIn();
	}

	render(){
		if (this.props.fetchedAt >= this.state.mountedAt){
			return(
				<Router>
					<Switch>
						<Route exact path='/' render={(props) => (<App signInSuccess={this.props.signInSuccess} {...props}/>)} />
						<Route path="/questions" component={QuestionsList} />
						<ConditionalRoute signedIn={this.props.signInSuccess} path="/signup" component={SignUp} />
						<ConditionalRoute signedIn={this.props.signInSuccess} path="/signin" component={SignIn} />
						<Route path="/question/:questionId" component={Question} />
						<Route component={InvalidPage} />
					</Switch>
				</Router>
			);
		} else{
			return(
				<div><ReactLoading className={styles["loading"]} type='bubbles' width="84px" color='#4285F4' delay={0}/></div>
			);
		}
	}
};

Routes.propTypes = {
	signedIn: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return{
		signInSuccess: state.signIn.signInSuccess,
		fetchedAt: state.signIn.fetchedAt
	};
};

const mapDispatchToProps = (dispatch) => {
	return{
		signedIn: () => dispatch(signedIn()),
		signOut: () => dispatch(signOut())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
