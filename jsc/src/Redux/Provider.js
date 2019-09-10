import ClientSocket from 'socket.io-client';
var socket = ClientSocket("http://localhost:3000/");
var status,Token;
var prestate = {
    username: undefined,
    oMDlists: [],
    status: undefined,
    token: undefined,
}

export default (state = prestate, action) => {
    switch (action.type) {

        case 'signup': return signup(state, action.credential);

        case 'signin': return signin(state, action.credential);

        case 'signout': return signout(state, action.credential);


        default: return state;
    }
}



const signup = (state, data) => {

    //  console.log('\nStore \n',state,data);
    socket.emit('Signup', { name: data.u, password: data.p });
    //console.log(data);
    socket.on('SignupACK', () => {
        console.log('Succesfullt singed up!')
    })

    return state;
}

const signin = (state, data) => {
    //  console.log('\nStore \n',state,data);

    socket.emit('Signin', { name: data.u, password: data.p });

    socket.on('SigninACK', (faith) => {
        if (faith.faith !== -1) {




            status = "in";
            Token = faith.Token


        }
        else {
            alert('log in again!')
            state.status = "out";
        }


    })

    if (status === 'in') return { ...state, username: data.u ,token:Token };
    else return { ...state };

}


const signout = (state, data) => {
    console.log(data)

    socket.emit('Signout', data)
    state.status = "";
    state.username = "";
    console.log(state)

    return state;
}

//   _signout: () => {
//     socket.emit('Signout', this.state.username)

//     this.props.oMDlists([1, 2, 3])

//     console.log('from stor', this.props.oMDlists)
// },




