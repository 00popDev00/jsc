
module.exports = {
  Username: (credential) => {
    return {
      type: "Username",
      credential
    }
  },

  Onlineusers: (credential) => {
    return {
      type: "Onlineusers",
      credential
    }
  },
  NotificationManager: (credential) => {
    return {
      type: "notificationmanager",
      credential
    }
  },
  OMDlists: (credential) => {
    return {
      type: "oMDlists",
      credential
    }
  },

  
  setLoginUserIndex: (credential) => {
    return {
      type: "setloginuserindex",
      credential
    }
  },
  NotificationManage: (credential) => {
    return {
      type: "notification",
      credential
      
    }
  },

  CurrentReciver: (credential) => {
    return {
      type: "currentreciver",
      credential
    }
  },
  CurrentMDid: (credential) => {
    return {
      type: "currentMDid",
      credential
    }
  },

  CurrentChats: (credential) => {
    return {
      type: "currentchats",
      credential
    }
  },
  Signout: () => {
    return {
      type: "signout",
      
    }
  },

  
  
  



}


