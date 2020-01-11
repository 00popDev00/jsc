
import { connect } from "react-redux";
import LiveUser from '../Components/liveUser'
import Chat from '../Components/chat'
import Action from "../Redux/action";
import React, { Component } from 'react';
import ClientSocket from 'socket.io-client';
import '../style/HomePage.css'

var socket = ClientSocket("http://localhost:1001/");

class HomePage extends Component {

    state = {reloadstatus:0}

    _signout = (user = this.props.username) => {
        fetch('http://localhost:5000/signout/', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                'userid': user,
            }),
        })
            .then(e => { return e.json() })
            .then(data => {
                console.log('status:', data);
                localStorage.clear();

            })
            .catch(error => console.error(error))
    }

    componentWillMount() {

        if (this.props.username === undefined) {
           // console.log("reload M");
            this.props.history.push('/');

            //  localStorage.setItem('User', result.Token.owner)
          //  this._signout(localStorage.getItem(''+ this.props.localstorageindex))
            //localStorage.clear();

        }
    }
      


    
    componentDidUpdate() {
        if (this.props.username === undefined) {
           // console.log("reload U");
            this.props.history.push('/');

            //  localStorage.setItem('User', result.Token.owner)
            //  this._signout(localStorage.getItem('User'))
           // localStorage.clear();

        }

        
    }



    render() {
        //      console.log('username Homepage=>', this.props.username)

        return (
            <div id="HomepageContainer">

                {/* <h4>homePage</h4>
                <button onClick={() => {

                    // this.props.signout();
                    this._signout()
                    this.props.history.push('/')


                }}>Signout</button> */}

                <LiveUser socket={socket} />

                <Chat socket={socket} />


            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({
    Username: (credential) => dispatch(Action.Username(credential)),
    CurrentChats: (credential) => dispatch(Action.CurrentChats(credential)),




});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);