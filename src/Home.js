import React from "react";
import { FaHome } from 'react-icons/fa';

export default () => {
    return (
        <div className="home">
            <h1><FaHome/>Home</h1>
            <p>Please use the navigation menu on the left to work your way through the app.</p>
            <p>Our app allows you to: </p>
            <ul className="check-list">
                <li>Measure your ride distances and times.</li>
                <li>Save, view and delete your personal rides.</li>
                <li>Compare your rides on a leaderboard with other users.</li>
                <li>Personalise your account profile.</li>
                <li>Toggle dark and light mode for cycling at different times of day.</li>
            </ul>
        </div>
    );
};

