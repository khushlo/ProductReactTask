import ProductList from './ProductList';
import ProductAdd from './ProductAdd';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialValue = {
  PId:0,
  PName:'',
  Cost:0.00,
  Status:1,
  Description:'',
  Categories:[]
}

function Product(props) {
    const [getDialog,setDialog] = React.useState(false);
    const [isRefresh,setRefresh] = React.useState(false);
    const [getMessage,setMessage] = useState('');
    const [getError,setError] = useState('');
    const [open, setOpen] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [isEdit,setIsEdit] = React.useState(false);
    const [currentProduct, setProduct] = useState(initialValue);

      const handleClose = (event, reason) => {
        setMessage('');
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
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
       if(getMessage !== '' && getMessage !== null){
        setOpen(true);
       }      
     }
     DisplayMessage();

  }, [getMessage]);

  React.useEffect(() =>
    {
     function DisplayError(){
       if(getError !== '' && getError !== null){
        setOpenError(true);
       }      
     }
     DisplayError();
     
  }, [getError]);


  React.useEffect(() =>
  {
    function EditProduct(){
      setDialog(true);
     }
    if(isEdit){
      EditProduct();
    }   
}, [isEdit]);

    return (
        <div>
            <Button className="btn-primary" variant="primary" onClick={() => {setProduct(initialValue); setDialog(true);}}>Add Product</Button>
            <br/>
            <ProductList isEdit={isEdit} setIsEdit={setIsEdit} setProduct ={setProduct} isRefresh ={isRefresh} setRefresh={setRefresh} setMessage = {setMessage} setError={setError}></ProductList>
            {getDialog && <ProductAdd 
                              setIsEdit={setIsEdit} initialValue={currentProduct} setProduct ={setProduct} 
                              setMessage = {setMessage} setError={setError} open={true} isRefresh = {isRefresh} 
                              setRefresh={setRefresh} setDialog={setDialog} getDialog={getDialog}
                              isEdit={isEdit}/>}
                       
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                {getMessage}
              </Alert>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError}>
              <Alert onClose={handleCloseError} severity="error">
                {getError}
              </Alert>
            </Snackbar>
        </div>
    );
}

export default Product;