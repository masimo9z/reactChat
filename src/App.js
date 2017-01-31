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

var socket;

var users = {};

var clock = {
    center: 300
};

var Message = React.createClass({
    render() {
        return (
            <div className="message" id="msgtpl">
                <img src={this.props.avatar} alt="Avatar" />
                <div className="info">
                    <span className="date">{this.props.h}:{this.props.m}</span>
                    <span className="name"><strong>{this.props.username}</strong></span>
                    <span className="messageContent">{this.props.text}</span>
                </div>
            </div>
      );
  }
});

var UsersList = React.createClass({
    render() {
        console.log(this.props.users);
        console.log(Object.values(this.props.users));

        return (
            <div className="aside">
                <div id="users">
                {
                    Object.values(this.props.users).map((user)=> {
                        
                        return (<img src={user.avatar} key={user.id} id={user.id} />);
                    })
                }
                </div>
            </div>
      );
  }
});

var MessageList = React.createClass({
  render() {
      return (
          <div className='messages'>
              <h2> Conversation: </h2>
              {
                  this.props.messages.map((message, i) => {
                      return (
                          <Message
                              key={i}
                              h={message.h}
                              m={message.m}
                              username={message.username}
                              text={message.text}
                          />
                      );
                  })
              }
          </div>
      );
  }
});

class App extends Component {
    constructor() {
        super(); // appel le constructeur du parent (ici Component)
        this.state = {
            connected : false,
            messageTpl : null,
            messages: [],
            users: {},
        };
    }
      render() {
        return (
            <div className="App">
                <div className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h2>Welcome to React</h2>
                </div>
                <div className="container">
                {
                    this.state.connected === false ? 
                       (
                            this.displayConnect()
                       )
                    :
                        (
                            this.displayFormMessage()
                        )
                }            
                <UsersList
                    users={this.state.users}
                />
                <MessageList
                    messages={this.state.messages}
                />
                </div>
          </div>
        );
      }

    updateNeedle(date = new Date()){
        this.setState({
            hours: date.getHours(),
            minutes: date.getMinutes(),
            secondes: date.getSeconds()
        });

    }


    changeBgColor(){
        var randomColor = colors.availableBgColors[Math.floor(Math.random() * colors.availableBgColors.length)];
        this.setState({watchBackground: randomColor});
        colors.watchBackground = randomColor;
    }

    newUser(e){
        e.preventDefault();
        var login = this.refs.login.value;
        var mail = this.refs.mail.value;
        socket = require('socket.io-client')('http://localhost:2412');
        this.initSocketOnLogin();
        socket.emit('login', {
            username : login,
            mail : mail
        })
        
        this.setState({connected: true});
        //this.updateNeedle(login);
    }
    
    displayConnect(){
        return(
            <div id="login">
                <h1>Bienvenue</h1>
                <p>Ceci est un test de Chat en NodeJs, entrez votre pseudo et votre email (utilisée pour l'avatar gravatar)</p>
                <form action="" id="loginForm">
                    <input type="text" name="login" ref='login' id="username" className="textInput" placeholder="Nom d'utilisateur" />
                    <input type="mail" name="mail" ref='mail' id="mail" className="textInput" placeholder="E-mail" />
                    <input type="submit" className="submitInput" value="Se connecter" onClick={this.newUser.bind(this)} />
                </form>
            </div>
        );
    }

    displayFormMessage(){
        return(
            <div className="wrapper">
                <div id="messageForm">
                    <form action="" id="form">
                        <input type="text" id="message" className="text" />
                        <input type="submit" id="send" className="submit" value="Envoyer mon message !" />
                    </form>
                </div>
            </div>
        );
    }
    
    initSocketOnLogin(){
        socket.on('newUsr', (user)=>{
            console.log(user);
            users = this.state.users;
            users[user.id] = user;
            this.setState({users:users})
        });
        socket.on('disUsr', (user)=>{
            console.log(this.state.users);
            delete this.state.users[user.id];
            this.setState({users:this.state.users})
        });
    }
    
    /***
    ** Gestion des connectés
    **/
    
}

export default App;
