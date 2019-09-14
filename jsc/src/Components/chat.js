import React, { Component } from 'react';
import { connect } from "react-redux";
import Action from "../Redux/action";
import ClientSocket from 'socket.io-client';

var socket = ClientSocket("http://localhost:1001/");

class Chat extends Component {
    state = { onlineUser: [], }

    // componentWillUpdate(nextProps, nextState) {
    //     console.log('nextProps: ', nextProps)
    //     console.log('nextState: ', nextState)
    //     // if(nextProps.onlineUser !== this.props.onlineUser ){
    //     //     this.setState({onlineUser: this.props.onlineUser})
    //     // }
    // }


    render() {

        return (
            <div >

                <div><h5>Talking to: {this.props.currentreciver}</h5></div>
                <div>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                        <input type='text' placeholder="type..."></input>
                        <button onClick={()=>{this._send()}}>send</button>
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

   // Onlineusers: (credential) => dispatch(Action.Onlineusers(credential)),
    //CurrentReciver: (credential) => dispatch(Action.CurrentReciver(credential))





});


export default connect(mapStateToProps, mapDispatchToProps)(Chat);