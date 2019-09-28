
import { connect } from "react-redux";
import LiveUser from '../Components/liveUser'
import Chat from '../Components/chat'
import Action from "../Redux/action";
import React, { Component } from 'react';
import ClientSocket from 'socket.io-client';

var socket = ClientSocket("http://localhost:1001/");

class HomePage extends Component {

    state = {}

    _signout = () => {
        fetch('http://localhost:5000/signout/', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                'userid': this.props.username,
            }),
        })
            .then(e => { return e.json() })
            .then(data => {
                console.log('status:', data);
                localStorage.clear();

            })
            .catch(error => console.error(error))
    }

    componentDidMount() {

    }
    render() {
        //      console.log('username Homepage=>', this.props.username)

        return (
            <div>
                <h4>homePage</h4>
                <button onClick={() => {

                    // this.props.signout();
                    this._signout()
                    this.props.history.push('/')


                }}>Signout</button>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                    <div style={{ flex: 1 }}>
                        Live users
                        <LiveUser socket={socket} />
                    </div>
                    <div style={{ flex: 1 }}>
                        chat module
                        <Chat socket={socket} />
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({
    Username: (credential) => dispatch(Action.Username(credential)),
    Token: (credential) => dispatch(Action.Token(credential)),



});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);