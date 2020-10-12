import CategoryAdd from './CategoryAdd';
import CategoryList from './CategoryList';
import React, { useState } from 'react';
import { Button } from 'reactstrap';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialvalues = {
  CId: 0,
  CName: "",
  Status: 1,
  Description: "",
};


export default function Category() {
  const [getDialog,setDialog] = React.useState(false);
  const [isRefresh,setRefresh] = React.useState(false);
  const [getMessage,setMessage] = useState('');
  const [getError,setError] = useState('');
  const [openMsg, setOpenMsg] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [isEdit,setIsEdit] = React.useState(false);
  const [currentCategory, setCategory] = useState(initialvalues);

  const handleClose = (event, reason) => {
    setMessage('');
    if (reason === 'clickaway') {
      return;
    }
    setOpenMsg(false);
  };

  const handleCloseError = (event, reason) => {
    setError('');
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };


React.useEffect(() =>
{
 function DisplayMessage(){
   if(getMessage != '' && getMessage != null){
    setOpenMsg(true);
   }      
 }
 DisplayMessage();

}, [getMessage]);

React.useEffect(() =>
{
 function DisplayError(){
   if(getError != '' && getError != null){
    setOpenError(true);
   }      
 }
 DisplayError();
 
}, [getError]);

React.useEffect(() =>
  {
    function Editcategory(){
      setDialog(true);
     }
    if(isEdit){
      Editcategory();
    }   
}, [isEdit]);


  return (
    <>
    <Button className="btn-primary" variant="primary" onClick={() =>{setCategory(initialvalues); setDialog(true);}}>Add Category</Button>
    <br/>
    {
      getDialog && <CategoryAdd 
                      getDialog={getDialog} setDialog={setDialog}
                      isRefresh ={isRefresh} setRefresh={setRefresh}
                      setMessage={setMessage}
                      setError={setError}                      
                      openMsg={openMsg} setOpenMsg={setOpenMsg}
                      openError={openError} setOpenError={setOpenError}
                      defaultCategory={currentCategory}
                      open={true} 
                      isEdit={isEdit} setIsEdit={setIsEdit}
                   />
    }
            <CategoryList 
                isRefresh ={isRefresh} 
                setRefresh={setRefresh}
                setMessage={setMessage}
                setError={setError}                      
                openMsg={openMsg} setOpenMsg={setOpenMsg}
                openError={openError} setOpenError={setOpenError}
                isEdit={isEdit} setIsEdit={setIsEdit}
                setCategory ={setCategory}
            />

          <Snackbar open={openMsg} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                {getMessage}
              </Alert>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError}>
              <Alert onClose={handleCloseError} severity="error">
                {getError}
              </Alert>
            </Snackbar>
    </>
  );
}