import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
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

export default function CategoryList(props) {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([]);
  
    React.useEffect(() =>
    {
        async function populateWeatherData() {
        const response = await fetch('api/Category/CategoryList');
        setData(await response.json());
      }
      populateWeatherData();
    }, [props.isRefresh])
    
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    function handleDelete(catId){
      const requestOptions = {
        method: 'DELETE'
      };
        fetch("/api/Category/DeleteCategory/" + catId, requestOptions).then((response) =>
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
   
    function handleEditById(catId){
      fetch('/api/Category/GetById/'+catId).then((response) =>
      response.json()
      ).then((data) => {
        props.setCategory(data.Item);
        props.setIsEdit(!props.isEdit);
      })   
    };
  
    return (
      <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
           <TableRow>
            <TableCell align="left">Category Id</TableCell>
            <TableCell align="left">Category Name</TableCell>
            <TableCell align="left">Availibility</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Edit</TableCell>
            <TableCell align="left">Delete</TableCell>
           </TableRow>
        </TableHead>
          <TableBody>
            {          
            (rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row) => (
                       <TableRow key={row.CId}>
                         <TableCell component="th" scope="row">
                           {row.CId}
                         </TableCell>
                         <TableCell align="left">{row.CName}</TableCell>
                         <TableCell align="left">{row.Status ? 'Available' : 'Unavailable'}</TableCell>
                         <TableCell align="left">{row.Description}</TableCell>
  
                         <TableCell align="left">
                            <Tooltip title="Edit">
                              <IconButton aria-label="Edit" onClick={() => handleEditById(row.CId)}>
                                <EditIcon/>
                              </IconButton>
                            </Tooltip>
                         </TableCell>
  
                         <TableCell align="left">
                            <Tooltip title="Delete">
                              <IconButton aria-label="delete" onClick={() => handleDelete(row.CId)}>
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
            )
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={Array.from(data).length}
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
      </>
    );
  }