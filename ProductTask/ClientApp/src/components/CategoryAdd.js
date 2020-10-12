import React, { Component,useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
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
import { Button } from 'reactstrap';

const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiFormControl-root": {
        width: "100%",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
      },
    },
    
  }));

export default function CategoryAdd(props) {
  const [open, setOpen] = React.useState(props.open);
  const [objModel, setModel] = React.useState(props.objModel);
  const [values, setValues] = useState(props.defaultCategory);
  const classes = useStyles();

  console.log(values);

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
    if(!props.isEdit){  
      axios.post('api/Category/AddCategory', values)
      .then(response =>{
        if(response.data.Message != null){
          props.setMessage(response.data.Message);
        }
        if(response.data.Error != null){
          props.setError(response.data.Error);
        }          
        props.setRefresh(!props.isRefresh);
        props.setIsEdit(false);
        props.setDialog(!props.getDialog);          
      })
      .catch(error=>{
        props.setError(error.title);
      })  
    }
    else{
      axios.put('api/Category/UpdateCategory', values)
      .then(response =>{
        if(response.data.Message != null){
          props.setMessage(response.data.Message);
        }
        if(response.data.Error != null){
          props.setError(response.data.Error);
        }          
        props.setRefresh(!props.isRefresh);
        props.setIsEdit(false);
        props.setDialog(!props.getDialog);          
      })
      .catch(error=>{
        props.setError(error.title);
      })  
    }  
    setOpen(false) ;
  }

  const handleClose = () => {
    setOpen(false);
    props.setRefresh(!props.isRefresh);
    props.setDialog(false);  
    props.setIsEdit(false);  
  };

  React.useEffect(() => {
    // handleClickOpen();
  }, [objModel]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Category</DialogTitle>
        <DialogContent>
          <form className={classes.root}>
            <Grid container>
              <Grid item xs={6}>
                <FormControl disabled>
                  <InputLabel htmlFor="component-disabled">
                    Category Id
                  </InputLabel>
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
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Available"
                  />
                  <FormControlLabel
                    value={0}
                    control={<Radio />}
                    label="Unavailable"
                  />
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
          </form>
        </DialogContent>

        <DialogActions>
            <Button onClick={handleSave} color="success">
              Submit
            </Button>
          <Button onClick={handleClose} color="danger">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
