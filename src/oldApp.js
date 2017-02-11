// NOTATION: Ce code n'a rien avoir avec ton projet
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var colors = {
            watchBorder: '#ecf56d',
            innerCircle: 'black',
            innerDot: 'white',
            needleColor: 'black',
            availableBgColors: ['#fff', '#4DD9FF', '#4BE89C', '#86FF5F', '#E8E24B', '#FFCD52']
};

var clock = {
    center: 300
};

function Needle(props){
        return(
            <line
                x1={props.center + getPosition(props.angle, props.length)[0]}
                y1={props.center + getPosition(props.angle, props.length)[1]}
                x2={props.center}
                y2={props.center}
                stroke={colors.needleColor}
                strokeWidth={props.width}
            />
        );
}

function getPosition(teta, size){
    return [Math.cos(teta) * size, -Math.sin(teta) * size];
}


class App extends Component {
    constructor() {
        super(); // appel le constructeur du parent (ici Component)
        this.state = {
            mode: 'mechanic',
            watchBackground: 'red'
        };
    }
    componentWillMount() {
         setInterval(this.updateNeedle.bind(this), 1000);
        this.updateNeedle()
    }

      render() {
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
            </div>


            <div className="forms">
                <label htmlFor="inputUpdate">Mettre à jour l'heure</label>
                <input type='time' ref='time' name='inputUpdate' id="inputUpdate" onClick={this.toggleMode} />
                <button id="updateTime" onClick={this.updateTime.bind(this)}>Mettre à jour</button>
            </div>
                {
                    this.state.mode === 'digital' ?
                       (
                            this.displayDigital()
                       )
                    :
                        (
                            this.displayMechanical()
                        )
                }
          </div>
        );
      }

    getTeta(numerator, divisor){
        return Math.PI/2 - Math.PI* numerator/divisor;
    }

    updateNeedle(date = new Date()){
        this.setState({
            hours: date.getHours(),
            minutes: date.getMinutes(),
            secondes: date.getSeconds()
        });

    }

    getFormattedTime(){
        // Will display time in 10:30:23 format
        return this.state.hours + ':' + this.state.minutes + ':' + this.state.secondes;
    }

    changeBgColor(){
        var randomColor = colors.availableBgColors[Math.floor(Math.random() * colors.availableBgColors.length)];
        this.setState({watchBackground: randomColor});
        colors.watchBackground = randomColor;
    }

    updateTime(e){
        var newDate = this.refs.time.valueAsDate;
        this.updateNeedle(newDate);
    }

    displayMechanical(){
        return(
            <div id="digitalTime" className="App-digital">
                <label htmlFor="displayAnalogic">Mode Analogique</label>
                <input type='checkbox' name='displayAnalogic' id="displayAnalogic" onClick={()=> this.setState({mode: 'digital'})} />
                <svg height="600" width="600">
                    <circle cx={clock.center} cy={clock.center} r="200" stroke={colors.watchBorder} strokeWidth="30" fill={this.state.watchBackground} onClick={this.changeBgColor.bind(this)} />

                    <Needle center={clock.center} angle={this.getTeta(this.state.hours, 6)} length={180} width={15} />
                    <Needle center={clock.center} angle={this.getTeta(this.state.minutes, 30)} length={150} width={8} />
                    <Needle center={clock.center} angle={this.getTeta(this.state.secondes, 30)} length={180} width={3} />

                    <circle cx={clock.center} cy={clock.center} r="10" stroke={colors.innerCircle} strokeWidth="8" fill={this.state.watchBackground} />
                </svg>
            </div>
        );
    }

    displayDigital(){
        return(
        <div id="analogicTime" className="App-analogic">
            <label htmlFor="displayMechanic">Mode Mécanique</label>
            <input type='checkbox' name='displayMechanic' id="displayMechanic" onClick={()=> this.setState({mode: 'mechanic'})} />
            <p>
                {this.getFormattedTime()}
            </p>
        </div>
        );
    }
}

export default App;
