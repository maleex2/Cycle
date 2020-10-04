import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import app from "./base";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Ride from "./Ride";
import MyRides from "./MyRides";
import Leaderboards from "./Leaderboards";
import MyAccount from "./MyAccount";
import About from "./About";
import Settings from "./Settings";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import "./styles.css";

let element = document.body;
element.classList.toggle("dark-mode");
if(localStorage.getItem('dark_mode_enabled') === null){
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
}
else if(localStorage.getItem('dark_mode_enabled') === "true"){
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
}
else if(localStorage.getItem('dark_mode_enabled') === "false"){
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
}

class App extends Component {
    state = { loading: true, authenticated: false, user: null };

    componentDidMount() {
        app.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    authenticated: true,
                    currentUser: user,
                    loading: false
                });
            } else {
                this.setState({
                    authenticated: false,
                    currentUser: null,
                    loading: false
                });
            }
        });
    }

    render() {
        const { authenticated, loading } = this.state;

        if (loading) {
            return <div className="loader"><p className="please_wait">Loading...</p></div>;
        }

        return (

            <Router>
                <div>
                    <div className="App">
                        <Sidebar />
                        <div id="page-wrap">
                            <h1>Cycling Support App</h1>

                        </div>
                    </div>
                    <PrivateRoute
                        exact
                        path="/"
                        component={Home}
                        authenticated={authenticated}
                    />
                    <PrivateRoute
                        exact
                        path="/ride"
                        component={Ride}
                        authenticated={authenticated}
                    />
                    <PrivateRoute
                        exact
                        path="/myrides"
                        component={MyRides}
                        authenticated={authenticated}
                    />
                    <PrivateRoute
                        exact
                        path="/leaderboards"
                        component={Leaderboards}
                        authenticated={authenticated}
                    />
                    <PrivateRoute
                        exact
                        path="/settings"
                        component={Settings}
                        authenticated={authenticated}
                    />
                    <PrivateRoute
                        exact
                        path="/myaccount"
                        component={MyAccount}
                        authenticated={authenticated}
                    />
                    <PrivateRoute
                        exact
                        path="/about"
                        component={About}
                        authenticated={authenticated}
                    />
                    <Route exact path="/login" component={LogIn} />
                    <Route exact path="/signup" component={SignUp} />
                </div>
            </Router>
        );
    }
}

export default App;
