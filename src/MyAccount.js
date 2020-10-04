import React from "react";
import { MdAccountBox } from 'react-icons/md';
import firebase from "firebase";
import ReactDOM from "react-dom";
let user_id = null;
let username, email, last_name, contact_number, residence, DOB, first_name = "Not set!";
let resetVar = false;

firebase.auth().onAuthStateChanged(function(user) {
    resetVar = false;
    if (user) {
        user_id = user.uid;
    } else {
        console.log("User not set!!");
    }
});
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            border: 0,
            height: 1

        }}
    />
);

const asyncOperation = () => new Promise(resolve => setTimeout(resolve, 1000))

class MyAccount extends React.Component {

    constructor() {
        super()

        this.state = {
            loading: false,
        }

        this.initialiseDB();
        this.handleClick = this.handleClick.bind(this);
        this.handleGo = this.handleGo.bind(this)
    }


    handleClick() {
        this.setState({
            loading: true
        })

        asyncOperation()
            .then(() => {
                resetVar = true;
                this.setState({
                    loading: false,
                }, () => {
                    console.log('State updated.')
                })
            })
    }

    initialiseDB(){
        let database = firebase.database();
        let ref = database.ref("users/"+user_id);
        ref.on('value', this.getData)
    }

    getData(data){
        let values = data.val();
        if(values === null){
            console.log("Not got the data yet...");
        }
        else {
            console.log("Got the data!")
            last_name = values.last_name;
            contact_number = values.contact_number;
            username = values.username;
            email = values.email;
            residence = values.residence;
            DOB = values.DOB;
            first_name = values.first_name;
        }
    }

    render() {

        return (

            <div className="myrides">

                <h1><MdAccountBox/> My Account</h1>

                <button className={"grd"} onClick={this.handleClick}>Get Account Data</button>
                {this.state.loading && <p>Retrieving data...</p>}
                <form onSubmit={this.handleSubmit}>
                    <p className= { resetVar ? "myacc-label" : "hidden"}><strong>First name:</strong> {first_name}</p>
                    <p className= { resetVar ? "myacc-label" : "hidden"}><strong>Last name:</strong> {last_name}</p>
                    <p className= { resetVar ? "myacc-label" : "hidden"}><strong>Contact no:</strong> {contact_number}</p>
                    <p className= { resetVar ? "myacc-label" : "hidden"}><strong>DOB:</strong> {DOB}</p>
                    <p className= { resetVar ? "myacc-label" : "hidden"}><strong>Residence:</strong> {residence}</p>
                    <div className= { resetVar ? "myacc-p" : "hidden"}>
                        <ColoredLine  color="black" /></div>
                    <p className= { resetVar ? "myacc-p" : "hidden"}> Personalise your account below:</p>
                    <div className= { resetVar ? "myacc-p" : "hidden"}>
                        <ColoredLine  color="black" /></div>

                    <p className={ resetVar ? "display" : "hidden" }>First name:
                        <input className={ resetVar ? "details" : "hidden" } type="text" maxLength="12" name = "first_name" value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    </p>
                    <p className={ resetVar ? "display" : "hidden" }>Last name:
                        <input className={ resetVar ? "details" : "hidden" } type="text" maxLength="15" name = "last_name" value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    </p>
                    <p className={ resetVar ? "display" : "hidden" }>Contact no:
                        <input className={ resetVar ? "details" : "hidden" } type="text" maxLength="11" name = "contact_number" value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    </p>
                    <p className={ resetVar ? "display" : "hidden" }>DOB:
                        <input className={ resetVar ? "details" : "hidden" } type="date" name = "DOB" value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    </p>
                    <p className={ resetVar ? "display" : "hidden" }>Residence:
                        <input className={ resetVar ? "details" : "hidden" } type="text" maxLength="20" name = "residence" value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    </p>
                    <br/>
                    <input onClick={() => this.handleGo()} className={ resetVar ? "grd-submit" : "hidden" } type="submit" value="Submit Changes"/>
                </form>
            </div>
        );
    }


    handleChange(e) {

        this.setState(
            { [e.target.name] : e.target.value },
        );

        switch(e.target.name) {
            case 'first_name':
                first_name = e.target.value;
                break;
            case 'last_name':
                last_name = e.target.value;
                break;
            case 'contact_number':
                contact_number = e.target.value;
                break;
            case 'DOB':
                DOB = e.target.value;
                break;
            case 'residence':
                residence = e.target.value;
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    handleGo(){

        const r = window.confirm("Are you sure you want to submit these changes?");
        if(r) {
            let database = firebase.database();
            let ref = database.ref("users/"+user_id);
            let data = {
                first_name: first_name,
                last_name: last_name,
                username : username,
                email: email,
                DOB: DOB,
                contact_number: contact_number,
                residence: residence,
            }
            ref.set(data);
            alert("Account updated successfully!");
            resetVar = false;
        }

        else{
            resetVar = false;
        }
    }


}

ReactDOM.render(
    <MyAccount />,
    document.getElementById('root')
);



export default MyAccount;
