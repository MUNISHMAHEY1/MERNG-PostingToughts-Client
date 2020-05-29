import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../context/AuthContext';

function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/'? 'home' : pathname.substr(1)
    
    const [ activeItem, setActiveItem ] = useState(path);
    const handleClick = (e, { name }) => setActiveItem(name);

    const menuBar = user ? (
        <Menu pointing secondary size="massive" color='teal' className="menubar">
            <Menu.Item 
                name="home"
                active={ activeItem === 'home'}
                onClick={handleClick}
                as={Link}
                to="/"
                /> 
            <Menu.Menu position="right">
                <Menu.Item 
                    name={user.username}
                    as={Link}
                    to={`/users/${user.id}`}
                    style={{color:"blue", fontWeight:"bold"}}
                    /> 
                <Menu.Item 
                    name="logout"
                    onClick={logout}
                    /> 
            </Menu.Menu>    
        </Menu>
    ): (
        <Menu pointing secondary size="massive" color='teal' className="menubar">
            <Menu.Item 
                name="home"
                active={activeItem === 'home'}
                onClick={handleClick}
                as={Link}
                to="/"
                />
            <Menu.Menu position="right">
                <Menu.Item 
                    name="login"
                    active={activeItem === 'login'}
                    onClick={handleClick}
                    as={Link}
                    to="/login"
                    />
                <Menu.Item 
                    name="register"
                    active={activeItem === 'register'}
                    onClick={handleClick}
                    as={Link}
                    to="/register"
                    />    
            </Menu.Menu>    
        </Menu>
    )

    return menuBar;
}

export default MenuBar
