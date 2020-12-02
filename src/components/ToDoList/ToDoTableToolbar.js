import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 50%',
  },
  filter: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    justifyItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    }
  }
}));

const ToDoTableToolbar = (props) => {
  const classes = useStyles();

  return(
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Lista de tareas
      </Typography>
      <div className={classes.filter}>
        <Tooltip title="Ver todas las tareas" aria-label="filtrar por todas las tareas">
          <IconButton>
            <FormatListBulletedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Ver solo las tareas terminadas" aria-label="filtrar por tareas terminadas">
          <IconButton>
            <CheckIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Ver solo las tareas pendientes" aria-label="filtrar por tareas pendientes">
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
}

export default ToDoTableToolbar;