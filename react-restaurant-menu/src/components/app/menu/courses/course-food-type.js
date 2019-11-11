import React, { Component } from "react"
import CardMedia from "@material-ui/core/CardMedia"
import GlutenFree from "../../../../images/gluten_free.png"
import Veggie from "../../../../images/veggie.png"
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

const OrangeCheckbox = withStyles({
    root: {
      color: "#f29f3a",
      '&$checked': {
        color: "#f29f3a",
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

export default class CourseFoodType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editable: this.props.editable,
            itemType: this.props.itemType
        };
    };

    valueIsChecked(type){
        return this.state.itemType.some((item) => item === type)
    }

    render() {
            return(
                <FormGroup row>
                    <FormControlLabel control={<OrangeCheckbox value="veggie" disabled={!this.props.editable} checked={this.valueIsChecked("veggie")} onChange={this.handleChange} />} label="Veggie" /> 
                    <FormControlLabel control={<OrangeCheckbox value="gluten_free" disabled={!this.props.editable} checked={this.valueIsChecked("gluten_free")} onChange={this.handleChange} />} label="Gluten Free" /> 
                </FormGroup> 
            )
    }
}

function getImagePathFromType(type){
    if (type === "veggie") return Veggie
    if (type === "gluten_free") return GlutenFree
}

