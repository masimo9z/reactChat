import React, { Component } from 'react';
import './App.css';

// NOTATION: Cela aurait été bien d'utiliser un routeur, ou bien aussi d'écrire des tests unitaires.

// NOTATION: Cela aurait été un peu plus compréhensible si tes différentes classes étaient dans des fichiers séparés
// NOTATION: évite les variables globales (socket, users)
var socket;

var users = {};

var Message = React.createClass({
    render() {
// NOTATION: Attention : tu mets des ids sur des éléments qui ne sont pas uniques !
            return (
                <div className={this.props.isMine ? "message right-msg" : "message left-msg"} id="msgtpl">
                {this.props.isMine ? null : <img src={this.props.avatar} alt="Avatar" />}
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

// NOTATION: Tu mélanges des class ES6 avec des React.createClass, c'est assez dommage.
var UsersList = React.createClass({
    render() {
        return (
            <div className="aside">
// NOTATION: Pas sur que tu as besoin d'un id ici pour user (on peut toujours utiliser des classes)
                <div id="users">
                {
                    Object.values(this.props.users).map((user)=> {
// NOTATION: Pas sur que tu as besoin d'un id ici pour img
                        return (
                            <div className="img-user">
                                <span className="img-username">{user.username}</span>
                                <img src={user.avatar} key={user.id} id={user.id} alt={"Avatar User "+user.id} />
                            </div>
                        );
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
// NOTATION: Je pense que tu pouvais directement passer tout message au message, c'est à dire message={message}
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
        super();
// NOTATION: messageTpl n'est jamais utilisé
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
                <div className="container">
                    <div className="wrapper">
                    {
// NOTATION: équivalent à :
// this.state.connected ? this.displayFormMessage() : this.displayConnect()
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

// NOTATION: Code mort ??
    newDiscussion(e){

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
// NOTATION: Attention !! Tu as plusieurs variables users, c'est assez mauvais signe.
// Je pense que le plus simple aurait été de ne pas avoir de variable global Users du tout
            users = this.state.users;
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
