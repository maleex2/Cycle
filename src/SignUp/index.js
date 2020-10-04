import React, { Component } from "react";
import { withRouter } from "react-router";
import SignUpView from "./SignUpView";
import app from "../base";
import firebase from "firebase";
let user_id = null;
let account_created = false;
let arr = [];

function stripDomain(email){
  return email.substring(0, email.indexOf('@'));
}

function pullUsernames(){
  let database = firebase.database();
  let ref = database.ref('users');
  ref.on('value', gotUsernames);
}

function gotUsernames(data) {
  let users = data.val();
  if (users === null) {
    console.log("No stored data!")

  } else {
    let keys = Object.keys(users);
    let usersArr = []
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      let curUsername = stripDomain(users[k].email);
      usersArr.push(curUsername)
    }
    arr = usersArr;
  }
}
class SignUpPage extends Component {

  SignUpHandler = async event => {
    // Don't reload, get target form
    event.preventDefault();
    pullUsernames();

    const { email, password } = event.target.elements;
    try {
      await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user_id = user.uid;
          if(account_created) {
            makeUser(email.value, user_id);
            console.log("Account creation successful!");
            alert("Account created successfully!");
          }
        } else {
          console.log("User not set!!");
        }
      });

      this.props.history.push("/");
      account_created = true;



    } catch (error) {
      alert(error);
    }

    function makeUser(email, id){
      let username = email.substring(0, email.indexOf('@'));
      let chars = ["@", "!", "#", "?", "$", "~"];
        while(arr.includes(username)){
          let random_number = Math.floor(Math.random() * 100);
          let char = chars[Math.floor(Math.random() * chars.length)];
          random_number.toString();
          let num_char = random_number + char.toString();
          username += num_char;
        }


      let database = firebase.database();
      let ref = database.ref('users/'+id);
      let data = {
        email: email,
        username : username,
        first_name: "Not set!",
        last_name: "Not set!",
        DOB: "Not set!",
        contact_number: "Not set!",
        residence: "Not set!",
      };
      ref.set(data);
    }
  };




  render() {
    return <SignUpView onSubmit={this.SignUpHandler} />;
  }


}


export default withRouter(SignUpPage);
