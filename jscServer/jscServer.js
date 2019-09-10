var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

/*   odb:[
        {
            r: reciver NewUser,
            m:{
                timestamp:[tsp] tome of message,
                m: message
            }
        }
    ] */


var TokenMaster = [];  //|| List of online Users
var MasterDatabase = [];
var UCD = [];//UsersCredentialDatabse



io.on('connection', (socket) => {

    socket.on('Signup', (data) => {
        _signup(data);
        socket.emit('SignupACK');
    })


    socket.on('Signin', (data) => {
        let faith = _signin(data);
        if (faith !== -1) {

            _tokenManager(data.name, socket);
            _broadcastOnlineUser(socket);
        }
        socket.emit('SigninACK', {faith:faith,Token:TokenMaster[faith]});
    })


    socket.on('Signout', (data) => {
        console.log('logign out is ', data)
        let faith = TokenMaster.findIndex(e => { return e.owner === data })

        if (faith !== -1) {

            TokenMaster.splice(faith, 1);
            _broadcastOnlineUser(socket);

        }
        // socket.emit('SigninACK', faith);
    })


})



//Helping Functions

_signup = (data) => {



    let newUser = {
        owner: data.name,
        password: data.password,
        UCDtsp: new Date(),
        oMDlists: [] //Owner MasterDatabase List.

    }

    UCD.push(newUser);
    console.log('New User |', data.name, '|  Signed Up! ')
    //  return UCD.length -1;
}


_signin = (data) => {

    return UCD.findIndex(e => { return e.password === data.password })

}

_tokenManager = (data, socket) => {

    if (TokenMaster.findIndex(e => { return e.owner === data }) === -1) {
        let newToken = {
            owner: data,
            usid: socket.id,
            time: new Date()
        }

        TokenMaster.push(newToken);
        socket.emit('myToken', newToken);
        // console.log('\nToken Master:\n', TokenMaster, '\n')
    }
}

_broadcastOnlineUser = (data) => {

    data.broadcast.emit('OnlineUseremit', TokenMaster);
    data.emit('OnlineUser', TokenMaster);
    console.log('\nLive User :\n', TokenMaster, '\n')


}


http.listen(3000, () => {
    console.log('Server started on 3000 port')
})
