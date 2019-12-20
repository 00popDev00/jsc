import React, { Component } from 'react';
import { connect } from "react-redux";
import Action from "../Redux/action";
import '../style/Chat.css'
import { Avatar, Icon } from 'antd';

//import ClientSocket from 'socket.io-client';

//var socket = ClientSocket("http://localhost:1001/");
// const menu = (
//     <Menu>
//         <Menu.Item>
//             1st menu item
//       </Menu.Item>
//         <Menu.Item>
//             2nd menu item
//       </Menu.Item>
//         <Menu.Item>
//             3rd menu item
//       </Menu.Item>
//     </Menu>
// );

class Chat extends Component {
    state = {
        onlineUser: [],
        messageList: [],
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
            // this.props.CurrentChats([])
        }
        else {
            // console.log('idk',this.props.currentchats)

            // this.setState({
            //     messageList: this.props.currentchats === undefined? [] :this.props.currentchats ,
            //     message: '',

            // });

        }


    }

    // componentWillUpdate() {

    // }

    componentWillUnmount() {

        this.setState({
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
           // console.log("Loading.....no reciver selected yet")
        }


        this.props.socket.on('message', (data) => {
            console.log("data from send", data)

            if (this.props.currentMD_id === undefined) {
                // this.props.CurrentMDid(data.MD_id);
                 if(this.props.currentreciver !== undefined)
                 {
                     var faith = this.props.oMDlists.findIndex(e => { return e.shared === this.props.currentreciver.owner })
                     console.log('faith:',faith);
                     this.props.CurrentMDid(this.props.oMDlists[faith].branch)
                 }
                 
             }
            if(this.props.currentMD_id === data.MD_id)
            {
                var ml = this.props.currentchats;
                ml.push(data);
                this.props.CurrentChats(ml)
                this.setState({});
            }
            else
            {
                console.log('data.MD_id',data.MD_id)
                this.props.NotificationManager({flag:'add',reciver:data.reciver})
            }                 


        })
    }

    _send = () => {
        var sendPackage = {
            "rusid": this.props.currentreciver.usid,
            "susid": this.props.socket.id,
            "message": this.state.message,
            "sender": this.props.username,
            "reciver": this.props.currentreciver.owner,
            "timestamp": new Date().toISOString(),
            "MD_id": this.props.currentMD_id,
        }


        this.props.socket.emit('messageSent', sendPackage);
        this.setState({ message: '' })
    }

    render() {
        //     "message":data.message, 
        //     "timestamp": data.timestamp,
        //     "owner":data.sender, 
        return (

            this.props.currentreciver !== undefined ?


                <div id="ChatContainer">


                    <div id="ReciverHeader">
                        <div id="ReciverHeaderPlate">

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

                    </div>
                    <div id="ChatArea">
                        <div id="ChatAreaPlate">

                            {this.props.currentchats !== undefined ?
                                this.props.currentchats.length > 0 ? this.props.currentchats.map((e, index) => (

                                    e.owner === this.props.username ?
                                        <div id="BubblePlateOwner">

                                            <div id="ChatBubbleOwner" key={index} >
                                                <div id="Message"> {e.message}</div>
                                                <div id="Timestamp"> {e.timestamp}</div>

                                            </div>
                                        </div>

                                        :
                                        <div id="BubblePlate">

                                            <div id="ChatBubble" key={index}>
                                                <div id="Message"> {e.message}</div>
                                                <div id="Timestamp"> {e.timestamp}</div>

                                            </div>
                                        </div>


                                )) : null



                                : null}

                        </div>

                    </div>
                    <div id="SendContainer">
                        <input id="InputSend" type='text' value={this.state.message} placeholder="type..." onChange={(e) => { this.setState({ message: e.target.value }) }}  ></input>
                        <button id="ButtonSend" onClick={() => { this._send() }}>send</button>
                    </div>


                </div>

                :
                <div id="ChatContainer">
                </div>
        );
    }
}


const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({
    CurrentChats: (credential) => dispatch(Action.CurrentChats(credential)),
    CurrentMDid: (credential) => dispatch(Action.CurrentMDid(credential)),
    NotificationManager: (credential) => dispatch(Action.NotificationManager(credential)),

    

    // Onlineusers: (credential) => dispatch(Action.Onlineusers(credential)),
    //CurrentReciver: (credential) => dispatch(Action.CurrentReciver(credential))





});


export default connect(mapStateToProps, mapDispatchToProps)(Chat);