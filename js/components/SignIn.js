import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import ReactLoading from 'react-loading';

import ErrorMessages from '../utils/errorMessages.js';
import { signIn } from '../actions/signin.js';
import Validation from '../utils/validation.js';

import styles from '../../css/signin-signup.css';

class SignIn extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			errorMessage: '',
			activeInput:{
				email: false,
				password: false
			}
		};

		this.onKeyPress = this.onKeyPress.bind(this);
		this.onEmailInput = this.onEmailInput.bind(this);
		this.onPasswordInput = this.onPasswordInput.bind(this);
		this.renderSignInResult = this.renderSignInResult.bind(this);
		this.signIn = this.signIn.bind(this);
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
			this.signIn();
		} else if (e.keyCode === 13){
			e.preventDefault();
			this.signIn();
		}
	}

	signIn(){
		let {email, password} = this.state;
		if (Validation.validateEmail(email)){
			this.props.signIn(email, password)
				.then(res=>{
					if (!res){
						this.setState({
							errorMessage: ErrorMessages.incorrectEmailOrPassword()
						});
					}
				}, error => {
					console.error('Undefined ERROR:', error);
				});
		} else{
			this.setState({
				errorMessage: ErrorMessages.invalidEmailFormat(email)
			});
		}
	}

	renderSignInResult(){
		if (this.props.signInPending){
			return(
				<ReactLoading className={styles["loading"]} type='bubbles' width="84px" color='#4285F4' delay={0}/> 
			);
		} else if (this.props.signInSuccess){
			return(
				<div className={styles["signin-success"]}>Login Successful. Redirecting...</div>
			);
		} 
		return(
			<div className={styles['button-wrapper-fix']}>
				<div className={styles["button-wrapper"]}>
					<button
						className={`btn ${styles["button"]}`}
						type="button"
						onClick= {this.signIn}
					> Sign In				
					</button>
				</div>
			</div>
		);
	}

	render(){
		let emailLabelHover = this.state.activeInput.email && `active ${styles['active']}`;
		let passwordLabelHover = this.state.activeInput.password && `active ${styles['active']}`;
		let errorMessage = this.state.errorMessage && <div className={styles["error-msg"]}>{this.state.errorMessage}</div>;
		let highlightField = this.state.errorMessage && styles['error'];

		return(
			<section>
				<div className={`card ${styles["form-wrapper"]}`}>
					<div className={`card-body ${styles["form"]}`}>
						<div className={styles["form-header"]}>
							<h3 className={styles['form-title']}>Sign In</h3>
						</div>
						{errorMessage}
						<div className={styles["form-body"]}>
							<div className="md-form">					
								<input
									id="signin-email"
									className={`form-control ${styles["input"]} ${highlightField}`}
									type="email"
									onFocus={e => this.onEmailInput(false)}
									onBlur={this.onEmailInput}
									onChange={e => this.setState({email: e.target.value})}
									onKeyPress={e => this.onKeyPress(e)}
								/>
								<label className={`${styles["input-label"]} ${emailLabelHover}`} htmlFor="signin-email">Email</label>
							</div>
							<div className="md-form">
								<input
									id="signin-password"
									className={`form-control ${styles["input"]} ${highlightField}`}
									type="password"
									onFocus={e => this.onPasswordInput(false)}
									onBlur={this.onPasswordInput}
									onChange={e => this.setState({password: e.target.value})}
									onKeyPress={e => this.onKeyPress(e)}
								/>
								<label className={`${styles["input-label"]} ${passwordLabelHover}`} htmlFor="signin-password">Password</label>
							</div>
							{this.renderSignInResult()}
							<div className={styles["signin-footer"]}>
							<div className={styles["redirect-signup"]}>Don't have an account? <Link to="/signup" className={styles["redirect-signup-link"]}>Sign Up</Link></div>
							<div className={styles["forgot-password"]}><Link to="/" className={styles["forgot-password-link"]}>Forgot password?</Link></div>
							</div>
						</div>	
					</div>			
				</div>
			</section>
		);
	}
};

SignIn.propTypes = {
	signInPending: PropTypes.bool.isRequired,
	signInSuccess: PropTypes.bool.isRequired,
	signInError: PropTypes.string,
	signIn: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return{
		signInPending: state.signIn.signInPending,
		signInSuccess: state.signIn.signInSuccess,
		signInError: state.signIn.signInError
	};
};

const mapDispatchToProps = (dispatch) => {
	return{
		signIn: (email, password) => dispatch(signIn(email, password))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);