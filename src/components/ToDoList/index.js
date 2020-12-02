import { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ToDoTableToolbar from './ToDoTableToolbar';
import ToDoTableHead from './ToDoTableHead';
import ToDoTableFooter from './ToDoTableFooter';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { getTodoList, postTask, deleteTask } from './../../api/todo';
import { toDoContext } from './../../context/ToDoContext';

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
  },
  taskCell: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
}));

const ToDoList = () => {
  const [state, setState] = useState({
    taskList: [],
    filteredTaskList: [],
    newTask: ''
  });
  const [selected, setSelected] = useState([]);
  const classes = useStyles();
  const context = useContext(toDoContext);
  const { initialAuthVerification } = context;

  const getTaskList = async () => {
    try {
      const data = await getTodoList();
      setState(prevState => (
        {
          ...prevState,
          taskList: data,
          filteredTaskList: data
        }
      ));
    } catch(error) {
      console.error(error);
    }
  }

  const addTask = async () => {
    try {
      const { newTask } = state;
      const data = {
        name: newTask,
        state: 'pending'
      }
      await postTask(data);
      await getTaskList(data);
      setState(prevState => (
        {
          ...prevState,
          newTask: ''
        }
      ));
    } catch(error) {
      console.error(error)
    }
  }

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      await getTaskList();
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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleChange = (target) => {
    const {name, value} = target;
    console.log(name, value);
    setState(prevState => (
      {
        ...prevState,
        [name]: value
      }
    ))
  }

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
              {state.taskList.length > 0 && state.filteredTaskList.map((task, index) => {
                const labelId = `task-table-checkbox-${index}`;
                const isItemSelected = isSelected(task.name);

                return(
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, task.name)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={task.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <div className={classes.taskCell}>
                        {task.state === 'pending' ? (
                          <CloseIcon color="primary" fontSize="large" />
                        ) : (
                          <CheckIcon color="secondary" fontSize="large" />
                        )}
                        {task.name}
                      </div>
                    </TableCell>
                    <TableCell align="right">
                    <Tooltip title="Eliminar esta tarea">
                      <IconButton
                        aria-label={`Eliminar la tarea ${task.name}`}
                        onClick={() => removeTask(task.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <ToDoTableFooter
                numSelected={selected.length}
                numTasks={state.taskList.length}
                handleChange={handleChange}
                newTask={state.newTask}
                addTask={addTask}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default ToDoList;