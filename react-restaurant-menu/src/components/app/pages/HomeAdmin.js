import React, {Component} from 'react';
import ButtonBasesAdmin from './ButtonBasesAdmin';
import MenuAppBar from './MenuAppBar';

export default class HomeAdmin extends Component {
	render()  {
		return (
			<div>
				<MenuAppBar></MenuAppBar>
        		<ButtonBasesAdmin></ButtonBasesAdmin>
			</div>
		);
	}
}
