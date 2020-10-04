import React from "react";
import "./styles.css";
import firebase from "firebase";
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

let database = firebase.database();
let formattedTime = 0;
let formattedDistance = 0;
let formattedScore = 0;
let dist = 0;
let p = 0;


export default () => {

    return (
        <div className="ride">
            <div className="ride">
                <div className="App">
                    <Stopwatch />
                </div>
            </div>

        </div>

    );
}

let resetVar = false;
let finishVis = false;
let resetTime = 0;
let resetScore = 0;
let user_id = "null";
let resetDistance = 0;
let geolocation = true, curPos, oldPos;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        user_id = user.uid;
    } else {
        console.log("User not set!!");
    }
});

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);

        this.handleStopClick = this.onStopClick.bind(this);
        this.handleResetClick = this.onResetClick.bind(this);

        this.state = {
            time: 0,
            distance: 0,
            condition: true
        };
    }

    tick() {
        let newState = Object.assign({}, this.state);
        newState.time = newState.time + 1;
        this.setState(newState);
        if(this.state.time % 20 === 0) {
            this.updatePosition();
        }
    }

    onLocation(){
        function getPosition(pos){
            curPos = pos.coords;
            oldPos = pos.coords;
            geolocation = true;
        }
        if(navigator.geolocation) {
            console.log("Geolocation supported");
            this.onStartClick();
            navigator.geolocation.getCurrentPosition(getPosition, function (error) {
                console.log("Error occurred. Error code: " + error.code);
                geolocation = false;
            });
        }else{
            console.log("Location not supported");
            geolocation = false;
        }
    }

    updatePosition(){
        navigator.geolocation.watchPosition(function(position){

            function addDist(lat1, lon1, lat2, lon2){
                p+=1;
                let R = 6371000; //Earth's radius in m.
                let rLat1 = degToRad(lat1);
                let rLat2 = degToRad(lat2);
                let deltaLat = degToRad(lat2-lat1);
                let deltaLon = degToRad(lon2-lon1);
                let a = (Math.sin(deltaLat/2)) * (Math.sin(deltaLat/2))  + Math.cos(rLat1) * Math.cos(rLat2) * (Math.sin(deltaLon/2)) * (Math.sin(deltaLon/2));
                //let cc = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                let c = 2 * Math.asin(Math.min(1, Math.sqrt(a)));


                dist = dist  + (R * c);
                //dist = dist/1000;


                // let newState = Object.assign({}, this.state);
                // newState.distance = newState.distance + R*c;
                // this.setState(newState);
            }

            function degToRad(degrees){
                return degrees*(Math.PI/180);
            }

            oldPos = curPos;

            curPos = position.coords;
            let oldPosLat = oldPos.latitude;
            let oldPosLon = oldPos.longitude;
            let curPosLat = curPos.latitude;
            let curPosLon = curPos.longitude;

            addDist(oldPosLat, oldPosLon, curPosLat, curPosLon);

        }, function(error){
            alert("error in inc distance" + error.code);
        });
    }


    onStartClick() {
        if(!finishVis){
            dist = 0;
        }
        navigator.vibrate(200);
        this.beep();

        if (!this.interval) {
            this.interval = setInterval(this.tick.bind(this), 100);
            // eslint-disable-next-line react/no-direct-mutation-state

        }
        let newState = Object.assign({}, this.state);
        newState.condition = false;
        this.setState(newState);

        finishVis = true;
    }

    onStopClick() {


        if (this.interval) {
            navigator.vibrate(400);
            this.beep();
            clearInterval(this.interval);
            this.interval = null;
        }
        // eslint-disable-next-line react/no-direct-mutation-state
        let newState = Object.assign({}, this.state);
        newState.condition = true;
        this.setState(newState);
    }

    beep() {
        (new
        Audio(
            "data:audio/wav;base64,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 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
        )).play();
    }

    onResetClick() {

        resetTime = formattedTime;
        resetDistance = formattedDistance;
        resetScore = formattedScore;
        this.onStopClick();

        let newState = Object.assign({}, this.state);
        newState.time = 0;
        newState.distance = 0;
        dist = 0;
        newState.condition = true;
        this.setState(newState);

        resetVar = true;
        finishVis = false;
    }


    onYesClick(time, distance, score) {
        let ref = database.ref('myrides/' + user_id);
        let data = {
            time: time,
            distance: distance,
            score: score
        };
        console.log(user_id);
        ref.push(data);
        alert("Ride saved to My Rides!");

    }
    onNoClick(){
        let newState = Object.assign({}, this.state);
        newState.condition = true;
        this.setState(newState);

        resetVar = false;
    }


    render() {

        let hours = Math.floor(this.state.time / 36000);
        let minutes = Math.floor((this.state.time - (hours * 36000)) / 600);
        let seconds = Math.floor((this.state.time - (hours * 36000) - (minutes * 600))/10);
        let tenths = this.state.time - (hours * 36000) - (minutes * 600) - (seconds * 10);
        let dbTime = formattedTime;
        formattedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}.${tenths}`;

        let kilometers = Math.floor(dist/1000);
        let meters = Math.floor(dist-(kilometers*1000));
        let dbDistance = formattedDistance;
        formattedDistance = `${kilometers < 10 ? "0" + kilometers : kilometers}.${meters < 10 ? "00" + meters : meters < 100 ? "0" + meters : meters}`;

        let speed = (dist)/(this.state.time/10);
        let score = Math.round((dist) + speed*100);
        let dbScore = formattedScore;
        formattedScore = `${score < 1 ? "000000" : score < 10 ? "00000" + score : score < 100 ? "0000" + score : score < 1000 ? "000" + score : score < 10000 ? "00" + score : score < 100000 ? "0" + score : score}`;

        if(isNaN(formattedScore)){
            formattedScore = 0;
        }

        return (


            <div className="timer well">
                <h1 className="time">{formattedTime}</h1>
                <h1 className={ geolocation ? "hidden" : "display"}>Geolocation not supported.</h1><br/>
                <h1 className={ geolocation ? "distance" : "hidden"}>{formattedDistance} km</h1>
                <div className="btn-group">
                    <button className={ this.state.condition ? "button btn" : "hidden" } onClick={() => this.onLocation()}>Ride <FaPlay/></button>
                    <button className={ this.state.condition ? "hidden" : "button btn " } onClick={this.handleStopClick}>Pause <FaPause/></button>
                    <button className={ finishVis  ? "red btn" : "hidden" } onClick={this.handleResetClick}>Finish <FaStop/></button>
                </div><br/>
                <p><span className={ resetVar ? "display" : "hidden" }>Last time is: </span>
                    <span className={ resetVar ? "display num" : "hidden" }>{resetTime} </span></p>
                <p><span className={ resetVar ? "display" : "hidden" }>Last distance is: </span>
                <span className={ resetVar ? "display  num" : "hidden" }>{resetDistance} </span></p>
                <p><span className={ resetVar ? "display" : "hidden" }>Last score is: </span>
                <span className={ resetVar ? "display num" : "hidden" }>{resetScore}</span></p>
                <span className={ resetVar ? "display" : "hidden" }>Save your ride to My Rides?
                    <button className="btn1 yes" onClick={() =>this.onYesClick(dbTime, dbDistance, dbScore) > this.onNoClick()}>Yes</button>
                    <button className="btn1 no" onClick={() =>this.onNoClick()}>No</button>
                </span>

            </div>
        );
    }
}
