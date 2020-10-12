import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from 'reactstrap';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles,useTheme } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
  
const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiFormControl-root": {
        width: "100%",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
      },
      "& .MuiInputBase-formControl":{
          width:"100%"
      },
      "& .MuiInputBase-formControl":{
      }
    },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
  }));

  function getStyles(name, categoryName, theme) {
    debugger;
    return {
      fontWeight:
      categoryName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }  

function ProductAdd(props) {
    const [open, setOpen] = React.useState(props.open);
    const [objModel,setModel] = React.useState(props.objModel);
    const [getValue,setvalue] = React.useState(props.initialValue);
    const [catName, setCatName] = React.useState(props.initialValue.Categories == undefined?[]:props.initialValue.Categories);
    const [getDDL,setDDl] = React.useState([]);
    const classes = useStyles();
    const theme = useTheme();   

    React.useEffect(() =>
    {
        async function selectDDL() {
        const response = await fetch('/api/Category/GetDDL');
        const data = await response.json();
        setDDl(data); 
        };
        selectDDL();
    }, [])

    const handleSaveProduct = e => {

        if(getValue.PName == ''){
          props.setError('Product Name must be non-empty');
          return;
        }
        else if(getValue.Categories.length == 0){
          props.setError('Select At least 1 Category');
          return;
        }
        if(!props.isEdit){        
            axios.post('api/product/AddProduct', getValue)
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
          axios.put('api/product/UpdateProduct', getValue)
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
           
    }

    const handleClose = () => {
      setOpen(false);
      props.setRefresh(!props.isRefresh); 
      props.setDialog(false);
      props.setIsEdit(false); 
    };

    const handleChange = (event) => {
          setvalue({
            ...getValue,
            Categories: event.target.value,
          }); 
        setCatName(event.target.value);               
      };

    const HandleInputChange = (e) => {
        const { name, value } = e.target;
        setvalue({
          ...getValue,
          [name]: value,
        });
      };

    return (
        <div>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Product</DialogTitle>

          <DialogContent>
            <form className ={classes.root}>

            <Grid container>
                <Grid item xs={6}>
                    <FormControl disabled>
                        <InputLabel htmlFor="component-disabled">Product Id</InputLabel>
                        <Input
                        htmlFor="component-disabled"
                        name="PId"
                        value={getValue.PId}
                        onChange={HandleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="outlined-basic"
                        label="Product Name"
                        variant="outlined"
                        name="PName"
                        value={getValue.PName}
                        onChange={HandleInputChange}
                    />
                </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={6}>
                <FormControl component="fieldset">
                <FormLabel component="legend">Availability</FormLabel>
                    <RadioGroup
                        aria-label="Availability"
                        name="Status"
                        value={parseInt(getValue.Status)}
                        onChange={HandleInputChange}
                    >
                    <FormControlLabel value={1} control={<Radio />} label="Available" />
                    <FormControlLabel value={0} control={<Radio />} label="Unavailable"/>
                </RadioGroup>
                </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="outlined-basic"
                        inputMode="decimal"
                        label="Product Cost"
                        variant="outlined"
                        name="Cost"
                        value={getValue.Cost}
                        onChange={HandleInputChange}
                    />  
                </Grid>
            </Grid>
            <Grid container>                
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-chip-label">Product Category</InputLabel>
                    <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={catName}
                        onChange={handleChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => 
                            (
                                <div className={classes.chips}>
                                {
                                    selected.map((value) => (<Chip key={value} label={value} className={classes.chip} />))
                                }
                                </div>
                            )}
                        MenuProps={MenuProps}
                     >
                    {
                        getDDL.map((name) => 
                        (<MenuItem key={name} value={name} style={getStyles(name, catName, theme)}> {name}</MenuItem>
                        ))
                    }
                    </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12}>
                    <TextField
                    multiline
                    rows={3}
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    name="Description"
                    value={getValue.Description}
                    onChange={HandleInputChange}
                    />
                </Grid>
            </Grid>

            </form>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleSaveProduct} color="success">
              Submit
            </Button>
            <Button onClick={handleClose} color="danger">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    );
}

export default ProductAdd;