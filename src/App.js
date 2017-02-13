import React, { Component } from 'react';
import UsersList from './UsersList.js';
import MessageList from './MessageList.js';
import './App.css';

// NOTATION: Cela aurait été bien d'utiliser un routeur, ou bien aussi d'écrire des tests unitaires.

// NOTATION: Cela aurait été un peu plus compréhensible si tes différentes classes étaient dans des fichiers séparés
// NOTATION: évite les variables globales (socket, users)
var socket;

class App extends Component {
    constructor() {
        super();
        this.state = {
            connected : false,
            messages: [],
            users: {},
        };
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="wrapper">
                    {
                        this.state.connected ? this.displayFormMessage() : this.displayConnect()
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
        this.setState({login: mail, connected: true});
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
            var users = this.state.users;
            users[user.id] = user;
            this.setState({users:users})
        });
        socket.on('disUsr', (user)=>{
            delete this.state.users[user.id];
            this.setState({users:this.state.users})
        });
        socket.on('newMsg', (message)=>{
            this.setState({messages:this.state.messages.concat(message)});

        });
    }
    
}

export default App;
