import "./App.css";
import React, { useState } from "react";
import Calendar from "./calendar";
import moment from "moment";
import { momentEsp } from "./momentEsp";
import { getEvents } from "./services/events.service";
import SignIn from "./login";
import DrawerLeft from "./Drawer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./users";
moment.lang("es", momentEsp);

function App() {
  const [events, setEvents] = useState([]);
  const [index, setIndex] = useState(0);
  const [token, setToken] = useState(undefined);

  const getUpcomingMonaday = () => {
    return moment()
      .add(index * 7, "days")
      .startOf("week")
      .utc();
  };

  const getUpcomingSunday = () => {
    return moment()
      .add(index * 7, "days")
      .endOf("week")
      .utc();
  };
  function updateEvents() {
    getEvents(getUpcomingMonaday(), getUpcomingSunday()).then((e) =>
      setEvents(e)
    );
  }

  React.useEffect(() => {
    updateEvents();
  }, []);

  React.useEffect(() => {
    updateEvents();
  }, [index]);

  if (!token) return <SignIn setToken={setToken}></SignIn>;

  return (
    <div className="App">
      <Router>
        <DrawerLeft></DrawerLeft>
        <Switch>
          <Route path="/calendario">
            <Calendar
              index={index}
              setIndex={setIndex}
              dataEvents={events}
              updateEvents={updateEvents}
            ></Calendar>
          </Route>
          <Route path="/usuarios">
            <Users></Users>
          </Route>
          <Route path="/facturación">
            <div>Facturación</div>
          </Route>
          <Route path="/servicios">
            <div>Servicios</div>
          </Route>
          <Route path="/">
            <Calendar
              index={index}
              setIndex={setIndex}
              dataEvents={events}
              updateEvents={updateEvents}
            ></Calendar>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
