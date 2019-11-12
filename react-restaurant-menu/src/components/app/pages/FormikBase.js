import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Component } from 'react';
import superagent from 'superagent';
import "./styles.scss"

class FormikBase extends Component{
    constructor (props) {
      super(props);
      this.state = {
        name: '',
        message: ''
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
              }
              console.log(response)
              console.log(error)
        })
      }

render () {
    return (
      <div>
        <h1>Suggestions</h1>
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
              <label htmlFor="firstName">Name</label>
              <Field name="name" placeholder="Jane" />
    
              <label htmlFor="lastName">Message</label>
              <Field name="message" placeholder="Message" />
    
              <button type="submit">Submit</button>
            </Form>
          )}
        />
      </div>
      )
    }
}

export default FormikBase;