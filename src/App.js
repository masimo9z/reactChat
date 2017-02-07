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
                <div className={this.props.isMine ? "message right-msg" : "message left-msg"} id="msgtpl">
                {this.props.isMine ? null :<img src={this.props.avatar} alt="Avatar" />}
                    <div className="info">
                        <span className="date">{this.props.h}:{this.props.m}</span>
                        <span className="name"><strong>{this.props.username}</strong></span>
                        <span className="messageContent">{this.props.text}</span>
                    </div>
                {this.props.isMine ? <img src={this.props.avatar} alt="Avatar" /> : null}
                </div>
            );
    }
});

var UsersList = React.createClass({
    render() {
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
            <div id='messages'>
                <h2> Conversation: </h2>
                {
                    Object.values(this.props.messages).map((message, i)=> {
                    console.log('MessageListClass');
                    return (
                        <Message
                            key={i}
                            id={message.user.id}
                            isMine={this.props.login === message.user.id}
                            h={message.h}
                            m={message.m}
                            username={message.user.username}
                            avatar={message.user.avatar}
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
                    <div className="wrapper">
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
                    <MessageList
                        messages={this.state.messages}
                        login={this.state.login}
                    />
                    </div>
                <UsersList
                    users={this.state.users}
                />
                </div>
          </div>
        );
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
        this.initSocket();        
        socket.emit('login', {
            username : login,
            mail : mail
        });
        this.state.login = mail;
        
        this.setState({connected: true});
        //this.updateNeedle(login);
    }

    newMessage(e){
        e.preventDefault();
        var message = this.refs.message.value;
        socket.emit('newMsg', {
            text : message
        })
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
            <div id="messageForm">
                <form action="" id="form">
                    <input type="text" id="message" ref='message' className="text" />
                    <input type="submit" id="send" className="submit" value="Envoyer mon message !" onClick={this.newMessage.bind(this)} />
                </form>
            </div>
        );
    }
    
    initSocket(){
        socket.on('newUsr', (user)=>{
            users = this.state.users;
            users[user.id] = user;
            this.setState({users:users})
        });
        socket.on('disUsr', (user)=>{
            delete this.state.users[user.id];
            this.setState({users:this.state.users})
        });
        socket.on('newMsg', (message)=>{
            console.log("new message ");
            console.log(message);
            this.setState({messages:this.state.messages.concat(message)});
            
        });
    }
    
    /***
    ** Gestion des connectés
    **/
    
}

export default App;
