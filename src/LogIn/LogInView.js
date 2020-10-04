import React from "react";
import { FiLogIn } from 'react-icons/fi';
import "../styles.css";
import {
  Link
} from "react-router-dom";


const LogInView = ({ onSubmit }) => {
  return (

    <div className="loginview"><br/>
      <h1>Log in <FiLogIn/></h1>
      <form onSubmit={onSubmit}>
        <label className="loginlogoutlabel">
          Email:<br/>
          <input
            name="email"
            type="email"
            placeholder="Enter your e-mail"
            className="loginlogoutinput"
          />
        </label><br/>
        <label className="loginlogoutlabel">
          Password:<br/>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="loginlogoutinput"
          />
        </label><br/>
        <button className="loginlogoutbutton" type="submit">Log in</button>
      </form><br/>

      <div className="hover-container">
      <p> Don't have an account?
        <Link className= "links" to="/signup">Create one!</Link>
      </p>
      </div>
    </div>
  );
};




export default LogInView;
