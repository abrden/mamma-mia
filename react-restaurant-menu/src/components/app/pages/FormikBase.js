import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Component } from 'react';
import superagent from 'superagent';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import "./styles.scss"

class FormikBase extends Component{
    constructor (props) {
      super(props);
      this.state = {
        name: '',
        message: '',
        openSnackbar: false
      }
    }

    submitFeedback (values) {
      let userData = JSON.stringify({
          "name": values.name,
          "message": values.message
      });
        superagent
            .post('http://localhost:9000/login/login/feedback')
            .set('Content-Type','application/json')
            .send(userData)
            .end((error,response) => {
              if (response.status == 200){
                alert(response.text)
                this.setState({ registerMessage : response.text, openSnackbar : true });
              }
              console.log(response)
              console.log(error)
        })
      }

      hideSnackbar = () => {
        this.setState({
          openSnackbar : false
        })
      }

render () {
    return (
      <div>
        <h2 style={{marginLeft: 450}}>Leave your message here</h2>
        <Formik
          initialValues={{
            name: '',
            message: ''
          }}
          onSubmit={values => {
            setTimeout(() => {
              this.submitFeedback(values);
            }, 500);
          }}
          render={() => (
            <Form>
              <div style={{marginLeft: 450, marginTop: 50}}>
                <label htmlFor="firstName" style={{marginRight: 20}}>Name</label>
                <Field name="name" placeholder="Name" />
              </div>
              
              <div style={{marginRight: 30, marginLeft: 450, marginTop: 40}}>
                <label htmlFor="lastName" style={{marginRight: 20}} >Message</label>
                <Field rows="60" name="message" placeholder="Message" row="50"/>
                {/* <textarea rows="60" name="message" placeholder="Message"/> */}
              </div>
              {/* <button type="submit">Submit</button> */}
              <Button className="button default"
                    type="submit" 
                    variant="contained" 
                    size="small" 
                    color="default" 
                    style={{marginLeft: 450, marginTop: 40}}
                    >Submit
            </Button>
              
            </Form>
            
          )}
          
        />
        <Snackbar
                message = "Thanks for your message! :)"
                open = {this.state.openSnackbar}
                onClick = {this.hideSnackbar} />
      </div>
      )
    }
}

export default FormikBase;