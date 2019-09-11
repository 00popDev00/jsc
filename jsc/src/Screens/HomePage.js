
import { connect } from "react-redux";
import LiveUser from '../Components/liveUser'
import Action from "../Redux/action";
import React, { Component } from 'react';

class HomePage extends Component {
    state = {}
    render() {
      //  console.log('username Homepage=>', this.props)

        return (
            <div>
                <h4>homePage</h4>
                <button onClick={() => {
                    //  /   console.log('username=>',this.props.status)
                    this.props.signout(this.props.username);
                    this.props.history.push('/')


                }}>Signout</button>
                <div style={{display:'flex',flex:1,flexDirection:'row'}}>
                    <div style={{flex:1}}>
                        Live users
                        <LiveUser />
                </div>
                    <div style={{flex:1}}>
                        chat module
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
    // signup: (credential) => dispatch(Action._signup(credential)),
    //  signin: (credential) => dispatch(Action._signin(credential)),
    signout: (credential) => dispatch(Action._signout(credential))


});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);