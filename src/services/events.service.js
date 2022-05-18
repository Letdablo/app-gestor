import axios from "axios";
import { authHeader } from "../helpers/auth";

function getEvents(fisrtday, lastDay) {
  console.log(fisrtday, lastDay);
  return axios
    .post(
      `https://localhost:44389/EventControler`,
      {
        Minfecha: fisrtday,
        MaxFecha: lastDay,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

async function addEvent(date, color, title, duracion, place, id) {
  return axios
    .put(
      `https://localhost:44389/EventControler`,
      {
        Date: date,
        Color: color,
        Title: title,
        Duracion: duracion,
        Place: place,
        UserID: id,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

export { addEvent, getEvents };
