import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './feedback/store';
import Feedback from './feedback';

class FeedbackHome extends Component {
	render() {
		return (
			<Provider store={store}>
				<Feedback />
			</Provider>
		);
	}
}

export default FeedbackHome;
