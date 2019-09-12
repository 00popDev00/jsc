
import { connect } from "react-redux";
import LiveUser from '../Components/liveUser'
import Action from "../Redux/action";
import React, { Component } from 'react';

class HomePage extends Component {
    state = {}

    _signout = () => {
        fetch('http://localhost:5000/signout/', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                'userid': this.props.username,
            }),
        })
            .then(e => { return e.json() })
            .then(data => {
                console.log('status:', data);
            })
            .catch(error => console.error(error))
    }
    componentDidMount() {
if(this.props.username === undefined) this.props.history.push('/')

    }
    render() {
        //      console.log('username Homepage=>', this.props.username)

        return (
            <div>
                <h4>homePage</h4>
                <button onClick={() => {
                
                    // this.props.signout();
                    this._signout()
                    this.props.history.push('/')


                }}>Signout</button>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                    <div style={{ flex: 1 }}>
                        Live users
                        <LiveUser />
                    </div>
                    <div style={{ flex: 1 }}>
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
    // signout: (credential) => dispatch(Action._signout(credential))


});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);