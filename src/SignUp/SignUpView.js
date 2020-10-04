import React from "react";
import { FaPen } from 'react-icons/fa';
import {Link} from "react-router-dom";

const SignUpView = ({ onSubmit }) => {
  return (
      <div className="loginview"><br/>
        <h1>Register <FaPen/></h1>
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
          <button className="loginlogoutbutton" type="submit">Register</button>
        </form><br/>
          <div className="hover-container">
              <p> Already have an account?
                  <Link className= "links" to="/login">Log in</Link>
              </p>
          </div>
      </div>
  );
};




export default SignUpView;


