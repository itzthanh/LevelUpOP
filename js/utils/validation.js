class Validation{
	static validateEmail(email){
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
	}

	static validatePassword(password){
		return /[a-z]/.test(password) && /[A-Z]/.test(password) && 
			/\d/.test(password);
	}
};

export default Validation;