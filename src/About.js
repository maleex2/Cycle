import React from "react";
import { FaJs, FaCss3Alt, FaHtml5, FaInfoCircle, FaReact} from 'react-icons/fa';


export default () => {
    return (
        <div className="about">
            <h1><FaInfoCircle/> About</h1><br/>

            <h2>Details:</h2>
            <p className="aboutP">This app was created as part of coursework for the class CS317 @ The University of Strathclyde</p>
            <ul className="about_ul">
                <li>App created by Group Q:</li>
                <li>Martin Aleksandrov, David Peter Caldwell, Gavin Irving, Dominik Meyer and James O'Donnell</li>
            </ul>
            <h2>Languages used:</h2>
            <ul className="about_ul">
                <li>HTML5 <FaHtml5/></li>
                <li>CSS3 <FaCss3Alt/></li>
                <li>JavaScript <FaJs/></li>
            </ul>
            <h2>Frameworks used:</h2>
            <ul className="about_ul">
                <li>React App <FaReact/></li>
                <li>React Native <FaReact/></li>
                <li>Node.js</li>
                <li>NPM API</li>
            </ul>
        </div>
    );
};

