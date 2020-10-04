import React from "react";
import ReactDOM from 'react-dom'
import { FaClipboardList, FaStopwatch, FaStar, FaTrashAlt } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import firebase from "firebase";
let user_id = null;

export default () => {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user_id = user.uid;
        } else {
            console.log("User not set!!");
        }
    });

    return (
        <div className="myrides">
            <h1><FaClipboardList/> My Rides</h1>
            <button className={"grd"} onClick={() =>onGetDataClick()}>Get Ride Data</button>
            <p className="myrides-tab"><GiPathDistance/> Distance (km) | <FaStopwatch/> Time | <FaStar/> Score</p>
                <div id="data"> </div>
        </div>


);

    function onGetDataClick(){
        let database = firebase.database();
        let ref = database.ref('myrides/'+user_id);
        ref.on('value', gotData)
    }

    // Deleting ride from database
    function onTrashClick(k){
        const r = window.confirm("Are you sure you want to delete this ride?");
        if(r) {
            let something = 'myrides/'+user_id+ '/'+k;
            firebase.database().ref(something).remove()
        }
    }

    function gotData(data) {

        let values = data.val();
        if(values === null){
            console.log("No stored data!");
            ReactDOM.render(
                <p className={"dataErr"}>You do not have any saved rides!</p>,
                document.getElementById('data')
            );
        }

        else {
            let keys = Object.keys(values);
            let myrides = [];

            for (let i = 0; i < keys.length; i++) {
                let k = keys[i];
                let distance = values[k].distance;
                let time = values[k].time;
                let score = values[k].score;
                myrides.push(<div>{distance} | {time} | {score} |
                    <button className={"trash"} onClick={() =>onTrashClick(k) > onGetDataClick()}><FaTrashAlt/></button></div>);
            }

            const listItems = myrides.map((ride, index) =>
                <li className={"myRidesLi"} key={index}>{ride}</li>
            );

            ReactDOM.render(listItems, document.getElementById('data'));

        }

    }

};

