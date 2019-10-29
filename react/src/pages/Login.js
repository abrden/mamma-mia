import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Redirect } from "react-router-dom";
import './Login.css';
import superagent from 'superagent';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
	button: {
			margin: theme.spacing.unit,
			alignItems:'center'
	},
	input: {
		display: 'none',
	},
});

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      showPassword: false,
      loginMessage: '',
      openSnackbar: false
    }
  }

  handleChange = property => event => {
    this.setState({ [property]: event.target.value });
  };

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = event => {
    event.preventDefault();
  }

  loginUser = () => {
    console.log('entre aca');
      let userData = JSON.stringify({
          "email": this.state.email,
          "password": this.state.password
      })

      superagent
          .post('http://localhost:9000/v1.0/maze/login')
          .set('Content-Type','application/json')
          .send(userData)
          .end((error,response) => {
            if (error) {
              this.setState({ loginMessage : response.text, openSnackbar : true });
            } else {
              this.setState({ loggedIn : true, loginMessage : response.text, openSnackbar : true });
            }
      })
  }

  renderRedirect = () => {
    if (this.state.loggedIn) {
      return <Redirect to='/showMenu' />
    }
  }

  hideSnackbar = () => {
    this.setState({
      openSnackbar : false
    })
  }

  render () {
    const { classes } = this.props;
      return (

        <div className="Login">

        {this.renderRedirect()}

        <form className="demoForm" onSubmit={this.handleSubmit}>
          <h2>Iniciar Sesión</h2>
          
          <div>
            <Form.Group controlId="email" bsSize="large">
              <TextField
                id="outlined-adornment-weight"
                variant="outlined"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange('email')}
              />
            </Form.Group>
          </div>

          <p></p>

          <div>
          <Form.Group controlId="password" bsSize="large">
            <TextField
              variant="outlined"
              type={this.state.showPassword ? 'text' : 'password'}
              label="Contraseña"
              value={this.state.password}
              onChange={this.handleChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              />
            </Form.Group>
          </div>
          <Button variant = "contained"
                  color = "primary"
                  className = { classes.button } 
                  bsSize = "large"
                  type = "submit"
                  onClick = { this.loginUser }>
              Ingresar
            </Button>
        </form>
        <Snackbar message={this.state.loginMessage}
                  open={this.state.openSnackbar}
                  onClick={this.hideSnackbar} />
        </div>
      )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login);
