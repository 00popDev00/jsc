
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

  _signout: (credential) => {
    return {
      type: "signout",
      credential
    }
  },

  _getLiveUsers: () => {
    return {
      type: "getLiveUsers",
    }
  },
  



}


