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
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { getTodoList, postTask, deleteTask, patchTask } from './../../api/todo';
import { filterList } from './../../utils/filters';
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

  const finishTasks = async () => {
    await selected.forEach(async id => {
      try {
        await patchTask(id)
      } catch(error) {
        console.error(error);
      }
    })
    await getTaskList();
    setSelected([]);
  }

  const filterTasks = (taskState) => {
    const { taskList } = state;
    const filteredTaskList = filterList(taskList, taskState);
    setState(prevState => (
      {
        ...prevState,
        filteredTaskList
      }
    ));
  } 

  useEffect(() => {
    initialAuthVerification();
  }, []);

  useEffect(() => {
    getTaskList();
  }, [])

  const handleClick = (event, id, taskState) => {
    if (taskState!=='finished') {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
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
    }
    return;
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

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
        <ToDoTableToolbar
          numSelected={selected.length}
          finishTasks={finishTasks}
          filterTasks={filterTasks}
        />
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
                const isItemSelected = isSelected(task.id);

                return(
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, task.id, task.state)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={task.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                        disabled={task.state==='finished'}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <div className={classes.taskCell}>
                        {task.state === 'pending' ? (
                          <Tooltip title='Tarea pendiente'>
                            <PriorityHighIcon color="primary" fontSize="large" />
                          </Tooltip>
                        ) : (
                          <Tooltip title='Tarea finalizada'>
                            <CheckIcon color="secondary" fontSize="large" />
                          </Tooltip>
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