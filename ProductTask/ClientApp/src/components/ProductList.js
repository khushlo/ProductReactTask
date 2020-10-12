import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

ProductList.propTypes = {
  
};

function ProductList(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [isRefresh,setRefresh] = React.useState(false);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  React.useEffect(() =>
  {
      async function populateProductData() {
      const response = await fetch('api/Product/GetProductList');
      const res = await response.json();
      setData(res.Item);
    }
    populateProductData();
  }, [props.isRefresh])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleEditById(PId){
      debugger;
      fetch("/api/Product/GetById/" + PId).then((response) =>
        response.json()
        ).then((data) => {
          debugger;
          props.setProduct(data.Item);
          props.setIsEdit(!props.isEdit);
        })    
    };

  function handleDelete(PId){
    const requestOptions = {
      method: 'DELETE'
    };
      fetch("/api/Product/DeleteProduct/" + PId, requestOptions).then((response) =>
        response.json()
        ).then((data) => {
          if(data.Message != null){
            props.setMessage(data.Message);
          }
          if(data.Error != null){
            props.setError(data.Error);
          }    
        props.setRefresh(!props.isRefresh);        
      }).catch(err => props.setError(err));
  };

  return (
    <div>
       <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
         <TableRow>
          <TableCell align="left">Product Id</TableCell>
          <TableCell align="left">Product Name</TableCell>
          <TableCell align="left">Product Cost</TableCell>
          <TableCell align="left">Availibility</TableCell>
          <TableCell align="left">Description</TableCell>
          <TableCell align="left">Categories</TableCell>
          <TableCell align="left">Edit</TableCell>
          <TableCell align="left">Delete</TableCell>
         </TableRow>
      </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            <TableRow key={row.PId}>
              <TableCell align="left" style={{ width: 100 }}>
                {row.PId}
              </TableCell>
              <TableCell>
                {row.PName}
              </TableCell>
              <TableCell align="left" style={{ width: 100 }} >
                {row.Cost}
              </TableCell>
              <TableCell align="left">
                {row.Status ? 'Available' : 'Unavailable'}
              </TableCell>
              <TableCell align="left">
                {row.Description}
              </TableCell>
              <TableCell>
                {row.Categories}
              </TableCell>

              <TableCell align="left">
                <Tooltip title="Edit">
                  <IconButton aria-label="Edit" onClick={() => handleEditById(row.PId)}>
                    <EditIcon/>
                  </IconButton>
                </Tooltip>
              </TableCell>

              <TableCell align="left">
                <Tooltip title="Delete">
                  <IconButton aria-label="delete" onClick={() => handleDelete(row.PId)}>
                    <DeleteIcon/>
                  </IconButton>
                </Tooltip>
              </TableCell>

            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </div>
  );
}

export default ProductList;

