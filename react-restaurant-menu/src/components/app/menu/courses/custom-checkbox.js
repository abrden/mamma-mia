import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import React from "react"

const OrangeCheckbox = withStyles({
    root: {
      color: "#f29f3a",
      '&$checked': {
        color: "#f29f3a",
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

export default function CustomCheckbox(props) {
  const [state, setState] = React.useState({
    checked: props.checked,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
          <OrangeCheckbox
            checked={state.checked}
            onChange={handleChange('checked')}
            disabled={props.disabled}
          />
  );
}
