import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import moment from "moment";

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const pacientes = [
  { id: 1, label: "Pedro(Propio)", bono: false },
  { id: 2, label: "Marta(Propio)", bono: false },
  { id: 3, label: "Sara(Propio)", bono: true, numBono: 4, usedBono: 2 },
  { id: 4, label: "Juan(Propio)", bono: false },
];

const servicios = [
  {
    id: 1,
    label: "Raiz",
    precio: "55€",
    duracion: 50,
    color: "#0288d1",
    place: "calle de sodio, 17",
  },
  {
    id: 2,
    label: "Ideum",
    precio: "35€",
    duracion: 60,
    color: "#ff9633",
    place: "calle de sodio, 17",
  },
  {
    id: 3,
    label: "Mandarina",
    precio: "65€",
    duracion: 60,
    color: "#0fc4a7",
    place: "calle de sodio, 17",
  },
  {
    id: 4,
    label: "Derivación",
    precio: "0",
    duracion: 200,
    color: "#9575cd",
    place: "calle de sodio, 17",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAdd(props) {
  const autoC1 = useRef(null);
  const autoC2 = useRef(null);
  const [date, setDate] = React.useState("");
  const [paciente, setPaciente] = React.useState(undefined);
  const [servicio, setServicio] = React.useState(undefined);

  function addEvent() {
    const ele1 = autoC1.current.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];
    const ele2 = autoC2.current.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];
    if (ele1) ele1.click();
    if (ele2) ele2.click();
    props.addEvent(
      moment(date).utc(),
      servicio.color,
      paciente.label,
      servicio.duracion,
      servicio.place,
      paciente.id
    );
    setPaciente(undefined);
    setServicio(undefined);
    props.handleClose();
  }

  function updateSelectedDateTime(event) {
    setDate(event.target.value);
  }

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
        <DialogTitle id="alert-dialog-slide-title">Nueva cita</DialogTitle>
        <DialogContent>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={pacientes}
            ref={autoC1}
            sx={{ width: 300 }}
            value={paciente}
            onChange={(event, newValue) => setPaciente(newValue)}
            renderInput={(params) => <TextField {...params} label="Paciente" />}
          />
          {paciente ? (
            paciente && paciente.bono ? (
              <DialogContentText id="alert-dialog-slide-description">{`Bono: ${paciente.usedBono}/${paciente.numBono} `}</DialogContentText>
            ) : (
              <DialogContentText id="alert-dialog-slide-description">{`Sin bono`}</DialogContentText>
            )
          ) : (
            <div />
          )}
          <br />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={servicios}
            sx={{ width: 300 }}
            ref={autoC2}
            value={servicio}
            onChange={(event, newValue) => setServicio(newValue)}
            renderInput={(params) => <TextField {...params} label="Servicio" />}
          />
          {servicio ? (
            <DialogContentText id="alert-dialog-slide-description">{`Precio: ${servicio.precio}             duracion: ${servicio.duracion} min.  `}</DialogContentText>
          ) : (
            <div />
          )}
          <br />
          <TextField
            id="datetime-local"
            label="Next appointment"
            defaultValue="2017-05-24T10:30"
            type="datetime-local"
            value={date}
            onChange={updateSelectedDateTime}
            sx={{ width: 300 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cerrar
          </Button>
          <Button onClick={() => addEvent("añadido")} color="primary">
            Añadir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
