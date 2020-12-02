import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
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
  const { numSelected, finishTasks } = props;

  return(
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Lista de tareas
      </Typography>
      {numSelected > 0 ? (
        <div>
          <Tooltip title="Marcar como finalizadas">
            <IconButton onClick={() => finishTasks()}>
              <PlaylistAddIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </div>
      ) : null}
      <div className={classes.filter}>
        <Tooltip title="Ver todas las tareas" aria-label="filtrar por todas las tareas">
          <IconButton>
            <FormatListBulletedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Ver solo las tareas terminadas" aria-label="filtrar por tareas terminadas">
          <IconButton>
            <AssignmentTurnedInIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Ver solo las tareas pendientes" aria-label="filtrar por tareas pendientes">
          <IconButton>
            <AssignmentLateIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
}

export default ToDoTableToolbar;