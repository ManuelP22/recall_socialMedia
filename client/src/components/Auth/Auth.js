import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signup, signin } from "../../actions/auth.js"

import Icon from "./icon";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from './Input';
import useStyles from "./styles";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

function Auth() {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //sube los datos el login de la pagina
    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup){
            dispatch(signup(formData, navigate))
        } else  {
            dispatch(signin(formData, navigate))
        }
    };

    //selecciona los datos especificos de el form de inicio de secion
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };
    //gapi auth inicializa los datos del login para pasarlos al GoogleLogin
    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: '93708235388-tvsaqnesf1cgk869c2re2l833o2t0us1.apps.googleusercontent.com',
            scope: 'email',
          });
        }
    
        gapi.load('client:auth2', start);
      }, []);
        
    //Si el login fue exitoso guarda los datos de la autenticacion
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: {result, token} });
            //Envia directamente al homePage
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sing In ha fracasado intentelo denuevo mas tarde");
    };

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Registrarse' : 'Iniciar Sesion'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                           <>
                               <Input name="firstName" label="Nombre" handleChange={handleChange} half />
                               <Input name="lastName" label="Apellido" handleChange={handleChange} half />
                            </>
                       )}
                       <Input name="email" label="Correo Electronico" handleChange={handleChange} type="email"/>
                       <Input name="password" label="Contraseña" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                       { isSignup && <Input name="confirmPassword" label="Repetir Contraseña"handleChange={handleChange} type="password"/>}
                </Grid>
                <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">
                    {isSignup ? 'Registrarse' : 'Iniciar Sesion'}
                </Button>

                <GoogleLogin 
                    clientId="93708235388-tvsaqnesf1cgk869c2re2l833o2t0us1.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained"
                        >Google Sing in</Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justify='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Ya tienes una cuenta? Inicia sesion' : 'No tienes una cuenta? Registrate' }
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth