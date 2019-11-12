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
import LoginBar from './LoginBar'

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
      openSnackbar: false,
      isAdministrator: false
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
      let userData = JSON.stringify({
          "email": this.state.email,
          "password": this.state.password
      })

       superagent
           .post('http://localhost:9000/login/login/login')
           .set('Content-Type','application/json')
           .send(userData)
           .end((error,response) => {
             console.log(error)
            if (error) {
              this.setState({ loginMessage : response.text, openSnackbar : true });
            } else {
              this.setState({ loggedIn : true, loginMessage : response.text, openSnackbar : true, isAdministrator : true});
            }
            if(response.status == "200"){
              this.state.isAdministrator = true;
            }
       })
  }

  renderRedirect = () => {
    if (this.state.loggedIn) {
        return <Redirect to={{
              pathname: '/homeAdmin',
              state: { isAdministrator: this.state.isAdministrator }
            }}
            />
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
          <LoginBar></LoginBar>
        {this.renderRedirect()}
        
        <form className="demoForm" style={{marginTop: 70}} onSubmit={this.handleSubmit}>
          <div>
            <Form.Group controlId="email">
              <TextField
                id="outlined-adornment-weight"
                variant="outlined"
                label="User"
                value={this.state.email}
                onChange={this.handleChange('email')}
              />
            </Form.Group>
          </div>

          <p></p>

          <div>
          <Form.Group controlId="password">
            <TextField
              variant="outlined"
              type={this.state.showPassword ? 'text' : 'password'}
              label="Password"
              style={{marginTop: 25}}
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
            <Button className="button default" 
                    variant="contained" 
                    type = "submit"
                    style={{marginTop: 50}}
                    onClick={this.loginUser} > 
            Login
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
