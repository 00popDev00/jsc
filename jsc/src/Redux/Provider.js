var newState, Token;
var prestate = {
    username: undefined,
    oMDlists: [],
    status: undefined,
    token: undefined,
    onlineUser: [],
    currentreciver:[],
}

export default (state = prestate, action) => {
    switch (action.type) {

        case 'Username': return {...state,username:action.credential};

        case 'Token': return {...state,token:action.credential};

        case 'Onlineusers': return {...state,onlineUser:action.credential};

        case 'currentreciver': return {...state,currentreciver:action.credential};

       // case 'listentoSignout': return listentoSignout();


        default: return state;
    }
}







const signout = (state, data) => {

    // fetch('http://localhost:5000/signout/', {
    //     headers: {
    //         'Accept': 'application/json, text/plain, */*',
    //         'Content-Type': 'application/json'
    //     },
    //     method: 'post',
    //     body: JSON.stringify({
    //         'userid': data,
    //     }),
    // })
    //     .then(e => { return e.json() })
    //     .then(data => {
    //         console.log('status:', data);
    //     })
    //     .catch(error => console.error(error))
}

const listentoSignout = () => {

    // socket.on('SignoutACK',(data)=>{


    // })

    // return 
}




