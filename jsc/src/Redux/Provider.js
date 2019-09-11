import ClientSocket from 'socket.io-client';
var socket; //= ClientSocket("http://localhost:3000/");
var newState, Token;
var prestate = {
    username: undefined,
    oMDlists: [],
    status: undefined,
    token: undefined,
    onlineUser: [],
}

export default (state = prestate, action) => {
    switch (action.type) {

        case 'signup': return signup(state, action.credential);

        case 'signin': return signin(state, action.credential);

        case 'signout': return signout(state, action.credential);

        case 'getLiveUsers': return getLiveUsers(state);

        case 'listentoSignout': return listentoSignout();







        default: return state;
    }
}



const getLiveUsers = (state) => {
    var global;
    //  console.log('\nStore \n',state,data);
    socket.emit('getLiveUsers');
    //console.log(data);
    socket.on('getLiveUsersACK', (data) => {
        // console.log('online user are:\n' ,global )


        Token = data;
        state = { ...state, onlineUser: Token }
        console.log('online user are:\n', Token)

    })

    //console.log('store \n', state, '\n')
    return state;
}


const signup = (state, data) => {


    fetch('http://localhost:5000/signup/', {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            'userid': data.u,
            'password': data.p,
        }),
    })
        .then(e => { return e.json() })
        .then(data => {
            console.log('datais:', data)
        })
        .catch(error => console.error(error))

    return state;
}

const signin = (state, data) => {
    //  console.log('\nStore \n',state,data);


    socket = ClientSocket("http://localhost:1001/");

    fetch('http://localhost:5000/login/', {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            'userid': data.u,
            'password': data.p,
        }),
    })
        .then(e => { return e.json() })
        .then(result => {
           // console.log('datais:', result);
            newState = { ...state, username: data.u, token: result.Token }
        })
        .catch(error => console.error(error))

    //console.log(newState)
    return newState;

}


const signout = (state, data) => {

    fetch('http://localhost:5000/signout/', {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            'userid': data,
        }),
    })
        .then(e => { return e.json() })
        .then(data => {
            console.log('status:', data);
        })
        .catch(error => console.error(error))
}

const listentoSignout = () => {

    // socket.on('SignoutACK',(data)=>{


    // })

    // return 
}




