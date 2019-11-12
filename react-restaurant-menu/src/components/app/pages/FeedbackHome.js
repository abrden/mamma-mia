import React, {Component} from 'react';
import FormikBase from './FormikBase';
import FeedbackBar from './FeedbackBar';


class FeedbackHome extends Component {
	render()  {
        return (
			<div>
				<FeedbackBar></FeedbackBar>
				<FormikBase></FormikBase>
			</div>
		);
	}
}

export default FeedbackHome;

