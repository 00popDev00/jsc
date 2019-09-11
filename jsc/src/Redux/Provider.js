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


        case 'listentoSignout': return listentoSignout();



        default: return state;
    }
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
            return    { ...state, username: data.u, token: result.Token }
        })
        .catch(error => console.error(error))

    //console.log(newState)

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




