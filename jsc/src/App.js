import React, { Component } from 'react';
import { connect } from "react-redux";
import Action from "./Redux/action";

// import Methods from './HelperFunctions/start_screen'


class App extends Component {

  state = {
    username: '', password: '', OnlineUser: [], ownertoken: '',
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
          <button onClick={() => this.props.signup({ u: username, p: password })}>Signup</button>

          <button onClick={() => {

            let x = setInterval(() => {
              this.props.signin({ u: username, p: password })
              console.log('app=> ', this.props.username)

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
  signup: (credential) => dispatch(Action._signup(credential)),
  signin: (credential) => dispatch(Action._signin(credential)),
  signout: (credential) => dispatch(Action._signout(credential))


});

export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default connect()(App);