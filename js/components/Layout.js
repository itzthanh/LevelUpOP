import React from 'react';

import Footer from './Footer.js';
import Header from './Header.js';

const Layout = (props) => {
	return(
		<div>
			<Header/>
				{props.children}
			<Footer/>
		</div>
	);
};

export default Layout;