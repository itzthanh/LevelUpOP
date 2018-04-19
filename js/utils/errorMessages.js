class ErrorMessages{
	static invalidEmailFormat(email){
		if (email.length === 0){
			return 'Please enter an email';
		}
		return `${email} is not a valid email.`;
	}

	static invalidPasswordFormat(length){
		if (length < 6){
			return 'Your password must be at least 6 characters.';
		}
		return 'Your password must contain at least 1 lowercase, uppercase, and digit.';
	}

	static incorrectEmailOrPassword(){
		return 'Incorrect email or password. Please try again.';
	}
};

export default ErrorMessages;