import React, { Component } from 'react';
import { connect } from "react-redux";
import Action from "./Redux/action";
<<<<<<< HEAD
import './style/App.css';
import "antd/dist/antd.css";

import { Input, Button } from 'antd';

=======
import ClientSocket from 'socket.io-client';
import './style/App.css';
import "antd/dist/antd.css";
>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6

import { Input, Button, Row, Col } from 'antd';


var socket;
// import Methods from './HelperFunctions/start_screen'

//Add local storage clear  signout for all components

class App extends Component {

    state = {
        username: '',
        password: '',
        OnlineUser: [],
        ownertoken: '',
    }

    _signup = () => {
        fetch('http://localhost:5000/signup/', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',

            body: JSON.stringify({
                'userid': this.state.username,
                'password': this.state.password,
            }),
        })
            .then(e => { return e.json() })
            .then(data => {
                // console.log('datais:', data)
            })
            .catch(error => console.error(error))
    }


    _signin = () => {

        fetch('http://localhost:5000/login/', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                'userid': this.state.username,
                'password': this.state.password,
            }),
        })
            .then(e => { return e.json() })
            .then(result => {
                //console.log('datais:', result);

                if (result.faith === 404) {
                    alert('Please refresh the session');
                }
                else {

                    if (result.faith === -1) {
                        alert("Please signup first to login")
                    } else {
                        this.props.Username(this.state.username)

                    }
                    this.props.OMDlists(result.token.oMDlists)
                    //localStorage.setItem('Token', result.Token.usid)


                    //console.log(result.token.owner)

<<<<<<< HEAD
                  // why to use..maybe for relogin..se to it localStorage.setItem(result.token.owner, result.token.owner)
=======
                    localStorage.setItem(result.token.owner, result.token.owner)
>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6
                }




                // return { ...state, username: data.u, token: result.Token }
            })
            .catch(error => console.error(error))
    }

    render() {
<<<<<<< HEAD
        // const { username, password } = this.state
=======
        const { username, password } = this.state
>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6
        return (

            <div id="Appcontainer" >
                <div id="Left_Appcontainer" >
                    <img
                        id="LeftContainerImage"
<<<<<<< HEAD
                        src={require('./Images/LeftContainer.jpg')}
                        alt="Loginpic" />
=======
                        src={require('./Images/LeftContainer.jpg')} />
>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6

                </div>
                <div id="Rigth_Appcontainer">
                    <div id="Login_container" >
<<<<<<< HEAD
                        <div id="Input_container">

                            <Input
                                className='inputdata'
=======
                        <p id="Input_container">

                            <Input
                                id='input'
>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6

                                placeholder='username'
                                value={this.state.username}
                                onChange={
                                    (e) => this.setState({ username: e.target.value })} />
                            {/* <input type='text'
                                placeholder='username'
                                value={this.state.username}
                                onChange={
                                    (e) => this.setState({ username: e.target.value })}
                            /> */}

                            <Input
<<<<<<< HEAD
                                className='inputdata'
=======
                                id='input'
>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6

                                type='password'
                                placeholder='password'
                                value={this.state.password}
                                onChange={
                                    (e) => this.setState({ password: e.target.value })} />

                            {/* < input type='password'
                                placeholder='password'
                                value={this.state.password}
                                onChange={
                                    (e) => this.setState({ password: e.target.value })}
                            /> */}
                            <div id='ForgetP'>
<<<<<<< HEAD
                                <a href='/#'>Forgot password </a>
                            </div>

                        </div>


                        <div id="Button_Container">
=======
                                <a>Forgot password</a>
                            </div>

                        </p>


                        <p id="Button_Container">
>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6
                            {/* <button onClick={this._signup} > Signup </button> */}


                            {/* <button onClick={
                                () => {


                                    this._signin();
                                    // clearInterval(x);

                                    // console.log('app=> ', this.props.username)
                                    let x = setInterval(() => {
                                        if (this.props.username !== undefined) {
                                            clearInterval(x);
                                            this.props.history.push('/HomePage')
                                        }
                                    }, 1000);


                                }
                            } > Login </button> */}

                            <Button
                                id="Button"
                                type="primary" block onClick={
                                    () => {


                                        this._signin();
                                        // clearInterval(x);

                                        // console.log('app=> ', this.props.username)
                                        let x = setInterval(() => {
                                            if (this.props.username !== undefined) {
                                                clearInterval(x);
                                                this.props.history.push('/HomePage')
                                            }
                                        }, 1000);


                                    }
                                } >Login</Button>

<<<<<<< HEAD
                            <div id="or"><span>OR</span></div>
=======
                            <div id="or"><text>OR</text></div>
>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6
                            <Button
                                id="Button"
                                type="primary" block onClick={this._signup}>Signup</Button>


<<<<<<< HEAD
                        </div>
=======
                        </p>
>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6

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
    OMDlists: (credential) => dispatch(Action.OMDlists(credential)),
    // signout: (credential) => dispatch(Action._signout(credential))



});

export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default connect()(App);

//http://css-tricks.com/snippets/css/a-guide-to-flexbox/