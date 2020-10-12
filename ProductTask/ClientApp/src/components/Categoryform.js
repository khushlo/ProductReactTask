import React, { useState, useEffect, Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import axios from 'axios';
import Button from 'react-bootstrap/Button'

export const initialvalues = {
  CId: 0,
  CName: "",
  Status: 1,
  Description: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },
  
}));

export default function Categoryform(props) {
  const [values, setValues] = useState(initialvalues);
  const classes = useStyles();

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const HandleAvail = (e) => {
    const { name, value } = e.target;
    setValues({...values,[name]:parseInt(value)})
  }

  const handleSave = e => {
    setValues(oldValues => { return {...oldValues,"Status":parseInt(oldValues.Status)}} )
      axios.post('api/Category/AddCategory', values)
      .then(response =>{
        props.CloseForm();
      })
      .catch(error=>{
        console.log(error)
      })      
  }

  return (
    <form className={classes.root} >
      <Grid container>
        <Grid item xs={6}>
          <FormControl disabled>
            <InputLabel htmlFor="component-disabled">Category Id</InputLabel>
            <Input
              htmlFor="component-disabled"
              name="CId"
              value={values.CId}
              onChange={HandleInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Category Name"
            variant="outlined"
            name="CName"
            value={values.CName}
            onChange={HandleInputChange}
          />
        </Grid>
      </Grid>
      <Grid container>
        <FormControl component="fieldset">
          <FormLabel component="legend">Availability</FormLabel>
          <RadioGroup
            aria-label="Availability"
            name="Status"
            value={values.Status}
            onChange={HandleAvail}
          >
            <FormControlLabel value={1} control={<Radio />} label="Available" />
            <FormControlLabel value={0} control={<Radio />} label="Unavailable"/>
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            multiline
            rows={5}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            name="Description"
            value={values.Description}
            onChange={HandleInputChange}
          />
        </Grid>
      </Grid>
      <Grid container>
          <Grid xs={3}></Grid>
          <Grid xs={6}>
          <Button onClick={handleSave} variant="primary" size="md" block>
              Save
            </Button>
          </Grid>
      </Grid>
    </form>
  );
}
