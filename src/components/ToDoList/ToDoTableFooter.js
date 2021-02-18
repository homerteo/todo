import PropTypes from "prop-types";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%'
  },
  inputInput: {
    width: '100%'
  }
}));

const ToDoTableFooter = (props) => {
  const classes = useStyles();
  const { numSelected, numTasks, handleChange, newTask, addTask } = props;

  return(
      <TableRow>
        <TableCell padding='default' align='center' key='check'>
          Tareas: {numSelected}/{numTasks}
        </TableCell>
        <TableCell padding='default' align='right' key='task'>
          <Tooltip title="Escriba una nueva tarea">
            <>
              <TextField
                id="text-input"
                label="Nueva tarea"
                variant="outlined"
                name="newTask"
                className={classes.inputInput}
                value={newTask}
                onChange={({ target }) => handleChange(target)}
              />
            </>
          </Tooltip>
        </TableCell>
        <TableCell padding='default' align='center' key='delete'>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            disabled={newTask.length === 0}
            onClick={() => addTask()}
          >
            Agregar
          </Button>
        </TableCell>
      </TableRow>
  );
}

ToDoTableFooter.propTypes = {
  numSelected: PropTypes.number.isRequired,
  numTasks: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  newTask: PropTypes.string.isRequired,
  addTask: PropTypes.func.isRequired,
}

export default ToDoTableFooter;