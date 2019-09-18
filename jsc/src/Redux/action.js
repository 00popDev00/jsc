
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

  CurrentReciver: (credential) => {
    return {
      type: "currentreciver",
      credential
    }
  },
  
  



}


