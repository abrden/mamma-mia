import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const styles = theme => ({
	button: {
			margin: theme.spacing.unit,
			justifyContent: 'center',
			alignItems:'center'
	},
	input: {
		display: 'none',
	},
});

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isSignIn: false
		}
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			isSignIn: !this.state.isSignIn
		})
	}

	render()  {
		const { classes } = this.props;
		//Solo puede haber un elemento raiz por eso se pone un elemento vacio
		return (
			<div>
			<div>
				<h2 align="center"> Mamma Mia </h2>
				<h3 align="center"> Restaurant! </h3>
			</div>
			  <Link to={'/sign_in'}>
				  <Button variant="contained" color="primary" className={classes.button}
				  style={{width:170,backgroundColor:'#99004d',marginTop:20, marginRight:20, marginBottom:30, marginLeft:400}}>
				  <b>Loguearme</b>
			      </Button>
		      </Link>
		      <Link to={'/register'}>
				  <Button variant="contained" color="primary" className={classes.button} 
				  style={{width:170,backgroundColor:'#99004d',marginTop:20, marginRight:400, marginBottom:30, marginLeft:20}}>
			        <b>Registrarme</b>
			      </Button>
		      </Link>
			</div>
		);
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);
