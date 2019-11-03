import { createStore, compose, combineReducers } from 'redux';

import { reducer as feedbackReducer } from './reducer';

const appReducer = combineReducers({
	Feedback: feedbackReducer,
});

export default createStore(
	appReducer,
	compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f
	),
);
