import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SimpleCard from "./card";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import Modal from "./modal";
import ModalAdd from "./modalAdd";
import IconButton from "@material-ui/core/IconButton";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { addEvent } from "./services/events.service";

const useStyles = makeStyles({
  table: {
    minWidth: 850,
  },
  buttonAdd: {
    position: "fixed",
    top: "90%",
    left: "95%",
  },
});

const rows = [...Array(15).keys()];

function getHeightBard(minutoStart) {
  var element = document.getElementById("7Domingo"); //replace elementId with your element's Id.
  if (element) {
    var rect = element.getBoundingClientRect();
    var elementTop;
    var scrollTop = document.documentElement.scrollTop
      ? document.documentElement.scrollTop
      : document.body.scrollTop;
    elementTop = rect.top + scrollTop;
    return elementTop + 53 * (minutoStart / 60);
  }
}

export default function Calendar(props) {
  /*resize */

  const [openEvent, setOpenEvent] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [eventSelected, setEventSelected] = useState(props.dataEvents[0]);

  const [events, setEvents] = useState([]);
  const today = moment().format("MMM,Do,dddd");
  const [days, setDays] = useState(undefined);
  const [tiempo, setTiempo] = React.useState(moment().format("HH:mm:ss"));
  React.useEffect(() => {
    function handleResize() {
      setTiempo(moment().format("HH:mm:ss"));
    }
    updateAuto();
    window.addEventListener("resize", handleResize);
    getCurrentWeek();
  }, []);

  React.useEffect(() => {
    /* Actualizar eventos nueva semana */
    setEvents(props.dataEvents);
    getCurrentWeek();
  }, [props.index]);

  React.useEffect(() => {
    const eventsAux = [];
    props.dataEvents.map((e) => {
      const eventAux = e;
      eventAux.start = e.date.split("T")[1].substr(0, 5);
      eventAux.dia = moment(e.date).format("dddd");
      eventsAux.push(eventAux);
    });

    setEvents(eventsAux);
  }, [props.dataEvents]);

  function getCurrentWeek() {
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf("isoWeek");
    var daysA = [];
    for (var i = 0; i <= 6; i++) {
      daysA.push(
        moment(weekStart)
          .add(i + props.index * 7, "days")
          .format("MMM,Do,dddd")
      );
    }
    setDays(daysA);
  }

  function updateAuto() {
    setTimeout(function () {
      setTiempo(moment().format("HH:mm:ss"));
      updateAuto();
    }, 1000);
  }

  function isToday(day, dayCode) {
    if (today.split(",")[2] === day && today.split(",")[1] === dayCode)
      return true;
    return false;
  }

  function selecEventHandler(event) {
    setEventSelected(event);
    setOpenEvent(true);
  }

  function formatTime(date, Addminutes) {
    const hour = date.split(":");
    const totalMinutes =
      parseInt(hour[0] * 60) + parseInt(hour[1]) + parseInt(Addminutes);
    const newHour = totalMinutes / 60;
    const newMinutes = totalMinutes % 60;
    return `${date} - ${Math.trunc(newHour)}:${newMinutes}`;
  }

  async function handlerAddEvents(...params) {
    addEvent(...params).then((e) => props.updateEvents());
  }

  function getPos(dia, dateStart, minutos, color) {
    const hora = dateStart.split(":");
    var element = document.getElementById(parseInt(hora[0]) + dia);
    if (element) {
      var rect = element.getBoundingClientRect();
      var elementLeft, elementTop;
      var scrollTop = document.documentElement.scrollTop
        ? document.documentElement.scrollTop
        : document.body.scrollTop;
      var scrollLeft = document.documentElement.scrollLeft
        ? document.documentElement.scrollLeft
        : document.body.scrollLeft;
      elementTop = rect.top + scrollTop;
      elementLeft = rect.left + scrollLeft;
      return {
        position: "absolute",
        left: elementLeft + 3,
        top: elementTop + 53 * (hora[1] / 60),
        height: 53 * (minutos / 60) + "px",
        width: element.offsetWidth - 6,
        backgroundColor: color,
        minHeight: 48 + "px",
      };
    }
  }

  const minutos =
    (tiempo.split(":")[0] - 7) * 60 + parseInt(tiempo.split(":")[1]);
  const classes = useStyles();

  if (!days) return <div></div>;
  return (
    <div>
      <button onClick={() => props.setIndex(props.index - 1)}>{"<"}</button>
      <button onClick={() => props.setIndex(props.index + 1)}>{">"}</button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "40px" }}></TableCell>
              <TableCell
                align="center"
                className={
                  isToday("Lunes", days[0].split(",")[1]) && "selected"
                }
              >
                Lunes, {days && days[0] && days[0].split(",")[0]}{" "}
                {days && days[0] && days[0].split(",")[1]}
              </TableCell>
              <TableCell
                align="center"
                className={
                  isToday("Martes", days[1].split(",")[1]) && "selected"
                }
              >
                Martes, {days && days[1] && days[1].split(",")[0]}{" "}
                {days && days[1] && days[1].split(",")[1]}
              </TableCell>
              <TableCell
                align="center"
                className={
                  isToday("Miercoles", days[2].split(",")[1]) && "selected"
                }
              >
                Miercoles, {days && days[2] && days[2].split(",")[0]}{" "}
                {days && days[2] && days[2].split(",")[1]}
              </TableCell>
              <TableCell
                align="center"
                className={
                  isToday("Jueves", days[3].split(",")[1]) && "selected"
                }
              >
                {" "}
                Jueves, {days && days[3] && days[3].split(",")[0]}{" "}
                {days && days[3] && days[3].split(",")[1]}
              </TableCell>
              <TableCell
                align="center"
                className={
                  isToday("Viernes", days[4].split(",")[1]) && "selected"
                }
              >
                Viernes, {days && days[4] && days[4].split(",")[0]}{" "}
                {days && days[4] && days[4].split(",")[1]}
              </TableCell>
              <TableCell
                align="center"
                className={
                  isToday("Sabado", days[5].split(",")[1]) && "selected"
                }
              >
                Sabado, {days && days[5] && days[5].split(",")[0]}{" "}
                {days && days[5] && days[5].split(",")[1]}
              </TableCell>
              <TableCell
                align="center"
                className={
                  isToday("Domingo", days[6].split(",")[1]) && "selected"
                }
              >
                Domingo, {days && days[6] && days[6].split(",")[0]}{" "}
                {days && days[6] && days[6].split(",")[1]}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow className="cell" key={index}>
                <TableCell className="cell" component="th" scope="row">
                  {7 + index + ":00"}
                </TableCell>
                <TableCell
                  align="right"
                  id={7 + index + "Lunes"}
                  className={
                    isToday("Lunes", days[0].split(",")[1])
                      ? "selected cell"
                      : "cell"
                  }
                ></TableCell>
                <TableCell
                  align="right"
                  id={7 + index + "Martes"}
                  className={
                    isToday("Martes", days[1].split(",")[1])
                      ? "selected cell"
                      : "cell"
                  }
                ></TableCell>
                <TableCell
                  align="right"
                  id={7 + index + "Miercoles"}
                  className={
                    isToday("Miercoles", days[2].split(",")[1])
                      ? "selected cell"
                      : "cell"
                  }
                ></TableCell>
                <TableCell
                  align="right"
                  id={7 + index + "Jueves"}
                  className={
                    isToday("Jueves", days[3].split(",")[1])
                      ? "selected cell"
                      : "cell"
                  }
                ></TableCell>
                <TableCell
                  align="right"
                  id={7 + index + "Viernes"}
                  className={
                    isToday("Viernes", days[4].split(",")[1])
                      ? "selected cell"
                      : "cell"
                  }
                ></TableCell>
                <TableCell
                  align="right"
                  id={7 + index + "Sabado"}
                  className={
                    isToday("Sabado", days[5].split(",")[1])
                      ? "selected cell"
                      : "cell"
                  }
                ></TableCell>
                <TableCell
                  align="right"
                  id={7 + index + "Domingo"}
                  className={
                    isToday("Domingo", days[6].split(",")[1])
                      ? "selected cell"
                      : "cell"
                  }
                ></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Tooltip title={tiempo} placement="right-start">
        <div
          style={{
            opacity: 0.5,
            height: "2px",
            width: "94%",
            backgroundColor: "blue",
            position: "absolute",
            top: getHeightBard(minutos) + "px",
          }}
        ></div>
      </Tooltip>
      {events.map((e) => (
        <SimpleCard
          key={e.title}
          eventClick={() => selecEventHandler(e)}
          id={e.title}
          time={formatTime(e.start, e.duracion)}
          styles={getPos(e.dia, e.start, e.duracion, e.color)}
          title={e.title}
        ></SimpleCard>
      ))}
      <Modal
        open={openEvent}
        handleClose={() => setOpenEvent(false)}
        eventSelected={eventSelected}
        time={
          eventSelected &&
          formatTime(eventSelected.start, eventSelected.duracion)
        }
      ></Modal>
      <ModalAdd
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        addEvent={handlerAddEvents}
        updateEvenst={props.updateEvenst}
      ></ModalAdd>
      <IconButton
        className={classes.buttonAdd}
        color="primary"
        aria-label="add to shopping cart"
        onClick={() => setOpenAdd(true)}
      >
        <AddCircleRoundedIcon fontSize="large"></AddCircleRoundedIcon>
      </IconButton>
    </div>
  );
}
