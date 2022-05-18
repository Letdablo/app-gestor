import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {},
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  hour: {
    marginTop: "3px",
    marginLeft: "10px",
    fontSize: 12,
    color: "white",
  },
  title: {
    marginLeft: "10px",
    fontSize: 18,
    color: "white",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      style={props.styles}
      onClick={props.eventClick}
    >
      <CardContent>
        <Typography className={classes.hour} color="textSecondary" gutterBottom>
          {props.time}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
