import React, { Component } from 'react';
import { connect } from "react-redux";
import Action from "../Redux/action";
import '../style/Liveuser.css'
//import "antd/dist/antd.css";

import { Avatar, Badge } from 'antd';

class LiveUser extends Component {
    state = { onlineUser: [], messageList: [] }
<<<<<<< HEAD


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
=======
>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6


                    // console.log("currentchats",this.props.currentchats)

                }



            })
            .catch(error => console.error(error))
    }


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

        this.props.socket.emit('getLiveUsers');

        this.props.socket.on('getLiveUsersACK', (data) => {
            this.props.Onlineusers(data);
        })

        this.props.socket.on('updateoMDlist', (data) => {
            console.log("updateoMDlist", data)
<<<<<<< HEAD

            this.props.OMDlists(data)
=======

            this.props.OMDlists(data)
            // this.setState({ omd_id: data });

        })
        this.props.socket.on('newMDID', (data) => {
            let newToken = this.props.token
            console.log("token", newToken)
            console.log("newMDID", data)


            //    this.props.CurrentMDid(data.branch)
            // this.setState({ omd_id: data });
>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6

        })

        // this.props.socket.on('newMDID', (data) => {
        //     let newToken = this.props.token
        //     console.log("token", newToken)
        //     console.log("newMDID", data)


        // })



<<<<<<< HEAD
=======

>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6
    }

    _selectUser = (data) => {
        console.log("\n\n===================================")
        var faith = this.props.oMDlists.findIndex(e => { return e.shared === data.owner })
        if (faith === -1) {
            console.log("error", data);
            this.props.CurrentChats([])
<<<<<<< HEAD
            this.props.CurrentMDid(undefined)
            this.props.CurrentReciver(data);
=======

            this.props.CurrentReciver(data);
            //this.props.CurrentMDid(this.props.oMDlists[faith].branch)

>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6
        }
        else {
            // console.log("branch:", this.props.token[faith].branch)
            this.props.CurrentMDid(this.props.oMDlists[faith].branch)
<<<<<<< HEAD
              console.log("currentMD_id on select:", this.props.currentMD_id)
=======
            //  console.log("currentMD_id on select:", this.props.currentMD_id)
>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6
            this._getDatabase(this.props.oMDlists[faith].branch);
            //console.log("_getDatabase on select:", this.props.currentMD_id)
            let x = setInterval(() => {
                this.props.CurrentReciver(data);
<<<<<<< HEAD
            //    console.log('idk0nonce', this.props.currentchats)
=======
                console.log('idk0nonce', this.props.currentchats)
>>>>>>> 5630548e1f2509f969fd2cd5492e09074b0e3af6
    
                if (this.props.currentchats !== undefined) { clearInterval(x) }
    
            }, 100)

        }
     


        console.log("===================================\n\n")


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

    





});

export default connect(mapStateToProps, mapDispatchToProps)(LiveUser);
