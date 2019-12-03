module.exports = {


    _signout: () => {
        socket.emit('Signout', this.state.username)

        this.props.oMDlists([1, 2, 3])

        console.log('from stor', this.props.oMDlists)
    },

    _signin: () => () => {
        console.log('from stor', this.props.usernamer)

        socket.emit('Signin', { name: this.state.username, password: this.state.password });
        socket.on('SigninACK', (data) => {
            if (data !== -1) {
                //   alert('successfully signed in!');
                //   console.log('in')
                this.props.login(this.state.username)
                console.log('from stor', this.props.usernamer)

            }
            else {
                alert('log in again!')
                this.setState({ username: '', password: '' });
                // console.log('in-again')
            }

        })

    },

}





