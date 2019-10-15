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
var prevToken; //Previous Token

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

    // console.log(req.body)
    var token = '';
    let faith = _signin(req.body);
    if (faith !== -1) {

        token = _tokenManager(req.body.userid);
        _broadcastOnlineUser();
    }

    if (token === -1) {
        res.send({ faith: 404 })

    }
    else {
        res.send({ faith: faith, token: token })

    }
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



app.post('/getDlist', (req, res) => {

    console.log('Request: ', req.body);

    if (req.body.omd_id !== undefined) {
        var Dlists = _DlistsFinder(req.body.omd_id);
        console.log("Dlists", Dlists);


        res.send(Dlists);
    }
    else {
        console.log("NoChats");

        res.send({ "error": "NoChats" })
    }

})



io.on('connection', (socket) => {

    globalSocket = socket;
    // _tokenManager(req.body.userid)
    //socket.emit('credential',socket.id  )
    console.log(' globalSocket conneted', globalSocket.id)

    socket.on('messageSent', (data) => {
     let MD_id = _updatedatabase(data);
        var messagePacakge = {
            "message": data.message,
            "timestamp": data.timestamp,
            "owner": data.sender,
            "MD_id": MD_id,
        }
        socket.broadcast.to(data.rusid).emit('message', messagePacakge);
        socket.emit('message', messagePacakge);


    })


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
    // console.log(data)
    return UCD.findIndex(e => { return e.password === data.password })

}

_tokenManager = (data) => {
    var faith = TokenMaster.findIndex(e => { return e.owner === data });

    let currentsocketid;
    console.log('globalSocket.id:  ', globalSocket.id)
    console.log('prevToken.id:  ', prevToken)

    if (prevToken !== globalSocket.id) {
        prevToken = globalSocket.id;
        currentsocketid = globalSocket.id;

    }
    else {

        currentsocketid = 'same_id';
    }
    console.log('after currentsocketid:  ', currentsocketid)

    if (currentsocketid !== 'same_id') {
        if (faith === -1) {
            let newToken = {
                owner: data,
                usid: currentsocketid,
                time: new Date(),
                oMDlists: UCD[_oMDlistsFinder(data)].oMDlists,

            }


            TokenMaster.push(newToken);


            return newToken;

            // console.log('\nToken Master:\n', TokenMaster, '\n')
        }
        else {
            //already logged in
            return TokenMaster[faith];
        }
    }
    else {
        return -1;
    }

}

_broadcastOnlineUser = () => {

    globalSocket.broadcast.emit('OnlineUseremit', TokenMaster);
    globalSocket.emit('OnlineUser', TokenMaster);
    console.log('\nLive User :\n', TokenMaster, '\n')


}

_updatedatabase = (data) => {


    var newEntry = {
        owner: data.sender,
        message: data.message,
        timestamp: data.timestamp
    }




    if (data.MD_id === undefined) {
        //create New MD_id

        var newPackage = {
            author: [data.sender, data.reciver],
            Dlists: [
                newEntry
            ]
        }

        MasterDatabase.push(newPackage);

        //update oMDlists
        var sfaith = _oMDlistsFinder(data.sender);
        var rfaith = _oMDlistsFinder(data.reciver);


        var newID = { branch: MasterDatabase.length - 1, shared: data.reciver }
        UCD[sfaith].oMDlists.push(newID);

        newID = { branch: MasterDatabase.length - 1, shared: data.sender }
        UCD[rfaith].oMDlists.push(newID)

        globalSocket.emit('updateoMDlist', UCD[sfaith].oMDlists);
        console.log(data.rusid)
        globalSocket.broadcast.to(data.rusid).emit('updateoMDlist', UCD[rfaith].oMDlists);

        // globalSocket.emit('newMDID', newID);
        // globalSocket.broadcast.to(data.rusid).emit('newMDID', newID);

        return  MasterDatabase.length - 1;

    }
    else {
        console.log("data.MD_id", data.MD_id, "\n");
        MasterDatabase[data.MD_id].Dlists.push(newEntry);
        return data.MD_id;
    }




    //  MasterDatabase

}


_DlistsFinder = (credential) => {

    console.log("credential", credential)
    return MasterDatabase[credential].Dlists
}


_oMDlistsFinder = (credential) => {

    return UCD.findIndex((e) => { return e.owner === credential });
}

http.listen(1001, () => {
    console.log('Server started on 1001 port')
})
app.listen(5000)
