import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal(props) {
  const PurpleSwitch = withStyles({
    switchBase: {
      color: props.eventSelected && props.eventSelected.color,
      "&$checked": {
        color: props.eventSelected && props.eventSelected.color,
      },
      "&$checked + $track": {
        backgroundColor: props.eventSelected && props.eventSelected.color,
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{ color: props.eventSelected && props.eventSelected.color }}
        >
          {props.eventSelected && props.eventSelected.title}
        </DialogTitle>
        <DialogTitle className="timeCard" id="alert-dialog-slide-title">
          {props.time}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <a
              href={
                props.eventSelected &&
                "https://www.google.es/maps/place/" +
                  props.eventSelected.place.replace(" ", "+")
              }
            >
              {props.eventSelected && props.eventSelected.place}
            </a>
          </DialogContentText>

          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>

          <FormGroup>
            <FormControlLabel
              control={
                <PurpleSwitch
                  checked={props.checkedA}
                  onChange={props.handleChange}
                  name="checkedA"
                />
              }
              label="Completada"
            />
            <FormControlLabel
              control={
                <PurpleSwitch
                  checked={props.checked}
                  onChange={props.handleChange}
                  name="checkedB"
                />
              }
              label="Pagada"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Generar factura
          </Button>
          <Button onClick={props.handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
