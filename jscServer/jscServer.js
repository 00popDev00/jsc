var http = require('http').createServer(app);
var io = require('socket.io')(http);
var express = require('express')
var app = express();
var cors = require('cors')
app.use(cors())
app.use(express.json())


/*   odb:[
        {
            r: reciver NewUser,
            m:{
                timestamp:[tsp] tome of message,
                m: message
            }
        }
    ] */

var globalSocket;
var TokenMaster = [];  //|| List of online Users
var MasterDatabase = [];
var UCD = [];//UsersCredentialDatabse

app.post('/signup/', (req, res) => {
    //console.log(req.body)
    let faith = _signup(req.body);
    if (faith === 1) {
        res.send({ message: 'Successfully Signedup!', faith: faith })

    }
    else {
        res.send({ message: '!! Already a User !!', faith: faith })

    }

})

app.post('/login', (req, res) => {

    console.log(req.body)

    let faith = _signin(req.body);
    if (faith !== -1) {

        _tokenManager(req.body.userid);
        _broadcastOnlineUser();
    }

    res.send({ faith: faith, Token: TokenMaster[faith] })
    // socket.emit('SigninACK', {faith:faith,Token:TokenMaster[faith]});

})


app.post('/signout', (req, res) => {

    console.log('logign out is ', req.body.userid)
    let faith = TokenMaster.findIndex(e => { return e.owner === req.body.userid })

    if (faith !== -1) {
        res.send({ message: 'successfullt signed-out' })
        TokenMaster.splice(faith, 1);
        _broadcastOnlineUser();


    }

    globalSocket.emit('getLiveUsersACK', TokenMaster);
    globalSocket.broadcast.emit('getLiveUsersACK', TokenMaster);
    // socket.emit('SignoutACK', faith);

})

io.on('connection', (socket) => {

    globalSocket = socket;




    socket.on('getLiveUsers', () => {

        socket.emit('getLiveUsersACK', TokenMaster);
        socket.broadcast.emit('getLiveUsersACK', TokenMaster);

    })


})



//Helping Functions

_signup = (data) => {


    if (UCD.findIndex(e => { return e.owner === data.userid }) === -1) {
        let newUser = {
            owner: data.userid,
            password: data.password,
            UCDtsp: new Date(),
            oMDlists: [] //Owner MasterDatabase List.

        }

        UCD.push(newUser);
        console.log('New User |', data.userid, '|  Signed Up! ')
        return 1;

    }
    else {
        console.log('Already a User! ')
        return 0;

    }




    //  return UCD.length -1;
}


_signin = (data) => {
    console.log(data)
    return UCD.findIndex(e => { return e.password === data.password })

}

_tokenManager = (data) => {

    if (TokenMaster.findIndex(e => { return e.owner === data }) === -1) {
        let newToken = {
            owner: data,
            usid: globalSocket.id,
            time: new Date()
        }

        TokenMaster.push(newToken);
        globalSocket.emit('myToken', newToken);

        // console.log('\nToken Master:\n', TokenMaster, '\n')
    }
}

_broadcastOnlineUser = () => {

    globalSocket.broadcast.emit('OnlineUseremit', TokenMaster);
    globalSocket.emit('OnlineUser', TokenMaster);
    console.log('\nLive User :\n', TokenMaster, '\n')


}


http.listen(1001, () => {
    console.log('Server started on 3000 port')
})
app.listen(5000)
