var app = require('express')();


var TokenMaster = [];  //|| List of online Users
var MasterDatabase = [];
var UCD = [];//UsersCredentialDatabse


app.get('/signup/:userid-:password',(req,res)=>{

     _signup(req.param);
        //socket.emit('SignupACK');

res.send('hi!')

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

    data.broadcast.emit('OnlineUseremit', TokenMaster);
    data.emit('OnlineUser', TokenMaster);
    console.log('\nLive User :\n', TokenMaster, '\n')


}

app.listen(5000);