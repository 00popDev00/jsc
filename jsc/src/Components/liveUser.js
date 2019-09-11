import React, { Component } from 'react';
import { connect } from "react-redux";
import Action from "../Redux/action";
import ClientSocket from 'socket.io-client';

var socket = ClientSocket("http://localhost:1001/");

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

        socket.emit('getLiveUsers');
        
        socket.on('getLiveUsersACK', (data) => {

            console.log('index :\n',this.props.owne)

            this.setState({ onlineUser: data });


            console.log('state in cokete:\n', data)

        })
    }

    render() {

        return (
            <div>

                <u>
                    {this.state.onlineUser.map((e, index) => (
                        e.owner !== this.props.owner ?
                            <li
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

    //listentoSignout: () => dispatch(Action._listentoSignout())




});


export default connect(mapStateToProps, mapDispatchToProps)(LiveUser);