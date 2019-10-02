import React, { Component } from 'react';
import { connect } from "react-redux";
import Action from "../Redux/action";


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
                    console.log('hit')
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
            console.log("error", data);
            this.props.CurrentChats([])


        }
        else {
           // console.log("branch:", this.props.token[faith].branch)
            this.props.CurrentMDid(this.props.oMDlists[faith].branch)
          //  console.log("currentMD_id on select:", this.props.currentMD_id)
            this._getDatabase(this.props.oMDlists[faith].branch);
           //console.log("_getDatabase on select:", this.props.currentMD_id)


        }
        setTimeout(()=>{        this.props.CurrentReciver(data);
        },100)


        console.log("===================================\n\n")


    }

    render() {

        return (
            <div >

                <u>
                    {this.props.onlineUser.map((e, index) => (
                        e.owner !== this.props.username ?
                            <li
                                onClick={() => this._selectUser(e)}
                                key={index}>
                                {e.owner}
                            </li>
                            : null

                    ))}
                </u>
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
