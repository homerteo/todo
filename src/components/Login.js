import { useContext } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';

import { toDoContext } from './../context/ToDoContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25vw',
    },
    margin: '30px'
  },
  grid: {
    flexGrow: 1,
  },
  paper: {
    border: '1px solid',
    width: 'auto',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center'
  },
}));

const Login = () => {
  const classes = useStyles();
  const context = useContext(toDoContext);
  const { submitLogin } = context;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no es válido')
        .required('El email no puede ir vacio'),
      password: Yup.string()
        .required('El password es obligatorio')
    }),
    onSubmit: async (values, { resetForm, setErrors }) => {
        await submitLogin(values.email, values.password);
        resetForm({});
    }
  });

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item sm={12} md={6} >
        <Paper className={classes.paper} elevation={3}>
          <form
            className={classes.root}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            { formik.touched.email && formik.errors.email ? (
              <Alert severity="warning">{formik.errors.email}</Alert>
            ) : null}
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            { formik.touched.password && formik.errors.password ? (
              <Alert severity="warning">{formik.errors.password}</Alert>
            ) : null}
            <Button variant="contained" color="primary" type="submit">Entrar</Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;