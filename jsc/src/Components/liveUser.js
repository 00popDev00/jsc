import React, { Component } from 'react';
import { connect } from "react-redux";
import Action from "../Redux/action";
import '../style/Liveuser.css'
//import "antd/dist/antd.css";

import { Avatar, Badge } from 'antd';

class LiveUser extends Component {
    state = { onlineUser: [], messageList: [] }


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

        this.props.Signout();
    }

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
                //  console.log('Dlist result:');
                if (result.error === "NoChats") {
                }
                else {
                    this.setState({ messageList: result });
                    this.props.CurrentChats(result)
                    // console.log("currentchats",this.props.currentchats)
                }



            })
            .catch(error => console.error(error))
    }



    componentDidMount() {

        this.props.socket.on('updateoMDlist', (data) => {
           // console.log("updateoMDlist", data)

            this.props.OMDlists(data)

        })

        this.props.socket.emit('getLiveUsers');

        this.props.socket.on('getLiveUsersACK', (data) => {
            this.props.Onlineusers(data);

            if (this.props.currentreciver !== undefined) {
                //this.props.currentreciver.usid === undefined
                var updateCurrentreciver = data.findIndex(e => { return e.owner === this.props.currentreciver.owner })
               // console.log('updateCurrentreciver from online user', updateCurrentreciver)
                if (updateCurrentreciver !== -1) {
                    this.props.CurrentReciver(data[updateCurrentreciver]);
                }
            }
        })

        




    }

    _selectUser = (data) => {
       // console.log("\n\n===================================")
        //console.log("data.userid on select:", data)

        var faith = this.props.oMDlists.findIndex(e => { return e.shared === data.owner })
        if (faith === -1) {
       //     console.log("not in oMDlist:", data);
            this.props.CurrentChats([])
            this.props.CurrentMDid(undefined)
            this.props.CurrentReciver(data);
        }
        else {
            // console.log("branch:", this.props.token[faith].branch)
            this.props.CurrentMDid(this.props.oMDlists[faith].branch)
         //   console.log("currentMD_id on select:", this.props.currentMD_id)
            this._getDatabase(this.props.oMDlists[faith].branch);
            //console.log("_getDatabase on select:", this.props.currentMD_id)
            let x = setInterval(() => {
                this.props.CurrentReciver(data);
                //    console.log('idk0nonce', this.props.currentchats)

                if (this.props.currentchats !== undefined) { clearInterval(x) }

            }, 100)

        }
    //    console.log("===================================\n\n")
    }

    _selectHistoryUser = (data) => {
      //  console.log("\n\n====================="+data.notification+"==============")

        var Historydata = this.props.onlineUser[this.props.onlineUser.findIndex(e => { return e.owner === data.shared })]
      //  console.log("data.userid on select:", Historydata)

        if (Historydata === undefined) {
            Historydata = {
                owner: data.shared,
                usid: '',
                time: '',
            }

            var faith = this.props.oMDlists.findIndex(e => { return e.shared === data.shared })
            this.props.CurrentMDid(this.props.oMDlists[faith].branch)
          //  console.log("offline currentMD_id on select:", this.props.currentMD_id)
            this._getDatabase(this.props.oMDlists[faith].branch);
            let x = setInterval(() => {
                this.props.CurrentReciver(Historydata);
                //    console.log('idk0nonce', this.props.currentchats)

                if (this.props.currentchats !== undefined) { clearInterval(x) }

            }, 100)

        }
        else {
            var faith = this.props.oMDlists.findIndex(e => { return e.shared === Historydata.owner })
            if (faith === -1) {


            //    console.log(" not in oMDlist:", Historydata);
                this.props.CurrentChats([])
                this.props.CurrentMDid(undefined)
                this.props.CurrentReciver(Historydata);
            }
            else {
                // console.log("branch:", this.props.token[faith].branch)
                this.props.CurrentMDid(this.props.oMDlists[faith].branch)
             //   console.log("currentMD_id on select:", this.props.currentMD_id)
                this._getDatabase(this.props.oMDlists[faith].branch);
                //console.log("_getDatabase on select:", this.props.currentMD_id)
                let x = setInterval(() => {
                    this.props.CurrentReciver(Historydata);
                    //    console.log('idk0nonce', this.props.currentchats)

                    if (this.props.currentchats !== undefined) { clearInterval(x) }

                }, 100)

            }
        }


    }


    render() {

        return (
            <div id="LiveuserContainer">
                <div id="UserProfileTab">
                    <div id="UserProfilePlate">

                        <div id="UserAvtar_Div">
                            <Avatar size={64} icon="user"
                                onClick={() => this._signout()}
                            />
                        </div>
                        <div id="UserContent_Div">
                            data
                    </div>
                    </div>

                </div>
                <div id="OnlineUsersContainer">
                    <div id="OnlineUsersPlate">


                        {this.props.oMDlists !== undefined ?

                            this.props.oMDlists.map((e, index) => (
                                <div id="OnlineUsersTab" key={index} >
                                    <div id="ReciverAvtar_Div">
                                        <Badge count={e.notification}>
                                            <Avatar size={40} icon="user"
                                                onClick={() => alert('ReciverAvtar_Div')}
                                            />
                                        </Badge>

                                    </div>
                                    <div id="ReciverContent_Div"
                                        onClick={() => this._selectHistoryUser(e) }

                                    >
                                        {e.shared}
                                    </div>
                                </div>
                            ))
                            : null}

                    </div>
                    <div id="OnlineUsersPlate">


                        {this.props.onlineUser.map((e, index) => (
                            e.owner !== this.props.username ?
                                <div id="OnlineUsersTab" key={index}>
                                    <div id="ReciverAvtar_Div"

                                    >
                                        <Badge >
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
    Signout: () => dispatch(Action.Signout()),
    NotificationManager: (credential) => dispatch(Action.NotificationManager(credential)),


});

export default connect(mapStateToProps, mapDispatchToProps)(LiveUser);
