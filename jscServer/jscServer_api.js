var express = require('express')
var app = express();
var cors = require('cors')
app.use(cors())
app.use(express.json())
//app.use(express.bodyParser());
//app.use(require('connect').bodyParser());


var TokenMaster = [];  //|| List of online Users
var MasterDatabase = [];
var UCD = [];//UsersCredentialDatabse


app.post('/signup/', (req, res) => {
    _signup(req.body);
    res.send({ message: 'Successfully Signedup!' })

})

app.post('/login', (req, res) => {


    let faith = _signin(req.body);
    if (faith !== -1) {

        _tokenManager(data.name, socket);
        _broadcastOnlineUser(socket);
    }

    res.send({ faith: faith, Token: TokenMaster[faith] })
    // socket.emit('SigninACK', {faith:faith,Token:TokenMaster[faith]});

})



_signup = (data) => {


    let newUser = {
        owner: data.userid,
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

   // data.broadcast.emit('OnlineUseremit', TokenMaster);
   // data.emit('OnlineUser', TokenMaster);
    console.log('\nLive User :\n', TokenMaster, '\n')


}

app.listen(5000);