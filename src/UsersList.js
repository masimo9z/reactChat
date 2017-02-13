import React, { Component } from 'react';

export default class UsersList extends Component {    
    render() {
        return (
            <div className="aside">
                <div id="users">
                {
                    Object.values(this.props.users).map((user, i)=> {
                        return(
                            <div className="img-user" key={i}>
                                <span className="img-username">{user.username}</span>
                                <img src={user.avatar} alt="Avatar User"/>
                            </div>
                        );
                    })
                }
                </div>
            </div>
        );
    }
    
}