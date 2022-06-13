import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import recallogo from '../../images/recallogo.png';
import decode from 'jwt-decode'
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

    navigate('auth/');

    setUser(null);
  };

  //Muestra el usuario logeado sin necesidad de refrescar
  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  
    return (
    <AppBar className={classes.appBar} position="static" color="inherit">
    <Link to={"/"} className={classes.brandContainer}>
    <img className={classes.image} src={recallogo} alt="icon" height="60" />
    </Link>
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