import React, { Component } from 'react';
import UsersList from './UsersList.js';
import MessageList from './MessageList.js';
import './App.css';

var Scroll  = require('react-scroll');

var Link       = Scroll.Link;
var Element    = Scroll.Element;
var Events     = Scroll.Events;
var scroll     = Scroll.animateScroll;
var scrollSpy  = Scroll.scrollSpy;

// NOTATION: Cela aurait été bien d'utiliser un routeur, ou bien aussi d'écrire des tests unitaires.
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
                    <UsersList
                        users={this.state.users}
                    />
                    <div className="wrapper">
                    <MessageList
                        messages={this.state.messages}
                        login={this.state.login}
                    />
                    {
                        this.state.connected ? this.displayFormMessage() : this.displayConnect()
                    }
                    </div>
                </div>
          </div>
        );
    }

    newUser(e){
        e.preventDefault();
        var login = this.refs.login.value;
        var mail = this.refs.mail.value;
        if(login !== '' && mail !== ''){
            socket = require('socket.io-client')('http://localhost:2412');
            this.initSocket();
            socket.emit('login', {
                username : login,
                mail : mail
            });
            this.setState({login: mail, connected: true});
        }
    }

    newMessage(e){
        e.preventDefault();
        var message = this.refs.message.value;
        if(message !== ''){
            socket.emit('newMsg', {
                text : message
            })
            this.refs.message.value = '';
        }
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
                <a className="scrollToTop" href="#" onClick={this.scrollToTop()}><i className="fa fa-arrow-up fa-2x" aria-hidden="true"></i></a>
                <form action="" id="form">
                    <input type="text" id="message" ref='message' className="text" placeholder="Saisissez votre message ..."/>
                    <button type="submit" id="send" className="submit" onClick={this.newMessage.bind(this)}><i className="fa fa-paper-plane fa-2x" aria-hidden="true"></i></button>
                </form>
            </div>
        );
    }

    initSocket(){
        socket.on('newUsr', (user)=>{
            var users = this.state.users;
            users[user.id] = user;
            this.setState({users:users});
            localStorage.setItem('users', JSON.stringify(users));
        });
        socket.on('disUsr', (user)=>{
            delete this.state.users[user.id];
            this.setState({users:this.state.users});
        });
        socket.on('newMsg', (message)=>{
            this.setState({messages:this.state.messages.concat(message)});
            localStorage.setItem('users', JSON.stringify(this.state.messages));
            this.scrollToBottom();
        });
    }
    
    scrollToBottom(){
        scroll.scrollToBottom();
    }
    
    scrollToTop(){
        scroll.scrollToTop();
    }
    
}

export default App;
