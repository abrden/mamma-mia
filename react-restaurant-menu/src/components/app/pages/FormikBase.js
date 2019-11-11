import React from 'react';
import { Formik } from 'formik';
import { Component } from 'react';
import superagent from 'superagent';
import Button from '@material-ui/core/Button';
import Form from 'react-bootstrap/Form';
import TextField from '@material-ui/core/TextField';
import "./styles.scss"

const listOfMessages = [];

/* TODO NOE. HABRIA QUE CAMBIAR LOS ESTILOS DE LOS BOTONES */

class FormikBase extends Component{
    constructor (props) {
      super(props);
      this.state = {
       //listOfMessages: [],
        name: '',
        message: ''
      }
    }

    submitFeedback (values) {
        //console.log("VALUES", values)
        this.state.name = values.name;
        this.state.message = values.message
          let userData = JSON.stringify({
              "name": values.name,
              "message": values.message
          })
    
           superagent
               .post('http://localhost:9000/login/login/feedback')
               .set('Content-Type','application/json')
               .send(userData)
               .end((error,response) => {
                 console.log(response)
                 console.log(error)
           })
      }

render () {
    return (
    <div>
        <h3 class="text-black" style={{marginLeft: 50, marginTop: 30}}>Leave your comment here</h3>
        <Formik
        initialValues={{ name: this.state.name }}
        onSubmit={(values, actions) => {
            listOfMessages.push([values.name, values.message])
            //console.log("List of messages", listOfMessages)
            setTimeout(() => {
            //alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
            }, 1000);
        }}
        >
        {props => (
            <form onSubmit={props.handleSubmit}>
            <Form.Row>
              {/*   <label>Name: </label>
                <input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                    name="name"
                /> */}
                <TextField
                id="outlined-adornment-weight"
                variant="outlined"
                label="Name"
                style={{marginLeft: 50}}
                value={props.values.name}
                onChange={props.handleChange}
              />
            </Form.Row>
            <br></br>
            <Form.Row>
                {/* <label>Message: </label> */}
              {/*   <input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.message}
                    name="message"
                /> */}
                
                <TextField 
                id="outlined-adornment-weight"
                variant="outlined"
                label="Message"
                style={{marginLeft: 50, height: 100, width: 400}}
                rows="40"
                margin="normal"
                //fullWidth="true"
                value={props.values.message}
                onChange={props.handleChange}
              />
            </Form.Row>
                {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            {/* <button type="submit" onClick={ this.submitFeedback(props.values) }>Submit</button> */}
            <Form.Row>
            <Button className="button default" 
                    variant="contained" 
                    size="small" 
                    color="default" 
                    style={{marginLeft: 50}}
                    onClick={ this.submitFeedback(props.values) }
                    >Submit
            </Button>
            </Form.Row>
            
            </form>
            
        )}
        </Formik>
    </div>
    )
    }
}

export default FormikBase;