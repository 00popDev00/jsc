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

        this.props.getLiveUsers()
        //  this.setState({ onlineUser:  this.props.onlineUser });
        // console.log('online users componen are: ', this.props.onlineUser)
        // if (this.props.onlineUser === undefined) {
        //     this.props.getLiveUsers()

        // }
         console.log('online users componen are: ', this.props.onlineUser)


    }
    
    render() {
        //     console.log('online users componen are: ' , this.state.onlineUser)

        return (
            <div>

            </div>
        );
    }
}


const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({

    getLiveUsers: () => dispatch(Action._getLiveUsers())


});


export default connect(mapStateToProps, mapDispatchToProps)(LiveUser);