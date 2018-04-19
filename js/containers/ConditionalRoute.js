import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import React from 'react';

class ConditionalRoute extends React.Component{
	constructor(props){
		super(props);
	};

	render(){
		const { component: Component, ...rest } = this.props;
		let path = this.props.location.pathname;
		console.log(path);
		return(
			<Route {...rest} render={props => {
				if (!this.props.signedIn && path !== '/signin' && path !== '/signup'){
					return <Redirect to="/signin" />
				} else if (this.props.signedIn && (path === '/signin' || path === '/signup')){
					return <Redirect to="/" />
				} else if (!this.props.signedIn && (path === '/signin' || path === '/signup')){
					return <Component {...props} />
				} else if (this.props.signedIn){
					return <Component {...props} />
				}
			}} />
		);
	}
};

ConditionalRoute.propTypes = {
	signInSuccess: PropTypes.bool
};

export default ConditionalRoute;
