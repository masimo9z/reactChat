import React, { Component } from 'react';

export default class Message extends Component {    
    render() {
        return (
            <div className={this.props.isMine ? "message right-msg" : "message left-msg"}>
            {this.props.isMine ? null : <img src={this.props.message.user.avatar} alt="Avatar" />}
                <div className="info">
                    <span className="date">{this.props.message.h}:{this.props.message.m}</span>
                    <span className="name"><strong>{this.props.message.user.username}</strong></span>
                    <span className="messageContent">{this.props.message.text}</span>
                </div>
            {this.props.isMine ? <img src={this.props.message.user.avatar} alt="Avatar" /> : null}
            </div>
        );
    }   
}