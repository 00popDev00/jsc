
import { connect } from "react-redux";
import LiveUser from '../Components/liveUser'
import Chat from '../Components/chat'
import Action from "../Redux/action";
import React, { Component } from 'react';

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
        if (this.props.username === undefined) {
            if (localStorage.getItem('Token') === null) {
                this.props.history.push('/')

            }
            else {


                this.props.Username(localStorage.getItem('User'))
                this.props.Token(localStorage.getItem('Token'))


            }


        }

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
                        <LiveUser />
                    </div>
                    <div style={{ flex: 1 }}>
                        chat module
                        <Chat />
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