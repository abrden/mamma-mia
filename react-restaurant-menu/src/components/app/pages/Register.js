import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./Login.css";
import superagent from 'superagent';
import Snackbar from '@material-ui/core/Snackbar';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormErrors } from './FormErrors';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    alignItems:'center'
  },
  input: {
    display: 'none',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});

class Register extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        email: "",
        password: "",
        confirmPassword: "",
        emailValid: false,
        passwordValid: false,
        confirmPasswordValid: false,
        formErrors: { email: '', password: '', confirmPassword: '' },
        registerMessage: '',
        openSnackbar: false,
        registeded: false,
        showPassword: false,
        showConfirmPassword: false
      };
    }
  
    hasUpperCase(password) {
      return (/[A-Z]/.test(password));
    }

    hasLowerCase(password) {
      return (/[a-z]/.test(password));
    }

    hasANumber(password){
      return (/[0-9]/.test(password));
    }

    //una password de mínimo 8 caracteres con al menos una letra mayúscula, una minúscula, un número.
    validatePassword(){
      if((this.state.password.length >= 8) &&
         (this.hasUpperCase(this.state.password)) &&
         (this.hasLowerCase(this.state.password)) &&
         (this.hasANumber(this.state.password))) {
        return true;
      }
      return false;
    }

    validateConfirmPassword() {
      return (this.state.password === this.state.confirmPassword);
    }

    validateEmail(){
      if(this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        return true;
      }
      return false;
    }

    errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
    }

    validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      
      let validEmail = this.validateEmail();
      let validPassword = this.validatePassword();
      let validConfirmPassword = this.validateConfirmPassword();

      switch(fieldName) {
        case 'email':
          fieldValidationErrors.email = validEmail ? '' : ' Invalid email.';
          break;
        case 'password':
          fieldValidationErrors.password = validPassword ? '': ' Incorrect password.';
          break;
        case 'confirmPassword':
          fieldValidationErrors.confirmPassword = validConfirmPassword ? '': ' Passwords dont match.';
          break;
        default:
          break;
      }
      this.setState({ formErrors: fieldValidationErrors,
                      emailValid: validEmail,
                      passwordValid: validPassword,
                      confirmPasswordValid: validConfirmPassword
                    });
    }
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit = event => {
      event.preventDefault();
    };

    handleClickShowPassword = () => {
      this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleClickShowConfirmPassword = () => {
      this.setState(state => ({ showConfirmPassword: !state.showConfirmPassword }));
    };

    saveUser = () => {
        let userData = JSON.stringify({
            "email": this.state.email,
            "password": this.state.password
        })

        superagent
            .post('http://localhost:9000/v1.0/maze/saveUser')
            .set('Content-Type','application/json')
            .send(userData)
            .end((error,response) => {
              if (error) {
                this.setState({ registerMessage : response.text, openSnackbar : true });
              } else {}
                this.setState({ registerMessage : response.text, openSnackbar : true });
        })
    }

    hideSnackbar = () => {
      this.setState({
        openSnackbar : false
      })
    }

    handleChange = property => event => {
      const value = event.target.value;
      this.setState({[property]: event.target.value},
        () => { this.validateField(property, value) });
    };

    allFieldsOk() {
      return (this.state.emailValid && this.state.passwordValid && this.state.confirmPasswordValid);
    }
  
    render() {
      const { classes } = this.props;

      return (
        <div className="Register">

          <form className="demoForm" onSubmit={this.handleSubmit}>
            
            <h2>Registro</h2>

            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>

            <p></p>

            <div className = {`form-group ${this.errorClass(this.state.formErrors.email)}`}>
              <Form.Group controlId = "email">
                <TextField
                  id = "outlined-adornment-weight"
                  variant = "outlined"
                  label = "Email"
                  value = {this.state.email}
                  onChange = {this.handleChange('email')}
                />
              </Form.Group>
            </div>

            <p></p>

            <div className = {`form-group ${this.errorClass(this.state.formErrors.password)}`}>
            <Form.Group controlId = "password">
              <TextField
                variant = "outlined"
                type = {this.state.showPassword ? 'text' : 'password'}
                label = "Contraseña"
                value = {this.state.password}
                onChange = {this.handleChange('password')}
                helperText = "Password must be at least 8 characters long with at least one upper case letter, one lower case letter and one number."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label = "Toggle password visibility"
                        onClick = {this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                />
              </Form.Group>
            </div>

            <p></p>

            <div className={`form-group ${this.errorClass(this.state.formErrors.confirmPassword)}`}>
            <Form.Group controlId="password">
              <TextField
                variant="outlined"
                type={this.state.showConfirmPassword ? 'text' : 'password'}
                label="Confirmar Contraseña"
                value={this.state.confirmPassword}
                onChange={this.handleChange('confirmPassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle confirmPassword visibility"
                        onClick={this.handleClickShowConfirmPassword}
                      >
                        {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                />
              </Form.Group>
            </div>

            <p></p>

            <Button variant="contained" size="small" className={classes.button} onClick={this.saveUser} disabled={!this.allFieldsOk()}>
                <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                Registrarme!
            </Button>

            <Link to={'/login'}>
              <Button variant="contained" size="large" className={classes.button} disabled={!this.allFieldsOk()}>
                Ir al Login
            </Button>
            </Link>
          </form>

            <Snackbar
                message = {this.state.registerMessage}
                open = {this.state.openSnackbar}
                onClick = {this.hideSnackbar} />
        </div>
      );
    }
  }

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Register);