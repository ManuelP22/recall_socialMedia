import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";

import Icon from "./icon";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from './Input';
import useStyles from "./styles";

function Auth() {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const [isSignup, setIsSignup] = useState(false);

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    };

    const googleSuccess = async (res) => {
        console.log(res);
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