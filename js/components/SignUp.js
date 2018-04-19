import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import ReactLoading from 'react-loading';

import ErrorMessages from '../utils/errorMessages.js';
// import { FAIL, SUCCESS } from '../constants/common.js';
// import { firebaseApp } from '../firebase.js';
import signUp from '../actions/signup.js';
import Validation from '../utils/validation.js';

import styles from '../../css/signin-signup.css';

class SignUp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			error:{
				email: false,
				password: false,
				message:''
			},
			activeInput:{
				email: false,
				password: false
			}
		};
	
		this.onKeyPress = this.onKeyPress.bind(this);
		this.onEmailInput = this.onEmailInput.bind(this);
		this.onPasswordInput = this.onPasswordInput.bind(this);
		this.renderSignUpResult = this.renderSignUpResult.bind(this);
		this.signUp = this.signUp.bind(this);
	}

	onEmailInput(onBlur = true){
		if (onBlur && !this.state.email){
			this.setState({activeInput: {...this.state.activeInput, email:false}});
		} else{
			this.setState({activeInput: {...this.state.activeInput, email:true}});
		}
	}

	onPasswordInput(onBlur = true){
		if (onBlur && !this.state.password){
			this.setState({activeInput: {...this.state.activeInput, password:false}});
		} else{
			this.setState({activeInput: {...this.state.activeInput, password:true}});
		}
	}

	onKeyPress(e){
		if (e.key === 'Enter'){
			e.preventDefault();
			this.signUp();
		} else if (e.keyCode === 13){
			e.preventDefault();
			this.signUp();
		}
	}

	signUp(){
		const { match, location, history } = this.props;
		let {email, password} = this.state;
		let validEmail, validPassword = false;
		validEmail = Validation.validateEmail(email);
		validPassword = Validation.validatePassword(password);
		if (!validEmail && validPassword){
			let error = ErrorMessages.invalidEmailFormat(email);
			this.setState({
				error: {
					email: true,
					password: false,
					message: error
				}
			});
		} else if (validEmail && !validPassword){
			let error = ErrorMessages.invalidPasswordFormat(password.length);
			this.setState({
				error: {
					email: false,
					password: true,
					message: error
				}
			});
		} else if (!validEmail && !validPassword){
			let error = ErrorMessages.invalidEmailFormat(email) + ' and ' + ErrorMessages.invalidPasswordFormat(password.length).toLowerCase();
			this.setState({
				error: {
					email: true,
					password: true,
					message: error
				}
			});
		} else{
			this.setState({
				error: {
					email: false,
					password: false,
					message: ''
				}
			});
			this.props.signUp(email, password)
				.then(res => {
					if (this.props.signUpSuccess){
						setTimeout(() => {
	      					this.props.history.push('/');
	      				}, 1000);
					} else if (this.props.signUpError === 'auth/email-already-in-use'){
						this.setState({
							error: {
								email: true,
								password: false,
								message: 'Email aready in use.'
							} 
						});
					}
				})
				.catch(error => {
					console.error('Undefined ERROR:', error);
				})
		}	
	}

	renderSignUpResult(){
		if (this.props.signUpPending){
			return(
				<ReactLoading className={styles["loading"]} type='bubbles' width="84px" color='#4285F4' delay={0}/> 
			);
		} else if (this.props.signUpSuccess){
			return(
				<div className={styles["signin-success"]}>Sign Up Successful. Redirecting...</div>
			);
		} 
		return(
			<div className={styles['button-wrapper-fix']}>
				<div className={styles["button-wrapper"]}>
					<button
						className={`btn ${styles["button"]}`}
						type="button"
						onClick= {this.signUp}
					> Sign Up				
					</button>
				</div>
			</div>
		);
	}

	render(){
		let emailLabelHover = this.state.activeInput.email && `active ${styles['active']}`;
		let passwordLabelHover = this.state.activeInput.password && `active ${styles['active']}`;
		let errorMessage = this.state.error.message && <div className={styles["error-msg"]}>{this.state.error.message}</div>;
		let highlightEmailField = this.state.error.email && styles['error'];
		let highlightPasswordField = this.state.error.password && styles['error'];
		return(
			<section>
				<div className={`card ${styles["form-wrapper"]}`}>
					<div className={`card-body ${styles["form"]}`}>
						<div className={styles["form-header"]}>
							<h3 className={styles["form-title"]}>Sign Up</h3>
						</div>
						{errorMessage}
						<div className={styles["form-body"]}>
							<div className="md-form">					
								<input
									id="signup-email"
									className={`form-control ${styles["input"]} ${highlightEmailField}`}
									type="email"
									onFocus={e => this.onEmailInput(false)}
									onBlur={this.onEmailInput}
									onChange={e => this.setState({email: e.target.value})}
									onKeyPress={e => this.onKeyPress(e)}
								/>
								<label className={`${styles["input-label"]} ${emailLabelHover}`} htmlFor="signup-email">Email</label>
							</div>
							<div className="md-form">
								<input
									id="signup-password"
									className={`form-control ${styles["input"]} ${highlightPasswordField}`}
									type="password"
									onFocus={e => this.onPasswordInput(false)}
									onBlur={this.onPasswordInput}
									onChange={e => this.setState({password: e.target.value})}
									onKeyPress={e => this.onKeyPress(e)}
								/>
								<label className={`${styles["input-label"]} ${passwordLabelHover}`} htmlFor="signup-password">Password</label>
							</div>
							{this.renderSignUpResult()}
							<div className={styles["signup-footer"]}>
								<div className={styles["redirect-signin"]}>Already have an account? <Link to="/signin" className={styles["redirect-signin-link"]}>Sign In</Link></div>
							</div>
						</div>	
					</div>			
				</div>
			</section>
		);
	}
};

SignUp.propTypes = {
	signUpPending: PropTypes.bool.isRequired,
	signUpSuccess: PropTypes.bool.isRequired,
	signUpError: PropTypes.string,
	signUp: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		signUpPending: state.signUp.signUpPending,
		signUpSuccess: state.signUp.signUpSuccess,
		signUpError: state.signUp.signUpError
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (email, password) => dispatch(signUp(email, password))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);