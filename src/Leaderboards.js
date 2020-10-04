import React from "react";
import { FaTrophy, FaStar, FaUser } from 'react-icons/fa';
import { GiPodium, GiPodiumWinner, GiPodiumSecond, GiPodiumThird } from 'react-icons/gi';
import firebase from "firebase";
import ReactDOM from "react-dom";
let leaderBoard;
let allUsers;

export default () => {


    return (
        <div className="leaderboards">
            <h1><FaTrophy/> Leaderboards</h1>
            <button className={"grd"} onClick={() =>onGetDataClick()}>Get Ride Data</button>
            <p className="myrides-tab"> <GiPodium/> Position | <FaUser/> Username | <FaStar/> Score</p>
            <div id="data"> </div>
        </div>
    );

    function onGetDataClick(){
        leaderBoard = [];
        allUsers = [];
        let database = firebase.database();
        let ref = database.ref('users');
        ref.on('value', gotUserData);
    }

    function gotUserData(data){
        let database = firebase.database();
        let users = data.val();
        if(users === null){
            //console.log("No stored data!")
            ReactDOM.render(
                <p className={"dataErr"}>There is no user data!</p>,
                document.getElementById('data')
            );
        }
        else{
            let keys = Object.keys(users);
            for(let i = 0; i < keys.length; i++){
                let k = keys[i];
                let username = users[k].username;
                let user = {username:username, id:k};
                allUsers.push(user);
            }
            let ref = database.ref("myrides");
            ref.on('value', gotRideData);
        }

    }

    function gotRideData(data){
        let rides = data.val();
        if (rides !== null) {
            for (let i = 0; i < allUsers.length; i++) {
                let userID = allUsers[i].id;
                let username = allUsers[i].username;
                let userRides = rides[userID];
                if (userRides !== undefined) {
                    let keys = Object.keys(userRides);
                    let bestScore = "000000";
                    for (let i = 0; i < keys.length; i++) {
                        let k = keys[i];
                        if(parseInt(bestScore) < parseInt(userRides[k].score)){
                            bestScore = userRides[k].score;
                        }
                    }
                    //console.log("The best score for user " + username + " is " + bestScore);
                    let userScore = {username: username, score: bestScore};
                    leaderBoard.push(userScore);
                }
            }
            // leaderBoard.push({username: "user1", score: "050024"});
            // leaderBoard.push({username: "user2", score: "002048"});
            // leaderBoard.push({username: "user3", score: "100000"});
            // leaderBoard.push({username: "user4", score: "002048"});
            // leaderBoard.push({username: "user5", score: "050024"});
            leaderBoard.sort(sortLeaderBoard);
            let lb = [];
            let l = Math.min(leaderBoard.length, 10);
            let i = 0;
            while (i < l) {
                let score = leaderBoard[i];
                i++;
                lb.push(i + " | " + score.username + " | " + score.score);
            }
            const listItems = lb.map((ride, index) =>
                <li className={"myRidesLi"} key={index}>{index === 0 ? <GiPodiumWinner/> : index === 1 ?
                    <GiPodiumSecond/> : index === 2 ? <GiPodiumThird/> : ""}{ride}</li>
            );

            ReactDOM.render(listItems, document.getElementById('data'));
        }
    }

    function sortLeaderBoard(a, b){
        if(parseInt(a.score, 10) > parseInt(b.score, 10)){
            return -1;
        }else if(parseInt(a.score, 10) < parseInt(b.score, 10)){
            return 1;
        }else if(a.username < b.username){
            return -1;
        }else if(a.username > b.username){
            return 1;
        }else{
            return 0;
        }
    }

};

