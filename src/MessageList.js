import React, { Component } from 'react';
import Message from './Message.js';

export default class MessageList extends Component {    
    render() {
        return (
            <div id='messages'>
                <h2> Conversation: </h2>
                {
                    Object.values(this.props.messages).map((message, i)=> {
                    return (
                        <Message
                            key={i}
                            message={message}
                            isMine={this.props.login === message.user.id}
                        />
                    );
                })
              }
            </div>
        );
    } 
}