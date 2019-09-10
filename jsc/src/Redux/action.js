
module.exports = {
  _signup: (credential) => {
    return {
      type: "signup",
      credential
    }
  },

  _signin: (credential) => {
    return {
      type: "signin",
      credential
    }
  },

  _signout: (credential) => {
    return {
      type: "signout",
      credential
    }
  }

}