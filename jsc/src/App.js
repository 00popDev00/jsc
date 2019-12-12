import React, { Component } from 'react';
import { connect } from "react-redux";
import Action from "./Redux/action";
import './style/App.css';
import "antd/dist/antd.css";

import { Input, Button } from 'antd';


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

                  // why to use..maybe for relogin..se to it localStorage.setItem(result.token.owner, result.token.owner)
                }




                // return { ...state, username: data.u, token: result.Token }
            })
            .catch(error => console.error(error))
    }

    render() {
        // const { username, password } = this.state
        return (

            <div id="Appcontainer" >
                <div id="Left_Appcontainer" >
                    <img
                        id="LeftContainerImage"
                        src={require('./Images/LeftContainer.jpg')}
                        alt="Loginpic" />

                </div>
                <div id="Rigth_Appcontainer">
                    <div id="Login_container" >
                        <div id="Input_container">

                            <Input
                                className='inputdata'

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
                                className='inputdata'

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
                                <a href='/#'>Forgot password </a>
                            </div>

                        </div>


                        <div id="Button_Container">
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

                            <div id="or"><span>OR</span></div>
                            <Button
                                id="Button"
                                type="primary" block onClick={this._signup}>Signup</Button>


                        </div>

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