
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

  OMDlists: (credential) => {
    return {
      type: "oMDlists",
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


