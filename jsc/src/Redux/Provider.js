
var prestate = {
    username: undefined,
    oMDlists: [],
    status: undefined,
    token: undefined,
    onlineUser: [],
    currentreciver:undefined,
    mysocket:undefined,
    currentMD_id:undefined,
    currentchats:[],
    notificationManager:[],
    localstorageindex: undefined,
}

// //Demo prestate
// var prestate ={
//   username: 'a',
//   oMDlists: [
//     {
//       branch: 2,
//       shared: 'b'
//     },
//     {
//       branch: 3,
//       shared: 'b'
//     }
//   ],
//   onlineUser: [
//     {
//       owner: '2',
//       usid: 'jhIb6KRn_u5V6GlcAAAa',
//       time: '2019-10-05T05:56:33.871Z',
//       oMDlists: [
//         {
//           branch: 0,
//           shared: '1'
//         },
//         {
//           branch: 1,
//           shared: '1'
//         }
//       ]
//     },
//     {
//       owner: '1',
//       usid: 'jhIb6KRn_u5V6GlcAAAa',
//       time: '2019-10-05T05:57:58.599Z',
//       oMDlists: [
//         {
//           branch: 0,
//           shared: '2'
//         },
//         {
//           branch: 1,
//           shared: '2'
//         }
//       ]
//     },
//     {
//       owner: 'a',
//       usid: 'd9OA_bqi5iq46J8aAADH',
//       time: '2019-10-05T09:06:50.458Z',
//       oMDlists: []
//     },
//     {
//       owner: 'b',
//       usid: 'mTa0jEbA_YRkD0D4AADI',
//       time: '2019-10-05T09:07:02.365Z',
//       oMDlists: []
//     }
//   ],
//   currentreciver: {
//     owner: 'b',
//     usid: 'mTa0jEbA_YRkD0D4AADI',
//     time: '2019-10-05T09:07:02.365Z',
//     oMDlists: []
//   },
//   currentMD_id: 2,
//   currentchats: [
//     {
//       owner: 'b',
//       message: 'hiii',
//       timestamp: '2019-10-05T09:07:30.223Z'
//     }
//   ]
// }

export default (state = prestate, action) => {
    switch (action.type) {

        case 'Username': return {...state,username:action.credential};

        case 'oMDlists': return {...state,oMDlists:action.credential};

        case 'Onlineusers': return {...state,onlineUser:action.credential};

        case 'currentreciver': return {...state,currentreciver:action.credential};

        case 'notification': return {...state,};

        case 'setloginuserindex': return {...state,localstorageindex:action.credential};


        case 'currentMDid': return {...state,currentMD_id:action.credential};

        case 'currentchats': return {...state,currentchats:action.credential};

        case 'signout': return {...state,username:undefined};

        case 'notificationmanager': return {...state,...ManageNotification(action.credential,state.notificationManager,state.oMDlists)};

        
        

       // case 'listentoSignout': return listentoSignout();
       

        default: return state;
    }
}



//   currentreciver: {
//     owner: 'b',
//     usid: 'mTa0jEbA_YRkD0D4AADI',
//     time: '2019-10-05T09:07:02.365Z',
//     oMDlists: []
//   },

const ManageNotification = (credential,notificatiomnanager,oMDlists) =>{
    var faith = notificatiomnanager.findIndex(e => { return e === credential.reciver });
    var faithOMD = oMDlists.findIndex(e => { return e.shared === credential.reciver });

if(credential.flag === "remove")
{
    notificatiomnanager.splice(faith,1);
    oMDlists[faithOMD].notification=0;
    console.log('remove notificatiomnanager',notificatiomnanager, oMDlists[faithOMD])
    return {notificatiomnanager:notificatiomnanager,oMDlists:oMDlists};
}
else{
    console.log('faith',faith , typeof(faith))

    if( faith === -1  )
    {
        var newNotification = {
            reciver:credential.reciver,
            notificationCount: 1,      
        }

        notificatiomnanager.push(newNotification);
        console.log("===>",oMDlists)

        if(oMDlists != undefined)
        {
            if(faithOMD != -1)
            {
                oMDlists[faithOMD].notification=newNotification.notificationCount;
            }
            else
            {
console.log("faithOMD",faithOMD)
            }
        }
        else{
            console.log("Provider-166: undeiuinfed omd")
        }
        console.log('new notificatiomnanager',notificatiomnanager, oMDlists[faithOMD])
        return {notificatiomnanager:notificatiomnanager,oMDlists:oMDlists};
    

    }
    else{
        //already in notificaation
        notificatiomnanager[faith].notificationCount += 1;
        oMDlists[faithOMD].notification +=1;

        console.log('add notificatiomnanager',notificatiomnanager, oMDlists[faithOMD])
        return {notificatiomnanager:notificatiomnanager,oMDlists:oMDlists};

    }
}

    
}



// const OnlineusersManager = (prestate,onlineUser) => {
// try{
//  var  updatestatus = onlineUser.findIndex(e=>{return e.owner ===  prestate.currentreciver.owner})

//    if(updatestatus !== -1){
//     prestate.currentreciver.usid = onlineUser[updatestatus].usid;
//    }
// }
// catch(e)
// {
//     console.log('\n OnlibeusersManager: ',e);
// }
  
// }






