
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

  Token: (credential) => {
    return {
      type: "Token",
      credential
    }
  },
  // _signout: (credential) => {
  //   return {
  //     type: "signout",
  //     credential
  //   }
  // },

  // _getLiveUsers: () => {
  //   return {
  //     type: "getLiveUsers",
  //   }
  // },
  //||\\
  CurrentReciver: (credential) => {
    return {
      type: "currentreciver",
      credential
    }
  },
  
  



}


