import React, { Component } from 'react';
import { connect } from "react-redux";
import Action from "../Redux/action";
import '../style/Chat.css'
import { Avatar, Icon, Menu, Dropdown, Button } from 'antd';

//import ClientSocket from 'socket.io-client';

//var socket = ClientSocket("http://localhost:1001/");
const menu = (
    <Menu>
        <Menu.Item>
            1st menu item
      </Menu.Item>
        <Menu.Item>
            2nd menu item
      </Menu.Item>
        <Menu.Item>
            3rd menu item
      </Menu.Item>
    </Menu>
);

class Chat extends Component {
    state = {
        onlineUser: [],
        messageList: this.props.currentchats,
        message: undefined,
        omd_id: undefined,

    }

    componentWillReceiveProps(newProps) {

        if (newProps.owner !== this.props.owner) {
            this.setState({
                onlineUser: [],
                messageList: [],
                message: undefined,

            });
            this.props.CurrentChats([])
        }
        else {
            this.setState({
                onlineUser: [],
                messageList: this.props.currentchats,
                message: undefined,

            });
        }



        //  this._getDatabase();
    }


    componentWillUnmount() {

        this.setState({
            onlineUser: [],
            messageList: [],
            message: undefined,

        });
        this.props.CurrentChats([])

    }

    componentDidMount() {
        //      console.log('componentDidMount', this.props)

        if (this.props.currentreciver !== undefined) {
            // this._getDatabase();


        }
        else {
            console.log("Loading.....no reciver selected yet")
        }


        this.props.socket.on('message', (data) => {
            var ml = this.state.messageList;

            //  console.log("ml", ml, "data", data)

            ml.push(data);
            this.props.CurrentChats(ml)
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
            <div id="ChatContainer">
                <div id="ReciverHeader">
                    <div id="UserAvtar_Div">
                        <Avatar size={60} icon="user"
                            onClick={() => alert('Avtar_Info')}
                        />
                    </div>
                    <div id="ReciverName">
                        <h5> {this.props.currentreciver === undefined ? 'no user' : this.props.currentreciver.owner}</h5>
                    </div>
                    <Icon type="setting" theme="twoTone" />

                </div>
                <div id="ChatArea">
                    <div>
                        {this.state.messageList.length > 0 ? this.state.messageList.map((e, index) => (

                            <div id="ChatBubble">
                                <div id="Message"> {e.message}</div>
                                <div id="Timestamp"> {e.timestamp}</div>

                            </div>
                        )) : null}
                    </div>
                </div>
                <div id="SendContainer">
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
    CurrentChats: (credential) => dispatch(Action.CurrentChats(credential)),

    // Onlineusers: (credential) => dispatch(Action.Onlineusers(credential)),
    //CurrentReciver: (credential) => dispatch(Action.CurrentReciver(credential))





});


export default connect(mapStateToProps, mapDispatchToProps)(Chat);