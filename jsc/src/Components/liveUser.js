import React, { Component } from 'react';
import { connect } from "react-redux";
import Action from "../Redux/action";


class LiveUser extends Component {
    state = { onlineUser: [], }

    // componentWillUpdate(nextProps, nextState) {
    //     console.log('nextProps: ', nextProps)
    //     console.log('nextState: ', nextState)
    //     // if(nextProps.onlineUser !== this.props.onlineUser ){
    //     //     this.setState({onlineUser: this.props.onlineUser})
    //     // }
    // }

    componentDidMount() {

        this.props.socket.emit('getLiveUsers');

        this.props.socket.on('getLiveUsersACK', (data) => {
            this.props.Onlineusers(data);
        })

        this.props.socket.on('updateoMDlist', (data) => {
            console.log("updateoMDlist", data)
            this.props.Token(data)
            // this.setState({ omd_id: data });

        })
        this.props.socket.on('newMDID', (data) => {
            console.log("newMDID", data)
            this.props.CurrentMDid(data)
           // this.setState({ omd_id: data });

        })


        
    }

    _selectUser = (data) => {

        var faith = this.props.token.findIndex(e => { return e.shared === data.owner })
        if (faith === -1) {
            console.log("error", this.props.token)
        }
        else {
            console.log("branch:", this.props.token[faith].branch)
            this.props.CurrentMDid(this.props.token[faith].branch)

        }

        this.props.CurrentReciver(data);



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
    Token: (credential) => dispatch(Action.Token(credential)),





});

export default connect(mapStateToProps, mapDispatchToProps)(LiveUser);
