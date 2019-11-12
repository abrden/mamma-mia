import React, {Component} from 'react';
import ButtonBases from './ButtonBases';
import MenuAppBar from './MenuAppBar';

export default class HomeUser extends Component {
	render()  {
		return (
			<div>
				<MenuAppBar></MenuAppBar>
        		<ButtonBases {...this.state}></ButtonBases>
			</div>
		);
	}
}