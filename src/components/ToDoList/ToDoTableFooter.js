import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { fade, makeStyles } from '@material-ui/core/styles';
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
  newTask: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    }
  },
  inputInput: {
    width: '100%'
  }
}));

const ToDoTableFooter = () => {
  const classes = useStyles();
  return(
    <Toolbar className={classes.root}>
      <Tooltip title="Escriba una nueva tarea">
        <Grid container className={classes.newTask}>
          <Grid item sm={9} className={classes.input}>
            <TextField
              id="text-input"
              label="Nueva tarea"
              variant="outlined"
              name="newTask"
              className={classes.inputInput}
              // value={filter}
              // onChange={({ target }) => handleChange(target)}
            />
          </Grid>
          <Grid item sm={3}>
            <Button variant="outlined" color="primary" size="large">
              Agregar
            </Button>
          </Grid>
        </Grid>
      </Tooltip>
    </Toolbar>
  );
}

export default ToDoTableFooter;