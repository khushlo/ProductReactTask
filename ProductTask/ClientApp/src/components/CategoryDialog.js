import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Categoryform from './Categoryform';

export function handleEdit(objCat){
  return(
    <CategoryDialog objModel={objCat} open={true} ></CategoryDialog>
  )
} 

export default function CategoryDialog(props)
{     
    const [open, setOpen] = React.useState(props.open);
    const [objModel,setModel] = React.useState(props.objModel);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      props.setRefresh(!props.isRefresh); 
    };

    React.useEffect(() =>
    {
      // handleClickOpen();
      
    },[objModel])
    
    return (
      <>
        <Button className="btn-primary" variant="primary" onClick={handleClickOpen}>Add New Category</Button>{' '}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Category</DialogTitle>

          <DialogContent>
            <Categoryform CloseForm={handleClose} objModel={objModel}/>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="danger">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
}
