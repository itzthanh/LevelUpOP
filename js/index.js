import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import { firebaseApp } from './firebase.js';
import Layout from './components/Layout.js';
import rootReducer from './reducers/index.js';
// import signIn from './reducers/signin.js';
import Routes from './routes.js';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<Layout>
			<Routes/>
		</Layout>
	</Provider>, document.getElementById('app')
);