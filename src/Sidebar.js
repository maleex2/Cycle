import React from "react";
import { slide as Menu } from "react-burger-menu";
import app from "./base";
import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaTrophy, FaClipboardList, FaPen} from 'react-icons/fa';
import { MdAccountBox, MdDirectionsBike, MdSettings} from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import firebase from "firebase";
import "./styles.css";

let logged = false;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("user set!");
        logged = true;
    } else {
        console.log("User not set!!");
        logged = false;
    }
});

export default class Sidebar extends React.Component {
    state = {
        menuOpen: false,
        userLogged: false
    };

    handleStateChange(state) {
        if (logged){
            this.setState({
                menuOpen: state.isOpen,
                userLogged: true
            });
        }
        else {
            this.setState({
                menuOpen: state.isOpen,
                userLogged: false
            });
        }

    }

    closeMenu() {

        if (logged){
            this.setState({
                menuOpen: false,
                userLogged: true
            });
        }
        else {
            this.setState({
                menuOpen: false,
                userLogged: false
            });
        }
    }

    render() {
        let isLoggedIn = this.state.userLogged;
        return (
            <Menu
                isOpen={this.state.menuOpen}
                onStateChange={state => this.handleStateChange(state)}>


                <Link onClick={() => this.closeMenu()} className="menu-item" to="/">
                    <FaHome/> Home
                </Link>
                <Link onClick={() => this.closeMenu()} className="menu-item" to="/ride">
                    <MdDirectionsBike/> Ride
                </Link>
                <Link onClick={() => this.closeMenu()} className="menu-item" to="/myrides">
                    <FaClipboardList/> My Rides
                </Link>
                <Link onClick={() => this.closeMenu()} className="menu-item" to="/leaderboards">
                    <FaTrophy/> Leaderboards
                </Link>
                <Link onClick={() => this.closeMenu()} className="menu-item" to="/myaccount">
                    <MdAccountBox/> My Account
                </Link>
                <Link onClick={() => this.closeMenu()} className="menu-item" to="/settings">
                    <MdSettings/> Settings
                </Link>
                <Link onClick={() => this.closeMenu()} className="menu-item" to="/about">
                    <FaInfoCircle/> About
                </Link><br/><br/>
                <Link onClick={() => app.auth().signOut() > this.closeMenu() > darkMode()} className="menu_item" to="/login">
                    <FiLogOut/> {isLoggedIn ? 'Logout' : 'Login'}
                </Link>


                <Link onClick={() => this.closeMenu()} className="menu-item" to="/signup">
                    {isLoggedIn ? '' : <FaPen/> } {isLoggedIn ? '' : 'Register' }
                </Link>
            </Menu>
        );

        function darkMode(){
            if(localStorage.getItem('dark_mode_enabled')) {
                document.body.style.backgroundColor = "white"
                document.body.style.color = "black"
            }
        }
    }
}

