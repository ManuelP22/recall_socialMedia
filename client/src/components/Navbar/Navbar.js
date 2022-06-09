import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from '../../images/memories.png';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import useStyles from "./styles"

const Navbar = () => {
  const classes = useStyles();

  //Mostrar el usuario en el navbar
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //Cuando se deslogen envia al homepage
  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    navigate('/');

    setUser(null);
  };

  //Muestra el usuario logeado sin necesidad de refrescar
  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  
    return (
    <AppBar className={classes.appBar} position="static" color="inherit">
    <div className={classes.brandContainer}>
    <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Recuerdos</Typography>
    <img className={classes.image} src={memories} alt="icon" height="60" />
    </div>
    <Toolbar className={classes.toolbar}>
        {user ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Cerrar Sesion</Button>
            </div>
         ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Iniciar Sesion</Button>
         )}
    </Toolbar>
  </AppBar>
  );
};

export default Navbar