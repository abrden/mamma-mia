import React, { Component } from "react"
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomCheckbox from './custom-checkbox';

export default class CourseFoodType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editable: this.props.editable,
            itemType: this.props.itemType,
        };
    };

    valueIsChecked(type){
        return this.state.itemType.some((item) => item === type)
    }

    render() {     
            return(
                <FormGroup row>
                    <FormControlLabel control={<CustomCheckbox disabled={!this.props.editable} checked={this.valueIsChecked("veggie")} />} label="Veggie" /> 
                    <FormControlLabel control={<CustomCheckbox disabled={!this.props.editable} checked={this.valueIsChecked("gluten_free")} />} label="Gluten Free" /> 
                </FormGroup> 
            )
        } 
}