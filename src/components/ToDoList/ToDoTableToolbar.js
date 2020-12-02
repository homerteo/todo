import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 50%',
  },
  search: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    justifyItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    }
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%'
  },
}));

const ToDoTableToolbar = (props) => {
  const classes = useStyles();

  return(
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Tabla de empleados
      </Typography>
      <Tooltip title="Escriba una palabra clave para filtrar las tareas">
        <div className={classes.search}>
        <TextField
            id="filter-input"
            label="Filtrar"
            variant="outlined"
            name="filter"
            // value={filter}
            // onChange={({ target }) => handleChange(target)}
          />
        </div>
      </Tooltip>
    </Toolbar>
  );
}

export default ToDoTableToolbar;