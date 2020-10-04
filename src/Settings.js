import React from "react";
import { MdSettings } from 'react-icons/md';

class DarkMode extends React.Component {

    render() {
        function toggleDarkBody(){

            let param = localStorage.getItem('dark_mode_enabled')
            if (param === null){
                localStorage.setItem('dark_mode_enabled', false);
                document.body.style.backgroundColor = "black";
                document.body.style.color = "white";
                toggleDark(true)
            }
            else{
                toggleDark(param)
            }
        }

        function toggleDark(param){
            switch(param) {
                case 'true':
                    document.body.style.backgroundColor = "white";
                    document.body.style.color = "black";
                    localStorage.setItem('dark_mode_enabled', false);
                    break;
                case 'false':
                    document.body.style.backgroundColor = "black";
                    document.body.style.color = "white";
                    localStorage.setItem('dark_mode_enabled', true);
                    break;
                default:
                    console.log("Problem...")
            }
        }


        /*DO NOT DELETE! --- the only way I was able to get it to finally work after several hours! - JO*/
        // eslint-disable-next-line
        while(document.body.style.backgroundColor = "black" && localStorage.getItem('dark_mode_enabled') === 'false'){
                document.body.style.backgroundColor = "white"
                document.body.style.color = "black"
                return (

                    <div className={ "dark-mode-button switch-off" }
                         onClick={() => toggleDarkBody() > this.setState({active: !this.state.bing})}>
                        {this.state.bing ? 'ON' : 'OFF'}
                    </div>

                );
            }

        return (
            <div className={ this.state.active ? "dark-mode-button switch-on" : "dark-mode-button switch-off" }
                 onClick={() => toggleDarkBody() > this.setState({active: !this.state.active})}>
                {this.state.active ? 'ON' : 'OFF'}
            </div>
        );
    }
    state = {
        active : localStorage.getItem('dark_mode_enabled'),
        bing : false,
    }
}

export default () => {
    return (

        <div className="settings">
            <h1><MdSettings/> Settings</h1>
            <h2>Dark Mode</h2>
            <DarkMode/>
        </div>
    );
};

