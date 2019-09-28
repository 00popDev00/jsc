import React, { Component } from 'react';
import { connect } from "react-redux";
import Action from "../Redux/action";
//import ClientSocket from 'socket.io-client';

//var socket = ClientSocket("http://localhost:1001/");

class Chat extends Component {
    state = {
        onlineUser: [],
        messageList: [],
        message: undefined,
        omd_id: undefined,

    }


    _getDatabase = () => {

        fetch('http://localhost:5000/getDlist/', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                "omd_id": this.props.currentMD_id,
            }),
        })
            .then(e => { return e.json() })
            .then(result => {
                console.log('Dlist:', result);
                this.setState({messageList :result  });


            })
            .catch(error => console.error(error))
    }

    componentWillReceiveProps() {
        this.setState({
            onlineUser: [],
            messageList: [],
            message: undefined,

        });
        this._getDatabase();


      

    }
    componentWillUpdate() {

    }
    componentDidMount() {

        if (this.props.currentreciver !== undefined) {
            this._getDatabase();

         
        }
        else{
            console.log("Loading.....no reciver selected yet")
        }


        this.props.socket.on('message', (data) => {
            var ml = this.state.messageList;
            ml.push(data);

            this.setState({ messageList: ml });

        })
    }

    _send = () => {
        var sendPackage = {
            "rusid": this.props.currentreciver.usid,
            "message": this.state.message,
            "sender": this.props.username,
            "reciver": this.props.currentreciver.owner,
            "timestamp": new Date().toISOString(),
            "MD_id": this.props.currentMD_id,
        }


        this.props.socket.emit('messageSent', sendPackage);
    }

    render() {
        //     "message":data.message, 
        //     "timestamp": data.timestamp,
        //     "owner":data.sender, 
        return (
            <div>

                <div><h5>Talking to: {this.props.currentreciver === undefined ? 'no user' : this.props.currentreciver.usid}</h5></div>
                <div>
                    {this.state.messageList.map((e, index) => (

                        <li key={index}> <h4>{e.owner}</h4><p>{e.message} <b> {e.timestamp}</b></p></li>
                    ))}
                </div>

                <div>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                        <input type='text' placeholder="type..." onChange={(e) => { this.setState({ message: e.target.value }) }}  ></input>
                        <button onClick={() => { this._send() }}>send</button>
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