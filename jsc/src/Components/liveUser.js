import React, { Component } from 'react';
import { connect } from "react-redux";
import Action from "../Redux/action";
import '../style/Liveuser.css'
//import "antd/dist/antd.css";

import { Avatar, Badge } from 'antd';

class LiveUser extends Component {
    state = { onlineUser: [], messageList: [] }

    // componentWillUpdate(nextProps, nextState) {
    //     console.log('nextProps: ', nextProps)
    //     console.log('nextState: ', nextState)
    //     // if(nextProps.onlineUser !== this.props.onlineUser ){
    //     //     this.setState({onlineUser: this.props.onlineUser})
    //     // }
    // }
    _getDatabase = (branch) => {

        fetch('http://localhost:5000/getDlist/', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                "omd_id": branch,
            }),
        })
            .then(e => { return e.json() })
            .then(result => {
                console.log('Dlist result:', result, this.props.currentMD_id);
                if (result.error === "NoChats") {


                }
                else {
                    this.setState({ messageList: result });
                    this.props.CurrentChats(result)


                    //  console.log("currentchats",this.props.currentchats , "messageList",this.state.messageList)

                }



            })
            .catch(error => console.error(error))
    }

    componentDidMount() {

        this.props.socket.emit('getLiveUsers');

        this.props.socket.on('getLiveUsersACK', (data) => {
            this.props.Onlineusers(data);
        })

        this.props.socket.on('updateoMDlist', (data) => {
            console.log("updateoMDlist", data)

            this.props.OMDlists(data)
            // this.setState({ omd_id: data });

        })
        this.props.socket.on('newMDID', (data) => {
            let newToken = this.props.token
            console.log("token", newToken)
            console.log("newMDID", data)


            //    this.props.CurrentMDid(data.branch)
            // this.setState({ omd_id: data });

        })



    }

    _selectUser = (data) => {
        console.log("\n\n===================================")
        var faith = this.props.oMDlists.findIndex(e => { return e.shared === data.owner })
        if (faith === -1) {
            console.log("error", data)
        }
        else {
            // console.log("branch:", this.props.token[faith].branch)
            this.props.CurrentMDid(this.props.oMDlists[faith].branch)
            //  console.log("currentMD_id on select:", this.props.currentMD_id)
            this._getDatabase(this.props.oMDlists[faith].branch);
            //console.log("_getDatabase on select:", this.props.currentMD_id)


        }

        this.props.CurrentReciver(data);

        console.log("===================================\n\n")


    }

    render() {

        return (
            <div id="LiveuserContainer">
                <div id="UserProfileTab">
                    <div id="UserAvtar_Div">
                        <Avatar size={64} icon="user"
                            onClick={() => alert('Avtar_Div')}
                        />
                    </div>
                    <div id="UserContent_Div">
                        data
                    </div>
                </div>
                <div id="OnlineUsersContainer">


                    {this.props.onlineUser.map((e, index) => (
                        e.owner !== this.props.username ?



                            <div id="OnlineUsersTab" >
                                <div id="ReciverAvtar_Div"
                                    key={index}
                                >
                                    <Badge count={1}>
                                        <Avatar size={40} icon="user"
                                            onClick={() => alert('ReciverAvtar_Div')}
                                        />
                                    </Badge>

                                </div>
                                <div id="ReciverContent_Div"
                                    onClick={() => this._selectUser(e)}

                                >
                                    {e.owner}

                                </div>


                            </div>


                            : null

                    ))}
                </div>


            </div>
        );
    }
}


const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({

    Onlineusers: (credential) => dispatch(Action.Onlineusers(credential)),
    CurrentReciver: (credential) => dispatch(Action.CurrentReciver(credential)),
    CurrentMDid: (credential) => dispatch(Action.CurrentMDid(credential)),
    OMDlists: (credential) => dispatch(Action.OMDlists(credential)),
    CurrentChats: (credential) => dispatch(Action.CurrentChats(credential)),






});

export default connect(mapStateToProps, mapDispatchToProps)(LiveUser);
