import { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { getTodoList } from './../../api/todo';
import { toDoContext } from './../../context/ToDoContext';
import ToDoTableToolbar from './ToDoTableToolbar';
import ToDoTableHead from './ToDoTableHead';
import ToDoTableFooter from './ToDoTableFooter';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '25px 0 25px 25px',
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    width: '80vw',
    height: 'auto',
    marginBottom: theme.spacing(2),
  },
  container: {
    height: 'auto',
  },
  table: {
    minWidth: 750
  }
}));

const ToDoList = () => {
  const [taskList, setTask] = useState([]);
  const classes = useStyles();
  const context = useContext(toDoContext);
  const { initialAuthVerification } = context;

  const getTaskList = async () => {
    try {
      const data = await getTodoList();
      setTask(data);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    initialAuthVerification();
  }, []);

  useEffect(() => {
    getTaskList();
  }, [])

  return(
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <ToDoTableToolbar />
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="Lista de tareas"
          >
            <ToDoTableHead />
            <TableBody>
              {taskList.length > 0 && taskList.map((task, index) => {
                const labelId = `task-table-checkbox-${index}`;

                return(
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={task.id}
                  >
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                        {task.name}
                      </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Eliminar esta tarea">
                      <IconButton aria-label={`Eliminar la tarea ${task.name}`}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <ToDoTableFooter />
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default ToDoList;