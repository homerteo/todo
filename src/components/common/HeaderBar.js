import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { toDoContext } from "../../context/ToDoContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '10vh'
  },
  links: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%'
  },
  link: {
    color: 'white',
    '&:visited, &:active': {
      color: 'white'
    }
  }
}));

function HeaderBar() {
  const context = useContext(toDoContext);
  const classes = useStyles();
  const { accessToken, logout  } = context; 

  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.links}>
            {accessToken === null ? (
              null
          ) : (
            <>
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </>
          )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderBar;