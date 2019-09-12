import React, { Component } from 'react';
import { connect } from "react-redux";
import Action from "./Redux/action";

// import Methods from './HelperFunctions/start_screen'


class App extends Component {

  state = {
    username: '', password: '', OnlineUser: [], ownertoken: '',
  }

  _signup = () => {
    fetch('http://localhost:5000/signup/', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'post',

      body: JSON.stringify({
        'userid': this.state.username,
        'password': this.state.password,
      }),
    })
      .then(e => { return e.json() })
      .then(data => {
        console.log('datais:', data)
      })
      .catch(error => console.error(error))
  }


  _signin = () => {

    fetch('http://localhost:5000/login/', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        'userid': this.state.username,
        'password': this.state.password,
      }),
    })
      .then(e => { return e.json() })
      .then(result => {
         console.log('datais:', result);
         this.props.Username(this.state.username)
       // return { ...state, username: data.u, token: result.Token }
      })
      .catch(error => console.error(error))
  }

  render() {
    const { username, password } = this.state
    return (
      <div>
        <p>
          <input
            type='text'
            placeholder='username'
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          />
          <input type='password'
            placeholder='password'
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })} />

        </p>
        <p>
          <button onClick={this._signup}>Signup</button>

          <button onClick={() => {

            let x = setInterval(() => {
              this._signin();
             // clearInterval(x);

             // console.log('app=> ', this.props.username)

              if (this.props.username !== undefined) {
                clearInterval(x);
                this.props.history.push('/HomePage')
              }
            }, 1000);


          }
          }>Login</button>



        </p>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
   Username: (credential) => dispatch(Action.Username(credential)),
  // signin: (credential) => dispatch(Action._signin(credential)),
  // signout: (credential) => dispatch(Action._signout(credential))



});

export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default connect()(App);